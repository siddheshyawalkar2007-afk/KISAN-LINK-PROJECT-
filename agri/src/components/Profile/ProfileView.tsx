import React, { useState } from 'react';
import { 
  User, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Edit3, 
  Save, 
  Building2,
  Sprout,
  Landmark,
  Plus,
  Trash2,
  AlertCircle,
  X,
  CreditCard
} from 'lucide-react';
import { FarmerProfile, BankAccount, ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface ProfileViewProps {
  farmer: FarmerProfile;
  bankAccounts?: BankAccount[];
  onUpdateFarmer: (updated: FarmerProfile) => void;
  onAddBankAccount?: (account: BankAccount) => void;
  onSetPrimaryBank?: (id: string) => void;
  onDeleteBankAccount?: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  initialTab?: 'profile' | 'banks';
  language?: Language;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  farmer,
  bankAccounts = [],
  onUpdateFarmer,
  onAddBankAccount,
  onSetPrimaryBank,
  onDeleteBankAccount,
  onNavigate,
  initialTab = 'profile',
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'profile' | 'banks'>(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(farmer.name);
  const [mobile, setMobile] = useState(farmer.mobile);
  const [email, setEmail] = useState(farmer.email);
  const [address, setAddress] = useState(farmer.address);
  const [village, setVillage] = useState(farmer.village);
  const [district, setDistrict] = useState(farmer.district);
  const [landArea, setLandArea] = useState<number>(farmer.landArea);
  const [soilType, setSoilType] = useState(farmer.soilType);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Bank Add Modal States
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountType, setAccountType] = useState<'Savings Account' | 'Current Account'>('Savings Account');
  const [holderName, setHolderName] = useState(farmer.name);
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [makePrimary, setMakePrimary] = useState(false);
  const [bankErrorMsg, setBankErrorMsg] = useState('');
  const [bankSuccessMsg, setBankSuccessMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFarmer({
      ...farmer,
      name,
      mobile,
      email,
      address,
      village,
      district,
      landArea: Number(landArea),
      soilType,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber !== confirmAccountNumber) {
      setBankErrorMsg('Account numbers do not match!');
      return;
    }
    if (accountNumber.length < 8) {
      setBankErrorMsg('Please enter a valid account number.');
      return;
    }

    const masked = `•••• •••• ${accountNumber.slice(-4)}`;
    const newAccount: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName,
      accountType,
      accountNumberMasked: masked,
      accountNumberFull: accountNumber,
      holderName,
      ifsc: ifsc.toUpperCase(),
      isPrimary: makePrimary || bankAccounts.length === 0,
      themeColor: 'blue',
    };

    if (onAddBankAccount) {
      onAddBankAccount(newAccount);
    }
    setShowAddBankModal(false);
    setAccountNumber('');
    setConfirmAccountNumber('');
    setBankErrorMsg('');
    setBankSuccessMsg('New bank account successfully linked for direct DBT transfers!');
    setTimeout(() => setBankSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Toast Messages */}
      {savedSuccess && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-2xl flex items-center gap-2 font-semibold text-[14px]">
          <CheckCircle2 className="w-5 h-5 text-[#137333]" />
          <span>Profile changes successfully updated in National Farmer Registry!</span>
        </div>
      )}

      {bankSuccessMsg && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-2xl flex items-center gap-2 font-semibold text-[14px]">
          <CheckCircle2 className="w-5 h-5 text-[#137333]" />
          <span>{bankSuccessMsg}</span>
        </div>
      )}

      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={farmer.avatarUrl}
              alt={farmer.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#1b4332]"
            />
            {farmer.isVerified && (
              <span className="absolute bottom-0 right-0 p-1.5 bg-[#137333] text-white rounded-full border-2 border-white shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[24px] font-extrabold font-headline text-[#191c1d]">{farmer.name}</h2>
              <span className="px-3 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-extrabold rounded-full">
                8A & Aadhaar Verified
              </span>
            </div>
            <p className="text-[13px] font-mono text-[#414844] mt-0.5">Farmer ID: {farmer.id}</p>
            <p className="text-[13px] text-[#717973] flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#7d562d]" /> {farmer.village}, {farmer.district}, {farmer.state}
            </p>
          </div>
        </div>

        {/* Tab Navigation Pill Group */}
        <div className="flex bg-[#f8f9fa] p-1.5 rounded-2xl border border-[#c1c8c2]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#012d1d] text-white shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Land</span>
          </button>
          <button
            onClick={() => setActiveTab('banks')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'banks'
                ? 'bg-[#012d1d] text-white shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Bank Accounts & DBT ({bankAccounts.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Profile & Land Details */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
            <div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Government Registered Details</h3>
              <p className="text-[12px] text-[#717973] mt-0.5">Synchronized with Mahabhulekh & UIDAI National Registry</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[13px] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit3 className="w-4 h-4 text-[#c1ecd4]" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] font-semibold text-[13px] rounded-xl transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Contact Number</span>
                <p className="font-bold text-[#191c1d]">{farmer.mobile}</p>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Email Address</span>
                <p className="font-bold text-[#191c1d]">{farmer.email || 'Not provided'}</p>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Residential Address</span>
                <p className="font-bold text-[#191c1d]">{farmer.address}, {farmer.village}</p>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Land Holding Size</span>
                <p className="font-bold text-[#191c1d]">{farmer.landArea} Hectares (Khata: KH-1024/2024)</p>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Soil Profile</span>
                <p className="font-bold text-[#191c1d]">{farmer.soilType} ({farmer.region} Region)</p>
              </div>

              <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
                <span className="text-[11px] text-[#717973] uppercase font-bold">Agriculture License</span>
                <p className="font-bold font-mono text-[#012d1d]">{farmer.licenseNumber}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Total Land Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={landArea}
                    onChange={(e) => setLandArea(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Village</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4 text-[#c1ecd4]" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: Bank Accounts & DBT Payout Management */}
      {activeTab === 'banks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#edeeef]">
              <div>
                <h3 className="text-[20px] font-bold font-headline text-[#012d1d] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#1b4332]" />
                  <span>Linked Bank Accounts & DBT Payouts</span>
                </h3>
                <p className="text-[13px] text-[#414844] mt-0.5">
                  Select which verified bank account receives direct crop MSP subsidies and payments.
                </p>
              </div>

              <button
                onClick={() => setShowAddBankModal(true)}
                className="px-4 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[13px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bank Account</span>
              </button>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-[#c1ecd4]/25 border border-[#1b4332]/30 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#137333] shrink-0" />
              <p className="text-[13px] text-[#274e3d] leading-relaxed">
                All accounts are validated with the National Payments Corporation of India (NPCI) and PFMS Aadhaar-linked bridge for direct farmer subsidy deposits.
              </p>
            </div>

            {/* Bank Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`rounded-3xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
                    account.isPrimary
                      ? 'bg-gradient-to-br from-[#012d1d] to-[#1b4332] text-white border-[#1b4332] shadow-md'
                      : 'bg-[#f8f9fa] text-[#191c1d] border-[#c1c8c2] shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 rounded-xl ${account.isPrimary ? 'bg-[#c1ecd4] text-[#002114]' : 'bg-white text-[#012d1d] border border-[#c1c8c2]'}`}>
                          <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold font-headline text-[17px]">{account.bankName}</h3>
                          <span className={`text-[12px] ${account.isPrimary ? 'text-[#c1ecd4]' : 'text-[#717973]'}`}>
                            {account.accountType}
                          </span>
                        </div>
                      </div>

                      {account.isPrimary ? (
                        <span className="px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[11px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" /> Primary
                        </span>
                      ) : (
                        onSetPrimaryBank && (
                          <button
                            onClick={() => onSetPrimaryBank(account.id)}
                            className="text-[12px] font-bold text-[#7d562d] hover:underline cursor-pointer"
                          >
                            Set as Primary
                          </button>
                        )
                      )}
                    </div>

                    {/* Masked Account Number */}
                    <div className="my-4 space-y-1">
                      <span className={`text-[11px] uppercase font-bold tracking-widest ${account.isPrimary ? 'text-[#c1ecd4]' : 'text-[#717973]'}`}>
                        Account Number
                      </span>
                      <p className="font-mono text-[19px] font-bold tracking-wider">
                        {account.accountNumberMasked}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[12px]">
                      <div>
                        <span className={`block text-[11px] ${account.isPrimary ? 'text-[#c1ecd4]' : 'text-[#717973]'}`}>
                          Holder Name
                        </span>
                        <span className="font-bold">{account.holderName}</span>
                      </div>
                      <div>
                        <span className={`block text-[11px] ${account.isPrimary ? 'text-[#c1ecd4]' : 'text-[#717973]'}`}>
                          IFSC Code
                        </span>
                        <span className="font-mono font-bold">{account.ifsc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[12px] ${
                    account.isPrimary ? 'border-white/20' : 'border-[#c1c8c2]'
                  }`}>
                    <span className={`flex items-center gap-1 font-semibold ${account.isPrimary ? 'text-[#c1ecd4]' : 'text-[#137333]'}`}>
                      <ShieldCheck className="w-4 h-4" /> DBT Active
                    </span>

                    {!account.isPrimary && onDeleteBankAccount && (
                      <button
                        onClick={() => onDeleteBankAccount(account.id)}
                        className="text-[#ba1a1a] hover:bg-[#ffdad6] p-1.5 rounded-lg transition-colors cursor-pointer"
                        title="Remove bank account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Bank Account Modal */}
      {showAddBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#1b4332]" />
                <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Add New Bank Account</h3>
              </div>
              <button 
                onClick={() => setShowAddBankModal(false)}
                className="p-1 rounded-lg text-[#717973] hover:text-[#191c1d] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBankSubmit} className="py-4 space-y-4">
              {bankErrorMsg && (
                <div className="p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-[13px] font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bankErrorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Bank Name</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Maharashtra">Bank of Maharashtra</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Canara Bank">Canara Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Account Number</label>
                <input
                  type="password"
                  placeholder="Enter full account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Confirm Account Number</label>
                <input
                  type="text"
                  placeholder="Re-enter account number"
                  value={confirmAccountNumber}
                  onChange={(e) => setConfirmAccountNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-mono font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1">Account Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  >
                    <option value="Savings Account">Savings</option>
                    <option value="Current Account">Current</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer text-[13px] text-[#414844]">
                <input
                  type="checkbox"
                  checked={makePrimary}
                  onChange={(e) => setMakePrimary(e.target.checked)}
                  className="w-4 h-4 rounded text-[#012d1d] focus:ring-[#1b4332]"
                />
                <span>Set as primary account for government DBT payments</span>
              </label>

              <div className="pt-3 border-t border-[#edeeef] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddBankModal(false)}
                  className="px-4 py-2 text-[#414844] font-medium text-[13px] rounded-xl hover:bg-[#edeeef] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Verify & Save Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

