import { socialPlatformsConfig } from '../social-platforms-config';

export const careerCoachTemplate = {
  name: 'Career & Executive Coach',
  sections: [
    { key: 'header', name: 'Header', fields: [
      { name: 'name', type: 'text', label: 'Coach Name' },
      { name: 'title', type: 'text', label: 'Title' },
      { name: 'tagline', type: 'textarea', label: 'Value Proposition' },
      { name: 'profile_image', type: 'file', label: 'Professional Photo' }
    ], required: true },
    { key: 'contact', name: 'Contact Information', fields: [
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'phone', type: 'tel', label: 'Phone' },
      { name: 'website', type: 'url', label: 'Website' },
      { name: 'linkedin', type: 'url', label: 'LinkedIn Profile' },
      { name: 'location', type: 'text', label: 'Location' }
    ], required: true },
    { key: 'about', name: 'About', fields: [
      { name: 'description', type: 'textarea', label: 'Professional Background' },
      { name: 'specializations', type: 'tags', label: 'Specializations' },
      { name: 'experience', type: 'number', label: 'Years in Industry' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications (ICF, etc.)' }
    ], required: false },
    { key: 'programs', name: 'Coaching Programs', fields: [
      {
        name: 'program_list', type: 'repeater', label: 'Programs',
        fields: [
          { name: 'title', type: 'text', label: 'Program Name' },
          { name: 'description', type: 'textarea', label: 'Description' },
          { name: 'duration', type: 'text', label: 'Duration' },
          { name: 'format', type: 'select', label: 'Format', options: [
            { value: 'executive', label: 'Executive Coaching' },
            { value: 'career-transition', label: 'Career Transition' },
            { value: 'leadership', label: 'Leadership Development' },
            { value: 'group', label: 'Group Program' },
            { value: 'workshop', label: 'Workshop' }
          ]},
          { name: 'price', type: 'text', label: 'Investment' }
        ]
      }
    ], required: false },
    { key: 'results', name: 'Client Outcomes', fields: [
      { name: 'salary_increase_avg', type: 'text', label: 'Avg Salary Increase' },
      { name: 'promotion_rate', type: 'text', label: 'Promotion Success Rate' },
      { name: 'career_pivots', type: 'text', label: 'Successful Career Pivots' },
      {
        name: 'case_studies', type: 'repeater', label: 'Success Stories',
        fields: [
          { name: 'client_role', type: 'text', label: 'Client Role (Before)' },
          { name: 'client_role_after', type: 'text', label: 'Client Role (After)' },
          { name: 'company', type: 'text', label: 'Company/Industry' },
          { name: 'outcome', type: 'textarea', label: 'Outcome' },
          { name: 'salary_change', type: 'text', label: 'Compensation Change' }
        ]
      }
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'resume-template', label: 'Resume Template' },
        { value: 'interview-guide', label: 'Interview Guide' },
        { value: 'career-assessment', label: 'Career Assessment' },
        { value: 'salary-negotiation', label: 'Salary Negotiation Guide' },
        { value: 'linkedin-guide', label: 'LinkedIn Optimization Guide' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Download URL' },
      { name: 'magnet_image', type: 'file', label: 'Cover Image' }
    ], required: false },
    { key: 'testimonials', name: 'Testimonials', fields: [
      {
        name: 'reviews', type: 'repeater', label: 'Client Reviews',
        fields: [
          { name: 'client_name', type: 'text', label: 'Client Name' },
          { name: 'client_title', type: 'text', label: 'Title & Company' },
          { name: 'review', type: 'textarea', label: 'Testimonial' },
          { name: 'rating', type: 'number', label: 'Rating (1-5)' },
          { name: 'client_photo', type: 'file', label: 'Photo' }
        ]
      }
    ], required: false },
    { key: 'booking', name: 'Strategy Call', fields: [
      { name: 'booking_url', type: 'url', label: 'Booking URL' },
      { name: 'call_duration', type: 'text', label: 'Duration' },
      { name: 'call_description', type: 'textarea', label: 'What to Expect' }
    ], required: false },
    { key: 'social', name: 'Social Media', fields: [
      {
        name: 'social_links', type: 'repeater', label: 'Profiles',
        fields: [
          { name: 'platform', type: 'select', label: 'Platform', options: socialPlatformsConfig.map(p => ({ value: p.value, label: p.label })) },
          { name: 'url', type: 'url', label: 'URL' },
          { name: 'username', type: 'text', label: 'Username' }
        ]
      }
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
      { name: 'form_title', type: 'text', label: 'Form Title' },
      { name: 'form_subtitle', type: 'textarea', label: 'Description' },
      { name: 'show_phone', type: 'checkbox', label: 'Include Phone' },
      { name: 'show_message', type: 'checkbox', label: 'Include Message' }
    ], required: false },
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
      name: 'Michael Torres',
      title: 'ICF-Certified Executive Coach',
      tagline: 'Accelerate your career. Land your dream role. Negotiate what you\'re worth.'
    },
    contact: {
      email: 'michael@careerleap.com',
      linkedin: 'https://linkedin.com/in/michaeltorres',
      website: 'https://careerleap.com',
      location: 'Chicago, IL'
    },
    about: {
      description: 'Former VP at a Fortune 100 company turned executive coach. I help ambitious professionals navigate career transitions, negotiate executive packages, and step into leadership roles with confidence.',
      specializations: ['Executive Coaching', 'Career Transitions', 'Leadership Development', 'Salary Negotiation', 'Personal Branding'],
      experience: 20,
      certifications_list: ['ICF PCC', 'Marshall Goldsmith Certified', 'SHRM-SCP']
    },
    programs: {
      program_list: [
        { title: 'Executive Acceleration', description: 'For C-suite aspirants ready to make their next big move', duration: '6 Months', format: 'executive', price: '$5,000/mo' },
        { title: 'Career Pivot Program', description: 'Strategic guidance for mid-career professionals changing industries', duration: '3 Months', format: 'career-transition', price: '$3,997' }
      ]
    },
    results: {
      salary_increase_avg: '35% average salary increase',
      promotion_rate: '87% promotion success rate',
      career_pivots: '150+ successful career transitions'
    },
    lead_magnet: {
      magnet_title: 'Free: The Executive Salary Negotiation Playbook',
      magnet_description: 'The exact scripts and strategies I coach my clients to use when negotiating executive compensation packages.',
      magnet_type: 'salary-negotiation'
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
      meta_title: 'Michael Torres | Executive Career Coach',
      meta_description: 'ICF-certified executive coach helping professionals land dream roles, negotiate better, and lead with confidence.'
    },
    footer: {
      footer_text: 'Your career breakthrough starts with a conversation',
      copyright_text: '© 2025 Career Leap Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#0B1324',
    accentColor: '#F59E0B',
    fontFamily: 'Space Grotesk'
  }
};
