"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-8 sm:pt-10 pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Container for Headline & Doodles */}
      <div className="max-w-[1100px] mx-auto text-center relative px-4">
        {/* Left Doodle: Some Space New Possibilities with complete arrow */}
        <div className="hidden lg:block absolute -top-4 left-4 xl:left-8 w-36 xl:w-40 pointer-events-none select-none animate-float">
          <Image
            src="/assets/doodle-left-complete.png"
            alt="Some Space New Possibilities"
            width={160}
            height={125}
            priority
            className="object-contain"
          />
        </div>

        {/* Right Doodle: Work & Connect with complete arrow */}
        <div
          className="hidden lg:block absolute -top-4 right-4 xl:right-8 w-28 xl:w-32 pointer-events-none select-none animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Image
            src="/assets/doodle-right-complete.png"
            alt="Work & Connect"
            width={110}
            height={110}
            priority
            className="object-contain"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-[58px] font-black tracking-tight text-neutral-950 leading-[1.12]">
          A Workspace for{" "}
          <span className="text-[#FF007A]">
            Every You
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3.5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Flexible desks, private cabins, meeting rooms and more — book inspiring coworking spaces
          instantly, anytime, anywhere.
        </p>
      </div>

      {/* Visual Showcase Strip (Central Phone Mockup + Categories) */}
      <div className="relative mt-8 sm:mt-10 max-w-[1180px] mx-auto">
        {/* Main Clean Gallery Strip Image */}
        <div className="relative w-full rounded-2xl overflow-hidden">
          <Image
            src="/assets/hero-gallery-strip-clean.png"
            alt="Studio i Coworking Spaces & App Experience"
            width={2955}
            height={930}
            priority
            className="w-full h-auto object-cover select-none"
          />

          {/* Smooth Bottom Gradient Fade to pure white background */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* CTA Button overlapping the bottom edge of the phone mockup */}
        <div className="relative -mt-10 sm:-mt-12 z-20 flex justify-center">
          <Link
            href="#locations"
            className="inline-flex items-center justify-center bg-black hover:bg-neutral-900 text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[15px] sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-neutral-800"
          >
            Find Your Perfect Workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
