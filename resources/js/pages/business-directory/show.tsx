import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Star, Eye, Phone, Mail, Globe, MapPin, Clock, User, CheckCircle, Briefcase, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFavicon } from '@/hooks/use-favicon';
import { motion } from 'framer-motion';
import Header from '../landing-page/components/Header';
import Footer from '../landing-page/components/Footer';

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
  config_sections: any;
  created_at: string;
}

interface Props {
  business: Business;
  settings: any;
  customPages: Array<{ id: number; title: string; slug: string; }>;
}

export default function BusinessDirectoryShow({ business, settings, customPages }: Props) {
  const { t } = useTranslation();
  useFavicon();
  const page = usePage<{ auth: { user?: { id: number } } }>();
  const { auth } = page.props;

  const getBusinessUrl = () => {
    if (business.url_prefix && business.url_prefix !== 'v') {
      return route('public.vcard.show', { prefix: business.url_prefix, slug: business.slug });
    }
    return route('public.vcard.show.direct', { slug: business.slug });
  };

  const contact = business.config_sections?.contact || {};
  const contactInfo = {
    phone: contact.phone,
    email: contact.email,
    website: contact.website,
    address: contact.address || contact.clinic_address,
  };

  const hours = business.config_sections?.business_hours?.hours || [];
  const services = (business.config_sections?.services?.service_list ||
    business.config_sections?.specialties?.specialty_list ||
    business.config_sections?.menu_highlights?.menu_items || []).slice(0, 6);
  const about = business.config_sections?.about || {};

  return (
    <>
      <Head title={`${business.name} - Coach Directory`} />

      <Header settings={settings} isDirectoryContext={true} user={auth.user} />

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: '80px' }}>

        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Link href={route('directory.index')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-violet-300 hover:text-gray-900 transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" />
            {t('Back to Directory')}
          </Link>
        </div>

        {/* Hero */}
        <section className="relative py-10 sm:py-14">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {business.is_verified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />{t('Verified')}
                    </span>
                  )}
                  {business.is_featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />{t('Featured')}
                    </span>
                  )}
                  <span className="inline-flex px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs text-gray-600 font-medium capitalize">
                    {business.business_type.replace(/-/g, ' ')}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{business.name}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {business.rating > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{business.rating}</span>
                      <span className="text-xs text-gray-400">({business.rating_count})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{business.view_count.toLocaleString()} {t('views')}</span>
                  </div>
                </div>

                {business.directory_description && (
                  <p className="text-gray-600 leading-relaxed text-lg max-w-2xl">{business.directory_description}</p>
                )}
              </motion.div>

              {/* Contact card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-5">{t('Contact')}</h3>
                  <div className="space-y-4">
                    {contactInfo.phone && (
                      <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center group-hover:border-violet-300 transition-colors">
                          <Phone className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{contactInfo.phone}</span>
                      </a>
                    )}
                    {contactInfo.email && (
                      <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center group-hover:border-cyan-300 transition-colors">
                          <Mail className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">{contactInfo.email}</span>
                      </a>
                    )}
                    {contactInfo.website && (
                      <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:border-emerald-300 transition-colors">
                          <Globe className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{t('Visit Website')}</span>
                      </a>
                    )}
                    {contactInfo.address && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">{contactInfo.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <button onClick={() => window.open(getBusinessUrl(), '_blank')}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                      <ExternalLink className="w-4 h-4" />
                      {t('View Coach Card')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                {about.description && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
                    <h2 className="flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-5">
                      <User className="w-5 h-5 text-violet-600" />
                      {t('About')}
                    </h2>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed mb-6">{about.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {about.qualifications && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />{t('Qualifications')}
                          </h4>
                          <p className="text-sm text-emerald-600">{about.qualifications}</p>
                        </div>
                      )}
                      {about.experience_years && (
                        <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-700 mb-2 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />{t('Experience')}
                          </h4>
                          <p className="text-sm text-cyan-600">{about.experience_years} {t('years')}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Services */}
                {services.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8">
                    <h2 className="flex items-center gap-2.5 text-lg font-bold text-gray-900 mb-5">
                      <Briefcase className="w-5 h-5 text-violet-600" />
                      {t('Services')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service: any, index: number) => (
                        <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-violet-200 transition-colors">
                          <h4 className="font-semibold text-gray-900 mb-1.5">{service.name || service.title}</h4>
                          {service.description && (
                            <p className="text-sm text-gray-500 leading-relaxed mb-3">{service.description}</p>
                          )}
                          <div className="flex items-center justify-between">
                            {service.price && (
                              <span className="text-sm font-bold text-emerald-600">{service.price}</span>
                            )}
                            {service.duration && (
                              <span className="text-xs text-gray-400">{service.duration}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Business Hours */}
                {hours.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 mb-5">
                      <Clock className="w-4 h-4 text-amber-500" />{t('Hours')}
                    </h3>
                    <div className="space-y-3">
                      {hours.map((hour: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="capitalize text-sm text-gray-600">{hour.day}</span>
                          <span className={`text-sm font-medium ${hour.is_closed ? 'text-red-500' : 'text-emerald-600'}`}>
                            {hour.is_closed ? t('Closed') : `${hour.open_time} - ${hour.close_time}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-5">{t('Quick Actions')}</h3>
                  <div className="space-y-3">
                    <button onClick={() => window.open(getBusinessUrl(), '_blank')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                      <Globe className="w-4 h-4" />{t('View Profile')}
                    </button>
                    {contactInfo.phone && (
                      <a href={`tel:${contactInfo.phone}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:border-violet-200 hover:text-gray-900 transition-all">
                        <Phone className="w-4 h-4" />{t('Call')}
                      </a>
                    )}
                    {contactInfo.email && (
                      <a href={`mailto:${contactInfo.email}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 hover:border-violet-200 hover:text-gray-900 transition-all">
                        <Mail className="w-4 h-4" />{t('Email')}
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer settings={settings} customPages={customPages} isDirectoryContext={true} />
      </div>
    </>
  );
}