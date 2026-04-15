import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Play, Sparkles, Zap, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ParticleCanvas from './ParticleCanvas';

interface HeroSectionProps {
  brandColor?: string;
  settings: any;
  sectionData: {
    title?: string;
    subtitle?: string;
    announcement_text?: string;
    primary_button_text?: string;
    secondary_button_text?: string;
    image?: string;
    stats?: Array<{value: string; label: string}>;
  };
}

export default function HeroSection({ settings, sectionData, brandColor = '#7c3aed' }: HeroSectionProps) {
  const { t } = useTranslation();
  const defaultStats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50+', label: 'Countries' },
    { value: '99%', label: 'Satisfaction' },
  ];
  const stats = sectionData.stats && sectionData.stats.length > 0 ? sectionData.stats : defaultStats;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #050510 30%, #000000 70%, #000000 100%)' }}>
      <ParticleCanvas className="z-0" particleCount={90} speed={0.25} />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        <motion.div 
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            {/* Announcement badge */}
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-violet-500/30 text-violet-300"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                {sectionData.announcement_text || 'The #1 Platform for Coaches'}
              </span>
            </motion.div>

            {/* Main heading with animated gradient */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white">
              {sectionData.title || 'Your Coaching Empire'}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Starts Here.
                </span>
                {/* Underline accent */}
                <motion.div 
                  initial={{ scaleX: 0 }} 
                  animate={{ scaleX: 1 }} 
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
              {sectionData.subtitle || 'Build your stunning coach profile, capture leads on autopilot, and book more discovery calls \u2014 in under 5 minutes. No code, no stress.'}
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href={route('register')}
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-bold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9, #4f46e5)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="w-5 h-5" />
                {sectionData.primary_button_text || t('Start 7-Day Free Trial')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={route('login')}
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-bold text-base text-slate-300 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                <Play className="w-5 h-5" />{sectionData.secondary_button_text || t('Login')}
              </Link>
            </motion.div>

            {/* Floating feature badges */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 pt-4">
              {[
                { icon: Zap, label: 'AI-Powered' },
                { icon: Globe, label: 'Custom Domain' },
                { icon: Users, label: 'Lead Capture' },
              ].map((badge, i) => (
                <motion.div key={i} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm">
                  <badge.icon className="w-3.5 h-3.5 text-violet-400" />
                  {badge.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
              className="grid grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div key={i} 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="text-center p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-[5] pointer-events-none" />

      {/* CSS for animated gradient text */}
      <style>{`
        @keyframes gradient { 
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
        .animate-gradient { animation: gradient 4s ease infinite; }
      `}</style>
    </section>
  );
}
