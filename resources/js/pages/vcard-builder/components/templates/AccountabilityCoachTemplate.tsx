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

interface AccountabilityCoachTemplateProps { data: Record<string, any>; template: Record<string, any>; businessType?: string; }

export default function AccountabilityCoachTemplate({ data, template: _template, businessType }: AccountabilityCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'accountability-coach';

  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => { const reviews = configSections.testimonials?.reviews || []; if (!Array.isArray(reviews) || reviews.length <= 1) return; const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 4000); return () => clearInterval(interval); }, [configSections.testimonials?.reviews]);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const rtlLanguages = ['ar', 'he']; const isRTL = rtlLanguages.includes(currentLanguage);
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };
  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#1E3A5F',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#FF6B35',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#00B894',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#F0F4F8',
    text: configSections.colors?.text || templateTheme.textColor || '#1E3A5F',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('accountability-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  // ─── HEADER ─────────────────────────────────────────────
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${colors.primary}, ${colors.primary}E8)`, minHeight: 260 }}>
      {/* Checkerboard / grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${colors.cardBg}08 1px, transparent 1px), linear-gradient(90deg, ${colors.cardBg}08 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 50% 100%, ${colors.primary}00 0%, ${colors.primary} 70%)`,
      }} />
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}><div className="relative">
          <button onClick={() => setShowLanguageSelector(!showLanguageSelector)} className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontFamily: font }}>
            <Globe className="w-3 h-3" /><span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
          </button>
          {showLanguageSelector && (<div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
            {languageData.map((lang) => (<button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}><span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span><span>{lang.name}</span></button>))}
          </div>)}
        </div></div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center pt-10 pb-8 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-4">
            <img src={sanitizeUrl(sectionData.profile_image)} alt={sanitizeText(sectionData.name || '')} className="w-24 h-24 rounded-full object-cover" style={{ border: `3px solid ${colors.secondary}`, boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }} />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1" style={{ fontFamily: font }}>{sanitizeText(sectionData.name || '')}</h1>
        <div className="w-12 h-0.5 mx-auto my-2" style={{ background: colors.secondary }} />
        {sectionData.title && <p className="text-sm text-white/80 mb-2" style={{ fontFamily: font }}>{sanitizeText(sectionData.title)}</p>}
        {sectionData.tagline && <p className="text-xs px-4 py-1.5 rounded-md mt-1 text-white/70" style={{ background: 'rgba(255,255,255,0.08)', fontFamily: font, borderLeft: `3px solid ${colors.secondary}` }}>{sanitizeText(sectionData.tagline)}</p>}
      </div>
    </div>
  );

  // ─── CONTACT ────────────────────────────────────────────
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="space-y-2">
        {sectionData.email && <a href={`mailto:${sanitizeText(sectionData.email)}`} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '10' }}><Mail className="w-4 h-4" style={{ color: colors.primary }} /></div><span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.email)}</span></a>}
        {sectionData.phone && <a href={`tel:${sanitizeText(sectionData.phone)}`} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '10' }}><Phone className="w-4 h-4" style={{ color: colors.primary }} /></div><span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.phone)}</span></a>}
        {sectionData.website && <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '10' }}><Globe className="w-4 h-4" style={{ color: colors.primary }} /></div><span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.website)}</span></a>}
        {sectionData.location && <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '10' }}><MapPin className="w-4 h-4" style={{ color: colors.primary }} /></div><span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.location)}</span></div>}
      </div>
    </div>
  );

  // ─── ABOUT ──────────────────────────────────────────────
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Target className="w-4 h-4" style={{ color: colors.secondary }} /> {t('About Me')}</h2>
        {sectionData.description && <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(sectionData.description)}</p>}
        {specializations.length > 0 && (
          <div className="space-y-2 mb-4">{specializations.map((spec: string, i: number) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}10` }}>
              <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: colors.primary, color: 'white' }}>{i + 1}</span>
              <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(spec)}</span>
            </div>
          ))}</div>
        )}
        {certifications.length > 0 && (
          <div className="space-y-1.5 mb-3">{certifications.map((cert: string, i: number) => (
            <div key={i} className="flex items-center gap-2"><Award className="w-3.5 h-3.5" style={{ color: colors.accent }} /><span className="text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(cert)}</span></div>
          ))}</div>
        )}
        {sectionData.experience && <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg" style={{ background: colors.accent + '10', borderLeft: `3px solid ${colors.accent}` }}><CheckCircle className="w-4 h-4" style={{ color: colors.accent }} /><span className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.experience)} {t('of experience')}</span></div>}
        {sectionData.philosophy && <p className="text-xs italic mt-3 px-4 py-3 rounded-lg" style={{ background: colors.primary + '06', color: colors.text + 'AA', borderLeft: `3px solid ${colors.primary}`, fontFamily: font }}>"{sanitizeText(sectionData.philosophy)}"</p>}
      </div>
    );
  };

  // ─── PROGRAMS ───────────────────────────────────────────
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Zap className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Programs')}</h2>
        <div className="space-y-3">
          {programs.map((program: any, idx: number) => (
            <div key={idx} className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.secondary}` }}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: colors.accent }} />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(program.title || '')}</h3>
                    {program.description && <p className="text-[11px] leading-relaxed mb-2" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>}
                    {/* Progress bar aesthetic */}
                    <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ background: colors.primary + '12' }}>
                      <div className="h-full rounded-full" style={{ width: `${60 + (idx * 10) % 40}%`, background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})` }} />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      {program.format && <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: colors.primary + '10', color: colors.primary }}>{sanitizeText(program.format)}</span>}
                      {program.duration && <span className="text-[10px] px-2 py-0.5 rounded font-medium" style={{ background: colors.accent + '15', color: colors.accent }}>{sanitizeText(program.duration)}</span>}
                      {program.price && <span className="text-[10px] px-2 py-0.5 rounded font-bold ml-auto" style={{ background: colors.secondary + '15', color: colors.secondary }}>{sanitizeText(program.price)}</span>}
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

  // ─── SIGNATURE OFFER ────────────────────────────────────
  const renderSignatureOfferSection = (sectionData: any) => {
    const pillars = sectionData.pillars || [];
    const title = sectionData.framework_name || sectionData.offer_title || '';
    const description = sectionData.framework_description || sectionData.offer_description || '';
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Gift className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Signature Offer')}</h2>
        <div className="rounded-xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}>
          {title && <h3 className="font-bold text-sm mb-2" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(title)}</h3>}
          {description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(description)}</p>}
          {pillars.length > 0 && (
            <div className="space-y-2">{pillars.map((pillar: any, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: colors.background, borderLeft: `3px solid ${colors.accent}` }}>
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: colors.accent }} />
                <div><h4 className="font-semibold text-xs" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(pillar.name || '')}</h4>{pillar.description && <p className="text-[10px] mt-0.5" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(pillar.description)}</p>}</div>
              </div>
            ))}</div>
          )}
        </div>
      </div>
    );
  };

  // ─── RESULTS ────────────────────────────────────────────
  const renderResultsSection = (sectionData: any) => {
    const caseStudies = sectionData.case_studies || [];
    const statFields = Object.entries(sectionData).filter(([k, v]) => typeof v === 'string' && k !== 'enabled' && !['case_studies'].includes(k));
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><BarChart3 className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Results')}</h2>
        {/* Progress-bar style stats */}
        {statFields.length > 0 && (
          <div className="space-y-3 mb-5">{statFields.slice(0, 4).map(([key, val], idx) => (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-medium" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(key.replace(/_/g, ' '))}</span>
                <span className="text-xs font-bold" style={{ color: colors.primary }}>{sanitizeText(String(val))}</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: colors.primary + '10' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${70 + (idx * 8) % 30}%`, background: idx % 2 === 0 ? colors.secondary : colors.accent }} />
              </div>
            </div>
          ))}</div>
        )}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-3 rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.secondary}` }}>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4" style={{ color: colors.accent }} /><h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.client_name || cs.company || cs.family_name || '')}</h4></div>
              {(cs.challenge || cs.starting_point) && <div className="flex items-start gap-2 mb-1.5 pl-1"><span className="text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0" style={{ background: '#EF444420', color: '#EF4444' }}>FROM</span><span className="text-[11px]" style={{ color: colors.text + '99' }}>{sanitizeText(cs.challenge || cs.starting_point)}</span></div>}
              {cs.result && <div className="flex items-start gap-2 mb-1.5 pl-1"><span className="text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0" style={{ background: colors.accent + '20', color: colors.accent }}>TO</span><span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(cs.result)}</span></div>}
              {cs.revenue_impact && <div className="mt-2 px-3 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: colors.secondary + '10', color: colors.secondary }}>📊 {sanitizeText(cs.revenue_impact)}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ─── TRANSFORMATIONS ────────────────────────────────────
  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><TrendingUp className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Transformations')}</h2>
        <div className="space-y-4">{stories.map((story: any, idx: number) => (
          <div key={idx} className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.secondary}` }}>
            {(story.before_image || story.after_image) && (
              <div className="grid grid-cols-2 gap-px" style={{ background: colors.primary + '15' }}>
                {story.before_image && <div className="relative"><img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" /><span className="absolute top-1 left-1 text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: '#EF444490', color: 'white' }}>{t('Before')}</span></div>}
                {story.after_image && <div className="relative"><img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" /><span className="absolute top-1 left-1 text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: colors.accent + '90', color: 'white' }}>{t('After')}</span></div>}
              </div>
            )}
            <div className="p-4">
              <h4 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.client_name || '')}</h4>
              {story.before_state && <div className="flex items-start gap-2 mb-1"><span className="text-[10px] shrink-0 mt-0.5">🔴</span><span className="text-[11px]" style={{ color: colors.text + '88' }}>{sanitizeText(story.before_state)}</span></div>}
              {story.after_state && <div className="flex items-start gap-2 mb-1"><span className="text-[10px] shrink-0 mt-0.5">🟢</span><span className="text-[11px] font-medium" style={{ color: colors.text }}>{sanitizeText(story.after_state)}</span></div>}
              {story.testimonial && <p className="text-[11px] italic mt-2 px-3 py-2 rounded-lg" style={{ background: colors.background, color: colors.text + 'AA', borderLeft: `3px solid ${colors.primary}` }}>"{sanitizeText(story.testimonial)}"</p>}
              {story.timeframe && <p className="text-[10px] mt-2 font-semibold flex items-center gap-1" style={{ color: colors.accent }}><Calendar className="w-3 h-3" /> {sanitizeText(story.timeframe)}</p>}
            </div>
          </div>
        ))}</div>
      </div>
    );
  };

  // ─── LEAD MAGNET ────────────────────────────────────────
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}>
        {sectionData.magnet_image && <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-36 object-cover" />}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: colors.secondary + '15' }}><Download className="w-5 h-5" style={{ color: colors.secondary }} /></div>
            <div>
              {sectionData.magnet_title && <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.magnet_title)}</h3>}
              {sectionData.magnet_description && <p className="text-[11px] mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>}
            </div>
          </div>
          {sectionData.magnet_url && <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer"><Button className="w-full mt-3 rounded-lg font-bold" style={{ background: colors.secondary, color: 'white' }}><Download className="w-4 h-4 mr-2" /> {t('Download Free')}</Button></a>}
        </div>
      </div>
    </div>
  );

  // ─── BOOKING ────────────────────────────────────────────
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '10' }}><Calendar className="w-5 h-5" style={{ color: colors.primary }} /></div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Book a Strategy Call')}</h3>
            {sectionData.call_duration && <p className="text-[10px]" style={{ color: colors.text + '88' }}>{sanitizeText(sectionData.call_duration)}</p>}
          </div>
        </div>
        {sectionData.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>}
        <Button className="w-full rounded-lg font-bold" style={{ background: colors.primary, color: 'white' }} onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}><Calendar className="w-4 h-4 mr-2" /> {t('Schedule Call')}</Button>
      </div>
    </div>
  );

  // ─── TESTIMONIALS ───────────────────────────────────────
  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (reviews.length === 0) return null;
    const review = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Star className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Client Results')}</h2>
        <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.accent}` }}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 rounded-lg object-cover" style={{ border: `2px solid ${colors.secondary}` }} />}
              <div>
                <p className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
                {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88' }}>{sanitizeText(review.client_title)}</p>}
              </div>
            </div>
            {review.rating && <div className="mb-2">{Array.from({ length: Number(review.rating) }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 inline-block" style={{ color: colors.secondary, fill: colors.secondary }} />)}</div>}
            {review.review && <p className="text-xs leading-relaxed mb-3" style={{ color: colors.text + 'BB', fontFamily: font }}>"{sanitizeText(review.review)}"</p>}
            {review.result_highlight && <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: colors.accent + '10', borderLeft: `3px solid ${colors.accent}` }}><CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: colors.accent }} /><span className="text-[11px] font-bold" style={{ color: colors.text }}>{sanitizeText(review.result_highlight)}</span></div>}
          </div>
          {reviews.length > 1 && <div className="flex justify-center gap-1.5 pb-4">{reviews.map((_: any, i: number) => <div key={i} className="w-6 h-1 rounded-full transition-all" style={{ background: i === currentReview % reviews.length ? colors.secondary : colors.primary + '20' }} />)}</div>}
        </div>
      </div>
    );
  };

  // ─── SOCIAL ─────────────────────────────────────────────
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Share2 className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Connect')}</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:opacity-80" style={{ background: colors.primary, color: 'white' }}>{(link.platform || '').charAt(0).toUpperCase()}</a>
          ))}
        </div>
      </div>
    );
  };

  // ─── LINKS ──────────────────────────────────────────────
  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-3 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}>{t('Resources')}</h2>
        <div className="space-y-2">{items.map((item: any, idx: number) => (
          <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.secondary}` }}>
            <span className="text-base">{linkIconMap[item.icon] || '🔗'}</span>
            <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>{item.description && <p className="text-[10px] truncate" style={{ color: colors.text + '77' }}>{sanitizeText(item.description)}</p>}</div>
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: colors.primary + '10' }}><span className="text-[10px]" style={{ color: colors.primary }}>→</span></div>
          </a>
        ))}</div>
      </div>
    );
  };

  // ─── BUSINESS HOURS ─────────────────────────────────────
  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><Calendar className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Availability')}</h2>
        <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12`, borderTop: `2px solid ${colors.secondary}` }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-4 py-2.5" style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.primary}08` : 'none' }}>
              <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed ? <Badge variant="outline" className="text-[10px] px-2 py-0 border-red-200 text-red-500">{t('Closed')}</Badge> : <span className="text-[11px] font-mono" style={{ color: colors.accent }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── APPOINTMENTS ───────────────────────────────────────
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.accent}` }}>
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-6 h-6" style={{ color: colors.accent }} />
          <h3 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{t('Book Consultation')}</h3>
        </div>
        {sectionData.consultation_info && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>}
        <Button className="w-full rounded-lg font-bold" style={{ background: colors.accent, color: 'white' }} onClick={() => handleAppointmentBooking(sectionData)}><Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}</Button>
      </div>
    </div>
  );

  // ─── LOCATION ───────────────────────────────────────────
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <h2 className="text-base font-bold mb-3 flex items-center gap-2 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}><MapPin className="w-4 h-4" style={{ color: colors.secondary }} /> {t('Location')}</h2>
      {sectionData.map_embed_url && <div className="rounded-xl overflow-hidden mb-3" style={{ border: `1px solid ${colors.primary}15` }}><iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" /></div>}
      {sectionData.directions_url && <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="w-full rounded-lg font-bold" style={{ borderColor: colors.primary, color: colors.primary }}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button></a>}
    </div>
  );

  // ─── CONTACT FORM ───────────────────────────────────────
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-xl p-5" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}15`, borderTop: `2px solid ${colors.secondary}` }}>
        {sectionData.form_title && <h3 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>}
        {sectionData.form_subtitle && <p className="text-[11px] mb-4" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>}
        <div className="space-y-3">
          <input type="text" placeholder={t('Full Name')} className="w-full px-4 py-2.5 rounded-lg text-xs border outline-none transition-all focus:ring-2" style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font }} />
          <input type="email" placeholder={t('Email Address')} className="w-full px-4 py-2.5 rounded-lg text-xs border outline-none transition-all focus:ring-2" style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font }} />
          <textarea placeholder={t('How can I help you?')} rows={3} className="w-full px-4 py-2.5 rounded-lg text-xs border outline-none resize-none transition-all focus:ring-2" style={{ background: colors.background, color: colors.text, borderColor: colors.primary + '20', fontFamily: font }} />
          <Button className="w-full rounded-lg font-bold" style={{ background: colors.primary, color: 'white' }}><Mail className="w-4 h-4 mr-2" /> {t('Submit')}</Button>
        </div>
      </div>
    </div>
  );

  // ─── CUSTOM HTML ────────────────────────────────────────
  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 py-5">
      {sectionData.show_title && sectionData.section_title && <h2 className="text-base font-bold mb-3 pb-2" style={{ color: colors.text, fontFamily: font, borderBottom: `2px solid ${colors.secondary}` }}>{sanitizeText(sectionData.section_title)}</h2>}
      {sectionData.html_content && <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.primary}12` }}><StableHtmlContent htmlContent={sectionData.html_content} className="p-4" /></div>}
    </div>
  );

  // ─── QR SHARE ───────────────────────────────────────────
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex gap-3">
        {sectionData.enable_qr && <Button variant="outline" className="rounded-lg font-bold flex-1" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => setShowQrModal(true)}><QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}</Button>}
        <Button variant="outline" className="rounded-lg font-bold flex-1" style={{ borderColor: colors.secondary, color: colors.secondary, fontFamily: font }} onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) { navigator.share({ title: data.name || '', text: sectionData.share_message || '', url: window.location.href }); } }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</Button>
      </div>
    </div>
  );

  // ─── FOOTER ─────────────────────────────────────────────
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{ background: colors.primary + '06', borderTop: `1px solid ${colors.primary}10` }}>
      {sectionData.footer_text && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>}
      {sectionData.copyright_text && <p className="text-[10px]" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>}
    </div>
  );

  // ─── SECTION SWITCH ─────────────────────────────────────
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

  // ─── MAIN RENDER ────────────────────────────────────────
  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-accountabilitycoach h1,
        .coach-tpl-accountabilitycoach h2,
        .coach-tpl-accountabilitycoach h3,
        .coach-tpl-accountabilitycoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-accountabilitycoach rounded-xl overflow-hidden" style={{ fontFamily: font, backgroundColor: colors.background, direction: isRTL ? 'rtl' : 'ltr', boxShadow: `0 4px 24px ${colors.primary}18` }}>
      {orderedSectionKeys.filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key)).map((sectionKey) => (<React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>))}
      <div className="p-5 space-y-3">
        <Button className="w-full h-14 font-bold rounded-lg text-base" style={{ background: colors.primary, color: 'white' }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}><Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}</Button>
        <Button size="sm" variant="outline" className="w-full rounded-lg font-semibold" style={{ borderColor: colors.primary, color: colors.primary }} onClick={() => { const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' }; import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); }); }}><UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}</Button>
      </div>
      {copyrightSection && (<div className="px-6 pb-4 pt-1">{copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>}</div>)}
      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

