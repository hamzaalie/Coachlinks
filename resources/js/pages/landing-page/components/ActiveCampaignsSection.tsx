import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Campaign {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  business: {
    id: number;
    name: string;
    slug: string;
    url_prefix?: string;
    custom_domain?: string;
  };
}

interface ActiveCampaignsSectionProps {
  campaigns: Campaign[];
  settings: any;
  sectionData: any;
  brandColor: string;
}

export default function ActiveCampaignsSection({ campaigns, settings, sectionData, brandColor }: ActiveCampaignsSectionProps) {
  if (!campaigns || campaigns.length === 0) return null;

  const { t } = useTranslation();
  const columns = sectionData?.columns || 3;
  const maxDisplay = sectionData?.max_display || 6;
  const showViewAll = sectionData?.show_view_all || false;

  const displayedCampaigns = campaigns.slice(0, maxDisplay);
  const hasMoreCampaigns = campaigns.length > maxDisplay;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const getDaysRemaining = (endDate: string) => {
    const diffDays = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getBusinessUrl = (business: Campaign['business']) => {
    return business.custom_domain
      ? `https://${business.custom_domain}`
      : (business.url_prefix && business.url_prefix !== ''
        ? route('public.vcard.show', { prefix: business.url_prefix, slug: business.slug }, true)
        : route('public.vcard.show.direct', business.slug, true));
  };

  const title = sectionData?.title || 'Featured Business Promotions';
  const subtitle = sectionData?.subtitle || 'Explore businesses we\'re currently promoting and discover amazing services';

  const getGridColumns = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Promotions
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>

        <div className={`grid ${getGridColumns()} gap-5`}>
          {displayedCampaigns.map((campaign, index) => {
            const daysRemaining = getDaysRemaining(campaign.end_date);
            const businessUrl = getBusinessUrl(campaign.business);

            return (
              <motion.div key={campaign.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{campaign.name}</h3>
                    <p className="text-sm text-slate-400 mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {campaign.description}
                    </p>
                  </div>
                  {daysRemaining > 0 && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 whitespace-nowrap ml-3">
                      {daysRemaining} {t('days left')}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-sm text-slate-400">
                    <MapPin className="h-4 w-4 mr-2 text-violet-400 flex-shrink-0" />
                    <span className="font-medium text-slate-300">{campaign.business.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <Calendar className="h-4 w-4 mr-2 text-violet-400 flex-shrink-0" />
                    <span>{formatDate(campaign.start_date)} - {formatDate(campaign.end_date)}</span>
                  </div>
                  {daysRemaining > 0 && (
                    <div className="flex items-center text-sm text-slate-400">
                      <Clock className="h-4 w-4 mr-2 text-violet-400 flex-shrink-0" />
                      <span>{t('Ends in')} {daysRemaining} {t('day', { count: daysRemaining })}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => window.open(businessUrl, '_blank', 'noopener,noreferrer')}
                  className="w-full text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
                  <span>{t('Visit Business')}</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {showViewAll && hasMoreCampaigns && (
          <div className="text-center mt-10">
            <button className="text-violet-400 px-8 py-3 rounded-xl font-bold border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 transition-all duration-300">
              {t('View All Campaigns')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
