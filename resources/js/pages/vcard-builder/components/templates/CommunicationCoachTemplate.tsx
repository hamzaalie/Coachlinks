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

/** Communication & Influence Coach — "STAGE PRESENCE" theme. Bold podium/mic aesthetics, dramatic spotlight, speaker authority. */
interface CommunicationCoachTemplateProps { data: Record<string, any>; template: Record<string, any>; businessType?: string; }

export default function CommunicationCoachTemplate({ data, template: _template, businessType }: CommunicationCoachTemplateProps) {
  const { t, i18n } = useTranslation();
  const configSections = data.config_sections || {};

  const resolvedType = businessType || data.business_type || 'communication-coach';
  // Load modern Google Fonts
  const _fontPair = getCoachFonts('communication-coach');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { _fontPair.loadFonts(); }, []);
  const [currentReview, setCurrentReview] = React.useState(0);
  React.useEffect(() => {
    const reviews = configSections.testimonials?.reviews || [];
    if (!Array.isArray(reviews) || reviews.length <= 1) return;
    const iv = setInterval(() => setCurrentReview(prev => (prev + 1) % reviews.length), 5500);
    return () => clearInterval(iv);
  }, [configSections.testimonials?.reviews]);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState(configSections.language?.template_language || 'en');
  const [showQrModal, setShowQrModal] = React.useState(false);
  const isRTL = ['ar', 'he'].includes(currentLanguage);
  const changeLanguage = (langCode: string) => { setCurrentLanguage(langCode); setShowLanguageSelector(false); i18n.changeLanguage(langCode); };
  const templateDef = getBusinessTemplate(resolvedType);
  const templateTheme = (templateDef as any)?.theme || {};

  const colors = {
    primary: configSections.colors?.primary || templateTheme.primaryColor || '#1A1A2E',
    secondary: configSections.colors?.secondary || templateTheme.secondaryColor || '#16213E',
    accent: configSections.colors?.accent || templateTheme.accentColor || '#FCA311',
    background: configSections.colors?.background || '#0F1318',
    text: configSections.colors?.text || '#E8E8E8',
    cardBg: configSections.colors?.cardBg || '#1E2334',
  };
  const headingFont = _fontPair.heading;
  const sansFont = configSections.font || _fontPair.body;
  const allSections = templateDef?.sections || [];

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

  // ─── Header ──────────────────────────────────────────────
  const renderHeaderSection = (headerData: any) => (
    <div className="relative overflow-hidden" style={{
      background: `linear-gradient(170deg, ${colors.primary} 0%, ${colors.secondary} 55%, #0D1520 100%)`,
      minHeight: '290px',
      borderRadius: '24px 24px 0 0',
    }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 55%, ${colors.accent}26 0%, transparent 60%)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, top: '30%' }} />
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, top: '70%' }} />
      </div>
      {configSections.language && (
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
          <div className="relative">
            <button onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.08)', color: colors.accent, backdropFilter: 'blur(12px)', border: `1px solid ${colors.accent}30`, fontFamily: sansFont }}>
              <Globe className="w-3 h-3" />
              <span>{languageData.find(lang => lang.code === currentLanguage)?.name || 'EN'}</span>
            </button>
            {showLanguageSelector && (
              <div className="absolute top-full right-0 mt-1 rounded-lg shadow-xl border py-1 min-w-[140px] max-h-48 overflow-y-auto z-[99999]"
                style={{ backgroundColor: colors.cardBg, borderColor: colors.accent + '30' }}>
                {languageData.map((lang) => (
                  <button key={lang.code} onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center space-x-2 transition-colors ${currentLanguage === lang.code ? '' : ''}`}
                    style={{ color: currentLanguage === lang.code ? colors.accent : colors.text, backgroundColor: currentLanguage === lang.code ? colors.accent + '15' : 'transparent' }}>
                    <span className="text-sm">{String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative px-8 pt-14 pb-10 text-center">
        <div className="mx-auto mb-5 overflow-hidden"
          style={{
            width: '124px', height: '124px', borderRadius: '4px',
            border: `3px solid ${colors.accent}`,
            boxShadow: `0 0 40px ${colors.accent}30, 0 8px 32px rgba(0,0,0,0.5)`,
          }}>
          {headerData.profile_image ? (
            <img src={headerData.profile_image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: colors.accent, fontFamily: headingFont }}>
              {(headerData.name || '?').charAt(0)}
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white mb-1.5 uppercase" style={{ fontFamily: headingFont, letterSpacing: '0.12em' }}>
          {headerData.name || t('Coach Name')}
        </h1>
        <p className="text-sm mb-3" style={{ color: colors.accent, fontFamily: sansFont, letterSpacing: '0.05em' }}>
          {headerData.title || ''}
        </p>
        {headerData.tagline && (
          <p className="text-xs max-w-[280px] mx-auto leading-relaxed" style={{ color: colors.text + '80', fontFamily: sansFont }}>
            {headerData.tagline}
          </p>
        )}
      </div>
    </div>
  );

  // ─── Contact ─────────────────────────────────────────────
  const renderContactSection = (contactData: any) => (
    <div className="px-7 py-5">
      <div className="flex flex-wrap justify-center gap-2.5">
        {contactData.email && (
          <a href={`mailto:${contactData.email}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-md transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
            <Mail className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: sansFont }}>{t('Email')}</span>
          </a>
        )}
        {contactData.phone && (
          <a href={`tel:${contactData.phone}`} className="flex items-center space-x-2 px-4 py-2.5 rounded-md transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
            <Phone className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: sansFont }}>{t('Call')}</span>
          </a>
        )}
        {contactData.website && (
          <a href={sanitizeUrl(contactData.website)} target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-md transition-all hover:scale-105"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
            <Globe className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs font-medium" style={{ color: colors.text, fontFamily: sansFont }}>{t('Website')}</span>
          </a>
        )}
        {contactData.location && (
          <div className="flex items-center space-x-2 px-4 py-2.5 rounded-md"
            style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
            <MapPin className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>{contactData.location}</span>
          </div>
        )}
      </div>
    </div>
  );

  // ─── About ───────────────────────────────────────────────
  const renderAboutSection = (aboutData: any) => {
    if (!aboutData.description) return null;
    return (
      <div className="px-7 py-5">
        <div className="relative p-6 rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
          <h3 className="text-sm font-bold mb-3 uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>
            {t('About')}
          </h3>
          <p className="text-sm leading-[1.8] mb-4" style={{ color: colors.text, fontFamily: sansFont }}>
            {sanitizeText(aboutData.description)}
          </p>

          {aboutData.specializations && (
            <div className="mb-4">
              <p className="text-xs font-bold mb-2 uppercase" style={{ color: colors.accent + 'CC', fontFamily: headingFont, letterSpacing: '0.08em' }}>{t('Specializations')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.specializations) ? aboutData.specializations : String(aboutData.specializations || '').split(',').filter(Boolean)).map((spec: string, i: number) => (
                  <Badge key={i} className="text-xs rounded-sm px-3 py-1 border-0"
                    style={{ background: colors.accent + '18', color: colors.accent, fontFamily: sansFont }}>
                    {spec.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aboutData.certifications_list && (
            <div className="mb-4">
              <p className="text-xs font-bold mb-2 uppercase" style={{ color: colors.accent + 'CC', fontFamily: headingFont, letterSpacing: '0.08em' }}>{t('Credentials')}</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(aboutData.certifications_list) ? aboutData.certifications_list : String(aboutData.certifications_list || '').split(',').filter(Boolean)).map((cert: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs rounded-sm px-3 py-1"
                    style={{ borderColor: colors.accent + '50', color: colors.text, fontFamily: sansFont }}>
                    <Award className="w-3 h-3 mr-1" style={{ color: colors.accent }} /> {cert.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-8 mt-5">
            {aboutData.experience && (
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: colors.accent, fontFamily: headingFont }}>{aboutData.experience}+</div>
                <p className="text-xs mt-0.5 uppercase" style={{ color: colors.text + '70', fontFamily: sansFont, letterSpacing: '0.05em' }}>{t('Years')}</p>
              </div>
            )}
          </div>

          {aboutData.philosophy && (
            <div className="mt-5 p-4 rounded-lg text-sm leading-relaxed text-center" style={{ backgroundColor: colors.background, color: colors.text + 'CC', fontFamily: sansFont, borderLeft: `3px solid ${colors.accent}` }}>
              "{aboutData.philosophy}"
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Programs ─────────────────────────────────────────────
  const renderProgramsSection = (programsData: any) => {
    const programs = programsData.program_list || [];
    if (!Array.isArray(programs) || programs.length === 0) return null;
    return (
      <div className="py-5">
        <h3 className="text-center text-sm font-bold mb-5 uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>
          {t('Programs')}
        </h3>
        <div className="flex gap-4 overflow-x-auto px-7 pb-3" style={{ scrollbarWidth: 'none' }}>
          {programs.map((prog: any, i: number) => (
            <div key={i} className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{
              width: '230px', backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <div className="absolute top-3 left-3 w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="p-5 pt-12">
                <h4 className="font-bold text-sm mb-2 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.05em' }}>{prog.title}</h4>
                {prog.description && <p className="text-xs leading-relaxed mb-3" style={{ color: colors.text + '99', fontFamily: sansFont }}>{prog.description}</p>}
                <div className="flex items-center justify-between">
                  {prog.duration && <span className="text-[11px]" style={{ color: colors.text + '60', fontFamily: sansFont }}>{prog.duration}</span>}
                  {prog.price && <span className="text-xs font-bold" style={{ color: colors.accent, fontFamily: headingFont }}>{prog.price}</span>}
                </div>
                {prog.format && (
                  <Badge className="text-[10px] rounded-sm border-0 mt-2" style={{ background: colors.accent + '18', color: colors.accent, fontFamily: sansFont }}>
                    {prog.format.replace(/-/g, ' ')}
                  </Badge>
                )}
              </div>
              <div className="h-[2px]" style={{ background: colors.accent }} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Signature Offer ──────────────────────────────────────
  const renderSignatureOfferSection = (offerData: any) => {
    if (!offerData.framework_name && !offerData.offer_title) return null;
    const title = offerData.framework_name || offerData.offer_title;
    const desc = offerData.framework_description || offerData.offer_description;
    const pillars = offerData.pillars || [];
    return (
      <div className="px-7 py-5">
        <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ background: colors.accent }} />
          <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}15 0%, transparent 70%)` }} />
          <div className="p-6 pl-7 relative">
            <Sparkles className="w-5 h-5 mb-3" style={{ color: colors.accent }} />
            <h3 className="text-lg font-bold mb-2 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.1em' }}>{title}</h3>
            {desc && <p className="text-xs leading-relaxed mb-5" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>{desc}</p>}
          </div>
          {Array.isArray(pillars) && pillars.length > 0 && (
            <div className="px-6 pl-7 pb-6 space-y-2.5">
              {pillars.map((pillar: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-md" style={{ backgroundColor: colors.background }}>
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: colors.text, fontFamily: headingFont }}>{pillar.name}</p>
                    {pillar.description && <p className="text-xs mt-0.5" style={{ color: colors.text + '80', fontFamily: sansFont }}>{pillar.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Results ──────────────────────────────────────────────
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
      <div className="px-7 py-5">
        <h3 className="text-center text-sm font-bold mb-5 uppercase flex items-center justify-center gap-2" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>
          <BarChart3 className="w-4 h-4" /> {t('Results')}
        </h3>

        {stats.length > 0 && (
          <div className="flex items-center justify-center mb-6 p-5 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            {stats.slice(0, 4).map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-[1px] h-12 mx-4 flex-shrink-0" style={{ backgroundColor: colors.accent + '40' }} />}
                <div className="text-center flex-1">
                  <div className="text-xl font-bold" style={{ color: colors.accent, fontFamily: headingFont }}>{stat.value}</div>
                  <p className="text-[10px] mt-1 uppercase" style={{ color: colors.text + '70', fontFamily: sansFont, letterSpacing: '0.05em' }}>{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

        {Array.isArray(caseStudies) && caseStudies.length > 0 && (
          <div className="space-y-3">
            {caseStudies.slice(0, 3).map((cs: any, i: number) => (
              <div key={i} className="relative p-5 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
                <p className="text-sm font-bold mb-1.5 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.05em' }}>
                  {cs.client_name || cs.company || cs.family_name}
                </p>
                {(cs.challenge || cs.starting_point) && (
                  <p className="text-xs mb-1" style={{ color: colors.text + 'AA', fontFamily: sansFont }}>
                    <span className="font-semibold" style={{ color: colors.accent }}>{t('Before')}:</span> {cs.challenge || cs.starting_point}
                  </p>
                )}
                {cs.result && (
                  <p className="text-xs" style={{ color: colors.text, fontFamily: sansFont }}>
                    <span className="font-semibold" style={{ color: colors.accent }}>{t('Result')}:</span> {cs.result}
                  </p>
                )}
                {cs.revenue_impact && (
                  <p className="text-xs font-bold mt-1.5" style={{ color: colors.accent, fontFamily: headingFont }}>{cs.revenue_impact}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── Transformations ──────────────────────────────────────
  const renderTransformationsSection = (transformData: any) => {
    const stories = transformData.stories || transformData.success_stories || [];
    if (!Array.isArray(stories) || stories.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-5 text-center uppercase flex items-center justify-center gap-2" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>
          <Zap className="w-4 h-4" /> {t('Transformations')}
        </h3>
        <div className="space-y-4">
          {stories.slice(0, 3).map((story: any, i: number) => (
            <div key={i} className="relative p-5 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
              <p className="text-sm font-bold mb-3 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.05em' }}>
                {story.client_name || `${t('Client')} ${i + 1}`}
              </p>

              {(story.before_image || story.after_image) && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {story.before_image && (
                    <div className="relative rounded-md overflow-hidden aspect-square">
                      <img src={story.before_image} alt="Before" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-sm">{t('Before')}</span>
                    </div>
                  )}
                  {story.after_image && (
                    <div className="relative rounded-md overflow-hidden aspect-square">
                      <img src={story.after_image} alt="After" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 text-[10px] px-2 py-0.5 rounded-sm" style={{ backgroundColor: colors.accent, color: colors.primary }}>{t('After')}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                {story.before_state && (
                  <div className="p-3 rounded-md text-xs" style={{ backgroundColor: colors.background }}>
                    <span className="font-semibold uppercase text-[10px]" style={{ color: colors.text + '60', letterSpacing: '0.05em' }}>{t('Before')}:</span>{' '}
                    <span style={{ color: colors.text + 'CC' }}>{story.before_state}</span>
                  </div>
                )}
                {story.after_state && (
                  <div className="p-3 rounded-md text-xs" style={{ backgroundColor: colors.accent + '12' }}>
                    <span className="font-semibold uppercase text-[10px]" style={{ color: colors.accent, letterSpacing: '0.05em' }}>{t('After')}:</span>{' '}
                    <span style={{ color: colors.text }}>{story.after_state}</span>
                  </div>
                )}
                {story.testimonial && (
                  <p className="text-xs italic leading-relaxed pt-1" style={{ color: colors.text + '99', fontFamily: sansFont }}>"{story.testimonial}"</p>
                )}
                {story.timeframe && (
                  <Badge className="text-[10px] rounded-sm border-0 mt-1" style={{ background: colors.accent + '18', color: colors.accent, fontFamily: sansFont }}>{story.timeframe}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Lead Magnet ──────────────────────────────────────────
  const renderLeadMagnetSection = (magnetData: any) => {
    if (!magnetData.magnet_title) return null;
    return (
      <div className="px-7 py-5">
        <div className="p-6 rounded-lg text-center" style={{
          background: `linear-gradient(135deg, ${colors.accent}, #E8970A)`,
          boxShadow: `0 8px 32px ${colors.accent}30`,
        }}>
          <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.15)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
          </div>
          <h3 className="text-base font-bold mb-2 uppercase" style={{ color: colors.primary, fontFamily: headingFont, letterSpacing: '0.08em' }}>
            {magnetData.magnet_title}
          </h3>
          {magnetData.magnet_description && (
            <p className="text-xs mb-5 leading-relaxed" style={{ color: colors.primary + 'CC', fontFamily: sansFont }}>
              {magnetData.magnet_description}
            </p>
          )}
          {magnetData.magnet_image && (
            <div className="w-28 h-28 mx-auto mb-5 rounded-md overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <img src={magnetData.magnet_image} alt="Free Resource" className="w-full h-full object-cover" />
            </div>
          )}
          {magnetData.magnet_url ? (
            <Button className="rounded-md px-7 py-2.5 border-0 font-bold uppercase" style={{
              backgroundColor: colors.primary, color: colors.accent, fontFamily: headingFont, letterSpacing: '0.05em',
            }} onClick={() => typeof window !== 'undefined' && window.open(magnetData.magnet_url, '_blank', 'noopener,noreferrer')}>
              <Download className="w-4 h-4 mr-2" /> {t('Get Free Access')}
            </Button>
          ) : (
            <Button className="rounded-md px-7 py-2.5 border-0 font-bold uppercase" style={{
              backgroundColor: colors.primary, color: colors.accent, fontFamily: headingFont, letterSpacing: '0.05em',
            }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
              <Download className="w-4 h-4 mr-2" /> {t('Claim Your Free Gift')}
            </Button>
          )}
        </div>
      </div>
    );
  };

  // ─── Booking ──────────────────────────────────────────────
  const renderBookingSection = (bookingData: any) => (
    <div className="px-7 py-5">
      <div className="relative text-center p-6 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
        <Calendar className="w-6 h-6 mx-auto mb-3" style={{ color: colors.accent }} />
        <h3 className="font-bold text-base mb-1 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.1em' }}>
          {t('Book Your Free Call')}
        </h3>
        {bookingData.call_duration && <p className="text-xs mb-1" style={{ color: colors.text + '70', fontFamily: sansFont }}>{bookingData.call_duration}</p>}
        {bookingData.call_description && <p className="text-xs mb-4 leading-relaxed" style={{ color: colors.text + '99', fontFamily: sansFont }}>{bookingData.call_description}</p>}
        <Button className="rounded-md px-7 border-0 font-bold uppercase" style={{
          backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont, letterSpacing: '0.05em',
        }} onClick={() => {
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

  // ─── Testimonials ─────────────────────────────────────────
  const renderTestimonialsSection = (testimonialsData: any) => {
    const reviews = testimonialsData.reviews || [];
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-4 text-center uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>
          {t('What Clients Say')}
        </h3>
        <div className="relative overflow-hidden rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
          <div className="flex transition-all duration-700 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
            {reviews.map((review: any, i: number) => (
              <div key={i} className="w-full flex-shrink-0">
                <div className="p-6 relative">
                  <span className="absolute top-3 left-5 select-none" style={{ fontSize: '48px', color: colors.accent, opacity: 0.3, fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</span>
                  <div className="flex items-center space-x-1 mb-3 pt-6">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4" fill={s < parseInt(review.rating || 5) ? colors.accent : 'transparent'} style={{ color: s < parseInt(review.rating || 5) ? colors.accent : colors.text + '30' }} />
                    ))}
                  </div>
                  <p className="text-sm mb-4 leading-[1.8]" style={{ color: colors.text, fontFamily: sansFont }}>
                    {review.review}
                  </p>
                  <div className="flex items-center gap-3">
                    {review.client_photo && (
                      <img src={review.client_photo} alt="" className="w-9 h-9 rounded-sm object-cover" style={{ border: `2px solid ${colors.accent}50` }} />
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.05em' }}>{review.client_name}</p>
                      {review.client_title && <p className="text-[11px]" style={{ color: colors.text + '70', fontFamily: sansFont }}>{review.client_title}</p>}
                    </div>
                  </div>
                  {review.result_highlight && (
                    <div className="mt-3 p-2.5 rounded-md text-xs" style={{ backgroundColor: colors.accent + '12', color: colors.accent, fontFamily: sansFont }}>
                      <CheckCircle className="w-3 h-3 inline mr-1" /> {review.result_highlight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="flex justify-center pb-4 space-x-2">
              {reviews.map((_: any, i: number) => (
                <button key={i} onClick={() => setCurrentReview(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === currentReview % reviews.length ? colors.accent : colors.text + '25',
                    transform: i === currentReview % reviews.length ? 'scale(1.4)' : 'scale(1)',
                  }} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Social ───────────────────────────────────────────────
  const renderSocialSection = (socialData: any) => {
    const links = socialData.social_links || [];
    if (!Array.isArray(links) || links.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>{t('Connect')}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link: any, i: number) => (
            <button key={i} className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ border: `2px solid ${colors.accent}`, backgroundColor: 'transparent' }}
              onClick={() => link.url && typeof window !== 'undefined' && window.open(link.url, '_blank', 'noopener,noreferrer')}>
              <span className="text-xs font-bold uppercase" style={{ color: colors.accent, fontFamily: headingFont }}>
                {(link.platform || '').substring(0, 2)}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Links ────────────────────────────────────────────────
  const renderLinksSection = (linksData: any) => {
    const items = linksData.link_items || [];
    if (!Array.isArray(items) || items.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>{t('Quick Links')}</h3>
        <div className="space-y-2.5">
          {items.map((item: any, i: number) => (
            <a key={i} href={sanitizeUrl(item.url) || '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-lg transition-all hover:scale-[1.01]"
              style={{ backgroundColor: colors.cardBg, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: colors.accent, fontFamily: sansFont }}>
                  {sanitizeText(item.text) || 'Untitled Link'}
                </p>
                {item.description && (
                  <p className="text-[11px] truncate mt-0.5" style={{ color: colors.text + '60', fontFamily: sansFont }}>{sanitizeText(item.description)}</p>
                )}
              </div>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    );
  };

  // ─── Business Hours ───────────────────────────────────────
  const renderBusinessHoursSection = (hoursData: any) => {
    const hours = hoursData.hours || [];
    if (!Array.isArray(hours) || hours.length === 0) return null;
    return (
      <div className="px-7 py-5">
        <h3 className="text-sm font-bold mb-3 text-center uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>{t('Availability')}</h3>
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          {hours.slice(0, 7).map((h: any, i: number) => (
            <div key={i} className="flex justify-between px-5 py-2.5" style={{ borderBottom: i < hours.length - 1 ? `1px solid ${colors.background}` : 'none' }}>
              <span className="capitalize text-xs font-medium" style={{ color: colors.text, fontFamily: sansFont }}>{h.day}</span>
              <span className="text-xs font-medium" style={{ color: h.is_closed ? colors.text + '40' : colors.accent, fontFamily: sansFont }}>
                {h.is_closed ? t('Closed') : `${h.open_time} – ${h.close_time}`}
              </span>
            </div>
          ))}
          <div className="h-[2px]" style={{ background: colors.accent }} />
        </div>
      </div>
    );
  };

  const renderAppointmentsSection = (apptData: any) => (
    <div className="px-7 py-5"><div className="relative text-center p-6 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
      <h3 className="font-bold text-base mb-2 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.1em' }}>{t('Book a Session')}</h3>
      {apptData?.consultation_info && <p className="text-xs mb-4" style={{ color: colors.text + '99', fontFamily: sansFont }}>{apptData.consultation_info}</p>}
      <Button size="sm" className="rounded-md px-7 border-0 font-bold uppercase" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont, letterSpacing: '0.05em' }} onClick={() => handleAppointmentBooking(configSections.appointments)}>
        <Calendar className="w-4 h-4 mr-2" /> {t('Book Now')}
      </Button>
    </div></div>
  );

  const renderLocationSection = (locationData: any) => {
    if (!locationData.map_embed_url && !locationData.directions_url) return null;
    return (<div className="px-7 py-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2 uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}><MapPin className="w-4 h-4" /> {t('Location')}</h3>
      {locationData.map_embed_url && (<div className="rounded-lg overflow-hidden mb-3" style={{ height: '180px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}><div dangerouslySetInnerHTML={{ __html: locationData.map_embed_url }} className="w-full h-full" /></div>)}
      {locationData.directions_url && (<Button size="sm" variant="outline" className="w-full rounded-md font-bold uppercase" style={{ borderColor: colors.accent + '50', color: colors.accent, fontFamily: headingFont, letterSpacing: '0.05em' }} onClick={() => typeof window !== 'undefined' && window.open(locationData.directions_url, '_blank', 'noopener,noreferrer')}><MapPin className="w-4 h-4 mr-2" /> {t('Get Directions')}</Button>)}
    </div>);
  };

  const renderContactFormSection = (formData: any) => {
    if (!formData.form_title) return null;
    return (<div className="px-7 py-5"><div className="relative text-center p-6 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
      <h3 className="font-bold text-base mb-2 uppercase" style={{ color: colors.text, fontFamily: headingFont, letterSpacing: '0.1em' }}>{formData.form_title}</h3>
      {formData.form_subtitle && <p className="text-xs mb-4" style={{ color: colors.text + '99', fontFamily: sansFont }}>{formData.form_subtitle}</p>}
      <Button size="sm" className="rounded-md px-6 border-0 font-bold uppercase" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont, letterSpacing: '0.05em' }} onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
        <Mail className="w-4 h-4 mr-2" /> {t('Send Message')}
      </Button>
    </div></div>);
  };

  const renderCustomHtmlSection = (htmlData: any) => {
    if (!htmlData.html_content) return null;
    return (<div className="px-7 py-5">
      {htmlData.show_title && htmlData.section_title && <h3 className="text-center text-sm font-bold mb-3 uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.12em' }}>{htmlData.section_title}</h3>}
      <div className="p-5 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', fontFamily: sansFont, color: colors.text }}><StableHtmlContent htmlContent={htmlData.html_content} /></div>
    </div>);
  };

  const renderQrShareSection = (qrData: any) => {
    if (!qrData.enable_qr && !qrData.qr_foreground) return null;
    return (<div className="px-7 py-5"><div className="relative text-center p-5 rounded-lg" style={{ backgroundColor: colors.cardBg, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: colors.accent }} />
      <h3 className="font-bold text-sm mb-2 flex items-center justify-center gap-2 uppercase" style={{ color: colors.accent, fontFamily: headingFont, letterSpacing: '0.1em' }}><Share2 className="w-4 h-4" /> {t('Share')}</h3>
      {qrData.share_message && <p className="text-xs mb-3" style={{ color: colors.text + '99', fontFamily: sansFont }}>{qrData.share_message}</p>}
      <Button className="w-full rounded-md border-0 font-bold uppercase" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont, letterSpacing: '0.05em' }} onClick={() => setShowQrModal(true)}>
        <QrCode className="w-4 h-4 mr-2" /> {t('Share QR Code')}
      </Button>
    </div></div>);
  };

  const renderFooterSection = (footerData: any) => {
    if (!footerData.footer_text && !footerData.copyright_text) return null;
    return (<div className="px-7 py-4 text-center">
      {footerData.footer_text && <p className="text-xs mb-1" style={{ color: colors.text + '60', fontFamily: sansFont }}>{footerData.footer_text}</p>}
      {footerData.copyright_text && <p className="text-[11px]" style={{ color: colors.text + '40', fontFamily: sansFont }}>{footerData.copyright_text}</p>}
    </div>);
  };

  const copyrightSection = configSections.copyright;
  const orderedSectionKeys = getSectionOrder(data.template_config || { sections: configSections, sectionSettings: configSections }, allSections);

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden" style={{ fontFamily: sansFont, backgroundColor: colors.background, borderRadius: '24px', boxShadow: '0 20px 80px rgba(0,0,0,0.5)', direction: isRTL ? 'rtl' : 'ltr' }}>
      {orderedSectionKeys.filter(key => !['colors', 'font', 'copyright', 'seo', 'pixels'].includes(key)).map((sectionKey) => (<React.Fragment key={sectionKey}>{renderSection(sectionKey)}</React.Fragment>))}

      <div className="px-7 py-6 space-y-3" style={{ background: `linear-gradient(180deg, transparent, ${colors.accent}08, ${colors.accent}12)` }}>
        <Button className="w-full h-14 font-bold rounded-md transition-all hover:scale-[1.02] border-0 uppercase" style={{ backgroundColor: colors.accent, color: colors.primary, fontFamily: headingFont, fontSize: '14px', letterSpacing: '0.12em', boxShadow: `0 8px 30px ${colors.accent}35` }}
          onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('openContactModal'))}>
          <Target className="w-5 h-5 mr-2" /> {t('Take The Stage')}
        </Button>
        <Button size="sm" variant="outline" className="w-full rounded-md uppercase font-bold" style={{ borderColor: colors.accent + '40', color: colors.accent, fontFamily: headingFont, letterSpacing: '0.05em' }}
          onClick={() => { const cd = { name: data.name || configSections.header?.name || '', title: data.title || configSections.header?.title || '', email: data.email || configSections.contact?.email || '', phone: data.phone || configSections.contact?.phone || '', website: data.website || configSections.contact?.website || '', location: configSections.contact?.location || '' }; import('@/utils/vcfGenerator').then(m => { m.downloadVCF(cd); }); }}>
          <UserPlus className="w-4 h-4 mr-2" /> {t('Save Contact')}
        </Button>
      </div>
      {copyrightSection && (<div className="px-7 pb-5 pt-1">{copyrightSection.text && <p className="text-[11px] text-center" style={{ color: colors.text + '35', fontFamily: sansFont }}>{copyrightSection.text}</p>}</div>)}
      <QRShareModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} url={typeof window !== 'undefined' ? window.location.href : ''} colors={colors} font={sansFont} socialLinks={configSections.social?.social_links || []} />
    </div>
  );
}
