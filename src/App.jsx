import React from 'react';
import { useFandom } from './context/FandomContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Breadcrumbs } from './components/layout/Breadcrumbs';

// Pages & Main Sections
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { CategoryHub } from './components/category/CategoryHub';
import { CharacterProfiles } from './components/characters/CharacterProfiles';
import { MediaHub } from './components/media/MediaHub';
import { ArticlesSection } from './components/articles/ArticlesSection';
import { EventHighlights } from './components/events/EventHighlights';
import { ReleaseRadar } from './components/releases/ReleaseRadar';
import { MerchandiseShowcase } from './components/merchandise/MerchandiseShowcase';
import { ContactUs } from './components/contact/ContactUs';
import { AboutUs } from './components/contact/AboutUs';

// Modals, Drawers & Overlays
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { CharacterDetailModal } from './components/characters/CharacterDetailModal';
import { ArticleDetailModal } from './components/articles/ArticleDetailModal';
import { VideoModal } from './components/media/VideoModal';
import { ProductDetailModal } from './components/merchandise/ProductDetailModal';
import { LightboxModal } from './components/gallery/LightboxModal';
import { ShoppingCartDrawer } from './components/merchandise/ShoppingCartDrawer';
import { BookmarksDrawer } from './components/bookmarks/BookmarksDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { FandomChatbot } from './components/chatbot/FandomChatbot';
import { AudioPlayer } from './components/media/AudioPlayer';
import Callaction from './components/layout/Callaction';

export function App() {
  const { activeTab } = useFandom();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#030303] via-[#160812] to-[#db2777] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation (SRS Page 14) */}
      <Breadcrumbs />

      {/* Main Dynamic View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <HeroBanner />
            <CategoryGrid />
            {/* Quick Teasers on Home */}
            <div className="pt-8">
              <CharacterProfiles />
            </div>
            <div className="pt-8">
              <MediaHub />
            </div>
          </div>
        )}

        {activeTab === 'category' &&  <CategoryHub /> }
        {activeTab === 'characters' && <CharacterProfiles />}
        {activeTab === 'media' && <MediaHub />}
        {activeTab === 'articles' && <ArticlesSection />}
        {activeTab === 'events' && <EventHighlights />}
        {activeTab === 'releases' && <ReleaseRadar />}
        {activeTab === 'merchandise' && <MerchandiseShowcase />}
        {activeTab === 'contact' && <ContactUs />}
        {activeTab === 'about' && <AboutUs />}
        <Callaction/>
      </main>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <CharacterDetailModal />
      <ArticleDetailModal />
      <VideoModal />
      <ProductDetailModal />
      <LightboxModal />
      <ShoppingCartDrawer />
      <BookmarksDrawer />
      <AuthModal />
      
      {/* Floating AI Chatbot on all pages (SRS Page 8 & 12) */}
      <FandomChatbot />

      {/* Persistent Audio Podcast Player */}
      <AudioPlayer />

      {/* Footer with Aptech Limited copyright & TechWiz 7 metadata */}
      <Footer />
    </div>
  );
}

export default App;
