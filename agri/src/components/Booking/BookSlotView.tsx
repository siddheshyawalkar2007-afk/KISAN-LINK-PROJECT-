import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Sparkles,
  ShieldCheck,
  Smartphone,
  KeyRound,
  Check,
  Landmark
} from 'lucide-react';
import { PROCUREMENT_CENTERS } from '../../data/mockData';
import { DeliverySlotBooking, FarmerProfile, ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface BookSlotViewProps {
  farmer: FarmerProfile;
  prefilledCrop?: string;
  prefilledQuantity?: number;
  selectedBank?: string;
  onBookingConfirmed: (booking: DeliverySlotBooking) => void;
  onNavigate: (screen: ScreenId) => void;
  language?: Language;
}

export const BookSlotView: React.FC<BookSlotViewProps> = ({
  farmer,
  prefilledCrop = 'Wheat',
  prefilledQuantity = 40,
  selectedBank = 'State Bank of India (•••• 4567)',
  onBookingConfirmed,
  onNavigate,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [selectedMonth, setSelectedMonth] = useState('October 2024');
  const [selectedCenterIndex, setSelectedCenterIndex] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState(prefilledCrop);
  const [quantityKg, setQuantityKg] = useState(prefilledQuantity);

  // 2nd Step Verification modal state
  const [pendingSlot, setPendingSlot] = useState<string | null>(null);
  const [show2ndStepModal, setShow2ndStepModal] = useState(false);
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<DeliverySlotBooking | null>(null);

  const activeCenter = PROCUREMENT_CENTERS[selectedCenterIndex];

  // Calendar days generation for October 2024
  const daysInMonth = 31;
  const startDayOffset = 2; // Tuesday

  const handleInitiateBooking = (timeSlot: string) => {
    setPendingSlot(timeSlot);
    setShow2ndStepModal(true);
  };

  const handleConfirm2ndStepVerification = () => {
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setShow2ndStepModal(false);

      const newBooking: DeliverySlotBooking = {
        ticketId: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        farmerId: farmer.id,
        farmerName: farmer.name,
        cropName: selectedCrop,
        variety: selectedCrop === 'Wheat' ? 'Lokwan Grade-A' : 'Standard Grade',
        quantity: `${quantityKg} Quintals (${quantityKg * 100} kg)`,
        centerName: activeCenter.name,
        centerAddress: activeCenter.location,
        centerDistance: activeCenter.distance,
        date: `Oct ${selectedDate}, 2024`,
        timeSlot: pendingSlot || '11:30 AM',
        queueNumber: `#${Math.floor(1 + Math.random() * 8)}`,
        queueAhead: Math.floor(1 + Math.random() * 5),
        status: 'Pending',
        selectedBank: selectedBank,
        qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-ZOd34NhirnEn7ZGSggEXRR7bIONvpDoNhWXLCdR3pVyH_U3FChfJXdbC3_7k--Fpp2k2SwYydn9Niq_rbQGh5fO1U1FvHzV-YY3zbkASBOXFMFEuRCSJTCDQIqg_IKZbhPZobBaaz2y9B5Oj2Ay2B0OzR0ZFWg4DLQjS2JfB7ZO2ZBFCtl9TifklZ0tFuvgZ5hQmGJrwo_MXC8Q7haIC8RHLtvcWr3vKUqpY-_doUqC_V4hm9z4',
        receiptId: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
        is2ndStepVerified: true,
      };

      setGeneratedTicket(newBooking);
      onBookingConfirmed(newBooking);
      setIsSuccessModal(true);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Workflow Stepper Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#1b4332] text-white text-[12px] font-bold">
              Step 3 of 3
            </span>
            <span className="text-[12px] font-semibold text-[#717973]">
              Workflow: Crop Declaration → Gov Requirement & Bank → Center & Slot
            </span>
          </div>
          <h2 className="text-[24px] font-extrabold font-headline text-[#012d1d] mt-1">
            {t.bookSlot}
          </h2>
          <p className="text-[13px] text-[#414844]">
            Select a nearby mandi procurement center, date and time slot, then complete 2nd step verification.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#c1ecd4]/40 px-3 py-2 rounded-xl border border-[#1b4332]/30 text-[12px]">
          <Landmark className="w-4 h-4 text-[#137333]" />
          <div>
            <span className="text-[#717973] block text-[10px] uppercase font-bold">Selected Payout Bank</span>
            <span className="font-bold text-[#012d1d]">{selectedBank}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Calendar & Crop details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Calendar Picker */}
          <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#1b4332]" />
                <h3 className="text-[17px] font-bold font-headline text-[#191c1d]">Select Date</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1 rounded-lg hover:bg-[#edeeef] text-[#717973] cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[14px] font-bold text-[#191c1d]">{selectedMonth}</span>
                <button className="p-1 rounded-lg hover:bg-[#edeeef] text-[#717973] cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[13px]">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-[12px] font-bold text-[#717973] py-1">{d}</span>
              ))}

              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                const isPast = day < 20;

                return (
                  <button
                    key={day}
                    disabled={isPast}
                    onClick={() => setSelectedDate(day)}
                    className={`h-10 w-full rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#012d1d] text-white shadow-xs'
                        : isPast
                        ? 'text-[#c1c8c2] cursor-not-allowed'
                        : 'text-[#191c1d] hover:bg-[#c1ecd4]/50'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#edeeef] text-[12px] text-[#414844] flex items-center justify-between">
              <span>Selected Date: <strong className="text-[#012d1d]">Oct {selectedDate}, 2024</strong></span>
              <span className="text-[#137333] font-semibold">● Open for Delivery</span>
            </div>
          </div>

          {/* Delivery Crop & Quantity Overview */}
          <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs space-y-3">
            <h4 className="text-[14px] font-bold text-[#191c1d]">Crop Volume Confirmation</h4>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#edeeef]">
                <span className="text-[#717973] text-[11px] block">Crop Type</span>
                <span className="font-bold text-[#012d1d]">{selectedCrop}</span>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#edeeef]">
                <span className="text-[#717973] text-[11px] block">Volume</span>
                <span className="font-bold text-[#012d1d]">{quantityKg} Quintals ({quantityKg * 100} kg)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2 or 3 Nearby Centers & Slot Picker */}
        <div className="lg:col-span-7 space-y-6">
          {/* Nearby Center Options */}
          <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#1b4332]" />
                <h3 className="text-[17px] font-bold font-headline text-[#191c1d]">
                  Nearby Procurement Centers ({PROCUREMENT_CENTERS.length} Options)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#137333] bg-[#c1ecd4] px-2.5 py-0.5 rounded-full">
                Auto-Matched by GPS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROCUREMENT_CENTERS.map((center, idx) => {
                const isSelected = selectedCenterIndex === idx;
                return (
                  <button
                    key={center.id}
                    onClick={() => setSelectedCenterIndex(idx)}
                    className={`p-3.5 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#c1ecd4]/20 border-[#1b4332] shadow-xs'
                        : 'bg-[#f8f9fa] border-[#c1c8c2] hover:border-[#1b4332]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#137333]">{center.distance}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#1b4332] stroke-[3]" />}
                      </div>
                      <p className="text-[13px] font-bold text-[#191c1d] mt-1 leading-snug">{center.name}</p>
                    </div>
                    <p className="text-[11px] text-[#717973] mt-2 truncate">{center.location}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Center Info Banner */}
            <div className="p-4 bg-[#f8f9fa] rounded-xl border border-[#edeeef] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-[15px] font-bold text-[#012d1d]">{activeCenter.name}</h4>
                  <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[10px] font-bold rounded-full">
                    {activeCenter.distance}
                  </span>
                </div>
                <p className="text-[12px] text-[#414844] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7d562d]" /> {activeCenter.location}
                </p>
                <p className="text-[12px] text-[#717973]">
                  Hours: <strong className="text-[#191c1d]">{activeCenter.openingTime} - {activeCenter.closingTime}</strong> • Contact: {activeCenter.contact}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-[#717973] block">Today's Available Quota</span>
                <span className="text-[16px] font-bold text-[#137333]">{activeCenter.capacityAvailable} kg</span>
              </div>
            </div>
          </div>

          {/* Time Slot Availability Table */}
          <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1b4332]" />
                <h3 className="text-[17px] font-bold font-headline text-[#191c1d]">Select Time Slot</h3>
              </div>
              <span className="text-[12px] text-[#717973]">Date: Oct {selectedDate}, 2024</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#c1c8c2] text-[11px] font-bold text-[#717973] uppercase tracking-wider">
                    <th className="pb-3">Slot Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Capacity Left</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edeeef]">
                  {activeCenter.slots.map((slot, idx) => (
                    <tr key={idx} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="py-3.5 font-bold text-[#191c1d] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#717973]" />
                        <span>{slot.time}</span>
                      </td>
                      <td className="py-3.5">
                        {(slot.status as string) === 'Full' && (
                          <span className="px-2.5 py-0.5 bg-[#ffdad6] text-[#93000a] text-[11px] font-bold rounded-full">
                            Full
                          </span>
                        )}
                        {(slot.status as string) === 'Limited' && (
                          <span className="px-2.5 py-0.5 bg-[#ffca98] text-[#7a532a] text-[11px] font-bold rounded-full">
                            Limited ({slot.availableKg}kg left)
                          </span>
                        )}
                        {(slot.status as string) === 'Available' && (
                          <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                            Available ({slot.availableKg}kg)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-[#414844]">
                        {slot.availableKg > 0 ? `${slot.availableKg} kg` : '0 kg'}
                      </td>
                      <td className="py-3.5 text-right">
                        {(slot.status as string) === 'Full' ? (
                          <button
                            disabled
                            className="px-3.5 py-1.5 bg-[#e1e3e4] text-[#717973] text-[12px] font-semibold rounded-lg cursor-not-allowed"
                          >
                            Unavailable
                          </button>
                        ) : (
                          <button
                            onClick={() => handleInitiateBooking(slot.time)}
                            className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[12px] font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-xs flex items-center gap-1.5 ml-auto"
                          >
                            <span>Book Slot</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#c1ecd4]" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Step Verification Modal */}
      {show2ndStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#c1ecd4] text-[#002114] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#137333]" />
            </div>

            <div>
              <span className="px-3 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                2nd Step Security Verification
              </span>
              <h3 className="text-[20px] font-bold font-headline text-[#191c1d] mt-1.5">
                Confirm Delivery Slot Booking
              </h3>
              <p className="text-[13px] text-[#414844] mt-1">
                Enter the OTP sent to your registered mobile <strong className="text-[#012d1d]">{farmer.mobile}</strong> to authorize Mandi queue priority.
              </p>
            </div>

            {/* Summary Details Box */}
            <div className="p-4 bg-[#f8f9fa] rounded-xl border border-[#edeeef] text-[12px] text-[#414844] text-left space-y-1.5">
              <div className="flex justify-between">
                <span>Center:</span>
                <strong className="text-[#191c1d]">{activeCenter.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <strong className="text-[#191c1d]">Oct {selectedDate}, 2024 at {pendingSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span>Crop Volume:</span>
                <strong className="text-[#191c1d]">{selectedCrop} ({quantityKg} Qtl)</strong>
              </div>
              <div className="flex justify-between">
                <span>Payout Bank:</span>
                <strong className="text-[#137333]">{selectedBank}</strong>
              </div>
            </div>

            {/* OTP Input Simulation */}
            <div className="space-y-2">
              <label className="block text-[12px] font-bold text-[#717973] uppercase tracking-wider">
                Aadhaar OTP (Auto-Filled)
              </label>
              <div className="flex justify-center gap-3">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
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
                disabled={isVerifyingOtp}
                className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isVerifyingOtp ? (
                  <span>Verifying Biometric & OTP...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-[#c1ecd4]" />
                    <span>Verify & Lock Slot (Step 2 Completed)</span>
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

      {/* Confirmation Success Modal */}
      {isSuccessModal && generatedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#c1ecd4] text-[#002114] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-[#137333]" />
            </div>

            <div>
              <span className="px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[12px] font-bold rounded-full">
                2nd Step Verified & Confirmed!
              </span>
              <h3 className="text-[22px] font-extrabold font-headline text-[#012d1d] mt-2">
                Ticket #{generatedTicket.ticketId}
              </h3>
              <p className="text-[13px] text-[#414844] mt-1">
                Your delivery slot at {activeCenter.name} is confirmed with Queue Number <strong className="text-[#012d1d]">{generatedTicket.queueNumber}</strong>.
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
                <span>View Digital Ticket & QR Code</span>
                <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
