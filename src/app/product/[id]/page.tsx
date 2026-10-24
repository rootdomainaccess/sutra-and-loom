"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, ShieldCheck, ArrowLeft, MessageCircle } from "lucide-react";

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

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const found = (data.products || []).find((p: Product) => p.id === id);
            setProduct(found || null);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const existingCart = JSON.parse(localStorage.getItem("sutra_cart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === product.id);
    if (existingIndex > -1) {
      existingCart[existingIndex].qty += 1;
    } else {
      existingCart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("sutra_cart", JSON.stringify(existingCart));
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F0ECE3] flex items-center justify-center text-lg">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F0ECE3] flex flex-col items-center justify-center space-y-4">
        <h1 className="font-serif text-2xl">Product not found</h1>
        <Link href="/shop" className="px-6 py-3 bg-[#596E79] text-[#F0ECE3] rounded text-xs uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

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
            <Link href="/cart" className="hover:text-[#C7B198] transition flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" /> Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Product Detail Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold mb-8 hover:text-[#C7B198]">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-[#DFD3C3]/40 p-8 rounded-2xl border border-[#C7B198]">
          <div>
            <img src={product.image} alt={product.name} className="rounded-xl object-cover w-full h-[500px] border border-[#C7B198]" />
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#DFD3C3] border border-[#C7B198] rounded text-[#596E79] font-semibold">
                {product.category} &bull; {product.fabric}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#596E79] mt-3">{product.name}</h1>
            </div>

            <p className="font-serif text-3xl font-bold text-[#596E79]">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="text-sm text-[#596E79]/80 leading-relaxed">{product.description}</p>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider">Select Size:</label>
              <div className="flex space-x-3">
                {["S", "M", "L", "XL", "Custom Fit"].map((size) => (
                  <button key={size} className="px-4 py-2 border border-[#C7B198] bg-[#F0ECE3] text-xs font-bold rounded hover:bg-[#596E79] hover:text-[#F0ECE3] transition">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button onClick={handleAddToCart} className="flex-1 py-4 bg-[#596E79] text-[#F0ECE3] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#596E79]/90 transition text-center">
                Add to Shopping Bag
              </button>
              <a 
                href={`https://wa.me/919876543210?text=Hello%20Sutra%20and%20Loom,%20I%20want%20to%20buy%20${encodeURIComponent(product.name)}%2520(₹${product.price})`} 
                target="_blank" 
                className="flex-1 py-4 bg-[#DFD3C3] border border-[#C7B198] text-[#596E79] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C7B198] hover:text-white transition text-center flex items-center justify-center gap-2"
              >
                Buy via WhatsApp
              </a>
            </div>

            {addedMessage && (
              <div className="p-3 bg-[#596E79] text-[#F0ECE3] text-xs rounded text-center font-medium animate-pulse">
                Successfully added to your shopping bag! <Link href="/cart" className="underline font-bold ml-1">View Cart</Link>
              </div>
            )}
          </div>
        </div>
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
