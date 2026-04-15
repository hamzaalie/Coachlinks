import { socialPlatformsConfig } from '../social-platforms-config';

export const salesCoachTemplate = {
  name: 'Sales & Revenue Coach',
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
      { name: 'specializations', type: 'tags', label: 'Expertise' },
      { name: 'certifications_list', type: 'tags', label: 'Credentials' },
      { name: 'experience', type: 'number', label: 'Years in Sales' }
    ], required: false },
    { key: 'programs', name: 'Sales Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Sales Coaching' },
          { value: 'team', label: 'Team Training' },
          { value: 'course', label: 'Online Course' },
          { value: 'mastermind', label: 'Sales Mastermind' },
          { value: 'intensive', label: 'Intensive Workshop' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Revenue Results', fields: [
      { name: 'total_revenue_generated', type: 'text', label: 'Total Revenue Generated' },
      { name: 'avg_close_rate_increase', type: 'text', label: 'Avg Close Rate Increase' },
      { name: 'clients_served', type: 'text', label: 'Clients/Teams Served' },
      { name: 'case_studies', type: 'repeater', label: 'Case Studies', fields: [
        { name: 'client_name', type: 'text', label: 'Client/Company' },
        { name: 'challenge', type: 'text', label: 'Challenge' },
        { name: 'result', type: 'text', label: 'Result' },
        { name: 'revenue_impact', type: 'text', label: 'Revenue Impact' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'scripts', label: 'Sales Scripts' },
        { value: 'framework', label: 'Closing Framework' },
        { value: 'playbook', label: 'Sales Playbook' },
        { value: 'masterclass', label: 'Free Masterclass' },
        { value: 'assessment', label: 'Sales Skill Assessment' }
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
    { key: 'booking', name: 'Revenue Strategy Call', fields: [
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
      name: 'Jason Cruz',
      title: 'Elite Sales Coach & Revenue Strategist',
      tagline: 'Close more deals. Build a sales system that prints money on autopilot.'
    },
    contact: {
      email: 'jason@closercode.com',
      website: 'https://closercode.com',
      location: 'New York, NY / Virtual'
    },
    about: {
      description: '$47M in personal sales over 15 years. I went from cold-calling in a cubicle to building a multi-million dollar sales organization. Now I teach entrepreneurs and sales teams the Closer Code™ — the exact system I used to consistently close 6- and 7-figure deals.',
      specializations: ['High-Ticket Closing', 'Sales Team Training', 'Pipeline Optimization', 'Cold Outreach', 'Objection Handling', 'Revenue Scaling'],
      certifications_list: ['Sandler Sales Certification', 'Grant Cardone Certified Trainer', 'HubSpot Sales Expert'],
      experience: 15
    },
    programs: {
      program_list: [
        { title: 'Closer Code™ Mastery', description: 'My complete high-ticket closing system for entrepreneurs and sales pros', duration: '12 Weeks', format: 'one-on-one', price: '$4,997' },
        { title: 'Sales Team Accelerator', description: 'Transform your sales team into a closing machine. Onsite or virtual.', duration: '2 Days', format: 'team', price: 'Custom Pricing' }
      ]
    },
    results: {
      total_revenue_generated: '$200M+ revenue generated for clients',
      avg_close_rate_increase: '45% avg close rate improvement',
      clients_served: '500+ sales professionals trained'
    },
    lead_magnet: {
      magnet_title: 'Free: The 7 Objection Killers Framework',
      magnet_description: 'Word-for-word rebuttals for the 7 most common objections that kill deals. Used by top 1% closers.',
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
      meta_title: 'Jason Cruz | Elite Sales Coach & Revenue Strategist',
      meta_description: 'Close more deals and build a predictable revenue machine. Sales coaching for entrepreneurs and teams.'
    },
    footer: {
      footer_text: 'Every objection is an invitation to close.',
      copyright_text: '© 2025 Closer Code. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#0F172A',
    secondaryColor: '#1E293B',
    accentColor: '#EAB308',
    fontFamily: 'Inter'
  }
};
