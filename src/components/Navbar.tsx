"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Service", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Horizon Tower, Jaipur", href: "#locations" },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 w-full max-w-[1180px] mx-auto">
      <nav className="bg-black text-white rounded-full px-6 sm:px-10 py-3 sm:py-3.5 flex items-center justify-between shadow-2xl backdrop-blur-md border border-neutral-800 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group shrink-0">
          <div className="relative h-7 w-28 sm:h-8 sm:w-32 flex items-center">
            <Image
              src="/assets/logo-studioi.png"
              alt="Studio i"
              width={128}
              height={32}
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[14px] sm:text-[15px] font-medium tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-neutral-200 hover:text-white transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF007A] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-black/95 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 text-white shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium py-2 px-3 rounded-lg hover:bg-neutral-900 hover:text-[#FF007A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-3">
            <Link
              href="#search-bar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#FF007A] text-white font-semibold text-sm hover:bg-[#E0006C] transition-colors"
            >
              Book a Tour
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
