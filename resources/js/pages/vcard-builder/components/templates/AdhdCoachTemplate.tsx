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
 * AdhdCoachTemplate — VIBRANT FOCUS design
 * Organized chaos, bright but structured, neurodivergent-friendly with colorful scattered dots,
 * multi-colored borders, and energetic visual language.
 */

interface AdhdCoachTemplateProps { data: Record<string, any>; template: Record<string, any>; businessType?: string; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdhdCoachTemplate({ data, template: _template, businessType }: AdhdCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'adhd-coach';

  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => { const reviews = configSections.testimonials?.reviews || []; if (!Array.isArray(reviews) || reviews.length <= 1) return; const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 4000); return () => clearInterval(interval); }, [configSections.testimonials?.reviews]);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const rtlLanguages = ['ar', 'he']; const isRTL = rtlLanguages.includes(currentLanguage);
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };
  const templateDef = getBusinessTemplate(resolvedType); const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#6366F1',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#EC4899',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#10B981',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#FAFBFF',
    text: configSections.colors?.text || templateTheme.textColor || '#312E81',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('adhd-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  // Color cycling helper for alternating accents
  const colorCycle = [colors.primary, colors.secondary, colors.accent];
  const getColor = (i: number) => colorCycle[i % 3];

  // ─── Section Router ─────────────────────────────────────────
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

  // ─── HEADER — Indigo gradient with scattered colorful dots ──
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: 310 }}>
      {/* Indigo gradient base */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, #4F46E5, ${colors.primary}DD)` }} />

      {/* Scattered colorful dots — neural connection / colorful sparks */}
      <div className="absolute w-3 h-3 rounded-full" style={{ background: colors.secondary, top: '12%', left: '8%', opacity: 0.7 }} />
      <div className="absolute w-5 h-5 rounded-full" style={{ background: colors.accent, top: '20%', right: '15%', opacity: 0.5 }} />
      <div className="absolute w-2 h-2 rounded-full" style={{ background: '#FBBF24', top: '35%', left: '18%', opacity: 0.6 }} />
      <div className="absolute w-4 h-4 rounded-full" style={{ background: colors.secondary, top: '8%', right: '30%', opacity: 0.4 }} />
      <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: '#38BDF8', bottom: '30%', left: '12%', opacity: 0.5 }} />
      <div className="absolute w-6 h-6 rounded-full" style={{ background: '#FBBF24', top: '55%', right: '8%', opacity: 0.3 }} />
      <div className="absolute w-3 h-3 rounded-full" style={{ background: colors.accent, top: '15%', left: '50%', opacity: 0.5 }} />
      <div className="absolute w-2 h-2 rounded-full" style={{ background: colors.secondary, bottom: '25%', right: '25%', opacity: 0.6 }} />
      <div className="absolute w-4 h-4 rounded-full" style={{ background: '#38BDF8', top: '45%', left: '35%', opacity: 0.3 }} />
      <div className="absolute w-3 h-3 rounded-full" style={{ background: '#FBBF24', bottom: '35%', left: '65%', opacity: 0.4 }} />
      <div className="absolute w-2 h-2 rounded-full" style={{ background: colors.accent, top: '70%', right: '45%', opacity: 0.5 }} />
      <div className="absolute w-5 h-5 rounded-full" style={{ background: colors.secondary, bottom: '20%', right: '60%', opacity: 0.25 }} />

      {/* Subtle grid pattern for structure */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}><div className="relative">
          <button onClick={() => setShowLanguageSelector(!showLanguageSelector)} className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontFamily: font }}>
            <Globe className="w-3 h-3" /><span>{languageData.find(l => l.code === currentLanguage)?.name || 'EN'}</span>
          </button>
          {showLanguageSelector && (
            <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
              {languageData.map(lang => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                  <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0)))}</span><span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div></div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center pt-12 pb-10 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5 relative">
            <div className="absolute -inset-2 rounded-full" style={{ background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`, filter: 'blur(6px)', opacity: 0.6 }} />
            <img src={sanitizeUrl(sectionData.profile_image)} alt={sanitizeText(sectionData.name || '')}
              className="relative w-28 h-28 rounded-full object-cover"
              style={{ border: '4px solid white', boxShadow: `0 0 0 3px ${colors.primary}, 0 0 0 6px ${colors.secondary}, 0 0 0 9px ${colors.accent}` }} />
          </div>
        )}
        <h1 className="text-3xl font-black tracking-tight text-white mb-2" style={{ fontFamily: font }}>{sanitizeText(sectionData.name || '')}</h1>
        {sectionData.title && <p className="text-base font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: font }}>{sanitizeText(sectionData.title)}</p>}
        {sectionData.tagline && (
          <p className="text-sm px-4 py-1.5 rounded-full inline-block mt-1 font-semibold" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)', fontFamily: font }}>
            ⚡ {sanitizeText(sectionData.tagline)}
          </p>
        )}
      </div>
    </div>
  );

  // ─── CONTACT — Cards with alternating colored left borders ──
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="grid grid-cols-2 gap-3">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`} className="flex items-center gap-2.5 p-3 rounded-2xl transition-all hover:scale-[1.03] hover:shadow-md" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}` }}>
            <Mail className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />
            <span className="text-xs truncate font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`} className="flex items-center gap-2.5 p-3 rounded-2xl transition-all hover:scale-[1.03] hover:shadow-md" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.secondary}` }}>
            <Phone className="w-4 h-4 shrink-0" style={{ color: colors.secondary }} />
            <span className="text-xs truncate font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-3 rounded-2xl transition-all hover:scale-[1.03] hover:shadow-md" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.accent}` }}>
            <Globe className="w-4 h-4 shrink-0" style={{ color: colors.accent }} />
            <span className="text-xs truncate font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}` }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />
            <span className="text-xs truncate font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── ABOUT — Multi-colored badges for specializations ───────
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const badgeColors = [colors.primary, colors.secondary, colors.accent, '#FBBF24', '#38BDF8', '#F43F5E'];
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Sparkles className="w-5 h-5" style={{ color: colors.secondary }} /> {t('About Me')}
        </h2>
        {sectionData.description && (
          <p className="text-sm leading-relaxed mb-4 p-4 rounded-2xl" style={{ color: colors.text + 'CC', fontFamily: font, background: colors.cardBg, borderLeft: `4px solid ${colors.primary}` }}>
            {sanitizeText(sectionData.description)}
          </p>
        )}
        {/* Multi-colored specialization badges */}
        {specializations.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {specializations.map((spec: string, i: number) => (
              <Badge key={i} className="px-3 py-1.5 text-xs font-bold rounded-full border-0 transition-transform hover:scale-110"
                style={{ background: badgeColors[i % badgeColors.length] + '18', color: badgeColors[i % badgeColors.length], fontFamily: font }}>
                {sanitizeText(spec)}
              </Badge>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div className="space-y-2 mb-4">
            {certifications.map((cert: string, i: number) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: `${getColor(i)}08` }}>
                <Award className="w-4 h-4" style={{ color: getColor(i) }} />
                <span className="text-xs font-medium" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(cert)}</span>
              </div>
            ))}
          </div>
        )}
        {sectionData.experience && (
          <div className="flex items-center gap-2 mb-3 p-3 rounded-xl" style={{ background: `${colors.accent}10` }}>
            <span className="text-xl font-black" style={{ color: colors.accent }}>{sanitizeText(sectionData.experience)}</span>
            <span className="text-xs font-medium" style={{ color: colors.text + '80', fontFamily: font }}>{t('of experience')}</span>
          </div>
        )}
        {sectionData.philosophy && (
          <div className="p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary}06, ${colors.secondary}06)`, borderLeft: `4px solid ${colors.secondary}` }}>
            <p className="text-xs italic" style={{ color: colors.text + 'AA', fontFamily: font }}>💡 "{sanitizeText(sectionData.philosophy)}"</p>
          </div>
        )}
      </div>
    );
  };

  // ─── PROGRAMS — Cards with colored dot indicators ───────────
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <TrendingUp className="w-5 h-5" style={{ color: colors.primary }} /> {t('Programs')}
        </h2>
        <div className="space-y-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="p-4 rounded-2xl transition-all hover:shadow-lg hover:scale-[1.01]"
              style={{ background: colors.cardBg, borderLeft: `4px solid ${getColor(i)}` }}>
              <div className="flex items-start gap-3">
                {/* Colored dot indicator */}
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: getColor(i), boxShadow: `0 0 8px ${getColor(i)}50` }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(prog.title)}</h3>
                    {prog.price && <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: `${getColor(i)}15`, color: getColor(i), fontFamily: font }}>{prog.price}</span>}
                  </div>
                  {prog.description && <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(prog.description)}</p>}
                  <div className="flex items-center gap-2 flex-wrap">
                    {prog.format && <Badge className="text-xs border-0 rounded-full" style={{ background: `${getColor(i)}12`, color: getColor(i), fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                    {prog.duration && <span className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>⏱ {prog.duration}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── SIGNATURE OFFER ────────────────────────────────────────
  const renderSignatureOfferSection = (sectionData: any) => {
    if (!sectionData.framework_name && !sectionData.offer_title) return null;
    const title = sectionData.framework_name || sectionData.offer_title;
    const desc = sectionData.framework_description || sectionData.offer_description;
    const pillars = sectionData.pillars || [];
    return (
      <div className="px-5 py-5">
        <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: colors.cardBg, border: `2px solid ${colors.primary}20` }}>
          {/* Decorative scattered dots in corner */}
          <div className="absolute w-2 h-2 rounded-full" style={{ background: colors.secondary, top: '8px', right: '12px', opacity: 0.4 }} />
          <div className="absolute w-3 h-3 rounded-full" style={{ background: colors.accent, top: '16px', right: '28px', opacity: 0.3 }} />
          <div className="absolute w-1.5 h-1.5 rounded-full" style={{ background: '#FBBF24', top: '24px', right: '10px', opacity: 0.5 }} />
          <Zap className="w-6 h-6 mb-3" style={{ color: colors.secondary }} />
          <h3 className="font-black text-base mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(title)}</h3>
          {desc && <p className="text-xs leading-relaxed mb-4" style={{ color: colors.text + '90', fontFamily: font }}>{sanitizeText(desc)}</p>}
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-2.5">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: `${getColor(i)}08`, borderLeft: `3px solid ${getColor(i)}` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: getColor(i) }}>{i + 1}</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(pillar.name)}</p>
                    {pillar.description && <p className="text-xs mt-1" style={{ color: colors.text + '70', fontFamily: font }}>{sanitizeText(pillar.description)}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── RESULTS — Stats in colored pill shapes ─────────────────
  const renderResultsSection = (sectionData: any) => {
    const stats: { label: string; value: string }[] = [];
    const ignoreKeys = ['case_studies', 'enabled'];
    Object.entries(sectionData).forEach(([key, val]) => {
      if (val && typeof val === 'string' && !ignoreKeys.includes(key)) {
        stats.push({ label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: val as string });
      }
    });
    const caseStudies = sectionData.case_studies || [];
    if (stats.length === 0 && caseStudies.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} /> {t('Results')}
        </h2>
        {/* Colored pill-shaped stats */}
        {stats.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="px-4 py-2.5 rounded-full text-center" style={{ background: `${getColor(i)}12`, border: `1px solid ${getColor(i)}25` }}>
                <span className="text-base font-black" style={{ color: getColor(i), fontFamily: font }}>{stat.value}</span>
                <span className="text-xs ml-1.5 font-medium" style={{ color: colors.text + '80', fontFamily: font }}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `4px solid ${getColor(i)}` }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + '90', fontFamily: font }}><span className="font-bold" style={{ color: colors.primary }}>{t('Challenge')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.accent, fontFamily: font }}><span className="font-bold">{t('Win')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-black mt-1" style={{ color: colors.secondary, fontFamily: font }}>🎉 {cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── TRANSFORMATIONS ────────────────────────────────────────
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Zap className="w-5 h-5" style={{ color: colors.secondary }} /> {t('Transformations')}
        </h2>
        <div className="space-y-4">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-4 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `4px solid ${getColor(i)}` }}>
              <p className="text-sm font-bold mb-3" style={{ color: colors.text, fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {story.before_image && <div className="relative overflow-hidden aspect-square rounded-xl"><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${colors.primary}DD`, color: '#fff' }}>{t('Before')}</span></div>}
                  {story.after_image && <div className="relative overflow-hidden aspect-square rounded-xl"><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${colors.accent}DD`, color: '#fff' }}>{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <div className="p-2.5 rounded-xl text-xs mb-2" style={{ background: `${colors.primary}08`, borderLeft: `3px solid ${colors.primary}` }}><span className="font-bold" style={{ color: colors.primary }}>😵‍💫 Before: </span><span style={{ color: colors.text + 'AA' }}>{story.before_state}</span></div>}
              {story.after_state && <div className="p-2.5 rounded-xl text-xs mb-2" style={{ background: `${colors.accent}08`, borderLeft: `3px solid ${colors.accent}` }}><span className="font-bold" style={{ color: colors.accent }}>🚀 After: </span><span style={{ color: colors.text + 'AA' }}>{story.after_state}</span></div>}
              {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + '80', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <Badge className="text-xs mt-2 border-0 rounded-full" style={{ background: `${getColor(i)}15`, color: getColor(i), fontFamily: font }}>⏰ {story.timeframe}</Badge>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── LEAD MAGNET ────────────────────────────────────────────
  const renderLeadMagnetSection = (sectionData: any) => {
    if (!sectionData.magnet_title) return null;
    return (
      <div className="px-5 py-5">
        <div className="p-5 rounded-2xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08, ${colors.accent}08)`, border: `2px dashed ${colors.secondary}40` }}>
          {/* Scattered dot accents */}
          <div className="absolute w-2 h-2 rounded-full" style={{ background: colors.accent, top: '10px', right: '16px', opacity: 0.4 }} />
          <div className="absolute w-3 h-3 rounded-full" style={{ background: '#FBBF24', bottom: '14px', right: '20px', opacity: 0.3 }} />
          <Gift className="w-7 h-7 mb-3" style={{ color: colors.secondary }} />
          <h3 className="font-black text-base mb-2" style={{ color: colors.text, fontFamily: font }}>🎁 {sanitizeText(sectionData.magnet_title)}</h3>
          {sectionData.magnet_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '90', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>}
          {sectionData.magnet_image && <div className="w-full h-32 mb-4 overflow-hidden rounded-xl"><img src={sectionData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="px-6 font-bold rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none' }}
            onClick={() => { if (sectionData.magnet_url) { if (typeof window !== 'undefined') window.open(sectionData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Download Free')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── BOOKING ────────────────────────────────────────────────
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="text-center p-6 rounded-2xl relative overflow-hidden" style={{ background: colors.cardBg, border: `2px solid ${colors.primary}20` }}>
        {/* Tiny decorative dots */}
        <div className="absolute w-2 h-2 rounded-full" style={{ background: colors.secondary, top: '8px', left: '12px', opacity: 0.4 }} />
        <div className="absolute w-1.5 h-1.5 rounded-full" style={{ background: colors.accent, top: '14px', left: '28px', opacity: 0.3 }} />
        <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}15)` }}>
          <Calendar className="w-7 h-7" style={{ color: colors.primary }} />
        </div>
        <h3 className="font-black text-base mb-1" style={{ color: colors.text, fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {sectionData.call_duration && <p className="text-xs mb-1 font-bold" style={{ color: colors.secondary, fontFamily: font }}>⏱ {sectionData.call_duration}</p>}
        {sectionData.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '80', fontFamily: font }}>{sectionData.call_description}</p>}
        <Button className="px-8 font-bold rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none' }}
          onClick={() => { if (sectionData.booking_url) { if (typeof window !== 'undefined') window.open(sectionData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── TESTIMONIALS ───────────────────────────────────────────
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Star className="w-5 h-5" style={{ color: '#FBBF24' }} /> {t('Testimonials')}
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-5 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `4px solid ${getColor(i)}` }}>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? '#FBBF24' : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? '#FBBF24' : colors.text + '25' }} />
                    ))}
                  </div>
                  <p className="text-xs italic leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>"{review.review}"</p>
                  <div className="flex items-center gap-3">
                    {review.client_photo && <img src={review.client_photo} alt="" className="w-9 h-9 rounded-full object-cover" style={{ border: `2px solid ${getColor(i)}30` }} />}
                    <div>
                      <p className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-3 p-2.5 rounded-xl text-xs flex items-center gap-2" style={{ background: `${colors.accent}10`, color: colors.accent, fontFamily: font }}><CheckCircle className="w-3 h-3" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ backgroundColor: i === currentReview % reviews.length ? getColor(i) : colors.text + '20', transform: i === currentReview % reviews.length ? 'scale(1.4)' : 'scale(1)' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── SOCIAL ─────────────────────────────────────────────────
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Share2 className="w-5 h-5" style={{ color: colors.primary }} /> {t('Connect')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full transition-all hover:scale-110"
              style={{ borderColor: getColor(i) + '50', color: getColor(i), fontFamily: font, borderWidth: '2px' }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize font-bold">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── LINKS ──────────────────────────────────────────────────
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Globe className="w-5 h-5" style={{ color: colors.accent }} /> {t('Quick Links')}
        </h2>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer"
              style={{ background: colors.cardBg, borderLeft: `4px solid ${getColor(i)}` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '60', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: getColor(i) }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── BUSINESS HOURS ─────────────────────────────────────────
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <Calendar className="w-5 h-5" style={{ color: colors.primary }} /> {t('Availability')}
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between items-center px-4 py-3" style={{ borderBottom: i < Math.min(hours.length, 7) - 1 ? `1px solid ${colors.primary}08` : 'none', borderLeft: `3px solid ${h.is_closed ? colors.text + '15' : getColor(i)}` }}>
              <span className="capitalize text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-medium" style={{ color: h.is_closed ? colors.text + '40' : getColor(i), fontFamily: font }}>
                {h.is_closed ? '😴 ' + t('Closed') : `${h.open_time} – ${h.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── APPOINTMENTS ───────────────────────────────────────────
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="text-center p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`, border: `2px solid ${colors.primary}15` }}>
        <h3 className="font-black text-base mb-2" style={{ color: colors.text, fontFamily: font }}>📅 {t('Book a Session')}</h3>
        {sectionData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{sectionData.consultation_info}</p>}
        <Button size="sm" className="px-6 font-bold rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none' }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ─── GOOGLE MAP ─────────────────────────────────────────────
  const renderLocationSection = (sectionData: any) => {
    if (!sectionData.map_embed_url && !sectionData.directions_url) return null;
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}>
          <MapPin className="w-5 h-5" style={{ color: colors.secondary }} /> {t('Location')}
        </h2>
        {sectionData.map_embed_url && (
          <div className="overflow-hidden mb-3 rounded-2xl" style={{ height: '180px', border: `2px solid ${colors.primary}15` }}>
            <div dangerouslySetInnerHTML={{ __html: sectionData.map_embed_url }} className="w-full h-full" />
          </div>
        )}
        {sectionData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font, borderWidth: '2px' }}
            onClick={() => typeof window !== 'undefined' && window.open(sectionData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  // ─── CONTACT FORM ───────────────────────────────────────────
  const renderContactFormSection = (sectionData: any) => {
    if (!sectionData.form_title) return null;
    return (
      <div className="px-5 py-5">
        <div className="text-center p-6 rounded-2xl" style={{ background: colors.cardBg, border: `2px solid ${colors.primary}15` }}>
          <h3 className="font-black text-base mb-2" style={{ color: colors.text, fontFamily: font }}>{sectionData.form_title}</h3>
          {sectionData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + '80', fontFamily: font }}>{sectionData.form_subtitle}</p>}
          <Button size="sm" className="font-bold rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none' }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── CUSTOM HTML ────────────────────────────────────────────
  const renderCustomHtmlSection = (sectionData: any) => {
    if (!sectionData.html_content) return null;
    return (
      <div className="px-5 py-5">
        {sectionData.show_title && sectionData.section_title && (
          <h2 className="text-lg font-black mb-3" style={{ color: colors.text, fontFamily: font }}>{sectionData.section_title}</h2>
        )}
        <div className="p-4 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR SHARE ───────────────────────────────────────────────
  const renderQrShareSection = (sectionData: any) => {
    if (!sectionData.enable_qr && !sectionData.qr_foreground) return null;
    return (
      <div className="px-5 py-5">
        <div className="text-center p-5 rounded-2xl" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15` }}>
          <h3 className="font-bold text-sm mb-2 flex items-center justify-center gap-2" style={{ color: colors.text, fontFamily: font }}>
            <Share2 className="w-4 h-4" style={{ color: colors.primary }} /> {t('Share')}
          </h3>
          {sectionData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + '80', fontFamily: font }}>{sectionData.share_message}</p>}
          <Button className="w-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none' }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── FOOTER ─────────────────────────────────────────────────
  const renderFooterSection = (sectionData: any) => {
    if (!sectionData.footer_text && !sectionData.copyright_text) return null;
    return (
      <div className="px-6 py-4 text-center">
        {sectionData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '60', fontFamily: font }}>{sectionData.footer_text}</p>}
        {sectionData.copyright_text && <p className="text-xs" style={{ color: colors.text + '40', fontFamily: font }}>{sectionData.copyright_text}</p>}
      </div>
    );
  };

  // ─── MAIN RENDER ────────────────────────────────────────────
  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-adhdcoach h1,
        .coach-tpl-adhdcoach h2,
        .coach-tpl-adhdcoach h3,
        .coach-tpl-adhdcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-adhdcoach rounded-2xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px ${colors.primary}15, 0 0 0 1px ${colors.primary}10`,
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Vibrant Focus style */}
      <div className="p-5 space-y-3">
        <Button className="w-full h-14 font-black rounded-full transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none', boxShadow: `0 8px 30px ${colors.primary}30` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font, borderWidth: '2px' }}
          onClick={() => {
            const cd = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(m => { m.downloadVCF(cd); });
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

