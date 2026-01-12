'use client';

import { useState, useEffect } from 'react';

interface Star {
  name: string;
  type: string;
  description: string;
  temperature: string;
  lifespan: string;
  luminosity: string;
  mass: string;
  image: string;
  color: string;
  bgGradient: string;
}

const starsData: Star[] = [
  {
    name: "The Sun",
    type: "G-type Main Sequence Star",
    description: "Our nearest star, a middle-aged yellow dwarf that provides energy for all life on Earth. It converts 600 million tons of hydrogen to helium every second, releasing energy that takes 8 minutes to reach us.",
    temperature: "5,778°C",
    lifespan: "10 billion years",
    luminosity: "1 Solar",
    mass: "1 Solar Mass",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1200px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
    color: "#FDB813",
    bgGradient: "from-yellow-950 via-orange-900 to-amber-950"
  },
  {
    name: "Betelgeuse",
    type: "Red Supergiant",
    description: "A dying red supergiant in Orion's shoulder, one of the largest stars visible to the naked eye. So massive that if placed at our Sun's position, it would engulf Mercury, Venus, Earth, Mars, and possibly Jupiter.",
    temperature: "3,500°C",
    lifespan: "< 100,000 years left",
    luminosity: "126,000 Solar",
    mass: "16.5 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Betelgeuse_captured_by_ALMA.jpg/1200px-Betelgeuse_captured_by_ALMA.jpg",
    color: "#FF4500",
    bgGradient: "from-red-950 via-orange-950 to-rose-950"
  },
  {
    name: "Sirius",
    type: "Binary Star System",
    description: "The brightest star in Earth's night sky, actually a binary system with a white dwarf companion. Known as the 'Dog Star', it has been important to many cultures throughout history for navigation and calendar purposes.",
    temperature: "9,940°C",
    lifespan: "1 billion years",
    luminosity: "25.4 Solar",
    mass: "2.1 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Sirius_A_and_B_artwork.jpg/1200px-Sirius_A_and_B_artwork.jpg",
    color: "#A8D8FF",
    bgGradient: "from-blue-950 via-cyan-950 to-slate-950"
  },
  {
    name: "Rigel",
    type: "Blue Supergiant",
    description: "The brightest star in Orion and one of the most luminous in our galaxy. This blue supergiant shines with the intensity of 120,000 suns and is visible across vast cosmic distances.",
    temperature: "12,100°C",
    lifespan: "< 10 million years",
    luminosity: "120,000 Solar",
    mass: "21 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Rigel_sun_comparison.png/1200px-Rigel_sun_comparison.png",
    color: "#B4D7FF",
    bgGradient: "from-blue-950 via-indigo-950 to-slate-950"
  },
  {
    name: "Vega",
    type: "A-type Main Sequence",
    description: "Once the North Star and will be again in 12,000 years. This brilliant blue-white star spins so fast it bulges at its equator. One of the first stars photographed and used to calibrate telescope brightness scales.",
    temperature: "9,600°C",
    lifespan: "1 billion years",
    luminosity: "40 Solar",
    mass: "2.1 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Vega_in_Lyra.jpg/1200px-Vega_in_Lyra.jpg",
    color: "#CCE5FF",
    bgGradient: "from-indigo-950 via-blue-950 to-slate-950"
  },
  {
    name: "Polaris",
    type: "Yellow Supergiant",
    description: "The North Star, a guiding light for navigators for millennia. Actually a triple star system, Polaris sits almost directly above Earth's north pole, making it appear stationary while other stars circle around it.",
    temperature: "6,015°C",
    lifespan: "50 million years",
    luminosity: "1,260 Solar",
    mass: "5.4 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Polaris_system.jpg/1200px-Polaris_system.jpg",
    color: "#FFE4B5",
    bgGradient: "from-amber-950 via-yellow-900 to-orange-950"
  },
  {
    name: "Neutron Star",
    type: "Stellar Remnant",
    description: "The ultra-dense core left after a massive star explodes. A teaspoon of neutron star material weighs 6 billion tons. These cosmic lighthouses can spin 700 times per second, with magnetic fields a trillion times stronger than Earth's.",
    temperature: "1,000,000°C",
    lifespan: "Quintillions of years",
    luminosity: "Variable",
    mass: "1.4-2 Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1200px-Crab_Nebula.jpg",
    color: "#E0E0E0",
    bgGradient: "from-slate-950 via-gray-900 to-zinc-950"
  },
  {
    name: "Supernova",
    type: "Stellar Explosion",
    description: "The spectacular death of a massive star, briefly outshining entire galaxies. These cosmic explosions forge heavy elements like gold and platinum, scattering the building blocks of life across the universe.",
    temperature: "100 billion°C",
    lifespan: "Weeks visible",
    luminosity: "10 billion Solar",
    mass: "8+ Solar Masses",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Keplers_supernova.jpg/1200px-Keplers_supernova.jpg",
    color: "#FF6B6B",
    bgGradient: "from-red-950 via-orange-900 to-yellow-950"
  }
];

export default function StarsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentStar = starsData[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? starsData.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === starsData.length - 1 ? 0 : prev + 1));
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
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentStar.bgGradient} transition-all duration-700`}>
      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg absolute inset-0 opacity-50"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left side - Star Info */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              {currentStar.type}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {currentStar.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
              {currentStar.description}
            </p>
          </div>

          {/* Center - Star Image */}
          <div className="flex justify-center items-center relative order-first lg:order-none">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            >
              {/* Glow effect behind star */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-50 scale-125"
                style={{ backgroundColor: currentStar.color }}
              ></div>
              
              {/* Star image */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl animate-pulse-slow"
                style={{ 
                  boxShadow: `0 0 80px ${currentStar.color}60, 0 0 160px ${currentStar.color}30`,
                }}
              >
                <img 
                  src={currentStar.image} 
                  alt={currentStar.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Temperature</span>
                <span className="text-xl md:text-2xl font-light">{currentStar.temperature}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Luminosity</span>
                <span className="text-xl md:text-2xl font-light">{currentStar.luminosity}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Mass</span>
                <span className="text-xl md:text-2xl font-light">{currentStar.mass}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Lifespan</span>
                <span className="text-xl md:text-2xl font-light">{currentStar.lifespan}</span>
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
          aria-label="Previous star"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next star"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Star indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {starsData.map((star, index) => (
          <button
            key={star.name}
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
            aria-label={`Go to ${star.name}`}
          />
        ))}
      </div>

      {/* Star name watermark */}
      <div className="absolute bottom-4 right-4 text-white/5 text-9xl font-bold pointer-events-none select-none hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
        {currentStar.name}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
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
