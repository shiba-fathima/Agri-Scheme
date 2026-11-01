"use client";

import { useApp } from "@/context/AppContext";
import { schemes } from "@/data/mockSchemes";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { Bookmark } from "lucide-react";

export default function SavedSchemesPage() {
  const { savedSchemes } = useApp();
  const savedData = schemes.filter(s => savedSchemes.includes(s.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Bookmark className="w-8 h-8 text-amber-500" fill="currentColor" />
          Saved Schemes
        </h1>
        <p className="text-slate-500">View and manage the schemes you've bookmarked for later.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedData.length > 0 ? (
          savedData.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-dashed">
            <div className="bg-amber-100 text-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2">No saved schemes</p>
            <p>You haven't bookmarked any schemes yet. Browse schemes to save them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
