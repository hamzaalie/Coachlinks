import { socialPlatformsConfig } from '../social-platforms-config';

export const leadershipCoachTemplate = {
  name: 'Leadership & Executive Coach',
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
      { name: 'description', type: 'textarea', label: 'Executive Bio' },
      { name: 'specializations', type: 'tags', label: 'Expertise' },
      { name: 'certifications_list', type: 'tags', label: 'Credentials' },
      { name: 'experience', type: 'number', label: 'Years of Experience' },
      { name: 'companies', type: 'tags', label: 'Companies Worked With' }
    ], required: false },
    { key: 'programs', name: 'Executive Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: 'Executive 1:1' },
          { value: 'team', label: 'Team Development' },
          { value: 'retreat', label: 'Leadership Retreat' },
          { value: 'keynote', label: 'Keynote & Workshop' },
          { value: 'advisory', label: 'Advisory Retainer' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Impact & Results', fields: [
      { name: 'executives_coached', type: 'text', label: 'Executives Coached' },
      { name: 'companies_impacted', type: 'text', label: 'Companies Impacted' },
      { name: 'keynotes_delivered', type: 'text', label: 'Keynotes Delivered' },
      { name: 'case_studies', type: 'repeater', label: 'Case Studies', fields: [
        { name: 'company', type: 'text', label: 'Company' },
        { name: 'leader_title', type: 'text', label: 'Leader Title' },
        { name: 'challenge', type: 'text', label: 'Challenge' },
        { name: 'result', type: 'text', label: 'Result' }
      ]}
    ], required: false },
    { key: 'signature_offer', name: 'Signature Framework', fields: [
      { name: 'framework_name', type: 'text', label: 'Framework Name' },
      { name: 'framework_description', type: 'textarea', label: 'Description' },
      { name: 'pillars', type: 'repeater', label: 'Pillars', fields: [
        { name: 'name', type: 'text', label: 'Pillar Name' },
        { name: 'description', type: 'text', label: 'Description' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'assessment', label: 'Leadership Assessment' },
        { value: 'framework', label: 'Leadership Framework' },
        { value: 'playbook', label: 'Executive Playbook' },
        { value: 'masterclass', label: 'Free Masterclass' },
        { value: 'whitepaper', label: 'White Paper' }
      ]},
      { name: 'magnet_url', type: 'url', label: 'Download URL' },
      { name: 'magnet_image', type: 'file', label: 'Cover Image' }
    ], required: false },
    { key: 'testimonials', name: 'Executive Testimonials', fields: [
      { name: 'reviews', type: 'repeater', label: 'Reviews', fields: [
        { name: 'client_name', type: 'text', label: 'Name' },
        { name: 'client_title', type: 'text', label: 'Title & Company' },
        { name: 'review', type: 'textarea', label: 'Testimonial' },
        { name: 'client_photo', type: 'file', label: 'Photo' }
      ]}
    ], required: false },
    { key: 'booking', name: 'Executive Consultation', fields: [
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
      name: 'Dr. Robert Chang',
      title: 'Executive Leadership Coach | Former Fortune 500 VP',
      tagline: 'Develop leaders who inspire. Build teams that deliver. Scale organizations that endure.'
    },
    contact: {
      email: 'robert@changexecutive.com',
      website: 'https://changexecutive.com',
      location: 'Chicago, IL / Global'
    },
    about: {
      description: '20 years as a Fortune 500 executive taught me that leadership is the bottleneck — and the breakthrough. After serving as VP of Operations at two publicly traded companies, I now coach C-suite leaders and their teams to perform at the highest level.',
      specializations: ['C-Suite Coaching', 'Team Performance', 'Strategic Thinking', 'Executive Presence', 'Change Management', 'Board Communication'],
      certifications_list: ['ICF Master Certified Coach (MCC)', 'Marshall Goldsmith Stakeholder Centered Coach', 'MBA, Harvard Business School'],
      companies: ['Google', 'Microsoft', 'Salesforce', 'McKinsey', 'JPMorgan']
    },
    programs: {
      program_list: [
        { title: 'Executive Edge Program', description: 'Intensive 1:1 coaching for C-suite & VP-level leaders. 360 assessment included.', duration: '6 Months', format: 'one-on-one', price: '$15,000' },
        { title: 'Leadership Team Offsite', description: 'Facilitated 2-day retreat to align your leadership team and accelerate performance', duration: '2 Days', format: 'retreat', price: '$25,000' }
      ]
    },
    results: {
      executives_coached: '400+ executives coached',
      companies_impacted: '150+ companies transformed',
      keynotes_delivered: '200+ keynotes delivered'
    },
    signature_offer: {
      framework_name: 'The Leadership Catalyst Framework™',
      framework_description: 'A proven 4-pillar system for developing high-impact executive leadership',
      pillars: [
        { name: 'Self-Mastery', description: 'Lead yourself before you lead others' },
        { name: 'Team Architecture', description: 'Build and align a high-performing team' },
        { name: 'Strategic Vision', description: 'See around corners and set the direction' },
        { name: 'Organizational Impact', description: 'Create ripple effects across the enterprise' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: Executive Leadership Assessment',
      magnet_description: 'Discover your leadership blind spots with this evidence-based 360° self-assessment. Used by Fortune 500 leaders.',
      magnet_type: 'assessment'
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
      meta_title: 'Dr. Robert Chang | Executive Leadership Coach',
      meta_description: 'Executive coaching for C-suite leaders. ICF Master Certified Coach with 20+ years of Fortune 500 experience.'
    },
    footer: {
      footer_text: 'Leadership is not a title. It\'s a decision.',
      copyright_text: '© 2025 Chang Executive. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#1E3A5F',
    secondaryColor: '#0F2744',
    accentColor: '#D4AF37',
    fontFamily: 'Playfair Display'
  }
};
