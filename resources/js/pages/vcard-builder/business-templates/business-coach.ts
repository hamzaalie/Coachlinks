import { socialPlatformsConfig } from '../social-platforms-config';

export const businessCoachTemplate = {
  name: 'Business Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Value Proposition' },
        { name: 'profile_image', type: 'file', label: 'Professional Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Business Website' },
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Your Story & Expertise' },
        { name: 'specializations', type: 'tags', label: 'Business Specializations' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'mission', type: 'textarea', label: 'Mission Statement' }
      ],
      required: false
    },
    {
      key: 'signature_offer',
      name: 'Signature Offer',
      fields: [
        { name: 'offer_title', type: 'text', label: 'Offer Name' },
        { name: 'offer_description', type: 'textarea', label: 'Offer Description' },
        { name: 'offer_price', type: 'text', label: 'Investment' },
        { name: 'offer_includes', type: 'tags', label: 'What\'s Included' },
        { name: 'offer_url', type: 'url', label: 'Enrollment URL' },
        { name: 'offer_cta', type: 'text', label: 'CTA Button Text' }
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
          label: 'Programs & Packages',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: '1:1 Coaching' },
              { value: 'group', label: 'Group Program' },
              { value: 'mastermind', label: 'Mastermind' },
              { value: 'vip-day', label: 'VIP Day' },
              { value: 'online-course', label: 'Online Course' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' },
            { name: 'enrollment_url', type: 'url', label: 'Enrollment Link' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'results',
      name: 'Client Results',
      fields: [
        { name: 'revenue_generated', type: 'text', label: 'Total Revenue Generated for Clients' },
        { name: 'businesses_scaled', type: 'text', label: 'Businesses Scaled' },
        { name: 'avg_growth', type: 'text', label: 'Average Client Growth %' },
        {
          name: 'case_studies',
          type: 'repeater',
          label: 'Case Studies',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client/Business Name' },
            { name: 'industry', type: 'text', label: 'Industry' },
            { name: 'challenge', type: 'textarea', label: 'Challenge' },
            { name: 'solution', type: 'textarea', label: 'Solution' },
            { name: 'result', type: 'textarea', label: 'Result' },
            { name: 'revenue_impact', type: 'text', label: 'Revenue Impact' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Lead Magnet',
      fields: [
        { name: 'magnet_title', type: 'text', label: 'Lead Magnet Title' },
        { name: 'magnet_description', type: 'textarea', label: 'Description' },
        { name: 'magnet_type', type: 'select', label: 'Type', options: [
          { value: 'ebook', label: 'eBook/PDF Guide' },
          { value: 'checklist', label: 'Checklist' },
          { value: 'webinar', label: 'Free Webinar' },
          { value: 'assessment', label: 'Free Assessment' },
          { value: 'mini-course', label: 'Mini Course' },
          { value: 'template', label: 'Template Pack' }
        ]},
        { name: 'magnet_url', type: 'url', label: 'Download/Signup URL' },
        { name: 'magnet_image', type: 'file', label: 'Cover Image' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Client Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Testimonials',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'client_title', type: 'text', label: 'Client Title/Business' },
            { name: 'review', type: 'textarea', label: 'Testimonial' },
            { name: 'rating', type: 'number', label: 'Rating (1-5)' },
            { name: 'result_highlight', type: 'text', label: 'Key Result' },
            { name: 'client_photo', type: 'file', label: 'Client Photo' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'booking',
      name: 'Discovery Call',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Book a Discovery Call URL' },
        { name: 'booking_provider', type: 'select', label: 'Booking Platform', options: [
          { value: 'calendly', label: 'Calendly' },
          { value: 'acuity', label: 'Acuity Scheduling' },
          { value: 'cal', label: 'Cal.com' },
          { value: 'custom', label: 'Custom Link' }
        ]},
        { name: 'call_duration', type: 'text', label: 'Call Duration' },
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
      key: 'gallery',
      name: 'Media Gallery',
      fields: [
        {
          name: 'images',
          type: 'repeater',
          label: 'Photos',
          fields: [
            { name: 'image', type: 'file', label: 'Image' },
            { name: 'caption', type: 'text', label: 'Caption' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'contact_form',
      name: 'Contact Form',
      fields: [
        { name: 'form_title', type: 'text', label: 'Form Title' },
        { name: 'form_subtitle', type: 'textarea', label: 'Form Description' },
        { name: 'show_phone', type: 'checkbox', label: 'Include Phone Field' },
        { name: 'show_message', type: 'checkbox', label: 'Include Message Field' }
      ],
      required: false
    },
    {
      key: 'qr_share',
      name: 'QR Code & Sharing',
      fields: [
        { name: 'qr_foreground', type: 'color', label: 'QR Code Color' },
        { name: 'qr_background', type: 'color', label: 'QR Background Color' },
        { name: 'share_message', type: 'textarea', label: 'Share Message' }
      ],
      required: false
    },
    {
      key: 'seo',
      name: 'SEO & Meta',
      fields: [
        { name: 'meta_title', type: 'text', label: 'Meta Title' },
        { name: 'meta_description', type: 'textarea', label: 'Meta Description' },
        { name: 'meta_keywords', type: 'tags', label: 'Keywords' }
      ],
      required: false
    },
    {
      key: 'footer',
      name: 'Footer',
      fields: [
        { name: 'footer_text', type: 'text', label: 'Footer Text' },
        { name: 'copyright_text', type: 'text', label: 'Copyright Text' }
      ],
      required: false
    }
  ],
  defaultData: {
    header: {
      name: 'Alex Morgan',
      title: 'Business Growth Strategist',
      tagline: 'Helping entrepreneurs scale from 6 to 7 figures with proven systems and strategies'
    },
    contact: {
      email: 'alex@businessgrowth.com',
      phone: '+1 (555) 234-5678',
      website: 'https://businessgrowth.com',
      location: 'New York, NY'
    },
    about: {
      description: 'Former Fortune 500 executive turned business coach. I\'ve helped 200+ entrepreneurs build scalable businesses that generate consistent revenue while giving them the freedom they deserve.',
      specializations: ['Revenue Growth', 'Team Building', 'Systems & Automation', 'Sales Strategy', 'Executive Leadership'],
      experience: 15,
      mission: 'To help every entrepreneur build a business that works FOR them, not one that owns them.'
    },
    signature_offer: {
      offer_title: 'Scale to 7 Figures Mastermind',
      offer_description: '12-week intensive group coaching program with 1:1 strategy sessions, accountability partners, and proven frameworks.',
      offer_price: '$4,997',
      offer_includes: ['Weekly Group Calls', '2x Monthly 1:1 Sessions', 'Private Slack Community', 'Lifetime Framework Access'],
      offer_url: '',
      offer_cta: 'Apply Now'
    },
    programs: {
      program_list: [
        { title: 'VIP Strategy Day', description: 'Full-day intensive to map out your 90-day growth plan', duration: '1 Day', format: 'vip-day', price: '$2,500' },
        { title: '1:1 Executive Coaching', description: 'Personalized coaching for established business owners', duration: '6 Months', format: 'one-on-one', price: '$1,500/mo' }
      ]
    },
    results: {
      revenue_generated: '$12M+',
      businesses_scaled: '200+',
      avg_growth: '150%',
      case_studies: [
        { client_name: 'Sarah Mitchell', industry: 'E-commerce', challenge: 'Stuck at $500K/year with no clear growth path', solution: 'Implemented scalable systems and sales funnels', result: 'Scaled to $2M in 18 months', revenue_impact: '+300%' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: The 7-Figure Business Blueprint',
      magnet_description: 'Download the exact framework I use with my clients to scale from 6 to 7 figures in 12 months.',
      magnet_type: 'ebook'
    },
    testimonials: {
      reviews: [
        { client_name: 'Michael Chen', client_title: 'CEO, TechScale Inc.', review: 'Working with this coach completely transformed my business. Revenue doubled in just 6 months.', rating: 5, result_highlight: '2x Revenue in 6 months' },
        { client_name: 'Jessica Rivera', client_title: 'Founder, Bloom Boutique', review: 'The strategies and accountability were exactly what I needed to break through my plateau.', rating: 5, result_highlight: 'From $300K to $1.2M' }
      ]
    },
    booking: {
      call_duration: '30 minutes',
      call_description: 'During your free discovery call, we\'ll identify your biggest growth bottleneck and create a custom action plan.'
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/', username: '' },
        { platform: 'instagram', url: 'https://instagram.com/', username: '' }
      ]
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
      ]
    },
    gallery: {
      images: []
    },
    contact_form: {
      form_title: 'Get in Touch',
      form_subtitle: 'Have a question? Send me a message and I\'ll get back to you within 24 hours.',
      show_phone: true,
      show_message: true
    },
    qr_share: {
      qr_foreground: '#0A2540',
      qr_background: '#FFFFFF',
      share_message: 'Check out my coaching services!'
    },
    seo: {
      meta_title: 'Alex Morgan | Business Growth Coach',
      meta_description: 'Work with a proven business coach to scale your business. Strategy sessions, group programs, and VIP days available.'
    },
    footer: {
      footer_text: 'Ready to scale your business?',
      copyright_text: '© 2025 Alex Morgan Coaching. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#0A2540',
    secondaryColor: '#6B4EFF',
    accentColor: '#FF6B00',
    fontFamily: 'Inter'
  }
};
