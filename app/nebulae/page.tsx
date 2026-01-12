'use client';

import { useState, useEffect } from 'react';

interface Nebula {
  name: string;
  type: string;
  description: string;
  distance: string;
  size: string;
  constellation: string;
  discovered: string;
  image: string;
  color: string;
  bgGradient: string;
}

const nebulaeData: Nebula[] = [
  {
    name: "Orion Nebula",
    type: "Emission Nebula (M42)",
    description: "One of the brightest nebulae visible to the naked eye, this stellar nursery is actively forming new stars. Visible as a fuzzy star in Orion's sword, it contains over 2,000 times the mass of the Sun and houses the famous Trapezium cluster.",
    distance: "1,344 light-years",
    size: "24 light-years",
    constellation: "Orion",
    discovered: "1610",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    color: "#FF6B9D",
    bgGradient: "from-pink-950 via-rose-900 to-purple-950"
  },
  {
    name: "Crab Nebula",
    type: "Supernova Remnant (M1)",
    description: "The expanding remnant of a supernova that was observed by Chinese astronomers in 1054 AD. Expanding at 1,500 km/s, it contains a pulsar spinning 30 times per second — the dense core of the exploded star.",
    distance: "6,500 light-years",
    size: "11 light-years",
    constellation: "Taurus",
    discovered: "1731",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1200px-Crab_Nebula.jpg",
    color: "#FF8C42",
    bgGradient: "from-orange-950 via-amber-900 to-red-950"
  },
  {
    name: "Pillars of Creation",
    type: "Emission Nebula (M16)",
    description: "Iconic columns of gas and dust in the Eagle Nebula where new stars are being born. These towering pillars are 4-5 light-years tall and are being slowly eroded by radiation from nearby hot young stars.",
    distance: "7,000 light-years",
    size: "5 light-years tall",
    constellation: "Serpens",
    discovered: "1745",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/800px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    color: "#8B4513",
    bgGradient: "from-amber-950 via-orange-950 to-yellow-950"
  },
  {
    name: "Carina Nebula",
    type: "Emission Nebula",
    description: "One of the largest and brightest nebulae in the sky, home to Eta Carinae — one of the most massive and unstable stars known. Four times larger than the Orion Nebula, it's a cosmic factory of star birth.",
    distance: "8,500 light-years",
    size: "300 light-years",
    constellation: "Carina",
    discovered: "1752",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Carina_Nebula_by_Harel_Boren_%28151851961%2C_modified%29.jpg/1200px-Carina_Nebula_by_Harel_Boren_%28151851961%2C_modified%29.jpg",
    color: "#FFB347",
    bgGradient: "from-orange-950 via-yellow-900 to-amber-950"
  },
  {
    name: "Ring Nebula",
    type: "Planetary Nebula (M57)",
    description: "A beautiful ring-shaped nebula formed when a dying star expelled its outer layers. Not actually ring-shaped but barrel-shaped, we're looking down its axis. Its central white dwarf has a surface temperature of 120,000K.",
    distance: "2,300 light-years",
    size: "1 light-year",
    constellation: "Lyra",
    discovered: "1779",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/M57_The_Ring_Nebula.JPG/1200px-M57_The_Ring_Nebula.JPG",
    color: "#00CED1",
    bgGradient: "from-teal-950 via-cyan-900 to-blue-950"
  },
  {
    name: "Horsehead Nebula",
    type: "Dark Nebula (B33)",
    description: "A dark silhouette against a bright emission nebula, shaped remarkably like a horse's head. Made of dense, cold gas and dust, this iconic nebula will disperse in about 5 million years as radiation erodes it away.",
    distance: "1,500 light-years",
    size: "3.5 light-years",
    constellation: "Orion",
    discovered: "1888",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Barnard_33.jpg/1200px-Barnard_33.jpg",
    color: "#DC143C",
    bgGradient: "from-red-950 via-rose-950 to-slate-950"
  },
  {
    name: "Helix Nebula",
    type: "Planetary Nebula",
    description: "Often called the 'Eye of God', this is one of the closest planetary nebulae to Earth. Its central star is becoming a white dwarf, and the nebula's multiple shells reveal several mass ejection events over thousands of years.",
    distance: "655 light-years",
    size: "2.5 light-years",
    constellation: "Aquarius",
    discovered: "1824",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC_7293_%282004%29.jpg/1200px-NGC_7293_%282004%29.jpg",
    color: "#00BFFF",
    bgGradient: "from-blue-950 via-cyan-950 to-teal-950"
  },
  {
    name: "Butterfly Nebula",
    type: "Planetary Nebula (NGC 6302)",
    description: "One of the most complex planetary nebulae known, with wing-like structures of gas traveling at over 950,000 km/h. Its dying central star is one of the hottest in the galaxy at 250,000°C.",
    distance: "3,400 light-years",
    size: "3 light-years",
    constellation: "Scorpius",
    discovered: "1888",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Butterfly_Nebula.jpg/1200px-Butterfly_Nebula.jpg",
    color: "#9370DB",
    bgGradient: "from-purple-950 via-violet-900 to-indigo-950"
  }
];

export default function NebulaePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentNebula = nebulaeData[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? nebulaeData.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === nebulaeData.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentNebula.bgGradient} transition-all duration-700`}>
      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg absolute inset-0 opacity-40"></div>
        <div className="nebula-glow absolute inset-0 opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left side - Nebula Info */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              {currentNebula.type}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {currentNebula.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
              {currentNebula.description}
            </p>
          </div>

          {/* Center - Nebula Image */}
          <div className="flex justify-center items-center relative order-first lg:order-none">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            >
              {/* Glow effect behind nebula */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-50 scale-125"
                style={{ backgroundColor: currentNebula.color }}
              ></div>
              
              {/* Nebula image */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl"
                style={{ 
                  boxShadow: `0 0 60px ${currentNebula.color}40, 0 0 120px ${currentNebula.color}20`,
                }}
              >
                <img 
                  src={currentNebula.image} 
                  alt={currentNebula.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Distance</span>
                <span className="text-xl md:text-2xl font-light">{currentNebula.distance}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Size</span>
                <span className="text-xl md:text-2xl font-light">{currentNebula.size}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Constellation</span>
                <span className="text-xl md:text-2xl font-light">{currentNebula.constellation}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Discovered</span>
                <span className="text-xl md:text-2xl font-light">{currentNebula.discovered}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Previous nebula"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next nebula"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Nebula indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {nebulaeData.map((nebula, index) => (
          <button
            key={nebula.name}
            onClick={() => {
              if (isAnimating || index === currentIndex) return;
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to ${nebula.name}`}
          />
        ))}
      </div>

      {/* Nebula name watermark */}
      <div className="absolute bottom-4 right-4 text-white/5 text-8xl font-bold pointer-events-none select-none hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
        {currentNebula.name}
      </div>

      <style jsx>{`
        .stars-bg {
          background-image: radial-gradient(2px 2px at 20px 30px, white, transparent),
                            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(1px 1px at 90px 40px, white, transparent),
                            radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
                            radial-gradient(1px 1px at 230px 80px, white, transparent),
                            radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent),
                            radial-gradient(1px 1px at 370px 50px, white, transparent),
                            radial-gradient(2px 2px at 440px 180px, rgba(255,255,255,0.8), transparent);
          background-size: 500px 200px;
        }
        .nebula-glow {
          background: radial-gradient(ellipse at center, rgba(255,107,157,0.2) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
}
