import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const couplesCoachTemplate = {
  name: 'Couples & Marriage Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name(s)' },
        { name: 'title', type: 'text', label: 'Relationship Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Relationship Tagline' },
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
        { name: 'description', type: 'textarea', label: 'Relationship Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Relationship Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Mission for Couples' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Couples Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Relationship Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'couples-session', label: 'Couples Session' },
              { value: 'group', label: 'Group Workshop' },
              { value: 'workshop', label: 'Intensive Workshop' },
              { value: 'retreat', label: 'Couples Retreat' },
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
      name: 'Signature Couples Program',
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
      name: 'Relationship Results',
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
      name: 'Couple Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Couple Initials' },
            { name: 'challenge', type: 'textarea', label: 'Relationship Challenge' },
            { name: 'transformation', type: 'textarea', label: 'Transformation Journey' },
            { name: 'outcome', type: 'textarea', label: 'Current Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Relationship Resource',
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
      name: 'Book a Couples Consultation',
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
      name: 'Relationship Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'communication_tips', label: 'Communication Tips' },
              { value: 'intimacy_advice', label: 'Intimacy Advice' },
              { value: 'conflict_resolution', label: 'Conflict Resolution' },
              { value: 'couple_story', label: 'Couple Success Story' },
              { value: 'workshop_preview', label: 'Workshop Preview' }
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
    { name: 'Heart & Home', primary: '#8B4557', secondary: '#B06078', accent: '#D4A0B0', background: '#FFF7F9', text: '#2D1B22', cardBg: '#FFFFFF' },
    { name: 'Golden Bond', primary: '#8D6E63', secondary: '#A1887F', accent: '#BCAAA4', background: '#FAF5F2', text: '#3E2723', cardBg: '#FFFFFF' },
    { name: 'Sunset Embrace', primary: '#D84315', secondary: '#FF7043', accent: '#FFAB91', background: '#FFF5F0', text: '#3A1A0A', cardBg: '#FFFFFF' },
    { name: 'Harmony Teal', primary: '#00695C', secondary: '#26A69A', accent: '#80CBC4', background: '#F0FAF8', text: '#002E28', cardBg: '#FFFFFF' },
    { name: 'Violet Trust', primary: '#5E35B1', secondary: '#7E57C2', accent: '#B39DDB', background: '#F5F0FF', text: '#1A0E3A', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Merriweather', value: 'Merriweather, Georgia, serif', weight: '400,700' },
    { name: 'Crimson Pro', value: 'Crimson Pro, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville, Georgia, serif', weight: '400,700' },
    { name: 'Noto Serif', value: 'Noto Serif, Georgia, serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#8B4557',
    secondary: '#B06078',
    accent: '#D4A0B0',
    background: '#FFF7F9',
    text: '#2D1B22',
    cardBg: '#FFFFFF',
    borderColor: '#D4A0B0',
    shadowColor: 'rgba(139, 69, 87, 0.15)'
  },
  defaultFont: 'Lora, Georgia, serif',
  themeStyle: {
    layout: 'warm-connected',
    headerStyle: 'romantic-hero',
    cardStyle: 'intimate-cards',
    buttonStyle: 'warm-action',
    iconStyle: 'heartfelt',
    spacing: 'cozy',
    shadows: 'soft-embrace',
    animations: 'gentle-reveal',
    backgroundPattern: 'intertwined-lines',
    typography: 'elegant-serif'
  },
  defaultData: {
    header: {
      name: 'Dr. Michelle & James Park',
      title: 'Certified Gottman Couple Therapists & Marriage Coaches',
      tagline: 'Every relationship hits rough patches. We help you find your way back to each other — stronger, closer, and more connected than ever before.',
      profile_image: ''
    },
    contact: {
      email: 'hello@parkcouplestherapy.com',
      phone: '+1 (555) 876-5432',
      website: 'https://parkcouplestherapy.com',
      location: 'Seattle, WA'
    },
    about: {
      description: 'As a married couple and certified Gottman Method therapists with over 16 years of combined experience, we bring a unique perspective to couples coaching. Dr. Michelle is a licensed psychologist, and James is a certified relationship coach. Together, we\'ve helped over 800 couples rebuild trust, reignite intimacy, and create thriving partnerships.',
      specializations: 'Communication Mastery, Trust Rebuilding, Intimacy Coaching, Premarital Counseling, Conflict Resolution, Affair Recovery, Blended Families',
      experience: '16',
      mission: 'To help couples move from disconnection to deep, lasting love by giving them the tools, understanding, and support they need to build the relationship they\'ve always wanted.'
    },
    programs: {
      program_list: [
        { title: 'Reconnect & Reignite', description: 'Our flagship 12-week couples coaching program designed to rebuild communication, deepen emotional connection, and reignite the spark in your relationship', duration: '12 weeks', format: 'couples-session', price: '$4,800' },
        { title: 'Communication Mastery Workshop', description: 'An intensive weekend workshop where couples learn the Gottman-proven techniques for healthy communication and conflict resolution', duration: '2 days', format: 'workshop', price: '$997/couple' },
        { title: 'Premarital Foundations', description: 'A comprehensive 8-session program for engaged couples to build a rock-solid foundation before saying "I do"', duration: '8 weeks', format: 'couples-session', price: '$2,400' },
        { title: 'Love Lab Retreat', description: 'An intimate 4-day couples retreat in the San Juan Islands combining therapy, relaxation, and reconnection activities', duration: '4 days', format: 'retreat', price: '$5,500/couple' }
      ]
    },
    signature_offer: {
      offer_title: 'The Complete Relationship Revival',
      offer_description: 'Our most comprehensive couples program: 6 months of deep work to completely transform your relationship. Designed for couples who are committed to doing whatever it takes to build a love that lasts.',
      offer_price: '$8,500',
      offer_includes: '• Comprehensive relationship assessment (Gottman Sound Relationship House)\n• Weekly 75-minute couples coaching sessions\n• Individual sessions for each partner (monthly)\n• Personalized communication & conflict toolkit\n• Intimacy rebuilding exercises and homework\n• 24/7 emergency support hotline\n• Access to our Couples Community app\n• Weekend retreat included (valued at $5,500)',
      offer_url: '#',
      offer_cta: 'Invest in Your Love Story'
    },
    results: {
      executive_results: [
        { metric: 'Relationship Satisfaction', value: '+78%', description: 'Average increase in couples\' relationship satisfaction scores after completing the program', timeframe: '12 weeks' },
        { metric: 'Communication Quality', value: '+91%', description: 'Couples reporting significantly improved communication and conflict resolution', timeframe: '8 weeks' },
        { metric: 'Couples Staying Together', value: '94%', description: 'Of couples who complete our program choose to stay together and report being happier', timeframe: '1 year follow-up' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'R. & S.', challenge: 'Married 15 years, completely disconnected — sleeping in separate rooms, hadn\'t been intimate in over a year, considering divorce', transformation: 'Learned to communicate without blame, rebuilt emotional trust through daily connection rituals, addressed underlying attachment wounds', outcome: 'Now describe their relationship as "better than the honeymoon phase." Regular date nights, renewed intimacy, and planning a second honeymoon', timeframe: '6 months' },
        { client_initial: 'A. & M.', challenge: 'Engaged couple with vastly different communication styles — constant arguments about finances, family boundaries, and future plans', transformation: 'Developed shared language for conflict, created aligned financial vision, established healthy boundaries with extended family', outcome: 'Married and thriving. Report feeling "truly prepared" for the challenges of married life and equipped to handle disagreements lovingly', timeframe: '4 months' }
      ]
    },
    lead_magnet: {
      title: 'The 7-Day Connection Challenge: Reignite Your Relationship in One Week',
      description: 'A free guided challenge for couples with daily exercises, conversation starters, and connection activities designed to bring you closer in just 7 days. Used by over 5,000 couples worldwide.',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Couples Discovery Session',
      booking_description: 'A warm, no-pressure 30-minute call where we learn about your relationship, understand your goals, and explore how we can help you build the love you both deserve.',
      booking_url: 'https://calendly.com/parkcouplestherapy/discovery',
      booking_cta: 'Start Your Journey Together'
    },
    videos: {
      video_list: [
        { title: 'The #1 Communication Mistake Couples Make', description: 'Learn the most common communication trap and how to avoid it using Gottman research', video_type: 'communication_tips', embed_url: '', thumbnail: '', duration: '14:20' },
        { title: 'How We Saved Our Own Marriage', description: 'Our personal story of overcoming a relationship crisis and what we learned', video_type: 'couple_story', embed_url: '', thumbnail: '', duration: '22:45' },
        { title: '5 Daily Habits of Happy Couples', description: 'Simple, research-backed rituals that keep love strong every single day', video_type: 'intimacy_advice', embed_url: '', thumbnail: '', duration: '11:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/parkcouplestherapy',
      channel_name: 'Dr. Michelle & James Park | Love That Lasts',
      subscriber_count: '112K',
      featured_playlist: 'https://youtube.com/playlist?list=PLcommunicationmastery',
      latest_video_embed: '',
      channel_description: 'Evidence-based relationship advice from a real couple who also happens to be certified therapists. New videos every Tuesday on communication, intimacy, and building love that lasts.'
    },
    speaking: {
      topics: [
        { topic: 'The Science of Lasting Love', description: 'What 40+ years of Gottman research reveals about what makes relationships succeed or fail — and what every couple can do about it', audience: 'Conferences, corporate wellness events, faith communities', duration: '60-90 minutes' },
        { topic: 'Fighting Fair: The Art of Healthy Conflict', description: 'How to transform destructive arguments into productive conversations that actually bring you closer together', audience: 'Couples retreats, community events, therapy groups', duration: '45-75 minutes' },
        { topic: 'Before You Say "I Do": Foundations for a Lifetime', description: 'Essential conversations and skills every engaged couple needs to build a marriage that thrives', audience: 'Churches, engagement events, premarital groups', duration: '60-90 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/parkcouplestherapy', username: '@parkcouplestherapy' },
        { platform: 'youtube', url: 'https://youtube.com/parkcouplestherapy', username: 'Love That Lasts' },
        { platform: 'facebook', url: 'https://facebook.com/parkcouplestherapy', username: 'Park Couples Therapy' }
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
        { client_name: 'Rachel & Steve M.', review: 'We were on the brink of divorce when we found Michelle and James. Six months later, our marriage is stronger than it\'s ever been. They gave us the tools we needed to actually hear each other. Forever grateful.', rating: '5', program: 'The Complete Relationship Revival' },
        { client_name: 'Aisha & Marcus T.', review: 'The Premarital Foundations program was the best investment we made for our wedding — not the flowers, not the venue, but learning how to build a real partnership. We felt so prepared walking down the aisle.', rating: '5', program: 'Premarital Foundations' }
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
