import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react';
import { login } from '../services/AuthService';
import { useAppStore } from '../hooks/useAppStore';
import { t } from '../services/i18n';
import { cn } from '../utils';

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser, language } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError(t('field_required', language));
      return;
    }

    setIsLoading(true);
    // Simulate async for UX
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email, password);
    setIsLoading(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
      navigate('/dashboard');
    } else {
      setError(result.error ?? 'Login failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(/profile-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Subtle overlay so the white card stays readable */}

      {/* Scoped wrapper that sits above the overlay */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-white mb-2">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white text-lg">YM</div>
              <div className="inline-flex items-center gap-2 text-[#1e3a5f] mb-2">


                <span className="font-extrabold text-2xl tracking-tight">
                  Yojana<span className="text-orange-500">Mitra</span>
                </span>
              </div>
            </div>
            <p className="text-[#1e3a5f]/70 text-sm font-medium">
              {t('app_tagline', language)}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={20} className="text-[#1e3a5f]" />
              <div>
                <h1 className="text-xl font-extrabold text-[#1e3a5f]">{t('login_title', language)}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{t('login_subtitle', language)}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('email', language)}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn('input w-full', error && !password ? 'border-red-400' : '')}
                  autoComplete="email"
                  autoFocus
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('password', language)}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input w-full pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full py-3 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2',
                  isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1e3a5f] text-white hover:bg-[#162640] shadow-md'
                )}
              >
                {isLoading ? (
                  <><Loader2 size={18} className="animate-spin" />{t('logging_in', language)}</>
                ) : t('login', language)}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/register" className="text-[#1e3a5f] font-semibold hover:underline">
                {t('no_account_yet', language)}
              </Link>
            </p>
          </div>

          {/* Demo note */}
          <p className="text-center text-white/40 text-xs mt-4">
            🔒 Your data is stored locally in this browser only.
          </p>
        </div>
      </div>
    </div>
  );
}
