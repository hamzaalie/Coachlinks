import { socialPlatformsConfig } from '../social-platforms-config';

export const spiritualCoachTemplate = {
  name: 'Spiritual & Awakening Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Soul Message' },
      { name: 'profile_image', type: 'file', label: 'Photo' }
    ], required: true },
    { key: 'contact', name: 'Contact', fields: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phone', type: 'tel', label: 'Phone' },
      { name: 'website', type: 'url', label: 'Website' },
      { name: 'location', type: 'text', label: 'Location' }
    ], required: true },
    { key: 'about', name: 'About', fields: [
      { name: 'description', type: 'textarea', label: 'Your Journey' },
      { name: 'specializations', type: 'tags', label: 'Modalities' },
      { name: 'certifications_list', type: 'tags', label: 'Trainings' },
      { name: 'philosophy', type: 'textarea', label: 'Coaching Philosophy' }
    ], required: false },
    { key: 'programs', name: 'Sacred Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Soul Sessions' },
          { value: 'group', label: 'Group Ceremony' },
          { value: 'retreat', label: 'Retreat' },
          { value: 'online', label: 'Online Journey' },
          { value: 'membership', label: 'Sacred Circle' }
        ]},
        { name: 'price', type: 'text', label: 'Energy Exchange' }
      ]}
    ], required: false },
    { key: 'transformations', name: 'Transformations', fields: [
      { name: 'stories', type: 'repeater', label: 'Client Journeys', fields: [
        { name: 'client_name', type: 'text', label: 'Name' },
        { name: 'before_state', type: 'text', label: 'Before' },
        { name: 'after_state', type: 'text', label: 'After' },
        { name: 'testimonial', type: 'textarea', label: 'Their Words' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Gift', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'meditation', label: 'Guided Meditation' },
        { value: 'journal', label: 'Journal Prompts' },
        { value: 'ritual', label: 'Daily Ritual Guide' },
        { value: 'reading', label: 'Free Energy Reading' },
        { value: 'workshop', label: 'Free Workshop' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Download URL' },
      { name: 'magnet_image', type: 'file', label: 'Cover Image' }
    ], required: false },
    { key: 'testimonials', name: 'Soul Testimonials', fields: [
      { name: 'reviews', type: 'repeater', label: 'Reviews', fields: [
        { name: 'client_name', type: 'text', label: 'Name' },
        { name: 'review', type: 'textarea', label: 'Testimonial' },
        { name: 'rating', type: 'number', label: 'Rating' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'booking', name: 'Soul Discovery Call', fields: [
      { name: 'booking_url', type: 'url', label: 'Booking URL' },
      { name: 'call_duration', type: 'text', label: 'Duration' },
      { name: 'call_description', type: 'textarea', label: 'What to Expect' }
    ], required: false },
    { key: 'social', name: 'Social Media', fields: [
      { name: 'social_links', type: 'repeater', label: 'Profiles', fields: [
        { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
        { name: 'url', type: 'url', label: 'URL' },
        { name: 'username', type: 'text', label: 'Username' }
      ]}
    ], required: false },
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
    { key: 'contact_form', name: 'Contact Form', fields: [
      { name: 'form_title', type: 'text', label: 'Title' },
      { name: 'form_subtitle', type: 'textarea', label: 'Description' },
      { name: 'show_phone', type: 'checkbox', label: 'Phone Field' },
      { name: 'show_message', type: 'checkbox', label: 'Message Field' }
    ], required: false },
    { key: 'qr_share', name: 'QR & Share', fields: [
      { name: 'qr_foreground', type: 'color', label: 'QR Color' },
      { name: 'qr_background', type: 'color', label: 'Background' },
      { name: 'share_message', type: 'textarea', label: 'Share Text' }
    ], required: false },
    { key: 'seo', name: 'SEO', fields: [
      { name: 'meta_title', type: 'text', label: 'Meta Title' },
      { name: 'meta_description', type: 'textarea', label: 'Meta Description' },
      { name: 'meta_keywords', type: 'tags', label: 'Keywords' }
    ], required: false },
    { key: 'footer', name: 'Footer', fields: [
      { name: 'footer_text', type: 'text', label: 'Footer Text' },
      { name: 'copyright_text', type: 'text', label: 'Copyright' }
    ], required: false }
  ],
  defaultData: {
    header: {
      name: 'Luna Starweaver',
      title: 'Spiritual Awakening Guide',
      tagline: 'Reconnect with your soul\'s purpose. Heal. Awaken. Embody your highest self.'
    },
    contact: {
      email: 'luna@sacredawakenings.com',
      website: 'https://sacredawakenings.com',
      location: 'Sedona, AZ / Virtual'
    },
    about: {
      description: 'After my own dark night of the soul, I discovered the transformative power of spiritual practice. For 12 years, I\'ve guided seekers through their awakening journey using breathwork, energy healing, and shadow work.',
      specializations: ['Energy Healing', 'Breathwork', 'Shadow Work', 'Intuitive Guidance', 'Chakra Balancing', 'Past Life Regression'],
      certifications_list: ['Reiki Master Teacher', 'Certified Breathwork Facilitator', 'Akashic Records Reader']
    },
    programs: {
      program_list: [
        { title: 'The Awakening Journey', description: 'Deep 1:1 spiritual mentorship to catalyze your spiritual awakening', duration: '3 Months', format: 'one-on-one', price: '$2,222' },
        { title: 'Sacred Soul Retreat', description: 'Immersive weekend retreat in Sedona with ceremony, breathwork, and healing', duration: '3 Days', format: 'retreat', price: '$1,111' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 7-Day Spiritual Awakening Meditation Series',
      magnet_description: 'Guided meditations to open your third eye, clear your energy, and deepen your connection to source.',
      magnet_type: 'meditation'
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
      ]
    },
    transformations: {
      transformation_list: []
    },
    testimonials: {
      reviews: [
        { client_name: 'Happy Client', client_title: 'Business Owner', review: 'An incredible experience that transformed my life and business.', rating: 5, result_highlight: 'Amazing Results' }
      ]
    },
    booking: {
      call_duration: '30 minutes',
      call_description: 'During your free discovery call, we\'ll discuss your goals and create a personalized action plan.'
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/', username: '' },
        { platform: 'instagram', url: 'https://instagram.com/', username: '' }
      ]
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_subtitle: 'Have a question? Send me a message and I\'ll get back to you within 24 hours.',
      show_phone: true,
      show_message: true
    },
    qr_share: {
      qr_foreground: '#000000',
      qr_background: '#FFFFFF',
      share_message: 'Check out my coaching services!'
    },

    seo: {
      meta_title: 'Luna Starweaver | Spiritual Coach & Awakening Guide',
      meta_description: 'Find your soul\'s purpose with spiritual coaching. Energy healing, breathwork, and awakening guidance in Sedona and online.'
    },
    footer: {
      footer_text: 'The universe is always guiding you home.',
      copyright_text: '© 2025 Sacred Awakenings. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#5B2CA0',
    secondaryColor: '#E9C46A',
    accentColor: '#A78BFA',
    fontFamily: 'Cormorant Garamond'
  }
};
