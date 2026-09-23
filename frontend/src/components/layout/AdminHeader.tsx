'use client';

import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Search } from 'lucide-react';
import { getStoredUser } from '@/lib/api';

export default function AdminHeader() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
  }, []);

  const initial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A';

  return (
    <header className="h-20 bg-white border-b border-neutral-200/80 flex items-center justify-between px-6 sm:px-8 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF007A] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
          Studio i Admin Console
        </span>
        <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
          Live Coworking Operations
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative p-2.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
          title="Operational Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF007A]" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-neutral-900 leading-tight">
              {currentUser?.name || 'Administrator'}
            </p>
            <span className="text-[10px] font-bold text-[#FF007A] uppercase tracking-wider">
              {currentUser?.role || 'SUPER ADMIN'}
            </span>
          </div>
          <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-[#FF007A] to-pink-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
}
