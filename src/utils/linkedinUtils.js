
import { supabase } from './supabaseClient';

/**
 * Fetches recent activity from a LinkedIn profile and falls back to Supabase resources
 * @param {string} username - LinkedIn username to fetch activity from
 * @returns {Promise<Array>} - Array of blog posts/activity items
 */
export const fetchLinkedInActivity = async (username = 'theinnovater') => {
  try {
    // First try to fetch from Supabase resources
    const { data: supabasePosts, error } = await supabase
      .from('resources')
      .select('*')
      .eq('type', 'blog')
      .eq('is_premium', false)
      .order('published_at', { ascending: false })
      .limit(10);
      
    if (supabasePosts && supabasePosts.length > 0) {
      console.log('Fetched blog posts from Supabase:', supabasePosts.length);
      // Transform Supabase posts to the expected format
      return supabasePosts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.description || post.content?.substring(0, 200) || '',
        excerpt: post.description || post.content?.substring(0, 200) || '',
        author: post.author || 'Enter Australia Team',
        date: post.published_at,
        imageUrl: post.image_url || 'https://images.unsplash.com/photo-1483058712412-e9573fc25ebb?auto=format&fit=crop&w=1700&q=80',
        tags: post.tags || ['australia', 'tech', 'government'],
        url: post.slug ? `/blog/${post.slug}` : `/blog#${post.id}`,
        webinarData: post.webinar_id ? {
          id: post.webinar_id,
          attended: !!post.attended,
          registered: !!post.registered
        } : null
      }));
    }
    
    // If we have no Supabase data or there was an error, try LinkedIn API
    const response = await fetch('/api/fetch-linkedin-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn activity');
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Return placeholder data for demonstration if both sources fail
    return [
      {
        id: 'linkedin-1',
        date: new Date().toISOString(),
        content: "Australia's tech procurement landscape is evolving rapidly. Government contracts now represent over $10B in annual technology spend, with increasing opportunities for international vendors.",
        title: 'Australian GovTech Spending Hits Record High',
        excerpt: "Australia's tech procurement landscape is evolving rapidly. Government contracts now represent over $10B in annual technology spend, with increasing opportunities for international vendors.",
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1700&q=80',
        url: '/blog#australian-govtech-spending',
        author: 'Tech Industry Analyst',
        tags: ['govtech', 'procurement', 'australia'],
        webinarData: {
          id: 'web001',
          attended: true,
          registered: true
        }
      },
      {
        id: 'linkedin-2',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        content: "The AUKUS partnership presents unprecedented opportunities for tech companies specializing in AI, quantum computing, and cybersecurity. Here's how to position your solution.",
        title: 'AUKUS Tech Opportunities: Beyond Defence',
        excerpt: "The AUKUS partnership presents unprecedented opportunities for tech companies specializing in AI, quantum computing, and cybersecurity. Here's how to position your solution.",
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1700&q=80',
        url: '/blog#aukus-tech-opportunities',
        author: 'Defence Technology Expert',
        tags: ['aukus', 'defence', 'technology'],
        webinarData: {
          id: 'web002',
          attended: false,
          registered: true
        }
      },
      {
        id: 'linkedin-3',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        content: "Latest changes to Australia's R&D incentives are creating new pathways for tech companies to subsidize their entry and expansion costs in the Australian market.",
        title: 'Maximize R&D Benefits in Australia: 2025 Update',
        excerpt: "Latest changes to Australia's R&D incentives are creating new pathways for tech companies to subsidize their entry and expansion costs in the Australian market.",
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1700&q=80',
        url: '/blog#rd-benefits-australia',
        author: 'Innovation Grant Specialist',
        tags: ['r&d', 'grants', 'innovation']
      }
    ];
  }
};

/**
 * Seeds the Supabase database with blog posts if they don't exist
 */
export const seedBlogPosts = async () => {
  try {
    // Check if we already have blog posts
    const { data: existingPosts, error: checkError } = await supabase
      .from('resources')
      .select('id')
      .eq('type', 'blog')
      .limit(1);
      
    if (checkError) {
      console.error('Error checking for existing blog posts:', checkError);
      return { success: false, error: checkError };
    }
    
    // If we already have blog posts, don't seed
    if (existingPosts && existingPosts.length > 0) {
      console.log('Blog posts already exist, skipping seed');
      return { success: true, message: 'Blog posts already exist' };
    }
    
    // Seed with 10+ Australian tech market focused blog posts
    const blogPosts = [
      {
        title: 'Australian GovTech Spending Hits Record High in 2025',
        description: 'The Australian government has allocated a record $10.5B for technology procurement in the latest budget, creating unprecedented opportunities for international vendors.',
        content: 'The Australian government has allocated a record $10.5B for technology procurement in the latest budget, creating unprecedented opportunities for international vendors. This represents a 25% increase over the previous year, with significant investments in cybersecurity, cloud infrastructure, and digital service delivery platforms. Foreign vendors should take note of the new streamlined procurement pathways for businesses with innovative solutions that address key government priorities.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1700&q=80',
        slug: 'australian-govtech-spending-2025',
        published_at: new Date().toISOString(),
        author: 'Mark Williams, Government Procurement Analyst',
        tags: ['govtech', 'procurement', 'budget']
      },
      {
        title: 'AUKUS Tech Opportunities: Beyond Defence Applications',
        description: 'The AUKUS partnership is creating spillover opportunities for tech companies beyond traditional defence applications, particularly in AI, quantum computing, and cybersecurity.',
        content: 'While the AUKUS partnership is primarily focused on defence collaboration between Australia, the UK, and the US, it has created significant spillover opportunities for tech companies in adjacent sectors. Particularly valuable are capabilities in AI and machine learning, quantum computing applications, and advanced cybersecurity solutions. US tech firms are finding that their AUKUS-adjacent innovations can open doors to Australian government contracts even without a direct defence focus. This article examines pathways for tech companies to leverage the AUKUS ecosystem without pivoting entirely to defence applications.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1700&q=80',
        slug: 'aukus-tech-opportunities-beyond-defence',
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Dr. Sarah Jenkins, Defence Technology Consultant',
        tags: ['aukus', 'defence', 'technology', 'cybersecurity']
      },
      {
        title: 'R&D Tax Incentives for Tech Companies Entering Australia',
        description: 'Australia offers generous R&D tax incentives that can offset up to 43.5% of eligible expenses for tech companies establishing operations in the country.',
        content: 'Tech companies entering the Australian market can take advantage of one of the world\'s most generous R&D tax incentive programs. For eligible entities with under $20M in annual turnover, the program offers a 43.5% refundable tax offset for qualifying R&D activities conducted in Australia. Larger companies can access a 38.5% non-refundable tax offset. The program is particularly valuable for software development, AI research, and other technology innovation activities. This guide outlines how foreign tech companies can structure their Australian operations to maximize these benefits and use them to subsidize market entry costs.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1700&q=80',
        slug: 'rd-tax-incentives-australia',
        published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Claire Thompson, R&D Tax Specialist',
        tags: ['r&d', 'tax', 'incentives']
      },
      {
        title: 'Critical Minerals and Tech: Australia\'s Strategic Advantage',
        description: 'Australia\'s abundant critical minerals resources are creating new opportunities for tech companies in the supply chain, processing, and sustainability software sectors.',
        content: 'Australia possesses some of the world\'s largest reserves of critical minerals essential for technology manufacturing, including lithium, rare earth elements, cobalt, and graphite. As global tech supply chains face increasing pressure to secure ethical and reliable sources for these materials, Australia has emerged as a strategic partner of choice. This has created downstream opportunities for tech companies specializing in supply chain transparency, mineral processing optimization, and ESG compliance software. This article explores how tech companies can position their solutions to tap into Australia\'s $2B Critical Minerals Strategy and associated funding programs.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1578378387021-3cb75a7b651e?auto=format&fit=crop&w=1700&q=80',
        slug: 'critical-minerals-tech-australia',
        published_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Michael Chen, Critical Minerals Analyst',
        tags: ['critical-minerals', 'supply-chain', 'sustainability']
      },
      {
        title: 'Navigating Australia\'s Data Sovereignty Requirements',
        description: 'Understanding Australia\'s data sovereignty laws is essential for tech companies handling government and regulated industry data.',
        content: 'Australia has introduced increasingly stringent data sovereignty requirements that impact tech companies seeking government contracts or working in regulated industries like healthcare and financial services. The requirements include data residency (storing certain data types on Australian soil), operational transparency, and compliance with the Protective Security Policy Framework (PSPF) for government data. This comprehensive guide explains the different tiers of data classification, certification pathways like IRAP assessment, and practical strategies for establishing compliant cloud and data infrastructure in Australia without rebuilding your entire tech stack.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1566669437687-7a8864b236cc?auto=format&fit=crop&w=1700&q=80',
        slug: 'australia-data-sovereignty-requirements',
        published_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Dr. Emma Watson, Data Governance Expert',
        tags: ['data-sovereignty', 'compliance', 'cloud']
      },
      {
        title: 'Australian Digital ID Framework: Opportunities for Identity Tech',
        description: 'Australia\'s expanding Digital ID framework is creating opportunities for identity verification, authentication, and privacy-enhancing technologies.',
        content: 'Australia\'s Digital Identity framework is expanding beyond federal government services to state governments and private sector applications. This creates significant opportunities for companies specializing in identity verification, biometric authentication, fraud detection, and privacy-enhancing technologies. With the passage of the Digital ID legislation, Australia is establishing an accreditation framework that will allow qualified identity service providers to participate in the national ecosystem. This article outlines the technical requirements, accreditation pathways, and market opportunities for identity tech companies seeking to enter the Australian market.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=1700&q=80',
        slug: 'australian-digital-id-framework',
        published_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Daniel Morgan, Digital Identity Specialist',
        tags: ['digital-identity', 'authentication', 'privacy']
      },
      {
        title: 'Healthcare Tech Opportunities in Australia\'s My Health Record 2.0',
        description: 'Australia\'s My Health Record 2.0 initiative is creating opportunities for interoperability, telehealth, and AI diagnostic technology providers.',
        content: 'The Australian Digital Health Agency has launched a comprehensive overhaul of the My Health Record system, allocating $500M to enhance functionality, improve interoperability, and integrate emerging technologies. This creates immediate opportunities for tech companies specializing in healthcare interoperability standards (FHIR), telehealth platforms, remote patient monitoring, clinical decision support systems, and AI-assisted diagnostics. The program has specific funding allocated for innovative solutions from international vendors, with streamlined procurement pathways for qualified health tech providers. This guide explains the qualification process, integration requirements, and key stakeholders tech companies should approach.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1631815588090-d1bcbe9a8545?auto=format&fit=crop&w=1700&q=80',
        slug: 'healthcare-tech-my-health-record',
        published_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Dr. Rebecca Lee, Health Informatics Expert',
        tags: ['healthcare', 'telehealth', 'interoperability']
      },
      {
        title: 'Australia\'s National AI Strategy: Funding and Partnership Opportunities',
        description: 'Australia\'s $200M National Artificial Intelligence Strategy is creating funding and partnership opportunities for overseas AI companies.',
        content: 'Australia\'s National AI Strategy includes $200M in direct funding for artificial intelligence initiatives across key sectors including healthcare, agriculture, resources, and government services. The strategy has a strong focus on international partnerships, with specific programs designed to attract overseas AI expertise. Key opportunities include the AI Solutions Grants Program ($50M), the AI in Government Services Innovation Fund ($35M), and the Critical Technology Partnerships initiative ($25M). This article provides a detailed breakdown of funding streams, application criteria, and strategic partnership approaches for international AI companies seeking to enter the Australian market with government backing.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1677442135000-3181f7447d13?auto=format&fit=crop&w=1700&q=80',
        slug: 'australia-national-ai-strategy',
        published_at: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Professor Alan Zhang, AI Policy Researcher',
        tags: ['ai', 'machine-learning', 'grants']
      },
      {
        title: 'Procurement Hacks: Fast-Tracking onto Australian Government Panels',
        description: 'Strategic approaches to accelerate your path onto lucrative Australian government procurement panels and marketplaces.',
        content: 'For tech companies seeking Australian government contracts, getting onto procurement panels is often the critical first step. This article reveals practical strategies for accelerating your panel onboarding, including: partnering with established panel members, leveraging limited tender thresholds, utilizing the new "Start with GovTech" pathway for innovative solutions, and qualifying for specialized panels with lower competition. We also cover recent updates to the Digital Transformation Agency\'s Marketplace, the Defense Industry Security Program (DISP) fast-track for AUKUS-aligned capabilities, and how to leverage state government innovation programs as stepping stones to federal opportunities.',
        type: 'blog',
        is_premium: true,
        image_url: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1700&q=80',
        slug: 'fast-tracking-australian-government-panels',
        published_at: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'James Wilson, Government Procurement Consultant',
        tags: ['procurement', 'government', 'panels']
      },
      {
        title: 'ESG Compliance for Tech Companies Operating in Australia',
        description: 'Understanding Australia\'s evolving ESG requirements and how technology companies can ensure compliance while pursuing government contracts.',
        content: 'Australia has introduced increasingly rigorous Environmental, Social, and Governance (ESG) requirements that impact technology companies seeking government contracts and operating in regulated industries. Recent legislation mandates climate-related financial disclosures for large businesses, sets Modern Slavery reporting requirements, and establishes procurement preferences for suppliers with strong sustainability practices. This guide provides a compliance roadmap for tech companies, covering mandatory reporting frameworks, voluntary certification schemes that enhance competitive positioning, and digital tools that can streamline ESG data collection and reporting. We also explain how foreign tech companies can leverage their existing global ESG frameworks to meet Australian requirements without duplicating effort.',
        type: 'blog',
        is_premium: false,
        image_url: 'https://images.unsplash.com/photo-1464638681273-0962e9b53566?auto=format&fit=crop&w=1700&q=80',
        slug: 'esg-compliance-tech-australia',
        published_at: new Date(Date.now() - 63 * 24 * 60 * 60 * 1000).toISOString(),
        author: 'Dr. Sophia Martinez, ESG Policy Expert',
        tags: ['esg', 'sustainability', 'compliance']
      }
    ];
    
    // Insert blog posts into Supabase
    const { error: insertError } = await supabase
      .from('resources')
      .insert(blogPosts);
      
    if (insertError) {
      console.error('Error seeding blog posts:', insertError);
      return { success: false, error: insertError };
    }
    
    console.log('Successfully seeded blog posts');
    return { success: true };
  } catch (error) {
    console.error('Error in seedBlogPosts:', error);
    return { success: false, error };
  }
};
