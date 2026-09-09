import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { register } from '../services/AuthService';
import { useAppStore } from '../hooks/useAppStore';
import { t } from '../services/i18n';
import { cn } from '../utils';

export default function Register() {
  const navigate = useNavigate();
  const { setCurrentUser, language } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): string | null => {
    if (!name.trim()) return t('field_required', language) + ' (Full Name)';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return t('invalid_email', language);
    if (password.length < 6) return t('password_too_short', language);
    if (password !== confirmPassword) return t('passwords_dont_match', language);
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const result = register(name, email, password);
    setIsLoading(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
      navigate('/dashboard');
    } else {
      setError(result.error ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1c30] via-[#1e3a5f] to-[#16345a] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white text-lg">YM</div>
            <span className="font-extrabold text-2xl tracking-tight">Yojana<span className="text-orange-400">Mitra</span></span>
          </div>
          <p className="text-white/60 text-sm">{t('app_tagline', language)}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus size={20} className="text-[#1e3a5f]" />
            <div>
              <h1 className="text-xl font-extrabold text-[#1e3a5f]">{t('register_title', language)}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{t('register_subtitle', language)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('full_name', language)}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="input w-full"
                autoFocus
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('email', language)}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input w-full"
                autoComplete="email"
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
                  placeholder="Min. 6 characters"
                  className="input w-full pr-10"
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('confirm_password', language)}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                className="input w-full"
                autoComplete="new-password"
              />
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
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
              )}
            >
              {isLoading ? (
                <><Loader2 size={18} className="animate-spin" />{t('creating_account', language)}</>
              ) : t('register', language)}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            <Link to="/login" className="text-[#1e3a5f] font-semibold hover:underline">
              {t('already_have_account', language)}
            </Link>
          </p>
        </div>

        <p className="text-center text-white/40 text-xs mt-4">
          🔒 Your data is stored locally in this browser only.
        </p>
      </div>
    </div>
  );
}
