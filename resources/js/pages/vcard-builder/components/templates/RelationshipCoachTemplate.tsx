/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAppointmentBooking } from '../VCardPreview';
import React from 'react';
import StableHtmlContent from '@/components/StableHtmlContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Globe, MapPin, Calendar, UserPlus, Target, TrendingUp, Zap, Award, Download, CheckCircle, Share2, QrCode, Gift, Sparkles, BarChart3 } from 'lucide-react';
import { QRShareModal } from '@/components/QRShareModal';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { getBusinessTemplate } from '@/pages/vcard-builder/business-templates';
import { useTranslation } from 'react-i18next';
import { sanitizeText, sanitizeUrl } from '@/utils/sanitizeHtml';
import languageData from '@/../../resources/lang/language.json';
import { getCoachFonts } from './coach-fonts';

/**
 * RelationshipCoachTemplate — WARM ROMANTIC design
 * Rose-gold to deep blush gradient, heart decorations, soft pink cards, elegant cursive feel.
 */

interface RelationshipCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RelationshipCoachTemplate({ data, template: _template, businessType }: RelationshipCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'relationship-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#B76E79',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#8B4557',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#D4A574',
    background: configSections.colors?.background || '#FFF9F7',
    text: configSections.colors?.text || '#4A3040',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('relationship-coach');
  const font = configSections.font || _fontPair.body;
  const headingFont = _fontPair.heading;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const allSections = templateDef?.sections || [];

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

  // ─── Header — Rose-gold to deep blush with heart-shaped decorative dots ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative rounded-t-3xl overflow-hidden" style={{ minHeight: '280px' }}>
      {/* Rose-gold to blush gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary} 60%, ${colors.primary}CC)` }} />
      {/* Heart-shaped decorative dots */}
      <div className="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heartDots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25 18 C25 14, 20 10, 16 14 C12 18, 16 24, 25 30 C34 24, 38 18, 34 14 C30 10, 25 14, 25 18Z" fill="white" opacity="0.15" transform="scale(0.4) translate(20,15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartDots)" />
        </svg>
      </div>
      {/* Soft radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 opacity-20" style={{ background: `radial-gradient(ellipse, ${colors.accent}, transparent)` }} />

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
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative px-6 py-12 text-center">
        {/* Circular profile with decorative ring */}
        <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden" style={{ border: `4px solid rgba(255,255,255,0.5)`, boxShadow: `0 0 0 8px ${colors.primary}30, 0 8px 40px ${colors.secondary}50` }}>
          {headerData.profile_image ? (
            <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-3xl" style={{ background: colors.accent, fontFamily: 'Georgia, serif' }}>
              {(headerData.name || '?').charAt(0)}
            </div>
          )}
        </div>
        <h1 className="text-2xl text-white mb-1" style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}>
          {headerData.name || t('Relationship Coach')}
        </h1>
        <p className="text-sm text-white/80 italic mb-3" style={{ fontFamily: font }}>{headerData.title || ''}</p>
        {headerData.tagline && (
          <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: font }}>💕 {headerData.tagline}</p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Soft pink rounded contact buttons ───────────

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-5">
      <div className="grid grid-cols-2 gap-3">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.primary + '10', border: `1px solid ${colors.primary}20` }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.accent + '15', border: `1px solid ${colors.accent}25` }}>
            <Phone className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.primary + '08', border: `1px solid ${colors.primary}15` }}>
            <Globe className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: font }}>{t('Website')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: colors.accent + '08', border: `1px solid ${colors.accent}15` }}>
            <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs truncate" style={{ color: colors.text, fontFamily: font }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Soft pink card with rose-gold border ──────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}18`, boxShadow: `0 4px 20px ${colors.primary}08` }}>
          <h3 className="text-base mb-3 flex items-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>
            💝 {t('About Me')}
          </h3>
          <p className="text-sm leading-loose mb-4" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('Specializations')}:</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-full px-3 py-1" style={{ background: `${colors.primary}12`, color: colors.primary, border: `1px solid ${colors.primary}25`, fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: colors.primary, fontFamily: font }}>{t('Credentials')}:</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-full px-3 py-1" style={{ borderColor: colors.accent, color: colors.accent, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 p-3 rounded-2xl" style={{ backgroundColor: colors.primary + '08' }}>
              <span className="text-2xl font-bold" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs" style={{ color: colors.text + '88', fontFamily: font }}>{t('Years')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-4 rounded-2xl italic text-sm" style={{ backgroundColor: colors.primary + '06', color: colors.text, fontFamily: 'Georgia, serif' }}>
              "💕 {aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Two-column grid with romantic cursive titles ────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-center text-base mb-5 flex items-center justify-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>
          <TrendingUp className="w-5 h-5 mr-2" /> {t('Programs')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="p-4 rounded-2xl transition-all hover:shadow-md" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}15` }}>
              <h4 className="text-sm mb-2" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600, fontStyle: 'italic' }}>{prog.title}</h4>
              {prog.description && <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{prog.description}</p>}
              <div className="flex flex-col gap-1">
                {prog.format && <Badge className="text-xs rounded-full w-fit" style={{ backgroundColor: colors.primary + '12', color: colors.primary, fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                {prog.duration && <span className="text-xs" style={{ color: colors.text + '80', fontFamily: font }}>{prog.duration}</span>}
                {prog.price && <span className="text-xs font-bold" style={{ color: colors.accent, fontFamily: font }}>{prog.price}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer ───────────────────────────────────────

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-6 py-4">
        <div className="p-6 rounded-2xl" style={{ background: `linear-gradient(180deg, ${colors.primary}08, ${colors.accent}06)`, border: `2px solid ${colors.primary}15` }}>
          <div className="text-center mb-5">
            <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
            <h3 className="text-base" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{title}</h3>
            {desc && <p className="text-xs mt-2 leading-relaxed italic" style={{ color: colors.text + 'AA', fontFamily: font }}>{desc}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-2">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl" style={{ backgroundColor: colors.cardBg }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white' }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: colors.text, fontFamily: font }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '88', fontFamily: font }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results ───────────────────────────────────────────────

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
      <div className="px-6 py-4">
        <h3 className="text-center text-base mb-4 flex items-center justify-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>
          <BarChart3 className="w-5 h-5 mr-2" /> {t('Results')}
        </h3>
        {stats.length > 0 && (
          <div className={`grid ${stats.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-3 mb-4`}>
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl" style={{ backgroundColor: colors.primary + '08', border: `1px solid ${colors.primary}15` }}>
                <p className="text-lg font-bold" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: colors.text + '80', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}10` }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-semibold" style={{ color: colors.secondary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.primary, fontFamily: font }}><span className="font-semibold">{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-bold mt-1" style={{ color: colors.accent, fontFamily: font }}>{cs.revenue_impact}</p>}
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
      <div className="px-6 py-4">
        <h3 className="text-base mb-4 text-center flex items-center justify-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>
          <Zap className="w-5 h-5 mr-2" /> {t('Love Stories')}
        </h3>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}12` }}>
              <p className="text-sm font-bold mb-2" style={{ color: colors.primary, fontFamily: font }}>💕 {story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {story.before_image && <div className="relative rounded-2xl overflow-hidden aspect-square"><img src={story.before_image} alt="Before" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">{t('Before')}</span></div>}
                  {story.after_image && <div className="relative rounded-2xl overflow-hidden aspect-square"><img src={story.after_image} alt="After" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">{t('After')}</span></div>}
                </div>
              )}
              {story.before_state && <div className="p-3 rounded-xl text-xs mb-1" style={{ backgroundColor: colors.primary + '06' }}><span className="font-semibold" style={{ color: colors.primary }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{story.before_state}</span></div>}
              {story.after_state && <div className="p-3 rounded-xl text-xs mb-1" style={{ backgroundColor: colors.accent + '10' }}><span className="font-semibold" style={{ color: colors.accent }}>{t('After')}:</span> <span style={{ color: colors.text }}>{story.after_state}</span></div>}
              {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: 'Georgia, serif' }}>"{story.testimonial}"</p>}
              {story.timeframe && <Badge className="text-xs mt-2 rounded-full" style={{ backgroundColor: colors.primary + '12', color: colors.primary, fontFamily: font }}>{story.timeframe}</Badge>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet ───────────────────────────────────────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-6 rounded-2xl text-center" style={{ background: `linear-gradient(180deg, ${colors.primary}08, ${colors.accent}10)`, border: `2px dashed ${colors.primary}25` }}>
          <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: colors.primary }} />
          <h3 className="text-base mb-2" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>💝 {magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'BB', fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md"><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="rounded-full px-6" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none' }}
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Booking ───────────────────────────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-6 rounded-2xl" style={{ background: `linear-gradient(180deg, ${colors.primary}06, ${colors.accent}08)`, border: `2px solid ${colors.primary}15` }}>
        <Calendar className="w-7 h-7 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="text-sm mb-1" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + '88', fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded-full px-6" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none' }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Hearts instead of stars for ratings ────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-sm mb-4 text-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Love Letters from Clients')}</h3>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-5 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}12` }}>
                  {/* Hearts instead of stars */}
                  <div className="flex items-center space-x-1 mb-3 justify-center">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="text-sm" style={{ opacity: s < parseInt(review.rating || 5) ? 1 : 0.25 }}>
                        ❤️
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mb-4 italic leading-relaxed text-center" style={{ color: colors.text, fontFamily: 'Georgia, serif' }}>
                    "{review.review}"
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {review.client_photo ? (
                      <img src={review.client_photo} alt="" className="w-8 h-8 rounded-full object-cover" style={{ border: `2px solid ${colors.primary}30` }} />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: colors.primary }}>
                        {(review.client_name || '?').charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold" style={{ color: colors.primary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-xs" style={{ color: colors.text + '88', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-3 p-2 rounded-xl text-xs text-center" style={{ backgroundColor: colors.primary + '08', color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-1.5">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social ────────────────────────────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full"
              style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
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
      <div className="px-6 py-4">
        <h3 className="text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Quick Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}12`, boxShadow: `0 2px 8px ${colors.primary}06` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '80', fontFamily: font }}>{sanitizeText(item.description)}</p>}
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
      <div className="px-6 py-4">
        <h3 className="text-sm mb-3 text-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Availability')}</h3>
        <div className="space-y-1.5">
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-2.5 rounded-xl" style={{ backgroundColor: h.is_closed ? 'transparent' : colors.primary + '04' }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs" style={{ color: h.is_closed ? colors.text + '50' : colors.primary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-5 rounded-2xl" style={{ background: `linear-gradient(180deg, ${colors.primary}06, ${colors.accent}08)`, border: `2px solid ${colors.primary}15` }}>
        <h3 className="text-sm mb-2" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-6" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none' }}
          onClick={() => handleAppointmentBooking(configSections.appointments)}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Location ──────────────────────────────────────────────

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-sm mb-3 flex items-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}><MapPin className="w-4 h-4 mr-2" /> {t('Location')}</h3>
        {locationData.map_embed_url && <div className="rounded-2xl overflow-hidden mb-3" style={{ height: '180px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && <Button size="sm" variant="outline" className="w-full rounded-full" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button>}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-5 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}12` }}>
          <h3 className="text-sm mb-2" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none' }}
            onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
            <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Custom HTML ───────────────────────────────────────────

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (
      <div className="px-6 py-4">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center text-base mb-3" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}10`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ──────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.primary}10` }}>
          <h3 className="text-sm mb-2 flex items-center justify-center" style={{ color: colors.primary, fontFamily: 'Georgia, serif', fontWeight: 600 }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none' }} onClick={() => setShowQrModal(true)}>
            <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Footer ────────────────────────────────────────────────

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (
      <div className="px-6 py-3 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '80', fontFamily: 'Georgia, serif' }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-xs" style={{ color: colors.text + '60', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-relationshipcoach h1,
        .coach-tpl-relationshipcoach h2,
        .coach-tpl-relationshipcoach h3,
        .coach-tpl-relationshipcoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-relationshipcoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px ${colors.primary}12`,
      border: `1px solid ${colors.primary}08`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Romantic warm style */}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(180deg, transparent, ${colors.primary}04)` }}>
        <Button className="w-full h-14 font-bold rounded-full transition-all hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: 'white', fontFamily: font, border: 'none', boxShadow: `0 8px 25px ${colors.primary}25` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> 💕 {t('Start Your Journey')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full"
          style={{ borderColor: colors.primary + '30', color: colors.primary, fontFamily: font }}
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

