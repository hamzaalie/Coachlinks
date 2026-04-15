import React from 'react';
import { getSectionOrder } from '@/utils/sectionHelpers';
import { businessTypeOptions } from '../business-templates';

// Import all template components
import FreelancerTemplate from './templates/FreelancerTemplate';
import DoctorTemplate from './templates/DoctorTemplate';
import RestaurantTemplate from './templates/RestaurantTemplate';
import RealEstateTemplate from './templates/RealEstateTemplate';
import FitnessTemplate from './templates/FitnessTemplate';
import PhotographyTemplate from './templates/PhotographyTemplate';
import LawFirmTemplate from './templates/LawFirmTemplate';
import CafeTemplate from './templates/CafeTemplate';
import SalonTemplate from './templates/SalonTemplate';
import ConstructionTemplate from './templates/ConstructionTemplate';
import EventPlannerTemplate from './templates/EventPlannerTemplate';
import EcommerceTemplate from './templates/EcommerceTemplate';
import TravelTemplate from './templates/TravelTemplate';
import GymTemplate from './templates/GymTemplate';
import BakeryTemplate from './templates/BakeryTemplate';
import FitnessStudioTemplate from './templates/FitnessStudioTemplate';
import TechStartupTemplate from './templates/TechStartupTemplate';
import MusicArtistTemplate from './templates/MusicArtistTemplate';
import WeddingPlannerTemplate from './templates/WeddingPlannerTemplate';
import PetCareTemplate from './templates/PetCareTemplate';
import DigitalMarketingTemplate from './templates/DigitalMarketingTemplate';
import AutomotiveTemplate from './templates/AutomotiveTemplate';
import BeautyCosmeticsTemplate from './templates/BeautyCosmeticsTemplate';
import FoodDeliveryTemplate from './templates/FoodDeliveryTemplate';
import HomeServicesTemplate from './templates/HomeServicesTemplate';
import PersonalTrainerTemplate from './templates/PersonalTrainerTemplate';
import ConsultingTemplate from './templates/ConsultingTemplate';
import GraphicDesignTemplate from './templates/GraphicDesignTemplate';
import YogaWellnessTemplate from './templates/YogaWellnessTemplate';
import PodcastCreatorTemplate from './templates/PodcastCreatorTemplate';
import GamingStreamerTemplate from './templates/GamingStreamerTemplate';
import LifeCoachTemplate from './templates/LifeCoachTemplate';
import VeterinarianTemplate from './templates/VeterinarianTemplate';
import ArchitectDesignerTemplate from './templates/ArchitectDesignerTemplate';

// Coach-specific templates (each has unique design)
import BusinessCoachTemplate from './templates/BusinessCoachTemplate';
import HealthWellnessCoachTemplate from './templates/HealthWellnessCoachTemplate';
import RelationshipCoachTemplate from './templates/RelationshipCoachTemplate';
import CareerCoachTemplate from './templates/CareerCoachTemplate';
import MindsetCoachTemplate from './templates/MindsetCoachTemplate';
import FinancialCoachTemplate from './templates/FinancialCoachTemplate';
import SpiritualCoachTemplate from './templates/SpiritualCoachTemplate';
import FitnessCoachTemplate from './templates/FitnessCoachTemplate';
import ParentingCoachTemplate from './templates/ParentingCoachTemplate';
import SalesCoachTemplate from './templates/SalesCoachTemplate';
import NutritionCoachTemplate from './templates/NutritionCoachTemplate';
import LeadershipCoachTemplate from './templates/LeadershipCoachTemplate';
import SpeakingCoachTemplate from './templates/SpeakingCoachTemplate';
import ConfidenceCoachTemplate from './templates/ConfidenceCoachTemplate';
import AccountabilityCoachTemplate from './templates/AccountabilityCoachTemplate';
import TransitionCoachTemplate from './templates/TransitionCoachTemplate';
import AdhdCoachTemplate from './templates/AdhdCoachTemplate';
import ExecutiveCoachTemplate from './templates/ExecutiveCoachTemplate';
import DatingCoachTemplate from './templates/DatingCoachTemplate';
import ProductivityCoachTemplate from './templates/ProductivityCoachTemplate';
import PerformanceCoachTemplate from './templates/PerformanceCoachTemplate';
import EmpowermentCoachTemplate from './templates/EmpowermentCoachTemplate';
import BurnoutCoachTemplate from './templates/BurnoutCoachTemplate';
import YouthCoachTemplate from './templates/YouthCoachTemplate';
import CouplesCoachTemplate from './templates/CouplesCoachTemplate';
import GriefCoachTemplate from './templates/GriefCoachTemplate';
import CreativityCoachTemplate from './templates/CreativityCoachTemplate';
import CommunicationCoachTemplate from './templates/CommunicationCoachTemplate';
import MoneyMindsetCoachTemplate from './templates/MoneyMindsetCoachTemplate';

interface VCardPreviewProps {
  businessType: string;
  data: any;
  template: any;
}

// Map of business types to their template components
const templateComponents: Record<string, React.ComponentType<any>> = {
  'freelancer': FreelancerTemplate,
  'doctor': DoctorTemplate,
  'restaurant': RestaurantTemplate,
  'realestate': RealEstateTemplate,
  'fitness': FitnessTemplate,
  'photography': PhotographyTemplate,
  'lawfirm': LawFirmTemplate,
  'cafe': CafeTemplate,
  'salon': SalonTemplate,
  'construction': ConstructionTemplate,
  'eventplanner': EventPlannerTemplate,
  'ecommerce': EcommerceTemplate,
  'travel': TravelTemplate,
  'gym': GymTemplate,
  'bakery': BakeryTemplate,
  'fitness-studio': FitnessStudioTemplate,
  'tech-startup': TechStartupTemplate,
  'music-artist': MusicArtistTemplate,
  'wedding-planner': WeddingPlannerTemplate,
  'pet-care': PetCareTemplate,
  'digital-marketing': DigitalMarketingTemplate,
  'automotive': AutomotiveTemplate,
  'beauty-cosmetics': BeautyCosmeticsTemplate,
  'food-delivery': FoodDeliveryTemplate,
  'home-services': HomeServicesTemplate,
  'personal-trainer': PersonalTrainerTemplate,
  'consulting': ConsultingTemplate,
  'graphic-design': GraphicDesignTemplate,
  'yoga-wellness': YogaWellnessTemplate,
  'podcast-creator': PodcastCreatorTemplate,
  'gaming-streamer': GamingStreamerTemplate,
  'life-coach': LifeCoachTemplate,
  'veterinarian': VeterinarianTemplate,
  'architect-designer': ArchitectDesignerTemplate,
  // Coach-specific types (each has unique design)
  'business-coach': BusinessCoachTemplate,
  'health-wellness-coach': HealthWellnessCoachTemplate,
  'relationship-coach': RelationshipCoachTemplate,
  'career-coach': CareerCoachTemplate,
  'mindset-coach': MindsetCoachTemplate,
  'financial-coach': FinancialCoachTemplate,
  'spiritual-coach': SpiritualCoachTemplate,
  'fitness-coach': FitnessCoachTemplate,
  'fitness-coaching': FitnessCoachTemplate,
  'parenting-coach': ParentingCoachTemplate,
  'sales-coach': SalesCoachTemplate,
  'nutrition-coach': NutritionCoachTemplate,
  'leadership-coach': LeadershipCoachTemplate,
  'speaking-coach': SpeakingCoachTemplate,
  'confidence-coach': ConfidenceCoachTemplate,
  'accountability-coach': AccountabilityCoachTemplate,
  'transition-coach': TransitionCoachTemplate,
  'adhd-coach': AdhdCoachTemplate,
  'executive-coach': ExecutiveCoachTemplate,
  'dating-coach': DatingCoachTemplate,
  'productivity-coach': ProductivityCoachTemplate,
  'performance-coach': PerformanceCoachTemplate,
  'empowerment-coach': EmpowermentCoachTemplate,
  'burnout-coach': BurnoutCoachTemplate,
  'youth-coach': YouthCoachTemplate,
  'couples-coach': CouplesCoachTemplate,
  'grief-coach': GriefCoachTemplate,
  'creativity-coach': CreativityCoachTemplate,
  'communication-coach': CommunicationCoachTemplate,
  'money-mindset-coach': MoneyMindsetCoachTemplate
};

export default function VCardPreview({ businessType, data, template }: VCardPreviewProps) {
  // Convert relative path to full URL for display
  const getDisplayUrl = (path: string): string => {
    if (!path || typeof path !== 'string') return path;

    const normalizedPath = path.trim();
    const baseUrl = (window as any).appSettings?.baseUrl || window.location.origin;

    // Support legacy values stored as "media/..." without "/storage/" prefix.
    if (normalizedPath.startsWith('media/')) {
      return `${baseUrl}/storage/${normalizedPath}`;
    }

    if (normalizedPath.startsWith('storage/')) {
      return `${baseUrl}/${normalizedPath}`;
    }

    if (path.startsWith('http')) return path;
    if (normalizedPath.startsWith('/storage/')) {
      return `${baseUrl}${normalizedPath}`;
    }
    return normalizedPath.startsWith('/') ? `${baseUrl}${normalizedPath}` : normalizedPath;
  };

  // Process all URLs in config_sections recursively
  const processUrls = (obj: any): any => {
    if (!obj) return obj;
    if (typeof obj === 'string') {
      // Convert relative storage paths to full URLs
      return getDisplayUrl(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(processUrls);
    }
    if (typeof obj === 'object') {
      const processed: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Process image-related fields
        if ((key.includes('image') || key.includes('logo') || key.includes('icon') || key === 'profile_image' || key === 'og_image') && typeof value === 'string') {
          processed[key] = getDisplayUrl(value);
        } else {
          processed[key] = processUrls(value);
        }
      }
      return processed;
    }
    return obj;
  };

  // Process URLs in config_sections
  const processedConfigSections = processUrls(data.config_sections);
  
  // Ensure template_config has sectionSettings
  const enhancedData = {
    ...data,
    config_sections: processedConfigSections,
    template_config: {
      ...data.template_config,
      sections: processedConfigSections,
      sectionSettings: data.template_config?.sectionSettings || {}
    }
  };

  // Check if the business type exists in our options
  const isValidType = businessTypeOptions.some(option => option.value === businessType);
  const type = isValidType ? businessType : 'freelancer'; // Default to freelancer if invalid
  
  // Get the template component
  const TemplateComponent = templateComponents[type] || FreelancerTemplate;

  return (
    <div className="w-full">
      <TemplateComponent data={enhancedData} template={template} businessType={type} />
    </div>
  );
  
}

// Common utility function for handling appointment bookings
export const handleAppointmentBooking = (appointmentsData: any) => {
  if (appointmentsData?.booking_url) {
    // If there's a booking URL (like Calendly), open it in a new tab
    typeof window !== "undefined" && window.open(appointmentsData.booking_url, '_blank', 'noopener,noreferrer');
  } else {
    // Otherwise, open the appointment modal
    typeof window !== "undefined" && window.dispatchEvent(new CustomEvent('openAppointmentModal'));
  }
};