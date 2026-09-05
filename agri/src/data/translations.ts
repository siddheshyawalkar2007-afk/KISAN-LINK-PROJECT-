import { Language } from '../types';

export interface Translations {
  portalTitle: string;
  portalSubtitle: string;
  step1: string;
  step2: string;
  step3: string;
  dashboard: string;
  cropManagement: string;
  govRequirements: string;
  nearbyCenters: string;
  digitalPass: string;
  verification: string;
  profile: string;
  historyPayments: string;
  newRegistration: string;
  helpSupport: string;
  settings: string;
  bookDeliverySlot: string;
  mspQuotas: string;
  pendingRequests: string;
  latestPayment: string;
  verified: string;
  saveAndProceed: string;
  submitAndProceed: string;
  confirmBooking: string;
  cancelSlot: string;
  paymentDetails: string;
  shipmentTracker: string;
  kisanHelpline: string;
  activeBooking: string;
  availableCenters: string;
  selectCenter: string;
  stepVerification: string;
  enterOtp: string;
  cert8A: string;
  certPikPera: string;
  aadhaarRecord: string;
  land712: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    portalTitle: 'Government Farmer Procurement Portal',
    portalSubtitle: 'Direct MSP Procurement, 8A & Pik-Pera Verification, Delivery Passes & Direct Bank DBT',
    step1: 'Step 1: Crop Declaration',
    step2: 'Step 2: Gov Requirements & Bank Account',
    step3: 'Step 3: Mandi Center & Slot Booking',
    dashboard: 'Dashboard',
    cropManagement: '1. Crop Declaration (Step 1)',
    govRequirements: '2. Gov Requirements & Bank (Step 2)',
    nearbyCenters: '3. Mandi Center (Step 3)',
    digitalPass: 'Booking Pass & Receipt',
    verification: 'Document Verification',
    profile: 'Profile & Bank Accounts',
    historyPayments: 'Booking History & Tracking',
    newRegistration: 'New Registration',
    helpSupport: 'Help & 24x7 Helpline',
    settings: 'Portal Settings',
    bookDeliverySlot: 'Book Delivery Slot',
    mspQuotas: 'MSP Quotas & Rates',
    pendingRequests: 'Pending Requests',
    latestPayment: 'Latest Payout',
    verified: 'Verified',
    saveAndProceed: 'Save & Proceed to Gov Scheme →',
    submitAndProceed: 'Select Bank & Proceed to Mandi Centers →',
    confirmBooking: 'Confirm Booking (2nd Step Security)',
    cancelSlot: 'Cancel Slot',
    paymentDetails: 'Payment Calculation & Breakdown',
    shipmentTracker: 'Amazon-Style Mandi Delivery & Payout Tracker',
    kisanHelpline: 'Kisan Toll-Free Helpline',
    activeBooking: 'Active Booking Pass',
    availableCenters: 'Nearby Procurement Centers',
    selectCenter: 'Choose Center & Check Slots',
    stepVerification: '2nd Step Security OTP Verification',
    enterOtp: 'Enter 6-digit OTP sent to Aadhaar linked mobile',
    cert8A: '8A Khatedar Holding Certificate',
    certPikPera: 'Pik-Pera Crop Sowing Certificate',
    aadhaarRecord: 'Aadhaar Identity Linkage',
    land712: '7/12 Land Revenue Extract',
  },
  hi: {
    portalTitle: 'सरकारी किसान खरीद पोर्टल',
    portalSubtitle: 'प्रत्यक्ष एमएसपी खरीद, 8अ व पीक-पेरा सत्यापन, डिलीवरी पास एवं बैंक डीबीटी',
    step1: 'चरण 1: फसल विवरण',
    step2: 'चरण 2: सरकारी आवश्यकताएं एवं बैंक चयन',
    step3: 'चरण 3: मंडी केंद्र एवं स्लॉट बुकिंग',
    dashboard: 'डैशबोर्ड',
    cropManagement: '1. फसल प्रबंधन (चरण 1)',
    govRequirements: '2. सरकारी आवश्यकता एवं बैंक (चरण 2)',
    nearbyCenters: '3. मंडी केंद्र (चरण 3)',
    digitalPass: 'बुकिंग रसीद व डिजिटल पास',
    verification: 'दस्तावेज़ सत्यापन (Document Verification)',
    profile: 'प्रोफ़ाइल एवं बैंक खाते',
    historyPayments: 'इतिहास, भुगतान व ट्रैकिंग',
    newRegistration: 'नया किसान पंजीकरण',
    helpSupport: 'सहायता एवं हेल्पलाइन',
    settings: 'पोर्टल सेटिंग्स',
    bookDeliverySlot: 'डिलीवरी स्लॉट बुक करें',
    mspQuotas: 'एमएसपी कोटा व दरें',
    pendingRequests: 'लंबित अनुरोध',
    latestPayment: 'हालिया भुगतान',
    verified: 'सत्यापित',
    saveAndProceed: 'फसल सहेजें और सरकारी योजना पर जाएं →',
    submitAndProceed: 'बैंक चुनें और मंडी केंद्र पर जाएं →',
    confirmBooking: 'बुकिंग पुष्टि (द्वितीय सुरक्षा सत्यापन)',
    cancelSlot: 'स्लॉट रद्द करें',
    paymentDetails: 'भुगतान विवरण व गणना',
    shipmentTracker: 'लाइव भुगतान व डिलीवरी ट्रैकर',
    kisanHelpline: 'किसान टोल-फ्री हेल्पलाइन',
    activeBooking: 'सक्रिय बुकिंग पास',
    availableCenters: 'नजदीकी सरकारी खरीद केंद्र',
    selectCenter: 'केंद्र चुनें और स्लॉट देखें',
    stepVerification: 'द्वितीय चरण ओटीपी सत्यापन',
    enterOtp: 'आधार से जुड़े मोबाइल पर भेजा गया 6 अंकों का ओटीपी दर्ज करें',
    cert8A: '8अ खातेदार प्रमाण पत्र',
    certPikPera: 'पीक-पेरा फसल बुवाई प्रमाण पत्र',
    aadhaarRecord: 'आधार पहचान सत्यापन',
    land712: '7/12 भू-अभिलेख उद्धरण',
  },
  mr: {
    portalTitle: 'शासकीय शेतकरी खरेदी पोर्टल',
    portalSubtitle: 'थेट हमीभाव (MSP) खरेदी, ८अ व पीक-पेरा पडताळणी, डिलिव्हरी पास आणि बँक डीबीटी',
    step1: 'टप्पा १: पीक नोंदणी',
    step2: 'टप्पा २: सरकारी आवश्यकता व बँक निवड',
    step3: 'टप्पा ३: खरेदी केंद्र (मंडी) व स्लॉट',
    dashboard: 'डॅशबोर्ड',
    cropManagement: '१. पीक नोंदणी (टप्पा १)',
    govRequirements: '२. शासकीय निकष व बँक (टप्पा २)',
    nearbyCenters: '३. खरेदी केंद्र (मंडी) (टप्पा ३)',
    digitalPass: 'बुकिंग पावती व डिजिटल पास',
    verification: 'दस्तऐवज पडताळणी (Document Verification)',
    profile: 'शेतकरी प्रोफाइल व बँक खाती',
    historyPayments: 'इतिहास, पेमेंट्स व ट्रॅकिंग',
    newRegistration: 'नवीन शेतकरी नोंदणी',
    helpSupport: 'मदत व शेतकरी हेल्पलाइन',
    settings: 'पोर्टल सेटिंग्ज',
    bookDeliverySlot: 'डिलिव्हरी स्लॉट बुक करा',
    mspQuotas: 'हमीभाव कोटा व दर',
    pendingRequests: 'प्रलंबित अर्ज',
    latestPayment: 'नवीनतम जमा रक्कम',
    verified: 'प्रमाणित',
    saveAndProceed: 'पीक सेव्ह करा व शासकीय योजनेकडे जा →',
    submitAndProceed: 'बँक निवडा व खरेदी केंद्राकडे जा →',
    confirmBooking: 'बुकिंग पुष्टी (दुसरा टप्पा व्हेरिफिकेशन)',
    cancelSlot: 'स्लॉट रद्द करा',
    paymentDetails: 'पेमेंट तपशील व जमा हिशोब',
    shipmentTracker: 'अॅमेझॉन-शैली डिलिव्हरी व डीबीटी ट्रॅकर',
    kisanHelpline: 'किसान टोल-फ्री हेल्पलाइन',
    activeBooking: 'सक्रिय डिलिव्हरी पास',
    availableCenters: 'उपलब्ध शासकीय खरेदी केंद्रे',
    selectCenter: 'केंद्र निवडा व स्लॉट निश्चित करा',
    stepVerification: 'दुसऱ्या टप्प्याचे ओटीपी प्रमाणीकरण',
    enterOtp: 'आधार संलग्न मोबाईलवर आलेला ६ अंकी ओटीपी टाका',
    cert8A: '८अ खातेदार प्रमाणपत्र',
    certPikPera: 'ई-पीक पाहणी (पीक-पेरा) प्रमाणपत्र',
    aadhaarRecord: 'आधार कार्ड संलग्नता',
    land712: '७/१२ जमीन महसूल उतारा',
  },
};
