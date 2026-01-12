import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#040b1e] via-[#16213e] to-[#040b1e] border-t border-[#1dd1f2]/20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1dd1f2] to-[#8a2be2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold glow-text">Space Hub</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Explore the wonders of the universe. From planets and stars to galaxies and black holes, 
              discover the latest in space exploration and astronomical discoveries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1dd1f2] tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li><Link href="/planets" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Planets</Link></li>
              <li><Link href="/stars" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Stars</Link></li>
              <li><Link href="/galaxies" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Galaxies</Link></li>
              <li><Link href="/nebulae" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Nebulae</Link></li>
              <li><Link href="/black-holes" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Black Holes</Link></li>
            </ul>
          </div>

          {/* Updates */}
          <div>
            <h3 className="text-sm font-semibold text-[#1dd1f2] tracking-wider uppercase mb-4">
              Updates
            </h3>
            <ul className="space-y-3">
              <li><Link href="/news" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Space News</Link></li>
              <li><Link href="/missions" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">Missions</Link></li>
              <li><a href="https://nasa.gov" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">NASA</a></li>
              <li><a href="https://isro.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">ISRO</a></li>
              <li><a href="https://esa.int" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#1dd1f2] transition-colors">ESA</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#1dd1f2]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Space Hub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Data provided by NASA, ISRO, ESA, and SpaceX APIs
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-[#1dd1f2] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#1dd1f2] text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;