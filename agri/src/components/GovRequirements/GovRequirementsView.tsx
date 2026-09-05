import React, { useState } from 'react';
import { 
  Scale, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Check,
  CreditCard,
  Layers,
  Landmark
} from 'lucide-react';
import { BankAccount, Language } from '../../types';
import { INITIAL_BANK_ACCOUNTS } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

interface GovRequirementsViewProps {
  onProceedToBooking: (cropName: string, quantityKg: number, selectedBank?: string, district?: string) => void;
  bankAccounts?: BankAccount[];
  prefilledCrop?: string;
  prefilledQuantityKg?: number;
  district?: string;
  language?: Language;
}

export const GovRequirementsView: React.FC<GovRequirementsViewProps> = ({
  onProceedToBooking,
  bankAccounts = INITIAL_BANK_ACCOUNTS,
  prefilledCrop = 'Wheat',
  prefilledQuantityKg = 40,
  district = 'Pune',
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCrop, setSelectedCrop] = useState(prefilledCrop);
  const [contributionKg, setContributionKg] = useState<number>(prefilledQuantityKg);
  const [selectedBankId, setSelectedBankId] = useState<string>(bankAccounts[0]?.id || 'bank-1');

  const availableBanks: BankAccount[] = bankAccounts.length > 1 ? bankAccounts : [
    ...bankAccounts,
    {
      id: 'bank-3',
      bankName: 'Bank of Maharashtra',
      accountType: 'Savings Account',
      accountNumberMasked: '•••• •••• 3312',
      accountNumberFull: '6019283743312',
      holderName: 'Rahul Patil',
      ifsc: 'MAHB0000412',
      isPrimary: false,
      themeColor: 'blue',
    }
  ];

  const targetQuotaKg = 1000;
  const currentTotalKg = contributionKg;
  const fulfilledPercent = Math.min(100, Math.round((currentTotalKg / targetQuotaKg) * 100));
  const remainingKg = Math.max(0, targetQuotaKg - currentTotalKg);

  const mspRates: Record<string, { mspPerQtl: number; change: string; season: string }> = {
    Wheat: { mspPerQtl: 2275, change: '+₹150 / quintal (6.8% increase)', season: 'Rabi 2024-25' },
    Rice: { mspPerQtl: 2183, change: '+₹143 / quintal (7.0% increase)', season: 'Kharif 2024' },
    Cotton: { mspPerQtl: 7121, change: '+₹501 / quintal (7.5% increase)', season: 'Kharif 2024' },
    Soybean: { mspPerQtl: 4600, change: '+₹300 / quintal (6.9% increase)', season: 'Kharif 2024' },
    Gram: { mspPerQtl: 5440, change: '+₹105 / quintal (2.0% increase)', season: 'Rabi 2024-25' },
  };

  const currentMsp = mspRates[selectedCrop] || mspRates['Wheat'];
  const estimatedPayout = Math.round((contributionKg / 100) * currentMsp.mspPerQtl);

  const selectedBankObj = availableBanks.find((b) => b.id === selectedBankId) || availableBanks[0];
  const selectedBankLabel = `${selectedBankObj?.bankName} (${selectedBankObj?.accountNumberMasked})`;

  const handleSubmitAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToBooking(selectedCrop, contributionKg, selectedBankLabel, district);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Workflow Stepper Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#1b4332] text-white text-[12px] font-bold">
              Step 2 of 3
            </span>
            <span className="text-[12px] font-semibold text-[#717973]">
              Workflow: Crop Declaration → Gov Requirement & Bank → Center & Slot
            </span>
          </div>
          <h2 className="text-[24px] font-extrabold font-headline text-[#012d1d] mt-1">
            {t.govRequirements}
          </h2>
          <p className="text-[13px] text-[#414844]">
            Specify the procurement supply amount, review your guaranteed MSP benefit, and choose your payout bank account.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-[12px] font-semibold text-[#717973]">Active Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-bold text-[#012d1d] outline-none focus:ring-2 focus:ring-[#1b4332]"
          >
            {Object.keys(mspRates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmitAndProceed} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Quota & Amount Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Supply Amount Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#c1ecd4] text-[#002114]">
                    <Scale className="w-6 h-6 text-[#137333]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">
                      Procurement Quota & Supply Amount
                    </h3>
                    <p className="text-[12px] text-[#717973]">
                      Region: <span className="font-semibold text-[#191c1d]">Maharashtra (Pune Division)</span> • Scheme: <span className="font-semibold text-[#191c1d]">CACP Direct MSP</span>
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[12px] font-bold rounded-full">
                  Quota Open
                </span>
              </div>

              {/* Target Progress Bar */}
              <div className="space-y-2 bg-[#f8f9fa] p-5 rounded-2xl border border-[#edeeef]">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-semibold text-[#414844]">Central Mandi Target: <span className="text-[#191c1d] font-bold">{targetQuotaKg} Quintals</span></span>
                  <span className="font-bold text-[#1b4332]">{fulfilledPercent}% Allocated</span>
                </div>
                <div className="w-full h-3 bg-[#e1e3e4] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1b4332] rounded-full transition-all duration-300"
                    style={{ width: `${fulfilledPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[12px] text-[#717973] pt-1">
                  <span>Your Allocation: <strong className="text-[#191c1d]">{contributionKg} Quintals</strong> ({contributionKg * 100} kg)</span>
                  <span>Remaining Quota: <strong className="text-[#191c1d]">{remainingKg} Quintals</strong></span>
                </div>
              </div>

              {/* Interactive Quantity Selection */}
              <div className="space-y-3">
                <label className="block text-[14px] font-bold text-[#191c1d]">
                  Enter Supply Amount for {selectedCrop} (in Quintals):
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <input
                      type="number"
                      min="1"
                      max={targetQuotaKg}
                      value={contributionKg}
                      onChange={(e) => setContributionKg(Math.min(targetQuotaKg, Math.max(1, Number(e.target.value))))}
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[18px] font-bold text-[#012d1d] outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                    <span className="absolute right-4 top-3.5 text-[13px] font-bold text-[#717973]">Quintals</span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {[20, 40, 60, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setContributionKg(preset)}
                        className={`flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                          contributionKg === preset
                            ? 'bg-[#1b4332] text-white shadow-xs'
                            : 'bg-[#edeeef] text-[#414844] hover:bg-[#e1e3e4]'
                        }`}
                      >
                        {preset} Qtl
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Choice Section: 2 or 3 Bank Options for Farmer to Select */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#1b4332]" />
                    <span>Choose Payout Bank Account</span>
                  </h3>
                  <p className="text-[13px] text-[#717973] mt-0.5">
                    Select which verified bank account will receive the direct MSP subsidy payout.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                  DBT Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {availableBanks.map((bank) => {
                  const isSelected = selectedBankId === bank.id;
                  return (
                    <div
                      key={bank.id}
                      onClick={() => setSelectedBankId(bank.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-[#1b4332] bg-[#c1ecd4]/20 shadow-xs'
                          : 'border-[#c1c8c2] bg-white hover:border-[#1b4332]/50 hover:bg-[#f8f9fa]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#1b4332] text-white' : 'bg-[#f8f9fa] text-[#414844] border border-[#c1c8c2]'}`}>
                            <Landmark className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#191c1d]">{bank.bankName}</h4>
                            <p className="text-[12px] text-[#717973]">{bank.accountType}</p>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#1b4332] bg-[#1b4332] text-white' : 'border-[#c1c8c2] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#edeeef] flex justify-between items-center text-[12px]">
                        <span className="font-mono font-bold text-[#012d1d]">{bank.accountNumberMasked}</span>
                        <span className="text-[11px] font-medium text-[#717973]">IFSC: {bank.ifsc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Payout Summary & Proceed Button */}
          <div className="space-y-6">
            {/* MSP Calculation Box */}
            <div className="bg-gradient-to-br from-[#012d1d] to-[#1b4332] text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-[#c1ecd4]">
                <TrendingUp className="w-5 h-5" />
                <h4 className="text-[14px] font-bold uppercase tracking-wider">Statutory MSP Benefit</h4>
              </div>

              <div>
                <span className="text-[12px] text-[#c1ecd4]">Current Government MSP</span>
                <p className="text-[28px] font-extrabold font-headline">
                  ₹{currentMsp.mspPerQtl} <span className="text-[14px] font-normal text-[#c1ecd4]">/ Quintal</span>
                </p>
                <p className="text-[11px] text-[#c1ecd4] flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" /> {currentMsp.change}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20 space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#c1ecd4]">Supply Volume:</span>
                  <span className="font-bold">{contributionKg} Quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c1ecd4]">Payout Bank:</span>
                  <span className="font-semibold text-right truncate max-w-[140px]">{selectedBankObj.bankName}</span>
                </div>
                <div className="pt-2 border-t border-white/20 flex justify-between items-center">
                  <span className="font-bold text-[14px]">Total Estimated Payout:</span>
                  <span className="text-[20px] font-extrabold text-[#c1ecd4]">₹{estimatedPayout.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Proceed CTA */}
            <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
              <div>
                <h4 className="text-[15px] font-bold text-[#191c1d]">Next: Center & Slot (Step 3)</h4>
                <p className="text-[12px] text-[#717973] mt-1">
                  Choose a nearby procurement center and book your delivery time slot.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Submit & Book Delivery Slot (Step 3)</span>
                <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
