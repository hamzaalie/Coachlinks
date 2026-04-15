import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const burnoutCoachTemplate = {
  name: 'Burnout Recovery & Resilience Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Recovery Coach Title' },
        { name: 'tagline', type: 'textarea', label: 'Healing Message' },
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
        { name: 'description', type: 'textarea', label: 'Burnout Recovery Background' },
        { name: 'specializations', type: 'tags', label: 'Recovery Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Recovery Philosophy' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Recovery Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Recovery Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Group Support' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Wellness Retreat' },
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
      name: 'Signature Recovery Program',
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
      name: 'Recovery Results',
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
      name: 'Recovery Journeys',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Burnout Situation' },
            { name: 'transformation', type: 'textarea', label: 'Recovery Journey' },
            { name: 'outcome', type: 'textarea', label: 'Current Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Recovery Resource',
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
      name: 'Book a Recovery Consultation',
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
      name: 'Wellness & Recovery Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'recovery_tips', label: 'Recovery Tips' },
              { value: 'stress_management', label: 'Stress Management' },
              { value: 'mindfulness', label: 'Mindfulness Practice' },
              { value: 'client_journey', label: 'Client Recovery Journey' },
              { value: 'workplace_wellness', label: 'Workplace Wellness' }
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
    { name: 'Serene Sage', primary: '#5D7B6F', secondary: '#8FA89A', accent: '#C8DDD0', background: '#F5FAF7', text: '#1A2E23', cardBg: '#FFFFFF' },
    { name: 'Ocean Calm', primary: '#37768F', secondary: '#5DA3BD', accent: '#A0D2E7', background: '#F0F8FC', text: '#1A2A34', cardBg: '#FFFFFF' },
    { name: 'Warm Earth', primary: '#795548', secondary: '#A1887F', accent: '#D7CCC8', background: '#FAF5F2', text: '#3E2723', cardBg: '#FFFFFF' },
    { name: 'Twilight Rest', primary: '#5C6B8A', secondary: '#8494B2', accent: '#B8C5D9', background: '#F5F7FB', text: '#2D3448', cardBg: '#FFFFFF' },
    { name: 'Sand & Sky', primary: '#B28B5E', secondary: '#C8A882', accent: '#E0D0B8', background: '#FAF7F2', text: '#3A2F22', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Nunito', value: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700,800' },
    { name: 'Karla', value: 'Karla, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Lato', value: 'Lato, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,700' },
    { name: 'Cabin', value: 'Cabin, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Assistant', value: 'Assistant, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,600,700' }
  ],
  defaultColors: {
    primary: '#5D7B6F',
    secondary: '#8FA89A',
    accent: '#C8DDD0',
    background: '#F5FAF7',
    text: '#1A2E23',
    cardBg: '#FFFFFF',
    borderColor: '#C8DDD0',
    shadowColor: 'rgba(93, 123, 111, 0.15)'
  },
  defaultFont: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'calm-sanctuary',
    headerStyle: 'gentle-hero',
    cardStyle: 'soft-healing-cards',
    buttonStyle: 'nurturing-buttons',
    iconStyle: 'calming',
    spacing: 'breathable',
    shadows: 'whisper-soft',
    animations: 'gentle-fade',
    backgroundPattern: 'soft-waves',
    typography: 'warm-humanist'
  },
  defaultData: {
    header: {
      name: 'Dr. Elena Martinez',
      title: 'Burnout Recovery Specialist & Workplace Wellness Advocate',
      tagline: 'You gave everything to your career. Now it\'s time to get yourself back. Recover, rebuild, and rediscover a life that sustains you.',
      profile_image: ''
    },
    contact: {
      email: 'elena@drmartinezwellness.com',
      phone: '+1 (512) 555-4700',
      website: 'https://drmartinezwellness.com',
      location: 'Austin, TX'
    },
    about: {
      description: 'Licensed clinical psychologist and certified burnout recovery coach with 14 years of experience helping high-achieving professionals recover from chronic stress and burnout. PhD in Clinical Psychology from UT Austin. Former hospital psychologist who experienced burnout firsthand and turned personal recovery into a mission to help others.',
      specializations: 'Burnout Recovery, Stress Management, Workplace Resilience, Nervous System Regulation, Boundary Setting, Work-Life Integration',
      experience: '14',
      mission: 'To help dedicated professionals heal from burnout, build sustainable resilience, and create careers that nourish rather than deplete them.'
    },
    programs: {
      program_list: [
        { title: 'The Restoration Protocol', description: 'A comprehensive 12-week 1:1 program combining clinical psychology, somatic practices, and lifestyle redesign to guide you from burnout to full recovery.', duration: '12 weeks', format: 'one-on-one', price: '$4,200' },
        { title: 'Resilience Circle', description: 'A supportive group program for professionals in burnout recovery. Weekly sessions blending psychoeducation, peer support, and practical tools.', duration: '8 weeks', format: 'group', price: '$997' },
        { title: 'Sanctuary Retreat', description: 'A 3-day immersive wellness retreat in the Texas Hill Country combining rest, therapy, yoga, and nature to accelerate your recovery journey.', duration: '3 days', format: 'retreat', price: '$3,200' },
        { title: 'Corporate Burnout Prevention Workshop', description: 'An evidence-based workshop for organizations to identify, prevent, and address burnout across their teams.', duration: 'Half-day or full-day', format: 'workshop', price: '$5,000/org' }
      ]
    },
    signature_offer: {
      offer_title: 'The Full Recovery Journey',
      offer_description: 'My most comprehensive program: 6 months of guided recovery combining 1:1 coaching, nervous system regulation techniques, lifestyle redesign, and ongoing support. For professionals who are ready to fully heal and build a burnout-proof life.',
      offer_price: '$7,500',
      offer_includes: '• Comprehensive burnout assessment and recovery plan\n• Bi-weekly 60-minute 1:1 coaching sessions\n• Personalized nervous system regulation protocol\n• Sleep optimization and energy management plan\n• Boundary audit and communication scripts\n• Monthly somatic experiencing sessions\n• Access to the Resilience Circle community\n• Unlimited Voxer support for real-time check-ins',
      offer_url: '#',
      offer_cta: 'Begin Your Recovery Journey'
    },
    results: {
      executive_results: [
        { metric: 'Burnout Score Reduction', value: '-72%', description: 'Average reduction in Maslach Burnout Inventory scores after completing the program', timeframe: '12 weeks' },
        { metric: 'Sleep Quality Improvement', value: '+85%', description: 'Clients reporting significantly improved sleep quality and duration', timeframe: '8 weeks' },
        { metric: 'Career Satisfaction', value: '+64%', description: 'Increase in self-reported career satisfaction and work-life balance', timeframe: '6 months' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'A.P.', challenge: 'Emergency room physician experiencing severe burnout — chronic fatigue, emotional numbness, considering leaving medicine entirely', transformation: 'Implemented nervous system regulation practices, redesigned work schedule, established firm boundaries with hospital administration', outcome: 'Returned to ER work part-time with renewed purpose, started a wellness program for residents, sleep and energy fully restored', timeframe: '5 months' },
        { client_initial: 'K.N.', challenge: 'Tech startup founder working 80+ hours/week, experiencing panic attacks, insomnia, and relationship breakdown from chronic overwork', transformation: 'Learned to delegate, implemented recovery rituals, rebuilt personal relationships, and created sustainable work rhythms', outcome: 'Company thriving with her working 45 hours/week, panic attacks resolved, marriage repaired, running her first marathon', timeframe: '6 months' }
      ]
    },
    lead_magnet: {
      title: 'The Burnout Recovery Starter Kit: 5 Evidence-Based Steps to Begin Healing Today',
      description: 'A gentle, research-backed guide to start your recovery journey right now. Includes a self-assessment quiz, nervous system regulation exercises, boundary scripts, and a 7-day recovery plan.',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book Your Free Recovery Consultation',
      booking_description: 'A compassionate 30-minute call to understand where you are in your burnout journey, assess your recovery needs, and explore how we can help you heal.',
      booking_url: 'https://calendly.com/drmartinez/recovery',
      booking_cta: 'Schedule Your Free Call'
    },
    videos: {
      video_list: [
        { title: '5 Signs You\'re Burned Out (Not Just Tired)', description: 'Learn to recognize the clinical signs of burnout and why willpower alone won\'t fix it', video_type: 'recovery_tips', embed_url: '', thumbnail: '', duration: '14:20' },
        { title: 'The 4-7-8 Breathing Technique for Stress Reset', description: 'A guided nervous system regulation practice you can use anywhere in under 5 minutes', video_type: 'mindfulness', embed_url: '', thumbnail: '', duration: '8:45' },
        { title: 'From ER Doctor to Recovered: Ana\'s Story', description: 'How a burned-out physician rediscovered her love for medicine through recovery coaching', video_type: 'client_journey', embed_url: '', thumbnail: '', duration: '16:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/drmartinezwellness',
      channel_name: 'Dr. Elena Martinez | Burnout Recovery',
      subscriber_count: '67K',
      featured_playlist: 'https://youtube.com/playlist?list=PLburnoutrecovery',
      latest_video_embed: '',
      channel_description: 'Evidence-based burnout recovery, stress management, and workplace wellness content for high-achieving professionals. New videos every Wednesday.'
    },
    speaking: {
      topics: [
        { topic: 'The Burnout Epidemic: What Organizations Must Do Now', description: 'An evidence-based look at the burnout crisis and actionable strategies organizations can implement to protect their people and their bottom line', audience: 'HR leaders, corporate wellness events, healthcare conferences', duration: '45-60 minutes' },
        { topic: 'Beyond Self-Care: A Clinical Approach to Burnout Recovery', description: 'Why bubble baths and vacation days don\'t fix burnout, and what actually works according to the latest research in clinical psychology', audience: 'Healthcare professionals, coaches, therapists', duration: '60-90 minutes' },
        { topic: 'Building a Burnout-Proof Career', description: 'Practical strategies for ambitious professionals to achieve their goals without sacrificing their health, relationships, or sanity', audience: 'Professional associations, women\'s groups, tech companies', duration: '45-75 minutes' }
      ]
    },
    testimonials: {
      reviews: [
        { client_name: 'Ana Petrov', review: 'Dr. Martinez literally saved my career and my health. After 2 years of debilitating burnout, I was ready to quit medicine. Her approach was compassionate, clinical, and incredibly effective. I\'m back doing what I love — sustainably.', rating: '5', program: 'The Full Recovery Journey' },
        { client_name: 'Kevin Nguyen', review: 'I didn\'t even realize I was burned out until my wife said she was leaving. Elena\'s program helped me see the patterns, heal the damage, and rebuild everything — my health, my relationships, and my relationship with work. Profound gratitude.', rating: '5', program: 'The Restoration Protocol' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/drmartinezwellness', username: '@drmartinezwellness' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/drelenamartinez', username: 'Dr. Elena Martinez' },
        { platform: 'twitter', url: 'https://twitter.com/drmartinezwell', username: '@drmartinezwell' }
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
