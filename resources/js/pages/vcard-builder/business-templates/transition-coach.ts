import { socialPlatformsConfig } from '../social-platforms-config';

export const transitionCoachTemplate = {
  name: 'Life Transition & Reinvention Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Message' },
      { name: 'profile_image', type: 'file', label: 'Photo' }
    ], required: true },
    { key: 'contact', name: 'Contact', fields: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phone', type: 'tel', label: 'Phone' },
      { name: 'website', type: 'url', label: 'Website' },
      { name: 'location', type: 'text', label: 'Location' }
    ], required: true },
    { key: 'about', name: 'About', fields: [
      { name: 'description', type: 'textarea', label: 'Your Reinvention Story' },
      { name: 'specializations', type: 'tags', label: 'Focus Areas' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications' }
    ], required: false },
    { key: 'programs', name: 'Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Coaching' },
          { value: 'group', label: 'Group Journey' },
          { value: 'retreat', label: 'Transformation Retreat' },
          { value: 'course', label: 'Online Course' },
          { value: 'intensive', label: 'Clarity Intensive' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'transformations', name: 'Reinvention Stories', fields: [
      { name: 'stories', type: 'repeater', label: 'Client Journeys', fields: [
        { name: 'client_name', type: 'text', label: 'Client' },
        { name: 'before_state', type: 'text', label: 'Before (Old Chapter)' },
        { name: 'after_state', type: 'text', label: 'After (New Chapter)' },
        { name: 'testimonial', type: 'textarea', label: 'Their Story' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'guide', label: 'Transition Guide' },
        { value: 'assessment', label: 'Life Audit' },
        { value: 'workbook', label: 'Reinvention Workbook' },
        { value: 'workshop', label: 'Free Workshop' },
        { value: 'journal', label: 'Clarity Journal' }
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
    { key: 'booking', name: 'Clarity Call', fields: [
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
      name: 'Rachel Montgomery',
      title: 'Life Reinvention Coach',
      tagline: 'Divorce. Layoff. Empty nest. Whatever ended, your next chapter is about to be your best.'
    },
    contact: {
      email: 'rachel@nextchaptercoachinghq.com',
      website: 'https://nextchaptercoachinghq.com',
      location: 'Nashville, TN / Virtual'
    },
    about: {
      description: 'At 42, I was divorced, laid off, and wondering "now what?" Within 18 months, I rebuilt my entire life — new career, new city, new purpose. That painful transition became my superpower. Now I help others navigate life\'s biggest plot twists and write their comeback story.',
      specializations: ['Divorce Recovery', 'Career Reinvention', 'Empty Nest Transition', 'Midlife Clarity', 'Retirement Planning', 'Identity Rebuilding'],
      certifications_list: ['ICF PCC Certified Life Coach', 'Certified Grief Recovery Specialist', 'Bridges Transition Model Facilitator']
    },
    programs: {
      program_list: [
        { title: 'Next Chapter Blueprint™', description: 'My signature 12-week program to turn your life transition into a powerful reinvention', duration: '12 Weeks', format: 'one-on-one', price: '$2,997' },
        { title: 'The Phoenix Retreat', description: 'Intimate weekend retreat for women in transition. Clarity, community, courage.', duration: '3 Days', format: 'retreat', price: '$1,497' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: The Life Audit Workbook',
      magnet_description: 'A guided self-assessment to uncover what\'s working, what\'s not, and what your next chapter could look like.',
      magnet_type: 'assessment'
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
      meta_title: 'Rachel Montgomery | Life Transition & Reinvention Coach',
      meta_description: 'Navigate divorce, career change, or life transition with a certified life coach. Turn your upheaval into your comeback story.'
    },
    footer: {
      footer_text: 'Every ending is a beginning in disguise.',
      copyright_text: '© 2025 Next Chapter Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#0D9488',
    secondaryColor: '#115E59',
    accentColor: '#F97316',
    fontFamily: 'Lora'
  }
};
