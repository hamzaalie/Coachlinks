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
 * BurnoutCoachTemplate — HEALING WATERFALL design
 *
 * Calming, restorative, nature-inspired layout for Burnout Recovery & Resilience Coaches.
 * - Sage green → ocean teal gradient header with layered wave SVG at bottom
 * - Soft rounded rectangle profile image (24px radius) with double-line sage border
 * - Cards float with NO borders — only soft shadows (box-shadow: 0 2px 20px) + 20px radius
 * - Watercolor wash gradient bars on programs, river-like progress bars for results
 * - Single testimonial with fade transition, nature leaf decorations
 * - Nunito font, calming palette: ocean teal, sage green, light sage accent
 */

interface BurnoutCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BurnoutCoachTemplate({ data, template: _template, businessType }: BurnoutCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'burnout-coach';


  // Testimonials carousel — single card fade
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 6000);
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#1B4965',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#6B8F71',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#CAE7B9',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#F5FAF7',
    text: configSections.colors?.text || templateTheme.textColor || '#1A3A2A',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('burnout-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /* ── Layered wave SVG for header bottom transition ── */
  const WaveSvg = () => (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 80 }}>
      <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill={colors.background} opacity="0.4" />
      <path d="M0,80 C180,40 360,100 540,70 C720,40 900,100 1080,70 C1260,40 1380,90 1440,80 L1440,120 L0,120 Z" fill={colors.background} opacity="0.6" />
      <path d="M0,95 C160,80 320,110 480,90 C640,70 800,110 960,90 C1120,70 1280,100 1440,95 L1440,120 L0,120 Z" fill={colors.background} />
    </svg>
  );

  /* ── Section heading — soft sage left bar with leaf icon ── */
  const SectionHeading = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}60, ${colors.secondary}30)`, borderRadius: 12 }}>
        <span style={{ color: colors.primary }}>{icon}</span>
      </div>
      <h2 className="text-sm font-bold" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.02em' }}>{label}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${colors.secondary}30, transparent)` }} />
    </div>
  );

  /* ── Leaf decorative SVG for nature sections ── */
  const LeafDecor = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.5 6.5C7 16 9.5 14 12 14s5 2 7.5 4.5C21 16.8 22 14.5 22 12c0-5.5-4.5-10-10-10z" fill={colors.secondary} />
      <path d="M12 14v8M8 18c2-1 4-2 4-4M16 18c-2-1-4-2-4-4" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── HEADER — Sage-to-teal gradient + layered wave SVG
  // ═══════════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(160deg, ${colors.secondary} 0%, ${colors.secondary}DD 30%, ${colors.primary}CC 70%, ${colors.primary} 100%)`,
      minHeight: 300,
    }}>
      {/* Soft radial glow overlay */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 50% 30%, ${colors.accent}20 0%, transparent 60%)`,
      }} />
      {/* Waterfall shimmer lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(180deg, transparent, transparent 40px, ${colors.accent}08 40px, ${colors.accent}08 41px)`,
      }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', fontFamily: font, borderRadius: 20, border: 'none' }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl py-1 min-w-[150px] max-h-48 overflow-y-auto z-[99999]" style={{ borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-14 pb-24 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5">
            <div className="p-1" style={{ borderRadius: 28, border: `2px solid ${colors.accent}90`, boxShadow: `0 0 0 4px ${colors.secondary}40` }}>
              <img
                src={sanitizeUrl(sectionData.profile_image)}
                alt={sanitizeText(sectionData.name || '')}
                className="w-28 h-28 object-cover"
                style={{ borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              />
            </div>
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: font, letterSpacing: '-0.01em' }}>
          {sanitizeText(sectionData.name || '')}
        </h1>
        {sectionData.title && (
          <p className="text-sm font-medium mb-2" style={{ color: `${colors.accent}DD`, fontFamily: font }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <p className="text-xs px-5 py-2.5 mt-2 leading-relaxed" style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
            fontFamily: font,
            borderRadius: 16,
            backdropFilter: 'blur(8px)',
            maxWidth: 340,
          }}>
            {sanitizeText(sectionData.tagline)}
          </p>
        )}
      </div>

      {/* Layered wave transition */}
      <WaveSvg />
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT — Soft floating pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex flex-wrap gap-2.5 justify-center">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.05)', fontFamily: font }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.primary}12`, borderRadius: 10 }}>
              <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.05)', fontFamily: font }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.secondary}15`, borderRadius: 10 }}>
              <Phone className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.05)', fontFamily: font }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.primary}12`, borderRadius: 10 }}>
              <Globe className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2.5 px-4 py-3"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.05)', fontFamily: font }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.accent}40`, borderRadius: 10 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── ABOUT — Nature-inspired with leaf decorations
  // ═══════════════════════════════════════════════════════════
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Target className="w-4 h-4" />} label={t('About Me')} />
        <div className="relative p-6" style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          {/* Decorative leaf in corner */}
          <LeafDecor className="absolute top-3 right-3" />
          {sectionData.description && (
            <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'BB', fontFamily: font, lineHeight: '1.9' }}>
              {sanitizeText(sectionData.description)}
            </p>
          )}
          {specializations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {specializations.map((spec: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}40, ${colors.secondary}15)`,
                    color: colors.primary,
                    borderRadius: 12,
                    fontFamily: font,
                  }}>
                  <Sparkles className="w-3 h-3" style={{ color: colors.secondary }} />
                  {sanitizeText(spec)}
                </span>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div className="space-y-2 mb-4">
              {certifications.map((cert: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2" style={{ background: `${colors.accent}15`, borderRadius: 12 }}>
                  <Award className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
                  <span className="text-[11px] font-medium" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(cert)}</span>
                </div>
              ))}
            </div>
          )}
          {sectionData.experience && (
            <div className="flex items-center gap-3 p-3.5 mt-3" style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`, borderRadius: 14 }}>
              <BarChart3 className="w-4 h-4" style={{ color: colors.secondary }} />
              <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.experience)} {t('of experience')}</span>
            </div>
          )}
          {sectionData.philosophy && (
            <div className="relative mt-5 p-4" style={{ background: `linear-gradient(135deg, ${colors.accent}20, ${colors.secondary}08)`, borderRadius: 16 }}>
              <span className="absolute top-2 left-3 text-3xl leading-none" style={{ color: colors.secondary + '25', fontFamily: 'Georgia, serif' }}>"</span>
              <p className="text-[11px] italic leading-relaxed pl-5" style={{ color: colors.text + 'AA', fontFamily: font }}>
                {sanitizeText(sectionData.philosophy)}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── PROGRAMS — Zen garden cards with watercolor gradient bar
  // ═══════════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    /* Watercolor gradient colors for the left bar */
    const watercolorGradients = [
      `linear-gradient(180deg, ${colors.secondary}, ${colors.primary}AA, ${colors.accent})`,
      `linear-gradient(180deg, ${colors.primary}, ${colors.secondary}CC, ${colors.accent}DD)`,
      `linear-gradient(180deg, ${colors.accent}, ${colors.secondary}, ${colors.primary}BB)`,
      `linear-gradient(180deg, ${colors.secondary}DD, ${colors.accent}, ${colors.primary}99)`,
    ];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Zap className="w-4 h-4" />} label={t('Recovery Programs')} />
        <div className="space-y-4">
          {programs.map((program: any, idx: number) => (
            <div key={idx} className="relative flex overflow-hidden"
              style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
              {/* Watercolor left bar */}
              <div className="w-1.5 flex-shrink-0" style={{
                background: watercolorGradients[idx % watercolorGradients.length],
                borderRadius: '20px 0 0 20px',
              }} />
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {sanitizeText(program.title || '')}
                  </h3>
                  {program.price && (
                    <span className="text-xs font-bold px-3 py-1" style={{
                      background: `linear-gradient(135deg, ${colors.accent}40, ${colors.secondary}15)`,
                      color: colors.primary,
                      borderRadius: 10,
                      fontFamily: font,
                    }}>
                      {sanitizeText(program.price)}
                    </span>
                  )}
                </div>
                {program.description && (
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  {program.format && (
                    <span className="text-[10px] px-2.5 py-1 font-semibold" style={{ background: `${colors.primary}10`, color: colors.primary, borderRadius: 8, fontFamily: font }}>
                      {sanitizeText(program.format)}
                    </span>
                  )}
                  {program.duration && (
                    <span className="text-[10px] px-2.5 py-1 font-semibold" style={{ background: `${colors.secondary}12`, color: colors.secondary, borderRadius: 8, fontFamily: font }}>
                      {sanitizeText(program.duration)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SIGNATURE OFFER — Healing framework card
  // ═══════════════════════════════════════════════════════════
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Gift className="w-4 h-4" />} label={t('Healing Framework')} />
        <div className="p-6" style={{
          background: `linear-gradient(145deg, ${colors.cardBg}, ${colors.accent}12)`,
          borderRadius: 20,
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        }}>
          {title && (
            <h3 className="font-extrabold text-base mb-2" style={{ color: colors.primary, fontFamily: font }}>
              {sanitizeText(title)}
            </h3>
          )}
          {description && (
            <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(description)}</p>
          )}
          {pillars.length > 0 && (
            <div className="space-y-3">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3.5"
                  style={{ background: colors.cardBg, borderRadius: 14, boxShadow: '0 1px 10px rgba(0,0,0,0.03)' }}>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${colors.secondary}30, ${colors.accent}50)`, borderRadius: 10 }}>
                    <span className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs mb-0.5" style={{ color: colors.text, fontFamily: font }}>
                      {sanitizeText(pillar.name || '')}
                    </h4>
                    {pillar.description && (
                      <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(pillar.description)}</p>
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
  // ─── RESULTS — River-like horizontal flowing progress bars
  // ═══════════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label={t('Recovery Results')} />
        {/* River-like flowing progress bars */}
        {statFields.length > 0 && (
          <div className="space-y-4 mb-6">
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} className="p-4" style={{ background: colors.cardBg, borderRadius: 16, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold capitalize" style={{ color: colors.text + 'AA', fontFamily: font }}>
                    {sanitizeText(key.replace(/_/g, ' '))}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: idx % 2 === 0 ? colors.primary : colors.secondary, fontFamily: font }}>
                    {sanitizeText(String(val))}
                  </span>
                </div>
                {/* River progress bar */}
                <div className="relative h-2 overflow-hidden" style={{ background: `${colors.accent}30`, borderRadius: 6 }}>
                  <div className="absolute inset-y-0 left-0 transition-all duration-1000" style={{
                    width: `${65 + (idx * 8)}%`,
                    background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.secondary}AA)`,
                    borderRadius: 6,
                    backgroundSize: '200% 100%',
                    animation: 'river-flow 3s ease-in-out infinite',
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Case studies */}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-4 p-5"
            style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${colors.secondary}15`, borderRadius: 10 }}>
                <Target className="w-4 h-4" style={{ color: colors.secondary }} />
              </div>
              <h4 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                {sanitizeText(cs.client_name || cs.company || cs.family_name || '')}
              </h4>
            </div>
            {(cs.challenge || cs.starting_point) && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{ background: '#EF444412', color: '#EF4444', borderRadius: 6, fontFamily: font }}>{t('Before')}</span>
                <span className="text-[11px]" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(cs.challenge || cs.starting_point)}</span>
              </div>
            )}
            {cs.result && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{ background: `${colors.secondary}15`, color: colors.secondary, borderRadius: 6, fontFamily: font }}>{t('After')}</span>
                <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.result)}</span>
              </div>
            )}
            {cs.revenue_impact && (
              <div className="mt-3 px-3 py-2 text-[11px] font-semibold flex items-center gap-2" style={{ background: `${colors.accent}25`, color: colors.primary, borderRadius: 10 }}>
                <TrendingUp className="w-3.5 h-3.5" /> {sanitizeText(cs.revenue_impact)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── TRANSFORMATIONS — Soft nature transition cards
  // ═══════════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} label={t('Recovery Stories')} />
        <div className="space-y-4">
          {stories.map((story: any, idx: number) => (
            <div key={idx} className="overflow-hidden"
              style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-0.5" style={{ background: colors.accent + '30' }}>
                  {story.before_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{ background: 'rgba(239,68,68,0.8)', color: 'white', borderRadius: 8, fontFamily: font }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{ background: `${colors.secondary}CC`, color: 'white', borderRadius: 8, fontFamily: font }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-5">
                <h4 className="font-bold text-xs mb-2.5" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(story.client_name || '')}
                </h4>
                {story.before_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[11px] mt-0.5" style={{ color: '#EF4444' }}>✦</span>
                    <span className="text-[11px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(story.before_state)}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[11px] mt-0.5" style={{ color: colors.secondary }}>✦</span>
                    <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.after_state)}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-[11px] italic mt-3 px-4 py-3" style={{
                    background: `linear-gradient(135deg, ${colors.accent}15, ${colors.secondary}08)`,
                    color: colors.text + 'AA',
                    borderRadius: 12,
                    fontFamily: font,
                  }}>
                    "{sanitizeText(story.testimonial)}"
                  </p>
                )}
                {story.timeframe && (
                  <p className="text-[10px] mt-2.5 font-semibold flex items-center gap-1.5" style={{ color: colors.secondary, fontFamily: font }}>
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
  // ─── LEAD MAGNET — Healing gradient card
  // ═══════════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Download className="w-4 h-4" />} label={t('Free Healing Resource')} />
      <div className="overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${colors.cardBg} 40%, ${colors.accent}18 100%)`,
          borderRadius: 20,
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        }}>
        {sectionData.magnet_image && (
          <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-40 object-cover" style={{ borderRadius: '20px 20px 0 0' }} />
        )}
        <div className="p-6">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${colors.accent}50, ${colors.secondary}25)`, borderRadius: 14 }}>
              <Gift className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              {sectionData.magnet_title && (
                <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(sectionData.magnet_title)}
                </h3>
              )}
              {sectionData.magnet_description && (
                <p className="text-[11px] mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>
              )}
            </div>
          </div>
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-4 font-bold" style={{
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                color: 'white',
                borderRadius: 14,
                fontFamily: font,
                boxShadow: `0 4px 16px ${colors.secondary}30`,
              }}>
                <Download className="w-4 h-4 mr-2" /> {t('Download Free')}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── BOOKING — Calming scheduling card
  // ═══════════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Book a Recovery Session')} />
      <div className="p-6"
        style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.accent}40, ${colors.primary}15)`, borderRadius: 14 }}>
            <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
          <div>
            <h3 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Discovery Session')}</h3>
            {sectionData.call_duration && (
              <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>
            )}
          </div>
        </div>
        {sectionData.call_description && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>
        )}
        <Button className="w-full font-bold text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 14,
            fontFamily: font,
            boxShadow: `0 4px 16px ${colors.primary}25`,
          }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Session')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── TESTIMONIALS — Single card fade with sage frame
  // ═══════════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    const activeReview = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Star className="w-4 h-4" />} label={t('Client Testimonials')} />
        {/* Single testimonial card with fade */}
        <div className="relative p-1.5" style={{ background: `linear-gradient(145deg, ${colors.accent}50, ${colors.secondary}25)`, borderRadius: 22 }}>
          <div className="relative p-6" key={currentReview}
            style={{
              background: colors.cardBg,
              borderRadius: 18,
              animation: 'fadeInTestimonial 0.8s ease-in-out',
            }}>
            {/* Decorative quote */}
            <span className="absolute top-3 right-4 text-5xl leading-none pointer-events-none select-none" style={{ color: colors.accent + '40', fontFamily: 'Georgia, serif' }}>"</span>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                {activeReview.client_photo && (
                  <img src={sanitizeUrl(activeReview.client_photo)} alt="" className="w-11 h-11 object-cover" style={{ borderRadius: 14, border: `2px solid ${colors.accent}60` }} />
                )}
                <div>
                  <p className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                    {sanitizeText(activeReview.client_name || '')}
                  </p>
                  {activeReview.client_title && (
                    <p className="text-[10px]" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(activeReview.client_title)}</p>
                  )}
                </div>
              </div>
              {activeReview.rating && (
                <div className="mb-3">
                  {Array.from({ length: Number(activeReview.rating) }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 inline-block mr-0.5" style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                  ))}
                </div>
              )}
              {activeReview.review && (
                <p className="text-[11px] leading-relaxed mb-4 italic" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  "{sanitizeText(activeReview.review)}"
                </p>
              )}
              {activeReview.result_highlight && (
                <div className="flex items-center gap-2 px-3 py-2" style={{ background: `${colors.accent}20`, borderRadius: 10 }}>
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: colors.secondary }} />
                  <span className="text-[10px] font-bold" style={{ color: colors.primary, fontFamily: font }}>
                    {sanitizeText(activeReview.result_highlight)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_: any, idx: number) => (
              <button key={idx} onClick={() => setCurrentReview(idx)}
                className="transition-all duration-300"
                style={{
                  width: currentReview === idx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: currentReview === idx ? colors.secondary : `${colors.secondary}30`,
                }} />
            ))}
          </div>
        )}
        {/* Fade animation keyframes */}
        <style>{`
          @keyframes fadeInTestimonial {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes river-flow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SOCIAL — Rounded nature-style platform circles
  // ═══════════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Share2 className="w-4 h-4" />} label={t('Connect')} />
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center text-xs font-bold transition-all hover:shadow-md hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}20, ${colors.accent}40)`,
                color: colors.primary,
                borderRadius: 14,
                fontFamily: font,
              }}>
              {(link.platform || '').charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LINKS — Soft floating link cards
  // ═══════════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('Resources')} />
        <div className="space-y-3">
          {items.map((item: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 transition-all hover:shadow-lg"
              style={{
                background: colors.cardBg,
                borderRadius: 16,
                boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
              }}>
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${idx % 2 === 0 ? colors.primary : colors.secondary}12, ${colors.accent}30)`, borderRadius: 12 }}>
                <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && (
                  <p className="text-[10px] truncate" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.accent}30`, borderRadius: 10 }}>
                <span className="text-[11px]" style={{ color: colors.primary }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── BUSINESS HOURS — Soft rounded availability cards
  // ═══════════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Availability')} />
        <div className="overflow-hidden" style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-5 py-3"
              style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.accent}25` : 'none' }}>
              <span className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <Badge className="text-[10px] px-2.5 py-0.5 font-semibold" style={{ background: '#EF444410', color: '#EF4444', borderRadius: 8, border: 'none' }}>{t('Closed')}</Badge>
                : <span className="text-[11px] font-medium" style={{ color: colors.secondary, fontFamily: font }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── APPOINTMENTS — Gentle consultation card
  // ═══════════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6"
        style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center" style={{ background: `${colors.accent}35`, borderRadius: 12 }}>
            <CheckCircle className="w-5 h-5" style={{ color: colors.secondary }} />
          </div>
          <h3 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Book Consultation')}</h3>
        </div>
        {sectionData.consultation_info && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>
        )}
        <Button className="w-full font-bold text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            color: 'white',
            borderRadius: 14,
            fontFamily: font,
            boxShadow: `0 4px 16px ${colors.secondary}25`,
          }}
          onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── LOCATION — Soft map card with nature frame
  // ═══════════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <SectionHeading icon={<MapPin className="w-4 h-4" />} label={t('Location')} />
      {sectionData.map_embed_url && (
        <div className="overflow-hidden mb-3" style={{ borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full font-bold text-xs"
            style={{ borderColor: colors.secondary, color: colors.secondary, borderRadius: 14, fontFamily: font }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT FORM — Soft rounded input fields
  // ═══════════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6"
        style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        {sectionData.form_title && (
          <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>
        )}
        {sectionData.form_subtitle && (
          <p className="text-[11px] mb-5" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>
        )}
        <div className="space-y-3">
          <input type="text" placeholder={t('Full Name')}
            className="w-full px-4 py-3 text-xs outline-none transition-all focus:ring-2"
            style={{ background: `${colors.accent}10`, color: colors.text, border: 'none', fontFamily: font, borderRadius: 14 }} />
          <input type="email" placeholder={t('Email Address')}
            className="w-full px-4 py-3 text-xs outline-none transition-all focus:ring-2"
            style={{ background: `${colors.accent}10`, color: colors.text, border: 'none', fontFamily: font, borderRadius: 14 }} />
          <textarea placeholder={t('Share your story...')} rows={3}
            className="w-full px-4 py-3 text-xs outline-none resize-none transition-all focus:ring-2"
            style={{ background: `${colors.accent}10`, color: colors.text, border: 'none', fontFamily: font, borderRadius: 14 }} />
          <Button className="w-full font-bold text-xs"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              borderRadius: 14,
              fontFamily: font,
              boxShadow: `0 4px 16px ${colors.primary}20`,
            }}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CUSTOM HTML
  // ═══════════════════════════════════════════════════════════
  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 py-5">
      {sectionData.show_title && sectionData.section_title && (
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={sanitizeText(sectionData.section_title)} />
      )}
      {sectionData.html_content && (
        <div className="overflow-hidden p-5" style={{ background: colors.cardBg, borderRadius: 20, boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── QR SHARE — Soft rounded buttons
  // ═══════════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex gap-3">
        {sectionData.enable_qr && (
          <Button variant="outline" className="font-bold flex-1 text-xs"
            style={{ borderColor: `${colors.secondary}40`, color: colors.primary, fontFamily: font, borderRadius: 14 }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
          </Button>
        )}
        <Button variant="outline" className="font-bold flex-1 text-xs"
          style={{ borderColor: `${colors.secondary}40`, color: colors.primary, fontFamily: font, borderRadius: 14 }}
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
  // ─── FOOTER — Soft sage bottom section
  // ═══════════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{ background: `linear-gradient(135deg, ${colors.accent}10, ${colors.secondary}08)` }}>
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
        .coach-tpl-burnoutcoach h1,
        .coach-tpl-burnoutcoach h2,
        .coach-tpl-burnoutcoach h3,
        .coach-tpl-burnoutcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-burnoutcoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 24,
      boxShadow: '0 8px 40px rgba(27,73,101,0.08)',
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* ─── CTA FOOTER — Healing waterfall action bar ─── */}
      <div className="p-5 space-y-3">
        <Button className="w-full h-14 font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            color: 'white',
            borderRadius: 16,
            fontFamily: font,
            boxShadow: `0 6px 24px ${colors.primary}25`,
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Sparkles className="w-5 h-5 mr-2" /> {t('Begin Your Recovery')}
        </Button>
        <Button size="sm" variant="outline" className="w-full font-bold text-xs"
          style={{ borderColor: `${colors.secondary}40`, color: colors.primary, borderRadius: 14, fontFamily: font }}
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
        <div className="px-6 pb-5 pt-1">
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

