import { socialPlatformsConfig } from '../social-platforms-config';

export const parentingCoachTemplate = {
  name: 'Parenting & Family Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Value Proposition' },
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
      { name: 'specializations', type: 'tags', label: 'Focus Areas' },
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
          { value: 'couples', label: 'Co-Parenting Sessions' },
          { value: 'group', label: 'Parent Support Group' },
          { value: 'course', label: 'Online Course' },
          { value: 'workshop', label: 'Workshop' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Family Wins', fields: [
      { name: 'families_helped', type: 'text', label: 'Families Helped' },
      { name: 'avg_improvement', type: 'text', label: 'Average Improvement' },
      { name: 'key_metric', type: 'text', label: 'Key Metric' },
      { name: 'case_studies', type: 'repeater', label: 'Family Stories', fields: [
        { name: 'family_name', type: 'text', label: 'Family' },
        { name: 'challenge', type: 'text', label: 'Challenge' },
        { name: 'result', type: 'text', label: 'Result' },
        { name: 'timeframe', type: 'text', label: 'Timeframe' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Guide', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'guide', label: 'Parenting Guide' },
        { value: 'checklist', label: 'Age-Based Checklist' },
        { value: 'scripts', label: 'Communication Scripts' },
        { value: 'workshop', label: 'Free Workshop' },
        { value: 'assessment', label: 'Parenting Style Quiz' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Download URL' },
      { name: 'magnet_image', type: 'file', label: 'Cover Image' }
    ], required: false },
    { key: 'testimonials', name: 'Parent Testimonials', fields: [
      { name: 'reviews', type: 'repeater', label: 'Reviews', fields: [
        { name: 'client_name', type: 'text', label: 'Name' },
        { name: 'review', type: 'textarea', label: 'Testimonial' },
        { name: 'rating', type: 'number', label: 'Rating' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'booking', name: 'Family Strategy Call', fields: [
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
      name: 'Dr. Sarah Williams',
      title: 'Positive Parenting Coach',
      tagline: 'Stop the power struggles. Raise confident, emotionally intelligent kids — without yelling.'
    },
    contact: {
      email: 'sarah@parentingwithpurpose.com',
      website: 'https://parentingwithpurpose.com',
      location: 'Denver, CO / Virtual'
    },
    about: {
      description: 'Mom of 3. Child psychologist turned parenting coach. After 15 years studying child development, I created the Calm Parent Method™ — a proven framework that replaces reactive parenting with connected, intentional strategies that actually work.',
      specializations: ['Toddler Behavior', 'Teen Communication', 'Sibling Rivalry', 'Positive Discipline', 'Co-Parenting', 'ADHD-Friendly Parenting'],
      certifications_list: ['Ph.D. Child Psychology', 'Certified Positive Discipline Educator', 'PCI Certified Parent Coach'],
      experience: 15
    },
    programs: {
      program_list: [
        { title: 'The Calm Parent Method™', description: 'Transform your family dynamic in 8 weeks with my signature positive parenting system', duration: '8 Weeks', format: 'one-on-one', price: '$997' },
        { title: 'Parent Support Circle', description: 'Weekly group coaching with other parents, live Q&A, and community support', duration: 'Monthly', format: 'group', price: '$47/mo' }
      ]
    },
    results: {
      families_helped: '1,200+ families transformed',
      avg_improvement: '85% reduction in daily conflicts',
      key_metric: '92% of parents report feeling more confident within 30 days'
    },
    lead_magnet: {
      magnet_title: 'Free: 10 Calm-Down Scripts That Actually Work',
      magnet_description: 'Word-for-word scripts for the 10 most common meltdown situations. Backed by child psychology research.',
      magnet_type: 'scripts'
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
      meta_title: 'Dr. Sarah Williams | Positive Parenting Coach',
      meta_description: 'Stop the power struggles. Certified parenting coach helping families build connection, reduce conflict, and raise confident kids.'
    },
    footer: {
      footer_text: 'Peaceful parenting starts with one conversation.',
      copyright_text: '© 2025 Parenting With Purpose. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#0891B2',
    secondaryColor: '#155E75',
    accentColor: '#F472B6',
    fontFamily: 'Nunito'
  }
};
