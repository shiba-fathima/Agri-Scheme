import { Scheme } from "../types";

export const schemes: Scheme[] = [
  {
    id: "s1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description: "Financial support to all landholding farmers' families in the country to supplement their financial needs for procuring various inputs related to agriculture.",
    type: "Subsidy",
    sponsoredBy: "Central Govt",
    eligibility: {
      maxLandSize: 2, // Originally up to 2 Ha, later expanded, but let's say mostly small/marginal targeted
    },
    benefits: {
      amount: "₹6,000 / year",
      description: "Payable in three equal installments of ₹2,000 every four months."
    },
    requiredDocuments: ["Aadhaar Card", "Land holding papers", "Bank Account Details", "Citizenship Certificate"],
    applicationProcess: [
      "Visit PM-KISAN official portal",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar number and fill out the online form",
      "Submit land ownership documents",
      "Wait for state nodal officer verification"
    ],
    tags: ["Income Support", "Central Scheme", "Direct Benefit Transfer"],
    faqs: [
      { question: "Is this for large farmers?", answer: "Initially for marginal, now applies to all landholding farmers subject to exclusions." },
      { question: "How is money credited?", answer: "Directly to the Aadhaar-linked bank account." }
    ]
  },
  {
    id: "s2",
    name: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)",
    description: "Comprehensive crop insurance scheme from pre-sowing to post-harvest to protect against unforeseen weather events and pests.",
    type: "Insurance",
    sponsoredBy: "Central Govt",
    eligibility: {
      minLandSize: 0,
      cropTypes: ["Paddy", "Wheat", "Maize", "Cotton", "Sugarcane"]
    },
    benefits: {
      amount: "Up to 100% Crop Value coverage",
      description: "Low premium of 2% for Kharif crops, 1.5% for Rabi, and 5% for commercial/horticulture."
    },
    requiredDocuments: ["Aadhaar Card", "Bank Passbook", "Land Records (Khasra Number)", "Sowing Certificate"],
    applicationProcess: [
      "Contact your nearest bank branch or Common Service Centre (CSC)",
      "Provide sowing documents",
      "Pay the premium amount depending on crop type",
      "Receive policy document"
    ],
    deadline: "15th July 2026",
    tags: ["Insurance", "Weather Protection", "Kharif"],
    faqs: [
      { question: "What covers under this?", answer: "Natural fire, lightning, storm, hail, cyclone, pests, and diseases." }
    ]
  },
  {
    id: "s3",
    name: "Kisan Credit Card (KCC)",
    description: "Ensures adequate and timely credit support from the banking system to farmers for short-term crop loans and allied activities.",
    type: "Loan",
    sponsoredBy: "Bank",
    eligibility: {
      minAge: 18,
      maxAge: 75
    },
    benefits: {
      amount: "Credit limit up to ₹3 Lakhs",
      description: "Concessional interest rate of 4% per annum upon prompt repayment."
    },
    requiredDocuments: ["Identity Proof (Aadhaar/PAN)", "Address Proof", "Landholding documents", "Recent passport size photo"],
    applicationProcess: [
      "Download KCC Application form from respective bank's website.",
      "Fill out details and attach documents.",
      "Submit at home branch.",
      "Bank assesses land and creditworthiness.",
      "KCC issued with a set limit."
    ],
    tags: ["Credit", "Short Term Loan", "Farming Input"],
    faqs: [
      { question: "Can animal husbandry farmers apply?", answer: "Yes, recently extended to animal husbandry and fisheries." }
    ]
  },
  {
    id: "s4",
    name: "PM-KUSUM (Solar Pump Subsidy)",
    description: "Scheme for farmers for installation of solar pumps and grid-connected solar and other renewable power plants.",
    type: "Subsidy",
    sponsoredBy: "Central Govt",
    eligibility: {
      minLandSize: 1
    },
    benefits: {
      amount: "Substitute up to 60% of cost",
      description: "30% Central Subsidy, 30% State Subsidy, 40% Farmer Contribution (Bank loan available for 30%)."
    },
    requiredDocuments: ["Aadhaar", "Land document", "Bank details", "Declaration of currently no grid connection"],
    applicationProcess: [
      "Register on state portal for PM-KUSUM Component B.",
      "Submit desired pump capacity and beneficiary share.",
      "Vendor is allocated by state nodal agency.",
      "Installation happens after payment."
    ],
    deadline: "Open All Year",
    tags: ["Solar", "Irrigation", "Energy"],
    faqs: [
      { question: "Is this for existing pumps?", answer: "There is a component to solarize existing grid pumps (Component C)." }
    ]
  },
  {
    id: "s5",
    name: "Sub-Mission on Agricultural Mechanization (Tractor Subsidy)",
    description: "Promotes inclusive growth through custom hiring centers and direct subsidy on tractor purchases to boost mechanization.",
    type: "Subsidy",
    sponsoredBy: "State Govt",
    eligibility: {
      minLandSize: 2,
    },
    benefits: {
      amount: "Up to 50% Subsidy",
      description: "Up to 40-50% off on tractor cost depending on category (SC/ST/Women/Small)."
    },
    requiredDocuments: ["Aadhaar", "Caste Certificate (if applicable)", "Bank Details", "Quote from an authorized dealer"],
    applicationProcess: [
      "Register on direct benefit transfer (DBT) agriculture portal.",
      "Select machinery required.",
      "Upload quotations and documents.",
      "Wait for lottery/selection and purchase order."
    ],
    tags: ["Machinery", "Tractor", "Modernization"],
    faqs: [
      { question: "Can I buy any brand?", answer: "Only from manufacturers empanelled by the State Govt." }
    ]
  },
  {
    id: "s6",
    name: "Paramparagat Krishi Vikas Yojana (Organic Farming)",
    description: "Supports and promotes organic farming, improving soil health.",
    type: "Subsidy",
    sponsoredBy: "Central Govt",
    eligibility: {
      minLandSize: 0.5
    },
    benefits: {
      amount: "₹50,000 / hectare over 3 years",
      description: "₹31,000 direct transfer for organic inputs."
    },
    requiredDocuments: ["Land holding certificate", "Bank details", "Cluster details"],
    applicationProcess: [
      "Form a cluster of 50 acres minimum with other farmers.",
      "Register through the state nodal agency.",
      "Adopt PGS certification process."
    ],
    tags: ["Organic", "Soil Health", "Sustainable"],
    faqs: [
      { question: "Do I apply alone?", answer: "Usually, it's done through cluster approach (groups of farmers)." }
    ]
  },
  {
    id: "s7",
    name: "Per Drop More Crop (Micro Irrigation)",
    description: "Focuses on enhancing water use efficiency at farm level through Drip and Sprinkler irrigation technologies.",
    type: "Subsidy",
    sponsoredBy: "Central Govt",
    eligibility: {
      minLandSize: 0.5
    },
    benefits: {
      amount: "55% for Small/Marginal, 45% for Others",
      description: "Subsidy on micro-irrigation system cost."
    },
    requiredDocuments: ["Land Records", "Water Source Certificate", "Aadhaar"],
    applicationProcess: [
      "Apply through horticulture/agriculture department portal.",
      "Get estimation from registered firm.",
      "Installation and inspection by officials."
    ],
    tags: ["Irrigation", "Water Saving"],
    faqs: [
      { question: "Is borewell funded?", answer: "Mainly funds the distribution system (drip/sprinkler), not the well itself." }
    ]
  },
  {
    id: "s8",
    name: "Mahila Kisan Sashaktikaran Pariyojana (Women Farmer Scheme)",
    description: "Empower women in agriculture by making systematic investments to enhance their participation and productivity.",
    type: "Skill & Training",
    sponsoredBy: "Central Govt",
    eligibility: {
      farmerTypes: ["Marginal (< 1 Ha)", "Small (1-2 Ha)"]
    },
    benefits: {
      amount: "Skill building & Group grants",
      description: "Training in agro-ecological practices and grant support for Women Self Help Groups."
    },
    requiredDocuments: ["SHG Membership Details", "Aadhaar", "BPL Card (if applicable)"],
    applicationProcess: [
      "Join a local Self Help Group (SHG) under State Rural Livelihood Mission.",
      "Participate in MKSP planning.",
      "Avail funds through the community organization."
    ],
    tags: ["Women Empowerment", "Training", "Grants"],
    faqs: [
      { question: "Is this loan or subsidy?", answer: "Primarily training, capacity building, and community grants." }
    ]
  },
  {
    id: "s9",
    name: "Agri-Clinics and Agri-Business Centres (Startup Scheme)",
    description: "Provide self-employment opportunities to agriculture graduates to support agricultural development.",
    type: "Loan",
    sponsoredBy: "Central Govt",
    eligibility: {
      maxAge: 60
    },
    benefits: {
      amount: "Up to ₹20 Lakh Loan, with 36%-44% Subsidy",
      description: "For setting up agri-clinics or agri-business."
    },
    requiredDocuments: ["Degree/Diploma Certificate in Agri/Allied", "Project Profile", "Bank application"],
    applicationProcess: [
      "Undergo 45 days free training at Nodal Training Institute.",
      "Prepare a Detailed Project Report (DPR).",
      "Apply for bank loan.",
      "Get credit-linked capital subsidy."
    ],
    deadline: "December 2026",
    tags: ["Startup", "Youth", "Business"],
    faqs: [
      { question: "Who is eligible?", answer: "Agriculture graduates, post-graduates, and diploma holders." }
    ]
  },
  {
    id: "s10",
    name: "National Food Security Mission (Seed Subsidy)",
    description: "Distribution of seed minikits of newer varieties of pulses, oilseeds, and cereals to increase production.",
    type: "Subsidy",
    sponsoredBy: "Central Govt",
    eligibility: {
      minLandSize: 0,
      cropTypes: ["Pulses", "Wheat", "Rice", "Oilseeds"]
    },
    benefits: {
      amount: "Subsidized Seeds",
      description: "High-yielding variety seeds at ₹2,000-3,000 discount per quintal or free minikits."
    },
    requiredDocuments: ["Farmer ID", "Aadhaar", "Land Passbook"],
    applicationProcess: [
      "Contact local Agriculture Extension Officer or gram panchayat.",
      "Register your demand for the upcoming season.",
      "Collect seeds at block level counter."
    ],
    tags: ["Seeds", "Input Subsidy", "Pulse Production"],
    faqs: [
      { question: "When are seeds distributed?", answer: "Generally before the start of Kharif and Rabi seasons." }
    ]
  }
];
