import React, { useState } from 'react';
import { 
  BadgeCheck, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Eye, 
  Printer, 
  X, 
  Plus, 
  Building2,
  Calendar,
  AlertCircle,
  FileCheck2,
  FileCheck,
  MapPin,
  Compass,
  QrCode,
  Upload,
  Image as ImageIcon,
  Check,
  FileUp
} from 'lucide-react';
import { FarmerProfile, LandRecord, Language } from '../../types';
import { INITIAL_CERTIFICATE_8A, INITIAL_CERTIFICATE_PIK_PERA } from '../../data/mockData';
import { TRANSLATIONS } from '../../data/translations';

interface VerificationViewProps {
  farmer: FarmerProfile;
  landRecords: LandRecord[];
  onAddLandRecord: (record: LandRecord) => void;
  language?: Language;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  farmer,
  landRecords,
  onAddLandRecord,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [selectedLandRecord, setSelectedLandRecord] = useState<LandRecord | null>(null);
  const [selected8ACert, setSelected8ACert] = useState<typeof INITIAL_CERTIFICATE_8A[0] | null>(null);
  const [selectedPikPeraCert, setSelectedPikPeraCert] = useState<typeof INITIAL_CERTIFICATE_PIK_PERA[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomDoc, setSelectedCustomDoc] = useState<any | null>(null);

  // New Document Form State
  const [docCategory, setDocCategory] = useState<'land-7-12' | 'khata-8a' | 'pik-pera' | 'aadhaar' | 'soil-card' | 'bank-passbook'>('land-7-12');
  const [docTitle, setDocTitle] = useState('');
  const [holderName, setHolderName] = useState(farmer?.name || 'Rahul Patil');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [areaHectares, setAreaHectares] = useState('1.5');
  const [village, setVillage] = useState('Shirwal');
  const [taluka, setTaluka] = useState('Haveli');
  const [district, setDistrict] = useState('Pune');
  const [issuingAuthority, setIssuingAuthority] = useState('Revenue Department, Govt of Maharashtra');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        type: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
      });
    }
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = new Date(issueDate).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    if (docCategory === 'land-7-12') {
      const newRecord: LandRecord = {
        id: `land-${Date.now()}`,
        surveyNumber: surveyNumber || '52/1A',
        totalAreaHectares: parseFloat(areaHectares) || 1.5,
        village,
        taluka,
        district,
        isPrimary: landRecords.length === 0,
        assessmentFee: 'Rs. 32.00',
        khataNumber: `${Math.floor(1000 + Math.random() * 9000)}`,
        occupantName: `${holderName || farmer?.name || 'Rahul Patil'} (Applicant)`,
        status: 'Class I Occupant',
        generatedDate: formattedDate,
      };
      onAddLandRecord(newRecord);
    } else {
      const defaultTitles: Record<string, string> = {
        'khata-8a': 'Village Form 8-A (८-अ खाते उतारा)',
        'pik-pera': 'e-Pik Pera Supplementary Crop Survey (ई-पीक पाहणी नोंद)',
        'aadhaar': 'Aadhaar Card Verification XML (आधार कार्ड)',
        'soil-card': 'Soil Health Card (मृदा आरोग्य पत्रिका)',
        'bank-passbook': 'Bank Account Passbook (बँक पासबुक)',
      };

      const newDoc = {
        id: `doc-${Date.now()}`,
        category: docCategory,
        title: docTitle || defaultTitles[docCategory] || 'Farmer Supporting Document',
        documentNumber: surveyNumber || `DOC-${Math.floor(10000 + Math.random() * 90000)}`,
        holderName: holderName || farmer?.name || 'Rahul Patil',
        issuingAuthority: issuingAuthority || 'Government of Maharashtra / Authorized Authority',
        issueDate: formattedDate,
        village,
        taluka,
        district,
        remarks: remarks || 'Verified and linked with Farmer DBT & Aadhaar registry.',
        fileName: uploadedFile?.name || `${docCategory}-verified-doc.pdf`,
        fileSize: uploadedFile?.size || '1.4 MB',
        fileType: uploadedFile?.type || 'PDF',
        uploadDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Verified',
      };
      setAdditionalDocs((prev) => [newDoc, ...prev]);
    }

    setShowAddModal(false);
    setSurveyNumber('');
    setDocTitle('');
    setRemarks('');
    setUploadedFile(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#137333] text-white text-[12px] font-bold">
              All Active & Verified
            </span>
          </div>
          <h2 className="text-[26px] font-extrabold font-headline text-[#012d1d] mt-1">
            {t.verification}
          </h2>
          <p className="text-[14px] text-[#414844]">
            Government verified credentials, official 8A Khata holding certificates, e-Pik Pera crop surveys, and 7/12 land records.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[13px] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document (दस्तऐवज जोडा)</span>
        </button>
      </div>

      {/* 4 Active Status Badges (Aadhaar, 8A Certificate, Pik-Pera Certificate, 7/12 Record) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Aadhaar Identity */}
        <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-xl shrink-0">
            <BadgeCheck className="w-6 h-6 text-[#137333]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#717973] uppercase tracking-wider">Aadhaar Identity</h4>
            <p className="text-[14px] font-extrabold text-[#191c1d] flex items-center gap-1 mt-0.5">
              <span>UIDAI Linked</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
            </p>
            <span className="text-[11px] text-[#137333] font-semibold">Active & Verified</span>
          </div>
        </div>

        {/* 2. 8A Certificate */}
        <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-xl shrink-0">
            <FileCheck2 className="w-6 h-6 text-[#137333]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#717973] uppercase tracking-wider">8A Khata Certificate</h4>
            <p className="text-[14px] font-extrabold text-[#191c1d] flex items-center gap-1 mt-0.5">
              <span>2 Khatas Verified</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
            </p>
            <span className="text-[11px] text-[#137333] font-semibold">Tehsildar Certified</span>
          </div>
        </div>

        {/* 3. Pik-Pera Certificate */}
        <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-xl shrink-0">
            <Compass className="w-6 h-6 text-[#137333]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#717973] uppercase tracking-wider">e-Pik Pera Survey</h4>
            <p className="text-[14px] font-extrabold text-[#191c1d] flex items-center gap-1 mt-0.5">
              <span>Geo-Tagged Valid</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
            </p>
            <span className="text-[11px] text-[#137333] font-semibold">Talathi Sown Approved</span>
          </div>
        </div>

        {/* 4. 7/12 Land Record */}
        <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-[#c1ecd4] text-[#002114] rounded-xl shrink-0">
            <FileText className="w-6 h-6 text-[#137333]" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#717973] uppercase tracking-wider">7/12 Land Record</h4>
            <p className="text-[14px] font-extrabold text-[#191c1d] flex items-center gap-1 mt-0.5">
              <span>{(landRecords || []).reduce((acc, r) => acc + (r?.totalAreaHectares || 0), 0).toFixed(1)} Hectares</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
            </p>
            <span className="text-[11px] text-[#137333] font-semibold">Mahabhulekh Active</span>
          </div>
        </div>
      </div>

      {/* Agriculture Practitioner License Card */}
      <div className="bg-gradient-to-r from-[#012d1d] via-[#1b4332] to-[#274e3d] text-white rounded-2xl p-6 sm:p-8 border border-[#1b4332] shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full opacity-10 pointer-events-none">
          <ShieldCheck className="w-full h-full text-white" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#c1ecd4] text-[#002114] rounded-lg">
                <ShieldCheck className="w-5 h-5 text-[#137333]" />
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#c1ecd4]">Official State Certification</span>
            </div>
            <span className="px-3 py-1 bg-[#137333] text-white text-[12px] font-bold rounded-full border border-white/30">
              Active & Valid
            </span>
          </div>

          <div>
            <h3 className="text-[22px] sm:text-[26px] font-extrabold font-headline">
              Registered Agricultural Practitioner License
            </h3>
            <p className="text-[14px] text-[#e1e3e4] mt-1">
              Issued under the Maharashtra Agricultural Land & Crop Management Act, 1961
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20 text-[13px]">
            <div>
              <span className="text-[#c1ecd4] block text-[11px] uppercase font-semibold">License Number</span>
              <span className="font-mono font-bold text-[15px]">{farmer?.licenseNumber || 'AGRI-PN-2024'}</span>
            </div>
            <div>
              <span className="text-[#c1ecd4] block text-[11px] uppercase font-semibold">Holder Name</span>
              <span className="font-bold text-[15px]">{farmer?.name || 'Rahul Patil'}</span>
            </div>
            <div>
              <span className="text-[#c1ecd4] block text-[11px] uppercase font-semibold">Issued Date</span>
              <span className="font-medium text-[14px]">{farmer?.licenseIssued || '12 Mar 2024'}</span>
            </div>
            <div>
              <span className="text-[#c1ecd4] block text-[11px] uppercase font-semibold">Expiry Date</span>
              <span className="font-medium text-[14px]">{farmer?.licenseExpiry || '11 Mar 2029'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: 8A Certificate (Khate Vahi Extract) */}
      <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#1b4332]" />
              <span>Village Form 8-A (८-अ खाते उतारा - Holding Certificate)</span>
            </h3>
            <p className="text-[13px] text-[#717973]">
              Official consolidation of all agricultural land parcels, assessment tax, and total holding area under Khata.
            </p>
          </div>
          <span className="px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[12px] font-bold rounded-full w-fit">
            Must Be Verified: YES (All Verified)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_CERTIFICATE_8A.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#f8f9fa] rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[16px] text-[#012d1d]">
                      Khata No. {cert.khataNumber}
                    </span>
                    <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[10px] font-bold rounded-full">
                      8-A Form
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-[#137333] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {cert.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px] text-[#414844]">
                  <div>
                    <span className="text-[11px] text-[#717973] block">Total Khata Holdings</span>
                    <span className="font-bold text-[#191c1d]">{cert.totalHoldingsHectares} Hectares</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Annual Assessment</span>
                    <span className="font-bold text-[#191c1d]">{cert.assessmentTaxAnnual}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Village & Taluka</span>
                    <span className="font-medium text-[#191c1d]">{cert.village}, {cert.taluka}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Issuing Authority</span>
                    <span className="font-medium text-[#191c1d]">{cert.issuedByTehsildar}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c1c8c2]/50 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#717973]">{cert.digitalSignatureId}</span>
                <button
                  onClick={() => setSelected8ACert(cert)}
                  className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Eye className="w-4 h-4 text-[#c1ecd4]" />
                  <span>View 8A Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Pik-Pera Certificate (e-Pik Pahani Survey) */}
      <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#1b4332]" />
              <span>e-Pik Pera Crop Survey Certificate (ई-पीक पाहणी नोंद प्रमाणपत्र)</span>
            </h3>
            <p className="text-[13px] text-[#717973]">
              Geo-tagged mobile crop registration confirmed by Talathi inspection for MSP procurement eligibility.
            </p>
          </div>
          <span className="px-3 py-1 bg-[#c1ecd4] text-[#002114] text-[12px] font-bold rounded-full w-fit">
            Must Be Verified: YES (All Verified)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_CERTIFICATE_PIK_PERA.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#f8f9fa] rounded-2xl p-5 border border-[#c1c8c2] hover:border-[#1b4332] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[16px] text-[#012d1d]">
                      Survey No. {cert.surveyNumber}
                    </span>
                    <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[10px] font-bold rounded-full">
                      {cert.cropSeason}
                    </span>
                  </div>
                  <span className="text-[12px] font-bold text-[#137333] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Talathi {cert.talathiVerificationStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px] text-[#414844]">
                  <div>
                    <span className="text-[11px] text-[#717973] block">Declared Crop</span>
                    <span className="font-bold text-[#191c1d]">{cert.cropName}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Sown Area</span>
                    <span className="font-bold text-[#191c1d]">{cert.sownAreaHectares} Hectares</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Geo Coordinates</span>
                    <span className="font-mono text-[#191c1d] text-[12px]">{cert.geoTagLatitude}, {cert.geoTagLongitude}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Verifying Officer</span>
                    <span className="font-medium text-[#191c1d]">{cert.inspectionOfficer}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c1c8c2]/50 flex items-center justify-between">
                <span className="text-[11px] text-[#717973]">Inspection Date: {cert.verificationDate}</span>
                <button
                  onClick={() => setSelectedPikPeraCert(cert)}
                  className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Eye className="w-4 h-4 text-[#c1ecd4]" />
                  <span>View Pik-Pera Cert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 7/12 Land Records Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
        <div>
          <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1b4332]" />
            <span>Village Form VII / XII (7/12 Land Record Extracts)</span>
          </h3>
          <p className="text-[13px] text-[#717973]">
            Digitally signed land ownership and crop entitlement records synchronized with the Mahabhulekh land portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {landRecords.map((record) => (
            <div
              key={record.id}
              className="bg-[#f8f9fa] rounded-2xl p-5 border border-[#edeeef] hover:border-[#1b4332] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[16px] text-[#012d1d]">
                      Gat/Survey No. {record.surveyNumber}
                    </span>
                    {record.isPrimary && (
                      <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[10px] font-bold rounded-full">
                        Primary Holding
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] font-bold text-[#137333] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px] text-[#414844]">
                  <div>
                    <span className="text-[11px] text-[#717973] block">Total Area</span>
                    <span className="font-bold text-[#191c1d]">{record.totalAreaHectares} Hectares</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Khata Number</span>
                    <span className="font-bold text-[#191c1d]">{record.khataNumber}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">Village & Taluka</span>
                    <span className="font-medium text-[#191c1d]">{record.village}, {record.taluka}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#717973] block">District</span>
                    <span className="font-medium text-[#191c1d]">{record.district}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c1c8c2]/50 flex items-center justify-between">
                <span className="text-[11px] text-[#717973]">Digital Signature Valid</span>
                <button
                  onClick={() => setSelectedLandRecord(record)}
                  className="px-4 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white text-[13px] font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <Eye className="w-4 h-4 text-[#c1ecd4]" />
                  <span>View 7/12 Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Uploaded Documents */}
      {additionalDocs.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#1b4332]" />
              <span>Custom Uploaded Documents & Certificates (अपलोड केलेले दस्तऐवज)</span>
            </h3>
            <span className="px-2.5 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full">
              {additionalDocs.length} Uploaded
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#f8f9fa] rounded-2xl p-5 border border-[#c1c8c2] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[15px] text-[#012d1d]">{doc.title}</span>
                    <span className="px-2 py-0.5 bg-[#c1ecd4] text-[#002114] text-[11px] font-bold rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#137333]" /> {doc.status}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#414844] space-y-1.5 bg-white p-3 rounded-xl border border-[#c1c8c2]/60">
                    <p className="flex justify-between"><span className="text-[#717973]">Doc No / Identifier:</span> <strong className="font-mono text-[#191c1d]">{doc.documentNumber}</strong></p>
                    <p className="flex justify-between"><span className="text-[#717973]">Holder Name:</span> <strong className="text-[#191c1d]">{doc.holderName}</strong></p>
                    <p className="flex justify-between"><span className="text-[#717973]">Authority:</span> <span className="text-right truncate max-w-[200px]">{doc.issuingAuthority}</span></p>
                    <p className="flex justify-between"><span className="text-[#717973]">Location:</span> <span>{doc.village}, {doc.taluka}, {doc.district}</span></p>
                    <p className="flex justify-between"><span className="text-[#717973]">Issue Date:</span> <span>{doc.issueDate || doc.uploadDate}</span></p>
                    {doc.fileName && (
                      <p className="flex items-center gap-1 text-[11px] text-[#137333] font-medium pt-1 border-t border-[#edeeef]">
                        <FileUp className="w-3.5 h-3.5" />
                        <span>Attached File: {doc.fileName} ({doc.fileSize})</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedCustomDoc(doc)}
                    className="px-3.5 py-1.5 bg-[#012d1d] hover:bg-[#1b4332] text-[#c1ecd4] text-[12px] font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#c1ecd4]" />
                    <span>View Document Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Document Modal with full upload and comprehensive info entry */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 my-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-[#1b4332] text-white rounded-xl">
                  <Upload className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold font-headline text-[#191c1d]">Add & Upload Document</h3>
                  <p className="text-[12px] text-[#717973]">दस्तऐवज अपलोड करा व माहिती भरा</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#717973] hover:text-[#191c1d] hover:bg-[#edeeef] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="py-4 space-y-4">
              {/* Document Type Selection */}
              <div>
                <label className="block text-[13px] font-bold text-[#191c1d] mb-1">
                  1. Document Type (दस्तऐवज प्रकार निवडा) <span className="text-red-500">*</span>
                </label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                >
                  <option value="land-7-12">Village Form 7/12 (७/१२ जमीन उतारा)</option>
                  <option value="khata-8a">Village Form 8-A (८-अ खाते उतारा)</option>
                  <option value="pik-pera">e-Pik Pera Survey (ई-पीक पाहणी नोंद)</option>
                  <option value="aadhaar">Aadhaar Card / UIDAI e-KYC (आधार कार्ड)</option>
                  <option value="soil-card">Soil Health Card (मृदा आरोग्य पत्रिका)</option>
                  <option value="bank-passbook">Bank Account Passbook / Cancelled Cheque (बँक पासबुक)</option>
                </select>
              </div>

              {/* Upload Document File Section */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#191c1d]">
                  2. Upload File (दस्तऐवज फाईल जोडा)
                </label>
                <div className="border-2 border-dashed border-[#1b4332]/40 bg-[#c1ecd4]/10 rounded-2xl p-4 text-center hover:bg-[#c1ecd4]/20 transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-3 text-left">
                      <div className="p-2 bg-[#1b4332] text-white rounded-xl">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#012d1d]">{uploadedFile.name}</p>
                        <p className="text-[11px] text-[#717973]">{uploadedFile.size} • {uploadedFile.type} Selected</p>
                      </div>
                      <span className="ml-auto px-2 py-1 bg-[#137333] text-white text-[11px] font-bold rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Attached
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <FileUp className="w-7 h-7 text-[#1b4332] mx-auto" />
                      <p className="text-[13px] font-bold text-[#191c1d]">Click to upload or drag & drop document</p>
                      <p className="text-[11px] text-[#717973]">PDF, JPG, JPEG or PNG (Max size: 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Details & Form Info */}
              <div className="space-y-3 pt-2 border-t border-[#edeeef]">
                <label className="block text-[13px] font-bold text-[#191c1d]">
                  3. Document Information (दस्तऐवज माहिती भरा)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                      Holder / Applicant Name (खातेदार नाव) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Patil"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                      {docCategory === 'land-7-12' || docCategory === 'khata-8a' ? 'Gat / Survey / Khata No.' : 'Document / ID No.'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 102/3B or MH-DOC-8912"
                      value={surveyNumber}
                      onChange={(e) => setSurveyNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                      {docCategory === 'land-7-12' || docCategory === 'khata-8a' ? 'Area (Hectares)' : 'Document Title / Type'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.5 Ha or Title"
                      value={areaHectares}
                      onChange={(e) => setAreaHectares(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                      Issue Date (जारी केल्याची तारीख)
                    </label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                    Issuing Authority / Office (प्राधिकरण / कार्यालय)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Revenue Department / Mahabhulekh / UIDAI"
                    value={issuingAuthority}
                    onChange={(e) => setIssuingAuthority(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>

                {/* Location Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">Village (गाव)</label>
                    <input
                      type="text"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">Taluka (तालुका)</label>
                    <input
                      type="text"
                      value={taluka}
                      onChange={(e) => setTaluka(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#414844] mb-1">District (जिल्हा)</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#414844] mb-1">
                    Remarks / Additional Notes (टीप)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Official digital copy for MSP center quota verification"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[13px] font-medium outline-none focus:ring-2 focus:ring-[#1b4332]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#c1ecd4]/20 border border-[#1b4332]/30 rounded-xl text-[12px] text-[#274e3d] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#1b4332]" />
                <span>Uploaded documents are verified through Mahabhulekh & UIDAI e-KYC integration.</span>
              </div>

              <div className="pt-3 border-t border-[#edeeef] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-[#414844] font-medium text-[13px] rounded-xl hover:bg-[#edeeef] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Verify Document</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Custom Uploaded Document Modal */}
      {selectedCustomDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-2 text-[#012d1d]">
                <FileCheck className="w-5 h-5 text-[#137333]" />
                <span className="text-[14px] font-bold">{selectedCustomDoc.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedCustomDoc(null)}
                  className="p-1.5 rounded-lg text-[#717973] hover:text-[#191c1d] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-5 space-y-4">
              <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c8c2] space-y-2 text-[13px]">
                <p className="flex justify-between"><span className="text-[#717973]">Document No:</span> <strong className="font-mono text-[#012d1d]">{selectedCustomDoc.documentNumber}</strong></p>
                <p className="flex justify-between"><span className="text-[#717973]">Holder / Farmer:</span> <strong className="text-[#191c1d]">{selectedCustomDoc.holderName}</strong></p>
                <p className="flex justify-between"><span className="text-[#717973]">Issuing Office:</span> <span>{selectedCustomDoc.issuingAuthority}</span></p>
                <p className="flex justify-between"><span className="text-[#717973]">Location:</span> <span>{selectedCustomDoc.village}, {selectedCustomDoc.taluka}, {selectedCustomDoc.district}</span></p>
                <p className="flex justify-between"><span className="text-[#717973]">Date of Issue:</span> <span>{selectedCustomDoc.issueDate}</span></p>
                <p className="flex justify-between"><span className="text-[#717973]">Attached File:</span> <strong className="text-[#137333]">{selectedCustomDoc.fileName} ({selectedCustomDoc.fileSize})</strong></p>
                <p className="flex justify-between"><span className="text-[#717973]">Remarks:</span> <span>{selectedCustomDoc.remarks}</span></p>
              </div>

              <div className="p-3.5 bg-[#c1ecd4]/20 border border-[#1b4332]/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#002114] text-[12px] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#137333]" />
                  <span>Digitally Validated with Government Agristack Registry</span>
                </div>
                <span className="px-2.5 py-0.5 bg-[#137333] text-white text-[11px] font-bold rounded-full">
                  Status: Verified
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#edeeef] flex justify-end">
              <button
                onClick={() => setSelectedCustomDoc(null)}
                className="px-5 py-2 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8A Holding Certificate Modal */}
      {selected8ACert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-2 text-[#012d1d]">
                <FileCheck2 className="w-5 h-5 text-[#137333]" />
                <span className="text-[13px] font-bold uppercase tracking-wider">Maharashtra Revenue Department - Form 8-A</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelected8ACert(null)}
                  className="p-1.5 rounded-lg text-[#717973] hover:text-[#191c1d] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-6 space-y-5 font-serif text-[#191c1d]">
              <div className="text-center space-y-1 border-b-2 border-[#191c1d] pb-3">
                <h3 className="text-[18px] font-bold text-[#012d1d]">
                  गाव नमुना आठ-अ (८-अ खाते वही उतारा)
                </h3>
                <p className="text-[13px] font-sans text-[#414844]">
                  Record of Agricultural Land Holdings & Consolidated Revenue Assessment
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c8c2] text-[13px] font-sans">
                <div>
                  <span className="text-[#717973] block text-[11px]">खाते क्रमांक (Khata No.)</span>
                  <span className="font-mono font-bold text-[14px] text-[#012d1d]">{selected8ACert.khataNumber}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">खातेदार नाव (Farmer Name)</span>
                  <span className="font-bold text-[14px]">{selected8ACert.farmerName}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">गाव / तालुका (Village/Taluka)</span>
                  <span className="font-medium">{selected8ACert.village}, {selected8ACert.taluka}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">जिल्हा (District)</span>
                  <span className="font-medium">{selected8ACert.district}</span>
                </div>
              </div>

              <div className="border border-[#191c1d] rounded-lg overflow-hidden font-sans text-[13px]">
                <div className="bg-[#1b4332] text-white px-4 py-2 font-bold flex justify-between items-center">
                  <span>खाते तपशील (Holding Ledger Summary)</span>
                  <span className="text-[#c1ecd4] text-[12px]">Verified</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">एकूण शेतजमीन क्षेत्र (Total Holding Area):</span>
                    <span className="font-bold">{selected8ACert.totalHoldingsHectares} Hectares ({selected8ACert.totalHoldingsHectares * 2.47} Acres)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">वार्षिक जमीन महसूल आकारणी (Annual Tax):</span>
                    <span className="font-bold text-[#1b4332]">{selected8ACert.assessmentTaxAnnual}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">प्रमाणपत्र जारी कार्यालय (Issued By):</span>
                    <span className="font-medium">{selected8ACert.issuedByTehsildar}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#717973]">डिजिटल स्वाक्षरी आयडी (Digital Sig ID):</span>
                    <span className="font-mono text-[12px]">{selected8ACert.digitalSignatureId}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#c1ecd4]/20 border border-[#1b4332]/40 rounded-xl text-[12px] font-sans flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#137333] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>OFFICIALLY VERIFIED UNDER REVENUE CODE 1966</span>
                </div>
                <span className="font-sans text-[#717973]">Issue Date: {selected8ACert.issueDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#edeeef] flex justify-end gap-3">
              <button
                onClick={() => setSelected8ACert(null)}
                className="px-5 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pik-Pera Survey Certificate Modal */}
      {selectedPikPeraCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef]">
              <div className="flex items-center gap-2 text-[#012d1d]">
                <Compass className="w-5 h-5 text-[#137333]" />
                <span className="text-[13px] font-bold uppercase tracking-wider">Government of Maharashtra - e-Pik Pahani</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedPikPeraCert(null)}
                  className="p-1.5 rounded-lg text-[#717973] hover:text-[#191c1d] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-6 space-y-5 font-serif text-[#191c1d]">
              <div className="text-center space-y-1 border-b-2 border-[#191c1d] pb-3">
                <h3 className="text-[18px] font-bold text-[#012d1d]">
                  ई-पीक पाहणी नोंद प्रमाणपत्र (e-Pik Pera Verification)
                </h3>
                <p className="text-[13px] font-sans text-[#414844]">
                  Talathi-Approved Geo-Tagged Sowing Verification Certificate
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c8c2] text-[13px] font-sans">
                <div>
                  <span className="text-[#717973] block text-[11px]">गट क्रमांक (Survey / Gat No.)</span>
                  <span className="font-mono font-bold text-[14px] text-[#012d1d]">{selectedPikPeraCert.surveyNumber}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">हंगाम (Crop Season)</span>
                  <span className="font-bold text-[14px]">{selectedPikPeraCert.cropSeason}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">नोंदणीकृत पीक (Registered Crop)</span>
                  <span className="font-bold text-[#1b4332]">{selectedPikPeraCert.cropName}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">पेरा क्षेत्र (Sown Area)</span>
                  <span className="font-bold">{selectedPikPeraCert.sownAreaHectares} Hectares</span>
                </div>
              </div>

              <div className="border border-[#191c1d] rounded-lg overflow-hidden font-sans text-[13px]">
                <div className="bg-[#1b4332] text-white px-4 py-2 font-bold flex justify-between items-center">
                  <span>फील्ड तपासणी तपशील (Field Inspection Details)</span>
                  <span className="text-[#c1ecd4] text-[12px]">Talathi Verified</span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">जलसिंचन स्त्रोत (Irrigation Source):</span>
                    <span className="font-bold">{selectedPikPeraCert.irrigationSource}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">पेरणी दिनांक (Sowing Date):</span>
                    <span className="font-medium">{selectedPikPeraCert.sowingDate}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#edeeef]">
                    <span className="text-[#717973]">जिओ टॅग कोऑर्डिनेट्स (GPS Latitude/Longitude):</span>
                    <span className="font-mono text-[12px]">{selectedPikPeraCert.geoTagLatitude}, {selectedPikPeraCert.geoTagLongitude}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#717973]">तपासणी अधिकारी (Inspection Officer):</span>
                    <span className="font-semibold text-[#012d1d]">{selectedPikPeraCert.inspectionOfficer}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#c1ecd4]/20 border border-[#1b4332]/40 rounded-xl text-[12px] font-sans flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#137333] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>GOVERNMENT PROCUREMENT ELIGIBILITY CONFIRMED</span>
                </div>
                <span className="font-sans text-[#717973]">Verified: {selectedPikPeraCert.verificationDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#edeeef] flex justify-end gap-3">
              <button
                onClick={() => setSelectedPikPeraCert(null)}
                className="px-5 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official 7/12 Modal */}
      {selectedLandRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#c1c8c2] animate-in fade-in zoom-in-95 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#edeeef] no-print">
              <div className="flex items-center gap-2 text-[#012d1d]">
                <ShieldCheck className="w-5 h-5 text-[#137333]" />
                <span className="text-[13px] font-bold uppercase tracking-wider">Government of Maharashtra e-Mahabhulekh</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-[#edeeef] text-[#191c1d] border border-[#c1c8c2] rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setSelectedLandRecord(null)}
                  className="p-1.5 rounded-lg text-[#717973] hover:text-[#191c1d] hover:bg-[#edeeef] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-6 space-y-6 print-area font-serif text-[#191c1d]">
              <div className="text-center space-y-1 border-b-2 border-double border-[#191c1d] pb-4">
                <div className="w-12 h-12 mx-auto mb-1 flex items-center justify-center bg-amber-50 rounded-full border border-amber-300">
                  <span className="font-bold text-[18px] text-amber-900">🏛️</span>
                </div>
                <h2 className="text-[18px] sm:text-[20px] font-bold tracking-tight text-[#012d1d]">
                  महाराष्ट्र शासन - महसूल विभाग (REVENUE DEPARTMENT)
                </h2>
                <p className="text-[15px] font-bold">
                  गाव नमुना सात / बारा (अधिकार अभिलेख पत्रक) - Village Form VII / XII
                </p>
                <p className="text-[12px] text-[#717973] font-sans">
                  Digitally generated under Information Technology Act, 2000 & MLR Code, 1966
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c8c2] text-[13px] font-sans">
                <div>
                  <span className="text-[#717973] block text-[11px]">गाव (Village)</span>
                  <span className="font-bold">{selectedLandRecord.village}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">तालुका (Taluka)</span>
                  <span className="font-bold">{selectedLandRecord.taluka}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">जिल्हा (District)</span>
                  <span className="font-bold">{selectedLandRecord.district}</span>
                </div>
                <div>
                  <span className="text-[#717973] block text-[11px]">गट क्रमांक (Survey No.)</span>
                  <span className="font-bold text-[#012d1d]">{selectedLandRecord.surveyNumber}</span>
                </div>
              </div>

              <div className="border border-[#191c1d] rounded-lg overflow-hidden font-sans">
                <div className="bg-[#1b4332] text-white px-4 py-2 font-bold text-[13px]">
                  भाग १: गाव नमुना ७ (अधिकार अभिलेख) - Land Ownership Record
                </div>
                <table className="w-full text-[13px] border-collapse">
                  <tbody>
                    <tr className="border-b border-[#edeeef]">
                      <td className="p-3 font-semibold bg-[#f8f9fa] w-1/3 border-r border-[#edeeef]">खातेदार (Holder Name)</td>
                      <td className="p-3 font-bold">{selectedLandRecord.occupantName}</td>
                    </tr>
                    <tr className="border-b border-[#edeeef]">
                      <td className="p-3 font-semibold bg-[#f8f9fa] border-r border-[#edeeef]">खाते क्रमांक (Khata No.)</td>
                      <td className="p-3 font-mono">{selectedLandRecord.khataNumber}</td>
                    </tr>
                    <tr className="border-b border-[#edeeef]">
                      <td className="p-3 font-semibold bg-[#f8f9fa] border-r border-[#edeeef]">एकूण क्षेत्र (Total Area)</td>
                      <td className="p-3 font-bold">{selectedLandRecord.totalAreaHectares} Hectares ({selectedLandRecord.totalAreaHectares * 2.47} Acres)</td>
                    </tr>
                    <tr className="border-b border-[#edeeef]">
                      <td className="p-3 font-semibold bg-[#f8f9fa] border-r border-[#edeeef]">भूधारणा पद्धती (Occupancy Class)</td>
                      <td className="p-3">{selectedLandRecord.status} (भोगवटादार वर्ग - १)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold bg-[#f8f9fa] border-r border-[#edeeef]">आकारणी (Assessment Fee)</td>
                      <td className="p-3">{selectedLandRecord.assessmentFee}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#c1ecd4]/20 border border-[#1b4332]/40 rounded-xl text-[12px] font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[#137333] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>DIGITALLY SIGNED CERTIFICATE (DS-MH-2024-8849)</span>
                  </div>
                  <p className="text-[#414844]">Signed by: Talathi / Revenue Officer Haveli Division</p>
                  <p className="text-[#717973] font-mono text-[11px]">Timestamp: {selectedLandRecord.generatedDate}</p>
                </div>
                <div className="text-center shrink-0">
                  <div className="w-20 h-20 bg-white border border-[#c1c8c2] p-1 rounded-lg shadow-xs mx-auto">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk-ZOd34NhirnEn7ZGSggEXRR7bIONvpDoNhWXLCdR3pVyH_U3FChfJXdbC3_7k--Fpp2k2SwYydn9Niq_rbQGh5fO1U1FvHzV-YY3zbkASBOXFMFEuRCSJTCDQIqg_IKZbhPZobBaaz2y9B5Oj2Ay2B0OzR0ZFWg4DLQjS2JfB7ZO2ZBFCtl9TifklZ0tFuvgZ5hQmGJrwo_MXC8Q7haIC8RHLtvcWr3vKUqpY-_doUqC_V4hm9z4"
                      alt="Verification QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-[#717973] font-mono block mt-1">Scan to Verify</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#edeeef] flex justify-end gap-3 no-print">
              <button
                onClick={() => setSelectedLandRecord(null)}
                className="px-5 py-2.5 bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[13px] rounded-xl transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
