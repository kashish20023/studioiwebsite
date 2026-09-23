'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredUser, clearStoredSession, setStoredSession } from '@/lib/api';
import { 
  LayoutDashboard, Building2, Calendar, Users2, 
  Wallet, ShieldAlert, LogOut, ChevronRight, Sparkles, Building
} from 'lucide-react';

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleSwitchToHost = async () => {
    try {
      const res = await fetch('http://localhost:5002/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'host@studioi.com', password: 'StudioI@Host2026' }),
      });
      const data = await res.json();
      if (data.token) {
        setStoredSession(data.token, data.user);
        setCurrentUser(data.user);
        window.location.reload();
      }
    } catch (err) {
      alert('Failed to login as Host');
    }
  };

  const navItems = [
    { label: 'Host Dashboard', href: '/host', icon: LayoutDashboard },
    { label: 'My Workspaces', href: '/host/workspaces', icon: Building },
    { label: 'Co-Host Delegation', href: '/host/co-hosts', icon: Users2 },
    { label: 'Earnings & Payouts', href: '/host/earnings', icon: Wallet },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FF007A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Access check: User must be HOST or ADMIN
  if (!currentUser || (currentUser.role !== 'HOST' && currentUser.role !== 'ADMIN')) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-[#FF007A]/10 text-[#FF007A] rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Studio i Host Portal</h2>
            <p className="text-xs text-neutral-400 mt-2">
              Workspace Host access required. You are currently {currentUser ? `signed in as ${currentUser.role} (${currentUser.email})` : 'signed out'}.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSwitchToHost}
              className="w-full py-3.5 bg-[#FF007A] hover:bg-[#E0006C] text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
            >
              Sign In as Studio i Host (Instant Demo)
            </button>
            <Link
              href="/"
              className="block w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition"
            >
              Return to Studio i Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col md:flex-row font-sans">
      {/* Host Sidebar */}
      <aside className="w-full md:w-64 bg-[#141414] border-r border-neutral-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#FF007A] to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-md">
                i
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">Studio i</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF007A] block">
                  Host Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#FF007A] text-white shadow-xs font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Switcher */}
        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <div className="bg-neutral-900/90 p-3 rounded-2xl border border-neutral-800 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#FF007A] block tracking-wider">
              Verified Host
            </span>
            <span className="font-bold text-white block truncate">{currentUser.name}</span>
            <span className="text-neutral-400 text-[11px] truncate block">{currentUser.email}</span>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="flex-1 text-center py-2 bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold rounded-xl text-neutral-300"
            >
              Public Site
            </Link>
            <button
              onClick={() => {
                clearStoredSession();
                window.location.href = '/';
              }}
              className="p-2 bg-neutral-800 hover:bg-red-950/60 hover:text-red-400 text-neutral-400 rounded-xl transition"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Host Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="h-16 bg-[#141414]/90 backdrop-blur-md border-b border-neutral-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Host</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold capitalize">
              {pathname.split('/')[2] || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[11px] font-bold rounded-full">
              Host Console Active
            </span>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
