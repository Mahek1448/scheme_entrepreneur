/**
 * i18n.ts — Complete translation service for EN / HI / MR
 * ALL user-facing strings are translated. Language persists across pages.
 */

export type Language = 'en' | 'hi' | 'mr' | 'gu';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
};

type TranslationKey =
  // App
  | 'app_name'
  | 'app_tagline'
  | 'hero_title'
  | 'hero_subtitle'
  | 'start_journey'
  | 'try_demo'
  // Auth
  | 'login'
  | 'register'
  | 'logout'
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'full_name'
  | 'login_title'
  | 'login_subtitle'
  | 'register_title'
  | 'register_subtitle'
  | 'already_have_account'
  | 'no_account_yet'
  | 'creating_account'
  | 'logging_in'
  // Intake
  | 'intake_title'
  | 'intake_subtitle'
  | 'intake_placeholder'
  | 'intake_voice_hint'
  | 'intake_example'
  | 'intake_example_text_tailoring'
  | 'intake_example_text_food'
  | 'intake_example_text_vendor'
  // Navigation
  | 'nav_dashboard'
  | 'nav_schemes'
  | 'nav_planner'
  | 'nav_documents'
  | 'nav_readiness'
  | 'nav_partners'
  // Actions
  | 'continue'
  | 'back'
  | 'edit'
  | 'confirm'
  | 'save'
  | 'cancel'
  | 'submit'
  | 'search'
  | 'filter'
  | 'close'
  // Profile confirmation
  | 'we_understood'
  | 'business_type'
  | 'location'
  | 'capital'
  | 'loan_needed'
  | 'monthly_income'
  | 'category'
  | 'occupation'
  | 'business_stage'
  // Dashboard
  | 'welcome_back'
  | 'talk_to_yojanamitra'
  | 'view_schemes'
  | 'no_profile_yet'
  | 'no_profile_desc'
  | 'get_started'
  | 'schemes_matched'
  | 'eligible_now'
  | 'documents_ready'
  | 'upload_missing'
  | 'readiness_score'
  | 'top_scheme_matches'
  | 'eligibility_snapshot'
  | 'quick_actions'
  | 'view_all'
  // Scheme Passport
  | 'scheme_passport'
  | 'scheme_passport_subtitle'
  | 'eligible'
  | 'not_eligible'
  | 'needs_info'
  | 'match_score'
  | 'why_matches'
  | 'eligibility_details'
  | 'apply_now'
  | 'no_schemes_found'
  | 'kaggle_discovery'
  // Cost Planner
  | 'planner_title'
  | 'planner_subtitle'
  | 'total_cost'
  | 'available_capital'
  | 'funding_gap'
  | 'add_item'
  | 'equipment'
  | 'setup'
  | 'raw_materials'
  | 'rent'
  | 'licenses'
  | 'working_capital'
  | 'marketing'
  | 'contingency'
  // Documents
  | 'documents_title'
  | 'documents_subtitle'
  | 'required'
  | 'available'
  | 'missing'
  | 'document_status'
  // Readiness
  | 'readiness_title'
  | 'readiness_subtitle'
  | 'application_readiness'
  // Partners
  | 'partners_title'
  | 'partners_subtitle'
  | 'find_partners'
  | 'all_partners'
  | 'banks'
  | 'ngos'
  | 'govt_offices'
  | 'online'
  | 'connect_partner'
  | 'km_away'
  | 'rating'
  | 'supported_schemes'
  | 'languages_spoken'
  | 'map_view'
  | 'list_view'
  | 'map_unavailable'
  // Language
  | 'language'
  // Voice
  | 'voice_listening'
  | 'voice_start'
  | 'voice_stop'
  | 'voice_unsupported'
  // Voice output (TTS)
  | 'voice_output_listen'
  | 'voice_output_speaking'
  | 'voice_output_stop'
  // YouTube Tutorial
  | 'how_to_fill_form'
  | 'watch_tutorial'
  | 'form_tutorial_desc'
  // Profile Confirmation
  | 'demo_profile_loaded'
  | 'profile_review_title'
  | 'profile_review_subtitle'
  | 'quick_eligibility_toggles'
  | 'street_vendor_label'
  | 'aadhaar_available'
  | 'pan_available'
  | 'bank_account_label'
  | 'existing_loan_label'
  | 'cibil_default_label'
  | 'prev_pmegp_label'
  | 'caste_cert_label'
  | 'street_vendor_cert_label'
  // EMI
  | 'emi_title'
  | 'emi_monthly'
  | 'emi_total_interest'
  | 'emi_total_payment'
  | 'emi_loan_amount'
  | 'emi_interest_rate'
  | 'emi_tenure_months'
  // Support Stack
  | 'support_stack_title'
  // Status / Errors
  | 'profile_incomplete'
  | 'loading'
  | 'no_match_found'
  | 'no_match_desc'
  | 'more_info_required'
  | 'field_required'
  | 'invalid_email'
  | 'password_too_short'
  | 'passwords_dont_match'
  | 'profile_extracted'
  | 'review_edit'
  // Profile / Onboarding
  | 'complete_your_profile'
  | 'complete_profile_desc'
  | 'not_provided'
  | 'not_calculated'
  | 'self_funding'
  // Readiness
  | 'checks_done'
  | 'items_still_needed'
  | 'engine_ranked_note'
  | 'capital_label'
  | 'readiness_excellent'
  | 'readiness_good'
  | 'readiness_fair'
  | 'readiness_needs_work'
  | 'proceed_to_partners'
  | 'readiness_breakdown'
  | 'completed_checks'
  | 'incomplete_checks'
  | 'go_complete'
  // Scheme Passport
  | 'all_types'
  | 'all_status'
  | 'funding_label'
  | 'success_rate'
  | 'max_label'
  | 'processing_time'
  | 'why_matches_you'
  | 'missing_requirements'
  | 'official_source'
  | 'apply_online'
  | 'apply_offline'
  | 'helpline'
  | 'no_recommendations_yet'
  | 'complete_profile_for_schemes'
  | 'ai_recommended'
  // Partner Routing
  | 'use_my_location'
  | 'locating'
  | 'your_location'
  | 'optimized_route'
  | 'partners_found'
  | 'nearest'
  | 'top_match'
  | 'recommended_partners'
  | 'platform_note_title'
  | 'intelligent_routing'
  // Documents
  | 'no_docs_required'
  // General
  | 'something_went_wrong'
  | 'find_my_schemes'
  | 'clear'
  | 'schemes_discovered'
  | 'location_active'
  | 'location_denied'
  | 'top_pick';
type Translations = Record<TranslationKey, string>;

const EN: Translations = {
  app_name: 'YojanaMitra',
  app_tagline: 'AI-Driven Scheme Matching',
  hero_title: 'Your Business. Your Schemes. One Smart Guide.',
  hero_subtitle: 'Describe your business in your own words — we\'ll find the right government schemes for you.',
  start_journey: 'Start Your Journey',
  try_demo: 'Try Demo',
  top_pick: '✦ #1 Pick',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  email: 'Email Address',
  password: 'Password',
  confirm_password: 'Confirm Password',
  full_name: 'Full Name',
  login_title: 'Welcome Back',
  login_subtitle: 'Login to continue to YojanaMitra',
  register_title: 'Create Account',
  register_subtitle: 'Join YojanaMitra to find your perfect government scheme',
  already_have_account: 'Already have an account? Login',
  no_account_yet: 'Don\'t have an account? Register',
  creating_account: 'Creating account…',
  logging_in: 'Logging in…',
  max_label: 'Max',
  intake_title: 'Tell Us About Your Business',
  intake_subtitle: 'Type or speak in English, Hindi, or Marathi. We will understand your needs and find the best government schemes.',
  intake_placeholder: 'E.g. "I want to start a tailoring business in Pune. I have ₹50,000 and need ₹2 lakh."',
  intake_voice_hint: 'Click the mic to speak in your language',
  intake_example: 'Try an example:',
  intake_example_text_tailoring: '"I want to start a tailoring business in Pune. I have ₹50,000 and need ₹2 lakh."',
  intake_example_text_food: '"I run a food truck in Mumbai and want to expand. I need ₹5 lakh."',
  intake_example_text_vendor: '"I am a street vendor and need working capital of ₹10,000."',

  nav_dashboard: 'Dashboard',
  nav_schemes: 'Schemes',
  nav_planner: 'Cost Planner',
  nav_documents: 'Documents',
  nav_readiness: 'Readiness',
  nav_partners: 'Find Partner',

  continue: 'Continue',
  back: 'Back',
  edit: 'Edit',
  confirm: 'Confirm & Find Schemes',
  save: 'Save',
  cancel: 'Cancel',
  submit: 'Submit',
  search: 'Search',
  filter: 'Filter',
  close: 'Close',

  we_understood: "Here's what we understood",
  business_type: 'Business Type',
  location: 'Location',
  capital: 'Available Capital',
  loan_needed: 'Funding Required',
  monthly_income: 'Monthly Income',
  category: 'Social Category',
  occupation: 'Occupation',
  business_stage: 'Business Stage',

  welcome_back: 'Welcome back',
  talk_to_yojanamitra: 'Talk to YojanaMitra',
  view_schemes: 'View My Schemes',
  no_profile_yet: 'Tell us about your business',
  no_profile_desc: 'Describe your business and we\'ll find the right government schemes for you.',
  get_started: 'Get Started',
  schemes_matched: 'Schemes Matched',
  eligible_now: 'eligible now',
  documents_ready: 'Documents Ready',
  upload_missing: 'Upload missing docs',
  readiness_score: 'Readiness Score',
  top_scheme_matches: 'Top Scheme Matches',
  eligibility_snapshot: 'Eligibility Snapshot',
  quick_actions: 'Quick Actions',
  view_all: 'View All',

  scheme_passport: 'Scheme Passport',
  scheme_passport_subtitle: 'Schemes matched & ranked by relevance. Eligibility checked by verified rules.',
  eligible: 'Eligible',
  not_eligible: 'Not Eligible',
  needs_info: 'Needs Info',
  match_score: 'Match Score',
  why_matches: 'Why it matches',
  eligibility_details: 'Eligibility Details',
  apply_now: 'Apply Now',
  no_schemes_found: 'No matching scheme found',
  kaggle_discovery: 'Kaggle Dataset Discovery',

  planner_title: 'Business Cost Planner',
  planner_subtitle: 'Estimate your startup costs and identify your funding gap.',
  total_cost: 'Total Business Cost',
  available_capital: 'Available Capital',
  funding_gap: 'Funding Gap',
  add_item: 'Add Item',
  equipment: 'Equipment',
  setup: 'Setup & Infrastructure',
  raw_materials: 'Raw Materials',
  rent: 'Rent / Lease',
  licenses: 'Licenses & Registration',
  working_capital: 'Working Capital',
  marketing: 'Marketing',
  contingency: 'Contingency (10%)',

  documents_title: 'Document Checklist',
  documents_subtitle: 'Documents required for your recommended schemes.',
  required: 'Required',
  available: 'Available',
  missing: 'Missing',
  document_status: 'Document Status',

  readiness_title: 'Application Readiness',
  readiness_subtitle: 'Your readiness to apply for government schemes.',
  application_readiness: 'Application Readiness',

  partners_title: 'Connect with the Right Partner',
  partners_subtitle: 'Banks, NGOs, and government offices that can process your application.',
  find_partners: 'Find Partners Near Me',
  all_partners: 'All Partners',
  banks: 'Banks / NBFCs',
  ngos: 'NGOs',
  govt_offices: 'Govt. Offices',
  online: 'Online',
  connect_partner: 'Connect with this Partner',
  km_away: 'km away',
  rating: 'Rating',
  supported_schemes: 'Supported Schemes',
  languages_spoken: 'Languages',
  map_view: 'Map View',
  list_view: 'List View',
  map_unavailable: 'Map preview — configure Google Maps API key for full map',

  language: 'Language',
  voice_listening: 'Listening…',
  voice_start: 'Start Speaking',
  voice_stop: 'Stop',
  voice_unsupported: 'Voice input is not supported in this browser. Please use text input.',

  voice_output_listen: '🔊 Listen',
  voice_output_speaking: '🔊 Speaking…',
  voice_output_stop: '⏹ Stop',

  how_to_fill_form: 'How to Fill the Form',
  watch_tutorial: 'Watch Tutorial',
  form_tutorial_desc: 'Step-by-step video guide on how to fill and submit the application.',

  demo_profile_loaded: 'Demo profile loaded for preview',
  profile_review_title: "Here's what we understood",
  profile_review_subtitle: 'Review and edit any field before we find your schemes.',
  quick_eligibility_toggles: 'Quick Eligibility Toggles',
  street_vendor_label: 'Street Vendor',
  aadhaar_available: 'Aadhaar Available',
  pan_available: 'PAN Available',
  bank_account_label: 'Bank Account',
  existing_loan_label: 'Has Existing Loan',
  cibil_default_label: 'CIBIL Default',
  prev_pmegp_label: 'Previous PMEGP Beneficiary',
  caste_cert_label: 'Caste Certificate Available',
  street_vendor_cert_label: 'Street Vendor Certificate (CoV)',

  emi_title: 'EMI & Affordability Calculator',
  emi_monthly: 'Monthly EMI',
  emi_total_interest: 'Total Interest',
  emi_total_payment: 'Total Repayment',
  emi_loan_amount: 'Loan Amount (₹)',
  emi_interest_rate: 'Annual Interest Rate (%)',
  emi_tenure_months: 'Tenure (Months)',

  support_stack_title: 'Your Support Stack',

  profile_incomplete: 'Some information is missing. Please complete your profile.',
  loading: 'Loading…',
  no_match_found: 'No matching scheme found',
  no_match_desc: 'No government scheme in the verified database matches your current profile. Try adjusting your profile details.',
  more_info_required: 'More information required',
  field_required: 'This field is required.',
  invalid_email: 'Please enter a valid email address.',
  password_too_short: 'Password must be at least 6 characters.',
  passwords_dont_match: 'Passwords do not match.',
  profile_extracted: 'Profile Extracted',
  review_edit: 'Review and edit any field before we find your schemes.',

  // Profile / Onboarding
  complete_your_profile: 'Complete your profile',
  complete_profile_desc: 'Complete your profile to discover personalized government schemes.',
  not_provided: 'Not provided',
  not_calculated: 'Not calculated',
  self_funding: 'Self funding',
  // Readiness
  checks_done: 'checks done',
  items_still_needed: 'items still needed',
  engine_ranked_note: 'Engine-ranked · Match score ≠ eligibility',
  capital_label: 'capital',
  readiness_excellent: 'Excellent',
  readiness_good: 'Good',
  readiness_fair: 'Fair',
  readiness_needs_work: 'Needs Work',
  proceed_to_partners: 'Proceed to Partner Routing',
  readiness_breakdown: 'Readiness Breakdown',
  completed_checks: 'Completed Checks',
  incomplete_checks: 'Incomplete Checks',
  go_complete: 'Go & Complete',
  // Scheme Passport
  all_types: 'All Types',
  all_status: 'All Status',
  funding_label: 'Funding',
  success_rate: 'Success Rate',
  processing_time: 'Processing Time',
  why_matches_you: 'Why it matches you',
  missing_requirements: 'Missing Requirements',
  official_source: 'Official Source',
  apply_online: 'Apply Online',
  apply_offline: 'Apply Offline',
  helpline: 'Helpline',
  no_recommendations_yet: 'No recommendations yet',
  complete_profile_for_schemes: 'Complete your profile to see personalized scheme matches.',
  ai_recommended: 'AI Recommended',
  // Partner Routing
  use_my_location: 'Use my location',
  locating: 'Locating…',
  your_location: 'Your location',
  optimized_route: 'Optimised route',
  partners_found: 'Partners found',
  nearest: 'Nearest',
  top_match: 'Top match',
  recommended_partners: 'Recommended Partners',
  platform_note_title: 'YojanaMitra connects you — not applies for you.',
  intelligent_routing: 'Partners ranked for your top scheme',
  // Documents
  no_docs_required: 'No documents required yet.',
  // General
  something_went_wrong: 'Something went wrong. Please try again.',
  find_my_schemes: 'Find My Schemes',
  clear: 'Clear',
  schemes_discovered: 'relevant schemes discovered',
  location_active: 'Location active',
  location_denied: 'Location denied',
};

const HI: Translations = {
  top_pick: '✦ #1 चयन',
  app_name: 'योजनामित्र',
  app_tagline: 'AI आधारित योजना मिलान',
  hero_title: 'आपका व्यवसाय। आपकी योजनाएं। एक स्मार्ट गाइड।',
  hero_subtitle: 'अपने व्यवसाय के बारे में अपने शब्दों में बताएं — हम आपके लिए सही सरकारी योजनाएं ढूंढेंगे।',
  start_journey: 'शुरू करें',
  try_demo: 'डेमो देखें',

  login: 'लॉगिन',
  register: 'रजिस्टर',
  logout: 'लॉगआउट',
  email: 'ईमेल पता',
  password: 'पासवर्ड',
  confirm_password: 'पासवर्ड की पुष्टि करें',
  full_name: 'पूरा नाम',
  login_title: 'वापस स्वागत है',
  login_subtitle: 'योजनामित्र में जारी रखने के लिए लॉगिन करें',
  register_title: 'खाता बनाएं',
  register_subtitle: 'सही सरकारी योजना खोजने के लिए योजनामित्र से जुड़ें',
  already_have_account: 'पहले से खाता है? लॉगिन करें',
  no_account_yet: 'खाता नहीं है? रजिस्टर करें',
  creating_account: 'खाता बना रहे हैं…',
  logging_in: 'लॉगिन हो रहा है…',
  max_label: 'अधिकतम',
  intake_title: 'अपने व्यवसाय के बारे में बताएं',
  intake_subtitle: 'हिंदी, मराठी या अंग्रेजी में टाइप करें या बोलें। हम आपकी जरूरतें समझेंगे।',
  intake_placeholder: 'जैसे: "मुझे पुणे में सिलाई का काम शुरू करना है। मेरे पास ₹50,000 हैं और मुझे ₹2 लाख चाहिए।"',
  intake_voice_hint: 'माइक पर क्लिक करके बोलें',
  intake_example: 'उदाहरण आज़माएं:',
  intake_example_text_tailoring: '"मुझे पुणे में सिलाई का व्यवसाय शुरू करना है। मेरे पास ₹50,000 हैं और मुझे ₹2 लाख चाहिए।"',
  intake_example_text_food: '"मेरे पास मुंबई में फूड ट्रक है और मुझे बड़ा करना है। मुझे ₹5 लाख चाहिए।"',
  intake_example_text_vendor: '"मैं स्ट्रीट वेंडर हूं और मुझे ₹10,000 की कार्यशील पूंजी चाहिए।"',

  nav_dashboard: 'डैशबोर्ड',
  nav_schemes: 'योजनाएं',
  nav_planner: 'लागत योजनाकार',
  nav_documents: 'दस्तावेज़',
  nav_readiness: 'तैयारी',
  nav_partners: 'साझेदार खोजें',

  continue: 'आगे बढ़ें',
  back: 'वापस',
  edit: 'संपादित करें',
  confirm: 'पुष्टि करें और योजनाएं देखें',
  save: 'सहेजें',
  cancel: 'रद्द करें',
  submit: 'सबमिट करें',
  search: 'खोजें',
  filter: 'फ़िल्टर',
  close: 'बंद करें',

  we_understood: 'हमने यह समझा',
  business_type: 'व्यवसाय का प्रकार',
  location: 'स्थान',
  capital: 'उपलब्ध पूंजी',
  loan_needed: 'आवश्यक ऋण',
  monthly_income: 'मासिक आय',
  category: 'सामाजिक वर्ग',
  occupation: 'व्यवसाय',
  business_stage: 'व्यवसाय की स्थिति',

  welcome_back: 'वापस स्वागत है',
  talk_to_yojanamitra: 'योजनामित्र से बात करें',
  view_schemes: 'मेरी योजनाएं देखें',
  no_profile_yet: 'अपने व्यवसाय के बारे में बताएं',
  no_profile_desc: 'अपने व्यवसाय का विवरण दें और हम आपके लिए सही सरकारी योजनाएं ढूंढेंगे।',
  get_started: 'शुरू करें',
  schemes_matched: 'मिलान की गई योजनाएं',
  eligible_now: 'अभी पात्र',
  documents_ready: 'दस्तावेज़ तैयार',
  upload_missing: 'गायब दस्तावेज़ अपलोड करें',
  readiness_score: 'तैयारी स्कोर',
  top_scheme_matches: 'शीर्ष योजना मिलान',
  eligibility_snapshot: 'पात्रता स्नैपशॉट',
  quick_actions: 'त्वरित क्रियाएं',
  view_all: 'सभी देखें',

  scheme_passport: 'योजना पासपोर्ट',
  scheme_passport_subtitle: 'आपके प्रोफ़ाइल से मिलान की गई योजनाएं। पात्रता सरकारी नियमों से जाँची गई।',
  eligible: 'पात्र',
  not_eligible: 'अपात्र',
  needs_info: 'जानकारी चाहिए',
  match_score: 'मिलान स्कोर',
  why_matches: 'क्यों मेल खाता है',
  eligibility_details: 'पात्रता विवरण',
  apply_now: 'अभी आवेदन करें',
  no_schemes_found: 'कोई मेल खाने वाली योजना नहीं मिली',
  kaggle_discovery: 'Kaggle डेटासेट खोज',

  planner_title: 'व्यवसाय लागत योजनाकार',
  planner_subtitle: 'अपनी शुरुआती लागत का अनुमान लगाएं और वित्तपोषण की कमी जानें।',
  total_cost: 'कुल व्यवसाय लागत',
  available_capital: 'उपलब्ध पूंजी',
  funding_gap: 'वित्तपोषण की कमी',
  add_item: 'जोड़ें',
  equipment: 'उपकरण',
  setup: 'सेटअप और बुनियादी ढांचा',
  raw_materials: 'कच्चा माल',
  rent: 'किराया / पट्टा',
  licenses: 'लाइसेंस और पंजीकरण',
  working_capital: 'कार्यशील पूंजी',
  marketing: 'मार्केटिंग',
  contingency: 'आकस्मिक (10%)',

  documents_title: 'दस्तावेज़ चेकलिस्ट',
  documents_subtitle: 'अनुशंसित योजनाओं के लिए आवश्यक दस्तावेज़।',
  required: 'आवश्यक',
  available: 'उपलब्ध',
  missing: 'अनुपलब्ध',
  document_status: 'दस्तावेज़ स्थिति',

  readiness_title: 'आवेदन तैयारी',
  readiness_subtitle: 'सरकारी योजनाओं के लिए आपकी तैयारी।',
  application_readiness: 'आवेदन तैयारी',

  partners_title: 'सही साझेदार से जुड़ें',
  partners_subtitle: 'बैंक, NGO और सरकारी कार्यालय जो आपके आवेदन में मदद कर सकते हैं।',
  find_partners: 'मेरे पास के साझेदार',
  all_partners: 'सभी साझेदार',
  banks: 'बैंक / NBFC',
  ngos: 'NGO',
  govt_offices: 'सरकारी कार्यालय',
  online: 'ऑनलाइन',
  connect_partner: 'इस साझेदार से जुड़ें',
  km_away: 'किमी दूर',
  rating: 'रेटिंग',
  supported_schemes: 'समर्थित योजनाएं',
  languages_spoken: 'भाषाएं',
  map_view: 'मानचित्र दृश्य',
  list_view: 'सूची दृश्य',
  map_unavailable: 'मानचित्र पूर्वावलोकन — पूर्ण मानचित्र के लिए Google Maps API कुंजी कॉन्फ़िगर करें',

  language: 'भाषा',
  voice_listening: 'सुन रहे हैं…',
  voice_start: 'बोलना शुरू करें',
  voice_stop: 'रोकें',
  voice_unsupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। कृपया टेक्स्ट इनपुट का उपयोग करें।',

  voice_output_listen: '🔊 सुनें',
  voice_output_speaking: '🔊 बोल रहे हैं…',
  voice_output_stop: '⏹ रोकें',

  how_to_fill_form: 'फॉर्म कैसे भरें',
  watch_tutorial: 'ट्यूटोरियल देखें',
  form_tutorial_desc: 'आवेदन भरने और जमा करने का चरण-दर-चरण वीडियो गाइड।',

  demo_profile_loaded: 'प्रीव्यू के लिए डेमो प्रोफ़ाइल लोड की गई',
  profile_review_title: 'हमने यह समझा',
  profile_review_subtitle: 'अपनी योजनाएं खोजने से पहले किसी भी फ़ील्ड की समीक्षा करें और संपादित करें।',
  quick_eligibility_toggles: 'त्वरित पात्रता टॉगल',
  street_vendor_label: 'स्ट्रीट वेंडर',
  aadhaar_available: 'आधार उपलब्ध',
  pan_available: 'PAN उपलब्ध',
  bank_account_label: 'बैंक खाता',
  existing_loan_label: 'मौजूदा ऋण है',
  cibil_default_label: 'CIBIL डिफ़ॉल्ट',
  prev_pmegp_label: 'पूर्व PMEGP लाभार्थी',
  caste_cert_label: 'जाति प्रमाणपत्र उपलब्ध',
  street_vendor_cert_label: 'स्ट्रीट वेंडर प्रमाणपत्र (CoV)',

  emi_title: 'EMI और सामर्थ्य कैलकुलेटर',
  emi_monthly: 'मासिक EMI',
  emi_total_interest: 'कुल ब्याज',
  emi_total_payment: 'कुल भुगतान',
  emi_loan_amount: 'ऋण राशि (₹)',
  emi_interest_rate: 'वार्षिक ब्याज दर (%)',
  emi_tenure_months: 'अवधि (महीने)',

  support_stack_title: 'आपका सहायता ढांचा',

  profile_incomplete: 'कुछ जानकारी अधूरी है। कृपया प्रोफ़ाइल पूरी करें।',
  loading: 'लोड हो रहा है…',
  no_match_found: 'कोई मेल खाने वाली योजना नहीं मिली',
  no_match_desc: 'सत्यापित डेटाबेस में आपके प्रोफ़ाइल से मेल खाने वाली कोई सरकारी योजना नहीं है।',
  more_info_required: 'अधिक जानकारी आवश्यक है',
  field_required: 'यह फ़ील्ड आवश्यक है।',
  invalid_email: 'कृपया एक वैध ईमेल पता दर्ज करें।',
  password_too_short: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
  passwords_dont_match: 'पासवर्ड मेल नहीं खाते।',
  profile_extracted: 'प्रोफ़ाइल निकाली गई',
  review_edit: 'अपनी योजनाएं खोजने से पहले किसी भी फ़ील्ड की समीक्षा करें और संपादित करें।',

  // Profile / Onboarding
  complete_your_profile: 'अपनी प्रोफ़ाइल पूरी करें',
  complete_profile_desc: 'व्यक्तिगत सरकारी योजनाएं खोजने के लिए अपनी प्रोफ़ाइल पूरी करें।',
  not_provided: 'प्रदान नहीं किया',
  not_calculated: 'गणना नहीं हुई',
  self_funding: 'स्व-वित्तपोषण',
  // Readiness
  checks_done: 'जांच पूरी हुई',
  items_still_needed: 'आइटम अभी भी चाहिए',
  engine_ranked_note: 'इंजन-रैंक · मिलान स्कोर ≠ पात्रता',
  capital_label: 'पूंजी',
  readiness_excellent: 'उत्कृष्ट',
  readiness_good: 'अच्छा',
  readiness_fair: 'उचित',
  readiness_needs_work: 'सुधार आवश्यक',
  proceed_to_partners: 'साझेदार खोजने के लिए आगे बढ़ें',
  readiness_breakdown: 'तैयारी विवरण',
  completed_checks: 'पूरी की गई जांच',
  incomplete_checks: 'अधूरी जांच',
  go_complete: 'जाएं और पूरा करें',
  // Scheme Passport
  all_types: 'सभी प्रकार',
  all_status: 'सभी स्थिति',
  funding_label: 'वित्तपोषण',
  success_rate: 'सफलता दर',
  processing_time: 'प्रक्रिया समय',
  why_matches_you: 'यह आपसे क्यों मेल खाता है',
  missing_requirements: 'अनुपलब्ध आवश्यकताएं',
  official_source: 'आधिकारिक स्रोत',
  apply_online: 'ऑनलाइन आवेदन करें',
  apply_offline: 'ऑफलाइन आवेदन करें',
  helpline: 'हेल्पलाइन',
  no_recommendations_yet: 'अभी तक कोई अनुशंसाएं नहीं',
  complete_profile_for_schemes: 'व्यक्तिगत योजना मिलान देखने के लिए अपनी प्रोफ़ाइल पूरी करें।',
  ai_recommended: 'AI अनुशंसित',
  // Partner Routing
  use_my_location: 'मेरा स्थान उपयोग करें',
  locating: 'स्थान ढूंढ रहे हैं…',
  your_location: 'आपका स्थान',
  optimized_route: 'अनुकूलित मार्ग',
  partners_found: 'साझेदार मिले',
  nearest: 'निकटतम',
  top_match: 'शीर्ष मिलान',
  recommended_partners: 'अनुशंसित साझेदार',
  platform_note_title: 'योजनामित्र आपको जोड़ता है — आवेदन नहीं करता।',
  intelligent_routing: 'आपकी शीर्ष योजना के लिए साझेदार रैंक किए गए',
  // Documents
  no_docs_required: 'अभी कोई दस्तावेज़ आवश्यक नहीं।',
  // General
  something_went_wrong: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
  find_my_schemes: 'मेरी योजनाएं खोजें',
  clear: 'साफ करें',
  schemes_discovered: 'प्रासंगिक योजनाएं मिलीं',
  location_active: 'स्थान सक्रिय',
  location_denied: 'स्थान अस्वीकृत',
};

const MR: Translations = {
  top_pick: '✦ #1 निवड',
  app_name: 'योजनामित्र',
  app_tagline: 'AI आधारित योजना जुळवणी',
  hero_title: 'तुमचा व्यवसाय. तुमच्या योजना. एक स्मार्ट मार्गदर्शक.',
  hero_subtitle: 'तुमच्या व्यवसायाबद्दल तुमच्या भाषेत सांगा — आम्ही योग्य सरकारी योजना शोधू.',
  start_journey: 'सुरुवात करा',
  try_demo: 'डेमो पहा',

  login: 'लॉगिन',
  register: 'नोंदणी',
  logout: 'लॉगआउट',
  email: 'ईमेल पत्ता',
  password: 'पासवर्ड',
  confirm_password: 'पासवर्ड पुष्टी करा',
  full_name: 'पूर्ण नाव',
  login_title: 'परत स्वागत आहे',
  login_subtitle: 'योजनामित्र सुरू ठेवण्यासाठी लॉगिन करा',
  register_title: 'खाते तयार करा',
  register_subtitle: 'योग्य सरकारी योजना शोधण्यासाठी योजनामित्रमध्ये सामील व्हा',
  already_have_account: 'आधीच खाते आहे? लॉगिन करा',
  no_account_yet: 'खाते नाही? नोंदणी करा',
  creating_account: 'खाते तयार होत आहे…',
  logging_in: 'लॉगिन होत आहे…',

  intake_title: 'तुमच्या व्यवसायाबद्दल सांगा',
  intake_subtitle: 'मराठी, हिंदी किंवा इंग्रजीत टाइप करा किंवा बोला.',
  intake_placeholder: 'उदा. "मला पुण्यात शिवणकाम व्यवसाय सुरू करायचा आहे. माझ्याकडे ₹50,000 आहेत आणि मला ₹2 लाख हवे आहेत."',
  intake_voice_hint: 'मायक्रोफोनवर क्लिक करा आणि बोला',
  intake_example: 'हे उदाहरण वापरा:',
  intake_example_text_tailoring: '"मला पुण्यात शिवणकाम व्यवसाय सुरू करायचा आहे. माझ्याकडे ₹50,000 आहेत आणि मला ₹2 लाख हवे आहेत."',
  intake_example_text_food: '"माझ्याकडे मुंबईत फूड ट्रक आहे आणि मला तो वाढवायचा आहे. मला ₹5 लाख हवे आहेत."',
  intake_example_text_vendor: '"मी रस्त्यावरील विक्रेता आहे आणि मला ₹10,000 कार्यशील भांडवल हवे आहे."',

  nav_dashboard: 'डॅशबोर्ड',
  nav_schemes: 'योजना',
  nav_planner: 'खर्च नियोजक',
  nav_documents: 'कागदपत्रे',
  nav_readiness: 'तयारी',
  nav_partners: 'भागीदार शोधा',

  continue: 'पुढे जा',
  back: 'मागे',
  edit: 'संपादित करा',
  confirm: 'पुष्टी करा आणि योजना पहा',
  save: 'जतन करा',
  cancel: 'रद्द करा',
  submit: 'सबमिट करा',
  search: 'शोधा',
  filter: 'फिल्टर',
  close: 'बंद करा',
   max_label: 'कमाल',
  we_understood: 'आम्हाला हे समजले',
  business_type: 'व्यवसायाचा प्रकार',
  location: 'ठिकाण',
  capital: 'उपलब्ध भांडवल',
  loan_needed: 'आवश्यक कर्ज',
  monthly_income: 'मासिक उत्पन्न',
  category: 'सामाजिक वर्ग',
  occupation: 'व्यवसाय',
  business_stage: 'व्यवसायाची स्थिती',

  welcome_back: 'परत स्वागत आहे',
  talk_to_yojanamitra: 'योजनामित्रशी बोला',
  view_schemes: 'माझ्या योजना पहा',
  no_profile_yet: 'तुमच्या व्यवसायाबद्दल सांगा',
  no_profile_desc: 'तुमच्या व्यवसायाचे वर्णन करा आणि आम्ही तुमच्यासाठी योग्य सरकारी योजना शोधू.',
  get_started: 'सुरुवात करा',
  schemes_matched: 'जुळणाऱ्या योजना',
  eligible_now: 'आता पात्र',
  documents_ready: 'कागदपत्रे तयार',
  upload_missing: 'गहाळ कागदपत्रे अपलोड करा',
  readiness_score: 'तयारी गुण',
  top_scheme_matches: 'शीर्ष योजना जुळण्या',
  eligibility_snapshot: 'पात्रता स्नॅपशॉट',
  quick_actions: 'त्वरित क्रिया',
  view_all: 'सर्व पहा',

  scheme_passport: 'योजना पासपोर्ट',
  scheme_passport_subtitle: 'तुमच्या प्रोफाइलशी जुळणाऱ्या योजना. पात्रता सरकारी नियमांनुसार तपासली.',
  eligible: 'पात्र',
  not_eligible: 'अपात्र',
  needs_info: 'माहिती हवी',
  match_score: 'जुळणी गुण',
  why_matches: 'का जुळते',
  eligibility_details: 'पात्रता तपशील',
  apply_now: 'आता अर्ज करा',
  no_schemes_found: 'कोणतीही जुळणारी योजना सापडली नाही',
  kaggle_discovery: 'Kaggle डेटासेट शोध',

  planner_title: 'व्यवसाय खर्च नियोजक',
  planner_subtitle: 'तुमच्या स्टार्टअपच्या खर्चाचा अंदाज घ्या.',
  total_cost: 'एकूण व्यवसाय खर्च',
  available_capital: 'उपलब्ध भांडवल',
  funding_gap: 'निधी तफावत',
  add_item: 'जोडा',
  equipment: 'उपकरणे',
  setup: 'सेटअप आणि पायाभूत सुविधा',
  raw_materials: 'कच्चा माल',
  rent: 'भाडे / लीज',
  licenses: 'परवाने आणि नोंदणी',
  working_capital: 'कार्यशील भांडवल',
  marketing: 'विपणन',
  contingency: 'आकस्मिक (10%)',

  documents_title: 'कागदपत्र यादी',
  documents_subtitle: 'शिफारस केलेल्या योजनांसाठी आवश्यक कागदपत्रे.',
  required: 'आवश्यक',
  available: 'उपलब्ध',
  missing: 'अनुपलब्ध',
  document_status: 'कागदपत्र स्थिती',

  readiness_title: 'अर्ज तयारी',
  readiness_subtitle: 'सरकारी योजनांसाठी तुमची तयारी.',
  application_readiness: 'अर्ज तयारी',

  partners_title: 'योग्य भागीदाराशी संपर्क करा',
  partners_subtitle: 'बँका, NGO आणि सरकारी कार्यालये जे मदत करू शकतात.',
  find_partners: 'जवळचे भागीदार शोधा',
  all_partners: 'सर्व भागीदार',
  banks: 'बँका / NBFC',
  ngos: 'NGO',
  govt_offices: 'सरकारी कार्यालये',
  online: 'ऑनलाइन',
  connect_partner: 'या भागीदाराशी संपर्क करा',
  km_away: 'किमी दूर',
  rating: 'रेटिंग',
  supported_schemes: 'समर्थित योजना',
  languages_spoken: 'भाषा',
  map_view: 'नकाशा दृश्य',
  list_view: 'यादी दृश्य',
  map_unavailable: 'नकाशा पूर्वावलोकन — पूर्ण नकाशासाठी Google Maps API की कॉन्फिगर करा',

  language: 'भाषा',
  voice_listening: 'ऐकत आहे…',
  voice_start: 'बोलणे सुरू करा',
  voice_stop: 'थांबवा',
  voice_unsupported: 'या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही. कृपया टेक्स्ट इनपुट वापरा.',

  voice_output_listen: '🔊 ऐका',
  voice_output_speaking: '🔊 बोलत आहे…',
  voice_output_stop: '⏹ थांबवा',

  how_to_fill_form: 'फॉर्म कसा भरावा',
  watch_tutorial: 'ट्यूटोरियल पहा',
  form_tutorial_desc: 'अर्ज भरण्यासाठी आणि सबमिट करण्यासाठी पायरी-पायरी व्हिडिओ मार्गदर्शक.',

  demo_profile_loaded: 'पूर्वावलोकनासाठी डेमो प्रोफाइल लोड केली',
  profile_review_title: 'आम्हाला हे समजले',
  profile_review_subtitle: 'योजना शोधण्यापूर्वी कोणतेही फील्ड पुनरावलोकन करा आणि संपादित करा.',
  quick_eligibility_toggles: 'त्वरित पात्रता टॉगल',
  street_vendor_label: 'रस्त्यावरील विक्रेता',
  aadhaar_available: 'आधार उपलब्ध',
  pan_available: 'PAN उपलब्ध',
  bank_account_label: 'बँक खाते',
  existing_loan_label: 'विद्यमान कर्ज आहे',
  cibil_default_label: 'CIBIL डिफॉल्ट',
  prev_pmegp_label: 'मागील PMEGP लाभार्थी',
  caste_cert_label: 'जात प्रमाणपत्र उपलब्ध',
  street_vendor_cert_label: 'रस्त्यावरील विक्रेता प्रमाणपत्र (CoV)',

  emi_title: 'EMI आणि परवडण्याची क्षमता कॅल्क्युलेटर',
  emi_monthly: 'मासिक EMI',
  emi_total_interest: 'एकूण व्याज',
  emi_total_payment: 'एकूण परतफेड',
  emi_loan_amount: 'कर्ज रक्कम (₹)',
  emi_interest_rate: 'वार्षिक व्याज दर (%)',
  emi_tenure_months: 'कालावधी (महिने)',

  support_stack_title: 'तुमचा आधार गट',

  profile_incomplete: 'काही माहिती अपूर्ण आहे. कृपया प्रोफाइल पूर्ण करा.',
  loading: 'लोड होत आहे…',
  no_match_found: 'कोणतीही जुळणारी योजना सापडली नाही',
  no_match_desc: 'सत्यापित डेटाबेसमध्ये तुमच्या प्रोफाइलशी जुळणारी कोणतीही सरकारी योजना नाही.',
  more_info_required: 'अधिक माहिती आवश्यक आहे',
  field_required: 'हे फील्ड आवश्यक आहे.',
  invalid_email: 'कृपया एक वैध ईमेल पत्ता प्रविष्ट करा.',
  password_too_short: 'पासवर्ड किमान 6 अक्षरांचा असणे आवश्यक आहे.',
  passwords_dont_match: 'पासवर्ड जुळत नाहीत.',
  profile_extracted: 'प्रोफाइल काढली',
  review_edit: 'योजना शोधण्यापूर्वी कोणतेही फील्ड पुनरावलोकन करा आणि संपादित करा.',

  // Profile / Onboarding
  complete_your_profile: 'तुमची प्रोफाइल पूर्ण करा',
  complete_profile_desc: 'वैयक्तिक सरकारी योजना शोधण्यासाठी तुमची प्रोफाइल पूर्ण करा.',
  not_provided: 'दिले नाही',
  not_calculated: 'मोजले नाही',
  self_funding: 'स्व-वित्तपुरवठा',
  // Readiness
  checks_done: 'तपासण्या पूर्ण',
  items_still_needed: 'आयटम अजून हवे',
  engine_ranked_note: 'इंजिन-रँक · जुळणी गुण ≠ पात्रता',
  capital_label: 'भांडवल',
  readiness_excellent: 'उत्कृष्ट',
  readiness_good: 'चांगले',
  readiness_fair: 'ठीक',
  readiness_needs_work: 'सुधारणा आवश्यक',
  proceed_to_partners: 'भागीदार शोधण्यासाठी पुढे जा',
  readiness_breakdown: 'तयारी तपशील',
  completed_checks: 'पूर्ण तपासण्या',
  incomplete_checks: 'अपूर्ण तपासण्या',
  go_complete: 'जा आणि पूर्ण करा',
  // Scheme Passport
  all_types: 'सर्व प्रकार',
  all_status: 'सर्व स्थिती',
  funding_label: 'निधी',
  success_rate: 'यशाचा दर',
  processing_time: 'प्रक्रिया वेळ',
  why_matches_you: 'हे तुमच्याशी का जुळते',
  missing_requirements: 'गहाळ आवश्यकता',
  official_source: 'अधिकृत स्रोत',
  apply_online: 'ऑनलाइन अर्ज करा',
  apply_offline: 'ऑफलाइन अर्ज करा',
  helpline: 'मदत रेषा',
  no_recommendations_yet: 'अद्याप कोणत्याही शिफारसी नाहीत',
  complete_profile_for_schemes: 'वैयक्तिक योजना जुळण्या पाहण्यासाठी तुमची प्रोफाइल पूर्ण करा.',
  ai_recommended: 'AI शिफारस',
  // Partner Routing
  use_my_location: 'माझे स्थान वापरा',
  locating: 'स्थान शोधत आहे…',
  your_location: 'तुमचे स्थान',
  optimized_route: 'अनुकूलित मार्ग',
  partners_found: 'भागीदार सापडले',
  nearest: 'जवळचे',
  top_match: 'शीर्ष जुळणी',
  recommended_partners: 'शिफारस केलेले भागीदार',
  platform_note_title: 'योजनामित्र तुम्हाला जोडते — अर्ज करत नाही.',
  intelligent_routing: 'तुमच्या शीर्ष योजनेसाठी भागीदार क्रमांकित',
  // Documents
  no_docs_required: 'अद्याप कोणतीही कागदपत्रे आवश्यक नाहीत.',
  // General
  something_went_wrong: 'काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.',
  find_my_schemes: 'माझ्या योजना शोधा',
  clear: 'साफ करा',
  schemes_discovered: 'संबंधित योजना सापडल्या',
  location_active: 'स्थान सक्रिय',
  location_denied: 'स्थान नाकारले',
};

const GU: Translations = {
  app_name: 'યોજનામિત્ર',
  app_tagline: 'AI આધારિત યોજના મેચિંગ',
  hero_title: 'તમારો વ્યવસાય. તમારી યોજનાઓ. એક સ્માર્ટ માર્ગદર્શક.',
  hero_subtitle: 'તમારા વ્યવસાય વિશે તમારી પોતાની ભાષામાં જણાવો — અમે તમારા માટે યોગ્ય સરકારી યોજનાઓ શોધીશું.',
  start_journey: 'શરૂ કરો',
  try_demo: 'ડેમો જુઓ',
  top_pick: '✦ #1 પસંદગી',
  login: 'લૉગિન',
  register: 'નોંધણી',
  logout: 'લૉગઆઉટ',
  email: 'ઈમેલ સરનામું',
  password: 'પાસવર્ડ',
  confirm_password: 'પાસવર્ડની પુષ્ટિ કરો',
  full_name: 'પૂરું નામ',
  login_title: 'ફરી સ્વાગત છે',
  login_subtitle: 'યોજનામિત્ર ચાલુ રાખવા માટે લૉગિન કરો',
  register_title: 'ખાતું બનાવો',
  register_subtitle: 'યોગ્ય સરકારી યોજના શોધવા માટે યોજનામિત્ર સાથે જોડાઓ',
  already_have_account: 'પહેલેથી ખાતું છે? લૉગિન કરો',
  no_account_yet: 'ખાતું નથી? નોંધણી કરો',
  creating_account: 'ખાતું બની રહ્યું છે…',
  logging_in: 'લૉગિન થઈ રહ્યું છે…',

  intake_title: 'તમારા વ્યવસાય વિશે જણાવો',
  intake_subtitle: 'ગુજરાતી, હિન્દી, મરાઠી અથવા અંગ્રેજીમાં ટાઇપ કરો અથવા બોલો. અમે તમારી જરૂરિયાત સમજશું.',
  intake_placeholder: 'ઉદા. "મારે પુણેમાં સિલાઈનો વ્યવસાય શરૂ કરવો છે. મારી પાસે ₹50,000 છે અને મને ₹2 લાખની જરૂર છે."',
  intake_voice_hint: 'માઇક્રોફોન પર ક્લિક કરીને બોલો',
  intake_example: 'આ ઉદાહરણ અજમાવો:',
  intake_example_text_tailoring: '"મારે પુણેમાં સિલાઈનો વ્યવસાય શરૂ કરવો છે. મારી પાસે ₹50,000 છે અને મને ₹2 લાખની જરૂર છે."',
  intake_example_text_food: '"મારી પાસે મુંબઈમાં ફૂડ ટ્રક છે અને મારે તેનો વિસ્તાર કરવો છે. મને ₹5 લાખની જરૂર છે."',
  intake_example_text_vendor: '"હું સ્ટ્રીટ વેન્ડર છું અને મને ₹10,000 કાર્યકારી મૂડીની જરૂર છે."',

  nav_dashboard: 'ડેશબોર્ડ',
  nav_schemes: 'યોજનાઓ',
  nav_planner: 'ખર્ચ આયોજન',
  nav_documents: 'દસ્તાવેજો',
  nav_readiness: 'તૈયારી',
  nav_partners: 'ભાગીદાર શોધો',
  max_label: 'મહત્તમ',
  continue: 'આગળ વધો',
  back: 'પાછળ',
  edit: 'ફેરફાર કરો',
  confirm: 'પુષ્ટિ કરો અને યોજનાઓ શોધો',
  save: 'સાચવો',
  cancel: 'રદ કરો',
  submit: 'સબમિટ કરો',
  search: 'શોધો',
  filter: 'ફિલ્ટર',
  close: 'બંધ કરો',

  we_understood: 'અમે આ સમજ્યા',
  business_type: 'વ્યવસાયનો પ્રકાર',
  location: 'સ્થાન',
  capital: 'ઉપલબ્ધ મૂડી',
  loan_needed: 'જરૂરી ભંડોળ',
  monthly_income: 'માસિક આવક',
  category: 'સામાજિક વર્ગ',
  occupation: 'વ્યવસાય',
  business_stage: 'વ્યવસાયની સ્થિતિ',

  welcome_back: 'ફરી સ્વાગત છે',
  talk_to_yojanamitra: 'યોજનામિત્ર સાથે વાત કરો',
  view_schemes: 'મારી યોજનાઓ જુઓ',
  no_profile_yet: 'તમારા વ્યવસાય વિશે જણાવો',
  no_profile_desc: 'તમારા વ્યવસાયનું વર્ણન કરો અને અમે તમારા માટે યોગ્ય સરકારી યોજનાઓ શોધીશું.',
  get_started: 'શરૂ કરો',
  schemes_matched: 'મેળ ખાતી યોજનાઓ',
  eligible_now: 'હાલ પાત્ર',
  documents_ready: 'દસ્તાવેજો તૈયાર',
  upload_missing: 'ગુમ થયેલા દસ્તાવેજો અપલોડ કરો',
  readiness_score: 'તૈયારી સ્કોર',
  top_scheme_matches: 'ટોચની યોજના મેચ',
  eligibility_snapshot: 'પાત્રતા ઝલક',
  quick_actions: 'ઝડપી ક્રિયાઓ',
  view_all: 'બધું જુઓ',

  scheme_passport: 'યોજના પાસપોર્ટ',
  scheme_passport_subtitle: 'તમારી પ્રોફાઇલ સાથે મેળ ખાતી અને સંબંધિતતા અનુસાર ક્રમબદ્ધ યોજનાઓ. પાત્રતા ચકાસાયેલ નિયમો દ્વારા તપાસવામાં આવે છે.',
  eligible: 'પાત્ર',
  not_eligible: 'અપાત્ર',
  needs_info: 'માહિતી જરૂરી',
  match_score: 'મેચ સ્કોર',
  why_matches: 'શા માટે મેળ ખાય છે',
  eligibility_details: 'પાત્રતા વિગતો',
  apply_now: 'હમણાં અરજી કરો',
  no_schemes_found: 'કોઈ મેળ ખાતી યોજના મળી નથી',
  kaggle_discovery: 'Kaggle ડેટાસેટ શોધ',

  planner_title: 'વ્યવસાય ખર્ચ આયોજન',
  planner_subtitle: 'તમારા વ્યવસાયના પ્રારંભિક ખર્ચનો અંદાજ લગાવો અને ભંડોળની ખાધ શોધો.',
  total_cost: 'કુલ વ્યવસાય ખર્ચ',
  available_capital: 'ઉપલબ્ધ મૂડી',
  funding_gap: 'ભંડોળની ખાધ',
  add_item: 'ઉમેરો',
  equipment: 'સાધનો',
  setup: 'સેટઅપ અને માળખાકીય સુવિધા',
  raw_materials: 'કાચો માલ',
  rent: 'ભાડું / લીઝ',
  licenses: 'લાઇસન્સ અને નોંધણી',
  working_capital: 'કાર્યકારી મૂડી',
  marketing: 'માર્કેટિંગ',
  contingency: 'આકસ્મિક ખર્ચ (10%)',

  documents_title: 'દસ્તાવેજ ચેકલિસ્ટ',
  documents_subtitle: 'તમારી ભલામણ કરાયેલી યોજનાઓ માટે જરૂરી દસ્તાવેજો.',
  required: 'જરૂરી',
  available: 'ઉપલબ્ધ',
  missing: 'ગુમ',
  document_status: 'દસ્તાવેજ સ્થિતિ',

  readiness_title: 'અરજી તૈયારી',
  readiness_subtitle: 'સરકારી યોજનાઓ માટે અરજી કરવાની તમારી તૈયારી.',
  application_readiness: 'અરજી તૈયારી',

  partners_title: 'યોગ્ય ભાગીદાર સાથે જોડાઓ',
  partners_subtitle: 'બેંકો, NGO અને સરકારી કચેરીઓ જે તમારી અરજી પ્રક્રિયા કરવામાં મદદ કરી શકે.',
  find_partners: 'મારી નજીકના ભાગીદારો શોધો',
  all_partners: 'બધા ભાગીદારો',
  banks: 'બેંકો / NBFC',
  ngos: 'NGO',
  govt_offices: 'સરકારી કચેરીઓ',
  online: 'ઓનલાઇન',
  connect_partner: 'આ ભાગીદાર સાથે જોડાઓ',
  km_away: 'કિમી દૂર',
  rating: 'રેટિંગ',
  supported_schemes: 'સમર્થિત યોજનાઓ',
  languages_spoken: 'ભાષાઓ',
  map_view: 'નકશા દૃશ્ય',
  list_view: 'યાદી દૃશ્ય',
  map_unavailable: 'નકશાનું પૂર્વાવલોકન — સંપૂર્ણ નકશા માટે Google Maps API કી ગોઠવો',

  language: 'ભાષા',
  voice_listening: 'સાંભળી રહ્યા છીએ…',
  voice_start: 'બોલવાનું શરૂ કરો',
  voice_stop: 'રોકો',
  voice_unsupported: 'આ બ્રાઉઝરમાં વૉઇસ ઇનપુટ સપોર્ટેડ નથી. કૃપા કરીને ટેક્સ્ટ ઇનપુટનો ઉપયોગ કરો.',

  voice_output_listen: '🔊 સાંભળો',
  voice_output_speaking: '🔊 બોલી રહ્યા છીએ…',
  voice_output_stop: '⏹ રોકો',

  how_to_fill_form: 'ફોર્મ કેવી રીતે ભરવું',
  watch_tutorial: 'ટ્યુટોરિયલ જુઓ',
  form_tutorial_desc: 'અરજી કેવી રીતે ભરવી અને સબમિટ કરવી તેની પગલું-દર-પગલું વિડિયો માર્ગદર્શિકા.',

  demo_profile_loaded: 'પૂર્વાવલોકન માટે ડેમો પ્રોફાઇલ લોડ કરવામાં આવી',
  profile_review_title: 'અમે આ સમજ્યા',
  profile_review_subtitle: 'યોજનાઓ શોધતા પહેલાં કોઈપણ ક્ષેત્રની સમીક્ષા કરો અને તેમાં ફેરફાર કરો.',
  quick_eligibility_toggles: 'ઝડપી પાત્રતા વિકલ્પો',
  street_vendor_label: 'સ્ટ્રીટ વેન્ડર',
  aadhaar_available: 'આધાર ઉપલબ્ધ',
  pan_available: 'PAN ઉપલબ્ધ',
  bank_account_label: 'બેંક ખાતું',
  existing_loan_label: 'હાલની લોન છે',
  cibil_default_label: 'CIBIL ડિફૉલ્ટ',
  prev_pmegp_label: 'અગાઉના PMEGP લાભાર્થી',
  caste_cert_label: 'જાતિ પ્રમાણપત્ર ઉપલબ્ધ',
  street_vendor_cert_label: 'સ્ટ્રીટ વેન્ડર પ્રમાણપત્ર (CoV)',

  emi_title: 'EMI અને ચુકવણી ક્ષમતા કેલ્ક્યુલેટર',
  emi_monthly: 'માસિક EMI',
  emi_total_interest: 'કુલ વ્યાજ',
  emi_total_payment: 'કુલ ચુકવણી',
  emi_loan_amount: 'લોન રકમ (₹)',
  emi_interest_rate: 'વાર્ષિક વ્યાજ દર (%)',
  emi_tenure_months: 'સમયગાળો (મહિના)',

  support_stack_title: 'તમારો સહાય સ્ટેક',

  profile_incomplete: 'કેટલીક માહિતી અધૂરી છે. કૃપા કરીને તમારી પ્રોફાઇલ પૂર્ણ કરો.',
  loading: 'લોડ થઈ રહ્યું છે…',
  no_match_found: 'કોઈ મેળ ખાતી યોજના મળી નથી',
  no_match_desc: 'ચકાસાયેલ ડેટાબેઝમાં તમારી વર્તમાન પ્રોફાઇલ સાથે મેળ ખાતી કોઈ સરકારી યોજના નથી. તમારી પ્રોફાઇલની વિગતો બદલવાનો પ્રયાસ કરો.',
  more_info_required: 'વધુ માહિતી જરૂરી છે',
  field_required: 'આ ક્ષેત્ર જરૂરી છે.',
  invalid_email: 'કૃપા કરીને માન્ય ઈમેલ સરનામું દાખલ કરો.',
  password_too_short: 'પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ.',
  passwords_dont_match: 'પાસવર્ડ મેળ ખાતા નથી.',
  profile_extracted: 'પ્રોફાઇલ તૈયાર કરવામાં આવી',
  review_edit: 'યોજનાઓ શોધતા પહેલાં કોઈપણ ક્ષેત્રની સમીક્ષા કરો અને તેમાં ફેરફાર કરો.',

  complete_your_profile: 'તમારી પ્રોફાઇલ પૂર્ણ કરો',
  complete_profile_desc: 'વ્યક્તિગત સરકારી યોજનાઓ શોધવા માટે તમારી પ્રોફાઇલ પૂર્ણ કરો.',
  not_provided: 'આપવામાં આવ્યું નથી',
  not_calculated: 'ગણતરી કરવામાં આવી નથી',
  self_funding: 'સ્વ-ભંડોળ',

  checks_done: 'ચકાસણીઓ પૂર્ણ',
  items_still_needed: 'હજી જરૂરી વસ્તુઓ',
  engine_ranked_note: 'એન્જિન દ્વારા ક્રમબદ્ધ · મેચ સ્કોર ≠ પાત્રતા',
  capital_label: 'મૂડી',
  readiness_excellent: 'ઉત્તમ',
  readiness_good: 'સારું',
  readiness_fair: 'યોગ્ય',
  readiness_needs_work: 'સુધારાની જરૂર',
  proceed_to_partners: 'ભાગીદાર રાઉટિંગ તરફ આગળ વધો',
  readiness_breakdown: 'તૈયારીનું વિભાજન',
  completed_checks: 'પૂર્ણ થયેલી ચકાસણીઓ',
  incomplete_checks: 'અપૂર્ણ ચકાસણીઓ',
  go_complete: 'જાઓ અને પૂર્ણ કરો',

  all_types: 'બધા પ્રકાર',
  all_status: 'બધી સ્થિતિ',
  funding_label: 'ભંડોળ',
  success_rate: 'સફળતા દર',
  processing_time: 'પ્રક્રિયા સમય',
  why_matches_you: 'શા માટે તે તમારી સાથે મેળ ખાય છે',
  missing_requirements: 'ગુમ થયેલી આવશ્યકતાઓ',
  official_source: 'સત્તાવાર સ્ત્રોત',
  apply_online: 'ઓનલાઇન અરજી કરો',
  apply_offline: 'ઓફલાઇન અરજી કરો',
  helpline: 'હેલ્પલાઇન',
  no_recommendations_yet: 'હજુ સુધી કોઈ ભલામણ નથી',
  complete_profile_for_schemes: 'વ્યક્તિગત યોજના મેચ જોવા માટે તમારી પ્રોફાઇલ પૂર્ણ કરો.',
  ai_recommended: 'AI ભલામણ',

  use_my_location: 'મારું સ્થાન વાપરો',
  locating: 'સ્થાન શોધી રહ્યા છીએ…',
  your_location: 'તમારું સ્થાન',
  optimized_route: 'અનુકૂળ માર્ગ',
  partners_found: 'ભાગીદારો મળ્યા',
  nearest: 'સૌથી નજીક',
  top_match: 'ટોચની મેચ',
  recommended_partners: 'ભલામણ કરાયેલા ભાગીદારો',
  platform_note_title: 'યોજનામિત્ર તમને જોડે છે — તમારા વતી અરજી કરતું નથી.',
  intelligent_routing: 'તમારી ટોચની યોજના માટે ભાગીદારો ક્રમબદ્ધ કરવામાં આવ્યા છે',

  no_docs_required: 'હજુ કોઈ દસ્તાવેજ જરૂરી નથી.',

  something_went_wrong: 'કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.',
  find_my_schemes: 'મારી યોજનાઓ શોધો',
  clear: 'સાફ કરો',
  schemes_discovered: 'સંબંધિત યોજનાઓ મળી',
  location_active: 'સ્થાન સક્રિય',
  location_denied: 'સ્થાન નકારવામાં આવ્યું',
};

const TRANSLATIONS: Record<Language, Translations> = {
  en: EN,
  hi: HI,
  mr: MR,
  gu: GU,
};

export function t(key: TranslationKey, lang: Language): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

export type { TranslationKey };
