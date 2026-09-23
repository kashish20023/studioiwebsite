"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export interface WorkspaceCategory {
  id: string;
  title: string;
  subtitle: string;
  topImg: string;
  bottomImg: string;
}

export const WORKSPACE_CATEGORIES: WorkspaceCategory[] = [
  {
    id: "not-desk",
    title: "NOT DESK",
    subtitle: "Pick your way",
    topImg: "/assets/workspaces/not-desk-top.png",
    bottomImg: "/assets/workspaces/not-desk-bottom.png",
  },
  {
    id: "dedicated-desk",
    title: "DEDICATED DESK",
    subtitle: "Focus. Every day.",
    topImg: "/assets/workspaces/dedicated-desk-top.png",
    bottomImg: "/assets/workspaces/dedicated-desk-bottom.png",
  },
  {
    id: "private-cabin",
    title: "PRIVATE CABIN",
    subtitle: "Your space. Your rules.",
    topImg: "/assets/workspaces/private-cabin-top.png",
    bottomImg: "/assets/workspaces/private-cabin-bottom.png",
  },
  {
    id: "meeting-room",
    title: "MEETING ROOM",
    subtitle: "Collaborate better",
    topImg: "/assets/workspaces/meeting-room-top.png",
    bottomImg: "/assets/workspaces/meeting-room-bottom.png",
  },
  {
    id: "event-space",
    title: "EVENT SPACE",
    subtitle: "For bigger ideas",
    topImg: "/assets/workspaces/event-space-top.png",
    bottomImg: "/assets/workspaces/event-space-bottom.png",
  },
  {
    id: "community",
    title: "COMMUNITY",
    subtitle: "More than work",
    topImg: "/assets/workspaces/community-top.png",
    bottomImg: "/assets/workspaces/community-bottom.png",
  },
];

// Helper to extract translateX in pixels from computed transform
function getTranslateX(el: HTMLElement): number {
  const style = window.getComputedStyle(el);
  const transform = style.transform || (style as unknown as { webkitTransform?: string }).webkitTransform;
  if (!transform || transform === "none") return 0;
  if (transform.startsWith("matrix3d")) {
    const values = transform.slice(9, -1).split(",");
    return parseFloat(values[12]) || 0;
  }
  if (transform.startsWith("matrix")) {
    const values = transform.slice(7, -1).split(",");
    return parseFloat(values[4]) || 0;
  }
  return 0;
}

export default function WorkspaceInfiniteSlider() {
  // Duplicate categories 4 times (24 items) to ensure a seamless infinite track loop
  const infiniteItems = [
    ...WORKSPACE_CATEGORIES,
    ...WORKSPACE_CATEGORIES,
    ...WORKSPACE_CATEGORIES,
    ...WORKSPACE_CATEGORIES,
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const bgTrackRef = useRef<HTMLDivElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Real-time synchronization loop: tracks active category closest to phone center
  useEffect(() => {
    let rafId: number;

    const syncActiveCategory = () => {
      if (
        bgTrackRef.current &&
        phoneContainerRef.current &&
        containerRef.current
      ) {
        const bgTrack = bgTrackRef.current;
        const bgFirstItem = bgTrack.children[0] as HTMLElement | undefined;

        if (bgFirstItem) {
          const bgItemWidth = bgFirstItem.offsetWidth;
          const bgStyle = window.getComputedStyle(bgTrack);
          const bgGap = parseFloat(bgStyle.gap || bgStyle.columnGap) || 12;
          const bgStep = bgItemWidth + bgGap;

          const containerRect = containerRef.current.getBoundingClientRect();
          const phoneRect = phoneContainerRef.current.getBoundingClientRect();
          const phoneCenterX = phoneRect.left + phoneRect.width / 2 - containerRect.left;

          const trackLeft = bgTrack.offsetLeft;
          const txBg = getTranslateX(bgTrack);
          const currentCenterBg0 = trackLeft + txBg + bgItemWidth / 2;

          // Authoritative active category tracking:
          // Which category is closest to the stationary phone center?
          if (bgStep > 0) {
            const rawIndex = Math.round((phoneCenterX - currentCenterBg0) / bgStep);
            const normalizedIndex =
              ((rawIndex % WORKSPACE_CATEGORIES.length) + WORKSPACE_CATEGORIES.length) %
              WORKSPACE_CATEGORIES.length;

            if (normalizedIndex !== activeIndexRef.current) {
              activeIndexRef.current = normalizedIndex;
              setActiveIndex(normalizedIndex);
            }
          }
        }
      }
      rafId = requestAnimationFrame(syncActiveCategory);
    };

    rafId = requestAnimationFrame(syncActiveCategory);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1360px] mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Edge Smooth Gradient Overlay — subtle fade so images bleed naturally */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-white via-white/70 to-transparent z-20 pointer-events-none" />

      {/* Right Edge Smooth Gradient Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-white via-white/70 to-transparent z-20 pointer-events-none" />

      {/* Main Relative Container holding both the background track and stationary Phone Frame */}
      <div className="relative w-full flex items-center justify-center min-h-[500px] sm:min-h-[560px] md:min-h-[620px] pb-10 sm:pb-14">
        {/* Stationary Central Mobile Phone (z-30: ON TOP OF SLIDER TRACK) */}
        {/* translate-y-2.5 sm:translate-y-3 anchors the phone top edge in place while extending downward */}
        <div
          ref={phoneContainerRef}
          className="absolute z-30 pointer-events-none flex flex-col items-center justify-center select-none translate-y-2.5 sm:translate-y-3"
          style={{
            width: "clamp(310px, 25vw, 380px)",
            aspectRatio: "698 / 1124",
          }}
        >
          {/* Inner Screen Aperture Container: accurately clipped to the user frame bezel opening */}
          {/* Measured coordinates for user frame asset (698x1024): left 17.05%, top 5.66%, width 65.62%, height 88.97% */}
          <div
            ref={phoneScreenRef}
            className="absolute overflow-hidden rounded-[30px] sm:rounded-[36px] md:rounded-[42px]"
            style={{
              // left: "17.05%",
              // top: "5.66%",
              // width: "65.62%",
              // height: "88.97%",

              left: "16.05%", top: "2.80%", width: "68.62%", height: "99.97%"
            }}
          >
            {/* Layer 1: Smooth Cross-Fading Active Workspace Image (Single Large Display) */}
            {WORKSPACE_CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`phone-cat-${cat.id}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  aria-hidden={!isActive}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={cat.topImg}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 400px, 600px"
                      className="object-cover object-center select-none"
                      priority
                    />
                  </div>
                </div>
              );
            })}

            {/* Layer 2: Soft White Bottom Gradient Fade inside phone screen */}
            {/* Begins around lower portion of screen and gradually fades toward bottom */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
              style={{
                height: "40%",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.95) 85%, #ffffff 100%)",
              }}
            />
          </div>

          {/* Layer 3: Complete User Phone Frame Asset (Above screen content & gradient) */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <Image
              src="/assets/phone-frame-extended.png"
              alt="Studio i workspace preview frame"
              fill
              sizes="(max-width: 640px) 400px, 600px"
              quality={95}
              className="object-fill select-none pointer-events-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.25)]"
              priority
            />
          </div>

          {/* Layer 4: CTA Button overlapping lower portion of the phone frame */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-16px] sm:bottom-[-20px] z-40 pointer-events-auto whitespace-nowrap">
            <Link
              href="#locations"
              className="inline-flex items-center justify-center bg-black hover:bg-neutral-900 text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm shadow-2xl hover:shadow-[0_20px_35px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 border border-neutral-800"
            >
              Find Your Perfect Workspace
            </Link>
          </div>
        </div>

        {/* Continuous Horizontal Infinite Slider Track (z-10: BEHIND MOBILE FRAME) */}
        <div className="relative z-10 w-full overflow-x-clip py-2 cursor-grab active:cursor-grabbing">
          <div
            ref={bgTrackRef}
            className="animate-infinite-scroll flex gap-2.5 sm:gap-3 md:gap-3.5 items-center px-2"
            style={{
              animationDuration: "36s",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {infiniteItems.map((item, index) => {
              const isCurrentActive = index % WORKSPACE_CATEGORIES.length === activeIndex;

              return (
                <div
                  key={`bg-${item.id}-${index}`}
                  className="flex flex-col items-center shrink-0"
                  style={{
                    width: "clamp(120px, 10.5vw, 140px)",
                  }}
                >
                  {/* Column Images Container (Top & Bottom stacked with square sharp corners) */}
                  <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
                    {/* Top Image: Sharp square corners (border-radius: 0) */}
                    <div className="relative w-full aspect-square rounded-none overflow-hidden shadow-sm bg-neutral-100">
                      <Image
                        src={item.topImg}
                        alt={`${item.title} top view`}
                        fill
                        sizes="(max-width: 640px) 120px, 140px"
                        className="object-cover rounded-none"
                        priority={index < 6}
                      />
                    </div>

                    {/* Bottom Image: Sharp square corners (border-radius: 0) */}
                    <div className="relative w-full aspect-square rounded-none overflow-hidden shadow-sm bg-neutral-100">
                      <Image
                        src={item.bottomImg}
                        alt={`${item.title} bottom view`}
                        fill
                        sizes="(max-width: 640px) 120px, 140px"
                        className="object-cover rounded-none"
                        priority={index < 6}
                      />
                    </div>
                  </div>

                  {/* Text Description below images (outside image pair geometry, no size shifts) */}
                  <div className="mt-3.5 sm:mt-4 text-center px-1">
                    <h3
                      className={`text-[11px] sm:text-xs tracking-wider uppercase transition-colors duration-200 ${isCurrentActive ? "text-neutral-950 font-black" : "text-neutral-800 font-bold"
                        }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[10px] sm:text-[11px] mt-0.5 transition-colors duration-200 ${isCurrentActive ? "text-neutral-800 font-semibold" : "text-neutral-500 font-medium"
                        }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
