import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Testimonial { id: number; name: string; role: string; company?: string; content: string; avatar?: string; rating: number; }

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Sarah Mitchell', role: 'Life Coach', company: 'Clarity Coaching', content: 'CoachLinks completely transformed my online presence. I went from zero to 15 discovery calls per month within 6 weeks. The lead capture tools are absolutely incredible \u2014 they work while I sleep.', rating: 5 },
  { id: 2, name: 'Marcus Chen', role: 'Executive Coach', company: 'Peak Performance', content: 'The coach-specific templates saved me hours. My profile looks like I paid a designer thousands for it. Clients constantly compliment my professional setup. The AI copywriter is a game-changer.', rating: 5 },
  { id: 3, name: 'Elena Rodriguez', role: 'Health & Wellness Coach', content: "I've tried every website builder out there. CoachLinks is the only one that truly understands what coaches need. The booking integration alone is worth 10x the price. I doubled my client base.", rating: 5 },
  { id: 4, name: 'David Park', role: 'Business Coach', company: 'Scale Academy', content: 'The white-label feature lets me run my own branded platform for my coaching agency. My team of 12 coaches all use CoachLinks. The analytics help us optimize everything.', rating: 5 },
  { id: 5, name: 'Amara Johnson', role: 'Career Coach', company: 'PathForward', content: 'From NFC cards at networking events to QR codes on my business cards \u2014 CoachLinks makes sharing my profile effortless. I get compliments and new leads at every event I attend.', rating: 5 },
  { id: 6, name: 'James Wright', role: 'Fitness Coach', content: 'The payment links feature means I can sell coaching packages directly from my profile. No more back-and-forth invoicing. My revenue jumped 60% in the first quarter after switching.', rating: 5 },
  { id: 7, name: 'Priya Sharma', role: 'Mindfulness Coach', company: 'Inner Calm', content: 'My clients love how easy it is to book sessions and access resources through my CoachLinks profile. The mobile experience is flawless. Conversions went up 40% after I switched.', rating: 5 },
  { id: 8, name: 'Tom Haverford', role: 'Sales Coach', company: 'CloseMore', content: "I share my CoachLinks profile after every keynote and workshop. The QR code feature alone has generated 200+ warm leads this year. It's my secret weapon for filling my pipeline.", rating: 5 },
  { id: 9, name: 'Lisa Nguyen', role: 'Relationship Coach', content: 'The analytics dashboard shows me exactly where my leads come from. I optimized my profile based on the data and tripled my inquiry rate in just two months. Incredible platform.', rating: 5 },
  { id: 10, name: 'Rachel Foster', role: 'Productivity Coach', company: 'FocusFlow', content: 'I was spending $300/mo on three different tools for what CoachLinks does in one. The discovery call booking alone replaced Calendly, and the lead magnets replaced my landing page builder entirely.', rating: 5 },
  { id: 11, name: 'Daniel Okafor', role: 'Leadership Coach', company: 'Elevate Leaders', content: 'Our corporate clients are always impressed when they visit my CoachLinks profile. The NFC cards pair perfectly with it. I hand someone my card and they instantly see everything I offer.', rating: 5 },
  { id: 12, name: 'Sophie Duval', role: 'Transformation Coach', content: 'Setting up took 4 minutes. I picked a template, dropped in my programs and testimonials, and was live. The next morning I had 3 discovery call bookings waiting in my inbox.', rating: 5 },
];

interface TestimonialsSectionProps {
  brandColor?: string; testimonials: Testimonial[]; settings?: any;
  sectionData?: { title?: string; subtitle?: string; trust_title?: string;
    trust_stats?: Array<{ value: string; label: string; color: string; }>;
    default_testimonials?: Array<{ name: string; role: string; company?: string; content: string; rating: number; }>;
  };
}

export default function TestimonialsSection({ testimonials, settings, sectionData, brandColor = '#7c3aed' }: TestimonialsSectionProps) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const settingsTestimonials = settings?.config_sections?.sections?.find((section: any) => section.key === 'testimonials')?.testimonials?.map((testimonial: any, index: number) => ({
    id: index + 1, name: testimonial.name, role: testimonial.role, company: testimonial.company,
    content: testimonial.content, rating: testimonial.rating || 5, avatar: testimonial.avatar
  })) || [];

  const defaultTestimonials = sectionData?.default_testimonials?.map((testimonial, index) => ({ id: index + 1, ...testimonial })) || DEFAULT_TESTIMONIALS;
  // Use settings testimonials only if there are at least 3 (otherwise they are placeholder seed data)
  const displayTestimonials = settingsTestimonials.length >= 3 ? settingsTestimonials : (testimonials.length > 0 ? testimonials : defaultTestimonials);

  const perSlide = 3;
  const totalSlides = Math.ceil(displayTestimonials.length / perSlide);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentTestimonials = displayTestimonials.slice(
    currentSlide * perSlide,
    currentSlide * perSlide + perSlide
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? 'fill-current text-amber-400' : 'text-slate-600'}`} />
    ));
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)' }}>
      {/* Accent elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-cyan-600/5 blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-violet-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            {sectionData?.title || (<>Loved by Coaches <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Worldwide</span></>)}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {sectionData?.subtitle || t("Don't just take our word for it. Here's what coaches are saying about CoachLinks.")}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/[0.08] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/30 flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-slate-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/[0.08] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/30 flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>

          {/* Slide container */}
          <div className="overflow-hidden px-1 pt-4 pb-2 -mx-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="group relative p-7 rounded-2xl border border-white/[0.06] bg-[#111127] hover:bg-[#151535] hover:border-violet-500/20 transition-all duration-500 flex flex-col"
                  >
                    {/* Quote accent */}
                    <div className="absolute -top-3 left-7">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                        <Quote className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-4 pt-2">{renderStars(testimonial.rating)}</div>
                    <p className="text-slate-300 mb-6 leading-relaxed text-sm flex-1">&ldquo;{testimonial.content}&rdquo;</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20">
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-violet-400">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-slate-500">
                          {testimonial.role}
                          {testimonial.company && <span> &bull; {testimonial.company}</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? 'w-8 h-2.5 bg-gradient-to-r from-violet-500 to-cyan-500'
                    : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['SM', 'MC', 'ER', 'DP'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border-2 border-[#000000] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-violet-300">{initials}</span>
                </div>
              ))}
            </div>
            <span>Loved by <span className="text-white font-semibold">10,000+</span> coaches</span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
            ))}
            <span className="ml-1"><span className="text-white font-semibold">4.9/5</span> average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
