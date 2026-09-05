import React, { useState } from 'react';
import { 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Headphones,
  FileQuestion
} from 'lucide-react';
import { FAQS } from '../../data/mockData';
import { SupportTicket } from '../../types';

export const HelpView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  // Ticket Form State
  const [ticketCategory, setTicketCategory] = useState('Payment Delay');
  const [ticketDescription, setTicketDescription] = useState('');
  const [submittedTickets, setSubmittedTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-SUP-8812',
      category: 'Weighing Discrepancy',
      description: 'Requesting calibration check at Hadapsar Mandi for Wheat Lot #4.',
      status: 'Resolved',
      createdAt: 'Oct 18, 2024',
    }
  ]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDescription.trim()) return;

    const newTicket: SupportTicket = {
      id: `TKT-SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: ticketCategory,
      description: ticketDescription,
      status: 'In Review',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setSubmittedTickets([newTicket, ...submittedTickets]);
    setTicketDescription('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-[26px] font-extrabold font-headline text-[#012d1d]">Help & Farmer Helpline</h2>
        <p className="text-[14px] text-[#414844]">
          Get immediate assistance with slot bookings, DBT payments, land record verifications, and mandi operations.
        </p>
      </div>

      {/* Toast */}
      {showSuccessToast && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-2xl flex items-center gap-2 font-semibold text-[14px] shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#137333]" />
          <span>Support grievance ticket registered! A mandi officer will respond within 24 hours.</span>
        </div>
      )}

      {/* Helpline Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1b4332] text-white rounded-2xl p-5 border border-[#1b4332] shadow-sm space-y-2">
          <div className="p-2.5 bg-[#c1ecd4] text-[#002114] rounded-xl w-fit">
            <PhoneCall className="w-5 h-5 text-[#012d1d]" />
          </div>
          <h3 className="font-bold font-headline text-[16px]">Kisan Toll-Free Helpline</h3>
          <p className="text-[20px] font-extrabold font-mono text-[#c1ecd4]">1800-123-4567</p>
          <p className="text-[12px] text-[#e1e3e4]">Available 24x7 (Toll-Free in all languages)</p>
        </div>

        <div className="bg-white text-[#191c1d] rounded-2xl p-5 border border-[#c1c8c2] shadow-xs space-y-2">
          <div className="p-2.5 bg-[#c1ecd4]/40 text-[#012d1d] rounded-xl w-fit">
            <MessageSquare className="w-5 h-5 text-[#1b4332]" />
          </div>
          <h3 className="font-bold font-headline text-[16px]">WhatsApp Mandi Assistant</h3>
          <p className="text-[18px] font-bold font-mono text-[#012d1d]">+91 98765 43210</p>
          <p className="text-[12px] text-[#717973]">Instant slot status & token bot</p>
        </div>

        <div className="bg-white text-[#191c1d] rounded-2xl p-5 border border-[#c1c8c2] shadow-xs space-y-2">
          <div className="p-2.5 bg-[#ffca98]/40 text-[#7d562d] rounded-xl w-fit">
            <Headphones className="w-5 h-5 text-[#7d562d]" />
          </div>
          <h3 className="font-bold font-headline text-[16px]">District Desk Officer</h3>
          <p className="text-[15px] font-bold text-[#191c1d]">APMC Pune Support Cell</p>
          <p className="text-[12px] text-[#717973]">Mon - Sat: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-[#1b4332]" />
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Frequently Asked Questions</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#717973]" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] outline-none focus:ring-2 focus:ring-[#1b4332]"
            />
          </div>
        </div>

        <div className="divide-y divide-[#edeeef]">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className="py-4">
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center text-left gap-4 cursor-pointer group"
                >
                  <span className="font-bold text-[15px] text-[#191c1d] group-hover:text-[#1b4332] transition-colors">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#1b4332] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#717973] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-[14px] text-[#414844] leading-relaxed pl-2 border-l-2 border-[#1b4332] animate-in fade-in duration-150">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raise a Support Ticket Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
        <div>
          <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Raise a Support Ticket / Grievance</h3>
          <p className="text-[13px] text-[#717973]">Submit inquiries regarding delivery delay, payment mismatch, or license renewal</p>
        </div>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Grievance Category</label>
            <select
              value={ticketCategory}
              onChange={(e) => setTicketCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
            >
              <option value="Payment Delay">Payment & Direct Benefit Transfer Delay</option>
              <option value="Booking Problem">Booking Delivery Slot Issue</option>
              <option value="Verification Issue">7/12 Land Record Verification Error</option>
              <option value="Weighing Discrepancy">Mandi Weighing & Moisture Recheck</option>
              <option value="Other">Other Technical Query</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Describe your issue with ticket numbers, center location, or transaction references..."
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4 text-[#c1ecd4]" />
              <span>Submit Grievance</span>
            </button>
          </div>
        </form>

        {/* Existing User Tickets */}
        {submittedTickets.length > 0 && (
          <div className="pt-4 border-t border-[#edeeef] space-y-3">
            <h4 className="text-[14px] font-bold text-[#191c1d]">Your Submitted Tickets</h4>
            <div className="space-y-2">
              {submittedTickets.map((t) => (
                <div key={t.id} className="p-3.5 bg-[#f8f9fa] rounded-xl border border-[#edeeef] flex justify-between items-start text-[13px]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#012d1d]">{t.id}</span>
                      <span className="text-[#414844] font-medium">• {t.category}</span>
                    </div>
                    <p className="text-[#717973] text-[12px] mt-0.5">{t.description}</p>
                    <span className="text-[11px] text-[#717973] block mt-1">{t.createdAt}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
                    t.status === 'Resolved' ? 'bg-[#c1ecd4] text-[#002114]' : 'bg-[#ffca98] text-[#7a532a]'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
