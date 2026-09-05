import React, { useState } from 'react';
import { 
  UserPlus, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Landmark, 
  FileText, 
  Building2,
  Check
} from 'lucide-react';
import { FarmerProfile, BankAccount, ScreenId } from '../../types';

interface RegistrationViewProps {
  initialFarmer: FarmerProfile;
  onCompleteRegistration: (farmer: FarmerProfile, bankAccount: BankAccount) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const RegistrationView: React.FC<RegistrationViewProps> = ({
  initialFarmer,
  onCompleteRegistration,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Personal & Farm Form State
  const [fullName, setFullName] = useState(initialFarmer.name);
  const [dob, setDob] = useState(initialFarmer.dob);
  const [mobile, setMobile] = useState(initialFarmer.mobile);
  const [email, setEmail] = useState(initialFarmer.email);
  const [address, setAddress] = useState(initialFarmer.address);
  const [village, setVillage] = useState(initialFarmer.village);
  const [district, setDistrict] = useState(initialFarmer.district);
  const [state, setState] = useState(initialFarmer.state);
  const [farmerType, setFarmerType] = useState(initialFarmer.farmerType);
  const [landArea, setLandArea] = useState<number>(initialFarmer.landArea);
  const [soilType, setSoilType] = useState(initialFarmer.soilType);
  const [aadhaarFile, setAadhaarFile] = useState<string | null>('aadhaar_card_verified.pdf');
  const [landDocFile, setLandDocFile] = useState<string | null>('7_12_extract_pune.pdf');

  // Step 2: Bank Form State
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountType, setAccountType] = useState<'Savings Account' | 'Current Account'>('Savings Account');
  const [accountNumber, setAccountNumber] = useState('5010042894567');
  const [ifsc, setIfsc] = useState('SBIN0001234');

  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFarmer: FarmerProfile = {
      ...initialFarmer,
      name: fullName,
      dob,
      mobile,
      email,
      address,
      village,
      district,
      state,
      farmerType: farmerType as any,
      landArea: Number(landArea),
      soilType,
      isVerified: true,
    };

    const newBank: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName,
      accountType,
      accountNumberMasked: `•••• •••• ${accountNumber.slice(-4)}`,
      accountNumberFull: accountNumber,
      holderName: fullName,
      ifsc,
      isPrimary: true,
      themeColor: 'blue',
    };

    onCompleteRegistration(updatedFarmer, newBank);
    onNavigate('dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Toast */}
      {isDraftSaved && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-2xl flex items-center gap-2 font-semibold text-[14px]">
          <CheckCircle2 className="w-5 h-5 text-[#137333]" />
          <span>Registration draft saved locally.</span>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#c1c8c2] bg-gradient-to-r from-[#012d1d] via-[#1b4332] to-[#274e3d] text-white p-6 sm:p-8">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEhtxifJRqR2fcQH0yweElJ9y8CEFtn8YbqPGwkqTrr17kE3iIYNBTR31uOVXK4DB5VTnxNUazLcnCYuPNKrOQGTVRyVqC5JQk5m84IBHpUkc0VWUQrh6Mg1YpTchE6a8xCknRVvYt6sqhUpwNa9lU2TMTpSdyGEhgqTBYbWT5UPxdJXyeGWZDsCy2Hx0AwSuzXAYKAnejrpEwiBIn4EsxbBHKxHwPU1i90lDbpAFhXJpukI7g12ps"
            alt="Farming Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c1ecd4]/20 border border-[#c1ecd4]/40 text-[#c1ecd4] text-[11px] font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Direct Government Onboarding
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-extrabold font-headline">
            Empowering India's Farmers
          </h1>
          <p className="text-[14px] text-[#e1e3e4]">
            Official registration portal for agricultural subsidies, procurement delivery passes, and direct bank transfers.
          </p>
        </div>
      </div>

      {/* Stepper Header */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`p-4 rounded-2xl border text-center transition-all ${
          currentStep === 1
            ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
            : currentStep > 1
            ? 'bg-[#c1ecd4] text-[#002114] border-[#1b4332]'
            : 'bg-white text-[#717973] border-[#c1c8c2]'
        }`}>
          <span className="text-[11px] uppercase font-bold tracking-wider block">Step 1</span>
          <p className="font-bold text-[14px] mt-0.5">Personal & Farm</p>
        </div>

        <div className={`p-4 rounded-2xl border text-center transition-all ${
          currentStep === 2
            ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
            : currentStep > 2
            ? 'bg-[#c1ecd4] text-[#002114] border-[#1b4332]'
            : 'bg-white text-[#717973] border-[#c1c8c2]'
        }`}>
          <span className="text-[11px] uppercase font-bold tracking-wider block">Step 2</span>
          <p className="font-bold text-[14px] mt-0.5">Bank Payouts</p>
        </div>

        <div className={`p-4 rounded-2xl border text-center transition-all ${
          currentStep === 3
            ? 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
            : 'bg-white text-[#717973] border-[#c1c8c2]'
        }`}>
          <span className="text-[11px] uppercase font-bold tracking-wider block">Step 3</span>
          <p className="font-bold text-[14px] mt-0.5">Review & Confirm</p>
        </div>
      </div>

      {/* Step 1: Personal & Farm Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
            <div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Personal Information</h3>
              <p className="text-[13px] text-[#717973]">Identity as registered on Government Aadhaar</p>
            </div>
            <span className="px-3 py-1 bg-[#f8f9fa] border border-[#c1c8c2] text-[#012d1d] font-mono text-[12px] font-bold rounded-xl">
              ID: {initialFarmer.id}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Address Line</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Village</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#edeeef] space-y-4">
            <div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Land & Farm Holding</h3>
              <p className="text-[13px] text-[#717973]">Agricultural holding size and soil profile</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Farmer Classification</label>
                <select
                  value={farmerType}
                  onChange={(e) => setFarmerType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="Small / Marginal (Up to 2 Hectares)">Small / Marginal (Up to 2 Ha)</option>
                  <option value="Large (Above 2 Hectares)">Large (Above 2 Ha)</option>
                  <option value="Tenant Farmer">Tenant Farmer</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Total Land Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Primary Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="Black Cotton">Black Cotton Soil</option>
                  <option value="Red Loamy">Red Loamy Soil</option>
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Laterite">Laterite Soil</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Upload Mockups */}
          <div className="pt-6 border-t border-[#edeeef] space-y-4">
            <div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Document Verification Uploads</h3>
              <p className="text-[13px] text-[#717973]">Upload your Aadhaar ID and 7/12 Land Record copy</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-dashed border-[#c1c8c2] hover:border-[#1b4332] rounded-2xl bg-[#f8f9fa] text-center space-y-2 cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 text-[#1b4332] mx-auto" />
                <p className="text-[13px] font-bold text-[#191c1d]">Aadhaar Card (PDF / JPG)</p>
                <p className="text-[11px] text-[#717973]">{aadhaarFile || 'Drag & Drop or browse file'}</p>
                <span className="inline-block px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                  Verified
                </span>
              </div>

              <div className="p-4 border-2 border-dashed border-[#c1c8c2] hover:border-[#1b4332] rounded-2xl bg-[#f8f9fa] text-center space-y-2 cursor-pointer transition-colors">
                <FileText className="w-8 h-8 text-[#7d562d] mx-auto" />
                <p className="text-[13px] font-bold text-[#191c1d]">7/12 Extract Record</p>
                <p className="text-[11px] text-[#717973]">{landDocFile || 'Drag & Drop or browse file'}</p>
                <span className="inline-block px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#edeeef] flex justify-between items-center">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-2.5 text-[#414844] font-semibold text-[13px] rounded-xl hover:bg-[#edeeef]"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Bank Details</span>
              <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Bank Details Form */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
          <div>
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Bank Account for DBT Payouts</h3>
            <p className="text-[13px] text-[#717973]">Enter your official savings or current account details</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Bank Name</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
              >
                <option value="State Bank of India">State Bank of India</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-mono font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="Savings Account">Savings Account</option>
                  <option value="Current Account">Current Account</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#edeeef] flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 text-[#414844] font-semibold text-[13px] rounded-xl hover:bg-[#edeeef] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Review Details</span>
              <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Confirmation */}
      {currentStep === 3 && (
        <form onSubmit={handleFinish} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
          <div>
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Review & Finalize Registration</h3>
            <p className="text-[13px] text-[#717973]">Please review all entered farmer details before final submission.</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-3">
              <h4 className="text-[14px] font-bold text-[#012d1d]">Farmer & Land Record Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[13px]">
                <div>
                  <span className="text-[11px] text-[#717973] block">Name</span>
                  <span className="font-bold">{fullName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Mobile</span>
                  <span className="font-bold">{mobile}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Location</span>
                  <span className="font-bold">{village}, {district}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Total Land</span>
                  <span className="font-bold">{landArea} Acres</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Soil Type</span>
                  <span className="font-bold">{soilType}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Farmer Class</span>
                  <span className="font-bold">{farmerType.split('(')[0]}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-3">
              <h4 className="text-[14px] font-bold text-[#012d1d]">Payout Account Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[13px]">
                <div>
                  <span className="text-[11px] text-[#717973] block">Bank Name</span>
                  <span className="font-bold">{bankName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">Account Number</span>
                  <span className="font-mono font-bold">•••• •••• {accountNumber.slice(-4)}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#717973] block">IFSC Code</span>
                  <span className="font-mono font-bold">{ifsc}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#c1ecd4]/20 border border-[#1b4332]/30 rounded-2xl text-[12px] text-[#274e3d] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1b4332] shrink-0" />
            <span>By submitting, you certify that all information is correct and linked to your valid Aadhaar and 7/12 records.</span>
          </div>

          <div className="pt-6 border-t border-[#edeeef] flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 text-[#414844] font-semibold text-[13px] rounded-xl hover:bg-[#edeeef] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Check className="w-5 h-5 text-[#c1ecd4]" />
              <span>Complete & Activate Profile</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
