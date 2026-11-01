import { Scheme, UserProfile } from "../types";

export interface MatchResult {
  scheme: Scheme;
  score: number;
  reasons: string[];
}

export function calculateMatchScore(scheme: Scheme, user: UserProfile): MatchResult {
  let score = 0;
  let maxPossible = 0;
  const reasons: string[] = [];

  const addScore = (points: number, max: number, reason: string) => {
    score += points;
    maxPossible += max;
    if (points > 0) reasons.push(reason);
  };

  // 1. Land Size Match (Critical)
  maxPossible += 40;
  if (scheme.eligibility.minLandSize !== undefined && user.landSize < scheme.eligibility.minLandSize) {
    score += 0;
  } else if (scheme.eligibility.maxLandSize !== undefined && user.landSize > scheme.eligibility.maxLandSize) {
    score += 0;
  } else {
    addScore(40, 0, "Land size matches eligibility criteria.");
  }

  // 2. Crop Type Match
  if (scheme.eligibility.cropTypes && scheme.eligibility.cropTypes.length > 0) {
    maxPossible += 30;
    const hasMatch = scheme.eligibility.cropTypes.some(c => user.cropTypes.includes(c) || c === "All");
    if (hasMatch) {
      addScore(30, 0, "Your cultivated crops are covered.");
    }
  }

  // 3. Farmer Type
  if (scheme.eligibility.farmerTypes && scheme.eligibility.farmerTypes.length > 0) {
    maxPossible += 20;
    if (scheme.eligibility.farmerTypes.includes(user.farmerType)) {
      addScore(20, 0, "Specific scheme for your farmer type.");
    }
  }

  // 4. Age and Income (Basic checks, we assume age isn't strictly provided in mock but if it was we'd check)
  maxPossible += 10;
  if (scheme.eligibility.maxIncome && user.income > scheme.eligibility.maxIncome) {
     score += 0;
  } else if (scheme.eligibility.maxIncome) {
     addScore(10, 0, "Meets income criteria.");
  } else {
     addScore(10, 0, "No income restrictions.");
  }

  const finalScore = maxPossible === 0 ? 100 : Math.round((score / maxPossible) * 100);

  return { scheme, score: finalScore, reasons };
}

export function getRecommendedSchemes(schemes: Scheme[], user: UserProfile): MatchResult[] {
  return schemes
    .map(s => calculateMatchScore(s, user))
    .sort((a, b) => b.score - a.score);
}
