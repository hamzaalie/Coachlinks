import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const datingCoachTemplate = {
  name: 'Dating & Attraction Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Dating Coach Title' },
        { name: 'tagline', type: 'textarea', label: 'Empowering Tagline' },
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
        { name: 'description', type: 'textarea', label: 'Dating Coaching Philosophy' },
        { name: 'specializations', type: 'tags', label: 'Relationship Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Mission Statement' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Dating Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Dating Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Program' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Singles Retreat' },
              { value: 'virtual', label: 'Virtual Coaching' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Dating Program',
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
      name: 'Dating Success Metrics',
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
      name: 'Love Story Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Dating Challenge' },
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
      name: 'Free Dating Resource',
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
      name: 'Book a Dating Strategy Call',
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
      name: 'Dating Advice Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'dating_tips', label: 'Dating Tips' },
              { value: 'first_date_advice', label: 'First Date Advice' },
              { value: 'confidence_building', label: 'Confidence Building' },
              { value: 'client_story', label: 'Client Success Story' },
              { value: 'q_and_a', label: 'Q&A Session' }
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
    { name: 'Velvet Rose', primary: '#C2185B', secondary: '#E91E63', accent: '#FF80AB', background: '#FFF5F7', text: '#2D1B2E', cardBg: '#FFFFFF' },
    { name: 'Golden Hour', primary: '#E65100', secondary: '#FF8F00', accent: '#FFCC02', background: '#FFF8F0', text: '#3E2723', cardBg: '#FFFFFF' },
    { name: 'Berry Blush', primary: '#AD1457', secondary: '#D81B60', accent: '#F48FB1', background: '#FCF0F4', text: '#311B1B', cardBg: '#FFFFFF' },
    { name: 'Champagne Kiss', primary: '#8D6E63', secondary: '#BCAAA4', accent: '#D7CCC8', background: '#FAF7F5', text: '#3E2723', cardBg: '#FFFFFF' },
    { name: 'Midnight Romance', primary: '#4A148C', secondary: '#7B1FA2', accent: '#CE93D8', background: '#F9F0FF', text: '#1A0A2E', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'DM Sans', value: 'DM Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Quicksand', value: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Raleway', value: 'Raleway, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Josefin Sans', value: 'Josefin Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Outfit', value: 'Outfit, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#C2185B',
    secondary: '#E91E63',
    accent: '#FF80AB',
    background: '#FFF5F7',
    text: '#2D1B2E',
    cardBg: '#FFFFFF',
    borderColor: '#FF80AB',
    shadowColor: 'rgba(194, 24, 91, 0.15)'
  },
  defaultFont: 'DM Sans, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'romantic-flow',
    headerStyle: 'attraction-hero',
    cardStyle: 'warm-glow-cards',
    buttonStyle: 'heart-buttons',
    iconStyle: 'romantic',
    spacing: 'intimate',
    shadows: 'soft-blush',
    animations: 'gentle-float',
    backgroundPattern: 'subtle-hearts',
    typography: 'modern-romantic'
  },
  defaultData: {
    header: {
      name: 'Sophia Valentina',
      title: 'Dating & Attraction Strategist',
      tagline: 'Helping you attract authentic love, build unshakeable confidence, and create the relationship you truly deserve',
      profile_image: ''
    },
    contact: {
      email: 'hello@sophiavalentina.com',
      phone: '+1 (310) 555-7200',
      website: 'https://sophiavalentina.com',
      location: 'Los Angeles, CA'
    },
    about: {
      description: 'Certified dating and relationship coach with 8+ years helping singles navigate modern dating with confidence and authenticity. Trained in attachment theory, positive psychology, and communication science. Featured in Cosmopolitan, The Today Show, and Bumble\'s official blog.',
      specializations: 'Dating Confidence, First Date Mastery, Online Profile Optimization, Authentic Attraction, Attachment Styles, Communication Skills',
      experience: '8',
      mission: 'To empower every person to show up authentically in dating, build genuine connections, and create lasting love without games or manipulation.'
    },
    programs: {
      program_list: [
        { title: 'Magnetic Attraction Bootcamp', description: 'An intensive 6-week program to transform your dating confidence, refine your personal brand, and master the art of authentic attraction.', duration: '6 weeks', format: 'group', price: '$1,497' },
        { title: 'First Date Mastery', description: 'One-on-one coaching to eliminate first-date anxiety, master conversation flow, and leave a lasting impression every time.', duration: '4 weeks', format: 'one-on-one', price: '$997' },
        { title: 'Relationship Ready Course', description: 'Self-paced online course covering everything from dating app strategy to building emotional intimacy and navigating exclusivity.', duration: 'Self-paced', format: 'virtual', price: '$297' }
      ]
    },
    signature_offer: {
      offer_title: 'The Love Blueprint',
      offer_description: 'My signature 90-day 1:1 program that takes you from stuck in the dating cycle to confidently attracting a committed, loving partner. Combines deep inner work with practical dating strategy.',
      offer_price: '$3,500',
      offer_includes: '• Weekly 60-minute 1:1 coaching calls\n• Personalized dating app profile overhaul\n• Attachment style assessment & action plan\n• Real-time texting and date strategy support\n• Access to private client community\n• 3 months of Voxer access between sessions',
      offer_url: '#',
      offer_cta: 'Apply for The Love Blueprint'
    },
    results: {
      executive_results: [
        { metric: 'Successful Relationships', value: '340+', description: 'Clients who entered committed relationships after coaching', timeframe: '5 years' },
        { metric: 'Dating Confidence Score', value: '+78%', description: 'Average increase in self-reported dating confidence', timeframe: '90 days' },
        { metric: 'First Date Success Rate', value: '85%', description: 'Clients who secure second dates consistently after coaching', timeframe: '6 weeks' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'K.R.', challenge: 'Hadn\'t been on a date in 3 years after a painful breakup, paralyzed by fear of rejection', transformation: 'Rebuilt confidence, optimized dating profile, developed conversation skills, and went on 12 quality dates in 2 months', outcome: 'Now in a loving, committed relationship of 14 months', timeframe: '3 months' },
        { client_initial: 'D.M.', challenge: 'Stuck in a cycle of attracting emotionally unavailable partners, struggling with anxious attachment', transformation: 'Understood attachment patterns, set healthy boundaries, learned to identify green flags early', outcome: 'Engaged to a secure, emotionally available partner', timeframe: '6 months' }
      ]
    },
    lead_magnet: {
      title: 'The Irresistible Profile Guide: 10 Proven Strategies to Stand Out on Any Dating App',
      description: 'Download the exact framework I use with private clients to optimize dating profiles that attract quality matches. Includes photo selection tips, bio templates, and opening message scripts.',
      lead_magnet_type: 'ebook',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Love Strategy Call',
      booking_description: 'A complimentary 30-minute call to discuss your dating goals, identify what\'s holding you back, and create a personalized action plan to attract the love you deserve.',
      booking_url: 'https://calendly.com/sophiavalentina/strategy',
      booking_cta: 'Schedule Your Free Call'
    },
    videos: {
      video_list: [
        { title: '5 Texting Mistakes That Kill Attraction', description: 'Learn the most common texting habits that push potential partners away and what to do instead', video_type: 'dating_tips', embed_url: '', thumbnail: '', duration: '14:22' },
        { title: 'How to Never Run Out of Things to Say on a Date', description: 'Master the art of flowing, engaging conversation that creates genuine connection', video_type: 'first_date_advice', embed_url: '', thumbnail: '', duration: '18:45' },
        { title: 'From Ghost Town to Dream Partner', description: 'Client success story: how Kevin went from zero responses to a committed relationship in 90 days', video_type: 'client_story', embed_url: '', thumbnail: '', duration: '12:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/sophiavalentina',
      channel_name: 'Sophia Valentina Dating',
      subscriber_count: '215K',
      featured_playlist: 'https://youtube.com/playlist?list=PLdatingtips',
      latest_video_embed: '',
      channel_description: 'Real talk about modern dating, attraction science, and building authentic relationships. New videos every Wednesday and Saturday!'
    },
    speaking: {
      topics: [
        { topic: 'The Science of Authentic Attraction', description: 'A research-backed exploration of what truly creates lasting attraction beyond looks and surface-level tactics', audience: 'Singles events, relationship panels, corporate wellness', duration: '45-60 minutes' },
        { topic: 'Modern Dating Decoded', description: 'Navigating dating apps, texting culture, and the paradox of choice in the digital age with confidence and intention', audience: 'Conferences, podcasts, university events', duration: '30-60 minutes' },
        { topic: 'Attachment Styles & Your Love Life', description: 'Understanding how your attachment style shapes your dating patterns and how to create secure connections', audience: 'Therapy groups, workshops, retreats', duration: '60-90 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Amanda R.', review: 'Sophia completely changed how I approach dating. I went from dreading first dates to actually enjoying them. Within 2 months, I met someone amazing. Her coaching is warm, practical, and transformative.', rating: '5', program: 'The Love Blueprint' },
        { client_name: 'Marcus T.', review: 'I was skeptical about hiring a dating coach, but Sophia\'s approach is grounded in real psychology and zero manipulation. She helped me understand my patterns and show up authentically. Best investment I\'ve made.', rating: '5', program: 'Magnetic Attraction Bootcamp' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/sophiavalentina', username: '@sophiavalentina' },
        { platform: 'tiktok', url: 'https://tiktok.com/@sophiavalentina', username: '@sophiavalentina' },
        { platform: 'youtube', url: 'https://youtube.com/sophiavalentina', username: 'Sophia Valentina Dating' }
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
