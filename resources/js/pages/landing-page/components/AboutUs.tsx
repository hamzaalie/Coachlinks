import React from 'react';
import { Target, Heart, Award, Lightbulb, Star, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface AboutUsProps {
  brandColor?: string;
  settings: any;
  sectionData: {
    title?: string;
    description?: string;
    story_title?: string;
    story_content?: string;
    stats?: Array<{ value: string; label: string; color: string; }>;
    values?: Array<{ title: string; description: string; icon: string; }>;
    image_title?: string;
    image_subtitle?: string;
    image_icon?: string;
    image?: string;
    background_color?: string;
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'target': Target, 'heart': Heart, 'award': Award, 'lightbulb': Lightbulb,
  'star': Star, 'shield': Shield, 'users': Users, 'zap': Zap
};

export default function AboutUs({ settings, sectionData, brandColor = '#7c3aed' }: AboutUsProps) {
  const { t } = useTranslation();
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${window.appSettings.imageUrl}${path}`;
  };
  const sectionImage = getImageUrl(sectionData.image || '');

  const defaultValues = [
    { icon: 'target', title: 'Our Mission', description: 'To empower coaches worldwide with the tools they need to build thriving practices and meaningful client relationships.' },
    { icon: 'heart', title: 'Our Values', description: 'We believe in innovation, simplicity, and building genuine connections that drive coaching success.' },
    { icon: 'award', title: 'Our Commitment', description: 'Delivering exceptional user experience with cutting-edge technology and dedicated support for every coach.' },
    { icon: 'lightbulb', title: 'Our Vision', description: 'A world where every coach has the digital presence they deserve to reach and transform more lives.' },
  ];

  const defaultStats = [
    { value: '4+ Years', label: 'Experience', color: 'violet' },
    { value: '10K+', label: 'Happy Coaches', color: 'cyan' },
    { value: '50+', label: 'Countries', color: 'fuchsia' },
  ];

  const values = sectionData.values && sectionData.values.length > 0 ? sectionData.values : defaultValues;
  const stats = sectionData.stats && sectionData.stats.length > 0 ? sectionData.stats : defaultStats;

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-violet-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            {sectionData.title || (<>About <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">CoachLinks</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData.description || t('We are passionate about empowering coaches to build thriving digital practices.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-2xl font-bold text-white mb-6">
              {sectionData.story_title || 'Empowering Coaches Since 2020'}
            </h3>
            <div className="text-slate-400 leading-relaxed space-y-4" dangerouslySetInnerHTML={{
              __html: (sectionData.story_content || 'Founded by a team of coaching enthusiasts and technology experts, CoachLinks was born from the need for a professional, coach-specific digital platform. Today, we serve over 10,000 coaches across 50+ countries, helping them build stronger client relationships through innovative digital solutions.').replace(/\n/g, '</p><p class="mb-4">')
            }} />
            {stats.length > 0 && (
              <div className="flex items-center gap-8 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.06] bg-[#111127] p-8 h-80 flex items-center justify-center">
            {sectionImage ? (
              <img src={sectionImage} alt="About Us" className="max-w-full max-h-full object-contain rounded-lg" />
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-violet-500/10 border border-violet-500/20 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">{sectionData.image_icon || '\u{1F680}'}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{sectionData.image_title || t('Innovation Driven')}</h4>
                <p className="text-slate-400">{sectionData.image_subtitle || t('Building the future of coaching')}</p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Target;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
