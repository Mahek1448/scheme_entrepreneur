import type { Application, Document, Partner, AdminStats, Notification } from '../types';

/**
 * mockData.ts
 *
 * NOTE: DEMO_PROFILE (Chai Stall / Sunita) is kept here for reference only.
 * It is NOT auto-loaded. It is only accessible via `loadDemoProfile()` in useAppStore.
 * Normal users start with an EMPTY_PROFILE.
 */

// ─── Partners ────────────────────────────────────────────────────────────────
// Partners are listed generically — not Mumbai-specific.
// PartnerRouting.tsx ranks these based on the actual user profile + selected scheme.
export const SAMPLE_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'State Bank of India – MSME Branch',
    type: 'bank',
    description: 'Lead bank for MUDRA and PMEGP disbursals across India. Dedicated MSME desk with trained officers.',
    services: ['MUDRA Shishu', 'MUDRA Kishor', 'PMEGP', 'SHG Linkage', 'Stand-Up India'],
    contactPhone: '1800-11-2211',
    address: 'SBI Main Branch, Fort, Mumbai, Maharashtra 400001',
    rating: 4.2,
    languages: ['Hindi', 'English', 'Regional Language'],
    distance: 1.8,
    latitude: 18.9322,
    longitude: 72.8354,
  },
  {
    id: 'p2',
    name: 'Bank of Maharashtra – Fort Branch',
    type: 'bank',
    description: 'Active MUDRA lender with a dedicated street vendor support desk. Quick processing within 7 working days.',
    services: ['MUDRA Loan', 'PM SVANidhi', 'CGTMSE', 'PMEGP', 'Small Business Loan'],
    contactPhone: '1800-233-4526',
    address: 'Bank of Maharashtra, Fort, Mumbai, Maharashtra 400001',
    rating: 4.6,
    languages: ['Hindi', 'Marathi', 'English'],
    distance: 0.9,
    latitude: 18.9290,
    longitude: 72.8344,
  },
  {
    id: 'p3',
    name: 'NGO Support – Udyam Sahayata',
    type: 'ngo',
    description: 'NGO specialising in entrepreneur support — free mentorship, application assistance, and training programs for SC/ST/OBC.',
    services: ['Application Guidance', 'Business Training', 'PM SVANidhi Help', 'Document Preparation', 'Financial Literacy'],
    contactPhone: '9800123456',
    contactEmail: 'help@udyamsahayata.org',
    address: 'Bandra West, Mumbai, Maharashtra 400050',
    rating: 3.8,
    languages: ['Hindi', 'English', 'Marathi', 'Tamil', 'Bengali'],
    distance: 2.4,
    latitude: 19.0596,
    longitude: 72.8295,
  },
  {
    id: 'p4',
    name: 'DIC Mumbai – District Industries Centre',
    type: 'government_office',
    description: 'Official body that processes PMEGP applications. Also issues MSME / Udyam registrations and coordinates EDP training.',
    services: ['PMEGP Processing', 'MSME Udyam Registration', 'EDP Training', 'PM-DAKSH Training Referral', 'MSME Support'],
    contactPhone: '022-22625333',
    address: 'DIC Office, Churchgate, Mumbai, Maharashtra 400020',
    rating: 4.0,
    languages: ['Hindi', 'English', 'Marathi'],
    distance: 1.8,
    latitude: 18.9367,
    longitude: 72.8296,
  },
  {
    id: 'p5',
    name: 'PM SVANidhi Application Portal',
    type: 'online_portal',
    description: 'Official government portal for street vendors to apply for PM SVANidhi working capital loan of ₹10,000–₹50,000.',
    services: ['PM SVANidhi Loan', 'Vendor Registration Status Check', 'Digital Payment Incentive'],
    website: 'https://pmsvanidhi.mohua.gov.in',
    rating: 4.3,
    languages: ['Hindi', 'English', 'Marathi', 'Tamil', 'Telugu'],
    distance: 0,
    latitude: 18.9388,
    longitude: 72.8354,
  },
  {
    id: 'p6',
    name: 'SBI Colaba Branch',
    type: 'bank',
    description: 'Provides MSME loans, MUDRA loans and support for small businesses and entrepreneurs in the Colaba area.',
    services: ['MUDRA Loan', 'PMEGP', 'SHG Linkage'],
    contactPhone: '022-22023432',
    address: 'SBI Colaba, Colaba Causeway, Mumbai, Maharashtra 400005',
    rating: 4.2,
    languages: ['Hindi', 'English', 'Marathi'],
    distance: 1.7,
    latitude: 18.9068,
    longitude: 72.8147,
  },
];

// ─── Sample Documents ─────────────────────────────────────────────────────────
// These are generic documents — not specific to Sunita/Chai Stall.
// DocumentsReadiness.tsx builds the list dynamically from the selected scheme.
export const SAMPLE_DOCUMENTS: Document[] = [
  { id: 'doc-1', name: 'Aadhaar Card', description: '12-digit unique identification number', status: 'missing', required: true },
  { id: 'doc-2', name: 'PAN Card', description: 'Permanent Account Number for income tax', status: 'missing', required: true },
  { id: 'doc-3', name: 'Bank Passbook / Statement', description: 'Last 6 months bank account statement', status: 'missing', required: true },
  { id: 'doc-4', name: 'Passport Photo', description: 'Recent passport-size photograph (3 copies)', status: 'missing', required: true },
  { id: 'doc-5', name: 'Residence Proof', description: 'Electricity bill / rent agreement / voter ID', status: 'missing', required: true },
  { id: 'doc-6', name: 'Caste / Category Certificate', description: 'Certificate from competent authority — needed for category benefits', status: 'missing', required: false },
  { id: 'doc-7', name: 'Business Plan / Project Report', description: 'Detailed plan describing your business for scheme applications', status: 'missing', required: true },
  { id: 'doc-8', name: 'Income Certificate', description: 'Annual family income certificate', status: 'missing', required: false },
  { id: 'doc-9', name: 'Certificate of Vending (CoV)', description: 'Street vendor certificate issued by ULB — required for PM SVANidhi', status: 'missing', required: false },
];

// ─── Sample Applications ──────────────────────────────────────────────────────
export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    schemeId: 'mudra-shishu',
    schemeName: 'MUDRA Shishu',
    status: 'under_review',
    appliedAt: '2026-08-20T09:00:00Z',
    lastUpdated: '2026-09-01T14:30:00Z',
    referenceNumber: 'MUDRA/2026/089234',
    amount: 50000,
    steps: [
      { id: 's1', title: 'Application Submitted', description: 'Your application was received by the bank.', completedAt: '2026-08-20T09:00:00Z', status: 'completed' },
      { id: 's2', title: 'Document Verification', description: 'Bank verified your submitted documents.', completedAt: '2026-08-25T11:00:00Z', status: 'completed' },
      { id: 's3', title: 'Credit Assessment', description: 'Credit bureau check and income verification in progress.', status: 'current' },
      { id: 's4', title: 'Sanction & Disbursement', description: 'Loan will be sanctioned and funds disbursed to your account.', status: 'pending' },
    ],
  },
];

// ─── Notifications ─────────────────────────────────────────────────────────────
export const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Scheme Match Found', message: 'Based on your profile, MUDRA Shishu could be a great fit. Complete your eligibility check.', type: 'info', read: false, createdAt: new Date().toISOString() },
  { id: 'n2', title: 'Complete Your Profile', message: 'Fill in all required profile fields to get accurate scheme recommendations.', type: 'warning', read: false, createdAt: new Date().toISOString() },
];

// ─── Admin Stats ──────────────────────────────────────────────────────────────
export const ADMIN_STATS: AdminStats = {
  totalUsers: 14782,
  activeApplications: 3241,
  approvedApplications: 8934,
  totalFundingDisbursed: 24700000000,
  topSchemes: [
    { name: 'MUDRA Shishu', applications: 5420 },
    { name: 'PM SVANidhi', applications: 4210 },
    { name: 'PMEGP', applications: 3210 },
    { name: 'MUDRA Kishor', applications: 2890 },
    { name: 'PM-DAKSH', applications: 980 },
  ],
  usersByState: [
    { state: 'Maharashtra', count: 2840 },
    { state: 'Uttar Pradesh', count: 2210 },
    { state: 'Tamil Nadu', count: 1780 },
    { state: 'West Bengal', count: 1450 },
    { state: 'Gujarat', count: 1320 },
    { state: 'Rajasthan', count: 1100 },
    { state: 'Others', count: 4082 },
  ],
  weeklySignups: [210, 340, 290, 450, 380, 510, 480],
};
