import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const communicationCoachTemplate = {
  name: 'Communication & Influence Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Communication Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Powerful Tagline' },
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
        { name: 'description', type: 'textarea', label: 'Communication Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Communication Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Coaching Mission' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Communication Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Coaching Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Training' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'corporate', label: 'Corporate Training' },
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
      name: 'Signature Communication Program',
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
      name: 'Communication Results',
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
      name: 'Speaker Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Communication Challenge' },
            { name: 'transformation', type: 'textarea', label: 'Transformation Journey' },
            { name: 'outcome', type: 'textarea', label: 'Current Impact' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Communication Resource',
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
      name: 'Book a Communication Assessment',
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
      name: 'Communication Mastery Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'public_speaking', label: 'Public Speaking Tips' },
              { value: 'executive_presence', label: 'Executive Presence' },
              { value: 'storytelling', label: 'Storytelling Techniques' },
              { value: 'client_speech', label: 'Client Speech Example' },
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
    { name: 'Stage Presence', primary: '#1A237E', secondary: '#283593', accent: '#5C6BC0', background: '#F0F2FF', text: '#0A0E3A', cardBg: '#FFFFFF' },
    { name: 'Clear Voice', primary: '#00838F', secondary: '#0097A7', accent: '#4DD0E1', background: '#F0FCFF', text: '#002A32', cardBg: '#FFFFFF' },
    { name: 'Warm Impact', primary: '#BF360C', secondary: '#E65100', accent: '#FF8F00', background: '#FFF5F0', text: '#3A1500', cardBg: '#FFFFFF' },
    { name: 'Charcoal Clarity', primary: '#37474F', secondary: '#546E7A', accent: '#90A4AE', background: '#F5F7F8', text: '#1C2833', cardBg: '#FFFFFF' },
    { name: 'Regal Purple', primary: '#4A148C', secondary: '#6A1B9A', accent: '#AB47BC', background: '#F9F0FF', text: '#1A0530', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Lexend', value: 'Lexend, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'General Sans', value: 'General Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Satoshi', value: 'Satoshi, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,700' },
    { name: 'Switzer', value: 'Switzer, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#1A237E',
    secondary: '#283593',
    accent: '#5C6BC0',
    background: '#F0F2FF',
    text: '#0A0E3A',
    cardBg: '#FFFFFF',
    borderColor: '#5C6BC0',
    shadowColor: 'rgba(26, 35, 126, 0.15)'
  },
  defaultFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'confident-stage',
    headerStyle: 'commanding-hero',
    cardStyle: 'polished-cards',
    buttonStyle: 'authoritative-action',
    iconStyle: 'sharp-professional',
    spacing: 'structured',
    shadows: 'crisp-definition',
    animations: 'confident-slide',
    backgroundPattern: 'podium-lines',
    typography: 'clean-modern'
  },
  defaultData: {
    header: {
      name: 'Prof. David Okonkwo',
      title: 'TEDx Speaker Coach & Executive Communication Strategist',
      tagline: 'Your ideas deserve to be heard. I help leaders, executives, and changemakers communicate with clarity, confidence, and undeniable impact.',
      profile_image: ''
    },
    contact: {
      email: 'david@okonkwocommunications.com',
      phone: '+1 (555) 678-9012',
      website: 'https://okonkwocommunications.com',
      location: 'Washington, D.C.'
    },
    about: {
      description: 'Former university professor of rhetoric turned executive communication coach with 18 years of experience helping leaders find their voice. I\'ve coached 40+ TEDx speakers, trained executives at Fortune 100 companies, and helped political candidates craft messages that move millions. My approach blends classical rhetoric, modern neuroscience, and performance coaching to help you communicate with unforgettable impact.',
      specializations: 'Public Speaking, TEDx Coaching, Executive Presence, Storytelling for Leaders, Media Training, Persuasion Science, Presentation Design, Pitch Coaching',
      experience: '18',
      mission: 'To empower every leader I work with to communicate their ideas with such clarity and conviction that they become impossible to ignore.'
    },
    programs: {
      program_list: [
        { title: 'Speak to Influence', description: 'A 10-week 1:1 intensive that transforms your public speaking from adequate to extraordinary. Includes speech writing, delivery coaching, and live practice sessions', duration: '10 weeks', format: 'one-on-one', price: '$5,500' },
        { title: 'Executive Presence Masterclass', description: 'A 2-day immersive workshop for senior leaders who need to command any room, from boardrooms to ballrooms', duration: '2 days', format: 'workshop', price: '$1,997' },
        { title: 'Storytelling for Leaders', description: 'A 6-week group program teaching the art and science of business storytelling to inspire teams, win clients, and drive change', duration: '6 weeks', format: 'group', price: '$1,497' },
        { title: 'Corporate Communication Training', description: 'Custom communication training programs for organizations — from presentation skills to media readiness', duration: 'Custom', format: 'corporate', price: 'From $10,000' }
      ]
    },
    signature_offer: {
      offer_title: 'The Complete Communicator Transformation',
      offer_description: 'My most comprehensive program: 6 months of intensive communication coaching for executives and leaders who want to master every dimension of influence — from keynote stages to one-on-one conversations.',
      offer_price: '$12,000',
      offer_includes: '• Comprehensive communication assessment and style analysis\n• Bi-weekly 60-minute 1:1 coaching sessions\n• Custom speech/presentation development (up to 3)\n• On-camera media training with video review\n• Executive presence and body language coaching\n• Storytelling framework and narrative toolkit\n• VIP access to one Executive Presence Masterclass\n• Pre-event coaching for any presentation or speech',
      offer_url: '#',
      offer_cta: 'Become an Unforgettable Communicator'
    },
    results: {
      executive_results: [
        { metric: 'Speaker Confidence', value: '+94%', description: 'Average increase in self-reported speaking confidence after completing the program', timeframe: '10 weeks' },
        { metric: 'Audience Engagement', value: '+3.2x', description: 'Measured improvement in audience engagement metrics (retention, Q&A participation, post-talk actions)', timeframe: '6 months' },
        { metric: 'TEDx Talks Delivered', value: '40+', description: 'Speakers coached who have successfully delivered TEDx talks', timeframe: 'Career total' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'L.H.', challenge: 'Brilliant CTO who couldn\'t present to the board without losing her audience in technical jargon. Was being passed over for CEO consideration despite being the most qualified candidate', transformation: 'Learned to translate complex ideas into compelling narratives, developed commanding stage presence, and mastered the art of executive storytelling', outcome: 'Appointed CEO of her company. Her board presentation was described as "the most compelling case for the role anyone had ever seen." Now a sought-after keynote speaker', timeframe: '4 months' },
        { client_initial: 'M.A.', challenge: 'Nonprofit founder with a world-changing mission but paralyzing stage fright. Wanted to deliver a TEDx talk but could barely speak in front of 10 people', transformation: 'Systematic desensitization combined with speech structure coaching, repeated practice, and performance mindset techniques', outcome: 'Delivered a TEDx talk that has been viewed over 2.1 million times. Now speaks regularly at international conferences and doubled nonprofit funding through public advocacy', timeframe: '6 months' }
      ]
    },
    lead_magnet: {
      title: 'The Speaker\'s Playbook: 10 Frameworks for Speeches That Move People to Action',
      description: 'A comprehensive guide featuring the exact speech structures used by the world\'s most influential communicators — from TED talks to presidential addresses. Includes templates, examples, and exercises.',
      lead_magnet_type: 'ebook',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Communication Assessment',
      booking_description: 'A focused 30-minute call where we assess your current communication strengths, identify your biggest opportunities for growth, and map out a path to becoming the speaker and leader you want to be.',
      booking_url: 'https://calendly.com/profokonkwo/assessment',
      booking_cta: 'Find Your Voice'
    },
    videos: {
      video_list: [
        { title: 'The 3 Mistakes That Kill Your Credibility on Stage', description: 'The most common mistakes speakers make — and the simple fixes that instantly boost your authority and impact', video_type: 'public_speaking', embed_url: '', thumbnail: '', duration: '15:30' },
        { title: 'How to Tell Stories That Move People to Action', description: 'The neuroscience behind persuasive storytelling and a 5-step framework anyone can use', video_type: 'storytelling', embed_url: '', thumbnail: '', duration: '20:45' },
        { title: 'From Stage Fright to TEDx Star: Miriam\'s Journey', description: 'How a terrified nonprofit founder became a viral TEDx speaker in 6 months', video_type: 'client_speech', embed_url: '', thumbnail: '', duration: '12:20' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/profokonkwo',
      channel_name: 'Prof. David Okonkwo | Speak to Influence',
      subscriber_count: '156K',
      featured_playlist: 'https://youtube.com/playlist?list=PLspeaktoinfluence',
      latest_video_embed: '',
      channel_description: 'Public speaking mastery, executive communication, and persuasion science for leaders who want to make an unforgettable impact. New videos every Monday and Thursday.'
    },
    speaking: {
      topics: [
        { topic: 'The Rhetoric of Leadership: Communicating to Inspire', description: 'Why the greatest leaders in history were also the greatest communicators — and the timeless principles every modern leader must master', audience: 'Corporate leadership events, C-suite retreats, business conferences', duration: '60-90 minutes' },
        { topic: 'Speak to Sell: The Art of Persuasive Communication', description: 'How to structure presentations and pitches that don\'t just inform but compel action — from investors to customers to board members', audience: 'Sales teams, startup founders, business development groups', duration: '45-60 minutes' },
        { topic: 'Finding Your Voice: Communication for Underrepresented Leaders', description: 'How leaders from underrepresented backgrounds can own their narrative, command rooms, and ensure their voices are heard in spaces that weren\'t designed for them', audience: 'DEI events, leadership diversity programs, ERG conferences', duration: '60-75 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/profdavidokonkwo', username: 'Prof. David Okonkwo' },
        { platform: 'twitter', url: 'https://twitter.com/profokonkwo', username: '@profokonkwo' },
        { platform: 'youtube', url: 'https://youtube.com/profokonkwo', username: 'Speak to Influence' }
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
        { client_name: 'Lisa Huang', review: 'David literally changed the trajectory of my career. I went from the CTO nobody listened to to the CEO who commands every room. His coaching is part art, part science, and entirely transformative. I owe my career\'s biggest leap to his guidance.', rating: '5', program: 'The Complete Communicator Transformation' },
        { client_name: 'Miriam Al-Rashid', review: 'I couldn\'t speak in front of 10 people without shaking. Six months with David, and I delivered a TEDx talk that\'s been watched over 2 million times. He doesn\'t just teach speaking — he helps you believe your story deserves to be told.', rating: '5', program: 'Speak to Influence' }
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
