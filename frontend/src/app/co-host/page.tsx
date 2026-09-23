'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import { Building2, CheckCircle2, XCircle, Shield, Calendar, Users, ArrowRight } from 'lucide-react';

export default function CoHostWorkspacesPage() {
  const [delegations, setDelegations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        const data = await apiRequest('/co-host/me/workspaces');
        setDelegations(data);
      } catch (err) {
        console.error('Failed to load co-host workspaces', err);
      } finally {
        setLoading(false);
      }
    }
    loadWorkspaces();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse max-w-5xl">
        <div className="h-28 bg-neutral-900 rounded-3xl" />
        <div className="h-64 bg-neutral-900 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Delegated Operations</span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
          Assigned Coworking Workspaces
        </h1>
        <p className="text-xs text-neutral-400 mt-2">
          You have been granted operational permissions to manage customer bookings, view schedules, and inspect facilities for the spaces below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {delegations.map((del) => {
          const ws = del.workspace;
          return (
            <div
              key={del.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-white">{ws.name}</h2>
                    <span className="px-2.5 py-0.5 bg-[#FF007A]/10 text-[#FF007A] text-[10px] font-bold rounded-full uppercase">
                      {ws.city} Flagship
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{ws.address}</p>
                </div>

                <div className="text-xs text-neutral-400">
                  <span className="text-[10px] text-neutral-500 uppercase block">Workspace Owner</span>
                  <span className="font-semibold text-white">{ws.host?.name || 'Studio i Host'}</span>
                </div>
              </div>

              {/* Granted Permissions Matrix */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Your Specific Granted Capabilities
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canManageBookings ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canManageBookings ? 'text-white' : 'text-neutral-500'}>Manage Bookings</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canManageCalendar ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canManageCalendar ? 'text-white' : 'text-neutral-500'}>View Calendar</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canManageMaintenance ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canManageMaintenance ? 'text-white' : 'text-neutral-500'}>Maintenance Issues</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canMessageGuests ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canMessageGuests ? 'text-white' : 'text-neutral-500'}>Message Members</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canManageListing ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canManageListing ? 'text-white' : 'text-neutral-500'}>Edit Workspace</span>
                  </div>

                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center gap-2">
                    {del.canViewFinances ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-neutral-600 shrink-0" />}
                    <span className={del.canViewFinances ? 'text-white' : 'text-neutral-500'}>Financial Oversight</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
