import React from 'react';
import { motion } from 'framer-motion';
import { Palette, PenTool, Rocket, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Palette,
      title: 'Pick Your Template',
      description: 'Browse 50+ professionally designed coaching templates. Find one that matches your brand, niche, and style.',
      color: '#7c3aed',
      colorLight: 'rgba(124,58,237,0.15)',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      number: '02',
      icon: PenTool,
      title: 'Customize & Brand',
      description: 'Add your bio, programs, testimonials, booking link, and lead magnets. No coding needed.',
      color: '#06b6d4',
      colorLight: 'rgba(6,182,212,0.15)',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Publish & Grow',
      description: 'Hit publish and your coaching page goes live instantly. Start booking discovery calls today.',
      color: '#10b981',
      colorLight: 'rgba(16,185,129,0.15)',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  // Animated connector line
  const ConnectorLine = ({ index }: { index: number }) => (
    <div className="hidden lg:flex items-center justify-center absolute top-1/2 -right-8 w-16 z-20 -translate-y-1/2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.2, ease: 'easeOut' }}
        className="relative w-full origin-left"
      >
        {/* Dashed line */}
        <svg width="64" height="2" viewBox="0 0 64 2" className="w-full">
          <motion.line
            x1="0" y1="1" x2="64" y2="1"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 + index * 0.2 }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(124,58,237,0.4)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.4)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Arrow tip */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.0 + index * 0.2 }}
          className="absolute -right-1 -top-[7px]"
        >
          <ChevronRight className="w-4 h-4 text-violet-400/50" />
        </motion.div>
      </motion.div>
    </div>
  );

  // Mobile connector
  const MobileConnector = () => (
    <div className="flex lg:hidden justify-center py-4">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-px h-12 bg-gradient-to-b from-violet-500/30 via-cyan-500/20 to-transparent origin-top"
      />
    </div>
  );

  return (
    <section id="how-it-works" className="relative py-28 sm:py-36 overflow-hidden" style={{ background: '#000000' }}>
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-violet-600/[0.06] blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-600/[0.05] blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/[0.03] blur-[150px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6"
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Launch in{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            >
              3 Simple Steps
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            No technical skills needed. Go from zero to a fully branded coaching page in under 5 minutes.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-16 items-stretch">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2, type: 'spring', stiffness: 100 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="relative h-full rounded-3xl border border-white/[0.06] bg-[#111127] overflow-hidden transition-all duration-700 hover:border-white/[0.12]">
                    {/* Top accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                      className={`h-[2px] bg-gradient-to-r ${step.gradient} origin-left`}
                    />

                    {/* Animated corner decoration */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ opacity: 0, rotate: -90 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                      >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <motion.path
                            d="M4 36V20C4 11.163 11.163 4 20 4h16"
                            stroke={step.color}
                            strokeWidth="1"
                            strokeOpacity="0.2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.6 + index * 0.15 }}
                          />
                          <motion.circle
                            cx="36" cy="4" r="2"
                            fill={step.color}
                            fillOpacity="0.3"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 1.0 + index * 0.15 }}
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-10">
                      {/* Step number with animated ring */}
                      <div className="relative mb-8">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.15, type: 'spring', stiffness: 120 }}
                          className="relative w-20 h-20"
                        >
                          {/* Animated ring */}
                          <svg className="absolute inset-0 w-20 h-20" viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
                            <motion.circle
                              cx="40" cy="40" r="36"
                              fill="none"
                              stroke={step.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeDasharray="226"
                              initial={{ strokeDashoffset: 226 }}
                              whileInView={{ strokeDashoffset: 226 * (1 - (index + 1) / 3) }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.4 + index * 0.2, ease: 'easeOut' }}
                            />
                            {/* Dot on the ring */}
                            <motion.circle
                              cx="40" cy="4" r="3"
                              fill={step.color}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: [0, 1, 0.6] }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                            />
                          </svg>
                          {/* Inner icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ rotate: 15, scale: 1.1 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            >
                              <StepIcon
                                className="w-8 h-8"
                                style={{ color: step.color }}
                                strokeWidth={1.5}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Number label */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                        className="flex items-center gap-3 mb-5"
                      >
                        <span
                          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{ color: step.color, background: step.colorLight }}
                        >
                          Step {step.number}
                        </span>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: 40 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                          className="h-px"
                          style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }}
                        />
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                        className="text-2xl sm:text-[26px] font-bold text-white mb-4 tracking-tight"
                      >
                        {step.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                        className="text-slate-400 leading-relaxed text-[15px]"
                      >
                        {step.description}
                      </motion.p>

                      {/* Bottom decorative line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.15 }}
                        className="mt-8 origin-left"
                      >
                        <svg width="100%" height="1" viewBox="0 0 300 1" preserveAspectRatio="none">
                          <line x1="0" y1="0.5" x2="300" y2="0.5" stroke={step.color} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 6" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 60px ${step.colorLight}, 0 0 40px ${step.colorLight}` }}
                    />
                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && <ConnectorLine index={index} />}
                </motion.div>
                {index < steps.length - 1 && <MobileConnector />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
