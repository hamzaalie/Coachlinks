import { socialPlatformsConfig } from '../social-platforms-config';

export const adhdCoachTemplate = {
  name: 'ADHD & Neurodivergent Coach',
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
      { name: 'description', type: 'textarea', label: 'Your ADHD Journey' },
      { name: 'specializations', type: 'tags', label: 'Focus Areas' },
      { name: 'certifications_list', type: 'tags', label: 'Certifications' }
    ], required: false },
    { key: 'programs', name: 'Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 ADHD Coaching' },
          { value: 'group', label: 'Group Support' },
          { value: 'body-double', label: 'Body Doubling Sessions' },
          { value: 'course', label: 'Online Course' },
          { value: 'intensive', label: 'Strategy Intensive' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Results', fields: [
      { name: 'clients_helped', type: 'text', label: 'Clients Helped' },
      { name: 'key_stat', type: 'text', label: 'Key Statistic' },
      { name: 'satisfaction', type: 'text', label: 'Satisfaction Rate' }
    ], required: false },
    { key: 'lead_magnet', name: 'Free Tool', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'toolkit', label: 'ADHD Toolkit' },
        { value: 'planner', label: 'ADHD-Friendly Planner' },
        { value: 'guide', label: 'Strategies Guide' },
        { value: 'assessment', label: 'Self-Assessment' },
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
    { key: 'booking', name: 'ADHD Strategy Call', fields: [
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
      name: 'Dr. Jamie Foster',
      title: 'ADHD Coach & Neurodivergent Advocate',
      tagline: 'ADHD isn\'t broken. Your systems are. Let\'s build ones that work WITH your brain.'
    },
    contact: {
      email: 'jamie@adhdunlocked.com',
      website: 'https://adhdunlocked.com',
      location: 'Seattle, WA / Virtual'
    },
    about: {
      description: 'Diagnosed with ADHD at 32 after struggling through corporate America. Once I discovered ADHD-aligned strategies, everything changed. Now I help adults with ADHD stop fighting their brain and start leveraging it. No shame. No "try harder." Just systems that actually work.',
      specializations: ['Adult ADHD', 'Executive Function', 'Time Blindness', 'Emotional Regulation', 'ADHD in the Workplace', 'ADHD Relationships'],
      certifications_list: ['ADDCA Certified ADHD Coach', 'ICF ACC Certified', 'CHADD Professional']
    },
    programs: {
      program_list: [
        { title: 'ADHD Unlocked™ System', description: 'Custom ADHD management system built around your unique brain wiring', duration: '12 Weeks', format: 'one-on-one', price: '$1,997' },
        { title: 'Focus Squad (Body Doubling)', description: 'Live virtual co-working sessions with ADHD-friendly structure', duration: 'Weekly', format: 'body-double', price: '$47/mo' }
      ]
    },
    results: {
      clients_helped: '600+ ADHD adults coached',
      key_stat: '78% reduction in missed deadlines',
      satisfaction: '96% would recommend to another ADHDer'
    },
    lead_magnet: {
      magnet_title: 'Free: The ADHD-Friendly Morning Routine Builder',
      magnet_description: 'Build a morning routine that works WITH your ADHD brain. Includes timer templates and habit stacking guide.',
      magnet_type: 'toolkit'
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
      meta_title: 'Dr. Jamie Foster | Certified ADHD Coach',
      meta_description: 'ADHD coaching for adults. Build systems that work with your brain, not against it. Virtual ADHD coaching nationwide.'
    },
    footer: {
      footer_text: 'Your brain isn\'t broken. It\'s wired differently.',
      copyright_text: '© 2025 ADHD Unlocked. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#EA580C',
    secondaryColor: '#C2410C',
    accentColor: '#6366F1',
    fontFamily: 'Inter'
  }
};
