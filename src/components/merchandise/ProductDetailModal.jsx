import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Check, Info } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ProductDetailModal = () => {
  const { activeProductModal, setActiveProductModal, addToCart } = useFandom();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!activeProductModal) return null;

  const item = activeProductModal;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setActiveProductModal(null);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setActiveProductModal(null)}
    >
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {item.itemType} • {item.categoryId.toUpperCase()}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              item.inStock ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {item.inStock ? 'In Stock' : 'Sold Out'}
            </span>
          </div>

          <button
            onClick={() => setActiveProductModal(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-white/10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-8">
          
          {/* Image */}
          <div className="sm:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 aspect-square shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="sm:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {item.franchise} Official Fan Merch
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {item.name}
              </h2>

              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{item.rating}</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Collector Certified</span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-black text-amber-400">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 ml-2 font-mono">
                  (MSRP: {item.priceDisplay})
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {item.description}
              </p>

              {item.details && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Specifications: </span>
                  {item.details}
                </div>
              )}
            </div>

            {/* Temporary Cart Notice & Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-start space-x-2">
                <Info className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                <span>
                  <strong>Note:</strong> Items added to cart are for temporary calculation only. Checkout and real payments are excluded per specification.
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono">
                  <span className="text-slate-500 font-sans text-[11px]">Qty:</span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 text-slate-300 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!item.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 ${
                    item.inStock
                      ? addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Temporary Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Temporary Cart • ${(item.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
