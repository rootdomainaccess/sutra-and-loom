"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  fabric: string;
  color: string;
  image: string;
  description: string;
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFeatured((data.products || []).slice(0, 4));
        }
      })
      .catch(() => {});
  }, []);

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
            <Link href="/" className="text-[#C7B198] font-semibold">Home</Link>
            <Link href="/shop" className="hover:text-[#C7B198] transition">Shop Collection</Link>
            <Link href="/cart" className="hover:text-[#C7B198] transition flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#DFD3C3]/40 border-b border-[#C7B198]/35 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#DFD3C3] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#596E79] border border-[#C7B198]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Festive 2026 Collection</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#596E79]">
              The Poetry of <br /><span className="italic font-light">Earthy Handlooms</span>
            </h1>
            <p className="text-base sm:text-lg text-[#596E79]/80 max-w-lg font-light leading-relaxed">
              Exquisite handwoven sarees, organic Chanderi dresses, and regal festive lehengas crafted by master artisans across rural India.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link href="/shop" className="px-8 py-4 bg-[#596E79] text-[#F0ECE3] font-medium text-center rounded hover:bg-[#596E79]/90 transition inline-flex items-center gap-2">
                Explore Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" alt="Saree" className="rounded-lg shadow-md object-cover h-72 w-full border border-[#C7B198]/40" />
            <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" alt="Dress" className="rounded-lg shadow-md object-cover h-72 w-full border border-[#C7B198]/40 mt-8" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <h2 className="font-serif text-3xl font-normal mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { name: "Sarees", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
            { name: "Ethnic Dresses", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" },
            { name: "Lehengas", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80" },
            { name: "Kurtis", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" }
          ].map((cat) => (
            <Link key={cat.name} href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group relative rounded-xl overflow-hidden border border-[#C7B198] aspect-[4/5] block">
              <img src={cat.img} alt={cat.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#596E79]/80 to-transparent flex items-end p-6">
                <span className="font-serif text-xl text-[#F0ECE3] font-medium">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full border-t border-[#C7B198]/40">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-serif text-3xl font-normal">Featured Masterpieces</h2>
          <Link href="/shop" className="text-xs uppercase tracking-wider font-bold hover:text-[#C7B198] flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-[#DFD3C3]/50 rounded-xl overflow-hidden border border-[#C7B198]/40 hover:shadow-lg transition flex flex-col group">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-2">
                <div>
                  <span className="text-[11px] text-[#596E79]/70 uppercase tracking-widest">{p.category}</span>
                  <h3 className="font-serif text-lg font-medium text-[#596E79]">{p.name}</h3>
                </div>
                <span className="font-serif text-lg font-bold text-[#596E79]">₹{p.price.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
