import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Landmark, 
  Sprout, 
  BadgeCheck, 
  Scale, 
  CalendarCheck, 
  MapPin, 
  History, 
  CreditCard, 
  Settings, 
  Headphones, 
  HelpCircle, 
  LogOut,
  X,
  UserPlus,
  Ticket,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { ScreenId, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  farmerName: string;
  avatarUrl: string;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  farmerName,
  avatarUrl,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const workflowItems = [
    { id: 'dashboard' as ScreenId, label: t.dashboard, icon: LayoutDashboard, badge: null },
    { id: 'crop-management' as ScreenId, label: t.cropManagement, icon: Sprout, badge: 'Step 1' },
    { id: 'gov-requirements' as ScreenId, label: t.govRequirements, icon: Scale, badge: 'Step 2' },
    { id: 'nearby-centers' as ScreenId, label: t.nearbyCenters, icon: MapPin, badge: 'Step 3' },
    { id: 'booking-ticket' as ScreenId, label: t.digitalPass, icon: Ticket, badge: 'Pass/Receipt' },
  ];

  const verificationItems = [
    { id: 'verification' as ScreenId, label: t.verification, icon: ShieldCheck, badge: 'Docs' },
  ];

  const historyAndSupportItems = [
    { id: 'history' as ScreenId, label: t.historyPayments, icon: Truck, badge: null },
    { id: 'registration' as ScreenId, label: t.newRegistration, icon: UserPlus, badge: null },
    { id: 'help' as ScreenId, label: t.helpSupport, icon: Headphones, badge: '24x7' },
    { id: 'settings' as ScreenId, label: t.settings, icon: Settings, badge: null },
  ];

  const handleNavClick = (screen: ScreenId) => {
    onNavigate(screen);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#f8f9fa] border-r border-[#c1c8c2] z-[70] flex flex-col py-5 px-3.5 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('dashboard')}
          >
            <img 
              src={avatarUrl} 
              alt={farmerName} 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#1b4332]"
            />
            <div className="min-w-0">
              <h1 className="text-[17px] font-extrabold font-headline text-[#012d1d] tracking-tight leading-tight group-hover:text-[#1b4332] transition-colors truncate">
                {farmerName}
              </h1>
              <p className="text-[11px] font-bold text-[#137333] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#137333] inline-block"></span>
                Govt. Verified Profile
              </p>
            </div>
          </div>
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[#414844] hover:bg-[#edeeef]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation Links Ordered Line by Line by Booking Flow */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-[13px]">
          {/* Section 1: Step-by-Step Booking Workflow */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#717973] block mb-1.5">
              Sequential Booking Steps
            </span>
            {workflowItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all duration-150 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#1b4332] text-white font-bold shadow-xs'
                      : 'text-[#414844] hover:text-[#191c1d] hover:bg-[#e7e8e9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c1ecd4]' : 'text-[#1b4332]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${
                      isActive ? 'bg-[#c1ecd4] text-[#002114]' : 'bg-[#edeeef] text-[#414844]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 2: Verification & Land Records */}
          <div className="space-y-1 pt-2 border-t border-[#edeeef]">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#717973] block mb-1.5">
              Certificates & Verification
            </span>
            {verificationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all duration-150 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#1b4332] text-white font-bold shadow-xs'
                      : 'text-[#414844] hover:text-[#191c1d] hover:bg-[#e7e8e9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c1ecd4]' : 'text-[#7d562d]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${
                      isActive ? 'bg-[#c1ecd4] text-[#002114]' : 'bg-[#c1ecd4]/50 text-[#012d1d]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 3: Records & Support */}
          <div className="space-y-1 pt-2 border-t border-[#edeeef]">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-[#717973] block mb-1.5">
              History & Support
            </span>
            {historyAndSupportItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || 
                (item.id === 'history' && (currentScreen === 'payments' || currentScreen === 'receipt'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all duration-150 text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#1b4332] text-white font-bold shadow-xs'
                      : 'text-[#414844] hover:text-[#191c1d] hover:bg-[#e7e8e9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c1ecd4]' : 'text-[#414844]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1 ${
                      isActive ? 'bg-[#c1ecd4] text-[#002114]' : 'bg-[#ffca98] text-[#7a532a]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Support & Helpline Action */}
        <div className="mt-auto pt-3 border-t border-[#c1c8c2] space-y-2">
          <button
            onClick={() => handleNavClick('help')}
            className="w-full py-2.5 px-3 bg-[#012d1d] text-white rounded-xl text-[13px] font-bold hover:bg-[#1b4332] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <Headphones className="w-4 h-4 text-[#c1ecd4]" />
            <span>Kisan 24x7 Helpline</span>
          </button>
        </div>
      </aside>
    </>
  );
};
