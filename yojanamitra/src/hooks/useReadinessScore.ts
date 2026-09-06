/**
 * useReadinessScore.ts
 * Dynamically calculates Application Readiness Score 0–100.
 * Based on profile completeness + document status.
 * Score is never hardcoded.
 */

import { useMemo } from 'react';
import type { UserProfile, Document } from '../types';

export interface ReadinessItem {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
  route?: string;
}

export interface ReadinessScore {
  score: number;       // 0–100
  maxScore: number;    // always 100
  items: ReadinessItem[];
  passedItems: ReadinessItem[];
  failedItems: ReadinessItem[];
  label: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
  color: string;
}

export function useReadinessScore(profile: UserProfile, documents: Document[]): ReadinessScore {
  return useMemo(() => {
    const items: ReadinessItem[] = [
      // Profile section — 40 pts total
      {
        id: 'name',
        label: 'Name provided',
        passed: !!profile.name && profile.name.length > 1,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'age',
        label: 'Age provided',
        passed: profile.age > 0 && profile.age < 120,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'gender',
        label: 'Gender provided',
        passed: !!profile.gender && profile.gender !== 'prefer_not_to_say',
        weight: 3,
        route: '/intake',
      },
      {
        id: 'category',
        label: 'Social category provided',
        passed: !!profile.category,
        weight: 7,
        route: '/intake',
      },
      {
        id: 'location',
        label: 'Location (state & district)',
        passed: !!profile.state && !!profile.district,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'businessType',
        label: 'Business type specified',
        passed: !!profile.businessType && profile.businessType.length > 2,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'businessStage',
        label: 'Business stage specified',
        passed: !!profile.businessStage,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'occupation',
        label: 'Occupation specified',
        passed: !!profile.occupation,
        weight: 5,
        route: '/intake',
      },

      // Financial section — 30 pts
      {
        id: 'availableCapital',
        label: 'Available capital provided',
        passed: profile.availableCapital >= 0,
        weight: 10,
        route: '/planner',
      },
      {
        id: 'fundingRequirement',
        label: 'Funding requirement specified',
        passed: profile.fundingRequirement > 0,
        weight: 10,
        route: '/planner',
      },
      {
        id: 'monthlyRevenue',
        label: 'Monthly income / revenue provided',
        passed: profile.monthlyRevenue > 0,
        weight: 5,
        route: '/intake',
      },
      {
        id: 'annualIncome',
        label: 'Annual family income provided',
        passed: profile.annualFamilyIncome > 0,
        weight: 5,
        route: '/intake',
      },

      // Documents section — 30 pts
      {
        id: 'aadhaar',
        label: 'Aadhaar Card available',
        passed: profile.aadhaarVerified || documents.some((d) => d.name.toLowerCase().includes('aadhaar') && d.status === 'available'),
        weight: 10,
        route: '/documents',
      },
      {
        id: 'bankAccount',
        label: 'Bank account / passbook available',
        passed: profile.bankAccount || documents.some((d) => d.name.toLowerCase().includes('bank') && d.status === 'available'),
        weight: 10,
        route: '/documents',
      },
      {
        id: 'pan',
        label: 'PAN Card available',
        passed: profile.panAvailable || documents.some((d) => d.name.toLowerCase().includes('pan') && d.status === 'available'),
        weight: 5,
        route: '/documents',
      },
      {
        id: 'photo',
        label: 'Passport photo available',
        passed: documents.some((d) => d.name.toLowerCase().includes('photo') && d.status === 'available'),
        weight: 5,
        route: '/documents',
      },
    ];

    const totalWeight = items.reduce((s, i) => s + i.weight, 0);
    const earnedWeight = items.filter((i) => i.passed).reduce((s, i) => s + i.weight, 0);
    const score = Math.round((earnedWeight / totalWeight) * 100);

    const label: ReadinessScore['label'] =
      score >= 85 ? 'Excellent' : score >= 65 ? 'Good' : score >= 45 ? 'Fair' : 'Needs Work';

    const color =
      score >= 85 ? '#16a34a' : score >= 65 ? '#2563eb' : score >= 45 ? '#d97706' : '#dc2626';

    return {
      score,
      maxScore: 100,
      items,
      passedItems: items.filter((i) => i.passed),
      failedItems: items.filter((i) => !i.passed),
      label,
      color,
    };
  }, [profile, documents]);
}
