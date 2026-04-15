import { socialPlatformsConfig } from '../social-platforms-config';

export const accountabilityCoachTemplate = {
  name: 'Accountability & Productivity Coach',
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
      { name: 'certifications_list', type: 'tags', label: 'Certifications' }
    ], required: false },
    { key: 'programs', name: 'Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Accountability' },
          { value: 'group', label: 'Group Accountability' },
          { value: 'sprint', label: 'Goal Sprint' },
          { value: 'mastermind', label: 'Mastermind' },
          { value: 'voxer', label: 'Daily Voxer Check-ins' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Results', fields: [
      { name: 'goals_achieved', type: 'text', label: 'Goals Achieved' },
      { name: 'completion_rate', type: 'text', label: 'Completion Rate' },
      { name: 'productivity_increase', type: 'text', label: 'Productivity Increase' }
    ], required: false },
    { key: 'lead_magnet', name: 'Free Tool', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'planner', label: 'Goal Planner' },
        { value: 'tracker', label: 'Habit Tracker' },
        { value: 'framework', label: 'Productivity Framework' },
        { value: 'challenge', label: '7-Day Challenge' },
        { value: 'assessment', label: 'Productivity Audit' }
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
    { key: 'booking', name: 'Goal Strategy Session', fields: [
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
      name: 'Alex Drummond',
      title: 'Accountability Coach & Productivity Architect',
      tagline: 'Stop planning. Start finishing. Get the accountability system that turns goals into results.'
    },
    contact: {
      email: 'alex@goalgetter.com',
      website: 'https://goalgetter.com',
      location: 'Portland, OR / Virtual'
    },
    about: {
      description: 'I used to be the king of unfinished projects — 47 started, zero completed. Then I engineered a system that changed everything. Now I help entrepreneurs and high-achievers who are great at starting but terrible at finishing build unstoppable momentum.',
      specializations: ['Goal Achievement', 'Habit Building', 'Time Management', 'Focus & Elimination', 'Entrepreneurial Productivity', 'Procrastination'],
      certifications_list: ['ICF PCC Certified Coach', 'Certified High Performance Coach', 'GTD Certified']
    },
    programs: {
      program_list: [
        { title: 'The Finish Line System™', description: 'My signature accountability program: weekly check-ins, daily tracking, and strategic planning', duration: '90 Days', format: 'one-on-one', price: '$1,497' },
        { title: 'Momentum Mastermind', description: 'Small-group accountability with peer support and weekly hot seats', duration: 'Quarterly', format: 'mastermind', price: '$297/quarter' }
      ]
    },
    results: {
      goals_achieved: '2,500+ client goals achieved',
      completion_rate: '89% goal completion rate (vs. 8% national avg)',
      productivity_increase: '3.2x avg productivity increase'
    },
    lead_magnet: {
      magnet_title: 'Free: The 90-Day Goal Sprint Planner',
      magnet_description: 'The exact planning template my clients use to break big goals into weekly sprints. Includes accountability tracker.',
      magnet_type: 'planner'
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
      meta_title: 'Alex Drummond | Accountability Coach',
      meta_description: 'Stop procrastinating and start achieving. Accountability coaching for entrepreneurs who are ready to finish what they start.'
    },
    footer: {
      footer_text: 'Discipline is the bridge between goals and accomplishment.',
      copyright_text: '© 2025 Goal Getter Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#2563EB',
    secondaryColor: '#1D4ED8',
    accentColor: '#10B981',
    fontFamily: 'Inter'
  }
};
