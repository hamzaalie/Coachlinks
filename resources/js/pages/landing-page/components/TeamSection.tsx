import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TeamSectionProps {
  brandColor?: string;
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    members?: Array<{
      name: string;
      role: string;
      bio: string;
      image?: string;
      linkedin?: string;
      twitter?: string;
      email?: string;
    }>;
    cta_title?: string;
    cta_description?: string;
    cta_button_text?: string;
  };
}

export default function TeamSection({ settings, sectionData, brandColor = '#7c3aed' }: TeamSectionProps) {
  const { t } = useTranslation();
  const defaultMembers = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', bio: 'Former tech executive with 15+ years in digital innovation. Passionate about empowering coaches worldwide.', image: '', linkedin: '#', twitter: '#', email: 'sarah@coachlinks.net' },
    { name: 'Michael Chen', role: 'CTO', bio: 'Full-stack developer and AI enthusiast. Leads our technical vision and product development.', image: '', linkedin: '#', twitter: '#', email: 'michael@coachlinks.net' },
    { name: 'Emily Rodriguez', role: 'Head of Design', bio: 'UX/UI expert focused on creating intuitive and beautiful experiences that drive engagement.', image: '', linkedin: '#', twitter: '#', email: 'emily@coachlinks.net' },
    { name: 'David Kim', role: 'Head of Marketing', bio: 'Growth marketing specialist with expertise in B2B SaaS and digital customer acquisition.', image: '', linkedin: '#', twitter: '#', email: 'david@coachlinks.net' },
  ];

  const teamMembers = sectionData?.members && sectionData.members.length > 0 ? sectionData.members : defaultMembers;
  const gradients = [
    'from-violet-500 to-fuchsia-500',
    'from-cyan-500 to-blue-500',
    'from-fuchsia-500 to-rose-500',
    'from-emerald-500 to-cyan-500',
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-fuchsia-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Our Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>Meet Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Team</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t('We\'re a diverse team of innovators, designers, and problem-solvers united by our passion for empowering coaches.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((member, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 group">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]} shadow-lg`}>
                {member.image ? (
                  <img src={member.image.startsWith('http') ? member.image : `${window.appSettings?.imageUrl || '/storage'}${member.image}`} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-lg font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
              <p className="text-violet-400 font-medium text-sm mb-3">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{member.bio}</p>

              <div className="flex justify-center gap-2">
                {member.linkedin && (
                  <a href={member.linkedin} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300">
                    <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300">
                    <Twitter className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300">
                    <Mail className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {(sectionData?.cta_title || sectionData?.cta_description || sectionData?.cta_button_text) && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14">
            <div className="rounded-2xl border border-white/[0.06] bg-[#111127] p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">{sectionData?.cta_title || t('Want to Join Our Team?')}</h3>
              <p className="text-slate-400 mb-6">{sectionData?.cta_description || t('We\'re always looking for talented individuals who share our passion for innovation and excellence.')}</p>
              <button className="text-white px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/20 transition-all duration-300">
                {sectionData?.cta_button_text || t('View Open Positions')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
