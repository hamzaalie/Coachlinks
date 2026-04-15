import { socialPlatformsConfig } from '../social-platforms-config';

export const financialCoachTemplate = {
  name: 'Financial & Money Coach',
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
      { name: 'description', type: 'textarea', label: 'Your Financial Story' },
      { name: 'specializations', type: 'tags', label: 'Specializations' },
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
          { value: 'workshop', label: 'Workshop' },
          { value: 'bootcamp', label: 'Financial Bootcamp' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Client Results', fields: [
      { name: 'total_debt_eliminated', type: 'text', label: 'Total Debt Eliminated' },
      { name: 'avg_savings_increase', type: 'text', label: 'Avg Savings Increase' },
      { name: 'clients_debt_free', type: 'text', label: 'Clients Debt-Free' },
      { name: 'case_studies', type: 'repeater', label: 'Success Stories', fields: [
        { name: 'client_name', type: 'text', label: 'Client Name' },
        { name: 'starting_point', type: 'text', label: 'Starting Point' },
        { name: 'result', type: 'text', label: 'Result Achieved' },
        { name: 'timeframe', type: 'text', label: 'Timeframe' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'budget-template', label: 'Budget Template' },
        { value: 'debt-plan', label: 'Debt Payoff Plan' },
        { value: 'investment-guide', label: 'Investment Starter Guide' },
        { value: 'assessment', label: 'Financial Health Check' },
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
        { name: 'result_highlight', type: 'text', label: 'Key Result' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'booking', name: 'Financial Strategy Call', fields: [
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
      name: 'David Park',
      title: 'Certified Financial Coach',
      tagline: 'Break free from money stress. Build wealth with confidence and a clear plan.'
    },
    contact: {
      email: 'david@moneymastered.com',
      website: 'https://moneymastered.com',
      location: 'Austin, TX / Virtual'
    },
    about: {
      description: 'I went from $87,000 in debt to financially free in 3 years. Now I teach others the exact system I used. As a certified financial coach, I\'ve helped 300+ families eliminate debt and build real wealth.',
      specializations: ['Debt Elimination', 'Budgeting Systems', 'Investment Strategy', 'Wealth Building', 'Money Mindset'],
      certifications_list: ['AFC (Accredited Financial Counselor)', 'Dave Ramsey Preferred Coach', 'CFP Board Registered'],
      experience: 8
    },
    programs: {
      program_list: [
        { title: 'Debt Freedom Accelerator', description: 'Proven system to eliminate all debt in 18-36 months', duration: '6 Months', format: 'one-on-one', price: '$1,997' },
        { title: 'Wealth Building Bootcamp', description: 'Group program to start investing and building long-term wealth', duration: '8 Weeks', format: 'bootcamp', price: '$497' }
      ]
    },
    results: {
      total_debt_eliminated: '$12M+ in client debt eliminated',
      avg_savings_increase: '340% average savings increase',
      clients_debt_free: '200+ clients now debt-free'
    },
    lead_magnet: {
      magnet_title: 'Free: The Zero-Debt Roadmap Template',
      magnet_description: 'The exact spreadsheet and step-by-step plan my clients use to become debt-free. Customizable to your situation.',
      magnet_type: 'budget-template'
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
      meta_title: 'David Park | Financial Coach & Money Expert',
      meta_description: 'Get out of debt and build wealth with a certified financial coach. Proven systems for budgeting, investing, and financial freedom.'
    },
    footer: {
      footer_text: 'Financial freedom isn\'t a dream — it\'s a plan.',
      copyright_text: '© 2025 Money Mastered. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#047857',
    secondaryColor: '#065F46',
    accentColor: '#D97706',
    fontFamily: 'Inter'
  }
};
