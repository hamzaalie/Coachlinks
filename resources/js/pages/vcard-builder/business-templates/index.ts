import { freelancerTemplate } from './freelancer';
import { doctorTemplate } from './doctor';
import { restaurantTemplate } from './restaurant';
import { realEstateTemplate } from './realestate';
import { fitnessTemplate } from './fitness';
import { photographyTemplate } from './photography';
import { lawfirmTemplate } from './lawfirm';
import { cafeTemplate } from './cafe';
import { salonTemplate } from './salon';
import { constructionTemplate } from './construction';
import { eventplannerTemplate } from './eventplanner';
import { ecommerceTemplate } from './ecommerce';
import { travelTemplate } from './travel';
import { gymTemplate } from './gym';
import { bakeryTemplate } from './bakery';
import { fitnessStudioTemplate } from './fitness-studio';
import { techStartupTemplate } from './tech-startup';
import { musicArtistTemplate } from './music-artist';
import { weddingPlannerTemplate } from './wedding-planner';
import { petCareTemplate } from './pet-care';
import { digitalMarketingTemplate } from './digital-marketing';
import { automotiveTemplate } from './automotive';
import { beautyCosmeticsTemplate } from './beauty-cosmetics';
import { foodDeliveryTemplate } from './food-delivery';
import { homeServicesTemplate } from './home-services';
import { personalTrainerTemplate } from './personal-trainer';
import { consultingTemplate } from './consulting';
import { graphicDesignTemplate } from './graphic-design';
import { yogaWellnessTemplate } from './yoga-wellness';
import { podcastCreatorTemplate } from './podcast-creator';
import { gamingStreamerTemplate } from './gaming-streamer';
import { lifeCoachTemplate } from './life-coach';
import { veterinarianTemplate } from './veterinarian';
import { architectDesignerTemplate } from './architect-designer';

// Coach-specific templates
import { businessCoachTemplate } from './business-coach';
import { healthWellnessCoachTemplate } from './health-wellness-coach';
import { relationshipCoachTemplate } from './relationship-coach';
import { careerCoachTemplate } from './career-coach';
import { mindsetCoachTemplate } from './mindset-coach';
import { financialCoachTemplate } from './financial-coach';
import { spiritualCoachTemplate } from './spiritual-coach';
import { fitnessCoachTemplate } from './fitness-coaching';
import { parentingCoachTemplate } from './parenting-coach';
import { salesCoachTemplate } from './sales-coach';
import { nutritionCoachTemplate } from './nutrition-coach';
import { leadershipCoachTemplate } from './leadership-coach';
import { speakingCoachTemplate } from './speaking-coach';
import { confidenceCoachTemplate } from './confidence-coach';
import { accountabilityCoachTemplate } from './accountability-coach';
import { transitionCoachTemplate } from './transition-coach';
import { adhdCoachTemplate } from './adhd-coach';
import { executiveCoachTemplate } from './executive-coach';
import { datingCoachTemplate } from './dating-coach';
import { productivityCoachTemplate } from './productivity-coach';
import { performanceCoachTemplate } from './performance-coach';
import { empowermentCoachTemplate } from './empowerment-coach';
import { burnoutCoachTemplate } from './burnout-coach';
import { youthCoachTemplate } from './youth-coach';
import { couplesCoachTemplate } from './couples-coach';
import { griefCoachTemplate } from './grief-coach';
import { creativityCoachTemplate } from './creativity-coach';
import { communicationCoachTemplate } from './communication-coach';
import { moneyMindsetCoachTemplate } from './money-mindset-coach';

export const businessTemplates = {
  'freelancer': freelancerTemplate,
  'doctor': doctorTemplate,
  'restaurant': restaurantTemplate,
  'realestate': realEstateTemplate,
  'fitness': fitnessTemplate,
  'photography': photographyTemplate,
  'lawfirm': lawfirmTemplate,
  'cafe': cafeTemplate,
  'salon': salonTemplate,
  'construction': constructionTemplate,
  'eventplanner': eventplannerTemplate,
  'ecommerce': ecommerceTemplate,
  'travel': travelTemplate,
  'gym': gymTemplate,
  'bakery': bakeryTemplate,
  'fitness-studio': fitnessStudioTemplate,
  'tech-startup': techStartupTemplate,
  'music-artist': musicArtistTemplate,
  'wedding-planner': weddingPlannerTemplate,
  'pet-care': petCareTemplate,
  'digital-marketing': digitalMarketingTemplate,
  'automotive': automotiveTemplate,
  'beauty-cosmetics': beautyCosmeticsTemplate,
  'food-delivery': foodDeliveryTemplate,
  'home-services': homeServicesTemplate,
  'personal-trainer': personalTrainerTemplate,
  'consulting': consultingTemplate,
  'graphic-design': graphicDesignTemplate,
  'yoga-wellness': yogaWellnessTemplate,
  'podcast-creator': podcastCreatorTemplate,
  'gaming-streamer': gamingStreamerTemplate,
  'life-coach': lifeCoachTemplate,
  'veterinarian': veterinarianTemplate,
  'architect-designer': architectDesignerTemplate,

  // Coach-specific templates
  'business-coach': businessCoachTemplate,
  'health-wellness-coach': healthWellnessCoachTemplate,
  'relationship-coach': relationshipCoachTemplate,
  'career-coach': careerCoachTemplate,
  'mindset-coach': mindsetCoachTemplate,
  'financial-coach': financialCoachTemplate,
  'spiritual-coach': spiritualCoachTemplate,
  'fitness-coach': fitnessCoachTemplate,
  'fitness-coaching': fitnessCoachTemplate,
  'parenting-coach': parentingCoachTemplate,
  'sales-coach': salesCoachTemplate,
  'nutrition-coach': nutritionCoachTemplate,
  'leadership-coach': leadershipCoachTemplate,
  'speaking-coach': speakingCoachTemplate,
  'confidence-coach': confidenceCoachTemplate,
  'accountability-coach': accountabilityCoachTemplate,
  'transition-coach': transitionCoachTemplate,
  'adhd-coach': adhdCoachTemplate,

  // New coach templates
  'executive-coach': executiveCoachTemplate,
  'dating-coach': datingCoachTemplate,
  'productivity-coach': productivityCoachTemplate,
  'performance-coach': performanceCoachTemplate,
  'empowerment-coach': empowermentCoachTemplate,
  'burnout-coach': burnoutCoachTemplate,
  'youth-coach': youthCoachTemplate,
  'couples-coach': couplesCoachTemplate,
  'grief-coach': griefCoachTemplate,
  'creativity-coach': creativityCoachTemplate,
  'communication-coach': communicationCoachTemplate,
  'money-mindset-coach': moneyMindsetCoachTemplate
};

export const businessTypeOptions = [
  { value: 'freelancer', label: 'Freelancer', themeNumber: 1, icon: '💼' },
  { value: 'doctor', label: 'Doctor/Medical', themeNumber: 2, icon: '👨⚕️' },
  { value: 'restaurant', label: 'Restaurant', themeNumber: 3, icon: '🍽️' },
  { value: 'realestate', label: 'Real Estate Agent', themeNumber: 4, icon: '🏠' },
  { value: 'fitness', label: 'Fitness Trainer', themeNumber: 5, icon: '💪' },
  { value: 'photography', label: 'Photography', themeNumber: 6, icon: '📸' },
  { value: 'lawfirm', label: 'Law Firm', themeNumber: 7, icon: '⚖️' },
  { value: 'cafe', label: 'Cafe & Coffee Shop', themeNumber: 8, icon: '☕' },
  { value: 'salon', label: 'Salon & Spa', themeNumber: 9, icon: '💇♀️' },
  { value: 'construction', label: 'Construction & Contractor', themeNumber: 10, icon: '🏗️' },
  { value: 'eventplanner', label: 'Event Planner', themeNumber: 11, icon: '🎉' },
  { value: 'ecommerce', label: 'E-commerce Store', themeNumber: 12, icon: '🛍️' },
  { value: 'travel', label: 'Travel Agency', themeNumber: 13, icon: '✈️' },
  { value: 'gym', label: 'Fitness Studio/Gym', themeNumber: 14, icon: '🏋️♀️' },
  { value: 'bakery', label: 'Bakery & Pastry Shop', themeNumber: 15, icon: '🍰' },
  { value: 'fitness-studio', label: 'Modern Fitness Studio', themeNumber: 16, icon: '🤸♀️' },
  { value: 'tech-startup', label: 'Tech Startup/SaaS', themeNumber: 17, icon: '💻' },
  { value: 'music-artist', label: 'Music Artist/Band', themeNumber: 18, icon: '🎵' },
  { value: 'wedding-planner', label: 'Wedding Planner', themeNumber: 19, icon: '💒' },
  { value: 'pet-care', label: 'Pet Care Services', themeNumber: 20, icon: '🐶' },
  { value: 'digital-marketing', label: 'Digital Marketing Agency', themeNumber: 21, icon: '📈' },
  { value: 'automotive', label: 'Automotive Services', themeNumber: 22, icon: '🚗' },
  { value: 'beauty-cosmetics', label: 'Beauty & Cosmetics', themeNumber: 23, icon: '💄' },
  { value: 'food-delivery', label: 'Food Delivery & Catering', themeNumber: 24, icon: '🍕' },
  { value: 'home-services', label: 'Home Services & Maintenance', themeNumber: 25, icon: '🔧' },
  { value: 'personal-trainer', label: 'Personal Trainer & Fitness Coach', themeNumber: 26, icon: '🏋️' },
  { value: 'consulting', label: 'Consulting & Professional Services', themeNumber: 27, icon: '📉' },
  { value: 'graphic-design', label: 'Graphic Design Studio', themeNumber: 28, icon: '🎨' },
  { value: 'yoga-wellness', label: 'Yoga & Wellness Studio', themeNumber: 29, icon: '🧘♀️' },
  { value: 'podcast-creator', label: 'Podcast Host & Content Creator', themeNumber: 30, icon: '🎧' },
  { value: 'gaming-streamer', label: 'Gaming Streamer & Esports', themeNumber: 31, icon: '🎮' },
  { value: 'life-coach', label: 'Life Coach & Motivational Speaker', themeNumber: 32, icon: '🌟' },
  { value: 'veterinarian', label: 'Veterinarian & Animal Care', themeNumber: 33, icon: '🐈' },
  { value: 'architect-designer', label: 'Architect & Interior Designer', themeNumber: 34, icon: '🏢' },

  // Coach-specific templates
  { value: 'business-coach', label: 'Business Growth Coach', themeNumber: 35, icon: '📊' },
  { value: 'health-wellness-coach', label: 'Health & Wellness Coach', themeNumber: 36, icon: '🌿' },
  { value: 'relationship-coach', label: 'Relationship & Dating Coach', themeNumber: 37, icon: '💕' },
  { value: 'career-coach', label: 'Career & Executive Coach', themeNumber: 38, icon: '🚀' },
  { value: 'mindset-coach', label: 'Mindset & Mindfulness Coach', themeNumber: 39, icon: '🧠' },
  { value: 'financial-coach', label: 'Financial & Money Coach', themeNumber: 40, icon: '💰' },
  { value: 'spiritual-coach', label: 'Spiritual & Awakening Coach', themeNumber: 41, icon: '✨' },
  { value: 'fitness-coach', label: 'Fitness & Body Coach', themeNumber: 42, icon: '🏆' },
  { value: 'parenting-coach', label: 'Parenting & Family Coach', themeNumber: 43, icon: '👨‍👩‍👧' },
  { value: 'sales-coach', label: 'Sales & Revenue Coach', themeNumber: 44, icon: '🎯' },
  { value: 'nutrition-coach', label: 'Nutrition & Diet Coach', themeNumber: 45, icon: '🥗' },
  { value: 'leadership-coach', label: 'Leadership & Executive Coach', themeNumber: 46, icon: '👔' },
  { value: 'speaking-coach', label: 'Public Speaking Coach', themeNumber: 47, icon: '🎤' },
  { value: 'confidence-coach', label: 'Confidence & Self-Esteem Coach', themeNumber: 48, icon: '💪' },
  { value: 'accountability-coach', label: 'Accountability & Productivity Coach', themeNumber: 49, icon: '✅' },
  { value: 'transition-coach', label: 'Life Transition & Reinvention Coach', themeNumber: 50, icon: '🦋' },
  { value: 'adhd-coach', label: 'ADHD & Neurodivergent Coach', themeNumber: 51, icon: '⚡' },

  // New coach templates
  { value: 'executive-coach', label: 'Executive & C-Suite Coach', themeNumber: 52, icon: '👔' },
  { value: 'dating-coach', label: 'Dating & Attraction Coach', themeNumber: 53, icon: '💘' },
  { value: 'productivity-coach', label: 'Productivity & Performance Coach', themeNumber: 54, icon: '⏱️' },
  { value: 'performance-coach', label: 'Peak Performance Coach', themeNumber: 55, icon: '🏅' },
  { value: 'empowerment-coach', label: 'Women\'s Empowerment Coach', themeNumber: 56, icon: '👑' },
  { value: 'burnout-coach', label: 'Burnout Recovery & Resilience Coach', themeNumber: 57, icon: '🌱' },
  { value: 'youth-coach', label: 'Youth & Teen Coach', themeNumber: 58, icon: '🎓' },
  { value: 'couples-coach', label: 'Couples & Marriage Coach', themeNumber: 59, icon: '💑' },
  { value: 'grief-coach', label: 'Grief & Loss Recovery Coach', themeNumber: 60, icon: '🕊️' },
  { value: 'creativity-coach', label: 'Creativity & Innovation Coach', themeNumber: 61, icon: '🎨' },
  { value: 'communication-coach', label: 'Communication & Influence Coach', themeNumber: 62, icon: '🗣️' },
  { value: 'money-mindset-coach', label: 'Money Mindset & Abundance Coach', themeNumber: 63, icon: '💎' },
];

export const getBusinessTemplate = (type: string) => {
  return businessTemplates[type as keyof typeof businessTemplates] || null;
};

export const getDefaultSections = (type: string) => {
  const template = getBusinessTemplate(type);
  return template?.defaultData || {};
};