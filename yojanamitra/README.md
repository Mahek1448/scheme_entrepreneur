<!-- YojanaMitra — README.md -->
<!-- Generated from codebase inspection of the SIH 2026 prototype -->
<!-- Team: Tactical Thinkers | Problem Statement: PS 26092 -->

<p align="center">
  <img src="public/favicon.svg" alt="YojanaMitra Logo" height="72" />
</p>

<h1 align="center">YojanaMitra</h1>
<h3 align="center">AI-Driven Scheme Matching for Marginalized Entrepreneurs</h3>

<p align="center">
  <strong>Smart India Hackathon 2026 &nbsp;·&nbsp; Problem Statement PS 26092 &nbsp;·&nbsp; Team Tactical Thinkers</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Leaflet-OpenStreetMap-1AA260?logo=leaflet&logoColor=white" />
  <img src="https://img.shields.io/badge/SIH-2026-FF6B35" />
</p>

---

## Table of Contents

1. [Project Title & Positioning](#1-project-title--positioning)
2. [SIH 2026 — Problem Statement](#2-sih-2026--problem-statement)
3. [Project Overview](#3-project-overview)
4. [Problem We Solve](#4-problem-we-solve)
5. [Our Solution](#5-our-solution)
6. [Key Innovation](#6-key-innovation)
7. [Complete User Journey](#7-complete-user-journey)
8. [Core Features](#8-core-features)
9. [AI / NLP Architecture](#9-ai--nlp-architecture)
10. [Scheme Discovery — Kaggle TF-IDF Layer](#10-scheme-discovery--kaggle-tf-idf-layer)
11. [Verified Eligibility Engine](#11-verified-eligibility-engine)
12. [Recommendation Engine](#12-recommendation-engine)
13. [Match Score Calculation](#13-match-score-calculation)
14. [Scheme Passport / Scheme Details](#14-scheme-passport--scheme-details)
15. [Why This Scheme / Explainability](#15-why-this-scheme--explainability)
16. [Business Cost Planner](#16-business-cost-planner)
17. [EMI / Affordability Calculator](#17-emi--affordability-calculator)
18. [Funding Gap & Support Stack](#18-funding-gap--support-stack)
19. [Document Checklist](#19-document-checklist)
20. [Application Readiness Score](#20-application-readiness-score)
21. [Partner Routing](#21-partner-routing)
22. [Map Technology](#22-map-technology)
23. [Haversine Distance Calculation](#23-haversine-distance-calculation)
24. [Multilingual Support](#24-multilingual-support)
25. [Voice Input](#25-voice-input)
26. [Voice Output](#26-voice-output)
27. [YouTube Form-Filling Guidance](#27-youtube-form-filling-guidance)
28. [Authentication](#28-authentication)
29. [Login / Register UI](#29-login--register-ui)
30. [Responsive Design](#30-responsive-design)
31. [Government Schemes in Dataset](#31-government-schemes-in-dataset)
32. [Technology Stack](#32-technology-stack)
33. [Project Architecture](#33-project-architecture)
34. [Folder Structure](#34-folder-structure)
35. [Application Routes](#35-application-routes)
36. [Data Flow](#36-data-flow)
37. [Scheme Data & Synchronization](#37-scheme-data--synchronization)
38. [Security / Privacy Considerations](#38-security--privacy-considerations)
39. [Fail-Safe Design Principles](#39-fail-safe-design-principles)
40. [Demo Data / Prototype Behavior](#40-demo-data--prototype-behavior)
41. [Limitations of Current Prototype](#41-limitations-of-current-prototype)
42. [Future Enhancements](#42-future-enhancements)
43. [Competitor Differentiation](#43-competitor-differentiation)
44. [Scalability](#44-scalability)
45. [Impact](#45-impact)
46. [Installation](#46-installation)
47. [Running the Project](#47-running-the-project)
48. [Build / Production](#48-build--production)
49. [Prototype Demo Flow](#49-prototype-demo-flow)
50. [Important Technical Notes](#50-important-technical-notes)
51. [Team](#51-team)
52. [Conclusion](#52-conclusion)

---

## 1. Project Title & Positioning

### YojanaMitra — योजनामित्र

> **"AI understands. Verified rules decide. Recommendation ranks. Planner prepares. Partner routing connects."**

> **"ZERO KNOWLEDGE → LOAN READY"**

YojanaMitra is a decision-support and navigation platform designed to help marginalized entrepreneurs discover relevant government schemes, understand their eligibility, plan their financing, prepare required documents, assess application readiness, and connect with suitable channel partners (banks, NGOs, government offices).

**YojanaMitra is NOT a lender.** It does not approve loans, guarantee subsidies, or process applications. It helps the entrepreneur arrive fully prepared at the right partner's door.

---

## 2. SIH 2026 — Problem Statement

| Field | Details |
|---|---|
| **Hackathon** | Smart India Hackathon 2026 |
| **Problem Statement** | PS 26092 |
| **Team** | Tactical Thinkers |
| **Theme** | Financial Inclusion / Entrepreneurship |
| **Submission Type** | Software |

---

## 3. Project Overview

India has dozens of government schemes designed to support marginalized entrepreneurs — PMEGP, MUDRA, PM SVANidhi, PM-DAKSH, and many more. Yet a large fraction of the intended beneficiaries never access these schemes.

The gap is not the absence of schemes. The gap is:

- **Discovery** — "Which scheme applies to my situation?"
- **Eligibility** — "Do I actually qualify?"
- **Preparation** — "What documents do I need? Am I ready?"
- **Planning** — "How do I fill the financing gap?"
- **Navigation** — "Where do I actually go to apply?"

YojanaMitra bridges every one of these gaps in a single, integrated, multilingual, voice-enabled web journey.

---

## 4. Problem We Solve

A typical marginalized entrepreneur — a vegetable vendor, a tailoring shop owner, a kirana store owner — may know:

- ✅ What business they want to start
- ✅ How much money they need
- ✅ Where they live

But they often do NOT know:

- ❌ Which government scheme applies to them
- ❌ Whether they satisfy the eligibility conditions
- ❌ How much financing they should seek from which source
- ❌ What documents are required
- ❌ Whether they are ready to apply
- ❌ Which channel partner, lender, or government office they should approach

---

## 5. Our Solution

YojanaMitra converts a natural-language description of a business need into:

1. A structured user profile (via local NLP extraction)
2. A ranked list of potentially relevant government schemes (via Kaggle TF-IDF discovery)
3. Deterministic eligibility verdicts against verified scheme rules (via the Eligibility Engine)
4. A match-score ranked recommendation (via the Recommendation Engine)
5. A scheme-specific document checklist
6. A business cost plan with funding gap analysis and EMI illustration
7. An application readiness score
8. A map of nearby partner institutions ranked for the user's specific situation

---

## 6. Key Innovation

| Innovation | Description |
|---|---|
| **Two-Layer AI/Rule Architecture** | AI/NLP extracts the profile. Deterministic rules evaluate eligibility. These are strictly separate concerns. |
| **Kaggle for Discovery, rules.json for Eligibility** | Kaggle TF-IDF retrieval discovers candidate schemes. `schemes.json` verified rules determine eligibility. |
| **Match Score ≠ Eligibility** | Match score (0–100) measures relevance. Eligibility status (ELIGIBLE / NEEDS_MORE_INFO / NOT_ELIGIBLE) is determined independently. |
| **User Remains in Control** | The Profile Confirmation screen lets every user review and edit the NLP-extracted profile before any eligibility check runs. |
| **Intent-Aware Retrieval** | The query sent to TF-IDF changes based on detected intent (BUSINESS / WORKING_CAPITAL / TRAINING / EDUCATION_LOAN). |
| **Fail-Safe Eligibility** | No AI heuristic ever determines final eligibility. All eligibility decisions are rule-based and traceable to official scheme criteria. |
| **Haversine Partner Routing** | Partners are ranked using actual geographical distance plus profile-based suitability scoring. |
| **Zero External API Dependencies** | The entire prototype runs in the browser — no backend, no external AI API, no Google Maps key required. |

---

## 7. Complete User Journey

```
Landing Page
    │
    ▼
Register / Login
    │
    ▼
Dashboard
    │
    ▼
Talk to YojanaMitra  (/intake)
    │  ┌──────────────────────────────────────┐
    │  │ Voice Input (Web Speech API)          │
    │  │ OR Text Input                         │
    │  │ Language: English / Hindi / Marathi   │
    │  └──────────────────────────────────────┘
    │
    ▼
NLP Profile Extraction  (NLPService.ts)
    │  Pattern matching + keyword dictionaries (local)
    │  LLM stub present — inactive in prototype
    │
    ▼
Profile Confirmation  (/profile-confirm)
    │  User reviews / edits all extracted fields
    │  User remains in control — can change anything
    │
    ▼
Kaggle TF-IDF Scheme Discovery  (KaggleRetrieval.ts)
    │  Builds intent-aware profile query
    │  Computes cosine similarity against indexed CSV
    │  Returns top candidate scheme names
    │
    ▼
Verified Eligibility Engine  (EligibilityEngine.ts)
    │  Deterministic evaluation — no AI
    │  Evaluates 10+ criteria per scheme
    │  Returns: ELIGIBLE / NEEDS_MORE_INFORMATION / NOT_ELIGIBLE
    │
    ▼
Recommendation Engine  (RecommendationEngine.ts)
    │  Computes weighted match score (0–100)
    │  Intent-based scheme filtering
    │  Sorts: ELIGIBLE first, then by match score
    │
    ▼
Scheme Passport  (/schemes)
    │  List of ranked + eligibility-checked schemes
    │
    ▼
Scheme Details  (/schemes/:id)
    │  Full scheme info, eligibility breakdown, match score,
    │  "Why it matches", missing requirements, documents,
    │  YouTube form-filling tutorial (if available)
    │
    ▼
Business Cost Planner  (/planner)
    │  Business-type-aware cost templates
    │  Editable line items by category
    │  Funding gap = Total Cost − Available Capital
    │  Support Stack visualization
    │  EMI Calculator
    │
    ▼
Document Checklist  (/documents)
    │  Scheme-specific required documents
    │  Mark each as available / missing
    │  Document readiness percentage
    │
    ▼
Application Readiness Score  (/readiness)
    │  Weighted score across Profile + Financial + Documents
    │  Labels: Excellent / Good / Fair / Needs Work
    │  Actionable list of what to complete
    │
    ▼
Partner Routing  (/partners)
    │  Leaflet + OpenStreetMap interactive map
    │  Browser Geolocation (with fallback)
    │  Haversine distance calculation
    │  Partner ranking by profile + scheme suitability
    │
    ▼
Connect With Right Partner
    │  Phone / Website CTA per partner
    │  "YojanaMitra connects you — not applies for you."
```

> **The current prototype journey ends at:** Application Readiness → Find Partner → Connect
>
> There is no post-application tracker or disbursement tracking in the current prototype.

---

## 8. Core Features

### A. Natural Language Input

The entrepreneur describes their business need in plain language instead of filling a structured form.

**Example inputs:**

```
"I want to start a tailoring business in Pune. I have ₹50,000 and need ₹2 lakh."

"मुझे पुणे में सब्जी का व्यवसाय शुरू करना है। मेरे पास ₹50,000 हैं।"

"मला पुण्यात भाजीपाला व्यवसाय सुरू करायचा आहे."

"I am a street vendor and need working capital of ₹10,000."
```

This text input is passed to the NLP extraction pipeline which converts it into a structured `UserProfile`.

### B. Live Kaggle Preview While Typing

As the user types (debounced at 800ms), the system performs a live TF-IDF retrieval against the Kaggle index and shows scheme name chips in real time — giving immediate feedback that the system has understood the input.

### C. Example Prompts

Pre-built example prompts are available in English, Hindi, and Marathi covering:
- Vegetable Business
- Tailoring Business
- Street Vendor Working Capital

### D. Profile Confirmation with Full Edit Control

After NLP extraction, the user sees all extracted fields laid out for review. Every field is editable. Quick toggle switches handle boolean fields (street vendor, Aadhaar available, PAN available, bank account, CIBIL default, previous PMEGP beneficiary, caste certificate). This ensures the user, not the AI, has the final say over their own profile.

### E. Dashboard

Shows:
- User profile summary
- Top scheme matches with match scores and eligibility badges
- Application readiness score
- Quick action links to all major sections
- Scheme eligibility snapshot

### F. Admin Dashboard (`/admin`)

A separate admin view (accessible to authenticated users) shows aggregate demo statistics for platform context (see §40 on demo data).

---

## 9. AI / NLP Architecture

### Current Implementation

The NLP layer is implemented in [`NLPService.ts`](src/services/NLPService.ts).

The current prototype uses **local pattern-based extraction** (`extractionMethod: 'local_mock'`), **not** a production LLM API.

**Extraction method:** `extractLocally()` — a local function using:
- Regular expression pattern matching
- Keyword dictionaries (business type, location, state, gender, category)
- Amount parsing (lakhs, thousands, ₹ symbols)
- Contextual capital vs. loan disambiguation
- Language detection (English / Hindi / Marathi / mixed)
- Intent classification

**Extracted fields:**

| Field | Type | Example |
|---|---|---|
| `businessType` | string | `"Tailoring / Stitching"` |
| `businessStage` | enum | `idea \| startup \| growing \| established` |
| `location` | string | `"Pune"` |
| `state` | string | `"Maharashtra"` |
| `isUrban` | boolean | `true` |
| `availableCapital` | number | `50000` |
| `fundingRequirement` | number | `200000` |
| `monthlyRevenue` | number | — |
| `annualFamilyIncome` | number | — |
| `category` | enum | `general \| sc \| st \| obc \| minority` |
| `gender` | enum | `male \| female \| other` |
| `occupation` | enum | `street_vendor \| unemployed \| ...` |
| `isStreetVendor` | boolean | — |
| `age` | number | — |
| `educationLevel` | enum | — |
| `intent` | enum | `BUSINESS \| WORKING_CAPITAL \| TRAINING \| EDUCATION_LOAN` |
| `language` | enum | `en \| hi \| mr \| mixed` |

Each field carries an **extraction confidence**: `high | medium | low | unknown`.

### LLM Stub (Extension Point)

`NLPService.ts` contains a clearly marked `extractWithLLM()` function:

```typescript
// ─── LLM Stub (replace body to connect real API) ──────────────────────────────
async function extractWithLLM(_text: string): Promise<ExtractionResult | null> {
  // TODO: Replace with real LLM API call
  // Example: call Gemini Pro / GPT-4 with a structured prompt, parse JSON response
  // Return null to fall back to local extraction
  return null;
}
```

This function **currently returns `null`** at all times, causing the system to always fall back to local extraction. The architecture is designed so that replacing the body of `extractWithLLM()` is the only change needed to connect a production LLM — all downstream components (EligibilityEngine, RecommendationEngine) remain unchanged.

> **IMPORTANT:** AI/NLP extracts the user profile only.  
> Eligibility is always decided by the deterministic EligibilityEngine — never by the NLP layer.

---

## 10. Scheme Discovery — Kaggle TF-IDF Layer

Implemented in [`KaggleRetrieval.ts`](src/services/KaggleRetrieval.ts).

### Data Source

- **File:** `kaggle_schemes.csv` (~12.2 MB, ~thousands of Indian government scheme entries)
- **Loaded:** at runtime via Vite's `?raw` import; parsed with a custom CSV parser
- **Purpose:** DISCOVERY ONLY — to find potentially relevant scheme names

### TF-IDF Pipeline

```
User profile
    │
    ▼
buildProfileQuery()   ← Intent-aware query construction
    │
    ▼
tokenize()            ← Lowercase, remove punctuation, filter stop words
    │
    ▼
computeTF()           ← Term frequency per document
    │
    ▼
computeIDF()          ← Inverse document frequency across corpus
    │
    ▼
tfidfVector()         ← TF × IDF weight per term
    │
    ▼
cosineSimilarity()    ← Query vector vs. each scheme vector
    │
    ▼
Top-N candidates      ← Filtered at score > 0.01, returned as names + metadata
```

### Intent-Aware Query Construction

The query passed to TF-IDF is not the raw user text — it is a structured profile query built from the extracted profile, sensitive to intent:

| Intent | Query focus |
|---|---|
| `EDUCATION_LOAN` | Education, scholarship, higher education, college |
| `TRAINING` | Skill training, vocational, Kaushal Vikas |
| `WORKING_CAPITAL` | Working capital, micro loan, street vendor, PM SVANidhi |
| `BUSINESS` (default) | Business type, occupation, funding range, category, state |

### Architectural Guarantee

```
┌─────────────────────────────────────────────────┐
│  Kaggle CSV  →  TF-IDF  →  Candidate names      │
│           DISCOVERY LAYER ONLY                   │
│  NOT the source of truth for eligibility         │
└─────────────────────────────────────────────────┘
           │
           ▼ candidate names used as hints only
┌─────────────────────────────────────────────────┐
│  schemes.json  →  EligibilityEngine              │
│         ELIGIBILITY SOURCE OF TRUTH              │
│  Official government rules, structured data      │
└─────────────────────────────────────────────────┘
```

---

## 11. Verified Eligibility Engine

Implemented in [`EligibilityEngine.ts`](src/engines/EligibilityEngine.ts).

> **"AI understands the user, but deterministic verified rules decide eligibility."**

The EligibilityEngine is **100% deterministic**. It contains no AI, no heuristics, no LLM calls. It evaluates each eligibility criterion as an explicit rule check.

### Criteria Evaluated Per Scheme

| Criterion | Evaluator | Notes |
|---|---|---|
| Age | `evalAge()` | Min/max age from scheme data |
| Gender | `evalGender()` | Allowed genders from scheme data |
| Social Category | `evalCategory()` | SC/ST/OBC/General/Minority |
| Business Stage | `evalBusinessStage()` | Idea/Startup/Growing/Established |
| Occupation | `evalOccupation()` | Street vendor / artisan / unemployed / any |
| Location | `evalLocation()` | All India / Urban only / specific states |
| Street Vendor Status | `evalStreetVendor()` | PM SVANidhi requires this |
| Street Vendor Certificate | `evalStreetVendorCertificate()` | CoV / LoR from ULB |
| Education | `evalEducation()` | PMEGP: 8th pass required for project > ₹10L |
| Existing Beneficiary | `evalExistingBeneficiary()` | PMEGP: previous beneficiaries excluded |
| CIBIL / Credit | `evalCIBIL()` | MUDRA: no existing default |
| Annual Family Income | `evalIncome()` | PM-DAKSH: SC ≤ ₹3L, OBC ≤ ₹1L |
| Funding Range | `evalFundingRange()` | Requirement vs. scheme min/max |

### Eligibility Statuses

| Status | Meaning |
|---|---|
| `ELIGIBLE` | All blocking criteria passed, no missing information |
| `NEEDS_MORE_INFORMATION` | Some criteria have missing info or non-blocking failures |
| `NOT_ELIGIBLE` | One or more blocking criteria failed |

### Blocking vs. Non-Blocking

- **Blocking criteria** (e.g., wrong category, age out of range, not a street vendor for PM SVANidhi) result in `NOT_ELIGIBLE`.
- **Non-blocking criteria** (e.g., funding slightly outside range, certificate not yet obtained) result in `NEEDS_MORE_INFORMATION` — the user can still pursue the scheme.

---

## 12. Recommendation Engine

Implemented in [`RecommendationEngine.ts`](src/engines/RecommendationEngine.ts).

The RecommendationEngine ranks schemes by **relevance (match score)** independently of eligibility. Both are computed per scheme and displayed side-by-side on the UI.

### Intent-Based Pre-Filtering

Before scoring, schemes are filtered based on detected intent:

- `EDUCATION_LOAN` → Only education/scholarship/grant schemes shown
- `TRAINING` → Only training/skill development schemes shown
- `WORKING_CAPITAL`, `BUSINESS` → All schemes shown (ranked by match score)

### Sorting Order

```
1. ELIGIBLE schemes (sorted by match score descending)
2. NEEDS_MORE_INFORMATION schemes (sorted by match score descending)
3. NOT_ELIGIBLE schemes (sorted by match score descending)
```

---

## 13. Match Score Calculation

Match Score is a **0–100 relevance indicator**. It does not indicate probability of loan approval or guarantee of eligibility.

### Scoring Dimensions and Weights

| Dimension | Weight | What it measures |
|---|---|---|
| Business Compatibility | **20%** | How well scheme purpose aligns with business type / tags |
| Funding Compatibility | **25%** | How well the scheme's funding range matches the user's requirement |
| Beneficiary Compatibility | **20%** | Does the user's category / occupation match the scheme's target beneficiary |
| Stage Compatibility | **15%** | Does the business stage (idea/startup/growing/established) match scheme's allowed stages |
| Location Compatibility | **10%** | Is the user's location (state / urban-rural) covered by the scheme |
| Purpose Alignment | **10%** | Does the scheme's purpose (loan / training / subsidy) align with the user's intent |
| **Total** | **100%** | Weighted average |

> **Match Score ≠ Eligibility Status.**  
> A scheme may have a high match score (e.g., 85%) and still be `NOT_ELIGIBLE` because a blocking criterion fails (e.g., wrong category). Always read both together.

---

## 14. Scheme Passport / Scheme Details

### Scheme Passport (`/schemes`)

A filtered, paginated list of all recommended schemes showing:
- Scheme name, ministry, category badge
- Match Score ring (animated, 0–100)
- Eligibility badge (ELIGIBLE / NEEDS INFO / NOT ELIGIBLE)
- Funding range
- Processing time
- "View Details" → Scheme Details page

Filter options:
- By scheme type (loan, loan_with_subsidy, training, grant)
- By eligibility status

### Scheme Details (`/schemes/:id`)

Full scheme information page including:

| Section | Contents |
|---|---|
| Header | Name, ministry, implementing agency, category badge |
| Match Score | Visual ring with breakdown by dimension |
| Funding | Min/max amounts, interest rate range, repayment period, subsidy percent |
| Benefits | Scheme-specific benefit list |
| Eligibility Summary | Status badge, criteria count (passed / blocking / missing info) |
| Why It Matches | Deterministic match reasons from profile + scheme data |
| Eligibility Check | Each criterion as a pass/fail/warning row with your value vs. required value |
| Missing Requirements | What needs to be addressed to become eligible |
| Required Documents | Scheme-specific document list |
| Match Score Breakdown | Bar chart per dimension |
| How to Apply | Online portal URL, offline process, helpline, processing time |
| YouTube Tutorial | How to fill the form (if `formTutorialUrl` is set for the scheme) |

---

## 15. Why This Scheme / Explainability

YojanaMitra generates human-readable explanations of why a scheme matches a user's profile and why specific eligibility criteria pass or fail. These explanations are **deterministic** — generated from structured profile data and scheme rules, not from an LLM.

**"Why it matches" examples:**
- "Scheme can fund up to ₹5,00,000 — matches your requirement."
- "You belong to OBC category, which is a priority beneficiary for this scheme."
- "Designed for idea stage businesses like yours."
- "No collateral required — ideal for entrepreneurs without property assets."

**"Why you're eligible" examples:**
- "✓ Age Requirement: 32 years meets the requirement of 18+."
- "✓ Social Category: OBC meets the requirement of General / SC / ST / OBC / Minority."

**"What's missing" examples:**
- "This scheme is exclusively for street vendors with a Certificate of Vending or Letter of Recommendation from ULB."
- "PMEGP requires minimum 8th pass education for projects above ₹10 lakhs."

> Scheme details notes explicitly state: *"Match reasons are generated from your profile data and verified scheme criteria — not from an AI language model."*

---

## 16. Business Cost Planner

Implemented in [`BusinessCostPlanner.tsx`](src/pages/BusinessCostPlanner.tsx).

### Cost Categories

The planner supports the following expense categories:

| Category | Examples |
|---|---|
| Equipment | Sewing machine, cooking equipment, weighing machine |
| Setup | Workspace setup, interior décor, shop fixtures |
| Raw Materials | Initial stock, fabric, food supplies |
| Rent / Deposit | Shop deposit, advance rent |
| Licenses | Shop & Establishment, FSSAI, GST, Certificate of Vending |
| Working Capital | Operating cash for 2 months |
| Marketing | Signage, branding, social media |
| Contingency | Buffer (typically 10% of total) |
| Other | Any user-defined expense |

### Business-Type-Aware Templates

The planner generates **different default cost line items** based on the detected business type:

| Business Type | Default template |
|---|---|
| Tailoring / Stitching | Sewing machine, tools, shop setup, thread, fabric |
| Food / Tiffin / Catering | Commercial cooking equipment, vehicle/cart, FSSAI |
| Kirana / Grocery Store | Shelves, weighing machine, initial stock, FSSAI/GST |
| Beauty Parlour / Salon | Beauty equipment, interior, products, shop licence |
| Street Vendor / Cart | Cart/stall, branding, initial stock, CoV permit |
| Generic (no match) | Primary equipment, workspace, materials, licences, WC |

All cost items are **editable by the user**. Items can be added or removed. Essential items are flagged separately from optional items.

> **Disclaimer:** Cost templates are planning estimates for prototype demonstration. They are NOT official government cost benchmarks or guaranteed market quotations. Actual costs vary by location, vendor, and market conditions.

### Funding Gap Formula

```
Total Business Cost
  − Available Capital (user's own funds)
  ─────────────────────────────
  = Funding Gap (what needs to be financed)
```

The funding gap is used to update the user's `fundingRequirement` in the profile, which flows into scheme matching and eligibility evaluation.

---

## 17. EMI / Affordability Calculator

The EMI calculator is embedded within the Business Cost Planner.

### Inputs

| Input | Default |
|---|---|
| Loan Amount (₹) | Auto-populated from funding gap |
| Interest Rate (% p.a.) | 10% |
| Tenure (months) | 36 |

### Outputs

| Output | Formula |
|---|---|
| Monthly EMI | Standard reducing-balance EMI formula |
| Total Interest Paid | (EMI × Tenure) − Principal |
| Total Payment | EMI × Tenure |

**EMI formula used:**

```
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
where: P = principal, r = monthly rate, n = tenure in months
```

> **Disclaimer:** *"Illustration only — actual rates depend on lender and credit profile."*  
> This calculator is for planning purposes only. Actual interest rates, terms, and repayment schedules are determined by individual lenders and are not guaranteed by YojanaMitra.

---

## 18. Funding Gap & Support Stack

The Support Stack visualization shows how a user's total business cost can potentially be covered by multiple funding sources.

### Components of the Support Stack

| Component | Color | Source |
|---|---|---|
| Your Capital | Navy `#1e3a5f` | User's own available funds |
| Loan / Credit | Blue | e.g., MUDRA Loan |
| Subsidy / Grant | Green | e.g., PMEGP Margin Money |

Each bar shows its percentage of the total business cost.

**Purpose:** Help the entrepreneur understand how the business can potentially be financed and how different government schemes contribute different components of support — not just loans, but also subsidies and grants.

> Note: The Support Stack is a planning visualization. It does not guarantee that any particular combination of funding sources will be approved or available to the user.

---

## 19. Document Checklist

Implemented in [`DocumentsReadiness.tsx`](src/pages/DocumentsReadiness.tsx).

The document checklist is **scheme-specific** — the required documents displayed are drawn from the selected scheme's `requiredDocuments` array in `schemes.json`.

### Document States

| State | Meaning |
|---|---|
| `available` | User has marked this document as available |
| `missing` | Document not yet available |
| `expired` | Document exists but may be out of date |
| `uploading` | (UI state only, no actual upload in prototype) |

### Document Readiness Percentage

```
Documents Ready (%) = Available Required Documents / Total Required Documents × 100
```

### Starting Document Set (`mockData.ts`)

The prototype starts with a generic set of documents in `missing` status:
- Aadhaar Card
- PAN Card
- Bank Passbook / Statement
- Passport Photo
- Residence Proof
- Caste / Category Certificate
- Business Plan / Project Report
- Income Certificate
- Certificate of Vending (for PM SVANidhi applicants)

> **No OCR or document extraction is implemented in the current prototype.**  
> The user manually marks documents as available/missing. Document AI / OCR is documented as a future production enhancement in §42.

---

## 20. Application Readiness Score

Implemented in [`useReadinessScore.ts`](src/hooks/useReadinessScore.ts).

The Readiness Score is a **0–100 preparation indicator** — not a government approval score, not a loan approval probability.

### Score Composition

#### Profile Section — 40 points total

| Check | Weight |
|---|---|
| Name provided | 5 |
| Age provided | 5 |
| Gender provided | 3 |
| Social category provided | 7 |
| Location (state & district) | 5 |
| Business type specified | 5 |
| Business stage specified | 5 |
| Occupation specified | 5 |

#### Financial Section — 30 points total

| Check | Weight |
|---|---|
| Available capital provided | 10 |
| Funding requirement specified | 10 |
| Monthly income / revenue provided | 5 |
| Annual family income provided | 5 |

#### Documents Section — 30 points total

| Check | Weight |
|---|---|
| Aadhaar Card available | 10 |
| Bank account / passbook available | 10 |
| PAN Card available | 5 |
| Passport photo available | 5 |

### Score Labels

| Score Range | Label | Color |
|---|---|---|
| 85–100 | Excellent | Green |
| 65–84 | Good | Blue |
| 45–64 | Fair | Amber |
| 0–44 | Needs Work | Red |

The score is computed dynamically on every render from the current `UserProfile` and `Document[]` state — it is never hardcoded.

---

## 21. Partner Routing

Implemented in [`PartnerRouting.tsx`](src/pages/PartnerRouting.tsx).

### Sample Partner Records

> **⚠ PROTOTYPE NOTE:** The current prototype uses **sample partner data** defined in `mockData.ts`. This is NOT a live verified partner database. In production, partner data should come from a verified, regularly updated database.

Sample partners included:

| Partner | Type | Schemes |
|---|---|---|
| State Bank of India – MSME Branch | Bank | MUDRA Shishu, Kishor, PMEGP, SHG |
| Bank of Maharashtra – Fort Branch | Bank | MUDRA, PM SVANidhi, PMEGP |
| NGO Support – Udyam Sahayata | NGO | Application guidance, PM SVANidhi, PM-DAKSH |
| DIC Mumbai – District Industries Centre | Government Office | PMEGP, MSME Udyam, EDP Training |
| PM SVANidhi Application Portal | Online Portal | PM SVANidhi |
| SBI Colaba Branch | Bank | MUDRA, PMEGP |

### Partner Ranking Algorithm

Partners are ranked using a scoring function that considers:

1. **Profile-scheme alignment:** Street vendor profile → SVANidhi/vendor partners scored higher; MUDRA scheme → bank partners scored higher; PMEGP → DIC / govt office scored higher
2. **Category bonus:** SC/ST/OBC profiles get NGO partners boosted
3. **Partner rating:** Partner's rating (out of 5) contributes to score
4. **Distance bonus:** Closer partners (by Haversine distance) receive a proximity bonus

### Map Interactions

- Click a partner card → map flies to that partner's location
- Click a map marker → highlights the corresponding card and scrolls it into view
- Filter pills allow filtering by partner type
- "AI Recommended" badge on the top-ranked partner

### Bottom Disclaimer

The partner routing screen displays:

> *"YojanaMitra connects you — not applies for you. This platform prepares your profile, matches schemes, checks eligibility, and connects you with the right partner. The partner (bank, NGO, or government office) will process your actual application. All eligibility decisions are made by official government criteria, not this platform."*

---

## 22. Map Technology

| Component | Technology | Notes |
|---|---|---|
| Map library | **Leaflet** v1.9.4 | Via `react-leaflet` v5 |
| Map tiles / data | **OpenStreetMap** | Free, no API key required |
| React integration | **react-leaflet** | MapContainer, TileLayer, Marker, Popup |
| User location | **Browser Geolocation API** | `navigator.geolocation.getCurrentPosition()` |
| Distance calculation | **Haversine formula** | Straight-line distance in km |
| Custom markers | **Leaflet DivIcon** | Emoji + colour per partner type |
| Map interaction | `flyTo()` on card/marker click | Smooth animated pan + zoom |
| Fallback | Profile city / Mumbai default | Used when geolocation is denied |

> Google Maps API is **not used** in this prototype.

---

## 23. Haversine Distance Calculation

The Haversine formula calculates the **great-circle distance** between two points on Earth's surface given their latitude and longitude:

```typescript
function haversine(lat1, lon1, lat2, lon2): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
```

**Important:** Haversine provides straight-line ("as the crow flies") geographic distance, not road travel distance or travel time. Actual walking / driving distance will differ.

---

## 24. Multilingual Support

Implemented in [`i18n.ts`](src/services/i18n.ts) — a centralized local translation service.

### Language Support Status

| Language | Code | UI Status | Voice Input | Voice Output |
|---|---|---|---|---|
| English | `en` | ✅ Fully functional | ✅ `en-IN` | ✅ `en-IN` |
| Hindi | `hi` | ✅ Fully functional | ✅ `hi-IN` | ✅ `hi-IN` |
| Marathi | `mr` | ⚠ Visible in selector; translations exist in i18n.ts; full UI coverage may vary | ⚠ `mr-IN` (browser-dependent) | ⚠ `mr-IN` (browser-dependent) |

### Architecture

- All user-facing strings are defined as typed translation keys in `i18n.ts`
- The `t(key, language)` function returns the translation for the current language
- Marathi falls back to English gracefully when a translation is missing
- Language selection persists across sessions via `localStorage` (`ym_language`)
- Language can be changed at any time from the Navbar or the Intake screen

> No external translation API is used. No Google Translate. All translations are local, static, and included in the bundle.

### Translation Key Coverage

The i18n service covers 250+ keys including: all auth strings, all navigation labels, all intake prompts, all scheme passport labels, all planner strings, all readiness strings, all partner routing strings, EMI calculator labels, support stack labels, and voice interaction strings.

---

## 25. Voice Input

Uses the browser's **Web Speech API** (`SpeechRecognition` / `webkitSpeechRecognition`).

### Configuration

```typescript
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang =
  language === 'hi' ? 'hi-IN' :
  language === 'mr' ? 'mr-IN' :
  'en-IN';
```

### Behavior

1. User clicks the microphone button → recording starts (animated red pulsing indicator)
2. Browser streams interim transcripts into the textarea in real time
3. User stops speaking → recognition ends automatically
4. Transcribed text is passed to the NLP extraction pipeline on "Find My Schemes"

### Browser Compatibility

Voice input uses `window.SpeechRecognition` or `window.webkitSpeechRecognition`. If neither is available (e.g., Firefox, some mobile browsers), the microphone button is disabled and a notice is shown:

> *"Voice input is not supported in your browser. Please type your details."*

Voice input works best in Chrome and Edge.

---

## 26. Voice Output

Uses the browser's **Web Speech Synthesis API** (`SpeechSynthesis` / `SpeechSynthesisUtterance`).

### Flow

```
User submits text input
    │
    ▼
NLP extraction completes
    │
    ▼
A prototype assistant response is shown
    │
    ▼
Speaker button (🔊) appears next to the response
    │
    ▼
User clicks speaker → SpeechSynthesis.speak(utterance)
    │
    ▼
Browser reads the response aloud
```

### Configuration

```typescript
utterance.lang =
  language === 'hi' ? 'hi-IN' :
  language === 'mr' ? 'mr-IN' :
  'en-IN';
utterance.rate = 0.9;
utterance.pitch = 1;
```

### Current Prototype Behavior

The assistant response displayed and spoken is a **static dummy/prototype message** in the selected language. It is not a live LLM-generated response. The text is defined in `DUMMY_RESPONSE` within `SmartIntake.tsx`:

```typescript
const DUMMY_RESPONSE = {
  en: 'Based on your business requirement, I can help you find suitable government schemes...',
  hi: 'आपकी व्यवसाय आवश्यकता के आधार पर...',
  mr: 'तुमच्या व्यवसायाच्या गरजेनुसार...',
};
```

> This is a **prototype voice-response demonstration**. It can be connected to a production conversational AI / voice service in future.

---

## 27. YouTube Form-Filling Guidance

When a scheme has a `formTutorialUrl` field set in `schemes.json`, the Scheme Details page shows a **"How to Fill the Form"** section with:

- Section label: *"How to Fill the Form"*
- Description: *"Step-by-step video guide on how to fill and submit the application."*
- A **"Watch Tutorial"** button linking to the YouTube URL in a new tab

**Field name in scheme data:** `formTutorialUrl`

```json
{
  "id": "pmegp",
  "formTutorialUrl": "https://www.youtube.com/watch?v=...",
  ...
}
```

If a scheme has no `formTutorialUrl`, the section is gracefully hidden.

> **Note:** In the current prototype, `formTutorialUrl` values in `schemes.json` are placeholder YouTube links. Production deployment would use actual official tutorial URLs.

---

## 28. Authentication

Implemented in [`AuthService.ts`](src/services/AuthService.ts).

### Current Implementation

| Aspect | Current Implementation |
|---|---|
| User storage | `localStorage` (`ym_users` key) |
| Session storage | `sessionStorage` (`ym_session` key) |
| Password handling | Simple non-cryptographic hash (`simpleHash()`) |
| External dependency | None — 100% local, browser-only |
| Backend | None |
| Token/JWT | None |

### How It Works

1. **Registration:** User fills name, email, password → password hashed with `simpleHash()` → user record stored in `localStorage`
2. **Login:** Email + password → hash compared → session stored in `sessionStorage`
3. **Session persistence:** Survives page refresh within the same browser tab/session
4. **Logout:** `sessionStorage` entry cleared; profile reset to empty

The code comment at the top of `AuthService.ts` states explicitly:

```typescript
/**
 * NO Firebase. NO external dependency.
 * Users stored in localStorage. Session in sessionStorage.
 * SECURITY NOTE: This is a local-only prototype. In production, use a real backend.
 */
```

### ⚠ Prototype Security Note

The current authentication is **suitable only for prototype/demo purposes**. It is NOT production-grade.

**Production implementation should use:**
- Secure backend authentication service
- HTTPS everywhere
- Cryptographic password hashing (Argon2id or bcrypt)
- Secure JWT or session token management with proper expiry
- Server-side validation of all requests
- CSRF protection
- Rate limiting on auth endpoints
- Proper authorization checks per API route

---

## 29. Login / Register UI

- Both pages use `public/login-background.jpeg` as the full-screen background image
- A semi-transparent dark overlay (`rgba(0,0,0,0.35)`) ensures the white card remains readable
- The card is centered on screen with a responsive layout
- Includes show/hide password toggle
- Login redirects to `/dashboard` on success
- Registration redirects to `/dashboard` on success
- Both pages use the i18n translation system

---

## 30. Responsive Design

The UI is built with Tailwind CSS and designed to be usable across:

| Device | Breakpoint | Layout |
|---|---|---|
| Mobile | `< 640px (sm)` | Single column, collapsed navbar (hamburger menu) |
| Tablet | `640px–1024px (md/lg)` | Wider cards, partial two-column in some views |
| Desktop / Laptop | `> 1024px (lg)` | Full two-column layouts (map + partner list, etc.) |

Responsive handling applied to:
- Navbar (hamburger menu on mobile, full nav on desktop)
- Dashboard (stat cards wrap on mobile)
- Intake screen (example prompts grid collapses to single column)
- Profile confirmation (fields stack on mobile)
- Scheme cards (list view adapts width)
- Match score ring + eligibility details
- Business Cost Planner (cost items + EMI calculator)
- Documents readiness (document rows)
- Readiness score breakdown
- Partner routing (map full-width on mobile, 2-column on desktop)

> Browser and device compatibility has been tested on Chrome and Edge. Some features (voice input, voice output) depend on browser support for Web Speech APIs.

---

## 31. Government Schemes in Dataset

The verified scheme dataset is stored in [`schemes.json`](src/data/schemes.json) and is the **source of truth for all eligibility decisions**.

### Schemes Table

| Scheme | Ministry | Purpose | Target Beneficiaries | Key Support |
|---|---|---|---|---|
| **PMEGP** | Min. of MSME | Generate self-employment through micro-enterprises | All Indians 18+; new enterprises only | Loan up to ₹50L (mfg) / ₹20L (service); 15–35% margin money subsidy; CGTMSE up to ₹10L |
| **MUDRA Shishu** | Ministry of Finance | Micro-finance for very small / new businesses | All Indians 18+; any occupation | Loan ₹10K–₹50K; no collateral; MUDRA Card; 3–5 yr repayment |
| **MUDRA Kishor** | Ministry of Finance | Working capital and term loan for growing micro-enterprises | All Indians 18+; startup–growing stage | Loan ₹50K–₹5L; no collateral up to ₹10L; up to 7 yr repayment |
| **PM SVANidhi** | Min. of Housing & Urban Affairs | Affordable working capital for street vendors | Street vendors in urban areas with CoV/LoR from ULB | ₹10K → ₹20K → ₹50K progressive tranches; 7% interest subsidy; digital incentive |
| **PM-DAKSH** | Min. of Social Justice & Empowerment | Skill development and training for marginalized communities | SC (income ≤ ₹3L/yr), OBC (income ≤ ₹1L/yr), Safai Karamchari, DNT; age 18–45 | Free training; ₹1,000–₹1,500/month stipend; toolkit; NSQF certificate; placement assistance |

### PMEGP — Key Details from Dataset

- **Implementing agency:** KVIC / KVIB / DIC
- **Category:** `loan_with_subsidy`
- **Funding:** Min ₹1L; Max ₹50L manufacturing / ₹20L service
- **Subsidy structure:**
  - Urban General: 15% | Rural General: 25%
  - Urban SC/ST/OBC/Minority/Women/PwD/NER: 25%
  - Rural SC/ST/OBC/Minority/Women/PwD/NER: 35%
- **Education:** 8th pass required for projects above ₹10L
- **Exclusion:** Previous PMEGP/PMRY/REGP beneficiaries ineligible for second loan
- **New enterprises only** (existing units generally excluded)
- **Apply online:** https://www.kviconline.gov.in/pmegpeportal/
- **Helpline:** 1800-300-25050

### MUDRA (Shishu & Kishor) — Key Details from Dataset

- **Implementing agency:** MUDRA Ltd / Scheduled Commercial Banks / MFIs / NBFCs
- **Category:** `loan`
- **Shishu:** ₹10K–₹50K; interest 9–12% p.a.; repayment 3–5 years; street vendors eligible
- **Kishor:** ₹50K–₹5L; interest 10–13% p.a.; repayment 3–7 years; startup/growing stage
- **No collateral** (CGTMSE covered up to ₹10L)
- **CIBIL:** No existing loan default
- **Apply online:** https://www.mudra.org.in
- **Helpline:** 1800-180-1111

### PM SVANidhi — Key Details from Dataset

- **Implementing agency:** ULB / Scheduled Commercial Banks / MFIs / SHGs
- **Category:** `loan`
- **Progressive tranches:** ₹10,000 → ₹20,000 → ₹50,000
- **Interest subsidy:** 7% per annum on timely repayment
- **Digital incentive:** Up to ₹1,200/year for digital transactions
- **Repayment:** 12 months per tranche
- **Mandatory:** Certificate of Vending (CoV) OR Letter of Recommendation (LoR) from ULB/TVC
- **Urban only:** Must be operating in an urban area covered by ULBs
- **Apply online:** https://pmsvanidhi.mohua.gov.in
- **Helpline:** 1800-11-1979

### PM-DAKSH — Key Details from Dataset

- **Implementing agency:** NSFDC and similar bodies
- **Category:** `training` (not a loan)
- **Target:** SC (annual family income ≤ ₹3L), OBC (≤ ₹1L), Safai Karamchari, Denotified Nomadic Tribes
- **Age:** 18–45
- **Training:** 5 days to 1 year depending on course; covers tailoring, beauty, food processing, electrical, plumbing, weaving
- **Stipend:** ₹1,000–₹1,500/month for residential training
- **Cost to applicant:** ₹0
- **NSQF certificate + placement assistance**
- **Apply online:** https://pmdaksh.dosje.gov.in
- **Helpline:** 1800-180-5500

### Official Reference Sources

| Source | URL | Relevance |
|---|---|---|
| MyScheme | https://www.myscheme.gov.in/ | General scheme discovery |
| MyScheme Eligibility Rules | https://rules.myscheme.gov.in/ | Official eligibility criteria |
| Dept. of Financial Services / PMMY | https://financialservices.gov.in/pradhan-mantri-mudra-yojana-pmmy | MUDRA reference |
| KVIC / PMEGP Portal | https://www.kviconline.gov.in/ | PMEGP applications |
| PM SVANidhi | https://pmsvanidhi.mohua.gov.in | Street vendor scheme portal |
| PM-DAKSH | https://pmdaksh.dosje.gov.in | Skill development scheme |
| data.gov.in | https://www.data.gov.in/ | Government open data |
| Digital India | https://www.digitalindia.gov.in/ | Digital infrastructure reference |

---

## 32. Technology Stack

Based on actual `package.json` and source code inspection.

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI component framework |
| **TypeScript** | ~6.0.2 | Type safety throughout |
| **Vite** | ^8.2.2 | Build tool and dev server |
| **Tailwind CSS** | ^4.3.3 (via `@tailwindcss/vite`) | Utility-first styling |
| **react-router-dom** | ^7.18.3 | Client-side routing |
| **lucide-react** | ^1.41.0 | Icon library |
| **clsx** | ^2.1.1 | Conditional class names |
| **tailwind-merge** | ^3.6.0 | Tailwind class merging |

### Maps

| Technology | Version | Purpose |
|---|---|---|
| **Leaflet** | ^1.9.4 | Interactive map rendering |
| **react-leaflet** | ^5.0.0 | React wrapper for Leaflet |
| **@types/leaflet** | ^1.9.22 | TypeScript types |
| **OpenStreetMap** | — | Map tile source (no API key) |

### AI / NLP / ML (Client-Side)

| Technology | Implementation | Notes |
|---|---|---|
| **TF-IDF** | Custom implementation in `KaggleRetrieval.ts` | Scheme discovery layer |
| **Cosine Similarity** | Custom implementation in `KaggleRetrieval.ts` | Query-to-scheme similarity |
| **Local NLP Extraction** | Pattern matching + regex in `NLPService.ts` | Profile extraction |
| **Deterministic Eligibility Rules** | `EligibilityEngine.ts` | No ML/AI |
| **Weighted Recommendation** | `RecommendationEngine.ts` | Structured scoring |

### Browser APIs

| API | Purpose |
|---|---|
| **Web Speech API — SpeechRecognition** | Voice input |
| **Web Speech API — SpeechSynthesis** | Voice output |
| **Geolocation API** | User location for partner distance |
| **localStorage** | User accounts, language preference |
| **sessionStorage** | Current session, user profile, extraction result |

### Data

| File | Format | Size | Purpose |
|---|---|---|---|
| `kaggle_schemes.csv` | CSV | ~12.2 MB | Kaggle scheme discovery index |
| `schemes.json` | JSON | ~14 KB | Verified scheme rules (eligibility source of truth) |
| `mockData.ts` | TypeScript | ~8.6 KB | Sample partners, documents, notifications |

### Not Used in This Prototype

> The following technologies are explicitly **not present** in the codebase:
> Python, scikit-learn, Node.js/Express, FastAPI, PostgreSQL, MongoDB, Redis, Firebase, Supabase, Gemini API, OpenAI API, Google Translate API, Google Maps API, Tesseract OCR, AWS, GCP, Docker, Nginx.

---

## 33. Project Architecture

```mermaid
flowchart TD
    A([User]) -->|Text / Voice| B[SmartIntake.tsx\n/intake]

    B -->|Raw text| C[NLPService.ts\nextractProfile]
    C -->|ExtractionResult| D[ProfileConfirmation.tsx\n/profile-confirm]
    D -->|Confirmed UserProfile| E[App State\nuseAppStore.ts]

    E -->|Profile query| F[KaggleRetrieval.ts\nTF-IDF + Cosine Sim]
    F -->|Candidate scheme names\nDISCOVERY LAYER| G[EligibilityEngine.ts\nDeterministic Rules]

    E -->|schemes.json\nVERIFIED RULES| G
    G -->|EligibilityResult per scheme| H[RecommendationEngine.ts\nWeighted Match Score]
    H -->|RecommendationResult\[\]\nSorted by eligibility + score| I[SchemePassport.tsx\n/schemes]

    I -->|Select scheme| J[SchemeDetails.tsx\n/schemes/:id\nMatchScore + Eligibility + Docs + Tutorial]

    J --> K[BusinessCostPlanner.tsx\n/planner\nCost items + Funding Gap + EMI + SupportStack]
    K --> L[DocumentsReadiness.tsx\n/documents\nDoc checklist + readiness %]
    L --> M[ReadinessScore.tsx\n/readiness\nProfile + Financial + Docs score 0-100]
    M --> N[PartnerRouting.tsx\n/partners\nLeaflet + OpenStreetMap + Haversine]
    N --> O([Connect with Bank / NGO / Govt Office])

    subgraph DISCOVERY [🔍 Discovery Layer]
        F
    end

    subgraph ELIGIBILITY [✅ Eligibility Layer — Deterministic]
        G
    end

    subgraph RECOMMENDATION [🎯 Recommendation Layer]
        H
    end

    subgraph MAP [🗺 Map Layer]
        N
    end
```

---

## 34. Folder Structure

Actual folder structure from codebase inspection:

```
yojanamitra/                         ← Project root
├── index.html                       ← Vite HTML entry point
├── package.json                     ← Dependencies and scripts
├── tsconfig.json                    ← TypeScript configuration
├── vite.config.ts                   ← Vite configuration
├── public/
│   ├── favicon.svg                  ← YojanaMitra favicon
│   ├── icons.svg                    ← SVG icon sprite
│   └── login-background.jpeg       ├── Login / register page background image
└── src/
    ├── App.tsx                      ← Router definition — all routes
    ├── main.tsx                     ← React entry point
    ├── index.css                    ← Global CSS + Tailwind directives
    ├── style.css                    ← Additional global styles
    ├── vite-env.d.ts                ← Vite type declarations
    ├── counter.ts                   ← (Vite scaffold remnant, unused)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.tsx           ← Shared page shell with Navbar + Outlet
    │   │   ├── Navbar.tsx           ← Responsive sticky navbar (EN/HI/MR lang switcher)
    │   │   └── ProtectedRoute.tsx   ← Auth guard — redirects to /login if not authenticated
    │   └── ui/
    │       ├── Badge.tsx               ← Generic badge component
    │       ├── EligibilityBadge.tsx     ← ELIGIBLE / NEEDS INFO / NOT ELIGIBLE badge
    │       ├── EmptyState.tsx          ← Empty state placeholder component
    │       ├── MatchScoreRing.tsx      ← Animated circular score ring
    │       ├── ProgressBar.tsx         ← Labelled progress bar
    │       └── StatCard.tsx            ← Metric card for dashboard
    │
    ├── data/
    │   ├── kaggle_schemes.csv       ← Kaggle dataset (imported as raw string)
    │   ├── schemes.json             ← Verified scheme rules (eligibility source of truth)
    │   └── mockData.ts              ← Sample partners, documents, applications, notifications
    │
    ├── engines/
    │   ├── EligibilityEngine.ts     ← Deterministic eligibility evaluation
    │   └── RecommendationEngine.ts     ← Weighted match score + sorting
    │
    ├── hooks/
    │   ├── useAppStore.ts           ← Global state (profile, language, auth) via React Context
    │   ├── useReadinessScore.ts     ← Dynamic readiness score 0–100
    │   └── useRecommendations.ts     ← Calls RecommendationEngine, memoized
    │
    ├── pages/
    │   ├── Landing.tsx              ← Public landing page (features, stats, how it works)
    │   ├── Login.tsx                ← Login form with background image
    │   ├── Register.tsx             ← Registration form
    │   ├── SmartIntake.tsx          ← "Talk to YojanaMitra" — voice/text intake + live Kaggle preview
    │   ├── ProfileConfirmation.tsx     ← Review / edit extracted profile before processing
    │   ├── Dashboard.tsx            ← Main hub — scheme matches, readiness, quick actions
    │   ├── SchemePassport.tsx       ← Filtered list of recommended schemes
    │   ├── SchemeDetails.tsx        ← Full scheme detail with eligibility + match breakdown
    │   ├── BusinessCostPlanner.tsx  ← Cost planner + EMI + Support Stack + Funding Gap
    │   ├── DocumentsReadiness.tsx   ← Scheme document checklist
    │   ├── ReadinessScore.tsx       ← Application readiness score view
    │   ├── PartnerRouting.tsx       ← Leaflet map + ranked partner list
    │   ├── UserIntake.tsx           ← (Alternative intake form — structured fields)
    │   ├── ApplicationTracker.tsx   ← (File exists; not routed in App.tsx)
    │   └── AdminDashboard.tsx       ← Admin stats view (demo data)
    │
    ├── services/
    │   ├── AuthService.ts           ← localStorage-based prototype authentication
    │   ├── NLPService.ts            ← Profile extraction (local mock + LLM stub)
    │   ├── KaggleRetrieval.ts       ← TF-IDF + cosine similarity scheme discovery
    │   └── i18n.ts                  ← Complete EN/HI/MR translation service (250+ keys)
    │
    ├── types/
    │   └── index.ts                 ← All TypeScript interfaces and enums
    │
    └── utils/
        └── index.ts                 ← cn(), formatCurrency(), formatDate(), getStatusColor()
```

---

## 35. Application Routes

Defined in [`App.tsx`](src/App.tsx).

| Route | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Landing` | No | Public landing page |
| `/login` | `Login` | No | Login form |
| `/register` | `Register` | No | Registration form |
| `/intake` | `SmartIntake` | **Yes** | "Talk to YojanaMitra" — voice/text intake |
| `/profile-confirm` | `ProfileConfirmation` | **Yes** | Review and edit extracted profile |
| `/dashboard` | `Dashboard` | **Yes** | Main application hub |
| `/schemes` | `SchemePassport` | **Yes** | Ranked scheme list |
| `/schemes/:id` | `SchemeDetails` | **Yes** | Full scheme detail page |
| `/planner` | `BusinessCostPlanner` | **Yes** | Business cost planner + EMI |
| `/documents` | `DocumentsReadiness` | **Yes** | Document checklist |
| `/readiness` | `ReadinessScore` | **Yes** | Application readiness score |
| `/partners` | `PartnerRouting` | **Yes** | Leaflet map + partner ranking |
| `/admin` | `AdminDashboard` | **Yes** | Admin stats view |
| `*` (catch-all) | `Navigate to /` | — | Any unknown route redirects to landing |

> `ApplicationTracker.tsx` exists as a file but is **not routed** in `App.tsx`. It is not a current product feature.

**Protected routes** use `ProtectedRoute.tsx` which checks `isAuthenticated()` and redirects to `/login` if the user is not authenticated.

---

## 36. Data Flow

```
1. Natural Language Input (text or voice)
        │
        ▼
2. NLPService.extractProfile(text)
   → Returns ExtractionResult with confidence per field
   → extractionMethod: 'local_mock' (in prototype)
        │
        ▼
3. extractionToPartialProfile(result, existingProfile)
   → Merges extracted fields into UserProfile
   → Stored in App state + sessionStorage
        │
        ▼
4. ProfileConfirmation — user reviews / edits all fields
   → Final UserProfile confirmed
        │
        ▼
5. buildProfileQuery(profile) → intent-aware query string
        │
        ▼
6. retrieveKaggleCandidates(query, 10)
   → TF-IDF against kaggle_schemes.csv
   → Returns top-N candidate scheme names
   → Stored in sessionStorage as 'kaggleCandidates'
        │
        ▼
7. recommendSchemes(profile, schemes) [uses schemes.json]
   → For each verified scheme:
     a. scoreBusinessCompatibility()
     b. scoreFundingCompatibility()
     c. scoreBeneficiaryCompatibility()
     d. scoreStageCompatibility()
     e. scoreLocationCompatibility()
     f. scorePurposeAlignment()
     → matchScore = weighted average
     g. evaluateEligibility() → deterministic rule checks
     → eligibilityResult (ELIGIBLE / NEEDS_MORE_INFO / NOT_ELIGIBLE)
     h. buildWhyItMatches() → deterministic text from data
     i. buildMissingRequirements() → from failed checks
   → Sort: ELIGIBLE first, then by matchScore
        │
        ▼
8. User views Scheme Passport → selects a scheme
        │
        ▼
9. Scheme Details — full breakdown displayed
   → YouTube tutorial shown if formTutorialUrl present
        │
        ▼
10. Business Cost Planner
    → Business-type-aware default cost items
    → User edits items
    → Total Cost − Available Capital = Funding Gap
    → Funding gap updates profile.fundingRequirement
    → EMI Calculator (reducing-balance formula)
    → Support Stack visualization
        │
        ▼
11. Document Checklist
    → Documents from selected scheme's requiredDocuments
    → User marks each as available/missing
    → Document readiness % computed
        │
        ▼
12. Application Readiness Score
    → useReadinessScore(profile, documents)
    → Weighted scoring: Profile (40) + Financial (30) + Documents (30)
    → Label: Excellent / Good / Fair / Needs Work
        │
        ▼
13. Partner Routing
    → SAMPLE_PARTNERS from mockData.ts
    → Haversine distance (if geolocation available)
    → rankPartners() — profile + scheme suitability
    → Leaflet map display + partner card list
        │
        ▼
14. User connects with partner (phone / website)
```

---

## 37. Scheme Data & Synchronization

### Current Prototype

Verified scheme rules are stored in a locally structured JSON file:

```
schemes.json (source of truth for eligibility)
    ↑
    Manually curated from official government sources:
    - MyScheme (https://www.myscheme.gov.in/)
    - MyScheme Eligibility Rules (https://rules.myscheme.gov.in/)
    - KVIC / PMEGP official documentation
    - MUDRA official documentation
    - PM SVANidhi official documentation
    - PM-DAKSH / NSFDC official documentation
```

### Production Synchronization (Future)

In a production system, scheme rules should be maintained through a disciplined process:

```
Official Government Source
    ↓
Rule extraction + validation
    ↓
Versioned scheme rule entries
    ↓  Each entry includes:
    │  - sourceUrl (official page URL)
    │  - lastVerifiedDate
    │  - version number
    │  - changeHistory
    ↓
Staged review before deployment
    ↓
Production rule database
    ↓
EligibilityEngine
```

**The key principle:**

> *"Never allow an unverified ML/Kaggle retrieval result to become the eligibility source of truth."*

Kaggle data assists with discovery only. Every eligibility decision must trace back to an official, versioned, human-verified rule.

---

## 38. Security / Privacy Considerations

### Current Prototype State

| Concern | Current Status |
|---|---|
| Data storage | All data is local to the user's browser (localStorage / sessionStorage) |
| User data transmitted | None — no backend, no network calls for user data |
| External API calls | None (maps tiles from OpenStreetMap CDN only) |
| Password hashing | `simpleHash()` — a basic 32-bit integer hash. **Not cryptographic.** |
| Session management | sessionStorage — cleared on tab close |
| Authorization | `ProtectedRoute` checks `sessionStorage` session |

### Production Requirements

For a production deployment, the following must be implemented:

- [ ] Secure HTTPS for all communication
- [ ] Backend authentication service (not localStorage)
- [ ] Cryptographic password hashing (Argon2id or bcrypt)
- [ ] Secure JWT or session tokens with expiry and refresh
- [ ] Server-side input validation and sanitization
- [ ] Authorization checks per API endpoint
- [ ] CSRF protection
- [ ] Rate limiting on auth and submission endpoints
- [ ] Data minimization — collect only what is necessary
- [ ] Explicit user consent for data use
- [ ] Secure database for user profiles and scheme data
- [ ] Audit logging for eligibility decisions

---

## 39. Fail-Safe Design Principles

YojanaMitra is designed around several explicit fail-safe principles:

| Principle | Implementation |
|---|---|
| **AI does not determine eligibility** | `EligibilityEngine.ts` is deterministic; NLP layer is explicitly separated. The UI states: *"AI extracts your profile only — eligibility is decided by verified government rules, not AI."* |
| **User controls the extracted profile** | `ProfileConfirmation.tsx` shows every extracted field with full edit capability before any eligibility check runs. |
| **Match score ≠ eligibility** | Both are shown side-by-side. UI explicitly labels them separately. Scheme Details notes: *"Match score ≠ eligibility. High score = good fit for your context."* |
| **Missing information is surfaced** | `NEEDS_MORE_INFORMATION` status and `missingInformation[]` array explicitly tell the user what data gap prevents full eligibility assessment. |
| **Scheme rules are traceable** | Each scheme has an `applicationRoute.online` URL pointing to the official source. |
| **Financial calculations are illustrations** | EMI calculator has an explicit disclaimer: *"Illustration only — actual rates depend on lender and credit profile."* |
| **Readiness ≠ Government approval** | Readiness score page and labels never claim government approval. |
| **Partner data is identified as sample** | Partner routing disclaimer: *"YojanaMitra connects you — not applies for you."* |
| **No hardcoded demo profile on entry** | `EMPTY_PROFILE` is the default. Demo profile is only accessible via an explicit `loadDemoProfile()` call. |

---

## 40. Demo Data / Prototype Behavior

### Statistics on Landing Page

The landing page displays the following stats:

```
47+ Government Schemes
14,000+ Entrepreneurs Helped
₹247 Cr Funding Facilitated
89% Approval Rate
```

> **⚠ These are prototype/demo statistics.** They are hardcoded in `Landing.tsx` for presentation purposes and do NOT represent measured outcomes of the current prototype.

### Admin Dashboard Statistics

The Admin Dashboard shows aggregate numbers (total users, active applications, approved applications, top schemes by usage, users by state, weekly signups). These are **demo data** defined in `mockData.ts` (`ADMIN_STATS`):

```typescript
export const ADMIN_STATS: AdminStats = {
  totalUsers: 14782,
  activeApplications: 3241,
  approvedApplications: 8934,
  totalFundingDisbursed: 24700000000,
  ...
};
```

These are illustrative figures only.

### Demo Profile

A demo profile (`DEMO_PROFILE`) is available for judges/reviewers:

```
Name:             Demo Entrepreneur
Age:              32
Gender:           Female
Category:         OBC
State:            Maharashtra
District:         Pune
Business Type:    Vegetable Vendor
Business Stage:   Idea
Occupation:       Street Vendor
Available Capital: ₹50,000
Funding Requirement: ₹2,00,000
Monthly Revenue:  ₹20,000
Annual Family Income: ₹2,40,000
```

This profile can be loaded from the Dashboard via `loadDemoProfile()`. Normal users always start with an empty profile.

---

## 41. Limitations of Current Prototype

These are honest, accurately scoped limitations — not failures. They represent the prototype scope and areas for future productionization.

| Limitation | Details |
|---|---|
| **Local NLP, not production LLM** | Profile extraction uses regex/keyword patterns. An LLM stub exists but is inactive. Complex or ambiguous natural language may be partially extracted. |
| **Local prototype authentication** | No backend; passwords use a non-cryptographic hash; data is browser-local. |
| **Static scheme dataset** | `schemes.json` contains 5 manually curated schemes. No live government API integration. |
| **Kaggle dataset is for discovery only** | The CSV is not an authoritative government database. Kaggle data quality/coverage varies. |
| **Sample partner data** | Partners in `mockData.ts` are illustrative. No live verified partner database. |
| **No OCR or document extraction** | Users manually mark documents as available. No actual document upload or verification. |
| **Prototype cost templates** | Business cost defaults are illustrative estimates, not official benchmarks. |
| **Voice feature browser dependency** | Web Speech API is not supported in all browsers (works best in Chrome/Edge). |
| **Marathi UI coverage** | Marathi translations exist in i18n.ts but end-to-end Marathi UI coverage may be incomplete in some views. |
| **Haversine distance** | Straight-line distance, not road/travel distance. |
| **No backend or database** | All state is browser-session-scoped. Multiple devices cannot share the same account. |
| **No live notification system** | Notifications in the dashboard are static sample data. |

---

## 42. Future Enhancements

All items below are **FUTURE / PRODUCTION enhancements** — not currently implemented.

### AI / NLP
- [ ] Replace `extractWithLLM()` stub with a production LLM API (Gemini / GPT-4 / Llama) for richer, more accurate profile extraction
- [ ] Conversational follow-up questions when profile fields are missing
- [ ] Multi-turn dialogue for intake
- [ ] Named entity recognition for Indian geography, business types, currencies

### Backend & Infrastructure
- [ ] Secure REST/GraphQL backend (Node.js / FastAPI / Go)
- [ ] PostgreSQL or equivalent relational database for user profiles, scheme data, applications
- [ ] Production authentication (OAuth2, JWT with refresh tokens, HTTPS, bcrypt)
- [ ] Redis for session management and caching
- [ ] Containerized deployment (Docker + Kubernetes)
- [ ] CI/CD pipeline

### Scheme Data
- [ ] Automated synchronization with official government sources/APIs
- [ ] Versioned scheme rules with `sourceUrl`, `lastVerifiedDate`, `changeHistory`
- [ ] Human review workflow before rule updates go live
- [ ] Coverage expansion: STAND-UP India, NSFDC, state-level schemes, women-specific schemes
- [ ] Scheduled rule validation alerts

### Document AI
- [ ] OCR and document extraction (Tesseract / cloud Document AI)
- [ ] Auto-fill profile fields from uploaded documents
- [ ] Document expiry tracking and alerts

### Partner Network
- [ ] Live verified partner database with regular updates
- [ ] Road-distance routing (Google Maps / OpenRouteService)
- [ ] Appointment booking / callback request with partner
- [ ] Partner performance ratings from real user feedback

### Multilingual
- [ ] Complete Marathi UI coverage
- [ ] Addition of more regional languages (Tamil, Telugu, Kannada, Bengali, Gujarati)
- [ ] Neural Machine Translation for non-covered languages

### Voice & Accessibility
- [ ] Production-grade voice assistant (Dialogflow / Amazon Lex)
- [ ] Screen reader accessibility (ARIA labels, keyboard navigation)
- [ ] High-contrast mode

### Analytics
- [ ] Anonymous aggregate analytics on scheme discovery patterns
- [ ] A/B testing framework for UI improvements
- [ ] Drop-off analysis at each step of the journey

---

## 43. Competitor Differentiation

### Landscape

| Platform | Type | Primary Focus |
|---|---|---|
| **MyScheme** (myscheme.gov.in) | Government | Broad scheme discovery and information for all citizens |
| **PM-SURAJ** | Government | Credit-linked scheme portal for marginalized communities |
| **NSFDC Portal** | Government | NSFDC-specific schemes for scheduled castes |
| **Individual scheme portals** | Government | PMEGP, MUDRA, SVANidhi — application-specific |

### YojanaMitra's Differentiated Value

| Dimension | MyScheme / Other portals | YojanaMitra |
|---|---|---|
| **User input** | Form-based selection | Natural language / voice description |
| **Scheme discovery** | Browse or keyword search | TF-IDF + intent-aware query from profile |
| **Eligibility** | Informational display | Deterministic rule-by-rule evaluation |
| **Match scoring** | Not available | Weighted relevance score per scheme |
| **Financial planning** | Not available | Business cost planner + funding gap + EMI |
| **Document readiness** | Not available | Scheme-specific checklist with % completion |
| **Application readiness** | Not available | Composite readiness score with action items |
| **Partner routing** | Not available | Geolocation + Haversine + scheme-aware ranking |
| **Multilingual voice** | Limited | Voice input + output in EN/HI/MR |
| **Complete journey** | Discovery → Info | Discovery → Eligibility → Plan → Prepare → Connect |

**Specifically on MyScheme:** MyScheme is a broad and valuable government scheme discovery and information platform for all citizens. YojanaMitra is specifically focused on the **entrepreneurship financing journey of marginalized entrepreneurs** and adds an integrated planning, preparation, and partner-routing layer that operates end-to-end within a single session.

---

## 44. Scalability

The current prototype is a fully client-side React SPA. For production scale, the following architecture would be needed:

```
User Browser (React SPA)
    │
    ▼
CDN (static assets — Vite build)
    │
    ▼
API Gateway
    │
    ├─▶ Auth Service (JWT, rate limiting)
    ├─▶ NLP/LLM Service (profile extraction)
    ├─▶ Scheme Rule Service (versioned eligibility rules)
    ├─▶ Recommendation Service (scoring engine)
    ├─▶ Partner Service (live partner database)
    └─▶ Analytics Service (anonymized aggregate)
    │
    ▼
Database (PostgreSQL / RDS)
    │
    ├─▶ Users + sessions
    ├─▶ UserProfiles
    ├─▶ SchemeRules (versioned)
    ├─▶ PartnerRegistry (verified)
    └─▶ AuditLogs
```

The existing engine architecture (EligibilityEngine, RecommendationEngine) is designed to be portable — it uses pure TypeScript functions with no browser dependencies and can be extracted to a Node.js / Python backend without changes to its logic.

---

## 45. Impact

YojanaMitra is designed to address the following real-world impact areas:

| Impact Area | How YojanaMitra Contributes |
|---|---|
| **Reduce information barriers** | Converts complex government scheme information into plain-language summaries |
| **Reduce language barriers** | English + Hindi voice/text support; Marathi UI (prototype) |
| **Reduce digital literacy barriers** | Voice input; natural language instead of forms; guided journey |
| **Improve scheme discoverability** | TF-IDF retrieval + intent-aware query matches schemes users wouldn't know to search for |
| **Improve eligibility understanding** | Criterion-by-criterion breakdown in plain language tells users exactly where they stand |
| **Improve application preparation** | Document checklist + readiness score identifies exactly what is missing |
| **Improve financial planning** | Cost planner + funding gap + EMI helps entrepreneur think through financing realistically |
| **Connect users with right partners** | Geolocation-aware partner routing reduces wasted visits to wrong institutions |
| **Support financial inclusion** | Specifically focused on marginalized communities (SC/ST/OBC/minority/street vendors/artisans) |

> **Note:** The statistics shown on the landing page (14,000+ entrepreneurs, ₹247 Cr facilitated, 89% approval rate) are **demo/prototype figures** for presentation purposes. They do not represent measured outcomes of the current prototype.

---

## 46. Installation

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd yojanamitra

# 2. Install dependencies
npm install
```

---

## 47. Running the Project

```bash
# Start the Vite development server
npm run dev
```

The app will be available at: **http://localhost:5173** (or another port shown in terminal)

> **Note on Kaggle CSV:** The `kaggle_schemes.csv` file (~12.2 MB) is imported as a raw string at build time by Vite. The first time you open the app, it may take a moment to build the TF-IDF index in the browser. This is expected. Subsequent interactions use the cached in-memory index.

---

## 48. Build / Production

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

The production build outputs to `yojanamitra/dist/`. The output is a static SPA that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, Firebase Hosting, etc.).

> **Note:** The Kaggle CSV (~12.2 MB) is bundled into the production build. In a production deployment this should be replaced with a backend API or a pre-computed index file to reduce bundle size.

---

## 49. Prototype Demo Flow

For judges and reviewers evaluating the prototype:

### Option A — Full Journey (5–7 minutes)

1. Open the app → Landing page
2. Click **Get Started** → Register with any email/password
3. After registration → click **Talk to YojanaMitra**
4. Type (or speak): *"I want to start a tailoring business in Pune. I have ₹50,000 and need ₹2 lakh. I am OBC category."*
5. Click **Find My Schemes** → see NLP extraction + Kaggle live preview
6. **Profile Confirmation** → review extracted fields; toggle "Street Vendor" off, confirm
7. **Scheme Passport** → see ranked schemes with eligibility badges and match scores
8. Click **View Details** on PMEGP or MUDRA Kishor → full breakdown
9. Navigate to **Planner** → see business cost template for tailoring; review funding gap; open EMI calculator
10. Navigate to **Documents** → mark a few documents as available
11. Navigate to **Readiness** → see readiness score update
12. Navigate to **Partners** → allow geolocation or use default; see map with partner markers

### Option B — Street Vendor Demo (3–4 minutes)

1. Register → Talk to YojanaMitra
2. Type: *"I am a street vendor selling vegetables in Mumbai. I need ₹10,000 working capital."*
3. Profile Confirmation → toggle "Street Vendor: Yes"
4. Scheme Passport → PM SVANidhi should appear ELIGIBLE or near top
5. View PM SVANidhi details → see progressive tranche structure

### Option C — Demo Profile (2 minutes)

1. Register → Dashboard
2. Click **Try Demo Profile** button → loads Demo Entrepreneur (OBC, Pune, Vegetable Vendor, ₹50K capital)
3. Navigate through Schemes → Planner → Partners

### Switching Language

Use the language switcher in the Navbar or on the Intake screen to switch between English and Hindi.

---

## 50. Important Technical Notes

| Note | Detail |
|---|---|
| **Kaggle CSV is a Vite raw import** | `kaggle_schemes.csv` is imported with `?raw` — it becomes a string in the JS bundle. No server required. |
| **TF-IDF index is built on first use** | Built in-memory on first call to `retrieveKaggleCandidates()`. Cached for subsequent calls. |
| **No backend required** | The entire prototype runs in the browser. No server, no API, no database connection. |
| **Authentication is browser-local** | User accounts are not shared across browsers or devices. Clearing localStorage resets all accounts. |
| **Session clears on tab close** | `sessionStorage` is used for session and profile — closing the tab logs the user out. |
| **LLM stub is intentionally inactive** | `extractWithLLM()` in NLPService.ts always returns `null`. Replace with real API call to activate. |
| **Voice input requires HTTPS or localhost** | The Web Speech API requires a secure origin. Works on `localhost:5173` in dev. Production requires HTTPS. |
| **Marathi voice** | `mr-IN` locale support in SpeechSynthesis depends on the user's OS and browser. May not be available on all systems. |
| **formTutorialUrl is a placeholder** | Current YouTube links in schemes.json are placeholder URLs. Replace with actual official tutorial links for production. |

---

## 51. Team

**Team Name:** Tactical Thinkers

**Hackathon:** Smart India Hackathon 2026

**Problem Statement:** PS 26092

---

## 52. Conclusion

YojanaMitra demonstrates a complete, integrated, prototype decision-support journey for marginalized entrepreneurs navigating India's government scheme landscape.

The prototype is built on a clean separation of concerns:
- **AI / NLP** — understands the user's needs from natural language
- **TF-IDF / Kaggle** — discovers potentially relevant schemes efficiently
- **Deterministic rules** — evaluate eligibility with full traceability
- **Weighted recommendation** — ranks schemes by relevance
- **Planning tools** — help the entrepreneur prepare financially
- **Document readiness** — ensures they arrive at the partner prepared
- **Partner routing** — connects them with the right institution

Every architectural decision is made with one goal:

> **Take the entrepreneur from Zero Knowledge → Loan Ready, one step at a time, in their own language, on their own device.**

---

<p align="center">
  <strong>YojanaMitra — Tactical Thinkers — SIH 2026 — PS 26092</strong><br/>
  <em>AI understands. Verified rules decide. Recommendation ranks. Planner prepares. Partner routing connects.</em>
</p>
