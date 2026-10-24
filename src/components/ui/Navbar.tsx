"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [companyName, setCompanyName] = useState("Sutra & Loom");
  const [prefix, setPrefix] = useState("SL");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setCompanyName(data.config.companyName);
          setPrefix(data.config.companyPrefix);
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { name: "⚡ Intake Desk", href: "/" },
    { name: "💎 Processed Catalog", href: "/catalog" },
    { name: "⚙️ Categories & Settings", href: "/settings" },
  ];

  return (
    <header className="border-b border-factory-700 bg-factory-800/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center font-bold text-brand-500 text-base shadow-sm shadow-brand-500/10">
            {prefix}
          </div>
          <div>
            <Link href="/" className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              <span>{companyName}</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Asset Engine
              </span>
            </Link>
            <p className="text-[11px] text-slate-400">Immich Intake $\rightarrow$ ERP Sequential Pipeline</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? "bg-brand-500 text-factory-900 shadow-sm shadow-brand-500/20"
                    : "text-slate-300 hover:text-white hover:bg-factory-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
