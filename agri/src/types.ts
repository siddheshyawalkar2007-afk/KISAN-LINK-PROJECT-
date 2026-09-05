export type ScreenId = 
  | 'dashboard'
  | 'registration'
  | 'profile'
  | 'bank-accounts'
  | 'crop-management'
  | 'verification'
  | 'gov-requirements'
  | 'book-slot'
  | 'booking-ticket'
  | 'nearby-centers'
  | 'history'
  | 'payments'
  | 'receipt'
  | 'settings'
  | 'help';

export type Language = 'en' | 'hi' | 'mr';

export interface FarmerProfile {
  id: string;
  name: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  village: string;
  district: string;
  state: string;
  farmerType: 'Small / Marginal (Up to 2 Hectares)' | 'Large (Above 2 Hectares)' | 'Tenant Farmer';
  landArea: number; // in acres
  soilType: string;
  region: string;
  isVerified: boolean;
  avatarUrl: string;
  licenseNumber: string;
  licenseIssued: string;
  licenseExpiry: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: 'Savings Account' | 'Current Account';
  accountNumberMasked: string;
  accountNumberFull: string;
  holderName: string;
  ifsc: string;
  isPrimary: boolean;
  themeColor: string;
}

export interface CropEntry {
  id: string;
  cropName: string;
  variety: string;
  category: 'Cereal' | 'Pulse' | 'Cash Crop' | 'Oilseed';
  grade: 'A' | 'B' | 'C';
  quantityQuintals?: number;
  sownAreaAcres?: number;
  expectedHarvestDate?: string;
  storageLifeMonths?: number;
  district?: string;
  taluka?: string;
  village?: string;
  gpsCoordinates?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface FarmerDocument {
  id: string;
  documentType: '8A Utara Certificate' | 'e-Pik Pera Certificate' | '7/12 Land Record' | 'Aadhaar Card' | 'Soil Health Card' | 'Other';
  title: string;
  documentNumber: string;
  issueDate: string;
  issuingAuthority: string;
  status: 'Verified' | 'Pending Verification';
  fileUrl?: string;
}

export interface DeliverySlotBooking {
  ticketId: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  variety: string;
  quantity: string;
  centerName: string;
  centerAddress: string;
  centerDistance: string;
  date: string;
  timeSlot: string;
  queueNumber: string;
  queueAhead: number;
  status: 'Confirmed' | 'Pending' | 'Pending Approval' | 'Cancelled' | 'Completed';
  selectedBank?: string;
  qrCodeUrl: string;
  receiptId: string;
  cancelReason?: string;
  verificationOtp?: string;
  is2ndStepVerified?: boolean;
}

export interface LandRecord {
  id: string;
  surveyNumber: string;
  totalAreaHectares: number;
  village: string;
  taluka: string;
  district: string;
  isPrimary: boolean;
  assessmentFee: string;
  khataNumber: string;
  occupantName: string;
  status: string;
  generatedDate: string;
}

export interface Certificate8A {
  id: string;
  khataNumber: string;
  farmerName: string;
  village: string;
  taluka: string;
  district: string;
  totalHoldingsHectares: number;
  assessmentTaxAnnual: string;
  issuedByTehsildar: string;
  digitalSignatureId: string;
  issueDate: string;
  status: 'Verified & Active' | 'Pending Renewal';
  isVerified: boolean;
}

export interface CertificatePikPera {
  id: string;
  surveyNumber: string;
  subDivision: string;
  cropSeason: string;
  cropName: string;
  sownAreaHectares: number;
  irrigationSource: string;
  sowingDate: string;
  geoTagLatitude: string;
  geoTagLongitude: string;
  talathiVerificationStatus: 'Verified' | 'Under Inspection';
  inspectionOfficer: string;
  verificationDate: string;
  isVerified: boolean;
}

export interface PaymentTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: 'Credited' | 'Completed' | 'Processing' | 'Initiated';
  bankAccount: string;
  bankName?: string;
  transactionRef: string;
  category: string;
  cropName?: string;
  quantityQuintals?: number;
  mspRatePerQuintal?: number;
  bonusSubsidy?: number;
  handlingFee?: number;
  timeline: {
    step: string;
    description: string;
    timestamp: string;
    isCompleted: boolean;
    isCurrent?: boolean;
  }[];
}

export interface SupportTicket {
  id: string;
  category: string;
  description: string;
  status: 'Open' | 'Resolved' | 'In Review';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}
