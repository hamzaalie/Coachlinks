import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const griefCoachTemplate = {
  name: 'Grief & Loss Recovery Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Grief Support Title' },
        { name: 'tagline', type: 'textarea', label: 'Compassionate Message' },
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
        { name: 'description', type: 'textarea', label: 'Grief Support Background' },
        { name: 'specializations', type: 'tags', label: 'Bereavement Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Healing Philosophy' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Healing Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Grief Support Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Support' },
              { value: 'group', label: 'Support Group' },
              { value: 'workshop', label: 'Healing Workshop' },
              { value: 'retreat', label: 'Healing Retreat' },
              { value: 'online', label: 'Online Program' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Healing Journey',
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
      name: 'Healing Outcomes',
      fields: [
        {
          name: 'executive_results',
          type: 'repeater',
          label: 'Client Outcomes',
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
      name: 'Healing Journeys',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Client Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Loss Experience' },
            { name: 'transformation', type: 'textarea', label: 'Healing Journey' },
            { name: 'outcome', type: 'textarea', label: 'Where They Are Now' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Healing Resource',
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
      name: 'Book a Compassionate Consultation',
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
      name: 'Healing & Support Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'grief_education', label: 'Grief Education' },
              { value: 'coping_strategies', label: 'Coping Strategies' },
              { value: 'healing_meditation', label: 'Healing Meditation' },
              { value: 'client_journey', label: 'Client Healing Journey' },
              { value: 'hope_message', label: 'Message of Hope' }
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
    { name: 'Gentle Dawn', primary: '#7986CB', secondary: '#9FA8DA', accent: '#C5CAE9', background: '#F5F6FC', text: '#1A1F3A', cardBg: '#FFFFFF' },
    { name: 'Healing Waters', primary: '#4DB6AC', secondary: '#80CBC4', accent: '#B2DFDB', background: '#F0FAF8', text: '#1A2E2A', cardBg: '#FFFFFF' },
    { name: 'Soft Mauve', primary: '#9C7CA5', secondary: '#B39AB8', accent: '#D4C4D8', background: '#F9F5FA', text: '#2E2030', cardBg: '#FFFFFF' },
    { name: 'Warm Amber', primary: '#A1887F', secondary: '#BCAAA4', accent: '#D7CCC8', background: '#FAF7F5', text: '#3E2723', cardBg: '#FFFFFF' },
    { name: 'Sky Hope', primary: '#5C9DC5', secondary: '#82B5D8', accent: '#B0D4EC', background: '#F2F8FC', text: '#1A2D3E', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Crimson Pro', value: 'Crimson Pro, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Lora', value: 'Lora, Georgia, serif', weight: '400,500,600,700' },
    { name: 'Source Serif Pro', value: 'Source Serif Pro, Georgia, serif', weight: '400,600,700' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville, Georgia, serif', weight: '400,700' },
    { name: 'PT Serif', value: 'PT Serif, Georgia, serif', weight: '400,700' }
  ],
  defaultColors: {
    primary: '#7986CB',
    secondary: '#9FA8DA',
    accent: '#C5CAE9',
    background: '#F5F6FC',
    text: '#1A1F3A',
    cardBg: '#FFFFFF',
    borderColor: '#C5CAE9',
    shadowColor: 'rgba(121, 134, 203, 0.15)'
  },
  defaultFont: 'Crimson Pro, Georgia, serif',
  themeStyle: {
    layout: 'gentle-sanctuary',
    headerStyle: 'compassionate-hero',
    cardStyle: 'soft-healing-cards',
    buttonStyle: 'gentle-action',
    iconStyle: 'comforting',
    spacing: 'breathable',
    shadows: 'whisper-soft',
    animations: 'tender-fade',
    backgroundPattern: 'soft-light',
    typography: 'warm-serif'
  },
  defaultData: {
    header: {
      name: 'Sarah Nightingale',
      title: 'Certified Grief Recovery Specialist & Bereavement Counselor',
      tagline: 'You don\'t have to walk through grief alone. Together, we\'ll honor your loss, tend to your pain, and find a path toward healing — at your own pace.',
      profile_image: ''
    },
    contact: {
      email: 'sarah@nightingalegriefsupport.com',
      phone: '+1 (555) 321-7890',
      website: 'https://nightingalegriefsupport.com',
      location: 'Portland, OR'
    },
    about: {
      description: 'Licensed counselor and certified Grief Recovery Method specialist with 11 years of experience supporting individuals and families through loss. After losing my own mother at 22, I discovered my calling in helping others navigate the most painful passages of life. Trained in EMDR, somatic experiencing, and meaning-making therapy. I believe grief is not something to "get over" — it\'s something to move through with grace and support.',
      specializations: 'Bereavement Support, Spousal Loss, Child Loss, Pet Loss, Anticipatory Grief, Complicated Grief, EMDR for Grief, Group Support',
      experience: '11',
      mission: 'To create a safe, compassionate space where those grieving can be fully seen, gently supported, and guided toward healing — without timelines, judgment, or pressure.'
    },
    programs: {
      program_list: [
        { title: 'Journey Through Grief', description: 'A tender 12-week one-on-one program that guides you through the grief process using evidence-based methods, somatic practices, and meaning-making exercises', duration: '12 weeks', format: 'one-on-one', price: '$3,600' },
        { title: 'Finding Light After Loss', description: 'A supportive 8-week group program for those in grief, offering community, shared understanding, and guided healing activities', duration: '8 weeks', format: 'group', price: '$697' },
        { title: 'Resilient Heart Workshop', description: 'A one-day healing workshop combining grief education, somatic release, art therapy, and peer connection', duration: '1 day', format: 'workshop', price: '$197' },
        { title: 'Healing Horizons Retreat', description: 'A 3-day retreat in the Oregon countryside for those ready to reconnect with hope, purpose, and gentle joy after loss', duration: '3 days', format: 'retreat', price: '$2,800' }
      ]
    },
    signature_offer: {
      offer_title: 'The Complete Healing Journey',
      offer_description: 'My most compassionate and comprehensive program: 6 months of deeply supported grief recovery. For those who need — and deserve — sustained, gentle guidance through loss and back toward a meaningful life.',
      offer_price: '$6,200',
      offer_includes: '• Comprehensive grief assessment and personalized healing plan\n• Bi-weekly 60-minute 1:1 grief counseling sessions\n• EMDR sessions for trauma processing (as needed)\n• Guided somatic experiencing exercises\n• Personal grief journal with weekly prompts\n• Access to the Finding Light community\n• Monthly memorial/remembrance activity\n• Between-session support via voice message',
      offer_url: '#',
      offer_cta: 'Begin Your Healing Journey'
    },
    results: {
      executive_results: [
        { metric: 'Grief Intensity Reduction', value: '-58%', description: 'Average decrease in prolonged grief disorder symptoms among clients', timeframe: '12 weeks' },
        { metric: 'Life Engagement', value: '+72%', description: 'Clients reporting renewed sense of purpose and engagement with daily life', timeframe: '6 months' },
        { metric: 'Sleep & Wellbeing', value: '+65%', description: 'Improvement in self-reported sleep quality and overall wellbeing', timeframe: '8 weeks' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'E.T.', challenge: 'Lost her husband of 35 years suddenly to a heart attack. Completely paralyzed by grief — couldn\'t eat, sleep, or leave the house for months', transformation: 'Through gentle weekly sessions, EMDR for the trauma of finding him, and guided meaning-making exercises, she slowly reconnected with life', outcome: 'Now volunteers at a hospice, started a memoir about their love story, and says she carries her husband\'s memory as a light rather than a weight', timeframe: '8 months' },
        { client_initial: 'D.R.', challenge: 'Lost his 8-year-old daughter to leukemia. Consumed by guilt, anger, and complete loss of faith. Marriage was crumbling under the weight of shared grief', transformation: 'Individual and couples grief sessions helped him process the guilt, honor his daughter\'s memory, and reconnect with his wife through shared grief work', outcome: 'Founded a charitable fund in his daughter\'s name, marriage is healing, and he speaks publicly about child loss to reduce the stigma and silence around it', timeframe: '10 months' }
      ]
    },
    lead_magnet: {
      title: 'A Gentle Guide to the First 30 Days of Grief',
      description: 'A compassionate, practical guide for the early days of loss. Includes what to expect, how to care for yourself, when to seek help, and gentle daily practices to help you through the hardest moments.',
      lead_magnet_type: 'ebook',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book a Free Compassionate Consultation',
      booking_description: 'A gentle, no-obligation 30-minute call where we simply listen to where you are, answer any questions, and explore whether working together feels right for you. There\'s no rush and no pressure.',
      booking_url: 'https://calendly.com/sarahnightingale/consultation',
      booking_cta: 'Reach Out When You\'re Ready'
    },
    videos: {
      video_list: [
        { title: 'Understanding the Grief Process: What\'s "Normal"?', description: 'A gentle exploration of what grief actually looks like and why there\'s no right way to grieve', video_type: 'grief_education', embed_url: '', thumbnail: '', duration: '16:20' },
        { title: 'A 10-Minute Guided Meditation for Grief', description: 'A soothing guided meditation designed specifically for those experiencing loss and heartache', video_type: 'healing_meditation', embed_url: '', thumbnail: '', duration: '10:45' },
        { title: 'From Darkness to Dawn: Elizabeth\'s Story', description: 'How a widow found her way back to life, purpose, and even joy after devastating loss', video_type: 'client_journey', embed_url: '', thumbnail: '', duration: '18:30' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/nightingalegriefsupport',
      channel_name: 'Sarah Nightingale | Grief & Healing',
      subscriber_count: '38K',
      featured_playlist: 'https://youtube.com/playlist?list=PLgriefhealing',
      latest_video_embed: '',
      channel_description: 'Compassionate grief education, healing meditations, and messages of hope for those walking through loss. A safe space for all who are grieving. New content every Friday.'
    },
    speaking: {
      topics: [
        { topic: 'Grief in the Workplace: What Every Leader Needs to Know', description: 'How to support grieving employees with compassion and create a workplace culture that acknowledges loss instead of avoiding it', audience: 'HR professionals, corporate leaders, EAP providers', duration: '45-60 minutes' },
        { topic: 'There\'s No Timeline for Grief: Debunking the Myths', description: 'A compassionate talk challenging common misconceptions about grief and offering a more humane understanding of the healing process', audience: 'Healthcare providers, counselors, community groups', duration: '60-75 minutes' },
        { topic: 'Holding Space: Supporting Someone Who\'s Grieving', description: 'Practical, gentle guidance on how to truly support a friend, family member, or colleague through loss — beyond "I\'m sorry"', audience: 'General public, faith communities, support groups', duration: '45-60 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/nightingalegrief', username: '@nightingalegrief' },
        { platform: 'facebook', url: 'https://facebook.com/nightingalegriefsupport', username: 'Nightingale Grief Support' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/sarahnightingale', username: 'Sarah Nightingale' }
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
        { client_name: 'Elizabeth T.', review: 'Sarah held space for my pain when no one else could. After losing my husband, I thought my life was over. Through her gentle guidance, I found a way to carry my love for him forward while also finding reasons to live again. She is a gift.', rating: '5', program: 'The Complete Healing Journey' },
        { client_name: 'David R.', review: 'No one teaches you how to survive losing a child. Sarah didn\'t try to fix me — she taught me how to grieve, how to honor my daughter, and eventually how to live again. I will forever be grateful for her compassion.', rating: '5', program: 'Journey Through Grief' }
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
