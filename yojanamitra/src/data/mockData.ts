import type { UserProfile, Application, Document, Partner, AdminStats, Notification } from '../types';

// ─── Demo Profile (Chai Stall, Mumbai) ────────────────────────────────────────
export const DEMO_PROFILE: UserProfile = {
  id: 'demo-001',
  name: 'Sunita Devi',
  age: 34,
  gender: 'female',
  category: 'obc',
  state: 'Maharashtra',
  district: 'Mumbai',
  isUrban: true,
  pincode: '400001',
  businessType: 'Chai Stall / Tea Shop',
  businessStage: 'idea',
  occupation: 'street_vendor',
  isStreetVendor: true,
  monthlyRevenue: 25000,
  annualFamilyIncome: 180000,
  availableCapital: 40000,
  fundingRequirement: 50000,
  existingLoan: false,
  previousPMEGPBeneficiary: false,
  previousMUDRABeneficiary: false,
  previousSVANidhiBeneficiary: false,
  hasCIBILDefault: false,
  aadhaarVerified: true,
  panAvailable: false,
  bankAccount: true,
  casteCertificateAvailable: false,
  educationLevel: '10th_pass',
  hasStreetVendorCertificate: false,
  createdAt: '2026-08-15T10:30:00Z',
};

// ─── Sample Applications ──────────────────────────────────────────────────────
export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    schemeId: 'mudra-shishu',
    schemeName: 'MUDRA Shishu',
    status: 'under_review',
    appliedAt: '2026-08-20T09:00:00Z',
    lastUpdated: '2026-09-01T14:30:00Z',
    referenceNumber: 'MUDRA/MH/2026/089234',
    amount: 50000,
    steps: [
      { id: 's1', title: 'Application Submitted', description: 'Your application was received by the bank.', completedAt: '2026-08-20T09:00:00Z', status: 'completed' },
      { id: 's2', title: 'Document Verification', description: 'Bank verified your submitted documents.', completedAt: '2026-08-25T11:00:00Z', status: 'completed' },
      { id: 's3', title: 'Credit Assessment', description: 'Credit bureau check and income verification in progress.', status: 'current' },
      { id: 's4', title: 'Sanction & Disbursement', description: 'Loan will be sanctioned and funds disbursed to your account.', status: 'pending' },
    ],
  },
  {
    id: 'app-002',
    schemeId: 'pmegp',
    schemeName: 'PMEGP',
    status: 'draft',
    appliedAt: '2026-09-03T16:00:00Z',
    lastUpdated: '2026-09-03T16:00:00Z',
    referenceNumber: 'PMEGP/MH/2026/DRAFT',
    steps: [
      { id: 's1', title: 'Application Started', description: 'You started filling the PMEGP application.', completedAt: '2026-09-03T16:00:00Z', status: 'completed' },
      { id: 's2', title: 'Submit to KVIC', description: 'Submit your complete application to the nearest KVIC office.', status: 'current' },
      { id: 's3', title: 'Interview & EDP Training', description: 'Attend Entrepreneur Development Programme (2-week residential).', status: 'pending' },
      { id: 's4', title: 'Bank Linkage', description: 'Application forwarded to bank for loan processing.', status: 'pending' },
      { id: 's5', title: 'Subsidy Released', description: 'Subsidy credited directly to your loan account.', status: 'pending' },
    ],
  },
];

// ─── Sample Documents ─────────────────────────────────────────────────────────
export const SAMPLE_DOCUMENTS: Document[] = [
  { id: 'doc-1', name: 'Aadhaar Card', description: '12-digit unique identification number', status: 'available', required: true, uploadedAt: '2026-08-10', fileSize: '245 KB' },
  { id: 'doc-2', name: 'PAN Card', description: 'Permanent Account Number for income tax', status: 'missing', required: true },
  { id: 'doc-3', name: 'Bank Passbook / Statement', description: 'Last 6 months bank account statement', status: 'available', required: true, uploadedAt: '2026-08-12', fileSize: '1.2 MB' },
  { id: 'doc-4', name: 'Passport Photo', description: 'Recent passport-size photograph (3 copies)', status: 'available', required: true, uploadedAt: '2026-08-10', fileSize: '120 KB' },
  { id: 'doc-5', name: 'Residence Proof', description: 'Electricity bill / rent agreement / voter ID', status: 'available', required: true, uploadedAt: '2026-08-11', fileSize: '380 KB' },
  { id: 'doc-6', name: 'Caste / OBC Certificate', description: 'OBC certificate from competent authority — needed for category benefits', status: 'missing', required: false },
  { id: 'doc-7', name: 'Business Plan / Project Report', description: 'Detailed plan for PMEGP application', status: 'missing', required: true },
  { id: 'doc-8', name: 'Income Certificate', description: 'Annual family income certificate', status: 'available', required: false, uploadedAt: '2026-08-13', fileSize: '95 KB' },
  { id: 'doc-9', name: 'Certificate of Vending (CoV)', description: 'Street vendor certificate issued by ULB — required for PM SVANidhi', status: 'missing', required: false },
];

// ─── Sample Partners ──────────────────────────────────────────────────────────
export const SAMPLE_PARTNERS: Partner[] = [
  {
    id: 'p1', name: 'State Bank of India – Colaba Branch', type: 'bank',
    description: 'Lead bank for MUDRA and PMEGP disbursals in Mumbai Central district.',
    services: ['MUDRA Shishu', 'MUDRA Kishor', 'PMEGP', 'SHG Linkage', 'Jan Dhan'],
    contactPhone: '022-22026981', address: 'Colaba, Mumbai 400005',
    rating: 4.2, languages: ['Hindi', 'Marathi', 'English'], distance: 1.8,
  },
  {
    id: 'p2', name: 'Bank of Maharashtra – Fort Branch', type: 'bank',
    description: 'Active MUDRA lender with dedicated MSME desk and quick processing.',
    services: ['MUDRA Loan', 'Stand-Up India', 'CGTMSE', 'PM SVANidhi'],
    contactPhone: '022-22694020', address: 'Fort, Mumbai 400001',
    rating: 4.0, languages: ['Hindi', 'Marathi'], distance: 0.9,
  },
  {
    id: 'p3', name: 'Stree Shakti Udyog Sangathan', type: 'ngo',
    description: 'NGO specialising in women entrepreneur support – free mentorship, application assistance.',
    services: ['Application Guidance', 'Business Training', 'PM SVANidhi Help', 'Document Prep'],
    contactPhone: '9820123456', contactEmail: 'info@ssusmumbai.org',
    address: 'Dharavi, Mumbai 400017',
    rating: 4.7, languages: ['Hindi', 'Marathi', 'Urdu'], distance: 3.2,
  },
  {
    id: 'p4', name: 'District Industries Centre (DIC) Mumbai', type: 'government_office',
    description: 'Processes PMEGP applications and issues MSME / Udyam registrations.',
    services: ['PMEGP Processing', 'MSME Udyam Registration', 'EDP Training Coordination'],
    contactPhone: '022-23075041', address: 'Lower Parel, Mumbai 400013',
    rating: 3.8, languages: ['Hindi', 'Marathi', 'English'], distance: 5.5,
  },
  {
    id: 'p5', name: 'PM SVANidhi Application Portal', type: 'online_portal',
    description: 'Official portal for street vendors to apply for PM SVANidhi working capital loan.',
    services: ['PM SVANidhi Loan', 'Vendor Registration Status Check'],
    website: 'https://pmsvanidhi.mohua.gov.in',
    rating: 4.3, languages: ['Hindi', 'English', 'Marathi'], distance: 0,
  },
];

// ─── Notifications ─────────────────────────────────────────────────────────────
export const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'MUDRA Application Update', message: 'Your MUDRA Shishu application is under credit review. Expected decision in 5-7 days.', type: 'info', read: false, createdAt: '2026-09-01T14:30:00Z' },
  { id: 'n2', title: 'Missing Document Alert', message: 'PAN Card and Certificate of Vending are required for your pending applications.', type: 'warning', read: false, createdAt: '2026-09-02T09:00:00Z' },
  { id: 'n3', title: 'PM SVANidhi Eligible', message: 'Based on your street vendor status, you may qualify for PM SVANidhi ₹10,000 loan. Apply now.', type: 'success', read: true, createdAt: '2026-08-28T10:00:00Z' },
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
