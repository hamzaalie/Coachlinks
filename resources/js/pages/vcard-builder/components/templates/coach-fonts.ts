/**
 * Modern Google Fonts configuration for coach templates.
 * Each template gets a unique heading + body font pairing for a premium feel.
 * Fonts are loaded via Google Fonts CDN on first use.
 */

// Track which fonts have already been loaded to avoid duplicates
const loadedFonts = new Set<string>();

/**
 * Inject a Google Fonts stylesheet link into the document head.
 * Only loads each font URL once per session.
 */
export function loadGoogleFont(fontFamily: string, weights: string = '400;500;600;700;800') {
  const fontKey = `${fontFamily}:${weights}`;
  if (loadedFonts.has(fontKey) || typeof document === 'undefined') return;
  loadedFonts.add(fontKey);

  const encoded = fontFamily.replace(/\s+/g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
}

/**
 * Load multiple Google Fonts at once.
 */
export function loadGoogleFonts(fonts: Array<{ family: string; weights?: string }>) {
  fonts.forEach(f => loadGoogleFont(f.family, f.weights));
}

// ─── Font pairings per template ──────────────────────────────────────────────

export interface CoachFontPair {
  heading: string;
  body: string;
  headingRaw: string;   // raw Google Font name (for CSS injection)
  bodyRaw: string;       // raw Google Font name
  loadFonts: () => void;
}

function pair(
  headingFamily: string,
  bodyFamily: string,
  headingWeights = '400;500;600;700;800',
  bodyWeights = '400;500;600;700'
): CoachFontPair {
  return {
    heading: `'${headingFamily}', sans-serif`,
    body: `'${bodyFamily}', sans-serif`,
    headingRaw: headingFamily,
    bodyRaw: bodyFamily,
    loadFonts: () => {
      loadGoogleFont(headingFamily, headingWeights);
      loadGoogleFont(bodyFamily, bodyWeights);
    }
  };
}

/**
 * Modern font pairings for each coach template.
 * Heading fonts: premium display/serif fonts for impact
 * Body fonts: clean, highly-readable sans-serifs
 */
export const coachFonts: Record<string, CoachFontPair> = {
  // Business Coach – authoritative + clean
  'business-coach': pair('Plus Jakarta Sans', 'DM Sans'),

  // Health & Wellness – organic + calm
  'health-wellness-coach': pair('Outfit', 'Nunito Sans'),

  // Relationship Coach – warm + elegant
  'relationship-coach': pair('Playfair Display', 'Lato', '400;500;600;700;800', '300;400;500;700'),

  // Career Coach – modern + structured
  'career-coach': pair('Space Grotesk', 'Inter'),

  // Mindset Coach – contemplative + clean
  'mindset-coach': pair('Sora', 'DM Sans'),

  // Financial Coach – trustworthy + solid
  'financial-coach': pair('Instrument Sans', 'Inter'),

  // Spiritual Coach – ethereal + elegant
  'spiritual-coach': pair('Cormorant Garamond', 'Nunito Sans', '400;500;600;700', '300;400;500;600;700'),

  // Fitness Coach – bold + energetic
  'fitness-coach': pair('Bebas Neue', 'Outfit', '400', '400;500;600;700'),

  // Parenting Coach – friendly + approachable
  'parenting-coach': pair('Outfit', 'DM Sans'),

  // Sales Coach – powerful + dynamic
  'sales-coach': pair('Plus Jakarta Sans', 'Inter'),

  // Nutrition Coach – fresh + natural
  'nutrition-coach': pair('Outfit', 'Nunito'),

  // Leadership Coach – commanding + refined
  'leadership-coach': pair('Instrument Serif', 'Inter', '400', '400;500;600;700'),

  // Speaking Coach – expressive + bold
  'speaking-coach': pair('Sora', 'DM Sans'),

  // Confidence Coach – strong + uplifting
  'confidence-coach': pair('Plus Jakarta Sans', 'Outfit'),

  // Accountability Coach – structured + dependable
  'accountability-coach': pair('Space Grotesk', 'Inter'),

  // Transition Coach – transformative + graceful
  'transition-coach': pair('Playfair Display', 'DM Sans', '400;500;600;700;800', '400;500;600;700'),

  // ADHD Coach – energetic + playful
  'adhd-coach': pair('Sora', 'Nunito'),

  // Executive Coach – premium + authoritative
  'executive-coach': pair('Instrument Serif', 'DM Sans', '400', '400;500;600;700'),

  // Dating Coach – stylish + confident
  'dating-coach': pair('Plus Jakarta Sans', 'Lato', '400;500;600;700;800', '300;400;500;700'),

  // Productivity Coach – efficient + minimal
  'productivity-coach': pair('Space Grotesk', 'Inter'),

  // Performance Coach – powerful + athletic
  'performance-coach': pair('Bebas Neue', 'DM Sans', '400', '400;500;600;700'),

  // Empowerment Coach – bold + inspiring
  'empowerment-coach': pair('Playfair Display', 'Outfit', '400;500;600;700;800', '400;500;600;700'),

  // Burnout Coach – calming + gentle
  'burnout-coach': pair('Outfit', 'Nunito Sans'),

  // Youth Coach – vibrant + modern
  'youth-coach': pair('Sora', 'Outfit'),

  // Couples Coach – romantic + warm
  'couples-coach': pair('Cormorant Garamond', 'Lato', '400;500;600;700', '300;400;500;700'),

  // Grief Coach – dignified + compassionate
  'grief-coach': pair('Instrument Serif', 'Nunito Sans', '400', '300;400;500;600;700'),

  // Creativity Coach – expressive + artistic
  'creativity-coach': pair('Clash Display', 'DM Sans', '400;500;600;700', '400;500;600;700'),

  // Communication Coach – clear + professional
  'communication-coach': pair('Plus Jakarta Sans', 'Inter'),

  // Money Mindset Coach – premium + confident
  'money-mindset-coach': pair('Instrument Serif', 'DM Sans', '400', '400;500;600;700'),

  // Life Coach – versatile + inspiring
  'life-coach': pair('Sora', 'DM Sans'),

  // Generic coach fallback
  'coach': pair('Plus Jakarta Sans', 'DM Sans'),
};

/**
 * Get the font pair for a given coaching template, with fallback.
 */
export function getCoachFonts(businessType?: string): CoachFontPair {
  if (businessType && coachFonts[businessType]) {
    return coachFonts[businessType];
  }
  return coachFonts['coach'];
}
