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

interface LeadershipCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function LeadershipCoachTemplate({ data, template: _template, businessType }: LeadershipCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'leadership-coach';

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
    primary: configSections.colors?.primary || templateTheme.primary || '#2C3E50',
    secondary: configSections.colors?.secondary || templateTheme.secondary || '#34495E',
    accent: configSections.colors?.accent || templateTheme.accent || '#BFA14A',
    background: configSections.colors?.background || templateTheme.background || '#F8F9FA',
    text: configSections.colors?.text || templateTheme.text || '#2C3E50',
    cardBg: configSections.colors?.cardBg || templateTheme.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('leadership-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  // ── SECTION RENDERERS ──

  const renderHeaderSection = (sectionData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(165deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      backgroundImage: `linear-gradient(165deg, ${colors.primary} 0%, ${colors.secondary} 100%), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px)`,
      backgroundBlendMode: 'normal',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.045) 18px, rgba(255,255,255,0.045) 19px)',
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
      <div className="relative z-10 flex flex-col items-center pt-12 pb-10 px-6 text-center">
        {sectionData.profile_image && (
          <div className="mb-5 p-1" style={{ border: `3px solid ${colors.accent}`, borderRadius: '20%' }}>
            <img src={sanitizeUrl(sectionData.profile_image)} alt={sanitizeText(sectionData.name || '')} className="w-28 h-28 object-cover" style={{ borderRadius: '17%' }} />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#FFFFFF', fontFamily: font }}>{sanitizeText(sectionData.name || '')}</h1>
        <div className="w-16 h-0.5 my-3" style={{ backgroundColor: colors.accent }} />
        {sectionData.title && <p className="text-sm font-medium tracking-wider uppercase" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(sectionData.title)}</p>}
        {sectionData.tagline && <p className="text-sm mt-2 max-w-xs opacity-80" style={{ color: '#FFFFFF', fontFamily: font }}>{sanitizeText(sectionData.tagline)}</p>}
      </div>
    </div>
  );

  const renderContactSection = (sectionData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: font }}>{t('Contact')}</h2>
        <div className="space-y-3">
          {sectionData.email && (
            <a href={`mailto:${sanitizeText(sectionData.email)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Mail className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.email)}
            </a>
          )}
          {sectionData.phone && (
            <a href={`tel:${sanitizeText(sectionData.phone)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Phone className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.phone)}
            </a>
          )}
          {sectionData.website && (
            <a href={sanitizeUrl(sectionData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><Globe className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.website)}
            </a>
          )}
          {sectionData.location && (
            <div className="flex items-center gap-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}><MapPin className="w-4 h-4" style={{ color: colors.primary }} /></div>
              {sanitizeText(sectionData.location)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAboutSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('About')}</h2>
        {sectionData.description && <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(sectionData.description)}</p>}
        {sectionData.specializations && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(sectionData.specializations) ? sectionData.specializations : String(sectionData.specializations || '').split(',').filter(Boolean)).map((s: string, i: number) => (
              <Badge key={i} className="text-xs font-medium px-3 py-1 rounded" style={{ backgroundColor: colors.accent + '18', color: colors.accent, border: `1px solid ${colors.accent}40`, fontFamily: font }}>{sanitizeText(s.trim())}</Badge>
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
        {sectionData.experience && <p className="text-xs font-semibold mt-3 inline-block px-3 py-1 rounded" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.experience)}</p>}
        {sectionData.philosophy && <p className="text-xs italic mt-3 leading-relaxed" style={{ color: colors.text + '99', fontFamily: font }}>"{sanitizeText(sectionData.philosophy)}"</p>}
      </div>
    </div>
  );

  const renderProgramsSection = (sectionData: any) => {
    const programs = sectionData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: font }}>{t('Programs')}</h2>
        <div className="space-y-3">
          {programs.map((p: any, i: number) => (
            <div key={i} className="rounded-lg flex gap-4 p-4" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ backgroundColor: colors.accent, color: colors.primary }}>{i + 1}</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(p.title || '')}</h3>
                {p.description && <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(p.description)}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.format && <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}>{sanitizeText(p.format)}</span>}
                  {p.duration && <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: colors.accent + '18', color: colors.accent, fontFamily: font }}>{sanitizeText(p.duration)}</span>}
                  {p.price && <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: colors.accent + '22', color: colors.accent, fontFamily: font }}>{sanitizeText(p.price)}</span>}
                </div>
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
        <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="p-5" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4" style={{ color: colors.accent }} /><span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>{t('Signature Framework')}</span></div>
            {title && <h3 className="text-lg font-bold text-white" style={{ fontFamily: font }}>{sanitizeText(title)}</h3>}
            {desc && <p className="text-xs mt-2 text-white/70" style={{ fontFamily: font }}>{sanitizeText(desc)}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="p-4 space-y-2" style={{ backgroundColor: colors.cardBg }}>
              {pillars.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ backgroundColor: colors.accent, color: '#FFF' }}>{i + 1}</div>
                  <div><p className="text-sm font-semibold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(p.name || '')}</p>{p.description && <p className="text-xs mt-0.5" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(p.description)}</p>}</div>
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
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: font }}><BarChart3 className="w-4 h-4 inline-block mr-1" style={{ color: colors.accent }} />{t('Results')}</h2>
        {Array.isArray(cases) && cases.length > 0 && (
          <div className="space-y-3">
            {cases.map((c: any, i: number) => (
              <div key={i} className="rounded-lg p-4" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h4 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(c.client_name || c.company || c.family_name || '')}</h4>
                {(c.challenge || c.starting_point) && <p className="text-xs mt-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold">{t('Challenge')}:</span> {sanitizeText(c.challenge || c.starting_point)}</p>}
                {c.result && <p className="text-xs mt-1" style={{ color: colors.accent, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(c.result)}</p>}
                {c.revenue_impact && <p className="text-xs font-bold mt-1" style={{ color: colors.primary, fontFamily: font }}><TrendingUp className="w-3 h-3 inline-block mr-1" />{sanitizeText(c.revenue_impact)}</p>}
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
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: font }}><TrendingUp className="w-4 h-4 inline-block mr-1" style={{ color: colors.accent }} />{t('Transformations')}</h2>
        <div className="space-y-3">
          {stories.map((s: any, i: number) => (
            <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              {(s.before_image || s.after_image) && (
                <div className="grid grid-cols-2 gap-0.5">
                  {s.before_image && <img src={sanitizeUrl(s.before_image)} alt="Before" className="w-full h-28 object-cover" />}
                  {s.after_image && <img src={sanitizeUrl(s.after_image)} alt="After" className="w-full h-28 object-cover" />}
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(s.client_name || '')}</p>
                {s.before_state && <p className="text-xs mt-1" style={{ color: colors.text + '99', fontFamily: font }}><span className="font-semibold">{t('Before')}:</span> {sanitizeText(s.before_state)}</p>}
                {s.after_state && <p className="text-xs mt-1" style={{ color: colors.accent, fontFamily: font }}><span className="font-semibold">{t('After')}:</span> {sanitizeText(s.after_state)}</p>}
                {s.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: font }}>"{sanitizeText(s.testimonial)}"</p>}
                {s.timeframe && <Badge className="mt-2 text-[10px]" style={{ backgroundColor: colors.primary + '12', color: colors.primary }}>{sanitizeText(s.timeframe)}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLeadMagnetSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {sectionData.magnet_image && <img src={sanitizeUrl(sectionData.magnet_image)} alt={sanitizeText(sectionData.magnet_title || '')} className="w-full h-36 object-cover" />}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2"><Gift className="w-4 h-4" style={{ color: colors.accent }} /><span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: colors.accent }}>{t('Free Resource')}</span></div>
          {sectionData.magnet_title && <h3 className="text-base font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.magnet_title)}</h3>}
          {sectionData.magnet_description && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.magnet_description)}</p>}
          {sectionData.magnet_url && (
            <a href={sanitizeUrl(sectionData.magnet_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full mt-4 h-10 text-sm font-bold" style={{ backgroundColor: colors.accent, color: '#FFF' }}><Download className="w-4 h-4 mr-2" />{t('Download Now')}</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
        <Calendar className="w-6 h-6 mb-2" style={{ color: colors.accent }} />
        <h3 className="text-base font-bold text-white" style={{ fontFamily: font }}>{t('Book a Consultation')}</h3>
        {sectionData.call_duration && <p className="text-xs text-white/60 mt-1" style={{ fontFamily: font }}>{sanitizeText(sectionData.call_duration)}</p>}
        {sectionData.call_description && <p className="text-xs text-white/80 mt-2 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(sectionData.call_description)}</p>}
        <Button className="w-full mt-4 h-11 font-bold text-sm" style={{ backgroundColor: colors.accent, color: colors.primary }} onClick={() => sectionData.booking_url ? window.open(sanitizeUrl(sectionData.booking_url), '_blank') : handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" />{t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  const renderTestimonialsSection = (sectionData: any) => {
    const reviews = sectionData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const review = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colors.primary, fontFamily: font }}>{t('Testimonials')}</h2>
        <div className="rounded-lg p-5 transition-all duration-500" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div className="text-3xl leading-none mb-2" style={{ color: colors.accent, fontFamily: 'Georgia, serif' }}>"</div>
          {review.review && <p className="text-sm italic leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(review.review)}</p>}
          {review.result_highlight && <p className="text-xs font-semibold mt-2" style={{ color: colors.accent, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(review.result_highlight)}</p>}
          <div className="flex items-center gap-3 mt-4">
            {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 rounded-lg object-cover" style={{ borderRadius: '20%' }} />}
            <div>
              <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
              {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(review.client_title)}</p>}
            </div>
          </div>
          {review.rating && (
            <div className="flex gap-0.5 mt-3">{Array.from({ length: Number(review.rating) }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: colors.accent }} />)}</div>
          )}
        </div>
        {reviews.length > 1 && <div className="flex justify-center gap-1.5 mt-3">{reviews.map((_: any, i: number) => <button key={i} onClick={() => setCurrentReview(i)} className="w-2 h-2 rounded-full transition-all" style={{ backgroundColor: i === currentReview % reviews.length ? colors.accent : colors.primary + '30' }} />)}</div>}
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
            <a key={i} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105" style={{ backgroundColor: colors.primary + '0D', color: colors.primary, border: `1px solid ${colors.primary}20`, fontFamily: font }}>
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
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg transition-all hover:translate-x-1" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <span className="text-lg">{linkIconMap[item.icon || 'link'] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
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
        <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('Business Hours')}</h2>
          <div className="space-y-2">
            {hours.map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-xs py-1.5 border-b" style={{ borderColor: colors.primary + '10', fontFamily: font }}>
                <span className="font-medium" style={{ color: colors.primary }}>{sanitizeText(h.day || '')}</span>
                <span style={{ color: h.is_closed ? '#EF4444' : colors.accent }}>{h.is_closed ? t('Closed') : `${sanitizeText(h.open_time || '')} - ${sanitizeText(h.close_time || '')}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <Calendar className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
        <h3 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{t('Schedule Appointment')}</h3>
        {sectionData.consultation_info && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.consultation_info)}</p>}
        <Button className="w-full mt-4 h-10 text-sm font-bold" style={{ backgroundColor: colors.primary, color: '#FFF' }} onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" />{t('Book Appointment')}
        </Button>
      </div>
    </div>
  );

  const renderLocationSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {sectionData.map_embed_url && (
          <div className="w-full h-44">
            <StableHtmlContent htmlContent={sectionData.map_embed_url} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
          </div>
        )}
        {sectionData.directions_url && (
          <div className="p-4">
            <a href={sanitizeUrl(sectionData.directions_url)} target="_blank" rel="noopener noreferrer">
              <Button className="w-full h-10 text-sm font-medium" variant="outline" style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}><MapPin className="w-4 h-4 mr-2" />{t('Get Directions')}</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const renderContactFormSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {sectionData.form_title && <h3 className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.form_title)}</h3>}
        {sectionData.form_subtitle && <p className="text-xs mt-1 mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(sectionData.form_subtitle)}</p>}
        <Button className="w-full h-10 text-sm font-bold" style={{ backgroundColor: colors.primary, color: '#FFF' }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Mail className="w-4 h-4 mr-2" />{t('Send Message')}
        </Button>
      </div>
    </div>
  );

  const renderCustomHtmlSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {sectionData.show_title && sectionData.section_title && <h3 className="text-sm font-bold mb-3" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(sectionData.section_title)}</h3>}
        {sectionData.html_content && <StableHtmlContent htmlContent={sectionData.html_content} className="prose prose-sm max-w-none" />}
      </div>
    </div>
  );

  const renderQrShareSection = (sectionData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-lg p-5 text-center" style={{ backgroundColor: colors.cardBg, borderTop: `3px solid ${colors.accent}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h3 className="text-sm font-bold mb-3" style={{ color: colors.primary, fontFamily: font }}>{t('Share')}</h3>
        <div className="flex justify-center gap-3">
          {sectionData.enable_qr && (
            <Button size="sm" variant="outline" className="text-xs" style={{ borderColor: colors.primary + '30', color: colors.primary }} onClick={() => setShowQrModal(true)}>
              <QrCode className="w-4 h-4 mr-1" />{t('QR Code')}
            </Button>
          )}
          <Button size="sm" variant="outline" className="text-xs" style={{ borderColor: colors.primary + '30', color: colors.primary }} onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ url: window.location.href, text: sanitizeText(sectionData.share_message || '') }); }}>
            <Share2 className="w-4 h-4 mr-1" />{t('Share')}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderFooterSection = (sectionData: any) => (
    <div className="px-5 pb-5 pt-2">
      <div className="border-t pt-4" style={{ borderColor: colors.primary + '15' }}>
        {sectionData.footer_text && <p className="text-xs text-center leading-relaxed" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(sectionData.footer_text)}</p>}
        {sectionData.copyright_text && <p className="text-[10px] text-center mt-2" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(sectionData.copyright_text)}</p>}
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
      .coach-tpl-leadershipcoach h1,
      .coach-tpl-leadershipcoach h2,
      .coach-tpl-leadershipcoach h3,
      .coach-tpl-leadershipcoach h4 { font-family: ${headingFont} !important; }
    `}</style>
    <div
      className="w-full max-w-md mx-auto rounded-xl overflow-hidden coach-tpl-leadershipcoach"
      style={{ fontFamily: font, backgroundColor: colors.background, direction: isRTL ? 'rtl' : 'ltr', boxShadow: `0 8px 40px ${colors.primary}25` }}
    >
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>
        ))}

      <div className="p-5 space-y-3" style={{ backgroundColor: colors.background }}>
        <Button
          className="w-full h-14 font-bold text-sm tracking-wide rounded-lg"
          style={{ backgroundColor: colors.accent, color: colors.primary }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}
        >
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full h-10 text-xs font-medium"
          style={{ borderColor: colors.primary + '30', color: colors.primary }}
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
