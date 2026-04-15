import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const executiveCoachTemplate = {
  name: 'Executive & C-Suite Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Executive Leadership Strategist' },
        { name: 'tagline', type: 'textarea', label: 'Value Proposition' },
        { name: 'profile_image', type: 'file', label: 'Profile Photo' }
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
        { name: 'description', type: 'textarea', label: 'Executive Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Leadership Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Leadership Philosophy' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Executive Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Executive Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One' },
              { value: 'group', label: 'Group Coaching' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Retreat' },
              { value: 'virtual', label: 'Virtual' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Leadership Program',
      fields: [
        { name: 'offer_title', type: 'text', label: 'Signature Leadership Program' },
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
      name: 'Impact & Results',
      fields: [
        {
          name: 'executive_results',
          type: 'repeater',
          label: 'Executive Results',
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
      name: 'Client Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Initial Challenge' },
            { name: 'transformation', type: 'textarea', label: 'Transformation Achieved' },
            { name: 'outcome', type: 'textarea', label: 'Current Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Resource',
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
      name: 'Book a Consultation',
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
      name: 'Executive Insights',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'leadership_talk', label: 'Leadership Talk' },
              { value: 'case_study', label: 'Case Study' },
              { value: 'executive_tips', label: 'Executive Tips' },
              { value: 'panel_discussion', label: 'Panel Discussion' },
              { value: 'keynote', label: 'Keynote' }
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
    { name: 'Midnight Authority', primary: '#1B2A4A', secondary: '#C9A961', accent: '#E8D5A3', background: '#F8F6F0', text: '#1A1A2E', cardBg: '#FFFFFF' },
    { name: 'Platinum Executive', primary: '#2C3E50', secondary: '#7F8C8D', accent: '#BDC3C7', background: '#F9FAFB', text: '#2C3E50', cardBg: '#FFFFFF' },
    { name: 'Royal Navy', primary: '#003366', secondary: '#336699', accent: '#6699CC', background: '#F0F4F8', text: '#1A2332', cardBg: '#FFFFFF' },
    { name: 'Charcoal Gold', primary: '#333333', secondary: '#D4AF37', accent: '#F0E68C', background: '#FAFAF5', text: '#1A1A1A', cardBg: '#FFFFFF' },
    { name: 'Slate Prestige', primary: '#3D4F5F', secondary: '#8FA3B0', accent: '#C4D4DF', background: '#F5F7F9', text: '#2D3436', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Source Serif Pro', value: 'Source Serif Pro, Georgia, serif', weight: '400,600,700' },
    { name: 'Crimson Pro', value: 'Crimson Pro, Georgia, serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#1B2A4A',
    secondary: '#C9A961',
    accent: '#E8D5A3',
    background: '#F8F6F0',
    text: '#1A1A2E',
    cardBg: '#FFFFFF',
    borderColor: '#E8D5A3',
    shadowColor: 'rgba(27, 42, 74, 0.15)'
  },
  defaultFont: 'Playfair Display, Georgia, serif',
  themeStyle: {
    layout: 'executive-authority',
    headerStyle: 'boardroom-hero',
    cardStyle: 'prestige-cards',
    buttonStyle: 'authority-buttons',
    iconStyle: 'luxury',
    spacing: 'refined',
    shadows: 'subtle-depth',
    animations: 'elegant-transitions',
    backgroundPattern: 'pinstripe-subtle',
    typography: 'executive-serif'
  },
  defaultData: {
    header: {
      name: 'Alexander Sterling',
      title: 'Executive Leadership Strategist & C-Suite Advisor',
      tagline: 'Transforming ambitious executives into extraordinary leaders who drive billion-dollar outcomes',
      profile_image: ''
    },
    contact: {
      email: 'alex@sterlingexecutive.com',
      phone: '+1 (212) 555-9800',
      website: 'https://sterlingexecutive.com',
      location: 'New York, NY'
    },
    about: {
      description: 'Former Fortune 500 VP turned executive coach with 20+ years guiding C-suite leaders, board members, and high-potential executives through high-stakes transitions. Harvard MBA. ICF Master Certified Coach.',
      specializations: 'C-Suite Coaching, Board Effectiveness, Strategic Leadership, Executive Presence, Succession Planning',
      experience: '20',
      mission: 'To elevate the next generation of corporate leaders who lead with vision, integrity, and measurable impact.'
    },
    programs: {
      program_list: [
        { title: 'CEO Accelerator', description: 'Intensive 1:1 executive coaching for sitting and aspiring CEOs. Includes 360° stakeholder assessment, board readiness evaluation, and strategic leadership mapping.', duration: '6 months', format: 'one-on-one', price: '$25,000' },
        { title: 'Leadership Presence Workshop', description: 'Two-day immersive workshop focused on commanding executive presence, boardroom communication, and influential storytelling.', duration: '2 days', format: 'workshop', price: '$4,500' },
        { title: 'Executive Mastermind', description: 'Exclusive peer advisory group for senior leaders. Monthly sessions with quarterly retreats and unlimited email access.', duration: '12 months', format: 'group', price: '$15,000' }
      ]
    },
    signature_offer: {
      offer_title: 'The Executive Edge',
      offer_description: 'My flagship 6-month program combining deep 1:1 coaching, 360° assessment, peer mastermind sessions, and on-demand access. Designed for executives who refuse to plateau.',
      offer_price: '$25,000',
      offer_includes: '• Bi-weekly 90-minute coaching sessions\n• Comprehensive 360° stakeholder feedback\n• Personalized leadership development plan\n• Access to private executive mastermind\n• Unlimited email support between sessions\n• Quarterly progress reviews with benchmarking',
      offer_url: '#',
      offer_cta: 'Apply for The Executive Edge'
    },
    results: {
      executive_results: [
        { metric: 'Revenue Growth', value: '+47%', description: 'Average revenue increase driven by coached executives within 12 months', timeframe: '12 months' },
        { metric: 'Team Retention', value: '+62%', description: 'Improvement in team retention rates under coached leaders', timeframe: '6 months' },
        { metric: 'Executive Promotions', value: '89 clients promoted', description: 'Clients promoted to C-suite or board positions after coaching engagement', timeframe: '3 years' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'R.K.', challenge: 'Newly appointed CEO struggling to align a fragmented executive team after a major merger', transformation: 'Developed a unified leadership vision and communication framework that aligned 8 department heads', outcome: 'Company achieved 34% revenue growth within 18 months post-merger', timeframe: '9 months' },
        { client_initial: 'M.L.', challenge: 'Senior VP passed over for CEO promotion twice, lacking executive presence and board confidence', transformation: 'Rebuilt leadership brand, mastered boardroom communication, and led a successful company-wide transformation initiative', outcome: 'Appointed CEO of a $2B division within 12 months', timeframe: '12 months' }
      ]
    },
    lead_magnet: {
      title: 'The Executive Playbook: 7 Leadership Frameworks That Drive Results',
      description: 'Download the same frameworks used by Fortune 500 leaders to accelerate performance, align teams, and drive measurable outcomes. Includes self-assessment tools and action plans.',
      lead_magnet_type: 'ebook',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Reserve Your Executive Strategy Session',
      booking_description: 'A confidential 45-minute session to assess your leadership challenges, identify growth opportunities, and determine if executive coaching is the right investment for your career.',
      booking_url: 'https://calendly.com/sterlingexecutive/strategy-session',
      booking_cta: 'Schedule Your Strategy Session'
    },
    videos: {
      video_list: [
        { title: 'The 3 Pillars of Executive Presence', description: 'Learn the framework that helps leaders command any room and influence decisions at the highest level', video_type: 'leadership_talk', embed_url: '', thumbnail: '', duration: '22:15' },
        { title: 'Case Study: Turning Around a Struggling Division', description: 'How one executive used strategic coaching to transform a $500M underperforming division', video_type: 'case_study', embed_url: '', thumbnail: '', duration: '18:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sterlingexecutive',
      channel_name: 'Sterling Executive Leadership',
      subscriber_count: '124K',
      featured_playlist: 'https://youtube.com/playlist?list=PLexecutiveleadership',
      latest_video_embed: '',
      channel_description: 'Executive leadership insights, C-suite coaching strategies, and proven frameworks for senior leaders. New content weekly.'
    },
    speaking: {
      topics: [
        { topic: 'The Leadership Multiplier Effect', description: 'How exceptional leaders create exponential impact through strategic influence, team empowerment, and organizational alignment', audience: 'C-suite executives, board members, senior leadership teams', duration: '60-90 minutes' },
        { topic: 'Leading Through Disruption', description: 'A battle-tested framework for navigating uncertainty, driving transformation, and emerging stronger as a leader', audience: 'Corporate conferences, industry summits', duration: '45-75 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Richard Thornton', review: 'Alexander\'s coaching transformed how I lead. Within six months, our executive team was more aligned than ever, and we delivered record-breaking quarterly results. His strategic insight is unmatched.', rating: '5', program: 'CEO Accelerator' },
        { client_name: 'Catherine Wei', review: 'Working with Alexander gave me the clarity and confidence to step into the CEO role I\'d been preparing for. His frameworks are practical, his feedback is direct, and his results speak for themselves.', rating: '5', program: 'The Executive Edge' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/alexandersterling', username: 'Alexander Sterling' },
        { platform: 'twitter', url: 'https://twitter.com/alexsterling', username: '@alexsterling' }
      ]
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
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
