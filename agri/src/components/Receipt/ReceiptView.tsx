import React from 'react';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  FileCheck
} from 'lucide-react';
import { ScreenId } from '../../types';

interface ReceiptViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ReceiptView: React.FC<ReceiptViewProps> = ({ onNavigate }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* Action Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => onNavigate('booking-ticket')}
          className="px-3.5 py-2 bg-white hover:bg-[#edeeef] text-[#012d1d] font-semibold text-[13px] rounded-xl border border-[#c1c8c2] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ticket</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-xl text-[13px] font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#c1ecd4]" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white rounded-3xl border border-[#c1c8c2] shadow-xl p-8 sm:p-10 print-area space-y-8">
        {/* Receipt Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#edeeef] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1b4332] text-white rounded-2xl">
              <Building2 className="w-7 h-7 text-[#c1ecd4]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#717973]">Government Procurement Portal</span>
              <h2 className="text-[22px] sm:text-[24px] font-extrabold font-headline text-[#012d1d]">
                Official Payment Receipt
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="px-3.5 py-1 bg-[#c1ecd4] text-[#002114] font-extrabold text-[12px] rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <CheckCircle2 className="w-4 h-4 text-[#137333]" />
              PAID & SETTLED
            </span>
            <span className="text-[12px] font-mono text-[#717973] mt-1.5">Receipt #REC-1024</span>
          </div>
        </div>

        {/* Billed To and Meta Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px]">
          <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
            <span className="text-[11px] text-[#717973] font-bold uppercase tracking-wider">Billed To (Farmer):</span>
            <p className="text-[16px] font-bold text-[#191c1d]">Rahul Patil</p>
            <p className="text-[#414844] font-mono">Farmer ID: FARM-2026-991</p>
            <p className="text-[#414844]">Village: Pimpri, District: Pune, Maharashtra</p>
          </div>

          <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] space-y-1">
            <span className="text-[11px] text-[#717973] font-bold uppercase tracking-wider">Procurement Details:</span>
            <p className="font-semibold text-[#191c1d]">Pune Gov Collection Center</p>
            <p className="text-[#414844]">Date: <strong className="text-[#191c1d]">October 24, 2024</strong></p>
            <p className="text-[#414844] font-mono">Txn ID: PAY-9988</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-[#c1c8c2] rounded-2xl overflow-hidden">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f8f9fa] border-b border-[#c1c8c2] text-[12px] font-bold text-[#717973] uppercase tracking-wider">
              <tr>
                <th className="p-4">Item Description</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">MSP Rate</th>
                <th className="p-4 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edeeef]">
              <tr>
                <td className="p-4">
                  <p className="font-bold text-[#191c1d]">Crop Procurement: Wheat (Lokwan)</p>
                  <p className="text-[12px] text-[#717973]">Grade A • Direct Central Silo Delivery</p>
                </td>
                <td className="p-4 font-semibold text-[#191c1d]">40 kg</td>
                <td className="p-4 text-[#414844]">₹240 / kg</td>
                <td className="p-4 text-right font-bold text-[#191c1d]">₹9,600.00</td>
              </tr>
            </tbody>
            <tfoot className="bg-[#f8f9fa] border-t border-[#c1c8c2] font-semibold text-[14px]">
              <tr>
                <td colSpan={3} className="p-4 text-right text-[#414844]">Subtotal</td>
                <td className="p-4 text-right font-bold text-[#191c1d]">₹9,600.00</td>
              </tr>
              <tr className="border-t border-[#edeeef] text-[16px]">
                <td colSpan={3} className="p-4 text-right font-extrabold text-[#012d1d]">Total Paid via DBT</td>
                <td className="p-4 text-right font-extrabold text-[#1b4332] text-[18px]">₹9,600.00</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment Transfer Information */}
        <div className="p-5 bg-[#c1ecd4]/20 border border-[#1b4332]/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#137333]" />
              <span className="font-bold text-[14px] text-[#012d1d]">Direct Benefit Transfer (DBT) Credited</span>
            </div>
            <p className="text-[13px] text-[#274e3d]">
              Transferred to: <strong className="text-[#012d1d]">State Bank of India (XXXX 4521)</strong>
            </p>
            <p className="text-[12px] font-mono text-[#717973]">Bank Ref: SBI-DBT-20241024-9988</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase font-bold text-[#717973] block">Status</span>
            <span className="text-[14px] font-bold text-[#137333]">Completed</span>
          </div>
        </div>

        {/* Signature & Seal */}
        <div className="pt-6 border-t border-[#edeeef] flex flex-col sm:flex-row items-center justify-between gap-6 text-[12px] text-[#717973]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-stone-100 rounded-full border border-stone-300 flex items-center justify-center text-[18px]">
              🏛️
            </div>
            <div>
              <p className="font-bold text-[#191c1d]">Government APMC Center, Pune</p>
              <p>Department of Food and Public Distribution</p>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="font-serif italic font-bold text-[14px] text-[#012d1d]">Dr. S. K. Deshmukh</p>
            <p className="font-semibold text-[#414844]">Authorized Mandi Procurement Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
