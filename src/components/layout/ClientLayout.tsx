"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoSidebarPage = pathname === "/" || pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-foreground">
      {!isNoSidebarPage && <Navbar />}
      
      <div className="flex flex-1">
        {!isNoSidebarPage && <Sidebar />}
        
        <main className={cn(
          "flex-1 flex flex-col w-full h-full",
          !isNoSidebarPage && "max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
        )}>
          {children}
        </main>
      </div>

      {/* Floating AI Chat Assistant */}
      {!isNoSidebarPage && pathname !== "/chat" && (
        <Link 
          href="/chat"
          className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-primary-700 hover:scale-105 transition-all group z-50 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-16 bg-white text-slate-800 text-sm py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask Farm AI
          </span>
        </Link>
      )}
    </div>
  );
}
