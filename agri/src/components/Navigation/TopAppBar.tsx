import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Clock, 
  Globe, 
  UserPlus, 
  PhoneCall, 
  HelpCircle 
} from 'lucide-react';
import { NotificationItem, ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface TopAppBarProps {
  onToggleMobileMenu: () => void;
  onNavigate: (screen: ScreenId) => void;
  farmerName: string;
  avatarUrl: string;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  title?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onToggleMobileMenu,
  onNavigate,
  farmerName,
  avatarUrl,
  notifications,
  onMarkNotificationRead,
  language,
  onLanguageChange,
  title,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[language];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('crop') || q.includes('wheat') || q.includes('rice')) {
      onNavigate('crop-management');
    } else if (q.includes('slot') || q.includes('book') || q.includes('delivery')) {
      onNavigate('book-slot');
    } else if (q.includes('pay') || q.includes('money') || q.includes('subsidy')) {
      onNavigate('payments');
    } else if (q.includes('bank')) {
      onNavigate('bank-accounts');
    } else if (q.includes('verify') || q.includes('7/12') || q.includes('8a') || q.includes('pik')) {
      onNavigate('verification');
    } else if (q.includes('gov') || q.includes('msp') || q.includes('quota')) {
      onNavigate('gov-requirements');
    } else if (q.includes('ticket')) {
      onNavigate('booking-ticket');
    } else {
      onNavigate('help');
    }
  };

  return (
    <>
      <header className="flex justify-between items-center w-full px-4 sm:px-6 py-3 sticky top-0 z-40 bg-[#f8f9fa]/90 backdrop-blur-md border-b border-[#c1c8c2] shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 text-[#414844] hover:text-[#012d1d] hover:bg-[#edeeef] rounded-full transition-colors cursor-pointer active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#012d1d] flex items-center justify-center text-[#c1ecd4] font-bold text-[17px] shadow-xs">
                🌾
              </div>
              <div>
                <h1 className="text-[17px] sm:text-[19px] font-extrabold font-headline text-[#012d1d] leading-none">
                  KisanLink
                </h1>
                <span className="text-[10px] text-[#717973] font-semibold uppercase tracking-wider block mt-0.5">
                  Govt. Procurement
                </span>
              </div>
            </div>
            {title && (
              <h2 className="hidden xl:block text-[18px] font-bold font-headline text-[#1b4332] pl-3 border-l border-[#c1c8c2]">
                {title}
              </h2>
            )}
          </div>
        </div>

        {/* Search Bar on Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-64 lg:w-72">
          <Search className="w-4 h-4 absolute left-3 text-[#717973] pointer-events-none" />
          <input
            type="text"
            placeholder="Search crops, 8A, slots, payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#edeeef] text-[#191c1d] placeholder-[#717973] text-[13px] rounded-full outline-none focus:ring-2 focus:ring-[#012d1d]/30 border border-transparent focus:border-[#717973] transition-all"
          />
        </form>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Selector */}
          <div className="flex items-center bg-[#edeeef] p-1 rounded-xl border border-[#c1c8c2]/50 text-[12px] font-bold">
            <Globe className="w-3.5 h-3.5 text-[#1b4332] ml-1.5 mr-1 shrink-0" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'en' ? 'bg-white text-[#012d1d] shadow-xs' : 'text-[#414844] hover:text-[#191c1d]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'hi' ? 'bg-white text-[#012d1d] shadow-xs' : 'text-[#414844] hover:text-[#191c1d]'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                language === 'mr' ? 'bg-white text-[#012d1d] shadow-xs' : 'text-[#414844] hover:text-[#191c1d]'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* New Registration Button */}
          <button
            onClick={() => onNavigate('registration')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1b4332] hover:bg-[#012d1d] text-white text-[12px] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#c1ecd4]" />
            <span>+ {t.newRegistration}</span>
          </button>

          {/* Kisan Helpline Shortcut */}
          <button
            onClick={() => onNavigate('help')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#c1ecd4]/20 border border-[#c1c8c2] text-[#012d1d] text-[12px] font-bold rounded-xl transition-colors cursor-pointer"
            title="Kisan Toll-Free Helpline: 1800-123-4567"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#7d562d]" />
            <span className="font-mono">1800-123-4567</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#414844] hover:text-[#012d1d] hover:bg-[#edeeef] rounded-full transition-colors relative cursor-pointer active:scale-95"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-[#f8f9fa]" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#c1c8c2] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#edeeef]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-bold font-headline text-[#191c1d]">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="bg-[#c1ecd4] text-[#002114] text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 text-[#717973] hover:text-[#191c1d] rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="divide-y divide-[#edeeef] max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-3 hover:bg-[#f8f9fa] transition-colors rounded-xl cursor-pointer flex gap-3 items-start ${
                        !n.read ? 'bg-[#c1ecd4]/20' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {n.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                        ) : (
                          <Clock className="w-4 h-4 text-[#7d562d]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-[#191c1d]">{n.title}</p>
                        <p className="text-[12px] text-[#414844] mt-0.5 leading-relaxed">{n.message}</p>
                        <span className="text-[11px] text-[#717973] mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verification Shield Indicator */}
          <button
            onClick={() => setShowVerifiedModal(true)}
            className="p-2 text-[#414844] hover:text-[#137333] hover:bg-[#edeeef] rounded-full transition-colors cursor-pointer active:scale-95"
            title="Verified Farmer Identity: 8A, Pik-Pera & Aadhaar Active"
          >
            <ShieldCheck className="w-5 h-5 text-[#137333]" />
          </button>

          <div className="h-6 w-px bg-[#c1c8c2] mx-0.5 hidden sm:block" />

          {/* User Profile Avatar */}
          <div 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-[#1b4332]/40 transition-all"
            title={`${farmerName} Profile`}
          >
            <img
              src={avatarUrl}
              alt={farmerName}
              className="w-9 h-9 rounded-full object-cover border border-[#c1c8c2]"
            />
          </div>
        </div>
      </header>

      {/* Verified Status Modal */}
      {showVerifiedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#c1ecd4] text-[#002114]">
                  <ShieldCheck className="w-6 h-6 text-[#137333]" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Government Verified Profile</h3>
                  <p className="text-[12px] text-[#414844]">Active Mahabhulekh & Agri DBT Identity</p>
                </div>
              </div>
              <button 
                onClick={() => setShowVerifiedModal(false)}
                className="p-1 rounded-lg text-[#717973] hover:text-[#191c1d]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl text-[13px] border border-[#edeeef]">
                <span className="text-[#414844] font-medium">8A Khatedar Certificate:</span>
                <span className="font-bold text-[#137333] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified & Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl text-[13px] border border-[#edeeef]">
                <span className="text-[#414844] font-medium">Pik-Pera Crop Sowing (e-Pik):</span>
                <span className="font-bold text-[#137333] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified (Rabi 24-25)
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl text-[13px] border border-[#edeeef]">
                <span className="text-[#414844] font-medium">7/12 Land Record:</span>
                <span className="font-bold text-[#137333] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified (2.4 Ha)
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl text-[13px] border border-[#edeeef]">
                <span className="text-[#414844] font-medium">Aadhaar Linked Identity:</span>
                <span className="font-bold text-[#137333] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Active (•••• 9981)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#edeeef] flex justify-end">
              <button
                onClick={() => {
                  setShowVerifiedModal(false);
                  onNavigate('verification');
                }}
                className="px-5 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Inspect 8A & Pik-Pera Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
