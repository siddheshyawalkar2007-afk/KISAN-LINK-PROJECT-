import React from 'react';
import { ScreenId } from '../../types';
import { ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-[#c1c8c2] py-8 px-6 lg:px-12 text-[#414844] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-[#1b4332] text-white rounded-lg">
            <ShieldCheck className="w-5 h-5 text-[#c1ecd4]" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#012d1d] font-headline">KisanLink Farmer Portal</p>
            <p className="text-[12px] text-[#717973]">Department of Agriculture & Farmers Welfare, Govt. of India</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-[13px] font-medium text-[#414844]">
          <button onClick={() => onNavigate('help')} className="hover:text-[#012d1d] transition-colors cursor-pointer flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#717973]" /> Help & Support
          </button>
          <button onClick={() => onNavigate('settings')} className="hover:text-[#012d1d] transition-colors cursor-pointer">
            Terms of Service
          </button>
          <button onClick={() => onNavigate('settings')} className="hover:text-[#012d1d] transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => onNavigate('help')} className="hover:text-[#012d1d] transition-colors cursor-pointer flex items-center gap-1.5 text-[#1b4332] font-semibold">
            <PhoneCall className="w-4 h-4" /> Kisan Helpline: 1800-123-4567
          </button>
        </div>

        <p className="text-[12px] text-[#717973]">
          © {new Date().getFullYear()} KisanLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
