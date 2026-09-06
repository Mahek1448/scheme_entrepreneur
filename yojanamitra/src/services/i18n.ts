/**
 * i18n.ts — Simple translation service for EN / HI / MR
 * Modular: add new keys or languages without touching components.
 */

export type Language = 'en' | 'hi' | 'mr';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
};

type TranslationKey =
  | 'app_name'
  | 'app_tagline'
  | 'hero_title'
  | 'hero_subtitle'
  | 'start_journey'
  | 'try_demo'
  | 'intake_title'
  | 'intake_subtitle'
  | 'intake_placeholder'
  | 'intake_voice_hint'
  | 'intake_example'
  | 'intake_example_text'
  | 'continue'
  | 'back'
  | 'edit'
  | 'confirm'
  | 'we_understood'
  | 'business_type'
  | 'location'
  | 'capital'
  | 'loan_needed'
  | 'monthly_income'
  | 'category'
  | 'occupation'
  | 'business_stage'
  | 'scheme_passport'
  | 'scheme_passport_subtitle'
  | 'eligible'
  | 'not_eligible'
  | 'needs_info'
  | 'match_score'
  | 'planner_title'
  | 'planner_subtitle'
  | 'total_cost'
  | 'available_capital'
  | 'funding_gap'
  | 'add_item'
  | 'documents_title'
  | 'documents_subtitle'
  | 'required'
  | 'available'
  | 'missing'
  | 'readiness_title'
  | 'readiness_subtitle'
  | 'partners_title'
  | 'partners_subtitle'
  | 'find_partners'
  | 'language'
  | 'voice_listening'
  | 'voice_start'
  | 'voice_stop'
  | 'profile_incomplete'
  | 'emi_title'
  | 'emi_monthly'
  | 'emi_total_interest'
  | 'emi_total_payment'
  | 'support_stack_title';

type Translations = Record<TranslationKey, string>;

const EN: Translations = {
  app_name: 'YojanaMitra',
  app_tagline: 'AI-Driven Scheme Matching',
  hero_title: 'Your Business. Your Schemes. One Smart Guide.',
  hero_subtitle: 'Describe your business in your own words — we\'ll find the right government schemes for you.',
  start_journey: 'Start Your Journey',
  try_demo: 'Try Demo',
  intake_title: 'Tell Us About Your Business',
  intake_subtitle: 'Type or speak in English, Hindi, or Marathi. We will understand your needs and find the best government schemes.',
  intake_placeholder: 'E.g. "I want to start a chai stall in Mumbai. I have ₹40,000 and need a loan of ₹80,000."',
  intake_voice_hint: 'Click the mic to speak in your language',
  intake_example: 'Try this example:',
  intake_example_text: '"Mujhe Mumbai mein chai ka stall shuru karna hai. Mere paas ₹40,000 hain aur mujhe ₹80,000 ka loan chahiye."',
  continue: 'Continue',
  back: 'Back',
  edit: 'Edit',
  confirm: 'Confirm & Find Schemes',
  we_understood: "Here's what we understood",
  business_type: 'Business Type',
  location: 'Location',
  capital: 'Available Capital',
  loan_needed: 'Funding Required',
  monthly_income: 'Monthly Income',
  category: 'Social Category',
  occupation: 'Occupation',
  business_stage: 'Business Stage',
  scheme_passport: 'Scheme Passport',
  scheme_passport_subtitle: 'Schemes matched & ranked by relevance. Eligibility checked by verified rules.',
  eligible: 'Eligible',
  not_eligible: 'Not Eligible',
  needs_info: 'Needs Info',
  match_score: 'Match Score',
  planner_title: 'Business Cost Planner',
  planner_subtitle: 'Estimate your startup costs and identify your funding gap.',
  total_cost: 'Total Business Cost',
  available_capital: 'Available Capital',
  funding_gap: 'Funding Gap',
  add_item: 'Add Item',
  documents_title: 'Document Checklist',
  documents_subtitle: 'Documents required for your recommended schemes.',
  required: 'Required',
  available: 'Available',
  missing: 'Missing',
  readiness_title: 'Application Readiness',
  readiness_subtitle: 'Your readiness to apply for government schemes.',
  partners_title: 'Connect with the Right Partner',
  partners_subtitle: 'Banks, NGOs, and government offices that can process your application.',
  find_partners: 'Find Partners Near Me',
  language: 'Language',
  voice_listening: 'Listening…',
  voice_start: 'Start Speaking',
  voice_stop: 'Stop',
  profile_incomplete: 'Some information is missing. Please complete your profile.',
  emi_title: 'EMI & Affordability Calculator',
  emi_monthly: 'Monthly EMI',
  emi_total_interest: 'Total Interest',
  emi_total_payment: 'Total Repayment',
  support_stack_title: 'Your Support Stack',
};

const HI: Translations = {
  app_name: 'योजनामित्र',
  app_tagline: 'AI आधारित योजना मिलान',
  hero_title: 'आपका व्यवसाय। आपकी योजनाएं। एक स्मार्ट गाइड।',
  hero_subtitle: 'अपने व्यवसाय के बारे में अपने शब्दों में बताएं — हम आपके लिए सही सरकारी योजनाएं ढूंढेंगे।',
  start_journey: 'शुरू करें',
  try_demo: 'डेमो देखें',
  intake_title: 'अपने व्यवसाय के बारे में बताएं',
  intake_subtitle: 'हिंदी, मराठी या अंग्रेजी में टाइप करें या बोलें। हम आपकी जरूरतें समझेंगे।',
  intake_placeholder: 'जैसे: "मुझे मुंबई में चाय का स्टॉल शुरू करना है। मेरे पास ₹40,000 हैं।"',
  intake_voice_hint: 'माइक पर क्लिक करके बोलें',
  intake_example: 'उदाहरण आज़माएं:',
  intake_example_text: '"मुझे मुंबई में चाय का स्टॉल शुरू करना है। मेरे पास ₹40,000 हैं और मुझे ₹80,000 का लोन चाहिए।"',
  continue: 'आगे बढ़ें',
  back: 'वापस',
  edit: 'संपादित करें',
  confirm: 'पुष्टि करें और योजनाएं देखें',
  we_understood: 'हमने यह समझा',
  business_type: 'व्यवसाय का प्रकार',
  location: 'स्थान',
  capital: 'उपलब्ध पूंजी',
  loan_needed: 'आवश्यक ऋण',
  monthly_income: 'मासिक आय',
  category: 'सामाजिक वर्ग',
  occupation: 'व्यवसाय',
  business_stage: 'व्यवसाय की स्थिति',
  scheme_passport: 'योजना पासपोर्ट',
  scheme_passport_subtitle: 'आपके प्रोफ़ाइल से मिलान की गई योजनाएं। पात्रता सरकारी नियमों से जाँची गई।',
  eligible: 'पात्र',
  not_eligible: 'अपात्र',
  needs_info: 'जानकारी चाहिए',
  match_score: 'मिलान स्कोर',
  planner_title: 'व्यवसाय लागत योजनाकार',
  planner_subtitle: 'अपनी शुरुआती लागत का अनुमान लगाएं और वित्तपोषण की कमी जानें।',
  total_cost: 'कुल व्यवसाय लागत',
  available_capital: 'उपलब्ध पूंजी',
  funding_gap: 'वित्तपोषण की कमी',
  add_item: 'जोड़ें',
  documents_title: 'दस्तावेज़ चेकलिस्ट',
  documents_subtitle: 'अनुशंसित योजनाओं के लिए आवश्यक दस्तावेज़।',
  required: 'आवश्यक',
  available: 'उपलब्ध',
  missing: 'अनुपलब्ध',
  readiness_title: 'आवेदन तैयारी',
  readiness_subtitle: 'सरकारी योजनाओं के लिए आपकी तैयारी।',
  partners_title: 'सही साझेदार से जुड़ें',
  partners_subtitle: 'बैंक, NGO और सरकारी कार्यालय जो आपके आवेदन में मदद कर सकते हैं।',
  find_partners: 'मेरे पास के साझेदार',
  language: 'भाषा',
  voice_listening: 'सुन रहे हैं…',
  voice_start: 'बोलना शुरू करें',
  voice_stop: 'रोकें',
  profile_incomplete: 'कुछ जानकारी अधूरी है। कृपया प्रोफ़ाइल पूरी करें।',
  emi_title: 'EMI और सामर्थ्य कैलकुलेटर',
  emi_monthly: 'मासिक EMI',
  emi_total_interest: 'कुल ब्याज',
  emi_total_payment: 'कुल भुगतान',
  support_stack_title: 'आपका सहायता ढांचा',
};

const MR: Translations = {
  app_name: 'योजनामित्र',
  app_tagline: 'AI आधारित योजना जुळवणी',
  hero_title: 'तुमचा व्यवसाय. तुमच्या योजना. एक स्मार्ट मार्गदर्शक.',
  hero_subtitle: 'तुमच्या व्यवसायाबद्दल तुमच्या भाषेत सांगा — आम्ही योग्य सरकारी योजना शोधू.',
  start_journey: 'सुरुवात करा',
  try_demo: 'डेमो पहा',
  intake_title: 'तुमच्या व्यवसायाबद्दल सांगा',
  intake_subtitle: 'मराठी, हिंदी किंवा इंग्रजीत टाइप करा किंवा बोला.',
  intake_placeholder: 'उदा. "मला मुंबईत चहाचा स्टॉल सुरू करायचा आहे. माझ्याकडे ₹40,000 आहेत."',
  intake_voice_hint: 'मायक्रोफोनवर क्लिक करा आणि बोला',
  intake_example: 'हे उदाहरण वापरा:',
  intake_example_text: '"मला मुंबईत चहाचा स्टॉल सुरू करायचा आहे. माझ्याकडे ₹40,000 आहेत आणि मला ₹80,000 कर्ज हवे आहे."',
  continue: 'पुढे जा',
  back: 'मागे',
  edit: 'संपादित करा',
  confirm: 'पुष्टी करा आणि योजना पहा',
  we_understood: 'आम्हाला हे समजले',
  business_type: 'व्यवसायाचा प्रकार',
  location: 'ठिकाण',
  capital: 'उपलब्ध भांडवल',
  loan_needed: 'आवश्यक कर्ज',
  monthly_income: 'मासिक उत्पन्न',
  category: 'सामाजिक वर्ग',
  occupation: 'व्यवसाय',
  business_stage: 'व्यवसायाची स्थिती',
  scheme_passport: 'योजना पासपोर्ट',
  scheme_passport_subtitle: 'तुमच्या प्रोफाइलशी जुळणाऱ्या योजना. पात्रता सरकारी नियमांनुसार तपासली.',
  eligible: 'पात्र',
  not_eligible: 'अपात्र',
  needs_info: 'माहिती हवी',
  match_score: 'जुळणी गुण',
  planner_title: 'व्यवसाय खर्च नियोजक',
  planner_subtitle: 'तुमच्या स्टार्टअपच्या खर्चाचा अंदाज घ्या.',
  total_cost: 'एकूण व्यवसाय खर्च',
  available_capital: 'उपलब्ध भांडवल',
  funding_gap: 'निधी तफावत',
  add_item: 'जोडा',
  documents_title: 'कागदपत्र यादी',
  documents_subtitle: 'शिफारस केलेल्या योजनांसाठी आवश्यक कागदपत्रे.',
  required: 'आवश्यक',
  available: 'उपलब्ध',
  missing: 'अनुपलब्ध',
  readiness_title: 'अर्ज तयारी',
  readiness_subtitle: 'सरकारी योजनांसाठी तुमची तयारी.',
  partners_title: 'योग्य भागीदाराशी संपर्क करा',
  partners_subtitle: 'बँका, NGO आणि सरकारी कार्यालये जे मदत करू शकतात.',
  find_partners: 'जवळचे भागीदार शोधा',
  language: 'भाषा',
  voice_listening: 'ऐकत आहे…',
  voice_start: 'बोलणे सुरू करा',
  voice_stop: 'थांबवा',
  profile_incomplete: 'काही माहिती अपूर्ण आहे. कृपया प्रोफाइल पूर्ण करा.',
  emi_title: 'EMI आणि परवडण्याची क्षमता कॅल्क्युलेटर',
  emi_monthly: 'मासिक EMI',
  emi_total_interest: 'एकूण व्याज',
  emi_total_payment: 'एकूण परतफेड',
  support_stack_title: 'तुमचा आधार गट',
};

const TRANSLATIONS: Record<Language, Translations> = { en: EN, hi: HI, mr: MR };

export function t(key: TranslationKey, lang: Language): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

export type { TranslationKey };
