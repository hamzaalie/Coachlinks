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
 * ExecutiveCoachTemplate — LUXURY BLACK & PLATINUM design
 * Ultra-premium, black-tie level. Near-black backgrounds with gold pinstripe overlays,
 * octagonal profile shape, ALL CAPS gold name with wide letter-spacing,
 * diamond separator ◆, sharp-edged cards with gold borders, Roman numeral programs.
 */

interface ExecutiveCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ExecutiveCoachTemplate({ data, template: _template, businessType }: ExecutiveCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'executive-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#0A0A0A',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#1C1C1C',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#D4A853',
    background: configSections.colors?.background || '#F5F5F0',
    text: configSections.colors?.text || '#0A0A0A',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('executive-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

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

  // ─── Header — Pure BLACK with horizontal gold pinstripe overlay, octagonal profile ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '300px', background: colors.primary }}>
      {/* Horizontal gold pinstripe overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 11px, ${colors.accent}12 11px, ${colors.accent}12 12px)`,
      }} />
      {/* Subtle diagonal luxury texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 12px)`,
      }} />

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(212,168,83,0.15)', color: colors.accent, border: `1px solid ${colors.accent}40`, fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-amber-50 text-amber-700' : 'text-gray-700'}`}>
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
        {/* Octagonal profile */}
        {headerData.profile_image && (
          <div className="relative mb-6" style={{
            width: '120px', height: '120px',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            border: 'none',
          }}>
            <div className="w-full h-full" style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              padding: '3px',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}80)`,
            }}>
              <img src={sanitizeUrl(headerData.profile_image)} alt={sanitizeText(headerData.name || '')}
                className="w-full h-full object-cover"
                style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
            </div>
          </div>
        )}

        {/* Name in ALL CAPS GOLD with wide letter-spacing */}
        <h1 className="text-2xl font-bold uppercase" style={{
          color: colors.accent,
          fontFamily: font,
          letterSpacing: '0.25em',
          textShadow: `0 2px 15px rgba(212,168,83,0.3)`,
        }}>
          {sanitizeText(headerData.name || '')}
        </h1>

        {/* Gold diamond separator */}
        <div className="my-3 flex items-center gap-3">
          <div className="h-px w-12" style={{ backgroundColor: colors.accent + '40' }} />
          <span style={{ color: colors.accent, fontSize: '10px' }}>◆</span>
          <div className="h-px w-12" style={{ backgroundColor: colors.accent + '40' }} />
        </div>

        {headerData.title && (
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#FFFFFF99', fontFamily: font }}>
            {sanitizeText(headerData.title)}
          </p>
        )}
        {headerData.tagline && (
          <p className="text-xs mt-3 max-w-xs leading-relaxed" style={{ color: '#FFFFFF60', fontFamily: font }}>
            {sanitizeText(headerData.tagline)}
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Clean white, gold separators, sharp edges ───

  const renderContactSection = (contactData: any) => (
    <div className="px-5 py-5">
      <div className="p-5" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accent}30`, boxShadow: `0 4px 20px rgba(10,10,10,0.06)` }}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: colors.accent, fontFamily: font }}>{t('Contact')}</h2>
        <div className="space-y-3">
          {contactData.email && (
            <a href={`mailto:${sanitizeText(contactData.email)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
                <Mail className="w-4 h-4" style={{ color: colors.accent }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.email)}</span>
            </a>
          )}
          {contactData.phone && (
            <a href={`tel:${sanitizeText(contactData.phone)}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
                <Phone className="w-4 h-4" style={{ color: colors.accent }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.phone)}</span>
            </a>
          )}
          {contactData.website && (
            <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
                <Globe className="w-4 h-4" style={{ color: colors.accent }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.website)}</span>
            </a>
          )}
          {contactData.location && (
            <div className="flex items-center gap-3 text-sm" style={{ color: colors.text, fontFamily: font }}>
              <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
                <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
              </div>
              <span className="text-xs">{sanitizeText(contactData.location)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ─── About — White card, gold top rule, sharp edges ────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-5 pb-5">
        <div className="p-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 4px 20px rgba(10,10,10,0.06)` }}>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: colors.accent, fontFamily: font }}>{t('About')}</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-4">
              <div className="h-px mb-3" style={{ backgroundColor: colors.accent + '20' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: colors.accent, fontFamily: font }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-3 py-1 font-medium" style={{ background: 'transparent', color: colors.text, border: `1px solid ${colors.accent}40`, borderRadius: 0, fontFamily: font }}>
                    {sanitizeText(spec.trim())}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-4">
              <div className="h-px mb-3" style={{ backgroundColor: colors.accent + '20' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: colors.accent, fontFamily: font }}>{t('Credentials')}</p>
              <div className="space-y-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: colors.text + 'BB', fontFamily: font }}>
                    <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.accent }} />
                    {sanitizeText(cert.trim())}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${colors.accent}20` }}>
              <span className="text-3xl font-bold" style={{ color: colors.accent, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: colors.text + '80', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-4 italic text-xs leading-relaxed" style={{ background: colors.primary + '06', borderLeft: `2px solid ${colors.accent}`, color: colors.text + 'AA', fontFamily: font }}>
              "{sanitizeText(aboutData.philosophy)}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Horizontal scroll, black bg, gold text, Roman numerals ───

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="py-5">
        <div className="px-5 mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: colors.accent, fontFamily: font }}>{t('Programs')}</h2>
        </div>
        <div className="flex overflow-x-auto gap-3 px-5 pb-2" style={{ scrollbarWidth: 'none' }}>
          {programs.map((prog: any, i: number) => (
            <div key={i} className="flex-shrink-0 overflow-hidden" style={{ width: '240px', backgroundColor: colors.primary, border: `1px solid ${colors.accent}25`, boxShadow: `0 8px 30px rgba(0,0,0,0.15)` }}>
              <div className="p-5">
                {/* Roman numeral */}
                <div className="text-2xl font-bold mb-3" style={{ color: colors.accent, fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
                  {romanNumerals[i] || i + 1}
                </div>
                <h4 className="font-bold text-sm mb-2 uppercase tracking-wide" style={{ color: '#FFFFFF', fontFamily: font }}>{sanitizeText(prog.title || '')}</h4>
                {prog.price && (
                  <p className="text-lg font-bold mb-2" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(prog.price)}</p>
                )}
                {prog.description && <p className="text-xs leading-relaxed mb-3" style={{ color: '#FFFFFF80', fontFamily: font }}>{sanitizeText(prog.description)}</p>}
                <div className="flex items-center gap-2 flex-wrap">
                  {prog.format && <span className="text-[10px] px-2 py-0.5" style={{ border: `1px solid ${colors.accent}30`, color: colors.accent, fontFamily: font }}>{sanitizeText(prog.format.replace(/-/g, ' '))}</span>}
                  {prog.duration && <span className="text-[10px]" style={{ color: '#FFFFFF60', fontFamily: font }}>{sanitizeText(prog.duration)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Platinum card with gold accents ─────

  const renderSignatureOfferSection = (offerData: any) => {
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    if (!title && !desc) return null;
    return (
      <div className="px-5 pb-5">
        <div className="overflow-hidden" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
          {/* Gold stripe header */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: colors.accent }}>{t('Signature Framework')}</span>
            </div>
            {title && <h3 className="text-lg font-bold text-white mt-2 uppercase tracking-wide" style={{ fontFamily: font }}>{sanitizeText(title)}</h3>}
            {desc && <p className="text-xs text-white/50 mt-2 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(desc)}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="px-5 pb-5 space-y-2">
              {pillars.map((p: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderLeft: `2px solid ${colors.accent}` }}>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: colors.accent, fontFamily: 'Georgia, serif' }}>{romanNumerals[i] || i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: font }}>{sanitizeText(p.name || '')}</p>
                    {p.description && <p className="text-xs text-white/40 mt-0.5" style={{ fontFamily: font }}>{sanitizeText(p.description)}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results — Huge gold stat numbers on black background strips ───

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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: colors.accent, fontFamily: font }}>
          <BarChart3 className="w-4 h-4 inline-block mr-2" style={{ color: colors.accent }} />{t('Results')}
        </h2>
        {stats.length > 0 && (
          <div className="space-y-2 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-4" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}15` }}>
                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: '#FFFFFF80', fontFamily: font }}>{stat.label}</span>
                <span className="text-2xl font-bold" style={{ color: colors.accent, fontFamily: font }}>{stat.value}</span>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4" style={{ backgroundColor: colors.cardBg, borderLeft: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(cs.client_name || cs.company || cs.family_name || '')}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold" style={{ color: colors.accent }}>{t('Challenge')}:</span> {sanitizeText(cs.challenge || cs.starting_point)}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.accent, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(cs.result)}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-2 inline-block px-3 py-1" style={{ background: colors.accent + '15', color: colors.accent, fontFamily: font }}>{sanitizeText(cs.revenue_impact)}</p>}
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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: colors.accent, fontFamily: font }}>
          <TrendingUp className="w-4 h-4 inline-block mr-2" style={{ color: colors.accent }} />{t('Transformations')}
        </h2>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="overflow-hidden" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: colors.accent + '30' }}>
                  {story.before_image && <div className="relative"><img src={sanitizeUrl(story.before_image)} alt="Before" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] bg-red-600 text-white px-2 py-0.5 font-bold">{t('Before')}</span></div>}
                  {story.after_image && <div className="relative"><img src={sanitizeUrl(story.after_image)} alt="After" className="w-full h-28 object-cover" /><span className="absolute bottom-1 left-1 text-[10px] text-white px-2 py-0.5 font-bold" style={{ backgroundColor: colors.accent }}>{t('After')}</span></div>}
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-bold mb-2" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(story.client_name || `Client ${i + 1}`)}</p>
                {story.before_state && <div className="p-2 text-xs mb-1" style={{ borderLeft: `2px solid #EF4444`, backgroundColor: '#FEF2F2' }}><span className="font-bold" style={{ color: '#EF4444' }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{sanitizeText(story.before_state)}</span></div>}
                {story.after_state && <div className="p-2 text-xs mb-1" style={{ borderLeft: `2px solid ${colors.accent}`, backgroundColor: colors.accent + '08' }}><span className="font-bold" style={{ color: colors.accent }}>{t('After')}:</span> <span style={{ color: colors.text }}>{sanitizeText(story.after_state)}</span></div>}
                {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: font }}>"{sanitizeText(story.testimonial)}"</p>}
                {story.timeframe && <Badge className="text-[10px] mt-2 font-semibold" style={{ backgroundColor: colors.primary, color: colors.accent, borderRadius: 0, fontFamily: font }}>{sanitizeText(story.timeframe)}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Platinum card with gold CTA ─────────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-5 pb-5">
        <div className="overflow-hidden" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}25` }}>
          <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
          {magnetData.magnet_image && <img src={sanitizeUrl(magnetData.magnet_image)} alt={sanitizeText(magnetData.magnet_title)} className="w-full h-40 object-cover" style={{ opacity: 0.8 }} />}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4" style={{ color: colors.accent }} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: colors.accent }}>{t('Exclusive Resource')}</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: font }}>{sanitizeText(magnetData.magnet_title)}</h3>
            {magnetData.magnet_description && <p className="text-xs text-white/50 mb-4 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(magnetData.magnet_description)}</p>}
            <Button className="w-full h-11 font-bold text-sm uppercase tracking-wider"
              style={{ backgroundColor: colors.accent, color: colors.primary, borderRadius: 0, fontFamily: font }}
              onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(sanitizeUrl(magnetData.magnet_url), '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
              <Download className="w-4 h-4 mr-2" /> {t('Download Now')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Booking — Luxury gold-on-black CTA ────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-5 pb-5">
      <div className="p-5 text-center" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}30` }}>
        <div className="h-0.5 mb-5" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
        <Calendar className="w-6 h-6 mx-auto mb-3" style={{ color: colors.accent }} />
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-1" style={{ fontFamily: font }}>{t('Book a Consultation')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(bookingData.call_duration)}</p>}
        {bookingData.call_description && <p className="text-xs text-white/50 mb-4 leading-relaxed" style={{ fontFamily: font }}>{sanitizeText(bookingData.call_description)}</p>}
        <Button className="px-8 h-11 font-bold text-sm uppercase tracking-wider"
          style={{ backgroundColor: colors.accent, color: colors.primary, borderRadius: 0, fontFamily: font }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(sanitizeUrl(bookingData.booking_url), '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Black card, gold stars, white italic ───

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const review = reviews[currentReview % reviews.length];
    return (
      <div className="px-5 pb-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: colors.accent, fontFamily: font }}>{t('Testimonials')}</h2>
        <div className="p-5 transition-all duration-500" style={{ backgroundColor: colors.primary, border: `1px solid ${colors.accent}20` }}>
          {/* Gold stars */}
          {review.rating && (
            <div className="flex gap-1 mb-3">
              {Array.from({ length: Number(review.rating) }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors.accent }} />
              ))}
            </div>
          )}
          {review.review && <p className="text-sm italic leading-relaxed text-white" style={{ fontFamily: font }}>"{sanitizeText(review.review)}"</p>}
          {review.result_highlight && <p className="text-xs font-semibold mt-3" style={{ color: colors.accent, fontFamily: font }}><CheckCircle className="w-3 h-3 inline-block mr-1" />{sanitizeText(review.result_highlight)}</p>}
          <div className="h-px my-4" style={{ backgroundColor: colors.accent + '20' }} />
          <div className="flex items-center gap-3">
            {review.client_photo && <img src={sanitizeUrl(review.client_photo)} alt="" className="w-10 h-10 object-cover" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />}
            <div>
              <p className="text-sm font-bold" style={{ color: colors.accent, fontFamily: font }}>{sanitizeText(review.client_name || '')}</p>
              {review.client_title && <p className="text-[10px]" style={{ color: '#FFFFFF60', fontFamily: font }}>{sanitizeText(review.client_title)}</p>}
            </div>
          </div>
        </div>
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {reviews.map((_: any, i: number) => (
              <button key={i} onClick={() => setCurrentReview(i)} className="w-2 h-2 transition-all" style={{ backgroundColor: i === currentReview % reviews.length ? colors.accent : colors.accent + '30' }} />
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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: colors.accent, fontFamily: font }}>{t('Connect')}</h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, i: number) => (
            <a key={i} href={sanitizeUrl(link.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all hover:scale-105"
              style={{ backgroundColor: colors.primary, color: colors.accent, border: `1px solid ${colors.accent}30`, fontFamily: font }}>
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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: colors.accent, fontFamily: font }}>{t('Links')}</h2>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url || '')} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 transition-all hover:translate-x-1"
              style={{ backgroundColor: colors.cardBg, borderLeft: `2px solid ${colors.accent}`, boxShadow: `0 1px 6px rgba(10,10,10,0.04)` }}>
              <span className="text-lg">{linkIconMap[item.icon || 'link'] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text || '')}</p>
                {item.description && <p className="text-[10px] truncate" style={{ color: colors.text + '88', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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
        <div className="p-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: colors.accent, fontFamily: font }}>{t('Business Hours')}</h2>
          <div className="space-y-0">
            {hours.map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-xs py-2" style={{ borderBottom: `1px solid ${colors.accent}10`, fontFamily: font }}>
                <span className="font-medium uppercase tracking-wider" style={{ color: colors.text }}>{sanitizeText(h.day || '')}</span>
                <span style={{ color: h.is_closed ? '#EF4444' : colors.accent, fontWeight: 600 }}>{h.is_closed ? t('Closed') : `${sanitizeText(h.open_time || '')} – ${sanitizeText(h.close_time || '')}`}</span>
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
      <div className="p-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
        <Calendar className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.text, fontFamily: font }}>{t('Schedule Appointment')}</h3>
        {apptData.consultation_info && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(apptData.consultation_info)}</p>}
        <Button className="w-full mt-4 h-10 text-sm font-bold uppercase tracking-wider"
          style={{ backgroundColor: colors.primary, color: colors.accent, borderRadius: 0, fontFamily: font }}
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
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: colors.accent, fontFamily: font }}>
          <MapPin className="w-4 h-4 inline-block mr-2" />{t('Location')}
        </h2>
        <div className="overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accent}20` }}>
          {locationData.map_embed_url && (
            <div className="w-full h-44">
              <StableHtmlContent htmlContent={locationData.map_embed_url} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" />
            </div>
          )}
          {locationData.directions_url && (
            <div className="p-4">
              <a href={sanitizeUrl(locationData.directions_url)} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-10 text-sm font-medium uppercase tracking-wider" variant="outline" style={{ borderColor: colors.accent + '40', color: colors.accent, borderRadius: 0, fontFamily: font }}>
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
      <div className="p-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
        {formData.form_title && <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(formData.form_title)}</h3>}
        {formData.form_subtitle && <p className="text-xs mt-1 mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(formData.form_subtitle)}</p>}
        <Button className="w-full h-10 text-sm font-bold uppercase tracking-wider"
          style={{ backgroundColor: colors.primary, color: colors.accent, borderRadius: 0, fontFamily: font }}
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
        <div className="p-5" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
          {htmlData.show_title && htmlData.section_title && <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(htmlData.section_title)}</h3>}
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
        <div className="p-5 text-center" style={{ backgroundColor: colors.cardBg, borderTop: `2px solid ${colors.accent}`, boxShadow: `0 2px 12px rgba(10,10,10,0.06)` }}>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: colors.accent, fontFamily: font }}>
            <Share2 className="w-4 h-4 inline-block mr-2" />{t('Share')}
          </h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{sanitizeText(qrData.share_message)}</p>}
          <div className="flex justify-center gap-3">
            {qrData.enable_qr && (
              <Button size="sm" variant="outline" className="text-xs uppercase tracking-wider" style={{ borderColor: colors.accent + '40', color: colors.accent, borderRadius: 0, fontFamily: font }} onClick={() => setShowQrModal(true)}>
                <QrCode className="w-4 h-4 mr-1" />{t('QR Code')}
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-xs uppercase tracking-wider" style={{ borderColor: colors.accent + '40', color: colors.accent, borderRadius: 0, fontFamily: font }}
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
        <div className="pt-4" style={{ borderTop: `1px solid ${colors.accent}20` }}>
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
        .coach-tpl-executivecoach h1,
        .coach-tpl-executivecoach h2,
        .coach-tpl-executivecoach h3,
        .coach-tpl-executivecoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-executivecoach overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px rgba(10,10,10,0.2), 0 0 0 1px ${colors.accent}15`,
      direction: isRTL ? 'rtl' : 'ltr',
      borderRadius: 0,
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Luxury gold-on-black */}
      <div className="p-5 space-y-3" style={{ backgroundColor: colors.primary }}>
        <div className="h-px mb-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
        <Button className="w-full h-14 font-bold text-sm uppercase tracking-[0.15em] transition-all hover:scale-[1.02]"
          style={{ backgroundColor: colors.accent, color: colors.primary, borderRadius: 0, fontFamily: font, boxShadow: `0 8px 30px rgba(212,168,83,0.3)` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full h-10 text-xs font-medium uppercase tracking-wider"
          style={{ borderColor: colors.accent + '40', color: colors.accent, borderRadius: 0, fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1" style={{ backgroundColor: colors.primary }}>
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.accent + '60', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

