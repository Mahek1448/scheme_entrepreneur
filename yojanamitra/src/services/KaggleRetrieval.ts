/**
 * KaggleRetrieval.ts — TF-IDF + Cosine Similarity scheme discovery layer.
 *
 * Uses the Kaggle Indian Government Schemes dataset as a DISCOVERY layer.
 * Returns candidate scheme names that the deterministic EligibilityEngine then verifies.
 *
 * Architecture:
 *   User Query → TF-IDF retrieval → Candidate scheme names → Verified EligibilityEngine
 *
 * IMPORTANT: Kaggle data is for DISCOVERY only.
 * Verified schemes.json remains the ELIGIBILITY SOURCE OF TRUTH.
 */

import kaggleRaw from '../data/kaggle_schemes.csv?raw';

// ─── CSV Parsing ──────────────────────────────────────────────────────────────

export interface KaggleScheme {
  name: string;
  slug: string;
  details: string;
  benefits: string;
  eligibility: string;
  level: string;        // 'Central' | 'State'
  category: string;     // e.g. 'Entrepreneurship', 'Education & Learning'
  tags: string;         // comma-separated
  combined: string;     // combined text for TF-IDF
}

function parseCSV(raw: string): KaggleScheme[] {
  const lines = raw.split('\n');
  const result: KaggleScheme[] = [];

  for (let i = 1; i < lines.length; i++) { // Skip header
    const line = lines[i].trim();
    if (!line) continue;

    // Handle quoted CSV fields
    const fields = parseCSVLine(line);
    if (fields.length < 7) continue;

    const scheme: KaggleScheme = {
      name: fields[0] ?? '',
      slug: fields[1] ?? '',
      details: fields[2] ?? '',
      benefits: fields[3] ?? '',
      eligibility: fields[4] ?? '',
      level: fields[7] ?? '',
      category: fields[8] ?? '',
      tags: fields[10] ?? '',
      combined: '',
    };

    // Build combined text for retrieval
    scheme.combined = [
      scheme.name,
      scheme.details.slice(0, 500), // Limit to avoid huge vectors
      scheme.benefits.slice(0, 200),
      scheme.eligibility.slice(0, 200),
      scheme.category,
      scheme.tags,
    ].join(' ').toLowerCase();

    result.push(scheme);
  }

  return result;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

// ─── TF-IDF Implementation ────────────────────────────────────────────────────

type TermFreq = Map<string, number>;
type IDF = Map<string, number>;

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'up', 'about', 'into', 'through', 'during', 'this', 'that', 'these',
  'those', 'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either',
  'not', 'also', 'as', 'well', 'its', 'it', 'i', 'my', 'me', 'we',
  'our', 'you', 'your', 'he', 'she', 'they', 'their', 'what', 'which',
  'who', 'whom', 'how', 'when', 'where', 'why', 'all', 'each', 'every',
  'any', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'if',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));
}

function computeTF(tokens: string[]): TermFreq {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) ?? 0) + 1);
  }
  const len = tokens.length || 1;
  for (const [k, v] of tf) {
    tf.set(k, v / len);
  }
  return tf;
}

function computeIDF(corpus: string[][]): IDF {
  const N = corpus.length;
  const docFreq = new Map<string, number>();
  for (const tokens of corpus) {
    const unique = new Set(tokens);
    for (const token of unique) {
      docFreq.set(token, (docFreq.get(token) ?? 0) + 1);
    }
  }
  const idf = new Map<string, number>();
  for (const [term, df] of docFreq) {
    idf.set(term, Math.log((N + 1) / (df + 1)) + 1);
  }
  return idf;
}

function tfidfVector(tf: TermFreq, idf: IDF): Map<string, number> {
  const vec = new Map<string, number>();
  for (const [term, tfVal] of tf) {
    const idfVal = idf.get(term) ?? 1;
    vec.set(term, tfVal * idfVal);
  }
  return vec;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [term, aVal] of a) {
    const bVal = b.get(term) ?? 0;
    dot += aVal * bVal;
    normA += aVal * aVal;
  }
  for (const bVal of b.values()) {
    normB += bVal * bVal;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─── Pre-build index ───────────────────────────────────────────────────────────

let _schemes: KaggleScheme[] | null = null;
let _idf: IDF | null = null;
let _schemeVectors: Map<string, number>[] | null = null;

function ensureIndex(): { schemes: KaggleScheme[]; idf: IDF; vectors: Map<string, number>[] } {
  if (_schemes && _idf && _schemeVectors) {
    return { schemes: _schemes, idf: _idf, vectors: _schemeVectors };
  }

  console.log('[KaggleRetrieval] Building TF-IDF index...');
  const schemes = parseCSV(kaggleRaw);
  const tokenized = schemes.map((s) => tokenize(s.combined));
  const idf = computeIDF(tokenized);
  const vectors = tokenized.map((tokens) => tfidfVector(computeTF(tokens), idf));

  _schemes = schemes;
  _idf = idf;
  _schemeVectors = vectors;

  console.log(`[KaggleRetrieval] Index built: ${schemes.length} schemes.`);
  return { schemes, idf, vectors };
}

// ─── Public Retrieval API ─────────────────────────────────────────────────────

export interface RetrievalCandidate {
  name: string;
  slug: string;
  category: string;
  level: string;
  tags: string;
  score: number;
}

/**
 * Retrieve top-N Kaggle schemes relevant to the query.
 * Returns candidate scheme names for use as discovery hints.
 */
export function retrieveKaggleCandidates(
  query: string,
  topN = 10
): RetrievalCandidate[] {
  if (!query.trim()) return [];

  const { schemes, idf, vectors } = ensureIndex();
  const queryTokens = tokenize(query);
  const queryTF = computeTF(queryTokens);
  const queryVec = tfidfVector(queryTF, idf);

  const scored = schemes.map((scheme, i) => ({
    scheme,
    score: cosineSimilarity(queryVec, vectors[i]),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored
    .slice(0, topN)
    .filter((s) => s.score > 0.01) // Filter out near-zero scores
    .map((s) => ({
      name: s.scheme.name,
      slug: s.scheme.slug,
      category: s.scheme.category,
      level: s.scheme.level,
      tags: s.scheme.tags,
      score: Math.round(s.score * 100) / 100,
    }));
}

/**
 * Build a query string from user profile for Kaggle retrieval.
 * Intent-aware: education loan queries retrieve education schemes,
 * training queries retrieve skill schemes, etc.
 */
export function buildProfileQuery(profile: {
  businessType?: string;
  occupation?: string;
  businessStage?: string;
  fundingRequirement?: number;
  category?: string;
  isStreetVendor?: boolean;
  state?: string;
  intent?: string;
}): string {
  const parts: string[] = [];

  // ─── Education loan intent — ONLY education terms ────────────────────────
  if (profile.intent === 'EDUCATION_LOAN') {
    parts.push('education loan student scholarship higher education college engineering medical');
    if (profile.state) parts.push(profile.state);
    return parts.join(' ');
  }

  // ─── Training intent ───────────────────────────────────────────────────────
  if (profile.intent === 'TRAINING') {
    parts.push('skill training vocational kaushal vikas pradhan mantri free training program');
    if (profile.state) parts.push(profile.state);
    return parts.join(' ');
  }

  // ─── Working capital intent (street vendor etc.) ───────────────────────────
  if (profile.intent === 'WORKING_CAPITAL') {
    parts.push('working capital micro loan street vendor hawker PM SVANidhi');
    if (profile.isStreetVendor) parts.push('street vendor thela hawker');
    if (profile.state) parts.push(profile.state);
    return parts.join(' ');
  }

  // ─── Business intent (default) ────────────────────────────────────────────
  if (profile.businessType) parts.push(profile.businessType);
  if (profile.occupation) parts.push(profile.occupation.replace(/_/g, ' '));
  if (profile.businessStage) {
    const stageMap: Record<string, string> = {
      idea: 'new business startup',
      startup: 'startup business',
      growing: 'growing business expansion',
      established: 'established business',
    };
    parts.push(stageMap[profile.businessStage] ?? profile.businessStage);
  }
  if (profile.fundingRequirement && profile.fundingRequirement > 0) {
    if (profile.fundingRequirement <= 50000) parts.push('micro loan small loan');
    else if (profile.fundingRequirement <= 500000) parts.push('mudra loan medium loan');
    else parts.push('large loan subsidy PMEGP');
  }
  if (profile.category && profile.category !== 'general') {
    parts.push(`${profile.category} category scheme`);
  }
  if (profile.isStreetVendor) parts.push('street vendor hawker');
  if (profile.state) parts.push(profile.state);

  // Always include entrepreneurship as base context
  parts.push('entrepreneurship business loan scheme');

  return parts.join(' ');
}

/**
 * Get the categories most relevant in the Kaggle results for a profile query.
 * Useful to see what the dataset found.
 */
export function getTopCategories(query: string, topN = 5): string[] {
  const candidates = retrieveKaggleCandidates(query, 20);
  const counts = new Map<string, number>();
  for (const c of candidates) {
    if (c.category) {
      counts.set(c.category, (counts.get(c.category) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([cat]) => cat);
}

export function getKaggleSchemeCount(): number {
  const { schemes } = ensureIndex();
  return schemes.length;
}
