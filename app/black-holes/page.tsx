'use client';

import { useState, useEffect } from 'react';

interface BlackHole {
  name: string;
  type: string;
  description: string;
  mass: string;
  distance: string;
  eventHorizon: string;
  discovered: string;
  image: string;
  color: string;
  bgGradient: string;
}

const blackHolesData: BlackHole[] = [
  {
    name: "Sagittarius A*",
    type: "Supermassive Black Hole",
    description: "The supermassive black hole at the center of our Milky Way galaxy. First imaged in 2022, this cosmic monster has been shaping our galaxy for billions of years, with stars orbiting it at incredible speeds.",
    mass: "4.15 million suns",
    distance: "26,000 light-years",
    eventHorizon: "24 million km",
    discovered: "2022 (first image)",
    image: "https://www.eso.org/public/archives/images/large/eso2406a.jpg",
    color: "#FF6B00",
    bgGradient: "from-orange-950 via-red-950 to-slate-950"
  },
  {
    name: "M87*",
    type: "Supermassive Black Hole",
    description: "The first black hole ever directly photographed, located in the giant elliptical galaxy M87. With jets of material extending 5,000 light-years, it showcases the incredible power of these cosmic engines.",
    mass: "6.5 billion suns",
    distance: "55 million light-years",
    eventHorizon: "38 billion km",
    discovered: "2019 (first image)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1200px-Black_hole_-_Messier_87_crop_max_res.jpg",
    color: "#FF4500",
    bgGradient: "from-red-950 via-orange-900 to-yellow-950"
  },
  {
    name: "Cygnus X-1",
    type: "Stellar Black Hole",
    description: "The first confirmed black hole, discovered through its X-ray emissions. Locked in a cosmic dance with a blue supergiant companion, it's actively feeding on stellar material torn from its partner star.",
    mass: "21 suns",
    distance: "7,200 light-years",
    eventHorizon: "125 km",
    discovered: "1971 (confirmed)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/BH_LMC.png/1200px-BH_LMC.png",
    color: "#4169E1",
    bgGradient: "from-blue-950 via-indigo-950 to-slate-950"
  },
  {
    name: "TON 618",
    type: "Ultramassive Black Hole",
    description: "One of the most massive black holes ever discovered, powering an extremely luminous quasar. So massive that its event horizon would swallow our entire solar system multiple times over.",
    mass: "66 billion suns",
    distance: "10.4 billion light-years",
    eventHorizon: "390 billion km",
    discovered: "1957",
    image: "https://tse4.mm.bing.net/th/id/OIP.O1K7vCb001jW8zgOXnC5ZQHaEK?pid=Api&P=0&h=220",
    color: "#9400D3",
    bgGradient: "from-purple-950 via-violet-950 to-slate-950"
  },
  {
    name: "Phoenix A*",
    type: "Supermassive Black Hole",
    description: "Located in the Phoenix Cluster, this is one of the most extreme black holes known. It's growing at an astonishing rate of 60 solar masses per year, making it one of the hungriest black holes discovered.",
    mass: "100 billion suns",
    distance: "5.7 billion light-years",
    eventHorizon: "590 billion km",
    discovered: "2012",
    image: "https://i0.wp.com/sciquest.org/wp-content/uploads/2023/06/black-hole-escape-hd-02.jpg?resize=2048%2C1152&ssl=1",
    color: "#FF1493",
    bgGradient: "from-pink-950 via-rose-950 to-purple-950"
  },
  {
    name: "GW150914",
    type: "Binary Black Hole Merger",
    description: "The first gravitational waves ever detected came from two black holes merging 1.3 billion years ago. This cosmic collision released more energy than all stars in the observable universe combined — for a fraction of a second.",
    mass: "62 suns (merged)",
    distance: "1.3 billion light-years",
    eventHorizon: "370 km",
    discovered: "2015",
    image: "https://www.astroblogs.nl/wp-content/uploads/2017/11/blackhole20171003-16.jpg",
    color: "#00CED1",
    bgGradient: "from-cyan-950 via-teal-950 to-slate-950"
  },
  {
    name: "Event Horizon",
    type: "Concept",
    description: "The point of no return — the boundary around a black hole beyond which nothing can escape. Once crossed, you'd need to travel faster than light to get out. Time itself seems to freeze here for outside observers.",
    mass: "Boundary",
    distance: "Relative",
    eventHorizon: "Schwarzschild radius",
    discovered: "Theory: 1916",
    image: "https://as2.ftcdn.net/v2/jpg/04/20/41/17/1000_F_420411717_gZstLQzoLvXVNByOOrEIZ4D0kwWjJYQp.jpg",
    color: "#FFFFFF",
    bgGradient: "from-slate-950 via-gray-900 to-zinc-950"
  },
  {
    name: "Hawking Radiation",
    type: "Phenomenon",
    description: "Stephen Hawking's groundbreaking discovery: black holes aren't completely black. Quantum effects near the event horizon cause them to slowly radiate energy and eventually evaporate over unimaginably long timescales.",
    mass: "N/A",
    distance: "Universal",
    eventHorizon: "Quantum boundary",
    discovered: "Theory: 1974",
    image: "https://www.sciencealert.com/images/2020-06/processed/hawkingradiation_topic_1024.jpg",
    color: "#FFD700",
    bgGradient: "from-amber-950 via-yellow-950 to-slate-950"
  }
];

export default function BlackHolesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentBlackHole = blackHolesData[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? blackHolesData.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === blackHolesData.length - 1 ? 0 : prev + 1));
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
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentBlackHole.bgGradient} transition-all duration-700`}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg absolute inset-0 opacity-30"></div>
        <div className="black-hole-distortion absolute inset-0 opacity-20"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 pt-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left side - Black Hole Info */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[-20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              {currentBlackHole.type}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {currentBlackHole.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
              {currentBlackHole.description}
            </p>
          </div>

          {/* Center - Black Hole Image */}
          <div className="flex justify-center items-center relative order-first lg:order-none">
            <div 
              className={`relative transition-all duration-500 ${isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            >
              {/* Accretion disk glow effect */}
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-150 animate-pulse-slow"
                style={{ backgroundColor: currentBlackHole.color }}
              ></div>
              
              {/* Event horizon inner shadow */}
              <div className="absolute inset-0 rounded-full bg-black/50 blur-xl scale-75"></div>
              
              {/* Black Hole image */}
              <div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl"
                style={{ 
                  boxShadow: `0 0 80px ${currentBlackHole.color}50, 0 0 160px ${currentBlackHole.color}25, inset 0 0 60px rgba(0,0,0,0.8)`,
                }}
              >
                <img 
                  src={currentBlackHole.image} 
                  alt={currentBlackHole.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className={`text-white space-y-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-[20px]' : 'opacity-100 translate-x-0'}`}>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Mass</span>
                <span className="text-xl md:text-2xl font-light">{currentBlackHole.mass}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Distance</span>
                <span className="text-xl md:text-2xl font-light">{currentBlackHole.distance}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Event Horizon</span>
                <span className="text-xl md:text-2xl font-light">{currentBlackHole.eventHorizon}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="text-gray-400 text-sm md:text-base">Discovered</span>
                <span className="text-xl md:text-2xl font-light">{currentBlackHole.discovered}</span>
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
          aria-label="Previous black hole"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Next black hole"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Black Hole indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {blackHolesData.map((blackHole, index) => (
          <button
            key={blackHole.name}
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
            aria-label={`Go to ${blackHole.name}`}
          />
        ))}
      </div>

      {/* Black Hole name watermark */}
      <div className="absolute bottom-4 right-4 text-white/5 text-8xl font-bold pointer-events-none select-none hidden lg:block" style={{ fontFamily: 'Georgia, serif' }}>
        {currentBlackHole.name}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1.5);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.6);
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
        .black-hole-distortion {
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
}
