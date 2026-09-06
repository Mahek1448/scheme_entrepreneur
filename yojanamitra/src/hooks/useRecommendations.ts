/**
 * useRecommendations.ts
 * React hook that loads schemes from JSON, runs the engines, and returns results.
 */

import { useMemo } from 'react';
import type { UserProfile, RecommendationResult, Scheme } from '../types';
import { recommendSchemes } from '../engines/RecommendationEngine';
import schemesJson from '../data/schemes.json';

// Cast the imported JSON to our Scheme type
const SCHEMES: Scheme[] = schemesJson as Scheme[];

export function useRecommendations(profile: UserProfile): {
  recommendations: RecommendationResult[];
  schemes: Scheme[];
} {
  const recommendations = useMemo(
    () => recommendSchemes(profile, SCHEMES),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile.id, profile.category, profile.businessStage, profile.isStreetVendor, profile.fundingRequirement]
  );

  return { recommendations, schemes: SCHEMES };
}

export { SCHEMES };
