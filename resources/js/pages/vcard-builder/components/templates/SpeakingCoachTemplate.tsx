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

interface SpeakingCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function SpeakingCoachTemplate({ data, template: _template, businessType }: SpeakingCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'speaking-coach';

  const [currentReview, setCurrentReview] = React.useState(0);

  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 4000);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const rtlLanguages = ['ar', 'he'];
  const isRTL = rtlLanguages.includes(currentLanguage);

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageSelector(false);
    i18n.changeLanguage(langCode);
  };

  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};
  const colors = {
    primary: configSections.colors?.primary || templateTheme.primary || '#8B0000',
    secondary: configSections.colors?.secondary || templateTheme.secondary || '#2B2B2B',
    accent: configSections.colors?.accent || templateTheme.accent || '#FFD700',
    background: configSections.colors?.background || templateTheme.background || '#FAFAFA',
    text: configSections.colors?.text || templateTheme.text || '#2B2B2B',
    cardBg: configSections.colors?.cardBg || templateTheme.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('speaking-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  // ── SECTION RENDERERS ──

  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    }}>
      {/* Spotlight radial effect */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 10%, ${colors.accent}35 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)} className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontFamily: font }}>
              <Globe className="w-3 h-3" /><span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span><span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center pt-14 pb-12 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5 relative">
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 30px 8px ${colors.accent}40`, transform: 'scale(1.15)' }} />
            <div className="p-1 rounded-full" style={{ border: `3px solid ${colors.primary}`, boxShadow: `0 0 0 3px ${colors.accent}` }}>
              <img src={sanitizeUrl(sectionData.profile_image)} alt={sanitizeText(sectionData.name || '')} className="w-28 h-28 rounded-full object-cover" />
            </div>
          </div>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#FFFFFF', fontFamily: font }}>{sanitizeText(sectionData.name || '')}</h1>
        <div className="w-20 h-1 my-3 rounded-full" style={{ backgroundColor: colors.accent }} />
        {sectionData.title && <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(sectionData.title)}</p>}
        {sectionData.tagline && <p className="text-sm mt-3 max-w-xs" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: font }}>{sanitizeText(sectionData.tagline)}</p>}
      </div>
    </div>
  );

  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span className="text-base">📞</span> {t('Contact')}
        </h2>
        <div className="space-y-3">
          {sectionData.email && (
            <a href={`mailto:${sanitizeText(sectionData.email)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Mail className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.email)}
            </a>
          )}
          {sectionData.phone && (
            <a href={`tel:${sanitizeText(sectionData.phone)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Phone className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.phone)}
            </a>
          )}
          {sectionData.website && (
            <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Globe className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.website)}
            </a>
          )}
          {sectionData.location && (
            <div className="flex items-center gap-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><MapPin className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.location)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAboutSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span className="text-base">🎤</span> {t('About')}
        </h2>
        {sectionData.description && <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(sectionData.description)}</p>}
        {sectionData.specializations && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string, i: number) => (
              <Badge key={i} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary + '15', color: colors.primary, border: `1px solid ${colors.primary}30`, fontFamily: font }}>{sanitizeText(s.trim())}</Badge>
            ))}
          </div>
        )}
        {sectionData.certifications_list && (
          <div className="space-y-1.5 mb-3">
            {(Array.isArray(sectionData.certifications_list) ? sectionData.certifications_list : String(sectionData.certifications_list || '').split(',').filter(Boolean)).map((c: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs" style={{ color: colors.text + 'BB', fontFamily: font }}><Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />{sanitizeText(c.trim())}</div>
            ))}
          </div>
        )}
        {sectionData.experience && <p className="text-xs font-semibold mt-3 inline-block px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary + '12', color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.experience)}</p>}
        {sectionData.philosophy && <p className="text-xs italic mt-3 leading-relaxed pl-3" style={{ color: colors.text + '99', fontFamily: font, borderLeft: `3px solid ${colors.accent}` }}>"{sanitizeText(sectionData.philosophy)}"</p>}
      </div>
    </div>
  );

  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span className="text-base">🎙️</span> {t('Programs')}
        </h2>
        <div className="space-y-3">
          {programs.map((p: any, i: number) => (
            <div key={i} className="rounded-xl p-4 relative overflow-hidden" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div className="absolute top-3 right-3 text-2xl opacity-20">🎤</div>
              <h3 className="text-sm font-bold pr-8" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(p.title || '')}</h3>
              {p.description && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(p.description)}</p>}
              <div className="flex flex-wrap gap-2 mt-3">
                {p.format && <span className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: colors.primary + '12', color: colors.primary, fontFamily: font }}>{sanitizeText(p.format)}</span>}
                {p.duration && <span className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: colors.accent + '20', color: colors.secondary, fontFamily: font }}>{sanitizeText(p.duration)}</span>}
                {p.price && <span className="text-[10px] px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: colors.accent, color: colors.secondary, fontFamily: font }}>{sanitizeText(p.price)}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSignatureOfferSection = (sectionData: any) => {
    const title = sectionData.framework_name || sectionData.offer_title;
    const desc = sectionData.framework_description || sectionData.offer_description;
    const pillars = sectionData.pillars || [];
    return (
      <div className="px-5 pb-5">
        <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}>
          <div className="p-6 relative" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${colors.accent}20 0%, transparent 60%)`, pointerEvents: 'none' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4" style={{ color: colors.accent }} /><span className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>{t('Signature Framework')}</span></div>
              {title && <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: font }}>{sanitizeText(title)}</h3>}
              {desc && <p className="text-xs mt-2 text-white/70 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(desc)}</p>}
            </div>
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="p-4 space-y-2.5" style={{ backgroundColor: colors.cardBg }}>
              {pillars.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl transition-all" style={{ backgroundColor: colors.background }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-extrabold" style={{ backgroundColor: colors.primary, color: '#FFF' }}>{i + 1}</div>
                  <div><p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(p.name || '')}</p>{p.description && <p className="text-xs mt-0.5" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(p.description)}</p>}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResultsSection = (sectionData: any) => {
    const cases = sectionData.case_studies || [];
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <BarChart3 className="w-4 h-4" style={{ color: colors.accent }} /> {t('Results')}
        </h2>
        {Array.isArray(cases) && cases.length > 0 && (
          <div className="space-y-3">
            {cases.map((c: any, i: number) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
                <h4 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(c.client_name || c.company || c.family_name || '')}</h4>
                {(c.challenge || c.starting_point) && <p className="text-xs mt-1.5" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold">{t('Challenge')}:</span> {sanitizeText(c.challenge || c.starting_point)}</p>}
                {c.result && <p className="text-xs mt-1.5 font-medium" style={{ color: colors.primary, fontFamily: font }}><Zap className="w-3 h-3 inline-block mr-1" style={{ color: colors.accent }} />{sanitizeText(c.result)}</p>}
                {c.revenue_impact && <p className="text-xs font-bold mt-1.5" style={{ color: colors.accent, fontFamily: font }}><TrendingUp className="w-3 h-3 inline-block mr-1" />{sanitizeText(c.revenue_impact)}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTransformationsSection = (sectionData: any) => {
    const stories = sectionData.stories || sectionData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <TrendingUp className="w-4 h-4" style={{ color: colors.accent }} /> {t('Transformations')}
        </h2>
        <div className="space-y-3">
          {stories.map((s: any, i: number) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              {(s.before_image || s.after_image) && (
                <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: colors.primary + '15' }}>
                  {s.before_image && <div className="relative"><img src={sanitizeUrl(s.before_image)} alt="Before" className="w-full h-32 object-cover" /><span className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-white">{t('Before')}</span></div>}
                  {s.after_image && <div className="relative"><img src={sanitizeUrl(s.after_image)} alt="After" className="w-full h-32 object-cover" /><span className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: colors.primary + 'CC' }}>{t('After')}</span></div>}
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(s.client_name || '')}</p>
                {s.before_state && <p className="text-xs mt-1" style={{ color: colors.text + '99', fontFamily: font }}><span className="font-semibold">{t('Before')}:</span> {sanitizeText(s.before_state)}</p>}
                {s.after_state && <p className="text-xs mt-1 font-medium" style={{ color: colors.primary, fontFamily: font }}><span className="font-semibold">{t('After')}:</span> {sanitizeText(s.after_state)}</p>}
                {s.testimonial && <p className="text-xs italic mt-2 pl-3" style={{ color: colors.text + 'AA', fontFamily: font, borderLeft: `3px solid ${colors.accent}` }}>"{sanitizeText(s.testimonial)}"</p>}
                {s.timeframe && <Badge className="mt-2 text-[10px] rounded-full" style={{ backgroundColor: colors.primary + '12', color: colors.primary }}>{sanitizeText(s.timeframe)}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl overflow-hidden relative" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        {sectionData.magnet_image && <img src={sanitizeUrl(sectionData.magnet_image)} alt={sanitizeText(sectionData.magnet_title || '')} className="w-full h-40 object-cover" />}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2"><Gift className="w-4 h-4" style={{ color: colors.accent }} /><span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: colors.primary }}>{t('Free Resource')}</span></div>
          {sectionData.magnet_title && <h3 className="text-lg font-extrabold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.magnet_title)}</h3>}
          {sectionData.magnet_description && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>}
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-4 h-11 text-sm font-extrabold rounded-xl" style={{ backgroundColor: colors.primary, color: '#FFF' }}><Download className="w-4 h-4 mr-2" />{t('Download Now')}</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: '0 6px 24px rgba(0,0,0,0.15)' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${colors.accent}25 0%, transparent 50%)`, pointerEvents: 'none' }} />
        <div className="relative z-10">
          <div className="text-3xl mb-2">🎤</div>
          <h3 className="text-lg font-extrabold text-white" style={{ fontFamily: font }}>{t('Book a Consultation')}</h3>
          {sectionData.call_duration && <p className="text-xs text-white/50 mt-1" style={{ fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>}
          {sectionData.call_description && <p className="text-xs text-white/80 mt-2 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>}
          <Button className="w-full mt-4 h-12 font-extrabold text-sm rounded-xl" style={{ backgroundColor: colors.accent, color: colors.secondary }} onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
            <Calendar className="w-4 h-4 mr-2" />{t('Schedule Now')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const review = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <Star className="w-4 h-4" style={{ color: colors.accent }} /> {t('Testimonials')}
        </h2>
        <div className="rounded-xl p-5 transition-all duration-500 relative" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          <div className="text-5xl font-bold leading-none absolute top-3 left-4" style={{ color: colors.primary + '25', fontFamily: 'Georgia, serif' }}>"</div>
          <div className="pt-6">
            {review.review && <p className="text-sm italic leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(review.review)}</p>}
            {review.result_highlight && <p className="text-xs font-bold mt-3 px-3 py-1.5 rounded-full inline-block" style={{ backgroundColor: colors.accent + '20', color: colors.primary, fontFamily: font }}><Zap className="w-3 h-3 inline-block mr-1" />{sanitizeText(review.result_highlight)}</p>}
          </div>
          <div className="flex items-center gap-3 mt-4 pt-3 border-t" style={{ borderColor: colors.primary + '10' }}>
            {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-11 h-11 rounded-full object-cover" style={{ border: `2px solid ${colors.primary}30` }} />}
            <div>
              <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
              {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(review.client_title)}</p>}
            </div>
          </div>
          {review.rating && (
            <div className="flex gap-0.5 mt-3">{Array.from({ length: Number(review.rating) }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors.accent }} />)}</div>
          )}
        </div>
        {reviews.length > 1 && <div className="flex justify-center gap-2 mt-3">{reviews.map((_: any, i: number) => <button key={i} onClick={() => setCurrentReview(i)} className="w-2.5 h-2.5 rounded-full transition-all" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25', transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)' }} />)}</div>}
      </div>
    );
  };

  const renderSocialSection = (sectionData: any) => {
    const links = sectionData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('Connect')}</h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, i: number) => (
            <a key={i} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all hover:scale-105" style={{ backgroundColor: colors.primary, color: '#FFF', fontFamily: font }}>
              <Globe className="w-3.5 h-3.5" />{sanitizeText(link.platform || '')}
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderLinksSection = (sectionData: any) => {
    const items = sectionData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('Links')}</h2>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <span className="text-xl">{linkIconMap[item.icon || 'link'] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && <p className="text-[10px] truncate" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderBusinessHoursSection = (sectionData: any) => {
    const hours = sectionData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
            <span className="text-base">🕐</span> {t('Business Hours')}
          </h2>
          <div className="space-y-2">
            {hours.map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-xs py-2 border-b" style={{ borderColor: colors.primary + '10', fontFamily: font }}>
                <span className="font-semibold" style={{ color: colors.primary }}>{sanitizeText(h.day || '')}</span>
                <span className="font-medium" style={{ color: h.is_closed ? '#EF4444' : colors.text + 'CC' }}>{h.is_closed ? t('Closed') : `${sanitizeText(h.open_time || '')} - ${sanitizeText(h.close_time || '')}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Calendar className="w-5 h-5" style={{ color: colors.primary }} /></div>
          <h3 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{t('Schedule Appointment')}</h3>
        </div>
        {sectionData.consultation_info && <p className="text-xs leading-relaxed mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>}
        <Button className="w-full h-11 text-sm font-extrabold rounded-xl" style={{ backgroundColor: colors.primary, color: '#FFF' }} onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" />{t('Book Appointment')}
        </Button>
      </div>
    </div>
  );

  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        {sectionData.map_embed_url && (
          <div className="w-full h-48">
            <StableHtmlContent htmlContent={sectionData.map_embed_url} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
          </div>
        )}
        {sectionData.directions_url && (
          <div className="p-4">
            <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-11 text-sm font-bold rounded-xl" variant="outline" style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font }}><MapPin className="w-4 h-4 mr-2" />{t('Get Directions')}</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        {sectionData.form_title && <h3 className="text-base font-extrabold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>}
        {sectionData.form_subtitle && <p className="text-xs mt-1 mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>}
        <Button className="w-full h-11 text-sm font-extrabold rounded-xl" style={{ backgroundColor: colors.primary, color: '#FFF' }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Mail className="w-4 h-4 mr-2" />{t('Send Message')}
        </Button>
      </div>
    </div>
  );

  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-5" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        {sectionData.show_title && sectionData.section_title && <h3 className="text-sm font-bold mb-3" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.section_title)}</h3>}
        {sectionData.html_content && <StableHtmlContent htmlContent={sectionData.html_content} className="prose prose-sm max-w-none" />}
      </div>
    </div>
  );

  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-xl p-5 text-center" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
        <h3 className="text-sm font-bold mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('Share')}</h3>
        <div className="flex justify-center gap-3">
          {sectionData.enable_qr && (
            <Button size="sm" className="text-xs rounded-full px-5" style={{ backgroundColor: colors.primary, color: '#FFF' }} onClick={() => setShowQrModal(true)}>
              <QrCode className="w-4 h-4 mr-1" />{t('QR Code')}
            </Button>
          )}
          <Button size="sm" variant="outline" className="text-xs rounded-full px-5" style={{ borderColor: colors.primary + '40', color: colors.primary }} onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ url: window.location.href, text: sanitizeText(sectionData.share_message || '') }); }}>
            <Share2 className="w-4 h-4 mr-1" />{t('Share')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFooterSection = (sectionData: any) => (
    <div className="px-5 pb-5 pt-2">
      <div className="border-t pt-4 text-center" style={{ borderColor: colors.primary + '15' }}>
        {sectionData.footer_text && <p className="text-xs leading-relaxed" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>}
        {sectionData.copyright_text && <p className="text-[10px] mt-2" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>}
      </div>
    </div>
  );

  // ── SECTION ROUTER ──

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

  // ── MAIN RENDER ──

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(
    data.template_config || { sections: configSections, sectionSettings: configSections },
    allSections
  );

  return (
    <>
    <style>{`
      .coach-tpl-speakingcoach h1,
      .coach-tpl-speakingcoach h2,
      .coach-tpl-speakingcoach h3,
      .coach-tpl-speakingcoach h4 { font-family: ${headingFont} !important; }
    `}</style>
    <div
      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden coach-tpl-speakingcoach"
      style={{ fontFamily: font, backgroundColor: colors.background, direction: isRTL ? 'rtl' : 'ltr', boxShadow: `0 12px 48px ${colors.primary}30` }}
    >
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>
        ))}

      <div className="p-5 space-y-3" style={{ backgroundColor: colors.background }}>
        <Button
          className="w-full h-14 font-extrabold text-sm tracking-wide rounded-xl"
          style={{ backgroundColor: colors.primary, color: '#FFF' }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full h-10 text-xs font-semibold rounded-xl"
          style={{ borderColor: colors.primary + '40', color: colors.primary }}
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

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && (
            <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>
          )}
        </div>
      )}

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
