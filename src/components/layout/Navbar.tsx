"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { i18n } from "@/lib/i18n";
import { Leaf, Bell, Mic, Menu } from "lucide-react";

export function Navbar() {
  const { language, setLanguage, user } = useApp();
  const t = i18n[language];

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-foreground/70 hover:text-foreground">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary-500 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-lime-600 bg-clip-text text-transparent">
            AgriScheme AI
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 text-sm">
          <span>{user.name}</span>
          <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
            {user.farmerType.split(' ')[0]}
          </span>
        </div>

        <button className="text-foreground/70 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors relative" aria-label={t.voiceSearch}>
          <Mic className="w-5 h-5" />
        </button>

        <button className="text-foreground/70 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card"></span>
        </button>

        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="text-sm border-none bg-slate-100 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="ka">ಕನ್ನಡ</option>
        </select>
      </div>
    </header>
  );
}
