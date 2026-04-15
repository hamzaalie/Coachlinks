import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageWrapper } from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import VCardSectionManager from '@/components/VCardSectionManager';
import VCardPreview from '@/pages/vcard-builder/components/VCardPreview';
import DomainConfig from '@/components/DomainConfig';
import MediaPicker from '@/components/MediaPicker';
import ContactFormModal from '@/components/ContactFormModal';
import AppointmentFormModal from '@/components/AppointmentFormModal';
import { getBusinessTemplate, businessTypeOptions } from '@/pages/vcard-builder/business-templates';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/custom-toast';

interface Business {
  id: number;
  name: string;
  slug: string;
  business_type: string;
  config_sections: any;
  custom_domain?: string;
  url_prefix?: string;
  password?: string;
  password_enabled?: boolean;
}

interface Props {
  business?: Business;
  userPlan?: {
    themes?: string[];
    enable_custdomain?: string;
    enable_custsubdomain?: string;
    pwa_business?: string;
  };
  planFeatures?: {
    business_template_sections?: string[];
    [key: string]: any;
  };
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export default function VCardBuilderForm({ business, userPlan, planFeatures, userRole, userName, userEmail }: Props) {
  const { t } = useTranslation();
  const isEdit = !!business;
  const selectedTemplateFromQuery = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return new URLSearchParams(window.location.search).get('template');
  }, []);

  const [businessType, setBusinessType] = React.useState(
    business?.business_type || selectedTemplateFromQuery || 'business-coach'
  );
  const [slugStatus, setSlugStatus] = React.useState({ available: true, checking: false });
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = React.useState(false);

  const template = getBusinessTemplate(businessType);
    
  // Check if user is superadmin (no restrictions)
  const isSuperAdmin = userRole === 'superadmin';
  
  // Filter template sections based on plan features
  const filteredTemplate = React.useMemo(() => {
    if (!template) return template;

    // Section restriction is intentionally disabled so every template section
    // remains editable and matches live preview output.
    return template;
  }, [template]);
  
  // Get allowed business types based on plan
  const allowedBusinessTypes = React.useMemo(() => {
    // Only show coaching templates
    const coachOnly = (list: typeof businessTypeOptions) =>
      list.filter(o => o.value.endsWith('-coach'));

    if (isSuperAdmin) {
      return coachOnly(businessTypeOptions);
    }
    
    if (!userPlan) {
      return coachOnly(businessTypeOptions);
    }
    
    if (!userPlan.themes) {
      return coachOnly(businessTypeOptions);
    }
    
    if (!Array.isArray(userPlan.themes)) {
      return coachOnly(businessTypeOptions);
    }
    
    if (userPlan.themes.length === 0) {
      return coachOnly(businessTypeOptions);
    }
    
    const filtered = businessTypeOptions.filter(option => {
      const included = userPlan.themes.includes(option.value);
      return included;
    });
    
    return coachOnly(filtered);
  }, [userPlan, isSuperAdmin]);
    
  // Check feature permissions using new planFeatures structure only
  const canUseCustomDomain = isSuperAdmin || (planFeatures?.custom_domain === true);
  const canUseSubdomain = isSuperAdmin || (planFeatures?.custom_subdomain === true);
  const canUsePWA = isSuperAdmin || (planFeatures?.pwa_support === true);
  const canUsePasswordProtection = isSuperAdmin || (planFeatures?.password_protection === true);
  
  const firstColorPreset = template?.colorPresets?.[0];
  
  const normalizedConfigSections = React.useMemo(() => {
    if (!business) return {};
    
    const result = { ...business.config_sections };
    delete result._allowed_sections;
    const currentTemplate = filteredTemplate || template;
    
    if (currentTemplate?.sections) {
      currentTemplate.sections.forEach((section: any, index: number) => {
        if (result[section.key]) {
          // Merge existing data with template defaults
          result[section.key] = {
            ...currentTemplate.defaultData?.[section.key],
            ...result[section.key],
            order: result[section.key].order ?? (section.order ?? index)
          };
        } else if (currentTemplate.defaultData?.[section.key]) {
          // Add missing sections from template defaults
          result[section.key] = {
            ...currentTemplate.defaultData[section.key],
            order: section.order ?? index
          };
        }
      });
    }
    
    return result;
  }, [business?.config_sections, template, planFeatures, isSuperAdmin]);
  
  const { data, setData, post, put, processing, errors } = useForm({
    name: business?.name || userName || template?.defaultData?.header?.name || t('My Business'),
    slug: business?.slug || '',
    business_type: businessType,
    custom_domain: business?.custom_domain || '',
    url_prefix: business?.url_prefix || 'v',
    password: '',
    password_enabled: business?.password_enabled || false,
    domain_type: business?.custom_domain ? 'domain' : 'slug',
    favicon: business?.favicon || '',
    config_sections: isEdit ? normalizedConfigSections : (() => {
      const sections = { ...template?.defaultData || {} };
      if (template?.sections) {
        template.sections.forEach((section: any, index: number) => {
          if (sections[section.key]) {
            sections[section.key].order = section.order ?? index;
          }
        });
      }
      if (firstColorPreset) {
        sections.colors = {
          primary: firstColorPreset.primary,
          secondary: firstColorPreset.secondary,
          accent: firstColorPreset.accent,
          text: firstColorPreset.text
        };
      }
      
      // Apply obvious placeholder patterns to ALL sections
      // Header section
      if (sections.header) {
        sections.header = { 
          ...sections.header, 
          name: userName || '[Your Name]',
          title: sections.header.title ? `[Example: ${sections.header.title}]` : '[Your Coaching Title]',
          tagline: sections.header.tagline ? `[Example: ${sections.header.tagline}]` : '[Your Value Proposition]'
        };
      }
      
      // Contact section - user's real email, placeholders for rest
      if (sections.contact) {
        sections.contact = { 
          ...sections.contact, 
          email: userEmail || '[your@email.com]',
          phone: '[Your Phone Number]',
          website: '[Your Website URL]',
          location: '[Your City, State]'
        };
      }
      
      // About section
      if (sections.about) {
        sections.about = {
          ...sections.about,
          description: '[Write a compelling description about yourself and your coaching practice...]',
          specializations: ['[Specialization 1]', '[Specialization 2]', '[Specialization 3]'],
          experience: 0,
          mission: '[Your mission statement - what drives you as a coach...]'
        };
      }
      
      // Signature offer section
      if (sections.signature_offer) {
        sections.signature_offer = {
          ...sections.signature_offer,
          offer_title: '[Your Signature Program Name]',
          offer_description: '[Describe your main coaching offer and what clients will achieve...]',
          offer_price: '[Your Price]',
          offer_includes: ['[What\'s included 1]', '[What\'s included 2]', '[What\'s included 3]'],
          offer_url: '',
          offer_cta: 'Apply Now'
        };
      }
      
      // Programs section
      if (sections.programs) {
        sections.programs = {
          ...sections.programs,
          program_list: [
            { 
              title: '[Program Name 1]', 
              description: '[Brief description of this program...]', 
              duration: '[Duration]', 
              format: 'one-on-one', 
              price: '[Price]' 
            },
            { 
              title: '[Program Name 2]', 
              description: '[Brief description of this program...]', 
              duration: '[Duration]', 
              format: 'group', 
              price: '[Price]' 
            }
          ]
        };
      }
      
      // Results section
      if (sections.results) {
        sections.results = {
          ...sections.results,
          revenue_generated: '[Your Results]',
          businesses_scaled: '[Number]+',
          avg_growth: '[Growth %]',
          case_studies: [
            { 
              client_name: '[Client Name]', 
              industry: '[Industry]', 
              challenge: '[What challenge did they face?]', 
              solution: '[How did you help them?]', 
              result: '[What result did they achieve?]', 
              revenue_impact: '[Impact %]' 
            }
          ]
        };
      }
      
      // Lead magnet section
      if (sections.lead_magnet) {
        sections.lead_magnet = {
          ...sections.lead_magnet,
          magnet_title: '[Your Free Resource Title]',
          magnet_description: '[What will they learn or get from this free resource?]',
          magnet_type: 'ebook'
        };
      }
      
      // Testimonials section
      if (sections.testimonials) {
        sections.testimonials = {
          ...sections.testimonials,
          reviews: [
            { 
              client_name: '[Client Name]', 
              client_title: '[Their Title/Company]', 
              review: '[What did they say about working with you?]', 
              rating: 5, 
              result_highlight: '[Key Result]' 
            }
          ]
        };
      }
      
      // Booking section
      if (sections.booking) {
        sections.booking = {
          ...sections.booking,
          call_duration: '30 minutes',
          call_description: '[Describe what happens during a discovery call with you...]'
        };
      }
      
      // Social section - keep empty for user to fill
      if (sections.social) {
        sections.social = {
          ...sections.social,
          social_links: [
            { platform: 'linkedin', url: '', username: '' },
            { platform: 'instagram', url: '', username: '' }
          ]
        };
      }
      
      return sections;
    })()
  });
  
  // Display validation errors as toast messages
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    }
  }, [errors]);
  
  // Listen for custom events from template buttons
  React.useEffect(() => {
    const handleOpenContactModal = (e: Event) => {
      setContactModalOpen(true);
    };
    const handleOpenAppointmentModal = (e: Event) => {
      setAppointmentModalOpen(true);
    };
    
    // Listen on multiple targets
    const targets = [window, document, document.body];
    targets.forEach(target => {
      target.addEventListener('openContactModal', handleOpenContactModal, true);
      target.addEventListener('openAppointmentModal', handleOpenAppointmentModal, true);
    });
    
    return () => {
      targets.forEach(target => {
        target.removeEventListener('openContactModal', handleOpenContactModal, true);
        target.removeEventListener('openAppointmentModal', handleOpenAppointmentModal, true);
      });
    };
  }, []);
  
  // Legacy _allowed_sections support intentionally disabled.

  // Auto-generate slug on mount for new cards
  React.useEffect(() => {
    if (!isEdit && data.name && !data.slug) {
      generateSlugFromName(data.name);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBusinessTypeChange = (newType: string) => {
    setBusinessType(newType);
    const newTemplate = getBusinessTemplate(newType);
    const newName = isEdit ? data.name : userName || '[Your Name]';
    const newFirstColorPreset = newTemplate?.colorPresets?.[0];

    // Build config sections with obvious placeholders for new cards
    const buildConfigSections = () => {
      const sections = { ...newTemplate?.defaultData || {}, colors: newFirstColorPreset };
      
      if (!isEdit) {
        // Apply obvious placeholder patterns to ALL sections
        // Header section
        if (sections.header) {
          sections.header = {
            ...sections.header,
            name: userName || '[Your Name]',
            title: sections.header.title ? `[Example: ${sections.header.title}]` : '[Your Coaching Title]',
            tagline: sections.header.tagline ? `[Example: ${sections.header.tagline}]` : '[Your Value Proposition]'
          };
        }
        
        // Contact section
        if (sections.contact) {
          sections.contact = {
            ...sections.contact,
            email: userEmail || '[your@email.com]',
            phone: '[Your Phone Number]',
            website: '[Your Website URL]',
            location: '[Your City, State]'
          };
        }
        
        // About section
        if (sections.about) {
          sections.about = {
            ...sections.about,
            description: '[Write a compelling description about yourself and your coaching practice...]',
            specializations: ['[Specialization 1]', '[Specialization 2]', '[Specialization 3]'],
            experience: 0,
            mission: '[Your mission statement - what drives you as a coach...]'
          };
        }
        
        // Signature offer section
        if (sections.signature_offer) {
          sections.signature_offer = {
            ...sections.signature_offer,
            offer_title: '[Your Signature Program Name]',
            offer_description: '[Describe your main coaching offer and what clients will achieve...]',
            offer_price: '[Your Price]',
            offer_includes: ['[What\'s included 1]', '[What\'s included 2]', '[What\'s included 3]'],
            offer_url: '',
            offer_cta: 'Apply Now'
          };
        }
        
        // Programs section
        if (sections.programs) {
          sections.programs = {
            ...sections.programs,
            program_list: [
              { title: '[Program Name 1]', description: '[Brief description...]', duration: '[Duration]', format: 'one-on-one', price: '[Price]' },
              { title: '[Program Name 2]', description: '[Brief description...]', duration: '[Duration]', format: 'group', price: '[Price]' }
            ]
          };
        }
        
        // Results section
        if (sections.results) {
          sections.results = {
            ...sections.results,
            revenue_generated: '[Your Results]',
            businesses_scaled: '[Number]+',
            avg_growth: '[Growth %]',
            case_studies: [
              { client_name: '[Client Name]', industry: '[Industry]', challenge: '[Challenge?]', solution: '[Solution?]', result: '[Result?]', revenue_impact: '[Impact %]' }
            ]
          };
        }
        
        // Lead magnet section
        if (sections.lead_magnet) {
          sections.lead_magnet = {
            ...sections.lead_magnet,
            magnet_title: '[Your Free Resource Title]',
            magnet_description: '[What will they learn or get from this free resource?]',
            magnet_type: 'ebook'
          };
        }
        
        // Testimonials section
        if (sections.testimonials) {
          sections.testimonials = {
            ...sections.testimonials,
            reviews: [
              { client_name: '[Client Name]', client_title: '[Their Title/Company]', review: '[What did they say?]', rating: 5, result_highlight: '[Key Result]' }
            ]
          };
        }
        
        // Booking section
        if (sections.booking) {
          sections.booking = {
            ...sections.booking,
            call_duration: '30 minutes',
            call_description: '[Describe what happens during a discovery call with you...]'
          };
        }
        
        // Social section
        if (sections.social) {
          sections.social = {
            ...sections.social,
            social_links: [
              { platform: 'linkedin', url: '', username: '' },
              { platform: 'instagram', url: '', username: '' }
            ]
          };
        }
      }
      
      return sections;
    };

    setData({
      name: newName,
      slug: isEdit ? data.slug : '',
      business_type: newType,
      custom_domain: data.custom_domain,
      url_prefix: data.url_prefix,
      password: data.password,
      password_enabled: data.password_enabled,
      domain_type: data.domain_type,
      favicon: data.favicon,
      config_sections: buildConfigSections()
    });
    
    if (!isEdit) {
      generateSlugFromName(newName);
    }
  };

  const generateSlugFromName = async (name: string) => {
    if (!name) return;
    try {
      const response = await axios.post(route('vcard-builder.generate-slug'), { 
        name,
        business_id: business?.id,
        url_prefix: data.url_prefix || 'v'
      });
      setData('slug', response.data.slug);
      checkSlugAvailability(response.data.slug);
    } catch (error) {
      console.error('Error generating slug:', error);
    }
  };

  const checkSlugAvailability = async (slug: string, urlPrefix?: string) => {
    if (!slug) {
      setSlugStatus({ available: true, checking: false });
      return;
    }
    
    setSlugStatus({ available: true, checking: true });
    try {
      const response = await axios.post(route('vcard-builder.check-slug'), { 
        slug, 
        business_id: business?.id,
        url_prefix: urlPrefix || data.url_prefix 
      });
      setSlugStatus({ available: response.data.available, checking: false });
    } catch (error) {
      setSlugStatus({ available: false, checking: false });
    }
  };

  const handleNameChange = (name: string) => {
    setData('name', name);
    if (!isEdit && !data.slug) {
      generateSlugFromName(name);
    }
  };

  const handleSlugChange = (slug: string) => {
    setData('slug', slug);
    checkSlugAvailability(slug);
  };

  const handlePrefixChange = (prefix: string) => {
    if (data.slug) {
      checkSlugAvailability(data.slug, prefix);
    }
  };

  const updateTemplateConfig = (section: string, field: string, value: any) => {
    const updatedSections = {
      ...data.config_sections,
      [section]: {
        ...data.config_sections[section],
        [field]: value
      }
    };

    delete (updatedSections as any)._allowed_sections;
    
    setData('config_sections', updatedSections);
  };

  const handleToggleSection = (sectionKey: string, enabled: boolean) => {
    const updatedSections = {
      ...data.config_sections,
      [sectionKey]: {
        ...data.config_sections[sectionKey],
        enabled,
        order: data.config_sections[sectionKey]?.order || 0
      }
    };

    delete (updatedSections as any)._allowed_sections;
    
    setData('config_sections', updatedSections);
  };

  const handleReorderSections = (sections: any[]) => {
    const updatedSections = { ...data.config_sections };
    sections.forEach((section, index) => {
      if (updatedSections[section.key]) {
        updatedSections[section.key] = {
          ...updatedSections[section.key],
          order: index
        };
      }
    });
    setData('config_sections', updatedSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!data.slug) {
      toast.error(t('Slug is required'));
      return;
    }
    
    const updatedData = {
      ...data,
      config_sections: {
        ...data.config_sections,
      },
    };

    delete (updatedData.config_sections as any)._allowed_sections;

    setData(updatedData);
    
    if (isEdit) {
      put(route('vcard-builder.update', business.id));
    } else {
      post(route('vcard-builder.store'));
    }
  };

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Coach Card Builder'), href: route('vcard-builder.index') },
    { title: isEdit ? business.name : t('Create Business') }
  ];

  const pageTitle = isEdit ? `Edit ${business.name}` : 'Create Business';
  const pageUrl = isEdit ? route('vcard-builder.edit', business.id) : route('vcard-builder.create');

  return (
    <PageWrapper title={pageTitle} url={pageUrl} breadcrumbs={breadcrumbs}>
      <Head title={pageTitle} />
      
      {/* Sticky Save Bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b mb-6">
        <div className="flex items-center justify-between py-3 px-1">
          <div className="flex items-center space-x-2">
            {!slugStatus.available && data.slug && (
              <span className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">{t('Slug not available')}</span>
            )}
            {processing && (
              <span className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                {isEdit ? t('Updating...') : t('Creating...')}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              className="px-4 h-9 flex items-center gap-1"
              onClick={() => {
                // Store the filtered form data in localStorage for the preview page to use
                localStorage.setItem('vcard_preview_data', JSON.stringify({
                  business_type: businessType,
                  name: data.name,
                  slug: data.slug || 'preview',
                  config_sections: data.config_sections,
                  template_config: {
                    allowedSections: isSuperAdmin ? undefined : (planFeatures?.business_template_sections || [])
                  }
                }));
                
                // Open the preview in a new tab
                window.open(route('vcard.preview'), '_blank');
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              {t("Preview Template")}
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={processing || (!slugStatus.available && data.slug)} 
              className="px-6 h-9"
            >
              {processing ? (isEdit ? t('Updating...') : t('Creating...')) : (isEdit ? t('Update Business') : t('Create Business'))}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="p-3 border-b bg-muted/30">
              <h3 className="text-base font-medium"><span className="bg-gray-100 dark:bg-gray-700 text-xs rounded-full h-5 w-5 inline-flex items-center justify-center mr-1.5">1</span>{t("Business Setup")}</h3>
            </div>
            <div className="p-3 space-y-3">
              {/* Business Identity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm mb-1 block flex items-center justify-between">
                    <div className="flex items-center">
                      {t("Business Type")}
                      {(window as any).isDemo && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary text-white">
                          New
                        </span>
                      )}
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                      {allowedBusinessTypes.length} layouts
                    </span>
                  </Label>
                  <Select value={businessType} onValueChange={handleBusinessTypeChange}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedBusinessTypes.map((option, index) => (
                        <SelectItem key={option.value} value={option.value}>Theme {index + 1}: {option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!isSuperAdmin && allowedBusinessTypes.length < businessTypeOptions.length && (
                    <p className="text-xs text-amber-600 mt-1">
                      {t('Some templates are restricted by your plan. Upgrade to access all templates.')}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm mb-1 block">{t("Business Name")}</Label>
                  <Input
                    value={data.name}
                    onChange={(e) => isEdit ? setData('name', e.target.value) : handleNameChange(e.target.value)}
                    className="h-9 text-sm"
                    placeholder={t("Enter business name")}
                    required
                  />
                </div>
              </div>

              {/* Business Favicon */}
              <div>
                <MediaPicker
                  label={t("Business Favicon")}
                  value={data.favicon}
                  onChange={(value) => setData('favicon', value)}
                  placeholder={t("Select favicon from media library")}
                  showPreview={true}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('Upload a small icon (16x16 or 32x32 pixels) to represent your business in browser tabs')}
                </p>
              </div>

              {/* Color Theme */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="text-sm">{t("Color Theme")}</Label>
                  <div className="flex space-x-1">
                    {(template?.colorPresets || []).slice(0, 5).map((preset: any, index: number) => (
                      <div 
                        key={index}
                        className="w-5 h-5 rounded-full cursor-pointer border hover:scale-110 transition-transform flex items-center justify-center"
                        style={{ backgroundColor: preset.primary }}
                        onClick={() => {
                          setData('config_sections', {
                            ...data.config_sections,
                            colors: preset
                          });
                        }}
                      >
                        {data.config_sections?.colors?.primary === preset.primary && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Custom Color Pickers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div>
                    <Label className="text-sm mb-1 block">{t("Primary")}</Label>
                    <div className="flex">
                      <Input
                        type="color"
                        value={data.config_sections?.colors?.primary || '#3B82F6'}
                        onChange={(e) => {
                          setData('config_sections', {
                            ...data.config_sections,
                            colors: { ...data.config_sections?.colors, primary: e.target.value }
                          });
                        }}
                        className="h-6 p-0 w-full rounded-r-none"
                      />
                      <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                        {data.config_sections?.colors?.primary?.substring(0, 7) || '#3B82F6'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">{t("Secondary")}</Label>
                    <div className="flex">
                      <Input
                        type="color"
                        value={data.config_sections?.colors?.secondary || '#1E40AF'}
                        onChange={(e) => {
                          setData('config_sections', {
                            ...data.config_sections,
                            colors: { ...data.config_sections?.colors, secondary: e.target.value }
                          });
                        }}
                        className="h-6 p-0 w-full rounded-r-none"
                      />
                      <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                        {data.config_sections?.colors?.secondary?.substring(0, 7) || '#1E40AF'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">{t("Accent")}</Label>
                    <div className="flex">
                      <Input
                        type="color"
                        value={data.config_sections?.colors?.accent || '#F59E0B'}
                        onChange={(e) => {
                          setData('config_sections', {
                            ...data.config_sections,
                            colors: { ...data.config_sections?.colors, accent: e.target.value }
                          });
                        }}
                        className="h-6 p-0 w-full rounded-r-none"
                      />
                      <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                        {data.config_sections?.colors?.accent?.substring(0, 7) || '#F59E0B'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-1 block">{t("Text")}</Label>
                    <div className="flex">
                      <Input
                        type="color"
                        value={data.config_sections?.colors?.text || (businessType === 'freelancer' ? '#E2E8F0' : '#1E293B')}
                        onChange={(e) => {
                          setData('config_sections', {
                            ...data.config_sections,
                            colors: { ...data.config_sections?.colors, text: e.target.value }
                          });
                        }}
                        className="h-6 p-0 w-full rounded-r-none"
                      />
                      <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                        {data.config_sections?.colors?.text?.substring(0, 7) || (businessType === 'freelancer' ? '#E2E8F0' : '#1E293B')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Font Family */}
              <div>
                <Label className="text-sm mb-1 block">{t("Font Family")}</Label>
                <Select 
                  value={data.config_sections?.font || template?.defaultFont || 'Inter, sans-serif'} 
                  onValueChange={(value) => {
                    setData('config_sections', {
                      ...data.config_sections,
                      font: value
                    });
                  }}
                >
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(template?.fontOptions || [
                      { name: 'Inter', value: 'Inter, sans-serif' },
                      { name: 'Arial', value: 'Arial, sans-serif' },
                      { name: 'Georgia', value: 'Georgia, serif' }
                    ]).map((font: any) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <DomainConfig
            data={{
              slug: data.slug,
              custom_domain: data.custom_domain,
              url_prefix: data.url_prefix,
              password: data.password,
              password_enabled: data.password_enabled,
              domain_type: data.domain_type
            }}
            onUpdate={(field, value) => setData(field as any, value)}
            slugStatus={slugStatus}
            onSlugChange={handleSlugChange}
            onPrefixChange={handlePrefixChange}
            businessId={business?.id}
            canUseCustomDomain={canUseCustomDomain}
            canUseSubdomain={canUseSubdomain}
            canUsePasswordProtection={canUsePasswordProtection}
            type="business"
          />

          <Card>
            <div className="p-3 border-b bg-muted/30">
              <h3 className="text-base font-medium"><span className="bg-gray-100 dark:bg-gray-700 text-xs rounded-full h-5 w-5 inline-flex items-center justify-center mr-1.5">3</span>{t("Card Sections")}</h3>
            </div>
            <div className="p-3">
              {!isSuperAdmin && planFeatures?.business_template_sections && planFeatures.business_template_sections.length > 0 && (
                <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-xs text-amber-700">
                    {t('Some sections are restricted by your plan. Available sections: "{{count}}"', {
                      count: filteredTemplate?.sections?.length || 0
                    })}
                  </p>
                </div>
              )}
              <VCardSectionManager
                sections={filteredTemplate?.sections || template?.sections || []}
                templateConfig={{ sections: data.config_sections, sectionSettings: data.config_sections }}
                onUpdateSection={updateTemplateConfig}
                onToggleSection={handleToggleSection}
                onReorderSections={handleReorderSections}
                planFeatures={planFeatures}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </Card>
          
          <Card>
            <div className="p-3 border-b bg-muted/30">
              <h3 className="text-base font-medium"><span className="bg-gray-100 dark:bg-gray-700 text-xs rounded-full h-5 w-5 inline-flex items-center justify-center mr-1.5">4</span>{t("PWA Settings")}</h3>
            </div>
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">{t("Enable PWA")}</Label>
                  {!canUsePWA && (
                    <p className="text-xs text-amber-600">{t('PWA feature requires plan upgrade')}</p>
                  )}
                </div>
                <Switch
                  checked={data.config_sections?.pwa?.enabled || false}
                  onCheckedChange={(checked) => updateTemplateConfig('pwa', 'enabled', checked)}
                  disabled={!canUsePWA}
                  className="scale-75"
                />
              </div>

              {data.config_sections?.pwa?.enabled && canUsePWA && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm mb-1 block">{t("App Name")}</Label>
                    <Input
                      value={data.config_sections?.pwa?.name || data.name || ''}
                      onChange={(e) => updateTemplateConfig('pwa', 'name', e.target.value)}
                      placeholder={t("My Business Card")}
                      className="h-9 text-sm"
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">{t("Short Name")}</Label>
                    <Input
                      value={data.config_sections?.pwa?.short_name || ''}
                      onChange={(e) => updateTemplateConfig('pwa', 'short_name', e.target.value)}
                      placeholder={t("MyCard")}
                      className="h-9 text-sm"
                      maxLength={12}
                    />
                  </div>

                  <div>
                    <Label className="text-sm mb-1 block">{t("Description")}</Label>
                    <Input
                      value={data.config_sections?.pwa?.description || ''}
                      onChange={(e) => updateTemplateConfig('pwa', 'description', e.target.value)}
                      placeholder={t("Digital business card")}
                      className="h-9 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm mb-1 block">{t("Theme Color")}</Label>
                      <div className="flex">
                        <Input
                          type="color"
                          value={data.config_sections?.pwa?.theme_color || '#000000'}
                          onChange={(e) => updateTemplateConfig('pwa', 'theme_color', e.target.value)}
                          className="h-6 p-0 w-full rounded-r-none"
                        />
                        <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                          {data.config_sections?.pwa?.theme_color?.substring(0, 7) || '#000000'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">{t("Background")}</Label>
                      <div className="flex">
                        <Input
                          type="color"
                          value={data.config_sections?.pwa?.background_color || '#ffffff'}
                          onChange={(e) => updateTemplateConfig('pwa', 'background_color', e.target.value)}
                          className="h-6 p-0 w-full rounded-r-none"
                        />
                        <div className="bg-gray-100 dark:bg-gray-700 px-1 flex items-center rounded-r-md border border-l-0 border-input text-xs">
                          {data.config_sections?.pwa?.background_color?.substring(0, 7) || '#ffffff'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4 h-[calc(100vh-2rem)]">
            <div className="p-3 border-b bg-muted/30">
              <h3 className="text-base font-medium">{t("Live Preview")}</h3>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg overflow-hidden h-[calc(100%-3.5rem)]">
              <div className="flex justify-center h-full">
                <div className="w-full max-w-[400px] overflow-y-auto h-full shadow-lg rounded-lg">
                  <VCardPreview
                    businessType={businessType}
                    data={{ 
                      ...data, 
                      template_config: { 
                        sections: data.config_sections, 
                        sectionSettings: data.config_sections,
                      } 
                    }}
                    template={filteredTemplate || template}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Modals for Preview */}
      <ContactFormModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
        businessId={business?.id || 0}
        businessName={data.name || 'Preview Business'}
        themeColors={data.config_sections?.colors || template?.defaultColors}
        themeFont={data.config_sections?.font || template?.defaultFont}
      />
      
      <AppointmentFormModal 
        isOpen={appointmentModalOpen} 
        onClose={() => setAppointmentModalOpen(false)} 
        businessId={business?.id || 0}
        businessName={data.name || 'Preview Business'}
        themeColors={data.config_sections?.colors || template?.defaultColors}
        themeFont={data.config_sections?.font || template?.defaultFont}
      />

    </PageWrapper>
  );
}