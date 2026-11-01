"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { i18n } from "@/lib/i18n";
import { LayoutDashboard, ListTree, User, LogOut, Bookmark, MessageSquare } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { language } = useApp();
  const t = i18n[language];

  const links = [
    { href: "/dashboard", label: t.dashboard, icon: LayoutDashboard },
    { href: "/schemes", label: t.schemes, icon: ListTree },
    { href: "/saved", label: t.saved, icon: Bookmark },
    { href: "/profile", label: t.profile, icon: User },
    { href: "/chat", label: t.chatAssistant, icon: MessageSquare },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col border-r bg-card h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 flex-1 h-full overflow-y-auto">
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary-50 text-primary-700 hover:bg-primary-100" 
                    : "text-foreground/70 hover:bg-slate-100 hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-slate-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
