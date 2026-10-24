"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, Search, Sparkles, MessageCircle } from "lucide-react";

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

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts(currentCategory, search);
  }, [currentCategory]);

  const fetchProducts = async (cat: string, query: string) => {
    setLoading(true);
    try {
      let url = "/api/products?";
      if (cat !== "All") url += `category=${encodeURIComponent(cat)}&`;
      if (query) url += `search=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(currentCategory, search);
  };

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
            <Link href="/" className="hover:text-[#8C7A6B] transition">Home</Link>
            <Link href="/shop" className="text-[#8C7A6B] font-semibold">Shop Collection</Link>
            <Link href="/cart" className="hover:text-[#8C7A6B] transition flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#D8D2C4]/40 pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold">Store Catalog</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal mt-1">Dress Pieces & Traditional Dresses</h1>
          </div>
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search fabric, name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#F2EFE9] px-4 py-2.5 text-xs rounded-l border border-[#D8D2C4] focus:outline-none w-full md:w-64" 
            />
            <button type="submit" className="bg-[#2C3E50] text-[#FAF9F5] px-4 py-2.5 text-xs rounded-r font-medium hover:bg-[#2C3E50]/90">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["All", "Dress Pieces", "Dress"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCurrentCategory(cat)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full border border-[#D8D2C4] transition ${
                currentCategory === cat ? "bg-[#2C3E50] text-[#FAF9F5]" : "bg-[#F2EFE9] text-[#2C3E50] hover:bg-[#D8D2C4] hover:text-[#2C3E50]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-24 text-lg">Loading collection...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <p className="text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="bg-[#F2EFE9] rounded-xl overflow-hidden border border-[#D8D2C4]/60 hover:shadow-md transition flex flex-col group">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700" />
                  <span className="absolute top-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-xs text-[#2C3E50] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#D8D2C4]">
                    {p.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-[#8C7A6B] uppercase tracking-widest">{p.fabric}</span>
                    <h3 className="font-serif text-xl font-medium text-[#2C3E50] group-hover:text-[#8C7A6B] transition mt-1 leading-snug">
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#D8D2C4]/40">
                    <span className="font-serif text-xl font-bold text-[#2C3E50]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="px-4 py-2 bg-[#2C3E50] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
