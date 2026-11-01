"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { i18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight, Search, Mic, Leaf, ShieldCheck, Zap } from "lucide-react";
import { schemes } from "@/data/mockSchemes";

export default function Home() {
  const { language } = useApp();
  const t = i18n[language];
  const trendingSchemes = schemes.slice(0, 3); // Just grabbing first 3 as mock trending

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative w-full overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary-100 to-transparent -z-10" />
      <div className="absolute top-20 -left-64 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-20 -right-64 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            <span>Empowering 100M+ Farmers</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Discover & Apply for Government Schemes <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-lime-500">
              Instantly with AI
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Personalized agriculture scheme recommendations based on your land, crop, and profile. Less paperwork, more farming.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mt-10 w-full max-w-2xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center bg-white rounded-full shadow-xl border border-primary-100 p-2 pl-4 transition-all focus-within:ring-4 focus-within:ring-primary-100">
            <Search className="w-6 h-6 text-slate-400" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-800 placeholder-slate-400 text-lg"
            />
            <button className="bg-slate-100 p-3 rounded-full hover:bg-slate-200 transition-colors mr-2">
              <Mic className="w-5 h-5 text-primary-700" />
            </button>
            <Link 
              href="/schemes" 
              className="bg-primary-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-700 transition-colors hidden sm:block"
            >
              Search
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-500 font-medium">
            Try: "Tractor loan for 2 hectare land" or "Crop insurance"
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Find My Eligible Schemes
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/schemes"
            className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-primary-200 hover:bg-slate-50 transition-all"
          >
            Browse All Schemes
          </Link>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
            <p className="text-slate-600">AI compares your profile against 100+ schemes to find exact matches instantly.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Information</h3>
            <p className="text-slate-600">All scheme details, deadlines, and requirements are directly from official sources.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Voice & Multi-lingual</h3>
            <p className="text-slate-600">Speak in your local language to search for schemes and check status.</p>
          </div>
        </div>
      </section>

      {/* Trending Schemes */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Trending Schemes</h2>
              <p className="text-slate-600 mt-2">Popular schemes applied by farmers like you.</p>
            </div>
            <Link href="/schemes" className="text-primary-600 font-semibold hover:underline hidden sm:block">
              View all schemes &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingSchemes.map((scheme, i) => (
              <motion.div 
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-lime-100 text-lime-800 text-xs font-bold rounded-full uppercase tracking-wider">
                    {scheme.type}
                  </span>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {scheme.sponsoredBy}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {scheme.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">
                  {scheme.description}
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="block text-slate-400">Benefit</span>
                    <span className="font-bold text-slate-800">{scheme.benefits.amount}</span>
                  </div>
                  <Link href={`/schemes/${scheme.id}`} className="p-2 bg-primary-50 rounded-full text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/schemes" className="text-primary-600 font-semibold hover:underline">
              View all schemes &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
