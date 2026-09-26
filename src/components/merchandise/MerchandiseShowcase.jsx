import React, { useState, useMemo } from 'react';
import { ShoppingBag, Star, ShoppingCart, Filter, Sparkles, Check, Info } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const MerchandiseShowcase = () => {
  const { 
    merchandise, 
    categories, 
    addToCart, 
    setActiveProductModal, 
    setIsCartOpen 
  } = useFandom();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'Apparel', 'Figure', 'Collectible', 'Plushie', 'Accessory'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMerch = useMemo(() => {
    return merchandise.filter(item => {
      const matchCat = categoryFilter === 'all' || item.categoryId === categoryFilter;
      const matchType = typeFilter === 'all' || item.itemType === typeFilter;
      const matchSearch = !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.franchise.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchType && matchSearch;
    });
  }, [merchandise, categoryFilter, typeFilter, searchTerm]);

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Fan Collectibles & Apparel Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Merchandise Showcase
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Browse officially licensed t-shirts, scale statues, prop replicas, plushies, and K-Pop lightsticks with temporary cart calculation.
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-colors shrink-0"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>View Temporary Cart</span>
        </button>
      </div>

      {/* Mandatory SRS Disclaimer Note */}
      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center space-x-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="leading-relaxed">
          <strong>SRS Page 12 Notice:</strong> This merchandise showcase includes temporary cart functionality, allowing visitors to add items and view the total calculated via JavaScript. Checkout, payment, and actual purchases are not included.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        
        {/* Category Filter */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Universe Category:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All 7 Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Item Type Filter */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Product Category:
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Item Types</option>
            <option value="Apparel">Apparel & T-Shirts</option>
            <option value="Figure">Scale Figures & Statues</option>
            <option value="Collectible">Collectibles & Replicas</option>
            <option value="Plushie">Plushies</option>
            <option value="Accessory">Accessories & Lightsticks</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Search Merchandise:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shirts, figures, franchise..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMerch.map(item => (
          <div
            key={item.id}
            onClick={() => setActiveProductModal(item)}
            className="group relative rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-500/40 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

              <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {item.itemType}
                </span>
                
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  item.inStock ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                }`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{item.rating}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {item.franchise}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3 bg-slate-950/90 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Add to Cart button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-base font-black text-amber-400">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.priceDisplay}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                  }}
                  disabled={!item.inStock}
                  className={`p-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md ${
                    item.inStock
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                  title={item.inStock ? "Add to Temporary Cart" : "Item is Out of Stock"}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
