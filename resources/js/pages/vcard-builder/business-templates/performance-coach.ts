import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const performanceCoachTemplate = {
  name: 'Peak Performance Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Performance Coach Title' },
        { name: 'tagline', type: 'textarea', label: 'Power Statement' },
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
        { name: 'description', type: 'textarea', label: 'Performance Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Performance Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Performance Philosophy' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Performance Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Performance Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Team Training' },
              { value: 'workshop', label: 'Intensive Workshop' },
              { value: 'retreat', label: 'Performance Camp' },
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
      name: 'Signature Performance Program',
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
      name: 'Performance Metrics',
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
      name: 'Athlete & Client Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Performance Challenge' },
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
      name: 'Free Performance Resource',
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
      name: 'Book a Performance Assessment',
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
      name: 'Performance Training Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'training_session', label: 'Training Session' },
              { value: 'mental_conditioning', label: 'Mental Conditioning' },
              { value: 'athlete_spotlight', label: 'Athlete Spotlight' },
              { value: 'performance_tips', label: 'Performance Tips' },
              { value: 'competition_prep', label: 'Competition Prep' }
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
    { name: 'Champion Red', primary: '#B71C1C', secondary: '#F44336', accent: '#FF8A80', background: '#FFF5F5', text: '#1A0000', cardBg: '#FFFFFF' },
    { name: 'Victory Gold', primary: '#F57F17', secondary: '#FFCA28', accent: '#FFF176', background: '#FFFDF0', text: '#2A1F00', cardBg: '#FFFFFF' },
    { name: 'Titanium Steel', primary: '#455A64', secondary: '#78909C', accent: '#B0BEC5', background: '#F5F7F8', text: '#1C2833', cardBg: '#FFFFFF' },
    { name: 'Electric Surge', primary: '#0097A7', secondary: '#00BCD4', accent: '#80DEEA', background: '#F0FDFF', text: '#002A32', cardBg: '#FFFFFF' },
    { name: 'Obsidian Power', primary: '#1A1A2E', secondary: '#16213E', accent: '#0F3460', background: '#F5F5FA', text: '#1A1A2E', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Outfit', value: 'Outfit, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Barlow', value: 'Barlow, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Archivo', value: 'Archivo, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Rubik', value: 'Rubik, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Nunito Sans', value: 'Nunito Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' }
  ],
  defaultColors: {
    primary: '#B71C1C',
    secondary: '#F44336',
    accent: '#FF8A80',
    background: '#FFF5F5',
    text: '#1A0000',
    cardBg: '#FFFFFF',
    borderColor: '#FF8A80',
    shadowColor: 'rgba(183, 28, 28, 0.15)'
  },
  defaultFont: 'Outfit, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'power-grid',
    headerStyle: 'champion-hero',
    cardStyle: 'bold-impact-cards',
    buttonStyle: 'power-buttons',
    iconStyle: 'athletic',
    spacing: 'dynamic',
    shadows: 'strong-elevation',
    animations: 'explosive-transitions',
    backgroundPattern: 'diagonal-energy',
    typography: 'bold-sans'
  },
  defaultData: {
    header: {
      name: 'Dominic Reeves',
      title: 'Elite Peak Performance Coach',
      tagline: 'Unlock your full potential. Shatter your limits. Dominate every arena — from the boardroom to the arena',
      profile_image: ''
    },
    contact: {
      email: 'dom@reevesperformance.com',
      phone: '+1 (305) 555-6100',
      website: 'https://reevesperformance.com',
      location: 'Miami, FL'
    },
    about: {
      description: 'Former Division I athlete and military veteran turned elite performance coach. 15+ years training professional athletes, Fortune 500 executives, and special operations teams to perform under extreme pressure. Certified in sports psychology, neurolinguistic programming, and biofeedback optimization.',
      specializations: 'Mental Toughness, Flow State Training, Stress Inoculation, Recovery Optimization, Competition Preparation, Executive Performance',
      experience: '15',
      mission: 'To build unbreakable performers who thrive under pressure, recover faster, and consistently operate at their absolute peak.'
    },
    programs: {
      program_list: [
        { title: 'The Unbreakable Mind', description: 'A 12-week 1:1 mental performance program combining sports psychology, breathwork, visualization, and stress inoculation protocols for athletes and high-stakes professionals.', duration: '12 weeks', format: 'one-on-one', price: '$6,000' },
        { title: 'Team Dominance Camp', description: '3-day intensive performance camp for sports teams and corporate teams. Includes physical challenges, mental conditioning, and team cohesion exercises.', duration: '3 days', format: 'retreat', price: '$15,000/team' },
        { title: 'Flow State Mastery', description: 'Group coaching program designed to help performers access and sustain the flow state on demand. Combines neuroscience with practical application.', duration: '8 weeks', format: 'group', price: '$2,497' },
        { title: 'Pre-Competition Edge Protocol', description: 'Targeted 4-week program for athletes preparing for major competitions, championships, or tryouts.', duration: '4 weeks', format: 'virtual', price: '$1,500' }
      ]
    },
    signature_offer: {
      offer_title: 'The Apex Protocol',
      offer_description: 'My elite 6-month transformation program for athletes and executives who demand the highest level of performance. Combines mental conditioning, biofeedback training, recovery science, and accountability to create an unshakeable competitive edge.',
      offer_price: '$12,000',
      offer_includes: '• Comprehensive performance baseline assessment\n• Bi-weekly 1:1 coaching sessions\n• Custom mental conditioning protocols\n• Biofeedback and HRV monitoring setup\n• Personalized recovery and sleep optimization plan\n• 24/7 text access for competition-day support\n• Quarterly performance benchmarking',
      offer_url: '#',
      offer_cta: 'Apply for The Apex Protocol'
    },
    results: {
      executive_results: [
        { metric: 'Performance Under Pressure', value: '+41%', description: 'Average improvement in high-stakes performance metrics across clients', timeframe: '12 weeks' },
        { metric: 'Recovery Speed', value: '2x faster', description: 'Clients recover from physical and mental fatigue twice as fast', timeframe: '8 weeks' },
        { metric: 'Championship Wins', value: '23 titles', description: 'Clients who won championships, titles, or major competitions while under my coaching', timeframe: '5 years' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'J.A.', challenge: 'Professional MMA fighter choking in big fights, unable to perform under the spotlight despite dominating in training', transformation: 'Implemented pressure inoculation drills, pre-fight mental protocols, and real-time breathwork techniques', outcome: 'Won 4 consecutive fights including a title bout, now ranked #3 in division', timeframe: '6 months' },
        { client_initial: 'S.K.', challenge: 'Tech CEO experiencing severe performance anxiety before investor presentations and board meetings', transformation: 'Developed pre-performance rituals, cognitive reframing techniques, and physiological regulation protocols', outcome: 'Successfully closed $40M Series C round, rated top CEO presenter by investors', timeframe: '3 months' }
      ]
    },
    lead_magnet: {
      title: 'The Peak Performance Mindset: 5 Mental Conditioning Drills Used by Elite Athletes',
      description: 'The exact mental conditioning protocols I use with professional athletes and elite performers. Includes breathwork sequences, visualization scripts, and pre-performance activation routines.',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Performance Assessment',
      booking_description: 'A complimentary 30-minute call to assess your current performance level, identify your biggest limiters, and determine if elite coaching is right for you.',
      booking_url: 'https://calendly.com/domreeves/assessment',
      booking_cta: 'Schedule Your Assessment'
    },
    videos: {
      video_list: [
        { title: 'The 5-Minute Pre-Performance Protocol', description: 'The exact activation sequence I teach every client before their biggest moments', video_type: 'mental_conditioning', embed_url: '', thumbnail: '', duration: '14:20' },
        { title: 'How to Access Flow State on Demand', description: 'The neuroscience behind flow and practical steps to trigger it consistently', video_type: 'performance_tips', embed_url: '', thumbnail: '', duration: '19:45' },
        { title: 'From Choking to Champion: Jake\'s Story', description: 'How professional fighter Jake turned his biggest weakness into his greatest weapon', video_type: 'athlete_spotlight', embed_url: '', thumbnail: '', duration: '11:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/domreeves',
      channel_name: 'Dominic Reeves Performance',
      subscriber_count: '198K',
      featured_playlist: 'https://youtube.com/playlist?list=PLpeakperformance',
      latest_video_embed: '',
      channel_description: 'Elite performance training, mental conditioning, and peak performance science for athletes and high-performers. New videos every Tuesday and Friday.'
    },
    speaking: {
      topics: [
        { topic: 'The Unbreakable Mindset', description: 'How elite performers train their minds to thrive under pressure, recover from failure, and consistently deliver when it matters most', audience: 'Sports teams, corporate leadership, military events', duration: '45-75 minutes' },
        { topic: 'Flow State: The Science of Peak Performance', description: 'A deep dive into the neuroscience of flow and practical strategies to access optimal performance states on demand', audience: 'Conferences, tech companies, athletic organizations', duration: '60-90 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Jake Anderson', review: 'Dom completely rewired how I approach competition. I used to crumble under pressure — now I thrive in it. He gave me the mental edge that technique alone couldn\'t. 4 straight wins and a title belt later, I\'m a believer for life.', rating: '5', program: 'The Unbreakable Mind' },
        { client_name: 'Sarah Kim', review: 'I came to Dom as a burned-out CEO who couldn\'t think straight before high-stakes meetings. His performance protocols are next-level. I now walk into any room with absolute clarity and confidence. Game changer.', rating: '5', program: 'The Apex Protocol' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/domreeves', username: '@domreeves' },
        { platform: 'youtube', url: 'https://youtube.com/domreeves', username: 'Dominic Reeves Performance' },
        { platform: 'twitter', url: 'https://twitter.com/domreeves', username: '@domreeves' }
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
