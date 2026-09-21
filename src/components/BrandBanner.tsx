"use client";

import React from "react";
import Image from "next/image";

export default function BrandBanner() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 max-w-[1180px] mx-auto">
      <div className="relative w-full flex justify-center">
        <Image
          src="/assets/banner-strip-clean.png"
          alt="Studio i - Your Space. Your Work. Your Way."
          width={2718}
          height={171}
          priority
          className="w-full h-auto object-contain select-none"
        />
      </div>
    </section>
  );
}
