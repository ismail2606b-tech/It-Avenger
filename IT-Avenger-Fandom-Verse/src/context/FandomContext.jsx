import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import categoriesData from '../data/categories.json';
import charactersData from '../data/characters.json';
import eventsData from '../data/events.json';
import articlesData from '../data/articles.json';
import mediaData from '../data/media.json';
import galleriesData from '../data/galleries.json';
import merchandiseData from '../data/merchandise.json';
import releasesData from '../data/releases.json';
import faqChatbotData from '../data/faq_chatbot.json';
import teamData from '../data/team.json';

const FandomContext = createContext(null);

export const FandomProvider = ({ children }) => {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all');
  const [searchTypeFilter, setSearchTypeFilter] = useState('all');

  // Bookmarks (LocalStorage)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('fandomverse_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Session Notes (SessionStorage per SRS requirement)
  const [sessionNotes, setSessionNotes] = useState(() => {
    try {
      const saved = sessionStorage.getItem('fandomverse_session_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Cart State (Temporary cart functionality per SRS)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fandomverse_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Detail Overlays
  const [activeCharacterModal, setActiveCharacterModal] = useState(null);
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [activeLightbox, setActiveLightbox] = useState(null); // { items, currentIndex }
  const [activeAudioTrack, setActiveAudioTrack] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Auth State (Dummy Login/Signup per SRS Page 14)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fandomverse_user');
      return saved ? JSON.parse(saved) : { loggedIn: false, username: 'Fan Traveler', email: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' };
    } catch {
      return { loggedIn: false, username: 'Fan Traveler', email: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' };
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Simulated Visitor Counter (LocalStorage per SRS Page 14)
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = localStorage.getItem('fandomverse_visitor_count');
      const baseCount = stored ? parseInt(stored, 10) : 12480;
      const incremented = baseCount + 1;
      localStorage.setItem('fandomverse_visitor_count', incremented.toString());
      return incremented;
    } catch {
      return 12481;
    }
  });

  // Sync Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fandomverse_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks to LocalStorage', e);
    }
  }, [bookmarks]);

  // Sync Session Notes to SessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('fandomverse_session_notes', JSON.stringify(sessionNotes));
    } catch (e) {
      console.error('Failed to save notes to SessionStorage', e);
    }
  }, [sessionNotes]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fandomverse_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to LocalStorage', e);
    }
  }, [cart]);

  // Sync User to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('fandomverse_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user to LocalStorage', e);
    }
  }, [user]);

  // Navigation Helper
  const navigateTo = (tab, categoryId = null) => {
    setActiveTab(tab);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Breadcrumbs Generator
  const breadcrumbs = useMemo(() => {
    const crumbs = [{ label: 'Home', tab: 'home', categoryId: null }];
    
    if (activeTab === 'home') {
      return crumbs;
    }

    if (activeTab === 'category' && selectedCategory) {
      const cat = categoriesData.find(c => c.id === selectedCategory);
      crumbs.push({ label: cat ? cat.name : 'Category Hub', tab: 'category', categoryId: selectedCategory });
      return crumbs;
    }

    const tabLabels = {
      characters: 'Character Profiles',
      media: 'Trailers & Audio Hub',
      articles: 'Featured Articles',
      events: 'Event Highlights',
      releases: 'Upcoming Releases',
      merchandise: 'Merchandise Showcase',
      contact: 'Contact Us',
      about: 'About Us',
      search: 'Search & Discovery'
    };

    if (tabLabels[activeTab]) {
      crumbs.push({ label: tabLabels[activeTab], tab: activeTab, categoryId: null });
    }

    if (selectedCategory && activeTab !== 'category') {
      const cat = categoriesData.find(c => c.id === selectedCategory);
      if (cat) {
        crumbs.push({ label: cat.name, tab: activeTab, categoryId: selectedCategory });
      }
    }

    return crumbs;
  }, [activeTab, selectedCategory]);

  // Bookmark Management
  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === item.id)) {
        return prev.filter(b => b.id !== item.id);
      } else {
        return [
          {
            id: item.id,
            title: item.name || item.title,
            type: item.type || (item.series ? 'character' : (item.price ? 'merch' : (item.readTime ? 'article' : 'event'))),
            categoryId: item.categoryId || 'fandom',
            image: item.image || item.thumbnail || item.heroImage,
            subtitle: item.series || item.franchise || item.author || item.location || '',
            dateAdded: new Date().toLocaleDateString()
          },
          ...prev
        ];
      }
    });
  };

  const saveSessionNote = (itemId, noteText) => {
    setSessionNotes(prev => {
      const updated = { ...prev };
      if (!noteText || noteText.trim() === '') {
        delete updated[itemId];
      } else {
        updated[itemId] = noteText.trim();
      }
      return updated;
    });
  };

  const exportBookmarks = () => {
    if (bookmarks.length === 0) {
      alert('You have no bookmarks to export yet! Browse and click the bookmark icon on items you love.');
      return;
    }

    let exportContent = `# FandomVerse - Saved Bookmarks & Personal Notes\n`;
    exportContent += `Exported on: ${new Date().toLocaleString()}\n`;
    exportContent += `Total Items: ${bookmarks.length}\n\n`;
    exportContent += `========================================================\n\n`;

    bookmarks.forEach((b, index) => {
      exportContent += `### ${index + 1}. ${b.title}\n`;
      exportContent += `- **Type**: ${b.type.toUpperCase()}\n`;
      exportContent += `- **Category**: ${b.categoryId}\n`;
      if (b.subtitle) exportContent += `- **Details**: ${b.subtitle}\n`;
      exportContent += `- **Bookmarked Date**: ${b.dateAdded}\n`;
      
      const note = sessionNotes[b.id];
      if (note) {
        exportContent += `- **Session Note**: "${note}"\n`;
      }
      exportContent += `\n`;
    });

    const blob = new Blob([exportContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fandomverse_bookmarks_${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Cart Management
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCalculations = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% sales tax simulation
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 7.99; // Free shipping above $50
    const total = subtotal + tax + shipping;
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
      total: total.toFixed(2),
      totalItems
    };
  }, [cart]);

  // Auth Management
  const login = (username, email) => {
    setUser({
      loggedIn: true,
      username: username || 'OtakuElite',
      email: email || 'fan@fandomverse.org',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser({
      loggedIn: false,
      username: 'Fan Traveler',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });
  };

  // Global Search Filtering across all datasets
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results = [];

    // Helper to filter
    const matchesFilter = (itemCat, itemType) => {
      const catMatch = searchCategoryFilter === 'all' || itemCat === searchCategoryFilter;
      const typeMatch = searchTypeFilter === 'all' || itemType === searchTypeFilter;
      return catMatch && typeMatch;
    };

    // 1. Characters
    charactersData.forEach(c => {
      if (matchesFilter(c.categoryId, 'character')) {
        if (
          c.name.toLowerCase().includes(query) ||
          c.series.toLowerCase().includes(query) ||
          c.biography.toLowerCase().includes(query) ||
          c.franchise.toLowerCase().includes(query)
        ) {
          results.push({ ...c, searchResultType: 'Character Profile', resultCategory: c.categoryId });
        }
      }
    });

    // 2. Articles
    articlesData.forEach(a => {
      if (matchesFilter(a.categoryId, 'article')) {
        if (
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some(t => t.toLowerCase().includes(query))
        ) {
          results.push({ ...a, searchResultType: 'Featured Article', resultCategory: a.categoryId });
        }
      }
    });

    // 3. Media (Trailers, Interviews, Podcasts)
    mediaData.forEach(m => {
      if (matchesFilter(m.categoryId, m.type)) {
        if (
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
        ) {
          results.push({ ...m, searchResultType: m.type === 'trailer' ? 'Video Trailer' : (m.type === 'podcast' ? 'Audio Podcast' : 'Media Clip'), resultCategory: m.categoryId });
        }
      }
    });

    // 4. Events
    eventsData.forEach(e => {
      if (matchesFilter(e.categoryId, 'event')) {
        if (
          e.title.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.tags.some(t => t.toLowerCase().includes(query))
        ) {
          results.push({ ...e, searchResultType: 'Event Highlight', resultCategory: e.categoryId });
        }
      }
    });

    // 5. Merchandise
    merchandiseData.forEach(m => {
      if (matchesFilter(m.categoryId, 'merchandise')) {
        if (
          m.name.toLowerCase().includes(query) ||
          m.franchise.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.itemType.toLowerCase().includes(query)
        ) {
          results.push({ ...m, searchResultType: 'Fan Merchandise', resultCategory: m.categoryId });
        }
      }
    });

    // 6. Releases
    releasesData.forEach(r => {
      if (matchesFilter(r.categoryId, 'release')) {
        if (
          r.title.toLowerCase().includes(query) ||
          r.format.toLowerCase().includes(query) ||
          r.studioOrPublisher.toLowerCase().includes(query)
        ) {
          results.push({ ...r, searchResultType: 'Upcoming Release', resultCategory: r.categoryId });
        }
      }
    });

    return results;
  }, [searchQuery, searchCategoryFilter, searchTypeFilter]);

  return (
    <FandomContext.Provider
      value={{
        // Datasets
        categories: categoriesData,
        characters: charactersData,
        events: eventsData,
        articles: articlesData,
        media: mediaData,
        galleries: galleriesData,
        merchandise: merchandiseData,
        releases: releasesData,
        faqChatbot: faqChatbotData,
        teamInfo: teamData,

        // Navigation
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        breadcrumbs,
        navigateTo,

        // Search
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        searchCategoryFilter,
        setSearchCategoryFilter,
        searchTypeFilter,
        setSearchTypeFilter,
        globalSearchResults,

        // Bookmarks & Notes
        bookmarks,
        isBookmarked,
        toggleBookmark,
        sessionNotes,
        saveSessionNote,
        exportBookmarks,
        isBookmarksOpen,
        setIsBookmarksOpen,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCalculations,
        isCartOpen,
        setIsCartOpen,

        // Modals
        activeCharacterModal,
        setActiveCharacterModal,
        activeArticleModal,
        setActiveArticleModal,
        activeVideoModal,
        setActiveVideoModal,
        activeProductModal,
        setActiveProductModal,
        activeLightbox,
        setActiveLightbox,
        activeAudioTrack,
        setActiveAudioTrack,
        isPlayingAudio,
        setIsPlayingAudio,

        // Auth
        user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,

        // Counter
        visitorCount
      }}
    >
      {children}
    </FandomContext.Provider>
  );
};

export const useFandom = () => {
  const context = useContext(FandomContext);
  if (!context) {
    throw new Error('useFandom must be used within a FandomProvider');
  }
  return context;
};
