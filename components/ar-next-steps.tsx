'use client';

import Link from 'next/link';

export default function ARNextSteps() {
  return (
    <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-4">Next Steps</h2>
        <p className="text-white/60 mb-6">Your assessment is complete. Here are some recommended next steps.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                <h3 className="font-semibold text-lg text-[#9b87f5]">Consult a Professional</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">It is crucial to consult a certified hydrogeologist or civil engineer before starting any construction. They can perform a detailed site survey.</p>
            </div>
            <div className="p-6 border border-white/10 rounded-lg bg-white/5">
                <h3 className="font-semibold text-lg text-[#9b87f5]">Find Certified Vendors</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Connect with vendors who specialize in constructing and maintaining recharge structures in your area.</p>
                <Link href="/assesment" className="neumorphic-button hover:shadow-[0_0_10px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-6 py-2 text-sm text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
                    Find Vendors
                </Link>
            </div>
        </div>
    </div>
  );
}
