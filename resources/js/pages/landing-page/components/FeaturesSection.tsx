import React, { useState } from 'react';
import {
  QrCode, Smartphone, Share2, BarChart3, Globe, Shield, Star, Zap, Users, Lock, Wifi, Heart,
  CreditCard, Palette, Bot, CalendarCheck, Mail, Link2, Layers, Megaphone, Crown, Fingerprint,
  MonitorSmartphone, Languages, Plug, Wallet, Eye, BookOpen, FileText, LayoutGrid, ArrowRight,
  Rocket, Target, TrendingUp, Blocks
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Feature { title: string; description: string; icon: string; }
interface FeaturesSectionProps {
  brandColor?: string;
  settings: any;
  sectionData: { title?: string; description?: string; features_list?: Feature[]; image?: string; background_color?: string; columns?: number; };
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'qr-code': QrCode, 'smartphone': Smartphone, 'share': Share2, 'bar-chart': BarChart3,
  'globe': Globe, 'shield': Shield, 'star': Star, 'zap': Zap, 'users': Users, 'lock': Lock,
  'wifi': Wifi, 'heart': Heart, 'credit-card': CreditCard, 'palette': Palette, 'bot': Bot,
  'calendar': CalendarCheck, 'mail': Mail, 'link': Link2, 'layers': Layers,
  'megaphone': Megaphone, 'crown': Crown, 'fingerprint': Fingerprint,
  'monitor': MonitorSmartphone, 'languages': Languages, 'plug': Plug, 'wallet': Wallet,
  'eye': Eye, 'book': BookOpen, 'file': FileText, 'grid': LayoutGrid, 'rocket': Rocket,
  'target': Target, 'trending': TrendingUp, 'blocks': Blocks
};

interface FeatureCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  features: Array<{ icon: string; title: string; description: string; }>;
}

const featureCategories: FeatureCategory[] = [
  {
    id: 'profile',
    name: 'Coach Profiles',
    icon: Star,
    color: 'violet',
    features: [
      { icon: 'star', title: '51+ Coach Templates', description: 'Premium templates for life, business, health, fitness, career, and every coaching niche you can imagine.' },
      { icon: 'grid', title: '20+ Profile Sections', description: 'Services, programs, testimonials, gallery, pricing tables, social links, quick links, appointments, videos, and more.' },
      { icon: 'palette', title: 'Full Visual Customization', description: 'Custom colors, fonts, backgrounds, layouts. Drag-and-drop section ordering to build your perfect page.' },
      { icon: 'monitor', title: 'PWA Support', description: 'Your coach profile works as a Progressive Web App \u2014 installable on any phone like a native app.' },
      { icon: 'lock', title: 'Password Protection', description: 'Protect premium content or exclusive coaching profiles with password-gated access.' },
      { icon: 'wallet', title: 'Payment Links', description: 'Accept payments directly on your profile with Stripe and PayPal payment link integration.' },
    ]
  },
  {
    id: 'leads',
    name: 'Leads & CRM',
    icon: Target,
    color: 'cyan',
    features: [
      { icon: 'target', title: 'Lead Capture Forms', description: 'Built-in opt-in forms, lead magnets, and smart CTAs that convert visitors into booked calls on autopilot.' },
      { icon: 'mail', title: 'Email Campaigns', description: 'Send targeted email campaigns to your captured leads. Built-in email system with tracking and templates.' },
      { icon: 'calendar', title: 'Appointment Booking', description: 'Integrate with Calendly, Google Calendar, Acuity Scheduling, and Cal.com for seamless booking.' },
      { icon: 'megaphone', title: 'Campaign Manager', description: 'Create and manage promotional campaigns with custom landing pages, start/end dates, and tracking.' },
      { icon: 'users', title: 'Contact Management', description: 'Built-in CRM to organize leads, track interactions, and manage your coaching pipeline effortlessly.' },
      { icon: 'trending', title: 'Referral Program', description: 'Built-in referral system that rewards your coaches and clients for bringing new signups.' },
    ]
  },
  {
    id: 'sharing',
    name: 'Sharing & Reach',
    icon: Share2,
    color: 'fuchsia',
    features: [
      { icon: 'qr-code', title: 'Dynamic QR Codes', description: 'Generate beautiful, branded QR codes for your coach profile. Perfect for events, cards, and presentations.' },
      { icon: 'wifi', title: 'NFC Smart Cards', description: 'Tap-to-share with NFC-enabled cards. One tap and your full coach profile is on their phone.' },
      { icon: 'link', title: 'Built-in Link-in-Bio', description: 'Every coach card includes a Quick Links section — a beautiful link-in-bio right inside your profile. No separate tool needed.' },
      { icon: 'globe', title: 'Custom Domain', description: 'Connect your own domain (yourname.com) for a fully branded experience. Subdomain support included.' },
      { icon: 'smartphone', title: 'Google Wallet Pass', description: 'Add your digital coach card directly to Google Wallet for instant tap-and-share convenience.' },
      { icon: 'book', title: 'Business Directory', description: 'Get discovered in the CoachLinks public directory. Searchable listing with categories and filters.' },
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & AI',
    icon: BarChart3,
    color: 'emerald',
    features: [
      { icon: 'bar-chart', title: 'Advanced Analytics', description: 'Track profile views, lead conversions, booking clicks, geographic data, device stats, and traffic sources.' },
      { icon: 'bot', title: 'AI Coach Copywriter', description: 'ChatGPT-powered AI writes your bio, program descriptions, testimonials, and marketing copy in seconds.' },
      { icon: 'eye', title: 'Visitor Tracking', description: 'See who visited your profile, when, from where, and what device they used. Real-time visitor insights.' },
      { icon: 'trending', title: 'Conversion Funnels', description: 'Understand your visitor-to-lead-to-client pipeline with built-in conversion tracking and reporting.' },
      { icon: 'file', title: 'Export & Reports', description: 'Export your analytics data, lead lists, and client info to CSV for deeper analysis and reporting.' },
      { icon: 'rocket', title: 'Performance Dashboard', description: 'A beautiful, real-time dashboard showing all your key metrics at a glance. Data-driven coaching.' },
    ]
  },
  {
    id: 'platform',
    name: 'Platform & Scale',
    icon: Layers,
    color: 'amber',
    features: [
      { icon: 'credit-card', title: '30+ Payment Gateways', description: 'Stripe, PayPal, Razorpay, Mollie, Mercado Pago, Coingate, Cashfree, Iyzico, PayTabs, and many more.' },
      { icon: 'layers', title: 'Multi-Tenancy SaaS', description: 'Full SaaS architecture with subscription plans, team management, usage limits, and admin controls.' },
      { icon: 'crown', title: 'White-Label Branding', description: 'Remove CoachLinks branding entirely. Use your own logo, colors, domain, and favicon. Fully rebrandable.' },
      { icon: 'plug', title: 'Addon & Plugin System', description: 'Extend functionality with installable addons. Modular architecture means unlimited customization.' },
      { icon: 'languages', title: 'Multi-Language & RTL', description: 'Full internationalization with RTL support. Translate everything into any language for global reach.' },
      { icon: 'shield', title: 'Enterprise Security', description: 'reCAPTCHA, webhook integration, encrypted data, role-based permissions, and audit logging.' },
    ]
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; activeBg: string; }> = {
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', glow: 'shadow-violet-500/20', activeBg: 'bg-violet-500/15' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-cyan-500/20', activeBg: 'bg-cyan-500/15' },
  fuchsia: { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/20', activeBg: 'bg-fuchsia-500/15' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/20', activeBg: 'bg-emerald-500/15' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', glow: 'shadow-amber-500/20', activeBg: 'bg-amber-500/15' },
};

export default function FeaturesSection({ settings, sectionData, brandColor = '#7c3aed' }: FeaturesSectionProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('profile');

  const activeData = featureCategories.find(c => c.id === activeCategory) || featureCategories[0];
  const colors = colorMap[activeData.color] || colorMap.violet;

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-violet-600/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Powerful Features
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData.title || (<>Everything You Need to <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Grow</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData.description || 'From profile building to lead capture to payment processing \u2014 CoachLinks gives you the complete toolkit to attract, convert, and retain coaching clients.'}
          </p>
          {/* Total feature count */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-sm">
            <Blocks className="w-4 h-4 text-violet-400" />
            <span className="font-semibold text-white">30+</span> powerful features across <span className="font-semibold text-white">5</span> categories
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {featureCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const catColors = colorMap[cat.color] || colorMap.violet;
            const CatIcon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  isActive 
                    ? `${catColors.activeBg} ${catColors.border} ${catColors.text} shadow-lg ${catColors.glow}` 
                    : 'border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12] bg-[#111127] hover:bg-[#151535]'
                }`}>
                <CatIcon className={`w-4 h-4 ${isActive ? catColors.text : 'text-slate-500 group-hover:text-slate-300'}`} />
                {cat.name}
                {isActive && (
                  <motion.div layoutId="activeTab" className={`absolute inset-0 rounded-xl ${catColors.activeBg} border ${catColors.border}`} 
                    style={{ zIndex: -1 }} transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Feature cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeData.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Star;
              return (
                <motion.div key={feature.title}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative p-7 rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(124,58,237,0.08)]">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/[0.04] group-hover:to-cyan-600/[0.04] transition-all duration-500" />
                  <div className="relative z-10">
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5 group-hover:shadow-lg ${colors.glow} transition-all duration-500`}>
                      <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom summary strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
          {[
            '51+ Templates', '14 Bio Themes', '30+ Gateways', 'AI Copywriter', 'NFC & QR', 'Custom Domain', 'White Label', 'Multi-Language'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
