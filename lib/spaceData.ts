// Space data utilities and API integration functions

export interface SpaceNewsArticle {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  featured: boolean;
}

export interface SpaceMission {
  id: number;
  name: string;
  agency: string;
  launchDate: string;
  status: 'Upcoming' | 'Active' | 'Completed' | 'Delayed';
  vehicle: string;
  destination: string;
  description: string;
  objectives: string[];
  crew?: string[];
  duration?: string;
  budget?: string;
}

// Spaceflight News API integration
export async function fetchSpaceflightNews(): Promise<SpaceNewsArticle[]> {
  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles?limit=20');
    const data = await response.json();
    
    return data.results.map((article: any, index: number) => ({
      id: article.id,
      title: article.title,
      url: article.url,
      imageUrl: article.image_url || '/api/placeholder/400/250',
      newsSite: article.news_site,
      summary: article.summary,
      publishedAt: article.published_at,
      featured: index < 3 // Mark first 3 as featured
    }));
  } catch (error) {
    console.error('Error fetching space news:', error);
    return getFallbackNewsData();
  }
}

// SpaceX API integration for launches
export async function fetchSpaceXLaunches(): Promise<SpaceMission[]> {
  try {
    const response = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
    const data = await response.json();
    
    return data.slice(0, 10).map((launch: any) => ({
      id: launch.id,
      name: launch.name,
      agency: 'SpaceX',
      launchDate: launch.date_utc,
      status: 'Upcoming' as const,
      vehicle: launch.rocket?.name || 'Falcon 9',
      destination: launch.payloads?.[0]?.orbit || 'Low Earth Orbit',
      description: launch.details || 'SpaceX mission details to be announced.',
      objectives: [
        'Deploy payload to orbit',
        'Demonstrate reusability',
        'Test new technologies'
      ],
      duration: 'Mission dependent'
    }));
  } catch (error) {
    console.error('Error fetching SpaceX launches:', error);
    return [];
  }
}

// Fallback data when APIs are unavailable
export function getFallbackNewsData(): SpaceNewsArticle[] {
  return [
    {
      id: 1,
      title: "James Webb Space Telescope Discovers Most Distant Galaxy Yet",
      url: "https://nasa.gov",
      imageUrl: "/api/placeholder/400/250",
      newsSite: "NASA",
      summary: "The James Webb Space Telescope has identified a galaxy that existed just 325 million years after the Big Bang, pushing back the frontier of cosmic exploration.",
      publishedAt: new Date().toISOString(),
      featured: true
    },
    {
      id: 2,
      title: "SpaceX Successfully Launches Crew-8 Mission to ISS",
      url: "https://spacex.com",
      imageUrl: "/api/placeholder/400/250",
      newsSite: "SpaceX",
      summary: "Four astronauts from NASA, ESA, and Roscosmos launched aboard Dragon capsule for six-month mission to International Space Station.",
      publishedAt: new Date().toISOString(),
      featured: true
    },
    {
      id: 3,
      title: "ISRO's Chandrayaan-4 Mission Gets Government Approval",
      url: "https://isro.gov.in",
      imageUrl: "/api/placeholder/400/250",
      newsSite: "ISRO",
      summary: "India's space agency receives clearance for ambitious lunar sample return mission, targeting launch in 2027.",
      publishedAt: new Date().toISOString(),
      featured: false
    }
  ];
}

export function getFallbackMissionsData(): SpaceMission[] {
  return [
    {
      id: 1,
      name: "Artemis III",
      agency: "NASA",
      launchDate: "2026-12-01",
      status: "Upcoming",
      vehicle: "Space Launch System (SLS)",
      destination: "Moon (South Pole)",
      description: "First crewed lunar landing since Apollo 17, targeting the lunar south pole for water ice exploration.",
      objectives: [
        "Land first woman and next man on Moon",
        "Explore lunar south pole region",
        "Conduct scientific experiments",
        "Test technologies for Mars missions"
      ],
      crew: ["TBD - 2 Astronauts"],
      duration: "10 days on lunar surface",
      budget: "$93 billion (program total)"
    },
    {
      id: 2,
      name: "Europa Clipper",
      agency: "NASA",
      launchDate: "2024-10-14",
      status: "Active",
      vehicle: "Falcon Heavy",
      destination: "Jupiter's moon Europa",
      description: "Mission to study Europa's ice-covered ocean and assess its potential for harboring life.",
      objectives: [
        "Map Europa's ice shell thickness",
        "Analyze subsurface ocean composition",
        "Search for signs of current geological activity",
        "Assess habitability potential"
      ],
      duration: "4-year mission around Jupiter",
      budget: "$5.2 billion"
    }
  ];
}

// Utility functions for data formatting
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getStatusColor(status: string): string {
  const colors = {
    'Upcoming': '#FFD700',
    'Active': '#00FF00',
    'Completed': '#8a2be2',
    'Delayed': '#FF6347'
  };
  return colors[status as keyof typeof colors] || '#1dd1f2';
}

export function getAgencyColor(agency: string): string {
  const colors = {
    'NASA': '#FF0000',
    'SpaceX': '#005288',
    'ISRO': '#FF9933',
    'ESA': '#003399',
    'CNSA': '#DE2910'
  };
  return colors[agency as keyof typeof colors] || '#1dd1f2';
}

// Cache management for API responses
export class DataCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly TTL = 15 * 60 * 1000; // 15 minutes

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clear(): void {
    this.cache.clear();
  }
}