"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar, LayoutGrid, Check } from "lucide-react";

export default function HeroSearch() {
  const [selectedLocation, setSelectedLocation] = useState("Search Co-Working Space");
  const [selectedDate, setSelectedDate] = useState("Add the date when you booked.");
  const [selectedSpace, setSelectedSpace] = useState("Choose your workspace");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const locations = [
    "Horizon Tower, Jaipur",
    "Lehariya | KGK Realty, Jaipur",
    "Rathore Bhawan, Alwar",
  ];

  const spaces = [
    "Hot Desk",
    "Dedicated Desk",
    "Private Cabin",
    "Meeting Room",
    "Event Space",
    "Community Pass",
  ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = () => {
    alert(
      `Searching workspaces:\nLocation: ${selectedLocation}\nDate: ${selectedDate}\nType: ${selectedSpace}`
    );
  };

  return (
    <div id="search-bar" className="w-full max-w-4xl mx-auto px-4 mt-8 relative z-30">
      <div className="bg-white rounded-full p-2.5 sm:p-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-200/80 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        {/* Location Column */}
        <div className="relative w-full md:w-1/3 px-4 sm:px-6 py-1 cursor-pointer group">
          <div onClick={() => toggleDropdown("location")} className="text-left">
            <span className="block text-[15px] font-bold text-gray-900 group-hover:text-[#FF007A] transition-colors">
              Location
            </span>
            <span className="block text-xs text-gray-500 truncate mt-0.5">
              {selectedLocation}
            </span>
          </div>

          {activeDropdown === "location" && (
            <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs font-semibold text-gray-400 px-3 py-1.5 uppercase tracking-wider">
                Available Campuses
              </div>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF007A] rounded-xl text-left transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {loc}
                  </span>
                  {selectedLocation === loc && (
                    <Check className="w-4 h-4 text-[#FF007A]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider 1 */}
        <div className="hidden md:block h-9 w-[1px] bg-gray-200" />

        {/* When Column */}
        <div className="relative w-full md:w-1/3 px-4 sm:px-6 py-1 cursor-pointer group">
          <div onClick={() => toggleDropdown("when")} className="text-left">
            <span className="block text-[15px] font-bold text-gray-900 group-hover:text-[#FF007A] transition-colors">
              When
            </span>
            <span className="block text-xs text-gray-500 truncate mt-0.5">
              {selectedDate}
            </span>
          </div>

          {activeDropdown === "when" && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">
                Select Date
              </div>
              <input
                type="date"
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedDate(
                      new Date(e.target.value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    );
                    setActiveDropdown(null);
                  }
                }}
                className="w-full mt-2 p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF007A]"
              />
              <div className="mt-2 flex gap-1.5 flex-wrap">
                {["Today", "Tomorrow", "Next Monday"].map((label) => (
                  <button
                    key={label}
                    onClick={() => {
                      setSelectedDate(label);
                      setActiveDropdown(null);
                    }}
                    className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-[#FF007A] hover:text-white rounded-full transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider 2 */}
        <div className="hidden md:block h-9 w-[1px] bg-gray-200" />

        {/* Space Type Column */}
        <div className="relative w-full md:w-1/3 px-4 sm:px-6 py-1 cursor-pointer group flex items-center justify-between">
          <div onClick={() => toggleDropdown("space")} className="text-left flex-1">
            <span className="block text-[15px] font-bold text-gray-900 group-hover:text-[#FF007A] transition-colors">
              Space Type
            </span>
            <span className="block text-xs text-gray-500 truncate mt-0.5">
              {selectedSpace}
            </span>
          </div>

          {activeDropdown === "space" && (
            <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs font-semibold text-gray-400 px-3 py-1.5 uppercase tracking-wider">
                Workspace Options
              </div>
              {spaces.map((sp) => (
                <button
                  key={sp}
                  onClick={() => {
                    setSelectedSpace(sp);
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FF007A] rounded-xl text-left transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-gray-400" />
                    {sp}
                  </span>
                  {selectedSpace === sp && (
                    <Check className="w-4 h-4 text-[#FF007A]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Magenta Search Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSearch();
            }}
            className="w-12 h-12 rounded-full bg-[#FF007A] hover:bg-[#E0006C] text-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ml-2"
            aria-label="Search Workspace"
          >
            <Search className="w-5 h-5 text-white stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
