import React from 'react';
import { Monitor, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ScreenshotsSectionProps {
  brandColor?: string;
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    screenshots_list?: Array<{
      src: string;
      alt: string;
      title: string;
      description: string;
    }>;
  };
}

export default function ScreenshotsSection({ brandColor = '#7c3aed', settings, sectionData }: ScreenshotsSectionProps) {
  const { t } = useTranslation();

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${window.appSettings.imageUrl}${path}`;
  };

  const defaultScreenshots = [
    {
      src: '/screenshots/hero.png',
      alt: 'CoachLinks Dashboard Overview',
      title: 'Dashboard Overview',
      description: 'Comprehensive dashboard with all your coach profiles, leads, and analytics at a glance.'
    },
    {
      src: '/screenshots/vcard-builder.png',
      alt: 'Coach Profile Builder',
      title: 'Coach Profile Builder',
      description: 'Intuitive drag-and-drop builder for creating professional coach profiles in minutes.'
    },
    {
      src: '/screenshots/analytics.png',
      alt: 'Analytics Dashboard',
      title: 'Analytics & Insights',
      description: 'Track profile views, lead conversions, and booking clicks with real-time analytics.'
    }
  ];

  const screenshots = sectionData?.screenshots_list && sectionData.screenshots_list.length > 0
    ? sectionData.screenshots_list.map(s => ({ ...s, src: getImageUrl(s.src) })).filter(s => s.src)
    : defaultScreenshots.map(s => ({ ...s, src: getImageUrl(s.src) })).filter(s => s.src);

  return (
    <section id="screenshots" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 rounded-full bg-violet-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Screenshots
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>See CoachLinks <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">in Action</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t('Explore our intuitive interface and powerful features designed to grow your coaching business.')}
          </p>
        </motion.div>

        {screenshots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {screenshots.map((screenshot, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/[0.04] group-hover:to-cyan-600/[0.04] transition-all duration-500" />
                <div className="aspect-video overflow-hidden bg-[#0d0d20]">
                  {screenshot.src ? (
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const next = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center text-slate-600" style={{ display: screenshot.src ? 'none' : 'flex' }}>
                    <Monitor className="w-12 h-12" />
                  </div>
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{screenshot.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{screenshot.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Monitor className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-500">{t('No screenshots configured yet.')}</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-violet-500/20 text-violet-400 bg-violet-500/10">
            <Sparkles className="w-4 h-4" />
            {t('And many more features to discover')}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
