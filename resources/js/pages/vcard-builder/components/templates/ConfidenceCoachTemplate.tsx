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

interface ConfidenceCoachTemplateProps { data: Record<string, any>; template: Record<string, any>; businessType?: string; }

export default function ConfidenceCoachTemplate({ data, template: _template, businessType }: ConfidenceCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'confidence-coach';

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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#D946EF',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#7C3AED',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#FCD34D',
    background: configSections.colors?.background || templateTheme.backgroundColor || '#FAF5FF',
    text: configSections.colors?.text || templateTheme.textColor || '#3B0764',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('confidence-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  // ─── HEADER ─────────────────────────────────────────────
  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, minHeight: 280 }}>
      {/* Starburst radial pattern */}
      <div className="absolute inset-0" style={{
        background: `repeating-conic-gradient(from 0deg at 50% 60%, transparent 0deg, rgba(255,255,255,0.04) 3deg, transparent 6deg)`,
      }} />
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 20% 30%, rgba(252,211,77,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
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
          <div className="mb-5 relative">
            <div className="absolute -inset-2 rounded-full" style={{ background: colors.accent, opacity: 0.5, filter: 'blur(12px)' }} />
            <img src={sanitizeUrl(sectionData.profile_image)} alt={sanitizeText(sectionData.name || '')} className="relative w-28 h-28 rounded-full object-cover" style={{ border: `4px solid ${colors.primary}`, boxShadow: `0 0 0 6px ${colors.accent}` }} />
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2" style={{ fontFamily: font }}>{sanitizeText(sectionData.name || '')}</h1>
        {sectionData.title && <p className="text-base font-medium text-white/80 mb-2" style={{ fontFamily: font }}>{sanitizeText(sectionData.title)}</p>}
        {sectionData.tagline && <p className="text-sm font-bold px-5 py-1.5 rounded-full inline-block mt-1" style={{ background: 'rgba(252,211,77,0.25)', color: colors.accent, fontFamily: font }}>{sanitizeText(sectionData.tagline)}</p>}
      </div>
    </div>
  );

  // ─── CONTACT ────────────────────────────────────────────
  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="grid grid-cols-2 gap-3">
        {sectionData.email && <a href={`mailto:${sanitizeText(sectionData.email)}`} className="flex items-center gap-2 p-3 rounded-2xl transition-transform hover:scale-[1.03]" style={{ background: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderBottom: `3px solid ${colors.primary}` }}><Mail className="w-4 h-4 shrink-0" style={{ color: colors.primary }} /><span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.email)}</span></a>}
        {sectionData.phone && <a href={`tel:${sanitizeText(sectionData.phone)}`} className="flex items-center gap-2 p-3 rounded-2xl transition-transform hover:scale-[1.03]" style={{ background: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderBottom: `3px solid ${colors.primary}` }}><Phone className="w-4 h-4 shrink-0" style={{ color: colors.primary }} /><span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.phone)}</span></a>}
        {sectionData.website && <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-2xl transition-transform hover:scale-[1.03]" style={{ background: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderBottom: `3px solid ${colors.primary}` }}><Globe className="w-4 h-4 shrink-0" style={{ color: colors.primary }} /><span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.website)}</span></a>}
        {sectionData.location && <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderBottom: `3px solid ${colors.primary}` }}><MapPin className="w-4 h-4 shrink-0" style={{ color: colors.primary }} /><span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.location)}</span></div>}
      </div>
    </div>
  );

  // ─── ABOUT ──────────────────────────────────────────────
  const renderAboutSection = (sectionData: any) => {
    const specializations = sectionData.specializations ? (Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    const certifications = sectionData.certifications_list ? (Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((s: string) => s.trim()).filter(Boolean) : [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Sparkles className="w-5 h-5" style={{ color: colors.accent }} /> {t('About Me')}</h2>
        {sectionData.description && <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(sectionData.description)}</p>}
        {specializations.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">{specializations.map((spec: string, i: number) => (
            <Badge key={i} className="px-3 py-1 text-xs font-bold rounded-full border-0" style={{ background: colors.primary + '20', color: colors.primary, fontFamily: font }}>{sanitizeText(spec)}</Badge>
          ))}</div>
        )}
        {certifications.length > 0 && (
          <div className="space-y-2 mb-3">{certifications.map((cert: string, i: number) => (
            <div key={i} className="flex items-center gap-2"><Award className="w-4 h-4" style={{ color: colors.secondary }} /><span className="text-xs" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(cert)}</span></div>
          ))}</div>
        )}
        {sectionData.experience && <p className="text-xs mt-2 font-semibold" style={{ color: colors.secondary, fontFamily: font }}>✨ {sanitizeText(sectionData.experience)} {t('of experience')}</p>}
        {sectionData.philosophy && <p className="text-xs italic mt-3 px-4 py-3 rounded-2xl" style={{ background: colors.primary + '10', color: colors.text + 'AA', borderLeft: `3px solid ${colors.accent}`, fontFamily: font }}>"{sanitizeText(sectionData.philosophy)}"</p>}
      </div>
    );
  };

  // ─── PROGRAMS ───────────────────────────────────────────
  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    const emojiNumbers = ['🔥', '💜', '⚡', '✨', '🌟', '💫'];
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Zap className="w-5 h-5" style={{ color: colors.accent }} /> {t('Programs')}</h2>
        <div className="space-y-4">
          {programs.map((program: any, idx: number) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderBottom: `4px solid ${colors.primary}40` }}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{emojiNumbers[idx % emojiNumbers.length]}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(program.title || '')}</h3>
                    {program.description && <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(program.description)}</p>}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {program.format && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: colors.secondary + '15', color: colors.secondary }}>{sanitizeText(program.format)}</span>}
                      {program.duration && <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: colors.primary + '15', color: colors.primary }}>{sanitizeText(program.duration)}</span>}
                    </div>
                  </div>
                  {program.price && <div className="shrink-0 px-3 py-1.5 rounded-xl font-extrabold text-sm" style={{ background: colors.accent, color: colors.text }}>{sanitizeText(program.price)}</div>}
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
        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Gift className="w-5 h-5" style={{ color: colors.primary }} /> {t('Signature Offer')}</h2>
        <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`, border: `2px solid ${colors.primary}25` }}>
          {title && <h3 className="font-extrabold text-base mb-2" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(title)}</h3>}
          {description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: font }}>{sanitizeText(description)}</p>}
          {pillars.length > 0 && (
            <div className="space-y-3">{pillars.map((pillar: any, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: colors.cardBg }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-extrabold text-sm" style={{ background: colors.primary, color: 'white' }}>{i + 1}</div>
                <div><h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(pillar.name || '')}</h4>{pillar.description && <p className="text-[11px] mt-0.5" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(pillar.description)}</p>}</div>
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
        <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><BarChart3 className="w-5 h-5" style={{ color: colors.primary }} /> {t('Results')}</h2>
        {statFields.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">{statFields.slice(0, 4).map(([key, val]) => (
            <div key={key} className="text-center p-3 rounded-2xl" style={{ background: colors.primary + '10' }}>
              <p className="font-extrabold text-lg" style={{ color: colors.primary }}>{sanitizeText(String(val))}</p>
              <p className="text-[10px] mt-1" style={{ color: colors.text + '99' }}>{sanitizeText(key.replace(/_/g, ' '))}</p>
            </div>
          ))}</div>
        )}
        {caseStudies.map((cs: any, idx: number) => (
          <div key={idx} className="mb-3 p-4 rounded-2xl" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, borderBottom: `4px solid ${colors.accent}30` }}>
            <h4 className="font-bold text-sm mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.client_name || cs.company || cs.family_name || '')}</h4>
            {(cs.challenge || cs.starting_point) && <p className="text-[11px] mb-1" style={{ color: colors.text + '99' }}>🔻 {sanitizeText(cs.challenge || cs.starting_point)}</p>}
            {cs.result && <p className="text-[11px] mb-1 font-semibold" style={{ color: colors.primary }}>🔺 {sanitizeText(cs.result)}</p>}
            {cs.revenue_impact && <p className="text-[11px] font-bold" style={{ color: colors.accent }}>💰 {sanitizeText(cs.revenue_impact)}</p>}
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
        <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><TrendingUp className="w-5 h-5" style={{ color: colors.primary }} /> {t('Transformations')}</h2>
        <div className="space-y-4">{stories.map((story: any, idx: number) => (
          <div key={idx} className="rounded-2xl overflow-hidden" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderBottom: `4px solid ${colors.primary}30` }}>
            {(story.before_image || story.after_image) && (
              <div className="grid grid-cols-2 gap-0">
                {story.before_image && <div className="relative"><img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white">{t('Before')}</span></div>}
                {story.after_image && <div className="relative"><img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white">{t('After')}</span></div>}
              </div>
            )}
            <div className="p-4">
              <h4 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.client_name || '')}</h4>
              {story.before_state && <p className="text-[11px] mb-1" style={{ color: colors.text + '99' }}>❌ {sanitizeText(story.before_state)}</p>}
              {story.after_state && <p className="text-[11px] mb-1 font-semibold" style={{ color: colors.primary }}>✅ {sanitizeText(story.after_state)}</p>}
              {story.testimonial && <p className="text-[11px] italic mt-2 px-3 py-2 rounded-xl" style={{ background: colors.primary + '08', color: colors.text + 'AA' }}>"{sanitizeText(story.testimonial)}"</p>}
              {story.timeframe && <p className="text-[10px] mt-2 font-semibold" style={{ color: colors.accent }}>⏱ {sanitizeText(story.timeframe)}</p>}
            </div>
          </div>
        ))}</div>
      </div>
    );
  };

  // ─── LEAD MAGNET ────────────────────────────────────────
  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        {sectionData.magnet_image && <img src={sanitizeUrl(sectionData.magnet_image)} alt="" className="w-full h-36 object-cover opacity-80" />}
        <div className="p-5 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: colors.accent }} />
          {sectionData.magnet_title && <h3 className="font-extrabold text-base text-white mb-2" style={{ fontFamily: font }}>{sanitizeText(sectionData.magnet_title)}</h3>}
          {sectionData.magnet_description && <p className="text-xs text-white/80 mb-4" style={{ fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>}
          {sectionData.magnet_url && <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer"><Button className="rounded-full font-bold" style={{ background: colors.accent, color: colors.text }}><Download className="w-4 h-4 mr-2" /> {t('Get It Free')}</Button></a>}
        </div>
      </div>
    </div>
  );

  // ─── BOOKING ────────────────────────────────────────────
  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-2xl p-5 text-center" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderBottom: `4px solid ${colors.primary}40` }}>
        <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: colors.primary }} />
        <h3 className="font-extrabold text-base mb-1" style={{ color: colors.text, fontFamily: font }}>{t('Book a Call')}</h3>
        {sectionData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + 'AA' }}>⏰ {sanitizeText(sectionData.call_duration)}</p>}
        {sectionData.call_description && <p className="text-xs mb-4" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>}
        <Button className="rounded-full font-bold px-8" style={{ background: colors.primary, color: 'white' }} onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}><Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}</Button>
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
        <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Star className="w-5 h-5" style={{ color: colors.accent }} /> {t('Testimonials')}</h2>
        <div className="rounded-2xl p-5 relative" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, borderBottom: `4px solid ${colors.accent}30` }}>
          <div className="flex items-center gap-3 mb-3">
            {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${colors.primary}` }} />}
            <div>
              <p className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
              {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88' }}>{sanitizeText(review.client_title)}</p>}
            </div>
          </div>
          {review.rating && <div className="mb-2">{Array.from({ length: Number(review.rating) }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 inline-block" style={{ color: colors.accent, fill: colors.accent }} />)}</div>}
          {review.review && <p className="text-xs italic leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: font }}>"{sanitizeText(review.review)}"</p>}
          {review.result_highlight && <p className="text-[11px] font-bold mt-3 px-3 py-1.5 rounded-full inline-block" style={{ background: colors.primary + '15', color: colors.primary }}>🎯 {sanitizeText(review.result_highlight)}</p>}
          {reviews.length > 1 && <div className="flex justify-center gap-1.5 mt-4">{reviews.map((_: any, i: number) => <div key={i} className="w-2 h-2 rounded-full transition-all" style={{ background: i === currentReview % reviews.length ? colors.primary : colors.primary + '30' }} />)}</div>}
        </div>
      </div>
    );
  };

  // ─── SOCIAL ─────────────────────────────────────────────
  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    return (
      <div className="px-5 py-5">
        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Share2 className="w-5 h-5" style={{ color: colors.primary }} /> {t('Connect')}</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>{(link.platform || '').charAt(0).toUpperCase()}</a>
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
        <h2 className="text-lg font-extrabold mb-3" style={{ color: colors.text, fontFamily: font }}>{t('Links')}</h2>
        <div className="space-y-2">{items.map((item: any, idx: number) => (
          <a key={idx} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl transition-transform hover:scale-[1.02]" style={{ background: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, borderBottom: `3px solid ${colors.primary}30` }}>
            <span className="text-lg">{linkIconMap[item.icon] || '🔗'}</span>
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>{item.description && <p className="text-[10px] truncate" style={{ color: colors.text + '88' }}>{sanitizeText(item.description)}</p>}</div>
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
        <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><Calendar className="w-5 h-5" style={{ color: colors.primary }} /> {t('Hours')}</h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderBottom: `4px solid ${colors.primary}30` }}>
          {hours.map((h: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center px-4 py-2.5" style={{ borderBottom: idx < hours.length - 1 ? `1px solid ${colors.text}10` : 'none' }}>
              <span className="text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(h.day || '')}</span>
              {h.is_closed ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: colors.primary + '15', color: colors.primary }}>{t('Closed')}</span> : <span className="text-xs" style={{ color: colors.text + 'AA' }}>{sanitizeText(h.open_time || '')} – {sanitizeText(h.close_time || '')}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── APPOINTMENTS ───────────────────────────────────────
  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-2xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`, border: `2px dashed ${colors.primary}30` }}>
        <Calendar className="w-7 h-7 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: font }}>{t('Consultation')}</h3>
        {sectionData.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>}
        <Button className="rounded-full font-bold" style={{ background: colors.primary, color: 'white' }} onClick={() => handleAppointmentBooking(sectionData)}><Calendar className="w-4 h-4 mr-2" /> {t('Book Appointment')}</Button>
      </div>
    </div>
  );

  // ─── LOCATION ───────────────────────────────────────────
  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <h2 className="text-lg font-extrabold mb-3 flex items-center gap-2" style={{ color: colors.text, fontFamily: font }}><MapPin className="w-5 h-5" style={{ color: colors.primary }} /> {t('Location')}</h2>
      {sectionData.map_embed_url && <div className="rounded-2xl overflow-hidden mb-3" style={{ border: `2px solid ${colors.primary}20` }}><iframe src={sanitizeUrl(sectionData.map_embed_url)} className="w-full h-48" style={{ border: 0 }} allowFullScreen loading="lazy" /></div>}
      {sectionData.directions_url && <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="w-full rounded-full font-bold" style={{ borderColor: colors.primary, color: colors.primary }}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button></a>}
    </div>
  );

  // ─── CONTACT FORM ───────────────────────────────────────
  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-2xl p-5" style={{ background: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, borderBottom: `4px solid ${colors.primary}40` }}>
        {sectionData.form_title && <h3 className="font-extrabold text-base mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>}
        {sectionData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + '99', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>}
        <div className="space-y-3">
          <input type="text" placeholder={t('Your Name')} className="w-full px-4 py-2.5 rounded-xl text-xs border-0 outline-none" style={{ background: colors.background, color: colors.text, fontFamily: font }} />
          <input type="email" placeholder={t('Your Email')} className="w-full px-4 py-2.5 rounded-xl text-xs border-0 outline-none" style={{ background: colors.background, color: colors.text, fontFamily: font }} />
          <textarea placeholder={t('Your Message')} rows={3} className="w-full px-4 py-2.5 rounded-xl text-xs border-0 outline-none resize-none" style={{ background: colors.background, color: colors.text, fontFamily: font }} />
          <Button className="w-full rounded-full font-bold" style={{ background: colors.primary, color: 'white' }}><Mail className="w-4 h-4 mr-2" /> {t('Send Message')}</Button>
        </div>
      </div>
    </div>
  );

  // ─── CUSTOM HTML ────────────────────────────────────────
  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 py-5">
      {sectionData.show_title && sectionData.section_title && <h2 className="text-lg font-extrabold mb-3" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(sectionData.section_title)}</h2>}
      {sectionData.html_content && <div className="rounded-2xl overflow-hidden" style={{ background: colors.cardBg }}><StableHtmlContent htmlContent={sectionData.html_content} className="p-4" /></div>}
    </div>
  );

  // ─── QR SHARE ───────────────────────────────────────────
  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="flex gap-3 justify-center">
        {sectionData.enable_qr && <Button variant="outline" className="rounded-full font-bold flex-1" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => setShowQrModal(true)}><QrCode className="w-4 h-4 mr-2" /> {t('QR Code')}</Button>}
        <Button variant="outline" className="rounded-full font-bold flex-1" style={{ borderColor: colors.secondary, color: colors.secondary, fontFamily: font }} onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) { navigator.share({ title: data.name || '', text: sectionData.share_message || '', url: window.location.href }); } }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</Button>
      </div>
    </div>
  );

  // ─── FOOTER ─────────────────────────────────────────────
  const renderFooterSection = (sectionData: any) => (
    <div className="px-6 py-5 text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)` }}>
      {sectionData.footer_text && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>}
      {sectionData.copyright_text && <p className="text-[10px]" style={{ color: colors.text + '66', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>}
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
        .coach-tpl-confidencecoach h1,
        .coach-tpl-confidencecoach h2,
        .coach-tpl-confidencecoach h3,
        .coach-tpl-confidencecoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-confidencecoach rounded-3xl overflow-hidden" style={{ fontFamily: font, backgroundColor: colors.background, direction: isRTL ? 'rtl' : 'ltr', boxShadow: `0 8px 40px ${colors.primary}25` }}>
      {orderedSectionKeys.filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key)).map((sectionKey) => (<React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>))}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.primary}06, ${colors.secondary}06)` }}>
        <Button className="w-full h-14 font-bold rounded-full text-base transition-transform hover:scale-[1.03]" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: 'white' }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}><Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}</Button>
        <Button size="sm" variant="outline" className="w-full rounded-full font-semibold" style={{ borderColor: colors.primary, color: colors.primary }} onClick={() => { const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' }; import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); }); }}><UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}</Button>
      </div>
      {copyrightSection && (<div className="px-6 pb-4 pt-1">{copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>}</div>)}
      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

