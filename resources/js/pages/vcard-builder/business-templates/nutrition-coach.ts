import { socialPlatformsConfig } from '../social-platforms-config';

export const nutritionCoachTemplate = {
  name: 'Nutrition & Diet Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Headline' },
      { name: 'profile_image', type: 'file', label: 'Photo' }
    ], required: true },
    { key: 'contact', name: 'Contact', fields: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phone', type: 'tel', label: 'Phone' },
      { name: 'website', type: 'url', label: 'Website' },
      { name: 'location', type: 'text', label: 'Location' }
    ], required: true },
    { key: 'about', name: 'About', fields: [
      { name: 'description', type: 'textarea', label: 'Your Nutrition Story' },
      { name: 'specializations', type: 'tags', label: 'Specializations' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications' },
      { name: 'philosophy', type: 'textarea', label: 'Nutrition Philosophy' }
    ], required: false },
    { key: 'programs', name: 'Nutrition Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Nutrition Coaching' },
          { value: 'group', label: 'Group Program' },
          { value: 'meal-plan', label: 'Custom Meal Plans' },
          { value: 'course', label: 'Online Course' },
          { value: 'challenge', label: 'Nutrition Challenge' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'transformations', name: 'Client Transformations', fields: [
      { name: 'stories', type: 'repeater', label: 'Before & After', fields: [
        { name: 'client_name', type: 'text', label: 'Client' },
        { name: 'before_image', type: 'file', label: 'Before Photo' },
        { name: 'after_image', type: 'file', label: 'After Photo' },
        { name: 'before_state', type: 'text', label: 'Starting Point' },
        { name: 'after_state', type: 'text', label: 'Results' },
        { name: 'timeframe', type: 'text', label: 'Timeframe' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'meal-plan', label: '7-Day Meal Plan' },
        { value: 'recipes', label: 'Recipe Book' },
        { value: 'guide', label: 'Nutrition Guide' },
        { value: 'shopping-list', label: 'Shopping List' },
        { value: 'workshop', label: 'Free Workshop' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Download URL' },
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
    { key: 'booking', name: 'Nutrition Assessment Call', fields: [
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
      name: 'Olivia Chen',
      title: 'Holistic Nutrition Coach & Gut Health Expert',
      tagline: 'Heal your gut. Fuel your body. Feel amazing — without restrictive dieting.'
    },
    contact: {
      email: 'olivia@nourishedlife.com',
      website: 'https://nourishedlife.com',
      location: 'San Francisco, CA / Virtual'
    },
    about: {
      description: 'After struggling with IBS and chronic fatigue for years, I healed myself through food. Now I help women break free from diet culture and build a nourishing relationship with food that gives them energy, clarity, and confidence.',
      specializations: ['Gut Health', 'Anti-Inflammatory Nutrition', 'Hormone Balance', 'Intuitive Eating', 'Plant-Based Nutrition', 'Food Sensitivities'],
      certifications_list: ['CNS (Certified Nutrition Specialist)', 'IIN Health Coach', 'Functional Nutrition Alliance Graduate'],
      philosophy: 'Food should nourish, not punish. I believe in bio-individual nutrition — what works for you won\'t work for everyone.'
    },
    programs: {
      program_list: [
        { title: 'Gut Reset Protocol', description: 'Comprehensive 90-day gut healing program with custom meal plans and supplement guidance', duration: '90 Days', format: 'one-on-one', price: '$1,497' },
        { title: 'Nourished for Life Group', description: 'Monthly group program with meal planning, cooking demos, and community support', duration: 'Monthly', format: 'group', price: '$67/mo' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 7-Day Anti-Inflammatory Meal Plan',
      magnet_description: 'Delicious, easy recipes designed to reduce bloating, boost energy, and heal your gut. Includes shopping list and prep guide.',
      magnet_type: 'meal-plan'
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
      meta_title: 'Olivia Chen | Nutrition Coach & Gut Health Expert',
      meta_description: 'Heal your gut and transform your health with holistic nutrition coaching. Custom meal plans for energy, weight management, and vitality.'
    },
    footer: {
      footer_text: 'Let food be thy medicine.',
      copyright_text: '© 2025 Nourished Life. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentColor: '#F59E0B',
    fontFamily: 'Nunito'
  }
};
