export type SchemeType = 'Loan' | 'Subsidy' | 'Insurance' | 'Skill & Training' | 'Other';
export type SponsoredBy = 'Central Govt' | 'State Govt' | 'Bank' | 'Organization';
export type FarmerType = 'Marginal (< 1 Ha)' | 'Small (1-2 Ha)' | 'Semi-medium (2-4 Ha)' | 'Medium (4-10 Ha)' | 'Large (> 10 Ha)';

export interface EligibilityCriteria {
  minAge?: number;
  maxAge?: number;
  minLandSize?: number; // in hectares
  maxLandSize?: number; // in hectares
  maxIncome?: number;
  cropTypes?: string[]; // e.g., ["All", "Wheat", "Paddy"]
  states?: string[]; // if empty, means "All India"
  farmerTypes?: FarmerType[];
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  type: SchemeType;
  sponsoredBy: SponsoredBy;
  eligibility: EligibilityCriteria;
  benefits: {
    amount: string;
    description: string;
  };
  requiredDocuments: string[];
  applicationProcess: string[];
  deadline?: string;
  tags: string[];
  faqs: { question: string; answer: string }[];
}

export interface UserProfile {
  name: string;
  state: string;
  district: string;
  landSize: number; // in hectares
  farmerType: FarmerType;
  cropTypes: string[];
  income: number;
}
