import { Head, router, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Search, Star, Eye, Phone, Mail, Globe, MapPin, Loader2, ChevronLeft, ChevronRight, ArrowRight, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavicon } from '@/hooks/use-favicon';
import { businessTypeOptions } from '@/pages/vcard-builder/business-templates';
import { motion } from 'framer-motion';
import Header from '../landing-page/components/Header';
import Footer from '../landing-page/components/Footer';

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  clinic_address?: string;
}

interface ConfigSections {
  contact?: ContactInfo;
}

interface Business {
  id: number;
  name: string;
  business_type: string;
  slug: string;
  url_prefix: string;
  is_featured: boolean;
  is_verified: boolean;
  rating: number;
  rating_count: number;
  view_count: number;
  directory_description?: string;
  config_sections: ConfigSections;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface BusinessData {
  data: Business[];
  links: PaginationLink[];
  meta: {
    from?: number;
    to?: number;
    total?: number;
  };
}

interface LandingSettings {
  company_name: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  config_sections?: {
    theme?: {
      primary_color?: string;
      secondary_color?: string;
      accent_color?: string;
    };
  };
}

interface CustomPage {
  id: number;
  title: string;
  slug: string;
}

interface DirectorySettings {
  id?: number;
  title: string;
  description: string;
  menu_items: Record<string, string>[];
  config_sections: {
    theme: { primary_color: string; secondary_color: string; accent_color: string; };
    company?: { name: string; };
    section_order?: string[];
    section_visibility?: Record<string, boolean>;
  };
}

interface Props {
  businesses: BusinessData;
  categories: Array<{ value: string; label: string; count?: number }>;
  filters: { search?: string; category?: string; };
  settings: LandingSettings;
  customPages: CustomPage[];
  directoryCustomPages: CustomPage[];
  directorySettings: DirectorySettings;
}

export default function BusinessDirectory({ businesses, categories, filters, settings, customPages }: Props) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [isLoading, setIsLoading] = useState(false);
  const [catPage, setCatPage] = useState(0);

  useFavicon();
  const page = usePage<{ auth: { user?: { id: number } } }>();
  const { auth } = page.props;

  const handleSearch = () => {
    setIsLoading(true);
    router.get(route('directory.index'), {
      search: searchTerm,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
    }, { onFinish: () => setIsLoading(false) });
  };

  const getBusinessUrl = (business: Business) => {
    if (business.url_prefix && business.url_prefix !== 'v') {
      return route('public.vcard.show', { prefix: business.url_prefix, slug: business.slug });
    }
    return route('public.vcard.show.direct', { slug: business.slug });
  };

  const businessesWithContact = useMemo(() => {
    return businesses.data.map(business => {
      const contact = business.config_sections?.contact || {};
      return {
        ...business,
        contactInfo: {
          phone: contact.phone,
          email: contact.email,
          website: contact.website,
          address: contact.address || contact.clinic_address,
        }
      };
    });
  }, [businesses.data]);

  const CATS_PER_PAGE = 6;
  const totalCatPages = Math.ceil(categories.length / CATS_PER_PAGE);
  const visibleCats = categories.slice(catPage * CATS_PER_PAGE, (catPage + 1) * CATS_PER_PAGE);

  return (
    <>
      <Head title={t("Coach Directory")} />

      <Header settings={settings} isDirectoryContext={true} user={auth.user} />

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: '80px' }}>

        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-[#000000]">
          {/* Ambient background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            {/* Primary glow */}
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent 65%)' }} />
            {/* Secondary glow */}
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.07, 0.04] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -bottom-20 -right-20 w-[600px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, #06b6d4, transparent 65%)' }} />
            {/* Accent glow */}
            <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
              className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, #10b981, transparent 65%)' }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.5 }}
              className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-slate-300">
                  <span className="text-white font-bold">{businesses.meta?.total || 0}+</span> {t('coaches in our network')}
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <span className="text-white">{t('Discover')}{' '}</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('Top Coaches')}
                </span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full origin-left"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }} />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('Browse our curated directory of verified coaches. Find the expertise you need to accelerate your growth.')}
            </motion.p>

            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-3xl mx-auto">
              <div className="relative flex flex-col sm:flex-row gap-3 p-2.5 rounded-2xl bg-[#111127]/80 border border-white/[0.08] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="text" placeholder={t("Search coaches, specialties...")} value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-500 text-base focus:outline-none rounded-xl" />
                </div>
                <div className="relative">
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none w-full sm:w-48 px-4 py-3.5 bg-[#0a0a1e] border border-white/[0.06] rounded-xl text-slate-300 text-sm focus:outline-none focus:border-violet-500/30 cursor-pointer">
                    <option value="all">{t("All Types")}</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
                <button onClick={handleSearch} disabled={isLoading}
                  className="group px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] disabled:opacity-50 disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4" />{t('Search')}
                    </span>
                  )}
                </button>
              </div>

              {/* Active filter chips */}
              {(searchTerm || selectedCategory !== 'all') && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-3 mt-5">
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm">
                      "{searchTerm}"
                      <button onClick={() => { setSearchTerm(''); handleSearch(); }} className="hover:text-white ml-1">×</button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                      {categories.find(c => c.value === selectedCategory)?.label}
                      <button onClick={() => { setSelectedCategory('all'); handleSearch(); }} className="hover:text-white ml-1">×</button>
                    </span>
                  )}
                  <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setIsLoading(true); router.get(route('directory.index'), {}, { onFinish: () => setIsLoading(false) }); }}
                    className="text-sm text-slate-500 hover:text-white transition-colors">
                    {t('Clear all')}
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Quick category pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mt-10 max-w-2xl mx-auto">
              {categories.slice(0, 5).map((cat) => {
                const icon = businessTypeOptions.find(bt => bt.value === cat.value)?.icon || '🏢';
                return (
                  <button key={cat.value} onClick={() => { setSelectedCategory(cat.value); handleSearch(); }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      selectedCategory === cat.value
                        ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]'
                    }`}>
                    <span className="text-base">{icon}</span>{cat.label}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t('Browse by Specialty')}</h2>
              <p className="text-gray-500 text-sm">{t('Explore coaches across different areas of expertise')}</p>
            </div>

            <div className="relative">
              {catPage > 0 && (
                <button onClick={() => setCatPage(p => p - 1)}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-violet-300 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {visibleCats.map((category, i) => {
                  const icon = businessTypeOptions.find(bt => bt.value === category.value)?.icon || '🏢';
                  const isActive = selectedCategory === category.value;
                  return (
                    <motion.button key={category.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => { setSelectedCategory(category.value); handleSearch(); }}
                      className={`group relative p-5 rounded-2xl border text-center transition-all duration-300 ${
                        isActive ? 'bg-violet-50 border-violet-300 shadow-md' : 'bg-white border-gray-200 hover:border-violet-200 hover:shadow-md'
                      }`}>
                      <div className="text-3xl mb-3">{icon}</div>
                      <div className={`text-sm font-medium mb-1 ${isActive ? 'text-violet-700' : 'text-gray-700 group-hover:text-gray-900'} transition-colors`}>
                        {category.label}
                      </div>
                      <div className="text-xs text-gray-400">{category.count || 0}</div>
                    </motion.button>
                  );
                })}
              </div>

              {catPage < totalCatPages - 1 && (
                <button onClick={() => setCatPage(p => p + 1)}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-violet-300 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {totalCatPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalCatPages }).map((_, i) => (
                  <button key={i} onClick={() => setCatPage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === catPage ? 'bg-violet-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="relative py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {businesses.data?.length > 0
                    ? (selectedCategory !== 'all' || searchTerm ? t('Search Results') : t('Featured Coaches'))
                    : t('No Results Found')}
                </h2>
                <p className="text-gray-500 text-sm">
                  {businesses.data?.length > 0
                    ? `${t('Showing')} ${businesses.meta?.from || 1}–${businesses.meta?.to || businesses.data.length} ${t('of')} ${businesses.meta?.total || businesses.data.length}`
                    : t('Try adjusting your search criteria')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {businessesWithContact.map((business, i) => (
                <motion.div key={business.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-violet-300 transition-all duration-300 hover:shadow-lg">
                  {business.is_featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                        <Star className="w-3 h-3 fill-amber-400" />{t('Featured')}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors truncate">{business.name}</h3>
                        {business.is_verified && (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200" title="Verified">
                            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="inline-flex px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-xs text-gray-600 font-medium capitalize">
                        {business.business_type.replace(/-/g, ' ')}
                      </span>
                    </div>

                    {business.rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3.5 h-3.5 ${j < Math.floor(business.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{business.rating}</span>
                        <span className="text-xs text-gray-400">({business.rating_count})</span>
                      </div>
                    )}

                    {business.directory_description && (
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-5">{business.directory_description}</p>
                    )}

                    <div className="space-y-2.5 mb-5">
                      {business.contactInfo.phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600">{business.contactInfo.phone}</span>
                        </div>
                      )}
                      {business.contactInfo.email && (
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600 truncate">{business.contactInfo.email}</span>
                        </div>
                      )}
                      {business.contactInfo.address && (
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600 line-clamp-1">{business.contactInfo.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Eye className="w-3.5 h-3.5" />{business.view_count.toLocaleString()} {t('views')}
                      </div>
                      <div className="flex gap-2">
                        <a href={getBusinessUrl(business)} target="_blank" rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all">
                          <Globe className="w-3.5 h-3.5 inline mr-1.5" />{t('Card')}
                        </a>
                        <button onClick={() => router.visit(route('directory.show', { business: business.id }))}
                          className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                          style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                          {t('View')}<ArrowRight className="w-3.5 h-3.5 inline ml-1.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {businesses.data.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('No coaches found')}</h3>
                <p className="text-gray-500 mb-6">{t('Try different search terms or browse all categories')}</p>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setIsLoading(true); router.get(route('directory.index'), {}, { onFinish: () => setIsLoading(false) }); }}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                  {t('Browse All')}
                </button>
              </div>
            )}

            {businesses.links && businesses.links.length > 3 && (
              <div className="flex justify-center items-center mt-14 gap-2">
                {businesses.links.map((link, index) => {
                  const isActive = link.active;
                  const isDisabled = !link.url;
                  const isPrevious = link.label.includes('Previous') || link.label.includes('&laquo;');
                  const isNext = link.label.includes('Next') || link.label.includes('&raquo;');
                  const isNumber = !isPrevious && !isNext && link.label.match(/^\d+$/);

                  if (isPrevious) return (
                    <button key={index} disabled={isDisabled} onClick={() => link.url && router.visit(link.url)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-violet-300 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                      <ChevronLeft className="w-4 h-4" />{t('Prev')}
                    </button>
                  );
                  if (isNext) return (
                    <button key={index} disabled={isDisabled} onClick={() => link.url && router.visit(link.url)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-violet-300 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm">
                      {t('Next')}<ChevronRight className="w-4 h-4" />
                    </button>
                  );
                  if (isNumber) return (
                    <button key={index} disabled={isDisabled} onClick={() => link.url && router.visit(link.url)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all shadow-sm ${
                        isActive ? 'text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'text-gray-600 bg-white border border-gray-200 hover:border-violet-300 hover:text-gray-900'
                      }`}
                      style={isActive ? { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' } : {}}>
                      {link.label}
                    </button>
                  );
                  if (link.label === '...') return <span key={index} className="px-2 text-gray-400">•••</span>;
                  return null;
                })}
              </div>
            )}
          </div>
        </section>

        <Footer settings={settings} customPages={customPages} isDirectoryContext={true} />
      </div>
    </>
  );
}