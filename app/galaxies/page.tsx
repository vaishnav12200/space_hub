'use client';

import { useState, useEffect } from 'react';

interface Galaxy {
  name: string;
  type: string;
  description: string;
  distance: string;
  diameter: string;
  stars: string;
  age: string;
  image: string;
  color: string;
  bgGradient: string;
}

const galaxiesData: Galaxy[] = [
  {
    name: "Milky Way",
    type: "Barred Spiral Galaxy",
    description: "Our home galaxy, a magnificent barred spiral containing our Solar System in one of its outer arms. We're located in the Orion Arm, about 26,000 light-years from the galactic center where a supermassive black hole lurks.",
    distance: "Home",
    diameter: "100,000 ly",
    stars: "200-400 billion",
    age: "13.6 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1200px-ESO-VLT-Laser-phot-33a-07.jpg",
    color: "#E6E6FA",
    bgGradient: "from-indigo-950 via-purple-950 to-slate-950"
  },
  {
    name: "Andromeda",
    type: "Spiral Galaxy (M31)",
    description: "The nearest major galaxy to the Milky Way and the most distant object visible to the naked eye. Approaching us at 110 km/s, it will collide with our galaxy in about 4.5 billion years to form 'Milkomeda'.",
    distance: "2.5 million ly",
    diameter: "220,000 ly",
    stars: "1 trillion",
    age: "10.01 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/M31_09-01-2011_%28cropped%29.jpg/1200px-M31_09-01-2011_%28cropped%29.jpg",
    color: "#B8860B",
    bgGradient: "from-amber-950 via-yellow-950 to-slate-950"
  },
  {
    name: "Sombrero",
    type: "Spiral Galaxy (M104)",
    description: "A striking galaxy famous for its prominent dust lane and bright nucleus, resembling a Mexican sombrero hat. Its central supermassive black hole is 1 billion solar masses — one of the most massive ever discovered.",
    distance: "29.3 million ly",
    diameter: "50,000 ly",
    stars: "800 billion",
    age: "13.25 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/1200px-M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    color: "#FFD700",
    bgGradient: "from-yellow-950 via-amber-900 to-orange-950"
  },
  {
    name: "Whirlpool",
    type: "Spiral Galaxy (M51)",
    description: "A classic spiral galaxy interacting with a smaller companion, creating beautiful well-defined spiral arms. It was the first galaxy whose spiral structure was discovered, revealing the grand design of cosmic architecture.",
    distance: "23 million ly",
    diameter: "76,000 ly",
    stars: "160 billion",
    age: "400 million years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Whirlpool_Galaxy.jpg/1200px-Whirlpool_Galaxy.jpg",
    color: "#87CEEB",
    bgGradient: "from-cyan-950 via-blue-950 to-indigo-950"
  },
  {
    name: "Triangulum",
    type: "Spiral Galaxy (M33)",
    description: "The third-largest member of our Local Group, sometimes visible to the naked eye under perfect conditions. Its face-on orientation gives us a spectacular view of its star-forming regions and loose spiral structure.",
    distance: "2.73 million ly",
    diameter: "60,000 ly",
    stars: "40 billion",
    age: "10 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Triangulum_Galaxy_%28full%29.jpg/1200px-Triangulum_Galaxy_%28full%29.jpg",
    color: "#DDA0DD",
    bgGradient: "from-purple-950 via-pink-950 to-slate-950"
  },
  {
    name: "Pinwheel",
    type: "Spiral Galaxy (M101)",
    description: "A grand design spiral galaxy nearly twice the size of the Milky Way. Its asymmetric shape is thought to be caused by gravitational interactions with its companion galaxies, making it appear lopsided but beautiful.",
    distance: "21 million ly",
    diameter: "170,000 ly",
    stars: "1 trillion",
    age: "21 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/M101_hires_STScI-PRC2006-10a.jpg/1200px-M101_hires_STScI-PRC2006-10a.jpg",
    color: "#98FB98",
    bgGradient: "from-emerald-950 via-teal-950 to-slate-950"
  },
  {
    name: "Cartwheel",
    type: "Ring Galaxy",
    description: "A spectacular result of a galactic collision. About 300 million years ago, a smaller galaxy punched through its center, creating expanding ripples of star formation like a cosmic stone dropped in a pond.",
    distance: "500 million ly",
    diameter: "150,000 ly",
    stars: "Few billion",
    age: "300 million years (current form)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Cartwheel_Galaxy_%28NIRCam_and_MIRI_Composite_Image%29.png/1200px-Cartwheel_Galaxy_%28NIRCam_and_MIRI_Composite_Image%29.png",
    color: "#FF69B4",
    bgGradient: "from-pink-950 via-rose-950 to-purple-950"
  },
  {
    name: "Centaurus A",
    type: "Elliptical Galaxy",
    description: "The fifth-brightest galaxy in the sky, featuring a dramatic dust lane and powerful jets erupting from its central supermassive black hole. It's the result of a merger between an elliptical and spiral galaxy.",
    distance: "12 million ly",
    diameter: "97,000 ly",
    stars: "100 billion",
    age: "13.27 billion years",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Centaurus_A_%28ALMA%29.jpg/1200px-Centaurus_A_%28ALMA%29.jpg",
    color: "#CD853F",
    bgGradient: "from-orange-950 via-amber-950 to-slate-950"
  }
];

export default function GalaxiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentGalaxy = galaxiesData[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? galaxiesData.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === galaxiesData.length - 1 ? 0 : prev + 1));
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
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentGalaxy.bgGradient} transition-all duration-700`}>
      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg absolute inset-0 opacity-40"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left side - Galaxy Info */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              {currentGalaxy.type}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {currentGalaxy.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
              {currentGalaxy.description}
            </p>
          </div>

          {/* Center - Galaxy Image */}
          <div className="flex justify-center items-center relative order-first lg:order-none">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            >
              {/* Glow effect behind galaxy */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-110"
                style={{ backgroundColor: currentGalaxy.color }}
              ></div>
              
              {/* Galaxy image */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl animate-slow-spin"
                style={{ 
                  boxShadow: `0 0 60px ${currentGalaxy.color}40, 0 0 120px ${currentGalaxy.color}20`,
                }}
              >
                <img 
                  src={currentGalaxy.image} 
                  alt={currentGalaxy.name}
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
                <span className="text-xl md:text-2xl font-light">{currentGalaxy.distance}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Diameter</span>
                <span className="text-xl md:text-2xl font-light">{currentGalaxy.diameter}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Stars</span>
                <span className="text-xl md:text-2xl font-light">{currentGalaxy.stars}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Age</span>
                <span className="text-xl md:text-2xl font-light">{currentGalaxy.age}</span>
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
          aria-label="Previous galaxy"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next galaxy"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Galaxy indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {galaxiesData.map((galaxy, index) => (
          <button
            key={galaxy.name}
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
            aria-label={`Go to ${galaxy.name}`}
          />
        ))}
      </div>

      {/* Galaxy name watermark */}
      <div className="absolute bottom-4 right-4 text-white/5 text-9xl font-bold pointer-events-none select-none hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
        {currentGalaxy.name}
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
          animation: slow-spin 120s linear infinite;
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
