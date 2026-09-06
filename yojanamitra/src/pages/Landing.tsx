import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, CheckCircle2, Users, TrendingUp, Star } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: 'AI Scheme Matching', description: 'Describe your business; our AI identifies the most relevant government schemes instantly.' },
  { icon: Shield, title: 'Verified Eligibility', description: 'Deterministic rule engine checks every eligibility criterion — no guesswork, no false hope.' },
  { icon: CheckCircle2, title: 'Document Readiness', description: 'Know exactly which documents you need and track what you already have.' },
  { icon: TrendingUp, title: 'Business Cost Planner', description: 'Calculate startup costs, identify funding gaps, and plan capital requirements.' },
  { icon: Users, title: 'Partner Routing', description: 'Find the nearest bank, NGO, or government office that can process your application.' },
  { icon: Star, title: 'Application Tracker', description: 'Real-time status updates on every scheme application you have submitted.' },
];

const DEMO_PROFILE = {
  businessType: 'Chai Stall',
  location: 'Mumbai, Maharashtra',
  capital: '₹40,000',
  monthlyIncome: '₹25,000',
};

const STATS = [
  { value: '47+', label: 'Government Schemes' },
  { value: '14,000+', label: 'Entrepreneurs Helped' },
  { value: '₹247 Cr', label: 'Funding Facilitated' },
  { value: '89%', label: 'Approval Rate' },
];

export default function Landing() {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate('/dashboard');
  };

  const handleStart = () => {
    navigate('/intake');
  };

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
            <button onClick={handleDemo} className="hidden sm:block text-sm font-medium text-[#1e3a5f] hover:underline">
              Try Demo
            </button>
            <button onClick={handleStart} className="btn-primary text-sm py-2 px-4">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1c30] via-[#1e3a5f] to-[#16345a] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                SIH 2026 · AI for Social Good
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Your Business.<br />
                Your Schemes.<br />
                <span className="text-orange-400">One Smart Guide.</span>
              </h1>
              <p className="text-lg text-white/75 mb-8 max-w-lg leading-relaxed">
                YojanaMitra helps marginalized entrepreneurs discover the right government schemes, check real eligibility, prepare documents, and track every application — all in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleStart} className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors text-base">
                  Start Your Journey <ArrowRight size={18} />
                </button>
                <button onClick={handleDemo} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base">
                  Try Demo Profile
                </button>
              </div>
            </div>

            {/* Demo Card */}
            <div className="lg:flex justify-end hidden">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-gray-900">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">S</div>
                  <div>
                    <p className="text-sm font-semibold">Demo Profile</p>
                    <p className="text-xs text-gray-400">Auto-filled for you</p>
                  </div>
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Demo</span>
                </div>
                <div className="space-y-2.5 mb-4">
                  {Object.entries({ 'Business': DEMO_PROFILE.businessType, 'Location': DEMO_PROFILE.location, 'Available Capital': DEMO_PROFILE.capital, 'Est. Monthly Income': DEMO_PROFILE.monthlyIncome }).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-gray-400">{k}</span>
                      <span className="font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-2">Matched Schemes</p>
                  <div className="space-y-1.5">
                    {['MUDRA Shishu · 88% match', 'PMEGP · 92% match', 'WDC Scheme · 80% match'].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={handleDemo} className="mt-4 w-full py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-xl hover:bg-[#162640] transition-colors">
                  View Dashboard →
                </button>
              </div>
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
            {[
              { step: '01', title: 'Tell Us About You', description: 'Share your business idea, location, income and background.' },
              { step: '02', title: 'Get Matched', description: 'AI matches your profile against verified government scheme rules.' },
              { step: '03', title: 'Prepare & Apply', description: 'Follow our checklist to gather documents and submit applications.' },
              { step: '04', title: 'Track & Receive', description: 'Monitor every application and get notified when funds are disbursed.' },
            ].map(({ step, title, description }) => (
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
            <button onClick={handleDemo} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-colors text-base">
              Try Demo First
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
