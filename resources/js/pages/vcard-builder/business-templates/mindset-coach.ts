import { socialPlatformsConfig } from '../social-platforms-config';

export const mindsetCoachTemplate = {
  name: 'Mindset & Mindfulness Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Tagline' },
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
      { name: 'specializations', type: 'tags', label: 'Specializations' },
      { name: 'experience', type: 'number', label: 'Years of Experience' },
      { name: 'philosophy', type: 'textarea', label: 'Coaching Philosophy' }
    ], required: false },
    { key: 'programs', name: 'Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Coaching' },
          { value: 'group', label: 'Group Session' },
          { value: 'meditation', label: 'Guided Meditation' },
          { value: 'workshop', label: 'Workshop' },
          { value: 'retreat', label: 'Mindfulness Retreat' },
          { value: 'online', label: 'Online Course' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'meditation', label: 'Guided Meditation' },
        { value: 'journal', label: 'Journal Prompts' },
        { value: 'challenge', label: 'Mindfulness Challenge' },
        { value: 'ebook', label: 'Mindset Guide' },
        { value: 'affirmations', label: 'Affirmation Cards' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Access URL' },
      { name: 'magnet_image', type: 'file', label: 'Cover Image' }
    ], required: false },
    { key: 'testimonials', name: 'Testimonials', fields: [
      { name: 'reviews', type: 'repeater', label: 'Reviews', fields: [
        { name: 'client_name', type: 'text', label: 'Name' },
        { name: 'review', type: 'textarea', label: 'Testimonial' },
        { name: 'rating', type: 'number', label: 'Rating' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'booking', name: 'Book a Session', fields: [
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
    { key: 'gallery', name: 'Gallery', fields: [
      { name: 'images', type: 'repeater', label: 'Photos', fields: [
        { name: 'image', type: 'file', label: 'Image' },
        { name: 'caption', type: 'text', label: 'Caption' }
      ]}
    ], required: false },
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
      name: 'Aria Winters',
      title: 'Mindset & Mindfulness Coach',
      tagline: 'Quiet the noise. Rewire your mind. Step into your most powerful self.'
    },
    contact: {
      email: 'aria@mindfulpower.com',
      website: 'https://mindfulpower.com',
      location: 'Bali / Virtual'
    },
    about: {
      description: 'After burnout nearly destroyed my career, I discovered the transformative power of mindfulness and neuroplasticity. Now I help high-achievers rewire limiting beliefs and unlock their full potential without the burnout.',
      specializations: ['Limiting Beliefs', 'Anxiety Management', 'Neuroplasticity', 'Meditation', 'Emotional Intelligence', 'Peak Performance'],
      experience: 7,
      philosophy: 'Your thoughts create your reality. When you change your mindset, you change everything.'
    },
    programs: {
      program_list: [
        { title: 'Mind Mastery Method', description: '12-week deep transformation program to rewire your subconscious mind', duration: '12 Weeks', format: 'one-on-one', price: '$3,497' },
        { title: 'Calm & Curious Retreat', description: '5-day immersive mindfulness retreat in nature', duration: '5 Days', format: 'retreat', price: '$2,997' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 7-Day Mindset Reset Meditation Series',
      magnet_description: 'Seven powerful guided meditations to release anxiety, rewire limiting beliefs, and start each day with clarity.',
      magnet_type: 'meditation'
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
    gallery: {
      images: []
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
      meta_title: 'Aria Winters | Mindset & Mindfulness Coach',
      meta_description: 'Transform your mindset with expert coaching. Overcome limiting beliefs, manage anxiety, and unlock peak performance.'
    },
    footer: {
      footer_text: 'Peace is not the absence of chaos — it\'s the mastery of your mind.',
      copyright_text: '© 2025 Mindful Power. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#7C3AED',
    secondaryColor: '#4C1D95',
    accentColor: '#14B8A6',
    fontFamily: 'Inter'
  }
};
