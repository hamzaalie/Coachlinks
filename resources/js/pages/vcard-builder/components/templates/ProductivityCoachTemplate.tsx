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
 * ProductivityCoachTemplate — FOCUS GRID SYSTEM design
 *
 * Clean, minimal, hyper-organized layout inspired by productivity tools & planners.
 * - Dark charcoal → midnight blue gradient header with SVG dot-grid overlay
 * - Sharp rectangular cards with 4px left accent borders, 0 border-radius
 * - Monospace font (JetBrains Mono), uppercase headings
 * - Faint grid-line background patterns in every section
 * - Timeline-style numbered programs, vertically stacked testimonials
 * - Icon pill buttons for contact, dashboard stat cards for results
 */

interface ProductivityCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductivityCoachTemplate({ data, template: _template, businessType }: ProductivityCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'productivity-coach';


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#2563EB',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#0F172A',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F97316',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#F8FAFC',
    text: configSections.colors?.text || templateTheme.textColor || '#0F172A',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('productivity-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /* Reusable SVG dot-grid pattern as a data-uri for section backgrounds */
  const dotGridBg = `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23${colors.primary.replace('#', '')}' opacity='0.07'/%3E%3C/svg%3E")`;

  /* Section heading helper — uppercase monospace with left blue bar */
  const SectionHeading = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-3 mb-5" style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: 12 }}>
      <span style={{ color: colors.primary }}>{icon}</span>
      <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.15em' }}>{label}</h2>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── HEADER — Dark gradient + SVG dot-grid + square profile
  // ═══════════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F172A 100%)', minHeight: 280 }}>
      {/* SVG dot-grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='white' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: '24px 24px',
      }} />
      {/* Subtle blue glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: `linear-gradient(to top, ${colors.primary}18, transparent)` }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 text-xs font-bold transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', fontFamily: font, border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 0 }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]" style={{ borderRadius: 0 }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    style={{ fontFamily: font }}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-12 pb-10 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5">
            <img
              src={sanitizeUrl(sectionData.profile_image)}
              alt={sanitizeText(sectionData.name || '')}
              className="w-28 h-28 object-cover"
              style={{ border: `3px solid ${colors.primary}`, borderRadius: 0, boxShadow: `0 0 0 6px rgba(37,99,235,0.15), 0 8px 32px rgba(0,0,0,0.4)` }}
            />
          </div>
        )}
        <h1 className="text-xl font-bold tracking-widest uppercase text-white mb-1" style={{ fontFamily: font, letterSpacing: '0.2em' }}>
          {sanitizeText(sectionData.name || '')}
        </h1>
        <div className="w-10 h-0.5 mx-auto my-3" style={{ background: colors.primary }} />
        {sectionData.title && (
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: font, letterSpacing: '0.12em' }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <p className="text-[11px] px-4 py-2 mt-2" style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: font,
            borderLeft: `3px solid ${colors.primary}`,
            borderRadius: 0,
            maxWidth: 320,
          }}>
            {sanitizeText(sectionData.tagline)}
          </p>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT — Horizontal rectangular pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      <div className="flex flex-wrap gap-2 justify-center">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`}
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-md"
            style={{ background: colors.cardBg, border: `1px solid ${colors.primary}18`, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, fontFamily: font }}>
            <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`}
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-md"
            style={{ background: colors.cardBg, border: `1px solid ${colors.primary}18`, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, fontFamily: font }}>
            <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-md"
            style={{ background: colors.cardBg, border: `1px solid ${colors.primary}18`, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, fontFamily: font }}>
            <Globe className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: colors.cardBg, border: `1px solid ${colors.primary}18`, borderLeft: `4px solid ${colors.accent}`, borderRadius: 0, fontFamily: font }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            <span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── ABOUT — Grid-backed card with numbered specializations
  // ═══════════════════════════════════════════════════════════
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Target className="w-4 h-4" />} label={t('About Me')} />
        {sectionData.description && (
          <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'BB', fontFamily: font, lineHeight: '1.8' }}>
            {sanitizeText(sectionData.description)}
          </p>
        )}
        {specializations.length > 0 && (
          <div className="space-y-2 mb-5">
            {specializations.map((spec: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
                <span className="text-[10px] font-bold w-6 h-6 flex items-center justify-center" style={{ background: colors.primary, color: 'white', borderRadius: 0, fontFamily: font }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(spec)}</span>
              </div>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {certifications.map((cert: string, i: number) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5" style={{ borderLeft: `2px solid ${colors.accent}40` }}>
                <Award className="w-3 h-3" style={{ color: colors.accent }} />
                <span className="text-[11px]" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(cert)}</span>
              </div>
            ))}
          </div>
        )}
        {sectionData.experience && (
          <div className="flex items-center gap-3 p-3 mt-3" style={{ background: colors.primary + '08', borderLeft: `4px solid ${colors.accent}`, borderRadius: 0 }}>
            <BarChart3 className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.experience)} {t('of experience')}</span>
          </div>
        )}
        {sectionData.philosophy && (
          <div className="mt-4 p-4" style={{ background: colors.secondary + '06', borderLeft: `4px solid ${colors.secondary}`, borderRadius: 0 }}>
            <p className="text-[11px] italic leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>
              "{sanitizeText(sectionData.philosophy)}"
            </p>
          </div>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── PROGRAMS — Timeline-style with large faded step numbers
  // ═══════════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Zap className="w-4 h-4" />} label={t('Programs')} />
        <div className="space-y-0">
          {programs.map((program: any, idx: number) => (
            <div key={idx} className="relative flex gap-4">
              {/* Timeline vertical line */}
              {idx < programs.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-px" style={{ background: colors.primary + '20' }} />
              )}
              {/* Step number circle */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                  style={{ background: colors.primary, color: 'white', borderRadius: 0, fontFamily: font }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
              {/* Program card */}
              <div className="flex-1 pb-5 mb-1">
                <div className="relative overflow-hidden p-4"
                  style={{ background: colors.cardBg, borderLeft: `4px solid ${idx % 2 === 0 ? colors.primary : colors.accent}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: idx % 2 === 0 ? colors.primary : colors.accent }}>
                  {/* Large faded background number */}
                  <span className="absolute top-0 right-2 text-5xl font-black pointer-events-none select-none"
                    style={{ color: colors.primary + '06', fontFamily: font, lineHeight: 1 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10">
                    <h3 className="font-bold text-sm mb-1 uppercase tracking-wide" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.05em' }}>
                      {sanitizeText(program.title || '')}
                    </h3>
                    {program.description && (
                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {program.format && (
                        <span className="text-[10px] px-2 py-1 font-medium" style={{ background: colors.primary + '10', color: colors.primary, borderRadius: 0, fontFamily: font }}>
                          {sanitizeText(program.format)}
                        </span>
                      )}
                      {program.duration && (
                        <span className="text-[10px] px-2 py-1 font-medium" style={{ background: colors.accent + '12', color: colors.accent, borderRadius: 0, fontFamily: font }}>
                          {sanitizeText(program.duration)}
                        </span>
                      )}
                      {program.price && (
                        <span className="text-[10px] px-2 py-1 font-bold ml-auto" style={{ background: colors.secondary + '10', color: colors.secondary, borderRadius: 0, fontFamily: font }}>
                          {sanitizeText(program.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SIGNATURE OFFER — Blueprint-style card with pillars
  // ═══════════════════════════════════════════════════════════
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Gift className="w-4 h-4" />} label={t('Signature Framework')} />
        <div className="p-5" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}12`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
          {title && (
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: colors.primary, fontFamily: font, letterSpacing: '0.1em' }}>
              {sanitizeText(title)}
            </h3>
          )}
          {description && (
            <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(description)}</p>
          )}
          {pillars.length > 0 && (
            <div className="space-y-2">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3"
                  style={{ background: colors.background, borderLeft: `3px solid ${colors.accent}`, borderRadius: 0 }}>
                  <span className="text-[10px] font-bold w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: colors.accent, color: 'white', borderRadius: 0, fontFamily: font }}>
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>
                      {sanitizeText(pillar.name || '')}
                    </h4>
                    {pillar.description && (
                      <p className="text-[10px] mt-0.5" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(pillar.description)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── RESULTS — Dashboard stat tiles + case studies
  // ═══════════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label={t('Results')} />
        {/* Dashboard-style stat tiles */}
        {statFields.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} className="p-3 text-center"
                style={{
                  background: colors.cardBg,
                  borderLeft: `4px solid ${idx % 2 === 0 ? colors.primary : colors.accent}`,
                  borderRadius: 0,
                  border: `1px solid ${colors.primary}10`,
                  borderLeftWidth: 4,
                  borderLeftColor: idx % 2 === 0 ? colors.primary : colors.accent,
                }}>
                <p className="text-lg font-bold" style={{ color: idx % 2 === 0 ? colors.primary : colors.accent, fontFamily: font }}>
                  {sanitizeText(String(val))}
                </p>
                <p className="text-[9px] uppercase tracking-wider mt-1 font-medium" style={{ color: colors.text + '88', fontFamily: font, letterSpacing: '0.1em' }}>
                  {sanitizeText(key.replace(/_/g, ' '))}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* Case studies */}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-3 p-4"
            style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3.5 h-3.5" style={{ color: colors.primary }} />
              <h4 className="font-bold text-xs uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>
                {sanitizeText(cs.client_name || cs.company || cs.family_name || '')}
              </h4>
            </div>
            {(cs.challenge || cs.starting_point) && (
              <div className="flex items-start gap-2 mb-1.5 pl-1">
                <span className="text-[9px] px-1.5 py-0.5 font-bold shrink-0 uppercase" style={{ background: '#EF444415', color: '#EF4444', borderRadius: 0, fontFamily: font }}>From</span>
                <span className="text-[11px]" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(cs.challenge || cs.starting_point)}</span>
              </div>
            )}
            {cs.result && (
              <div className="flex items-start gap-2 mb-1.5 pl-1">
                <span className="text-[9px] px-1.5 py-0.5 font-bold shrink-0 uppercase" style={{ background: colors.primary + '15', color: colors.primary, borderRadius: 0, fontFamily: font }}>To</span>
                <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.result)}</span>
              </div>
            )}
            {cs.revenue_impact && (
              <div className="mt-2 px-3 py-1.5 text-[11px] font-bold" style={{ background: colors.accent + '10', color: colors.accent, borderRadius: 0, borderLeft: `3px solid ${colors.accent}` }}>
                📊 {sanitizeText(cs.revenue_impact)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── TRANSFORMATIONS — Before/after grid cards
  // ═══════════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} label={t('Transformations')} />
        <div className="space-y-4">
          {stories.map((story: any, idx: number) => (
            <div key={idx} className="overflow-hidden"
              style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-px" style={{ background: colors.primary + '15' }}>
                  {story.before_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" />
                      <span className="absolute top-1 left-1 text-[9px] px-2 py-0.5 font-bold uppercase" style={{ background: '#EF4444CC', color: 'white', borderRadius: 0, fontFamily: font }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" />
                      <span className="absolute top-1 left-1 text-[9px] px-2 py-0.5 font-bold uppercase" style={{ background: colors.primary + 'CC', color: 'white', borderRadius: 0, fontFamily: font }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-4">
                <h4 className="font-bold text-xs uppercase tracking-wide mb-2" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(story.client_name || '')}
                </h4>
                {story.before_state && (
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: '#EF4444' }}>▸</span>
                    <span className="text-[11px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(story.before_state)}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: colors.primary }}>▸</span>
                    <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.after_state)}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-[11px] italic mt-2 px-3 py-2" style={{ background: colors.background, color: colors.text + 'AA', borderLeft: `3px solid ${colors.accent}`, borderRadius: 0, fontFamily: font }}>
                    "{sanitizeText(story.testimonial)}"
                  </p>
                )}
                {story.timeframe && (
                  <p className="text-[10px] mt-2 font-bold flex items-center gap-1 uppercase tracking-wide" style={{ color: colors.accent, fontFamily: font }}>
                    <Calendar className="w-3 h-3" /> {sanitizeText(story.timeframe)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LEAD MAGNET — Clean card with download CTA
  // ═══════════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
      <SectionHeading icon={<Download className="w-4 h-4" />} label={t('Free Resource')} />
      <div className="overflow-hidden"
        style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.accent }}>
        {sectionData.magnet_image && (
          <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-36 object-cover" />
        )}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: colors.accent + '15', borderRadius: 0 }}>
              <Gift className="w-5 h-5" style={{ color: colors.accent }} />
            </div>
            <div>
              {sectionData.magnet_title && (
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(sectionData.magnet_title)}
                </h3>
              )}
              {sectionData.magnet_description && (
                <p className="text-[11px] mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>
              )}
            </div>
          </div>
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-3 font-bold" style={{ background: colors.accent, color: 'white', borderRadius: 0, fontFamily: font }}>
                <Download className="w-4 h-4 mr-2" /> {t('Download Free')}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── BOOKING — Focused scheduling card
  // ═══════════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
      <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Book a Strategy Call')} />
      <div className="p-5"
        style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}12`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center" style={{ background: colors.primary + '10', borderRadius: 0 }}>
            <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>{t('Strategy Session')}</h3>
            {sectionData.call_duration && (
              <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>
            )}
          </div>
        </div>
        {sectionData.call_description && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>
        )}
        <Button className="w-full font-bold uppercase tracking-wider text-xs"
          style={{ background: colors.primary, color: 'white', borderRadius: 0, fontFamily: font, letterSpacing: '0.1em' }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Call')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── TESTIMONIALS — Vertically stacked with orange quote marks
  // ═══════════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    return (
      <div className="px-5 py-6" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Star className="w-4 h-4" />} label={t('Client Results')} />
        <div className="space-y-3">
          {reviews.map((review: any, idx: number) => (
            <div key={idx} className="relative p-4"
              style={{
                background: colors.cardBg,
                borderLeft: `4px solid ${colors.accent}`,
                borderRadius: 0,
                border: `1px solid ${colors.primary}10`,
                borderLeftWidth: 4,
                borderLeftColor: colors.accent,
              }}>
              {/* Large orange decorative quote mark */}
              <span className="absolute top-2 right-3 text-4xl leading-none pointer-events-none select-none" style={{ color: colors.accent + '18', fontFamily: 'Georgia, serif' }}>"</span>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  {review.client_photo && (
                    <img src={sanitizeUrl(review.client_photo)} alt="" className="w-9 h-9 object-cover" style={{ border: `2px solid ${colors.primary}20`, borderRadius: 0 }} />
                  )}
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>
                      {sanitizeText(review.client_name || '')}
                    </p>
                    {review.client_title && (
                      <p className="text-[10px]" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(review.client_title)}</p>
                    )}
                  </div>
                </div>
                {review.rating && (
                  <div className="mb-2">
                    {Array.from({ length: Number(review.rating) }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 inline-block" style={{ color: colors.accent, fill: colors.accent }} />
                    ))}
                  </div>
                )}
                {review.review && (
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + 'BB', fontFamily: font }}>
                    "{sanitizeText(review.review)}"
                  </p>
                )}
                {review.result_highlight && (
                  <div className="flex items-center gap-2 px-3 py-2" style={{ background: colors.primary + '08', borderLeft: `3px solid ${colors.primary}`, borderRadius: 0 }}>
                    <CheckCircle className="w-3 h-3 shrink-0" style={{ color: colors.primary }} />
                    <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>
                      {sanitizeText(review.result_highlight)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SOCIAL — Grid of square platform buttons
  // ═══════════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Share2 className="w-4 h-4" />} label={t('Connect')} />
        <div className="flex flex-wrap gap-2 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center text-xs font-bold transition-all hover:opacity-80"
              style={{ background: colors.secondary, color: 'white', borderRadius: 0, fontFamily: font }}>
              {(link.platform || '').charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LINKS — Rectangular link cards with arrow
  // ═══════════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('Resources')} />
        <div className="space-y-2">
          {items.map((item: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 transition-all hover:shadow-md"
              style={{
                background: colors.cardBg,
                borderLeft: `4px solid ${idx % 2 === 0 ? colors.primary : colors.accent}`,
                borderRadius: 0,
                border: `1px solid ${colors.primary}10`,
                borderLeftWidth: 4,
                borderLeftColor: idx % 2 === 0 ? colors.primary : colors.accent,
              }}>
              <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && (
                  <p className="text-[10px] truncate" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <div className="w-6 h-6 flex items-center justify-center" style={{ background: colors.primary + '10', borderRadius: 0 }}>
                <span className="text-[10px] font-bold" style={{ color: colors.primary }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── BUSINESS HOURS — Clean table with dot-grid backdrop
  // ═══════════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
        <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Availability')} />
        <div className="overflow-hidden" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-4 py-2.5"
              style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.primary}08` : 'none' }}>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <Badge className="text-[10px] px-2 py-0 font-bold" style={{ background: '#EF444410', color: '#EF4444', borderRadius: 0, border: 'none' }}>{t('Closed')}</Badge>
                : <span className="text-[11px] font-medium" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── APPOINTMENTS — Book consultation card
  // ═══════════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      <div className="p-5"
        style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, borderRadius: 0, border: `1px solid ${colors.primary}12`, borderLeftWidth: 4, borderLeftColor: colors.accent }}>
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} />
          <h3 className="font-bold text-xs uppercase tracking-wider" style={{ color: colors.text, fontFamily: font }}>{t('Book Consultation')}</h3>
        </div>
        {sectionData.consultation_info && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>
        )}
        <Button className="w-full font-bold uppercase tracking-wider text-xs"
          style={{ background: colors.accent, color: 'white', borderRadius: 0, fontFamily: font }}
          onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── LOCATION — Map embed with sharp frame
  // ═══════════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      <SectionHeading icon={<MapPin className="w-4 h-4" />} label={t('Location')} />
      {sectionData.map_embed_url && (
        <div className="overflow-hidden mb-3" style={{ border: `1px solid ${colors.primary}15`, borderRadius: 0 }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full font-bold uppercase tracking-wider text-xs"
            style={{ borderColor: colors.primary, color: colors.primary, borderRadius: 0, fontFamily: font }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT FORM — Sharp-edged input fields
  // ═══════════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      <div className="p-5"
        style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}12`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
        {sectionData.form_title && (
          <h3 className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>
        )}
        {sectionData.form_subtitle && (
          <p className="text-[11px] mb-4" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>
        )}
        <div className="space-y-3">
          <input type="text" placeholder={t('Full Name')}
            className="w-full px-4 py-2.5 text-xs border outline-none transition-all focus:ring-1"
            style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font, borderRadius: 0 }} />
          <input type="email" placeholder={t('Email Address')}
            className="w-full px-4 py-2.5 text-xs border outline-none transition-all focus:ring-1"
            style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font, borderRadius: 0 }} />
          <textarea placeholder={t('How can I help you?')} rows={3}
            className="w-full px-4 py-2.5 text-xs border outline-none resize-none transition-all focus:ring-1"
            style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font, borderRadius: 0 }} />
          <Button className="w-full font-bold uppercase tracking-wider text-xs"
            style={{ background: colors.primary, color: 'white', borderRadius: 0, fontFamily: font }}>
            <Mail className="w-4 h-4 mr-2" /> {t('Submit')}
          </Button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CUSTOM HTML
  // ═══════════════════════════════════════════════════════════
  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      {sectionData.show_title && sectionData.section_title && (
        <div className="flex items-center gap-3 mb-4" style={{ borderLeft: `4px solid ${colors.primary}`, paddingLeft: 12 }}>
          <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.15em' }}>
            {sanitizeText(sectionData.section_title)}
          </h2>
        </div>
      )}
      {sectionData.html_content && (
        <div className="overflow-hidden p-4" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderRadius: 0, border: `1px solid ${colors.primary}10`, borderLeftWidth: 4, borderLeftColor: colors.primary }}>
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── QR SHARE — Sharp pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: dotGridBg }}>
      <div className="flex gap-3">
        {sectionData.enable_qr && (
          <Button variant="outline" className="font-bold flex-1 uppercase tracking-wider text-xs"
            style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font, borderRadius: 0 }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
          </Button>
        )}
        <Button variant="outline" className="font-bold flex-1 uppercase tracking-wider text-xs"
          style={{ borderColor: colors.secondary, color: colors.secondary, fontFamily: font, borderRadius: 0 }}
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.share) {
              navigator.share({ title: data.name || '', text: sectionData.share_message || '', url: window.location.href });
            }
          }}>
          <Share2 className="w-4 h-4 mr-2" /> {t('Share')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── FOOTER — Minimal dark bar
  // ═══════════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{ background: colors.secondary + '08', borderTop: `1px solid ${colors.primary}10` }}>
      {sectionData.footer_text && (
        <p className="text-[11px] mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>
      )}
      {sectionData.copyright_text && (
        <p className="text-[10px]" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── SECTION SWITCH
  // ═══════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════
  // ─── MAIN RENDER
  // ═══════════════════════════════════════════════════════════
  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-productivitycoach h1,
        .coach-tpl-productivitycoach h2,
        .coach-tpl-productivitycoach h3,
        .coach-tpl-productivitycoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-productivitycoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 0,
      boxShadow: `0 4px 32px ${colors.secondary}15`,
      border: `1px solid ${colors.primary}12`,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* ─── CTA FOOTER — Grid-style action bar ─── */}
      <div className="p-5 space-y-3" style={{ backgroundImage: dotGridBg }}>
        <Button className="w-full h-14 font-bold uppercase tracking-widest text-xs"
          style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.primary}DD)`,
            color: 'white',
            borderRadius: 0,
            fontFamily: font,
            letterSpacing: '0.15em',
            boxShadow: `0 4px 20px ${colors.primary}30`,
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full font-bold uppercase tracking-wider text-xs"
          style={{ borderColor: colors.primary, color: colors.primary, borderRadius: 0, fontFamily: font, letterSpacing: '0.08em' }}
          onClick={() => {
            const contactData = {
              name: data.name || configSections.header?.name || '',
              title: data.title || configSections.header?.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              location: configSections.contact?.location || '',
            };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1" style={{ backgroundImage: dotGridBg }}>
          {copyrightSection.text && (
            <p className="text-[10px] text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>
          )}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

