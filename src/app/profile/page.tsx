"use client";

import { useApp } from "@/context/AppContext";
import { FarmerType, UserProfile } from "@/types";
import { Save, User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formData);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleCropChange = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop) 
        ? prev.cropTypes.filter(c => c !== crop)
        : [...prev.cropTypes, crop]
    }));
  };

  const commonCrops = ["Paddy", "Wheat", "Maize", "Cotton", "Sugarcane", "Pulses", "Oilseeds"];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-primary-600" />
          Farmer Profile
        </h1>
        <p className="text-slate-500">Keep your profile updated for accurate scheme recommendations.</p>
      </header>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border shadow-sm p-6 md:p-8 space-y-8">
        
        {/* Basic Details */}
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-slate-800">Basic Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Annual Income (₹)</label>
              <input 
                type="number" 
                value={formData.income}
                onChange={e => setFormData({...formData, income: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">State</label>
              <input 
                type="text" 
                value={formData.state}
                onChange={e => setFormData({...formData, state: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">District</label>
              <input 
                type="text" 
                value={formData.district}
                onChange={e => setFormData({...formData, district: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
          </div>
        </section>

        {/* Agricultural Details */}
        <section>
          <h2 className="text-xl font-bold border-b pb-2 mb-4 text-slate-800">Agricultural Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Land Size (in Hectares)</label>
              <input 
                type="number" 
                step="0.01"
                value={formData.landSize}
                onChange={e => setFormData({...formData, landSize: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Farmer Category</label>
              <select 
                value={formData.farmerType}
                onChange={e => setFormData({...formData, farmerType: e.target.value as FarmerType})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="Marginal (< 1 Ha)">Marginal (&lt; 1 Ha)</option>
                <option value="Small (1-2 Ha)">Small (1-2 Ha)</option>
                <option value="Semi-medium (2-4 Ha)">Semi-medium (2-4 Ha)</option>
                <option value="Medium (4-10 Ha)">Medium (4-10 Ha)</option>
                <option value="Large (> 10 Ha)">Large (&gt; 10 Ha)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <label className="text-sm font-semibold text-slate-700 block">Cultivated Crops</label>
            <div className="flex flex-wrap gap-2">
              {commonCrops.map(crop => {
                const isSelected = formData.cropTypes.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => handleCropChange(crop)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      isSelected 
                        ? "bg-lime-100 border-lime-500 text-lime-800" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {crop} {isSelected && "✓"}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div className="pt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-lg opacity-0 transition-opacity" style={{ opacity: savedMsg ? 1 : 0 }}>
            Profile updated successfully!
          </span>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
