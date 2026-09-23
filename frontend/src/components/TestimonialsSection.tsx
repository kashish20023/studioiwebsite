"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { InstagramIcon, LinkedinIcon, FacebookIcon, XTwitterIcon } from "./SocialIcons";

export default function TestimonialsSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      title: "Follow us on Social Media",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914",
      author: "Rahul Singh",
      role: "CEO of TPL",
      avatar: "/assets/avatar-rahul.jpg",
    },
    {
      id: 2,
      title: "Follow us on Social Media",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914",
      author: "Rahul Singh",
      role: "CEO of TPL",
      avatar: "/assets/avatar-rahul.jpg",
    },
    {
      id: 3,
      title: "Follow us on Social Media",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914",
      author: "Rahul Singh",
      role: "CEO of TPL",
      avatar: "/assets/avatar-rahul.jpg",
    },
    {
      id: 4,
      title: "Follow us on Social Media",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914",
      author: "Rahul Singh",
      role: "CEO of TPL",
      avatar: "/assets/avatar-rahul.jpg",
    },
  ];

  const leftCards = testimonials.slice(0, 2);
  const rightCards = testimonials.slice(2, 4);

  return (
    <section id="experience" className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1180px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="text-[#FF007A] font-semibold text-sm tracking-widest uppercase block mb-1">
          Our Testimonial
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
          See what our <br className="hidden sm:inline" />
          <span className="text-[#FF007A]">Users are saying</span>
        </h2>
      </div>

      {/* 3-Column Layout: Left (2 cards) | Center Reel (1 video card) | Right (2 cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 2 Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {leftCards.map((card) => (
            <TestimonialCard key={card.id} card={card} />
          ))}
        </div>

        {/* Center Video Reel Card */}
        <div className="lg:col-span-4 flex justify-center order-first lg:order-none">
          <div className="relative w-full max-w-[280px] sm:max-w-[300px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,0,122,0.15)] group cursor-pointer">
            {/* Native Card Image matching PDF */}
            <Image
              src="/assets/testimonial-reel-card.png"
              alt="Rahul Singh Studio i Video Story"
              width={750}
              height={1260}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Interactive Hotspot for Play Button */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full focus:outline-none focus:ring-4 focus:ring-[#FF007A]/40 transition-transform group-hover:scale-110 active:scale-95"
              aria-label="Play Member Video Story"
            />

            {/* Interactive Hotspot for Follow on Social Media Button */}
            <button
              type="button"
              onClick={() => setIsSocialModalOpen(true)}
              className="absolute bottom-[6%] inset-x-8 h-12 rounded-full focus:outline-none focus:ring-4 focus:ring-white/50 transition-transform hover:scale-[1.02] active:scale-95"
              aria-label="Follow us on Social Media"
            />
          </div>
        </div>

        {/* Right 2 Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {rightCards.map((card) => (
            <TestimonialCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Video Reel Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-neutral-800 text-white shadow-2xl text-center">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-[#FF007A]/20 text-[#FF007A] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-10 h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black tracking-tight">Studio i Member Stories</h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
              Watch Rahul Singh (CEO of TPL) and over 500+ founders explain why Studio i is Jaipur&apos;s most inspiring workspace ecosystem.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#FF007A] hover:bg-[#E0006C] text-white font-bold text-sm shadow-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Links Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-neutral-800 text-white shadow-2xl text-center">
            <button
              type="button"
              onClick={() => setIsSocialModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black tracking-tight">Join Our Community</h3>
            <p className="text-sm text-neutral-400 mt-2">
              Follow Studio i on your favorite platform for events, networking and campus updates:
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-[#FF007A] transition-all text-sm font-semibold group"
              >
                <span className="flex items-center gap-3">
                  <InstagramIcon className="w-5 h-5" /> Instagram
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-white">@studioi_cowork</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-[#FF007A] transition-all text-sm font-semibold group"
              >
                <span className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5" /> LinkedIn
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-white">Studio i Workspaces</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-[#FF007A] transition-all text-sm font-semibold group"
              >
                <span className="flex items-center gap-3">
                  <FacebookIcon className="w-5 h-5" /> Facebook
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-white">Studio i Community</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-5 py-3 rounded-2xl bg-neutral-900 hover:bg-[#FF007A] transition-all text-sm font-semibold group"
              >
                <span className="flex items-center gap-3">
                  <XTwitterIcon className="w-5 h-5" /> X (Twitter)
                </span>
                <span className="text-xs text-neutral-400 group-hover:text-white">@studioi_hq</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TestimonialCard({
  card,
}: {
  card: {
    id: number;
    title: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        <h4 className="text-base font-bold text-neutral-900 mb-2.5">
          {card.title}
        </h4>
        <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
          {card.quote}
        </p>
      </div>

      {/* Author Pill */}
      <div className="mt-5 inline-flex items-center justify-between bg-[#FF007A] text-white rounded-full pl-5 pr-1.5 py-1.5 shadow-sm max-w-xs">
        <span className="text-xs font-semibold tracking-wide">
          {card.author}, {card.role}
        </span>
        <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/90 shrink-0 ml-3 relative">
          <Image
            src={card.avatar}
            alt={card.author}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
