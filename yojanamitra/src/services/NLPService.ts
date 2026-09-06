/**
 * NLPService.ts — Modular NLP/AI extraction service.
 *
 * Architecture:
 *   Natural Language Input → NLPService.extract() → PartialUserProfile
 *
 * Currently: LOCAL MOCK extraction using pattern matching + keyword dictionaries.
 * To connect a real LLM (Gemini / GPT), replace extractWithLLM() only.
 * The rest of the pipeline (EligibilityEngine, RecommendationEngine) remains unchanged.
 *
 * IMPORTANT: AI/NLP extracts the profile ONLY.
 * Eligibility is always decided by the deterministic EligibilityEngine.
 */

import type { UserProfile, BusinessStage, Occupation, Category, Gender } from '../types';

export type ExtractionConfidence = 'high' | 'medium' | 'low' | 'unknown';

export interface ExtractedField<T> {
  value: T | null;
  confidence: ExtractionConfidence;
  sourceText?: string;
}

export interface ExtractionResult {
  businessType: ExtractedField<string>;
  businessStage: ExtractedField<BusinessStage>;
  location: ExtractedField<string>;
  state: ExtractedField<string>;
  isUrban: ExtractedField<boolean>;
  availableCapital: ExtractedField<number>;
  fundingRequirement: ExtractedField<number>;
  monthlyRevenue: ExtractedField<number>;
  annualFamilyIncome: ExtractedField<number>;
  category: ExtractedField<Category>;
  gender: ExtractedField<Gender>;
  occupation: ExtractedField<Occupation>;
  isStreetVendor: ExtractedField<boolean>;
  age: ExtractedField<number>;
  educationLevel: ExtractedField<UserProfile['educationLevel']>;
  rawText: string;
  language: 'en' | 'hi' | 'mr' | 'mixed';
  extractionMethod: 'local_mock' | 'llm_api';
}

// ─── Keyword Dictionaries ─────────────────────────────────────────────────────

const BUSINESS_KEYWORDS: [RegExp, string][] = [
  [/chai\s*(stall|shop|wala|ka|ki)?|tea\s*(stall|shop|vendor)|चाय|चहा/i, 'Chai / Tea Stall'],
  [/tiffin|dabba|खाना|जेवण|food\s*(cart|stall)|catering/i, 'Tiffin / Food Service'],
  [/salon|parlour|parlor|beauty|बाल\s*कटाई|नाई|केस/i, 'Beauty Parlour / Salon'],
  [/tailoring|tailor|stitching|sewing|सिलाई|शिलाई/i, 'Tailoring / Stitching'],
  [/kirana|grocery|general\s*store|दुकान|किराणा/i, 'Kirana / Grocery Store'],
  [/handicraft|pottery|weaving|craft|हस्तशिल्प|बुनाई/i, 'Handicraft / Artisan'],
  [/mobile\s*(repair|shop)|repair\s*shop|मोबाइल/i, 'Mobile Repair Shop'],
  [/bakery|bread|बेकरी|मिठाई|sweet/i, 'Bakery / Sweet Shop'],
  [/auto|rickshaw|transport|taxi|ऑटो|रिक्शा/i, 'Transport / Auto Rickshaw'],
  [/farming|agriculture|खेती|शेती/i, 'Farming / Agriculture'],
  [/vegetable|sabzi|भाजी|सब्जी|फल/i, 'Vegetable / Fruit Vendor'],
  [/flower|phool|फूल/i, 'Flower Vendor'],
];

const LOCATION_PATTERNS: [RegExp, string, string, boolean][] = [
  // [pattern, city, state, isUrban]
  [/mumbai|मुंबई|bombay/i, 'Mumbai', 'Maharashtra', true],
  [/pune|पुणे/i, 'Pune', 'Maharashtra', true],
  [/nagpur|नागपुर/i, 'Nagpur', 'Maharashtra', true],
  [/delhi|दिल्ली|new delhi/i, 'Delhi', 'Delhi', true],
  [/bangalore|bengaluru|बेंगलुरु/i, 'Bengaluru', 'Karnataka', true],
  [/chennai|चेन्नई|madras/i, 'Chennai', 'Tamil Nadu', true],
  [/kolkata|कोलकाता|calcutta/i, 'Kolkata', 'West Bengal', true],
  [/hyderabad|हैदराबाद/i, 'Hyderabad', 'Telangana', true],
  [/ahmedabad|अहमदाबाद/i, 'Ahmedabad', 'Gujarat', true],
  [/jaipur|जयपुर/i, 'Jaipur', 'Rajasthan', true],
  [/lucknow|लखनऊ/i, 'Lucknow', 'Uttar Pradesh', true],
  [/patna|पटना/i, 'Patna', 'Bihar', true],
  [/bhopal|भोपाल/i, 'Bhopal', 'Madhya Pradesh', true],
  [/surat|सूरत/i, 'Surat', 'Gujarat', true],
  [/nashik|नासिक/i, 'Nashik', 'Maharashtra', true],
  [/aurangabad|औरंगाबाद/i, 'Aurangabad', 'Maharashtra', true],
];

const STATE_PATTERNS: [RegExp, string][] = [
  [/maharashtra|महाराष्ट्र/i, 'Maharashtra'],
  [/uttar\s*pradesh|up\b|उत्तर\s*प्रदेश/i, 'Uttar Pradesh'],
  [/karnataka|कर्नाटक/i, 'Karnataka'],
  [/tamil\s*nadu|तमिलनाडु/i, 'Tamil Nadu'],
  [/west\s*bengal|पश्चिम\s*बंगाल/i, 'West Bengal'],
  [/gujarat|गुजरात/i, 'Gujarat'],
  [/rajasthan|राजस्थान/i, 'Rajasthan'],
  [/bihar|बिहार/i, 'Bihar'],
  [/madhya\s*pradesh|mp\b|मध्य\s*प्रदेश/i, 'Madhya Pradesh'],
  [/andhra\s*pradesh|आंध्र\s*प्रदेश/i, 'Andhra Pradesh'],
  [/telangana|तेलंगाना/i, 'Telangana'],
  [/delhi|दिल्ली/i, 'Delhi'],
];




function parseAmount(text: string): number | null {
  // Try lakh patterns first
  const lakhMatch = text.match(/(?:rs\.?|₹|inr)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b|लाख)/i);
  if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 100000);

  // Thousand / K
  const kMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:thousand|k\b|हज़ार|हजार)/i);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);

  // ₹ followed by number
  const rupeeMatch = text.match(/(?:rs\.?|₹|inr)\s*([\d,]+)/i);
  if (rupeeMatch) return parseInt(rupeeMatch[1].replace(/,/g, ''), 10);

  return null;
}

function extractCapitalAndLoan(text: string): { capital: number | null; loan: number | null } {
  // Split text into segments around capital/loan keywords
  const lowerText = text.toLowerCase();

  // Patterns for capital (what the user HAS)
  const capitalPatterns = [
    /(?:(?:mere|meri|my|माझ्याकडे|मेरे|मेरी)\s+)?(?:paas|pas|पास|capital|have|available|पूंजी|भांडवल)\s+(?:rs\.?|₹|inr)?\s*([\d,]+(?:\s*(?:lakh|lac|l\b|thousand|k\b|हज़ार|हजार|लाख))?)/i,
    /(?:rs\.?|₹|inr)\s*([\d,]+(?:\s*(?:lakh|lac|l\b|thousand|k\b|हज़ार|हजार|लाख))?)\s+(?:paas|pas|पास|available|hain|है)/i,
  ];

  // Patterns for loan (what the user NEEDS)
  const loanPatterns = [
    /(?:loan|rin|ऋण|कर्ज|lending|chahiye|चाहिए|need|required|हवे)\s+(?:of\s+)?(?:rs\.?|₹|inr)?\s*([\d,]+(?:\s*(?:lakh|lac|l\b|thousand|k\b|हज़ार|हजार|लाख))?)/i,
    /(?:rs\.?|₹|inr)\s*([\d,]+(?:\s*(?:lakh|lac|l\b|thousand|k\b|हज़ार|हजार|लाख))?)\s+(?:ka\s+)?(?:loan|rin|ऋण|कर्ज)/i,
  ];

  let capital: number | null = null;
  let loan: number | null = null;

  for (const pattern of capitalPatterns) {
    const m = text.match(pattern);
    if (m) { capital = parseAmount(m[0]); break; }
  }

  for (const pattern of loanPatterns) {
    const m = text.match(pattern);
    if (m) { loan = parseAmount(m[0]); break; }
  }

  // Fallback: find all currency amounts
  if (capital === null && loan === null) {
    const amounts: number[] = [];
    const allMatches = [...text.matchAll(/(?:rs\.?|₹|inr)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lac|l\b|लाख)/gi)];
    for (const m of allMatches) {
      amounts.push(parseFloat(m[1]) * 100000);
    }
    const kMatches = [...text.matchAll(/(?:rs\.?|₹|inr)\s*([\d,]+)/g)];
    for (const m of kMatches) {
      const val = parseInt(m[1].replace(/,/g, ''), 10);
      if (val > 0) amounts.push(val);
    }

    if (amounts.length === 1) {
      // Only one amount — assume it's capital if context has 'paas/have', else loan
      if (/paas|pas|पास|have|available|hain|है/i.test(lowerText)) {
        capital = amounts[0];
      } else {
        loan = amounts[0];
      }
    } else if (amounts.length >= 2) {
      capital = amounts[0];
      loan = amounts[1];
    }
  }

  return { capital, loan };
}

// ─── Street Vendor Detection ──────────────────────────────────────────────────
function isStreetVendor(businessType: string | null, text: string): boolean {
  if (!businessType) return false;
  const streetVendorTypes = ['chai', 'tea stall', 'vegetable', 'fruit', 'flower', 'paan', 'stall', 'cart', 'thela'];
  const streetKeywords = /vendor|street|thela|ठेला|गाड़ी|गल्ला|stall|hawker|फेरी/i;
  return streetVendorTypes.some((t) => businessType.toLowerCase().includes(t)) || streetKeywords.test(text);
}

// ─── Language Detection ────────────────────────────────────────────────────────
function detectLanguage(text: string): 'en' | 'hi' | 'mr' | 'mixed' {
  const hindiChars = (text.match(/[\u0900-\u097F]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  if (hindiChars === 0) return 'en';
  if (hindiChars / totalChars > 0.5) {
    // Marathi-specific words
    if (/आहे|मला|माझ्या|आणि|आम्ही/i.test(text)) return 'mr';
    return 'hi';
  }
  return 'mixed';
}

// ─── Local Mock Extractor ─────────────────────────────────────────────────────
function extractLocally(text: string): ExtractionResult {
  const lang = detectLanguage(text);

  // Business type
  let businessType: string | null = null;
  for (const [pattern, label] of BUSINESS_KEYWORDS) {
    if (pattern.test(text)) { businessType = label; break; }
  }

  // Location + State
  let location: string | null = null;
  let state: string | null = null;
  let isUrban = true;
  for (const [pattern, city, st, urban] of LOCATION_PATTERNS) {
    if (pattern.test(text)) { location = city; state = st; isUrban = urban; break; }
  }
  if (!state) {
    for (const [pattern, st] of STATE_PATTERNS) {
      if (pattern.test(text)) { state = st; break; }
    }
  }

  // Capital + Loan
  const { capital, loan } = extractCapitalAndLoan(text);

  // Business stage
  let businessStage: BusinessStage | null = null;
  if (/shuru|start|new|naya|नया|नई|शुरू|new\s*business|idea|नवीन/i.test(text)) businessStage = 'idea';
  else if (/running|chal\s*raha|चल\s*रहा|existing|already|पहले से/i.test(text)) businessStage = 'startup';
  else if (/expand|grow|बड़ा|वाढव/i.test(text)) businessStage = 'growing';

  // Occupation
  let occupation: Occupation | null = null;
  if (isStreetVendor(businessType, text)) occupation = 'street_vendor';
  else if (/artisan|karigar|कारीगर|craft|handicraft/i.test(text)) occupation = 'traditional_artisan';
  else if (/farmer|kisan|किसान|sheti|शेती/i.test(text)) occupation = 'farmer';

  // Gender
  let gender: Gender | null = null;
  if (/mahila|woman|women|lady|female|she|her|मैं महिला|aurat|महिला/i.test(text)) gender = 'female';
  else if (/main|mai|main hun|male|man|पुरुष/i.test(text)) gender = 'male';

  // Category
  let category: Category | null = null;
  if (/obc|other\s*backward/i.test(text)) category = 'obc';
  else if (/sc\b|scheduled\s*caste|dalit/i.test(text)) category = 'sc';
  else if (/st\b|scheduled\s*tribe|tribal|adivasi|आदिवासी/i.test(text)) category = 'st';
  else if (/minority|muslim|christian|sikh|minorities/i.test(text)) category = 'minority';

  // Age
  const ageMatch = text.match(/(\d{2})\s*(?:saal|sal|year|वर्ष|साल|वय)/i);
  const age = ageMatch ? parseInt(ageMatch[1], 10) : null;

  // Monthly income
  let monthlyRevenue: number | null = null;
  const incomeMatch = text.match(/(?:income|earn|kamai|कमाई|income)\s*(?:rs\.?|₹)?\s*([\d,]+)/i);
  if (incomeMatch) monthlyRevenue = parseInt(incomeMatch[1].replace(/,/g, ''), 10);

  return {
    businessType: { value: businessType, confidence: businessType ? 'high' : 'unknown' },
    businessStage: { value: businessStage ?? 'idea', confidence: businessStage ? 'medium' : 'low' },
    location: { value: location, confidence: location ? 'high' : 'unknown' },
    state: { value: state, confidence: state ? 'high' : 'unknown' },
    isUrban: { value: isUrban, confidence: location ? 'high' : 'medium' },
    availableCapital: { value: capital, confidence: capital !== null ? 'high' : 'unknown', sourceText: capital ? `₹${capital.toLocaleString('en-IN')}` : undefined },
    fundingRequirement: { value: loan, confidence: loan !== null ? 'high' : 'unknown', sourceText: loan ? `₹${loan.toLocaleString('en-IN')}` : undefined },
    monthlyRevenue: { value: monthlyRevenue, confidence: monthlyRevenue !== null ? 'medium' : 'unknown' },
    annualFamilyIncome: { value: monthlyRevenue ? monthlyRevenue * 12 : null, confidence: monthlyRevenue ? 'medium' : 'unknown' },
    category: { value: category, confidence: category ? 'high' : 'unknown' },
    gender: { value: gender, confidence: gender ? 'medium' : 'unknown' },
    occupation: { value: occupation ?? (businessStage === 'idea' ? 'unemployed' : 'self_employed_informal'), confidence: occupation ? 'medium' : 'low' },
    isStreetVendor: { value: isStreetVendor(businessType, text), confidence: 'medium' },
    age: { value: age, confidence: age ? 'high' : 'unknown' },
    educationLevel: { value: null, confidence: 'unknown' },
    rawText: text,
    language: lang,
    extractionMethod: 'local_mock',
  };
}

// ─── LLM Stub (replace body to connect real API) ──────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function extractWithLLM(_text: string): Promise<ExtractionResult | null> {
  // TODO: Replace with real LLM API call
  // Example: call Gemini Pro / GPT-4 with a structured prompt, parse JSON response
  // Return null to fall back to local extraction
  return null;
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function extractProfile(text: string): Promise<ExtractionResult> {
  // Try LLM first (returns null if not configured)
  const llmResult = await extractWithLLM(text);
  if (llmResult) return llmResult;

  // Fall back to local mock extractor
  return extractLocally(text);
}

export function extractionToPartialProfile(
  result: ExtractionResult,
  existingProfile: UserProfile
): UserProfile {
  return {
    ...existingProfile,
    businessType: result.businessType.value ?? existingProfile.businessType,
    businessStage: result.businessStage.value ?? existingProfile.businessStage,
    district: result.location.value ?? existingProfile.district,
    state: result.state.value ?? existingProfile.state,
    isUrban: result.isUrban.value ?? existingProfile.isUrban,
    availableCapital: result.availableCapital.value ?? existingProfile.availableCapital,
    fundingRequirement: result.fundingRequirement.value ?? existingProfile.fundingRequirement,
    monthlyRevenue: result.monthlyRevenue.value ?? existingProfile.monthlyRevenue,
    annualFamilyIncome: result.annualFamilyIncome.value ?? existingProfile.annualFamilyIncome,
    category: result.category.value ?? existingProfile.category,
    gender: result.gender.value ?? existingProfile.gender,
    occupation: result.occupation.value ?? existingProfile.occupation,
    isStreetVendor: result.isStreetVendor.value ?? existingProfile.isStreetVendor,
    age: result.age.value ?? existingProfile.age,
    educationLevel: result.educationLevel.value ?? existingProfile.educationLevel,
  };
}
