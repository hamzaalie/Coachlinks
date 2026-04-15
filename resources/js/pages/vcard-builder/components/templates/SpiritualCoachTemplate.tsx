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

/**
 * SpiritualCoachTemplate — ETHEREAL MYSTICAL design
 * Deep purple (#2D1B69) to indigo with golden mandala SVG overlay.
 * Semi-transparent purple-tinted glass cards, star sparkle accents,
 * vertical timeline programs, lotus testimonials, purple-to-gold gradients.
 * Mystical, cosmic, spiritual feel.
 */

interface SpiritualCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function SpiritualCoachTemplate({ data, template: _template, businessType }: SpiritualCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'spiritual-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#5B2CA0',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#E9C46A',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#A78BFA',
    background: configSections.colors?.background || '#0A0720',
    text: configSections.colors?.text || '#F3ECFF',
    cardBg: configSections.colors?.cardBg || '#181137',
  };
  const _fontPair = getCoachFonts('spiritual-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

  /* ─── Section Router ──────────────────────────────────────── */

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

  /* ─── Header — Deep purple-to-indigo with golden mandala SVG ─── */

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-3xl overflow-hidden" style={{ minHeight: '340px' }}>
      {/* Deep purple to indigo gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${colors.primary} 0%, #1A0F45 50%, #0F0A24 100%)` }} />
      {/* Golden mandala SVG overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(200,200)">
          {[0, 30, 60, 90, 120, 150].map(a => (
            <React.Fragment key={a}>
              <ellipse rx="120" ry="60" fill="none" stroke={colors.secondary} strokeWidth="0.5" transform={`rotate(${a})`} />
              <ellipse rx="80" ry="40" fill="none" stroke={colors.secondary} strokeWidth="0.3" transform={`rotate(${a + 15})`} />
            </React.Fragment>
          ))}
          <circle r="30" fill="none" stroke={colors.secondary} strokeWidth="0.5" />
          <circle r="60" fill="none" stroke={colors.secondary} strokeWidth="0.3" />
          <circle r="100" fill="none" stroke={colors.secondary} strokeWidth="0.3" />
          <circle r="140" fill="none" stroke={colors.secondary} strokeWidth="0.2" />
        </g>
      </svg>
      {/* Cosmic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${colors.accent}40, transparent 70%)` }} />
      {/* Star sparkles */}
      {[
        { top: '15%', left: '15%', size: 3 }, { top: '20%', right: '20%', size: 2 },
        { top: '60%', left: '10%', size: 2 }, { bottom: '25%', right: '15%', size: 3 },
        { top: '40%', right: '8%', size: 2 }, { bottom: '15%', left: '25%', size: 2 },
      ].map((pos, i) => (
        <div key={i} className="absolute rounded-full" style={{ ...pos, width: pos.size, height: pos.size, background: colors.secondary, boxShadow: `0 0 6px ${colors.secondary}`, opacity: 0.6 }} />
      ))}

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(212,175,55,0.12)', color: colors.secondary, backdropFilter: 'blur(10px)', border: `1px solid ${colors.secondary}25`, fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]" style={{ backgroundColor: colors.cardBg, borderColor: colors.accent + '30' }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-3 py-1 text-xs flex items-center space-x-2 transition-colors"
                    style={{ color: currentLanguage === lang.code ? colors.secondary : colors.text + 'D1' }}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative px-6 py-16 text-center">
        {/* Profile with glowing purple ring */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full" style={{ border: `2px solid ${colors.accent}40`, transform: 'scale(1.2)', boxShadow: `0 0 20px ${colors.accent}20` }} />
          <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${colors.secondary}20`, transform: 'scale(1.35)' }} />
          <div className="w-32 h-32 rounded-full overflow-hidden" style={{ border: `3px solid ${colors.accent}60`, boxShadow: `0 0 30px ${colors.accent}20` }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}40)`, color: colors.secondary, fontFamily: font }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
          {/* Sparkle decorations around profile */}
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5" style={{ color: colors.secondary, opacity: 0.7 }} />
          <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4" style={{ color: colors.secondary, opacity: 0.5 }} />
        </div>

        <h1 className="text-2xl font-semibold mb-1" style={{ color: colors.secondary, fontFamily: font, letterSpacing: '0.05em' }}>
          {headerData.name || t('Spiritual Guide')}
        </h1>
        <p className="text-sm mb-3" style={{ color: colors.accent, fontFamily: font, fontStyle: 'italic' }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs max-w-xs mx-auto leading-relaxed" style={{ color: colors.text + '80', fontFamily: font }}>
            ✦ {headerData.tagline} ✦
          </p>
        )}
      </div>
    </div>
  );

  /* ─── Contact — Purple glass circles ────────────────────── */

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-6">
      <div className="flex justify-center gap-5">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex flex-col items-center gap-2 transition-all hover:scale-110">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}30`, boxShadow: `0 0 15px ${colors.accent}10` }}>
              <Mail className="w-4 h-4" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + 'D1', fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex flex-col items-center gap-2 transition-all hover:scale-110">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}30`, boxShadow: `0 0 15px ${colors.accent}10` }}>
              <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + 'D1', fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-all hover:scale-110">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}30`, boxShadow: `0 0 15px ${colors.accent}10` }}>
              <Globe className="w-4 h-4" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs" style={{ color: colors.text + 'D1', fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${colors.accent}20`, border: `1px solid ${colors.accent}30`, boxShadow: `0 0 15px ${colors.accent}10` }}>
              <MapPin className="w-4 h-4" style={{ color: colors.secondary }} />
            </div>
            <span className="text-xs text-center" style={{ color: colors.text + 'D1', fontFamily: font, maxWidth: '60px' }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── About — Purple glass card with ethereal glow ─────── */

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-5">
        <div className="p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.cardBg}CC, ${colors.primary}60)`, backdropFilter: 'blur(10px)', border: `1px solid ${colors.accent}20`, boxShadow: `0 0 25px ${colors.accent}08` }}>
          <h3 className="text-center text-lg mb-4" style={{ color: colors.secondary, fontFamily: font, fontStyle: 'italic' }}>✦ {t('About')} ✦</h3>
          <p className="text-sm leading-loose text-center mb-5" style={{ color: colors.text + 'DD', fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                <Badge key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${colors.accent}15`, color: colors.accent, border: `1px solid ${colors.accent}25`, fontFamily: font }}>
                  ✧ {spec.trim()}
                </Badge>
              ))}
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs px-3 py-1 rounded-full" style={{ borderColor: colors.secondary + '30', color: colors.secondary, fontFamily: font }}>
                  <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                </Badge>
              ))}
            </div>
          )}

          {aboutData.experience && (
            <div className="text-center mt-4 pt-4" style={{ borderTop: `1px solid ${colors.accent}15` }}>
              <span className="text-3xl font-light" style={{ color: colors.secondary, fontFamily: font, textShadow: `0 0 15px ${colors.secondary}30` }}>{aboutData.experience}+</span>
              <p className="text-xs mt-1" style={{ color: colors.text + 'CC', fontFamily: font }}>{t('Years of Guidance')}</p>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-5 text-center">
              <p className="text-sm italic leading-relaxed" style={{ color: colors.accent, fontFamily: font }}>"{aboutData.philosophy}"</p>
            </div>
          )}

          {aboutData.mission && (
            <div className="mt-3 text-center">
              <p className="text-xs" style={{ color: colors.text + '90', fontFamily: font }}>{aboutData.mission}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Programs — Vertical timeline with glowing purple nodes ── */

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center text-lg mb-6" style={{ color: colors.secondary, fontFamily: font, fontStyle: 'italic' }}>✦ {t('Sacred Programs')} ✦</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${colors.accent}40, ${colors.accent}10)` }} />
          <div className="space-y-6">
            {programs.map((prog: any, i: number) => (
              <div key={i} className="relative flex gap-5">
                {/* Glowing purple node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`, color: colors.secondary, boxShadow: `0 0 15px ${colors.accent}30`, fontFamily: font }}>
                    {i + 1}
                  </div>
                </div>
                {/* Content card */}
                <div className="flex-1 p-4 rounded-xl mb-1" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15`, backdropFilter: 'blur(8px)' }}>
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-semibold" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                    {prog.price && <span className="text-sm font-semibold" style={{ color: colors.secondary, fontFamily: font }}>{prog.price}</span>}
                  </div>
                  {prog.description && <p className="text-xs leading-relaxed mb-2" style={{ color: colors.text + '90', fontFamily: font }}>{prog.description}</p>}
                  <div className="flex items-center gap-3 text-xs" style={{ color: colors.accent }}>
                    {prog.duration && <span>◈ {prog.duration}</span>}
                    {prog.format && <span>◈ {prog.format.replace(/-/g, ' ')}</span>}
                  </div>
                  {prog.enrollment_url && (
                    <Button size="sm" className="mt-3 rounded-full px-5"
                      style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font, fontSize: '0.7rem' }}
                      onClick={() => typeof window !== 'undefined' && window.open(prog.enrollment_url, '_blank', 'noopener,noreferrer')}>
                      <Sparkles className="w-3 h-3 mr-1" /> {t('Begin Journey')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ─── Signature Offer ────────────────────────────────────── */

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-6 py-6">
        <div className="p-6 rounded-2xl text-center" style={{ background: `linear-gradient(160deg, ${colors.primary}80, ${colors.cardBg})`, border: `1px solid ${colors.secondary}20`, boxShadow: `0 0 30px ${colors.accent}08` }}>
          <Sparkles className="w-7 h-7 mx-auto mb-3" style={{ color: colors.secondary }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{title}</h3>
          {desc && <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + '90', fontFamily: font }}>{desc}</p>}
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-3 text-left">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${colors.accent}08` }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${colors.accent}40, ${colors.secondary}30)`, color: colors.secondary, fontFamily: font }}>
                    ✧
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.text, fontFamily: font }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + 'CC', fontFamily: font }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Results ───────────────────────────────────────────── */

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
      <div className="px-6 py-6">
        <h3 className="text-center text-lg mb-6" style={{ color: colors.secondary, fontFamily: font, fontStyle: 'italic' }}>✦ {t('Sacred Results')} ✦</h3>
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15`, boxShadow: `0 0 15px ${colors.accent}05` }}>
                <p className="text-2xl font-light" style={{ color: colors.secondary, fontFamily: font, textShadow: `0 0 15px ${colors.secondary}25` }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: colors.text + 'CC', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}10` }}>
                <p className="text-sm font-medium mb-1" style={{ color: colors.secondary, fontFamily: font }}>{cs.client_name || cs.company}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}><span style={{ color: colors.accent }}>Before:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>✧ {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-medium mt-1" style={{ color: colors.secondary, fontFamily: font }}>{cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ─── Transformations ───────────────────────────────────── */

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center text-lg mb-6" style={{ color: colors.secondary, fontFamily: font, fontStyle: 'italic' }}>✦ {t('Awakening Stories')} ✦</h3>
        <div className="space-y-5">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-5 rounded-2xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15`, boxShadow: `0 0 20px ${colors.accent}05` }}>
              <p className="text-sm font-medium text-center mb-3" style={{ color: colors.secondary, fontFamily: font }}>{story.client_name || `Soul ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {story.before_image && <div className="relative rounded-xl overflow-hidden aspect-square"><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full" style={{ background: `${colors.primary}CC`, color: colors.text }}>{t('Before')}</span></div>}
                  {story.after_image && <div className="relative rounded-xl overflow-hidden aspect-square"><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full" style={{ background: `${colors.secondary}CC`, color: '#000' }}>{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <p className="text-xs text-center mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}>🌑 {story.before_state}</p>}
              {story.after_state && <p className="text-xs text-center mb-1" style={{ color: colors.secondary, fontFamily: font }}>🌕 {story.after_state}</p>}
              {story.testimonial && <p className="text-xs italic text-center mt-2 leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <p className="text-xs text-center mt-2" style={{ color: colors.accent, fontFamily: font }}>◈ {story.timeframe}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Lead Magnet ───────────────────────────────────────── */

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-6 py-6">
        <div className="p-6 rounded-2xl text-center" style={{ background: `linear-gradient(160deg, ${colors.accent}15, ${colors.cardBg})`, border: `1px solid ${colors.secondary}20`, boxShadow: `0 0 25px ${colors.accent}08` }}>
          <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: colors.secondary }} />
          <h3 className="text-base font-semibold mb-2" style={{ color: colors.secondary, fontFamily: font }}>{magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '90', fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden" style={{ border: `2px solid ${colors.accent}40`, boxShadow: `0 0 20px ${colors.accent}15` }}><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="rounded-full px-8"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font }}
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Receive Sacred Gift')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Booking ───────────────────────────────────────────── */

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-6">
      <div className="text-center p-6 rounded-2xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}20` }}>
        <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: colors.secondary }} />
        <h3 className="text-base font-semibold mb-1" style={{ color: colors.secondary, fontFamily: font }}>{t('Book Your Sacred Session')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '90', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded-full px-8"
          style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Session')}
        </Button>
      </div>
    </div>
  );

  /* ─── Testimonials — Lotus flower decorative elements ────── */

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-6 py-6">
        <h3 className="text-center text-lg mb-6" style={{ color: colors.secondary, fontFamily: font, fontStyle: 'italic' }}>✦ {t('Sacred Testimonials')} ✦</h3>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-5 rounded-2xl text-center" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15` }}>
                  {/* Lotus SVG decoration */}
                  <svg className="w-10 h-10 mx-auto mb-3" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 8 C20 8 15 16 15 22 C15 26 17 28 20 28 C23 28 25 26 25 22 C25 16 20 8 20 8Z" fill={`${colors.accent}30`} stroke={colors.secondary} strokeWidth="0.5" />
                    <path d="M20 12 C20 12 10 18 8 24 C6 28 10 30 14 28 C18 26 20 22 20 22" fill={`${colors.accent}20`} stroke={colors.secondary} strokeWidth="0.3" />
                    <path d="M20 12 C20 12 30 18 32 24 C34 28 30 30 26 28 C22 26 20 22 20 22" fill={`${colors.accent}20`} stroke={colors.secondary} strokeWidth="0.3" />
                  </svg>
                  <p className="text-sm italic leading-loose max-w-sm mx-auto mb-4" style={{ color: colors.text, fontFamily: font }}>{review.review}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? colors.secondary : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.secondary : colors.secondary + '30' }} />
                    ))}
                  </div>
                  {review.client_photo ? (
                    <img src={review.client_photo} alt="" className="w-12 h-12 rounded-full object-cover mx-auto mb-2" style={{ border: `2px solid ${colors.accent}40` }} />
                  ) : (
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-sm" style={{ background: `${colors.accent}20`, color: colors.secondary }}>{(review.client_name || '?').charAt(0)}</div>
                  )}
                  <p className="text-xs font-medium" style={{ color: colors.secondary, fontFamily: font }}>{review.client_name}</p>
                  {review.client_title && <p className="text-xs" style={{ color: colors.text + 'CC', fontFamily: font }}>{review.client_title}</p>}
                  {review.result_highlight && <p className="text-xs mt-3" style={{ color: colors.accent, fontFamily: font }}>✧ {review.result_highlight}</p>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.secondary : colors.accent + '30' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ─── Social ────────────────────────────────────────────── */

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full"
              style={{ borderColor: colors.accent + '30', color: colors.secondary, fontFamily: font, background: `${colors.accent}08` }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Links ─────────────────────────────────────────────── */

  const linkIconMap: Record<string, string> = { link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵', shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️' };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center text-base mb-4" style={{ color: colors.secondary, fontFamily: font }}>{t('Sacred Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}10` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(item.description)}</p>}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Business Hours ────────────────────────────────────── */

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center text-base mb-4" style={{ color: colors.secondary, fontFamily: font }}>{t('Sacred Hours')}</h3>
        <div className="p-4 rounded-xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}10` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between py-2.5" style={{ borderBottom: i < hours.length - 1 ? `1px solid ${colors.accent}08` : 'none' }}>
              <span className="capitalize text-xs" style={{ color: colors.text + 'AA', fontFamily: font }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '80' : colors.secondary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── Appointments ──────────────────────────────────────── */

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-5">
      <div className="text-center p-5 rounded-2xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15` }}>
        <h3 className="text-base mb-2" style={{ color: colors.secondary, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + 'D1', fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-6"
          style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  /* ─── Location ──────────────────────────────────────────── */

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-6 py-5">
        <h3 className="text-center text-base mb-3" style={{ color: colors.secondary, fontFamily: font }}>{t('Sacred Space')}</h3>
        {locationData.map_embed_url && <div className="rounded-xl overflow-hidden mb-3" style={{ height: '180px', border: `1px solid ${colors.accent}15` }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full"
            style={{ borderColor: colors.accent + '30', color: colors.secondary, fontFamily: font }}
            onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  /* ─── Contact Form ──────────────────────────────────────── */

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-5">
        <div className="text-center p-5 rounded-2xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15` }}>
          <h3 className="text-base mb-1" style={{ color: colors.secondary, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + 'D1', fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Custom HTML ───────────────────────────────────────── */

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-6 py-5">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center text-base mb-3" style={{ color: colors.secondary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded-xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}10`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  /* ─── QR Share ──────────────────────────────────────────── */

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-6 py-5">
        <div className="text-center p-4 rounded-xl" style={{ background: `${colors.cardBg}CC`, border: `1px solid ${colors.accent}15` }}>
          <h3 className="text-sm mb-2 flex items-center justify-center" style={{ color: colors.secondary, fontFamily: font }}>
            <Share2 className="w-4 h-4 mr-2" /> {t('Share')}
          </h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'D1', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', border: 'none', fontFamily: font }}
            onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  /* ─── Footer ────────────────────────────────────────────── */

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-6 py-4 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-xs" style={{ color: colors.text + '40', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  /* ─── Main Render ───────────────────────────────────────── */

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-spiritualcoach h1,
        .coach-tpl-spiritualcoach h2,
        .coach-tpl-spiritualcoach h3,
        .coach-tpl-spiritualcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-spiritualcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.primary}30 100%)`,
      boxShadow: `0 20px 60px rgba(8,6,22,0.55), 0 0 50px ${colors.accent}12`,
      border: `1px solid ${colors.accent}15`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>
        ))}

      {/* CTA Footer — Mystical gradient */}
      <div className="px-6 py-6 space-y-3">
        <Button className="w-full h-14 font-semibold rounded-full transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none', boxShadow: `0 8px 30px ${colors.accent}25` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Sparkles className="w-5 h-5 mr-2" /> {t('Begin Your Awakening')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: colors.accent + '30', color: colors.secondary, fontFamily: font }}
          onClick={() => {
            const contactData = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && <p className="text-xs text-center" style={{ color: colors.text + '40', fontFamily: font }}>{copyrightSection.text}</p>}
        </div>
      )}

      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={font} socialLinks={configSections.social?.social_links || []} />
    </div>
    </>
  );
}

