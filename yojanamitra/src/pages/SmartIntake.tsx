import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Sparkles, ArrowRight, Globe, ChevronRight, Loader2 } from 'lucide-react';
import { extractProfile, extractionToPartialProfile } from '../services/NLPService';
import { useAppStore } from '../hooks/useAppStore';
import { t, LANGUAGE_LABELS, type Language } from '../services/i18n';
import { cn } from '../utils';

const LANGUAGES: Language[] = ['en', 'hi', 'mr'];

const EXAMPLES: Record<Language, string> = {
  en: '"I want to start a chai stall in Mumbai. I have ₹40,000 and need a loan of ₹80,000."',
  hi: '"मुझे मुंबई में चाय का स्टॉल शुरू करना है। मेरे पास ₹40,000 हैं और मुझे ₹80,000 का लोन चाहिए।"',
  mr: '"मला मुंबईत चहाचा स्टॉल सुरू करायचा आहे. माझ्याकडे ₹40,000 आहेत आणि मला ₹80,000 कर्ज हवे आहे."',
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
  const recognitionRef = useRef<VoiceRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Voice input setup
  useEffect(() => {
    type VoiceRecognitionCtor = new () => VoiceRecognition;
    const win = window as unknown as { SpeechRecognition?: VoiceRecognitionCtor; webkitSpeechRecognition?: VoiceRecognitionCtor };
    const SpeechRecognitionAPI = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

    recognition.onresult = (e) => {
      const transcript = Object.values(e.results)
        .map((r) => r[0].transcript)
        .join('');
      setText(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, [language]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      setError('Voice input is not supported in this browser. Please type your requirements.');
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
    if (!text.trim()) {
      setError('Please describe your business first.');
      return;
    }
    setIsExtracting(true);
    setError('');
    try {
      const result = await extractProfile(text.trim());
      const updatedProfile = extractionToPartialProfile(result, profile);
      setProfile(updatedProfile);
      // Store extraction result in sessionStorage for confirmation page
      sessionStorage.setItem('extractionResult', JSON.stringify(result));
      navigate('/profile-confirm');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const fillExample = () => {
    setText(EXAMPLES[language].replace(/["""]/g, ''));
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Language Selector */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <Globe size={15} className="text-gray-400" />
          <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
                  language === lang
                    ? 'bg-[#1e3a5f] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-4">
            <Sparkles size={14} />
            AI-Powered · Works in Hindi, Marathi, English
          </div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f]">{t('intake_title', language)}</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">{t('intake_subtitle', language)}</p>
        </div>

        {/* Main Input Card */}
        <div className="card shadow-md mb-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              className="w-full min-h-36 px-4 py-3 text-base border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition leading-relaxed"
              placeholder={t('intake_placeholder', language)}
              value={text}
              onChange={(e) => setText(e.target.value)}
              lang={language === 'hi' ? 'hi' : language === 'mr' ? 'mr' : 'en'}
            />

            {/* Voice Button */}
            <button
              onClick={toggleVoice}
              title={isListening ? t('voice_stop', language) : t('voice_start', language)}
              className={cn(
                'absolute bottom-3 right-3 p-2.5 rounded-full transition-all',
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-lg'
                  : 'bg-gray-100 text-gray-500 hover:bg-[#1e3a5f] hover:text-white'
              )}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>

          {isListening && (
            <p className="text-xs text-red-500 font-medium mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              {t('voice_listening', language)}
            </p>
          )}

          {error && (
            <p className="text-xs text-red-600 mt-2 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Example */}
          <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">{t('intake_example', language)}</p>
            <p
              className="text-xs text-blue-800 cursor-pointer hover:underline leading-relaxed"
              onClick={fillExample}
            >
              {EXAMPLES[language]}
            </p>
            <button
              onClick={fillExample}
              className="mt-1.5 text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              Use this example <ChevronRight size={11} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleExtract}
            disabled={isExtracting || !text.trim()}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all',
              isExtracting || !text.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1e3a5f] text-white hover:bg-[#162640] shadow-md hover:shadow-lg'
            )}
          >
            {isExtracting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Extracting your profile…
              </>
            ) : (
              <>
                <Sparkles size={18} />
                {t('continue', language)}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* How it works */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { emoji: '🗣️', label: 'You describe\nyour business' },
            { emoji: '🤖', label: 'AI extracts\nyour profile' },
            { emoji: '✅', label: 'You confirm\n& edit' },
          ].map(({ emoji, label }) => (
            <div key={label} className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-2xl mb-1">{emoji}</p>
              <p className="text-xs text-gray-500 font-medium whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Your information is used only to match government schemes. AI extracts your profile — eligibility is decided by verified government rules.
        </p>
      </div>
    </div>
  );
}
