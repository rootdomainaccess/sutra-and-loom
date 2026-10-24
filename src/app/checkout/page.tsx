"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";

export default function CheckoutPage() {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("sutra_cart") || "[]");
    const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.qty), 0);
    setSubtotal(total);
  }, []);

  const handleConfirmOrder = () => {
    setOrderPlaced(true);
    localStorage.removeItem("sutra_cart");
  };

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
        </div>
      </header>

      {/* Checkout Container */}
      <main className="max-w-xl mx-auto px-4 py-16 flex-grow w-full">
        <Link href="/cart" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold mb-8 hover:text-[#C7B198]">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        {orderPlaced ? (
          <div className="bg-[#DFD3C3]/50 p-8 rounded-2xl border border-[#C7B198] text-center space-y-6">
            <div className="w-16 h-16 bg-[#596E79] text-[#F0ECE3] rounded-full flex items-center justify-center mx-auto text-2xl font-serif">✓</div>
            <h1 className="font-serif text-3xl font-normal">Order Placed Successfully!</h1>
            <p className="text-sm text-[#596E79]/80 leading-relaxed">
              Thank you for supporting traditional Indian handlooms. Our artisan dispatch team has received your order and will confirm via WhatsApp within 24 hours.
            </p>
            <Link href="/shop" className="inline-block px-8 py-4 bg-[#596E79] text-[#F0ECE3] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#596E79]/90 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-[#DFD3C3]/50 p-8 rounded-2xl border border-[#C7B198] text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#DFD3C3] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#596E79] border border-[#C7B198]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#596E79]" />
              <span>Zero-Setup Fee Direct UPI</span>
            </div>
            <h1 className="font-serif text-3xl font-normal">Scan & Pay via Any UPI App</h1>
            <p className="text-xs text-[#596E79]/80">Google Pay, PhonePe, Paytm, BHIM, or any UPI enabled banking app.</p>
            
            <div className="bg-white p-4 inline-block rounded-xl border border-[#C7B198] shadow-inner my-2">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=sutraandloom@oksbi&pn=SutraAndLoom&am=${subtotal || 9999}&cu=INR`} alt="UPI QR Code" className="w-44 h-44 mx-auto" />
            </div>
            
            <div className="bg-[#DFD3C3] p-3 rounded-lg text-xs font-mono text-[#596E79] border border-[#C7B198]/50">
              VPA: <span className="font-bold">sutraandloom@oksbi</span><br />
              Total Amount: <span className="font-bold text-sm">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-2 flex flex-col space-y-3">
              <button onClick={handleConfirmOrder} className="w-full py-4 bg-[#596E79] text-[#F0ECE3] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#596E79]/90 transition">
                I Have Completed the Payment
              </button>
              <a href={`https://wa.me/919876543210?text=Hello%20Sutra%20and%20Loom,%20I%20have%20completed%20my%20UPI%20payment%20of%20₹${subtotal}.`} target="_blank" className="w-full py-3.5 bg-[#DFD3C3] border border-[#C7B198] text-[#596E79] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#C7B198] hover:text-white transition text-center block">
                Send Payment Screenshot on WhatsApp
              </a>
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
