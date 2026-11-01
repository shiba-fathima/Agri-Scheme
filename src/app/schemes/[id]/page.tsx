"use client";

import { use } from "react";
import { schemes } from "@/data/mockSchemes";
import { useApp } from "@/context/AppContext";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Bookmark, Share2, Info, ChevronRight, FileText, Download } from "lucide-react";
import Link from "next/link";
import { calculateMatchScore } from "@/lib/matchingEngine";
import { cn } from "@/lib/utils";

export default function SchemeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { user, appliedSchemes, applyForScheme, savedSchemes, toggleSaveScheme } = useApp();
  
  const scheme = schemes.find(s => s.id === unwrappedParams.id);
  
  if (!scheme) {
    return notFound();
  }

  const matchData = calculateMatchScore(scheme, user);
  const isSaved = savedSchemes.includes(scheme.id);
  const appliedInfo = appliedSchemes.find(a => a.id === scheme.id);

  const handleApply = () => {
    applyForScheme(scheme.id);
    alert(`Successfully simulated applying for ${scheme.name}! Track its status in your dashboard.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm w-fit font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Schemes
      </button>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border shadow-sm p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-transparent rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{scheme.type}</span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{scheme.sponsoredBy}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {scheme.name}
            </h1>
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {scheme.description}
            </p>
          </div>

          <div className="flex items-center gap-3 md:flex-col md:items-end w-full md:w-auto">
            <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm text-center min-w-32 flex-1 md:flex-none">
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Match Score</div>
              <div className={cn(
                "text-4xl font-black",
                matchData.score >= 80 ? "text-green-500" :
                matchData.score >= 50 ? "text-amber-500" : "text-red-500"
              )}>
                {matchData.score}%
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => toggleSaveScheme(scheme.id)}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-amber-500 transition-colors shadow-sm"
              >
                <Bookmark className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} />
              </button>
              <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-blue-500 transition-colors shadow-sm">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Eligibility Fit */}
          <section className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-primary-500" />
              Eligibility Breakdown
            </h2>
            
            <div className="space-y-4">
              {matchData.reasons.length > 0 ? (
                matchData.reasons.map((reason, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 bg-green-50/50 border border-green-100 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-slate-800 font-medium">{reason}</p>
                  </div>
                ))
              ) : (
                <div className="flex gap-3 items-start p-4 bg-red-50 border border-red-100 rounded-xl text-red-800">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>Based on your profile, you may not be fully eligible for this scheme.</p>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Max Land</div>
                <div className="text-slate-800 font-medium">{scheme.eligibility.maxLandSize ? `${scheme.eligibility.maxLandSize} Ha` : 'No Limit'}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Income Limit</div>
                <div className="text-slate-800 font-medium">{scheme.eligibility.maxIncome ? `₹${scheme.eligibility.maxIncome}` : 'No Limit'}</div>
              </div>
              <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Applicable Crops</div>
                <div className="text-slate-800 font-medium truncate">{scheme.eligibility.cropTypes ? scheme.eligibility.cropTypes.join(', ') : 'All Crops'}</div>
              </div>
            </div>
          </section>

          {/* Application Process */}
          <section className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Info className="w-8 h-8 text-blue-500" />
              How to Apply
            </h2>
            <div className="space-y-6">
              {scheme.applicationProcess.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    {i !== scheme.applicationProcess.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-100 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-6 pt-1 text-slate-700 font-medium text-lg leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {scheme.faqs.map((faq, i) => (
                <details key={i} className="group border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-slate-800 hover:text-primary-600 list-none">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="p-4 pt-0 text-slate-600 bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Sticky Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Quick Actions / Status */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm text-center">
              <h3 className="font-bold text-slate-900 text-xl mb-2">Benefit Value</h3>
              <p className="text-2xl font-black text-primary-600 bg-primary-50 py-3 rounded-xl mb-6">
                {scheme.benefits.amount}
              </p>
              
              <div className="text-left mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Benefit details</span>
                <p className="text-sm text-slate-700 font-medium">
                  {scheme.benefits.description}
                </p>
              </div>

              {scheme.deadline && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-bold flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  Deadline: {scheme.deadline}
                </div>
              )}

              {appliedInfo ? (
                <div className="w-full py-4 px-6 rounded-xl font-bold text-lg border-2 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed">
                  Application {appliedInfo.status}
                </div>
              ) : (
                <button 
                  onClick={handleApply}
                  className="w-full py-4 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                >
                  <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  1-Click Apply Now
                </button>
              )}
            </div>

            {/* Required Documents */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center justify-between">
                Required Docs
                <Download className="w-5 h-5 text-slate-400 cursor-pointer hover:text-primary-600" />
              </h3>
              <ul className="space-y-3">
                {scheme.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <FileText className="w-5 h-5 text-primary-500 shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
