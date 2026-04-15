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

interface PerformanceCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function PerformanceCoachTemplate({ data, template: _template, businessType }: PerformanceCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'performance-coach';


  // Testimonials carousel
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 3500);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  // Language selector
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const rtlLanguages = ['ar', 'he'];
  const isRTL = rtlLanguages.includes(currentLanguage);
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };

  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#DC2626',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#0A0A0A',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#F59E0B',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#FAFAFA',
    text: configSections.colors?.text || templateTheme.textColor || '#1A1A1A',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('performance-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  /** SVG diagonal stripe pattern used in header & accent areas */
  const diagonalStripesSvg = `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='s' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'%3E%3Crect width='12' height='40' fill='rgba(255,255,255,0.045)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23s)'/%3E%3C/svg%3E")`;

  /** Circular progress ring for stats */
  const ProgressRing = ({ value, label, color }: { value: string; label: string; color: string }) => {
    const numericMatch = value.match(/(\d+)/);
    const numeric = numericMatch ? Math.min(parseInt(numericMatch[1], 10), 100) : 75;
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (numeric / 100) * circumference;
    return (
      <div style={{ textAlign: 'center' }}>
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={radius} fill="none" stroke={colors.text + '12'} strokeWidth="6" />
          <circle
            cx="48" cy="48" r={radius} fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '48px 48px', transition: 'stroke-dashoffset 0.8s ease' }}
          />
          <text x="48" y="44" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 16, fontWeight: 800, fill: color, fontFamily: font }}>{sanitizeText(value)}</text>
          <text x="48" y="62" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 8, fill: colors.text + 'AA', fontFamily: font }}>{sanitizeText(label)}</text>
        </svg>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  HEADER — Diagonal‑stripe gradient + hexagonal avatar
  // ═══════════════════════════════════════════════════════
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.primary}DD 35%, ${colors.secondary} 100%)`,
      minHeight: 310,
    }}>
      {/* Diagonal stripe overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: diagonalStripesSvg, backgroundSize: '40px 40px' }} />
      {/* Bottom-left angled accent */}
      <div className="absolute bottom-0 left-0 w-full h-24" style={{
        background: `linear-gradient(8deg, ${colors.background} 48%, transparent 49%)`,
      }} />

      {/* Language selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:scale-105"
              style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF', backdropFilter: 'blur(8px)', fontFamily: font, borderRadius: 4, letterSpacing: '0.06em' }}
            >
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]" style={{ borderRadius: 6 }}>
                {languageData.map(lang => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-red-50 text-red-600' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-10 pb-16 px-6 text-center">
        {/* Hexagonal profile image with gold ring */}
        {sectionData.profile_image && (
          <div className="mb-5 relative" style={{ width: 130, height: 130 }}>
            {/* Gold ring hex */}
            <div className="absolute inset-0" style={{
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}CC)`,
            }} />
            <div style={{
              position: 'absolute', inset: 4,
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              overflow: 'hidden',
            }}>
              <img
                src={sanitizeUrl(sectionData.profile_image)}
                alt={sanitizeText(sectionData.name || '')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Small medal badge */}
            <div className="absolute" style={{
              bottom: -2, right: 8, width: 28, height: 28, borderRadius: '50%',
              background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '2px solid #FFF',
            }}>
              <Award className="w-3.5 h-3.5" style={{ color: '#FFF' }} />
            </div>
          </div>
        )}
        <h1 style={{
          fontFamily: font, fontSize: 28, fontWeight: 900, letterSpacing: '0.04em',
          textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1.1, marginBottom: 6,
        }}>{sanitizeText(sectionData.name || '')}</h1>
        {sectionData.title && (
          <p style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {sanitizeText(sectionData.title)}
          </p>
        )}
        {sectionData.tagline && (
          <span style={{
            display: 'inline-block', fontFamily: font, fontSize: 12, fontWeight: 700,
            color: colors.accent, background: 'rgba(0,0,0,0.55)', padding: '5px 16px',
            borderLeft: `3px solid ${colors.accent}`, letterSpacing: '0.05em', marginTop: 4,
          }}>{sanitizeText(sectionData.tagline)}</span>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  CONTACT — Bold black cards with accent top stripe
  // ═══════════════════════════════════════════════════════
  const renderContactSection = (sectionData: any) => (
    <div style={{ padding: '20px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {sectionData.email && (
          <a href={`mailto:${sanitizeText(sectionData.email)}`} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 14,
            background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${colors.primary}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none', transition: 'transform 0.15s',
          }}>
            <Mail className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />
            <span style={{ fontSize: 11, color: colors.text, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanitizeText(sectionData.email)}</span>
          </a>
        )}
        {sectionData.phone && (
          <a href={`tel:${sanitizeText(sectionData.phone)}`} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 14,
            background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${colors.accent}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none',
          }}>
            <Phone className="w-4 h-4 shrink-0" style={{ color: colors.accent }} />
            <span style={{ fontSize: 11, color: colors.text, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanitizeText(sectionData.phone)}</span>
          </a>
        )}
        {sectionData.website && (
          <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 14,
            background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${colors.secondary}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none',
          }}>
            <Globe className="w-4 h-4 shrink-0" style={{ color: colors.secondary }} />
            <span style={{ fontSize: 11, color: colors.text, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanitizeText(sectionData.website)}</span>
          </a>
        )}
        {sectionData.location && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 14,
            background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${colors.primary}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <MapPin className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />
            <span style={{ fontSize: 11, color: colors.text, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanitizeText(sectionData.location)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  ABOUT — Split layout: massive experience # left, text right
  // ═══════════════════════════════════════════════════════
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div style={{ padding: '24px 20px' }}>
        {/* Section title with red line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Sparkles className="w-5 h-5" style={{ color: colors.accent }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('About Me')}</h2>
        </div>

        {/* Split layout */}
        {(sectionData.experience || sectionData.description) && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            {sectionData.experience && (
              <div style={{
                minWidth: 90, padding: '16px 12px', textAlign: 'center', borderRadius: 8,
                background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})`,
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              }}>
                <span style={{ fontFamily: font, fontSize: 36, fontWeight: 900, color: '#FFF', lineHeight: 1 }}>
                  {sanitizeText(sectionData.experience.replace(/[^0-9+]/g, '') || sectionData.experience)}
                </span>
                <span style={{ fontFamily: font, fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{t('Years Exp')}</span>
              </div>
            )}
            {sectionData.description && (
              <p style={{ flex: 1, fontSize: 13, lineHeight: 1.65, color: colors.text + 'CC', fontFamily: font, margin: 0 }}>
                {sanitizeText(sectionData.description)}
              </p>
            )}
          </div>
        )}

        {/* Specializations as bold badges */}
        {specializations.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {specializations.map((spec: string, i: number) => (
              <Badge key={i} style={{
                fontFamily: font, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                padding: '5px 12px', borderRadius: 4, background: colors.primary + '15', color: colors.primary, border: 'none',
              }}>{sanitizeText(spec)}</Badge>
            ))}
          </div>
        )}

        {/* Certifications with medal icons */}
        {certifications.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {certifications.map((cert: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle className="w-4 h-4" style={{ color: colors.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontFamily: font, color: colors.text + 'BB', fontWeight: 600 }}>{sanitizeText(cert)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Philosophy quote with bar accent */}
        {sectionData.philosophy && (
          <div style={{
            padding: '14px 18px', borderLeft: `4px solid ${colors.accent}`, background: colors.secondary + '08',
            borderRadius: '0 8px 8px 0', marginTop: 8,
          }}>
            <p style={{ fontFamily: font, fontSize: 12, fontStyle: 'italic', color: colors.text + 'AA', lineHeight: 1.6, margin: 0 }}>
              "{sanitizeText(sectionData.philosophy)}"
            </p>
          </div>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  PROGRAMS — Card‑deck with overlapping fold effect
  // ═══════════════════════════════════════════════════════
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    const stripeColors = [colors.primary, colors.accent, colors.secondary, '#10B981', '#6366F1', '#EC4899'];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Programs')}</h2>
        </div>
        <div style={{ position: 'relative' }}>
          {programs.map((program: any, idx: number) => {
            const stripe = stripeColors[idx % stripeColors.length];
            return (
              <div key={idx} style={{
                position: 'relative', marginBottom: idx < programs.length - 1 ? -6 : 0,
                zIndex: programs.length - idx,
                background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${stripe}`,
                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                padding: '18px 16px', transition: 'transform 0.2s',
              }}>
                {/* Fold / corner triangle */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: 0, height: 0,
                  borderTop: `22px solid ${stripe}`, borderLeft: '22px solid transparent',
                  borderRadius: '0 8px 0 0', opacity: 0.5,
                }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: font, fontSize: 15, fontWeight: 800, textTransform: 'uppercase', color: colors.text, margin: 0, letterSpacing: '0.03em' }}>
                      {sanitizeText(program.title || '')}
                    </h3>
                    {program.description && (
                      <p style={{ fontSize: 11, lineHeight: 1.55, color: colors.text + 'AA', fontFamily: font, marginTop: 6, marginBottom: 8 }}>
                        {sanitizeText(program.description)}
                      </p>
                    )}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {program.format && (
                        <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 3, background: stripe + '18', color: stripe, fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sanitizeText(program.format)}</span>
                      )}
                      {program.duration && (
                        <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 3, background: colors.text + '0A', color: colors.text + '99', fontFamily: font }}>{sanitizeText(program.duration)}</span>
                      )}
                    </div>
                  </div>
                  {program.price && (
                    <div style={{
                      padding: '8px 14px', borderRadius: 6, fontFamily: font, fontSize: 14, fontWeight: 900,
                      background: stripe, color: '#FFF', whiteSpace: 'nowrap', letterSpacing: '0.02em',
                    }}>{sanitizeText(program.price)}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  SIGNATURE OFFER
  // ═══════════════════════════════════════════════════════
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{
          borderRadius: 8, overflow: 'hidden',
          background: `linear-gradient(160deg, ${colors.secondary} 0%, ${colors.primary}DD 100%)`,
          position: 'relative',
        }}>
          <div className="absolute inset-0" style={{ backgroundImage: diagonalStripesSvg, backgroundSize: '40px 40px', opacity: 0.6 }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px' }}>
            <Gift className="w-7 h-7" style={{ color: colors.accent, marginBottom: 10 }} />
            {title && <h3 style={{ fontFamily: font, fontSize: 20, fontWeight: 900, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>{sanitizeText(title)}</h3>}
            {description && <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', fontFamily: font, margin: '0 0 18px' }}>{sanitizeText(description)}</p>}
            {pillars.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pillars.map((pillar: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                    background: 'rgba(255,255,255,0.08)', borderRadius: 6, borderLeft: `3px solid ${colors.accent}`,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: colors.accent, color: colors.secondary, fontFamily: font, fontWeight: 900, fontSize: 13, flexShrink: 0,
                    }}>{i + 1}</div>
                    <div>
                      <h4 style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: '#FFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sanitizeText(pillar.name || '')}</h4>
                      {pillar.description && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: font, marginTop: 3, marginBottom: 0, lineHeight: 1.45 }}>{sanitizeText(pillar.description)}</p>}
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

  // ═══════════════════════════════════════════════════════
  //  RESULTS — Circular progress ring SVGs
  // ═══════════════════════════════════════════════════════
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(
      ([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k)
    );
    const ringColors = [colors.primary, colors.accent, '#10B981', '#6366F1'];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <BarChart3 className="w-5 h-5" style={{ color: colors.primary }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Results')}</h2>
        </div>
        {/* Circular progress rings */}
        {statFields.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 18 }}>
            {statFields.slice(0, 4).map(([key, val], idx) => (
              <div key={key} style={{ background: colors.cardBg, borderRadius: 8, padding: '16px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderTop: `4px solid ${ringColors[idx % ringColors.length]}` }}>
                <ProgressRing value={String(val)} label={key.replace(/_/g, ' ')} color={ringColors[idx % ringColors.length]} />
              </div>
            ))}
          </div>
        )}
        {/* Case studies */}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} style={{
            marginBottom: 12, padding: '16px', borderRadius: 8,
            background: colors.cardBg, borderLeft: `4px solid ${colors.accent}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: 14, color: colors.text, margin: '0 0 6px', textTransform: 'uppercase' }}>{sanitizeText(cs.client_name || cs.company || cs.family_name || '')}</h4>
            {(cs.challenge || cs.starting_point) && <p style={{ fontSize: 11, color: colors.text + '99', margin: '0 0 4px' }}>🔻 {sanitizeText(cs.challenge || cs.starting_point)}</p>}
            {cs.result && <p style={{ fontSize: 11, fontWeight: 700, color: colors.primary, margin: '0 0 4px' }}>🔺 {sanitizeText(cs.result)}</p>}
            {cs.revenue_impact && <p style={{ fontSize: 11, fontWeight: 800, color: colors.accent, margin: 0 }}>🏆 {sanitizeText(cs.revenue_impact)}</p>}
          </div>
        ))}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  TRANSFORMATIONS — Before / After with bold treatment
  // ═══════════════════════════════════════════════════════
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <TrendingUp className="w-5 h-5" style={{ color: colors.primary }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Transformations')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {stories.map((story: any, idx: number) => (
            <div key={idx} style={{ borderRadius: 8, overflow: 'hidden', background: colors.cardBg, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', borderTop: `4px solid ${colors.primary}` }}>
              {/* Before / After images */}
              {(story.before_image || story.after_image) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {story.before_image && (
                    <div style={{ position: 'relative' }}>
                      <img src={sanitizeUrl(story.before_image)} alt="Before" style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 3, background: colors.primary, color: '#FFF', fontFamily: font, textTransform: 'uppercase' }}>{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div style={{ position: 'relative' }}>
                      <img src={sanitizeUrl(story.after_image)} alt="After" style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 3, background: '#10B981', color: '#FFF', fontFamily: font, textTransform: 'uppercase' }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              <div style={{ padding: 16 }}>
                <h4 style={{ fontFamily: font, fontWeight: 800, fontSize: 14, textTransform: 'uppercase', color: colors.text, margin: '0 0 8px' }}>{sanitizeText(story.client_name || '')}</h4>
                {story.before_state && <p style={{ fontSize: 11, color: colors.primary, margin: '0 0 4px', fontWeight: 600 }}>❌ {sanitizeText(story.before_state)}</p>}
                {story.after_state && <p style={{ fontSize: 11, color: '#10B981', margin: '0 0 8px', fontWeight: 700 }}>✅ {sanitizeText(story.after_state)}</p>}
                {story.testimonial && (
                  <p style={{ fontSize: 11, fontStyle: 'italic', color: colors.text + 'AA', lineHeight: 1.5, padding: '10px 14px', background: colors.text + '06', borderRadius: 6, margin: '0 0 6px' }}>
                    "{sanitizeText(story.testimonial)}"
                  </p>
                )}
                {story.timeframe && <p style={{ fontSize: 10, fontWeight: 800, color: colors.accent, fontFamily: font, margin: 0 }}>⏱ {sanitizeText(story.timeframe)}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  LEAD MAGNET — High‑energy download CTA
  // ═══════════════════════════════════════════════════════
  const renderLeadMagnetSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        borderRadius: 8, overflow: 'hidden', position: 'relative',
        background: `linear-gradient(160deg, ${colors.secondary}, ${colors.primary}DD)`,
      }}>
        <div className="absolute inset-0" style={{ backgroundImage: diagonalStripesSvg, backgroundSize: '40px 40px', opacity: 0.5 }} />
        {sectionData.magnet_image && <img src={sanitizeUrl(sectionData.magnet_image)} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', opacity: 0.6 }} />}
        <div style={{ position: 'relative', zIndex: 1, padding: '24px 20px', textAlign: 'center' }}>
          <Download className="w-8 h-8 mx-auto" style={{ color: colors.accent, marginBottom: 10 }} />
          {sectionData.magnet_title && <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 900, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px' }}>{sanitizeText(sectionData.magnet_title)}</h3>}
          {sectionData.magnet_description && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: font, lineHeight: 1.55, margin: '0 0 16px' }}>{sanitizeText(sectionData.magnet_description)}</p>}
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button style={{
                background: colors.accent, color: colors.secondary, fontFamily: font,
                fontWeight: 800, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 28px',
              }}>
                <Zap className="w-4 h-4 mr-2" /> {t('Get It Free')}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  BOOKING — Energetic CTA card
  // ═══════════════════════════════════════════════════════
  const renderBookingSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        borderRadius: 8, padding: '28px 20px', textAlign: 'center',
        background: colors.cardBg, borderTop: `4px solid ${colors.primary}`,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', margin: '0 auto 14px',
          background: colors.primary + '14', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Calendar className="w-7 h-7" style={{ color: colors.primary }} />
        </div>
        <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 900, textTransform: 'uppercase', color: colors.text, margin: '0 0 6px', letterSpacing: '0.04em' }}>{t('Book a Call')}</h3>
        {sectionData.call_duration && <p style={{ fontSize: 12, color: colors.text + 'AA', margin: '0 0 4px', fontFamily: font }}>⏰ {sanitizeText(sectionData.call_duration)}</p>}
        {sectionData.call_description && <p style={{ fontSize: 12, color: colors.text + '99', fontFamily: font, margin: '0 0 16px', lineHeight: 1.5 }}>{sanitizeText(sectionData.call_description)}</p>}
        <Button
          style={{ background: colors.primary, color: '#FFF', fontFamily: font, fontWeight: 800, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '12px 32px' }}
          onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}
        >
          <Zap className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  TESTIMONIALS — Horizontal snap carousel + gold stars
  // ═══════════════════════════════════════════════════════
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    return (
      <div style={{ padding: '24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingLeft: 20 }}>
          <div style={{ width: 32, height: 4, background: colors.accent, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Testimonials')}</h2>
        </div>
        {/* Horizontal scroll carousel */}
        <div style={{
          display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
          paddingLeft: 20, paddingRight: 20, paddingBottom: 8,
          WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none',
        }}>
          {reviews.map((review: any, idx: number) => (
            <div key={idx} style={{
              minWidth: 260, maxWidth: 280, scrollSnapAlign: 'start', flexShrink: 0,
              borderRadius: 8, padding: '18px 16px', background: colors.cardBg,
              borderTop: `4px solid ${colors.accent}`, boxShadow: '0 3px 12px rgba(0,0,0,0.06)',
            }}>
              {/* Stars */}
              {review.rating && (
                <div style={{ marginBottom: 10 }}>
                  {Array.from({ length: Number(review.rating) }).map((_, i) => (
                    <Star key={i} className="inline-block" style={{ width: 14, height: 14, color: colors.accent, fill: colors.accent, marginRight: 2 }} />
                  ))}
                </div>
              )}
              {review.review && <p style={{ fontSize: 11, fontStyle: 'italic', lineHeight: 1.55, color: colors.text + 'BB', fontFamily: font, margin: '0 0 12px' }}>"{sanitizeText(review.review)}"</p>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
                {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colors.accent}` }} />}
                <div>
                  <p style={{ fontFamily: font, fontWeight: 700, fontSize: 12, color: colors.text, margin: 0 }}>{sanitizeText(review.client_name || '')}</p>
                  {review.client_title && <p style={{ fontSize: 10, color: colors.text + '88', margin: 0 }}>{sanitizeText(review.client_title)}</p>}
                </div>
              </div>
              {review.result_highlight && (
                <div style={{
                  marginTop: 10, padding: '5px 10px', borderRadius: 4, fontSize: 10, fontWeight: 800,
                  background: colors.primary + '12', color: colors.primary, fontFamily: font, display: 'inline-block',
                }}>🏆 {sanitizeText(review.result_highlight)}</div>
              )}
            </div>
          ))}
        </div>
        {/* Dot indicators */}
        {reviews.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
            {reviews.map((_: any, i: number) => (
              <div key={i} style={{
                width: i === currentReview % reviews.length ? 18 : 6, height: 6, borderRadius: 3,
                background: i === currentReview % reviews.length ? colors.accent : colors.accent + '35',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  SOCIAL — Hexagonal Social Buttons
  // ═══════════════════════════════════════════════════════
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Connect')}</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer" style={{
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: '#FFF', fontSize: 13, fontWeight: 800, fontFamily: font, textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              {(link.platform || '').charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  LINKS — Bold list with top accent bar
  // ═══════════════════════════════════════════════════════
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Links')}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              background: colors.cardBg, borderRadius: 8, borderTop: `4px solid ${colors.primary}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textDecoration: 'none', transition: 'transform 0.15s',
            }}>
              <span style={{ fontSize: 18 }}>{linkIconMap[item.icon] || '🔗'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: font, fontSize: 13, fontWeight: 700, color: colors.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{sanitizeText(item.text || '')}</p>
                {item.description && <p style={{ fontSize: 10, color: colors.text + '88', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanitizeText(item.description)}</p>}
              </div>
              <Zap className="w-4 h-4" style={{ color: colors.primary, flexShrink: 0 }} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  BUSINESS HOURS — Bold table with striped rows
  // ═══════════════════════════════════════════════════════
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Hours')}</h2>
        </div>
        <div style={{ borderRadius: 8, overflow: 'hidden', background: colors.cardBg, borderTop: `4px solid ${colors.primary}`, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', background: idx % 2 === 0 ? 'transparent' : colors.text + '04',
              borderBottom: idx < hours.length - 1 ? `1px solid ${colors.text}0A` : 'none',
            }}>
              <span style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed
                ? <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 4, background: colors.primary + '15', color: colors.primary, fontFamily: font, textTransform: 'uppercase' }}>{t('Closed')}</span>
                : <span style={{ fontSize: 12, color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>
              }
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════
  //  APPOINTMENTS
  // ═══════════════════════════════════════════════════════
  const renderAppointmentsSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        borderRadius: 8, padding: '24px 20px', textAlign: 'center',
        background: colors.cardBg, border: `2px dashed ${colors.primary}40`, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      }}>
        <Target className="w-7 h-7 mx-auto" style={{ color: colors.primary, marginBottom: 10 }} />
        <h3 style={{ fontFamily: font, fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: colors.text, margin: '0 0 8px', letterSpacing: '0.04em' }}>{t('Consultation')}</h3>
        {sectionData.consultation_info && <p style={{ fontSize: 12, color: colors.text + '99', fontFamily: font, margin: '0 0 14px', lineHeight: 1.5 }}>{sanitizeText(sectionData.consultation_info)}</p>}
        <Button style={{ background: colors.primary, color: '#FFF', fontFamily: font, fontWeight: 800, borderRadius: 6, textTransform: 'uppercase', padding: '10px 24px' }} onClick={() => handleAppointmentBooking(sectionData)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Appointment')}
        </Button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  LOCATION
  // ═══════════════════════════════════════════════════════
  const renderLocationSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
        <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{t('Location')}</h2>
      </div>
      {sectionData.map_embed_url && (
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 12, borderTop: `4px solid ${colors.primary}`, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <iframe src={sanitizeUrl(sectionData.map_embed_url)} style={{ width: '100%', height: 200, border: 0 }} allowFullScreen loading="lazy" />
        </div>
      )}
      {sectionData.directions_url && (
        <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" style={{
            width: '100%', borderRadius: 6, fontFamily: font, fontWeight: 700,
            borderColor: colors.primary, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        </a>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  CONTACT FORM
  // ═══════════════════════════════════════════════════════
  const renderContactFormSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        borderRadius: 8, padding: '24px 20px',
        background: colors.cardBg, borderTop: `4px solid ${colors.primary}`,
        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
      }}>
        {sectionData.form_title && <h3 style={{ fontFamily: font, fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: colors.text, margin: '0 0 4px', letterSpacing: '0.04em' }}>{sanitizeText(sectionData.form_title)}</h3>}
        {sectionData.form_subtitle && <p style={{ fontSize: 12, color: colors.text + '99', fontFamily: font, margin: '0 0 16px' }}>{sanitizeText(sectionData.form_subtitle)}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="text" placeholder={t('Your Name')} style={{
            width: '100%', padding: '12px 16px', borderRadius: 6, fontSize: 12, border: `1px solid ${colors.text}15`,
            background: colors.background, color: colors.text, fontFamily: font, outline: 'none', boxSizing: 'border-box',
          }} />
          <input type="email" placeholder={t('Your Email')} style={{
            width: '100%', padding: '12px 16px', borderRadius: 6, fontSize: 12, border: `1px solid ${colors.text}15`,
            background: colors.background, color: colors.text, fontFamily: font, outline: 'none', boxSizing: 'border-box',
          }} />
          <textarea placeholder={t('Your Message')} rows={3} style={{
            width: '100%', padding: '12px 16px', borderRadius: 6, fontSize: 12, border: `1px solid ${colors.text}15`,
            background: colors.background, color: colors.text, fontFamily: font, outline: 'none', resize: 'none', boxSizing: 'border-box',
          }} />
          <Button style={{
            width: '100%', background: colors.primary, color: '#FFF', fontFamily: font,
            fontWeight: 800, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '12px 0',
          }}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  CUSTOM HTML
  // ═══════════════════════════════════════════════════════
  const renderCustomHtmlSection = (sectionData: any) => (
    <div style={{ padding: '24px 20px' }}>
      {sectionData.show_title && sectionData.section_title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 32, height: 4, background: colors.primary, borderRadius: 2 }} />
          <h2 style={{ fontFamily: font, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: colors.text, margin: 0 }}>{sanitizeText(sectionData.section_title)}</h2>
        </div>
      )}
      {sectionData.html_content && (
        <div style={{ borderRadius: 8, overflow: 'hidden', background: colors.cardBg, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <StableHtmlContent htmlContent={sectionData.html_content} className="p-4" />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  QR SHARE
  // ═══════════════════════════════════════════════════════
  const renderQrShareSection = (sectionData: any) => (
    <div style={{ padding: '20px 20px', display: 'flex', gap: 12, justifyContent: 'center' }}>
      {sectionData.enable_qr && (
        <Button variant="outline" style={{
          flex: 1, borderRadius: 6, fontFamily: font, fontWeight: 700,
          borderColor: colors.primary, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.04em',
        }} onClick={() => setShowQrModal(true)}>
          <QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}
        </Button>
      )}
      <Button variant="outline" style={{
        flex: 1, borderRadius: 6, fontFamily: font, fontWeight: 700,
        borderColor: colors.secondary, color: colors.secondary, textTransform: 'uppercase', letterSpacing: '0.04em',
      }} onClick={() => {
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({ title: data.name || '', text: sectionData.share_message || '', url: window.location.href });
        }
      }}>
        <Share2 className="w-4 h-4 mr-2" /> {t('Share')}
      </Button>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  FOOTER — Subtle dark strip with diagonal stripes
  // ═══════════════════════════════════════════════════════
  const renderFooterSection = (sectionData: any) => (
    <div style={{ position: 'relative', padding: '20px 24px', textAlign: 'center', background: colors.secondary + '0A' }}>
      <div className="absolute inset-0" style={{ backgroundImage: diagonalStripesSvg, backgroundSize: '40px 40px', opacity: 0.4 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sectionData.footer_text && <p style={{ fontSize: 12, color: colors.text + 'AA', fontFamily: font, margin: '0 0 4px' }}>{sanitizeText(sectionData.footer_text)}</p>}
        {sectionData.copyright_text && <p style={{ fontSize: 10, color: colors.text + '55', fontFamily: font, margin: 0 }}>{sanitizeText(sectionData.copyright_text)}</p>}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  //  SECTION ROUTER
  // ═══════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════
  //  MAIN RENDER
  // ═══════════════════════════════════════════════════════
  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(
    data.template_config || { sections: configSections, sectionSettings: configSections },
    allSections,
  );

  return (
    <>
    <style>{`
      .coach-tpl-performancecoach h1,
      .coach-tpl-performancecoach h2,
      .coach-tpl-performancecoach h3,
      .coach-tpl-performancecoach h4 { font-family: ${headingFont} !important; }
    `}</style>
    <div className="coach-tpl-performancecoach" style={{
      fontFamily: font, backgroundColor: colors.background,
      direction: isRTL ? 'rtl' : 'ltr', maxWidth: 448, margin: '0 auto',
      borderRadius: 16, overflow: 'hidden',
      boxShadow: `0 8px 44px ${colors.primary}22`,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map(sectionKey => (
          <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>
        ))}

      {/* CTA Footer */}
      <div style={{
        padding: '24px 20px', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, ${colors.secondary} 0%, ${colors.primary}CC 100%)`,
      }}>
        <div className="absolute inset-0" style={{ backgroundImage: diagonalStripesSvg, backgroundSize: '40px 40px', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button
            style={{
              width: '100%', height: 56, fontFamily: font, fontSize: 16, fontWeight: 900,
              background: colors.accent, color: colors.secondary, borderRadius: 8,
              textTransform: 'uppercase', letterSpacing: '0.06em', border: 'none',
              boxShadow: `0 4px 18px ${colors.accent}55`,
            }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}
          >
            <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
          </Button>
          <Button
            variant="outline"
            style={{
              width: '100%', fontFamily: font, fontWeight: 700, borderRadius: 8,
              borderColor: 'rgba(255,255,255,0.35)', color: '#FFF', textTransform: 'uppercase',
              letterSpacing: '0.04em', background: 'transparent',
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
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
          </Button>
        </div>
      </div>

      {/* Copyright */}
      {copyrightSection && (
        <div style={{ padding: '12px 24px 16px', textAlign: 'center' }}>
          {copyrightSection.text && <p style={{ fontSize: 10, color: colors.text + '50', fontFamily: font, margin: 0 }}>{copyrightSection.text}</p>}
        </div>
      )}

      {/* QR Modal */}
      <QRShareModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        colors={colors}
        font={font}
        socialLinks={configSections.social?.social_links || []}
      />
    </div>
    </>
  );
}
