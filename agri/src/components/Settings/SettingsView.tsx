import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Languages, 
  Moon, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { ScreenId } from '../../types';

interface SettingsViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [mspUpdates, setMspUpdates] = useState(true);
  const [language, setLanguage] = useState('English');
  const [toastMsg, setToastMsg] = useState(false);

  const handleSaveSettings = () => {
    setToastMsg(true);
    setTimeout(() => setToastMsg(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-[26px] font-extrabold font-headline text-[#012d1d]">Portal Preferences & Settings</h2>
        <p className="text-[14px] text-[#414844]">
          Configure SMS delivery notifications, language options, and security credentials.
        </p>
      </div>

      {toastMsg && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-2xl flex items-center gap-2 font-semibold text-[14px] shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#137333]" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Language & Regional Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#edeeef]">
          <Languages className="w-5 h-5 text-[#1b4332]" />
          <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Language & Locale</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['English', 'मराठी (Marathi)', 'हिंदी (Hindi)'].map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                handleSaveSettings();
              }}
              className={`p-4 rounded-2xl border font-bold text-[14px] text-left transition-all cursor-pointer ${
                language === lang
                  ? 'bg-[#c1ecd4]/30 border-[#1b4332] text-[#012d1d] ring-1 ring-[#1b4332]'
                  : 'bg-[#f8f9fa] border-[#c1c8c2] text-[#414844] hover:bg-[#edeeef]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#edeeef]">
          <Bell className="w-5 h-5 text-[#1b4332]" />
          <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Alert & Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef]">
            <div>
              <h4 className="font-bold text-[14px] text-[#191c1d]">Delivery Slot SMS Alerts</h4>
              <p className="text-[12px] text-[#414844]">Receive live queue position updates and gate pass tokens via SMS</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => {
                setSmsAlerts(e.target.checked);
                handleSaveSettings();
              }}
              className="w-5 h-5 accent-[#012d1d] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef]">
            <div>
              <h4 className="font-bold text-[14px] text-[#191c1d]">WhatsApp Procurement Notifications</h4>
              <p className="text-[12px] text-[#414844]">Get digital receipts and weighing slips sent to your registered WhatsApp</p>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => {
                setWhatsappAlerts(e.target.checked);
                handleSaveSettings();
              }}
              className="w-5 h-5 accent-[#012d1d] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef]">
            <div>
              <h4 className="font-bold text-[14px] text-[#191c1d]">MSP Revision & Subsidy Alerts</h4>
              <p className="text-[12px] text-[#414844]">Get notified whenever new seasonal minimum support prices are declared</p>
            </div>
            <input
              type="checkbox"
              checked={mspUpdates}
              onChange={(e) => {
                setMspUpdates(e.target.checked);
                handleSaveSettings();
              }}
              className="w-5 h-5 accent-[#012d1d] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Security & Danger Zone */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-4">
        <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Account Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('help')}
            className="px-5 py-2.5 bg-[#f8f9fa] hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-xl text-[13px] font-semibold flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#717973]" />
            <span>Kisan Support Center</span>
          </button>
          <button
            onClick={() => onNavigate('registration')}
            className="px-5 py-2.5 bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#ba1a1a] rounded-xl text-[13px] font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#ba1a1a]" />
            <span>Switch / Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
