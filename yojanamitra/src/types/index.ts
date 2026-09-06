// ─── Primitive Enums ─────────────────────────────────────────────────────────

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type Category =
  | 'general'
  | 'sc'
  | 'st'
  | 'obc'
  | 'minority'
  | 'safai_karamchari'
  | 'denotified_nomadic_tribe'
  | 'pwd';

export type BusinessStage = 'idea' | 'startup' | 'growing' | 'established';

export type Occupation =
  | 'unemployed'
  | 'street_vendor'
  | 'traditional_artisan'
  | 'self_employed_informal'
  | 'farmer'
  | 'salaried'
  | 'any';

export type SchemeCategory =
  | 'loan'
  | 'loan_with_subsidy'
  | 'subsidy'
  | 'grant'
  | 'training'
  | 'infrastructure';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'disbursed';

export type DocumentStatus = 'available' | 'missing' | 'expired' | 'uploading';

export type EligibilityStatus = 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'NEEDS_MORE_INFORMATION';

// ─── Scheme Model ─────────────────────────────────────────────────────────────

export interface SchemeFundingDetails {
  minAmount?: number;
  maxAmount?: number;
  maxAmountManufacturing?: number;
  maxAmountService?: number;
  currency: 'INR';
  interestRateRange?: { min: number; max: number };
  interestSubsidyPercent?: number;
  repaymentYears?: { min: number; max: number };
  repaymentMonths?: number;
  subsidyPercent?: Record<string, number>;
  tranche1?: number;
  tranche2?: number;
  tranche3?: number;
  type?: string;
  stipendPerMonth?: { min: number; max: number };
  costToApplicant?: number;
}

export interface SchemeEducationCriteria {
  required: boolean;
  minimumForProjectAbove10L?: string;
  note?: string;
}

export interface SchemeExistingBeneficiaryCriteria {
  allowedIfPreviousPMEGP?: boolean;
  allowedIfPreviousMUDRA?: boolean;
  allowedIfPreviousSVANidhi?: boolean;
  note?: string;
}

export interface SchemeIncomeCriteria {
  annualFamilyIncome?: {
    maxForSC?: number;
    maxForOBC?: number;
    maxGeneral?: number;
  };
}

export interface SchemeEligibilityCriteria {
  minAge: number;
  maxAge: number | null;
  gender: Gender[];
  category: Category[];
  education: SchemeEducationCriteria;
  businessStages: BusinessStage[];
  occupation: Occupation[];
  states: string | string[];
  streetVendor?: boolean;
  requiredProof?: string;
  existingBeneficiary?: SchemeExistingBeneficiaryCriteria;
  incomeCriteria?: SchemeIncomeCriteria;
  maxProjectCostManufacturing?: number;
  maxProjectCostService?: number;
  noBadCIBIL?: boolean;
  selfHelpGroup?: boolean;
  institutions?: boolean;
  note?: string;
}

export interface SchemeApplicationRoute {
  online?: string;
  offline?: string;
  helpline?: string;
  processingTime: string;
}

export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  implementingAgency: string;
  category: SchemeCategory;
  purpose: string;
  description: string;
  benefits: string[];
  fundingDetails: SchemeFundingDetails;
  eligibilityCriteria: SchemeEligibilityCriteria;
  requiredDocuments: string[];
  applicationRoute: SchemeApplicationRoute;
  successRate: number;
  tags: string[];
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  category: Category;
  state: string;
  district: string;
  isUrban: boolean;
  pincode?: string;
  businessType: string;
  businessStage: BusinessStage;
  occupation: Occupation;
  isStreetVendor: boolean;
  monthlyRevenue: number;
  annualFamilyIncome: number;
  availableCapital: number;
  fundingRequirement: number;
  existingLoan: boolean;
  previousPMEGPBeneficiary: boolean;
  previousMUDRABeneficiary: boolean;
  previousSVANidhiBeneficiary: boolean;
  hasCIBILDefault: boolean;
  aadhaarVerified: boolean;
  panAvailable: boolean;
  bankAccount: boolean;
  casteCertificateAvailable: boolean;
  educationLevel:
    | 'no_formal'
    | 'primary'
    | '8th_pass'
    | '10th_pass'
    | '12th_pass'
    | 'graduate'
    | 'postgraduate';
  hasStreetVendorCertificate: boolean;
  createdAt: string;
}

// ─── Eligibility Engine Results ───────────────────────────────────────────────

export interface EligibilityCriterionCheck {
  criterion: string;
  label: string;
  userValue: string;
  requiredValue: string;
  passed: boolean;
  isBlocking: boolean;
  isMissingInfo: boolean;
  note?: string;
}

export interface EligibilityResult {
  schemeId: string;
  status: EligibilityStatus;
  checks: EligibilityCriterionCheck[];
  passedChecks: EligibilityCriterionCheck[];
  failedChecks: EligibilityCriterionCheck[];
  missingInfoChecks: EligibilityCriterionCheck[];
  blockingConditions: string[];
  missingInformation: string[];
  unmetCriteria: string[];
  matchedCriteria: string[];
  summary: string;
}

// ─── Recommendation Engine Results ───────────────────────────────────────────

export interface MatchScoreBreakdown {
  businessCompatibility: number;     // 0–100
  fundingCompatibility: number;      // 0–100
  beneficiaryCompatibility: number;  // 0–100
  stageCompatibility: number;        // 0–100
  locationCompatibility: number;     // 0–100
  purposeAlignment: number;          // 0–100
  total: number;                     // weighted average 0–100
}

export interface RecommendationResult {
  scheme: Scheme;
  matchScore: number;               // 0–100 — How relevant the scheme is to the profile
  matchScoreBreakdown: MatchScoreBreakdown;
  eligibilityResult: EligibilityResult;
  whyItMatches: string[];           // Human-readable match reasons (deterministic)
  whyEligible: string[];            // Passed eligibility criteria in plain language
  missingRequirements: string[];    // What the user still needs to become eligible
  requiredDocuments: string[];      // Documents needed for this scheme
  priorityRank: number;             // Final ranking position
}

// ─── Application Tracker ─────────────────────────────────────────────────────

export interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  completedAt?: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  status: ApplicationStatus;
  appliedAt: string;
  lastUpdated: string;
  referenceNumber: string;
  steps: ApplicationStep[];
  notes?: string;
  amount?: number;
}

// ─── Documents ───────────────────────────────────────────────────────────────

export interface Document {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
  required: boolean;
  uploadedAt?: string;
  expiresAt?: string;
  fileSize?: string;
}

// ─── Partners ────────────────────────────────────────────────────────────────

export type PartnerType = 'bank' | 'ngo' | 'government_office' | 'online_portal';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  description: string;
  services: string[];
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  website?: string;
  rating: number;
  languages: string[];
  distance?: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface AdminStats {
  totalUsers: number;
  activeApplications: number;
  approvedApplications: number;
  totalFundingDisbursed: number;
  topSchemes: { name: string; applications: number }[];
  usersByState: { state: string; count: number }[];
  weeklySignups: number[];
}
