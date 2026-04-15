import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function ComparisonSection() {
  const withoutItems = [
    'Juggling 5+ tools for your website, booking, emails, and payments',
    'Spending weeks building a site that still doesn\'t convert',
    'Losing leads because there\'s no clear call-to-action or funnel',
    'Paying designers & developers thousands for basic updates',
  ];

  const withItems = [
    { text: 'One platform for your', bold: 'entire coaching business', after: ' — page, booking, leads, payments' },
    { text: 'Launch a', bold: 'high-converting coaching page', after: ' in under 5 minutes' },
    { text: 'Built-in', bold: 'lead magnets & discovery call booking', after: ' that work on autopilot' },
    { text: 'Update everything yourself —', bold: 'zero code, zero cost', after: ', anytime' },
  ];

  return (
    <section id="comparison" className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#000000' }}>
      {/* Background */}
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-violet-600/[0.04] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-cyan-600/[0.03] blur-[120px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Stop Losing Clients to{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Bad Tools</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Most coaches waste time and money stitching together tools that weren't built for them. CoachLinks replaces them all — in one click.
          </p>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* WITHOUT card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group"
          >
            <div className="relative h-full rounded-2xl border border-white/[0.06] bg-[#111127] overflow-hidden">
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
                <h3 className="text-xl font-bold text-slate-300 text-center">Without CoachLinks</h3>
              </div>

              {/* Items */}
              <div className="p-8 space-y-6">
                {withoutItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                      <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
                    </div>
                    <p className="text-slate-400 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* WITH card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative h-full rounded-2xl border border-violet-500/20 bg-[#111127] overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.08)]">
              {/* Accent header */}
              <div className="relative px-8 pt-8 pb-6 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
                <h3 className="relative text-xl font-bold text-white text-center">With CoachLinks</h3>
              </div>

              {/* Items */}
              <div className="p-8 space-y-6">
                {withItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mt-0.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                    </motion.div>
                    <p className="text-slate-300 leading-relaxed">
                      {item.text} <span className="font-bold text-white">{item.bold}</span>{item.after}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
