'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface NewsArticle {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  featured: boolean;
}

// Mock data for demonstration - in production, this would come from APIs
const mockNewsData: NewsArticle[] = [
  {
    id: 1,
    title: "James Webb Space Telescope Discovers Most Distant Galaxy Yet",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "NASA",
    summary: "The James Webb Space Telescope has identified a galaxy that existed just 325 million years after the Big Bang, pushing back the frontier of cosmic exploration.",
    publishedAt: "2024-11-15T10:30:00Z",
    featured: true
  },
  {
    id: 2,
    title: "SpaceX Successfully Launches Crew-8 Mission to ISS",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "SpaceX",
    summary: "Four astronauts from NASA, ESA, and Roscosmos launched aboard Dragon capsule for six-month mission to International Space Station.",
    publishedAt: "2024-11-14T15:45:00Z",
    featured: true
  },
  {
    id: 3,
    title: "ISRO's Chandrayaan-4 Mission Gets Government Approval",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "ISRO",
    summary: "India's space agency receives clearance for ambitious lunar sample return mission, targeting launch in 2027.",
    publishedAt: "2024-11-13T08:20:00Z",
    featured: false
  },
  {
    id: 4,
    title: "ESA's Juice Spacecraft Completes Earth-Moon Flyby",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "ESA",
    summary: "Jupiter mission successfully uses gravity assist maneuver to adjust trajectory for arrival at Jupiter system in 2031.",
    publishedAt: "2024-11-12T12:15:00Z",
    featured: false
  },
  {
    id: 5,
    title: "Breakthrough in Exoplanet Atmosphere Analysis",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "NASA",
    summary: "Researchers detect water vapor and clouds in the atmosphere of K2-18b, a potentially habitable exoplanet 120 light-years away.",
    publishedAt: "2024-11-11T16:00:00Z",
    featured: false
  },
  {
    id: 6,
    title: "China's Chang'e 6 Returns with Far Side Moon Samples",
    url: "#",
    imageUrl: "/api/placeholder/400/250",
    newsSite: "CNSA",
    summary: "Historic mission brings back first samples from the far side of the Moon, providing new insights into lunar formation.",
    publishedAt: "2024-11-10T09:30:00Z",
    featured: false
  }
];

const newsCategories = [
  { id: 'all', name: 'All News', count: mockNewsData.length },
  { id: 'nasa', name: 'NASA', count: mockNewsData.filter(n => n.newsSite === 'NASA').length },
  { id: 'spacex', name: 'SpaceX', count: mockNewsData.filter(n => n.newsSite === 'SpaceX').length },
  { id: 'isro', name: 'ISRO', count: mockNewsData.filter(n => n.newsSite === 'ISRO').length },
  { id: 'esa', name: 'ESA', count: mockNewsData.filter(n => n.newsSite === 'ESA').length },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true);
      // In production, this would be actual API calls to:
      // - Spaceflight News API
      // - NASA RSS feeds
      // - SpaceX API
      // - ISRO updates
      
      setTimeout(() => {
        setNews(mockNewsData);
        setLoading(false);
      }, 1000);
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.newsSite.toLowerCase() === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1dd1f2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading latest space news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 glow-text">
            Space News & Updates
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest discoveries, missions, and breakthroughs 
            from NASA, SpaceX, ISRO, ESA, and other space agencies around the world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search space news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-[#16213e] border border-[#1dd1f2]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1dd1f2] focus:border-transparent"
              />
            </div>

            {/* Last Updated */}
            <div className="text-sm text-gray-400">
              Last updated: {formatDate(new Date().toISOString())}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {newsCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#1dd1f2] text-[#040b1e] shadow-lg'
                    : 'bg-[#16213e] text-gray-300 hover:bg-[#1dd1f2]/20 hover:text-[#1dd1f2]'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[#1dd1f2]">
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map(article => (
                <Card key={article.id} glowColor="blue" className="overflow-hidden">
                  <div className="aspect-video bg-[#16213e] rounded-lg mb-4 flex items-center justify-center text-6xl">
                    📸
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#1dd1f2] text-[#040b1e] text-sm font-semibold rounded-full">
                      {article.newsSite}
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                  <Button variant="ghost" size="sm">
                    Read Full Article →
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular News */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-[#1dd1f2]">
            Latest Updates
          </h2>
          
          {regularNews.length === 0 ? (
            <Card className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1dd1f2]">No articles found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or selecting a different category.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map(article => (
                <Card key={article.id} glowColor="purple">
                  <div className="aspect-video bg-[#16213e] rounded-lg mb-4 flex items-center justify-center text-4xl">
                    📰
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-[#8a2be2] text-white text-xs font-semibold rounded">
                      {article.newsSite}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <Button variant="ghost" size="sm" className="w-full">
                    Read More
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* News Sources */}
        <section className="mt-16">
          <Card glowColor="white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our News Sources
              </h2>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
                We aggregate the latest space news from the world's leading space agencies 
                and organizations to keep you informed about cosmic discoveries and missions.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">NASA</h4>
                  <p className="text-sm text-gray-400">National Aeronautics and Space Administration</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🛸</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">SpaceX</h4>
                  <p className="text-sm text-gray-400">Private space exploration company</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🇮🇳</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">ISRO</h4>
                  <p className="text-sm text-gray-400">Indian Space Research Organisation</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🇪🇺</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">ESA</h4>
                  <p className="text-sm text-gray-400">European Space Agency</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button variant="secondary" size="lg">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}