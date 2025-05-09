
/**
 * Fetches recent activity from a LinkedIn profile
 * @param {string} username - LinkedIn username to fetch activity from
 * @returns {Promise<Array>} - Array of blog posts/activity items
 */
export const fetchLinkedInActivity = async (username = 'theinnovater') => {
  try {
    // In a production environment, this would be a server-side call
    // Since we don't have direct LinkedIn API access in the browser due to CORS,
    // we'll simulate this with an API call to our backend
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
    console.error('Error fetching LinkedIn activity:', error);
    
    // Return placeholder data for demonstration
    return [
      {
        id: 'linkedin-1',
        date: new Date().toISOString(),
        content: 'Australia's tech procurement landscape is evolving rapidly. Government contracts now represent over $10B in annual technology spend, with increasing opportunities for international vendors.',
        title: 'Australian GovTech Spending Hits Record High',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1700&q=80',
        url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/',
        author: 'Tech Industry Analyst'
      },
      {
        id: 'linkedin-2',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'The AUKUS partnership presents unprecedented opportunities for tech companies specializing in AI, quantum computing, and cybersecurity. Here's how to position your solution.',
        title: 'AUKUS Tech Opportunities: Beyond Defence',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1700&q=80',
        url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/',
        author: 'Defence Technology Expert'
      },
      {
        id: 'linkedin-3',
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Latest changes to Australia's R&D incentives are creating new pathways for tech companies to subsidize their entry and expansion costs in the Australian market.',
        title: 'Maximize R&D Benefits in Australia: 2025 Update',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1700&q=80',
        url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/',
        author: 'Innovation Grant Specialist'
      }
    ];
  }
};
