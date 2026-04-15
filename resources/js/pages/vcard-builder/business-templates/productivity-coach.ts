import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const productivityCoachTemplate = {
  name: 'Productivity & Performance Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Productivity Coach Title' },
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
        { name: 'description', type: 'textarea', label: 'Productivity Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Productivity Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Productivity Philosophy' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Productivity Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Productivity Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Program' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Productivity Retreat' },
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
      name: 'Signature Productivity System',
      fields: [
        { name: 'offer_title', type: 'text', label: 'Signature System Name' },
        { name: 'offer_description', type: 'textarea', label: 'System Description' },
        { name: 'offer_price', type: 'text', label: 'Investment' },
        { name: 'offer_includes', type: 'textarea', label: 'What\'s Included' },
        { name: 'offer_url', type: 'url', label: 'Program URL' },
        { name: 'offer_cta', type: 'text', label: 'Call to Action' }
      ],
      required: false
    },
    {
      key: 'results',
      name: 'Productivity Results',
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
      name: 'Client Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Productivity Challenge' },
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
      name: 'Free Productivity Resource',
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
      name: 'Book a Productivity Audit',
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
      name: 'Productivity Tips',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'system_walkthrough', label: 'System Walkthrough' },
              { value: 'time_management', label: 'Time Management Tips' },
              { value: 'tool_review', label: 'Tool Review' },
              { value: 'deep_work', label: 'Deep Work Strategies' },
              { value: 'client_results', label: 'Client Results' }
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
    { name: 'Focus Blue', primary: '#1565C0', secondary: '#42A5F5', accent: '#90CAF9', background: '#F5F9FF', text: '#0D1B2A', cardBg: '#FFFFFF' },
    { name: 'Efficiency Green', primary: '#2E7D32', secondary: '#66BB6A', accent: '#A5D6A7', background: '#F1F8E9', text: '#1B2E1C', cardBg: '#FFFFFF' },
    { name: 'Time Master', primary: '#E65100', secondary: '#FF9100', accent: '#FFD180', background: '#FFF8F0', text: '#2A1800', cardBg: '#FFFFFF' },
    { name: 'Deep Work', primary: '#283593', secondary: '#5C6BC0', accent: '#9FA8DA', background: '#F0F2FF', text: '#1A1A3E', cardBg: '#FFFFFF' },
    { name: 'Minimal Zen', primary: '#37474F', secondary: '#78909C', accent: '#B0BEC5', background: '#FAFBFC', text: '#263238', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Space Grotesk', value: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'IBM Plex Sans', value: 'IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Red Hat Display', value: 'Red Hat Display, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Manrope', value: 'Manrope, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' }
  ],
  defaultColors: {
    primary: '#1565C0',
    secondary: '#42A5F5',
    accent: '#90CAF9',
    background: '#F5F9FF',
    text: '#0D1B2A',
    cardBg: '#FFFFFF',
    borderColor: '#90CAF9',
    shadowColor: 'rgba(21, 101, 192, 0.15)'
  },
  defaultFont: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'systems-grid',
    headerStyle: 'focused-hero',
    cardStyle: 'clean-metric-cards',
    buttonStyle: 'action-buttons',
    iconStyle: 'systematic',
    spacing: 'structured',
    shadows: 'crisp-elevation',
    animations: 'snap-transitions',
    backgroundPattern: 'grid-lines',
    typography: 'technical-sans'
  },
  defaultData: {
    header: {
      name: 'Marcus Chen',
      title: 'Productivity Systems Architect & Performance Coach',
      tagline: 'Helping ambitious professionals reclaim 10+ hours per week through proven systems, deep work strategies, and intentional time design',
      profile_image: ''
    },
    contact: {
      email: 'marcus@chensystems.com',
      phone: '+1 (415) 555-3400',
      website: 'https://chensystems.com',
      location: 'San Francisco, CA'
    },
    about: {
      description: 'Former tech startup CTO who burned out from 80-hour weeks. After redesigning my own productivity system, I went from overwhelmed to operating at peak performance in half the time. Now I help executives, founders, and high-performers build systems that eliminate busywork and maximize output.',
      specializations: 'Time Management Systems, Deep Work Optimization, Digital Minimalism, Energy Management, Workflow Automation, Focus Strategies',
      experience: '10',
      mission: 'To help every professional work smarter — not harder — by building personalized productivity systems that create time for what truly matters.'
    },
    programs: {
      program_list: [
        { title: 'The Systemized Executive', description: 'A 90-day 1:1 program to design, build, and optimize your personalized productivity operating system. Includes workflow audit, tool stack optimization, and habit architecture.', duration: '90 days', format: 'one-on-one', price: '$4,500' },
        { title: 'Deep Work Bootcamp', description: 'Intensive 2-day workshop to master distraction elimination, time-blocking, and sustained focus for knowledge workers.', duration: '2 days', format: 'workshop', price: '$997' },
        { title: 'Productivity Mastermind', description: 'Quarterly cohort-based group program for founders and executives. Weekly accountability, system reviews, and peer optimization sessions.', duration: '12 weeks', format: 'group', price: '$2,500' },
        { title: 'Automation Blueprint Course', description: 'Self-paced online course teaching you to automate repetitive tasks, build efficient workflows, and leverage AI tools for maximum leverage.', duration: 'Self-paced', format: 'virtual', price: '$497' }
      ]
    },
    signature_offer: {
      offer_title: 'The Productivity Operating System™',
      offer_description: 'My flagship framework that transforms how you manage time, energy, and attention. This isn\'t about tips and tricks — it\'s about building a complete system that runs your work life on autopilot.',
      offer_price: '$4,500',
      offer_includes: '• Full productivity audit and diagnostic\n• Custom-built task management system\n• Time-blocking architecture for your role\n• Tool stack optimization and automation setup\n• Weekly coaching calls for 90 days\n• Lifetime access to system templates and updates',
      offer_url: '#',
      offer_cta: 'Build Your Productivity OS'
    },
    results: {
      executive_results: [
        { metric: 'Hours Reclaimed', value: '12.4 hrs/week', description: 'Average weekly hours reclaimed by clients through system optimization', timeframe: '90 days' },
        { metric: 'Output Increase', value: '+83%', description: 'Average increase in meaningful output (projects completed, revenue generated)', timeframe: '6 months' },
        { metric: 'Email Time Reduction', value: '-67%', description: 'Average reduction in time spent on email and communication overhead', timeframe: '30 days' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'T.P.', challenge: 'Startup CEO working 70+ hours/week, constantly firefighting, missing family time and burning out', transformation: 'Implemented time-blocking system, delegated 40% of tasks, automated reporting and follow-ups', outcome: 'Now works 45 hours/week while growing revenue 2x. Takes Fridays off.', timeframe: '90 days' },
        { client_initial: 'L.W.', challenge: 'Senior product manager drowning in meetings, unable to do deep work, falling behind on strategic projects', transformation: 'Redesigned meeting cadence, implemented async communication protocols, built deep work blocks', outcome: 'Shipped 3 major features in the quarter vs. 1 the previous quarter. Promoted to Director.', timeframe: '8 weeks' }
      ]
    },
    lead_magnet: {
      title: 'The 10-Hour Week: Productivity Audit Toolkit',
      description: 'A step-by-step toolkit to audit your current workflow, identify time leaks, and reclaim 10+ hours per week. Includes templates, tracking sheets, and an action plan.',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Productivity Audit',
      booking_description: 'A 30-minute diagnostic call where we\'ll identify your top 3 time leaks, assess your current systems, and create a roadmap to reclaim your time.',
      booking_url: 'https://calendly.com/marcuschen/productivity-audit',
      booking_cta: 'Get Your Free Audit'
    },
    videos: {
      video_list: [
        { title: 'How I Reclaimed 15 Hours Per Week', description: 'The exact system I used to go from 80-hour weeks to peak performance in 45 hours', video_type: 'system_walkthrough', embed_url: '', thumbnail: '', duration: '20:15' },
        { title: 'The Deep Work Protocol', description: 'Step-by-step guide to creating distraction-free deep work blocks that triple your output', video_type: 'deep_work', embed_url: '', thumbnail: '', duration: '16:30' },
        { title: 'Top 5 Productivity Tools for 2025', description: 'The essential tools I recommend to every client for maximum efficiency and automation', video_type: 'tool_review', embed_url: '', thumbnail: '', duration: '12:45' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/marcuschenproductivity',
      channel_name: 'Marcus Chen | Productivity Systems',
      subscriber_count: '156K',
      featured_playlist: 'https://youtube.com/playlist?list=PLproductivitysystems',
      latest_video_embed: '',
      channel_description: 'Evidence-based productivity strategies, system walkthroughs, and tool reviews for ambitious professionals. New videos every Monday and Thursday.'
    },
    speaking: {
      topics: [
        { topic: 'The Productivity Operating System', description: 'How to design a personalized productivity system that eliminates busywork and maximizes your highest-value output', audience: 'Tech companies, startup events, leadership summits', duration: '45-60 minutes' },
        { topic: 'Deep Work in the Age of Distraction', description: 'Research-backed strategies for sustained focus and cognitive performance in an always-connected world', audience: 'Corporate teams, knowledge workers, conferences', duration: '30-60 minutes' },
        { topic: 'Automate or Stagnate', description: 'How to leverage automation and AI tools to 10x your output without working more hours', audience: 'Founders, executives, tech teams', duration: '45-75 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Trevor Park', review: 'Marcus completely transformed how I work. I went from 70-hour weeks of chaos to a calm, structured 45-hour week while actually getting MORE done. His systems approach is brilliant and practical.', rating: '5', program: 'The Systemized Executive' },
        { client_name: 'Lisa Watanabe', review: 'The Deep Work Bootcamp was the most impactful 2 days of my career. I now protect 4 hours of deep focus time daily, and my output has tripled. Every knowledge worker needs this.', rating: '5', program: 'Deep Work Bootcamp' }
      ]
    },
    social: {
      social_links: [
        { platform: 'twitter', url: 'https://twitter.com/marcuschenProd', username: '@marcuschenProd' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/marcuschen', username: 'Marcus Chen' },
        { platform: 'youtube', url: 'https://youtube.com/marcuschenproductivity', username: 'Marcus Chen' }
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
