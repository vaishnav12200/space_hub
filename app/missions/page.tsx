'use client';

import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface Mission {
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

const missionsData: Mission[] = [
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
  },
  {
    id: 3,
    name: "Chandrayaan-4",
    agency: "ISRO",
    launchDate: "2027-06-15",
    status: "Upcoming",
    vehicle: "GSLV Mk III",
    destination: "Moon",
    description: "India's lunar sample return mission to bring back rocks and soil from the Moon's surface.",
    objectives: [
      "Collect lunar samples from south pole",
      "Return samples safely to Earth",
      "Demonstrate sample return technology",
      "Study lunar geology and composition"
    ],
    duration: "30-day mission",
    budget: "$615 million"
  },
  {
    id: 4,
    name: "Starship IFT-7",
    agency: "SpaceX",
    launchDate: "2024-12-10",
    status: "Upcoming",
    vehicle: "Starship Super Heavy",
    destination: "Earth orbit",
    description: "Seventh integrated flight test of Starship, focusing on orbital refueling demonstration.",
    objectives: [
      "Test orbital refueling systems",
      "Demonstrate heat shield performance",
      "Practice controlled re-entry",
      "Validate landing procedures"
    ],
    duration: "90-minute flight test",
    budget: "$3 billion (development cost)"
  },
  {
    id: 5,
    name: "JUICE",
    agency: "ESA",
    launchDate: "2023-04-14",
    status: "Active",
    vehicle: "Ariane 5",
    destination: "Jupiter system",
    description: "JUpiter ICy moons Explorer studying Jupiter and its largest moons Ganymede, Callisto, and Europa.",
    objectives: [
      "Study Jupiter's atmosphere and magnetosphere",
      "Investigate Ganymede's subsurface ocean",
      "Analyze Callisto and Europa",
      "Search for conditions suitable for life"
    ],
    duration: "8-year journey, 3.5-year mission",
    budget: "$1.6 billion"
  },
  {
    id: 6,
    name: "Crew-9",
    agency: "NASA/SpaceX",
    launchDate: "2024-09-28",
    status: "Active",
    vehicle: "Falcon 9 Dragon",
    destination: "International Space Station",
    description: "Ninth operational crewed flight to the ISS as part of NASA's Commercial Crew Program.",
    objectives: [
      "Transport crew to ISS",
      "Conduct scientific experiments",
      "Maintain ISS operations",
      "Technology demonstrations"
    ],
    crew: ["Nick Hague", "Aleksandr Gorbunov"],
    duration: "6-month stay",
    budget: "$2.9 billion (program total)"
  },
  {
    id: 7,
    name: "Tianwen-2",
    agency: "CNSA",
    launchDate: "2025-05-01",
    status: "Upcoming",
    vehicle: "Long March 5",
    destination: "Asteroid 2016 HO3",
    description: "China's asteroid sample return mission targeting near-Earth asteroid Kamo'oalewa.",
    objectives: [
      "Study near-Earth asteroid composition",
      "Collect and return asteroid samples",
      "Demonstrate deep space technologies",
      "Understand asteroid formation"
    ],
    duration: "2.5-year mission",
    budget: "$450 million"
  },
  {
    id: 8,
    name: "Mars Sample Return",
    agency: "NASA/ESA",
    launchDate: "2028-07-01",
    status: "Upcoming",
    vehicle: "Multiple vehicles",
    destination: "Mars",
    description: "Joint mission to retrieve samples collected by Perseverance rover and return them to Earth.",
    objectives: [
      "Retrieve Perseverance samples",
      "Launch samples from Mars surface",
      "Transport samples to Earth",
      "Enable detailed laboratory analysis"
    ],
    duration: "7-year round trip",
    budget: "$11 billion"
  }
];

const agencies = [
  { id: 'all', name: 'All Agencies', color: '#1dd1f2' },
  { id: 'NASA', name: 'NASA', color: '#FF0000' },
  { id: 'SpaceX', name: 'SpaceX', color: '#005288' },
  { id: 'ISRO', name: 'ISRO', color: '#FF9933' },
  { id: 'ESA', name: 'ESA', color: '#003399' },
  { id: 'CNSA', name: 'CNSA', color: '#DE2910' }
];

const statusColors = {
  'Upcoming': '#FFD700',
  'Active': '#00FF00',
  'Completed': '#8a2be2',
  'Delayed': '#FF6347'
};

export default function MissionsPage() {
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredMissions = missionsData.filter(mission => {
    const agencyMatch = selectedAgency === 'all' || mission.agency === selectedAgency || 
                       (selectedAgency === 'NASA/SpaceX' && mission.agency.includes('NASA'));
    const statusMatch = selectedStatus === 'all' || mission.status === selectedStatus;
    return agencyMatch && statusMatch;
  });

  const upcomingMissions = filteredMissions.filter(m => m.status === 'Upcoming');
  const activeMissions = filteredMissions.filter(m => m.status === 'Active');
  const completedMissions = filteredMissions.filter(m => m.status === 'Completed');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'Upcoming': '🚀',
      'Active': '✈️',
      'Completed': '✅',
      'Delayed': '⏱️'
    };
    return icons[status as keyof typeof icons] || '🚀';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 glow-text">
            Space Missions & Launch Schedule
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track current and upcoming space missions from NASA, SpaceX, ISRO, ESA, and other space agencies. 
            Follow humanity's journey to explore the cosmos.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Agency Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#1dd1f2] text-center">Filter by Agency</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {agencies.map(agency => (
                  <button
                    key={agency.id}
                    onClick={() => setSelectedAgency(agency.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedAgency === agency.id
                        ? 'bg-[#1dd1f2] text-[#040b1e] shadow-lg'
                        : 'bg-[#16213e] text-gray-300 hover:bg-[#1dd1f2]/20 hover:text-[#1dd1f2] border border-gray-600'
                    }`}
                  >
                    {agency.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#1dd1f2] text-center">Filter by Status</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {['all', 'Upcoming', 'Active', 'Completed', 'Delayed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedStatus === status
                        ? 'bg-[#1dd1f2] text-[#040b1e] shadow-lg'
                        : 'bg-[#16213e] text-gray-300 hover:bg-[#1dd1f2]/20 hover:text-[#1dd1f2] border border-gray-600'
                    }`}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statistics */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card glowColor="blue" className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold text-[#1dd1f2]">{upcomingMissions.length}</div>
              <div className="text-sm text-gray-400">Upcoming</div>
            </Card>
            <Card glowColor="white" className="text-center">
              <div className="text-3xl mb-2">✈️</div>
              <div className="text-2xl font-bold text-white">{activeMissions.length}</div>
              <div className="text-sm text-gray-400">Active</div>
            </Card>
            <Card glowColor="purple" className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-[#8a2be2]">{completedMissions.length}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </Card>
            <Card glowColor="blue" className="text-center">
              <div className="text-3xl mb-2">🌌</div>
              <div className="text-2xl font-bold text-[#1dd1f2]">{filteredMissions.length}</div>
              <div className="text-sm text-gray-400">Total Missions</div>
            </Card>
          </div>
        </section>

        {/* Missions Grid */}
        <section>
          {filteredMissions.length === 0 ? (
            <Card className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1dd1f2]">No missions found</h3>
              <p className="text-gray-400">
                Try adjusting your filters to see more missions.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredMissions.map(mission => (
                <Card key={mission.id} glowColor="blue" className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{getStatusIcon(mission.status)}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-[#1dd1f2]">{mission.name}</h3>
                        <p className="text-sm text-[#8a2be2]">{mission.agency}</p>
                      </div>
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold text-[#040b1e]"
                      style={{ backgroundColor: statusColors[mission.status] }}
                    >
                      {mission.status}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{mission.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Launch Date:</span>
                      <div className="text-white font-medium">{formatDate(mission.launchDate)}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Vehicle:</span>
                      <div className="text-white font-medium">{mission.vehicle}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Destination:</span>
                      <div className="text-white font-medium">{mission.destination}</div>
                    </div>
                    {mission.duration && (
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <div className="text-white font-medium">{mission.duration}</div>
                      </div>
                    )}
                  </div>

                  {mission.crew && mission.crew.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-[#1dd1f2] mb-2">Crew:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mission.crew.map((member, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-[#16213e] text-white text-sm rounded border border-[#1dd1f2]/30"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-[#1dd1f2] mb-3">Mission Objectives:</h4>
                    <ul className="space-y-2">
                      {mission.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-300">
                          <span className="text-[#8a2be2] mr-2 mt-1">•</span>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {mission.budget && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Budget:</span>
                        <span className="text-white font-semibold">{mission.budget}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="flex-1">
                      Mission Details
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Track Progress
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Launch Calendar */}
        <section className="mt-16">
          <Card glowColor="purple">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[#8a2be2]">
                Upcoming Launch Calendar
              </h2>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
                Never miss a launch! Subscribe to get notifications about upcoming missions 
                and watch live streams of rocket launches from around the world.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl mb-2">📅</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">Launch Alerts</h4>
                  <p className="text-sm text-gray-400">Get notified before launches</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📺</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">Live Streams</h4>
                  <p className="text-sm text-gray-400">Watch launches in real-time</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="text-lg font-semibold text-[#1dd1f2] mb-1">Mission Updates</h4>
                  <p className="text-sm text-gray-400">Follow mission progress</p>
                </div>
              </div>
              
              <Button variant="primary" size="lg">
                Subscribe to Launch Calendar
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}