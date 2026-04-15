import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SiteLogo from './SiteLogo';

interface FooterProps {
  brandColor?: string;
  settings: {
    company_name: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    config_sections?: {
      theme?: {
        logo_light?: string;
        logo_dark?: string;
      };
    };
  };
  sectionData?: {
    description?: string;
    social_links?: Array<{ name: string; icon: string; href: string; }>;
  };
  customPages?: Array<{ id: number; title: string; slug: string; }>;
  isDirectoryContext?: boolean;
}

const HEADER_OFFSET = 80;

export default function Footer({ settings, sectionData = {}, brandColor = '#7c3aed', customPages = [], isDirectoryContext = false }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isDirectoryContext) {
      window.location.href = route('home') + href;
      return;
    }
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Map legal page slugs to labels
  const legalSlugs: Record<string, string> = {
    'privacy-policy': 'Privacy Policy',
    'terms-and-conditions': 'Terms & Conditions',
    'refund-policy': 'Refund Policy',
    'privacy': 'Privacy Policy',
    'terms': 'Terms & Conditions',
    'refund': 'Refund Policy',
  };

  // Find legal pages from customPages
  const legalPages = customPages.filter(p => {
    const slug = p.slug.toLowerCase();
    return slug.includes('privacy') || slug.includes('terms') || slug.includes('refund') || slug.includes('policy');
  });

  const iconMap: Record<string, any> = { Facebook, Twitter, Linkedin, Instagram };
  const socialLinks = sectionData.social_links || [
    { name: 'Facebook', icon: 'Facebook', href: '#' }, { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' }, { name: 'Instagram', icon: 'Instagram', href: '#' }
  ];

  return (
    <footer className="relative" style={{ background: '#000000' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14">
          <div className="grid lg:grid-cols-5 gap-10 sm:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              {isDirectoryContext ? (
                <Link href={route('home')} className="inline-block mb-5">
                  <SiteLogo settings={settings} variant="light" />
                </Link>
              ) : (
                <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="inline-block mb-5">
                  <SiteLogo settings={settings} variant="light" />
                </a>
              )}
              <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                {sectionData.description || t('The #1 digital identity and lead generation platform built exclusively for coaches. Build, share, and grow.')}
              </p>
              <div className="space-y-2.5">
                {settings.contact_email && (
                  <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[#111127] border border-white/[0.06] flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <span className="text-slate-500 text-sm group-hover:text-slate-300 transition-colors">{settings.contact_email}</span>
                  </a>
                )}
                {settings.contact_phone && (
                  <a href={`tel:${settings.contact_phone}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[#111127] border border-white/[0.06] flex items-center justify-center group-hover:border-violet-500/30 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <span className="text-slate-500 text-sm group-hover:text-slate-300 transition-colors">{settings.contact_phone}</span>
                  </a>
                )}
                {settings.contact_address && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#111127] border border-white/[0.06] flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <span className="text-slate-500 text-sm">{settings.contact_address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">{t('Navigate')}</h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => scrollTo(e, link.href)}
                      className="text-slate-500 hover:text-violet-400 transition-colors text-sm">
                      {t(link.name)}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href={route('directory.index')}
                    className="text-slate-500 hover:text-violet-400 transition-colors text-sm">
                    {t('Directory')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">{t('Legal')}</h3>
              <ul className="space-y-2.5">
                {legalPages.length > 0 ? (
                  legalPages.map((page) => (
                    <li key={page.id}>
                      <Link href={route('custom-page.show', page.slug)}
                        className="text-slate-500 hover:text-violet-400 transition-colors text-sm">
                        {page.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li><a href="#" className="text-slate-500 hover:text-violet-400 transition-colors text-sm">{t('Privacy Policy')}</a></li>
                    <li><a href="#" className="text-slate-500 hover:text-violet-400 transition-colors text-sm">{t('Terms of Service')}</a></li>
                    <li><a href="#" className="text-slate-500 hover:text-violet-400 transition-colors text-sm">{t('Refund Policy')}</a></li>
                  </>
                )}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">{t('Connect')}</h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon] || Facebook;
                  return (
                    <a key={social.name} href={social.href} aria-label={social.name}
                      className="w-9 h-9 rounded-lg bg-[#111127] border border-white/[0.04] flex items-center justify-center hover:bg-violet-500/10 hover:border-violet-500/20 transition-all duration-300 group">
                      <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 text-xs">
              {String.fromCharCode(169)} {currentYear} {settings.company_name}. {t("All rights reserved.")}
            </div>
            <div className="flex items-center gap-4">
              {legalPages.map((page) => (
                <Link key={page.id} href={route('custom-page.show', page.slug)}
                  className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
