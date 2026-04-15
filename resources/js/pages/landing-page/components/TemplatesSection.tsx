import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBusinessTemplate, businessTypeOptions } from '@/pages/vcard-builder/business-templates';


interface Template {
  name: string;
  category: string;
}

interface TemplatesSectionProps {
  sectionData: {
    title: string;
    subtitle: string;
    background_color: string;
    layout: string;
    columns: number;
    templates_list: Template[];
    cta_text: string;
    cta_link: string;
  };
}

export default function TemplatesSection({ sectionData }: TemplatesSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    title = 'Explore Our Templates',
    subtitle = 'Choose from our professionally designed coaching templates. Pick one, customize it, and launch your page in minutes.',
    layout = 'carousel',
    templates_list = [],
    cta_text = 'View All Templates',
    cta_link = '#'
  } = sectionData || {};

  // Only show coaching templates
  const coachTemplates = templates_list.filter(t => t.category === 'coaching');

  const templatesPerSlide = 5;
  const totalSlides = Math.ceil(coachTemplates.length / templatesPerSlide);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const openPreview = (templateName: string) => {
    const templateData = getBusinessTemplate(templateName);
    localStorage.setItem('vcard_preview_data', JSON.stringify({
      business_type: templateName,
      name: templateData?.defaultData?.header?.name || 'Business Name',
      slug: 'preview',
      config_sections: templateData?.defaultData || {}
    }));
    window.open(route('vcard.preview'), '_blank');
  };

  const categoryColors: Record<string, { bg: string; text: string }> = {
    professional: { bg: 'bg-violet-500/15', text: 'text-violet-400' },
    medical: { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
    food: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
    business: { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
    health: { bg: 'bg-pink-500/15', text: 'text-pink-400' },
    creative: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-400' },
    beauty: { bg: 'bg-rose-500/15', text: 'text-rose-400' },
    services: { bg: 'bg-blue-500/15', text: 'text-blue-400' },
    technology: { bg: 'bg-indigo-500/15', text: 'text-indigo-400' },
    coaching: { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  };

  const coachGradients: Record<string, string> = {
    'business-coach': 'from-blue-600 via-indigo-600 to-violet-700',
    'health-wellness-coach': 'from-emerald-500 via-teal-500 to-cyan-600',
    'relationship-coach': 'from-pink-500 via-rose-500 to-red-600',
    'career-coach': 'from-sky-500 via-blue-600 to-indigo-700',
    'mindset-coach': 'from-purple-500 via-violet-600 to-indigo-700',
    'financial-coach': 'from-amber-500 via-yellow-500 to-orange-600',
    'spiritual-coach': 'from-violet-400 via-purple-500 to-fuchsia-600',
    'fitness-coach': 'from-red-500 via-orange-500 to-amber-600',
    'parenting-coach': 'from-sky-400 via-blue-500 to-indigo-600',
    'sales-coach': 'from-emerald-500 via-green-600 to-teal-700',
    'nutrition-coach': 'from-lime-500 via-green-500 to-emerald-600',
    'leadership-coach': 'from-slate-600 via-blue-700 to-indigo-800',
    'speaking-coach': 'from-orange-500 via-red-500 to-rose-600',
    'confidence-coach': 'from-amber-400 via-orange-500 to-red-600',
    'accountability-coach': 'from-teal-500 via-cyan-600 to-blue-700',
    'transition-coach': 'from-violet-500 via-purple-500 to-pink-600',
    'adhd-coach': 'from-yellow-400 via-amber-500 to-orange-600',
    'executive-coach': 'from-gray-700 via-slate-800 to-zinc-900',
    'dating-coach': 'from-rose-400 via-pink-500 to-fuchsia-600',
    'productivity-coach': 'from-blue-500 via-cyan-500 to-teal-600',
    'performance-coach': 'from-red-600 via-orange-600 to-amber-600',
    'empowerment-coach': 'from-fuchsia-500 via-purple-500 to-violet-600',
    'burnout-coach': 'from-green-400 via-emerald-500 to-teal-600',
    'youth-coach': 'from-cyan-400 via-blue-500 to-indigo-600',
    'couples-coach': 'from-rose-500 via-pink-500 to-red-500',
    'grief-coach': 'from-slate-500 via-blue-600 to-indigo-700',
    'creativity-coach': 'from-fuchsia-400 via-pink-500 to-rose-600',
    'communication-coach': 'from-sky-500 via-blue-500 to-violet-600',
    'money-mindset-coach': 'from-yellow-500 via-amber-500 to-orange-600',
  };

  const getTemplateIcon = (name: string): string => {
    const opt = businessTypeOptions.find(o => o.value === name);
    return opt?.icon || '🎯';
  };

  const TemplateCard = ({ template }: { template: Template }) => {
    const colors = categoryColors[template.category] || categoryColors.professional;
    const isCoachTemplate = template.category === 'coaching';
    const gradient = coachGradients[template.name] || 'from-violet-600 via-indigo-600 to-purple-700';
    const icon = getTemplateIcon(template.name);

    const getDescription = (t: Template) => {
      if (t.category === 'coaching') return 'Coach-specific professional template';
      if (t.category === 'business') return 'Professional business design';
      if (t.category === 'creative') return 'Creative and unique layout';
      if (t.category === 'technology') return 'Modern tech-focused style';
      if (t.category === 'medical') return 'Healthcare professional template';
      if (t.category === 'food') return 'Restaurant & food service';
      return 'Professionally crafted template';
    };

    return (
      <div
        className="group relative rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 overflow-hidden cursor-pointer"
        onClick={() => openPreview(template.name)}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/[0.04] group-hover:to-cyan-600/[0.04] transition-all duration-500 z-[1]" />

        {/* Image / Gradient Placeholder */}
        <div className="relative pt-[80%] overflow-hidden bg-gradient-to-br from-[#111127] to-[#0d0d20]">
          {isCoachTemplate ? (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 p-4`}>
              <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{icon}</span>
              <span className="text-white/90 font-bold text-sm text-center capitalize leading-tight drop-shadow-md">
                {template.name.replace(/-/g, ' ')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold text-white/90 uppercase tracking-wider">
                Coach
              </div>
            </div>
          ) : (
            <img
              src={`https://demo.workdo.io/vcard-saas/storage/images/business-template/${template.name}.png`}
              alt={`${template.name} template`}
              className="absolute inset-0 w-full h-full object-top object-cover hover:object-bottom transition-all duration-[4000ms]"
              onError={(e) => {
                e.currentTarget.src = `https://demo.workdo.io/vcard-saas/storage/images/business-template/freelancer.png`;
              }}
            />
          )}
        </div>

        {/* Info */}
        <div className="relative z-[2] p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-white capitalize leading-tight">
              {template.name.replace(/-/g, ' ')}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0 ml-2 ${colors.bg} ${colors.text}`}>
              {template.category}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            {getDescription(template)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="templates" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#000000' }}>
      {/* Background accents */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-violet-600/8 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            <Layout className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Templates
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {title || (<>Explore Our <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Templates</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Carousel layout */}
        {(layout === 'carousel' || layout === 'slider') && (
          <div className="relative mb-14">
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl bg-[#111127] border border-white/[0.06] flex items-center justify-center hover:border-violet-500/30 hover:bg-[#151535] transition-all duration-300 shadow-lg shadow-black/30"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-300" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl bg-[#111127] border border-white/[0.06] flex items-center justify-center hover:border-violet-500/30 hover:bg-[#151535] transition-all duration-300 shadow-lg shadow-black/30"
                >
                  <ChevronRight className="h-5 w-5 text-slate-300" />
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                  const slideTemplates = coachTemplates.slice(
                    slideIndex * templatesPerSlide,
                    (slideIndex + 1) * templatesPerSlide
                  );

                  return (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
                        {slideTemplates.map((template, index) => (
                          <TemplateCard key={`${slideIndex}-${index}`} template={template} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'w-8 bg-gradient-to-r from-violet-500 to-cyan-500'
                        : 'w-2 bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grid layout */}
        {layout === 'grid' && (
          <div className="mb-14">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coachTemplates
                .filter(template => template && template.name)
                .map((template, index) => (
                  <TemplateCard key={index} template={template} />
                ))}
            </div>
          </div>
        )}

        {/* List layout */}
        {layout === 'list' && (
          <div className="mb-14">
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coachTemplates
                .filter(template => template && template.name)
                .map((template, index) => (
                  <TemplateCard key={index} template={template} />
                ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {cta_text && cta_link && cta_link !== '#' && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center">
            <Link
              href={cta_link}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-600/25 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              <Sparkles className="w-5 h-5" />
              {cta_text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}