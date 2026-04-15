/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, Star, Award, Download, CheckCircle, Share2, QrCode, Gift, Sparkles } from 'lucide-react';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';
import { getCoachFonts } from './coach-fonts';

/**
 * MindsetCoachTemplate — ZEN MINIMALIST design
 * Pure white to lavender gradient, centered circle profile, ultra-clean cards,
 * tons of whitespace, calming meditative feel, thin lavender borders.
 */

interface MindsetCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MindsetCoachTemplate({ data, template: _template, businessType }: MindsetCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'mindset-coach';


  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 5000);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const rtlLanguages = ['ar', 'he'];
  const isRTL = rtlLanguages.includes(currentLanguage);
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };

  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#9B8EC4',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#6B5CA5',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#C4B1E0',
    background: configSections.colors?.background || '#FFFFFF',
    text: configSections.colors?.text || '#3A3550',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('mindset-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  // ─── Section Renderers ──────────────────────────────────────

  const renderSection = (sectionKey: string) => {
    const sectionData = configSections[sectionKey] || {};
    if (!sectionData || Object.keys(sectionData).length === 0 || sectionData.enabled === false) return null;
    switch (sectionKey) {
      case 'header': return renderHeaderSection(sectionData);
      case 'contact': return renderContactSection(sectionData);
      case 'about': return renderAboutSection(sectionData);
      case 'programs': return renderProgramsSection(sectionData);
      case 'signature_offer': return renderSignatureOfferSection(sectionData);
      case 'results': return renderResultsSection(sectionData);
      case 'transformations': return renderTransformationsSection(sectionData);
      case 'lead_magnet': return renderLeadMagnetSection(sectionData);
      case 'booking': return renderBookingSection(sectionData);
      case 'testimonials': return renderTestimonialsSection(sectionData);
      case 'social': return renderSocialSection(sectionData);
      case 'links': return renderLinksSection(sectionData);
      case 'business_hours': return renderBusinessHoursSection(sectionData);
      case 'appointments': return renderAppointmentsSection(sectionData);
      case 'google_map': return renderLocationSection(sectionData);
      case 'contact_form': return renderContactFormSection(sectionData);
      case 'custom_html': return renderCustomHtmlSection(sectionData);
      case 'qr_share': return renderQrShareSection(sectionData);
      case 'footer': return renderFooterSection(sectionData);
      default: return null;
    }
  };

  // ─── Header — White to lavender gradient, centered circle with ring ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-3xl overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Subtle white to lavender gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, #FFFFFF 0%, ${colors.accent}20 50%, ${colors.primary}15 100%)` }} />
      {/* Soft center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10" style={{ background: `radial-gradient(circle, ${colors.primary}, transparent 70%)` }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(155,142,196,0.12)', color: colors.secondary, backdropFilter: 'blur(10px)', fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative px-6 py-14 text-center">
        {/* Profile with decorative ring */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Outer decorative ring */}
          <div className="absolute inset-0 rounded-full" style={{ border: `2px solid ${colors.primary}25`, transform: 'scale(1.15)' }} />
          <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${colors.primary}15`, transform: 'scale(1.3)' }} />
          <div className="w-32 h-32 rounded-full overflow-hidden" style={{ border: `3px solid ${colors.primary}30` }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}20)`, color: colors.secondary, fontFamily: font }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-light mb-2 tracking-wide" style={{ color: colors.text, fontFamily: font }}>
          {headerData.name || t('Mindset Coach')}
        </h1>
        <p className="text-sm mb-3" style={{ color: colors.primary, fontFamily: font, fontWeight: 400 }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs max-w-xs mx-auto leading-relaxed" style={{ color: colors.text + '80', fontFamily: font, letterSpacing: '0.03em' }}>
            {headerData.tagline}
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Ultra-minimal centered icons ────────────────

  const renderContactSection = (contactData: any) => (
    <div className="px-8 py-6">
      <div className="flex justify-center gap-6">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex flex-col items-center gap-1.5 transition-all hover:scale-110">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '10' }}>
              <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex flex-col items-center gap-1.5 transition-all hover:scale-110">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '10' }}>
              <Phone className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex flex-col items-center gap-1.5 transition-all hover:scale-110">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '10' }}>
              <Globe className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '10' }}>
              <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs text-center" style={{ color: colors.text + '80', fontFamily: font, maxWidth: '64px' }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Ultra-clean card, thin lavender bottom border only ────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-8 py-6">
        <div className="pb-5" style={{ borderBottom: `2px solid ${colors.primary}20` }}>
          <h3 className="text-center font-light text-lg mb-4 tracking-wide" style={{ color: colors.text, fontFamily: font }}>
            {t('About')}
          </h3>
          <p className="text-sm leading-loose text-center mb-6" style={{ color: colors.text + 'CC', fontFamily: font }}>
            {sanitizeText(aboutData.description)}
          </p>

          {aboutData.specializations && (
            <div className="mb-5 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-full px-3 py-1 font-normal" style={{ background: `${colors.primary}08`, color: colors.secondary, border: `1px solid ${colors.primary}20`, fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-5 text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-full px-3 py-1 font-normal" style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="text-center mt-4">
              <span className="text-3xl font-light" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <p className="text-xs mt-1" style={{ color: colors.text + '60', fontFamily: font }}>{t('Years of Practice')}</p>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-6 text-center">
              <p className="text-sm italic leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: 'Georgia, serif' }}>
                "{aboutData.philosophy}"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Simple list with indigo bullet dots ────────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-8 py-6">
        <h3 className="text-center font-light text-lg mb-6 tracking-wide" style={{ color: colors.text, fontFamily: font }}>
          {t('Programs')}
        </h3>
        <div className="space-y-4">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="flex items-start gap-4">
              {/* Indigo bullet dot */}
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: colors.secondary }} />
              <div className="flex-1 pb-4" style={{ borderBottom: `1px solid ${colors.primary}10` }}>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                  {prog.price && <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{prog.price}</span>}
                </div>
                {prog.description && <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + '90', fontFamily: font }}>{prog.description}</p>}
                <div className="flex items-center gap-2">
                  {prog.format && <span className="text-xs" style={{ color: colors.primary, fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</span>}
                  {prog.format && prog.duration && <span style={{ color: colors.primary + '40' }}>·</span>}
                  {prog.duration && <span className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>{prog.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer ───────────────────────────────────────

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-8 py-6">
        <div className="text-center pb-6" style={{ borderBottom: `2px solid ${colors.primary}15` }}>
          <Sparkles className="w-5 h-5 mx-auto mb-3" style={{ color: colors.primary }} />
          <h3 className="font-light text-lg tracking-wide mb-2" style={{ color: colors.text, fontFamily: font }}>{title}</h3>
          {desc && <p className="text-xs leading-relaxed" style={{ color: colors.text + '80', fontFamily: font }}>{desc}</p>}
        </div>
        {Array.isArray(pillars) && pillars.length > 0 && (
          <div className="space-y-3 mt-5">
            {pillars.map((pillar: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ backgroundColor: colors.primary + '12', color: colors.secondary, fontFamily: font }}>
                  {i + 1}
                </div>
                <div className="flex-1 pb-3" style={{ borderBottom: `1px solid ${colors.primary}08` }}>
                  <p className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>{pillar.name}</p>
                  {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '70', fontFamily: font }}>{pillar.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Results ───────────────────────────────────────────────

  const renderResultsSection = (resultsData: any) => {
    const stats: { label: string; value: string }[] = [];
    const ignoreKeys = ['case_studies', 'enabled'];
    Object.entries(resultsData).forEach(([key, val]) => {
      if (val && typeof val === 'string' && !ignoreKeys.includes(key)) {
        stats.push({ label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: val as string });
      }
    });
    const caseStudies = resultsData.case_studies || [];
    if (stats.length === 0 && caseStudies.length === 0) return null;
    return (
      <div className="px-8 py-6">
        <h3 className="text-center font-light text-lg mb-6 tracking-wide" style={{ color: colors.text, fontFamily: font }}>
          {t('Results')}
        </h3>
        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-light" style={{ color: colors.secondary, fontFamily: font }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: colors.text + '60', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-4">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="pb-4" style={{ borderBottom: `1px solid ${colors.primary}10` }}>
                <p className="text-sm font-medium mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + '80', fontFamily: font }}><span style={{ color: colors.secondary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.primary, fontFamily: font }}><span className="font-medium">{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-medium mt-1" style={{ color: colors.secondary, fontFamily: font }}>{cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations ───────────────────────────────────────

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-8 py-6">
        <h3 className="text-center font-light text-lg mb-5 tracking-wide" style={{ color: colors.text, fontFamily: font }}>
          {t('Transformations')}
        </h3>
        <div className="space-y-5">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="pb-5" style={{ borderBottom: `1px solid ${colors.primary}10` }}>
              <p className="text-sm font-medium text-center mb-3" style={{ color: colors.secondary, fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {story.before_image && <div className="relative rounded-2xl overflow-hidden aspect-square"><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs bg-white/80 px-2 py-0.5 rounded-full" style={{ color: colors.text }}>{t('Before')}</span></div>}
                  {story.after_image && <div className="relative rounded-2xl overflow-hidden aspect-square"><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs bg-white/80 px-2 py-0.5 rounded-full" style={{ color: colors.text }}>{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <p className="text-xs text-center mb-1" style={{ color: colors.text + '80', fontFamily: font }}><span style={{ color: colors.secondary }}>{t('Before')}:</span> {story.before_state}</p>}
              {story.after_state && <p className="text-xs text-center mb-1" style={{ color: colors.primary, fontFamily: font }}><span className="font-medium">{t('After')}:</span> {story.after_state}</p>}
              {story.testimonial && <p className="text-xs italic text-center mt-2" style={{ color: colors.text + '90', fontFamily: 'Georgia, serif' }}>"{story.testimonial}"</p>}
              {story.timeframe && <p className="text-xs text-center mt-2" style={{ color: colors.primary, fontFamily: font }}>{story.timeframe}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet ───────────────────────────────────────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-8 py-6">
        <div className="text-center py-6" style={{ borderTop: `1px solid ${colors.primary}12`, borderBottom: `1px solid ${colors.primary}12` }}>
          <Gift className="w-7 h-7 mx-auto mb-3" style={{ color: colors.primary }} />
          <h3 className="font-light text-lg mb-2 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs mb-5 leading-relaxed max-w-xs mx-auto" style={{ color: colors.text + '90', fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden shadow-sm"><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="rounded-full px-8" style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none' }}
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Receive Free Gift')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Booking ───────────────────────────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-8 py-6">
      <div className="text-center py-6" style={{ borderTop: `1px solid ${colors.primary}12`, borderBottom: `1px solid ${colors.primary}12` }}>
        <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="font-light text-base mb-1 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + '60', fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-4 leading-relaxed max-w-xs mx-auto" style={{ color: colors.text + '80', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded-full px-8" style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none' }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Single large quote with italic serif feel ────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-8 py-8">
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-2">
                <div className="text-center py-4">
                  {/* Large decorative quote mark */}
                  <span className="text-6xl leading-none block mb-4" style={{ color: colors.primary + '30', fontFamily: 'Georgia, serif' }}>"</span>
                  <p className="text-sm italic leading-loose max-w-sm mx-auto mb-6" style={{ color: colors.text, fontFamily: 'Georgia, serif' }}>
                    {review.review}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3 h-3" fill={s < parseInt(review.rating || 5) ? colors.primary : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.primary : colors.primary + '30' }} />
                    ))}
                  </div>
                  {review.client_photo ? (
                    <img src={review.client_photo} alt="" className="w-12 h-12 rounded-full object-cover mx-auto mb-2" style={{ border: `2px solid ${colors.primary}20` }} />
                  ) : (
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-sm" style={{ backgroundColor: colors.primary + '10', color: colors.secondary }}>{(review.client_name || '?').charAt(0)}</div>
                  )}
                  <p className="text-xs font-medium" style={{ color: colors.secondary, fontFamily: font }}>{review.client_name}</p>
                  {review.client_title && <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>{review.client_title}</p>}
                  {review.result_highlight && <p className="text-xs mt-3" style={{ color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</p>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.secondary : colors.primary + '25' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social ────────────────────────────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-8 py-5">
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full"
              style={{ borderColor: colors.primary + '25', color: colors.secondary, fontFamily: font }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links ─────────────────────────────────────────────────

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-8 py-5">
        <h3 className="text-center font-light text-base mb-4 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Quick Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ borderBottom: `1px solid ${colors.primary}10` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '60', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours ────────────────────────────────────────

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-8 py-5">
        <h3 className="text-center font-light text-base mb-4 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Availability')}</h3>
        <div className="max-w-xs mx-auto">
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between py-2" style={{ borderBottom: `1px solid ${colors.primary}08` }}>
              <span className="capitalize text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '40' : colors.secondary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-8 py-5">
      <div className="text-center py-5" style={{ borderTop: `1px solid ${colors.primary}10`, borderBottom: `1px solid ${colors.primary}10` }}>
        <h3 className="font-light text-base mb-2 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-6" style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none' }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Location ──────────────────────────────────────────────

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-8 py-5">
        <h3 className="text-center font-light text-base mb-3 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Location')}</h3>
        {locationData.map_embed_url && <div className="rounded-2xl overflow-hidden mb-3" style={{ height: '180px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: colors.primary + '30', color: colors.secondary, fontFamily: font }} onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button>}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-8 py-5">
        <div className="text-center py-5" style={{ borderTop: `1px solid ${colors.primary}10`, borderBottom: `1px solid ${colors.primary}10` }}>
          <h3 className="font-light text-base mb-2 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full" style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none' }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Custom HTML ───────────────────────────────────────────

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-8 py-5">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center font-light text-base mb-3 tracking-wide" style={{ color: colors.text, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4" style={{ borderBottom: `2px solid ${colors.primary}15`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ──────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-8 py-5">
        <div className="text-center py-4" style={{ borderTop: `1px solid ${colors.primary}10` }}>
          <h3 className="font-light text-sm mb-2 flex items-center justify-center" style={{ color: colors.text, fontFamily: font }}><Share2 className="w-4 h-4 mr-2" style={{ color: colors.primary }} /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + '80', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full" style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none' }} onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Footer ────────────────────────────────────────────────

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-8 py-4 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '60', fontFamily: 'Georgia, serif' }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-xs" style={{ color: colors.text + '40', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-mindsetcoach h1,
        .coach-tpl-mindsetcoach h2,
        .coach-tpl-mindsetcoach h3,
        .coach-tpl-mindsetcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-mindsetcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px ${colors.primary}10`,
      border: `1px solid ${colors.primary}10`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Zen minimal style */}
      <div className="px-8 py-6 space-y-3">
        <Button className="w-full h-14 font-light rounded-full transition-all hover:scale-[1.02] tracking-wide"
          style={{ background: colors.secondary, color: 'white', fontFamily: font, border: 'none', boxShadow: `0 8px 30px ${colors.secondary}20` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Begin Your Transformation')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: colors.primary + '25', color: colors.secondary, fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-8 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '40', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

