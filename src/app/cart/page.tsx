"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  qty: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sutra_cart") || "[]");
    setCart(stored);
  }, []);

  const updateCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("sutra_cart", JSON.stringify(updated));
  };

  const adjustQty = (id: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="bg-[#F0ECE3] text-[#596E79] min-h-screen flex flex-col font-sans selection:bg-[#C7B198] selection:text-white">
      {/* Top Bar */}
      <div className="bg-[#596E79] text-[#F0ECE3] text-xs py-2 px-4 text-center font-medium tracking-widest uppercase">
        Complimentary Worldwide Shipping on Orders Above ₹10,000 | Handcrafted Artisan Weaves
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F0ECE3]/90 backdrop-blur-md border-b border-[#C7B198]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#596E79]">
            SUTRA & LOOM
          </Link>
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link href="/" className="hover:text-[#C7B198] transition">Home</Link>
            <Link href="/shop" className="hover:text-[#C7B198] transition">Shop Collection</Link>
            <Link href="/cart" className="text-[#C7B198] font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Cart Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <h1 className="font-serif text-3xl font-normal mb-8 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7" /> Your Shopping Bag
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#DFD3C3]/30 rounded-2xl border border-[#C7B198] space-y-4">
            <p className="text-lg text-[#596E79]/80">Your shopping bag is currently empty.</p>
            <Link href="/shop" className="inline-block px-8 py-4 bg-[#596E79] text-[#F0ECE3] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#596E79]/90 transition">
              Explore Handlooms
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-[#DFD3C3]/40 p-4 rounded-xl border border-[#C7B198]">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded border border-[#C7B198]" />
                  <div className="flex-grow">
                    <span className="text-[10px] uppercase tracking-widest text-[#596E79]/70">{item.category}</span>
                    <h3 className="font-serif text-base font-medium text-[#596E79]">{item.name}</h3>
                    <p className="text-xs font-bold text-[#596E79] mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center space-x-3 mt-3">
                      <button onClick={() => adjustQty(item.id, -1)} className="w-7 h-7 bg-[#F0ECE3] border border-[#C7B198] rounded text-xs flex items-center justify-center font-bold">-</button>
                      <span className="text-xs font-bold">{item.qty}</span>
                      <button onClick={() => adjustQty(item.id, 1)} className="w-7 h-7 bg-[#F0ECE3] border border-[#C7B198] rounded text-xs flex items-center justify-center font-bold">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-[#596E79]/60 hover:text-red-600 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#DFD3C3]/60 p-6 rounded-2xl border border-[#C7B198] space-y-6 h-fit">
              <h3 className="font-serif text-xl font-medium border-b border-[#C7B198]/40 pb-3">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-emerald-700 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold border-t border-[#C7B198]/40 pt-3">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <Link href="/checkout" className="w-full py-4 bg-[#596E79] text-[#F0ECE3] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#596E79]/90 transition text-center block shadow-sm">
                Proceed to Secure UPI Checkout
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <a href="https://wa.me/919876543210" target="_blank" className="flex items-center space-x-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20ba5c] transition transform hover:scale-105">
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
