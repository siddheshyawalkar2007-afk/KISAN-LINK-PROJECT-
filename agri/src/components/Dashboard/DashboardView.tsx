import React from 'react';
import { 
  CalendarCheck, 
  Sprout, 
  Scale, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ChevronRight,
  TrendingUp,
  FileText,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Ban,
  Landmark,
  Layers,
  Fingerprint,
  Truck
} from 'lucide-react';
import { FarmerProfile, DeliverySlotBooking, ScreenId, PaymentTransaction, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface DashboardViewProps {
  farmer: FarmerProfile;
  activeBooking: DeliverySlotBooking | null;
  latestTransaction?: PaymentTransaction;
  onNavigate: (screen: ScreenId) => void;
  language?: Language;
  onCancelBooking?: (ticketId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  farmer,
  activeBooking,
  latestTransaction,
  onNavigate,
  language = 'en',
  onCancelBooking,
}) => {
  const t = TRANSLATIONS[language];

  const handleStartBookingWorkflow = () => {
    // Sequential Flow: Dashboard -> Crop Management (Step 1)
    onNavigate('crop-management');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner with Direct Step 1 CTA */}
      <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#c1c8c2] bg-gradient-to-r from-[#012d1d] via-[#1b4332] to-[#274e3d] text-white p-6 sm:p-8">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEhtxifJRqR2fcQH0yweElJ9y8CEFtn8YbqPGwkqTrr17kE3iIYNBTR31uOVXK4DB5VTnxNUazLcnCYuPNKrOQGTVRyVqC5JQk5m84IBHpUkc0VWUQrh6Mg1YpTchE6a8xCknRVvYt6sqhUpwNa9lU2TMTpSdyGEhgqTBYbWT5UPxdJXyeGWZDsCy2Hx0AwSuzXAYKAnejrpEwiBIn4EsxbBHKxHwPU1i90lDbpAFhXJpukI7g12ps"
            alt="Agricultural field"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c1ecd4]/20 border border-[#c1ecd4]/40 text-[#c1ecd4] text-[12px] font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Direct MSP Procurement & Digital Mandi
            </div>
            <h1 className="text-[24px] sm:text-[30px] font-extrabold font-headline leading-tight tracking-tight text-white">
              {t.portalTitle}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#e1e3e4] leading-relaxed">
              {t.portalSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleStartBookingWorkflow}
              className="px-5 py-2.5 bg-[#c1ecd4] text-[#002114] font-bold text-[14px] rounded-xl hover:bg-white transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <CalendarCheck className="w-4 h-4 text-[#002114]" />
              <span>{t.bookDeliverySlot}</span>
              <ArrowRight className="w-4 h-4 text-[#002114]" />
            </button>
            <button
              onClick={() => onNavigate('verification')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#c1ecd4]" />
              <span>{t.verification}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sequential Booking Step Progression Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#c1c8c2] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#c1ecd4]/40 text-[#012d1d]">
              <Layers className="w-5 h-5 text-[#1b4332]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold font-headline text-[#191c1d]">
                Mandatory Step-by-Step Delivery Booking Process
              </h3>
              <p className="text-[12px] text-[#414844]">
                Follow the 3 sequential steps from crop registration to 2-step OTP slot confirmation
              </p>
            </div>
          </div>
          <span className="text-[12px] font-bold text-[#1b4332] bg-[#c1ecd4]/40 px-3 py-1 rounded-full">
            Standard Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Step 1 */}
          <div 
            onClick={() => onNavigate('crop-management')}
            className="p-4 rounded-xl border-2 border-[#1b4332] bg-[#f8f9fa] hover:bg-[#c1ecd4]/10 transition-all cursor-pointer relative group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#1b4332] text-white">
                Step 1
              </span>
              <Sprout className="w-5 h-5 text-[#1b4332] group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-[14px] font-bold text-[#191c1d] mt-1">Crop Declaration</h4>
            <p className="text-[12px] text-[#414844] mt-1">
              Fill crop variety, sown acreage & expected harvested quintals.
            </p>
            <div className="mt-3 flex items-center text-[12px] font-bold text-[#1b4332]">
              <span>Enter Crop Details →</span>
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => onNavigate('gov-requirements')}
            className="p-4 rounded-xl border border-[#c1c8c2] bg-[#f8f9fa] hover:bg-[#c1ecd4]/10 hover:border-[#1b4332] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#7d562d] text-white">
                Step 2
              </span>
              <Landmark className="w-5 h-5 text-[#7d562d] group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-[14px] font-bold text-[#191c1d] mt-1">Gov Scheme & Bank Choice</h4>
            <p className="text-[12px] text-[#414844] mt-1">
              Enter procurement quantity & select DBT payout bank (SBI / PNB).
            </p>
            <div className="mt-3 flex items-center text-[12px] font-bold text-[#7d562d]">
              <span>Select Bank Account →</span>
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => onNavigate('nearby-centers')}
            className="p-4 rounded-xl border border-[#c1c8c2] bg-[#f8f9fa] hover:bg-[#c1ecd4]/10 hover:border-[#1b4332] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#012d1d] text-[#c1ecd4]">
                Step 3
              </span>
              <MapPin className="w-5 h-5 text-[#012d1d] group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-[14px] font-bold text-[#191c1d] mt-1">Mandi Center</h4>
            <p className="text-[12px] text-[#414844] mt-1">
              Select Mandi procurement center & confirm 2-step OTP slot.
            </p>
            <div className="mt-3 flex items-center text-[12px] font-bold text-[#012d1d]">
              <span>Choose Center & Book Slot →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Profile Card & Live Status Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#c1c8c2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={farmer?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg5gc3ij3FqkC2Fsp2anWUhD6CEFjz1aJGgbQCSZ7fK8XURHBBSmSOqJR5bkLd2g8Z3QdPabC_w01RL-G8B0SyeonTuNBbJKtRzPSLiNQp8KLTOf0L-9Dd8wEp9dN44fjRUAMSLd4UaGtJH6u-bYL7Ed9oiPYFfahvxIwF_7hJOBTUyHNXVtYAaxXoOVjGB-u9fPoXlfEflcvJIWIAnIlVUQqADuWNsZdhrFkbGkrJrZV0lUcK27IJ'}
              alt={farmer?.name || 'Farmer'}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#1b4332]"
            />
            {farmer?.isVerified && (
              <span className="absolute bottom-0 right-0 p-1 bg-[#137333] text-white rounded-full border-2 border-white" title="Verified Govt. Profile">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-bold font-headline text-[#191c1d]">{farmer?.name || 'Rahul Patil'}</h2>
              <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                8A & Pik-Pera Verified
              </span>
            </div>
            <p className="text-[13px] text-[#414844] mt-0.5">
              ID: <span className="font-mono font-semibold text-[#191c1d]">{farmer?.id || 'FARM-2026-991'}</span> • {farmer?.landArea ?? 2.4} Hectares (Khata: KH-1024/2024)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#414844] pt-3 md:pt-0 border-t md:border-t-0 border-[#edeeef]">
          <div className="flex items-center gap-2 bg-[#f8f9fa] px-3.5 py-2 rounded-xl border border-[#edeeef]">
            <MapPin className="w-4 h-4 text-[#7d562d]" />
            <div>
              <span className="text-[11px] text-[#717973] block uppercase tracking-wider font-semibold">Assigned Mandi</span>
              <span className="font-semibold text-[#191c1d]">APMC Pune, Sector 4</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#f8f9fa] px-3.5 py-2 rounded-xl border border-[#edeeef]">
            <Clock className="w-4 h-4 text-[#1b4332]" />
            <div>
              <span className="text-[11px] text-[#717973] block uppercase tracking-wider font-semibold">Current Session</span>
              <span className="font-semibold text-[#191c1d]">Rabi Season 2024-25</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Booking Live Banner (if active) */}
      {activeBooking && activeBooking.status === 'Confirmed' && (
        <div className="bg-gradient-to-r from-[#1b4332] to-[#012d1d] text-white rounded-2xl p-5 sm:p-6 border border-[#1b4332] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-xl shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#c1ecd4]/20 border border-[#c1ecd4]/40 text-[#c1ecd4] text-[11px] font-bold uppercase tracking-wider">
                  Active Confirmed Slot
                </span>
                <span className="font-mono text-[13px] font-bold text-white">Ticket #{activeBooking.ticketId}</span>
              </div>
              <h3 className="text-[18px] font-bold font-headline mt-1">
                {activeBooking.cropName} ({activeBooking.quantity}) at {activeBooking.centerName}
              </h3>
              <p className="text-[13px] text-[#c1ecd4] mt-0.5">
                Bank: <span className="font-bold text-white">{activeBooking.selectedBank || 'State Bank of India'}</span> • 2nd-Step Verified
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('booking-ticket')}
              className="px-4 py-2 bg-[#c1ecd4] hover:bg-white text-[#002114] font-bold text-[13px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>View Digital Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onCancelBooking && (
              <button
                onClick={() => onCancelBooking(activeBooking.ticketId)}
                className="px-3 py-2 bg-[#ba1a1a]/80 hover:bg-[#ba1a1a] text-white font-semibold text-[13px] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Cancel Slot</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4-Bento Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Active Booking */}
        <div 
          onClick={() => onNavigate('history')}
          className="bg-white rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#c1ecd4]/40 text-[#012d1d]">
                <CalendarCheck className="w-5 h-5 text-[#1b4332]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                Confirmed
              </span>
            </div>
            <h4 className="text-[13px] font-semibold text-[#717973] uppercase tracking-wider">Bookings & History</h4>
            <p className="text-[20px] font-bold font-headline text-[#191c1d] mt-1">Wheat & Soybean</p>
            <p className="text-[13px] text-[#414844] mt-1 font-medium">Tabs: Confirmed • Pending • All</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#edeeef] flex items-center justify-between text-[12px] font-semibold text-[#1b4332] group-hover:text-[#012d1d]">
            <span>View All Bookings & History</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Crop Declaration */}
        <div 
          onClick={() => onNavigate('crop-management')}
          className="bg-white rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#ffca98]/40 text-[#7d562d]">
                <Sprout className="w-5 h-5 text-[#7d562d]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                Step 1
              </span>
            </div>
            <h4 className="text-[13px] font-semibold text-[#717973] uppercase tracking-wider">Crop Management</h4>
            <p className="text-[20px] font-bold font-headline text-[#191c1d] mt-1">Fill Crop Info</p>
            <p className="text-[13px] text-[#414844] mt-1">Save crop & submit to go to Gov Scheme</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#edeeef] flex items-center justify-between text-[12px] font-semibold text-[#7d562d] group-hover:text-[#3f1d00]">
            <span>+ Fill Crop & Submit</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Gov Requirement & Bank */}
        <div 
          onClick={() => onNavigate('gov-requirements')}
          className="bg-white rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#c1ecd4]/40 text-[#012d1d]">
                <Scale className="w-5 h-5 text-[#1b4332]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                Step 2
              </span>
            </div>
            <h4 className="text-[13px] font-semibold text-[#717973] uppercase tracking-wider">Gov Scheme & Bank</h4>
            <p className="text-[20px] font-bold font-headline text-[#191c1d] mt-1">Enter Amount & Bank</p>
            <p className="text-[13px] text-[#414844] mt-1">Select SBI / PNB to auto-proceed to slot</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#edeeef] flex items-center justify-between text-[12px] font-semibold text-[#1b4332] group-hover:text-[#012d1d]">
            <span>Choose Bank & Proceed</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Live Payment & Delivery Tracker */}
        <div 
          onClick={() => onNavigate('payments')}
          className="bg-white rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-[#c1ecd4]/40 text-[#012d1d]">
                <Truck className="w-5 h-5 text-[#1b4332]" />
              </div>
              <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-ping" />
                Live Status
              </span>
            </div>
            <h4 className="text-[13px] font-semibold text-[#717973] uppercase tracking-wider">Payment & Tracking</h4>
            <p className="text-[20px] font-bold font-headline text-[#191c1d] mt-1">Payment Journey</p>
            <p className="text-[13px] text-[#414844] mt-1">Live Mandi Delivery & Treasury DBT Tracker</p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#edeeef] flex items-center justify-between text-[12px] font-semibold text-[#1b4332] group-hover:text-[#012d1d]">
            <span>Open Live Delivery Tracker</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Verification & 8A / Pik Pera Certificate Quick Access */}
      <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs">
        <h3 className="text-[17px] font-bold font-headline text-[#191c1d] mb-4">Farmer Verification Center</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('verification')}
            className="p-4 rounded-xl bg-[#f8f9fa] hover:bg-[#c1ecd4]/20 border border-[#edeeef] hover:border-[#1b4332] text-left transition-all group cursor-pointer"
          >
            <ShieldCheck className="w-6 h-6 text-[#1b4332] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-[14px] font-bold text-[#191c1d]">8A & Pik-Pera</h4>
            <p className="text-[12px] text-[#414844] mt-0.5">Tehsildar & e-Pik verified certificates</p>
          </button>

          <button
            onClick={() => onNavigate('verification')}
            className="p-4 rounded-xl bg-[#f8f9fa] hover:bg-[#c1ecd4]/20 border border-[#edeeef] hover:border-[#1b4332] text-left transition-all group cursor-pointer"
          >
            <Fingerprint className="w-6 h-6 text-[#1b4332] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-[14px] font-bold text-[#191c1d]">Aadhaar Card</h4>
            <p className="text-[12px] text-[#414844] mt-0.5">UIDAI Linked & Biometric e-KYC</p>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="p-4 rounded-xl bg-[#f8f9fa] hover:bg-[#c1ecd4]/20 border border-[#edeeef] hover:border-[#1b4332] text-left transition-all group cursor-pointer"
          >
            <Landmark className="w-6 h-6 text-[#7d562d] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-[14px] font-bold text-[#191c1d]">Bank Accounts</h4>
            <p className="text-[12px] text-[#414844] mt-0.5">SBI & PNB accounts & DBT status</p>
          </button>

          <button
            onClick={() => onNavigate('help')}
            className="p-4 rounded-xl bg-[#f8f9fa] hover:bg-[#c1ecd4]/20 border border-[#edeeef] hover:border-[#1b4332] text-left transition-all group cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 text-[#7d562d] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-[14px] font-bold text-[#191c1d]">Kisan Helpline</h4>
            <p className="text-[12px] text-[#414844] mt-0.5">Toll-free 1800-123-4567</p>
          </button>
        </div>
      </div>
    </div>
  );
};
