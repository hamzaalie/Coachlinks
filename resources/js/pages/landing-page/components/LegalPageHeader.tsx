import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import SiteLogo from './SiteLogo';

interface LegalPageHeaderProps {
  settings?: {
    company_name?: string;
    config_sections?: {
      theme?: {
        logo_light?: string;
        logo_dark?: string;
      };
    };
  };
}

export default function LegalPageHeader({ settings }: LegalPageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* Simple Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <SiteLogo settings={settings} variant="dark" />
          </Link>

          {/* Back to Home */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>
    </header>
  );
}
