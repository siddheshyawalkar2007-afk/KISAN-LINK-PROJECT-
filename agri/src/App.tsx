/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ScreenId, 
  FarmerProfile, 
  CropEntry, 
  BankAccount, 
  DeliverySlotBooking, 
  PaymentTransaction, 
  NotificationItem,
  LandRecord,
  Language
} from './types';
import { 
  INITIAL_FARMER, 
  INITIAL_CROPS, 
  INITIAL_BANK_ACCOUNTS, 
  INITIAL_LAND_RECORDS,
  INITIAL_ACTIVE_BOOKING, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

import { Sidebar } from './components/Navigation/Sidebar';
import { TopAppBar } from './components/Navigation/TopAppBar';
import { Footer } from './components/Navigation/Footer';

import { DashboardView } from './components/Dashboard/DashboardView';
import { CropManagementView } from './components/CropManagement/CropManagementView';
import { VerificationView } from './components/Verification/VerificationView';
import { GovRequirementsView } from './components/GovRequirements/GovRequirementsView';
import { BookingTicketView } from './components/Booking/BookingTicketView';
import { ReceiptView } from './components/Receipt/ReceiptView';
import { HistoryPaymentsView } from './components/History/HistoryPaymentsView';
import { RegistrationView } from './components/Registration/RegistrationView';
import { NearbyCentersView } from './components/NearbyCenters/NearbyCentersView';
import { ProfileView } from './components/Profile/ProfileView';
import { SettingsView } from './components/Settings/SettingsView';
import { HelpView } from './components/Help/HelpView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  // Application Global State
  const [farmer, setFarmer] = useState<FarmerProfile>(INITIAL_FARMER);
  const [crops, setCrops] = useState<CropEntry[]>(INITIAL_CROPS);
  const [landRecords, setLandRecords] = useState<LandRecord[]>(INITIAL_LAND_RECORDS);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(INITIAL_BANK_ACCOUNTS);
  const [bookings, setBookings] = useState<DeliverySlotBooking[]>([
    INITIAL_ACTIVE_BOOKING,
    {
      ticketId: 'TKT-7124',
      farmerId: 'FARM-2026-991',
      farmerName: 'Rahul Patil',
      cropName: 'Soybean (Yellow)',
      variety: 'JS-335',
      quantity: '25 Quintals (2,500 kg)',
      centerName: 'APMC Hadapsar Grain Terminal',
      centerAddress: 'Hadapsar Market Yard, Pune - 411028',
      centerDistance: '14.2 km',
      date: 'Oct 18, 2024',
      timeSlot: '09:00 AM',
      queueNumber: '#2',
      queueAhead: 0,
      status: 'Confirmed',
      selectedBank: 'Punjab National Bank (•••• 8901)',
      qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-ZOd34NhirnEn7ZGSggEXRR7bIONvpDoNhWXLCdR3pVyH_U3FChfJXdbC3_7k--Fpp2k2SwYydn9Niq_rbQGh5fO1U1FvHzV-YY3zbkASBOXFMFEuRCSJTCDQIqg_IKZbhPZobBaaz2y9B5Oj2Ay2B0OzR0ZFWg4DLQjS2JfB7ZO2ZBFCtl9TifklZ0tFuvgZ5hQmGJrwo_MXC8Q7haIC8RHLtvcWr3vKUqpY-_doUqC_V4hm9z4',
      receiptId: 'REC-5512',
      is2ndStepVerified: true,
    },
    {
      ticketId: 'TKT-4109',
      farmerId: 'FARM-2026-991',
      farmerName: 'Rahul Patil',
      cropName: 'Cotton (Bt)',
      variety: 'RCH-659',
      quantity: '30 Quintals (3,000 kg)',
      centerName: 'Baramati Krishi Bhavan Mandi',
      centerAddress: 'Indapur Road, Baramati - 413102',
      centerDistance: '38.5 km',
      date: 'Oct 28, 2024',
      timeSlot: '02:00 PM',
      queueNumber: '#9',
      queueAhead: 4,
      status: 'Pending',
      selectedBank: 'State Bank of India (•••• 4567)',
      qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-ZOd34NhirnEn7ZGSggEXRR7bIONvpDoNhWXLCdR3pVyH_U3FChfJXdbC3_7k--Fpp2k2SwYydn9Niq_rbQGh5fO1U1FvHzV-YY3zbkASBOXFMFEuRCSJTCDQIqg_IKZbhPZobBaaz2y9B5Oj2Ay2B0OzR0ZFWg4DLQjS2JfB7ZO2ZBFCtl9TifklZ0tFuvgZ5hQmGJrwo_MXC8Q7haIC8RHLtvcWr3vKUqpY-_doUqC_V4hm9z4',
      receiptId: 'REC-3321',
      is2ndStepVerified: true,
    }
  ]);
  const [activeBooking, setActiveBooking] = useState<DeliverySlotBooking | null>(INITIAL_ACTIVE_BOOKING);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [prefillBooking, setPrefillBooking] = useState<{ cropName: string; quantityKg: number; selectedBank?: string; district?: string } | null>(null);

  // Navigation Handler
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Crop & Land Handlers
  const handleAddCrop = (newCrop: CropEntry) => {
    setCrops((prev) => [newCrop, ...prev]);
  };

  const handleDeleteCrop = (id: string) => {
    setCrops((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddLandRecord = (record: LandRecord) => {
    setLandRecords((prev) => [record, ...prev]);
  };

  // Sequential Step Transitions:
  // Step 1: CropManagement -> Step 2: GovRequirements
  const handleProceedToGovRequirements = (
    cropName: string,
    district?: string,
    _taluka?: string,
    _village?: string,
    _gpsCoordinates?: string
  ) => {
    // Quantity was removed from Crop Declaration, so Step 2 starts with its default amount.
    setPrefillBooking({
      cropName,
      quantityKg: 40,
      district: district || 'Pune',
    });
    handleNavigate('gov-requirements');
  };

  // Step 2: GovRequirements -> Step 3: NearbyCenters & Live Slot
  const handleProceedToNearbyCenters = (
    cropName: string, 
    quantityKg: number, 
    selectedBank?: string, 
    district?: string
  ) => {
    setPrefillBooking((prev) => ({ 
      cropName, 
      quantityKg, 
      selectedBank, 
      district: district || prev?.district || 'Pune' 
    }));
    handleNavigate('nearby-centers');
  };

  // Step 3: Slot confirmation (Pending Status receipt)
  const handleBookSlot = (newBooking: DeliverySlotBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveBooking(newBooking);
  };

  const handleCancelBooking = (ticketIdToCancel?: string) => {
    const targetId = ticketIdToCancel || activeBooking?.ticketId;
    if (targetId) {
      setBookings((prev) =>
        prev.map((b) =>
          b.ticketId === targetId ? { ...b, status: 'Cancelled' } : b
        )
      );
      if (activeBooking?.ticketId === targetId) {
        setActiveBooking(null);
      }
    }
  };

  // Bank Handlers
  const handleAddBankAccount = (account: BankAccount) => {
    if (account.isPrimary) {
      setBankAccounts((prev) => [
        account,
        ...prev.map((a) => ({ ...a, isPrimary: false })),
      ]);
    } else {
      setBankAccounts((prev) => [...prev, account]);
    }
  };

  const handleSetPrimaryBank = (id: string) => {
    setBankAccounts((prev) =>
      prev.map((a) => ({
        ...a,
        isPrimary: a.id === id,
      }))
    );
  };

  const handleDeleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCompleteRegistration = (
    updatedFarmer: FarmerProfile,
    newBank: BankAccount
  ) => {
    setFarmer(updatedFarmer);
    handleAddBankAccount(newBank);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans selection:bg-[#c1ecd4] selection:text-[#002114]">
      {/* Top Application Bar */}
      <TopAppBar
        farmerName={farmer?.name || 'Rahul Patil'}
        avatarUrl={farmer?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg5gc3ij3FqkC2Fsp2anWUhD6CEFjz1aJGgbQCSZ7fK8XURHBBSmSOqJR5bkLd2g8Z3QdPabC_w01RL-G8B0SyeonTuNBbJKtRzPSLiNQp8KLTOf0L-9Dd8wEp9dN44fjRUAMSLd4UaGtJH6u-bYL7Ed9oiPYFfahvxIwF_7hJOBTUyHNXVtYAaxXoOVjGB-u9fPoXlfEflcvJIWIAnIlVUQqADuWNsZdhrFkbGkrJrZV0lUcK27IJ'}
        notifications={notifications}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onMarkNotificationRead={handleMarkNotificationAsRead}
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className="flex flex-1 w-full">
        {/* Persistent Side Navigation */}
        <Sidebar
            onNavigate={handleNavigate}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          farmerName={farmer?.name || 'Rahul Patil'}
          avatarUrl={farmer?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg5gc3ij3FqkC2Fsp2anWUhD6CEFjz1aJGgbQCSZ7fK8XURHBBSmSOqJR5bkLd2g8Z3QdPabC_w01RL-G8B0SyeonTuNBbJKtRzPSLiNQp8KLTOf0L-9Dd8wEp9dN44fjRUAMSLd4UaGtJH6u-bYL7Ed9oiPYFfahvxIwF_7hJOBTUyHNXVtYAaxXoOVjGB-u9fPoXlfEflcvJIWIAnIlVUQqADuWNsZdhrFkbGkrJrZV0lUcK27IJ'}
          language={language}
        />

        {/* Main Content Area */}
        <main
          className={`flex-1 min-w-0 p-4 sm:p-6 lg:p-8 transition-[margin] duration-300 ease-in-out ${
            isMobileMenuOpen ? 'lg:ml-64' : 'ml-0'
          }`}
        >
          {currentScreen === 'dashboard' && (
            <DashboardView
              farmer={farmer}
              activeBooking={activeBooking}
              latestTransaction={transactions[0]}
              onNavigate={handleNavigate}
              language={language}
              onCancelBooking={handleCancelBooking}
            />
          )}

          {/* Sequential Step 1: Crop Management */}
          {currentScreen === 'crop-management' && (
            <CropManagementView
              farmer={farmer}
              crops={crops}
              onAddCrop={handleAddCrop}
              onDeleteCrop={handleDeleteCrop}
              onProceedToGovRequirements={handleProceedToGovRequirements}
              onBookSlotForCrop={(cropName, quantityKg) => {
                setPrefillBooking({ cropName, quantityKg });
                handleNavigate('gov-requirements');
              }}
              language={language}
            />
          )}

          {/* Verification & 8A / Pik-Pera Certificates */}
          {currentScreen === 'verification' && (
            <VerificationView
              farmer={farmer}
              landRecords={landRecords}
              onAddLandRecord={handleAddLandRecord}
              language={language}
            />
          )}

          {/* Sequential Step 2: Gov Requirements & Bank Account Selection */}
          {currentScreen === 'gov-requirements' && (
            <GovRequirementsView
              onProceedToBooking={handleProceedToNearbyCenters}
              bankAccounts={bankAccounts}
              prefilledCrop={prefillBooking?.cropName || 'Wheat'}
              prefilledQuantityKg={prefillBooking?.quantityKg || 40}
              district={prefillBooking?.district || 'Pune'}
              language={language}
            />
          )}

          {/* Sequential Step 3: Mandi Centers & 2-Step Slot Booking */}
          {(currentScreen === 'nearby-centers' || currentScreen === 'book-slot') && (
            <NearbyCentersView
              farmer={farmer}
              prefilledCrop={prefillBooking?.cropName || 'Wheat'}
              prefilledQuantity={prefillBooking?.quantityKg || 40}
              selectedBank={prefillBooking?.selectedBank || 'State Bank of India (•••• 4567)'}
              district={prefillBooking?.district || 'Pune'}
              onBookingConfirmed={handleBookSlot}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {/* Booking Pass / Digital Ticket with QR */}
          {currentScreen === 'booking-ticket' && (
            <BookingTicketView
              booking={activeBooking}
              onCancelBooking={() => handleCancelBooking()}
              onNavigate={handleNavigate}
            />
          )}

          {/* Mandi Receipt (E-Pauti) */}
          {currentScreen === 'receipt' && (
            <ReceiptView onNavigate={handleNavigate} />
          )}

          {/* History & Mandi Delivery / Payout Tracker */}
          {(currentScreen === 'history' || currentScreen === 'payments') && (
            <HistoryPaymentsView
              transactions={transactions}
              crops={crops}
              bookings={bookings}
              onNavigate={handleNavigate}
              onCancelBooking={handleCancelBooking}
              language={language}
              initialTab={currentScreen === 'payments' ? 'tracker' : 'bookings'}
            />
          )}

          {/* Registration */}
          {currentScreen === 'registration' && (
            <RegistrationView
              initialFarmer={farmer}
              onCompleteRegistration={handleCompleteRegistration}
              onNavigate={handleNavigate}
            />
          )}

          {/* Farmer Profile & Bank Accounts (Consolidated) */}
          {(currentScreen === 'profile' || currentScreen === 'bank-accounts') && (
            <ProfileView
              farmer={farmer}
              bankAccounts={bankAccounts}
              onUpdateFarmer={setFarmer}
              onAddBankAccount={handleAddBankAccount}
              onSetPrimaryBank={handleSetPrimaryBank}
              onDeleteBankAccount={handleDeleteBankAccount}
              onNavigate={handleNavigate}
              initialTab={currentScreen === 'bank-accounts' ? 'banks' : 'profile'}
              language={language}
            />
          )}

          {/* Settings */}
          {currentScreen === 'settings' && (
            <SettingsView onNavigate={handleNavigate} />
          )}

          {/* Help & Support */}
          {currentScreen === 'help' && (
            <HelpView />
          )}
        </main>
      </div>

      {/* Global Application Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
