import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, MessageCircle, Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ContactSectionProps {
  brandColor?: string;
  flash?: {
    success?: string;
    error?: string;
  };
  settings?: {
    contact_email?: string;
    contact_phone?: string;
    contact_address?: string;
  };
  sectionData?: {
    title?: string;
    subtitle?: string;
    form_title?: string;
    info_title?: string;
    info_description?: string;
    faqs?: Array<{ question: string; answer: string; }>;
  };
}

export default function ContactSection({ flash, settings, sectionData, brandColor = '#7c3aed' }: ContactSectionProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '', email: '', subject: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('landing-page.contact'), { onSuccess: () => { reset(); } });
  };

  const faqs = sectionData?.faqs && sectionData.faqs.length > 0 ? sectionData.faqs : [
    { question: 'How quickly can I set up my coach profile?', answer: 'Most coaches go live in under 5 minutes. Pick a template, add your content, customize colors, and publish. Our AI copywriter can even help write your bio and program descriptions.' },
    { question: 'Can I use my own custom domain?', answer: 'Yes! Pro and Empire plan users can connect their own domain (e.g., yourname.com) for a fully branded experience. Subdomain support is available on all plans.' },
    { question: 'What if I need help setting things up?', answer: 'We offer priority email support, onboarding guides, and video tutorials. Our team typically responds within a few hours on business days.' },
    { question: 'Can I accept payments through my profile?', answer: 'Absolutely. CoachLinks supports 30+ payment gateways including Stripe and PayPal. You can sell coaching packages and accept payments directly on your profile.' },
    { question: 'Is there a free trial?', answer: 'Yes! Every new account starts with a 7-day full-access trial — no credit card required. You get access to all Starter Coach features so you can build your coach card and start getting leads before committing.' },
  ];

  const inputClasses = "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-[#0d0d20] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300";

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>Get in <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Touch</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t('Have questions about CoachLinks? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl border border-white/[0.06] bg-[#111127] p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                {sectionData?.form_title || t('Send us a Message')}
              </h3>

              {flash?.success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{flash.success}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" role="form" aria-label="Contact form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      {t('Full Name')} <span className="text-violet-400">*</span>
                    </label>
                    <input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)}
                      className={inputClasses} placeholder={t("Your full name")} required disabled={processing} />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      {t('Email Address')} <span className="text-violet-400">*</span>
                    </label>
                    <input type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                      className={inputClasses} placeholder={t("your@email.com")} required disabled={processing} />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('Subject')} <span className="text-violet-400">*</span>
                  </label>
                  <input type="text" id="subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)}
                    className={inputClasses} placeholder={t("What's this about?")} required disabled={processing} />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('Message')} <span className="text-violet-400">*</span>
                  </label>
                  <textarea id="message" rows={5} value={data.message} onChange={(e) => setData('message', e.target.value)}
                    className={`${inputClasses} resize-none`} placeholder={t("Tell us more about your inquiry...")} required disabled={processing} />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={processing}
                  className="w-full text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
                  {processing ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t('Sending...')}</>
                  ) : (
                    <><Send className="w-5 h-5" /> {t('Send Message')}</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {t('Frequently Asked Questions')}
                  </h3>
                  <p className="text-slate-400 text-sm">{t('Quick answers to common questions')}</p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`rounded-xl border transition-all duration-300 ${
                      openFaq === index
                        ? 'border-violet-500/20 bg-[#131330] shadow-lg shadow-violet-500/5'
                        : 'border-white/[0.06] bg-[#111127] hover:bg-[#151535]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-5 py-4 text-left flex justify-between items-center gap-3"
                      aria-expanded={openFaq === index}
                    >
                      <h4 className={`text-sm font-semibold transition-colors leading-snug ${
                        openFaq === index ? 'text-white' : 'text-slate-300'
                      }`}>
                        {faq.question}
                      </h4>
                      <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        openFaq === index ? 'bg-violet-500/20 rotate-0' : 'bg-[#0d0d20]'
                      }`}>
                        {openFaq === index ? (
                          <Minus className="w-3.5 h-3.5 text-violet-400" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-4">
                            <div className="h-px bg-gradient-to-r from-violet-500/20 via-white/5 to-transparent mb-3" />
                            <p className="text-slate-400 leading-relaxed text-sm">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
