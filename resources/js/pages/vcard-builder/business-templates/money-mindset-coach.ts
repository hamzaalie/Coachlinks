import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const moneyMindsetCoachTemplate = {
  name: 'Money Mindset & Abundance Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Abundance Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Abundance Tagline' },
        { name: 'profile_image', type: 'file', label: 'Coach Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Website' },
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Abundance Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Money Mindset Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Abundance Mission' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Abundance Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Wealth Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Mastermind' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Abundance Retreat' },
              { value: 'online', label: 'Online Course' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Abundance Program',
      fields: [
        { name: 'offer_title', type: 'text', label: 'Signature Program Name' },
        { name: 'offer_description', type: 'textarea', label: 'Program Description' },
        { name: 'offer_price', type: 'text', label: 'Investment' },
        { name: 'offer_includes', type: 'textarea', label: 'What\'s Included' },
        { name: 'offer_url', type: 'url', label: 'Program URL' },
        { name: 'offer_cta', type: 'text', label: 'Call to Action' }
      ],
      required: false
    },
    {
      key: 'results',
      name: 'Abundance Results',
      fields: [
        {
          name: 'executive_results',
          type: 'repeater',
          label: 'Client Results',
          fields: [
            { name: 'metric', type: 'text', label: 'Key Metric' },
            { name: 'value', type: 'text', label: 'Result' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'transformations',
      name: 'Wealth Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Money Block' },
            { name: 'transformation', type: 'textarea', label: 'Abundance Shift' },
            { name: 'outcome', type: 'textarea', label: 'Financial Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Abundance Resource',
      fields: [
        { name: 'title', type: 'text', label: 'Resource Title' },
        { name: 'description', type: 'textarea', label: 'Resource Description' },
        { name: 'lead_magnet_type', type: 'select', label: 'Type', options: [
          { value: 'ebook', label: 'eBook' },
          { value: 'webinar', label: 'Webinar' },
          { value: 'assessment', label: 'Assessment' },
          { value: 'toolkit', label: 'Toolkit' },
          { value: 'checklist', label: 'Checklist' },
          { value: 'masterclass', label: 'Masterclass' }
        ]},
        { name: 'download_url', type: 'url', label: 'Download URL' },
        { name: 'cover_image', type: 'file', label: 'Cover Image' }
      ],
      required: false
    },
    {
      key: 'booking',
      name: 'Book an Abundance Consultation',
      fields: [
        { name: 'booking_title', type: 'text', label: 'Booking Title' },
        { name: 'booking_description', type: 'textarea', label: 'Booking Description' },
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_cta', type: 'text', label: 'Call to Action' }
      ],
      required: false
    },
    {
      key: 'videos',
      name: 'Abundance & Wealth Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'money_mindset', label: 'Money Mindset' },
              { value: 'abundance_tips', label: 'Abundance Tips' },
              { value: 'wealth_building', label: 'Wealth Building' },
              { value: 'client_story', label: 'Client Success Story' },
              { value: 'manifestation', label: 'Manifestation Practice' }
            ]},
            { name: 'embed_url', type: 'textarea', label: 'Video Embed URL' },
            { name: 'thumbnail', type: 'file', label: 'Video Thumbnail' },
            { name: 'duration', type: 'text', label: 'Duration' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'youtube',
      name: 'YouTube Channel',
      fields: [
        { name: 'channel_url', type: 'url', label: 'YouTube Channel URL' },
        { name: 'channel_name', type: 'text', label: 'Channel Name' },
        { name: 'subscriber_count', type: 'text', label: 'Subscriber Count' },
        { name: 'featured_playlist', type: 'url', label: 'Featured Playlist URL' },
        { name: 'latest_video_embed', type: 'textarea', label: 'Latest Video Embed Code' },
        { name: 'channel_description', type: 'textarea', label: 'Channel Description' }
      ],
      required: false
    },
    {
      key: 'speaking',
      name: 'Speaking Engagements',
      fields: [
        {
          name: 'topics',
          type: 'repeater',
          label: 'Speaking Topics',
          fields: [
            { name: 'topic', type: 'text', label: 'Topic Title' },
            { name: 'description', type: 'textarea', label: 'Topic Description' },
            { name: 'audience', type: 'text', label: 'Target Audience' },
            { name: 'duration', type: 'text', label: 'Duration Options' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'social',
      name: 'Social Media',
      fields: [
        {
          name: 'social_links',
          type: 'repeater',
          label: 'Social Profiles',
          fields: [
            { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
            { name: 'url', type: 'url', label: 'Profile URL' },
            { name: 'username', type: 'text', label: 'Username' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'links',
      name: 'Quick Links',
      fields: [
        {
          name: 'link_items',
          type: 'repeater',
          label: 'Links',
          fields: [
            { name: 'text', type: 'text', label: 'Link Title' },
            { name: 'url', type: 'url', label: 'URL' },
            { name: 'description', type: 'text', label: 'Description (optional)' },
            { name: 'icon', type: 'select', label: 'Icon', options: [
              { value: 'link', label: '🔗 Link' },
              { value: 'globe', label: '🌐 Website' },
              { value: 'calendar', label: '📅 Calendar' },
              { value: 'video', label: '🎥 Video' },
              { value: 'music', label: '🎵 Music' },
              { value: 'shopping', label: '🛒 Shopping' },
              { value: 'document', label: '📄 Document' },
              { value: 'download', label: '⬇️ Download' },
              { value: 'star', label: '⭐ Featured' },
              { value: 'heart', label: '❤️ Favorite' }
            ]}
          ]
        }
      ],
      required: false
    },
    {
      key: 'business_hours',
      name: 'Business Hours',
      fields: [
        {
          name: 'hours',
          type: 'repeater',
          label: 'Availability',
          fields: [
            { name: 'day', type: 'select', label: 'Day', options: [
              { value: 'monday', label: 'Monday' },
              { value: 'tuesday', label: 'Tuesday' },
              { value: 'wednesday', label: 'Wednesday' },
              { value: 'thursday', label: 'Thursday' },
              { value: 'friday', label: 'Friday' },
              { value: 'saturday', label: 'Saturday' },
              { value: 'sunday', label: 'Sunday' }
            ]},
            { name: 'open_time', type: 'text', label: 'Opening Time' },
            { name: 'close_time', type: 'text', label: 'Closing Time' },
            { name: 'is_closed', type: 'checkbox', label: 'Closed' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'appointments',
      name: 'Book a Session',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL (Calendly, etc.)' },
        { name: 'calendar_link', type: 'url', label: 'Google Calendar Link' },
        { name: 'consultation_info', type: 'textarea', label: 'Consultation Details' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Client Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'review', type: 'textarea', label: 'Testimonial' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'program', type: 'text', label: 'Program/Service' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'google_map',
      name: 'Location',
      fields: [
        { name: 'map_embed_url', type: 'textarea', label: 'Google Maps Embed URL' },
        { name: 'directions_url', type: 'url', label: 'Google Maps Directions URL' }
      ],
      required: false
    },
    {
      key: 'app_download',
      name: 'App Download',
      fields: [
        { name: 'app_store_url', type: 'url', label: 'App Store URL' },
        { name: 'play_store_url', type: 'url', label: 'Play Store URL' }
      ],
      required: false
    },
    {
      key: 'contact_form',
      name: 'Contact Form',
      fields: [
        { name: 'form_title', type: 'text', label: 'Form Title' },
        { name: 'form_description', type: 'textarea', label: 'Form Description' }
      ],
      required: false
    },
    {
      key: 'thank_you',
      name: 'Thank You Message',
      fields: [
        { name: 'message', type: 'textarea', label: 'Thank You Message' }
      ],
      required: false
    },
    {
      key: 'seo',
      name: 'SEO Settings',
      fields: [
        { name: 'meta_title', type: 'text', label: 'Meta Title' },
        { name: 'meta_description', type: 'textarea', label: 'Meta Description' },
        { name: 'keywords', type: 'text', label: 'Keywords' },
        { name: 'og_image', type: 'url', label: 'Open Graph Image URL' }
      ],
      required: false
    },
    {
      key: 'pixels',
      name: 'Pixel & Analytics',
      fields: [
        { name: 'google_analytics', type: 'text', label: 'Google Analytics ID' },
        { name: 'facebook_pixel', type: 'text', label: 'Facebook Pixel ID' },
        { name: 'gtm_id', type: 'text', label: 'Google Tag Manager ID' },
        { name: 'custom_head', type: 'textarea', label: 'Custom Head Code' },
        { name: 'custom_body', type: 'textarea', label: 'Custom Body Code' }
      ],
      required: false
    },
    {
      key: 'custom_html',
      name: 'Custom HTML',
      fields: [
        { name: 'html_content', type: 'textarea', label: 'Custom HTML Code' },
        { name: 'section_title', type: 'text', label: 'Section Title' },
        { name: 'show_title', type: 'checkbox', label: 'Show Section Title' }
      ],
      required: false
    },
    {
      key: 'qr_share',
      name: 'QR Code Share',
      fields: [
        { name: 'enable_qr', type: 'checkbox', label: 'Enable QR Code Sharing' },
        { name: 'qr_title', type: 'text', label: 'QR Section Title' },
        { name: 'qr_description', type: 'textarea', label: 'QR Description' },
        { name: 'qr_size', type: 'select', label: 'QR Code Size', options: [
          { value: 'small', label: 'Small (128px)' },
          { value: 'medium', label: 'Medium (200px)' },
          { value: 'large', label: 'Large (300px)' }
        ]}
      ],
      required: false
    },
    {
      key: 'language',
      name: 'Language Settings',
      fields: [
        { name: 'template_language', type: 'select', label: 'Template Language', options: languageData.map(lang => ({ value: lang.code, label: `${String.fromCodePoint(...lang.countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0)))} ${lang.name}` })) }
      ],
      required: false
    },
    {
      key: 'copyright',
      name: 'Copyright',
      fields: [
        { name: 'text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  colorPresets: [
    { name: 'Liquid Gold', primary: '#B8860B', secondary: '#DAA520', accent: '#FFD700', background: '#FFFDF0', text: '#2A2000', cardBg: '#FFFFFF' },
    { name: 'Emerald Wealth', primary: '#1B5E20', secondary: '#2E7D32', accent: '#4CAF50', background: '#F1F8E9', text: '#0A2E10', cardBg: '#FFFFFF' },
    { name: 'Royal Abundance', primary: '#4A148C', secondary: '#7B1FA2', accent: '#CE93D8', background: '#FAF0FF', text: '#1A0530', cardBg: '#FFFFFF' },
    { name: 'Copper Glow', primary: '#A0522D', secondary: '#CD853F', accent: '#DEB887', background: '#FDF5E6', text: '#3A2010', cardBg: '#FFFFFF' },
    { name: 'Black Diamond', primary: '#212121', secondary: '#424242', accent: '#757575', background: '#FAFAFA', text: '#1A1A1A', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, Georgia, serif', weight: '400,500,600,700' },
    { name: 'DM Serif Display', value: 'DM Serif Display, Georgia, serif', weight: '400' },
    { name: 'Bodoni Moda', value: 'Bodoni Moda, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Fraunces', value: 'Fraunces, Georgia, serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#B8860B',
    secondary: '#DAA520',
    accent: '#FFD700',
    background: '#FFFDF0',
    text: '#2A2000',
    cardBg: '#FFFFFF',
    borderColor: '#FFD700',
    shadowColor: 'rgba(184, 134, 11, 0.15)'
  },
  defaultFont: 'Playfair Display, Georgia, serif',
  themeStyle: {
    layout: 'luxurious-abundance',
    headerStyle: 'golden-hero',
    cardStyle: 'premium-cards',
    buttonStyle: 'opulent-action',
    iconStyle: 'wealth-icons',
    spacing: 'generous',
    shadows: 'golden-glow',
    animations: 'elegant-reveal',
    backgroundPattern: 'gold-filigree',
    typography: 'luxury-serif'
  },
  defaultData: {
    header: {
      name: 'Victoria Chen-Williams',
      title: 'Money Mindset & Abundance Coach | Former Wall Street Trader',
      tagline: 'Your bank account is a mirror of your beliefs. Let\'s reprogram your relationship with money, dissolve the blocks holding you back, and open the floodgates to the abundance you deserve.',
      profile_image: ''
    },
    contact: {
      email: 'victoria@abundanceunlocked.com',
      phone: '+1 (555) 890-1234',
      website: 'https://abundanceunlocked.com',
      location: 'Miami, FL'
    },
    about: {
      description: 'After 12 years as a Wall Street trader managing $200M+ portfolios, I discovered that the biggest barrier to wealth isn\'t strategy — it\'s mindset. Despite earning seven figures, I was miserable, burnt out, and still felt "never enough." My own transformation journey led me to study the psychology of wealth, energy work, and neuroscience of abundance. Now I combine my financial expertise with deep mindset work to help women (and brave men) break through their money blocks and create true, lasting abundance.',
      specializations: 'Money Blocks Removal, Wealth Consciousness, Abundance Mindset, Income Ceiling Breaking, Financial Empowerment, Manifestation, Nervous System Regulation for Wealth, High-Ticket Sales Confidence',
      experience: '7',
      mission: 'To help every client I work with heal their relationship with money, dissolve generational wealth blocks, and step into the abundant, prosperous life that is their birthright.'
    },
    programs: {
      program_list: [
        { title: 'Wealthy Woman Academy', description: 'A 12-week deep-dive group program for women who are ready to shatter their income ceiling, reprogram their money stories, and build wealth consciousness from the inside out', duration: '12 weeks', format: 'group', price: '$2,997' },
        { title: 'Money Block Breakthrough', description: 'An intensive 1:1 coaching experience that identifies and dissolves your deepest money blocks using somatic techniques, NLP, and financial strategy', duration: '8 weeks', format: 'one-on-one', price: '$5,500' },
        { title: 'Abundance Accelerator Mastermind', description: 'A high-level 6-month mastermind for entrepreneurs and professionals ready to 10x their income through mindset mastery and strategic action', duration: '6 months', format: 'group', price: '$8,500' },
        { title: 'Luxury Abundance Retreat', description: 'A transformative 4-day retreat at a luxury resort combining deep money mindset work, wealth strategy, and self-care practices', duration: '4 days', format: 'retreat', price: '$6,500' }
      ]
    },
    signature_offer: {
      offer_title: 'The Total Wealth Transformation',
      offer_description: 'My most powerful and exclusive offering: 6 months of private 1:1 coaching that completely rewires your relationship with money and catapults you to a new level of financial abundance. Limited to 8 clients per year.',
      offer_price: '$15,000',
      offer_includes: '• Comprehensive money story and wealth block assessment\n• Weekly 60-minute 1:1 coaching sessions\n• Personalized money manifestation protocol\n• Nervous system regulation for receiving wealth\n• Somatic money block release sessions (monthly)\n• Financial strategy and wealth-building roadmap\n• VIP access to Wealthy Woman Academy\n• Unlimited Voxer support for real-time coaching\n• Invitation to the annual Luxury Abundance Retreat',
      offer_url: '#',
      offer_cta: 'Apply for Your Transformation'
    },
    results: {
      executive_results: [
        { metric: 'Average Income Increase', value: '+240%', description: 'Average income increase among program graduates within the first year', timeframe: '12 months' },
        { metric: 'Money Block Resolution', value: '97%', description: 'Clients reporting significant resolution of their primary money block', timeframe: '8 weeks' },
        { metric: 'Wealth Confidence Score', value: '+88%', description: 'Improvement in self-reported confidence around earning, receiving, and managing wealth', timeframe: '12 weeks' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'J.M.', challenge: 'Talented interior designer earning $45K/year despite being one of the best in her city. Chronic undercharging, couldn\'t quote more than $50/hour without guilt. Grew up believing "money is the root of evil"', transformation: 'Through deep money story work, identified inherited beliefs from her immigrant parents. Released generational money shame through somatic processing. Rebuilt pricing structure and sales confidence', outcome: 'Now earning $280K/year, charges $350/hour without flinching, opened a luxury design studio, and is breaking the cycle of scarcity for her children', timeframe: '8 months' },
        { client_initial: 'S.R.', challenge: 'Corporate lawyer earning $180K but spending every dollar. In $90K of consumer debt. Terrified of looking at her bank account. Compulsive spending as emotional coping mechanism', transformation: 'Uncovered the emotional roots of spending addiction (using money to feel "worthy"). Combined money mindset work with practical financial strategy. Developed healthy relationship with both earning and keeping', outcome: 'Paid off all $90K in debt in 14 months. Built a $50K emergency fund. Launched a side business generating $5K/month. Says she feels "wealthy for the first time — even before the money changed"', timeframe: '14 months' }
      ]
    },
    lead_magnet: {
      title: 'The Money Block Quiz: Discover Your #1 Hidden Block to Abundance',
      description: 'Take this powerful 3-minute assessment to uncover the specific subconscious money block that\'s keeping you stuck at your current income level — plus get a personalized strategy to break through it. Taken by over 25,000 women worldwide.',
      lead_magnet_type: 'assessment',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Abundance Breakthrough Call',
      booking_description: 'A powerful 30-minute call where we identify your #1 money block, explore your wealth potential, and determine if working together is the right next step for your abundance journey.',
      booking_url: 'https://calendly.com/victoriacw/abundance-call',
      booking_cta: 'Unlock Your Abundance'
    },
    videos: {
      video_list: [
        { title: 'The 5 Money Blocks Keeping You Broke (And How to Break Them)', description: 'Discover the five most common subconscious money blocks and the specific techniques to dissolve each one', video_type: 'money_mindset', embed_url: '', thumbnail: '', duration: '22:15' },
        { title: 'From Wall Street to Wealth Coach: My $2M Money Story', description: 'My personal journey from earning millions but feeling broke, to discovering true abundance through mindset transformation', video_type: 'abundance_tips', embed_url: '', thumbnail: '', duration: '18:30' },
        { title: 'How Julia Went from $45K to $280K in 8 Months', description: 'The incredible transformation story of a designer who dissolved her money blocks and tripled her income', video_type: 'client_story', embed_url: '', thumbnail: '', duration: '14:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/abundanceunlocked',
      channel_name: 'Victoria Chen-Williams | Abundance Unlocked',
      subscriber_count: '198K',
      featured_playlist: 'https://youtube.com/playlist?list=PLmoneyblocks',
      latest_video_embed: '',
      channel_description: 'Money mindset mastery, abundance coaching, and wealth consciousness for women who are ready to break through their financial ceiling. New videos every Tuesday and Friday.'
    },
    speaking: {
      topics: [
        { topic: 'The Psychology of Wealth: Why Mindset Matters More Than Strategy', description: 'A fascinating exploration of why traditional financial advice fails for most people, and how rewiring your money beliefs can unlock exponential wealth', audience: 'Women\'s conferences, entrepreneurship events, financial wellness summits', duration: '60-90 minutes' },
        { topic: 'Breaking the Generational Money Curse', description: 'How inherited beliefs about money silently sabotage your wealth — and the breakthrough techniques to rewrite your financial destiny for yourself and future generations', audience: 'Women of color events, cultural organizations, family wealth conferences', duration: '45-75 minutes' },
        { topic: 'From Wall Street to Wealthy: Redefining What Abundance Means', description: 'My personal story of earning millions while feeling broke, and the radical mindset shift that changed everything — for executives and entrepreneurs who want more than just money', audience: 'Corporate events, entrepreneurship summits, leadership retreats', duration: '45-60 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/abundanceunlocked', username: '@abundanceunlocked' },
        { platform: 'tiktok', url: 'https://tiktok.com/@victoriacw_abundance', username: '@victoriacw_abundance' },
        { platform: 'youtube', url: 'https://youtube.com/abundanceunlocked', username: 'Abundance Unlocked' }
      ]
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Julia Martinez', review: 'Victoria changed my entire relationship with money. I went from feeling guilty charging $50/hour to confidently commanding $350 — and my clients are happier than ever. The work we did on my inherited money stories was life-altering. I\'m earning more than I ever dreamed possible.', rating: '5', program: 'Money Block Breakthrough' },
        { client_name: 'Samara Richards', review: 'When I started with Victoria, I was $90K in debt and terrified to look at my bank account. Fourteen months later, I\'m debt-free with a $50K emergency fund and a side business. But the real transformation is internal — I finally feel worthy of wealth. This woman is magic.', rating: '5', program: 'The Total Wealth Transformation' }
      ]
    },
    business_hours: {
      hours: [
        { day: 'monday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '09:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '09:00', close_time: '15:00', is_closed: false },
        { day: 'saturday', open_time: '10:00', close_time: '14:00', is_closed: false },
        { day: 'sunday', open_time: '', close_time: '', is_closed: true }
      ]
    },
    appointments: {
      booking_url: 'https://calendly.com/coach',
      calendar_link: '',
      consultation_info: 'Book your complimentary discovery session.'
    },
    google_map: { map_embed_url: '', directions_url: '' },
    app_download: { app_store_url: '#', play_store_url: '#' },
    contact_form: { form_title: 'Get In Touch', form_description: 'Have a question? Send me a message.' },
    thank_you: { message: 'Thank you for reaching out! I\'ll get back to you within 24 hours.' },
    seo: { meta_title: '', meta_description: '', keywords: '', og_image: '' },
    pixels: { google_analytics: '', facebook_pixel: '', gtm_id: '', custom_head: '', custom_body: '' },
    custom_html: { html_content: '', section_title: '', show_title: false },
    qr_share: { enable_qr: true, qr_title: 'Share My Profile', qr_description: 'Scan to connect with me!', qr_size: 'medium' },
    language: { template_language: 'en' },
    copyright: { text: '© 2025 All rights reserved.' }
  }
};
