import { useState } from 'react';
import { Phone, ExternalLink, MapPin, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { SAMPLE_PARTNERS } from '../data/mockData';
import { t } from '../services/i18n';
import { cn } from '../utils';
import type { PartnerType } from '../types';

const TYPE_LABELS: Record<PartnerType, string> = {
  bank: '🏦 Bank / NBFC',
  ngo: '🤝 NGO / Assistance',
  government_office: '🏛 Government Office',
  online_portal: '💻 Online Portal',
};

const TYPE_COLORS: Record<PartnerType, string> = {
  bank: 'bg-blue-50 border-blue-200 text-blue-700',
  ngo: 'bg-green-50 border-green-200 text-green-700',
  government_office: 'bg-purple-50 border-purple-200 text-purple-700',
  online_portal: 'bg-indigo-50 border-indigo-200 text-indigo-700',
};

export default function PartnerRouting() {
  const { profile, language } = useAppStore();
  const [typeFilter, setTypeFilter] = useState<PartnerType | 'all'>('all');

  const filtered = SAMPLE_PARTNERS.filter(
    (p) => typeFilter === 'all' || p.type === typeFilter
  );

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title">{t('partners_title', language as 'en')}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {t('partners_subtitle', language as 'en')} · Showing results near {profile.district}, {profile.state}
        </p>
      </div>

      {/* Readiness Reminder */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-green-800">You've completed your Application Readiness check!</p>
          <p className="text-xs text-green-700 mt-0.5">
            Share your Scheme Passport and document checklist with any partner below to fast-track your application.
            The partner will help you submit the actual government application.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { step: '1', label: 'Choose a Partner', icon: '🤝' },
          { step: '2', label: 'Share your Passport', icon: '📋' },
          { step: '3', label: 'Provide Documents', icon: '📁' },
          { step: '4', label: 'Partner Applies', icon: '✅' },
        ].map(({ step, label, icon }) => (
          <div key={step} className="card p-4 text-center">
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-xs font-bold text-[#1e3a5f]">Step {step}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {([
          ['all', '🔍 All Partners'],
          ['bank', '🏦 Banks / NBFCs'],
          ['ngo', '🤝 NGOs'],
          ['government_office', '🏛 Govt. Offices'],
          ['online_portal', '💻 Online'],
        ] as [PartnerType | 'all', string][]).map(([val, label]) => (
          <button
            key={val}
            onClick={() => setTypeFilter(val)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
              typeFilter === val
                ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Partner Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((partner) => (
          <div key={partner.id} className="card hover:shadow-md transition-shadow flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{partner.name}</h3>
                <span className={cn('inline-flex items-center mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full border', TYPE_COLORS[partner.type])}>
                  {TYPE_LABELS[partner.type]}
                </span>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-700">{partner.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-3 leading-relaxed flex-1">{partner.description}</p>

            {/* Services */}
            <div className="flex flex-wrap gap-1 mb-3">
              {partner.services.slice(0, 3).map((s) => (
                <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{s}</span>
              ))}
              {partner.services.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full text-xs">+{partner.services.length - 3}</span>
              )}
            </div>

            {/* Languages */}
            <p className="text-xs text-gray-400 mb-3">
              Languages: {partner.languages.join(', ')}
            </p>

            {/* Contact / Distance */}
            <div className="space-y-2 border-t border-gray-50 pt-3">
              {partner.distance !== undefined && partner.distance > 0 && (
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <MapPin size={11} /> {partner.distance} km away
                </p>
              )}
              {partner.address && (
                <p className="text-xs text-gray-500 flex items-start gap-1.5">
                  <MapPin size={11} className="flex-shrink-0 mt-0.5" /> {partner.address}
                </p>
              )}
              <div className="flex gap-2 mt-2">
                {partner.contactPhone && (
                  <a
                    href={`tel:${partner.contactPhone}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] hover:underline"
                  >
                    <Phone size={12} /> {partner.contactPhone}
                  </a>
                )}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline ml-auto"
                  >
                    <ExternalLink size={12} /> Visit
                  </a>
                )}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full mt-3 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1e3a5f] text-white text-xs font-bold hover:bg-[#162640] transition-colors">
              Connect with this Partner <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <p className="text-sm font-bold text-blue-800 mb-1">YojanaMitra connects you, not applies for you.</p>
        <p className="text-xs text-blue-700">
          This platform prepares your profile, matches schemes, checks eligibility, and connects you with the right partner.
          The partner (bank, NGO, or government office) will process and submit your actual government scheme application.
          All eligibility decisions are made by official government criteria, not by this platform.
        </p>
      </div>
    </div>
  );
}
