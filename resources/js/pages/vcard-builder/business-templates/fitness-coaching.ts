import { socialPlatformsConfig } from '../social-platforms-config';

export const fitnessCoachTemplate = {
  name: 'Fitness & Body Coach',
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
      { name: 'description', type: 'textarea', label: 'Your Story' },
      { name: 'specializations', type: 'tags', label: 'Specializations' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications' },
      { name: 'experience', type: 'number', label: 'Years of Experience' }
    ], required: false },
    { key: 'programs', name: 'Training Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Personal Training' },
          { value: 'group', label: 'Group Training' },
          { value: 'online', label: 'Online Program' },
          { value: 'hybrid', label: 'Hybrid (In-Person + Online)' },
          { value: 'challenge', label: 'Fitness Challenge' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'transformations', name: 'Body Transformations', fields: [
      { name: 'stories', type: 'repeater', label: 'Before & After', fields: [
        { name: 'client_name', type: 'text', label: 'Client' },
        { name: 'before_image', type: 'file', label: 'Before Photo' },
        { name: 'after_image', type: 'file', label: 'After Photo' },
        { name: 'before_state', type: 'text', label: 'Starting Point' },
        { name: 'after_state', type: 'text', label: 'Results' },
        { name: 'timeframe', type: 'text', label: 'Timeframe' },
        { name: 'testimonial', type: 'textarea', label: 'Testimonial' }
      ]}
    ], required: false },
    { key: 'results', name: 'Stats & Results', fields: [
      { name: 'total_lbs_lost', type: 'text', label: 'Total Lbs Lost by Clients' },
      { name: 'clients_transformed', type: 'text', label: 'Clients Transformed' },
      { name: 'avg_result', type: 'text', label: 'Average Result' },
      { name: 'completion_rate', type: 'text', label: 'Program Completion Rate' }
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'workout-plan', label: 'Workout Plan' },
        { value: 'meal-plan', label: 'Meal Plan' },
        { value: 'challenge', label: 'Free Challenge' },
        { value: 'guide', label: 'Fitness Guide' },
        { value: 'assessment', label: 'Body Assessment' }
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
    { key: 'booking', name: 'Free Consultation', fields: [
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
      name: 'Marcus Steel',
      title: 'Certified Personal Trainer & Body Transformation Coach',
      tagline: 'Your body is capable of more than you think. Let\'s prove it in 90 days.'
    },
    contact: {
      email: 'marcus@steelbodycoaching.com',
      website: 'https://steelbodycoaching.com',
      location: 'Miami, FL / Online'
    },
    about: {
      description: 'Former 280lb desk jockey turned fitness professional. I lost 100 lbs and discovered my life\'s purpose: helping busy professionals transform their bodies without living in the gym. My programs are designed for real people with real schedules.',
      specializations: ['Body Recomposition', 'Strength Training', 'Nutrition Coaching', 'HIIT', 'Contest Prep', 'Sustainable Fat Loss'],
      certifications_list: ['NASM Certified Personal Trainer', 'Precision Nutrition Level 2', 'CSCS (NSCA)'],
      experience: 10
    },
    programs: {
      program_list: [
        { title: '90-Day Body Transformation', description: 'Complete body recomposition with custom training and nutrition plans', duration: '90 Days', format: 'one-on-one', price: '$1,497' },
        { title: 'Shred Squad (Group)', description: 'High-energy group training with accountability partners', duration: '6 Weeks', format: 'challenge', price: '$297' }
      ]
    },
    results: {
      total_lbs_lost: '15,000+ lbs lost by clients',
      clients_transformed: '500+ bodies transformed',
      avg_result: '25 lbs lost in 90 days (avg)',
      completion_rate: '94% program completion rate'
    },
    transformations: {
      transformation_list: []
    },
    testimonials: {
      reviews: [
        { client_name: 'David K.', client_title: 'Lost 45 lbs in 90 days', review: 'Marcus\'s program completely changed my relationship with fitness. The workouts are intense but doable, and the nutrition plan is sustainable.', rating: 5, result_highlight: '-45 lbs in 90 days' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 7-Day Shred Starter Workout Plan',
      magnet_description: 'The exact beginner-friendly workout plan my clients follow in week 1. No gym required. Includes nutrition guide.',
      magnet_type: 'workout-plan'
    },
    booking: {
      call_duration: '30 minutes',
      call_description: 'During your free consultation, we\'ll assess your current fitness level and design a roadmap to your dream body.'
    },
    social: {
      social_links: [
        { platform: 'instagram', url: 'https://instagram.com/', username: '' },
        { platform: 'youtube', url: 'https://youtube.com/', username: '' }
      ]
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
      ]
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_subtitle: 'Have a question about training? Send me a message.',
      show_phone: true,
      show_message: true
    },
    qr_share: {
      qr_foreground: '#DC2626',
      qr_background: '#FFFFFF',
      share_message: 'Check out my fitness coaching services!'
    },
    seo: {
      meta_title: 'Marcus Steel | Body Transformation Coach in Miami',
      meta_description: 'Transform your body in 90 days with certified personal trainer Marcus Steel. Online and in-person training in Miami.'
    },
    footer: {
      footer_text: 'Your transformation starts with one decision.',
      copyright_text: '© 2025 Steel Body Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#DC2626',
    secondaryColor: '#111827',
    accentColor: '#F59E0B',
    fontFamily: 'Outfit'
  }
};
