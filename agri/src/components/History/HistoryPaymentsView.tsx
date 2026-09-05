import React, { useState } from 'react';
import { 
  CreditCard, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Filter, 
  ShieldCheck, 
  Landmark,
  Truck,
  PackageCheck,
  Ban,
  AlertTriangle,
  MapPin,
  ChevronRight,
  Sparkles,
  Check,
  Loader2,
  RefreshCw,
  Info,
  Download
} from 'lucide-react';
import { PaymentTransaction, CropEntry, DeliverySlotBooking, ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface HistoryPaymentsViewProps {
  transactions: PaymentTransaction[];
  crops: CropEntry[];
  bookings: DeliverySlotBooking[];
  onNavigate: (screen: ScreenId) => void;
  onCancelBooking?: (ticketId: string) => void;
  language?: Language;
  initialTab?: 'bookings' | 'tracker' | 'payments' | 'crops';
}

export const HistoryPaymentsView: React.FC<HistoryPaymentsViewProps> = ({
  transactions,
  crops,
  bookings,
  onNavigate,
  onCancelBooking,
  language = 'en',
  initialTab = 'tracker',
}) => {
  const t = TRANSLATIONS[language];
  const [activeMainTab, setActiveMainTab] = useState<'bookings' | 'tracker' | 'payments' | 'crops'>(initialTab);
  const [bookingFilter, setBookingFilter] = useState<'ALL' | 'Confirmed' | 'Pending' | 'Cancelled'>('ALL');
  const [selectedBookingTicketId, setSelectedBookingTicketId] = useState<string>(bookings[0]?.ticketId || '');
  const [cancellingTicketId, setCancellingTicketId] = useState<string | null>(null);

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'ALL') return true;
    return b.status === bookingFilter;
  });

  const activeBooking = bookings.find((b) => b.ticketId === selectedBookingTicketId) || bookings[0];

  const handleConfirmCancel = () => {
    if (cancellingTicketId && onCancelBooking) {
      onCancelBooking(cancellingTicketId);
    }
    setCancellingTicketId(null);
  };

  // Live Payment Journey & Delivery Tracker Stages
  const livePaymentStages = [
    {
      id: 1,
      title: 'Payment Initiated',
      description: 'Your procurement payment request has been created.',
      status: 'COMPLETED' as const,
      icon: Check,
      time: 'Oct 24, 09:30 AM',
    },
    {
      id: 2,
      title: 'Crop Verified',
      description: 'Crop delivery, weighment and quality have been verified.',
      status: 'COMPLETED' as const,
      icon: Check,
      time: 'Oct 24, 11:45 AM',
    },
    {
      id: 3,
      title: 'MSP Calculated',
      description: 'The payable amount has been calculated according to MSP.',
      status: 'COMPLETED' as const,
      icon: Check,
      time: 'Oct 24, 01:15 PM',
    },
    {
      id: 4,
      title: 'Payment Processing',
      description: 'Payment is being processed through the government treasury.',
      status: 'IN_PROGRESS' as const,
      icon: Clock,
      alertMessage: 'Your payment is currently being processed. Please wait for the next status update.',
      time: 'Oct 24, 03:00 PM',
    },
    {
      id: 5,
      title: 'Sent to Bank',
      description: 'Payment instruction has been sent to your bank account.',
      status: 'UPCOMING' as const,
      icon: Landmark,
      time: 'Expected within 24 hrs',
    },
    {
      id: 6,
      title: 'Payment Credited',
      description: 'Amount has been successfully credited to your bank account.',
      status: 'UPCOMING' as const,
      icon: Check,
      time: 'Final Step',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header with Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[26px] font-extrabold font-headline text-[#012d1d]">
            {t.historyPayments}
          </h2>
          <p className="text-[14px] text-[#414844]">
            Manage booking slots, live Amazon-style procurement tracking, and direct bank transfers.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[#edeeef] p-1 rounded-2xl w-fit flex-wrap">
          <button
            onClick={() => setActiveMainTab('bookings')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              activeMainTab === 'bookings'
                ? 'bg-white text-[#012d1d] shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            Booking Slots ({bookings.length})
          </button>
          <button
            onClick={() => setActiveMainTab('tracker')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'tracker'
                ? 'bg-white text-[#012d1d] shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            <Truck className="w-4 h-4 text-[#137333]" />
            <span>Live Delivery Tracker</span>
          </button>
          <button
            onClick={() => setActiveMainTab('payments')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              activeMainTab === 'payments'
                ? 'bg-white text-[#012d1d] shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            DBT Payments
          </button>
          <button
            onClick={() => setActiveMainTab('crops')}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
              activeMainTab === 'crops'
                ? 'bg-white text-[#012d1d] shadow-xs'
                : 'text-[#414844] hover:text-[#191c1d]'
            }`}
          >
            Crop Records
          </button>
        </div>
      </div>

      {/* 1. BOOKING SLOTS TAB WITH STATUS FILTERS (ALL, CONFIRMED, PENDING, CANCELLED) & CANCEL OPTION */}
      {activeMainTab === 'bookings' && (
        <div className="space-y-6">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#c1c8c2] shadow-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#717973]" />
              <span className="text-[13px] font-bold text-[#191c1d]">Filter Slots:</span>
              {(['ALL', 'Confirmed', 'Pending', 'Cancelled'] as const).map((filter) => {
                const count = filter === 'ALL' 
                  ? bookings.length 
                  : bookings.filter((b) => b.status === filter).length;
                return (
                  <button
                    key={filter}
                    onClick={() => setBookingFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                      bookingFilter === filter
                        ? 'bg-[#1b4332] text-white shadow-xs'
                        : 'bg-[#edeeef] text-[#414844] hover:bg-[#e1e3e4]'
                    }`}
                  >
                    {filter === 'ALL' ? 'All Slots' : filter} ({count})
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('book-slot')}
              className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              + Book New Slot
            </button>
          </div>

          {/* Bookings List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBookings.length === 0 ? (
              <div className="col-span-2 p-12 text-center bg-white rounded-2xl border border-[#c1c8c2]">
                <p className="text-[16px] font-bold text-[#717973]">No booking slots found in this category.</p>
              </div>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.ticketId}
                  className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1b4332] transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#717973]">TICKET #{b.ticketId}</span>
                        <h3 className="text-[18px] font-bold font-headline text-[#191c1d] mt-0.5">
                          {b.cropName} ({b.quantity})
                        </h3>
                      </div>

                      <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                        b.status === 'Confirmed'
                          ? 'bg-[#c1ecd4] text-[#002114]'
                          : b.status === 'Pending'
                          ? 'bg-[#ffca98] text-[#7a532a]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="mt-4 p-3.5 bg-[#f8f9fa] rounded-xl border border-[#edeeef] space-y-2 text-[12px] text-[#414844]">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#7d562d]" /> Center:
                        </span>
                        <strong className="text-[#191c1d] text-right truncate max-w-[200px]">{b.centerName}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#1b4332]" /> Date & Slot:
                        </span>
                        <strong className="text-[#191c1d]">{b.date} at {b.timeSlot}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Queue Priority:</span>
                        <strong className="text-[#012d1d] font-bold">{b.queueNumber}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Ticket, Live Track, Cancel Slot */}
                  <div className="pt-2 border-t border-[#edeeef] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onNavigate('booking-ticket')}
                        className="px-3.5 py-1.5 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[12px] font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Digital Ticket
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBookingTicketId(b.ticketId);
                          setActiveMainTab('tracker');
                        }}
                        className="px-3.5 py-1.5 bg-[#c1ecd4] hover:bg-[#a9dfc2] text-[#002114] text-[12px] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Live Track</span>
                      </button>
                    </div>

                    {b.status !== 'Cancelled' && (
                      <button
                        onClick={() => setCancellingTicketId(b.ticketId)}
                        className="px-3 py-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]/60 text-[12px] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Cancel Slot</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. LIVE PAYMENT & DELIVERY TRACKER (Payment Journey) */}
      {activeMainTab === 'tracker' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Main Card: Payment Journey Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c1c8c2] shadow-xs space-y-8">
            {/* Header with Title and Live Status Pill */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#edeeef]">
              <div>
                <span className="text-[11px] font-extrabold tracking-widest text-[#717973] uppercase block mb-1">
                  LIVE PAYMENT TRACKING
                </span>
                <h3 className="text-[26px] sm:text-[30px] font-extrabold font-headline text-[#012d1d] tracking-tight">
                  Payment journey
                </h3>
              </div>

              <div className="shrink-0">
                <span className="px-3.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-[11px] sm:text-[12px] font-extrabold flex items-center gap-1.5 border border-[#ceead6]">
                  <span className="w-2 h-2 rounded-full bg-[#137333] inline-block"></span>
                  <span>LIVE STATUS</span>
                </span>
              </div>
            </div>

            {/* Vertical Timeline Steps */}
            <div className="space-y-0 relative">
              {livePaymentStages.map((stage, index) => {
                const isCompleted = stage.status === 'COMPLETED';
                const isInProgress = stage.status === 'IN_PROGRESS';
                const isUpcoming = stage.status === 'UPCOMING';

                return (
                  <div key={stage.id} className="relative flex items-start gap-4 sm:gap-6 pb-8 last:pb-0">
                    {/* Vertical connecting line */}
                    {index < livePaymentStages.length - 1 && (
                      <div 
                        className={`absolute left-[19px] top-10 bottom-0 w-[2px] -translate-x-1/2 ${
                          isCompleted ? 'bg-[#012d1d]' : 'bg-[#e0e2e4]'
                        }`}
                      />
                    )}

                    {/* Step Icon Node */}
                    <div className="relative z-10 shrink-0">
                      {isCompleted ? (
                        <div className="w-10 h-10 rounded-full bg-[#012d1d] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-5 h-5 text-white" strokeWidth={3} />
                        </div>
                      ) : isInProgress ? (
                        <div className="w-10 h-10 rounded-full bg-[#7a532a] text-white flex items-center justify-center ring-4 ring-[#ffca98]/60 shadow-xs">
                          <Clock className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#f1f3f4] border border-[#dadce0] text-[#717973] flex items-center justify-center">
                          {stage.id === 5 ? (
                            <Landmark className="w-5 h-5 text-[#717973]" />
                          ) : (
                            <Check className="w-5 h-5 text-[#717973]" strokeWidth={2.5} />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Step Text Details and Badges */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                        <div>
                          <h4 className={`text-[16px] sm:text-[17px] font-bold ${
                            isUpcoming ? 'text-[#717973]' : 'text-[#191c1d]'
                          }`}>
                            {stage.title}
                          </h4>
                          <p className={`text-[13px] sm:text-[14px] mt-0.5 leading-relaxed ${
                            isUpcoming ? 'text-[#80868b]' : 'text-[#5f6368]'
                          }`}>
                            {stage.description}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0 mt-1 sm:mt-0">
                          {isCompleted ? (
                            <span className="px-3 py-1 bg-[#e6f4ea] text-[#137333] text-[11px] font-extrabold rounded-full inline-flex items-center gap-1 border border-[#ceead6]">
                              <Check className="w-3 h-3 text-[#137333]" strokeWidth={3} />
                              <span>COMPLETED</span>
                            </span>
                          ) : isInProgress ? (
                            <span className="px-3 py-1 bg-[#ffeedd] text-[#7a532a] text-[11px] font-extrabold rounded-full inline-flex items-center gap-1.5 border border-[#ffd8b2]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7a532a] animate-pulse" />
                              <span>IN PROGRESS</span>
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-[#f1f3f4] text-[#80868b] text-[11px] font-bold rounded-full inline-block">
                              UPCOMING
                            </span>
                          )}
                        </div>
                      </div>

                      {/* In-Progress Alert Banner */}
                      {stage.alertMessage && (
                        <div className="bg-[#fff8f0] border border-[#ffca98] rounded-2xl p-3.5 sm:p-4 mt-3 flex items-center gap-3 shadow-xs">
                          <Loader2 className="w-4 h-4 text-[#7a532a] animate-spin shrink-0" />
                          <p className="text-[13px] font-medium text-[#7a532a] leading-relaxed">
                            {stage.alertMessage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary & Ticket Information */}
            <div className="pt-6 border-t border-[#edeeef] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#c1ecd4]/40 text-[#012d1d]">
                  <Truck className="w-5 h-5 text-[#1b4332]" />
                </div>
                <div>
                  <span className="text-[12px] text-[#717973] block font-mono">
                    Ticket #{activeBooking?.ticketId || 'TKT-8842'} • {activeBooking?.cropName || 'Wheat'} ({activeBooking?.quantity || '40 Quintals'})
                  </span>
                  <span className="text-[14px] font-bold text-[#012d1d]">
                    {activeBooking?.centerName || 'Pune Gov Collection Center'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('booking-ticket')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-bold rounded-xl transition-all cursor-pointer"
                >
                  Digital Ticket
                </button>
                <button
                  onClick={() => setActiveMainTab('bookings')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] text-[13px] font-bold rounded-xl transition-all cursor-pointer"
                >
                  All Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DBT PAYMENTS TAB */}
      {activeMainTab === 'payments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#c1c8c2] shadow-xs">
              <span className="text-[12px] font-bold text-[#717973] uppercase tracking-wider">Total Disbursals</span>
              <p className="text-[26px] font-extrabold font-headline text-[#012d1d] mt-1">₹84,500</p>
              <span className="text-[12px] font-semibold text-[#137333]">100% DBT Verified</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#c1c8c2] shadow-xs">
              <span className="text-[12px] font-bold text-[#717973] uppercase tracking-wider">Primary Bank</span>
              <p className="text-[18px] font-bold font-headline text-[#012d1d] mt-1">State Bank of India</p>
              <span className="text-[12px] text-[#717973] font-mono">A/C: •••• 4567 (IFSC: SBIN0001234)</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#c1c8c2] shadow-xs">
              <span className="text-[12px] font-bold text-[#717973] uppercase tracking-wider">Pending Release</span>
              <p className="text-[26px] font-extrabold font-headline text-[#7a532a] mt-1">₹91,000</p>
              <span className="text-[12px] text-[#717973]">Scheduled Oct 25</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Direct Benefit Transfer Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#c1c8c2] text-[11px] font-bold text-[#717973] uppercase tracking-wider">
                    <th className="pb-3">Transaction Ref</th>
                    <th className="pb-3">Scheme & Crop</th>
                    <th className="pb-3">Bank Account</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edeeef]">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-[#f8f9fa] transition-colors">
                      <td className="py-3.5 font-mono font-bold text-[#012d1d]">{t.transactionRef}</td>
                      <td className="py-3.5 font-semibold text-[#191c1d]">{t.title}</td>
                      <td className="py-3.5 text-[#414844]">{t.bankAccount}</td>
                      <td className="py-3.5 text-[#717973]">{t.date}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-extrabold font-headline text-[#012d1d]">
                        ₹{t.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. CROP RECORDS TAB */}
      {activeMainTab === 'crops' && (
        <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Seasonal Crop Declarations ({crops.length})</h3>
            <button
              onClick={() => onNavigate('crop-management')}
              className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-bold rounded-xl cursor-pointer"
            >
              + Add Crop (Step 1)
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#c1c8c2] text-[11px] font-bold text-[#717973] uppercase tracking-wider">
                  <th className="pb-3">Crop Name</th>
                  <th className="pb-3">Variety</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Grade</th>
                  <th className="pb-3">Declared Quantity</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeeef]">
                {crops.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3.5 font-bold text-[#191c1d]">{c.cropName}</td>
                    <td className="py-3.5 text-[#414844]">{c.variety}</td>
                    <td className="py-3.5 text-[#414844]">{c.category}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
                        Grade {c.grade}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-[#191c1d]">{c.quantityQuintals} Quintals</td>
                    <td className="py-3.5 text-[#717973]">{c.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cancel Slot Confirmation Modal */}
      {cancellingTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#93000a] mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-[20px] font-bold font-headline text-[#191c1d]">
                Cancel Delivery Slot #{cancellingTicketId}?
              </h3>
              <p className="text-[13px] text-[#414844] mt-1">
                Are you sure you want to cancel this booking? The slot quota will be released to other farmers immediately.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCancellingTicketId(null)}
                className="flex-1 py-3 bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] font-bold text-[14px] rounded-xl transition-all cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-3 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[14px] rounded-xl transition-all cursor-pointer shadow-md"
              >
                Yes, Cancel Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
