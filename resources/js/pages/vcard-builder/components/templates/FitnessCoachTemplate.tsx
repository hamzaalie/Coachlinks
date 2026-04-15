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
 * FitnessCoachTemplate — ATHLETIC POWER design
 * Bold red slash, hexagonal profile image, yellow energy accents, muscular gym feel.
 */

interface FitnessCoachTemplateProps {
  data: Record<string, any>;
  template: Record<string, any>;
  businessType?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FitnessCoachTemplate({ data, template: _template, businessType }: FitnessCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};
  const resolvedType = businessType || data.business_type || 'fitness-coach';


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
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#E63946',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#111827',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#FFBE0B',
    background: configSections.colors?.background || '#EEF2F7',
    text: configSections.colors?.text || '#111827',
    cardBg: configSections.colors?.cardBg || '#FFFFFF',
  };
  const _fontPair = getCoachFonts('fitness-coach');
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

  // ─── Header — Bold red-to-black 45deg gradient, diagonal red slash, hexagonal profile ───

  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
      {/* Main gradient */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }} />
      {/* Diagonal red slash at bottom */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '60px', background: colors.primary, clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)' }} />
      {/* Energy pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 22px)` }} />

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

      <div className="relative px-6 pt-12 pb-16 flex flex-col items-center text-center">
        {/* Hexagonal profile image */}
        <div className="relative mb-4">
          <div className="w-28 h-28 overflow-hidden" style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: `3px solid ${colors.accent}`,
          }}>
            {headerData.profile_image ? (
              <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-black" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                {(headerData.name || '?').charAt(0)}
              </div>
            )}
          </div>
          {/* Accent ring around hex */}
          <div className="absolute -inset-1.5 -z-10" style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`
          }} />
        </div>

        <h1 className="text-2xl font-black text-white uppercase tracking-wider" style={{ fontFamily: font, letterSpacing: '0.12em' }}>
          {headerData.name || t('Fitness Coach')}
        </h1>
        <p className="text-sm font-bold mt-1 uppercase tracking-widest" style={{ color: colors.accent, fontFamily: font, letterSpacing: '0.1em' }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs text-white/80 mt-2 max-w-xs" style={{ fontFamily: font }}>{headerData.tagline}</p>
        )}
      </div>
    </div>
  );

  // ─── Contact — Bold icon blocks with red left border ───────

  const renderContactSection = (contactData: any) => (
    <div className="px-5 py-4">
      <div className="grid grid-cols-2 gap-2">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 p-3 rounded transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
            <span className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center gap-2 p-3 rounded transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
            <span className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 p-3 rounded transition-all hover:scale-105"
             style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Globe className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
            <span className="text-xs font-bold truncate" style={{ color: colors.text, fontFamily: font }}>{t('Web')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center gap-2 p-3 rounded"
               style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
            <span className="text-xs truncate" style={{ color: colors.text + 'CC', fontFamily: font }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About — Card with left red border accent, tilted feel ────

  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-5 py-4">
        <div className="p-5 rounded" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transform: 'rotate(-0.3deg)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5" style={{ color: colors.accent }} />
            <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>
              {t('About')}
            </h3>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(aboutData.description)}</p>

          {aboutData.specializations && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: colors.primary, fontFamily: font }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs px-2.5 py-0.5 rounded" style={{ background: colors.primary + '15', color: colors.primary, border: `1px solid ${colors.primary}30`, fontFamily: font }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-3">
              <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: colors.accent, fontFamily: font }}>{t('Certifications')}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs px-2.5 py-0.5 rounded" style={{ borderColor: colors.accent, color: colors.accent, fontFamily: font }}>
                    <Award className="w-3 h-3 mr-1" /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.experience && (
            <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: `2px solid ${colors.primary}15` }}>
              <span className="text-4xl font-black" style={{ color: colors.primary, fontFamily: font }}>{aboutData.experience}+</span>
              <span className="text-xs uppercase tracking-wider font-bold" style={{ color: colors.text + 'CC', fontFamily: font }}>{t('Years of Experience')}</span>
            </div>
          )}

          {aboutData.philosophy && (
            <div className="mt-4 p-3 italic text-xs rounded" style={{ background: colors.accent + '10', borderLeft: `4px solid ${colors.accent}`, color: colors.text + 'BB', fontFamily: font }}>
              "{aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs — 2-column grid, each card has yellow top number strip ─────

  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="px-5 py-4">
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: `${colors.primary}14`, border: `1px solid ${colors.primary}30` }}>
              <TrendingUp className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <h3 className="font-black text-base uppercase tracking-wide" style={{ color: colors.secondary, fontFamily: font }}>{t('Programs')}</h3>
          </div>
          <div className="mt-2 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {programs.map((prog: any, i: number) => (
            <div key={i} className="rounded overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 12px rgba(0,0,0,0.06)', borderLeft: `4px solid ${colors.primary}` }}>
              {/* Yellow top number strip */}
              <div className="flex items-center justify-between px-3 py-1.5" style={{ background: colors.accent }}>
                <span className="text-xs font-black text-white">{String(i + 1).padStart(2, '0')}</span>
                {prog.price && <span className="text-xs font-black text-white">{prog.price}</span>}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs mb-1 leading-tight" style={{ color: colors.text, fontFamily: font }}>{prog.title}</h4>
                {prog.description && <p className="text-xs mb-2 leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>{prog.description}</p>}
                <div className="flex flex-wrap items-center gap-1">
                  {prog.format && <Badge className="text-[10px]" style={{ backgroundColor: colors.primary + '12', color: colors.primary, fontFamily: font }}>{prog.format.replace(/-/g, ' ')}</Badge>}
                  {prog.duration && <span className="text-[10px]" style={{ color: colors.text + 'CC', fontFamily: font }}>{prog.duration}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer — Dark card with red accent stripe ────

  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-5 py-4">
        <div className="rounded overflow-hidden" style={{ backgroundColor: colors.secondary, position: 'relative' }}>
          {/* Accent stripe at top */}
          <div style={{ height: '4px', background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }} />
          <div className="p-5 relative">
            <div className="absolute top-4 right-4 opacity-10">
              <Sparkles className="w-16 h-16" style={{ color: colors.accent }} />
            </div>
            <Sparkles className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
            <h3 className="font-black text-base text-white uppercase tracking-wide mb-1" style={{ fontFamily: font }}>{title}</h3>
            {desc && <p className="text-xs text-white/50 mb-4" style={{ fontFamily: font }}>{desc}</p>}
            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="space-y-2">
                {pillars.map((pillar: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="w-7 h-7 flex items-center justify-center rounded-sm flex-shrink-0 text-xs font-black" style={{ backgroundColor: colors.primary, color: '#fff' }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white" style={{ fontFamily: font }}>{pillar.name}</p>
                      {pillar.description && <p className="text-xs text-white/70 mt-0.5" style={{ fontFamily: font }}>{pillar.description}</p>}
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

  // ─── Results — Bold red numbers, vigorous feel ─────────────

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
          <BarChart3 className="w-5 h-5" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Results')}</h3>
        </div>
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {stats.slice(0, 6).map((stat, i) => (
              <div key={i} className="text-center p-3 rounded" style={{ backgroundColor: colors.cardBg, borderBottom: `3px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <p className="text-xl font-black" style={{ color: colors.primary, fontFamily: font }}>{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: colors.text + 'CC', fontFamily: font }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}
        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="p-4 rounded" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <p className="text-sm font-black mb-1" style={{ color: colors.text, fontFamily: font }}>{cs.client_name || cs.company || cs.family_name}</p>
                {(cs.challenge || cs.starting_point) && <p className="text-xs mb-1" style={{ color: colors.text + 'CC', fontFamily: font }}><span className="font-bold" style={{ color: colors.primary }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}</p>}
                {cs.result && <p className="text-xs" style={{ color: colors.accent, fontFamily: font }}><span className="font-bold">{t('Result')}:</span> {cs.result}</p>}
                {cs.revenue_impact && <p className="text-xs font-black mt-1" style={{ color: colors.primary, fontFamily: font }}>{cs.revenue_impact}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations — Before/After with bold red divider ──

  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" style={{ color: colors.accent }} />
          <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Transformations')}</h3>
        </div>
        <div className="space-y-3">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="rounded overflow-hidden" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.accent}`, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <div className="p-4">
                <p className="text-sm font-black mb-2 uppercase" style={{ color: colors.text, fontFamily: font }}>{story.client_name || `Client ${i + 1}`}</p>
                {(story.before_image || story.after_image) && (
                  <div className="grid grid-cols-2 gap-1 mb-3 rounded overflow-hidden">
                    {story.before_image && (
                      <div className="relative overflow-hidden aspect-square">
                        <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-sm">{t('Before')}</span>
                      </div>
                    )}
                    {story.after_image && (
                      <div className="relative overflow-hidden aspect-square">
                        <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 text-[10px] font-black text-white px-2 py-0.5 rounded-sm" style={{ background: colors.accent }}>{t('After')}</span>
                      </div>
                    )}
                  </div>
                )}
                {story.before_state && <div className="p-2 text-xs mb-1 rounded-sm" style={{ backgroundColor: colors.primary + '08' }}><span className="font-bold" style={{ color: colors.primary }}>{t('Before')}:</span> <span style={{ color: colors.text }}>{story.before_state}</span></div>}
                {story.after_state && <div className="p-2 text-xs mb-1 rounded-sm" style={{ backgroundColor: colors.accent + '10' }}><span className="font-bold" style={{ color: colors.accent }}>{t('After')}:</span> <span style={{ color: colors.text }}>{story.after_state}</span></div>}
                {story.testimonial && <p className="text-xs italic mt-2" style={{ color: colors.text + 'CC', fontFamily: font }}>"{story.testimonial}"</p>}
                {story.timeframe && <Badge className="text-xs mt-2 rounded-sm" style={{ backgroundColor: colors.primary + '15', color: colors.primary, fontFamily: font }}>{story.timeframe}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet — Bold red CTA with energy vibe ───────────

  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-5 py-4">
        <div className="rounded overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, position: 'relative' }}>
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10" style={{ background: `radial-gradient(circle, ${colors.accent}, transparent)` }} />
          <div className="p-5 relative">
            <Gift className="w-7 h-7 mb-3" style={{ color: colors.accent }} />
            <h3 className="font-black text-base text-white uppercase tracking-wide mb-2" style={{ fontFamily: font }}>{magnetData.magnet_title}</h3>
            {magnetData.magnet_description && <p className="text-xs text-white/80 mb-4 leading-relaxed" style={{ fontFamily: font }}>{magnetData.magnet_description}</p>}
            {magnetData.magnet_image && <div className="w-28 h-28 mb-4 overflow-hidden rounded shadow-lg"><img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" /></div>}
            <Button className="rounded font-bold" style={{ background: colors.accent, color: '#111827', fontFamily: font, border: 'none' }}
              onClick={() => { if (magnetData.magnet_url) { if (typeof window !== 'undefined') window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer'); } else { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('openContactModal')); } }}>
              <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Booking — Yellow accent CTA card ──────────────────────

  const renderBookingSection = (bookingData: any) => (
    <div className="px-5 py-4">
      <div className="text-center p-5 rounded" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}25`, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Calendar className="w-7 h-7 mx-auto mb-2" style={{ color: colors.primary }} />
        <h3 className="font-black text-sm mb-1 uppercase tracking-wider" style={{ color: colors.secondary, fontFamily: font }}>{t('Book Your Free Call')}</h3>
        {bookingData.call_duration && <p className="text-xs mb-1 font-bold" style={{ color: colors.primary, fontFamily: font }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-3 leading-relaxed" style={{ color: colors.text + 'CC', fontFamily: font }}>{bookingData.call_description}</p>}
        <Button className="rounded font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
          onClick={() => { if (bookingData.booking_url) { if (typeof window !== 'undefined') window.open(bookingData.booking_url, '_blank', 'noopener,noreferrer'); } else { handleAppointmentBooking(configSections.appointments); } }}>
          <Calendar className="w-4 h-4 mr-2" /> {t('Schedule Now')}
        </Button>
      </div>
    </div>
  );

  // ─── Testimonials — Red quote marks, bold border carousel ──

  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5" style={{ color: colors.accent }} />
          <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Client Testimonials')}</h3>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="p-4 rounded relative" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}20`, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                  {/* Big red quote mark */}
                  <div className="absolute top-2 right-3 text-5xl font-black leading-none opacity-10" style={{ color: colors.primary }}>"</div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5" fill={s < parseInt(review.rating || 5) ? colors.accent : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.accent : '#D1D5DB' }} />
                    ))}
                  </div>
                  <p className="text-xs mb-3 italic leading-relaxed relative z-10" style={{ color: colors.text, fontFamily: font }}>"{review.review}"</p>
                  <div className="flex items-center gap-2">
                    {review.client_photo && <img src={review.client_photo} alt="" className="w-8 h-8 rounded-full object-cover" style={{ border: `2px solid ${colors.primary}` }} />}
                    <div>
                      <p className="text-xs font-black" style={{ color: colors.secondary, fontFamily: font }}>{review.client_name}</p>
                      {review.client_title && <p className="text-[10px]" style={{ color: colors.text + '88', fontFamily: font }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && <div className="mt-2 p-2 text-xs rounded-sm" style={{ backgroundColor: colors.primary + '10', color: colors.primary, fontFamily: font }}><CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}</div>}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center mt-3 space-x-1.5">
              {reviews.map((_: any, i: number) => (
                <div key={i} className="w-2.5 h-2.5 rounded-sm transition-colors" style={{ backgroundColor: i === currentReview % reviews.length ? colors.primary : colors.secondary + '30' }} />
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
        <h3 className="font-black text-sm mb-3 text-center uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link: any, i: number) => (
            <Button key={i} size="sm" variant="outline" className="rounded font-bold"
              style={{ borderColor: colors.primary + '40', color: colors.primary, fontFamily: font }}
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
        <h3 className="font-black text-sm mb-3 text-center uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Quick Links')}</h3>
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded transition-all hover:scale-[1.02] cursor-pointer"
              style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <span className="text-lg flex-shrink-0">{linkIconMap[item.icon] || '🔗'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: colors.text, fontFamily: font }}>{sanitizeText(item.text) || 'Untitled Link'}</p>
                {item.description && <p className="text-xs truncate mt-0.5" style={{ color: colors.text + 'CC', fontFamily: font }}>{sanitizeText(item.description)}</p>}
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
          <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Availability')}</h3>
        </div>
        <div className="rounded overflow-hidden" style={{ border: `1px solid ${colors.primary}15` }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between p-2.5" style={{
              backgroundColor: i % 2 === 0 ? colors.cardBg : colors.background,
              borderLeft: h.is_closed ? '3px solid transparent' : `3px solid ${colors.primary}`,
            }}>
              <span className="capitalize text-xs font-bold" style={{ color: colors.text, fontFamily: font }}>{h.day}</span>
              <span className="text-xs font-bold" style={{ color: h.is_closed ? colors.text + '80' : colors.primary, fontFamily: font }}>{h.is_closed ? t('Closed') : `${h.open_time} - ${h.close_time}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Appointments ──────────────────────────────────────────

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-5 py-4">
      <div className="text-center p-5 rounded" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.accent}30`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 className="font-black text-sm mb-2 uppercase tracking-wider" style={{ color: colors.secondary, fontFamily: font }}>{t('Book a Session')}</h3>
        {apptData?.consultation_info && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{apptData.consultation_info}</p>}
        <Button size="sm" className="rounded font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
          <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
          <h3 className="font-black text-sm uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{t('Location')}</h3>
        </div>
        {locationData.map_embed_url && <div className="overflow-hidden rounded mb-3" style={{ height: '180px' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>}
        {locationData.directions_url && (
          <Button size="sm" variant="outline" className="w-full rounded font-bold" style={{ borderColor: colors.primary, color: colors.primary, fontFamily: font }}
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
      <div className="px-5 py-4">
        <div className="text-center p-5 rounded" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 className="font-black text-sm mb-2 uppercase tracking-wider" style={{ color: colors.secondary, fontFamily: font }}>{formData.form_title}</h3>
          {formData.form_subtitle && <p className="text-xs mb-3" style={{ color: colors.text, fontFamily: font }}>{formData.form_subtitle}</p>}
          <Button size="sm" className="rounded font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }}
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
        {htmlData.show_title && htmlData.section_title && <h3 className="text-center font-black text-sm mb-3 uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}>{htmlData.section_title}</h3>}
        <div className="p-4 rounded" style={{ backgroundColor: colors.cardBg, borderLeft: `4px solid ${colors.primary}`, fontFamily: font, color: colors.text }}>
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
        <div className="text-center p-4 rounded" style={{ backgroundColor: colors.cardBg, border: `2px solid ${colors.primary}15` }}>
          <h3 className="font-black text-sm mb-2 flex items-center justify-center uppercase tracking-widest" style={{ color: colors.secondary, fontFamily: font }}><Share2 className="w-4 h-4 mr-2" /> {t('Share')}</h3>
          {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + 'CC', fontFamily: font }}>{qrData.share_message}</p>}
          <Button className="w-full rounded font-bold" style={{ background: colors.primary, color: '#fff', fontFamily: font, border: 'none' }} onClick={() => setShowQrModal(true)}>
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
        {footerData.footer_text && <p className="text-xs font-bold mb-1" style={{ color: colors.text + '80', fontFamily: font }}>{footerData.footer_text}</p>}
        {footerData.copyright_text && <p className="text-[10px] uppercase tracking-wider" style={{ color: colors.text + '50', fontFamily: font }}>{footerData.copyright_text}</p>}
      </div>
    );
  };

  // ─── Main Render ───────────────────────────────────────────

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <>
      <style>{`
        .coach-tpl-fitnesscoaching h1,
        .coach-tpl-fitnesscoaching h2,
        .coach-tpl-fitnesscoaching h3,
        .coach-tpl-fitnesscoaching h4 { font-family: ${headingFont} !important; }
      `}</style>
      <div className="w-full max-w-md mx-auto coach-tpl-fitnesscoaching rounded-2xl overflow-hidden" style={{
      fontFamily: font,
      background: `linear-gradient(180deg, ${colors.background} 0%, #E5ECF5 100%)`,
      boxShadow: `0 20px 60px rgba(17,24,39,0.16), 0 0 0 1px ${colors.primary}18`,
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {orderedSectionKeys
        .filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key))
        .map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            {renderSection(sectionKey)}
          </React.Fragment>
        ))}

      {/* CTA Footer — Athletic power style */}
      <div className="p-5 space-y-3" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
        <Button className="w-full h-14 font-black text-base uppercase tracking-wider rounded transition-all hover:scale-[1.02]"
          style={{ background: colors.accent, color: '#111827', fontFamily: font, border: 'none', boxShadow: `0 8px 25px ${colors.accent}40`, letterSpacing: '0.08em' }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Get Started Today')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded font-bold"
          style={{ borderColor: colors.accent + '50', color: colors.accent, fontFamily: font }}
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

