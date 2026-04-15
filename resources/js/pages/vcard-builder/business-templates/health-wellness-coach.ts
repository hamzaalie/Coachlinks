import { socialPlatformsConfig } from '../social-platforms-config';

export const healthWellnessCoachTemplate = {
  name: 'Health & Wellness Coach',
  sections: [
    {
      key: 'header',
      name: 'Header',
      fields: [
        { name: 'name', type: 'text', label: 'Coach Name' },
        { name: 'title', type: 'text', label: 'Coaching Title' },
        { name: 'tagline', type: 'textarea', label: 'Wellness Tagline' },
        { name: 'profile_image', type: 'file', label: 'Coach Photo' }
      ],
      required: true
    },
    {
      key: 'contact',
      name: 'Contact Information',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'phone', type: 'tel', label: 'Phone Number' },
        { name: 'website', type: 'url', label: 'Website' },
        { name: 'location', type: 'text', label: 'Location' }
      ],
      required: true
    },
    {
      key: 'about',
      name: 'About',
      fields: [
        { name: 'description', type: 'textarea', label: 'Your Wellness Story' },
        { name: 'specializations', type: 'tags', label: 'Health Specializations' },
        { name: 'certifications_list', type: 'tags', label: 'Certifications' },
        { name: 'experience', type: 'number', label: 'Years of Experience' },
        { name: 'approach', type: 'textarea', label: 'Your Approach to Wellness' }
      ],
      required: false
    },
    {
      key: 'programs',
      name: 'Wellness Programs',
      fields: [
        {
          name: 'program_list',
          type: 'repeater',
          label: 'Programs',
          fields: [
            { name: 'title', type: 'text', label: 'Program Name' },
            { name: 'description', type: 'textarea', label: 'Description' },
            { name: 'duration', type: 'text', label: 'Duration' },
            { name: 'format', type: 'select', label: 'Format', options: [
              { value: 'one-on-one', label: '1:1 Coaching' },
              { value: 'group', label: 'Group Program' },
              { value: 'detox', label: 'Detox Challenge' },
              { value: 'meal-plan', label: 'Meal Planning' },
              { value: 'online', label: 'Online Program' },
              { value: 'retreat', label: 'Wellness Retreat' }
            ]},
            { name: 'price', type: 'text', label: 'Investment' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'transformations',
      name: 'Client Transformations',
      fields: [
        {
          name: 'success_stories',
          type: 'repeater',
          label: 'Before & After Stories',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
            { name: 'before', type: 'textarea', label: 'Before' },
            { name: 'after', type: 'textarea', label: 'After' },
            { name: 'timeframe', type: 'text', label: 'Timeframe' },
            { name: 'key_result', type: 'text', label: 'Key Result' },
            { name: 'before_image', type: 'file', label: 'Before Photo' },
            { name: 'after_image', type: 'file', label: 'After Photo' }
          ]
        }
      ],
      required: false
    },
    {
      key: 'lead_magnet',
      name: 'Free Resource',
      fields: [
        { name: 'magnet_title', type: 'text', label: 'Resource Title' },
        { name: 'magnet_description', type: 'textarea', label: 'Description' },
        { name: 'magnet_type', type: 'select', label: 'Type', options: [
          { value: 'meal-plan', label: 'Free Meal Plan' },
          { value: 'recipe-book', label: 'Recipe eBook' },
          { value: 'challenge', label: '7-Day Challenge' },
          { value: 'assessment', label: 'Health Assessment' },
          { value: 'guide', label: 'Wellness Guide' }
        ]},
        { name: 'magnet_url', type: 'url', label: 'Download URL' },
        { name: 'magnet_image', type: 'file', label: 'Cover Image' }
      ],
      required: false
    },
    {
      key: 'testimonials',
      name: 'Testimonials',
      fields: [
        {
          name: 'reviews',
          type: 'repeater',
          label: 'Client Reviews',
          fields: [
            { name: 'client_name', type: 'text', label: 'Client Name' },
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
      name: 'Book a Consultation',
      fields: [
        { name: 'booking_url', type: 'url', label: 'Booking URL' },
        { name: 'booking_provider', type: 'select', label: 'Platform', options: [
          { value: 'calendly', label: 'Calendly' },
          { value: 'acuity', label: 'Acuity' },
          { value: 'cal', label: 'Cal.com' },
          { value: 'custom', label: 'Custom' }
        ]},
        { name: 'call_duration', type: 'text', label: 'Duration' },
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
      name: 'Wellness Gallery',
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
        { name: 'qr_background', type: 'color', label: 'QR Background' },
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
        { name: 'copyright_text', type: 'text', label: 'Copyright' }
      ],
      required: false
    }
  ],
  defaultData: {
    header: {
      name: 'Dr. Sarah Chen',
      title: 'Certified Health & Wellness Coach',
      tagline: 'Transform your health. Reclaim your energy. Live your best life.'
    },
    contact: {
      email: 'sarah@wellnesswithin.com',
      phone: '+1 (555) 345-6789',
      website: 'https://wellnesswithin.com',
      location: 'Los Angeles, CA'
    },
    about: {
      description: 'Board-certified health coach with a passion for helping busy professionals optimize their health without extreme diets or unsustainable routines. My science-backed approach focuses on sustainable habits that fit your life.',
      specializations: ['Gut Health', 'Hormone Balance', 'Stress Management', 'Nutrition', 'Sleep Optimization'],
      certifications_list: ['IIN Health Coach', 'NASM Nutrition Specialist', 'Functional Medicine Certified'],
      experience: 8,
      approach: 'I believe in bio-individual nutrition — what works for one person doesn\'t work for everyone. Together we\'ll find YOUR unique formula for optimal health.'
    },
    programs: {
      program_list: [
        { title: '90-Day Total Transformation', description: 'Comprehensive health reset including nutrition, movement, stress management and sleep optimization', duration: '90 Days', format: 'one-on-one', price: '$2,997' },
        { title: 'Gut Health Reset Challenge', description: '21-day guided program to heal your gut and boost your energy', duration: '21 Days', format: 'detox', price: '$497' }
      ]
    },
    lead_magnet: {
      magnet_title: 'Free: 7-Day Energy Reset Meal Plan',
      magnet_description: 'Delicious, gut-friendly recipes that will boost your energy in just one week. Includes shopping lists and prep guides.',
      magnet_type: 'meal-plan'
    },
    booking: {
      call_duration: '20 minutes',
      call_description: 'In your free wellness consultation, we\'ll discuss your health goals and create a personalized action plan.'
    },
    links: {
      link_items: [
        { text: 'Book a Free Consultation', url: '#', description: 'Schedule your discovery call', icon: 'calendar' },
        { text: 'Latest Blog Post', url: '#', description: 'Read my newest article', icon: 'document' },
        { text: 'Online Course', url: '#', description: 'Enroll in my signature program', icon: 'star' }
      ]
    },
    transformations: {
      transformation_list: []
    },
    testimonials: {
      reviews: [
        { client_name: 'Happy Client', client_title: 'Business Owner', review: 'An incredible experience that transformed my life and business.', rating: 5, result_highlight: 'Amazing Results' }
      ]
    },
    social: {
      social_links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/', username: '' },
        { platform: 'instagram', url: 'https://instagram.com/', username: '' }
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
      qr_foreground: '#000000',
      qr_background: '#FFFFFF',
      share_message: 'Check out my coaching services!'
    },

    seo: {
      meta_title: 'Dr. Sarah Chen | Health & Wellness Coach',
      meta_description: 'Transform your health with personalized coaching. Specializing in gut health, hormone balance, and sustainable wellness.'
    },
    footer: {
      footer_text: 'Your transformation starts here',
      copyright_text: '© 2025 Wellness Within. All rights reserved.'
    }
  },
  theme: {
    primaryColor: '#059669',
    secondaryColor: '#065F46',
    accentColor: '#D97706',
    fontFamily: 'Inter'
  }
};
