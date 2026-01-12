'use client';

import { useState, useEffect } from 'react';

interface Planet {
  name: string;
  image: string;
  description: string;
  radius: string;
  distanceFromSun: string;
  orbitalPeriod: string;
  surfaceGravity: string;
  color: string;
  bgGradient: string;
}

const planetsData: Planet[] = [
  {
    name: "Mercury",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/1200px-Mercury_in_true_color.jpg",
    description: "The smallest planet in our solar system and closest to the Sun. A swift world that zips around the Sun faster than any other planet, with temperatures that swing wildly from scorching hot to freezing cold.",
    radius: "2,439.7",
    distanceFromSun: "57.9 million",
    orbitalPeriod: "88",
    surfaceGravity: "3.7",
    color: "#8B7355",
    bgGradient: "from-gray-900 via-stone-800 to-gray-900"
  },
  {
    name: "Venus",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    description: "A scorching world shrouded in thick clouds of sulfuric acid. Often called Earth's twin due to similar size, Venus has a runaway greenhouse effect making it the hottest planet in our solar system.",
    radius: "6,051.8",
    distanceFromSun: "108.2 million",
    orbitalPeriod: "225",
    surfaceGravity: "8.87",
    color: "#DEB887",
    bgGradient: "from-amber-950 via-orange-900 to-yellow-950"
  },
  {
    name: "Earth",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1200px-The_Blue_Marble_%28remastered%29.jpg",
    description: "Our home planet, rich with life, water, and endless beauty. A perfect balance of oceans, atmosphere, and sunlight that sustains millions of species. From forests to deserts, it remains the only known world to cradle life as we know it.",
    radius: "6,371",
    distanceFromSun: "149.6 million",
    orbitalPeriod: "365",
    surfaceGravity: "9.81",
    color: "#4F94CD",
    bgGradient: "from-slate-950 via-cyan-950 to-blue-950"
  },
  {
    name: "Mars",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
    description: "The red planet — a dusty, cold world with a thin atmosphere and giant volcanoes. Home to ancient riverbeds and frozen water, it whispers secrets of a wetter past. A future destination for human exploration and perhaps, one day, colonization.",
    radius: "3,389.5",
    distanceFromSun: "227.9 million",
    orbitalPeriod: "687",
    surfaceGravity: "3.72",
    color: "#CD5C5C",
    bgGradient: "from-red-950 via-rose-900 to-orange-950"
  },
  {
    name: "Jupiter",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Jupiter_New_Horizons.jpg",
    description: "The gas giant — massive, stormy, and home to the Great Red Spot. Its immense gravity protects inner planets by capturing rogue asteroids and comets. Beneath its clouds may lie a metallic ocean of hydrogen, conducting electricity like a star.",
    radius: "69,911",
    distanceFromSun: "778 million",
    orbitalPeriod: "12 years",
    surfaceGravity: "24.79",
    color: "#DAA520",
    bgGradient: "from-amber-950 via-red-900 to-orange-950"
  },
  {
    name: "Saturn",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    description: "The ringed wonder of our solar system. Its magnificent rings are made of ice and rock, spanning hundreds of thousands of kilometers. Less dense than water, this gas giant could theoretically float in an ocean large enough to hold it.",
    radius: "58,232",
    distanceFromSun: "1.43 billion",
    orbitalPeriod: "29 years",
    surfaceGravity: "10.44",
    color: "#F4C542",
    bgGradient: "from-yellow-950 via-amber-900 to-orange-950"
  },
  {
    name: "Uranus",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg/1200px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg",
    description: "The ice giant that rolls around the Sun on its side. Tilted at 98 degrees, its seasons are extreme — each pole gets 42 years of continuous sunlight followed by 42 years of darkness. A world of frozen methane clouds and diamond rain.",
    radius: "25,362",
    distanceFromSun: "2.87 billion",
    orbitalPeriod: "84 years",
    surfaceGravity: "8.69",
    color: "#4FD0E3",
    bgGradient: "from-cyan-950 via-teal-900 to-slate-950"
  },
  {
    name: "Neptune",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Neptune_Voyager2_color_calibrated.png/1200px-Neptune_Voyager2_color_calibrated.png",
    description: "The windiest world in our solar system, with storms raging at 2,100 km/h. This distant blue giant, named after the Roman god of the sea, holds mysteries in its deep atmosphere. Its largest moon Triton orbits backwards, hinting at a violent capture.",
    radius: "24,622",
    distanceFromSun: "4.5 billion",
    orbitalPeriod: "165 years",
    surfaceGravity: "11.15",
    color: "#4169E1",
    bgGradient: "from-blue-950 via-indigo-900 to-slate-950"
  }
];

export default function PlanetsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPlanet = planetsData[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? planetsData.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === planetsData.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentPlanet.bgGradient} transition-all duration-700`}>
      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left side - Planet Info */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {currentPlanet.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
              {currentPlanet.description}
            </p>
          </div>

          {/* Center - Planet Image */}
          <div className="flex justify-center items-center relative order-first lg:order-none">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            >
              {/* Glow effect behind planet */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-110"
                style={{ backgroundColor: currentPlanet.color }}
              ></div>
              
              {/* Planet image */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl animate-slow-spin"
                style={{ 
                  boxShadow: `0 0 60px ${currentPlanet.color}40, 0 0 120px ${currentPlanet.color}20`,
                }}
              >
                <img 
                  src={currentPlanet.image} 
                  alt={currentPlanet.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Radius</span>
                <span className="text-xl md:text-2xl font-light">{currentPlanet.radius} <span className="text-sm text-gray-400">km</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Distance from Sun</span>
                <span className="text-xl md:text-2xl font-light">{currentPlanet.distanceFromSun} <span className="text-sm text-gray-400">km</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Orbital Period</span>
                <span className="text-xl md:text-2xl font-light">{currentPlanet.orbitalPeriod} <span className="text-sm text-gray-400">days</span></span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Surface Gravity</span>
                <span className="text-xl md:text-2xl font-light">{currentPlanet.surfaceGravity} <span className="text-sm text-gray-400">m/s²</span></span>
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
          aria-label="Previous planet"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next planet"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Planet indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {planetsData.map((planet, index) => (
          <button
            key={planet.name}
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
            aria-label={`Go to ${planet.name}`}
          />
        ))}
      </div>

      {/* Planet name watermark */}
      <div className="absolute bottom-4 right-4 text-white/5 text-9xl font-bold pointer-events-none select-none hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
        {currentPlanet.name}
      </div>

      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
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
      `}</style>
    </div>
  );
}