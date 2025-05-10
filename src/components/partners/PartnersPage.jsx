
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import '../../styles/partners.css';

// Import components
import PartnerHero from './PartnerHero';
import PartnershipValue from './PartnershipValue';
import FeaturedPartners from './FeaturedPartners';
import PartnerDirectory from './PartnerDirectory';
import PartnershipProcess from './PartnershipProcess';
import PartnerSuccessStories from './PartnerSuccessStories';
import PartnerCTA from './PartnerCTA';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [featuredPartners, setFeaturedPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners from Supabase
  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        // Get all partners
        let query = supabase
          .from('partners')
          .select('*')
          .eq('is_active', true);
          
        const { data: partnersData, error: partnersError } = await query;

        if (partnersError) throw partnersError;

        // Get featured partners
        const { data: featuredData, error: featuredError } = await supabase
          .from('partners')
          .select('*')
          .eq('is_active', true)
          .eq('is_featured', true)
          .limit(4);

        if (featuredError) throw featuredError;

        setPartners(partnersData || []);
        setFeaturedPartners(featuredData || []);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to load partners directory. Please try again later.');
        // For demo purposes, let's add some sample data if fetching fails
        setPartners(samplePartners);
        setFeaturedPartners(samplePartners.filter(p => p.is_featured));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Get unique categories for filter
  const categories = ['all', ...new Set(partners.map(partner => partner.category))];
  
  // Get unique industries for filter
  const industries = ['all', ...new Set(partners.filter(partner => partner.industry).map(partner => partner.industry))];

  return (
    <section className="partners-page">
      <PartnerHero />
      <PartnershipValue />
      <FeaturedPartners featuredPartners={featuredPartners} isLoading={isLoading} />
      <PartnerDirectory 
        partners={partners}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        categories={categories}
        industries={industries}
      />
      <PartnershipProcess />
      <PartnerSuccessStories />
      <PartnerCTA />
    </section>
  );
};

// Sample partners data for demo or in case of API error
const samplePartners = [
  {
    id: 1,
    name: "TechSys Solutions",
    category: "integrator",
    industry: "IT Services",
    specialty: "Government Systems",
    description: "Leading systems integrator specializing in government and enterprise solutions.",
    logo_url: "https://placehold.co/200x100/00843D/FFFFFF?text=TechSys",
    website: "https://example.com",
    partnership_level: "Premier",
    is_featured: true,
    is_active: true
  },
  {
    id: 2,
    name: "DataPoint Analytics",
    category: "technology",
    industry: "Data & Analytics",
    specialty: "AI/ML Solutions",
    description: "Advanced analytics and data engineering partner for decision intelligence.",
    logo_url: "https://placehold.co/200x100/0A3161/FFFFFF?text=DataPoint",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: true,
    is_active: true
  },
  {
    id: 3,
    name: "SoftWave Consulting",
    category: "consultant",
    industry: "Software Development",
    specialty: "Enterprise Architecture",
    description: "Software engineering and architecture specialists with deep enterprise experience.",
    logo_url: "https://placehold.co/200x100/FFCD00/000000?text=SoftWave",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 4,
    name: "SecurePath Cyber",
    category: "technology",
    industry: "Cybersecurity",
    specialty: "Compliance & Risk Management",
    description: "Comprehensive cybersecurity services and compliance for regulated industries.",
    logo_url: "https://placehold.co/200x100/E9483F/FFFFFF?text=SecurePath",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: true,
    is_active: true
  },
  {
    id: 5,
    name: "CloudMatrix Systems",
    category: "integrator",
    industry: "Cloud Infrastructure",
    specialty: "Multi-cloud Management",
    description: "Cloud migration and infrastructure modernization experts for AWS and Azure.",
    logo_url: "https://placehold.co/200x100/8BA58F/FFFFFF?text=CloudMatrix",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 6,
    name: "HealthTech Solutions",
    category: "technology",
    industry: "Healthcare",
    specialty: "EMR Systems",
    description: "Specialized healthcare technology solutions for hospitals and clinics.",
    logo_url: "https://placehold.co/200x100/00843D/FFFFFF?text=HealthTech",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 7,
    name: "GovConnect",
    category: "reseller",
    industry: "Government",
    specialty: "Tender Response",
    description: "Premier government procurement and tender response specialists.",
    logo_url: "https://placehold.co/200x100/0A3161/FFFFFF?text=GovConnect",
    website: "https://example.com",
    partnership_level: "Premier",
    is_featured: true,
    is_active: true
  },
  {
    id: 8,
    name: "FinSmart Technologies",
    category: "technology",
    industry: "Financial Services",
    specialty: "Payments & Compliance",
    description: "Fintech solutions provider specializing in payment systems and compliance.",
    logo_url: "https://placehold.co/200x100/FFCD00/000000?text=FinSmart",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: false,
    is_active: true
  }
];

export default PartnersPage;
