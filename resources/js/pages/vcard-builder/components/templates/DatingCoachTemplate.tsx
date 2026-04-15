/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, TrendingUp, Star, Zap, Award, Download, CheckCircle, Share2, QrCode, Gift, Sparkles, BarChart3 } from 'lucide-react';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';
import { getCoachFonts } from './coach-fonts';

/**
 * DatingCoachTemplate — ROMANTIC MODERN design
 * Warm, inviting, love-focused. Deep rose-to-darker-rose gradient header with CSS heart decorative
 * elements, double-ring profile circle (inner rose, outer gold glow), rounded-2xl white cards,
 * rose-tinted shadows, heart-shaped rating icons, romantic emojis on programs.
 */

interface DatingCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DatingCoachTemplate({ data, template: _template, businessType }: DatingCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'dating-coach';


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
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };

  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#BE185D',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#9F1239',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#FDE68A',
    background: configSections.colors?.background || '#FFF1F2',
    text: configSections.colors?.text || '#4C0519',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('dating-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const romanticEmojis = ['💕', '💫', '🔥', '✨', '💖', '🌹', '💗', '💝', '🦋', '🌙'];

  // ─── Section Renderers ──────────────────────────────────────

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

  // ─── Header — Deep rose gradient with CSS heart decorative elements, double-ring profile ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '300px', background: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}>
      {/* CSS Heart decorative elements */}
      <div className="absolute top-8 left-6 opacity-10" style={{
        width: '30px', height: '30px', transform: 'rotate(-45deg)',
        background: '#FFF', borderRadius: '50% 50% 0 50%',
      }}>
        <div style={{ content: '""', position: 'absolute', width: '30px', height: '30px', background: '#FFF', borderRadius: '50%', top: '-15px', left: '0' }} />
        <div style={{ content: '""', position: 'absolute', width: '30px', height: '30px', background: '#FFF', borderRadius: '50%', top: '0', left: '15px' }} />
      </div>
      <div className="absolute bottom-12 right-8 opacity-[0.07]" style={{
        width: '50px', height: '50px', transform: 'rotate(-45deg)',
        background: colors.accent, borderRadius: '50% 50% 0 50%',
      }}>
        <div style={{ content: '""', position: 'absolute', width: '50px', height: '50px', background: colors.accent, borderRadius: '50%', top: '-25px' }} />
        <div style={{ content: '""', position: 'absolute', width: '50px', height: '50px', background: colors.accent, borderRadius: '50%', left: '25px' }} />
      </div>
      <div className="absolute top-20 right-16 opacity-[0.06]" style={{
        width: '20px', height: '20px', transform: 'rotate(-45deg)',
        background: '#FFF', borderRadius: '50% 50% 0 50%',
      }} />
      {/* Soft radial glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(253,230,138,0.08) 0%, transparent 60%)' }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-pink-50 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-pink-50 text-pink-600' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12" style={{ minHeight: '300px' }}>
        {/* Double-ring profile: inner rose, outer golden glow */}
        {headerData.profile_image && (
          <div className="relative mb-5">
            {/* Outer golden glow ring */}
            <div className="absolute inset-[-6px] rounded-full" style={{ background: `linear-gradient(135deg, ${colors.accent}60, ${colors.accent}20)`, filter: 'blur(3px)' }} />
            {/* Inner rose ring */}
            <div className="relative rounded-full p-[3px]" style={{ background: `linear-gradient(135deg, ${colors.primary}, #FB7185)` }}>
              <img src={sanitizeUrl(headerData.profile_image)} alt={sanitizeText(headerData.name || '')}
                className="w-28 h-28 rounded-full object-cover border-2 border-white/30" />
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold" style={{ color: '#FFFFFF', fontFamily: font, textShadow: '0 2px 10px rgba(159,18,57,0.3)' }}>
          {sanitizeText(headerData.name || '')}
        </h1>
        {/* Rose ornament */}
        <div className="my-2 flex items-center gap-2">
          <div className="h-px w-8" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <span className="text-sm">💕</span>
          <div className="h-px w-8" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
        </div>
        {headerData.title && (
          <p className="text-sm font-medium" style={{ color: colors.accent, fontFamily: font }}>
            {sanitizeText(headerData.title)}
          </p>
        )}
        {headerData.tagline && (
          <p className="text-xs mt-2 max-w-xs leading-relaxed px-4 py-1.5 rounded-full" style={{ color: 'white', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', fontFamily: font }}>
            {sanitizeText(headerData.tagline)}
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Rounded cards with rose-tinted shadow ───────

  const renderContactSection = (contactData: any) => (
    <div className="px-5 py-5">
      <div className="rounded-2xl p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.08)` }}>
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span>💌</span> {t('Contact')}
        </h2>
        <div className="space-y-3">
          {contactData.email && (
            <a href={`mailto:${sanitizeText(contactData.email)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}>
                <Mail className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.email)}</span>
            </a>
          )}
          {contactData.phone && (
            <a href={`tel:${sanitizeText(contactData.phone)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}>
                <Phone className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.phone)}</span>
            </a>
          )}
          {contactData.website && (
            <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}>
                <Globe className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.website)}</span>
            </a>
          )}
          {contactData.location && (
            <div className="flex items-center gap-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primary + '12' }}>
                <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.location)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ─── About — Soft rose background card ─────────────────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl p-5" style={{ backgroundColor: colors.primary + '08', border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
            <span>✨</span> {t('About')}
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-4">
              <p className="text-xs font-bold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: colors.primary + '15', color: colors.primary, border: `1px solid ${colors.primary}25`, fontFamily: font }}>
                    💗 {sanitizeText(spec.trim())}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Credentials')}</p>
              <div className="space-y-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: colors.text + 'BB', fontFamily: font }}>
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.primary }} />
                    {sanitizeText(cert.trim())}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: `1px solid ${colors.primary}15` }}>
              <span className="text-3xl font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs font-semibold" style={{ color: colors.text + '80', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-3 rounded-xl italic text-xs leading-relaxed" style={{ background: 'white', borderLeft: `3px solid ${colors.primary}`, color: colors.text + 'AA', fontFamily: font }}>
              "{sanitizeText(aboutData.philosophy)}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Cards with romantic emojis, warm inviting feel ───

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span>💫</span> {t('Programs')}
        </h2>
        <div className="space-y-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg" style={{ backgroundColor: colors.primary + '10' }}>
                  {romanticEmojis[i % romanticEmojis.length]}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(prog.title || '')}</h4>
                  {prog.price && <p className="text-lg font-bold mt-1" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(prog.price)}</p>}
                  {prog.description && <p className="text-xs leading-relaxed mt-1" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(prog.description)}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prog.format && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}>{sanitizeText(prog.format.replace(/-/g, ' '))}</span>}
                    {prog.duration && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.accent + '40', color: colors.text, fontFamily: font }}>{sanitizeText(prog.duration)}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Rose gradient with warm golden highlights ───

  const renderSignatureOfferSection = (offerData: any) => {
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    if (!title && !desc) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: `0 8px 30px rgba(190,24,93,0.12)` }}>
          <div className="p-5" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>{t('Signature Framework')}</span>
            </div>
            {title && <h3 className="text-lg font-bold text-white mt-1" style={{ fontFamily: font }}>{sanitizeText(title)}</h3>}
            {desc && <p className="text-xs mt-2 text-white/60 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(desc)}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="p-4 space-y-2" style={{ backgroundColor: colors.cardBg }}>
              {pillars.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: colors.primary + '06' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm" style={{ backgroundColor: colors.primary, color: '#FFF', fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(p.name || '')}</p>
                    {p.description && <p className="text-xs mt-0.5" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(p.description)}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results — Rose-accented stat cards ────────────────────

  const renderResultsSection = (resultsData: any) => {
    const stats: { label: string; value: string }[] = [];
    const ignoreKeys = ['case_studies', 'enabled'];
    Object.entries(resultsData).forEach(([key, val]) => {
      if (val && typeof val === 'string' && !ignoreKeys.includes(key)) {
        stats.push({ label: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), value: val as string });
      }
    });
    const caseStudies = resultsData.case_studies || [];
    if (stats.length === 0 && caseStudies.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <BarChart3 className="w-4 h-4" style={{ color: colors.primary }} /> {t('Results')}
        </h2>
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 15px rgba(190,24,93,0.06)` }}>
                <p className="text-2xl font-bold" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider mt-1 font-medium" style={{ color: colors.text + '80', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, boxShadow: `0 4px 15px rgba(190,24,93,0.06)` }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.client_name || cs.company || cs.family_name || '')}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold" style={{ color: colors.primary }}>{t('Challenge')}:</span> {sanitizeText(cs.challenge || cs.starting_point)}</p>}
                {cs.result && <p className="text-xs font-semibold" style={{ color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(cs.result)}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-2 px-3 py-1 rounded-full inline-block" style={{ background: colors.primary + '15', color: colors.primary, fontFamily: font }}>{sanitizeText(cs.revenue_impact)}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations ───────────────────────────────────────

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <TrendingUp className="w-4 h-4" style={{ color: colors.primary }} /> {t('Transformations')}
        </h2>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 15px rgba(190,24,93,0.06)` }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-0.5">
                  {story.before_image && <div className="relative"><img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">{t('Before')}</span></div>}
                  {story.after_image && <div className="relative"><img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] text-white px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: colors.primary }}>{t('After')}</span></div>}
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-bold mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.client_name || `Client ${i + 1}`)}</p>
                {story.before_state && <div className="p-2 text-xs mb-1 rounded-lg" style={{ borderLeft: `3px solid #EF4444`, backgroundColor: '#FEF2F2' }}><span className="font-bold" style={{ color: '#EF4444' }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{sanitizeText(story.before_state)}</span></div>}
                {story.after_state && <div className="p-2 text-xs mb-1 rounded-lg" style={{ borderLeft: `3px solid ${colors.primary}`, backgroundColor: colors.primary + '08' }}><span className="font-bold" style={{ color: colors.primary }}>{t('After')}:</span> <span style={{ color: colors.text }}>{sanitizeText(story.after_state)}</span></div>}
                {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: font }}>"{sanitizeText(story.testimonial)}"</p>}
                {story.timeframe && <Badge className="text-[10px] mt-2 rounded-full font-semibold" style={{ backgroundColor: colors.primary + '15', color: colors.primary, fontFamily: font }}>{sanitizeText(story.timeframe)}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Warm rose card with golden CTA ──────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.08)` }}>
          {magnetData.magnet_image && <img src={sanitizeUrl(magnetData.magnet_image)} alt={sanitizeText(magnetData.magnet_title)} className="w-full h-36 object-cover" />}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: colors.primary }}>{t('Free Gift')}</span>
              <span>🎁</span>
            </div>
            <h3 className="text-base font-bold mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(magnetData.magnet_title)}</h3>
            {magnetData.magnet_description && <p className="text-xs leading-relaxed mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(magnetData.magnet_description)}</p>}
            <Button className="w-full h-11 rounded-full font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#FFF', fontFamily: font, boxShadow: `0 6px 20px rgba(190,24,93,0.3)` }}
              onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(sanitizeUrl(magnetData.magnet_url), '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
              <Download className="w-4 h-4 mr-2" /> {t('Download Now')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Booking — Romantic CTA card ───────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-2xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, boxShadow: `0 8px 30px rgba(190,24,93,0.2)` }}>
        <span className="text-2xl mb-2 block">💕</span>
        <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: font }}>{t('Book a Consultation')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(bookingData.call_duration)}</p>}
        {bookingData.call_description && <p className="text-xs text-white/70 mb-4 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(bookingData.call_description)}</p>}
        <Button className="px-8 h-11 rounded-full font-bold text-sm"
          style={{ backgroundColor: '#FFF', color: colors.primary, fontFamily: font, boxShadow: `0 4px 15px rgba(0,0,0,0.15)` }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(sanitizeUrl(bookingData.booking_url), '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Heart-shaped rating icons in rose color ─

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const review = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span>💖</span> {t('Love Letters')}
        </h2>
        <div className="rounded-2xl p-5 transition-all duration-500" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.08)` }}>
          {/* Heart-shaped rating icons */}
          {review.rating && (
            <div className="flex gap-1 mb-3">
              {Array.from({ length: Number(review.rating) }).map((_, i) => (
                <span key={i} className="text-sm" style={{ color: colors.primary }}>❤️</span>
              ))}
            </div>
          )}
          <p className="text-sm italic leading-relaxed mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>"{sanitizeText(review.review || '')}"</p>
          {review.result_highlight && <p className="text-xs font-semibold mb-3" style={{ color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(review.result_highlight)}</p>}
          <div className="flex items-center gap-3">
            {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: colors.primary + '40' }} />}
            <div>
              <p className="text-sm font-bold" style={{ color: colors.primary, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
              {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(review.client_title)}</p>}
            </div>
          </div>
        </div>
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {reviews.map((_: any, i: number) => (
              <button key={i} onClick={() => setCurrentReview(i)} className="w-2.5 h-2.5 rounded-full transition-all" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25', transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)' }} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Social ────────────────────────────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span>🌹</span> {t('Connect')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, i: number) => (
            <a key={i} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ backgroundColor: colors.primary + '10', color: colors.primary, border: `1px solid ${colors.primary}20`, fontFamily: font }}>
              <Globe className="w-3.5 h-3.5" />{sanitizeText(link.platform || '')}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links ─────────────────────────────────────────────────

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <span>🔗</span> {t('Links')}
        </h2>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:translate-x-1"
              style={{ backgroundColor: colors.cardBg, borderLeft: `3px solid ${colors.primary}`, boxShadow: `0 2px 10px rgba(190,24,93,0.06)` }}>
              <span className="text-lg">{linkIconMap[item.icon || 'link'] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && <p className="text-[10px] truncate" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours ────────────────────────────────────────

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
            <Calendar className="w-4 h-4" /> {t('Business Hours')}
          </h2>
          <div className="space-y-0">
            {hours.map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-xs py-2" style={{ borderBottom: `1px solid ${colors.primary}08`, fontFamily: font }}>
                <span className="font-medium" style={{ color: colors.text }}>{sanitizeText(h.day || '')}</span>
                <span style={{ color: h.is_closed ? '#EF4444' : colors.primary, fontWeight: 600 }}>
                  {h.is_closed ? t('Closed') : `${sanitizeText(h.open_time || '')} – ${sanitizeText(h.close_time || '')}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-2xl p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
        <Calendar className="w-5 h-5 mb-2" style={{ color: colors.primary }} />
        <h3 className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{t('Schedule Appointment')}</h3>
        {apptData.consultation_info && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(apptData.consultation_info)}</p>}
        <Button className="w-full mt-4 h-10 text-sm font-bold rounded-full"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#FFF', fontFamily: font }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" />{t('Book Appointment')}
        </Button>
      </div>
    </div>
  );

  // ─── Location ──────────────────────────────────────────────

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-5 pb-5">
        <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
          <MapPin className="w-4 h-4" /> {t('Location')}
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15` }}>
          {locationData.map_embed_url && (
            <div className="w-full h-44">
              <StableHtmlContent htmlContent={locationData.map_embed_url} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
            </div>
          )}
          {locationData.directions_url && (
            <div className="p-4">
              <a href={sanitizeUrl(locationData.directions_url)} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-10 text-sm font-medium rounded-full" variant="outline" style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}>
                  <MapPin className="w-4 h-4 mr-2" />{t('Get Directions')}
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => (
    <div className="px-5 pb-5">
      <div className="rounded-2xl p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
        {formData.form_title && <h3 className="text-sm font-bold" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(formData.form_title)}</h3>}
        {formData.form_subtitle && <p className="text-xs mt-1 mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(formData.form_subtitle)}</p>}
        <Button className="w-full h-10 text-sm font-bold rounded-full"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#FFF', fontFamily: font }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Mail className="w-4 h-4 mr-2" />{t('Send Message')}
        </Button>
      </div>
    </div>
  );

  // ─── Custom HTML ───────────────────────────────────────────

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
          {htmlData.show_title && htmlData.section_title && <h3 className="text-sm font-bold mb-3" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(htmlData.section_title)}</h3>}
          <StableHtmlContent htmlContent={htmlData.html_content} className="prose prose-sm max-w-none" />
        </div>
      </div>
    );
  };

  // ─── QR Share ──────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-5 pb-5">
        <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15`, boxShadow: `0 4px 20px rgba(190,24,93,0.06)` }}>
          <h3 className="text-sm font-bold mb-3 flex items-center justify-center gap-2" style={{ color: colors.primary, fontFamily: font }}>
            <Share2 className="w-4 h-4" /> {t('Share')} 💕
          </h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(qrData.share_message)}</p>}
          <div className="flex justify-center gap-3">
            {qrData.enable_qr && (
              <Button size="sm" variant="outline" className="text-xs rounded-full" style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }} onClick={() => setShowQrModal(true)}>
                <QrCode className="w-4 h-4 mr-1" />{t('QR Code')}
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-xs rounded-full" style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}
              onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ url: window.location.href, text: sanitizeText(qrData.share_message || '') }); }}>
              <Share2 className="w-4 h-4 mr-1" />{t('Share')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Footer ────────────────────────────────────────────────

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-5 pb-5 pt-2">
        <div className="border-t pt-4" style={{ borderColor: colors.primary + '15' }}>
          {footerData.footer_text && <p className="text-xs text-center leading-relaxed" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(footerData.footer_text)}</p>}
          {footerData.copyright_text && <p className="text-[10px] text-center mt-2" style={{ color: colors.text + '55', fontFamily: font }}>{sanitizeText(footerData.copyright_text)}</p>}
        </div>
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-datingcoach h1,
        .coach-tpl-datingcoach h2,
        .coach-tpl-datingcoach h3,
        .coach-tpl-datingcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-datingcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: '0 20px 60px rgba(190,24,93,0.12)',
      direction: isRTL ? 'rtl' : 'ltr',
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Warm romantic */}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        <Button className="w-full h-14 font-bold text-sm rounded-full tracking-wide transition-all hover:scale-[1.02]"
          style={{ backgroundColor: '#FFF', color: colors.primary, fontFamily: font, boxShadow: `0 8px 30px rgba(0,0,0,0.15)` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full h-10 text-xs font-medium"
          style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '50', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

