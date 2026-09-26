import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const ShoppingCartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartCalculations 
  } = useFandom();

  const [checkoutSimulated, setCheckoutSimulated] = useState(false);

  if (!isCartOpen) return null;

  const handleSimulateCheckout = () => {
    setCheckoutSimulated(true);
    setTimeout(() => {
      setCheckoutSimulated(false);
      clearCart();
      setIsCartOpen(false);
    }, 3500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="w-full max-w-md h-full bg-slate-950 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Temporary Shopping Cart
              </h3>
              <p className="text-[11px] text-slate-400">
                {cartCalculations.totalItems} items in your basket
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
            aria-label="Close Shopping Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory SRS Notice */}
        <div className="mx-5 mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Fandom Cart</strong>
          </p>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutSimulated ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Demo Calculation Verified!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Total amount was calculated at <strong>${cartCalculations.total}</strong> using client-side JavaScript. Cart will now reset for future demonstrations.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-slate-600 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our Merchandise Showcase to add shirts, collector figures, plushies, and lightsticks!
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div 
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 flex space-x-3 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-950"
                />

                <div className="flex-1 truncate space-y-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-amber-400 font-mono font-semibold">
                    ${item.price.toFixed(2)} ea
                  </p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-2 pt-1">
                    <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-lg bg-slate-950 border border-white/10 text-xs font-mono">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-white text-[11px]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-4 h-4 flex items-center justify-center rounded text-slate-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-[11px] font-bold text-slate-300 font-mono">
                      = ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {cart.length > 0 && !checkoutSimulated && (
          <div className="p-5 border-t border-white/10 bg-slate-900/90 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">${cartCalculations.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Tax (8%):</span>
                <span className="font-mono text-white">${cartCalculations.tax}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Shipping:</span>
                <span className="font-mono text-emerald-400">{cartCalculations.shipping}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Total Billing Amount:</span>
                <span className="text-amber-400 font-mono text-base">${cartCalculations.total}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={clearCart}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Clear
              </button>

              <button
                onClick={handleSimulateCheckout}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>Simulate Demo Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
