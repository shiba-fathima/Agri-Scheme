"use client";

import { useState } from "react";
import { schemes } from "@/data/mockSchemes";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { SchemeType } from "@/types";
import { Search, Filter, Mic } from "lucide-react";

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<SchemeType | "All">("All");

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || scheme.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types: (SchemeType | "All")[] = ["All", "Loan", "Subsidy", "Insurance", "Skill & Training"];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse All Schemes</h1>
        <p className="text-slate-500">Discover and apply for over 100+ government schemes.</p>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, crop, or keywords..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-12 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-5 h-5 text-slate-400 shrink-0" />
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedType === type 
                  ? "bg-primary-600 text-white shadow-sm" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed">
            <p className="text-lg font-medium mb-2">No schemes found matching your criteria</p>
            <p>Try adjusting your search or filters to see more results.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedType("All"); }}
              className="mt-4 px-4 py-2 bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
