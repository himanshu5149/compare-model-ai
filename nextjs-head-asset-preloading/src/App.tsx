import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LabsTicker from './components/LabsTicker';
import LiveStats from './components/LiveStats';
import ModelSpotlight from './components/ModelSpotlight';
import LeaderboardSection from './components/LeaderboardSection';
import ModelComparison from './components/ModelComparison';
import QuickVote from './components/QuickVote';
import Testimonials from './components/Testimonials';
import BenchmarkCTA from './components/BenchmarkCTA';
import ResourcesSection from './components/ResourcesSection';
import FAQ from './components/FAQ';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <ParticleBackground />
      <ScrollProgress />
      <ThemeToggle />
      <Navbar />
      <HeroSection />
      <LabsTicker />
      <LiveStats />
      <ModelSpotlight />
      <LeaderboardSection />
      <ModelComparison />
      <QuickVote />
      <Testimonials />
      <BenchmarkCTA />
      <ResourcesSection />
      <FAQ />
      <NewsletterSection />
      <Footer />
      <BackToTop />
    </div>
  );
}
