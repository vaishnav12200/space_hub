import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  const featuredFacts = [
    {
      title: "Incredible Scale",
      fact: "One million Earths could fit inside the Sun",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
    },
    {
      title: "Cosmic Speed",
      fact: "Light travels 299,792,458 meters per second",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Starsinthesky.jpg/220px-Starsinthesky.jpg"
    },
    {
      title: "Deep Space",
      fact: "The observable universe is 93 billion light-years wide",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hubble_ultra_deep_field_high_rez_edit1.jpg/220px-Hubble_ultra_deep_field_high_rez_edit1.jpg"
    },
    {
      title: "Black Hole Mystery",
      fact: "Sagittarius A* has a mass of 4 million suns",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/220px-Black_hole_-_Messier_87_crop_max_res.jpg"
    }
  ];

  const spaceNews = [
    {
      title: "James Webb Telescope Discovers New Exoplanet",
      summary: "Scientists identify potentially habitable world 100 light-years away",
      date: "Nov 15, 2024"
    },
    {
      title: "SpaceX Prepares for Mars Mission Update",
      summary: "Latest Starship tests show promising results for future Mars exploration",
      date: "Nov 14, 2024"
    },
    {
      title: "ISRO's Chandrayaan-4 Mission Approved",
      summary: "India's next lunar mission aims to bring samples back to Earth",
      date: "Nov 13, 2024"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040b1e]/50 to-[#040b1e]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text floating-element">
            Explore the Universe
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the wonders of space - from distant planets and brilliant stars 
            to mysterious black holes and stunning nebulae
          </p>
          
          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Button href="/planets" variant="primary" size="lg" className="flex-col h-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/220px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg" alt="Planets" className="w-8 h-8 mb-1 object-contain rounded-full" />
              Planets
            </Button>
            <Button href="/stars" variant="secondary" size="lg" className="flex-col h-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg" alt="Stars" className="w-8 h-8 mb-1 object-contain rounded-full" />
              Stars
            </Button>
            <Button href="/news" variant="primary" size="lg" className="flex-col h-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hubble_Space_Telescope_over_Earth_%28during_the_STS-109_mission%29.jpg/220px-Hubble_Space_Telescope_over_Earth_%28during_the_STS-109_mission%29.jpg" alt="News" className="w-8 h-8 mb-1 object-contain rounded-full" />
              News
            </Button>
            <Button href="/missions" variant="secondary" size="lg" className="flex-col h-20">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/SpaceX_Crew_Dragon_%28crop_2%29.jpg/220px-SpaceX_Crew_Dragon_%28crop_2%29.jpg" alt="Missions" className="w-8 h-8 mb-1 object-contain rounded-full" />
              Missions
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#1dd1f2] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#1dd1f2] rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Facts Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 glow-text">
            Mind-Blowing Space Facts
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Discover amazing facts about our universe that will leave you in awe
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFacts.map((fact, index) => (
              <Card key={index} className="text-center" animated>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={fact.icon} alt={fact.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1dd1f2]">{fact.title}</h3>
                <p className="text-gray-300">{fact.fact}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Space News */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#040b1e] via-[#16213e] to-[#040b1e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold glow-text">Latest Space News</h2>
            <Button href="/news" variant="ghost">
              View All News →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spaceNews.map((news, index) => (
              <Card key={index} glowColor="purple">
                <div className="text-sm text-[#8a2be2] mb-2">{news.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{news.title}</h3>
                <p className="text-gray-300 mb-4">{news.summary}</p>
                <Button variant="ghost" size="sm">
                  Read More →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">
            Explore Space Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card glowColor="blue" className="cursor-pointer hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/220px-NGC_4414_%28NASA-med%29.jpg" alt="Galaxies" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#1dd1f2]">Galaxies</h3>
                <p className="text-gray-300 mb-4">Explore the Milky Way, Andromeda, and distant galaxies</p>
                <Button href="/galaxies" variant="ghost" size="sm">
                  Discover Galaxies →
                </Button>
              </div>
            </Card>
            
            <Card glowColor="purple" className="cursor-pointer hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/220px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg" alt="Nebulae" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#8a2be2]">Nebulae</h3>
                <p className="text-gray-300 mb-4">Beautiful cosmic clouds where stars are born</p>
                <Button href="/nebulae" variant="ghost" size="sm">
                  View Nebulae →
                </Button>
              </div>
            </Card>
            
            <Card glowColor="white" className="cursor-pointer hover:scale-105">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/220px-Black_hole_-_Messier_87_crop_max_res.jpg" alt="Black Holes" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Black Holes</h3>
                <p className="text-gray-300 mb-4">Mysterious cosmic phenomena that bend spacetime</p>
                <Button href="/black-holes" variant="ghost" size="sm">
                  Learn More →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
