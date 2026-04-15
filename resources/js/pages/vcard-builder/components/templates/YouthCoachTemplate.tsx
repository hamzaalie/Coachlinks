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
 * YouthCoachTemplate — NEON ARCADE design
 *
 * Fun, vibrant, youthful energy with a modern neon-on-dark aesthetic
 * for Youth & Teen Coaches.
 * - Dark background (#0F0F23) with NEON GLOW effects everywhere
 * - Header: Deep dark with animated neon gradient border at bottom (purple → cyan → pink)
 * - Profile image in a ROUNDED SQUARE (16px radius) with NEON GLOW border
 * - Cards: Dark (#1A1A2E) with neon border glow on hover
 * - Colors: neon purple, neon cyan, neon pink
 * - Font: Space Grotesk
 * - Programs: Grid of dark cards with neon left accent line
 * - Testimonials: Stacked cards with glowing star ratings
 * - About: Stats in neon-bordered boxes, specializations as neon-outlined pills
 * - Results: Horizontal neon bar charts with gradient fills
 * - Lead Magnet: Neon-bordered card with pulsing glow accent
 */

interface YouthCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function YouthCoachTemplate({ data, template: _template, businessType }: YouthCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'youth-coach';


  // Testimonials carousel — stacked card fade
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#8B5CF6',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#06B6D4',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#EC4899',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#0F0F23',
    text: configSections.colors?.text || templateTheme.textColor || '#E2E8F0',
    cardBg: configSections.colors?.cardBg || '#1A1A2E',
  };
  const _fontPair = getCoachFonts('youth-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /* ── Neon glow utility — returns box-shadow string for a given color ── */
  const neonGlow = (color: string, intensity: number = 20) =>
    `0 0 ${intensity}px ${color}60, 0 0 ${intensity * 2}px ${color}20`;

  /* ── Animated neon gradient border — bottom edge for header ── */
  const NeonBorderBottom = () => (
    <div className="absolute bottom-0 left-0 w-full h-1" style={{
      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.primary})`,
      backgroundSize: '300% 100%',
      animation: 'neonSlide 4s linear infinite',
    }} />
  );

  /* ── Section heading — neon accent bar with icon ── */
  const SectionHeading = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 flex items-center justify-center" style={{
        background: `${colors.primary}18`,
        borderRadius: 10,
        border: `1px solid ${colors.primary}40`,
        boxShadow: `0 0 12px ${colors.primary}25`,
      }}>
        <span style={{ color: colors.primary }}>{icon}</span>
      </div>
      <h2 className="text-sm font-bold tracking-wide uppercase" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.08em' }}>{label}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${colors.primary}50, transparent)` }} />
    </div>
  );

  /* ── Neon pixel decorative dots for arcade flair ── */
  const PixelDots = ({ className = '' }: { className?: string }) => (
    <div className={`flex gap-1 ${className}`}>
      <div className="w-1.5 h-1.5" style={{ background: colors.primary, borderRadius: 2, boxShadow: `0 0 6px ${colors.primary}` }} />
      <div className="w-1.5 h-1.5" style={{ background: colors.secondary, borderRadius: 2, boxShadow: `0 0 6px ${colors.secondary}` }} />
      <div className="w-1.5 h-1.5" style={{ background: colors.accent, borderRadius: 2, boxShadow: `0 0 6px ${colors.accent}` }} />
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── HEADER — Deep dark with neon gradient animated border
  // ═══════════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: colors.background,
      minHeight: 300,
    }}>
      {/* Neon grid-line overlay (arcade floor feel) */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(${colors.primary}08 1px, transparent 1px),
          linear-gradient(90deg, ${colors.primary}08 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />
      {/* Radial neon glow behind profile */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 50% 60%, ${colors.primary}18 0%, transparent 50%)`,
      }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold transition-all hover:opacity-90"
              style={{
                background: `${colors.cardBg}CC`,
                color: colors.text,
                backdropFilter: 'blur(12px)',
                fontFamily: font,
                borderRadius: 10,
                border: `1px solid ${colors.primary}40`,
                boxShadow: `0 0 10px ${colors.primary}15`,
              }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-2 py-1 min-w-[150px] max-h-48 overflow-y-auto z-[99999]"
                style={{ background: colors.cardBg, borderRadius: 12, border: `1px solid ${colors.primary}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.5), ${neonGlow(colors.primary, 8)}` }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2 transition-colors`}
                    style={{
                      fontFamily: font,
                      color: currentLanguage === lang.code ? colors.primary : colors.text + 'BB',
                      background: currentLanguage === lang.code ? `${colors.primary}15` : 'transparent',
                    }}>
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-14 pb-20 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5">
            <div style={{
              borderRadius: 16,
              border: `2px solid ${colors.primary}`,
              boxShadow: neonGlow(colors.primary, 20),
              padding: 3,
            }}>
              <img
                src={sanitizeUrl(sectionData.profile_image)}
                alt={sanitizeText(sectionData.name || '')}
                className="w-28 h-28 object-cover"
                style={{ borderRadius: 13, display: 'block' }}
              />
            </div>
          </div>
        )}
        <h1 className="text-2xl font-extrabold mb-2" style={{
          fontFamily: font,
          color: colors.text,
          textShadow: `0 0 30px ${colors.primary}40`,
          letterSpacing: '-0.01em',
        }}>
          {sanitizeText(sectionData.name || '')}
        </h1>
        {sectionData.title && (
          <p className="text-sm font-semibold mb-2" style={{
            color: colors.secondary,
            fontFamily: font,
            textShadow: `0 0 16px ${colors.secondary}50`,
          }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <p className="text-xs px-5 py-2.5 mt-2 leading-relaxed" style={{
            background: `${colors.cardBg}CC`,
            color: colors.text + 'BB',
            fontFamily: font,
            borderRadius: 12,
            border: `1px solid ${colors.primary}25`,
            backdropFilter: 'blur(8px)',
            maxWidth: 340,
          }}>
            {sanitizeText(sectionData.tagline)}
          </p>
        )}
        <PixelDots className="mt-5" />
      </div>

      {/* Animated neon gradient border at bottom */}
      <NeonBorderBottom />
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT — Neon-bordered dark pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex flex-wrap gap-2.5 justify-center">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all"
            style={{
              background: colors.cardBg,
              borderRadius: 12,
              border: `1px solid ${colors.primary}30`,
              fontFamily: font,
              boxShadow: `0 0 0px ${colors.primary}00`,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(colors.primary, 10); e.currentTarget.style.borderColor = `${colors.primary}80`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 0px ${colors.primary}00`; e.currentTarget.style.borderColor = `${colors.primary}30`; }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.primary}18`, borderRadius: 8 }}>
              <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all"
            style={{
              background: colors.cardBg,
              borderRadius: 12,
              border: `1px solid ${colors.secondary}30`,
              fontFamily: font,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(colors.secondary, 10); e.currentTarget.style.borderColor = `${colors.secondary}80`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${colors.secondary}30`; }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.secondary}18`, borderRadius: 8 }}>
              <Phone className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 transition-all"
            style={{
              background: colors.cardBg,
              borderRadius: 12,
              border: `1px solid ${colors.accent}30`,
              fontFamily: font,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(colors.accent, 10); e.currentTarget.style.borderColor = `${colors.accent}80`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${colors.accent}30`; }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.accent}18`, borderRadius: 8 }}>
              <Globe className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2.5 px-4 py-3"
            style={{
              background: colors.cardBg,
              borderRadius: 12,
              border: `1px solid ${colors.secondary}25`,
              fontFamily: font,
            }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.secondary}18`, borderRadius: 8 }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── ABOUT — Stats in neon-bordered boxes, neon-outlined pills
  // ═══════════════════════════════════════════════════════════
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Target className="w-4 h-4" />} label={t('About Me')} />
        <div className="relative p-6" style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.primary}20`,
        }}>
          {/* Neon corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{
            background: `linear-gradient(135deg, ${colors.primary}10, transparent)`,
            borderRadius: '0 16px 0 0',
          }} />
          {sectionData.description && (
            <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'BB', fontFamily: font, lineHeight: '1.9' }}>
              {sanitizeText(sectionData.description)}
            </p>
          )}
          {/* Specializations as neon-outlined pill badges */}
          {specializations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {specializations.map((spec: string, i: number) => {
                const pillColors = [colors.primary, colors.secondary, colors.accent];
                const c = pillColors[i % pillColors.length];
                return (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold"
                    style={{
                      background: 'transparent',
                      color: c,
                      borderRadius: 20,
                      border: `1px solid ${c}60`,
                      boxShadow: `0 0 8px ${c}15`,
                      fontFamily: font,
                    }}>
                    <Zap className="w-3 h-3" />
                    {sanitizeText(spec)}
                  </span>
                );
              })}
            </div>
          )}
          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-2 mb-4">
              {certifications.map((cert: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2.5" style={{
                  background: `${colors.primary}08`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${colors.secondary}`,
                  boxShadow: `inset 3px 0 12px ${colors.secondary}10`,
                }}>
                  <Award className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
                  <span className="text-[11px] font-medium" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(cert)}</span>
                </div>
              ))}
            </div>
          )}
          {/* Experience stat in neon-bordered box */}
          {sectionData.experience && (
            <div className="flex items-center gap-3 p-4 mt-3" style={{
              background: `${colors.primary}08`,
              borderRadius: 12,
              border: `1px solid ${colors.primary}35`,
              boxShadow: neonGlow(colors.primary, 6),
            }}>
              <BarChart3 className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.experience)} {t('of experience')}</span>
            </div>
          )}
          {/* Philosophy quote */}
          {sectionData.philosophy && (
            <div className="relative mt-5 p-4 overflow-hidden" style={{
              background: `linear-gradient(135deg, ${colors.accent}08, ${colors.primary}05)`,
              borderRadius: 12,
              borderLeft: `2px solid ${colors.accent}60`,
              boxShadow: `inset 2px 0 16px ${colors.accent}08`,
            }}>
              <span className="absolute top-1 left-3 text-3xl leading-none" style={{ color: colors.accent + '30', fontFamily: 'Georgia, serif' }}>"</span>
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
  // ─── PROGRAMS — Grid of dark cards with neon left accent line
  // ═══════════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    const neonAccents = [colors.primary, colors.secondary, colors.accent, '#22D3EE'];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Zap className="w-4 h-4" />} label={t('Programs')} />
        <div className="grid grid-cols-1 gap-4">
          {programs.map((program: any, idx: number) => {
            const accentColor = neonAccents[idx % neonAccents.length];
            return (
              <div key={idx} className="relative flex overflow-hidden transition-all"
                style={{
                  background: colors.cardBg,
                  borderRadius: 14,
                  border: `1px solid ${accentColor}20`,
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(accentColor, 12); e.currentTarget.style.borderColor = `${accentColor}60`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${accentColor}20`; }}>
                {/* Neon left accent line */}
                <div className="w-1 flex-shrink-0" style={{
                  background: accentColor,
                  boxShadow: `0 0 8px ${accentColor}80, 0 0 16px ${accentColor}30`,
                  borderRadius: '14px 0 0 14px',
                }} />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                      {sanitizeText(program.title || '')}
                    </h3>
                    {program.price && (
                      <span className="text-xs font-extrabold px-3 py-1" style={{
                        background: `${accentColor}15`,
                        color: accentColor,
                        borderRadius: 8,
                        fontFamily: font,
                        boxShadow: `0 0 12px ${accentColor}20`,
                        border: `1px solid ${accentColor}30`,
                      }}>
                        {sanitizeText(program.price)}
                      </span>
                    )}
                  </div>
                  {program.description && (
                    <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(program.description)}</p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    {program.format && (
                      <span className="text-[10px] px-2.5 py-1 font-semibold" style={{
                        background: `${colors.primary}12`,
                        color: colors.primary,
                        borderRadius: 6,
                        fontFamily: font,
                        border: `1px solid ${colors.primary}20`,
                      }}>
                        {sanitizeText(program.format)}
                      </span>
                    )}
                    {program.duration && (
                      <span className="text-[10px] px-2.5 py-1 font-semibold" style={{
                        background: `${colors.secondary}12`,
                        color: colors.secondary,
                        borderRadius: 6,
                        fontFamily: font,
                        border: `1px solid ${colors.secondary}20`,
                      }}>
                        {sanitizeText(program.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SIGNATURE OFFER — Neon-framed power-up card
  // ═══════════════════════════════════════════════════════════
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Gift className="w-4 h-4" />} label={t('Signature Program')} />
        <div className="relative p-6 overflow-hidden" style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.accent}30`,
          boxShadow: neonGlow(colors.accent, 10),
        }}>
          {/* Corner neon flare */}
          <div className="absolute -top-8 -right-8 w-24 h-24 pointer-events-none" style={{
            background: `radial-gradient(circle, ${colors.accent}12, transparent 60%)`,
          }} />
          {title && (
            <h3 className="font-extrabold text-base mb-2" style={{
              color: colors.accent,
              fontFamily: font,
              textShadow: `0 0 20px ${colors.accent}30`,
            }}>
              {sanitizeText(title)}
            </h3>
          )}
          {description && (
            <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(description)}</p>
          )}
          {pillars.length > 0 && (
            <div className="space-y-3">
              {pillars.map((pillar: any, i: number) => {
                const stepColors = [colors.primary, colors.secondary, colors.accent, '#22D3EE'];
                const sc = stepColors[i % stepColors.length];
                return (
                  <div key={i} className="flex items-start gap-3 p-3.5"
                    style={{
                      background: `${sc}06`,
                      borderRadius: 12,
                      border: `1px solid ${sc}20`,
                    }}>
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `${sc}15`,
                        borderRadius: 8,
                        border: `1px solid ${sc}40`,
                        boxShadow: `0 0 10px ${sc}20`,
                      }}>
                      <span className="text-xs font-extrabold" style={{ color: sc, fontFamily: font }}>{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs mb-0.5" style={{ color: colors.text, fontFamily: font }}>
                        {sanitizeText(pillar.name || '')}
                      </h4>
                      {pillar.description && (
                        <p className="text-[10px]" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(pillar.description)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── RESULTS — Neon horizontal bar charts (purple → cyan gradient)
  // ═══════════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label={t('Results')} />
        {/* Neon horizontal bar charts */}
        {statFields.length > 0 && (
          <div className="space-y-4 mb-6">
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} className="p-4" style={{
                background: colors.cardBg,
                borderRadius: 12,
                border: `1px solid ${colors.primary}15`,
              }}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[11px] font-semibold capitalize" style={{ color: colors.text + 'AA', fontFamily: font }}>
                    {sanitizeText(key.replace(/_/g, ' '))}
                  </span>
                  <span className="text-sm font-extrabold" style={{
                    color: idx % 2 === 0 ? colors.primary : colors.secondary,
                    fontFamily: font,
                    textShadow: `0 0 12px ${idx % 2 === 0 ? colors.primary : colors.secondary}40`,
                  }}>
                    {sanitizeText(String(val))}
                  </span>
                </div>
                {/* Neon bar */}
                <div className="relative h-2.5 overflow-hidden" style={{ background: `${colors.primary}12`, borderRadius: 6 }}>
                  <div className="absolute inset-y-0 left-0 transition-all duration-1000" style={{
                    width: `${60 + (idx * 10)}%`,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    borderRadius: 6,
                    boxShadow: `0 0 12px ${colors.primary}50, 0 0 24px ${colors.secondary}25`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Case studies */}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-4 p-5"
            style={{
              background: colors.cardBg,
              borderRadius: 14,
              border: `1px solid ${colors.secondary}20`,
            }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{
                background: `${colors.secondary}15`,
                borderRadius: 8,
                border: `1px solid ${colors.secondary}30`,
              }}>
                <Target className="w-4 h-4" style={{ color: colors.secondary }} />
              </div>
              <h4 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                {sanitizeText(cs.client_name || cs.company || cs.family_name || '')}
              </h4>
            </div>
            {(cs.challenge || cs.starting_point) && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{
                  background: `${colors.accent}15`,
                  color: colors.accent,
                  borderRadius: 6,
                  fontFamily: font,
                  border: `1px solid ${colors.accent}25`,
                }}>{t('Before')}</span>
                <span className="text-[11px]" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(cs.challenge || cs.starting_point)}</span>
              </div>
            )}
            {cs.result && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{
                  background: `${colors.secondary}15`,
                  color: colors.secondary,
                  borderRadius: 6,
                  fontFamily: font,
                  border: `1px solid ${colors.secondary}25`,
                }}>{t('After')}</span>
                <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.result)}</span>
              </div>
            )}
            {cs.revenue_impact && (
              <div className="mt-3 px-3 py-2 text-[11px] font-semibold flex items-center gap-2" style={{
                background: `${colors.primary}10`,
                color: colors.primary,
                borderRadius: 10,
                border: `1px solid ${colors.primary}25`,
                boxShadow: `0 0 10px ${colors.primary}10`,
              }}>
                <TrendingUp className="w-3.5 h-3.5" /> {sanitizeText(cs.revenue_impact)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── TRANSFORMATIONS — Neon before/after story cards
  // ═══════════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} label={t('Transformations')} />
        <div className="space-y-4">
          {stories.map((story: any, idx: number) => (
            <div key={idx} className="overflow-hidden"
              style={{
                background: colors.cardBg,
                borderRadius: 14,
                border: `1px solid ${colors.primary}20`,
              }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-px" style={{ background: `${colors.primary}30` }}>
                  {story.before_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{
                        background: `${colors.accent}DD`,
                        color: 'white',
                        borderRadius: 6,
                        fontFamily: font,
                      }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{
                        background: `${colors.secondary}DD`,
                        color: 'white',
                        borderRadius: 6,
                        fontFamily: font,
                      }}>{t('After')}</span>
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
                    <span className="text-[11px] mt-0.5" style={{ color: colors.accent }}>✦</span>
                    <span className="text-[11px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(story.before_state)}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[11px] mt-0.5" style={{ color: colors.secondary, textShadow: `0 0 6px ${colors.secondary}` }}>✦</span>
                    <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.after_state)}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-[11px] italic mt-3 px-4 py-3" style={{
                    background: `${colors.primary}08`,
                    color: colors.text + 'BB',
                    borderRadius: 10,
                    borderLeft: `2px solid ${colors.primary}50`,
                    fontFamily: font,
                  }}>
                    "{sanitizeText(story.testimonial)}"
                  </p>
                )}
                {story.timeframe && (
                  <p className="text-[10px] mt-2.5 font-semibold flex items-center gap-1.5" style={{
                    color: colors.secondary,
                    fontFamily: font,
                    textShadow: `0 0 8px ${colors.secondary}30`,
                  }}>
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
  // ─── LEAD MAGNET — Neon-bordered card with pulsing glow
  // ═══════════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Download className="w-4 h-4" />} label={t('Free Resource')} />
      <div className="overflow-hidden"
        style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.accent}35`,
          boxShadow: neonGlow(colors.accent, 12),
          animation: 'neonPulse 3s ease-in-out infinite',
        }}>
        {sectionData.magnet_image && (
          <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-40 object-cover" />
        )}
        <div className="p-6">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{
              background: `${colors.accent}15`,
              borderRadius: 12,
              border: `1px solid ${colors.accent}30`,
              boxShadow: `0 0 14px ${colors.accent}20`,
            }}>
              <Gift className="w-5 h-5" style={{ color: colors.accent }} />
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
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                color: 'white',
                borderRadius: 12,
                fontFamily: font,
                boxShadow: `0 0 20px ${colors.accent}30, 0 4px 16px ${colors.accent}25`,
                border: 'none',
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
  // ─── BOOKING — Neon-accented scheduling card
  // ═══════════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Book a Session')} />
      <div className="p-6"
        style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.secondary}25`,
        }}>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 flex items-center justify-center" style={{
            background: `${colors.secondary}12`,
            borderRadius: 12,
            border: `1px solid ${colors.secondary}30`,
            boxShadow: `0 0 14px ${colors.secondary}15`,
          }}>
            <Calendar className="w-5 h-5" style={{ color: colors.secondary }} />
          </div>
          <div>
            <h3 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Discovery Session')}</h3>
            {sectionData.call_duration && (
              <p className="text-[10px]" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>
            )}
          </div>
        </div>
        {sectionData.call_description && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>
        )}
        <Button className="w-full font-bold text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            color: 'white',
            borderRadius: 12,
            fontFamily: font,
            boxShadow: `0 0 20px ${colors.secondary}25, 0 4px 16px ${colors.primary}20`,
            border: 'none',
          }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Session')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── TESTIMONIALS — Stacked cards with glowing star ratings
  // ═══════════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    const activeReview = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Star className="w-4 h-4" />} label={t('Testimonials')} />
        {/* Single testimonial card */}
        <div className="relative" key={currentReview}
          style={{
            background: colors.cardBg,
            borderRadius: 16,
            border: `1px solid ${colors.primary}25`,
            padding: '24px',
            animation: 'neonFadeIn 0.6s ease-out',
          }}>
          {/* Decorative neon quote mark */}
          <span className="absolute top-3 right-4 text-5xl leading-none pointer-events-none select-none" style={{
            color: colors.primary + '20',
            fontFamily: 'Georgia, serif',
            textShadow: `0 0 20px ${colors.primary}15`,
          }}>"</span>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              {activeReview.client_photo && (
                <img src={sanitizeUrl(activeReview.client_photo)} alt="" className="w-11 h-11 object-cover"
                  style={{
                    borderRadius: 10,
                    border: `2px solid ${colors.primary}50`,
                    boxShadow: `0 0 12px ${colors.primary}20`,
                  }} />
              )}
              <div>
                <p className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(activeReview.client_name || '')}
                </p>
                {activeReview.client_title && (
                  <p className="text-[10px]" style={{ color: colors.text + '66', fontFamily: font }}>{sanitizeText(activeReview.client_title)}</p>
                )}
              </div>
            </div>
            {/* Glowing yellow star ratings */}
            {activeReview.rating && (
              <div className="mb-3">
                {Array.from({ length: Number(activeReview.rating) }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 inline-block mr-0.5" style={{
                    color: '#FBBF24',
                    fill: '#FBBF24',
                    filter: 'drop-shadow(0 0 4px #FBBF24)',
                  }} />
                ))}
              </div>
            )}
            {activeReview.review && (
              <p className="text-[11px] leading-relaxed mb-4 italic" style={{ color: colors.text + 'CC', fontFamily: font }}>
                "{sanitizeText(activeReview.review)}"
              </p>
            )}
            {activeReview.result_highlight && (
              <div className="flex items-center gap-2 px-3 py-2" style={{
                background: `${colors.secondary}10`,
                borderRadius: 8,
                border: `1px solid ${colors.secondary}25`,
              }}>
                <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: colors.secondary }} />
                <span className="text-[10px] font-bold" style={{ color: colors.secondary, fontFamily: font }}>
                  {sanitizeText(activeReview.result_highlight)}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {reviews.map((_: any, idx: number) => (
              <button key={idx} onClick={() => setCurrentReview(idx)}
                className="transition-all duration-300"
                style={{
                  width: currentReview === idx ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: currentReview === idx
                    ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                    : `${colors.primary}30`,
                  boxShadow: currentReview === idx ? `0 0 8px ${colors.primary}50` : 'none',
                }} />
            ))}
          </div>
        )}
        {/* Neon keyframe animations */}
        <style>{`
          @keyframes neonFadeIn {
            0% { opacity: 0; transform: translateY(10px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes neonSlide {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
          }
          @keyframes neonPulse {
            0%, 100% { box-shadow: ${neonGlow(colors.accent, 12)}; }
            50% { box-shadow: ${neonGlow(colors.accent, 22)}; }
          }
        `}</style>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SOCIAL — Neon-bordered platform squares
  // ═══════════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    const socialNeonColors = [colors.primary, colors.secondary, colors.accent, '#22D3EE', '#A78BFA'];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Share2 className="w-4 h-4" />} label={t('Connect')} />
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link: any, idx: number) => {
            const nc = socialNeonColors[idx % socialNeonColors.length];
            return (
              <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: `${nc}10`,
                  color: nc,
                  borderRadius: 10,
                  border: `1px solid ${nc}40`,
                  fontFamily: font,
                  boxShadow: `0 0 0px ${nc}00`,
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(nc, 10); e.currentTarget.style.borderColor = nc; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 0px ${nc}00`; e.currentTarget.style.borderColor = `${nc}40`; }}>
                {(link.platform || '').charAt(0).toUpperCase()}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LINKS — Neon-outlined link cards with hover glow
  // ═══════════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('Resources')} />
        <div className="space-y-3">
          {items.map((item: any, idx: number) => {
            const lc = idx % 2 === 0 ? colors.primary : colors.secondary;
            return (
              <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 transition-all"
                style={{
                  background: colors.cardBg,
                  borderRadius: 12,
                  border: `1px solid ${lc}20`,
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = neonGlow(lc, 10); e.currentTarget.style.borderColor = `${lc}60`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${lc}20`; }}>
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${lc}12`,
                    borderRadius: 10,
                    border: `1px solid ${lc}25`,
                  }}>
                  <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                  {item.description && (
                    <p className="text-[10px] truncate" style={{ color: colors.text + '66', fontFamily: font }}>{sanitizeText(item.description)}</p>
                  )}
                </div>
                <div className="w-7 h-7 flex items-center justify-center" style={{
                  background: `${lc}12`,
                  borderRadius: 8,
                  border: `1px solid ${lc}20`,
                }}>
                  <span className="text-[11px]" style={{ color: lc }}>→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── BUSINESS HOURS — Dark table with neon row dividers
  // ═══════════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Availability')} />
        <div className="overflow-hidden" style={{
          background: colors.cardBg,
          borderRadius: 14,
          border: `1px solid ${colors.primary}18`,
        }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-5 py-3.5"
              style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.primary}12` : 'none' }}>
              <span className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <Badge className="text-[10px] px-2.5 py-0.5 font-semibold" style={{
                    background: `${colors.accent}15`,
                    color: colors.accent,
                    borderRadius: 6,
                    border: `1px solid ${colors.accent}25`,
                  }}>{t('Closed')}</Badge>
                : <span className="text-[11px] font-medium" style={{
                    color: colors.secondary,
                    fontFamily: font,
                    textShadow: `0 0 8px ${colors.secondary}25`,
                  }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── APPOINTMENTS — Neon consultation card
  // ═══════════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6"
        style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.primary}20`,
        }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center" style={{
            background: `${colors.primary}12`,
            borderRadius: 10,
            border: `1px solid ${colors.primary}30`,
            boxShadow: `0 0 12px ${colors.primary}15`,
          }}>
            <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
          <h3 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Book Consultation')}</h3>
        </div>
        {sectionData.consultation_info && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>
        )}
        <Button className="w-full font-bold text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 12,
            fontFamily: font,
            boxShadow: `0 0 20px ${colors.primary}25, 0 4px 16px ${colors.secondary}20`,
            border: 'none',
          }}
          onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── LOCATION — Dark map frame with neon border
  // ═══════════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <SectionHeading icon={<MapPin className="w-4 h-4" />} label={t('Location')} />
      {sectionData.map_embed_url && (
        <div className="overflow-hidden mb-3" style={{
          borderRadius: 14,
          border: `1px solid ${colors.secondary}25`,
          boxShadow: `0 0 14px ${colors.secondary}10`,
        }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full font-bold text-xs"
            style={{
              borderColor: `${colors.secondary}50`,
              color: colors.secondary,
              borderRadius: 12,
              fontFamily: font,
              background: 'transparent',
              boxShadow: `0 0 10px ${colors.secondary}10`,
            }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT FORM — Dark-themed neon input fields
  // ═══════════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6"
        style={{
          background: colors.cardBg,
          borderRadius: 16,
          border: `1px solid ${colors.primary}18`,
        }}>
        {sectionData.form_title && (
          <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>
        )}
        {sectionData.form_subtitle && (
          <p className="text-[11px] mb-5" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>
        )}
        <div className="space-y-3">
          <input type="text" placeholder={t('Full Name')}
            className="w-full px-4 py-3 text-xs outline-none transition-all"
            style={{
              background: `${colors.primary}08`,
              color: colors.text,
              border: `1px solid ${colors.primary}20`,
              fontFamily: font,
              borderRadius: 10,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = `${colors.primary}60`; e.currentTarget.style.boxShadow = `0 0 12px ${colors.primary}15`; }}
            onBlur={e => { e.currentTarget.style.borderColor = `${colors.primary}20`; e.currentTarget.style.boxShadow = 'none'; }} />
          <input type="email" placeholder={t('Email Address')}
            className="w-full px-4 py-3 text-xs outline-none transition-all"
            style={{
              background: `${colors.primary}08`,
              color: colors.text,
              border: `1px solid ${colors.primary}20`,
              fontFamily: font,
              borderRadius: 10,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = `${colors.secondary}60`; e.currentTarget.style.boxShadow = `0 0 12px ${colors.secondary}15`; }}
            onBlur={e => { e.currentTarget.style.borderColor = `${colors.primary}20`; e.currentTarget.style.boxShadow = 'none'; }} />
          <textarea placeholder={t('Tell us about your goals...')} rows={3}
            className="w-full px-4 py-3 text-xs outline-none resize-none transition-all"
            style={{
              background: `${colors.primary}08`,
              color: colors.text,
              border: `1px solid ${colors.primary}20`,
              fontFamily: font,
              borderRadius: 10,
            }}
            onFocus={e => { e.currentTarget.style.borderColor = `${colors.accent}60`; e.currentTarget.style.boxShadow = `0 0 12px ${colors.accent}15`; }}
            onBlur={e => { e.currentTarget.style.borderColor = `${colors.primary}20`; e.currentTarget.style.boxShadow = 'none'; }} />
          <Button className="w-full font-bold text-xs"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: 'white',
              borderRadius: 12,
              fontFamily: font,
              boxShadow: `0 0 20px ${colors.primary}20`,
              border: 'none',
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
        <div className="overflow-hidden p-5" style={{
          background: colors.cardBg,
          borderRadius: 14,
          border: `1px solid ${colors.primary}18`,
        }}>
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── QR SHARE — Dark neon-bordered buttons
  // ═══════════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex gap-3">
        {sectionData.enable_qr && (
          <Button variant="outline" className="font-bold flex-1 text-xs"
            style={{
              borderColor: `${colors.primary}40`,
              color: colors.primary,
              fontFamily: font,
              borderRadius: 12,
              background: 'transparent',
              boxShadow: `0 0 8px ${colors.primary}10`,
            }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
          </Button>
        )}
        <Button variant="outline" className="font-bold flex-1 text-xs"
          style={{
            borderColor: `${colors.secondary}40`,
            color: colors.secondary,
            fontFamily: font,
            borderRadius: 12,
            background: 'transparent',
            boxShadow: `0 0 8px ${colors.secondary}10`,
          }}
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
  // ─── FOOTER — Dark with neon top border
  // ═══════════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{
      borderTop: `1px solid ${colors.primary}15`,
      background: `linear-gradient(180deg, ${colors.cardBg}80, ${colors.background})`,
    }}>
      {sectionData.footer_text && (
        <p className="text-[11px] mb-1" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>
      )}
      {sectionData.copyright_text && (
        <p className="text-[10px]" style={{ color: colors.text + '44', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>
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
        .coach-tpl-youthcoach h1,
        .coach-tpl-youthcoach h2,
        .coach-tpl-youthcoach h3,
        .coach-tpl-youthcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-youthcoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 20,
      boxShadow: `0 0 40px ${colors.primary}10, 0 8px 32px rgba(0,0,0,0.4)`,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* ─── CTA FOOTER — Neon arcade action bar ─── */}
      <div className="p-5 space-y-3">
        <Button className="w-full h-14 font-bold text-sm"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            color: 'white',
            borderRadius: 14,
            fontFamily: font,
            boxShadow: `0 0 30px ${colors.primary}30, 0 0 60px ${colors.accent}15`,
            border: 'none',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Zap className="w-5 h-5 mr-2" /> {t('Level Up Now')}
        </Button>
        <Button size="sm" variant="outline" className="w-full font-bold text-xs"
          style={{
            borderColor: `${colors.primary}40`,
            color: colors.primary,
            borderRadius: 12,
            fontFamily: font,
            background: 'transparent',
            boxShadow: `0 0 8px ${colors.primary}10`,
          }}
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
            <p className="text-[10px] text-center" style={{ color: colors.text + '40', fontFamily: font }}>{copyrightSection.text}</p>
          )}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

