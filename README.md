# 🌌 Space Hub - Explore the Universe

A modern, interactive website dedicated to space exploration, astronomy, and the latest cosmic discoveries. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**🚀 [View Live Site](https://space-hub-explore.web.app)**

![Space Hub](https://img.shields.io/badge/Space-Hub-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 🏠 **Home Page**
- **Hero Section**: Stunning space-themed design with navigation buttons
- **Featured Facts**: Mind-blowing space facts and statistics
- **Latest News**: Highlights of recent space discoveries
- **Interactive Navigation**: Quick access to all sections

### 🪐 **Planets Section**
- **Interactive Planet Cards**: Detailed information about all 8 planets
- **Planetary Data**: Mass, radius, distance from Sun, moons, and more
- **3D Hover Effects**: Planet rotation animations
- **Modal Details**: In-depth planetary information

### ⭐ **Stars Section**
- **Star Types**: From our Sun to neutron stars and supernovas
- **Stellar Evolution**: Learn how stars are born, live, and die
- **Fun Facts**: Amazing statistics about cosmic powerhouses
- **Interactive Cards**: Hover effects and detailed information

### 🌌 **Galaxies Section**
- **Galaxy Showcase**: Milky Way, Andromeda, Sombrero, and Whirlpool
- **Comparison Charts**: Side-by-side galaxy statistics
- **Galaxy Types**: Spiral, elliptical, and irregular galaxies
- **Local Group**: Our cosmic neighborhood

### 🌈 **Nebulae Section**
- **NASA Images**: High-resolution nebula photographs
- **Nebula Types**: Emission, reflection, planetary, and dark nebulae
- **Star Formation**: How cosmic clouds create new stars
- **Interactive Gallery**: Beautiful space imagery

### 🕳️ **Black Holes Section**
- **Famous Black Holes**: Sagittarius A*, M87*, and Cygnus X-1
- **Physics Explained**: Event horizons, singularities, and spacetime
- **Latest Discoveries**: Event Horizon Telescope images
- **Types**: From stellar to supermassive black holes

### 📡 **Space News**
- **Live Updates**: Latest news from NASA, SpaceX, ISRO, and ESA
- **API Integration**: Real-time data from space agencies
- **Search & Filter**: Find news by agency or keywords
- **Breaking News**: Featured stories and updates

### 🚀 **Missions Section**
- **Current Missions**: Active space missions and their status
- **Launch Schedule**: Upcoming launches and mission timelines
- **Mission Details**: Objectives, crew, vehicles, and budgets
- **Multi-Agency**: NASA, SpaceX, ISRO, ESA, and CNSA missions

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 16.0.3 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom space theme
- **Animations**: CSS animations and React transitions
- **APIs**: 
  - Spaceflight News API
  - SpaceX API
  - NASA RSS feeds
- **Deployment**: Optimized for Vercel

## 🎨 Design Features

- **Dark Space Theme**: Custom color palette with neon accents
- **Animated Background**: Moving starfield with twinkling stars
- **Responsive Design**: Works on all devices and screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Typography**: Modern fonts with space-themed styling
- **Accessibility**: Semantic HTML and keyboard navigation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/space-hub.git
   cd space-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 API Integration

### Space News API
The website integrates with the Spaceflight News API to fetch the latest space news:
```typescript
// Example API call
const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles');
```

### SpaceX API
Live launch data from SpaceX:
```typescript
// Example API call
const response = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
```

### Fallback Data
When APIs are unavailable, the site uses curated fallback data to ensure content is always available.

## 📱 Pages Structure

```
/                 # Home page with hero and featured content
/planets          # Interactive planet explorer
/stars            # Star types and stellar evolution
/galaxies         # Galaxy showcase and comparisons
/nebulae          # NASA nebula image gallery
/black-holes      # Black hole physics and discoveries
/news             # Latest space news and updates
/missions         # Current and upcoming space missions
```

## 🎯 Key Components

- **Navbar**: Fixed navigation with active states
- **Footer**: Links and space agency information
- **Card**: Reusable component with glow effects
- **Button**: Styled buttons with variants
- **StarField**: Animated background component
- **LoadingSpinner**: Loading states for API calls

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

For other platforms:
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for API keys:
```env
NEXT_PUBLIC_SPACEFLIGHT_NEWS_API=your_api_key_here
NEXT_PUBLIC_NASA_API_KEY=your_nasa_key_here
```

### Tailwind CSS
Custom space theme configuration in `globals.css`:
- Primary colors: Space dark (#040b1e), Neon blue (#1dd1f2), Purple glow (#8a2be2)
- Animations: Twinkle, rotate, pulse-glow, float effects
- Custom utilities: Star field, glow text, neon borders

## 📊 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components load on demand
- **Caching**: API response caching for better performance
- **SEO Optimized**: Meta tags and semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA**: For incredible space imagery and data
- **SpaceX**: For launch information and mission details
- **ESA, ISRO, CNSA**: For international space mission data
- **Spaceflight News API**: For real-time space news
- **Vercel**: For hosting and deployment platform

---

## 🌟 Features Showcase

### Interactive Elements
- Planet cards with rotation animations
- Hover effects on all interactive elements
- Smooth page transitions
- Responsive mobile design

### Data Integration
- Real-time space news updates
- Live mission tracking
- API fallback systems
- Cached data for performance

### Visual Design
- Custom space color palette
- Animated starfield background
- Glowing text effects
- Modern card layouts

**Made with ❤️ for space enthusiasts everywhere**

*Explore the universe, one click at a time* 🚀
