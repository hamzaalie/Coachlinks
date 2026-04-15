import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const youthCoachTemplate = {
  name: 'Youth & Teen Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Youth Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Empowering Tagline' },
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
        { name: 'description', type: 'textarea', label: 'Youth Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Youth Specializations' },
        { name: 'experience', type: 'number', label: 'Years Coaching Teens' },
        { name: 'mission', type: 'textarea', label: 'Mission for Youth' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Youth Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Youth Coaching Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Program' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'camp', label: 'Youth Camp' },
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
      name: 'Signature Youth Program',
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
      name: 'Youth Impact Metrics',
      fields: [
        {
          name: 'executive_results',
          type: 'repeater',
          label: 'Impact Results',
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
      name: 'Teen Success Stories',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Teen Initial' },
            { name: 'challenge', type: 'textarea', label: 'Initial Challenge' },
            { name: 'transformation', type: 'textarea', label: 'Growth Journey' },
            { name: 'outcome', type: 'textarea', label: 'Current Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Youth Resource',
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
      name: 'Book a Discovery Session',
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
      name: 'Youth Empowerment Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'teen_tips', label: 'Teen Tips & Advice' },
              { value: 'motivation', label: 'Motivational Content' },
              { value: 'study_skills', label: 'Study Skills & Academics' },
              { value: 'confidence', label: 'Confidence Building' },
              { value: 'parent_guide', label: 'Parent Guide' }
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
    { name: 'Electric Youth', primary: '#6C63FF', secondary: '#8B83FF', accent: '#B8B3FF', background: '#F5F4FF', text: '#1A1A3E', cardBg: '#FFFFFF' },
    { name: 'Neon Sunshine', primary: '#FF6B35', secondary: '#FF8F5E', accent: '#FFB899', background: '#FFF6F0', text: '#2A1810', cardBg: '#FFFFFF' },
    { name: 'Aqua Fresh', primary: '#00B8D4', secondary: '#26C6DA', accent: '#80DEEA', background: '#F0FDFF', text: '#002A32', cardBg: '#FFFFFF' },
    { name: 'Pop Green', primary: '#00C853', secondary: '#69F0AE', accent: '#B9F6CA', background: '#F0FFF5', text: '#1A2E20', cardBg: '#FFFFFF' },
    { name: 'Bubblegum', primary: '#EC407A', secondary: '#F06292', accent: '#F8BBD0', background: '#FFF5F8', text: '#2D1020', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' },
    { name: 'Quicksand', value: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Comfortaa', value: 'Comfortaa, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Baloo 2', value: 'Baloo 2, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Fredoka', value: 'Fredoka, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#6C63FF',
    secondary: '#8B83FF',
    accent: '#B8B3FF',
    background: '#F5F4FF',
    text: '#1A1A3E',
    cardBg: '#FFFFFF',
    borderColor: '#B8B3FF',
    shadowColor: 'rgba(108, 99, 255, 0.15)'
  },
  defaultFont: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'vibrant-youth',
    headerStyle: 'energetic-hero',
    cardStyle: 'playful-cards',
    buttonStyle: 'bold-action',
    iconStyle: 'fun-icons',
    spacing: 'dynamic',
    shadows: 'pop-shadow',
    animations: 'bounce-in',
    backgroundPattern: 'confetti-burst',
    typography: 'friendly-rounded'
  },
  defaultData: {
    header: {
      name: 'Coach Jordan Rivera',
      title: 'Certified Youth Empowerment & Teen Success Coach',
      tagline: 'Helping teens unlock their superpowers, crush self-doubt, and build a future they\'re excited about — one bold step at a time',
      profile_image: ''
    },
    contact: {
      email: 'hello@coachjordanrivera.com',
      phone: '+1 (555) 234-5678',
      website: 'https://coachjordanrivera.com',
      location: 'Brooklyn, NY'
    },
    about: {
      description: 'Former high school counselor turned youth empowerment coach with 9 years of experience helping teens and young adults navigate the challenges of growing up. Certified through the Youth Coaching Institute and ICF. Passionate about helping adolescents develop confidence, academic excellence, and a clear vision for their future.',
      specializations: 'Teen Confidence, Academic Success, Future Planning, Social Skills, Bullying Recovery, Identity Development',
      experience: '9',
      mission: 'To empower every young person I work with to discover their unique strengths, overcome challenges with resilience, and step into their future with unshakeable confidence.'
    },
    programs: {
      program_list: [
        { title: 'Future Leaders Academy', description: 'A 12-week mentorship program for teens ready to develop leadership skills, emotional intelligence, and a roadmap for their dreams', duration: '12 weeks', format: 'group', price: '$1,497' },
        { title: 'Teen Confidence Bootcamp', description: 'Intensive weekend workshop where teens learn to silence their inner critic, speak up, and own their awesomeness', duration: '2 days', format: 'workshop', price: '$397' },
        { title: 'Academic Success Blueprint', description: 'One-on-one coaching to build study habits, time management, and motivation that actually stick', duration: '8 weeks', format: 'one-on-one', price: '$1,200' },
        { title: 'Summer Leadership Camp', description: 'An immersive week-long experience combining outdoor adventures, team challenges, and personal development', duration: '5 days', format: 'camp', price: '$1,800' }
      ]
    },
    signature_offer: {
      offer_title: 'The Unstoppable Teen Transformation',
      offer_description: 'My flagship 6-month 1:1 coaching journey for teens who are ready to completely level up — academically, socially, and personally. Designed for teens aged 13-18 who want to build real confidence that lasts.',
      offer_price: '$3,500',
      offer_includes: '• Comprehensive teen strengths assessment\n• Bi-weekly 45-minute 1:1 coaching sessions\n• Personalized goals and action plan\n• Monthly parent check-in calls\n• Access to the Future Leaders online community\n• Journaling and mindset workbook\n• Emergency support via text between sessions\n• Certificate of completion',
      offer_url: '#',
      offer_cta: 'Start Your Teen\'s Transformation'
    },
    results: {
      executive_results: [
        { metric: 'Self-Confidence Increase', value: '+82%', description: 'Average improvement in self-reported confidence scores among teen clients', timeframe: '12 weeks' },
        { metric: 'GPA Improvement', value: '+1.2 pts', description: 'Average GPA increase for students in the Academic Success Blueprint', timeframe: '1 semester' },
        { metric: 'College Acceptance Rate', value: '96%', description: 'Clients accepted to their top 3 college choices', timeframe: 'Senior year' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'M.K.', challenge: '15-year-old struggling with severe social anxiety, failing grades, and was being bullied at school', transformation: 'Built confidence through weekly coaching, developed study strategies, learned assertive communication', outcome: 'Now student council president, honor roll student, and mentoring younger kids at school', timeframe: '6 months' },
        { client_initial: 'T.J.', challenge: '17-year-old with no direction for the future, unmotivated, spending all time gaming, at risk of not graduating', transformation: 'Discovered passion for environmental science, set clear goals, built disciplined daily routine', outcome: 'Graduated with honors, earned scholarship to study environmental engineering, now leading campus sustainability club', timeframe: '8 months' }
      ]
    },
    lead_magnet: {
      title: 'The Teen Confidence Starter Kit: 7 Exercises to Build Unshakeable Self-Belief',
      description: 'A fun, interactive workbook for teens with confidence-building exercises, journaling prompts, and daily challenges that actually work. Parents love it too!',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book a Free Discovery Call',
      booking_description: 'A friendly 30-minute call (with your teen and parent/guardian) to understand what\'s going on, explore what\'s possible, and see if coaching is the right fit.',
      booking_url: 'https://calendly.com/coachjordan/discovery',
      booking_cta: 'Let\'s Chat — It\'s Free!'
    },
    videos: {
      video_list: [
        { title: '5 Ways to Help Your Teen Build Real Confidence', description: 'Practical tips for parents and teens to build authentic self-confidence that sticks', video_type: 'confidence', embed_url: '', thumbnail: '', duration: '12:30' },
        { title: 'Study Smarter, Not Harder: Teen Study Hacks', description: 'Science-backed study strategies that actually work for teen brains', video_type: 'study_skills', embed_url: '', thumbnail: '', duration: '15:45' },
        { title: 'From Shy to Shining: Marcus\'s Story', description: 'How a quiet teen became student council president through coaching', video_type: 'motivation', embed_url: '', thumbnail: '', duration: '10:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/coachjordanrivera',
      channel_name: 'Coach Jordan Rivera | Youth Empowerment',
      subscriber_count: '45K',
      featured_playlist: 'https://youtube.com/playlist?list=PLteenconfidence',
      latest_video_embed: '',
      channel_description: 'Real talk for teens and parents about confidence, academics, social skills, and building an amazing future. New videos every Monday and Thursday!'
    },
    speaking: {
      topics: [
        { topic: 'Generation Unstoppable: Empowering Today\'s Teens for Tomorrow\'s World', description: 'An energizing talk about the unique challenges and incredible potential of Gen Z, with practical strategies for parents and educators', audience: 'Schools, parent associations, education conferences', duration: '45-60 minutes' },
        { topic: 'The Confidence Code for Teens', description: 'Interactive workshop teaching teens the science and practice of building genuine self-confidence', audience: 'High school assemblies, youth organizations', duration: '60-90 minutes' },
        { topic: 'Bully-Proof: Building Resilient Kids', description: 'Evidence-based strategies for helping young people navigate social pressure, bullying, and peer dynamics', audience: 'Schools, parent groups, counselor conferences', duration: '45-75 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/coachjordanrivera', username: '@coachjordanrivera' },
        { platform: 'tiktok', url: 'https://tiktok.com/@coachjordanrivera', username: '@coachjordanrivera' },
        { platform: 'youtube', url: 'https://youtube.com/coachjordanrivera', username: 'Coach Jordan Rivera' }
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
        { client_name: 'Sarah K. (Parent)', review: 'Coach Jordan completely transformed my son\'s life. He went from dreading school and having zero confidence to being an honor roll student who actually enjoys going. Worth every penny!', rating: '5', program: 'Future Leaders Academy' },
        { client_name: 'Tyler J. (Teen Client)', review: 'Before working with Coach Jordan, I had no idea what I wanted to do with my life. Now I have goals, I\'m getting better grades, and I actually believe in myself. Best decision my family ever made.', rating: '5', program: 'The Unstoppable Teen Transformation' }
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
