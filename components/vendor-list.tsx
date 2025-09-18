'use client';

const dummyVendors = [
  { name: "AquaPure Systems", location: "Delhi, India", specialty: "Residential & Commercial RWH" },
  { name: "GreenWater Solutions", location: "Mumbai, India", specialty: "Recharge Pits & Borewell Recharge" },
  { name: "HydroHarvest Inc.", location: "Bangalore, India", specialty: "Large-scale Industrial Systems" },
  { name: "EcoFirst Water", location: "Chennai, India", specialty: "Filtration and Storage Tanks" },
  { name: "RainSave Tech", location: "Pune, India", specialty: "Smart RWH & IoT Monitoring" },
];

interface VendorListProps {
    onEnquiry: (vendorName: string) => void;
}

export default function VendorList({ onEnquiry }: VendorListProps) {
  return (
    <div className="space-y-4">
      {dummyVendors.map((vendor) => (
        <div key={vendor.name} className="p-4 flex justify-between items-center bg-white/5 border border-white/10 rounded-lg">
          <div>
            <h3 className="font-semibold text-lg text-white">{vendor.name}</h3>
            <p className="text-sm text-gray-400">{vendor.location}</p>
            <p className="text-xs text-gray-500 mt-1">Specialty: {vendor.specialty}</p>
          </div>
          <button 
            onClick={() => onEnquiry(vendor.name)}
            className="neumorphic-button hover:shadow-[0_0_10px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-6 py-2 text-sm text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
            Request Enquiry
          </button>
        </div>
      ))}
    </div>
  );
}
