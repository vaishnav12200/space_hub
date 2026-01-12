'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';

interface Launch {
  id: string;
  name: string;
  status: {
    id: number;
    name: string;
    abbrev: string;
    description: string;
  };
  net: string; // NET = No Earlier Than launch time
  window_start: string;
  window_end: string;
  rocket: {
    configuration: {
      name: string;
      full_name: string;
      family: string;
    };
  };
  launch_service_provider: {
    name: string;
    abbrev: string;
    type: string;
    country_code: string;
  };
  pad: {
    name: string;
    location: {
      name: string;
      country_code: string;
    };
  };
  mission: {
    name: string;
    description: string;
    type: string;
    orbit: {
      name: string;
      abbrev: string;
    } | null;
  } | null;
  image: string | null;
  webcast_live: boolean;
}

interface SpaceAgency {
  name: string;
  abbrev: string;
  flag: string;
  color: string;
}

const agencyInfo: Record<string, SpaceAgency> = {
  'NASA': { name: 'NASA', abbrev: 'NASA', flag: '🇺🇸', color: '#FC3D21' },
  'SpaceX': { name: 'SpaceX', abbrev: 'SpaceX', flag: '🚀', color: '#005288' },
  'ISRO': { name: 'ISRO', abbrev: 'ISRO', flag: '🇮🇳', color: '#FF9933' },
  'ESA': { name: 'ESA', abbrev: 'ESA', flag: '🇪🇺', color: '#003399' },
  'Roscosmos': { name: 'Roscosmos', abbrev: 'RFSA', flag: '🇷🇺', color: '#D52B1E' },
  'CNSA': { name: 'CNSA', abbrev: 'CNSA', flag: '🇨🇳', color: '#DE2910' },
  'JAXA': { name: 'JAXA', abbrev: 'JAXA', flag: '🇯🇵', color: '#BC002D' },
  'Blue Origin': { name: 'Blue Origin', abbrev: 'BO', flag: '🔵', color: '#005A9C' },
  'Rocket Lab': { name: 'Rocket Lab', abbrev: 'RLAB', flag: '🚀', color: '#00A3E0' },
  'ULA': { name: 'United Launch Alliance', abbrev: 'ULA', flag: '🇺🇸', color: '#0033A0' },
  'Arianespace': { name: 'Arianespace', abbrev: 'ASA', flag: '🇪🇺', color: '#0055A4' },
  'CASC': { name: 'China Aerospace', abbrev: 'CASC', flag: '🇨🇳', color: '#DE2910' },
};

const getAgencyInfo = (providerName: string): SpaceAgency => {
  for (const [key, value] of Object.entries(agencyInfo)) {
    if (providerName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return { name: providerName, abbrev: providerName.slice(0, 4), flag: '🛰️', color: '#1dd1f2' };
};

const getStatusColor = (statusId: number): string => {
  switch (statusId) {
    case 1: return '#22c55e'; // Go for Launch
    case 2: return '#eab308'; // TBD
    case 3: return '#22c55e'; // Success
    case 4: return '#ef4444'; // Failure
    case 5: return '#f97316'; // Hold
    case 6: return '#3b82f6'; // In Flight
    case 7: return '#8b5cf6'; // Partial Failure
    case 8: return '#6b7280'; // TBC
    default: return '#1dd1f2';
  }
};

const getCountryFlag = (countryCode: string): string => {
  const flags: Record<string, string> = {
    'USA': '🇺🇸',
    'RUS': '🇷🇺',
    'CHN': '🇨🇳',
    'IND': '🇮🇳',
    'JPN': '🇯🇵',
    'FRA': '🇫🇷',
    'DEU': '🇩🇪',
    'GBR': '🇬🇧',
    'NZL': '🇳🇿',
    'KOR': '🇰🇷',
    'ISR': '🇮🇱',
    'IRN': '🇮🇷',
  };
  return flags[countryCode] || '🌍';
};

export default function MissionsPage() {
  const [upcomingLaunches, setUpcomingLaunches] = useState<Launch[]>([]);
  const [previousLaunches, setPreviousLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<string>('all');

  const fetchLaunches = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch upcoming launches from Launch Library 2 API
      const [upcomingRes, previousRes] = await Promise.all([
        fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&mode=detailed'),
        fetch('https://ll.thespacedevs.com/2.2.0/launch/previous/?limit=20&mode=detailed')
      ]);

      if (!upcomingRes.ok || !previousRes.ok) {
        throw new Error('Failed to fetch launch data');
      }

      const upcomingData = await upcomingRes.json();
      const previousData = await previousRes.json();

      setUpcomingLaunches(upcomingData.results);
      setPreviousLaunches(previousData.results);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Unable to fetch mission data. The API may be rate-limited. Please try again in a minute.');
      console.error('Error fetching launches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
    // Refresh every 10 minutes
    const interval = setInterval(fetchLaunches, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (dateString: string): string => {
    const launchDate = new Date(dateString);
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    if (diff < 0) return 'Launched';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `T-${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `T-${hours}h ${minutes}m`;
    } else {
      return `T-${minutes}m`;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const currentLaunches = activeTab === 'upcoming' ? upcomingLaunches : previousLaunches;
  
  const filteredLaunches = selectedAgency === 'all' 
    ? currentLaunches 
    : currentLaunches.filter(launch => 
        launch.launch_service_provider.name.toLowerCase().includes(selectedAgency.toLowerCase())
      );

  const uniqueAgencies = [...new Set(currentLaunches.map(l => l.launch_service_provider.name))];

  if (loading && upcomingLaunches.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#8a2be2]/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#8a2be2] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-[#1dd1f2] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl text-gray-300">Loading real-time mission data...</p>
          <p className="text-sm text-gray-500 mt-2">From Launch Library 2 API</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 glow-text">
            🚀 Real-Time Space Missions
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Live launch schedule from space agencies worldwide — NASA, SpaceX, ISRO, ESA, Roscosmos, CNSA & more
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">
              Live Data • {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Updating...'}
            </span>
            <button 
              onClick={fetchLaunches}
              disabled={loading}
              className="ml-4 text-[#8a2be2] hover:text-white text-sm underline disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
            <button onClick={fetchLaunches} className="mt-2 text-white underline">Try Again</button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-[#1dd1f2] to-[#8a2be2] text-white shadow-lg scale-105'
                : 'bg-[#16213e] text-gray-400 hover:bg-[#1dd1f2]/20'
            }`}
          >
            🚀 Upcoming ({upcomingLaunches.length})
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
              activeTab === 'previous'
                ? 'bg-gradient-to-r from-[#8a2be2] to-[#1dd1f2] text-white shadow-lg scale-105'
                : 'bg-[#16213e] text-gray-400 hover:bg-[#8a2be2]/20'
            }`}
          >
            ✅ Recent ({previousLaunches.length})
          </button>
        </div>

        {/* Agency Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedAgency('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedAgency === 'all'
                ? 'bg-[#1dd1f2] text-[#040b1e]'
                : 'bg-[#16213e] text-gray-400 hover:bg-[#1dd1f2]/20'
            }`}
          >
            🌍 All Agencies
          </button>
          {uniqueAgencies.slice(0, 8).map(agency => {
            const info = getAgencyInfo(agency);
            return (
              <button
                key={agency}
                onClick={() => setSelectedAgency(agency)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  selectedAgency === agency
                    ? 'text-white shadow-lg'
                    : 'bg-[#16213e] text-gray-400 hover:bg-opacity-50'
                }`}
                style={{
                  backgroundColor: selectedAgency === agency ? info.color : undefined
                }}
              >
                {info.flag} {info.abbrev}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing <span className="text-[#8a2be2] font-bold">{filteredLaunches.length}</span> {activeTab} missions
          </p>
        </div>

        {/* Next Launch Highlight */}
        {activeTab === 'upcoming' && filteredLaunches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#1dd1f2] text-center">⏱️ Next Launch</h2>
            {(() => {
              const nextLaunch = filteredLaunches[0];
              const agency = getAgencyInfo(nextLaunch.launch_service_provider.name);
              return (
                <Card glowColor="blue" className="max-w-4xl mx-auto overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-[#16213e] rounded-lg overflow-hidden">
                      {nextLaunch.image ? (
                        <img 
                          src={nextLaunch.image} 
                          alt={nextLaunch.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-8xl">🚀</div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="px-3 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1"
                          style={{ backgroundColor: agency.color }}
                        >
                          {agency.flag} {nextLaunch.launch_service_provider.name}
                        </span>
                        {nextLaunch.webcast_live && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                            🔴 LIVE
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{nextLaunch.name}</h3>
                      
                      {/* Countdown */}
                      <div className="bg-[#040b1e] rounded-xl p-4 mb-4">
                        <p className="text-gray-400 text-sm mb-1">Launch in</p>
                        <p className="text-3xl font-mono font-bold text-[#1dd1f2]">
                          {formatCountdown(nextLaunch.net)}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{formatDate(nextLaunch.net)}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p className="text-gray-400">
                          <span className="text-gray-500">Rocket:</span>{' '}
                          <span className="text-white">{nextLaunch.rocket.configuration.full_name}</span>
                        </p>
                        <p className="text-gray-400">
                          <span className="text-gray-500">Launch Site:</span>{' '}
                          <span className="text-white">{nextLaunch.pad.location.name} {getCountryFlag(nextLaunch.pad.location.country_code)}</span>
                        </p>
                        {nextLaunch.mission?.orbit && (
                          <p className="text-gray-400">
                            <span className="text-gray-500">Orbit:</span>{' '}
                            <span className="text-white">{nextLaunch.mission.orbit.name}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {nextLaunch.mission?.description && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-gray-300 text-sm">{nextLaunch.mission.description}</p>
                    </div>
                  )}
                </Card>
              );
            })()}
          </section>
        )}

        {/* Launches Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#8a2be2]">
            {activeTab === 'upcoming' ? '📅 Launch Schedule' : '📋 Recent Launches'}
          </h2>
          
          {filteredLaunches.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1dd1f2]">No missions found</h3>
              <p className="text-gray-400">Try selecting a different agency filter.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaunches.slice(activeTab === 'upcoming' ? 1 : 0).map((launch) => {
                const agency = getAgencyInfo(launch.launch_service_provider.name);
                return (
                  <Card 
                    key={launch.id} 
                    glowColor="purple" 
                    className="h-full hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="aspect-video bg-[#16213e] rounded-lg mb-4 overflow-hidden">
                      {launch.image ? (
                        <img 
                          src={launch.image} 
                          alt={launch.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=600';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🛰️</div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span 
                        className="px-2 py-1 rounded text-white text-xs font-bold flex items-center gap-1"
                        style={{ backgroundColor: agency.color }}
                      >
                        {agency.flag} {launch.launch_service_provider.abbrev}
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{ 
                          backgroundColor: getStatusColor(launch.status.id) + '30',
                          color: getStatusColor(launch.status.id)
                        }}
                      >
                        {launch.status.abbrev}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {launch.name}
                    </h3>

                    {activeTab === 'upcoming' && (
                      <div className="bg-[#040b1e] rounded-lg p-3 mb-3">
                        <p className="text-[#1dd1f2] font-mono font-bold">
                          {formatCountdown(launch.net)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(launch.net).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}

                    {activeTab === 'previous' && (
                      <p className="text-gray-500 text-sm mb-3">
                        {new Date(launch.net).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}

                    <div className="space-y-1 text-xs">
                      <p className="text-gray-400">
                        <span className="text-gray-600">🚀</span> {launch.rocket.configuration.name}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-gray-600">📍</span> {launch.pad.name}
                      </p>
                      {launch.mission?.type && (
                        <p className="text-gray-400">
                          <span className="text-gray-600">🎯</span> {launch.mission.type}
                        </p>
                      )}
                    </div>

                    {launch.mission?.description && (
                      <p className="text-gray-500 text-xs mt-3 line-clamp-2">
                        {launch.mission.description}
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* API Info */}
        <section className="mt-16">
          <Card glowColor="white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                🌐 Real-Time Launch Data
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-4">
                Mission data is fetched in real-time from the Launch Library 2 API, 
                which aggregates launch information from all major space agencies worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-3 py-1 bg-[#16213e] rounded-full text-gray-300">✅ Auto-updates every 10 min</span>
                <span className="px-3 py-1 bg-[#16213e] rounded-full text-gray-300">🌍 50+ Launch Providers</span>
                <span className="px-3 py-1 bg-[#16213e] rounded-full text-gray-300">🚀 Worldwide Coverage</span>
              </div>
              <p className="text-gray-600 text-xs mt-4">
                Data provided by <a href="https://thespacedevs.com" target="_blank" rel="noopener noreferrer" className="text-[#8a2be2] hover:underline">The Space Devs - Launch Library 2</a>
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
