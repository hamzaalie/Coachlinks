/* eslint-disable @typescript-eslint/no-explicit-any */
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
 * SalesCoachTemplate — BOLD CLOSER design
 * Aggressive, confident, deal-making energy. Electric blue gradient with upward-pointing arrow shapes,
 * diamond-shaped profile, money-green accents, fire-orange prices. High-energy sales vibe.
 */

interface SalesCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SalesCoachTemplate({ data, template: _template, businessType }: SalesCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'sales-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#0047FF',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#00C853',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#FF6D00',
    background: configSections.colors?.background || '#F5F7FA',
    text: configSections.colors?.text || '#0D1B2A',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('sales-coach');
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

  // ─── Header — Electric blue gradient with upward arrow shapes, diamond profile ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
      {/* Bold electric blue gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #0033CC 50%, #001A80 100%)` }} />
      {/* Upward-pointing arrow shapes (CSS triangles) */}
      <div className="absolute bottom-0 left-1/4" style={{ width: 0, height: 0, borderLeft: '60px solid transparent', borderRight: '60px solid transparent', borderBottom: `80px solid ${colors.secondary}20` }} />
      <div className="absolute bottom-0 right-1/3" style={{ width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: `55px solid ${colors.secondary}15` }} />
      <div className="absolute bottom-0 left-[10%]" style={{ width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: `40px solid ${colors.accent}10` }} />
      {/* Diagonal energy lines */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${colors.secondary}30 20px, ${colors.secondary}30 21px)` }} />

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

      <div className="relative flex flex-col items-center justify-center text-center px-6 py-10" style={{ minHeight: '280px' }}>
        {/* Diamond-shaped profile container */}
        <div className="relative mb-5" style={{ width: '100px', height: '100px', transform: 'rotate(45deg)', overflow: 'hidden', border: `3px solid ${colors.secondary}`, boxShadow: `0 8px 30px rgba(0,200,83,0.3)` }}>
          {headerData.profile_image ? (
            <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" style={{ transform: 'rotate(-45deg) scale(1.42)' }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-black" style={{ background: colors.secondary, transform: 'rotate(-45deg)' }}>
              {(headerData.name || '?').charAt(0)}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight uppercase" style={{ fontFamily: font, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          {headerData.name || t('Sales Coach')}
        </h1>
        <p className="text-sm font-bold mt-1" style={{ color: colors.secondary, fontFamily: font, letterSpacing: '0.08em' }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs mt-2 px-4 py-1 rounded-full" style={{ color: 'white', background: 'rgba(255,255,255,0.15)', fontFamily: font }}>{headerData.tagline}</p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Bold button row with colored icons ──────────

  const renderContactSection = (contactData: any) => (
    <div className="px-5 py-4">
      <div className="flex gap-2">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 4px 15px ${colors.primary}10` }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.secondary}`, boxShadow: `0 4px 15px ${colors.secondary}10` }}>
            <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, boxShadow: `0 4px 15px ${colors.accent}10` }}>
            <Globe className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
      </div>
      {contactData.location && (
        <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg" style={{ backgroundColor: colors.primary + '08', borderLeft: `4px solid ${colors.primary}` }}>
          <MapPin className="w-3.5 h-3.5" style={{ color: colors.primary }} />
          <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: font }}>{contactData.location}</span>
        </div>
      )}
    </div>
  );

  // ─── About — White card with blue left accent stripe ───────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-5 py-4">
        <div className="p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 8px 30px ${colors.primary}08` }}>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" style={{ color: colors.primary }} />
            <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('About')}</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: font }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: colors.primary + '12', color: colors.primary, border: `1px solid ${colors.primary}25`, fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: colors.secondary, fontFamily: font }}>{t('Credentials')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs px-3 py-1 rounded-full font-semibold" style={{ borderColor: colors.secondary, color: colors.secondary, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: `2px solid ${colors.primary}10` }}>
              <span className="text-4xl font-black" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs uppercase font-bold tracking-wider" style={{ color: colors.text + '80', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-3 rounded-lg italic text-xs" style={{ background: colors.primary + '06', borderLeft: `3px solid ${colors.primary}`, color: colors.text + 'BB', fontFamily: font }}>
              "{aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Cards with PRICE in large orange, ROI badges ─────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="py-4">
        <div className="px-5 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Programs')}</h3>
        </div>
        <div className="flex overflow-x-auto gap-3 px-5 pb-2" style={{ scrollbarWidth: 'none' }}>
          {programs.map((prog: any, i: number) => (
            <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: '250px', backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 8px 25px ${colors.primary}10` }}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-sm flex-1" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                  <Badge className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: colors.secondary + '15', color: colors.secondary, border: `1px solid ${colors.secondary}30`, fontFamily: font }}>
                    <TrendingUp className="w-3 h-3 mr-1" /> ROI
                  </Badge>
                </div>
                {prog.price && (
                  <p className="text-2xl font-black mb-2" style={{ color: colors.accent, fontFamily: font }}>{prog.price}</p>
                )}
                {prog.description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{prog.description}</p>}
                <div className="flex items-center gap-2">
                  {prog.format && <Badge className="text-xs rounded-full" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                  {prog.duration && <span className="text-xs font-medium" style={{ color: colors.text + '80', fontFamily: font }}>{prog.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Blue bg with green highlights ───────

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-5 py-4">
        <div className="p-5 rounded-xl relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${colors.primary}, #0033CC)` }}>
          {/* Decorative arrow */}
          <div className="absolute top-4 right-4" style={{ width: 0, height: 0, borderLeft: '25px solid transparent', borderRight: '25px solid transparent', borderBottom: `35px solid ${colors.secondary}20` }} />
          <Sparkles className="w-6 h-6 mb-3" style={{ color: colors.secondary }} />
          <h3 className="font-black text-lg text-white mb-1 uppercase" style={{ fontFamily: font }}>{title}</h3>
          {desc && <p className="text-xs text-white/70 mb-4" style={{ fontFamily: font }}>{desc}</p>}
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="space-y-2">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ backgroundColor: colors.secondary, color: '#fff' }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: font }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs text-white/50 mt-0.5" style={{ fontFamily: font }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results — Big bold blue numbers in grid, green success highlights ────

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
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Results')}</h3>
        </div>
        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 4px 15px ${colors.primary}08` }}>
                <p className="text-3xl font-black" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</p>
                <p className="text-xs uppercase tracking-wider mt-1 font-semibold" style={{ color: colors.text + '80', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.secondary}`, boxShadow: `0 4px 15px ${colors.secondary}08` }}>
                <p className="text-sm font-black mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}><span className="font-bold" style={{ color: colors.primary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs font-semibold" style={{ color: colors.secondary, fontFamily: font }}><span className="font-bold">{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-sm font-black mt-2 px-3 py-1 rounded-full inline-block" style={{ background: colors.secondary + '15', color: colors.secondary, fontFamily: font }}>{cs.revenue_impact}</p>}
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
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4" style={{ color: colors.accent }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Transformations')}</h3>
        </div>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, boxShadow: `0 4px 15px ${colors.accent}08` }}>
              <p className="text-sm font-black mb-2" style={{ color: colors.text, fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {story.before_image && (
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 text-xs text-white px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: colors.secondary }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}
              {story.before_state && <div className="p-2 text-xs mb-1 rounded-lg" style={{ backgroundColor: '#FF000008', borderLeft: `3px solid #EF4444` }}><span className="font-bold" style={{ color: '#EF4444' }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{story.before_state}</span></div>}
              {story.after_state && <div className="p-2 text-xs mb-1 rounded-lg" style={{ backgroundColor: colors.secondary + '08', borderLeft: `3px solid ${colors.secondary}` }}><span className="font-bold" style={{ color: colors.secondary }}>{t('After')}:</span> <span style={{ color: colors.text }}>{story.after_state}</span></div>}
              {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'AA', fontFamily: font }}>"{story.testimonial}"</p>}
              {story.timeframe && <Badge className="text-xs mt-2 rounded-full font-bold" style={{ backgroundColor: colors.accent + '15', color: colors.accent, fontFamily: font }}>{story.timeframe}</Badge>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Blue gradient with orange CTA ───────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-5 py-4">
        <div className="p-5 rounded-xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, #001A80)` }}>
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${colors.accent}, transparent)` }} />
          <Gift className="w-7 h-7 mb-3" style={{ color: colors.accent }} />
          <h3 className="font-black text-base text-white mb-2 uppercase" style={{ fontFamily: font }}>{magnetData.magnet_title}</h3>
          {magnetData.magnet_description && <p className="text-xs text-white/60 mb-4 leading-relaxed" style={{ fontFamily: font }}>{magnetData.magnet_description}</p>}
          {magnetData.magnet_image && <div className="w-28 h-28 mb-4 overflow-hidden rounded-xl shadow-lg"><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
          <Button className="px-6 rounded-full font-black" style={{ background: colors.accent, color: '#fff', fontFamily: font, border: 'none', boxShadow: `0 6px 20px ${colors.accent}50` }}
            onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
            <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
          </Button>
        </div>
      </div>
    );
  };

  // ─── Booking — Bold CTA card ───────────────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-5 py-4">
      <div className="text-center p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, border: `3px solid ${colors.primary}20`, boxShadow: `0 8px 30px ${colors.primary}10` }}>
        <Calendar className="w-7 h-7 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="font-black text-sm mb-1 uppercase" style={{ color: colors.primary, fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1 font-semibold" style={{ color: colors.accent, fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="px-8 rounded-full font-black" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#fff', fontFamily: font, border: 'none', boxShadow: `0 6px 20px ${colors.primary}40` }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Carousel with blue-green accent ────────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4" style={{ color: colors.accent }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Client Testimonials')}</h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.secondary}`, boxShadow: `0 4px 15px ${colors.secondary}08` }}>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? colors.accent : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.accent : '#D1D5DB' }} />
                    ))}
                  </div>
                  <p className="text-xs mb-3 italic leading-relaxed" style={{ color: colors.text, fontFamily: font }}>"{review.review}"</p>
                  <div className="flex items-center gap-2">
                    {review.client_photo && <img src={review.client_photo} alt="" className="w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: colors.secondary }} />}
                    <div>
                      <p className="text-xs font-black" style={{ color: colors.primary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-xs" style={{ color: colors.text + '88', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-2 p-2 text-xs rounded-lg font-semibold" style={{ backgroundColor: colors.secondary + '10', color: colors.secondary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-1.5">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full transition-all" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.primary + '25', transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)' }} />
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
      <div className="px-5 py-4">
        <h3 className="font-black text-sm mb-3 text-center uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded-full font-bold"
              style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
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
      <div className="px-5 py-4">
        <h3 className="font-black text-sm mb-3 text-center uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Quick Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 4px 15px ${colors.primary}08` }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
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
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Availability')}</h3>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: `0 4px 15px ${colors.primary}08` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-3" style={{ borderBottom: i < 6 ? `1px solid ${colors.primary}08` : 'none', borderLeft: h.is_closed ? 'none' : `4px solid ${colors.secondary}` }}>
              <span className="capitalize text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-semibold" style={{ color: h.is_closed ? colors.text + '50' : colors.secondary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-5 py-4">
      <div className="text-center p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, border: `3px solid ${colors.primary}15`, boxShadow: `0 4px 20px ${colors.primary}08` }}>
        <h3 className="font-black text-sm mb-2 uppercase" style={{ color: colors.primary, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="px-6 rounded-full font-black" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: colors.primary, fontFamily: font }}>{t('Location')}</h3>
        </div>
        {locationData.map_embed_url && <div className="overflow-hidden rounded-xl mb-3" style={{ height: '180px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && <Button size="sm" variant="outline" className="w-full rounded-full font-bold" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }} onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button>}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-5 py-4">
        <div className="text-center p-5 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 4px 15px ${colors.primary}08` }}>
          <h3 className="font-black text-sm mb-2 uppercase" style={{ color: colors.primary, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
      <div className="px-5 py-4">
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center font-black text-sm mb-3 uppercase" style={{ color: colors.primary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, fontFamily: font, color: colors.text }}>
          <StableHtmlContent htmlContent={htmlData.html_content} />
        </div>
      </div>
    );
  };

  // ─── QR Share ──────────────────────────────────────────────

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (
      <div className="px-5 py-4">
        <div className="text-center p-4 rounded-xl" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: `0 4px 15px ${colors.primary}08` }}>
          <h3 className="font-black text-sm mb-2 flex items-center justify-center uppercase" style={{ color: colors.primary, fontFamily: font }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'AA', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }} onClick={() => setShowQrModal(true)}>
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
      <div className="px-5 py-3 text-center">
        {footerData.footer_text && <p className="text-xs italic mb-1" style={{ color: colors.text + '80', fontFamily: font }}>{footerData.footer_text}</p>}
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
        .coach-tpl-salescoach h1,
        .coach-tpl-salescoach h2,
        .coach-tpl-salescoach h3,
        .coach-tpl-salescoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-salescoach rounded-xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px rgba(0,71,255,0.15)`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Bold Closer style */}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.primary}, #001A80)` }}>
        <Button className="w-full h-14 font-black rounded-full text-base uppercase tracking-wide transition-all hover:scale-[1.02]"
          style={{ background: colors.secondary, color: '#fff', fontFamily: font, border: 'none', boxShadow: `0 8px 30px ${colors.secondary}50` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-full font-bold"
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

