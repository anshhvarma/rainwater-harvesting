'use client';

import { AssessmentOutput } from "@/modules/rwh-assessment/calculations";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  assessmentResults: AssessmentOutput | null;
}

export default function EnquiryModal({ isOpen, onClose, vendorName, assessmentResults }: EnquiryModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Enquiry sent to ${vendorName}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <div className="relative p-8 rounded-lg bg-[#150d27] border border-white/10 shadow-2xl shadow-[#9b87f5]/10 w-full max-w-lg mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">&times;</button>
        <h2 className="text-2xl font-light text-white mb-4">Request for Enquiry to <span className="text-[#9b87f5]">{vendorName}</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
                <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
                <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea 
                    id="message" 
                    rows={4} 
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm"
                    defaultValue={`Hello, I have performed a rainwater harvesting assessment and my recommended structure is a ${assessmentResults?.recommendedStructure}. I would like to enquire about your services. My annual harvest potential is ${assessmentResults?.annualHarvest.toFixed(2)} m³.`}
                />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
                    Submit Enquiry
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
