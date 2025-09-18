import Link from 'next/link';
import { useState } from 'react';
import VendorList from './vendor-list';
import EnquiryModal from './enquiry-modal';
import { AssessmentOutput } from '@/modules/rwh-assessment/calculations';

interface ConnectEnquireProps {
    assessmentResults: AssessmentOutput | null;
}

export default function ConnectEnquire({ assessmentResults }: ConnectEnquireProps) {
    const [activeTab, setActiveTab] = useState('vendors');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState('');

    const handleEnquiry = (vendorName: string) => {
        setSelectedVendor(vendorName);
        setIsModalOpen(true);
    }

    return (
        <div>
            <h2 className="text-3xl font-light text-center text-white mb-4">Step 4: Connect & Enquire</h2>
            <p className="text-center text-white/60 mb-6">Explore options for implementing your rainwater harvesting system.</p>

            <div className="flex justify-center border-b border-white/10 mb-6">
                <button 
                    onClick={() => setActiveTab('recharge')}
                    className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'recharge' ? 'text-white border-b-2 border-[#9b87f5]' : 'text-gray-400 hover:text-white'}`}>
                    Artificial Recharge
                </button>
                <button 
                    onClick={() => setActiveTab('vendors')}
                    className={`px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'vendors' ? 'text-white border-b-2 border-[#9b87f5]' : 'text-gray-400 hover:text-white'}`}>
                    Find Vendors
                </button>
            </div>

            <div>
                {activeTab === 'recharge' && (
                    <div className="text-center p-4">
                        <h3 className="text-xl text-white mb-2">About Artificial Recharge</h3>
                        <p className="text-white/60">
                            Your recommended structure is a <span className="font-bold text-[#9b87f5]">{assessmentResults?.recommendedStructure}</span>. 
                            Artificial recharge helps replenish groundwater levels. It is crucial to consult a certified professional before construction.
                        </p>
                        <Link href="/assesment/ar" className="mt-4 inline-block neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-6 py-2 text-sm text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
                            Perform Detailed AR Assessment
                        </Link>
                    </div>
                )}
                {activeTab === 'vendors' && (
                    <VendorList onEnquiry={handleEnquiry} />
                )}
            </div>

            <EnquiryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                vendorName={selectedVendor} 
                assessmentResults={assessmentResults} 
            />
        </div>
    )
}
