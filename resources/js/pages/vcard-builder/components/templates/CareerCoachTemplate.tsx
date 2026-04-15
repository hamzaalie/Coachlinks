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
 * CareerCoachTemplate — MODERN TECH design
 * Dark charcoal with teal accents, code-editor inspired, terminal-style headers, progress bars, angular.
 */

interface CareerCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CareerCoachTemplate({ data, template: _template, businessType }: CareerCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'career-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#3B82F6',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#0B1324',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F59E0B',
    background: configSections.colors?.background || '#060C1A',
    text: configSections.colors?.text || '#EAF2FF',
    cardBg: configSections.colors?.cardBg || '#111B33',
  };
  const _fontPair = getCoachFonts('career-coach');
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

  // ─── Header — Dark charcoal with teal accent, code-editor monospace title ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '260px', background: colors.secondary }}>
      {/* Scan-line effect */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,180,216,0.1) 2px, rgba(0,180,216,0.1) 4px)' }} />
      {/* Teal glow top-right */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${colors.primary}, transparent)` }} />
      {/* Grid dots */}
      <div className="absolute inset-0 opacity-8" style={{ backgroundImage: `radial-gradient(${colors.primary}20 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(0,180,216,0.15)', color: colors.primary, backdropFilter: 'blur(10px)', border: `1px solid ${colors.primary}30`, fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]" style={{ backgroundColor: colors.secondary, borderColor: colors.primary + '30' }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs flex items-center space-x-2 transition-colors`}
                    style={{ color: currentLanguage === lang.code ? colors.primary : colors.text + 'AA' }}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative px-6 py-10">
        {/* Terminal-style top bar */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
          <span className="text-xs ml-3" style={{ color: colors.text + '40', fontFamily: font }}>~/career-profile</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ border: `2px solid ${colors.primary}`, borderRadius: '8px' }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ background: `${colors.primary}20`, color: colors.primary }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: colors.primary, fontFamily: font }}>
              <span style={{ color: colors.accent }}>$</span> whoami
            </p>
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: font }}>
              {headerData.name || t('Career Coach')}
            </h1>
            <p className="text-xs mb-1" style={{ color: colors.primary + 'CC', fontFamily: font }}>
              {headerData.title || ''}
            </p>
            {headerData.tagline && (
              <p className="text-xs mt-1" style={{ color: colors.text + '60', fontFamily: font }}>
                <span style={{ color: colors.accent }}>// </span>{headerData.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Contact — Tech-style inline buttons ───────────────────

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-4">
      <div className="flex flex-wrap gap-2">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 px-3 py-2 transition-all hover:scale-105"
             style={{ backgroundColor: colors.primary + '10', border: `1px solid ${colors.primary}30`, borderRadius: '4px' }}>
            <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 px-3 py-2 transition-all hover:scale-105"
             style={{ backgroundColor: colors.accent + '10', border: `1px solid ${colors.accent}30`, borderRadius: '4px' }}>
            <Phone className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-3 py-2 transition-all hover:scale-105"
             style={{ backgroundColor: colors.primary + '10', border: `1px solid ${colors.primary}30`, borderRadius: '4px' }}>
            <Globe className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
      </div>
      {contactData.location && (
        <div className="flex items-center gap-2 mt-2 px-3 py-2" style={{ borderLeft: `2px solid ${colors.primary}`, backgroundColor: colors.cardBg }}>
          <MapPin className="w-3 h-3" style={{ color: colors.primary }} />
          <span className="text-xs" style={{ color: colors.text + 'D1', fontFamily: font }}>{contactData.location}</span>
        </div>
      )}
    </div>
  );

  // ─── About — Dark mode card with teal left border ──────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-5" style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderRadius: '4px' }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
            <span style={{ color: colors.accent }}>&gt;</span> {t('about.md')}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-3">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('tech_stack')}:</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-2.5 py-0.5" style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30`, borderRadius: '3px', fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-3">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.accent, fontFamily: font }}>{t('certifications')}:</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs px-2.5 py-0.5" style={{ borderColor: colors.accent + '50', color: colors.accent, borderRadius: '3px', fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 p-3" style={{ backgroundColor: colors.primary + '08', borderRadius: '4px' }}>
              <span className="text-2xl font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>{t('years_experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-3 text-xs italic" style={{ borderLeft: `2px solid ${colors.accent}30`, color: colors.text + 'AA', fontFamily: font }}>
              <span style={{ color: colors.accent }}>/*</span> {aboutData.philosophy} <span style={{ color: colors.accent }}>*/</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Terminal-style card headers with > prompt ──

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-4 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <TrendingUp className="w-4 h-4 mr-2" /> <span style={{ color: colors.accent }}>&gt;</span> {t('programs.list()')}
        </h3>
        <div className="space-y-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderRadius: '4px' }}>
              {/* Terminal-style header bar */}
              <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${colors.primary}15` }}>
                <span className="text-xs" style={{ color: colors.accent, fontFamily: font }}>&gt; {prog.title}</span>
                {prog.price && <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{prog.price}</span>}
              </div>
              <div className="px-4 py-3">
                {prog.description && <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{prog.description}</p>}
                <div className="flex items-center gap-2 flex-wrap">
                  {prog.format && <Badge className="text-xs" style={{ backgroundColor: colors.primary + '15', color: colors.primary, borderRadius: '3px', fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                  {prog.duration && <span className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>[{prog.duration}]</span>}
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
      <div className="px-6 py-4">
        <div className="p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}20`, borderRadius: '4px' }}>
          <Sparkles className="w-5 h-5 mb-2" style={{ color: colors.primary }} />
          <h3 className="font-bold text-base text-white mb-1" style={{ fontFamily: font }}>{title}</h3>
          {desc && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{desc}</p>}
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-2">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3" style={{ backgroundColor: colors.primary + '08', borderRadius: '4px', borderLeft: `2px solid ${colors.primary}` }}>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: colors.accent, fontFamily: font }}>[{i}]</span>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: font }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results — Progress bar style with animated fill ───────

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
        <h3 className="font-bold text-sm mb-4 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <BarChart3 className="w-4 h-4 mr-2" /> <span style={{ color: colors.accent }}>&gt;</span> {t('metrics.output')}
        </h3>
        {stats.length > 0 && (
          <div className="space-y-3 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{stat.label}</span>
                  <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5" style={{ backgroundColor: colors.primary + '15', borderRadius: '2px' }}>
                  <div className="h-full transition-all duration-1000" style={{
                    width: `${Math.min(65 + (i * 8), 95)}%`,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${colors.primary}40`
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4" style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.accent}`, borderRadius: '4px' }}>
                <p className="text-sm font-bold mb-1 text-white" style={{ fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + '80', fontFamily: font }}><span className="font-semibold" style={{ color: colors.primary }}>{t('input')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.accent, fontFamily: font }}><span className="font-semibold">{t('output')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-1" style={{ color: colors.primary, fontFamily: font }}>{cs.revenue_impact}</p>}
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-4 flex items-center" style={{ color: colors.primary, fontFamily: font }}>
          <Zap className="w-4 h-4 mr-2" /> <span style={{ color: colors.accent }}>&gt;</span> {t('diff_log')}
        </h3>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-4" style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderRadius: '4px' }}>
              <p className="text-sm font-bold mb-2 text-white" style={{ fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {story.before_image && <div className="relative overflow-hidden aspect-square" style={{ borderRadius: '4px' }}><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5" style={{ backgroundColor: '#FF5F57', color: '#fff', borderRadius: '2px' }}>{t('Before')}</span></div>}
                  {story.after_image && <div className="relative overflow-hidden aspect-square" style={{ borderRadius: '4px' }}><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5" style={{ backgroundColor: '#28C840', color: '#fff', borderRadius: '2px' }}>{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <div className="p-2 text-xs mb-1" style={{ backgroundColor: '#FF5F5710', borderRadius: '3px' }}><span className="font-semibold" style={{ color: '#FF5F57' }}>- </span><span style={{ color: colors.text }}>{story.before_state}</span></div>}
              {story.after_state && <div className="p-2 text-xs mb-1" style={{ backgroundColor: '#28C84010', borderRadius: '3px' }}><span className="font-semibold" style={{ color: '#28C840' }}>+ </span><span style={{ color: colors.text }}>{story.after_state}</span></div>}
              {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + '80', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <Badge className="text-xs mt-2" style={{ backgroundColor: colors.primary + '15', color: colors.primary, borderRadius: '3px', fontFamily: font }}>{story.timeframe}</Badge>}
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
      <div className="px-6 py-4">
        <div className="p-5" style={{ backgroundColor: colors.cardBg, border: `1px dashed ${colors.primary}40`, borderRadius: '4px' }}>
          <Gift className="w-7 h-7 mb-3" style={{ color: colors.accent }} />
          <h3 className="font-bold text-base text-white mb-2" style={{ fontFamily: font }}>{magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'D1', fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-28 h-28 mb-4 overflow-hidden" style={{ borderRadius: '4px', border: `1px solid ${colors.primary}30` }}><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px' }} className="px-6 font-bold"
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Download Free')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Booking ───────────────────────────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-5" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}25`, borderRadius: '4px' }}>
        <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="font-bold text-sm mb-1 text-white" style={{ fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}>[{bookingData.call_duration}]</p>}
        {bookingData.call_description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'D1', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px' }} className="px-8 font-bold"
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials ──────────────────────────────────────────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>
          <span style={{ color: colors.accent }}>&gt;</span> {t('reviews.log')}
        </h3>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-4" style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderRadius: '4px' }}>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3 h-3" fill={s < parseInt(review.rating || 5) ? colors.primary : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.primary : colors.text + '30' }} />
                    ))}
                  </div>
                  <p className="text-xs mb-3 italic leading-relaxed" style={{ color: colors.text, fontFamily: font }}>"{review.review}"</p>
                  <div className="flex items-center gap-2">
                    {review.client_photo && <img src={review.client_photo} alt="" className="w-7 h-7 object-cover" style={{ borderRadius: '4px' }} />}
                    <div>
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-2 p-2 text-xs" style={{ backgroundColor: colors.accent + '10', color: colors.accent, fontFamily: font, borderRadius: '3px' }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-1.5">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2 h-2 transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25', borderRadius: '2px' }} />
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}><span style={{ color: colors.accent }}>&gt;</span> {t('social.links')}</h3>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font, borderRadius: '4px' }}
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}><span style={{ color: colors.accent }}>&gt;</span> {t('quick_links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, borderLeft: `3px solid ${colors.primary}`, borderRadius: '4px' }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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
      <div className="px-6 py-4">
        <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}><span style={{ color: colors.accent }}>&gt;</span> {t('schedule')}</h3>
        <div style={{ backgroundColor: colors.cardBg, borderRadius: '4px', border: `1px solid ${colors.primary}15` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-2.5" style={{ borderBottom: i < 6 ? `1px solid ${colors.primary}08` : 'none' }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '80' : colors.primary, fontFamily: font }}>{h.is_closed ? t('offline') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-5" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}20`, borderRadius: '4px' }}>
        <h3 className="font-bold text-sm mb-2 text-white" style={{ fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-3" style={{ color: colors.text + 'D1', fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px' }} className="px-6 font-bold"
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
        <h3 className="font-bold text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: font }}><MapPin className="w-4 h-4 mr-2" /> {t('Location')}</h3>
        {locationData.map_embed_url && <div className="overflow-hidden mb-3" style={{ height: '180px', borderRadius: '4px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && <Button size="sm" variant="outline" className="w-full" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font, borderRadius: '4px' }} onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button>}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}20`, borderRadius: '4px' }}>
          <h3 className="font-bold text-sm mb-2 text-white" style={{ fontFamily: font }}>{formData.form_title}</h3>
            {formData.form_subtitle && <p className="text-xs mb-3" style={{ color: colors.text + 'D1', fontFamily: font }}>{formData.form_subtitle}</p>}
            <Button size="sm" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px' }} className="font-bold"
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
        {htmlData.show_title && htmlData.section_title && <h3 className="font-bold text-sm mb-3" style={{ color: colors.primary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, borderRadius: '4px', fontFamily: font, color: colors.text }}>
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
        <div className="text-center p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, borderRadius: '4px' }}>
          <h3 className="font-bold text-sm mb-2 flex items-center justify-center" style={{ color: colors.primary, fontFamily: font }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'D1', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px' }} onClick={() => setShowQrModal(true)}>
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
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '50', fontFamily: font }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-xs" style={{ color: colors.text + '30', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-careercoach h1,
        .coach-tpl-careercoach h2,
        .coach-tpl-careercoach h3,
        .coach-tpl-careercoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-careercoach overflow-hidden" style={{
      fontFamily: font,
      background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.secondary} 100%)`,
      boxShadow: `0 20px 60px rgba(6,12,26,0.55), 0 0 0 1px ${colors.primary}25`,
      borderRadius: '8px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Tech style */}
      <div className="p-5 space-y-3" style={{ borderTop: `1px solid ${colors.primary}15` }}>
        <Button className="w-full h-14 font-bold transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#FFFFFF', fontFamily: font, border: 'none', borderRadius: '4px', boxShadow: `0 0 30px ${colors.primary}30` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Launch Your Career')}
        </Button>
        <Button size="sm" variant="outline" className="w-full"
          style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font, borderRadius: '4px' }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '30', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

