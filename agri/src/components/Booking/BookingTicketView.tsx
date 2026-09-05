import React, { useState } from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  Printer, 
  Download, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  X,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { DeliverySlotBooking, ScreenId } from '../../types';

interface BookingTicketViewProps {
  booking: DeliverySlotBooking | null;
  onCancelBooking: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const BookingTicketView: React.FC<BookingTicketViewProps> = ({
  booking,
  onCancelBooking,
  onNavigate,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!booking) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-[#c1c8c2] text-center space-y-4 max-w-lg mx-auto my-12">
        <CalendarCheck className="w-12 h-12 text-[#717973] mx-auto" />
        <h3 className="text-[20px] font-bold font-headline text-[#191c1d]">No Active Delivery Slot</h3>
        <p className="text-[14px] text-[#414844]">
          You do not have any active booking ticket scheduled at this moment.
        </p>
        <button
          onClick={() => onNavigate('book-slot')}
          className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-colors cursor-pointer"
        >
          Book a Delivery Slot
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    onCancelBooking();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-3 py-1.5 bg-white hover:bg-[#edeeef] text-[#012d1d] font-semibold text-[13px] rounded-xl border border-[#c1c8c2] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-xl text-[13px] font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#1b4332]" />
            <span>Print Ticket</span>
          </button>
          <button
            onClick={() => onNavigate('receipt')}
            className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-xl text-[13px] font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-[#c1ecd4]" />
            <span>View Receipt</span>
          </button>
        </div>
      </div>

      {/* Official Authentic Ticket Card with Cutout Notches */}
      <div className="bg-white rounded-3xl border border-[#c1c8c2] shadow-xl overflow-hidden print-area relative">
        {/* Ticket Header */}
        <div className="bg-[#1b4332] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-2xl">
              <CalendarCheck className="w-7 h-7 text-[#012d1d]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#c1ecd4]">Official Procurement Pass</span>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold font-headline">
                Ticket #{booking.ticketId}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-[#c1ecd4] text-[#002114] font-bold text-[13px] rounded-full flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#137333]" />
              {booking.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Ticket Body Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-[14px]">
            <div className="space-y-1">
              <span className="text-[11px] text-[#717973] uppercase font-bold tracking-wider">Farmer Name</span>
              <p className="font-bold text-[#191c1d] text-[16px]">{booking.farmerName}</p>
              <p className="text-[12px] font-mono text-[#414844]">{booking.farmerId}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#717973] uppercase font-bold tracking-wider">Crop & Quantity</span>
              <p className="font-bold text-[#191c1d] text-[16px]">{booking.cropName} ({booking.variety})</p>
              <p className="text-[13px] font-bold text-[#1b4332]">{booking.quantity}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#717973] uppercase font-bold tracking-wider">Date & Time</span>
              <p className="font-bold text-[#191c1d] text-[16px]">{booking.date}</p>
              <p className="text-[13px] font-bold text-[#7d562d]">{booking.timeSlot}</p>
            </div>
          </div>

          {/* Collection Center Box */}
          <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1b4332]" />
                <h4 className="text-[14px] font-bold text-[#012d1d]">{booking.centerName}</h4>
              </div>
              <span className="text-[12px] font-semibold text-[#717973]">{booking.centerDistance}</span>
            </div>
            <p className="text-[13px] text-[#414844] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7d562d] shrink-0" />
              {booking.centerAddress}
            </p>
          </div>

          {/* Perforated Divider */}
          <div className="relative py-2">
            <div className="border-t-2 border-dashed border-[#c1c8c2]" />
          </div>

          {/* Queue Number & QR Code Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[11px] text-[#717973] uppercase font-bold tracking-wider">Assigned Mandi Queue</span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-[40px] font-extrabold font-headline text-[#012d1d] leading-none">
                  {booking.queueNumber}
                </span>
                <span className="text-[13px] font-semibold text-[#717973]">
                  ({booking.queueAhead} farmers ahead)
                </span>
              </div>
              <p className="text-[12px] text-[#414844]">
                Estimated Entry Time: <strong className="text-[#191c1d]">{booking.timeSlot}</strong>
              </p>
            </div>

            <div className="text-center shrink-0">
              <div className="w-28 h-28 bg-white border-2 border-[#1b4332] p-1.5 rounded-2xl shadow-sm mx-auto">
                <img
                  src={booking.qrCodeUrl}
                  alt="Gate Pass QR"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-mono text-[#717973] mt-1.5 block">Scan at Gate #2</span>
            </div>
          </div>

          {/* Arrive 15 mins Notice Pill */}
          <div className="p-3.5 bg-[#c1ecd4]/30 border border-[#1b4332]/30 rounded-xl text-[12px] text-[#274e3d] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#1b4332] shrink-0" />
            <span>
              <strong>Mandatory Protocol:</strong> Please arrive at least 15 minutes before your scheduled slot ({booking.timeSlot}) with your original Aadhaar and 7/12 extract for initial weighing calibration.
            </span>
          </div>
        </div>

        {/* Ticket Footer Actions */}
        <div className="bg-[#f8f9fa] px-6 sm:px-8 py-4 border-t border-[#edeeef] flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <span className="text-[12px] text-[#717973]">Generated via KisanLink Portal</span>
          
          <button
            onClick={() => setShowCancelModal(true)}
            className="text-[13px] font-bold text-[#ba1a1a] hover:underline cursor-pointer"
          >
            Cancel Delivery Booking
          </button>
        </div>
      </div>

      {/* Cancellation Warning Dialog */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center gap-3 text-[#ba1a1a]">
              <div className="p-3 bg-[#ffdad6] rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Cancel Delivery Booking?</h3>
            </div>

            <p className="text-[13px] text-[#414844] leading-relaxed">
              Are you sure you want to cancel your delivery slot <strong className="text-[#191c1d]">#{booking.ticketId}</strong> for {booking.cropName} on {booking.date}?
            </p>

            <div className="p-3.5 bg-[#ffdad6]/40 border border-[#ba1a1a]/30 rounded-xl text-[12px] text-[#93000a] space-y-1">
              <strong className="block">State Mandi Notice:</strong>
              <p>Canceling more than two times within a single harvest season will result in a temporary account booking suspension for 7 days.</p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
