import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, CheckCircle2, Users, TrendingUp, Mic } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';

const FEATURES = [
  { icon: Sparkles, title: 'AI Scheme Matching', description: 'Describe your business; our AI identifies the most relevant government schemes instantly.' },
  { icon: Shield, title: 'Verified Eligibility', description: 'Deterministic rule engine checks every eligibility criterion — no guesswork, no false hope.' },
  { icon: CheckCircle2, title: 'Document Readiness', description: 'Know exactly which documents you need and track what you already have.' },
  { icon: TrendingUp, title: 'Business Cost Planner', description: 'Calculate startup costs, identify funding gaps, and plan capital requirements.' },
  { icon: Users, title: 'Partner Routing', description: 'Find the nearest bank, NGO, or government office that can process your application.' },
  { icon: Mic, title: 'Voice Input', description: 'Speak in English, Hindi, or Marathi — our AI understands your needs.' },
];

const STATS = [
  { value: '47+', label: 'Government Schemes' },
  { value: '14,000+', label: 'Entrepreneurs Helped' },
  { value: '₹247 Cr', label: 'Funding Facilitated' },
  { value: '89%', label: 'Approval Rate' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Tell Us About You', description: 'Share your business idea, location, income and background by voice or text.' },
  { step: '02', title: 'AI + Kaggle Discovery', description: 'AI matches your profile against Kaggle\'s scheme dataset + verified government rules.' },
  { step: '03', title: 'Prepare & Apply', description: 'Follow our checklist to gather documents and connect with the right partner.' },
  { step: '04', title: 'Partner Connects You', description: 'Banks, NGOs, and government offices process your actual application.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { currentUser } = useAppStore();

  const handleStart = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1e3a5f] flex items-center justify-center font-bold text-white text-sm">
              YM
            </div>
            <span className="font-bold text-lg text-[#1e3a5f] tracking-tight">
              Yojana<span className="text-orange-500">Mitra</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-[#1e3a5f] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#1e3a5f] transition-colors">How It Works</a>
            <a href="#schemes" className="hover:text-[#1e3a5f] transition-colors">Schemes</a>
          </nav>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm py-2 px-4">
                Dashboard →
              </button>
            ) : (
              <>
                <button onClick={handleLogin} className="hidden sm:block text-sm font-medium text-[#1e3a5f] hover:underline">
                  Login
                </button>
                <button onClick={handleStart} className="btn-primary text-sm py-2 px-4">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1c30] via-[#1e3a5f] to-[#16345a] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Your Business.<br />
              Your Schemes.<br />
              <span className="text-orange-400">One Smart Guide.</span>
            </h1>
            <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
              YojanaMitra helps entrepreneurs discover the right government schemes, check real eligibility,
              prepare documents, and connect with the right partner — all in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button onClick={handleStart} className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors text-base">
                Start Your Journey <ArrowRight size={18} />
              </button>
              {!currentUser && (
                <button onClick={handleLogin} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base">
                  Login →
                </button>
              )}
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: '🤖', label: 'AI Profile Extraction', sub: 'Voice & Text' },
                { icon: '📋', label: 'Verified Eligibility', sub: 'Government Rules' },
                { icon: '📄', label: 'Document Checklist', sub: 'Scheme-specific' },
                { icon: '🗺️', label: 'Partner Routing', sub: 'Map & Distance' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white/8 border border-white/15 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <p className="text-2xl mb-2">{icon}</p>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1e3a5f] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-orange-400">{value}</p>
              <p className="text-sm text-white/60 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1e3a5f] mb-3">Everything You Need, In One Place</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">From idea to funding — YojanaMitra walks you through every step of the government scheme journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card hover:shadow-md transition-shadow group">
                <div className="w-11 h-11 bg-[#eef2ff] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f] transition-colors">
                  <Icon size={22} className="text-[#1e3a5f] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#1e3a5f] mb-3">How YojanaMitra Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A simple, guided flow that takes you from idea to application in minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-extrabold text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1e3a5f] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Find Your Scheme?</h2>
          <p className="text-white/70 mb-8">Join thousands of entrepreneurs who discovered the right government support with YojanaMitra.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleStart} className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-base">
              Start Your Journey <ArrowRight size={18} />
            </button>
            {!currentUser && (
              <button onClick={handleLogin} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base">
                Already have an account? Login
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
