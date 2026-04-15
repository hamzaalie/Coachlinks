/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
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

interface CreativityCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

export default function CreativityCoachTemplate({ data, template: _template, businessType }: CreativityCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};

  const resolvedType = businessType || data.business_type || 'creativity-coach';


  // Testimonial carousel state
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [configSections.testimonials?.reviews]);

  // Language selector state
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

  // Artist's Canvas color palette
  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#2D1B69',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#FF6B6B',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#4ECDC4',
    background: configSections.colors?.background || '#FAFAFA',
    text: configSections.colors?.text || '#1A1A2E',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };

  const palette = {
    coral: '#FF6B6B',
    teal: '#4ECDC4',
    gold: '#FFD93D',
    magenta: '#C44569',
    purple: '#2D1B69',
  };

  const rotatingColors = [palette.coral, palette.teal, palette.gold, palette.magenta];
  const getRotColor = (i: number) => rotatingColors[i % rotatingColors.length];

  const _fontPair = getCoachFonts('creativity-coach');
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

  // ─── Header — Paint Splash with Hexagonal Profile ──────────

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ background: palette.purple, minHeight: '260px' }}>
      {/* Paint splatter SVG overlay */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="40" r="35" fill={palette.coral} opacity="0.25" />
        <circle cx="340" cy="60" r="50" fill={palette.teal} opacity="0.2" />
        <circle cx="180" cy="20" r="20" fill={palette.gold} opacity="0.35" />
        <circle cx="300" cy="220" r="40" fill={palette.magenta} opacity="0.18" />
        <circle cx="80" cy="250" r="28" fill={palette.teal} opacity="0.22" />
        <circle cx="370" cy="150" r="18" fill={palette.coral} opacity="0.3" />
        <circle cx="20" cy="140" r="45" fill={palette.gold} opacity="0.15" />
        <circle cx="220" cy="270" r="32" fill={palette.coral} opacity="0.2" />
        <circle cx="130" cy="100" r="14" fill={palette.magenta} opacity="0.28" />
        <circle cx="260" cy="130" r="25" fill={palette.teal} opacity="0.16" />
        <circle cx="100" cy="180" r="10" fill={palette.gold} opacity="0.4" />
        <circle cx="310" cy="30" r="12" fill={palette.magenta} opacity="0.35" />
      </svg>

      {/* Language Selector */}
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(12px)', fontFamily: font }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]">
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}`}>
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
        {/* Hexagonal profile image */}
        <div className="w-32 h-32 mx-auto mb-5 relative" style={{ filter: `drop-shadow(0 8px 24px ${palette.coral}50)` }}>
          <div className="w-full h-full overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                   style={{ background: `linear-gradient(135deg, ${palette.coral}, ${palette.magenta})` }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
          {/* Hex border accent */}
          <div className="absolute inset-[-3px]" style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: `linear-gradient(135deg, ${palette.coral}, ${palette.teal}, ${palette.gold})`,
            zIndex: -1
          }} />
        </div>

        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: headingFont }}>
          {headerData.name || t('Coach Name')}
        </h1>
        <p className="text-sm mb-3" style={{ color: palette.gold, fontFamily: font, fontWeight: 600 }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed italic" style={{ fontFamily: font }}>
            "{headerData.tagline}"
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Colorful Icon Tiles ─────────────────────────

  const renderContactSection = (contactData: any) => (
    <div className="px-6 py-5">
      <div className="grid grid-cols-2 gap-3">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center space-x-2 p-3.5 rounded-2xl transition-all hover:scale-105 hover:shadow-md"
             style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${palette.coral}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Mail className="w-4 h-4" style={{ color: palette.coral }} />
            <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center space-x-2 p-3.5 rounded-2xl transition-all hover:scale-105 hover:shadow-md"
             style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${palette.teal}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Phone className="w-4 h-4" style={{ color: palette.teal }} />
            <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex items-center space-x-2 p-3.5 rounded-2xl transition-all hover:scale-105 hover:shadow-md"
             style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${palette.gold}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Globe className="w-4 h-4" style={{ color: palette.gold }} />
            <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>{t('Website')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center space-x-2 p-3.5 rounded-2xl"
               style={{ backgroundColor: '#FFFFFF', borderLeft: `4px solid ${palette.magenta}`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <MapPin className="w-4 h-4" style={{ color: palette.magenta }} />
            <span className="text-xs font-medium truncate" style={{ color: colors.text, fontFamily: font }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Gallery Exhibition Card ───────────────────────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-6 rounded-2xl relative overflow-hidden" style={{
          backgroundColor: colors.cardBg,
          borderLeft: `5px solid ${palette.teal}`,
          boxShadow: '0 4px 24px rgba(45,27,105,0.08)'
        }}>
          {/* Decorative paint dot */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full opacity-15" style={{ background: palette.coral }} />

          <h3 className="font-bold text-lg mb-3" style={{ color: palette.purple, fontFamily: headingFont }}>
            {t('About')}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>
            {sanitizeText(aboutData.description)}
          </p>

          {aboutData.specializations && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: palette.purple, fontFamily: font }}>{t('Specializations')}:</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-full px-3 py-1 border-0"
                         style={{ background: getRotColor(i) + '20', color: getRotColor(i), fontFamily: font, fontWeight: 600 }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2" style={{ color: palette.purple, fontFamily: font }}>{t('Credentials')}:</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-full px-3 py-1"
                         style={{ borderColor: palette.gold, color: palette.purple, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" style={{ color: palette.gold }} /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-8 mt-4">
            {aboutData.experience && (
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: palette.coral, fontFamily: headingFont }}>{aboutData.experience}+</div>
                <p className="text-xs" style={{ color: colors.text + '88', fontFamily: font }}>{t('Years')}</p>
              </div>
            )}
          </div>

          {aboutData.philosophy && (
            <div className="mt-4 p-4 rounded-xl relative" style={{
              background: `linear-gradient(135deg, ${palette.purple}08, ${palette.teal}08)`,
              borderLeft: `3px solid ${palette.gold}`
            }}>
              <Sparkles className="w-4 h-4 mb-1" style={{ color: palette.gold }} />
              <p className="text-xs italic leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                "{aboutData.philosophy}"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — Masonry 2-Column Grid ──────────────────────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="text-center font-bold text-lg mb-5" style={{ color: palette.purple, fontFamily: headingFont }}>
          <Sparkles className="w-5 h-5 inline mr-2" style={{ color: palette.gold }} />{t('Programs')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="rounded-2xl overflow-hidden transition-all hover:shadow-lg"
                 style={{
                   backgroundColor: colors.cardBg,
                   borderTop: `4px solid ${getRotColor(i)}`,
                   boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                   ...(i % 3 === 0 ? { gridColumn: programs.length === 1 ? 'span 2' : undefined } : {})
                 }}>
              <div className="p-4">
                <h4 className="font-bold text-sm mb-2" style={{ color: colors.text, fontFamily: headingFont }}>{prog.title}</h4>
                {prog.description && (
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{prog.description}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {prog.format && (
                    <Badge className="text-xs rounded-full border-0" style={{ backgroundColor: getRotColor(i) + '18', color: getRotColor(i), fontFamily: font }}>
                      {prog.format.replace(/-/g, ' ')}
                    </Badge>
                  )}
                  {prog.duration && (
                    <Badge className="text-xs rounded-full border-0" style={{ backgroundColor: palette.purple + '12', color: palette.purple, fontFamily: font }}>
                      {prog.duration}
                    </Badge>
                  )}
                </div>
                {prog.price && (
                  <p className="text-sm font-bold mt-2" style={{ color: getRotColor(i), fontFamily: headingFont }}>{prog.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Rainbow Gradient Border + Paintbrush ─

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-6 py-4">
        <div className="rounded-2xl overflow-hidden" style={{
          backgroundColor: colors.cardBg,
          boxShadow: '0 4px 24px rgba(45,27,105,0.1)'
        }}>
          {/* Rainbow gradient top border */}
          <div style={{
            height: '4px',
            background: `linear-gradient(90deg, ${palette.coral}, ${palette.gold}, ${palette.teal}, ${palette.magenta}, ${palette.purple})`
          }} />
          <div className="p-6">
            <div className="text-center mb-5">
              {/* Paintbrush icon */}
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                   style={{ background: `linear-gradient(135deg, ${palette.purple}15, ${palette.coral}15)` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={palette.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
                  <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
                  <path d="M14.5 17.5 4.5 15"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg" style={{ color: palette.purple, fontFamily: headingFont }}>{title}</h3>
              {desc && <p className="text-xs mt-2 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{desc}</p>}
            </div>
            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="space-y-3">
                {pillars.map((pillar: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: colors.background }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                         style={{ background: getRotColor(i), color: 'white' }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: colors.text, fontFamily: headingFont }}>{pillar.name}</p>
                      {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '88', fontFamily: font }}>{pillar.description}</p>}
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

  // ─── Results — Colorful Circular Stat Badges ───────────────

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
        <h3 className="text-center font-bold text-lg mb-5" style={{ color: palette.purple, fontFamily: headingFont }}>
          <BarChart3 className="w-5 h-5 inline mr-2" style={{ color: palette.teal }} />{t('Results')}
        </h3>

        {stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-5">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center w-20 h-20 rounded-full text-center"
                   style={{ backgroundColor: getRotColor(i) + '18', border: `2px solid ${getRotColor(i)}40` }}>
                <p className="text-sm font-bold leading-tight" style={{ color: getRotColor(i), fontFamily: headingFont }}>{stat.value}</p>
                <p className="text-[9px] leading-tight mt-0.5 px-1" style={{ color: colors.text + '88', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded-2xl" style={{
                backgroundColor: colors.cardBg,
                borderLeft: `4px solid ${getRotColor(i)}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
              }}>
                <p className="text-sm font-bold mb-1" style={{ color: colors.text, fontFamily: headingFont }}>
                  {cs.client_name || cs.company || cs.family_name}
                </p>
                {(cs.challenge || cs.starting_point) && (
                  <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: font }}>
                    <span className="font-semibold" style={{ color: palette.coral }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}
                  </p>
                )}
                {cs.result && (
                  <p className="text-xs" style={{ color: palette.teal, fontFamily: font }}>
                    <span className="font-semibold">{t('Result')}:</span> {cs.result}
                  </p>
                )}
                {cs.revenue_impact && (
                  <p className="text-xs font-bold mt-1" style={{ color: palette.gold, fontFamily: font }}>{cs.revenue_impact}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations — Creative Before/After Cards ─────────

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-lg mb-5 text-center" style={{ color: palette.purple, fontFamily: headingFont }}>
          <Zap className="w-5 h-5 inline mr-2" style={{ color: palette.gold }} />{t('Transformations')}
        </h3>
        <div className="space-y-4">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{
              backgroundColor: colors.cardBg,
              borderTop: `4px solid ${getRotColor(i)}`,
              boxShadow: '0 3px 16px rgba(0,0,0,0.06)'
            }}>
              <div className="p-5">
                <p className="text-sm font-bold mb-3" style={{ color: palette.purple, fontFamily: headingFont }}>
                  {story.client_name || `Client ${i + 1}`}
                </p>

                {(story.before_image || story.after_image) && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {story.before_image && (
                      <div className="relative rounded-xl overflow-hidden aspect-square">
                        <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full" style={{ background: palette.coral, color: 'white' }}>{t('Before')}</span>
                      </div>
                    )}
                    {story.after_image && (
                      <div className="relative rounded-xl overflow-hidden aspect-square">
                        <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-full" style={{ background: palette.teal, color: 'white' }}>{t('After')}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {story.before_state && (
                    <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: palette.coral + '10', borderLeft: `3px solid ${palette.coral}` }}>
                      <span className="font-semibold" style={{ color: palette.coral }}>{t('Before')}:</span>
                      <span style={{ color: colors.text }}> {story.before_state}</span>
                    </div>
                  )}
                  {story.after_state && (
                    <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: palette.teal + '10', borderLeft: `3px solid ${palette.teal}` }}>
                      <span className="font-semibold" style={{ color: palette.teal }}>{t('After')}:</span>
                      <span style={{ color: colors.text }}> {story.after_state}</span>
                    </div>
                  )}
                  {story.testimonial && (
                    <p className="text-xs italic pt-1" style={{ color: colors.text + 'AA', fontFamily: font }}>"{story.testimonial}"</p>
                  )}
                  {story.timeframe && (
                    <Badge className="text-xs rounded-full border-0" style={{ backgroundColor: palette.gold + '20', color: palette.purple, fontFamily: font }}>{story.timeframe}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Coral-to-Teal Gradient Card ─────────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="p-6 rounded-2xl text-center relative overflow-hidden" style={{
          background: `linear-gradient(135deg, ${palette.coral}, ${palette.teal})`,
        }}>
          {/* Decorative circles */}
          <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full opacity-15" style={{ background: 'white' }} />
          <div className="absolute bottom-[-15px] left-[-15px] w-20 h-20 rounded-full opacity-10" style={{ background: 'white' }} />

          <Gift className="w-10 h-10 mx-auto mb-3 text-white" />
          <h3 className="font-bold text-lg mb-2 text-white" style={{ fontFamily: headingFont }}>
            {magnetData.magnet_title}
          </h3>
          {magnetData.magnet_description && (
            <p className="text-xs mb-4 leading-relaxed text-white/85" style={{ fontFamily: font }}>
              {magnetData.magnet_description}
            </p>
          )}
          {magnetData.magnet_image && (
            <div className="w-28 h-28 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg border-2 border-white/30">
              <img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" />
            </div>
          )}
          {magnetData.magnet_url ? (
            <Button className="rounded-full px-8 py-2 font-semibold transition-all hover:scale-105"
              style={{ background: 'white', color: palette.purple, fontFamily: font, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              onClick={() => typeof window !== 'undefined' && window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer')}>
              <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
            </Button>
          ) : (
            <Button className="rounded-full px-8 py-2 font-semibold transition-all hover:scale-105"
              style={{ background: 'white', color: palette.purple, fontFamily: font, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
              <Download className="w-4 h-4 mr-2" /> {t('Claim Your Free Gift')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  // ─── Booking — Creative Session Card ───────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-6 rounded-2xl relative overflow-hidden" style={{
        backgroundColor: colors.cardBg,
        borderLeft: `5px solid ${palette.gold}`,
        boxShadow: '0 4px 20px rgba(45,27,105,0.08)'
      }}>
        <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${palette.gold}20, ${palette.coral}15)` }}>
          <Calendar className="w-7 h-7" style={{ color: palette.gold }} />
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: palette.purple, fontFamily: headingFont }}>
          {t('Book Your Free Call')}
        </h3>
        {bookingData.call_duration && (
          <p className="text-xs mb-1" style={{ color: colors.text + '99', fontFamily: font }}>{bookingData.call_duration}</p>
        )}
        {bookingData.call_description && (
          <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + 'AA', fontFamily: font }}>{bookingData.call_description}</p>
        )}
        <Button className="rounded-full px-8 font-semibold transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${palette.purple}, ${palette.magenta})`, color: 'white', fontFamily: font, border: 'none', boxShadow: `0 4px 16px ${palette.purple}30` }}
          onClick={() => {
            if (bookingData.booking_url) {
              if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer');
            } else {
              handleAppointmentBooking(configSections.appointments);
            }
          }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Horizontal Scroll with Brush Stroke ────

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="py-4">
        <h3 className="font-bold text-lg mb-4 text-center px-6" style={{ color: palette.purple, fontFamily: headingFont }}>
          <Star className="w-5 h-5 inline mr-2" style={{ color: palette.gold }} />{t('What Clients Say')}
        </h3>
        <div className="relative overflow-hidden px-6">
          <div className="flex transition-transform duration-600" style={{ transform: `translateX(-${currentReview * 100}%)`, transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-5 rounded-2xl relative overflow-hidden" style={{
                  backgroundColor: colors.cardBg,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                  {/* Brush stroke decoration behind quote */}
                  <div className="absolute top-0 left-0 right-0 h-16 opacity-[0.07]" style={{
                    background: `linear-gradient(90deg, ${getRotColor(i)} 0%, ${getRotColor(i)} 30%, transparent 70%, transparent 100%)`,
                    borderRadius: '0 50% 50% 0',
                    transform: 'scaleX(1.2) translateX(-10%)'
                  }} />

                  <div className="relative">
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-4 h-4" fill={s < parseInt(review.rating || 5) ? palette.gold : 'transparent'}
                              style={{ color: s < parseInt(review.rating || 5) ? palette.gold : '#D1D5DB' }} />
                      ))}
                    </div>
                    <p className="text-sm mb-4 italic leading-relaxed" style={{ color: colors.text, fontFamily: font }}>
                      "{review.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      {review.client_photo && (
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${getRotColor(i)}` }}>
                          <img src={review.client_photo} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold" style={{ color: palette.purple, fontFamily: headingFont }}>{review.client_name}</p>
                        {review.client_title && <p className="text-xs" style={{ color: colors.text + '77', fontFamily: font }}>{review.client_title}</p>}
                      </div>
                    </div>
                    {review.result_highlight && (
                      <div className="mt-3 p-2.5 rounded-xl text-xs font-medium" style={{ backgroundColor: palette.teal + '12', color: palette.teal, fontFamily: font }}>
                        <CheckCircle className="w-3.5 h-3.5 inline mr-1.5" /> {review.result_highlight}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrentReview(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all"
                  style={{
                    backgroundColor: i === currentReview % reviews.length ? palette.purple : palette.purple + '25',
                    transform: i === currentReview % reviews.length ? 'scale(1.3)' : 'scale(1)'
                  }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social — Colorful Badge Row ───────────────────────────

  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-base mb-4 text-center" style={{ color: palette.purple, fontFamily: headingFont }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" className="rounded-full px-4 py-1.5 border-0 transition-all hover:scale-110"
              style={{ backgroundColor: getRotColor(i) + '18', color: getRotColor(i), fontFamily: font, fontWeight: 600 }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs capitalize">{link.platform}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links — Colorful Pill Buttons ─────────────────────────

  const linkIconMap: Record<string, string> = {
    link: '🔗', globe: '🌐', calendar: '📅', video: '🎥', music: '🎵',
    shopping: '🛒', document: '📄', download: '⬇️', star: '⭐', heart: '❤️'
  };

  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-base mb-4 text-center" style={{ color: palette.purple, fontFamily: headingFont }}>{t('Quick Links')}</h3>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 p-3.5 rounded-full transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer"
               style={{
                 backgroundColor: getRotColor(i) + '12',
                 border: `2px solid ${getRotColor(i)}30`,
               }}>
              <span className="text-lg flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getRotColor(i) + '20' }}>
                {linkIconMap[item.icon] || '🔗'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>
                  {sanitizeText(item.text) || 'Untitled Link'}
                </p>
                {item.description && (
                  <p className="text-xs truncate mt-0.5" style={{ color: colors.text + '70', fontFamily: font }}>
                    {sanitizeText(item.description)}
                  </p>
                )}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: getRotColor(i) }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours — Color-Striped List ───────────────────

  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-6 py-4">
        <h3 className="font-bold text-base mb-4 text-center" style={{ color: palette.purple, fontFamily: headingFont }}>{t('Availability')}</h3>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-3" style={{
              borderLeft: `4px solid ${h.is_closed ? '#E0E0E0' : getRotColor(i)}`,
              backgroundColor: i % 2 === 0 ? colors.cardBg : colors.background
            }}>
              <span className="capitalize text-xs font-semibold" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-medium" style={{ color: h.is_closed ? colors.text + '50' : palette.purple, fontFamily: font }}>
                {h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-6 py-4">
      <div className="text-center p-6 rounded-2xl" style={{
        background: `linear-gradient(135deg, ${palette.purple}08, ${palette.magenta}06)`,
        border: `2px solid ${palette.purple}18`
      }}>
        <h3 className="font-bold text-base mb-2" style={{ color: palette.purple, fontFamily: headingFont }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded-full px-8 font-semibold transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${palette.magenta}, ${palette.purple})`, color: 'white', fontFamily: font, border: 'none', boxShadow: `0 4px 16px ${palette.magenta}30` }}
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
        <h3 className="font-bold text-base mb-3 flex items-center" style={{ color: palette.purple, fontFamily: headingFont }}>
          <MapPin className="w-5 h-5 mr-2" style={{ color: palette.coral }} /> {t('Location')}
        </h3>
        {locationData.map_embed_url && (
          <div className="rounded-2xl overflow-hidden mb-3" style={{ height: '180px', border: `2px solid ${palette.teal}25` }}>
            <div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" />
          </div>
        )}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded-full transition-all hover:scale-[1.02]"
            style={{ borderColor: palette.teal, color: palette.teal, fontFamily: font, fontWeight: 600 }}
            onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}>
            <MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}
          </Button>
        )}
      </div>
    );
  };

  // ─── Contact Form ──────────────────────────────────────────

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (
      <div className="px-6 py-4">
        <div className="text-center p-6 rounded-2xl" style={{
          backgroundColor: colors.cardBg,
          borderLeft: `5px solid ${palette.magenta}`,
          boxShadow: '0 3px 16px rgba(0,0,0,0.06)'
        }}>
          <h3 className="font-bold text-base mb-2" style={{ color: palette.purple, fontFamily: headingFont }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded-full px-6 font-semibold transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${palette.magenta}, ${palette.coral})`, color: 'white', fontFamily: font, border: 'none' }}
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
        {htmlData.show_title && htmlData.section_title && (
          <h3 className="text-center font-bold text-lg mb-3" style={{ color: palette.purple, fontFamily: headingFont }}>{htmlData.section_title}</h3>
        )}
        <div className="p-5 rounded-2xl" style={{
          backgroundColor: colors.cardBg,
          borderLeft: `4px solid ${palette.teal}`,
          fontFamily: font,
          color: colors.text,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
        }}>
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
        <div className="text-center p-5 rounded-2xl" style={{
          background: `linear-gradient(135deg, ${palette.purple}08, ${palette.teal}06)`,
          border: `2px solid ${palette.purple}15`
        }}>
          <h3 className="font-bold text-base mb-2 flex items-center justify-center" style={{ color: palette.purple, fontFamily: headingFont }}>
            <Share2 className="w-4 h-4 mr-2" style={{ color: palette.teal }} /> {t('Share')}
          </h3>
          {qrData.share_message && <p className="text-xs mb-4" style={{ color: colors.text + 'AA', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded-full font-semibold transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${palette.purple}, ${palette.teal})`, color: 'white', fontFamily: font, border: 'none' }}
            onClick={() => setShowQrModal(true)}>
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
        {footerData.footer_text && (
          <p className="text-xs italic mb-1" style={{ color: colors.text + '70', fontFamily: font }}>{footerData.footer_text}</p>
        )}
        {footerData.copyright_text && (
          <p className="text-xs" style={{ color: colors.text + '50', fontFamily: font }}>{footerData.copyright_text}</p>
        )}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-creativitycoach h1,
        .coach-tpl-creativitycoach h2,
        .coach-tpl-creativitycoach h3,
        .coach-tpl-creativitycoach h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-creativitycoach rounded-3xl overflow-hidden" style={{
      fontFamily: font,
      backgroundColor: colors.background,
      boxShadow: `0 20px 60px ${palette.purple}15`,
      border: `1px solid ${palette.purple}10`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Purple to Coral gradient */}
      <div className="p-6 space-y-3" style={{
        background: `linear-gradient(135deg, ${palette.purple}0A, ${palette.coral}08)`
      }}>
        <Button className="w-full h-14 font-bold rounded-3xl transition-all hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${palette.purple}, ${palette.coral})`,
            color: 'white',
            fontFamily: headingFont,
            fontSize: '15px',
            border: 'none',
            boxShadow: `0 8px 28px ${palette.purple}35`
          }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-3xl transition-all hover:scale-[1.01]"
          style={{ borderColor: palette.purple + '35', color: palette.purple, fontFamily: font, fontWeight: 600 }}
          onClick={() => {
            const contactData = {
              name: data.name || configSections.header?.name || '',
              title: data.title || configSections.header?.title || '',
              email: data.email || configSections.contact?.email || '',
              phone: data.phone || configSections.contact?.phone || '',
              website: data.website || configSections.contact?.website || '',
              location: configSections.contact?.location || ''
            };
            import('@/utils/vcfGenerator').then(module => { module.downloadVCF(contactData); });
          }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>

      {copyrightSection && (
        <div className="px-6 pb-4 pt-1">
          {copyrightSection.text && (
            <p className="text-xs text-center" style={{ color: colors.text + '45', fontFamily: font }}>{copyrightSection.text}</p>
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

