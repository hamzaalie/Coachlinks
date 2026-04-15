import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail, CheckCircle, Sparkles, Bell, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface NewsletterSectionProps {
  brandColor?: string;
  flash?: { success?: string; error?: string; };
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    privacy_text?: string;
    benefits?: Array<{ icon: string; title: string; description: string; }>;
  };
}

export default function NewsletterSection({ flash, settings, sectionData, brandColor = '#7c3aed' }: NewsletterSectionProps) {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({ email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('landing-page.subscribe'), {
      onSuccess: () => { setIsSubmitted(true); reset(); setTimeout(() => setIsSubmitted(false), 3000); }
    });
  };

  const defaultBenefits = [
    { icon: 'sparkles', title: 'Feature Updates', description: 'Be the first to know about new tools and features' },
    { icon: 'bell', title: 'Coaching Tips', description: 'Get expert coaching and business growth strategies' },
    { icon: 'gift', title: 'Exclusive Offers', description: 'Access special promotions and early-bird discounts' },
  ];

  const benefitIconMap: Record<string, React.ComponentType<any>> = { sparkles: Sparkles, bell: Bell, gift: Gift };
  const benefits = sectionData?.benefits && sectionData.benefits.length > 0 ? sectionData.benefits : defaultBenefits;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[150px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="rounded-2xl border border-white/[0.06] bg-[#111127] p-8 md:p-12">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-violet-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              {sectionData?.title || (<>Stay Updated with <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">CoachLinks</span></>)}
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed" id="newsletter-description">
              {sectionData?.subtitle || t('Get the latest updates, coaching tips, and exclusive features delivered straight to your inbox. Join our community of coaches.')}
            </p>

            {(flash?.success || isSubmitted) && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{flash?.success || t("Thank you for subscribing!")}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 rounded-xl border border-white/[0.08] bg-[#0d0d20] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30 disabled:opacity-50 transition-all duration-300"
                    required disabled={processing} aria-label="Email address for newsletter subscription" aria-describedby="newsletter-description" />
                  {errors.email && <p className="text-red-400 text-sm mt-1 text-left">{errors.email}</p>}
                </div>
                <button type="submit" disabled={processing}
                  className="text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 min-w-[140px]">
                  {processing ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t('...')}</>
                  ) : t('Subscribe')}
                </button>
              </div>
            </form>

            <p className="text-slate-500 text-sm mt-4">
              {sectionData?.privacy_text || 'No spam, unsubscribe at any time. We respect your privacy.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {benefits.map((benefit, index) => {
                const IconComponent = benefitIconMap[benefit.icon] || Sparkles;
                return (
                  <div key={index} className="text-center p-4 rounded-xl border border-white/[0.04] bg-[#0d0d20]">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                    <p className="text-slate-500 text-xs">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
