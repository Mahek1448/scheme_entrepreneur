/**
 * SmartIntake.tsx — "Talk to YojanaMitra" premium conversational intake screen.
 *
 * This is the primary AI-powered profile discovery interface.
 * NOT a generic chatbot — it is a premium, focused intake experience.
 *
 * Features:
 * - Large, visually prominent text input
 * - Voice input (Web Speech API) with animated recording state
 * - Live Kaggle TF-IDF retrieval preview as user types
 * - Example prompts in all 3 languages
 * - Profile extraction → ProfileConfirmation flow
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, Sparkles, ArrowRight, Globe, ChevronRight,
  Loader2, ChevronLeft, X, CheckCircle2,
} from 'lucide-react';
import { extractProfile, extractionToPartialProfile } from '../services/NLPService';
import { retrieveKaggleCandidates, buildProfileQuery, getKaggleSchemeCount } from '../services/KaggleRetrieval';
import { useAppStore } from '../hooks/useAppStore';
import { t, LANGUAGE_LABELS, type Language } from '../services/i18n';
import { cn } from '../utils';

const LANGUAGES: Language[] = ['en', 'hi', 'mr'];

// Diverse examples — NO chai stall as default
const EXAMPLES: Record<Language, { text: string; label: string; icon: string }[]> = {
  en: [
    { icon: '✂️', text: 'I want to start a tailoring business in Pune. I have ₹50,000 and need ₹2 lakh.', label: 'Tailoring Business' },
    { icon: '🚚', text: 'I run a food truck in Mumbai and want to expand it. I need ₹5 lakh.', label: 'Food Truck Expansion' },
    { icon: '🛒', text: 'I am a street vendor and need working capital of ₹10,000.', label: 'Street Vendor Capital' },
  ],
  hi: [
    { icon: '✂️', text: 'मुझे पुणे में सिलाई का व्यवसाय शुरू करना है। मेरे पास ₹50,000 हैं और मुझे ₹2 लाख चाहिए।', label: 'सिलाई व्यवसाय' },
    { icon: '🚚', text: 'मेरे पास मुंबई में फूड ट्रक है और मुझे बड़ा करना है। मुझे ₹5 लाख चाहिए।', label: 'फूड ट्रक विस्तार' },
    { icon: '🛒', text: 'मैं स्ट्रीट वेंडर हूं और मुझे ₹10,000 की कार्यशील पूंजी चाहिए।', label: 'स्ट्रीट वेंडर' },
  ],
  mr: [
    { icon: '✂️', text: 'मला पुण्यात शिवणकाम व्यवसाय सुरू करायचा आहे. माझ्याकडे ₹50,000 आहेत आणि मला ₹2 लाख हवे आहेत.', label: 'शिवणकाम व्यवसाय' },
    { icon: '🚚', text: 'माझ्याकडे मुंबईत फूड ट्रक आहे आणि मला तो वाढवायचा आहे. मला ₹5 लाख हवे आहेत.', label: 'फूड ट्रक विस्तार' },
    { icon: '🛒', text: 'मी रस्त्यावरील विक्रेता आहे आणि मला ₹10,000 कार्यशील भांडवल हवे आहे.', label: 'रस्त्यावरील विक्रेता' },
  ],
};

interface VoiceRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export default function SmartIntake() {
  const navigate = useNavigate();
  const { profile, setProfile, language, setLanguage } = useAppStore();

  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [kaggleCandidates, setKaggleCandidates] = useState<{ name: string; category: string; score: number }[]>([]);
  const [schemeCount, setSchemeCount] = useState(0);

  const recognitionRef = useRef<VoiceRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load Kaggle index (lazy)
  useEffect(() => {
    setTimeout(() => {
      try { setSchemeCount(getKaggleSchemeCount()); } catch { /* lazy */ }
    }, 600);
  }, []);

  // Voice recognition setup
  useEffect(() => {
    type VoiceRecognitionCtor = new () => VoiceRecognition;
    const win = window as unknown as {
      SpeechRecognition?: VoiceRecognitionCtor;
      webkitSpeechRecognition?: VoiceRecognitionCtor;
    };
    const SpeechRecognitionAPI = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) { setVoiceSupported(false); return; }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.onresult = (e) => {
      const transcript = Object.values(e.results).map((r) => r[0].transcript).join('');
      setText(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    setVoiceSupported(true);
  }, [language]);

  // Live Kaggle retrieval (debounced)
  useEffect(() => {
    if (!text.trim() || text.trim().length < 10) { setKaggleCandidates([]); return; }
    const timer = setTimeout(() => {
      try {
        const candidates = retrieveKaggleCandidates(text, 5);
        setKaggleCandidates(candidates.map((c) => ({ name: c.name, category: c.category, score: c.score })));
      } catch { /* ignore during index build */ }
    }, 800);
    return () => clearTimeout(timer);
  }, [text]);

  const toggleVoice = () => {
    if (!voiceSupported || !recognitionRef.current) {
      setError(t('voice_unsupported', language));
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setError('');
    }
  };

  const handleExtract = async () => {
    if (!text.trim()) { setError('Please describe your business or need first.'); return; }
    setIsExtracting(true);
    setError('');
    try {
      const result = await extractProfile(text.trim());
      const updatedProfile = extractionToPartialProfile(result, profile);
      setProfile(updatedProfile);

      const profileQuery = buildProfileQuery({
        businessType: updatedProfile.businessType,
        occupation: updatedProfile.occupation,
        businessStage: updatedProfile.businessStage,
        fundingRequirement: updatedProfile.fundingRequirement,
        category: updatedProfile.category,
        isStreetVendor: updatedProfile.isStreetVendor,
        state: updatedProfile.state,
        intent: updatedProfile.intent,
      });
      const kaggleCands = retrieveKaggleCandidates(profileQuery, 10);
      sessionStorage.setItem('extractionResult', JSON.stringify(result));
      sessionStorage.setItem('kaggleCandidates', JSON.stringify(kaggleCands));
      navigate('/profile-confirm');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const fillExample = (exampleText: string) => {
    setText(exampleText);
    textareaRef.current?.focus();
  };

  const examples = EXAMPLES[language];
  const charCount = text.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1c30] via-[#1e3a5f] to-[#16345a]">
      {/* Top bar */}
      <div className="max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} /> Dashboard
        </button>

        {/* Language Selector */}
        <div className="flex gap-1 bg-white/10 border border-white/20 rounded-xl p-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                language === lang
                  ? 'bg-white text-[#1e3a5f]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {LANGUAGE_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-orange-300 mb-5">
          <Sparkles size={14} />
          {schemeCount > 0
            ? `${schemeCount.toLocaleString()} schemes indexed · Hindi, Marathi, English`
            : 'AI-Powered · Hindi, Marathi, English'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Talk to YojanaMitra
        </h1>
        <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
          Tell us about your business, funding needs, or the support you're looking for.
          We'll find the right government schemes for you.
        </p>
      </div>

      {/* Main input card */}
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Input section */}
          <div className="p-6">
            {/* Listening indicator */}
            {isListening && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block flex-shrink-0" />
                <span className="text-sm font-semibold text-red-600">{t('voice_listening', language)}</span>
                <span className="text-xs text-red-500 ml-auto">
                  {language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'}
                </span>
              </div>
            )}

            {/* Textarea */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                className={cn(
                  'w-full min-h-44 px-5 py-4 text-base border-2 rounded-2xl resize-none',
                  'focus:outline-none transition leading-relaxed text-gray-800 placeholder-gray-300',
                  isListening
                    ? 'border-red-300 bg-red-50/30 focus:border-red-400'
                    : 'border-gray-100 bg-gray-50 focus:border-[#1e3a5f] focus:bg-white'
                )}
                placeholder={t('intake_placeholder', language)}
                value={text}
                onChange={(e) => setText(e.target.value)}
                lang={language === 'hi' ? 'hi' : language === 'mr' ? 'mr' : 'en'}
              />

              {/* Clear button */}
              {text && !isListening && (
                <button
                  onClick={() => setText('')}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={15} />
                </button>
              )}

              {/* Char count */}
              {charCount > 20 && (
                <span className="absolute bottom-3 left-4 text-xs text-gray-300">{charCount} chars</span>
              )}
            </div>

            {/* Voice unsupported notice */}
            {!voiceSupported && (
              <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded-xl px-4 py-2.5 border border-amber-200">
                {t('voice_unsupported', language)}
              </p>
            )}

            {/* Error */}
            {error && (
              <p className="text-xs text-red-600 mt-2 bg-red-50 rounded-xl px-4 py-2.5 border border-red-200">
                {error}
              </p>
            )}

            {/* Kaggle live discovery */}
            {kaggleCandidates.length > 0 && (
              <div className="mt-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-xs text-emerald-700 font-semibold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  {kaggleCandidates.length} relevant schemes discovered
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {kaggleCandidates.map((c) => (
                    <span
                      key={c.name}
                      className="px-2.5 py-0.5 bg-white text-emerald-800 text-xs rounded-full border border-emerald-200 truncate max-w-48"
                      title={c.name}
                    >
                      {c.name.slice(0, 40)}{c.name.length > 40 ? '…' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="px-6 pb-6 flex gap-3">
            {/* Voice button */}
            <button
              onClick={toggleVoice}
              title={isListening ? t('voice_stop', language) : t('voice_start', language)}
              disabled={!voiceSupported}
              className={cn(
                'flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all flex-shrink-0',
                !voiceSupported
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : isListening
                  ? 'bg-red-500 text-white shadow-red-200 shadow-lg animate-pulse'
                  : 'bg-[#1e3a5f]/10 text-[#1e3a5f] hover:bg-[#1e3a5f]/20 border border-[#1e3a5f]/20'
              )}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              {isListening ? t('voice_stop', language) : t('voice_start', language)}
            </button>

            {/* Find schemes button */}
            <button
              onClick={handleExtract}
              disabled={isExtracting || !text.trim()}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base transition-all',
                isExtracting || !text.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200 hover:shadow-orange-300'
              )}
            >
              {isExtracting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analysing your profile…
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Find My Schemes
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Example prompts */}
          <div className="px-6 pb-6 border-t border-gray-50 pt-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Globe size={11} /> {t('intake_example', language)}
            </p>
            <div className="grid sm:grid-cols-3 gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => fillExample(ex.text)}
                  className="text-left p-3 rounded-xl border border-gray-100 hover:border-[#1e3a5f]/30 hover:bg-gray-50 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{ex.icon}</span>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-[#1e3a5f]">{ex.label}</span>
                    <ChevronRight size={11} className="ml-auto text-gray-300 group-hover:text-[#1e3a5f] transition-colors" />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">"{ex.text}"</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How it works strip */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { emoji: '🗣️', label: 'You describe\nyour business' },
            { emoji: '🤖', label: 'AI + Kaggle\nretrieval' },
            { emoji: '✅', label: 'Verified rules\ndecide' },
          ].map(({ emoji, label }) => (
            <div key={label} className="bg-white/10 border border-white/15 rounded-2xl p-3 text-center backdrop-blur-sm">
              <p className="text-2xl mb-1">{emoji}</p>
              <p className="text-xs text-white/70 font-medium whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/30 mt-5">
          🔒 AI extracts your profile only — eligibility is decided by verified government rules, not AI.
        </p>
      </div>
    </div>
  );
}
