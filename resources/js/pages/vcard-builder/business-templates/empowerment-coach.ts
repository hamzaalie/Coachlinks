import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const empowermentCoachTemplate = {
  name: 'Women\'s Empowerment Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Empowerment Coach Title' },
        { name: 'tagline', type: 'textarea', label: 'Empowering Message' },
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
        { name: 'description', type: 'textarea', label: 'Empowerment Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Empowerment Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Empowerment Mission' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Empowerment Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Empowerment Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Circle' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Empowerment Retreat' },
              { value: 'virtual', label: 'Virtual Program' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Empowerment Program',
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
      name: 'Empowerment Impact',
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
      name: 'Women\'s Transformation Stories',
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
      name: 'Free Empowerment Resource',
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
      name: 'Book an Empowerment Session',
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
      name: 'Empowerment Content',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'empowerment_talk', label: 'Empowerment Talk' },
              { value: 'leadership_tips', label: 'Leadership Tips' },
              { value: 'client_story', label: 'Client Story' },
              { value: 'workshop_preview', label: 'Workshop Preview' },
              { value: 'live_coaching', label: 'Live Coaching' }
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
    { name: 'Rose Gold', primary: '#B76E79', secondary: '#C9A0A0', accent: '#F2D7D9', background: '#FFF8F8', text: '#3D2B2B', cardBg: '#FFFFFF' },
    { name: 'Fierce Fuchsia', primary: '#880E4F', secondary: '#AD1457', accent: '#F48FB1', background: '#FFF0F6', text: '#2D0A1F', cardBg: '#FFFFFF' },
    { name: 'Golden Goddess', primary: '#BF8A30', secondary: '#D4A853', accent: '#E8D5A3', background: '#FFFBF0', text: '#3A2F1A', cardBg: '#FFFFFF' },
    { name: 'Lavender Dream', primary: '#7E57C2', secondary: '#9575CD', accent: '#D1C4E9', background: '#F8F4FF', text: '#2E1A4A', cardBg: '#FFFFFF' },
    { name: 'Coral Courage', primary: '#FF6F61', secondary: '#FF8A80', accent: '#FFAB91', background: '#FFF5F3', text: '#3A1A15', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Cormorant Garamond', value: 'Cormorant Garamond, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Playfair Display', value: 'Playfair Display, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville, Georgia, serif', weight: '400,700' },
    { name: 'EB Garamond', value: 'EB Garamond, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Merriweather', value: 'Merriweather, Georgia, serif', weight: '400,700' }
  ],
  defaultColors: {
    primary: '#B76E79',
    secondary: '#C9A0A0',
    accent: '#F2D7D9',
    background: '#FFF8F8',
    text: '#3D2B2B',
    cardBg: '#FFFFFF',
    borderColor: '#F2D7D9',
    shadowColor: 'rgba(183, 110, 121, 0.15)'
  },
  defaultFont: 'Cormorant Garamond, Georgia, serif',
  themeStyle: {
    layout: 'empowerment-flow',
    headerStyle: 'goddess-hero',
    cardStyle: 'elegant-rose-cards',
    buttonStyle: 'empowerment-buttons',
    iconStyle: 'feminine-elegant',
    spacing: 'graceful',
    shadows: 'soft-rose-glow',
    animations: 'bloom-transitions',
    backgroundPattern: 'floral-subtle',
    typography: 'elegant-serif'
  },
  defaultData: {
    header: {
      name: 'Dr. Amara Johnson',
      title: 'Women\'s Leadership & Empowerment Coach',
      tagline: 'Empowering ambitious women to own their voice, lead with confidence, and create lives of purpose, power, and unapologetic success',
      profile_image: ''
    },
    contact: {
      email: 'amara@drjohnsonempowers.com',
      phone: '+1 (404) 555-8200',
      website: 'https://drjohnsonempowers.com',
      location: 'Atlanta, GA'
    },
    about: {
      description: 'Clinical psychologist turned empowerment coach with 18 years of experience helping women break through glass ceilings, reclaim their power, and lead authentically. PhD in Organizational Psychology from Columbia University. Former corporate VP who walked away from the corner office to build a movement.',
      specializations: 'Women\'s Leadership, Executive Confidence, Imposter Syndrome Recovery, Boundary Setting, Career Reinvention, Public Speaking',
      experience: '18',
      mission: 'To create a world where every woman knows her worth, uses her voice, and leads without apology — in the boardroom, at home, and everywhere in between.'
    },
    programs: {
      program_list: [
        { title: 'The Unapologetic Leader', description: 'A 12-week 1:1 intensive for women in leadership who are ready to stop second-guessing, start commanding rooms, and lead with authentic power.', duration: '12 weeks', format: 'one-on-one', price: '$5,000' },
        { title: 'Rise & Lead Circle', description: 'An intimate group coaching experience for women who want community, accountability, and transformation. Limited to 12 women per cohort.', duration: '6 months', format: 'group', price: '$2,500' },
        { title: 'Goddess Retreat: Reconnect & Rise', description: 'A 4-day luxury retreat combining coaching, sisterhood, and self-discovery in a breathtaking setting. Includes all meals, workshops, and 1:1 sessions.', duration: '4 days', format: 'retreat', price: '$4,500' },
        { title: 'Own Your Voice Workshop', description: 'A full-day workshop on public speaking, executive presence, and owning your narrative as a woman leader.', duration: '1 day', format: 'workshop', price: '$497' }
      ]
    },
    signature_offer: {
      offer_title: 'The Empowered Woman Intensive',
      offer_description: 'My flagship 6-month transformation program combining deep psychological work, leadership development, and community support. Designed for women who are done playing small and ready to create extraordinary impact.',
      offer_price: '$8,000',
      offer_includes: '• Bi-weekly 75-minute 1:1 coaching sessions\n• Comprehensive strengths and limiting beliefs assessment\n• Personalized leadership development roadmap\n• Access to the Rise & Lead private community\n• Monthly group masterclass with guest experts\n• Unlimited Voxer support between sessions\n• Invitation to annual Goddess Retreat (value: $4,500)',
      offer_url: '#',
      offer_cta: 'Apply for The Empowered Woman Intensive'
    },
    results: {
      executive_results: [
        { metric: 'Women Promoted', value: '73%', description: 'Of clients promoted to senior leadership within 12 months of coaching', timeframe: '12 months' },
        { metric: 'Salary Increase', value: '+42%', description: 'Average salary increase negotiated by clients after confidence coaching', timeframe: '6 months' },
        { metric: 'Businesses Launched', value: '120+', description: 'Women who launched businesses or practices after completing the program', timeframe: '5 years' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'T.W.', challenge: 'Senior marketing director constantly overlooked for promotion, struggling with imposter syndrome and unable to advocate for herself in male-dominated leadership meetings', transformation: 'Rebuilt confidence foundation, developed executive communication style, and learned to command meetings with poise', outcome: 'Promoted to VP within 8 months, now leads a team of 35 and mentors other women in the organization', timeframe: '8 months' },
        { client_initial: 'R.H.', challenge: 'Corporate attorney burned out and feeling trapped, dreaming of starting her own practice but paralyzed by fear of failure and financial insecurity', transformation: 'Worked through limiting beliefs, created a strategic exit plan, and built confidence in her entrepreneurial vision', outcome: 'Launched her own law practice, surpassed her corporate salary within 18 months, and now works on her own terms', timeframe: '12 months' }
      ]
    },
    lead_magnet: {
      title: 'The Confidence Code: 7 Mindset Shifts Every Ambitious Woman Needs',
      description: 'A beautifully designed guide with the same frameworks I teach in my private coaching. Discover the 7 psychological shifts that separate women who lead from women who settle.',
      lead_magnet_type: 'ebook',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Empowerment Discovery Call',
      booking_description: 'A complimentary 30-minute call to explore where you are, where you want to be, and how coaching can bridge the gap. This is your first step toward the life you deserve.',
      booking_url: 'https://calendly.com/dramara/discovery',
      booking_cta: 'Claim Your Free Call'
    },
    videos: {
      video_list: [
        { title: 'Stop Asking for Permission to Lead', description: 'A powerful talk on why women need to stop waiting for validation and start owning their leadership', video_type: 'empowerment_talk', embed_url: '', thumbnail: '', duration: '16:30' },
        { title: '5 Ways to Crush Imposter Syndrome Today', description: 'Practical, research-backed strategies to silence your inner critic and show up with confidence', video_type: 'leadership_tips', embed_url: '', thumbnail: '', duration: '12:15' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/dramarajohnson',
      channel_name: 'Dr. Amara Johnson | Empowered Women Lead',
      subscriber_count: '92K',
      featured_playlist: 'https://youtube.com/playlist?list=PLempowermenttips',
      latest_video_embed: '',
      channel_description: 'Empowerment coaching, leadership wisdom, and unfiltered conversations about what it takes for women to lead, thrive, and rise. New videos every Monday.'
    },
    speaking: {
      topics: [
        { topic: 'The Unapologetic Woman: Leading Without Permission', description: 'Why women need to stop asking for a seat at the table and start building their own. A powerful keynote on authentic feminine leadership.', audience: 'Women\'s conferences, corporate ERGs, leadership summits', duration: '45-60 minutes' },
        { topic: 'Breaking the Glass Ceiling from the Inside', description: 'Research-backed strategies for women in corporate leadership to advocate for themselves, negotiate fearlessly, and create systemic change.', audience: 'Corporate events, women in tech, financial services', duration: '60-90 minutes' },
        { topic: 'From Burnout to Boss Moves', description: 'How ambitious women can stop sacrificing their wellbeing for success and build a life that honors both their ambition and their humanity.', audience: 'Wellness events, executive women groups, retreats', duration: '45-75 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Tanya Williams', review: 'Dr. Amara didn\'t just coach me — she helped me rediscover who I am. After years of shrinking to make others comfortable, I finally found my voice. I\'m now a VP leading a team of 35, and I\'ve never felt more aligned with my purpose.', rating: '5', program: 'The Unapologetic Leader' },
        { client_name: 'Rebecca Hart', review: 'The Goddess Retreat was the most transformative experience of my life. Surrounded by incredible women, guided by Amara\'s wisdom, I gained clarity I\'d been searching for for years. Three months later, I launched my business. No regrets.', rating: '5', program: 'Goddess Retreat' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/dramarajohnson', username: '@dramarajohnson' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/dramarajohnson', username: 'Dr. Amara Johnson' },
        { platform: 'facebook', url: 'https://facebook.com/dramarajohnson', username: 'Dr. Amara Johnson' }
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
