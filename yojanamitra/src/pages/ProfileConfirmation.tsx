import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowRight,
  ChevronLeft,
  Edit3,
  Building2,
  MapPin,
  Wallet,
  TrendingUp,
  Users,
  User,
  Calendar,
  GraduationCap,
  Briefcase,
  Check,
  ShieldCheck,
} from 'lucide-react';

import { useAppStore } from '../hooks/useAppStore';
import { t } from '../services/i18n';
import { formatCurrency, cn } from '../utils';

import type {
  BusinessStage,
  Category,
  UserProfile,
} from '../types';


// ─────────────────────────────────────────────────────────────
// LABELS
// ─────────────────────────────────────────────────────────────

const STAGE_LABELS: Record<BusinessStage, string> = {
  idea: 'New / Idea Stage',
  startup: 'Just Started (<1 yr)',
  growing: 'Growing (1–3 yrs)',
  established: 'Established (3+ yrs)',
};

const STAGE_LABELS_HI: Record<BusinessStage, string> = {
  idea: 'नया / विचार चरण',
  startup: 'अभी शुरू (<1 वर्ष)',
  growing: 'बढ़ रहा है (1–3 वर्ष)',
  established: 'स्थापित (3+ वर्ष)',
};


const CATEGORY_LABELS: Record<Category, string> = {
  general: 'General',
  sc: 'SC',
  st: 'ST',
  obc: 'OBC',
  minority: 'Minority',
  safai_karamchari: 'Safai Karamchari',
  denotified_nomadic_tribe: 'Denotified / Nomadic Tribe',
  pwd: 'PwD',
};

const CATEGORY_LABELS_HI: Record<Category, string> = {
  general: 'सामान्य',
  sc: 'SC',
  st: 'ST',
  obc: 'OBC',
  minority: 'अल्पसंख्यक',
  safai_karamchari: 'सफाई कर्मचारी',
  denotified_nomadic_tribe: 'विमुक्त / घुमंतू',
  pwd: 'PwD (दिव्यांग)',
};


const EDU_LABELS: Record<string, string> = {
  no_formal: 'No Formal Education',
  primary: 'Primary (1–5)',
  '8th_pass': '8th Pass',
  '10th_pass': '10th Pass',
  '12th_pass': '12th Pass',
  graduate: 'Graduate',
  postgraduate: 'Post-Graduate',
};

const EDU_LABELS_HI: Record<string, string> = {
  no_formal: 'कोई शिक्षा नहीं',
  primary: 'प्राथमिक',
  '8th_pass': '8वीं पास',
  '10th_pass': '10वीं पास',
  '12th_pass': '12वीं पास',
  graduate: 'स्नातक',
  postgraduate: 'स्नातकोत्तर',
};


// ─────────────────────────────────────────────────────────────
// ELIGIBILITY TOGGLES
// ─────────────────────────────────────────────────────────────

const TOGGLES = [
  {
    key: 'isStreetVendor',
    en: 'Street Vendor',
    hi: 'स्ट्रीट वेंडर',
  },
  {
    key: 'aadhaarVerified',
    en: 'Aadhaar Available',
    hi: 'आधार उपलब्ध',
  },
  {
    key: 'panAvailable',
    en: 'PAN Available',
    hi: 'PAN उपलब्ध',
  },
  {
    key: 'bankAccount',
    en: 'Bank Account',
    hi: 'बैंक खाता',
  },
  {
    key: 'existingLoan',
    en: 'Existing Loan',
    hi: 'मौजूदा ऋण',
  },
  {
    key: 'hasCIBILDefault',
    en: 'CIBIL Default',
    hi: 'CIBIL डिफ़ॉल्ट',
  },
  {
    key: 'previousPMEGPBeneficiary',
    en: 'Previous PMEGP Beneficiary',
    hi: 'पूर्व PMEGP लाभार्थी',
  },
  {
    key: 'casteCertificateAvailable',
    en: 'Caste Certificate',
    hi: 'जाति प्रमाणपत्र',
  },
  {
    key: 'hasStreetVendorCertificate',
    en: 'Vendor Certificate (CoV)',
    hi: 'वेंडर प्रमाणपत्र',
  },
];


// ─────────────────────────────────────────────────────────────
// FIELD TYPE
// ─────────────────────────────────────────────────────────────

interface FieldDef {
  label: string;
  labelHi: string;
  field: keyof UserProfile;
  type: 'text' | 'number' | 'select';
  options?: {
    value: string;
    label: string;
  }[];
  icon: React.ElementType;
}


// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ProfileConfirmation() {
  const navigate = useNavigate();

  const {
    profile,
    updateProfile,
    language,
  } = useAppStore();

  const [editingField, setEditingField] =
    useState<keyof UserProfile | null>(null);

  const [tempValue, setTempValue] = useState('');


  const isHi = language === 'hi';


  // ───────────────────────────────────────────────────────────
  // OPTIONS
  // ───────────────────────────────────────────────────────────

  const stageLabels =
    isHi ? STAGE_LABELS_HI : STAGE_LABELS;

  const categoryLabels =
    isHi ? CATEGORY_LABELS_HI : CATEGORY_LABELS;

  const educationLabels =
    isHi ? EDU_LABELS_HI : EDU_LABELS;


  const occupationOptions = [
    {
      value: 'street_vendor',
      label: isHi ? 'स्ट्रीट वेंडर' : 'Street Vendor',
    },
    {
      value: 'unemployed',
      label: isHi
        ? 'बेरोजगार'
        : 'Unemployed / Looking to start',
    },
    {
      value: 'traditional_artisan',
      label: isHi
        ? 'पारंपरिक कारीगर'
        : 'Traditional Artisan',
    },
    {
      value: 'self_employed_informal',
      label: isHi
        ? 'स्व-नियोजित'
        : 'Self-employed (Informal)',
    },
    {
      value: 'farmer',
      label: isHi ? 'किसान' : 'Farmer',
    },
    {
      value: 'salaried',
      label: isHi ? 'वेतनभोगी' : 'Salaried',
    },
    {
      value: 'any',
      label: isHi ? 'अन्य' : 'Other',
    },
  ];


  const genderOptions = [
    {
      value: 'female',
      label: isHi ? 'महिला' : 'Female',
    },
    {
      value: 'male',
      label: isHi ? 'पुरुष' : 'Male',
    },
    {
      value: 'other',
      label: isHi ? 'अन्य' : 'Other',
    },
    {
      value: 'prefer_not_to_say',
      label: isHi
        ? 'बताना नहीं चाहते'
        : 'Prefer not to say',
    },
  ];


  const stageOptions = (
    [
      'idea',
      'startup',
      'growing',
      'established',
    ] as BusinessStage[]
  ).map((stage) => ({
    value: stage,
    label: stageLabels[stage],
  }));


  const categoryOptions = Object.entries(categoryLabels).map(
    ([value, label]) => ({
      value,
      label,
    })
  );


  const educationOptions = Object.keys(EDU_LABELS).map(
    (value) => ({
      value,
      label: educationLabels[value] ?? value,
    })
  );


  // ───────────────────────────────────────────────────────────
  // FORM SECTIONS
  // ───────────────────────────────────────────────────────────

  type SectionDef = {
    title: string;
    titleHi: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    fields: FieldDef[];
  };


  const sections: SectionDef[] = [
    {
      title: 'Business Information',
      titleHi: 'व्यवसाय जानकारी',
      icon: Building2,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',

      fields: [
        {
          label: 'Business Type',
          labelHi: 'व्यवसाय प्रकार',
          field: 'businessType',
          type: 'text',
          icon: Building2,
        },

        {
          label: 'Business Stage',
          labelHi: 'व्यवसाय स्थिति',
          field: 'businessStage',
          type: 'select',
          icon: TrendingUp,
          options: stageOptions,
        },
      ],
    },


    {
      title: 'Location Details',
      titleHi: 'स्थान विवरण',
      icon: MapPin,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',

      fields: [
        {
          label: 'District / City',
          labelHi: 'जिला / शहर',
          field: 'district',
          type: 'text',
          icon: MapPin,
        },

        {
          label: 'State',
          labelHi: 'राज्य',
          field: 'state',
          type: 'text',
          icon: MapPin,
        },
      ],
    },


    {
      title: 'Financial Details',
      titleHi: 'वित्तीय विवरण',
      icon: Wallet,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',

      fields: [
        {
          label: 'Available Capital',
          labelHi: 'उपलब्ध पूंजी',
          field: 'availableCapital',
          type: 'number',
          icon: Wallet,
        },

        {
          label: 'Funding Required',
          labelHi: 'वित्तपोषण आवश्यक',
          field: 'fundingRequirement',
          type: 'number',
          icon: Wallet,
        },

        {
          label: 'Monthly Income',
          labelHi: 'मासिक आय',
          field: 'monthlyRevenue',
          type: 'number',
          icon: TrendingUp,
        },
      ],
    },


    {
      title: 'Personal & Demographics',
      titleHi: 'व्यक्तिगत और सामाजिक',
      icon: Users,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',

      fields: [
        {
          label: 'Category',
          labelHi: 'सामाजिक वर्ग',
          field: 'category',
          type: 'select',
          icon: Users,
          options: categoryOptions,
        },

        {
          label: 'Age',
          labelHi: 'आयु',
          field: 'age',
          type: 'number',
          icon: Calendar,
        },

        {
          label: 'Gender',
          labelHi: 'लिंग',
          field: 'gender',
          type: 'select',
          icon: User,
          options: genderOptions,
        },

        {
          label: 'Occupation',
          labelHi: 'व्यवसाय',
          field: 'occupation',
          type: 'select',
          icon: Briefcase,
          options: occupationOptions,
        },

        {
          label: 'Education',
          labelHi: 'शिक्षा',
          field: 'educationLevel',
          type: 'select',
          icon: GraduationCap,
          options: educationOptions,
        },
      ],
    },
  ];


  // ───────────────────────────────────────────────────────────
  // DISPLAY VALUE
  // ───────────────────────────────────────────────────────────

  const getDisplayValue = (
    field: FieldDef
  ): string | null => {

    const value = profile[field.field];

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return null;
    }


    if (
      field.field === 'availableCapital' ||
      field.field === 'fundingRequirement' ||
      field.field === 'monthlyRevenue'
    ) {
      return formatCurrency(Number(value));
    }


    if (field.field === 'businessStage') {
      return (
        stageLabels[value as BusinessStage] ??
        String(value)
      );
    }


    if (field.field === 'category') {
      return (
        categoryLabels[value as Category] ??
        String(value)
      );
    }


    if (field.field === 'educationLevel') {
      return (
        educationLabels[String(value)] ??
        String(value)
      );
    }


    if (field.type === 'select') {
      return (
        field.options?.find(
          (option) => option.value === String(value)
        )?.label ??
        String(value).replace(/_/g, ' ')
      );
    }


    return String(value).replace(/_/g, ' ');
  };


  // ───────────────────────────────────────────────────────────
  // EDIT
  // ───────────────────────────────────────────────────────────

  const startEdit = (
    field: keyof UserProfile
  ) => {

    setEditingField(field);

    const value = profile[field];

    setTempValue(
      value !== null && value !== undefined
        ? String(value)
        : ''
    );
  };


  const saveEdit = () => {

    if (!editingField) return;

    const allFields = sections.flatMap(
      (section) => section.fields
    );

    const field = allFields.find(
      (item) => item.field === editingField
    );


    updateProfile({
      [editingField]:
        field?.type === 'number'
          ? Number(tempValue)
          : tempValue,
    } as Partial<UserProfile>);


    setEditingField(null);
  };


  // ───────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('/profile-background.png')",
      }}
    >

      {/* Soft overlay so the form stays readable */}
      <div className="min-h-screen bg-white/30">

        {/* ──────────────────────────────────────────────── */}
        {/* HEADER */}
        {/* ──────────────────────────────────────────────── */}

        <header className="">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">

            <button
              onClick={() => navigate('/intake')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] hover:text-orange-600 transition-colors mb-5"
            >
              <ChevronLeft size={17} />

              {t('back', language)}
            </button>


            <div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17233c] tracking-tight">
                {isHi
                  ? 'अपनी प्रोफ़ाइल की समीक्षा करें'
                  : 'Review Your Profile'}
              </h1>

              <p className="mt-1.5 text-sm sm:text-base text-[#52627a]">
                {isHi
                  ? 'योजनाएं खोजने से पहले अपनी जानकारी जांचें और आवश्यक बदलाव करें।'
                  : 'Check your information and make any necessary changes before finding schemes.'}
              </p>


              {/* Small decorative line */}
              <div className="flex items-center gap-1 mt-4">

              

              </div>

            </div>

          </div>

        </header>


        {/* ──────────────────────────────────────────────── */}
        {/* MAIN FORM */}
        {/* ──────────────────────────────────────────────── */}

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white shadow-xl shadow-slate-900/10 overflow-hidden">


            {/* ──────────────────────────────────────────── */}
            {/* PROFILE SECTIONS */}
            {/* ──────────────────────────────────────────── */}

            {sections.map((section, sectionIndex) => {

              const SectionIcon = section.icon;


              return (
                <section
                  key={section.title}
                  className={cn(
                    sectionIndex > 0 &&
                    'border-t border-slate-200'
                  )}
                >

                  {/* Section heading */}
                  <div className="px-5 sm:px-7 pt-6 pb-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={cn(
                          'w-9 h-9 rounded-xl flex items-center justify-center',
                          section.iconBg
                        )}
                      >
                        <SectionIcon
                          size={17}
                          className={section.iconColor}
                        />
                      </div>


                      <h2 className="text-base sm:text-lg font-bold text-[#1e3a5f]">
                        {isHi
                          ? section.titleHi
                          : section.title}
                      </h2>

                    </div>

                  </div>


                  {/* Fields */}
                  <div className="px-5 sm:px-7 pb-6">

                    <div
                      className={cn(
                        'grid gap-5',
                        section.fields.length === 2
                          ? 'sm:grid-cols-2'
                          : 'sm:grid-cols-2 lg:grid-cols-3'
                      )}
                    >

                      {section.fields.map((field) => {

                        const display =
                          getDisplayValue(field);

                        const isEditing =
                          editingField === field.field;


                        return (
                          <div key={field.field}>

                            {/* Label */}
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                              {isHi
                                ? field.labelHi
                                : field.label}
                            </label>


                            {/* Field */}
                            <div className="flex gap-2">

                              <div
                                className={cn(
                                  'flex-1 min-w-0 min-h-[46px] rounded-xl border flex items-center px-3.5 transition-all',
                                  isEditing
                                    ? 'bg-white border-blue-400 ring-2 ring-blue-100'
                                    : 'bg-slate-50/80 border-slate-200'
                                )}
                              >

                                {isEditing ? (

                                  field.type === 'select' &&
                                  field.options ? (

                                    <select
                                      autoFocus
                                      value={tempValue}
                                      onChange={(event) =>
                                        setTempValue(
                                          event.target.value
                                        )
                                      }
                                      className="w-full bg-transparent outline-none text-sm font-medium text-slate-800"
                                    >

                                      {field.options.map(
                                        (option) => (
                                          <option
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        )
                                      )}

                                    </select>

                                  ) : (

                                    <input
                                      autoFocus
                                      type={field.type}
                                      value={tempValue}
                                      onChange={(event) =>
                                        setTempValue(
                                          event.target.value
                                        )
                                      }
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === 'Enter'
                                        ) {
                                          saveEdit();
                                        }
                                      }}
                                      className="w-full bg-transparent outline-none text-sm font-medium text-slate-800"
                                    />

                                  )

                                ) : (

                                  <span
                                    className={cn(
                                      'text-sm font-semibold truncate',
                                      display
                                        ? 'text-slate-800'
                                        : 'text-slate-400 italic font-normal'
                                    )}
                                  >
                                    {display ??
                                      (isHi
                                        ? 'दर्ज नहीं'
                                        : 'Not entered')}
                                  </span>

                                )}

                              </div>


                              {/* Edit / Save */}
                              {isEditing ? (

                                <button
                                  onClick={saveEdit}
                                  className="px-3 rounded-xl bg-[#1e3a5f] text-white text-xs font-bold hover:bg-[#152b48] transition-colors"
                                >
                                  {t(
                                    'save',
                                    language
                                  )}
                                </button>

                              ) : (

                                <button
                                  onClick={() =>
                                    startEdit(
                                      field.field
                                    )
                                  }
                                  className="flex items-center gap-1.5 px-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-colors"
                                >
                                  <Edit3 size={12} />

                                  {t(
                                    'edit',
                                    language
                                  )}
                                </button>

                              )}

                            </div>


                            {/* Cancel while editing */}
                            {isEditing && (
                              <button
                                onClick={() =>
                                  setEditingField(null)
                                }
                                className="mt-2 text-xs text-slate-500 hover:text-slate-800"
                              >
                                {t(
                                  'cancel',
                                  language
                                )}
                              </button>
                            )}

                          </div>
                        );

                      })}

                    </div>

                  </div>

                </section>
              );

            })}


            {/* ──────────────────────────────────────────── */}
            {/* ELIGIBILITY */}
            {/* ──────────────────────────────────────────── */}

            <section className="border-t border-slate-200">

              <div className="px-5 sm:px-7 pt-6 pb-4">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">

                    <ShieldCheck
                      size={18}
                      className="text-emerald-600"
                    />

                  </div>


                  <div>

                    <h2 className="text-base sm:text-lg font-bold text-[#1e3a5f]">
                      {isHi
                        ? 'पात्रता और दस्तावेज़'
                        : 'Eligibility & Documents'}
                    </h2>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {isHi
                        ? 'अपनी जानकारी के अनुसार विकल्प चुनें'
                        : 'Select the options that apply to you'}
                    </p>

                  </div>

                </div>

              </div>


              <div className="px-5 sm:px-7 pb-7">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                  {TOGGLES.map(
                    ({
                      key,
                      en,
                      hi,
                    }) => {

                      const checked =
                        !!(
                          profile as unknown as Record<
                            string,
                            unknown
                          >
                        )[key];


                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() =>
                            updateProfile({
                              [key]: !checked,
                            } as Partial<UserProfile>)
                          }
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                            checked
                              ? 'bg-emerald-50 border-emerald-200'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          )}
                        >

                          <div
                            className={cn(
                              'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border',
                              checked
                                ? 'bg-emerald-500 border-emerald-500'
                                : 'bg-white border-slate-300'
                            )}
                          >

                            {checked && (
                              <Check
                                size={12}
                                className="text-white"
                              />
                            )}

                          </div>


                          <span
                            className={cn(
                              'text-xs sm:text-sm font-semibold',
                              checked
                                ? 'text-slate-800'
                                : 'text-slate-500'
                            )}
                          >
                            {isHi ? hi : en}
                          </span>

                        </button>
                      );

                    }
                  )}

                </div>

              </div>

            </section>


            {/* ──────────────────────────────────────────── */}
            {/* CTA */}
            {/* ──────────────────────────────────────────── */}

            <div className="border-t border-slate-200 px-5 sm:px-7 py-6 bg-slate-50/60">

              <button
                onClick={() => navigate('/schemes')}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
              >

                <span>
                  {t('confirm', language)}
                </span>

                <ArrowRight size={18} />

              </button>


              <p className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-500">

                <ShieldCheck
                  size={13}
                  className="text-emerald-500"
                />

                {isHi
                  ? 'आपकी प्रोफ़ाइल का उपयोग उपयुक्त सरकारी योजनाएं खोजने के लिए किया जाएगा।'
                  : 'Your profile will be used to find suitable government schemes.'}

              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}