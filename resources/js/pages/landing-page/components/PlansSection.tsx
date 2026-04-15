import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, X, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const encryptPlanId = (planId: number): string => {
  const key = 'CoachLinks2026';
  const str = planId.toString();
  let encrypted = '';
  for (let i = 0; i < str.length; i++) {
    encrypted += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encrypted);
};

interface Plan {
  id: number; name: string; description: string; price: number; yearly_price?: number;
  duration: string; features?: string[]; is_popular?: boolean; is_plan_enable: string;
  stats?: { businesses?: number; users?: number; storage?: string; templates?: number; bio_links?: number; bio_links_templates?: number; addons?: number; addon_names?: string[]; };
}

interface PlansSectionProps {
  brandColor?: string; plans: Plan[]; settings?: any;
  sectionData?: { title?: string; subtitle?: string; faq_text?: string; };
}

function PlansSection({ plans, settings, sectionData, brandColor = '#7c3aed' }: PlansSectionProps) {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const enabledPlans = plans.filter(plan => {
    if (plan.is_plan_enable !== 'on') return false;
    const billingType = billingCycle === 'yearly' ? 'yearly' : 'monthly';
    return plan.duration === billingType || plan.duration === 'both';
  });

  const defaultPlans: Plan[] = [
    { id: 1, name: 'Starter', description: 'Basic plan for small businesses just getting started', price: 5, yearly_price: 60, duration: 'both',
      features: ['1 Business Card', '1 Bio Link Page', '2 Team Users', '1 GB Storage', 'All 60+ Business Themes', '14 Bio Link Themes', 'Basic Template Sections (15)', 'QR Code Sharing', 'Mobile Responsive', 'Platform Branding'], 
      stats: { businesses: 1, users: 2, storage: '1 GB', templates: 60, bio_links: 1, bio_links_templates: 14, addons: 0 },
      is_popular: false, is_plan_enable: 'on' },
    { id: 2, name: 'Professional', description: 'Perfect for small businesses looking to grow their online presence', price: 19.99, yearly_price: 239.88, duration: 'both',
      features: ['5 Business Cards', '3 Bio Link Pages', '10 Team Users', '5 GB Storage', 'Custom Domain Support', 'Custom Subdomain', 'PWA (Progressive Web App)', 'All 60+ Business Themes', '14 Bio Link Themes', 'No Branding (White-label)', 'Priority Email Support'], 
      stats: { businesses: 5, users: 10, storage: '5 GB', templates: 60, bio_links: 3, bio_links_templates: 14, addons: 0 },
      is_popular: true, is_plan_enable: 'on' },
    { id: 3, name: 'Pro', description: 'Ideal for growing businesses with multiple stores and advanced needs', price: 49.99, yearly_price: 599.88, duration: 'both',
      features: ['20 Business Cards', '10 Bio Link Pages', '50 Team Users', '50 GB Storage', 'Custom Domain Support', 'Custom Subdomain', 'PWA (Progressive Web App)', 'AI Integration (ChatGPT)', 'All 60+ Business Themes', '14 Bio Link Themes', 'All Template Sections (30+)', 'No Branding (White-label)', 'Priority Support'], 
      stats: { businesses: 20, users: 50, storage: '50 GB', templates: 60, bio_links: 10, bio_links_templates: 14, addons: 0 },
      is_popular: false, is_plan_enable: 'on' }
  ];

  const displayPlans = enabledPlans.length > 0 ? enabledPlans : defaultPlans;

  const formatCurrency = (amount: string | number) => {
    if (typeof window !== 'undefined' && window.appSettings?.formatCurrency) {
      const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount);
      return window.appSettings.formatCurrency(numericAmount, { showSymbol: true });
    }
    return amount;
  };

  const getPrice = React.useCallback((plan: Plan) => {
    if (billingCycle === 'yearly' && plan.yearly_price !== undefined) return plan.yearly_price;
    return plan.price;
  }, [billingCycle]);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#000000' }}>
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute top-20 left-0 w-80 h-80 rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>Choose Your <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Perfect Plan</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {sectionData?.subtitle || t('Start growing your business today. All plans include powerful features with no setup fees.')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#111127] border border-white/[0.08]">
            <button onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'}`}>
              {t("Monthly")}
            </button>
            <button onClick={() => setBillingCycle('yearly')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingCycle === 'yearly' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' : 'text-slate-400 hover:text-white'}`}>
              {t("Yearly")}
              <span className="absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">Save 28%+</span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPlans.map((plan, index) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`group relative flex flex-col rounded-2xl border transition-all duration-500 ${plan.is_popular ? 'border-violet-500/30 bg-[#13132f] shadow-[0_0_60px_rgba(124,58,237,0.15)] lg:scale-[1.04]' : 'border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-white/[0.12]'}`}>
              {/* Popular glow gradient */}
              {plan.is_popular && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/20 via-transparent to-cyan-500/10 pointer-events-none" />
              )}
              {/* Popular badge */}
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("Most Popular")}
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full p-8 pt-10">
                {/* Plan name + price */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {getPrice(plan) === 0 ? formatCurrency(0) : formatCurrency(getPrice(plan))}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Usage Stats */}
                {plan.stats && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t("Usage Limits")}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: plan.stats.businesses, label: t('Businesses') },
                        { val: plan.stats.users, label: t('Users') },
                        { val: plan.stats.storage, label: t('Storage') },
                        { val: plan.stats.templates || '34', label: t('Templates') },
                        { val: plan.stats.bio_links, label: t('Bio Links') },
                        { val: plan.stats.bio_links_templates || '14', label: t('Bio Templates') }
                      ].map((s, i) => (
                        <div key={i} className="text-center p-2.5 rounded-lg bg-[#0d0d20] border border-white/[0.04]">
                          <div className="text-sm font-bold text-violet-400">{s.val || 'N/A'}</div>
                          <div className="text-[11px] text-slate-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {plan.stats?.addons > 0 && plan.stats?.addon_names && plan.stats.addon_names.length > 0 && (
                      <div className="mt-3 p-3 rounded-lg bg-[#0d0d20] border border-white/[0.04]">
                        <div className="text-xs font-semibold text-violet-400 mb-2">{t("Included Addons")} ({plan.stats.addons})</div>
                        <div className="flex flex-wrap gap-1">
                          {plan.stats.addon_names.map((name, i) => (
                            <span key={i} className="inline-block px-2 py-0.5 rounded text-[10px] font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20">{name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                <div className="mb-8 flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{t("What's Included")}</h4>
                  <ul className="space-y-3">
                    {(plan.features || []).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/15 flex items-center justify-center">
                          <Check className="h-3 w-3 text-violet-400" />
                        </div>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link href={route('register', { plan: encryptPlanId(plan.id) })}
                    className={`group/btn block w-full text-center py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${plan.is_popular ? 'text-white shadow-lg shadow-violet-600/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-[1.02]' : 'text-white bg-[#1a1a3a] border border-white/10 hover:bg-[#222250] hover:border-white/20'}`}
                    style={plan.is_popular ? { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' } : {}}>
                    {plan.is_popular && <Zap className="w-4 h-4 inline-block mr-1.5" />}
                    {t('Get Started')}
                    <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom guarantee */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Check className="w-3.5 h-3.5" /> Instant onboarding
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <Check className="w-3.5 h-3.5 text-slate-500" /> Flexible billing
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <Check className="w-3.5 h-3.5 text-slate-500" /> Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PlansSection;
