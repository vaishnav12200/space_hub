'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface NewsArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface SpaceAgency {
  id: string;
  name: string;
  fullName: string;
  country: string;
  flag: string;
  color: string;
}

const spaceAgencies: SpaceAgency[] = [
  { id: 'all', name: 'All', fullName: 'All Space Agencies', country: 'Global', flag: '🌍', color: '#1dd1f2' },
  { id: 'NASA', name: 'NASA', fullName: 'National Aeronautics and Space Administration', country: 'USA', flag: '🇺🇸', color: '#FC3D21' },
  { id: 'SpaceX', name: 'SpaceX', fullName: 'Space Exploration Technologies Corp', country: 'USA', flag: '🚀', color: '#005288' },
  { id: 'ESA', name: 'ESA', fullName: 'European Space Agency', country: 'Europe', flag: '🇪🇺', color: '#003399' },
  { id: 'ISRO', name: 'ISRO', fullName: 'Indian Space Research Organisation', country: 'India', flag: '🇮🇳', color: '#FF9933' },
  { id: 'Roscosmos', name: 'Roscosmos', fullName: 'Russian Federal Space Agency', country: 'Russia', flag: '🇷🇺', color: '#D52B1E' },
  { id: 'CNSA', name: 'CNSA', fullName: 'China National Space Administration', country: 'China', flag: '🇨🇳', color: '#DE2910' },
  { id: 'JAXA', name: 'JAXA', fullName: 'Japan Aerospace Exploration Agency', country: 'Japan', flag: '🇯🇵', color: '#BC002D' },
  { id: 'Blue Origin', name: 'Blue Origin', fullName: 'Blue Origin LLC', country: 'USA', flag: '🔵', color: '#005A9C' },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch from Spaceflight News API v4
      const response = await fetch(
        'https://api.spaceflightnewsapi.net/v4/articles?limit=50&ordering=-published_at'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setNews(data.results);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Unable to fetch latest news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredNews = news.filter(article => {
    const matchesAgency = selectedAgency === 'all' || 
      article.news_site.toLowerCase().includes(selectedAgency.toLowerCase());
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAgency && matchesSearch;
  });

  const featuredNews = filteredNews.slice(0, 2);
  const regularNews = filteredNews.slice(2);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getAgencyInfo = (newsSite: string): SpaceAgency | undefined => {
    return spaceAgencies.find(agency => 
      newsSite.toLowerCase().includes(agency.id.toLowerCase())
    );
  };

  if (loading && news.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#1dd1f2]/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#1dd1f2] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-[#8a2be2] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl text-gray-300">Fetching latest space news...</p>
          <p className="text-sm text-gray-500 mt-2">From NASA, SpaceX, ISRO, ESA & more</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 glow-text">
            🛰️ Real-Time Space News
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Live updates from space agencies worldwide — NASA, SpaceX, ISRO, ESA, Roscosmos, CNSA, JAXA & more
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">
              Live • {lastUpdated ? `Updated ${formatDate(lastUpdated.toISOString())}` : 'Updating...'}
            </span>
            <button 
              onClick={fetchNews}
              disabled={loading}
              className="ml-4 text-[#1dd1f2] hover:text-white text-sm underline disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
            <button onClick={fetchNews} className="mt-2 text-white underline">Try Again</button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="relative w-full md:w-2/3 lg:w-1/2">
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-4 bg-[#16213e] border border-[#1dd1f2]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1dd1f2] focus:border-transparent text-lg"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Agency Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {spaceAgencies.map(agency => (
              <button
                key={agency.id}
                onClick={() => setSelectedAgency(agency.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedAgency === agency.id
                    ? 'text-[#040b1e] shadow-lg scale-105'
                    : 'bg-[#16213e] text-gray-300 hover:bg-[#1dd1f2]/20 hover:text-white'
                }`}
                style={{
                  backgroundColor: selectedAgency === agency.id ? agency.color : undefined
                }}
              >
                <span>{agency.flag}</span>
                <span>{agency.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing <span className="text-[#1dd1f2] font-bold">{filteredNews.length}</span> articles
            {selectedAgency !== 'all' && (
              <span> from <span className="text-[#8a2be2] font-bold">{selectedAgency}</span></span>
            )}
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[#1dd1f2] flex items-center gap-3">
              <span>⭐</span> Featured Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map(article => {
                const agencyInfo = getAgencyInfo(article.news_site);
                return (
                  <a 
                    key={article.id} 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card glowColor="blue" className="overflow-hidden h-full hover:scale-[1.02] transition-transform duration-300">
                      <div className="aspect-video bg-[#16213e] rounded-lg mb-4 overflow-hidden">
                        {article.image_url ? (
                          <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">🚀</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="px-3 py-1 text-white text-sm font-semibold rounded-full flex items-center gap-1"
                          style={{ backgroundColor: agencyInfo?.color || '#1dd1f2' }}
                        >
                          {agencyInfo?.flag} {article.news_site}
                        </span>
                        <span className="text-sm text-gray-400">
                          {formatDate(article.published_at)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 group-hover:text-[#1dd1f2] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <span className="text-[#1dd1f2] text-sm font-medium group-hover:underline">
                        Read Full Article →
                      </span>
                    </Card>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* Regular News Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-[#1dd1f2] flex items-center gap-3">
            <span>📰</span> Latest Updates
          </h2>
          
          {regularNews.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1dd1f2]">No articles found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or selecting a different agency.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map(article => {
                const agencyInfo = getAgencyInfo(article.news_site);
                return (
                  <a 
                    key={article.id} 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card glowColor="purple" className="h-full hover:scale-[1.02] transition-transform duration-300">
                      <div className="aspect-video bg-[#16213e] rounded-lg mb-4 overflow-hidden">
                        {article.image_url ? (
                          <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">🛰️</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="px-2 py-1 text-white text-xs font-semibold rounded flex items-center gap-1"
                          style={{ backgroundColor: agencyInfo?.color || '#8a2be2' }}
                        >
                          {agencyInfo?.flag} {article.news_site}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.published_at)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2 group-hover:text-[#1dd1f2] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {article.summary}
                      </p>
                    </Card>
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {/* Space Agencies Info */}
        <section className="mt-16">
          <Card glowColor="white" className="overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">
                🌍 Global Space Agencies
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Real-time news aggregated from the world's leading space organizations
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {spaceAgencies.filter(a => a.id !== 'all').map(agency => (
                <button
                  key={agency.id}
                  onClick={() => setSelectedAgency(agency.id)}
                  className="text-center p-4 rounded-xl bg-[#040b1e]/50 hover:bg-[#16213e] transition-all duration-300 hover:scale-105 group"
                >
                  <div className="text-4xl mb-2">{agency.flag}</div>
                  <h4 
                    className="text-lg font-semibold mb-1 group-hover:scale-105 transition-transform"
                    style={{ color: agency.color }}
                  >
                    {agency.name}
                  </h4>
                  <p className="text-xs text-gray-500">{agency.country}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Data provided by <a href="https://spaceflightnewsapi.net" target="_blank" rel="noopener noreferrer" className="text-[#1dd1f2] hover:underline">Spaceflight News API</a>
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
