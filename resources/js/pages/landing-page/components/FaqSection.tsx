import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

interface Faq { id: number; question: string; answer: string; }

const DEFAULT_FAQS = [
  { id: 1, question: 'What is CoachLinks?', answer: 'CoachLinks is a premium digital profile and lead generation platform built exclusively for coaches. Create a stunning coach profile with your programs, testimonials, booking link, and lead magnets \u2014 then share it anywhere via QR code, NFC, link, or social media. Choose from 51+ coach-specific templates.' },
  { id: 2, question: 'Do I need technical skills to use CoachLinks?', answer: 'Not at all! CoachLinks is designed for coaches, not developers. You can build a professional profile in under 5 minutes using our coach-specific templates. Just pick a template, add your content, and publish. Our AI copywriter can even write your bio and program descriptions for you.' },
  { id: 3, question: 'How does CoachLinks help me get more clients?', answer: 'CoachLinks includes built-in lead capture forms, lead magnets, discovery call booking (Calendly, Google Calendar, Cal.com), email campaigns, and smart CTAs that convert profile visitors into booked calls. Coaches see an average of 3x more discovery calls after switching to CoachLinks.' },
  { id: 4, question: 'What payment gateways are supported?', answer: 'CoachLinks supports 30+ payment gateways including Stripe, PayPal, Razorpay, Mollie, Mercado Pago, Coingate, Cashfree, Iyzico, PayTabs, and many more. You can accept payments for coaching packages directly on your profile with Stripe and PayPal payment links.' },
  { id: 5, question: 'Can I use my own custom domain?', answer: 'Yes! Pro Coach and Coach Empire plan users can connect their own custom domain (e.g., yourname.com) to their coach profile for a fully branded experience. Subdomain support is available on all plans.' },
  { id: 6, question: 'Is CoachLinks available in multiple languages?', answer: 'Yes! CoachLinks supports full internationalization with multi-language support and RTL (right-to-left) layout for Arabic, Hebrew, and other RTL languages. Translate your entire platform into any language.' },
  { id: 7, question: 'Can I white-label CoachLinks for my coaching agency?', answer: 'Absolutely! White-label branding lets you remove all CoachLinks branding and replace it with your own logo, colors, domain, and favicon. Perfect for coaching agencies, enterprise coaching programs, and resellers.' },
  { id: 8, question: 'What analytics and tracking does CoachLinks provide?', answer: 'CoachLinks provides advanced analytics including profile views, lead conversions, booking clicks, geographic data, device stats, traffic sources, and visitor tracking. The real-time performance dashboard shows all your key metrics at a glance.' },
  { id: 9, question: 'Is my data secure?', answer: 'Yes. We use enterprise-grade security including reCAPTCHA protection, encrypted data storage, role-based permissions, webhook integration, and GDPR-compliant data handling. You have full control over your privacy settings and password protection for profiles.' },
  { id: 10, question: 'Does CoachLinks support NFC and QR codes?', answer: 'Yes! Generate dynamic QR codes for your coach profile, and use NFC-enabled smart cards for tap-to-share at events and meetings. You can also add your digital coach card to Google Wallet for instant sharing.' },
];

interface FaqSectionProps {
  brandColor?: string; faqs: Faq[]; settings?: any;
  sectionData?: { title?: string; subtitle?: string; cta_text?: string; button_text?: string;
    default_faqs?: Array<{ question: string; answer: string; }>;
  };
}

export default function FaqSection({ faqs, settings, sectionData, brandColor = '#7c3aed' }: FaqSectionProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const settingsFaqs = settings?.config_sections?.sections?.find((section: any) => section.key === 'faq')?.faqs?.map((faq: any, index: number) => ({
    id: index + 1, question: faq.question, answer: faq.answer
  })) || [];

  const backendFaqs = sectionData?.default_faqs?.map((faq, index) => ({ id: index + 1, ...faq })) || DEFAULT_FAQS;
  const displayFaqs = settingsFaqs.length > 0 ? settingsFaqs : (faqs.length > 0 ? faqs : backendFaqs);
  const toggleFaq = (id: number) => setOpenFaq(openFaq === id ? null : id);

  // Split FAQs into two columns
  const halfIndex = Math.ceil(displayFaqs.length / 2);
  const leftFaqs = displayFaqs.slice(0, halfIndex);
  const rightFaqs = displayFaqs.slice(halfIndex);

  const FaqItem = ({ faq, index }: { faq: Faq; index: number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-xl border transition-all duration-300 ${openFaq === faq.id ? 'border-violet-500/20 bg-[#131330]' : 'border-white/[0.06] bg-[#111127] hover:bg-[#151535]'}`}>
      <button onClick={() => toggleFaq(faq.id)}
        className="w-full px-5 py-4 text-left flex justify-between items-center gap-3"
        aria-expanded={openFaq === faq.id}>
        <h3 className={`text-sm font-semibold transition-colors leading-snug ${openFaq === faq.id ? 'text-white' : 'text-slate-300'}`}>
          {faq.question}
        </h3>
        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${openFaq === faq.id ? 'bg-violet-500/20' : 'bg-[#0d0d20]'}`}>
          {openFaq === faq.id ? (
            <Minus className="w-3.5 h-3.5 text-violet-400" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-slate-400" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {openFaq === faq.id && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div className="px-5 pb-4">
              <div className="h-px bg-gradient-to-r from-violet-500/20 via-white/5 to-transparent mb-3" />
              <p className="text-slate-400 leading-relaxed text-sm">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>Frequently Asked <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Questions</span></>)}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {sectionData?.subtitle || "Got questions? We've got answers. Everything you need to know about CoachLinks."}
          </p>
        </motion.div>

        {/* Two-column FAQ layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="space-y-3">
            {leftFaqs.map((faq, index) => (
              <FaqItem key={faq.id} faq={faq} index={index} />
            ))}
          </div>
          <div className="space-y-3">
            {rightFaqs.map((faq, index) => (
              <FaqItem key={faq.id} faq={faq} index={index + halfIndex} />
            ))}
          </div>
        </div>

        {/* Still have questions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center p-8 rounded-2xl border border-white/[0.06] bg-[#111127]">
          <MessageCircle className="w-10 h-10 text-violet-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{sectionData?.cta_text || 'Still have questions?'}</h3>
          <p className="text-slate-400 mb-6 text-sm">Can't find what you're looking for? Our support team is here to help.</p>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
            {sectionData?.button_text || 'Contact Support'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
