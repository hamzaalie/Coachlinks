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
 * CouplesCoachTemplate — INTERTWINED HEARTS design
 *
 * Warm, romantic, elegant layout for Couples & Marriage Coaching.
 * - Deep burgundy → warm rose gradient header with intertwined heart SVG pattern
 * - Profile image with heart-shaped decorative frame
 * - Cards with warm rounded corners (16px) and rose tint hover effect
 * - Lora serif font, romantic palette: burgundy, warm rose, champagne gold
 * - Couple/partnership motifs, intertwined design elements throughout
 * - Paired testimonials with connected heart decorations
 * - Signature offer with intertwined ring decoration
 * - Heart-shaped CTA with warm glow
 */

interface CouplesCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CouplesCoachTemplate({ data, template: _template, businessType }: CouplesCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'couples-coach';


  // Testimonials carousel — paired fade
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 7000);
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#722F37',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#C77B8B',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#D4A373',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#FFF8F5',
    text: configSections.colors?.text || templateTheme.textColor || '#3D1F25',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('couples-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /* ── Intertwined Hearts SVG — two connected heart outlines ── */
  const IntertwinedHeartsSvg = ({ className = '', size = 48, color = 'rgba(255,255,255,0.12)' }: { className?: string; size?: number; color?: string }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M30 20 C15 20, 5 35, 20 50 L40 70 L60 50 C75 35, 65 20, 50 20 C43 20, 37 25, 35 30 C33 25, 27 20, 30 20 Z"
        stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M50 30 C35 30, 25 45, 40 60 L60 80 L80 60 C95 45, 85 30, 70 30 C63 30, 57 35, 55 40 C53 35, 47 30, 50 30 Z"
        stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );

  /* ── Intertwined rings SVG for signature offer ── */
  const IntertwinedRingsSvg = ({ size = 36, color = colors.accent }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 60 40" fill="none">
      <ellipse cx="22" cy="20" rx="14" ry="14" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
      <ellipse cx="38" cy="20" rx="14" ry="14" stroke={color} strokeWidth="2.5" fill="none" opacity="0.6" />
    </svg>
  );

  /* ── Heart connector decoration between paired elements ── */
  const HeartConnector = () => (
    <div className="flex items-center justify-center my-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${colors.secondary}40)` }} />
      <svg width="18" height="16" viewBox="0 0 24 22" fill={colors.secondary} style={{ margin: '0 8px', opacity: 0.5 }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${colors.secondary}40)` }} />
    </div>
  );

  /* ── Vine/flourish divider SVG ── */
  const FlourishDivider = () => (
    <div className="flex items-center justify-center py-3">
      <svg width="120" height="16" viewBox="0 0 120 16" fill="none" style={{ opacity: 0.3 }}>
        <path d="M0 8 Q15 2, 30 8 T60 8 T90 8 T120 8" stroke={colors.accent} strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="8" r="3" fill={colors.secondary} opacity="0.5" />
        <path d="M55 8 C55 4, 60 2, 60 5" stroke={colors.secondary} strokeWidth="1" fill="none" />
        <path d="M65 8 C65 4, 60 2, 60 5" stroke={colors.secondary} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );

  /* ── Section heading — burgundy left bar with heart accent ── */
  const SectionHeading = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 flex items-center justify-center" style={{
        background: `linear-gradient(135deg, ${colors.primary}18, ${colors.secondary}22)`,
        borderRadius: '50%',
        border: `1.5px solid ${colors.secondary}30`,
      }}>
        <span style={{ color: colors.primary }}>{icon}</span>
      </div>
      <h2 className="text-sm font-bold" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.03em' }}>{label}</h2>
      <div className="flex-1 flex items-center gap-1">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${colors.secondary}35, transparent)` }} />
        <svg width="10" height="9" viewBox="0 0 24 22" fill={colors.secondary} style={{ opacity: 0.25 }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── HEADER — Burgundy-to-rose gradient + intertwined hearts pattern
  // ═══════════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(155deg, ${colors.primary} 0%, ${colors.primary}EE 35%, ${colors.secondary}DD 65%, ${colors.secondary} 100%)`,
      minHeight: 310,
    }}>
      {/* Intertwined heart pattern overlay */}
      <div className="absolute inset-0" style={{ opacity: 0.08 }}>
        {[...Array(6)].map((_, i) => (
          <IntertwinedHeartsSvg key={i}
            className="absolute"
            size={60 + (i * 10)}
            color="rgba(255,255,255,0.35)"
          />
        ))}
      </div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, ${colors.accent}10 0%, transparent 50%)`,
      }} />

      {/* Decorative hearts scattered */}
      <div className="absolute top-6 left-8"><IntertwinedHeartsSvg size={40} color="rgba(255,255,255,0.08)" /></div>
      <div className="absolute top-20 right-6"><IntertwinedHeartsSvg size={55} color="rgba(255,255,255,0.06)" /></div>
      <div className="absolute bottom-28 left-4"><IntertwinedHeartsSvg size={35} color="rgba(255,255,255,0.07)" /></div>
      <div className="absolute bottom-20 right-10"><IntertwinedHeartsSvg size={45} color="rgba(255,255,255,0.05)" /></div>

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
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-rose-50 text-rose-700' : 'text-gray-700'}`}
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-20 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5 relative">
            {/* Heart-shaped decorative frame */}
            <div className="absolute -inset-3 flex items-center justify-center" style={{ opacity: 0.3 }}>
              <svg width="140" height="130" viewBox="0 0 140 130" fill="none">
                <path d="M70 120 C70 120, 10 75, 10 45 C10 25, 30 10, 50 10 C58 10, 65 15, 70 22 C75 15, 82 10, 90 10 C110 10, 130 25, 130 45 C130 75, 70 120, 70 120Z"
                  stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="p-1" style={{
              borderRadius: '50%',
              border: `2.5px solid ${colors.accent}80`,
              boxShadow: `0 0 0 5px ${colors.secondary}30, 0 8px 30px rgba(0,0,0,0.2)`,
            }}>
              <img
                src={sanitizeUrl(sectionData.profile_image)}
                alt={sanitizeText(sectionData.name || '')}
                className="w-28 h-28 object-cover"
                style={{ borderRadius: '50%' }}
              />
            </div>
          </div>
        )}
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: font, letterSpacing: '0.02em' }}>
          {sanitizeText(sectionData.name || '')}
        </h1>
        {sectionData.title && (
          <p className="text-sm font-medium mb-2" style={{ color: `${colors.accent}EE`, fontFamily: font }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <p className="text-xs px-6 py-3 mt-2 leading-relaxed" style={{
            background: 'rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: font,
            borderRadius: 20,
            backdropFilter: 'blur(10px)',
            maxWidth: 340,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {sanitizeText(sectionData.tagline)}
          </p>
        )}
      </div>

      {/* Warm curved bottom edge */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 40 }}>
        <path d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" fill={colors.background} />
      </svg>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT — Elegant warm pill buttons with heart accents
  // ═══════════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex flex-wrap gap-2.5 justify-center">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: `0 2px 16px ${colors.secondary}12`, fontFamily: font, border: `1px solid ${colors.secondary}15` }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.primary}10`, borderRadius: '50%' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`}
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: `0 2px 16px ${colors.secondary}12`, fontFamily: font, border: `1px solid ${colors.secondary}15` }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.secondary}12`, borderRadius: '50%' }}>
              <Phone className="w-3.5 h-3.5" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: `0 2px 16px ${colors.secondary}12`, fontFamily: font, border: `1px solid ${colors.secondary}15` }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.primary}10`, borderRadius: '50%' }}>
              <Globe className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2.5 px-4 py-3"
            style={{ background: colors.cardBg, borderRadius: 16, boxShadow: `0 2px 16px ${colors.secondary}12`, fontFamily: font, border: `1px solid ${colors.secondary}15` }}>
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.accent}20`, borderRadius: '50%' }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            </div>
            <span className="text-xs font-medium" style={{ color: colors.text }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── ABOUT — Warm inviting card with champagne accent & flourish dividers
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
          boxShadow: `0 3px 20px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}12`,
        }}>
          {/* Decorative champagne accent corner */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden" style={{ borderRadius: '0 16px 0 0' }}>
            <div className="absolute top-0 right-0 w-full h-full" style={{
              background: `linear-gradient(225deg, ${colors.accent}15, transparent 60%)`,
            }} />
          </div>

          {sectionData.description && (
            <p className="text-xs leading-relaxed mb-4" style={{ color: colors.text + 'BB', fontFamily: font, lineHeight: '1.9' }}>
              {sanitizeText(sectionData.description)}
            </p>
          )}

          {sectionData.description && (specializations.length > 0 || certifications.length > 0) && <FlourishDivider />}

          {specializations.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {specializations.map((spec: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary}15, ${colors.primary}08)`,
                    color: colors.primary,
                    borderRadius: 20,
                    fontFamily: font,
                    border: `1px solid ${colors.secondary}18`,
                  }}>
                  <svg width="10" height="9" viewBox="0 0 24 22" fill={colors.secondary} style={{ opacity: 0.6 }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {sanitizeText(spec)}
                </span>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="space-y-2 mb-4">
              {certifications.map((cert: string, i: number) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2" style={{ background: `${colors.accent}10`, borderRadius: 12, border: `1px solid ${colors.accent}15` }}>
                  <Award className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  <span className="text-[11px] font-medium" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(cert)}</span>
                </div>
              ))}
            </div>
          )}

          {sectionData.experience && (
            <div className="flex items-center gap-3 p-3.5 mt-3" style={{
              background: `linear-gradient(135deg, ${colors.primary}06, ${colors.secondary}08)`,
              borderRadius: 14,
              border: `1px solid ${colors.primary}10`,
            }}>
              <BarChart3 className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.experience)} {t('of experience')}</span>
            </div>
          )}

          {sectionData.philosophy && (
            <>
              <FlourishDivider />
              <div className="relative p-4" style={{
                background: `linear-gradient(135deg, ${colors.secondary}08, ${colors.accent}10)`,
                borderRadius: 14,
                borderLeft: `3px solid ${colors.accent}60`,
              }}>
                <span className="absolute top-1 left-3 text-3xl leading-none" style={{ color: colors.secondary + '20', fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-[11px] italic leading-relaxed pl-5" style={{ color: colors.text + 'AA', fontFamily: font }}>
                  {sanitizeText(sectionData.philosophy)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── PROGRAMS — Side-by-side pair cards (His & Hers / Before & After)
  // ═══════════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Zap className="w-4 h-4" />} label={t('Coaching Programs')} />
        <div className="space-y-5">
          {programs.map((program: any, idx: number) => (
            <div key={idx} className="overflow-hidden" style={{
              background: colors.cardBg,
              borderRadius: 16,
              boxShadow: `0 3px 20px ${colors.secondary}10`,
              border: `1px solid ${colors.secondary}12`,
            }}>
              {/* Top accent bar with intertwined motif */}
              <div className="h-1.5" style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.secondary}, ${colors.primary})`,
              }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>
                    {sanitizeText(program.title || '')}
                  </h3>
                  {program.price && (
                    <span className="text-xs font-bold px-3 py-1" style={{
                      background: `linear-gradient(135deg, ${colors.accent}25, ${colors.secondary}12)`,
                      color: colors.primary,
                      borderRadius: 20,
                      fontFamily: font,
                    }}>
                      {sanitizeText(program.price)}
                    </span>
                  )}
                </div>
                {program.description && (
                  <p className="text-[11px] leading-relaxed mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>
                )}
                {/* Paired perspective columns */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 text-center" style={{
                    background: `${colors.primary}06`,
                    borderRadius: 12,
                    border: `1px solid ${colors.primary}10`,
                  }}>
                    <span className="text-[9px] font-bold uppercase tracking-wider block mb-1" style={{ color: colors.primary + '80' }}>{t('Before')}</span>
                    <span className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(program.format || t('Disconnected'))}</span>
                  </div>
                  <div className="p-3 text-center" style={{
                    background: `${colors.secondary}08`,
                    borderRadius: 12,
                    border: `1px solid ${colors.secondary}12`,
                  }}>
                    <span className="text-[9px] font-bold uppercase tracking-wider block mb-1" style={{ color: colors.secondary }}>{t('After')}</span>
                    <span className="text-[10px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(program.duration || t('Reconnected'))}</span>
                  </div>
                </div>
                <HeartConnector />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SIGNATURE OFFER — Elegant framed card with intertwined ring decoration
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
          boxShadow: `0 3px 20px ${colors.secondary}10`,
          border: `2px solid ${colors.accent}30`,
        }}>
          {/* Intertwined rings in corner */}
          <div className="absolute top-3 right-3 opacity-40">
            <IntertwinedRingsSvg size={50} color={colors.accent} />
          </div>
          {/* Elegant frame inner border */}
          <div className="absolute inset-3 pointer-events-none" style={{
            border: `1px solid ${colors.accent}18`,
            borderRadius: 12,
          }} />

          <div className="relative z-10">
            {title && (
              <h3 className="font-bold text-base mb-2" style={{ color: colors.primary, fontFamily: font }}>
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
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary}06, ${colors.accent}08)`,
                      borderRadius: 12,
                      border: `1px solid ${colors.secondary}10`,
                    }}>
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}20)`,
                        borderRadius: '50%',
                      }}>
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
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── RESULTS — Warm stat cards with partnership progress bars
  // ═══════════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label={t('Couple Transformation Results')} />
        {/* Warm duo-tone progress bars */}
        {statFields.length > 0 && (
          <div className="space-y-4 mb-6">
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} className="p-4" style={{
                background: colors.cardBg,
                borderRadius: 16,
                boxShadow: `0 2px 16px ${colors.secondary}10`,
                border: `1px solid ${colors.secondary}10`,
              }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-semibold capitalize" style={{ color: colors.text + 'AA', fontFamily: font }}>
                    {sanitizeText(key.replace(/_/g, ' '))}
                  </span>
                  <span className="text-sm font-bold" style={{ color: idx % 2 === 0 ? colors.primary : colors.secondary, fontFamily: font }}>
                    {sanitizeText(String(val))}
                  </span>
                </div>
                {/* Intertwined dual progress bar */}
                <div className="relative h-2.5 overflow-hidden" style={{ background: `${colors.accent}20`, borderRadius: 8 }}>
                  <div className="absolute inset-y-0 left-0 transition-all duration-1000" style={{
                    width: `${60 + (idx * 10)}%`,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    borderRadius: 8,
                  }} />
                  <div className="absolute inset-y-0 left-0 transition-all duration-1000" style={{
                    width: `${45 + (idx * 8)}%`,
                    background: `linear-gradient(90deg, ${colors.accent}60, ${colors.accent}20)`,
                    borderRadius: 8,
                    top: '50%',
                    height: '50%',
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Case studies with couple motif */}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-4 p-5" style={{
            background: colors.cardBg,
            borderRadius: 16,
            boxShadow: `0 2px 16px ${colors.secondary}10`,
            border: `1px solid ${colors.secondary}10`,
          }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${colors.primary}10`, borderRadius: '50%' }}>
                <Target className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <h4 className="font-bold text-xs" style={{ color: colors.text, fontFamily: font }}>
                {sanitizeText(cs.client_name || cs.company || cs.family_name || '')}
              </h4>
            </div>
            {(cs.challenge || cs.starting_point) && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{ background: `${colors.primary}10`, color: colors.primary, borderRadius: 8, fontFamily: font }}>{t('Before')}</span>
                <span className="text-[11px]" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(cs.challenge || cs.starting_point)}</span>
              </div>
            )}
            <HeartConnector />
            {cs.result && (
              <div className="flex items-start gap-2.5 mb-2 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-semibold shrink-0" style={{ background: `${colors.secondary}15`, color: colors.secondary, borderRadius: 8, fontFamily: font }}>{t('After')}</span>
                <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.result)}</span>
              </div>
            )}
            {cs.revenue_impact && (
              <div className="mt-3 px-3 py-2 text-[11px] font-semibold flex items-center gap-2" style={{ background: `${colors.accent}18`, color: colors.primary, borderRadius: 10 }}>
                <TrendingUp className="w-3.5 h-3.5" /> {sanitizeText(cs.revenue_impact)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── TRANSFORMATIONS — Paired before/after with heart bridge
  // ═══════════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} label={t('Love Stories Renewed')} />
        <div className="space-y-5">
          {stories.map((story: any, idx: number) => (
            <div key={idx} className="overflow-hidden" style={{
              background: colors.cardBg,
              borderRadius: 16,
              boxShadow: `0 3px 20px ${colors.secondary}10`,
              border: `1px solid ${colors.secondary}12`,
            }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-0.5" style={{ background: `${colors.accent}20` }}>
                  {story.before_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{ background: `${colors.primary}CC`, color: 'white', borderRadius: 10, fontFamily: font }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" />
                      <span className="absolute top-2 left-2 text-[9px] px-2.5 py-0.5 font-bold" style={{ background: `${colors.secondary}DD`, color: 'white', borderRadius: 10, fontFamily: font }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-5">
                <h4 className="font-bold text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(story.client_name || '')}
                </h4>
                {story.before_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[11px] mt-0.5" style={{ color: colors.primary }}>✦</span>
                    <span className="text-[11px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(story.before_state)}</span>
                  </div>
                )}
                <HeartConnector />
                {story.after_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[11px] mt-0.5" style={{ color: colors.secondary }}>✦</span>
                    <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.after_state)}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-[11px] italic mt-3 px-4 py-3" style={{
                    background: `linear-gradient(135deg, ${colors.secondary}08, ${colors.accent}10)`,
                    color: colors.text + 'AA',
                    borderRadius: 12,
                    fontFamily: font,
                    borderLeft: `2px solid ${colors.accent}50`,
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
  // ─── LEAD MAGNET — Romantic warm gradient download card
  // ═══════════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Download className="w-4 h-4" />} label={t('Free Resource for Couples')} />
      <div className="overflow-hidden" style={{
        background: `linear-gradient(145deg, ${colors.cardBg} 50%, ${colors.secondary}08 100%)`,
        borderRadius: 16,
        boxShadow: `0 3px 20px ${colors.secondary}10`,
        border: `1px solid ${colors.secondary}12`,
      }}>
        {sectionData.magnet_image && (
          <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-40 object-cover" />
        )}
        <div className="p-6">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{
              background: `linear-gradient(135deg, ${colors.accent}30, ${colors.secondary}15)`,
              borderRadius: '50%',
              border: `1.5px solid ${colors.accent}30`,
            }}>
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
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                borderRadius: 20,
                fontFamily: font,
                boxShadow: `0 4px 20px ${colors.primary}25`,
              }}>
                <Download className="w-4 h-4 mr-2" /> {t('Download Free Guide')}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── BOOKING — Heart-shaped CTA with warm glow
  // ═══════════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-6">
      <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Book a Couples Session')} />
      <div className="p-6" style={{
        background: colors.cardBg,
        borderRadius: 16,
        boxShadow: `0 3px 20px ${colors.secondary}10`,
        border: `1px solid ${colors.secondary}12`,
      }}>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 flex items-center justify-center" style={{
            background: `linear-gradient(135deg, ${colors.primary}12, ${colors.secondary}18)`,
            borderRadius: '50%',
          }}>
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
          <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>
        )}
        {/* Heart-shaped CTA button with warm glow */}
        <Button className="w-full h-12 font-bold text-xs relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 24,
            fontFamily: font,
            boxShadow: `0 6px 28px ${colors.primary}30, 0 0 60px ${colors.secondary}15`,
          }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <svg width="16" height="15" viewBox="0 0 24 22" fill="white" className="mr-2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {t('Schedule Your Session')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── TESTIMONIALS — Paired quote cards with connected heart between names
  // ═══════════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    const activeReview = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 py-6">
        <SectionHeading icon={<Star className="w-4 h-4" />} label={t('Couple Testimonials')} />
        {/* Paired testimonial card with connected heart */}
        <div className="relative" style={{
          background: colors.cardBg,
          borderRadius: 16,
          boxShadow: `0 3px 20px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}12`,
          overflow: 'hidden',
        }}>
          {/* Romantic top accent */}
          <div className="h-1" style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.secondary})`,
          }} />

          <div className="p-6" key={currentReview} style={{ animation: 'couplesTestimonialFade 0.7s ease-in-out' }}>
            {/* Connected heart decoration */}
            <div className="flex items-center justify-center mb-4">
              <IntertwinedHeartsSvg size={32} color={colors.secondary + '60'} />
            </div>

            <div className="flex items-center gap-3 mb-4">
              {activeReview.client_photo && (
                <img src={sanitizeUrl(activeReview.client_photo)} alt=""
                  className="w-11 h-11 object-cover"
                  style={{ borderRadius: '50%', border: `2px solid ${colors.accent}50` }} />
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
                  <Star key={i} className="w-3.5 h-3.5 inline-block mr-0.5" style={{ color: colors.accent, fill: colors.accent }} />
                ))}
              </div>
            )}

            {activeReview.review && (
              <div className="relative">
                <span className="absolute -top-1 -left-1 text-4xl leading-none pointer-events-none select-none" style={{ color: colors.secondary + '18', fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-[11px] leading-relaxed mb-4 italic pl-5" style={{ color: colors.text + 'CC', fontFamily: font }}>
                  {sanitizeText(activeReview.review)}
                </p>
              </div>
            )}

            {activeReview.result_highlight && (
              <div className="flex items-center gap-2 px-3 py-2.5" style={{
                background: `linear-gradient(135deg, ${colors.secondary}08, ${colors.accent}12)`,
                borderRadius: 12,
                border: `1px solid ${colors.secondary}10`,
              }}>
                <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: colors.secondary }} />
                <span className="text-[10px] font-bold" style={{ color: colors.primary, fontFamily: font }}>
                  {sanitizeText(activeReview.result_highlight)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Heart-shaped dots indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_: any, idx: number) => (
              <button key={idx} onClick={() => setCurrentReview(idx)}
                className="transition-all duration-300"
                style={{
                  width: currentReview === idx ? 22 : 8,
                  height: 8,
                  borderRadius: currentReview === idx ? 4 : '50%',
                  background: currentReview === idx
                    ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                    : `${colors.secondary}30`,
                }} />
            ))}
          </div>
        )}

        {/* Animation keyframes */}
        <style>{`
          @keyframes couplesTestimonialFade {
            0% { opacity: 0; transform: translateY(10px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes heartPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `}</style>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SOCIAL — Warm rounded circles with rose hover
  // ═══════════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Share2 className="w-4 h-4" />} label={t('Connect With Us')} />
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center text-xs font-bold transition-all hover:shadow-md hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}12, ${colors.secondary}18)`,
                color: colors.primary,
                borderRadius: '50%',
                fontFamily: font,
                border: `1.5px solid ${colors.secondary}20`,
              }}>
              {(link.platform || '').charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LINKS — Elegant warm link cards with heart bullet
  // ═══════════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('Resources')} />
        <div className="space-y-3">
          {items.map((item: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 transition-all hover:shadow-lg group"
              style={{
                background: colors.cardBg,
                borderRadius: 16,
                boxShadow: `0 2px 16px ${colors.secondary}08`,
                border: `1px solid ${colors.secondary}10`,
              }}>
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}15)`,
                  borderRadius: '50%',
                  border: `1px solid ${colors.secondary}12`,
                }}>
                <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && (
                  <p className="text-[10px] truncate" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <div className="w-7 h-7 flex items-center justify-center" style={{ background: `${colors.secondary}10`, borderRadius: '50%' }}>
                <span className="text-[11px]" style={{ color: colors.primary }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── BUSINESS HOURS — Warm availability cards with rose tint
  // ═══════════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5">
        <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Availability')} />
        <div className="overflow-hidden" style={{
          background: colors.cardBg,
          borderRadius: 16,
          boxShadow: `0 2px 16px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}10`,
        }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-5 py-3.5"
              style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.secondary}10` : 'none' }}>
              <span className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <Badge className="text-[10px] px-2.5 py-0.5 font-semibold" style={{ background: `${colors.primary}10`, color: colors.primary, borderRadius: 10, border: 'none' }}>{t('Closed')}</Badge>
                : <span className="text-[11px] font-medium" style={{ color: colors.secondary, fontFamily: font }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── APPOINTMENTS — Warm consultation card with hearts
  // ═══════════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6" style={{
        background: colors.cardBg,
        borderRadius: 16,
        boxShadow: `0 3px 20px ${colors.secondary}10`,
        border: `1px solid ${colors.secondary}12`,
      }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center" style={{
            background: `linear-gradient(135deg, ${colors.primary}12, ${colors.accent}20)`,
            borderRadius: '50%',
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
            borderRadius: 20,
            fontFamily: font,
            boxShadow: `0 4px 20px ${colors.primary}25`,
          }}
          onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── LOCATION — Warm framed map card
  // ═══════════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <SectionHeading icon={<MapPin className="w-4 h-4" />} label={t('Our Location')} />
      {sectionData.map_embed_url && (
        <div className="overflow-hidden mb-3" style={{
          borderRadius: 16,
          boxShadow: `0 2px 16px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}10`,
        }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full font-bold text-xs"
            style={{ borderColor: `${colors.secondary}50`, color: colors.primary, borderRadius: 20, fontFamily: font }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT FORM — Warm elegant input fields with rose accents
  // ═══════════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="p-6" style={{
        background: colors.cardBg,
        borderRadius: 16,
        boxShadow: `0 3px 20px ${colors.secondary}10`,
        border: `1px solid ${colors.secondary}12`,
      }}>
        {sectionData.form_title && (
          <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>
        )}
        {sectionData.form_subtitle && (
          <p className="text-[11px] mb-5" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>
        )}
        <div className="space-y-3">
          <input type="text" placeholder={t('Your Names')}
            className="w-full px-4 py-3 text-xs outline-none transition-all focus:ring-2"
            style={{ background: `${colors.secondary}06`, color: colors.text, border: `1px solid ${colors.secondary}15`, fontFamily: font, borderRadius: 12 }} />
          <input type="email" placeholder={t('Email Address')}
            className="w-full px-4 py-3 text-xs outline-none transition-all focus:ring-2"
            style={{ background: `${colors.secondary}06`, color: colors.text, border: `1px solid ${colors.secondary}15`, fontFamily: font, borderRadius: 12 }} />
          <textarea placeholder={t('Tell us about your relationship goals...')} rows={3}
            className="w-full px-4 py-3 text-xs outline-none resize-none transition-all focus:ring-2"
            style={{ background: `${colors.secondary}06`, color: colors.text, border: `1px solid ${colors.secondary}15`, fontFamily: font, borderRadius: 12 }} />
          <Button className="w-full font-bold text-xs"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              borderRadius: 20,
              fontFamily: font,
              boxShadow: `0 4px 20px ${colors.primary}20`,
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
          borderRadius: 16,
          boxShadow: `0 2px 16px ${colors.secondary}10`,
          border: `1px solid ${colors.secondary}10`,
        }}>
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── QR SHARE — Warm rounded share buttons
  // ═══════════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex gap-3">
        {sectionData.enable_qr && (
          <Button variant="outline" className="font-bold flex-1 text-xs"
            style={{ borderColor: `${colors.secondary}35`, color: colors.primary, fontFamily: font, borderRadius: 20 }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
          </Button>
        )}
        <Button variant="outline" className="font-bold flex-1 text-xs"
          style={{ borderColor: `${colors.secondary}35`, color: colors.primary, fontFamily: font, borderRadius: 20 }}
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
  // ─── FOOTER — Warm romantic footer with heart signature
  // ═══════════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{ background: `linear-gradient(135deg, ${colors.secondary}06, ${colors.accent}08)` }}>
      <HeartConnector />
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
        .coach-tpl-couplescoach h1,
        .coach-tpl-couplescoach h2,
        .coach-tpl-couplescoach h3,
        .coach-tpl-couplescoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-couplescoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 20,
      boxShadow: `0 8px 40px ${colors.primary}08`,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* ─── CTA FOOTER — Strengthen Your Bond with heart glow ─── */}
      <div className="p-5 space-y-3">
        <Button className="w-full h-14 font-bold text-sm relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 24,
            fontFamily: font,
            boxShadow: `0 6px 28px ${colors.primary}25, 0 0 80px ${colors.secondary}10`,
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <svg width="18" height="17" viewBox="0 0 24 22" fill="white" className="mr-2" style={{ animation: 'heartPulse 2s ease-in-out infinite' }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {t('Strengthen Your Bond')}
        </Button>
        <Button size="sm" variant="outline" className="w-full font-bold text-xs"
          style={{ borderColor: `${colors.secondary}40`, color: colors.primary, borderRadius: 20, fontFamily: font }}
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

      {/* heartPulse animation (also referenced by testimonials) */}
      <style>{`
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

