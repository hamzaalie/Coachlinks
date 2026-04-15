/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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
 * FinancialCoachTemplate — WEALTH & TRUST design
 * Deep emerald (#0D4F3C) to black gradient with gold (#D4AF37) geometric grid pattern.
 * Dark green tinted glass cards, gold accent numbers/stats, pricing-table programs,
 * gold gradient buttons with emerald text. Evokes trust, stability, wealth.
 */

interface FinancialCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function FinancialCoachTemplate({ data, template: _template, businessType }: FinancialCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'financial-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#0D4F3C',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#D4AF37',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#1A7A5E',
    background: configSections.colors?.background || '#050F0B',
    text: configSections.colors?.text || '#E8E0D0',
    cardBg: configSections.colors?.cardBg || '#0C1F17',
  };
  const _fontPair = getCoachFonts('financial-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  /* ─── Section Router ──────────────────────────────────────── */

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

  /* ─── Header — Emerald-to-black gradient with gold geometric grid ─── */

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-3xl overflow-hidden" style={{ minHeight: '320px' }}>
      {/* Deep emerald to black gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.primary} 0%, #071A13 50%, #000000 100%)` }} />
      {/* Gold geometric grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={colors.secondary} strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill={colors.secondary} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fin-grid)" />
      </svg>
      {/* Gold diagonal accent line */}
      <div className="absolute top-0 right-0 w-40 h-full opacity-10" style={{ background: `linear-gradient(135deg, transparent 40%, ${colors.secondary} 50%, transparent 60%)` }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(212,175,55,0.15)', color: colors.secondary, backdropFilter: 'blur(10px)', border: `1px solid ${colors.secondary}30`, fontFamily: font }}>
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
        {/* Profile with gold octagon border effect */}
        <div className="relative w-28 h-28 mx-auto mb-5">
          <div className="absolute inset-0 rounded-2xl rotate-45" style={{ border: `2px solid ${colors.secondary}40`, transform: 'rotate(45deg) scale(1.25)' }} />
          <div className="w-28 h-28 rounded-2xl overflow-hidden" style={{ border: `3px solid ${colors.secondary}60` }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}, #000)`, color: colors.secondary, fontFamily: font }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-1 tracking-wide" style={{ color: colors.secondary, fontFamily: font }}>
          {headerData.name || t('Financial Coach')}
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: colors.text + 'AA', fontFamily: font, letterSpacing: '0.2em' }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs max-w-xs mx-auto leading-relaxed" style={{ color: colors.text + '80', fontFamily: font }}>
            {headerData.tagline}
          </p>
        )}
        {/* Gold divider */}
        <div className="w-16 h-px mx-auto mt-5" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
      </div>
    </div>
  );

  /* ─── Contact — Gold-bordered dark glass pills ──────────── */

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-6">
      <div className="grid grid-cols-2 gap-3">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 p-3 rounded-xl transition-all hover:scale-[1.02]"
            style={{ background: `${colors.primary}30`, border: `1px solid ${colors.secondary}20` }}>
            <Mail className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 p-3 rounded-xl transition-all hover:scale-[1.02]"
            style={{ background: `${colors.primary}30`, border: `1px solid ${colors.secondary}20` }}>
            <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl transition-all hover:scale-[1.02]"
            style={{ background: `${colors.primary}30`, border: `1px solid ${colors.secondary}20` }}>
            <Globe className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{t('Website')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center gap-2 p-3 rounded-xl"
            style={{ background: `${colors.primary}30`, border: `1px solid ${colors.secondary}20` }}>
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: colors.secondary }} />
            <span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── About — Dark green glass card with gold accent line ── */

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-5">
        <div className="p-5 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.cardBg}, ${colors.primary}20)`, border: `1px solid ${colors.secondary}15` }}>
          <div className="w-8 h-1 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${colors.secondary}, ${colors.secondary}40)` }} />
          <h3 className="text-base font-semibold mb-3" style={{ color: colors.secondary, fontFamily: font }}>{t('About')}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                <Badge key={i} className="text-xs px-3 py-1 rounded-lg" style={{ background: `${colors.secondary}15`, color: colors.secondary, border: `1px solid ${colors.secondary}25`, fontFamily: font }}>
                  {spec.trim()}
                </Badge>
              ))}
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs px-3 py-1 rounded-lg" style={{ borderColor: colors.accent + '40', color: colors.accent, fontFamily: font }}>
                  <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                </Badge>
              ))}
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${colors.secondary}15` }}>
              <span className="text-3xl font-bold" style={{ color: colors.secondary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs uppercase tracking-wider" style={{ color: colors.text + '80', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${colors.secondary}15` }}>
              <p className="text-sm italic leading-relaxed" style={{ color: colors.secondary + 'CC', fontFamily: font }}>"{aboutData.philosophy}"</p>
            </div>
          )}

          {aboutData.mission && (
            <div className="mt-3">
              <p className="text-xs" style={{ color: colors.text + '90', fontFamily: font }}><strong style={{ color: colors.secondary }}>{t('Mission')}:</strong> {aboutData.mission}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Programs — Pricing table style with 'popular' badge ── */

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center font-semibold text-lg mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Programs')}</h3>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
        <div className="space-y-4">
          {programs.map((prog: any, i: number) => {
            const isPopular = i === Math.floor(programs.length / 2);
            return (
              <div key={i} className="relative p-5 rounded-2xl transition-all hover:scale-[1.01]"
                style={{
                  background: isPopular ? `linear-gradient(135deg, ${colors.primary}60, ${colors.cardBg})` : colors.cardBg,
                  border: `1px solid ${isPopular ? colors.secondary + '50' : colors.secondary + '15'}`,
                  boxShadow: isPopular ? `0 0 30px ${colors.secondary}10` : 'none'
                }}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C' }}>
                    ★ {t('POPULAR')}
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                  {prog.price && (
                    <span className="text-lg font-bold" style={{ color: colors.secondary, fontFamily: font }}>{prog.price}</span>
                  )}
                </div>
                {prog.description && <p className="text-xs leading-relaxed mb-3" style={{ color: colors.text + '90', fontFamily: font }}>{prog.description}</p>}
                <div className="flex items-center gap-3 text-xs" style={{ color: colors.text + '70', fontFamily: font }}>
                  {prog.duration && <span>⏱ {prog.duration}</span>}
                  {prog.format && <span>📋 {prog.format.replace(/-/g, ' ')}</span>}
                </div>
                {prog.enrollment_url && (
                  <Button size="sm" className="w-full mt-4 rounded-xl font-semibold"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
                    onClick={() => typeof window !== 'undefined' && window.open(prog.enrollment_url, '_blank', 'noopener,noreferrer')}>
                    {t('Enroll Now')}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* ─── Signature Offer ────────────────────────────────────── */

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-6 py-6">
        <div className="p-6 rounded-2xl" style={{ background: `linear-gradient(160deg, ${colors.primary}50, ${colors.cardBg})`, border: `1px solid ${colors.secondary}25` }}>
          <Sparkles className="w-6 h-6 mb-3" style={{ color: colors.secondary }} />
          <h3 className="text-lg font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{title}</h3>
          {desc && <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + '90', fontFamily: font }}>{desc}</p>}
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-3">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `${colors.primary}30` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', fontFamily: font }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: colors.text, fontFamily: font }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '70', fontFamily: font }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Results — Large currency-style numbers with gold shimmer ── */

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
      <div className="px-6 py-6">
        <h3 className="text-center font-semibold text-lg mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Results')}</h3>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
                <p className="text-2xl font-bold" style={{ color: colors.secondary, fontFamily: 'Georgia, serif', textShadow: `0 0 20px ${colors.secondary}30` }}>{stat.value}</p>
                <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: colors.text + '70', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}10` }}>
                <p className="text-sm font-semibold mb-1" style={{ color: colors.secondary, fontFamily: font }}>{cs.client_name || cs.company}</p>
                {(cs.challenge || cs.starting_point) && (
                  <p className="text-xs mb-1" style={{ color: colors.text + '80', fontFamily: font }}>
                    <span style={{ color: colors.accent }}>Challenge:</span> {cs.challenge || cs.starting_point}
                  </p>
                )}
                {cs.result && <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>✓ {cs.result}</p>}
                {cs.revenue_impact && (
                  <p className="text-sm font-bold mt-2" style={{ color: colors.secondary, fontFamily: font }}>{cs.revenue_impact}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ─── Transformations ───────────────────────────────────── */

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center font-semibold text-lg mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Transformations')}</h3>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
        <div className="space-y-4">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-5 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
              <p className="text-sm font-semibold mb-3" style={{ color: colors.secondary, fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {story.before_image && <div className="relative rounded-xl overflow-hidden aspect-square"><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-md" style={{ background: '#00000080', color: colors.text }}>{t('Before')}</span></div>}
                  {story.after_image && <div className="relative rounded-xl overflow-hidden aspect-square"><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-md" style={{ background: `${colors.secondary}80`, color: '#000' }}>{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <p className="text-xs mb-1" style={{ color: colors.text + '80', fontFamily: font }}><span style={{ color: '#E57373' }}>Before:</span> {story.before_state}</p>}
              {story.after_state && <p className="text-xs mb-1" style={{ color: colors.text, fontFamily: font }}><span style={{ color: colors.secondary }}>After:</span> {story.after_state}</p>}
              {story.testimonial && <p className="text-xs italic mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <p className="text-xs mt-2" style={{ color: colors.secondary, fontFamily: font }}>⏱ {story.timeframe}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Lead Magnet ───────────────────────────────────────── */

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-6 py-6">
        <div className="p-6 rounded-2xl text-center" style={{ background: `linear-gradient(160deg, ${colors.primary}60, ${colors.cardBg})`, border: `1px solid ${colors.secondary}30` }}>
          <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: colors.secondary }} />
          <h3 className="text-base font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '90', fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden" style={{ border: `2px solid ${colors.secondary}30` }}><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="rounded-xl px-8 font-semibold"
            style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Get Free Guide')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Booking ───────────────────────────────────────────── */

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-6">
      <div className="text-center p-6 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}20` }}>
        <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: colors.secondary }} />
        <h3 className="text-base font-bold mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Book a Strategy Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + '70', fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '90', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded-xl px-8 font-semibold"
          style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  /* ─── Testimonials — Gold quote marks on dark cards ─────── */

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center font-semibold text-lg mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Client Success')}</h3>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${colors.secondary}, transparent)` }} />
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-5 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
                  <span className="text-4xl block mb-2" style={{ color: colors.secondary + '40', fontFamily: 'Georgia, serif' }}>"</span>
                  <p className="text-sm italic leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>{review.review}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? colors.secondary : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.secondary : colors.secondary + '30' }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {review.client_photo ? (
                      <img src={review.client_photo} alt="" className="w-10 h-10 rounded-lg object-cover" style={{ border: `2px solid ${colors.secondary}30` }} />
                    ) : (
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: `${colors.secondary}20`, color: colors.secondary }}>{(review.client_name || '?').charAt(0)}</div>
                    )}
                    <div>
                      <p className="text-xs font-semibold" style={{ color: colors.secondary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <p className="text-xs mt-3 p-2 rounded-lg" style={{ background: `${colors.secondary}10`, color: colors.secondary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</p>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.secondary : colors.secondary + '25' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Social ────────────────────────────────────────────── */

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-xl"
              style={{ borderColor: colors.secondary + '30', color: colors.secondary, fontFamily: font }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Links ─────────────────────────────────────────────── */

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center font-semibold text-base mb-4" style={{ color: colors.secondary, fontFamily: font }}>{t('Resources')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}10` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '60', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Business Hours ────────────────────────────────────── */

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center font-semibold text-base mb-4" style={{ color: colors.secondary, fontFamily: font }}>{t('Office Hours')}</h3>
        <div className="p-4 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}10` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between py-2.5" style={{ borderBottom: i < hours.length - 1 ? `1px solid ${colors.secondary}08` : 'none' }}>
              <span className="capitalize text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-medium" style={{ color: h.is_closed ? colors.text + '40' : colors.secondary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Appointments ──────────────────────────────────────── */

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-5">
      <div className="text-center p-5 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
        <h3 className="font-semibold text-base mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-xl px-6 font-semibold"
          style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  /* ─── Location ──────────────────────────────────────────── */

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center font-semibold text-base mb-3" style={{ color: colors.secondary, fontFamily: font }}>{t('Location')}</h3>
        {locationData.map_embed_url && <div className="rounded-xl overflow-hidden mb-3" style={{ height: '180px', border: `1px solid ${colors.secondary}15` }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-xl" style={{ borderColor: colors.secondary + '30', color: colors.secondary, fontFamily: font }}
            onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  /* ─── Contact Form ──────────────────────────────────────── */

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-5">
        <div className="text-center p-5 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
          <h3 className="font-semibold text-base mb-1" style={{ color: colors.secondary, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-xl font-semibold"
            style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Get in Touch')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Custom HTML ───────────────────────────────────────── */

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-6 py-5">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center font-semibold text-base mb-3" style={{ color: colors.secondary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}10`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  /* ─── QR Share ──────────────────────────────────────────── */

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-6 py-5">
        <div className="text-center p-4 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.secondary}15` }}>
          <h3 className="font-semibold text-sm mb-2 flex items-center justify-center" style={{ color: colors.secondary, fontFamily: font }}>
            <Share2 className="w-4 h-4 mr-2" /> {t('Share')}
          </h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + '80', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-xl font-semibold"
            style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', border: 'none', fontFamily: font }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Footer ────────────────────────────────────────────── */

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-6 py-4 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '60', fontFamily: font }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-xs" style={{ color: colors.text + '40', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  /* ─── Main Render ───────────────────────────────────────── */

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-financialcoach h1,
        .coach-tpl-financialcoach h2,
        .coach-tpl-financialcoach h3,
        .coach-tpl-financialcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-financialcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${colors.secondary}08`,
      border: `1px solid ${colors.secondary}15`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>
        ))}

      {/* CTA Footer — Gold gradient style */}
      <div className="px-6 py-6 space-y-3">
        <Button className="w-full h-14 font-bold rounded-xl uppercase tracking-wider transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${colors.secondary}, #B8941F)`, color: '#0D4F3C', fontFamily: font, border: 'none', boxShadow: `0 8px 30px ${colors.secondary}25` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <BarChart3 className="w-5 h-5 mr-2" /> {t('Start Building Wealth')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-xl"
          style={{ borderColor: colors.secondary + '30', color: colors.secondary, fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '40', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

