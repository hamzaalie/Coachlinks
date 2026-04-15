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
 * Money Mindset & Abundance Coach — "Liquid Gold" theme.
 * Ultra-luxurious black & gold, diamond profile, golden circle SVGs, Cormorant Garamond headings.
 */
interface MoneyMindsetCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

const GoldenCirclesSVG = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="260" height="140" viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="70" r="50" stroke="#D4AF37" strokeWidth="1" opacity="0.18" />
    <circle cx="110" cy="50" r="40" stroke="#D4AF37" strokeWidth="1" opacity="0.12" />
    <circle cx="160" cy="80" r="55" stroke="#D4AF37" strokeWidth="1" opacity="0.15" />
    <circle cx="200" cy="40" r="35" stroke="#D4AF37" strokeWidth="1" opacity="0.1" />
    <circle cx="40" cy="110" r="30" stroke="#D4AF37" strokeWidth="1" opacity="0.08" />
    <circle cx="220" cy="100" r="28" stroke="#D4AF37" strokeWidth="1" opacity="0.13" />
  </svg>
);

const DiamondIcon = ({ size = 16, color = '#D4AF37' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MoneyMindsetCoachTemplate({ data, template: _template, businessType }: MoneyMindsetCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'money-mindset-coach';
  // Load modern Google Fonts
  const _fontPair = getCoachFonts('money-mindset-coach');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);

  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 5500);
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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#D4AF37',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#1A1A1A',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#D4AF37',
    background: configSections.colors?.background || '#000000',
    text: configSections.colors?.text || '#F5F0E8',
    cardBg: configSections.colors?.cardBg || '#121212',
  };

  const gold = '#D4AF37';
  const goldGrad = 'linear-gradient(135deg, #D4AF37, #B8941F)';
  const goldBorder = '1px solid rgba(212,175,55,0.2)';
  const goldGlow = 'inset 0 2px 16px rgba(212,175,55,0.03)';
  const cardShadow = `${goldGlow}, 0 4px 20px rgba(0,0,0,0.3)`;
  const serifFont = _fontPair.heading;
  const sansFont = configSections.font || _fontPair.body;
  const allSections = templateDef?.sections || [];

  const renderSection = (sectionKey: string) => {
    const sd = configSections[sectionKey] || {};
    if (!sd || Object.keys(sd).length === 0 || sd.enabled === false) return null;
    switch (sectionKey) {
      case 'header': return renderHeader(sd);
      case 'contact': return renderContact(sd);
      case 'about': return renderAbout(sd);
      case 'programs': return renderPrograms(sd);
      case 'signature_offer': return renderSignatureOffer(sd);
      case 'results': return renderResults(sd);
      case 'transformations': return renderTransformations(sd);
      case 'lead_magnet': return renderLeadMagnet(sd);
      case 'booking': return renderBooking(sd);
      case 'testimonials': return renderTestimonials(sd);
      case 'social': return renderSocial(sd);
      case 'links': return renderLinks(sd);
      case 'business_hours': return renderBusinessHours(sd);
      case 'appointments': return renderAppointments(sd);
      case 'google_map': return renderLocation(sd);
      case 'contact_form': return renderContactForm(sd);
      case 'custom_html': return renderCustomHtml(sd);
      case 'qr_share': return renderQrShare(sd);
      case 'footer': return renderFooter(sd);
      default: return null;
    }
  };

  // ─── Header — Pure black, liquid gold overlay, diamond profile ──
  const renderHeader = (d: any) => (
    <div className="relative overflow-hidden" style={{ background: '#000', minHeight: '300px', borderRadius: '24px 24px 0 0' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.1) 0%, transparent 50%)' }} />
      <GoldenCirclesSVG className="absolute top-2 right-0 opacity-60" />
      <GoldenCirclesSVG className="absolute bottom-0 left-[-40px] opacity-30 rotate-180" />
      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(212,175,55,0.15)', color: gold, backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.25)', fontFamily: sansFont }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(l => l.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 rounded-xl shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]"
                style={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(212,175,55,0.3)' }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center space-x-2 transition-colors ${currentLanguage === lang.code ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
                    style={{ backgroundColor: currentLanguage === lang.code ? 'rgba(212,175,55,0.1)' : 'transparent' }}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relative px-8 pt-14 pb-12 text-center">
        <div className="mx-auto mb-6" style={{ width: '120px', height: '120px', transform: 'rotate(45deg)', overflow: 'hidden', borderRadius: '12px', border: `3px solid ${gold}`, boxShadow: '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1)' }}>
          {d.profile_image ? (
            <img src={d.profile_image} alt="Profile" className="w-full h-full object-cover" style={{ transform: 'rotate(-45deg) scale(1.42)' }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold" style={{ background: goldGrad, color: '#000', transform: 'rotate(-45deg)', fontFamily: serifFont }}>
              {(d.name || '?').charAt(0)}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-wider mb-1.5" style={{ color: gold, fontFamily: serifFont }}>{d.name || t('Coach Name')}</h1>
        <p className="mb-3 uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.6)', fontFamily: sansFont, fontSize: '11px' }}>{d.title || ''}</p>
        {d.tagline && <p className="text-xs max-w-[280px] mx-auto leading-relaxed italic" style={{ color: 'rgba(212,175,55,0.7)', fontFamily: serifFont }}>"{d.tagline}"</p>}
      </div>
    </div>
  );

  // ─── Contact — Gold-bordered dark pills ──
  const renderContact = (d: any) => (
    <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
      <div className="flex flex-wrap justify-center gap-2.5">
        {d.email && (
          <a href={`mailto:${d.email}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, border: goldBorder, boxShadow: 'inset 0 1px 8px rgba(212,175,55,0.05)' }}>
            <Mail className="w-4 h-4" style={{ color: gold }} /><span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Email')}</span>
          </a>
        )}
        {d.phone && (
          <a href={`tel:${d.phone}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, border: goldBorder, boxShadow: 'inset 0 1px 8px rgba(212,175,55,0.05)' }}>
            <Phone className="w-4 h-4" style={{ color: gold }} /><span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Call')}</span>
          </a>
        )}
        {d.website && (
          <a href={sanitizeUrl(d.website)} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, border: goldBorder, boxShadow: 'inset 0 1px 8px rgba(212,175,55,0.05)' }}>
            <Globe className="w-4 h-4" style={{ color: gold }} /><span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{t('Website')}</span>
          </a>
        )}
        {d.location && (
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-full" style={{ backgroundColor: colors.cardBg, border: goldBorder }}>
            <MapPin className="w-4 h-4" style={{ color: gold }} /><span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{d.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Dark charcoal card, gold top border ──
  const renderAbout = (d: any) => {
    if (!d.description) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <div className="relative p-6 rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: cardShadow }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: gold, fontFamily: serifFont }}>{t('About')}</h3>
          <p className="text-sm leading-[1.8] mb-4" style={{ color: colors.text, fontFamily: sansFont }}>{sanitizeText(d.description)}</p>
          {d.specializations && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: gold, fontFamily: serifFont }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(d.specializations) ? d.specializations : String(d.specializations || '').split(',').filter(Boolean)).map((s: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-full px-3 py-1 border-0" style={{ background: 'rgba(212,175,55,0.12)', color: gold, fontFamily: sansFont }}>{s.trim()}</Badge>
                ))}
              </div>
            </div>
          )}
          {d.certifications_list && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: gold, fontFamily: serifFont }}>{t('Credentials')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(d.certifications_list) ? d.certifications_list : String(d.certifications_list || '').split(',').filter(Boolean)).map((c: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-full px-3 py-1" style={{ borderColor: 'rgba(212,175,55,0.4)', color: colors.text, fontFamily: sansFont }}>
                    <Award className="w-3 h-3 mr-1" style={{ color: gold }} /> {c.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {d.experience && (
            <div className="flex justify-center mt-5">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: gold, fontFamily: serifFont }}>{d.experience}+</div>
                <p className="text-xs mt-0.5" style={{ color: colors.text + '80', fontFamily: sansFont }}>{t('Years')}</p>
              </div>
            </div>
          )}
          {d.philosophy && (
            <div className="mt-5 p-4 rounded-xl italic text-sm leading-relaxed text-center" style={{ backgroundColor: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', color: gold, fontFamily: serifFont }}>
              "{d.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Vertical stack with gold number medallions ──
  const renderPrograms = (d: any) => {
    const programs = d.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-center text-lg font-bold mb-5" style={{ color: gold, fontFamily: serifFont }}>{t('Programs')}</h3>
        <div className="space-y-4">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: cardShadow }}>
              <div className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: goldGrad, color: '#000', fontFamily: serifFont, boxShadow: '0 4px 12px rgba(212,175,55,0.3)' }}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-sm" style={{ color: gold, fontFamily: serifFont }}>{prog.title}</h4>
                    {prog.price && <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: sansFont }}>{prog.price}</span>}
                  </div>
                  {prog.description && <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + 'BB', fontFamily: sansFont }}>{prog.description}</p>}
                  <div className="flex items-center gap-2 flex-wrap">
                    {prog.format && <Badge className="text-[10px] rounded-full border-0" style={{ background: 'rgba(212,175,55,0.12)', color: gold }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                    {prog.duration && <span className="text-[11px] px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(212,175,55,0.08)', color: colors.text + 'CC' }}>{t('Duration')}: {prog.duration}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Gold gradient border all around ──
  const renderSignatureOffer = (d: any) => {
    if (!d.framework_name && !d.offer_title) return null;
    const title = d.framework_name || d.offer_title;
    const desc = d.framework_description || d.offer_description;
    const pillars = d.pillars || [];
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <div className="rounded-xl p-[2px]" style={{ background: 'linear-gradient(135deg, #D4AF37, #B8941F, #D4AF37, #E8C84A)' }}>
          <div className="rounded-[10px] overflow-hidden" style={{ backgroundColor: colors.cardBg }}>
            <div className="p-6 text-center">
              <DiamondIcon size={20} color={gold} />
              <h3 className="text-lg font-bold mt-3 mb-2" style={{ color: gold, fontFamily: serifFont }}>{title}</h3>
              {desc && <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{desc}</p>}
            </div>
            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="px-6 pb-6 space-y-2.5">
                {pillars.map((p: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: goldGrad, color: '#000' }}>{i + 1}</div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: gold, fontFamily: serifFont }}>{p.name}</p>
                      {p.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '90', fontFamily: sansFont }}>{p.description}</p>}
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

  // ─── Results — Large gold numbers, horizontal dividers ──
  const renderResults = (d: any) => {
    const stats: { label: string; value: string }[] = [];
    Object.entries(d).forEach(([key, val]) => {
      if (val && typeof val === 'string' && !['case_studies', 'enabled'].includes(key))
        stats.push({ label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: val as string });
    });
    const caseStudies = d.case_studies || [];
    if (stats.length === 0 && caseStudies.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-center text-lg font-bold mb-5 flex items-center justify-center gap-2" style={{ color: gold, fontFamily: serifFont }}>
          <BarChart3 className="w-5 h-5" style={{ color: gold }} /> {t('Results')}
        </h3>
        {stats.length > 0 && (
          <div className="rounded-xl p-5 mb-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: goldGlow }}>
            {stats.slice(0, 6).map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center justify-between py-4">
                  <p className="text-xs uppercase tracking-wider" style={{ color: colors.text + '90', fontFamily: sansFont }}>{s.label}</p>
                  <span className="text-2xl font-bold" style={{ color: gold, fontFamily: serifFont }}>{s.value}</span>
                </div>
                {i < stats.length - 1 && i < 5 && <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />}
              </React.Fragment>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                <p className="text-sm font-bold mb-1.5" style={{ color: gold, fontFamily: serifFont }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA' }}><span className="font-semibold" style={{ color: gold }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.text }}><span className="font-semibold" style={{ color: gold }}>{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-1.5" style={{ color: gold }}>{cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations — Gold-accented before/after ──
  const renderTransformations = (d: any) => {
    const stories = d.stories || d.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-lg font-bold mb-5 text-center flex items-center justify-center gap-2" style={{ color: gold, fontFamily: serifFont }}>
          <Zap className="w-5 h-5" style={{ color: gold }} /> {t('Transformations')}
        </h3>
        <div className="space-y-4">
          {stories.slice(0, 3).map((s: any, i: number) => (
            <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: cardShadow }}>
              <p className="text-sm font-bold mb-3" style={{ color: gold, fontFamily: serifFont }}>{s.client_name || `${t('Client')} ${i + 1}`}</p>
              {(s.before_image || s.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {s.before_image && <div className="relative rounded-lg overflow-hidden aspect-square" style={{ border: goldBorder }}><img src={s.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full">{t('Before')}</span></div>}
                  {s.after_image && <div className="relative rounded-lg overflow-hidden aspect-square" style={{ border: '1px solid rgba(212,175,55,0.3)' }}><img src={s.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1.5 left-1.5 text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,175,55,0.8)', color: '#000' }}>{t('After')}</span></div>}
                </div>
              )}
              <div className="space-y-2">
                {s.before_state && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}><span className="font-semibold" style={{ color: colors.text + '90' }}>{t('Before')}:</span> <span style={{ color: colors.text + 'CC' }}>{s.before_state}</span></div>}
                {s.after_state && <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}><span className="font-semibold" style={{ color: gold }}>{t('After')}:</span> <span style={{ color: colors.text }}>{s.after_state}</span></div>}
                {s.testimonial && <p className="text-xs italic leading-relaxed pt-1" style={{ color: gold, opacity: 0.8, fontFamily: serifFont }}>"{s.testimonial}"</p>}
                {s.timeframe && <Badge className="text-[10px] rounded-full border-0 mt-1" style={{ background: 'rgba(212,175,55,0.12)', color: gold }}>{s.timeframe}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Gold-to-black gradient, exclusive feel ──
  const renderLeadMagnet = (d: any) => {
    if (!d.magnet_title) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <div className="p-6 rounded-xl text-center" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.9) 100%)', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.2)' }}>
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"><DiamondIcon size={28} color={gold} /></div>
          <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: gold, fontFamily: sansFont }}>{t('Exclusive')}</p>
          <h3 className="text-base font-bold mb-2" style={{ color: gold, fontFamily: serifFont }}>{d.magnet_title}</h3>
          {d.magnet_description && <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: sansFont }}>{d.magnet_description}</p>}
          {d.magnet_image && (
            <div className="w-28 h-28 mx-auto mb-5 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
              <img src={d.magnet_image} alt="Free Resource" className="w-full h-full object-cover" />
            </div>
          )}
          <Button className="rounded-full px-7 py-2.5 border-0 font-bold" style={{ background: goldGrad, color: '#000', fontFamily: sansFont }}
            onClick={() => d.magnet_url ? (typeof window !== 'undefined' && window.open(d.magnet_url, '_blank', 'noopener,noreferrer')) : (typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal')))}>
            {d.magnet_url ? <><Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}</> : <><Gift className="w-4 h-4 mr-2" /> {t('Claim Your Free Gift')}</>}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Booking — Gold border card, diamond accent ──
  const renderBooking = (d: any) => (
    <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
      <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors.cardBg, border: '1px solid rgba(212,175,55,0.3)', boxShadow: 'inset 0 2px 20px rgba(212,175,55,0.04), 0 8px 32px rgba(0,0,0,0.3)' }}>
        <DiamondIcon size={18} color={gold} />
        <h3 className="font-bold text-base mb-1 mt-3" style={{ color: gold, fontFamily: serifFont }}>{t('Book Your Free Call')}</h3>
        {d.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + '88', fontFamily: sansFont }}>{d.call_duration}</p>}
        {d.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{d.call_description}</p>}
        <Button className="rounded-full px-7 border-0 font-bold" style={{ background: goldGrad, color: '#000', fontFamily: sansFont }}
          onClick={() => { if (d.booking_url) { if (typeof window !== 'undefined') window.open(d.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Gold stars, quote marks, dark bg ──
  const renderTestimonials = (d: any) => {
    const reviews = d.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-lg font-bold mb-4 text-center" style={{ color: gold, fontFamily: serifFont }}>{t('What Clients Say')}</h3>
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: colors.cardBg, border: goldBorder, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            <div className="flex transition-all duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
              {reviews.map((r: any, i: number) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="p-6 relative">
                    <span className="absolute top-3 right-5 text-4xl leading-none" style={{ color: 'rgba(212,175,55,0.15)', fontFamily: serifFont }}>"</span>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, s) => <Star key={s} className="w-5 h-5" fill={s < parseInt(r.rating || 5) ? gold : 'transparent'} style={{ color: s < parseInt(r.rating || 5) ? gold : 'rgba(212,175,55,0.2)' }} />)}
                    </div>
                    <p className="text-sm mb-4 italic leading-[1.8]" style={{ color: colors.text, fontFamily: serifFont }}>"{r.review}"</p>
                    <div className="flex items-center gap-3">
                      {r.client_photo && <img src={r.client_photo} alt="" className="w-9 h-9 rounded-full object-cover" style={{ border: '2px solid rgba(212,175,55,0.4)' }} />}
                      <div>
                        <p className="text-xs font-bold" style={{ color: gold, fontFamily: serifFont }}>{r.client_name}</p>
                        {r.client_title && <p className="text-[11px]" style={{ color: colors.text + '80', fontFamily: sansFont }}>{r.client_title}</p>}
                      </div>
                    </div>
                    {r.result_highlight && <div className="mt-3 p-2.5 rounded-lg text-xs" style={{ backgroundColor: 'rgba(212,175,55,0.08)', color: gold }}><CheckCircle className="w-3 h-3 inline mr-1" /> {r.result_highlight}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrentReview(i)} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{ backgroundColor: i === currentReview % reviews.length ? gold : 'rgba(212,175,55,0.2)', transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)', boxShadow: i === currentReview % reviews.length ? '0 0 8px rgba(212,175,55,0.5)' : 'none' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social — Gold circular buttons ──
  const renderSocial = (d: any) => {
    const links = d.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: gold, fontFamily: serifFont }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="ghost" className="w-11 h-11 rounded-full p-0"
              style={{ backgroundColor: 'rgba(212,175,55,0.12)', color: gold, border: '1px solid rgba(212,175,55,0.25)' }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize font-bold">{(link.platform || '?').charAt(0).toUpperCase()}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links — Black cards with gold text ──
  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '💛' };
  const renderLinks = (d: any) => {
    const items = d.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: gold, fontFamily: serifFont }}>{t('Quick Links')}</h3>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:scale-[1.01]"
              style={{ backgroundColor: colors.cardBg, border: '1px solid rgba(212,175,55,0.15)', boxShadow: 'inset 0 1px 12px rgba(212,175,55,0.03)' }}>
              <span className="text-base flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: gold, fontFamily: sansFont }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-[11px] truncate mt-0.5" style={{ color: colors.text + '60' }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours ──
  const renderBusinessHours = (d: any) => {
    const hours = d.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-sm font-bold mb-3 text-center" style={{ color: gold, fontFamily: serifFont }}>{t('Availability')}</h3>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: goldGlow }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between px-5 py-2.5" style={{ borderBottom: i < hours.length - 1 ? '1px solid rgba(212,175,55,0.08)' : 'none' }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.text, fontFamily: sansFont }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '40' : gold, fontFamily: sansFont }}>{h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──
  const renderAppointments = (d: any) => (
    <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
      <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: cardShadow }}>
        <h3 className="font-bold text-base mb-2" style={{ color: gold, fontFamily: serifFont }}>{t('Book a Session')}</h3>
        {d?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{d.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-7 border-0 font-bold" style={{ background: goldGrad, color: '#000', fontFamily: sansFont }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Location ──
  const renderLocation = (d: any) => {
    if (!d.map_embed_url && !d.directions_url) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: gold, fontFamily: serifFont }}>
          <MapPin className="w-4 h-4" style={{ color: gold }} /> {t('Location')}
        </h3>
        {d.map_embed_url && (
          <div className="rounded-xl overflow-hidden mb-3" style={{ height: '180px', border: '1px solid rgba(212,175,55,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
            <div dangerouslySetInnerHTML={{ __html: d.map_embed_url }} className="w-full h-full" />
          </div>
        )}
        {d.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: 'rgba(212,175,55,0.4)', color: gold, fontFamily: sansFont }}
            onClick={() => typeof window !== 'undefined' && window.open(d.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  // ─── Contact Form ──
  const renderContactForm = (d: any) => {
    if (!d.form_title) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, boxShadow: cardShadow }}>
          <h3 className="font-bold text-base mb-2" style={{ color: gold, fontFamily: serifFont }}>{d.form_title}</h3>
          {d.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{d.form_subtitle}</p>}
          <Button size="sm" className="rounded-full px-6 border-0 font-bold" style={{ background: goldGrad, color: '#000', fontFamily: sansFont }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Custom HTML ──
  const renderCustomHtml = (d: any) => {
    if (!d.html_content) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        {d.show_title && d.section_title && <h3 className="text-center text-base font-bold mb-3" style={{ color: gold, fontFamily: serifFont }}>{d.section_title}</h3>}
        <div className="p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${gold}`, fontFamily: sansFont, color: colors.text, boxShadow: goldGlow }}>
          <StableHtmlContent htmlContent={d.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ──
  const renderQrShare = (d: any) => {
    if (!d.enable_qr && !d.qr_foreground) return null;
    return (
      <div className="px-7 py-5" style={{ backgroundColor: colors.background }}>
        <div className="text-center p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, border: goldBorder, boxShadow: goldGlow }}>
          <h3 className="font-bold text-sm mb-2 flex items-center justify-center gap-2" style={{ color: gold, fontFamily: serifFont }}>
            <Share2 className="w-4 h-4" style={{ color: gold }} /> {t('Share')}
          </h3>
          {d.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{d.share_message}</p>}
          <Button className="w-full rounded-full border-0 font-bold" style={{ background: goldGrad, color: '#000', fontFamily: sansFont }} onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Footer ──
  const renderFooter = (d: any) => {
    if (!d.footer_text && !d.copyright_text) return null;
    return (
      <div className="px-7 py-4 text-center" style={{ backgroundColor: colors.background }}>
        {d.footer_text && <p className="text-xs italic mb-1" style={{ color: 'rgba(212,175,55,0.5)', fontFamily: serifFont }}>{d.footer_text}</p>}
        {d.copyright_text && <p className="text-[11px]" style={{ color: colors.text + '40', fontFamily: sansFont }}>{d.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ──
  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden" style={{ fontFamily: sansFont, backgroundColor: colors.background, borderRadius: '28px', boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1)', direction: isRTL ? 'rtl' : 'ltr' }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>)}

      {/* CTA Footer — Full gold gradient, "Invest in Yourself" */}
      <div className="px-7 py-6 space-y-3" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.04), rgba(212,175,55,0.08))' }}>
        <Button className="w-full h-14 font-bold rounded-full transition-all hover:scale-[1.02] border-0"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #E8C84A, #D4AF37)', color: '#000', fontFamily: serifFont, fontSize: '15px', boxShadow: '0 8px 30px rgba(212,175,55,0.3)' }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button className="w-full h-12 font-bold rounded-full transition-all hover:scale-[1.02] border-0"
          style={{ background: goldGrad, color: '#000', fontFamily: serifFont, fontSize: '14px', boxShadow: '0 6px 24px rgba(212,175,55,0.25)' }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Sparkles className="w-4 h-4 mr-2" /> {t('Invest in Yourself')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: 'rgba(212,175,55,0.3)', color: gold, fontFamily: sansFont }}
          onClick={() => {
            const cd = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(m => { m.downloadVCF(cd); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-7 pb-5 pt-1" style={{ backgroundColor: colors.background }}>
          {copyrightSection.text && <p className="text-[11px] text-center" style={{ color: colors.text + '35', fontFamily: sansFont }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={sansFont} socialLinks={configSections.social?.social_links || []} />
    </div>
  );
}
