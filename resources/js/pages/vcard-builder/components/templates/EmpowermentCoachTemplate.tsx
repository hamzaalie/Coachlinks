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
 * EmpowermentCoachTemplate — REGAL CROWN design
 *
 * Luxurious, empowering, feminine-powerful layout for Women's Empowerment Coaches.
 * - Rose gold (#B76E79) to deep plum (#4A0E2E) gradient header with crown/tiara SVG silhouette overlay
 * - Scalloped/flower-edge profile frame with rose gold border
 * - Bottom gradient fade borders on cards
 * - Gold crown accent details and corner ornament boxes
 * - Playfair Display serif font, alternating pink/lavender testimonial tints
 * - Double-border signature offer box with CSS corner ornaments
 * - Regal, luxurious, empowering feel throughout
 */

interface EmpowermentCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EmpowermentCoachTemplate({ data, template: _template, businessType }: EmpowermentCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'empowerment-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#9D174D',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#4A0E2E',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F5C563',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#FFF5F7',
    text: configSections.colors?.text || templateTheme.textColor || '#2D0A1B',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const roseGold = '#B76E79';
  const _fontPair = getCoachFonts('empowerment-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /** Crown SVG silhouette as an inline data-uri for header overlay */
  const crownSvgBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' opacity='0.06'%3E%3Cpath d='M20 80L40 30L60 55L100 15L140 55L160 30L180 80Z' fill='white'/%3E%3Ccircle cx='40' cy='28' r='5' fill='white'/%3E%3Ccircle cx='100' cy='12' r='6' fill='white'/%3E%3Ccircle cx='160' cy='28' r='5' fill='white'/%3E%3C/svg%3E")`;

  /** Subtle diamond pattern for section backgrounds */
  const regalPatternBg = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23${colors.primary.replace('#', '')}' stroke-width='0.3' opacity='0.06'/%3E%3C/svg%3E")`;

  /** Section heading — elegant with decorative line and crown icon */
  const SectionHeading = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${roseGold})` }} />
        <span style={{ color: colors.accent }}>
          {icon}
        </span>
        <div className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${roseGold})` }} />
      </div>
      <h2 className="text-sm font-bold tracking-wider" style={{ color: colors.text, fontFamily: font, letterSpacing: '0.12em' }}>
        {label}
      </h2>
      <div className="flex items-center gap-1 mt-2">
        <div className="w-2 h-2 rotate-45" style={{ background: colors.accent, opacity: 0.5 }} />
        <div className="w-12 h-px" style={{ background: roseGold }} />
        <div className="w-2 h-2 rotate-45" style={{ background: colors.accent }} />
        <div className="w-12 h-px" style={{ background: roseGold }} />
        <div className="w-2 h-2 rotate-45" style={{ background: colors.accent, opacity: 0.5 }} />
      </div>
    </div>
  );

  /** Card wrapper with bottom gradient fade border */
  const RegalCard = ({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
    <div className={`relative overflow-hidden ${className}`} style={{
      background: colors.cardBg,
      borderRadius: 12,
      boxShadow: `0 2px 16px ${colors.primary}08`,
      ...style,
    }}>
      {children}
      {/* Bottom gradient fade border */}
      <div className="absolute bottom-0 left-3 right-3 h-[2px]" style={{
        background: `linear-gradient(to right, transparent, ${roseGold}, ${colors.accent}, ${roseGold}, transparent)`,
      }} />
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── HEADER — Rose gold → plum gradient + crown SVG + scalloped profile
  // ═══════════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(160deg, ${roseGold} 0%, ${colors.primary} 45%, ${colors.secondary} 100%)`,
      minHeight: 300,
    }}>
      {/* Crown SVG silhouette pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: crownSvgBg,
        backgroundSize: '200px 100px',
        backgroundRepeat: 'repeat',
      }} />
      {/* Scallop edge overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="w-full h-6" fill={colors.background}>
          <path d="M0,30 Q25,0 50,30 Q75,0 100,30 Q125,0 150,30 Q175,0 200,30 Q225,0 250,30 Q275,0 300,30 Q325,0 350,30 Q375,0 400,30 L400,30 L0,30 Z" />
        </svg>
      </div>
      {/* Radial glow behind profile area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-72 h-72 rounded-full" style={{
        background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`,
      }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 text-xs transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', fontFamily: font, border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 20 }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]" style={{ borderRadius: 12 }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-pink-50 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-pink-50 text-pink-700' : 'text-gray-700'}`}
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
      <div className="relative z-10 flex flex-col items-center justify-center pt-14 pb-12 px-6 text-center">
        {/* Tiny crown icon above profile */}
        <div className="mb-3">
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18L6 5L11 11L16 2L21 11L26 5L30 18H2Z" stroke={colors.accent} strokeWidth="1.5" fill={colors.accent + '30'} />
            <circle cx="6" cy="4" r="2" fill={colors.accent} />
            <circle cx="16" cy="1" r="2.5" fill={colors.accent} />
            <circle cx="26" cy="4" r="2" fill={colors.accent} />
          </svg>
        </div>

        {/* Scalloped/flower-edge profile frame */}
        {sectionData.profile_image && (
          <div className="relative mb-5">
            {/* Scalloped border outer ring using repeating circles */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ width: 132, height: 132, left: -2, top: -2 }}>
              <svg width="132" height="132" viewBox="0 0 132 132" className="absolute">
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i / 16) * Math.PI * 2;
                  const cx = 66 + 60 * Math.cos(angle);
                  const cy = 66 + 60 * Math.sin(angle);
                  return <circle key={i} cx={cx} cy={cy} r="10" fill="none" stroke={roseGold} strokeWidth="1.2" opacity="0.6" />;
                })}
              </svg>
            </div>
            <img
              src={sanitizeUrl(sectionData.profile_image)}
              alt={sanitizeText(sectionData.name || '')}
              className="w-28 h-28 object-cover rounded-full"
              style={{
                border: `4px solid ${roseGold}`,
                boxShadow: `0 0 0 3px ${colors.accent}40, 0 8px 32px rgba(0,0,0,0.3)`,
              }}
            />
          </div>
        )}

        <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: font, letterSpacing: '0.08em' }}>
          {sanitizeText(sectionData.name || '')}
        </h1>
        <div className="flex items-center gap-2 my-3">
          <div className="w-8 h-px" style={{ background: `linear-gradient(to right, transparent, ${colors.accent})` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: colors.accent }} />
          <div className="w-8 h-px" style={{ background: `linear-gradient(to left, transparent, ${colors.accent})` }} />
        </div>
        {sectionData.title && (
          <p className="text-xs tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: font, letterSpacing: '0.1em' }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <p className="text-[11px] italic px-6 py-2 mt-2 max-w-xs" style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.75)',
            fontFamily: font,
            borderRadius: 20,
            border: `1px solid rgba(255,255,255,0.12)`,
          }}>
            ✦ {sanitizeText(sectionData.tagline)} ✦
          </p>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT — Elegant rose gold pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
      <div className="flex flex-wrap gap-2.5 justify-center">
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`}
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, border: `1px solid ${roseGold}30`, borderRadius: 24, fontFamily: font, boxShadow: `0 2px 8px ${colors.primary}08` }}>
            <Mail className="w-3.5 h-3.5" style={{ color: roseGold }} />
            <span className="text-[11px]" style={{ color: colors.text }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`}
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, border: `1px solid ${roseGold}30`, borderRadius: 24, fontFamily: font, boxShadow: `0 2px 8px ${colors.primary}08` }}>
            <Phone className="w-3.5 h-3.5" style={{ color: roseGold }} />
            <span className="text-[11px]" style={{ color: colors.text }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 transition-all hover:shadow-lg"
            style={{ background: colors.cardBg, border: `1px solid ${roseGold}30`, borderRadius: 24, fontFamily: font, boxShadow: `0 2px 8px ${colors.primary}08` }}>
            <Globe className="w-3.5 h-3.5" style={{ color: roseGold }} />
            <span className="text-[11px]" style={{ color: colors.text }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: colors.cardBg, border: `1px solid ${colors.accent}30`, borderRadius: 24, fontFamily: font, boxShadow: `0 2px 8px ${colors.primary}08` }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            <span className="text-[11px]" style={{ color: colors.text }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── ABOUT — Full-width banner with rose-gold stat circles
  // ═══════════════════════════════════════════════════════════
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-7" style={{
        backgroundImage: regalPatternBg,
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.primary}06 100%)`,
      }}>
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('My Story')} />
        {sectionData.description && (
          <p className="text-xs leading-relaxed mb-5 text-center italic" style={{ color: colors.text + 'CC', fontFamily: font, lineHeight: '2' }}>
            {sanitizeText(sectionData.description)}
          </p>
        )}
        {/* Rose-gold stat circles */}
        {sectionData.experience && (
          <div className="flex justify-center gap-5 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                background: `linear-gradient(135deg, ${roseGold}20, ${colors.accent}20)`,
                border: `2px solid ${roseGold}60`,
              }}>
                <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.experience)}</span>
              </div>
              <span className="text-[9px] mt-1.5 tracking-wider" style={{ color: colors.text + '88', fontFamily: font }}>{t('Experience')}</span>
            </div>
            {sectionData.clients_served && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{
                  background: `linear-gradient(135deg, ${roseGold}20, ${colors.accent}20)`,
                  border: `2px solid ${roseGold}60`,
                }}>
                  <span className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.clients_served)}</span>
                </div>
                <span className="text-[9px] mt-1.5 tracking-wider" style={{ color: colors.text + '88', fontFamily: font }}>{t('Clients')}</span>
              </div>
            )}
          </div>
        )}
        {specializations.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {specializations.map((spec: string, i: number) => (
              <span key={i} className="text-[10px] px-3 py-1.5 italic" style={{
                background: `linear-gradient(135deg, ${colors.primary}10, ${roseGold}10)`,
                color: colors.primary,
                fontFamily: font,
                borderRadius: 20,
                border: `1px solid ${roseGold}25`,
              }}>
                ✦ {sanitizeText(spec)}
              </span>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div className="space-y-2 mb-4">
            {certifications.map((cert: string, i: number) => (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Award className="w-3 h-3" style={{ color: colors.accent }} />
                <span className="text-[11px] italic" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(cert)}</span>
              </div>
            ))}
          </div>
        )}
        {sectionData.philosophy && (
          <RegalCard className="mt-4 p-5 text-center">
            <p className="text-xs italic leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: font, lineHeight: '2' }}>
              "{sanitizeText(sectionData.philosophy)}"
            </p>
          </RegalCard>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── PROGRAMS — Elegant stacked cards with left rose-gold decorative line
  // ═══════════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    return (
      <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Zap className="w-4 h-4" />} label={t('Empowerment Programs')} />
        <div className="space-y-4">
          {programs.map((program: any, idx: number) => (
            <RegalCard key={idx} className="relative" style={{ overflow: 'visible' }}>
              {/* Left rose-gold decorative line */}
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{
                background: `linear-gradient(to bottom, ${colors.accent}, ${roseGold}, ${colors.primary})`,
                borderRadius: 2,
              }} />
              <div className="pl-5 pr-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                    background: `linear-gradient(135deg, ${colors.accent}30, ${roseGold}30)`,
                    border: `1px solid ${colors.accent}50`,
                  }}>
                    <span className="text-[10px] font-bold" style={{ color: colors.primary, fontFamily: font }}>{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm italic mb-1" style={{ color: colors.primary, fontFamily: font }}>
                      {sanitizeText(program.title || '')}
                    </h3>
                    {program.description && (
                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {program.format && (
                        <span className="text-[10px] px-2.5 py-1" style={{ background: colors.primary + '10', color: colors.primary, borderRadius: 12, fontFamily: font }}>
                          {sanitizeText(program.format)}
                        </span>
                      )}
                      {program.duration && (
                        <span className="text-[10px] px-2.5 py-1" style={{ background: colors.accent + '15', color: colors.accent, borderRadius: 12, fontFamily: font }}>
                          {sanitizeText(program.duration)}
                        </span>
                      )}
                      {program.price && (
                        <span className="text-[10px] px-2.5 py-1 font-bold ml-auto" style={{ background: roseGold + '15', color: roseGold, borderRadius: 12, fontFamily: font }}>
                          {sanitizeText(program.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </RegalCard>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── SIGNATURE OFFER — Double-border elegant box with corner ornaments
  // ═══════════════════════════════════════════════════════════
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Gift className="w-4 h-4" />} label={t('Signature Offer')} />
        {/* Double-border outer box */}
        <div className="relative p-1" style={{
          border: `2px solid ${roseGold}50`,
          borderRadius: 16,
        }}>
          {/* Corner ornaments via pseudo-element style divs */}
          <div className="absolute -top-1 -left-1 w-4 h-4" style={{ borderTop: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderRadius: '4px 0 0 0' }} />
          <div className="absolute -top-1 -right-1 w-4 h-4" style={{ borderTop: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderRadius: '0 4px 0 0' }} />
          <div className="absolute -bottom-1 -left-1 w-4 h-4" style={{ borderBottom: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderRadius: '0 0 0 4px' }} />
          <div className="absolute -bottom-1 -right-1 w-4 h-4" style={{ borderBottom: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderRadius: '0 0 4px 0' }} />
          {/* Inner box */}
          <div className="p-5" style={{
            background: `linear-gradient(180deg, ${colors.cardBg}, ${colors.primary}04)`,
            border: `1px solid ${roseGold}20`,
            borderRadius: 12,
          }}>
            {/* Small crown at top center */}
            <div className="flex justify-center mb-3">
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                <path d="M1 12L4 3L8 7L12 1L16 7L20 3L23 12H1Z" stroke={colors.accent} strokeWidth="1" fill={colors.accent + '25'} />
              </svg>
            </div>
            {title && (
              <h3 className="font-bold text-base text-center italic mb-2" style={{ color: colors.primary, fontFamily: font }}>
                {sanitizeText(title)}
              </h3>
            )}
            {description && (
              <p className="text-xs text-center mb-5 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(description)}</p>
            )}
            {pillars.length > 0 && (
              <div className="space-y-3">
                {pillars.map((pillar: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 px-3 py-3"
                    style={{
                      background: `linear-gradient(135deg, ${roseGold}08, ${colors.accent}08)`,
                      borderRadius: 10,
                      borderLeft: `3px solid ${colors.accent}`,
                    }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                      background: colors.accent + '25',
                      border: `1px solid ${colors.accent}40`,
                    }}>
                      <span className="text-[9px] font-bold" style={{ color: colors.primary, fontFamily: font }}>{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs italic" style={{ color: colors.primary, fontFamily: font }}>
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
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── RESULTS — Rose-gold accent stat cards + case studies
  // ═══════════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<BarChart3 className="w-4 h-4" />} label={t('Empowerment Results')} />
        {statFields.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} className="relative overflow-hidden p-4 text-center" style={{
                background: colors.cardBg,
                borderRadius: 12,
                boxShadow: `0 2px 12px ${colors.primary}06`,
              }}>
                {/* Bottom gradient border */}
                <div className="absolute bottom-0 left-2 right-2 h-[2px]" style={{
                  background: `linear-gradient(to right, transparent, ${idx % 2 === 0 ? roseGold : colors.accent}, transparent)`,
                }} />
                <p className="text-lg font-bold" style={{ color: idx % 2 === 0 ? colors.primary : roseGold, fontFamily: font }}>
                  {sanitizeText(String(val))}
                </p>
                <p className="text-[9px] tracking-wider mt-1 italic" style={{ color: colors.text + '88', fontFamily: font }}>
                  {sanitizeText(key.replace(/_/g, ' '))}
                </p>
              </div>
            ))}
          </div>
        )}
        {caseStudies.map((cs: any, idx: number) => (
          <RegalCard key={idx} className="mb-3 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-3.5 h-3.5" style={{ color: colors.accent }} />
              <h4 className="font-bold text-xs italic" style={{ color: colors.primary, fontFamily: font }}>
                {sanitizeText(cs.client_name || cs.company || cs.family_name || '')}
              </h4>
            </div>
            {(cs.challenge || cs.starting_point) && (
              <div className="flex items-start gap-2 mb-1.5 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-bold italic" style={{ background: roseGold + '15', color: roseGold, borderRadius: 8, fontFamily: font }}>{t('Before')}</span>
                <span className="text-[11px]" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(cs.challenge || cs.starting_point)}</span>
              </div>
            )}
            {cs.result && (
              <div className="flex items-start gap-2 mb-1.5 pl-1">
                <span className="text-[9px] px-2 py-0.5 font-bold italic" style={{ background: colors.primary + '15', color: colors.primary, borderRadius: 8, fontFamily: font }}>{t('After')}</span>
                <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.result)}</span>
              </div>
            )}
            {cs.revenue_impact && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2" style={{ background: colors.accent + '10', borderRadius: 8, borderLeft: `3px solid ${colors.accent}` }}>
                <TrendingUp className="w-3 h-3" style={{ color: colors.accent }} />
                <span className="text-[11px] font-bold italic" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(cs.revenue_impact)}</span>
              </div>
            )}
          </RegalCard>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── TRANSFORMATIONS — Empowering before/after stories
  // ═══════════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<TrendingUp className="w-4 h-4" />} label={t('Transformations')} />
        <div className="space-y-4">
          {stories.map((story: any, idx: number) => (
            <RegalCard key={idx} style={{ overflow: 'hidden' }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-px" style={{ background: roseGold + '20' }}>
                  {story.before_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.before_image)} alt={t('Before')} className="w-full h-28 object-cover" />
                      <span className="absolute top-1.5 left-1.5 text-[9px] px-2 py-0.5 font-bold italic" style={{ background: roseGold + 'DD', color: 'white', borderRadius: 10, fontFamily: font }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative">
                      <img src={sanitizeUrl(story.after_image)} alt={t('After')} className="w-full h-28 object-cover" />
                      <span className="absolute top-1.5 left-1.5 text-[9px] px-2 py-0.5 font-bold italic" style={{ background: colors.primary + 'DD', color: 'white', borderRadius: 10, fontFamily: font }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-4">
                <h4 className="font-bold text-xs italic mb-2" style={{ color: colors.primary, fontFamily: font }}>
                  {sanitizeText(story.client_name || '')}
                </h4>
                {story.before_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: roseGold }}>◇</span>
                    <span className="text-[11px] italic" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(story.before_state)}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: colors.accent }}>♛</span>
                    <span className="text-[11px] font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.after_state)}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-[11px] italic mt-2 px-3 py-2" style={{
                    background: `linear-gradient(135deg, ${colors.primary}06, ${roseGold}06)`,
                    color: colors.text + 'AA',
                    borderLeft: `3px solid ${colors.accent}`,
                    borderRadius: 8,
                    fontFamily: font,
                  }}>
                    "{sanitizeText(story.testimonial)}"
                  </p>
                )}
                {story.timeframe && (
                  <p className="text-[10px] mt-2 font-bold italic flex items-center gap-1" style={{ color: roseGold, fontFamily: font }}>
                    <Calendar className="w-3 h-3" /> {sanitizeText(story.timeframe)}
                  </p>
                )}
              </div>
            </RegalCard>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LEAD MAGNET — Gift card with crown motif
  // ═══════════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
      <SectionHeading icon={<Download className="w-4 h-4" />} label={t('Free Gift for You')} />
      <RegalCard style={{ overflow: 'hidden' }}>
        {sectionData.magnet_image && (
          <div className="relative">
            <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-36 object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, ${colors.cardBg})` }} />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{
              background: `linear-gradient(135deg, ${colors.accent}25, ${roseGold}25)`,
              border: `1.5px solid ${colors.accent}50`,
            }}>
              <Gift className="w-5 h-5" style={{ color: colors.accent }} />
            </div>
            <div>
              {sectionData.magnet_title && (
                <h3 className="font-bold text-sm italic mb-1" style={{ color: colors.primary, fontFamily: font }}>
                  {sanitizeText(sectionData.magnet_title)}
                </h3>
              )}
              {sectionData.magnet_description && (
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>
              )}
            </div>
          </div>
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-3 font-bold italic" style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                borderRadius: 24,
                fontFamily: font,
              }}>
                <Download className="w-4 h-4 mr-2" /> {t('Claim Your Gift')} ✦
              </Button>
            </a>
          )}
        </div>
      </RegalCard>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── BOOKING — Regal scheduling card
  // ═══════════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
      <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Book Your Session')} />
      <RegalCard className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{
            background: `linear-gradient(135deg, ${colors.primary}15, ${roseGold}15)`,
            border: `1.5px solid ${roseGold}40`,
          }}>
            <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
          <div>
            <h3 className="font-bold text-xs italic" style={{ color: colors.primary, fontFamily: font }}>{t('Empowerment Session')}</h3>
            {sectionData.call_duration && (
              <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>
            )}
          </div>
        </div>
        {sectionData.call_description && (
          <p className="text-xs mb-4 leading-relaxed italic" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>
        )}
        <Button className="w-full font-bold italic text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 24,
            fontFamily: font,
          }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Reserve Your Spot')} ✦
        </Button>
      </RegalCard>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── TESTIMONIALS — Serif quote marks, alternating pink/lavender tints
  // ═══════════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    const tintColors = ['#FFF0F5', '#F5F0FF', '#FFF5F0', '#F0F5FF'];
    return (
      <div className="px-5 py-7" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Star className="w-4 h-4" />} label={t('Words of Praise')} />
        <div className="space-y-4">
          {reviews.map((review: any, idx: number) => (
            <div key={idx} className="relative overflow-hidden p-5" style={{
              background: tintColors[idx % tintColors.length],
              borderRadius: 14,
              boxShadow: `0 2px 12px ${colors.primary}06`,
            }}>
              {/* Large decorative serif quote mark */}
              <span className="absolute -top-2 left-4 text-7xl leading-none pointer-events-none select-none" style={{
                color: roseGold + '18',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
              }}>"</span>
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-4 right-4 h-[2px]" style={{
                background: `linear-gradient(to right, transparent, ${roseGold}, ${colors.accent}, ${roseGold}, transparent)`,
              }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  {review.client_photo && (
                    <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 object-cover rounded-full" style={{ border: `2px solid ${roseGold}40` }} />
                  )}
                  <div>
                    <p className="font-bold text-xs italic" style={{ color: colors.primary, fontFamily: font }}>
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
                  <p className="text-[11px] italic leading-relaxed mb-3" style={{ color: colors.text + 'CC', fontFamily: font, lineHeight: '1.9' }}>
                    "{sanitizeText(review.review)}"
                  </p>
                )}
                {review.result_highlight && (
                  <div className="flex items-center gap-2 px-3 py-2" style={{
                    background: colors.primary + '08',
                    borderRadius: 10,
                    borderLeft: `3px solid ${colors.accent}`,
                  }}>
                    <CheckCircle className="w-3 h-3 shrink-0" style={{ color: colors.primary }} />
                    <span className="text-[10px] font-bold italic" style={{ color: colors.primary, fontFamily: font }}>
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
  // ─── SOCIAL — Elegant round buttons with rose gold ring
  // ═══════════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Share2 className="w-4 h-4" />} label={t('Connect With Me')} />
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full text-xs font-bold transition-all hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                fontFamily: font,
                border: `2px solid ${roseGold}40`,
                boxShadow: `0 2px 8px ${colors.primary}20`,
              }}>
              {(link.platform || '').charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── LINKS — Regal link cards with diamond accent
  // ═══════════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={t('Resources')} />
        <div className="space-y-2.5">
          {items.map((item: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 transition-all hover:shadow-lg"
              style={{
                background: colors.cardBg,
                borderRadius: 12,
                border: `1px solid ${roseGold}20`,
                boxShadow: `0 1px 8px ${colors.primary}06`,
              }}>
              <div className="w-2 h-2 rotate-45 shrink-0" style={{ background: idx % 2 === 0 ? colors.accent : roseGold }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold italic truncate" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && (
                  <p className="text-[10px] truncate" style={{ color: colors.text + '77', fontFamily: font }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <span className="text-base">{linkIconMap[item.icon] || '✦'}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── BUSINESS HOURS — Elegant table with rose gold accents
  // ═══════════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
        <SectionHeading icon={<Calendar className="w-4 h-4" />} label={t('Availability')} />
        <RegalCard style={{ overflow: 'hidden' }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-5 py-3"
              style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${roseGold}12` : 'none', background: idx % 2 === 0 ? 'transparent' : `${colors.primary}03` }}>
              <span className="text-xs italic" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <Badge className="text-[10px] px-2.5 py-0.5 italic" style={{ background: roseGold + '15', color: roseGold, borderRadius: 12, border: 'none' }}>{t('Closed')}</Badge>
                : <span className="text-[11px] italic" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </RegalCard>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  // ─── APPOINTMENTS — Empowerment consultation card
  // ═══════════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
      <RegalCard className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{
            background: `linear-gradient(135deg, ${colors.accent}25, ${roseGold}25)`,
            border: `1.5px solid ${colors.accent}40`,
          }}>
            <CheckCircle className="w-4 h-4" style={{ color: colors.accent }} />
          </div>
          <h3 className="font-bold text-xs italic" style={{ color: colors.primary, fontFamily: font }}>{t('Book Consultation')}</h3>
        </div>
        {sectionData.consultation_info && (
          <p className="text-xs mb-4 italic leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>
        )}
        <Button className="w-full font-bold italic text-xs"
          style={{
            background: `linear-gradient(135deg, ${colors.accent}, ${roseGold})`,
            color: 'white',
            borderRadius: 24,
            fontFamily: font,
          }}
          onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')} ✦
        </Button>
      </RegalCard>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── LOCATION — Map with elegant rose-gold frame
  // ═══════════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
      <SectionHeading icon={<MapPin className="w-4 h-4" />} label={t('Visit Me')} />
      {sectionData.map_embed_url && (
        <div className="overflow-hidden mb-3" style={{ borderRadius: 14, border: `2px solid ${roseGold}25`, boxShadow: `0 2px 12px ${colors.primary}08` }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full font-bold italic text-xs"
            style={{ borderColor: roseGold, color: colors.primary, borderRadius: 24, fontFamily: font }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CONTACT FORM — Soft rounded inputs with rose-gold focus
  // ═══════════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-6" style={{ backgroundImage: regalPatternBg }}>
      <RegalCard className="p-5">
        {sectionData.form_title && (
          <h3 className="font-bold text-sm italic text-center mb-1" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>
        )}
        {sectionData.form_subtitle && (
          <p className="text-[11px] text-center italic mb-5" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>
        )}
        <div className="space-y-3">
          <input type="text" placeholder={t('Your Name')}
            className="w-full px-4 py-3 text-xs border outline-none transition-all focus:ring-2"
            style={{ background: colors.background, color: colors.text, borderColor: roseGold + '30', fontFamily: font, borderRadius: 24 }} />
          <input type="email" placeholder={t('Your Email')}
            className="w-full px-4 py-3 text-xs border outline-none transition-all focus:ring-2"
            style={{ background: colors.background, color: colors.text, borderColor: roseGold + '30', fontFamily: font, borderRadius: 24 }} />
          <textarea placeholder={t('Share your vision...')} rows={3}
            className="w-full px-4 py-3 text-xs border outline-none resize-none transition-all focus:ring-2"
            style={{ background: colors.background, color: colors.text, borderColor: roseGold + '30', fontFamily: font, borderRadius: 16 }} />
          <Button className="w-full font-bold italic text-xs"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              borderRadius: 24,
              fontFamily: font,
            }}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')} ✦
          </Button>
        </div>
      </RegalCard>
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── CUSTOM HTML
  // ═══════════════════════════════════════════════════════════
  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
      {sectionData.show_title && sectionData.section_title && (
        <SectionHeading icon={<Sparkles className="w-4 h-4" />} label={sanitizeText(sectionData.section_title)} />
      )}
      {sectionData.html_content && (
        <RegalCard className="p-4">
          <StableHtmlContent htmlContent={sectionData.html_content} />
        </RegalCard>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // ─── QR SHARE — Elegant pill buttons
  // ═══════════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5" style={{ backgroundImage: regalPatternBg }}>
      <div className="flex gap-3">
        {sectionData.enable_qr && (
          <Button variant="outline" className="font-bold italic flex-1 text-xs"
            style={{ borderColor: roseGold, color: colors.primary, fontFamily: font, borderRadius: 24 }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
          </Button>
        )}
        <Button variant="outline" className="font-bold italic flex-1 text-xs"
          style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font, borderRadius: 24 }}
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
  // ─── FOOTER — Elegant plum bar with gold accent
  // ═══════════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{
      background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`,
      borderTop: `1px solid ${roseGold}15`,
    }}>
      {/* Small crown ornament */}
      <div className="flex justify-center mb-2">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 8L3 2L6 5L8 1L10 5L13 2L15 8H1Z" stroke={colors.accent} strokeWidth="0.8" fill={colors.accent + '20'} />
        </svg>
      </div>
      {sectionData.footer_text && (
        <p className="text-[11px] italic mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>
      )}
      {sectionData.copyright_text && (
        <p className="text-[10px] italic" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>
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
        .coach-tpl-empowermentcoach h1,
        .coach-tpl-empowermentcoach h2,
        .coach-tpl-empowermentcoach h3,
        .coach-tpl-empowermentcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-empowermentcoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 16,
      boxShadow: `0 4px 40px ${colors.primary}12`,
      border: `1px solid ${roseGold}15`,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* ─── CTA FOOTER — Regal empowerment action bar ─── */}
      <div className="px-5 py-6 space-y-3" style={{
        backgroundImage: regalPatternBg,
        background: `linear-gradient(180deg, ${colors.background}, ${colors.primary}06)`,
      }}>
        {/* Crown ornament above CTA */}
        <div className="flex justify-center mb-1">
          <div className="flex items-center gap-2">
            <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${roseGold})` }} />
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M1 10L4 3L7 6L10 1L13 6L16 3L19 10H1Z" stroke={colors.accent} strokeWidth="1" fill={colors.accent + '20'} />
            </svg>
            <div className="h-px w-8" style={{ background: `linear-gradient(to left, transparent, ${roseGold})` }} />
          </div>
        </div>
        <Button className="w-full h-14 font-bold italic text-sm"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: 'white',
            borderRadius: 28,
            fontFamily: font,
            boxShadow: `0 6px 24px ${colors.primary}30`,
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Begin Your Empowerment Journey')} ✦
        </Button>
        <Button size="sm" variant="outline" className="w-full font-bold italic text-xs"
          style={{
            borderColor: roseGold,
            color: colors.primary,
            borderRadius: 24,
            fontFamily: font,
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
        <div className="px-6 pb-4 pt-1" style={{ backgroundImage: regalPatternBg }}>
          {copyrightSection.text && (
            <p className="text-[10px] text-center italic" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>
          )}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

