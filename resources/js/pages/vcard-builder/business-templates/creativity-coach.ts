import { socialPlatformsConfig } from '../social-platforms-config';
import languageData from '@/../../resources/lang/language.json';

export const creativityCoachTemplate = {
  name: 'Creativity & Innovation Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Creative Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Creative Tagline' },
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
        { name: 'description', type: 'textarea', label: 'Creative Coaching Background' },
        { name: 'specializations', type: 'tags', label: 'Creative Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Creative Mission' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Creative Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Creativity Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Program Description' },
            { name: 'duration', type: 'text', label: 'Program Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: 'One-on-One Coaching' },
              { value: 'group', label: 'Creative Cohort' },
              { value: 'workshop', label: 'Workshop' },
              { value: 'retreat', label: 'Creative Retreat' },
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
      name: 'Signature Creative Program',
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
      name: 'Creative Impact',
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
      name: 'Creative Breakthroughs',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Success Stories',
          fields: [
            { name: 'client_initial', type: 'text', label: 'Client Initial' },
            { name: 'challenge', type: 'textarea', label: 'Creative Block' },
            { name: 'transformation', type: 'textarea', label: 'Breakthrough Journey' },
            { name: 'outcome', type: 'textarea', label: 'Creative Outcome' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Creative Resource',
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
      name: 'Book a Creative Consultation',
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
      name: 'Creative Inspiration Videos',
      fields: [
        {
          name: 'video_list',
          type: 'repeater',
          label: 'Video Content',
          fields: [
            { name: 'title', type: 'text', label: 'Video Title' },
            { name: 'description', type: 'textarea', label: 'Video Description' },
            { name: 'video_type', type: 'select', label: 'Video Type', options: [
              { value: 'creative_process', label: 'Creative Process' },
              { value: 'unblocking', label: 'Unblocking Techniques' },
              { value: 'innovation', label: 'Innovation Thinking' },
              { value: 'artist_spotlight', label: 'Artist Spotlight' },
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
    { name: 'Artist\'s Palette', primary: '#E91E63', secondary: '#FF5722', accent: '#FFC107', background: '#FFFAF5', text: '#1A0A15', cardBg: '#FFFFFF' },
    { name: 'Deep Canvas', primary: '#311B92', secondary: '#4527A0', accent: '#7C4DFF', background: '#F5F2FF', text: '#1A0E3A', cardBg: '#FFFFFF' },
    { name: 'Watercolor', primary: '#0097A7', secondary: '#00BCD4', accent: '#84FFFF', background: '#F0FDFF', text: '#00363D', cardBg: '#FFFFFF' },
    { name: 'Studio Warm', primary: '#BF360C', secondary: '#E64A19', accent: '#FF8A65', background: '#FFF5F0', text: '#3A1A0A', cardBg: '#FFFFFF' },
    { name: 'Neon Dreams', primary: '#AA00FF', secondary: '#D500F9', accent: '#EA80FC', background: '#FDF0FF', text: '#2A004A', cardBg: '#FFFFFF' }
  ],
  fontOptions: [
    { name: 'Space Grotesk', value: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Sora', value: 'Sora, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Clash Display', value: 'Clash Display, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' },
    { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700,800' },
    { name: 'Urbanist', value: 'Urbanist, -apple-system, BlinkMacSystemFont, sans-serif', weight: '400,500,600,700' }
  ],
  defaultColors: {
    primary: '#E91E63',
    secondary: '#FF5722',
    accent: '#FFC107',
    background: '#FFFAF5',
    text: '#1A0A15',
    cardBg: '#FFFFFF',
    borderColor: '#FFC107',
    shadowColor: 'rgba(233, 30, 99, 0.15)'
  },
  defaultFont: 'Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif',
  themeStyle: {
    layout: 'artistic-flow',
    headerStyle: 'creative-hero',
    cardStyle: 'gallery-cards',
    buttonStyle: 'bold-creative',
    iconStyle: 'artistic',
    spacing: 'expressive',
    shadows: 'paint-splash',
    animations: 'creative-reveal',
    backgroundPattern: 'brush-strokes',
    typography: 'modern-geometric'
  },
  defaultData: {
    header: {
      name: 'Lily Takahashi',
      title: 'Creativity & Innovation Coach | Former Creative Director',
      tagline: 'Your creative genius isn\'t lost — it\'s just waiting for permission. Let\'s break through the blocks, reignite your imagination, and create work that truly matters.',
      profile_image: ''
    },
    contact: {
      email: 'lily@lilytakahashicreative.com',
      phone: '+1 (555) 456-7890',
      website: 'https://lilytakahashicreative.com',
      location: 'Los Angeles, CA'
    },
    about: {
      description: 'After 15 years as an award-winning creative director at top agencies (IDEO, Ogilvy, Wieden+Kennedy), I experienced a devastating creative burnout that left me questioning everything. My recovery journey led me to study the neuroscience of creativity, flow states, and innovation thinking. Now I help artists, writers, entrepreneurs, and creative professionals break through blocks and access their deepest creative potential.',
      specializations: 'Creative Blocks, Flow State Training, Innovation Thinking, Artistic Development, Creative Entrepreneurship, Design Thinking, Visual Storytelling',
      experience: '8',
      mission: 'To help every creative soul I work with reconnect with the spark that makes their work extraordinary — and build a sustainable creative practice that fuels rather than drains them.'
    },
    programs: {
      program_list: [
        { title: 'Unlock Your Creative Genius', description: 'A 10-week deep-dive coaching program combining neuroscience, creativity exercises, and personalized mentorship to permanently dissolve creative blocks', duration: '10 weeks', format: 'one-on-one', price: '$3,500' },
        { title: 'Innovation Sprint', description: 'An intensive 2-day workshop using design thinking and creative problem-solving frameworks to generate breakthrough ideas for your project or business', duration: '2 days', format: 'workshop', price: '$597' },
        { title: 'The Art of Flow State', description: 'A 6-week group program teaching the science and practice of accessing flow states on demand for peak creative performance', duration: '6 weeks', format: 'group', price: '$1,297' },
        { title: 'Creative Soul Retreat', description: 'A 4-day immersive retreat in the California mountains combining art, nature, meditation, and creative coaching to reconnect with your artistic essence', duration: '4 days', format: 'retreat', price: '$3,800' }
      ]
    },
    signature_offer: {
      offer_title: 'The Creative Renaissance',
      offer_description: 'My most transformative offering: a 6-month creative mentorship for artists, writers, and creative professionals who are ready to completely reinvent their creative practice and produce the best work of their lives.',
      offer_price: '$7,200',
      offer_includes: '• Creative DNA assessment and personalized creativity profile\n• Bi-weekly 60-minute 1:1 creative coaching sessions\n• Flow state training protocol (customized to your creative medium)\n• Weekly creativity exercises and prompts\n• Access to the Creative Collective community\n• Monthly "Creative Date" experiential assignments\n• Portfolio/project review and artistic feedback\n• Guest access to one Innovation Sprint workshop',
      offer_url: '#',
      offer_cta: 'Ignite Your Creative Renaissance'
    },
    results: {
      executive_results: [
        { metric: 'Creative Output Increase', value: '+185%', description: 'Average increase in creative output (projects completed, ideas generated) among program graduates', timeframe: '10 weeks' },
        { metric: 'Flow State Access', value: '4x more', description: 'Clients report accessing flow states 4 times more frequently after completing the program', timeframe: '6 weeks' },
        { metric: 'Creative Confidence', value: '+92%', description: 'Improvement in self-reported creative confidence and willingness to take artistic risks', timeframe: '3 months' }
      ]
    },
    transformations: {
      success_stories: [
        { client_initial: 'R.M.', challenge: 'Novelist who hadn\'t written a word in 3 years after a brutal book review. Completely paralyzed by perfectionism and fear of judgment', transformation: 'Through creativity coaching, learned to separate self-worth from output, developed a daily writing ritual, and reconnected with the joy of storytelling', outcome: 'Completed and published a new novel that became a #4 bestseller. Now writes daily with joy and has a 3-book deal', timeframe: '5 months' },
        { client_initial: 'A.K.', challenge: 'UX designer feeling creatively dead after 8 years of corporate work. Every design looked the same. Dreamed of launching an independent studio but couldn\'t find a unique voice', transformation: 'Explored personal artistic influences, developed a signature design philosophy, and built confidence through experimental side projects', outcome: 'Launched her own design studio with a distinctive aesthetic. Won two design awards in the first year and tripled her income', timeframe: '7 months' }
      ]
    },
    lead_magnet: {
      title: 'The 5-Day Creativity Reboot: Exercises to Unblock Your Imagination',
      description: 'A beautifully designed guide with one powerful creativity exercise for each day — combining neuroscience, play, and artistic practice to reignite your creative spark. Used by over 12,000 creatives worldwide.',
      lead_magnet_type: 'toolkit',
      download_url: '#',
      cover_image: ''
    },
    booking: {
      booking_title: 'Book a Free Creative Discovery Call',
      booking_description: 'A playful, no-pressure 30-minute conversation where we explore your creative goals, identify what\'s blocking you, and imagine what\'s possible when you\'re creating at your best.',
      booking_url: 'https://calendly.com/lilytakahashi/creative-call',
      booking_cta: 'Let\'s Create Something Amazing'
    },
    videos: {
      video_list: [
        { title: 'The Neuroscience of Creative Blocks (And How to Beat Them)', description: 'Discover what\'s actually happening in your brain when you feel stuck — and 3 science-backed techniques to break through', video_type: 'unblocking', embed_url: '', thumbnail: '', duration: '18:40' },
        { title: 'How to Enter Flow State: A Step-by-Step Guide', description: 'The exact protocol I teach my clients for accessing deep creative flow on demand', video_type: 'creative_process', embed_url: '', thumbnail: '', duration: '22:15' },
        { title: 'From Writer\'s Block to Bestseller: Rachel\'s Story', description: 'How a blocked novelist reconnected with her creative genius and published her dream book', video_type: 'artist_spotlight', embed_url: '', thumbnail: '', duration: '14:50' }
      ]
    },
    youtube: {
      channel_url: 'https://youtube.com/lilytakahashicreative',
      channel_name: 'Lily Takahashi | Creativity Unleashed',
      subscriber_count: '73K',
      featured_playlist: 'https://youtube.com/playlist?list=PLcreativityunblocked',
      latest_video_embed: '',
      channel_description: 'Creativity coaching, flow state science, and inspiration for artists, writers, designers, and anyone who wants to live a more creative life. New videos every Wednesday!'
    },
    speaking: {
      topics: [
        { topic: 'The Creative Brain: Neuroscience of Innovation', description: 'A fascinating deep-dive into how the brain generates ideas and what we can do to optimize our creative thinking based on cutting-edge neuroscience', audience: 'Tech companies, creative agencies, innovation conferences', duration: '45-60 minutes' },
        { topic: 'Breaking the Block: From Creative Paralysis to Creative Flow', description: 'A practical, inspiring talk about overcoming creative blocks with real stories, science, and immediately usable techniques', audience: 'Art schools, writers\' conferences, creative communities', duration: '60-90 minutes' },
        { topic: 'Innovation by Design: Creative Thinking for Business', description: 'How organizations can foster a culture of creativity and innovation using design thinking principles and creative coaching frameworks', audience: 'Corporate events, leadership retreats, startup accelerators', duration: '45-75 minutes' }
      ]
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/lilytakahashicreative', username: '@lilytakahashicreative' },
        { platform: 'pinterest', url: 'https://pinterest.com/lilytakahashi', username: 'Lily Takahashi Creative' },
        { platform: 'youtube', url: 'https://youtube.com/lilytakahashicreative', username: 'Creativity Unleashed' }
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
        { client_name: 'Rachel Morrison', review: 'Lily saved my creative life. After 3 years of crippling writer\'s block, her coaching helped me understand what was really going on and gave me tools that actually work. My new novel is the best thing I\'ve ever written.', rating: '5', program: 'The Creative Renaissance' },
        { client_name: 'Amir Khan', review: 'The Innovation Sprint was the most productive 2 days of my career. Lily\'s facilitation is pure magic — she creates a space where ideas flow effortlessly. Our team left with breakthrough concepts that became our flagship product.', rating: '5', program: 'Innovation Sprint' }
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
