import Link from "next/link";
import { Scheme } from "@/types";
import { ArrowRight, Bookmark, CheckCircle, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface SchemeCardProps {
  scheme: Scheme;
  matchScore?: number;
}

export function SchemeCard({ scheme, matchScore }: SchemeCardProps) {
  const { savedSchemes, toggleSaveScheme, appliedSchemes } = useApp();
  const isSaved = savedSchemes.includes(scheme.id);
  const appliedInfo = appliedSchemes.find(s => s.id === scheme.id);

  return (
    <div className="bg-card rounded-2xl border p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col relative group">
      {/* Match Score Badge */}
      {matchScore !== undefined && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-lime-400 to-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          {matchScore}% Match
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="bg-primary-100 text-primary-800 px-2.5 py-1 rounded-full">{scheme.type}</span>
          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{scheme.sponsoredBy}</span>
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleSaveScheme(scheme.id);
          }}
          className={cn(
            "p-2 rounded-full transition-colors",
            isSaved ? "bg-amber-100 text-amber-500 hover:bg-amber-200" : "bg-slate-100 text-slate-400 hover:bg-slate-200 text-slate-600"
          )}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
        {scheme.name}
      </h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
        {scheme.description}
      </p>

      <div className="mb-4 text-sm bg-slate-50 p-3 rounded-lg flex flex-col gap-1 border border-slate-100">
        <div className="flex justify-between">
          <span className="text-slate-500">Benefit:</span>
          <span className="font-semibold text-slate-800">{scheme.benefits.amount}</span>
        </div>
        {scheme.deadline && (
          <div className="flex justify-between">
            <span className="text-slate-500">Deadline:</span>
            <span className="font-semibold text-red-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {scheme.deadline}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        {appliedInfo ? (
          <div className={cn(
            "text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5",
            appliedInfo.status === 'Approved' ? "bg-green-100 text-green-700" :
            appliedInfo.status === 'Rejected' ? "bg-red-100 text-red-700" :
            "bg-blue-100 text-blue-700"
          )}>
            <div className={cn("w-2 h-2 rounded-full",
              appliedInfo.status === 'Approved' ? "bg-green-600" :
              appliedInfo.status === 'Rejected' ? "bg-red-600" :
              "bg-blue-600 animate-pulse"
            )}/>
            {appliedInfo.status}
          </div>
        ) : (
          <div /> // empty space filler
        )}
        
        <Link 
          href={`/schemes/${scheme.id}`}
          className="flex items-center gap-1 text-primary-600 font-bold hover:text-primary-700 hover:underline"
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
