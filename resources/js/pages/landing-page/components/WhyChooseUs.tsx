import React from 'react';
import { CheckCircle, Clock, Users, Zap, Star, Shield, Heart, Award, ArrowRight, Sparkles, TrendingUp, Rocket, Quote, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

interface CaseStudy {
  name: string;
  role: string;
  niche: string;
  avatar_initials: string;
  quote: string;
  before: string;
  after: string;
  metrics: Array<{ label: string; value: string; icon: string; }>;
}

interface WhyChooseUsProps {
  brandColor?: string;
  settings: any;
  sectionData: {
    title?: string;
    subtitle?: string;
    reasons?: Array<{ title: string; description: string; icon: string; }>;
    case_study?: CaseStudy;
    cta_title?: string;
    cta_subtitle?: string;
  };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'clock': Clock, 'users': Users, 'zap': Zap, 'check-circle': CheckCircle,
  'star': Star, 'shield': Shield, 'heart': Heart, 'award': Award, 'trending': TrendingUp, 'rocket': Rocket,
  'calendar': Calendar, 'dollar': DollarSign, 'chart': BarChart3
};

export default function WhyChooseUs({ settings, sectionData, brandColor = '#7c3aed' }: WhyChooseUsProps) {
  const { t } = useTranslation();

  const defaultReasons = [
    { icon: 'rocket', title: '5-Minute Setup', description: 'Build your stunning coach profile in under 5 minutes. Pick a template, add your content, publish. No tech skills needed.' },
    { icon: 'users', title: 'Built Exclusively for Coaches', description: 'Pre-built sections for programs, testimonials, lead magnets, booking — designed from the ground up for coaching businesses.' },
    { icon: 'zap', title: 'Leads on Autopilot', description: 'Capture leads 24/7 with built-in lead magnets, discovery call booking, AI copywriting, and smart follow-up tools.' },
    { icon: 'trending', title: 'Proven Results', description: 'Coaches using CoachLinks see 3x more discovery calls booked and 40% higher client conversion rates on average.' },
    { icon: 'shield', title: 'Enterprise-Grade Security', description: 'reCAPTCHA protection, encrypted data, role-based permissions, webhooks, and GDPR-compliant data handling.' },
    { icon: 'star', title: 'White-Label Ready', description: 'Run your own branded coaching platform. Custom domain, your logo, your colors — no CoachLinks branding anywhere.' },
  ];

  const defaultCaseStudy: CaseStudy = {
    name: 'Sarah Mitchell',
    role: 'Executive Leadership Coach',
    niche: 'C-Suite & VP Leadership Development',
    avatar_initials: 'SM',
    quote: "Before CoachLinks, I was spending 10+ hours a week on admin — updating my website, chasing invoices, manually booking calls. Now everything runs on autopilot. I launched my new coaching page in one afternoon and booked 14 discovery calls that same week. It completely transformed my practice.",
    before: 'Scattered online presence across 5 different tools. No lead capture. Manually scheduling every call via email. Averaging 2-3 new leads per month.',
    after: 'One unified coaching page with integrated booking, lead magnets, and payments. Fully automated follow-ups. Consistent pipeline of qualified leads.',
    metrics: [
      { label: 'Discovery Calls / Month', value: '2 → 14', icon: 'calendar' },
      { label: 'Monthly Revenue Growth', value: '+340%', icon: 'dollar' },
      { label: 'Time Saved Weekly', value: '10+ Hours', icon: 'clock' },
      { label: 'Client Conversion Rate', value: '18% → 52%', icon: 'chart' },
    ]
  };

  const reasons = sectionData.reasons && sectionData.reasons.length > 2 ? sectionData.reasons : defaultReasons;
  const caseStudy = sectionData.case_study && sectionData.case_study.name ? sectionData.case_study : defaultCaseStudy;

  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#000000' }}>
      {/* Background grid + accent */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Why CoachLinks
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData.title || (<>Why Coaches <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Choose Us</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData.subtitle || t("We're not just another website builder. CoachLinks is built exclusively for coaches who want to attract clients, book calls, and grow their practice.")}
          </p>
        </motion.div>

        {/* Case Study */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16 relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111127]">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500" />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-violet-600/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-cyan-600/5 blur-[60px]" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-12">
            {/* Case Study Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                Case Study
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              {/* Left: Quote + Profile */}
              <div className="lg:col-span-3 space-y-6">
                {/* Quote */}
                <div className="relative">
                  <Quote className="w-10 h-10 text-violet-500/30 mb-4" />
                  <blockquote className="text-lg sm:text-xl text-slate-300 leading-relaxed italic">
                    "{caseStudy.quote}"
                  </blockquote>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
                    {caseStudy.avatar_initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{caseStudy.name}</div>
                    <div className="text-violet-400 text-sm font-medium">{caseStudy.role}</div>
                    <div className="text-slate-500 text-xs">{caseStudy.niche}</div>
                  </div>
                </div>

                {/* Before / After */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-[#0d0d20] border border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-400/60" />
                      <span className="text-xs font-bold uppercase tracking-wider text-red-400/80">Before</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{caseStudy.before}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0d0d20] border border-violet-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">After</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{caseStudy.after}</p>
                  </div>
                </div>
              </div>

              {/* Right: Metrics */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Key Results</h4>
                {caseStudy.metrics.map((metric, index) => {
                  const MetricIcon = iconMap[metric.icon] || BarChart3;
                  return (
                    <motion.div key={index}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="p-5 rounded-xl bg-[#0d0d20] border border-white/[0.04] hover:border-violet-500/15 transition-all duration-300 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/15 to-cyan-500/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.12)] transition-shadow duration-300">
                          <MetricIcon className="w-4.5 h-4.5 text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{metric.value}</div>
                          <div className="text-slate-400 text-sm">{metric.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon] || Clock;
            return (
              <motion.div key={index}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-7 rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/[0.04] group-hover:to-cyan-600/[0.04] transition-all duration-500" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-shadow duration-500">
                    <IconComponent className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 relative overflow-hidden rounded-2xl border border-violet-500/20"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 50%, rgba(124,58,237,0.1) 100%)' }}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\u002720\u0027 height=\u002720\u0027 xmlns=\u0027http://www.w3.org/2000/svg\u0027%3E%3Cdefs%3E%3Cpattern id=\u0027g\u0027 width=\u002720\u0027 height=\u002720\u0027 patternUnits=\u0027userSpaceOnUse\u0027%3E%3Ccircle cx=\u002710\u0027 cy=\u002710\u0027 r=\u00270.5\u0027 fill=\u0027rgba(255,255,255,0.08)\u0027/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\u0027url(%23g)\u0027 width=\u0027100%25\u0027 height=\u0027100%25\u0027/%3E%3C/svg%3E')]" />
          <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {sectionData.cta_title || 'Ready to grow your coaching business?'}
              </h3>
              <p className="text-slate-300">
                {sectionData.cta_subtitle || 'Join thousands of coaches who scaled their practice with CoachLinks.'}
              </p>
            </div>
            <Link href={route('register')}
              className="group flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-600/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
              <Sparkles className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
