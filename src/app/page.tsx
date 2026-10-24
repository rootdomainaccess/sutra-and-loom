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
    <div className="bg-[#FAF9F5] text-[#2C3E50] min-h-screen flex flex-col font-sans selection:bg-[#D8D2C4] selection:text-[#2C3E50]">
      {/* Top Bar */}
      <div className="bg-[#2C3E50] text-[#FAF9F5] text-xs py-2 px-4 text-center font-medium tracking-widest uppercase">
        Complimentary Worldwide Shipping on Orders Above ₹10,000 | Handcrafted Artisan Weaves
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#D8D2C4]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#2C3E50]">
            SUTRA & LOOM
          </Link>
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link href="/" className="text-[#8C7A6B] font-semibold">Home</Link>
            <Link href="/shop" className="hover:text-[#8C7A6B] transition">Shop Collection</Link>
            <Link href="/cart" className="hover:text-[#8C7A6B] transition flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#F2EFE9] border-b border-[#D8D2C4]/50 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#FAF9F5] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#2C3E50] border border-[#D8D2C4]">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <span>Autumn / Festive 2026 Collection</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#2C3E50]">
              The Poetry of <br /><span className="italic font-light text-[#5A6E7F]">Earthy Handlooms</span>
            </h1>
            <p className="text-base sm:text-lg text-[#2C3E50]/80 max-w-lg font-light leading-relaxed">
              Exquisite dress pieces for bespoke stitching and regal traditional dresses crafted by master artisans across rural India.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link href="/shop" className="px-8 py-4 bg-[#2C3E50] text-[#FAF9F5] font-medium text-center rounded hover:bg-[#2C3E50]/90 transition inline-flex items-center gap-2 shadow-sm">
                Explore Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" alt="Dress Piece" className="rounded-xl shadow-md object-cover h-72 w-full border border-[#D8D2C4]" />
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80" alt="Traditional Dress" className="rounded-xl shadow-md object-cover h-72 w-full border border-[#D8D2C4] mt-8" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <h2 className="font-serif text-3xl font-normal mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            { name: "Dress Piece", subtitle: "Unstitched Fabric Sets for Custom Tailoring", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80" },
            { name: "Traditional Dresses", subtitle: "Ready-to-Wear Ethnic Masterpieces", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80" }
          ].map((cat) => (
            <Link key={cat.name} href={`/shop?category=${encodeURIComponent(cat.name)}`} className="group relative rounded-2xl overflow-hidden border border-[#D8D2C4] aspect-[16/10] block shadow-sm hover:shadow-md transition">
              <img src={cat.img} alt={cat.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/90 via-[#2C3E50]/30 to-transparent flex flex-col justify-end p-8">
                <span className="font-serif text-2xl text-[#FAF9F5] font-medium">{cat.name}</span>
                <span className="text-xs text-[#FAF9F5]/80 uppercase tracking-widest mt-1">{cat.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full border-t border-[#D8D2C4]/40">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold">Handpicked</span>
            <h2 className="font-serif text-3xl font-normal mt-1">Featured Masterpieces</h2>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-wider font-bold hover:text-[#8C7A6B] flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-[#F2EFE9] rounded-xl overflow-hidden border border-[#D8D2C4]/60 hover:shadow-md transition flex flex-col group">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700" />
                <span className="absolute top-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-xs text-[#2C3E50] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#D8D2C4]">
                  {p.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-2">
                <div>
                  <span className="text-[11px] text-[#8C7A6B] uppercase tracking-widest">{p.fabric}</span>
                  <h3 className="font-serif text-lg font-medium text-[#2C3E50] mt-1">{p.name}</h3>
                </div>
                <span className="font-serif text-lg font-bold text-[#2C3E50]">₹{p.price.toLocaleString('en-IN')}</span>
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
