'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  Building2, 
  ClipboardList, 
  CheckCircle2, 
  DollarSign, 
  HelpCircle, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  MapPin,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('studioi_token');
      localStorage.removeItem('studioi_user');
      window.location.href = '/';
    }
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/moderation', label: 'Moderation', icon: ShieldAlert, badge: 'Live', badgeVariant: 'pink' as const },
    { href: '/admin/users', label: 'Users & Roles', icon: Users },
    { href: '/admin/listings', label: 'Workspaces & 2D', icon: Building2 },
    { href: '/admin/bookings', label: 'Coworking Bookings', icon: ClipboardList },
    { href: '/admin/verification', label: 'KYC & Verification', icon: CheckCircle2, badge: 'Verified', badgeVariant: 'success' as const },
    { href: '/admin/finance', label: 'Finance & Payouts', icon: DollarSign },
    { href: '/admin/support', label: 'Disputes & Support', icon: HelpCircle, badge: 'Active', badgeVariant: 'warning' as const },
    { href: '/admin/analytics', label: 'Occupancy & Stats', icon: BarChart3 },
    { href: '/admin/marketing/banners', label: 'Banners & Offers', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 text-neutral-800 flex flex-col h-full hidden md:flex select-none shrink-0 shadow-xs">
      {/* Studio I Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-neutral-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-linear-to-tr from-[#FF007A] to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
            i
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-neutral-900">
              Studio <span className="text-[#FF007A]">i</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF007A] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3.5 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition group ${
                isActive
                  ? 'bg-[#FF007A] text-white shadow-xs font-extrabold'
                  : 'text-neutral-600 hover:bg-pink-50/40 hover:text-[#FF007A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-[#FF007A]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge
                  variant={item.badgeVariant || 'default'}
                  className={`text-[10px] px-2 py-0.2 ${isActive ? 'bg-white/20 text-white border-white/30' : ''}`}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}

        {/* Secondary Settings Links */}
        <div className="pt-4 mt-4 border-t border-neutral-100 space-y-1">
          <Link
            href="/admin/settings/amenities-tags"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition group ${
              pathname === '/admin/settings/amenities-tags'
                ? 'bg-[#FF007A] text-white shadow-xs'
                : 'text-neutral-600 hover:bg-pink-50/40 hover:text-[#FF007A]'
            }`}
          >
            <Layers className="w-4 h-4 text-neutral-400 group-hover:text-[#FF007A] transition-colors" />
            <span>Amenities & Facilities</span>
          </Link>

          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition group ${
              pathname === '/admin/settings'
                ? 'bg-[#FF007A] text-white shadow-xs'
                : 'text-neutral-600 hover:bg-pink-50/40 hover:text-[#FF007A]'
            }`}
          >
            <Settings className="w-4 h-4 text-neutral-400 group-hover:text-[#FF007A] transition-colors" />
            <span>Platform Settings</span>
          </Link>
        </div>
      </nav>

      {/* Footer Return & Logout */}
      <div className="p-4 border-t border-neutral-100 space-y-2">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition border border-neutral-200 rounded-xl hover:bg-neutral-50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Site</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-600 hover:text-red-700 transition border border-red-100 hover:border-red-200 rounded-xl hover:bg-red-50/50 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
