import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, User, MapPin, Briefcase, DollarSign, CheckCircle2 } from 'lucide-react';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
];

const BUSINESS_TYPES = [
  'Chai / Tea Stall', 'Food Cart / Tiffin Service', 'Tailoring / Embroidery',
  'Beauty Parlour / Salon', 'Handicraft / Artisan Work', 'Small Grocery / Kirana',
  'Mobile Repair Shop', 'Farming / Agri Processing', 'Transport / Auto Rickshaw',
  'Online Reselling', 'Bakery / Sweet Shop', 'Others',
];

const STEPS = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Location', icon: MapPin },
  { id: 3, label: 'Business', icon: Briefcase },
  { id: 4, label: 'Finance', icon: DollarSign },
];

export default function UserIntake() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', gender: '', category: '',
    state: 'Maharashtra', district: 'Mumbai', pincode: '',
    businessType: 'Chai / Tea Stall', businessStage: 'idea',
    monthlyRevenue: '25000', availableCapital: '40000',
    existingLoan: 'no', aadhaarVerified: true, panAvailable: false, bankAccount: true,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    navigate('/schemes');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#1e3a5f]">Tell Us About Your Business</h1>
          <p className="text-gray-500 text-sm mt-1">We use this information to match you with the right government schemes.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {STEPS.map(({ id, label, icon: Icon }, idx) => (
            <div key={id} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${step === id ? 'bg-[#1e3a5f] text-white' : step > id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                {step > id ? <CheckCircle2 size={13} /> : <Icon size={13} />}
                <span className="hidden sm:block">{label}</span>
              </div>
              {idx < STEPS.length - 1 && <div className={`h-0.5 w-4 sm:w-8 ${step > id ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card">
          {/* Step 1 – Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Personal Information</h2>
              <div>
                <label className="label">Full Name</label>
                <input className="input" placeholder="e.g., Rahul Kumar" value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Age</label>
                  <input className="input" type="number" placeholder="34" value={form.age} onChange={(e) => update('age', e.target.value)} />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select className="input" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Social Category</label>
                <select className="input" value={form.category} onChange={(e) => update('category', e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC (Other Backward Class)</option>
                  <option value="sc">SC (Scheduled Caste)</option>
                  <option value="st">ST (Scheduled Tribe)</option>
                  <option value="minority">Minority</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2 – Location */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Location Details</h2>
              <div>
                <label className="label">State</label>
                <select className="input" value={form.state} onChange={(e) => update('state', e.target.value)}>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">District / City</label>
                <input className="input" placeholder="e.g., Mumbai" value={form.district} onChange={(e) => update('district', e.target.value)} />
              </div>
              <div>
                <label className="label">Pincode</label>
                <input className="input" placeholder="400001" maxLength={6} value={form.pincode} onChange={(e) => update('pincode', e.target.value)} />
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                <strong>Why we need this:</strong> Many schemes are state-specific or have different subsidy rates by location.
              </div>
            </div>
          )}

          {/* Step 3 – Business */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Business Details</h2>
              <div>
                <label className="label">Type of Business</label>
                <select className="input" value={form.businessType} onChange={(e) => update('businessType', e.target.value)}>
                  {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Business Stage</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'idea', label: '💡 Just an Idea' },
                    { value: 'startup', label: '🚀 Just Started' },
                    { value: 'growing', label: '📈 Growing Business' },
                    { value: 'established', label: '🏪 Established' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update('businessStage', value)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium text-left transition-colors ${form.businessStage === value ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 – Finance */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Financial Details</h2>
              <div>
                <label className="label">Monthly Revenue / Income (₹)</label>
                <input className="input" type="number" placeholder="25000" value={form.monthlyRevenue} onChange={(e) => update('monthlyRevenue', e.target.value)} />
                <p className="text-xs text-gray-400 mt-1">Estimated or current monthly earnings from business</p>
              </div>
              <div>
                <label className="label">Available Capital to Invest (₹)</label>
                <input className="input" type="number" placeholder="40000" value={form.availableCapital} onChange={(e) => update('availableCapital', e.target.value)} />
              </div>
              <div>
                <label className="label">Existing Loan?</label>
                <select className="input" value={form.existingLoan} onChange={(e) => update('existingLoan', e.target.value)}>
                  <option value="no">No existing loan</option>
                  <option value="yes">Yes, I have an active loan</option>
                </select>
              </div>
              <div>
                <p className="label mb-2">Documents You Have</p>
                <div className="space-y-2">
                  {[
                    { key: 'aadhaarVerified', label: 'Aadhaar Card' },
                    { key: 'panAvailable', label: 'PAN Card' },
                    { key: 'bankAccount', label: 'Bank Account / Passbook' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#1e3a5f] rounded"
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={(e) => update(key, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={back} className="btn-secondary flex items-center gap-2">
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button onClick={next} className="btn-primary flex items-center gap-2">
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-green flex items-center gap-2">
                Find My Schemes <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
