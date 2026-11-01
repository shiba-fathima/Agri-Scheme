"use client";

import { useApp } from "@/context/AppContext";
import { schemes } from "@/data/mockSchemes";
import { getRecommendedSchemes } from "@/lib/matchingEngine";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import { FileText, Award, Clock } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "@/types";

export default function DashboardPage() {
  const { user, appliedSchemes, savedSchemes } = useApp();

  // Recommendations: sort by matching engine
  const recommendations = getRecommendedSchemes(schemes, user).filter(r => r.score >= 50).slice(0, 3);
  
  // Applied schemes full data
  const appliedSchemesData = schemes.filter(s => appliedSchemes.find(a => a.id === s.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-lime-600 bg-clip-text text-transparent">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-500 mt-1">Here is your farming profile and scheme status.</p>
        </div>
        <Link href="/profile" className="text-sm font-semibold bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50">
          Edit Profile
        </Link>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{recommendations.length}</div>
            <div className="text-slate-500 text-sm">High Matches</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{appliedSchemes.filter(s => s.status === 'Pending').length}</div>
            <div className="text-slate-500 text-sm">Pending Applications</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">{savedSchemes.length}</div>
            <div className="text-slate-500 text-sm">Saved Schemes</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Smart Recommendations */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-lime-500 rounded-full"></span>
                Top Recommendations for You
              </h2>
              <Link href="/schemes" className="text-sm text-primary-600 hover:underline font-medium">View all</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendations.map(res => (
                <SchemeCard key={res.scheme.id} scheme={res.scheme} matchScore={res.score} />
              ))}
              {recommendations.length === 0 && (
                <div className="col-span-2 bg-slate-50 p-8 text-center rounded-2xl border border-dashed">
                  <p className="text-slate-500 mb-4">Update your profile to get better recommendations.</p>
                  <Link href="/profile" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Update Profile</Link>
                </div>
              )}
            </div>
          </section>

          {/* Applied Schemes Log */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              Recent Applications
            </h2>
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              {appliedSchemesData.length > 0 ? (
                <ul className="divide-y">
                  {appliedSchemesData.map(scheme => {
                    const info = appliedSchemes.find(a => a.id === scheme.id)!;
                    return (
                      <li key={scheme.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-slate-800">{scheme.name}</h3>
                          <p className="text-sm text-slate-500">Applied on: {info.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          info.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          info.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {info.status}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <p>You haven't applied to any schemes yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Mini Profile Overview */}
        <aside>
          <div className="bg-white p-6 rounded-2xl border shadow-sm sticky top-24">
            <h3 className="font-bold text-lg border-b pb-3 mb-4">Your Profile Snapshot</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-slate-800">{user.district}, {user.state}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Land Size</span>
                <span className="font-medium text-slate-800">{user.landSize} Hectares</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Farmer Type</span>
                <span className="font-medium text-slate-800">{user.farmerType}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Crops</span>
                <span className="font-medium text-slate-800">{user.cropTypes.join(", ")}</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t">
              <div className="bg-primary-50 p-4 rounded-xl text-primary-800 text-sm">
                <p className="font-bold mb-1">Did you know?</p>
                <p>Based on your profile, you could save up to ₹50,000 annually through correctly applying for input subsidies.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
