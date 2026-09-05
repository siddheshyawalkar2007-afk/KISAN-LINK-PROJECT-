import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  Landmark, 
  Star, 
  PhoneCall, 
  FileCheck,
  Wheat,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PROCUREMENT_CENTERS } from '../../data/mockData';
import { DeliverySlotBooking, FarmerProfile, ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface NearbyCentersViewProps {
  farmer: FarmerProfile;
  prefilledCrop?: string;
  prefilledQuantity?: number;
  selectedBank?: string;
  district?: string;
  onBookingConfirmed: (booking: DeliverySlotBooking) => void;
  onNavigate: (screen: ScreenId) => void;
  language?: Language;
}

export const NearbyCentersView: React.FC<NearbyCentersViewProps> = ({
  farmer,
  prefilledCrop = 'Wheat',
  prefilledQuantity = 40,
  selectedBank = 'State Bank of India (•••• 4567)',
  district: initialDistrict = 'Pune',
  onBookingConfirmed,
  onNavigate,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  
  // District state (Pune / Sambhajinagar as requested)
  const [selectedDistrict, setSelectedDistrict] = useState<'Pune' | 'Sambhajinagar'>(
    initialDistrict === 'Sambhajinagar' ? 'Sambhajinagar' : 'Pune'
  );
  
  const [selectedCrop] = useState(prefilledCrop);
  const [quantityQuintals] = useState(prefilledQuantity);

  // Filter to strictly ONLY Government Procurement Centers for the selected district & format dynamic name based on selected crop
  const districtCenters = useMemo(() => {
    const govCentersInDistrict = PROCUREMENT_CENTERS.filter(
      (c) => (c.district || 'Pune').toLowerCase() === selectedDistrict.toLowerCase() && c.isGovCenter
    );

    // If no explicit gov center found, fallback to first center formatted as Government Center
    const baseList = govCentersInDistrict.length > 0 
      ? govCentersInDistrict 
      : [PROCUREMENT_CENTERS.find(c => (c.district || 'Pune').toLowerCase() === selectedDistrict.toLowerCase()) || PROCUREMENT_CENTERS[0]];

    return baseList.map((center) => ({
      ...center,
      isGovCenter: true,
      name: `Government ${selectedCrop} Center (${selectedDistrict})`,
    }));
  }, [selectedDistrict, selectedCrop]);

  const [selectedCenterId, setSelectedCenterId] = useState<string>(
    districtCenters[0]?.id || 'center-1'
  );

  // Selected date and single slot
  const defaultDateStr = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState<string>(defaultDateStr);
  const singleTimeSlot = '10:00 AM - 01:00 PM';

  // 2nd Step Verification modal state
  const [show2ndStepModal, setShow2ndStepModal] = useState(false);
  const [otpDigits] = useState(['5', '9', '1', '4']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<DeliverySlotBooking | null>(null);

  const activeCenter = districtCenters.find((c) => c.id === selectedCenterId) || districtCenters[0] || PROCUREMENT_CENTERS[0];

  const handleOpenVerification = () => {
    setShow2ndStepModal(true);
  };

  const handleConfirm2ndStepVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setShow2ndStepModal(false);

      const formattedDate = new Date(deliveryDate).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      const newBooking: DeliverySlotBooking = {
        ticketId: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        farmerId: farmer?.id || 'FARM-2026-991',
        farmerName: farmer?.name || 'Rahul Patil',
        cropName: selectedCrop,
        variety: selectedCrop === 'Wheat' ? 'Lokwan Grade-A' : `${selectedCrop} Standard MSP`,
        quantity: `${quantityQuintals} Quintals (${quantityQuintals * 100} kg)`,
        centerName: activeCenter.name,
        centerAddress: activeCenter.location,
        centerDistance: activeCenter.distance,
        date: formattedDate,
        timeSlot: singleTimeSlot,
        queueNumber: `#${Math.floor(1 + Math.random() * 8)}`,
        queueAhead: Math.floor(1 + Math.random() * 5),
        status: 'Pending', // Pending physical verification by Mandi Officer
        selectedBank: selectedBank,
        qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-ZOd34NhirnEn7ZGSggEXRR7bIONvpDoNhWXLCdR3pVyH_U3FChfJXdbC3_7k--Fpp2k2SwYydn9Niq_rbQGh5fO1U1FvHzV-YY3zbkASBOXFMFEuRCSJTCDQIqg_IKZbhPZobBaaz2y9B5Oj2Ay2B0OzR0ZFWg4DLQjS2JfB7ZO2ZBFCtl9TifklZ0tFuvgZ5hQmGJrwo_MXC8Q7haIC8RHLtvcWr3vKUqpY-_doUqC_V4hm9z4',
        receiptId: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
        is2ndStepVerified: true,
      };

      setGeneratedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsSuccessModal(true);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Workflow Stepper Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#c1c8c2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#012d1d] text-[#c1ecd4] text-[12px] font-bold">
              Step 3 of 3
            </span>
            <span className="text-[12px] font-semibold text-[#717973]">
              Workflow: 1. Crop Declaration → 2. Gov Scheme & Bank → 3. Mandi Center
            </span>
          </div>
          <h2 className="text-[24px] sm:text-[26px] font-extrabold font-headline text-[#012d1d] mt-1">
            Mandi Center & Delivery Slot Booking
          </h2>
          <p className="text-[13px] text-[#414844]">
            Select an authorized APMC/FCI procurement center for your declared crop ({selectedCrop}), select date & time slot below, and confirm with 2-step verification.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#c1ecd4]/40 px-3.5 py-2 rounded-xl border border-[#1b4332]/30 text-[12px]">
          <Landmark className="w-5 h-5 text-[#137333]" />
          <div>
            <span className="text-[#717973] block text-[10px] uppercase font-bold">Chosen DBT Payout Bank</span>
            <span className="font-bold text-[#012d1d]">{selectedBank}</span>
          </div>
        </div>
      </div>

      {/* District Selection Bar (Pune & Chhatrapati Sambhajinagar) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#c1c8c2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1b4332]" />
          <span className="text-[14px] font-bold text-[#191c1d]">Procurement District:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedDistrict('Pune');
              const puneCenters = PROCUREMENT_CENTERS.filter(c => c.district === 'Pune');
              if (puneCenters[0]) setSelectedCenterId(puneCenters[0].id);
            }}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              selectedDistrict === 'Pune'
                ? 'bg-[#012d1d] text-[#c1ecd4] shadow-xs scale-105'
                : 'bg-[#f8f9fa] border border-[#c1c8c2] text-[#414844] hover:bg-[#edeeef]'
            }`}
          >
            📍 Pune (पुणे)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedDistrict('Sambhajinagar');
              const sambhCenters = PROCUREMENT_CENTERS.filter(c => c.district === 'Sambhajinagar');
              if (sambhCenters[0]) setSelectedCenterId(sambhCenters[0].id);
            }}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              selectedDistrict === 'Sambhajinagar'
                ? 'bg-[#012d1d] text-[#c1ecd4] shadow-xs scale-105'
                : 'bg-[#f8f9fa] border border-[#c1c8c2] text-[#414844] hover:bg-[#edeeef]'
            }`}
          >
            📍 Chhatrapati Sambhajinagar (छत्रपती संभाजीनगर)
          </button>
        </div>
      </div>

      {/* OFFICIAL GOVERNMENT PROCUREMENT CENTER */}
      <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1b4332]" />
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">
              Official Government Procurement Center ({selectedDistrict})
            </h3>
          </div>
          <span className="text-[11px] font-bold text-[#137333] bg-[#c1ecd4] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#137333]/20">
            <Wheat className="w-3.5 h-3.5" /> 100% Government MSP Purchase for {selectedCrop}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {districtCenters.map((center) => {
            const isSelected = selectedCenterId === center.id || districtCenters.length === 1;
            return (
              <div
                key={center.id}
                onClick={() => setSelectedCenterId(center.id)}
                className={`p-6 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 group ${
                  isSelected
                    ? 'bg-[#c1ecd4]/20 border-[#1b4332] shadow-sm ring-2 ring-[#1b4332]/20'
                    : 'bg-[#f8f9fa] border-[#c1c8c2] hover:border-[#1b4332]/60'
                }`}
              >
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#012d1d] text-[#c1ecd4] text-[11px] font-bold rounded-full">
                      Authorized Govt Facility
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                      {center.distance} away
                    </span>
                    <div className="flex items-center gap-1 text-[12px] font-bold text-[#7d562d]">
                      <Star className="w-3.5 h-3.5 fill-[#ffca98] text-[#7d562d]" />
                      <span>{center.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#1b4332] text-[#c1ecd4] rounded-lg shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h4 className="text-[17px] font-extrabold font-headline text-[#191c1d] group-hover:text-[#1b4332] transition-colors leading-snug">
                      {center.name}
                    </h4>
                  </div>

                  <p className="text-[13px] text-[#414844] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#7d562d] shrink-0" />
                    <span>{center.location} • Operating Hours: {center.openingTime} - {center.closingTime}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-[#717973]">Supported Crops:</span>
                    {(center.supportedCrops || [selectedCrop]).map((cropName) => (
                      <span
                        key={cropName}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md font-semibold ${
                          cropName.toLowerCase() === selectedCrop.toLowerCase()
                            ? 'bg-[#1b4332] text-white font-bold'
                            : 'bg-[#edeeef] text-[#414844]'
                        }`}
                      >
                        {cropName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-[#c1c8c2]/50">
                  {/* Single Designated Mandi Slot */}
                  <div className="p-3 bg-white rounded-xl border-2 border-[#1b4332] flex items-center gap-3 text-[12px] shadow-2xs">
                    <Clock className="w-4 h-4 text-[#1b4332] shrink-0" />
                    <div>
                      <span className="text-[#717973] block text-[10px] uppercase font-bold">Official Procurement Slot</span>
                      <strong className="text-[#012d1d] font-mono text-[13px]">{singleTimeSlot}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#717973]">Capacity: <strong className="text-[#137333]">{center.capacityAvailable} kg</strong></span>
                    <span className="px-4 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-1 bg-[#012d1d] text-[#c1ecd4] shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Selected Government Center
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STREAMLINED BOTTOM BOOKING BAR WITH DATE & SINGLE DESIGNATED TIME SLOT */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#1b4332] shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Selected Center & Crop Details */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#1b4332] text-[#c1ecd4] text-[11px] font-bold rounded-full">
                Target Procurement Center
              </span>
              <span className="text-[12px] text-[#717973] font-semibold">
                District: {selectedDistrict}
              </span>
            </div>
            
            <h3 className="text-[18px] font-extrabold font-headline text-[#012d1d]">
              {activeCenter.name}
            </h3>
            <p className="text-[13px] text-[#414844] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#1b4332] shrink-0" />
              <span>{activeCenter.location} • Hours: {activeCenter.openingTime} - {activeCenter.closingTime}</span>
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <div className="px-3 py-1 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[12px]">
                <span className="text-[#717973]">Crop: </span>
                <strong className="text-[#012d1d]">{selectedCrop}</strong> ({quantityQuintals} Quintals)
              </div>
              <div className="px-3 py-1 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[12px]">
                <span className="text-[#717973]">DBT Payout: </span>
                <strong className="text-[#137333]">{selectedBank}</strong>
              </div>
            </div>
          </div>

          {/* Delivery Date, Single Time Slot & Book Action Controls */}
          <div className="bg-[#f8f9fa] p-4 sm:p-5 rounded-2xl border border-[#c1c8c2] space-y-4 shrink-0 lg:w-[420px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date Input */}
              <div>
                <label className="block text-[12px] font-bold text-[#191c1d] mb-1 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>Delivery Date</span>
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#c1c8c2] rounded-xl text-[13px] font-semibold text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                />
              </div>

              {/* Single Official Time Slot (No multiple choices) */}
              <div>
                <label className="block text-[12px] font-bold text-[#191c1d] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>Designated Slot</span>
                </label>
                <div className="w-full px-3 py-2 bg-white border-2 border-[#1b4332] rounded-xl text-[13px] font-bold text-[#012d1d] flex items-center justify-between shadow-2xs">
                  <span>{singleTimeSlot}</span>
                  <span className="w-2 h-2 rounded-full bg-[#137333]"></span>
                </div>
              </div>
            </div>

            {/* Book Slot CTA */}
            <button
              type="button"
              onClick={handleOpenVerification}
              className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Book Slot & 2nd Step Verification</span>
              <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
            </button>
            <span className="text-[11px] text-[#717973] text-center block">
              Generates digital delivery receipt with physical gate queue ticket
            </span>
          </div>
        </div>
      </div>

      {/* 2-STEP VERIFICATION MODAL */}
      {show2ndStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#c1ecd4] text-[#002114] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#137333]" />
            </div>

            <div>
              <span className="px-3 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                2-Step Security Verification
              </span>
              <h3 className="text-[20px] font-bold font-headline text-[#191c1d] mt-1.5">
                Authorize Mandi Delivery Slot
              </h3>
              <p className="text-[13px] text-[#414844] mt-1">
                Aadhaar OTP sent to registered mobile <strong className="text-[#012d1d]">{farmer.mobile}</strong>.
              </p>
            </div>

            {/* Booking Summary */}
            <div className="p-4 bg-[#f8f9fa] rounded-xl border border-[#edeeef] text-[12px] text-[#414844] text-left space-y-1.5">
              <div className="flex justify-between">
                <span>Center:</span>
                <strong className="text-[#191c1d]">{activeCenter.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date & Slot:</span>
                <strong className="text-[#191c1d]">{deliveryDate} at {singleTimeSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span>Crop Volume:</span>
                <strong className="text-[#191c1d]">{selectedCrop} ({quantityQuintals} Qtl)</strong>
              </div>
              <div className="flex justify-between">
                <span>Payout Bank:</span>
                <strong className="text-[#137333]">{selectedBank}</strong>
              </div>
            </div>

            {/* OTP Digits */}
            <div className="space-y-2">
              <label className="block text-[12px] font-bold text-[#717973] uppercase tracking-wider">
                UIDAI Aadhaar OTP (Auto-Filled)
              </label>
              <div className="flex justify-center gap-3">
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={d}
                    readOnly
                    className="w-12 h-12 text-center text-[20px] font-mono font-bold bg-[#f8f9fa] border-2 border-[#1b4332] rounded-xl text-[#012d1d] outline-none"
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#137333] font-semibold flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 8A Khata & UIDAI Validated
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleConfirm2ndStepVerification}
                disabled={isVerifying}
                className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isVerifying ? (
                  <span>Verifying Biometric & OTP...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#c1ecd4]" />
                    <span>Confirm & Generate Booking Receipt</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShow2ndStepModal(false)}
                className="w-full py-2 text-[#717973] hover:text-[#191c1d] text-[13px] font-medium cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL SHOWING STATUS PENDING */}
      {isSuccessModal && generatedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#ffca98] text-[#7a532a] mx-auto flex items-center justify-center">
              <FileCheck className="w-9 h-9 text-[#7a532a]" />
            </div>

            <div>
              <span className="px-3 py-1 bg-[#ffca98] text-[#7a532a] text-[12px] font-bold rounded-full">
                Booking Receipt Generated (Status: Pending)
              </span>
              <h3 className="text-[22px] font-extrabold font-headline text-[#012d1d] mt-2">
                Ticket #{generatedBooking.ticketId}
              </h3>
              <p className="text-[13px] text-[#414844] mt-1">
                Your delivery slot at {activeCenter.name} is scheduled with Queue <strong className="text-[#012d1d]">{generatedBooking.queueNumber}</strong> on <strong className="text-[#012d1d]">{generatedBooking.date}</strong> at <strong className="text-[#012d1d]">{generatedBooking.timeSlot}</strong>. Status is marked as <strong className="text-[#7a532a]">Pending Physical Mandi Inspection</strong> at entry gate.
              </p>
            </div>

            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  setIsSuccessModal(false);
                  onNavigate('booking-ticket');
                }}
                className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>View Booking Receipt & Pass</span>
                <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
