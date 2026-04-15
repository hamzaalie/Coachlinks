import { socialPlatformsConfig } from '../social-platforms-config';

export const confidenceCoachTemplate = {
  name: 'Confidence & Self-Esteem Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Empowering Message' },
      { name: 'profile_image', type: 'file', label: 'Photo' }
    ], required: true },
    { key: 'contact', name: 'Contact', fields: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phone', type: 'tel', label: 'Phone' },
      { name: 'website', type: 'url', label: 'Website' },
      { name: 'location', type: 'text', label: 'Location' }
    ], required: true },
    { key: 'about', name: 'About', fields: [
      { name: 'description', type: 'textarea', label: 'Your Story' },
      { name: 'specializations', type: 'tags', label: 'Expertise' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications' },
      { name: 'experience', type: 'number', label: 'Years of Experience' }
    ], required: false },
    { key: 'programs', name: 'Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Coaching' },
          { value: 'group', label: 'Group Program' },
          { value: 'course', label: 'Online Course' },
          { value: 'retreat', label: 'Empowerment Retreat' },
          { value: 'vip', label: 'VIP Breakthrough Day' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'transformations', name: 'Client Transformations', fields: [
      { name: 'stories', type: 'repeater', label: 'Transformation Stories', fields: [
        { name: 'client_name', type: 'text', label: 'Client' },
        { name: 'before_state', type: 'text', label: 'Before' },
        { name: 'after_state', type: 'text', label: 'After' },
        { name: 'testimonial', type: 'textarea', label: 'Their Words' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Gift', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'guide', label: 'Confidence Guide' },
        { value: 'challenge', label: '5-Day Challenge' },
        { value: 'journal', label: 'Self-Worth Journal' },
        { value: 'affirmations', label: 'Affirmation Cards' },
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
    { key: 'booking', name: 'Breakthrough Call', fields: [
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
      name: 'Maya Johnson',
      title: 'Confidence & Self-Worth Coach',
      tagline: 'Stop shrinking. Start shining. Unlock the bold, unapologetic confidence that changes everything.'
    },
    contact: {
      email: 'maya@boldandbright.com',
      website: 'https://boldandbright.com',
      location: 'Atlanta, GA / Virtual'
    },
    about: {
      description: 'I spent 10 years hiding behind self-doubt, people-pleasing, and imposter syndrome. When I finally broke free, I made it my mission to help other women do the same. My Confidence Code™ system has helped 800+ women find their voice, set boundaries, and step into their power.',
      specializations: ['Imposter Syndrome', 'People-Pleasing Recovery', 'Boundary Setting', 'Self-Worth', 'Body Confidence', 'Career Confidence'],
      certifications_list: ['ICF ACC Certified Coach', 'NLP Practitioner', 'Brené Brown Dare to Lead™ Facilitator'],
      experience: 7
    },
    programs: {
      program_list: [
        { title: 'The Confidence Code™', description: 'My signature 90-day program to shatter self-doubt and build unshakeable confidence', duration: '90 Days', format: 'one-on-one', price: '$2,497' },
        { title: 'Bold & Bright Collective', description: 'Monthly group coaching community for women who refuse to play small', duration: 'Monthly', format: 'group', price: '$97/mo' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 5-Day Confidence Reset Challenge',
      magnet_description: 'Five daily exercises to break the cycle of self-doubt and start showing up as your boldest self.',
      magnet_type: 'challenge'
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
      meta_title: 'Maya Johnson | Confidence & Self-Worth Coach',
      meta_description: 'Break free from self-doubt and imposter syndrome. Confidence coaching for women ready to shine.'
    },
    footer: {
      footer_text: 'You were never meant to be small.',
      copyright_text: '© 2025 Bold & Bright. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#DB2777',
    secondaryColor: '#9D174D',
    accentColor: '#F59E0B',
    fontFamily: 'Poppins'
  }
};
