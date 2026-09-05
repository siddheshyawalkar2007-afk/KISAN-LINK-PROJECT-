import React, { useState } from 'react';
import { 
  Sprout, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  Clock,
  Plus,
  Trash2,
  Leaf,
  Layers,
  ShieldCheck,
  Landmark,
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  LocateFixed
} from 'lucide-react';
import { CropEntry, FarmerProfile, Language } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface CropManagementViewProps {
  farmer: FarmerProfile;
  crops: CropEntry[];
  onAddCrop: (crop: CropEntry) => void;
  onDeleteCrop: (id: string) => void;
  onProceedToGovRequirements?: (
    cropName: string,
    district?: string,
    taluka?: string,
    village?: string,
    gpsCoordinates?: string
  ) => void;
  onBookSlotForCrop?: (cropName: string, quantityKg: number, district?: string) => void;
  language?: Language;
}

export const CropManagementView: React.FC<CropManagementViewProps> = ({
  farmer,
  crops,
  onAddCrop,
  onDeleteCrop,
  onProceedToGovRequirements,
  onBookSlotForCrop,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language];
  const [cropName, setCropName] = useState('Wheat');
  const [variety, setVariety] = useState('Lokwan');
  const [category, setCategory] = useState<'Cereal' | 'Pulse' | 'Cash Crop' | 'Oilseed'>('Cereal');
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('A');
// Location & District (Pune / Sambhajinagar as requested)
  const [district, setDistrict] = useState<'Pune' | 'Sambhajinagar'>('Pune');
  const [taluka, setTaluka] = useState('Haveli');
  const [village, setVillage] = useState('Shirwal');
  const [gpsCoordinates, setGpsCoordinates] = useState('18.5204° N, 73.8567° E');
  const [isGpsLive, setIsGpsLive] = useState(true);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const cropSuggestions: Record<string, { varieties: string[]; category: 'Cereal' | 'Pulse' | 'Cash Crop' | 'Oilseed'; msp: number; image: string }> = {
    Wheat: {
      varieties: ['Lokwan', 'Sharbati', 'Durum', 'HD-2967', 'PBW-343'],
      category: 'Cereal',
      msp: 2275,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYTu9OBrL9mul73hZ4b4NGCgugTz71s8gVOXYNVuGfSQdWvveUUDzVHwOwVIlF5yGfsi8NQ0ieA6eSfR6vti_bqoWCIvyVOsA-vlgxFOyMgXE0YNxR_oaKND2HuwWFnmy5D4OGYqk4IdsexwLT7Wm5SccIva_U8GFH912vZXuc-qwUMF8f3w8-Rnx4YSowQKlmZBcptM8MlnqSyFpd6krknYDN4O5TvHvW7sDKykQUGRk5GFTeeaQU',
    },
    Rice: {
      varieties: ['Basmati 1121', 'Sona Masoori', 'IR-64', 'Swarna', 'Pusa Basmati'],
      category: 'Cereal',
      msp: 2183,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEhtxifJRqR2fcQH0yweElJ9y8CEFtn8YbqPGwkqTrr17kE3iIYNBTR31uOVXK4DB5VTnxNUazLcnCYuPNKrOQGTVRyVqC5JQk5m84IBHpUkc0VWUQrh6Mg1YpTchE6a8xCknRVvYt6sqhUpwNa9lU2TMTpSdyGEhgqTBYbWT5UPxdJXyeGWZDsCy2Hx0AwSuzXAYKAnejrpEwiBIn4EsxbBHKxHwPU1i90lDbpAFhXJpukI7g12ps',
    },
    Cotton: {
      varieties: ['Bt Cotton Hybrid', 'MCU-5', 'Suraj', 'Shankar-6'],
      category: 'Cash Crop',
      msp: 7121,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkI4jPiPpZBn_Fk3YUOiWD9vEsFmjdrlr0sx4QWd4iLRaI7irKn3Mgy6n7jbWTis9UP-2UuI77nvc1JgTS-7F_hLEevVj40nA9IK_Ty2UUpYj6IWu4GrU_nZdQqWcuLkJdmLeBHJenrg0TmokVLbvN8ZYzy5gnUEGoNafYh5hj8AacsjCn51n-DFMitEFnGXwsA7aP83UI-SAR33hu-tB83OmyLD_sDdjXAXJPHiVdIa4XUOtXRP8P',
    },
    Soybean: {
      varieties: ['JS-335', 'JS-9305', 'MACS-1407', 'NRC-37'],
      category: 'Oilseed',
      msp: 4600,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYTu9OBrL9mul73hZ4b4NGCgugTz71s8gVOXYNVuGfSQdWvveUUDzVHwOwVIlF5yGfsi8NQ0ieA6eSfR6vti_bqoWCIvyVOsA-vlgxFOyMgXE0YNxR_oaKND2HuwWFnmy5D4OGYqk4IdsexwLT7Wm5SccIva_U8GFH912vZXuc-qwUMF8f3w8-Rnx4YSowQKlmZBcptM8MlnqSyFpd6krknYDN4O5TvHvW7sDKykQUGRk5GFTeeaQU',
    },
    Gram: {
      varieties: ['Desi Chana', 'Kabuli Chana', 'Vijay', 'Digvijay'],
      category: 'Pulse',
      msp: 5440,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYTu9OBrL9mul73hZ4b4NGCgugTz71s8gVOXYNVuGfSQdWvveUUDzVHwOwVIlF5yGfsi8NQ0ieA6eSfR6vti_bqoWCIvyVOsA-vlgxFOyMgXE0YNxR_oaKND2HuwWFnmy5D4OGYqk4IdsexwLT7Wm5SccIva_U8GFH912vZXuc-qwUMF8f3w8-Rnx4YSowQKlmZBcptM8MlnqSyFpd6krknYDN4O5TvHvW7sDKykQUGRk5GFTeeaQU',
    },
  };

  const handleDistrictChange = (newDistrict: 'Pune' | 'Sambhajinagar') => {
    setDistrict(newDistrict);
    if (newDistrict === 'Pune') {
      setTaluka('Haveli');
      setVillage('Shirwal');
      setGpsCoordinates('18.5204° N, 73.8567° E');
    } else {
      setTaluka('Paithan');
      setVillage('Jadhavwadi');
      setGpsCoordinates('19.8762° N, 75.3433° E');
    }
  };

  const handleFetchGps = () => {
    setIsGpsLive(true);
    if (district === 'Pune') {
      setGpsCoordinates('18.5204° N, 73.8567° E');
    } else {
      setGpsCoordinates('19.8762° N, 75.3433° E');
    }
  };

  const handleCropChange = (name: string) => {
    setCropName(name);
    const info = cropSuggestions[name];
    if (info) {
      setVariety(info.varieties[0]);
      setCategory(info.category);
    }
  };

  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: CropEntry = {
      id: `crop-${Date.now()}`,
      cropName,
      variety,
      category,
      grade,
      district,
      taluka,
      village,
      gpsCoordinates,
      imageUrl: cropSuggestions[cropName]?.image,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAddCrop(newEntry);
    setIsSuccessToast(true);

    // Sequential Transition to Step 2 (Gov Requirements & Bank Selection) with location
    if (onProceedToGovRequirements) {
      setTimeout(() => {
        onProceedToGovRequirements(
          cropName, 
          district, 
          taluka, 
          village, 
          gpsCoordinates
        );
      }, 400);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Workflow Stepper Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#c1c8c2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#1b4332] text-white text-[12px] font-bold">
              Step 1 of 3
            </span>
            <span className="text-[12px] font-semibold text-[#717973]">
              Workflow: Crop Declaration → Gov Requirement & Bank → Center & Slot
            </span>
          </div>
          <h2 className="text-[24px] font-extrabold font-headline text-[#012d1d] mt-1">
            {t.cropManagement}
          </h2>
          <p className="text-[13px] text-[#414844]">
            Fill your harvest information, then click Submit to proceed directly to Government Requirements & Bank choice.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#f8f9fa] p-2.5 rounded-xl border border-[#edeeef] text-[12px]">
          <ShieldCheck className="w-5 h-5 text-[#137333]" />
          <div>
            <span className="text-[#717973] block text-[10px] font-bold uppercase">Linked Verification</span>
            <span className="font-bold text-[#191c1d]">8A Khata: KH-1024 & e-Pik Validated</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {isSuccessToast && (
        <div className="p-4 bg-[#c1ecd4] border border-[#1b4332] text-[#002114] rounded-xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#137333]" />
            <span className="font-semibold text-[14px]">
              Crop details saved! Redirecting to Government Requirements & Bank Selection (Step 2)...
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveAndProceed} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c1c8c2] shadow-xs space-y-6">
            <div>
              <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#1b4332]" />
                Primary Crop Details (Step 1)
              </h3>
              <p className="text-[13px] text-[#717973] mt-0.5">Specify crop type, variety, and expected harvest grade</p>
            </div>

            {/* Quick Crop Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(cropSuggestions).map((crop) => (
                <button
                  type="button"
                  key={crop}
                  onClick={() => handleCropChange(crop)}
                  className={`px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all cursor-pointer ${
                    cropName === crop
                      ? 'bg-[#012d1d] text-[#c1ecd4] shadow-xs scale-105'
                      : 'bg-[#f8f9fa] border border-[#c1c8c2] text-[#414844] hover:bg-[#edeeef]'
                  }`}
                >
                  🌾 {crop}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Crop Name</label>
                <select
                  value={cropName}
                  onChange={(e) => handleCropChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                >
                  {Object.keys(cropSuggestions).map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Variety</label>
                <select
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                >
                  {cropSuggestions[cropName]?.varieties.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                >
                  <option value="Cereal">Cereal</option>
                  <option value="Pulse">Pulse</option>
                  <option value="Cash Crop">Cash Crop</option>
                  <option value="Oilseed">Oilseed</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Expected Quality Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                >
                  <option value="A">Grade A (Premium MSP - Max Moisture 12%)</option>
                  <option value="B">Grade B (Standard MSP - Max Moisture 14%)</option>
                  <option value="C">Grade C (Fair Average Quality)</option>
                </select>
              </div>
            </div>

            
            {/* Location & GPS Google Map Linking */}
            <div className="pt-4 border-t border-[#edeeef] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-bold font-headline text-[#191c1d] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1b4332]" />
                    <span>Farm Location & GPS Google Map Linking</span>
                  </h3>
                  <p className="text-[13px] text-[#717973]">
                    Auto-links your farm location with Mandi Centers in Pune & Chhatrapati Sambhajinagar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFetchGps}
                  className="px-3 py-1.5 bg-[#c1ecd4] hover:bg-[#a3e0be] text-[#002114] text-[12px] font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <LocateFixed className="w-3.5 h-3.5 text-[#137333]" />
                  <span>Fetch Live GPS</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">District (जिल्हा)</label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value as 'Pune' | 'Sambhajinagar')}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border-2 border-[#1b4332] rounded-xl text-[14px] font-bold text-[#012d1d] focus:ring-2 focus:ring-[#1b4332] outline-none shadow-2xs"
                  >
                    <option value="Pune">Pune (पुणे)</option>
                    <option value="Sambhajinagar">Chhatrapati Sambhajinagar (छत्रपती संभाजीनगर)</option>
                  </select>
                  <span className="text-[11px] text-[#137333] font-semibold mt-1 block">✓ Procurement Active</span>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Taluka (तालुका)</label>
                  <input
                    type="text"
                    value={taluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    placeholder="e.g. Haveli / Paithan"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                    required
                  />
                  <span className="text-[11px] text-[#717973] mt-1 block">Sub-district jurisdiction</span>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#191c1d] mb-1.5">Village / Gram (गाव)</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Shirwal / Jadhavwadi"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c1c8c2] rounded-xl text-[14px] font-medium text-[#191c1d] focus:ring-2 focus:ring-[#1b4332] outline-none"
                    required
                  />
                  <span className="text-[11px] text-[#717973] mt-1 block">e-Pik Pera Registered Village</span>
                </div>
              </div>

              {/* Interactive GPS Google Map Card */}
              <div className="bg-[#f8f9fa] rounded-2xl border border-[#c1c8c2] p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#1b4332] text-white rounded-lg">
                      <Navigation className="w-4 h-4" />
                    </span>
                    <span className="text-[13px] font-bold text-[#191c1d]">
                      Google Maps GPS Coordinates: <strong className="font-mono text-[#012d1d]">{gpsCoordinates}</strong>
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${village}, ${taluka}, ${district}, Maharashtra`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1b4332] hover:text-[#012d1d] hover:underline cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Styled Map Preview Canvas */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#c1c8c2] bg-[#e5e3df] flex items-center justify-center group">
                  {/* Subtle Grid Map Texture */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1b4332_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Road & River decorative vectors */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,80 Q150,40 300,90 T600,60" fill="none" stroke="#2b6cb0" strokeWidth="6" />
                    <path d="M50,0 Q120,70 200,150 T450,140" fill="none" stroke="#cbd5e1" strokeWidth="12" />
                    <path d="M50,0 Q120,70 200,150 T450,140" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>

                  {/* Marker Pin */}
                  <div className="relative z-10 flex flex-col items-center animate-bounce">
                    <div className="px-3 py-1 bg-[#012d1d] text-[#c1ecd4] rounded-full text-[11px] font-bold shadow-lg border border-[#c1ecd4]/40 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c1ecd4]" />
                      <span>{village}, {district}</span>
                    </div>
                    <div className="w-4 h-4 bg-[#1b4332] rotate-45 -mt-1.5 shadow-md"></div>
                  </div>

                  {/* Badges on Map */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#191c1d] border border-[#c1c8c2] flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#137333] animate-pulse"></span>
                    <span>GPS Auto-Linked to {district} Mandi Centers</span>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-mono">
                    Google Maps Satellite + Hybrid
                  </div>
                </div>
              </div>
            </div>

            {/* Submit & Next Step CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#edeeef]">
              <div className="text-[12px] text-[#414844]">
                Next: <span className="font-bold text-[#191c1d]">Government Scheme Amount & Bank Selection (Step 2)</span>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#012d1d] hover:bg-[#1b4332] text-white font-bold text-[14px] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Save Crop & Submit to Gov Scheme (Step 2)</span>
                <ArrowRight className="w-4 h-4 text-[#c1ecd4]" />
              </button>
            </div>
          </form>
        </div>

        {/* Side Info Column */}
        <div className="space-y-5">
          {/* Auto-Fill Active Card */}
          <div className="bg-[#c1ecd4]/30 border border-[#1b4332]/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#012d1d]">
              <Sparkles className="w-5 h-5 text-[#1b4332]" />
              <h4 className="text-[15px] font-bold font-headline">8A & Land Auto-Fill Active</h4>
            </div>
            <p className="text-[13px] text-[#274e3d] leading-relaxed">
              Calculated automatically from your verified <span className="font-bold">{farmer?.landArea ?? 2.4} Hectares</span> under 8A Khata <span className="font-bold">KH-1024/2024</span> in <span className="font-bold">{farmer?.village || 'Shirwal'}</span>.
            </p>
            <div className="pt-2 border-t border-[#1b4332]/20 flex items-center justify-between text-[12px] font-semibold text-[#012d1d]">
              <span>Recommended MSP: ₹{cropSuggestions[cropName]?.msp} / qtl</span>
              <Leaf className="w-4 h-4 text-[#1b4332]" />
            </div>
          </div>

          {/* Visual Crop Reference Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#c1c8c2] shadow-xs">
            <div className="h-40 relative overflow-hidden bg-stone-100">
              <img
                src={cropSuggestions[cropName]?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYTu9OBrL9mul73hZ4b4NGCgugTz71s8gVOXYNVuGfSQdWvveUUDzVHwOwVIlF5yGfsi8NQ0ieA6eSfR6vti_bqoWCIvyVOsA-vlgxFOyMgXE0YNxR_oaKND2HuwWFnmy5D4OGYqk4IdsexwLT7Wm5SccIva_U8GFH912vZXuc-qwUMF8f3w8-Rnx4YSowQKlmZBcptM8MlnqSyFpd6krknYDN4O5TvHvW7sDKykQUGRk5GFTeeaQU'}
                alt={cropName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold rounded-full">
                Active Procurement
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h4 className="text-[16px] font-bold font-headline text-[#191c1d]">
                {cropName} ({variety})
              </h4>
              <p className="text-[12px] text-[#414844]">
                State Central Procurement Silos have high active allocation for Grade {grade} {cropName}.
              </p>
              <div className="pt-3 border-t border-[#edeeef] flex justify-between items-center text-[12px]">
                <span className="text-[#717973]">Guaranteed MSP</span>
                <span className="font-bold text-[#1b4332]">₹{cropSuggestions[cropName]?.msp} / Quintal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
