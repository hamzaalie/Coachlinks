import React from 'react';

interface SiteLogoSettings {
  company_name?: string;
  config_sections?: {
    theme?: {
      logo_light?: string;
      logo_dark?: string;
    };
  };
}

interface SiteLogoProps {
  settings?: SiteLogoSettings;
  variant?: 'light' | 'dark';
  className?: string;
  imageClassName?: string;
  fallbackSize?: 'sm' | 'md' | 'lg';
}

const DEFAULT_LOGOS = {
  dark: '/images/logos/logo.png',
  light: '/images/logos/logo-white.png',
};

const getDisplayUrl = (path?: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${window.appSettings?.baseUrl || ''}${path}`;
  return path;
};

export default function SiteLogo({
  settings,
  variant = 'light',
  className = '',
  imageClassName = 'h-10 w-auto max-w-[220px] object-contain',
  fallbackSize = 'md',
}: SiteLogoProps) {
  const theme = settings?.config_sections?.theme;
  const preferredLogo = variant === 'dark' ? theme?.logo_dark : theme?.logo_light;
  const fallbackLogo = variant === 'dark' ? theme?.logo_light : theme?.logo_dark;

  const defaultLogo = getDisplayUrl(variant === 'dark' ? DEFAULT_LOGOS.dark : DEFAULT_LOGOS.light);
  const fallbackLogoSrc = getDisplayUrl(fallbackLogo);
  const preferredLogoSrc = getDisplayUrl(preferredLogo);

  // Prefer configured logos, but gracefully recover if a stored URL is stale/broken.
  const [logoSrc, setLogoSrc] = React.useState(preferredLogoSrc || fallbackLogoSrc || defaultLogo);

  React.useEffect(() => {
    setLogoSrc(preferredLogoSrc || fallbackLogoSrc || defaultLogo);
  }, [preferredLogoSrc, fallbackLogoSrc, defaultLogo]);

  const handleImageError = React.useCallback(() => {
    if (logoSrc === preferredLogoSrc && fallbackLogoSrc) {
      setLogoSrc(fallbackLogoSrc);
      return;
    }

    if (logoSrc !== defaultLogo) {
      setLogoSrc(defaultLogo);
    }
  }, [logoSrc, preferredLogoSrc, fallbackLogoSrc, defaultLogo]);

  return (
    <img
      src={logoSrc}
      onError={handleImageError}
      alt={settings?.company_name || 'Logo'}
      className={`${imageClassName} ${className}`.trim()}
    />
  );
}