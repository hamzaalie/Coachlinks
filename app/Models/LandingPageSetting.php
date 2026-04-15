<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LandingPageSetting extends Model
{
    protected $fillable = [
        'company_name', 'contact_email', 'contact_phone', 'contact_address', 'config_sections'
    ];
    
    protected $attributes = [
        'company_name' => '',
        'contact_email' => '',
        'contact_phone' => '',
        'contact_address' => ''
    ];

    protected $casts = [
        'config_sections' => 'array'
    ];

    public static function getSettings()
    {
        $settings = self::first();
        
        if (!$settings) {
            // Import default sections from the template file structure
            $defaultConfig = [
                'sections' => [
                    [
                        'key' => 'header',
                        'transparent' => false,
                        'background_color' => '#ffffff',
                        'text_color' => '#1f2937',
                        'button_style' => 'gradient'
                    ],
                    [
                        'key' => 'hero',
                        'title' => 'Create Your Digital Business Card in Minutes',
                        'subtitle' => 'Transform your networking with professional digital business cards.',
                        'announcement_text' => '🚀 New: Advanced Analytics Dashboard',
                        'primary_button_text' => 'Start Free Trial',
                        'secondary_button_text' => 'Login',
                        'image' => '',
                        'background_color' => '#f8fafc',
                        'text_color' => '#1f2937',
                        'layout' => 'image-right',
                        'height' => 600,
                        'stats' => [
                            ['value' => '10K+', 'label' => 'Active Users'],
                            ['value' => '50+', 'label' => 'Countries'],
                            ['value' => '99%', 'label' => 'Satisfaction']
                        ],
                        'card' => [
                            'name' => 'John Doe',
                            'title' => 'Senior Developer',
                            'company' => 'Tech Solutions Inc.',
                            'initials' => 'JD'
                        ]
                    ],
                    [
                        'key' => 'features',
                        'title' => 'Powerful Features for Modern Networking',
                        'description' => 'Everything you need to create, share, and manage your digital business presence.',
                        'background_color' => '#ffffff',
                        'layout' => 'grid',
                        'columns' => 3,
                        'image' => '',
                        'show_icons' => true,
                        'features_list' => [
                            ['title' => 'QR Code Generation', 'description' => 'Generate unique QR codes for instant contact sharing.', 'icon' => 'qr-code'],
                            ['title' => 'NFC Technology', 'description' => 'Tap-to-share functionality with NFC-enabled devices.', 'icon' => 'smartphone'],
                            ['title' => 'Analytics & Insights', 'description' => 'Track views, clicks, and engagement metrics.', 'icon' => 'bar-chart']
                        ]
                    ],
                    [
                        'key' => 'screenshots',
                        'title' => 'See CoachLinks in Action',
                        'subtitle' => 'Explore our intuitive interface and powerful features designed to streamline your digital networking experience.',
                        'screenshots_list' => [
                            [
                                'src' => '/screenshots/hero.png',
                                'alt' => 'CoachLinks Dashboard Overview',
                                'title' => 'Dashboard Overview',
                                'description' => 'Comprehensive dashboard with all your digital cards and analytics'
                            ],
                            [
                                'src' => '/screenshots/vcard-builder.png',
                                'alt' => 'Coach Card Builder Interface',
                                'title' => 'Coach Card Builder',
                                'description' => 'Intuitive drag-and-drop builder for creating professional digital cards'
                            ]
                        ]
                    ],
                    [
                        'key' => 'why_choose_us',
                        'title' => 'Why Coaches Choose Us',
                        'subtitle' => 'We\'re not just another website builder. CoachLinks is built exclusively for coaches who want to attract clients, book calls, and grow their practice.',
                        'reasons' => [
                            ['icon' => 'rocket', 'title' => '5-Minute Setup', 'description' => 'Build your stunning coach profile in under 5 minutes. Pick a template, add your content, publish. No tech skills needed.'],
                            ['icon' => 'users', 'title' => 'Built Exclusively for Coaches', 'description' => 'Pre-built sections for programs, testimonials, lead magnets, booking — designed from the ground up for coaching businesses.'],
                            ['icon' => 'zap', 'title' => 'Leads on Autopilot', 'description' => 'Capture leads 24/7 with built-in lead magnets, discovery call booking, AI copywriting, and smart follow-up tools.'],
                            ['icon' => 'trending', 'title' => 'Proven Results', 'description' => 'Coaches using CoachLinks see 3x more discovery calls booked and 40% higher client conversion rates on average.'],
                            ['icon' => 'shield', 'title' => 'Enterprise-Grade Security', 'description' => 'reCAPTCHA protection, encrypted data, role-based permissions, webhooks, and GDPR-compliant data handling.'],
                            ['icon' => 'star', 'title' => 'White-Label Ready', 'description' => 'Run your own branded coaching platform. Custom domain, your logo, your colors — no CoachLinks branding anywhere.']
                        ],
                        'case_study' => [
                            'name' => 'Sarah Mitchell',
                            'role' => 'Executive Leadership Coach',
                            'niche' => 'C-Suite & VP Leadership Development',
                            'avatar_initials' => 'SM',
                            'quote' => 'Before CoachLinks, I was spending 10+ hours a week on admin — updating my website, chasing invoices, manually booking calls. Now everything runs on autopilot. I launched my new coaching page in one afternoon and booked 14 discovery calls that same week. It completely transformed my practice.',
                            'before' => 'Scattered online presence across 5 different tools. No lead capture. Manually scheduling every call via email. Averaging 2-3 new leads per month.',
                            'after' => 'One unified coaching page with integrated booking, lead magnets, and payments. Fully automated follow-ups. Consistent pipeline of qualified leads.',
                            'metrics' => [
                                ['label' => 'Discovery Calls / Month', 'value' => '2 → 14', 'icon' => 'calendar'],
                                ['label' => 'Monthly Revenue Growth', 'value' => '+340%', 'icon' => 'dollar'],
                                ['label' => 'Time Saved Weekly', 'value' => '10+ Hours', 'icon' => 'clock'],
                                ['label' => 'Client Conversion Rate', 'value' => '18% → 52%', 'icon' => 'chart']
                            ]
                        ]
                    ],
                    [
                        'key' => 'templates',
                        'title' => 'Explore Our Templates',
                        'subtitle' => 'Choose from our professionally designed templates to create your perfect digital business card.',
                        'background_color' => '#f8fafc',
                        'layout' => 'grid',
                        'columns' => 3,
                        'templates_list' => [
                            ['name' => 'business-coach', 'category' => 'coaching'],
                            ['name' => 'health-wellness-coach', 'category' => 'coaching'],
                            ['name' => 'relationship-coach', 'category' => 'coaching'],
                            ['name' => 'career-coach', 'category' => 'coaching'],
                            ['name' => 'mindset-coach', 'category' => 'coaching'],
                            ['name' => 'financial-coach', 'category' => 'coaching'],
                            ['name' => 'spiritual-coach', 'category' => 'coaching'],
                            ['name' => 'fitness-coach', 'category' => 'coaching'],
                            ['name' => 'parenting-coach', 'category' => 'coaching'],
                            ['name' => 'sales-coach', 'category' => 'coaching'],
                            ['name' => 'nutrition-coach', 'category' => 'coaching'],
                            ['name' => 'leadership-coach', 'category' => 'coaching'],
                            ['name' => 'speaking-coach', 'category' => 'coaching'],
                            ['name' => 'confidence-coach', 'category' => 'coaching'],
                            ['name' => 'accountability-coach', 'category' => 'coaching'],
                            ['name' => 'transition-coach', 'category' => 'coaching'],
                            ['name' => 'adhd-coach', 'category' => 'coaching'],
                            ['name' => 'executive-coach', 'category' => 'coaching'],
                            ['name' => 'dating-coach', 'category' => 'coaching'],
                            ['name' => 'productivity-coach', 'category' => 'coaching'],
                            ['name' => 'performance-coach', 'category' => 'coaching'],
                            ['name' => 'empowerment-coach', 'category' => 'coaching'],
                            ['name' => 'burnout-coach', 'category' => 'coaching'],
                            ['name' => 'youth-coach', 'category' => 'coaching'],
                            ['name' => 'couples-coach', 'category' => 'coaching'],
                            ['name' => 'grief-coach', 'category' => 'coaching'],
                            ['name' => 'creativity-coach', 'category' => 'coaching'],
                            ['name' => 'communication-coach', 'category' => 'coaching'],
                            ['name' => 'money-mindset-coach', 'category' => 'coaching'],
                            ['name' => 'life-coach', 'category' => 'coaching']
                        ],
                        'cta_text' => 'View All Templates',
                        'cta_link' => '#'
                    ],
                    [
                        'key' => 'about',
                        'title' => 'About CoachLinks',
                        'description' => 'We are passionate about transforming how professionals connect.',
                        'story_title' => 'Empowering Professional Connections Since 2020',
                        'story_content' => 'Founded by a team of coaching enthusiasts and technology experts, CoachLinks was born from the desire to help coaches build powerful digital presences.',
                        'image' => '',
                        'background_color' => '#f9fafb',
                        'layout' => 'image-right',
                        'stats' => [
                            ['value' => '4+ Years', 'label' => 'Experience', 'color' => 'blue'],
                            ['value' => '10K+', 'label' => 'Happy Users', 'color' => 'green'],
                            ['value' => '50+', 'label' => 'Countries', 'color' => 'purple']
                        ]
                    ],
                    [
                        'key' => 'team',
                        'title' => 'Meet Our Team',
                        'subtitle' => 'We\'re a diverse team of innovators and problem-solvers.',
                        'cta_title' => 'Want to Join Our Team?',
                        'cta_description' => 'We\'re always looking for talented individuals.',
                        'cta_button_text' => 'View Open Positions',
                        'members' => [
                            ['name' => 'Sarah Johnson', 'role' => 'CEO & Founder', 'bio' => 'Former tech executive with 15+ years experience.', 'image' => '', 'linkedin' => '#', 'email' => 'sarah@coachlinks.net']
                        ]
                    ],
                    [
                        'key' => 'testimonials',
                        'title' => 'What Our Clients Say',
                        'subtitle' => 'Don\'t just take our word for it.',
                        'trust_title' => 'Trusted by Professionals Worldwide',
                        'trust_stats' => [
                            ['value' => '4.9/5', 'label' => 'Average Rating', 'color' => 'blue'],
                            ['value' => '10K+', 'label' => 'Happy Users', 'color' => 'green']
                        ],
                        'testimonials' => [
                            ['name' => 'Sarah Mitchell', 'role' => 'Life Coach', 'company' => 'Clarity Coaching', 'content' => 'CoachLinks completely transformed my online presence. I went from zero to 15 discovery calls per month within 6 weeks. The lead capture tools are absolutely incredible — they work while I sleep.', 'rating' => 5],
                            ['name' => 'Marcus Chen', 'role' => 'Executive Coach', 'company' => 'Peak Performance', 'content' => 'The coach-specific templates saved me hours. My profile looks like I paid a designer thousands for it. Clients constantly compliment my professional setup. The AI copywriter is a game-changer.', 'rating' => 5],
                            ['name' => 'Elena Rodriguez', 'role' => 'Health & Wellness Coach', 'company' => '', 'content' => 'I\'ve tried every website builder out there. CoachLinks is the only one that truly understands what coaches need. The booking integration alone is worth 10x the price. I doubled my client base.', 'rating' => 5],
                            ['name' => 'David Park', 'role' => 'Business Coach', 'company' => 'Scale Academy', 'content' => 'The white-label feature lets me run my own branded platform for my coaching agency. My team of 12 coaches all use CoachLinks. The analytics help us optimize everything.', 'rating' => 5],
                            ['name' => 'Amara Johnson', 'role' => 'Career Coach', 'company' => 'PathForward', 'content' => 'From NFC cards at networking events to QR codes on my business cards — CoachLinks makes sharing my profile effortless. I get compliments and new leads at every event I attend.', 'rating' => 5],
                            ['name' => 'James Wright', 'role' => 'Fitness Coach', 'company' => '', 'content' => 'The payment links feature means I can sell coaching packages directly from my profile. No more back-and-forth invoicing. My revenue jumped 60% in the first quarter after switching.', 'rating' => 5],
                            ['name' => 'Priya Sharma', 'role' => 'Mindfulness Coach', 'company' => 'Inner Calm', 'content' => 'My clients love how easy it is to book sessions and access resources through my CoachLinks profile. The mobile experience is flawless. Conversions went up 40% after I switched.', 'rating' => 5],
                            ['name' => 'Tom Haverford', 'role' => 'Sales Coach', 'company' => 'CloseMore', 'content' => 'I share my CoachLinks profile after every keynote and workshop. The QR code feature alone has generated 200+ warm leads this year. It\'s my secret weapon for filling my pipeline.', 'rating' => 5],
                            ['name' => 'Lisa Nguyen', 'role' => 'Relationship Coach', 'company' => '', 'content' => 'The analytics dashboard shows me exactly where my leads come from. I optimized my profile based on the data and tripled my inquiry rate in just two months. Incredible platform.', 'rating' => 5],
                            ['name' => 'Rachel Foster', 'role' => 'Productivity Coach', 'company' => 'FocusFlow', 'content' => 'I was spending $300/mo on three different tools for what CoachLinks does in one. The discovery call booking alone replaced Calendly, and the lead magnets replaced my landing page builder entirely.', 'rating' => 5],
                            ['name' => 'Daniel Okafor', 'role' => 'Leadership Coach', 'company' => 'Elevate Leaders', 'content' => 'Our corporate clients are always impressed when they visit my CoachLinks profile. The NFC cards pair perfectly with it. I hand someone my card and they instantly see everything I offer.', 'rating' => 5],
                            ['name' => 'Sophie Duval', 'role' => 'Transformation Coach', 'company' => '', 'content' => 'Setting up took 4 minutes. I picked a template, dropped in my programs and testimonials, and was live. The next morning I had 3 discovery call bookings waiting in my inbox.', 'rating' => 5]
                        ]
                    ],
                    [
                        'key' => 'active_campaigns',
                        'title' => 'Featured Business Promotions',
                        'subtitle' => 'Explore businesses we\'re currently promoting and discover amazing services',
                        'background_color' => '#f8fafc',
                        'show_view_all' => true,
                        'max_display' => 6
                    ],
                    [
                        'key' => 'plans',
                        'title' => 'Choose Your Plan',
                        'subtitle' => 'Start with our free plan and upgrade as you grow.',
                        'faq_text' => 'Have questions about our plans? Contact our sales team'
                    ],
                    [
                        'key' => 'faq',
                        'title' => 'Frequently Asked Questions',
                        'subtitle' => 'Got questions? We\'ve got answers.',
                        'cta_text' => 'Still have questions?',
                        'button_text' => 'Contact Support',
                        'faqs' => [
                            ['question' => 'How does CoachLinks work?', 'answer' => 'CoachLinks allows you to create professional coach profiles that can be shared via QR codes.']
                        ]
                    ],
                    [
                        'key' => 'newsletter',
                        'title' => 'Stay Updated with CoachLinks',
                        'subtitle' => 'Get the latest updates and networking tips.',
                        'privacy_text' => 'No spam, unsubscribe at any time.',
                        'benefits' => [
                            ['icon' => '📧', 'title' => 'Weekly Updates', 'description' => 'Latest features and improvements']
                        ]
                    ],
                    [
                        'key' => 'contact',
                        'title' => 'Get in Touch',
                        'subtitle' => 'Have questions about CoachLinks? We\'d love to hear from you.',
                        'form_title' => 'Send us a Message',
                        'info_title' => 'Contact Information',
                        'info_description' => 'We\'re here to help and answer any question you might have.',
                        'layout' => 'split',
                        'background_color' => '#f9fafb'
                    ],
                    [
                        'key' => 'footer',
                        'description' => 'Transforming professional networking with innovative digital business cards.',
                        'newsletter_title' => 'Stay Updated',
                        'newsletter_subtitle' => 'Join our newsletter for updates',
                        'links' => [
                            'product' => [['name' => 'Features', 'href' => '#features'], ['name' => 'Pricing', 'href' => '#pricing']],
                            'company' => [['name' => 'About Us', 'href' => '#about'], ['name' => 'Contact', 'href' => '#contact']]
                        ],
                        'social_links' => [
                            ['name' => 'Facebook', 'icon' => 'Facebook', 'href' => '#'],
                            ['name' => 'Twitter', 'icon' => 'Twitter', 'href' => '#']
                        ],
                        'section_titles' => [
                            'product' => 'Product',
                            'company' => 'Company'
                        ]
                    ]
                ],
                'theme' => [
                    'primary_color' => '#10b981',
                    'secondary_color' => '#ffffff',
                    'accent_color' => '#f7f7f7',
                    'logo_light' => '',
                    'logo_dark' => '',
                    'favicon' => ''
                ],
                'seo' => [
                    'meta_title' => 'CoachLinks - Digital Coaching Platform',
                    'meta_description' => 'Create professional digital business cards in minutes.',
                    'meta_keywords' => 'digital business cards, networking, QR codes, NFC'
                ],
                'custom_css' => '',
                'custom_js' => '',
                'section_order' => ['header', 'hero', 'features', 'screenshots', 'why_choose_us', 'templates', 'about', 'team', 'testimonials', 'active_campaigns', 'plans', 'faq', 'newsletter', 'contact', 'footer'],
                'section_visibility' => [
                    'header' => true,
                    'hero' => true,
                    'features' => true,
                    'screenshots' => true,
                    'why_choose_us' => true,
                    'templates' => true,
                    'about' => true,
                    'team' => true,
                    'testimonials' => true,
                    'active_campaigns' => true,
                    'plans' => true,
                    'faq' => true,
                    'newsletter' => true,
                    'contact' => true,
                    'footer' => true
                ]
            ];
            
            $settings = self::create([
                'config_sections' => $defaultConfig
            ]);
        }
        
        return $settings;
    }
}