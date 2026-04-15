import { socialPlatformsConfig } from '../social-platforms-config';

export const speakingCoachTemplate = {
  name: 'Public Speaking & Communication Coach',
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
      { name: 'experience', type: 'number', label: 'Years of Experience' }
    ], required: false },
    { key: 'programs', name: 'Speaking Programs', fields: [
      { name: 'program_list', type: 'repeater', label: 'Programs', fields: [
        { name: 'title', type: 'text', label: 'Name' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'duration', type: 'text', label: 'Duration' },
        { name: 'format', type: 'select', label: 'Format', options: [
          { value: 'one-on-one', label: '1:1 Coaching' },
          { value: 'group', label: 'Group Workshops' },
          { value: 'corporate', label: 'Corporate Training' },
          { value: 'intensive', label: 'Speak Intensive' },
          { value: 'vip', label: 'VIP Day' }
        ]},
        { name: 'price', type: 'text', label: 'Investment' }
      ]}
    ], required: false },
    { key: 'results', name: 'Speaker Results', fields: [
      { name: 'speakers_trained', type: 'text', label: 'Speakers Trained' },
      { name: 'ted_talks_coached', type: 'text', label: 'TEDx Talks Coached' },
      { name: 'keynotes_delivered', type: 'text', label: 'Keynotes Supported' },
      { name: 'case_studies', type: 'repeater', label: 'Success Stories', fields: [
        { name: 'client_name', type: 'text', label: 'Speaker' },
        { name: 'event', type: 'text', label: 'Event/Outcome' },
        { name: 'result', type: 'text', label: 'Result' }
      ]}
    ], required: false },
    { key: 'lead_magnet', name: 'Free Resource', fields: [
      { name: 'magnet_title', type: 'text', label: 'Title' },
      { name: 'magnet_description', type: 'textarea', label: 'Description' },
      { name: 'magnet_type', type: 'select', label: 'Type', options: [
        { value: 'template', label: 'Speech Template' },
        { value: 'guide', label: 'Speaking Guide' },
        { value: 'checklist', label: 'Presentation Checklist' },
        { value: 'masterclass', label: 'Free Masterclass' },
        { value: 'assessment', label: 'Speaking Style Assessment' }
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
    { key: 'booking', name: 'Speaking Assessment', fields: [
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
      name: 'Priya Sharma',
      title: 'TEDx Speaking Coach & Communication Strategist',
      tagline: 'Own the stage. Command the room. Turn your message into a movement.'
    },
    contact: {
      email: 'priya@speakwithimpact.com',
      website: 'https://speakwithimpact.com',
      location: 'Los Angeles, CA / Virtual'
    },
    about: {
      description: 'Former shy introvert turned TEDx speaking coach. After coaching 50+ TEDx speakers and training thousands of professionals, I\'ve discovered that great speaking isn\'t about talent — it\'s about technique. My StageShift Method™ turns nervous speakers into magnetic communicators.',
      specializations: ['TEDx Coaching', 'Keynote Development', 'Executive Presentations', 'Media Training', 'Storytelling', 'Stage Presence'],
      certifications_list: ['CSP (Certified Speaking Professional)', 'TEDx Licensed Coach', 'Toastmasters Distinguished'],
      experience: 12
    },
    programs: {
      program_list: [
        { title: 'StageShift Method™ Intensive', description: 'Transform your talk from mediocre to magnetic in 8 weeks', duration: '8 Weeks', format: 'one-on-one', price: '$3,997' },
        { title: 'TEDx to Stage Ready', description: 'Dedicated TEDx application, talk development, and rehearsal coaching', duration: '12 Weeks', format: 'one-on-one', price: '$7,500' }
      ]
    },
    results: {
      speakers_trained: '2,000+ speakers trained',
      ted_talks_coached: '50+ TEDx talks coached',
      keynotes_delivered: '300+ keynotes developed'
    },
    lead_magnet: {
      magnet_title: 'Free: The Perfect Opening — 5 Templates That Hook Any Audience',
      magnet_description: 'The exact opening frameworks used by top TEDx speakers and keynote pros. Steal them for your next talk.',
      magnet_type: 'template'
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
      meta_title: 'Priya Sharma | TEDx Speaking Coach',
      meta_description: 'Transform your public speaking with a certified TEDx speaking coach. Keynote development, stage presence, and communication mastery.'
    },
    footer: {
      footer_text: 'Your voice has the power to change the room.',
      copyright_text: '© 2025 Speak With Impact. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#7C3AED',
    secondaryColor: '#5B21B6',
    accentColor: '#F97316',
    fontFamily: 'Montserrat'
  }
};
