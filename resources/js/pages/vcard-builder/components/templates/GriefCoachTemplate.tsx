/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, Star, Zap, Award, Download, CheckCircle, Share2, QrCode, Gift, Sparkles, BarChart3 } from 'lucide-react';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';
import { getCoachFonts } from './coach-fonts';

/**
 * Grief & Loss Recovery Coach Template — "Gentle Dawn" theme.
 * Soft sunrise gradient, delicate watercolor-inspired cards, compassionate healing aesthetic.
 * Lora serif headings, oval profile, generous spacing, dove motifs, warm cream palette.
 */

interface GriefCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

/* Inline SVG dove used as decorative watermark */
const DoveSVG = ({ size = 24, color = '#E8B4B8', opacity = 0.25, className = '' }: { size?: number; color?: string; opacity?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color} opacity={opacity} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M58 12c-2 0-5 1-7 3-1-3-4-5-8-5-5 0-9 4-9 9 0 1 0 2 .3 3C26 22 19 18 14 12c-1 2-2 4-2 6 0 3 2 6 4 8-2 0-3-1-4-2v.2c0 4 3 8 7 9-1 0-2 .2-3 .2-1 0-1 0-2-.1 1 4 5 6 9 6-3 3-8 4-12 4h-2c4 3 10 4 15 4 18 0 28-15 28-28v-1c2-2 3-3 4-5-2 1-3 1-5 2 2-1 3-3 4-5z" />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GriefCoachTemplate({ data, template: _template, businessType }: GriefCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};

  const resolvedType = businessType || data.business_type || 'grief-coach';
  // Load modern Google Fonts
  const _fontPair = getCoachFonts('grief-coach');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);

  // Testimonials carousel state
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  // Language selector state
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);

  const rtlLanguages = ['ar', 'he'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageSelector(false);
    i18n.changeLanguage(langCode);
  };

  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  /* Gentle Dawn palette — twilight blue, dawn pink, golden sunrise, warm cream */
  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#1B2838',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#E8B4B8',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F5D0A9',
    background: configSections.colors?.background || '#FDF8F4',
    text: configSections.colors?.text || '#3A3238',
    cardBg: configSections.colors?.cardBg || '#FEFCF9',
  };

  const serifFont = _fontPair.heading;
  const sansFont = configSections.font || _fontPair.body;

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

  // ─── Header — Sunrise gradient with SVG rays ──────────────

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(180deg, ${colors.primary} 0%, #3B4F6B 30%, ${colors.secondary} 65%, ${colors.accent} 100%)`,
      minHeight: '280px',
      borderRadius: '24px 24px 0 0',
    }}>
      {/* Sunrise rays SVG pattern */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none" style={{ height: '70px', opacity: 0.18 }}>
        {[...Array(9)].map((_, i) => (
          <line key={i} x1={200} y1={80} x2={i * 50} y2={0} stroke={colors.accent} strokeWidth="2" />
        ))}
        <ellipse cx="200" cy="82" rx="180" ry="18" fill={colors.accent} opacity="0.35" />
      </svg>

      {/* Soft glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 right-10 w-40 h-40 rounded-full" style={{ background: colors.secondary, filter: 'blur(70px)', opacity: 0.2 }} />
        <div className="absolute bottom-10 left-8 w-32 h-32 rounded-full" style={{ background: colors.accent, filter: 'blur(60px)', opacity: 0.2 }} />
      </div>

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(12px)', fontFamily: sansFont }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-amber-50 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile — OVAL with golden border & inner glow */}
      <div className="relative px-8 pt-12 pb-10 text-center">
        <div className="mx-auto mb-5 overflow-hidden"
          style={{
            width: '120px', height: '148px', borderRadius: '50%',
            border: `3px solid ${colors.accent}`,
            boxShadow: `0 0 30px ${colors.accent}50, inset 0 0 20px rgba(0,0,0,0.08)`,
          }}>
          {headerData.profile_image ? (
            <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-3xl" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, fontFamily: serifFont }}>
              {(headerData.name || '?').charAt(0)}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white mb-1.5 tracking-wide" style={{ fontFamily: serifFont }}>
          {headerData.name || t('Coach Name')}
        </h1>
        <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: sansFont }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs max-w-[280px] mx-auto leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: serifFont }}>
            "{headerData.tagline}"
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Soft cream pills ───────────────────────────

  const renderContactSection = (contactData: any) => (
    <div className="px-7 py-5">
      <div className="flex flex-wrap justify-center gap-2.5">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <Mail className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <Globe className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Website')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Cream card with dove watermark ───────────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-7 py-5">
        <div className="relative p-6 rounded-[20px] overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <DoveSVG size={80} color={colors.secondary} opacity={0.08} className="absolute top-3 right-3" />
          <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary, fontFamily: serifFont }}>
            {t('About')}
          </h3>
          <p className="text-sm leading-[1.8] mb-4" style={{ color: colors.text, fontFamily: sansFont }}>
            {sanitizeText(aboutData.description)}
          </p>

          {aboutData.specializations && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-full px-3 py-1 border-0"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}25, ${colors.accent}20)`, color: colors.primary, fontFamily: sansFont }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Credentials')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-full px-3 py-1"
                    style={{ borderColor: colors.accent, color: colors.primary, fontFamily: sansFont }}>
                    <Award className="w-3 h-3 mr-1" style={{ color: colors.accent }} /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-8 mt-5">
            {aboutData.experience && (
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: colors.primary, fontFamily: serifFont }}>{aboutData.experience}+</div>
                <p className="text-xs mt-0.5" style={{ color: colors.text + '80', fontFamily: sansFont }}>{t('Years')}</p>
              </div>
            )}
          </div>

          {aboutData.philosophy && (
            <div className="mt-5 p-4 rounded-2xl italic text-sm leading-relaxed text-center" style={{ backgroundColor: colors.accent + '12', color: colors.text, fontFamily: serifFont }}>
              "{aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Left dawn-gradient bar ────────────────────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-center text-lg font-bold mb-5" style={{ color: colors.primary, fontFamily: serifFont }}>
          {t('Programs')}
        </h3>
        <div className="space-y-4">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="flex rounded-[20px] overflow-hidden transition-all hover:shadow-md"
              style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              {/* Dawn gradient left bar */}
              <div className="w-[3px] flex-shrink-0" style={{ background: `linear-gradient(180deg, ${colors.secondary}, ${colors.accent})` }} />
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-sm" style={{ color: colors.primary, fontFamily: serifFont }}>{prog.title}</h4>
                  <div className="flex flex-col items-end gap-1.5">
                    {prog.format && (
                      <Badge className="text-[10px] rounded-full border-0" style={{ background: colors.secondary + '20', color: colors.primary, fontFamily: sansFont }}>
                        {prog.format.replace(/-/g, ' ')}
                      </Badge>
                    )}
                    {prog.price && (
                      <span className="text-xs font-bold" style={{ color: colors.accent, fontFamily: sansFont }}>{prog.price}</span>
                    )}
                  </div>
                </div>
                {prog.description && (
                  <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + 'BB', fontFamily: sansFont }}>{prog.description}</p>
                )}
                {prog.duration && (
                  <span className="text-[11px] px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent + '18', color: colors.text, fontFamily: sansFont }}>
                    {t('Duration')}: {prog.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Top sunrise border + dove watermark ─

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-7 py-5">
        <div className="relative rounded-[20px] overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {/* Sunrise gradient top border */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent}, ${colors.secondary})` }} />
          <DoveSVG size={100} color={colors.secondary} opacity={0.06} className="absolute bottom-4 right-4" />
          <div className="p-6 text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-3" style={{ color: colors.accent }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>{title}</h3>
            {desc && <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{desc}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="px-6 pb-6 space-y-2.5">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl" style={{ backgroundColor: colors.background }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: colors.primary, fontFamily: serifFont }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '90', fontFamily: sansFont }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results — Circular progress indicators ───────────────

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
      <div className="px-7 py-5">
        <h3 className="text-center text-lg font-bold mb-5 flex items-center justify-center gap-2" style={{ color: colors.primary, fontFamily: serifFont }}>
          <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} /> {t('Results')}
        </h3>

        {/* Circular progress indicators */}
        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-5 mb-6">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{
                    background: `conic-gradient(${colors.secondary} 0%, ${colors.accent} 70%, transparent 70%)`,
                    padding: '3px',
                  }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: colors.cardBg }}>
                    <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: serifFont }}>{stat.value}</span>
                  </div>
                </div>
                <p className="text-[10px] max-w-[70px] leading-tight" style={{ color: colors.text + '90', fontFamily: sansFont }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-5 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <p className="text-sm font-bold mb-1.5" style={{ color: colors.primary, fontFamily: serifFont }}>
                  {cs.client_name || cs.company || cs.family_name}
                </p>
                {(cs.challenge || cs.starting_point) && (
                  <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>
                    <span className="font-semibold" style={{ color: colors.secondary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}
                  </p>
                )}
                {cs.result && (
                  <p className="text-xs" style={{ color: colors.primary, fontFamily: sansFont }}>
                    <span className="font-semibold">{t('Result')}:</span> {cs.result}
                  </p>
                )}
                {cs.revenue_impact && (
                  <p className="text-xs font-bold mt-1.5" style={{ color: colors.accent, fontFamily: sansFont }}>{cs.revenue_impact}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations — Gentle before/after cards ──────────

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-lg font-bold mb-5 text-center flex items-center justify-center gap-2" style={{ color: colors.primary, fontFamily: serifFont }}>
          <Zap className="w-5 h-5" style={{ color: colors.accent }} /> {t('Transformations')}
        </h3>
        <div className="space-y-4">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-5 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <p className="text-sm font-bold mb-3" style={{ color: colors.primary, fontFamily: serifFont }}>
                {story.client_name || `${t('Client')} ${i + 1}`}
              </p>

              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {story.before_image && (
                    <div className="relative rounded-2xl overflow-hidden aspect-square">
                      <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-full">{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative rounded-2xl overflow-hidden aspect-square">
                      <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-full">{t('After')}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                {story.before_state && (
                  <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: colors.secondary + '10' }}>
                    <span className="font-semibold" style={{ color: colors.secondary }}>{t('Before')}:</span>{' '}
                    <span style={{ color: colors.text }}>{story.before_state}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: colors.accent + '15' }}>
                    <span className="font-semibold" style={{ color: colors.accent }}>{t('After')}:</span>{' '}
                    <span style={{ color: colors.text }}>{story.after_state}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-xs italic leading-relaxed pt-1" style={{ color: colors.text + 'AA', fontFamily: serifFont }}>"{story.testimonial}"</p>
                )}
                {story.timeframe && (
                  <Badge className="text-[10px] rounded-full border-0 mt-1" style={{ background: colors.secondary + '18', color: colors.primary, fontFamily: sansFont }}>{story.timeframe}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Dashed golden border, candle icon ──────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-7 py-5">
        <div className="p-6 rounded-[20px] text-center" style={{
          backgroundColor: colors.cardBg,
          border: `2px dashed ${colors.accent}80`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {/* Candle / light icon */}
          <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}30, ${colors.secondary}20)` }}>
            <Gift className="w-6 h-6" style={{ color: colors.accent }} />
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>
            {magnetData.magnet_title}
          </h3>
          {magnetData.magnet_description && (
            <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: sansFont }}>
              {magnetData.magnet_description}
            </p>
          )}
          {magnetData.magnet_image && (
            <div className="w-28 h-28 mx-auto mb-5 rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" />
            </div>
          )}
          {magnetData.magnet_url ? (
            <Button className="rounded-full px-7 py-2.5 border-0" style={{
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
            }} onClick={() => typeof window !== 'undefined' && window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer')}>
              <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
            </Button>
          ) : (
            <Button className="rounded-full px-7 py-2.5 border-0" style={{
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
            }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
              <Download className="w-4 h-4 mr-2" /> {t('Claim Your Free Gift')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  // ─── Booking — Rounded soft card ──────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-7 py-5">
      <div className="text-center p-6 rounded-[20px]" style={{
        backgroundColor: colors.cardBg,
        boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px ${colors.secondary}15`,
      }}>
        <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.secondary}30, ${colors.accent}30)` }}>
          <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: colors.primary, fontFamily: serifFont }}>
          {t('Book Your Free Call')}
        </h3>
        {bookingData.call_duration && (
          <p className="text-xs mb-1" style={{ color: colors.text + '88', fontFamily: sansFont }}>{bookingData.call_duration}</p>
        )}
        {bookingData.call_description && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{bookingData.call_description}</p>
        )}
        <Button className="rounded-full px-7 border-0" style={{
          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
        }} onClick={() => {
          if (bookingData.booking_url) {
            if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer');
          } else {
            handleAppointmentBooking(configSections.appointments);
          }
        }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Single card + glow + dove icon ────────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-lg font-bold mb-4 text-center" style={{ color: colors.primary, fontFamily: serifFont }}>
          {t('What Clients Say')}
        </h3>
        <div className="relative">
          {/* Soft glow behind card */}
          <div className="absolute inset-0 rounded-[24px]" style={{ boxShadow: `0 0 50px ${colors.secondary}20`, pointerEvents: 'none' }} />
          <div className="relative overflow-hidden rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div className="flex transition-all duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
              {reviews.map((review: any, i: number) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="p-6 relative">
                    <DoveSVG size={48} color={colors.secondary} opacity={0.12} className="absolute top-4 right-4" />
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4" fill={s < parseInt(review.rating || 5) ? '#F5D0A9' : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? '#F5D0A9' : '#E0D8D0' }} />
                      ))}
                    </div>
                    <p className="text-sm mb-4 italic leading-[1.8]" style={{ color: colors.text, fontFamily: serifFont }}>
                      "{review.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      {review.client_photo && (
                        <img src={review.client_photo} alt="" className="w-9 h-9 rounded-full object-cover" style={{ border: `2px solid ${colors.accent}40` }} />
                      )}
                      <div>
                        <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: serifFont }}>{review.client_name}</p>
                        {review.client_title && <p className="text-[11px]" style={{ color: colors.text + '80', fontFamily: sansFont }}>{review.client_title}</p>}
                      </div>
                    </div>
                    {review.result_highlight && (
                      <div className="mt-3 p-2.5 rounded-xl text-xs" style={{ backgroundColor: colors.accent + '12', color: colors.primary, fontFamily: sansFont }}>
                        <CheckCircle className="w-3 h-3 inline mr-1" style={{ color: colors.accent }} /> {review.result_highlight}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrentReview(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === currentReview % reviews.length ? colors.secondary : colors.secondary + '30',
                    transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)',
                  }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social — Soft oval pills ─────────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="ghost" className="rounded-full px-4"
              style={{ backgroundColor: colors.secondary + '12', color: colors.primary, fontFamily: sansFont }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Quick Links ──────────────────────────────────────────

  const linkIconMap: Record<string, string> = {
    link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵',
    shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️'
  };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Quick Links')}</h3>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:scale-[1.01]"
              style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <span className="text-base flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.primary, fontFamily: sansFont }}>
                  {sanitizeText(item.text) || 'Untitled Link'}
                </p>
                {item.description && (
                  <p className="text-[11px] truncate mt-0.5" style={{ color: colors.text + '70', fontFamily: sansFont }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours ───────────────────────────────────────

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Availability')}</h3>
        <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between px-5 py-2.5" style={{ borderBottom: i < hours.length - 1 ? `1px solid ${colors.accent}15` : 'none' }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.primary, fontFamily: sansFont }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '50' : colors.secondary, fontFamily: sansFont }}>
                {h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ─────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-7 py-5">
      <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <h3 className="font-bold text-base mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-7 border-0" style={{
          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
        }} onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Location ─────────────────────────────────────────────

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: serifFont }}>
          <MapPin className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Location')}
        </h3>
        {locationData.map_embed_url && (
          <div className="rounded-[20px] overflow-hidden mb-3" style={{ height: '180px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
          </div>
        )}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: colors.secondary + '60', color: colors.primary, fontFamily: sansFont }}
            onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  // ─── Contact Form ─────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-7 py-5">
        <div className="text-center p-6 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold text-base mb-2" style={{ color: colors.primary, fontFamily: serifFont }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full px-6 border-0" style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
          }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Custom HTML ──────────────────────────────────────────

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-7 py-5">
        {htmlData.show_title && htmlData.section_title && (
          <h3 className="text-center text-base font-bold mb-3" style={{ color: colors.primary, fontFamily: serifFont }}>{htmlData.section_title}</h3>
        )}
        <div className="p-5 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', fontFamily: sansFont, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ─────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-7 py-5">
        <div className="text-center p-5 rounded-[20px]" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h3 className="font-bold text-sm mb-2 flex items-center justify-center gap-2" style={{ color: colors.primary, fontFamily: serifFont }}>
            <Share2 className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Share')}
          </h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full border-0" style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`, color: colors.primary, fontFamily: sansFont,
          }} onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Footer ───────────────────────────────────────────────

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-7 py-4 text-center">
        {footerData.footer_text && (
          <p className="text-xs italic mb-1" style={{ color: colors.text + '70', fontFamily: serifFont }}>{footerData.footer_text}</p>
        )}
        {footerData.copyright_text && (
          <p className="text-[11px]" style={{ color: colors.text + '50', fontFamily: sansFont }}>{footerData.copyright_text}</p>
        )}
      </div>
    );
  };

  // ─── Main Render ──────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden" style={{
      fontFamily: sansFont,
      backgroundColor: colors.background,
      borderRadius: '28px',
      boxShadow: '0 20px 80px rgba(27,40,56,0.08)',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>

      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — warm pink→gold gradient */}
      <div className="px-7 py-6 space-y-3" style={{ background: `linear-gradient(180deg, transparent, ${colors.secondary}08, ${colors.accent}10)` }}>
        <Button className="w-full h-14 font-bold rounded-full transition-all hover:scale-[1.02] border-0"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
            color: colors.primary, fontFamily: serifFont, fontSize: '15px',
            boxShadow: `0 8px 30px ${colors.secondary}30`,
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: colors.secondary + '40', color: colors.primary, fontFamily: sansFont }}
          onClick={() => {
            const contactData = {
              name: data.name || configSections.header?.name || '',
              title: data.title || configSections.header?.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              location: configSections.contact?.location || ''
            };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-7 pb-5 pt-1">
          {copyrightSection.text && (
            <p className="text-[11px] text-center" style={{ color: colors.text + '45', fontFamily: sansFont }}>{copyrightSection.text}</p>
          )}
        </div>
      )}

      <QRShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        colors={colors}
        font={sansFont}
        socialLinks={configSections.social?.social_links || []}
      />
    </div>
  );
}
