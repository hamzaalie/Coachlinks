/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, TrendingUp, Star, Zap, Award, Download, CheckCircle, Share2, QrCode, Gift, Sparkles, BarChart3 } from 'lucide-react';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';
import { getCoachFonts } from './coach-fonts';

/**
 * ParentingCoachTemplate — WARM NURTURING design
 * Soft coral-to-plum gradient, cloud-like decorative shapes, large circular profile,
 * very rounded cards, paper-like texture, family-friendly inviting feel.
 */

interface ParentingCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ParentingCoachTemplate({ data, template: _template, businessType }: ParentingCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'parenting-coach';


  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 4000);
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#E8845C',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#5B3A67',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F9D56E',
    background: configSections.colors?.background || '#FFF9F2',
    text: configSections.colors?.text || '#3D2C3E',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('parenting-coach');
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

  // ─── Header — Warm coral-to-plum gradient with cloud-like shapes, large circle profile ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Main gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }} />

      {/* Cloud-like decorative shapes */}
      <div className="absolute top-6 left-4 w-24 h-24 opacity-[0.12]" style={{ borderRadius: '50%', background: 'white' }} />
      <div className="absolute top-14 left-16 w-16 h-16 opacity-[0.1]" style={{ borderRadius: '50%', background: 'white' }} />
      <div className="absolute top-2 right-8 w-20 h-20 opacity-[0.08]" style={{ borderRadius: '50%', background: 'white' }} />
      <div className="absolute bottom-20 right-2 w-28 h-28 opacity-[0.1]" style={{ borderRadius: '50%', background: 'white' }} />
      <div className="absolute bottom-10 left-8 w-14 h-14 opacity-[0.07]" style={{ borderRadius: '50%', background: 'white' }} />
      <div className="absolute top-24 right-24 w-10 h-10 opacity-[0.12]" style={{ borderRadius: '50%', background: colors.accent }} />
      <div className="absolute bottom-28 left-28 w-8 h-8 opacity-[0.15]" style={{ borderRadius: '50%', background: colors.accent }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontFamily: font }}>
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

      <div className="relative px-6 pt-12 pb-10 flex flex-col items-center text-center">
        {/* Large circular profile with coral border & yellow glow */}
        <div className="relative mb-5">
          <div className="w-32 h-32 rounded-full overflow-hidden" style={{
            border: `4px solid ${colors.primary}`,
            boxShadow: `0 0 30px ${colors.accent}60, 0 8px 32px rgba(0,0,0,0.15)`,
          }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-xl font-bold text-white" style={{ fontFamily: font }}>
          {headerData.name || t('Parenting Coach')}
        </h1>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: colors.accent }} />
          <p className="text-sm font-medium text-white/80" style={{ fontFamily: font }}>
            {headerData.title || ''}
          </p>
          <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: colors.accent }} />
        </div>
        {headerData.tagline && (
          <p className="text-xs text-white/60 mt-2 max-w-xs leading-relaxed" style={{ fontFamily: font }}>{headerData.tagline}</p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Soft rounded pill buttons ───────────────────

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4">
      <div className="flex flex-wrap justify-center gap-2">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
             style={{ backgroundColor: colors.primary + '12', border: `1px solid ${colors.primary}25` }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs font-medium" style={{ color: colors.primary, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
             style={{ backgroundColor: colors.secondary + '12', border: `1px solid ${colors.secondary}25` }}>
            <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs font-medium" style={{ color: colors.secondary, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
             style={{ backgroundColor: colors.accent + '20', border: `1px solid ${colors.accent}40` }}>
            <Globe className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs font-medium" style={{ color: colors.secondary, fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
      </div>
      {contactData.location && (
        <div className="flex items-center justify-center gap-2 mt-3 px-4 py-2 rounded-full mx-auto" style={{ backgroundColor: colors.primary + '08', maxWidth: '280px' }}>
          <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          <span className="text-xs" style={{ color: colors.text + 'BB', fontFamily: font }}>{contactData.location}</span>
        </div>
      )}
    </div>
  );

  // ─── About — Paper-like rounded card with soft shadow ──────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-5 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 4px 20px ${colors.primary}12`, border: `1px solid ${colors.primary}10` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '15' }}>
              <Sparkles className="w-4 h-4" style={{ color: colors.primary }} />
            </div>
            <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>
              {t('About')}
            </h3>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-3">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: colors.primary + '12', color: colors.primary, border: `1px solid ${colors.primary}20`, fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-3">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Certifications')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs px-3 py-1 rounded-full" style={{ borderColor: colors.secondary + '40', color: colors.secondary, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: `1px dashed ${colors.primary}25` }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}30)` }}>
                <span className="text-lg font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              </div>
              <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-4 italic text-xs rounded-2xl" style={{ background: colors.accent + '15', color: colors.text + 'BB', fontFamily: font, borderLeft: `3px solid ${colors.accent}` }}>
              "{aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Stacked cards with playful numbered circles in plum ─────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '15' }}>
            <TrendingUp className="w-4 h-4" style={{ color: colors.secondary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Programs')}</h3>
        </div>
        <div className="space-y-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="flex gap-4 p-4 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, border: `1px solid ${colors.primary}08` }}>
              {/* Playful numbered circle in plum */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                  {prog.price && <span className="text-xs font-bold flex-shrink-0 ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.accent + '30', color: colors.secondary, fontFamily: font }}>{prog.price}</span>}
                </div>
                {prog.description && <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{prog.description}</p>}
                <div className="flex items-center gap-2 mt-2">
                  {prog.format && <Badge className="text-[10px] rounded-full" style={{ backgroundColor: colors.secondary + '10', color: colors.secondary, fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                  {prog.duration && <span className="text-[10px]" style={{ color: colors.text + '80', fontFamily: font }}>{prog.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Warm gradient card with rounded feel ─────

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-6 py-4">
        <div className="p-5 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${colors.secondary}, ${colors.primary})` }}>
          {/* Warm decorative circles */}
          <div className="absolute -top-4 -right-4 w-20 h-20 opacity-[0.1]" style={{ borderRadius: '50%', background: colors.accent }} />
          <div className="absolute bottom-2 left-4 w-12 h-12 opacity-[0.08]" style={{ borderRadius: '50%', background: 'white' }} />

          <div className="relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: colors.accent + '30' }}>
              <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
            </div>
            <h3 className="font-bold text-base text-white mb-1" style={{ fontFamily: font }}>{title}</h3>
            {desc && <p className="text-xs text-white/55 mb-4 leading-relaxed" style={{ fontFamily: font }}>{desc}</p>}
            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="space-y-2">
                {pillars.map((pillar: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ backgroundColor: colors.accent, color: colors.secondary }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white" style={{ fontFamily: font }}>{pillar.name}</p>
                      {pillar.description && <p className="text-xs text-white/45 mt-0.5" style={{ fontFamily: font }}>{pillar.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── Results — Soft stat circles with warm palette ─────────

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
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '15' }}>
            <BarChart3 className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Results')}</h3>
        </div>
        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center p-3 rounded-2xl" style={{ backgroundColor: colors.cardBg, minWidth: '90px', boxShadow: `0 3px 12px ${colors.primary}08`, border: `1px solid ${colors.primary}10` }}>
                <p className="text-xl font-bold" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</p>
                <p className="text-[10px] mt-1" style={{ color: colors.text + '80', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, borderLeft: `3px solid ${colors.accent}` }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold" style={{ color: colors.secondary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.primary, fontFamily: font }}><span className="font-semibold">{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-1" style={{ color: colors.primary, fontFamily: font }}>{cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations — Rounded warm cards ──────────────────

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.accent + '25' }}>
            <Zap className="w-4 h-4" style={{ color: colors.secondary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Transformations')}</h3>
        </div>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-4 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, border: `1px solid ${colors.primary}08` }}>
              <p className="text-sm font-bold mb-2" style={{ color: colors.text, fontFamily: font }}>{story.client_name || `Family ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {story.before_image && (
                    <div className="relative overflow-hidden aspect-square rounded-2xl">
                      <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[10px] rounded-full px-2 py-0.5 text-white" style={{ background: colors.secondary + 'CC' }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative overflow-hidden aspect-square rounded-2xl">
                      <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-[10px] rounded-full px-2 py-0.5 text-white" style={{ background: colors.primary + 'CC' }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              {story.before_state && <div className="p-2.5 text-xs mb-1.5 rounded-xl" style={{ backgroundColor: colors.secondary + '08' }}><span className="font-semibold" style={{ color: colors.secondary }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{story.before_state}</span></div>}
              {story.after_state && <div className="p-2.5 text-xs mb-1.5 rounded-xl" style={{ backgroundColor: colors.primary + '10' }}><span className="font-semibold" style={{ color: colors.primary }}>{t('After')}:</span> <span style={{ color: colors.text }}>{story.after_state}</span></div>}
              {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <Badge className="text-xs mt-2 rounded-full" style={{ backgroundColor: colors.accent + '25', color: colors.secondary, fontFamily: font }}>{story.timeframe}</Badge>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Soft warm CTA card ──────────────────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-5 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${colors.primary}, ${colors.secondary})` }}>
          {/* Decorative circle accents */}
          <div className="absolute -top-6 -right-6 w-24 h-24 opacity-[0.1]" style={{ borderRadius: '50%', background: colors.accent }} />
          <div className="absolute bottom-4 left-2 w-10 h-10 opacity-[0.08]" style={{ borderRadius: '50%', background: 'white' }} />

          <div className="relative">
            <Gift className="w-7 h-7 mb-3" style={{ color: colors.accent }} />
            <h3 className="font-bold text-base text-white mb-2" style={{ fontFamily: font }}>{magnetData.magnet_title}</h3>
            {magnetData.magnet_description && <p className="text-xs text-white/55 mb-4 leading-relaxed" style={{ fontFamily: font }}>{magnetData.magnet_description}</p>}
            {magnetData.magnet_image && <div className="w-28 h-28 mb-4 overflow-hidden rounded-2xl shadow-lg"><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
            <Button className="rounded-full font-semibold" style={{ background: colors.accent, color: colors.secondary, fontFamily: font, border: 'none' }}
              onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
              <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Booking — Soft rounded CTA ────────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-5 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 4px 20px ${colors.primary}12`, border: `1px solid ${colors.primary}10` }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.primary + '15' }}>
          <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
        </div>
        <h3 className="font-bold text-sm mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1 font-medium" style={{ color: colors.primary, fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded-full font-semibold px-8" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Soft coral quote background, rounded carousel ──

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.accent + '25' }}>
            <Star className="w-4 h-4" style={{ color: colors.secondary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Client Testimonials')}</h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-4 rounded-3xl relative overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, border: `1px solid ${colors.primary}08` }}>
                  {/* Soft coral quote background */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06] flex items-center justify-center" style={{ borderRadius: '0 1.5rem 0 50%', background: colors.primary }}>
                    <span className="text-3xl font-bold" style={{ color: colors.primary }}>"</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? colors.accent : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.accent : '#D1D5DB' }} />
                    ))}
                  </div>
                  <p className="text-xs mb-3 italic leading-relaxed relative z-10" style={{ color: colors.text, fontFamily: font }}>"{review.review}"</p>
                  <div className="flex items-center gap-2">
                    {review.client_photo && <img src={review.client_photo} alt="" className="w-8 h-8 rounded-full object-cover" style={{ border: `2px solid ${colors.primary}30` }} />}
                    <div>
                      <p className="text-xs font-bold" style={{ color: colors.secondary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-2 p-2 text-xs rounded-xl" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-1.5">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social — Rounded pill buttons ─────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.secondary, fontFamily: font }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full"
              style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links — Warm rounded link cards ───────────────────────

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3 text-center" style={{ color: colors.secondary, fontFamily: font }}>{t('Quick Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.cardBg, boxShadow: `0 2px 10px ${colors.primary}08`, border: `1px solid ${colors.primary}08` }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '80', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours — Soft alternating rows ────────────────

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '12' }}>
            <Calendar className="w-4 h-4" style={{ color: colors.secondary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Availability')}</h3>
        </div>
        <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${colors.primary}10` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-3" style={{
              backgroundColor: i % 2 === 0 ? colors.cardBg : colors.background,
            }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-medium" style={{ color: h.is_closed ? colors.text + '50' : colors.primary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-5 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 4px 20px ${colors.primary}12`, border: `1px solid ${colors.accent}25` }}>
        <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full font-semibold px-6" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '15' }}>
            <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
          </div>
          <h3 className="font-bold text-sm" style={{ color: colors.secondary, fontFamily: font }}>{t('Location')}</h3>
        </div>
        {locationData.map_embed_url && <div className="overflow-hidden rounded-2xl mb-3" style={{ height: '180px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font }}
            onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-5 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, border: `1px solid ${colors.primary}08` }}>
          <h3 className="font-bold text-sm mb-2" style={{ color: colors.secondary, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full font-semibold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
      <div className="px-6 py-4">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center font-bold text-sm mb-3" style={{ color: colors.secondary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ──────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-4 rounded-3xl" style={{ backgroundColor: colors.cardBg, boxShadow: `0 3px 14px ${colors.primary}10`, border: `1px solid ${colors.primary}08` }}>
          <h3 className="font-bold text-sm mb-2 flex items-center justify-center" style={{ color: colors.secondary, fontFamily: font }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full font-semibold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }} onClick={() => setShowQrModal(true)}>
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
      <div className="px-6 py-3 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '80', fontFamily: font }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-[10px]" style={{ color: colors.text + '55', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-parentingcoach h1,
        .coach-tpl-parentingcoach h2,
        .coach-tpl-parentingcoach h3,
        .coach-tpl-parentingcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-parentingcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 12px 48px ${colors.primary}15, 0 4px 20px rgba(0,0,0,0.06)`,
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

      {/* CTA Footer — Warm nurturing style */}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(145deg, ${colors.primary}, ${colors.secondary})` }}>
        <Button className="w-full h-14 font-bold rounded-full transition-all hover:scale-[1.02]"
          style={{ background: colors.accent, color: colors.secondary, fontFamily: font, border: 'none', boxShadow: `0 8px 25px ${colors.accent}40` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

