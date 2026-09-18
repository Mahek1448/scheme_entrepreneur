import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Calculator, TrendingDown, ArrowRight, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { formatCurrency, cn } from '../utils';
import { t } from '../services/i18n';

interface CostItem {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  isEssential: boolean;
}

const CATEGORIES = ['Equipment', 'Setup', 'Raw Materials', 'Rent / Deposit', 'Licenses', 'Working Capital', 'Marketing', 'Contingency', 'Other'];

// Dynamic default items based on business type - NO hardcoded Chai Stall
function generateDefaultItems(businessType: string, fundingReq: number): CostItem[] {
  const lowerBusiness = businessType.toLowerCase();

  // Generic defaults if no business type
  if (!businessType) {
    return [
      { id: '1', category: 'Equipment', name: 'Primary Equipment', estimatedCost: 15000, isEssential: true },
      { id: '2', category: 'Setup', name: 'Workspace Setup', estimatedCost: 10000, isEssential: true },
      { id: '3', category: 'Raw Materials', name: 'Initial Raw Materials (1 month)', estimatedCost: 8000, isEssential: true },
      { id: '4', category: 'Licenses', name: 'Licenses & Registration', estimatedCost: 3000, isEssential: true },
      { id: '5', category: 'Working Capital', name: 'Operating Cash (2 months)', estimatedCost: 12000, isEssential: true },
      { id: '6', category: 'Marketing', name: 'Initial Marketing & Signage', estimatedCost: 2000, isEssential: false },
      { id: '7', category: 'Contingency', name: 'Buffer / Unexpected Expenses', estimatedCost: Math.round(fundingReq * 0.1) || 5000, isEssential: false },
    ];
  }

  // Tailoring / Stitching
  if (/tailor|stitching|sewing|silai|शिवण/.test(lowerBusiness)) {
    return [
      { id: '1', category: 'Equipment', name: 'Sewing Machine (industrial)', estimatedCost: 25000, isEssential: true },
      { id: '2', category: 'Equipment', name: 'Scissors, measuring tools, accessories', estimatedCost: 5000, isEssential: true },
      { id: '3', category: 'Setup', name: 'Shop setup, table, lighting', estimatedCost: 15000, isEssential: true },
      { id: '4', category: 'Raw Materials', name: 'Thread, buttons, fabric samples', estimatedCost: 8000, isEssential: true },
      { id: '5', category: 'Rent / Deposit', name: 'Shop deposit (2 months)', estimatedCost: 20000, isEssential: false },
      { id: '6', category: 'Licenses', name: 'Shop & Establishment License', estimatedCost: 2000, isEssential: true },
      { id: '7', category: 'Working Capital', name: 'Operating expenses (2 months)', estimatedCost: 15000, isEssential: true },
      { id: '8', category: 'Contingency', name: 'Buffer', estimatedCost: Math.round(fundingReq * 0.1) || 8000, isEssential: false },
    ];
  }

  // Food truck / Food service
  if (/food\s*truck|food\s*cart|catering|tiffin|dabba|bakery/.test(lowerBusiness)) {
    return [
      { id: '1', category: 'Equipment', name: 'Commercial cooking equipment', estimatedCost: 60000, isEssential: true },
      { id: '2', category: 'Setup', name: 'Vehicle / cart customization', estimatedCost: 80000, isEssential: true },
      { id: '3', category: 'Raw Materials', name: 'Food supplies (1 month)', estimatedCost: 20000, isEssential: true },
      { id: '4', category: 'Licenses', name: 'FSSAI license, permits', estimatedCost: 5000, isEssential: true },
      { id: '5', category: 'Working Capital', name: 'Operating cash (2 months)', estimatedCost: 30000, isEssential: true },
      { id: '6', category: 'Marketing', name: 'Branding, social media', estimatedCost: 5000, isEssential: false },
      { id: '7', category: 'Contingency', name: 'Buffer', estimatedCost: Math.round(fundingReq * 0.1) || 20000, isEssential: false },
    ];
  }

  // Kirana / Grocery store
  if (/kirana|grocery|general\s*store/.test(lowerBusiness)) {
    return [
      { id: '1', category: 'Setup', name: 'Shop shelves, racks, display units', estimatedCost: 30000, isEssential: true },
      { id: '2', category: 'Equipment', name: 'Weighing machine, billing system', estimatedCost: 15000, isEssential: true },
      { id: '3', category: 'Raw Materials', name: 'Initial stock inventory', estimatedCost: 80000, isEssential: true },
      { id: '4', category: 'Rent / Deposit', name: 'Shop deposit', estimatedCost: 30000, isEssential: false },
      { id: '5', category: 'Licenses', name: 'FSSAI, GST registration', estimatedCost: 4000, isEssential: true },
      { id: '6', category: 'Working Capital', name: 'Operating cash (2 months)', estimatedCost: 25000, isEssential: true },
      { id: '7', category: 'Contingency', name: 'Buffer', estimatedCost: Math.round(fundingReq * 0.1) || 18000, isEssential: false },
    ];
  }

  // Beauty parlour / Salon
  if (/salon|parlour|beauty|hair/.test(lowerBusiness)) {
    return [
      { id: '1', category: 'Equipment', name: 'Beauty equipment (chair, mirror, dryer)', estimatedCost: 40000, isEssential: true },
      { id: '2', category: 'Setup', name: 'Interior décor, AC, lighting', estimatedCost: 30000, isEssential: true },
      { id: '3', category: 'Raw Materials', name: 'Beauty products & supplies', estimatedCost: 15000, isEssential: true },
      { id: '4', category: 'Rent / Deposit', name: 'Shop deposit', estimatedCost: 25000, isEssential: false },
      { id: '5', category: 'Licenses', name: 'Shop license, GST', estimatedCost: 3000, isEssential: true },
      { id: '6', category: 'Working Capital', name: 'Operating cash (2 months)', estimatedCost: 15000, isEssential: true },
      { id: '7', category: 'Contingency', name: 'Buffer', estimatedCost: Math.round(fundingReq * 0.1) || 12000, isEssential: false },
    ];
  }

  // Street vendor (generic)
  if (/vendor|street|thela|stall|cart/.test(lowerBusiness)) {
    return [
      { id: '1', category: 'Equipment', name: 'Cart / stall equipment', estimatedCost: 15000, isEssential: true },
      { id: '2', category: 'Setup', name: 'Branding, display', estimatedCost: 5000, isEssential: true },
      { id: '3', category: 'Raw Materials', name: 'Initial stock (1 month)', estimatedCost: 10000, isEssential: true },
      { id: '4', category: 'Licenses', name: 'Certificate of Vending / ULB permit', estimatedCost: 1000, isEssential: true },
      { id: '5', category: 'Working Capital', name: 'Operating cash (2 months)', estimatedCost: 10000, isEssential: true },
      { id: '6', category: 'Contingency', name: 'Buffer', estimatedCost: Math.round(fundingReq * 0.1) || 4000, isEssential: false },
    ];
  }

  // Generic fallback
  return [
    { id: '1', category: 'Equipment', name: 'Primary Equipment', estimatedCost: 20000, isEssential: true },
    { id: '2', category: 'Setup', name: 'Workspace / Shop Setup', estimatedCost: 15000, isEssential: true },
    { id: '3', category: 'Raw Materials', name: 'Initial Materials / Stock', estimatedCost: 10000, isEssential: true },
    { id: '4', category: 'Licenses', name: 'Licenses & Registration', estimatedCost: 3000, isEssential: true },
    { id: '5', category: 'Working Capital', name: 'Operating Cash (2 months)', estimatedCost: 15000, isEssential: true },
    { id: '6', category: 'Marketing', name: 'Initial Marketing', estimatedCost: 3000, isEssential: false },
    { id: '7', category: 'Contingency', name: 'Buffer (10%)', estimatedCost: Math.round(fundingReq * 0.1) || 6000, isEssential: false },
  ];
}

function EMICalculator({ loanAmount, language }: { loanAmount: number; language: string }) {
  const [principal, setPrincipal] = useState(loanAmount);
  const [rate, setRate] = useState(10);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => { setPrincipal(loanAmount); }, [loanAmount]);

  const monthlyRate = rate / 100 / 12;
  const emi = monthlyRate === 0
    ? principal / tenureMonths
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return (
    <div className="card border-2 border-indigo-100">
      <button onClick={() => setShowDetail(!showDetail)} className="flex items-center justify-between w-full mb-3">
        <h3 className="font-bold text-[#1e3a5f] flex items-center gap-2">
          <Calculator size={16} /> {t('emi_title', language as 'en')}
        </h3>
        {showDetail ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {showDetail && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div>
              <label className="label">{t('emi_loan_amount', language as 'en')}</label>
              <input className="input text-sm" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div>
              <label className="label">{t('emi_interest_rate', language as 'en')}</label>
              <input className="input text-sm" type="number" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div>
              <label className="label">{t('emi_tenure_months', language as 'en')}</label>
              <input className="input text-sm" type="number" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#1e3a5f] rounded-xl p-3 text-center text-white">
              <p className="text-xs opacity-70">{t('emi_monthly', language as 'en')}</p>
              <p className="text-xl font-extrabold mt-0.5">{formatCurrency(Math.round(emi))}</p>
              <p className="text-xs opacity-60">per month</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
              <p className="text-xs text-orange-600">{t('emi_total_interest', language as 'en')}</p>
              <p className="text-xl font-extrabold mt-0.5 text-orange-700">{formatCurrency(Math.round(totalInterest))}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-xs text-gray-500">{t('emi_total_payment', language as 'en')}</p>
              <p className="text-xl font-extrabold mt-0.5 text-gray-900">{formatCurrency(Math.round(totalPayment))}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 bg-gray-50 rounded-lg p-2">
            ⚠ Illustration only — actual rates depend on lender and credit profile.
          </p>
        </>
      )}
    </div>
  );
}

function SupportStack({ capital, loan, subsidy, total, language }: {
  capital: number; loan: number; subsidy: number; total: number; language: string;
}) {
  const capitalPct = total > 0 ? Math.round((capital / total) * 100) : 0;
  const loanPct = total > 0 ? Math.round((loan / total) * 100) : 0;
  const subsidyPct = total > 0 ? Math.round((subsidy / total) * 100) : 0;

  const bars = [
    { label: 'Your Capital', value: capital, pct: capitalPct, color: 'bg-[#1e3a5f]', textColor: 'text-[#1e3a5f]', description: 'Own contribution' },
    { label: 'Loan / Credit', value: loan, pct: loanPct, color: 'bg-blue-500', textColor: 'text-blue-600', description: 'e.g. MUDRA Loan' },
    { label: 'Subsidy / Grant', value: subsidy, pct: subsidyPct, color: 'bg-green-500', textColor: 'text-green-600', description: 'e.g. PMEGP Margin Money' },
  ].filter((b) => b.value > 0);

  return (
    <div className="card border-2 border-green-100">
      <h3 className="font-bold text-[#1e3a5f] mb-1 flex items-center gap-2">
        <TrendingDown size={16} /> {t('support_stack_title', language as 'en')}
      </h3>
      <p className="text-xs text-gray-500 mb-4">How different funding sources can cover your total business cost</p>

      <div className="bg-gray-50 rounded-xl p-3 text-center mb-4 border border-gray-100">
        <p className="text-xs text-gray-500">Total Business Cost</p>
        <p className="text-2xl font-extrabold text-[#1e3a5f]">{formatCurrency(total)}</p>
      </div>

      {bars.length > 0 ? (
        <>
          <div className="flex rounded-xl overflow-hidden h-10 mb-4 shadow-inner">
            {bars.map((b) => (
              <div
                key={b.label}
                className={cn('flex items-center justify-center text-white text-xs font-bold transition-all', b.color)}
                style={{ width: `${b.pct}%`, minWidth: b.pct > 0 ? 40 : 0 }}
                title={`${b.label}: ${formatCurrency(b.value)} (${b.pct}%)`}
              >
                {b.pct >= 10 ? `${b.pct}%` : ''}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {bars.map((b) => (
              <div key={b.label} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50">
                <div className={cn('w-3 h-3 rounded-sm flex-shrink-0 mt-0.5', b.color)} />
                <div>
                  <p className="text-xs font-semibold text-gray-800">{b.label}</p>
                  <p className={cn('text-base font-extrabold', b.textColor)}>{formatCurrency(b.value)}</p>
                  <p className="text-xs text-gray-400">{b.description} · {b.pct}%</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-400 text-center py-4">Add your capital and funding requirement to see the support stack.</p>
      )}

      <div className="mt-3 p-2.5 bg-blue-50 rounded-lg flex items-start gap-2 text-xs text-blue-700">
        <Info size={13} className="flex-shrink-0 mt-0.5" />
        Subsidy is illustrative from PMEGP scheme data. Actual amounts depend on bank approval.
      </div>
    </div>
  );
}

export default function BusinessPlanner() {
  const navigate = useNavigate();
  const { profile, language } = useAppStore();
  const { recommendations } = useRecommendations(profile);

  // Generate dynamic initial items based on user's actual business type
  const [items, setItems] = useState<CostItem[]>(() =>
    generateDefaultItems(profile.businessType, profile.fundingRequirement)
  );

  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newCat, setNewCat] = useState('Equipment');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Re-generate items when profile business type changes significantly
  useEffect(() => {
    if (profile.businessType) {
      setItems(generateDefaultItems(profile.businessType, profile.fundingRequirement));
    }
  }, [profile.businessType]);

  const total = items.reduce((s, i) => s + i.estimatedCost, 0);
  const capital = profile.availableCapital;

  // Subsidy calculation from actual PMEGP scheme data
  const pmegpResult = recommendations.find((r) => r.scheme.id === 'pmegp');
  const subsidyPct = ['sc', 'st', 'obc', 'minority'].includes(profile.category) ? 0.25 : 0.15;
  const potentialSubsidy = pmegpResult ? Math.min(Math.round(total * subsidyPct), 500000) : 0;
  const fundingGap = Math.max(0, total - capital - potentialSubsidy);
  const fullyFunded = total <= capital;

  const addItem = useCallback(() => {
    if (!newName || !newCost) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), category: newCat, name: newName, estimatedCost: Number(newCost), isEssential: false },
    ]);
    setNewName('');
    setNewCost('');
  }, [newName, newCost, newCat]);

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateAmount = (id: string, val: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, estimatedCost: val } : i)));

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2">
          <Calculator size={22} /> {t('planner_title', language as 'en')}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{t('planner_subtitle', language as 'en')}</p>
        {profile.businessType && (
          <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs text-blue-700 font-medium">
            📋 Cost template for: {profile.businessType}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cost Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-4">Cost Breakdown</h2>
            {categories.map((cat) => (
              <div key={cat} className="mb-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{cat}</p>
                <div className="space-y-2">
                  {items.filter((i) => i.category === cat).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 group">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          {item.isEssential && (
                            <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-medium">Essential</span>
                          )}
                        </div>
                      </div>
                      {editingId === item.id ? (
                        <input
                          className="input w-28 text-sm"
                          type="number"
                          value={item.estimatedCost}
                          onChange={(e) => updateAmount(item.id, Number(e.target.value))}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                        />
                      ) : (
                        <p
                          className="text-sm font-bold text-gray-900 cursor-pointer hover:text-[#1e3a5f] w-28 text-right"
                          onClick={() => setEditingId(item.id)}
                        >
                          {formatCurrency(item.estimatedCost)}
                        </p>
                      )}
                      <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Item Row */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 mb-3">Add Custom Item</p>
              <div className="flex flex-wrap gap-2">
                <select className="input text-xs w-auto flex-shrink-0" value={newCat} onChange={(e) => setNewCat(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input className="input flex-1 min-w-28 text-sm" placeholder="Item name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input className="input w-28 text-sm" type="number" placeholder="₹ Amount" value={newCost} onChange={(e) => setNewCost(e.target.value)} />
                <button onClick={addItem} className="btn-primary flex items-center gap-1 text-sm px-4">
                  <PlusCircle size={14} /> {t('add_item', language as 'en')}
                </button>
              </div>
            </div>
          </div>

          {/* EMI Calculator — initialized with actual funding gap */}
          <EMICalculator loanAmount={fundingGap > 0 ? fundingGap : (profile.fundingRequirement || 50000)} language={language} />
        </div>

        {/* Summary Column */}
        <div className="space-y-4">
          {/* Funding Summary */}
          <div className="card border-2 border-[#1e3a5f]/15">
            <h2 className="font-bold text-[#1e3a5f] mb-4">Funding Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('total_cost', language as 'en')}</span>
                <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('available_capital', language as 'en')}</span>
                <span className="font-bold text-green-600">{formatCurrency(capital)}</span>
              </div>
              {potentialSubsidy > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">PMEGP Subsidy (est.)</span>
                  <span className="font-bold text-emerald-600">−{formatCurrency(potentialSubsidy)}</span>
                </div>
              )}
              <div className="border-t-2 border-dashed border-gray-200 pt-2 flex justify-between">
                <span className="font-bold text-gray-700">{t('funding_gap', language as 'en')}</span>
                <span className={cn('font-extrabold text-lg', fullyFunded ? 'text-green-600' : 'text-red-600')}>
                  {fullyFunded ? 'Fully Covered ✓' : `−${formatCurrency(fundingGap)}`}
                </span>
              </div>
            </div>

            {/* Visual bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-3 bg-green-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, total > 0 ? Math.round((capital / total) * 100) : 0)}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 text-right">{total > 0 ? Math.min(100, Math.round((capital / total) * 100)) : 0}% self-funded</p>

            {!fullyFunded && fundingGap > 0 && (
              <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
                Your funding gap of <strong>{formatCurrency(fundingGap)}</strong> may be covered by a MUDRA or PMEGP loan. See matched schemes →
              </div>
            )}

            <button
              onClick={() => navigate('/documents')}
              className="btn-primary w-full justify-center mt-4 text-sm"
            >
              Next: Document Checklist <ArrowRight size={14} />
            </button>
          </div>

          {/* Recommended Schemes for Funding */}
          {recommendations.length > 0 && (
            <div className="card">
              <h3 className="font-bold text-[#1e3a5f] text-sm mb-3">Funding Schemes for Your Gap</h3>
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((r) => {
                  const maxF = r.scheme.fundingDetails.maxAmount ?? r.scheme.fundingDetails.maxAmountService ?? r.scheme.fundingDetails.tranche3 ?? 0;
                  return (
                    <button
                      key={r.scheme.id}
                      onClick={() => navigate(`/schemes/${r.scheme.id}`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{r.scheme.shortName}</p>
                        <p className="text-xs text-gray-400">Up to {formatCurrency(maxF)}</p>
                      </div>
                      <span className="text-xs font-bold text-green-600">{r.matchScore}%</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Support Stack — full width */}
      <div className="mt-6">
        <SupportStack
          capital={capital}
          loan={fundingGap > 0 ? Math.min(fundingGap, 500000) : 0}
          subsidy={potentialSubsidy}
          total={total}
          language={language}
        />
      </div>
    </div>
  );
}
