import { socialPlatformsConfig } from '../social-platforms-config';

export const relationshipCoachTemplate = {
  name: 'Relationship & Dating Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Tagline' },
        { name: 'profile_image', type: 'file', label: 'Coach Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'phone', type: 'tel', label: 'Phone' },
        { name: 'website', type: 'url', label: 'Website' },
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Your Story' },
        { name: 'specializations', type: 'tags', label: 'Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'approach', type: 'textarea', label: 'Your Coaching Approach' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Coaching Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: '1:1 Coaching' },
              { value: 'couples', label: 'Couples Sessions' },
              { value: 'group', label: 'Group Workshop' },
              { value: 'online', label: 'Online Program' },
              { value: 'retreat', label: 'Couples Retreat' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'transformations',
      name: 'Love Stories',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Client Success Stories',
          fields: [
            { name: 'couple_initials', type: 'text', label: 'Client Initials' },
            { name: 'situation', type: 'textarea', label: 'Their Situation' },
            { name: 'transformation', type: 'textarea', label: 'The Transformation' },
            { name: 'outcome', type: 'textarea', label: 'Where They Are Now' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Resource',
      fields: [
        { name: 'magnet_title', type: 'text', label: 'Title' },
        { name: 'magnet_description', type: 'textarea', label: 'Description' },
        { name: 'magnet_type', type: 'select', label: 'Type', options: [
          { value: 'quiz', label: 'Relationship Quiz' },
          { value: 'guide', label: 'Relationship Guide' },
          { value: 'workshop', label: 'Free Workshop' },
          { value: 'checklist', label: 'Communication Checklist' },
          { value: 'ebook', label: 'eBook' }
        ]},
        { name: 'magnet_url', type: 'url', label: 'Access URL' },
        { name: 'magnet_image', type: 'file', label: 'Cover Image' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'review', type: 'textarea', label: 'Testimonial' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'client_photo', type: 'file', label: 'Photo' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'booking',
      name: 'Book a Session',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'call_duration', type: 'text', label: 'Session Duration' },
        { name: 'call_description', type: 'textarea', label: 'What to Expect' }
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
      key: 'contact_form', name: 'Contact Form',
      fields: [
        { name: 'form_title', type: 'text', label: 'Form Title' },
        { name: 'form_subtitle', type: 'textarea', label: 'Description' },
        { name: 'show_phone', type: 'checkbox', label: 'Include Phone' },
        { name: 'show_message', type: 'checkbox', label: 'Include Message' }
      ],
      required: false
    },
    { key: 'qr_share', name: 'QR Code & Sharing', fields: [
      { name: 'qr_foreground', type: 'color', label: 'QR Color' },
      { name: 'qr_background', type: 'color', label: 'QR Background' },
      { name: 'share_message', type: 'textarea', label: 'Share Message' }
    ], required: false },
    { key: 'seo', name: 'SEO & Meta', fields: [
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
      name: 'Jamie Rivera',
      title: 'Certified Relationship Coach',
      tagline: 'Helping you build the love life you deserve — whether you\'re single, dating, or committed.'
    },
    contact: {
      email: 'jamie@lovecoaching.com',
      website: 'https://lovecoaching.com',
      location: 'Miami, FL'
    },
    about: {
      description: 'After transforming my own relationship with love, I became passionate about helping others do the same. With 10+ years of experience and 500+ clients served, I specialize in helping people break unhealthy patterns and build deeply fulfilling relationships.',
      specializations: ['Dating Confidence', 'Communication Skills', 'Attachment Styles', 'Couples Coaching', 'Breakup Recovery'],
      experience: 10
    },
    programs: {
      program_list: [
        { title: 'Magnetic Love Blueprint', description: '8-week program to transform your dating life and attract your ideal partner', duration: '8 Weeks', format: 'one-on-one', price: '$1,997' },
        { title: 'Relationship Reboot', description: 'For couples who want to reignite their connection and deepen intimacy', duration: '12 Weeks', format: 'couples', price: '$2,997' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: What\'s Your Attachment Style? Quiz',
      magnet_description: 'Take this 5-minute quiz to discover your attachment style and get personalized tips for healthier relationships.',
      magnet_type: 'quiz'
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
      meta_title: 'Jamie Rivera | Relationship Coach',
      meta_description: 'Expert relationship coaching for singles and couples. Break patterns, build confidence, and create lasting love.'
    },
    footer: {
      footer_text: 'Love is a skill. Let me teach you.',
      copyright_text: '© 2025 Jamie Rivera Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#BE185D',
    secondaryColor: '#9D174D',
    accentColor: '#F59E0B',
    fontFamily: 'Inter'
  }
};
