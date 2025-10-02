// app/(root)/vendors/page.tsx
import React from 'react';

const vendors = [
  {
    id: 1,
    name: 'AquaPure Systems',
    description: 'Specializing in residential and commercial rainwater harvesting solutions. Government certified since 2010.',
    products: ['Rooftop Collection Systems', 'Underground Storage Tanks', 'First-Flush Diverters', 'Water Filtration Kits'],
  },
  {
    id: 2,
    name: 'GreenWater Tech',
    description: 'Innovative and eco-friendly water management technologies. Certified for large-scale projects.',
    products: ['Modular Rainwater Tanks', 'Smart Irrigation Controllers', 'Greywater Recycling Systems', 'UV Water Purifiers'],
  },
  {
    id: 3,
    name: 'HydroHarvest Solutions',
    description: 'Providing affordable and durable rainwater harvesting products for agricultural and domestic use.',
    products: ['HDPE Storage Tanks', 'Leaf and Debris Separators', 'Tank Level Indicators', 'Solar Powered Water Pumps'],
  },
];

const VendorsPage = () => {
  return (
    <div 
        className="w-full min-h-screen bg-[#0a0613] text-white font-light antialiased pt-24 pb-10"
        style={{
            background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
    >
        <div className="container mx-auto max-w-7xl px-4">
            <h1 className="text-3xl font-light text-center text-white mb-8">Government Verified Vendors</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {vendors.map((vendor) => (
                            <div key={vendor.id} className="p-6 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5">
                                <h3 className="text-xl font-semibold text-white">{vendor.name}</h3>
                                <p className="text-white/60 mt-2">{vendor.description}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-white/80">Products:</h4>
                                    <ul className="list-disc list-inside mt-2 text-white/60">
                                        {vendor.products.map((product) => (
                                        <li key={product}>{product}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="p-8 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5 sticky top-24">
                        <h2 className="text-2xl font-light text-center mb-6">Contact a Vendor</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-white/70 font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b87f5] bg-white/5 text-white"
                                    placeholder="e.g., Jane Doe"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-white/70 font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b87f5] bg-white/5 text-white"
                                    placeholder="e.g., jane.doe@example.com"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phoneNumber" className="block text-white/70 font-medium mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="w-full px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b87f5] bg-white/5 text-white"
                                    placeholder="e.g., +1 (555) 987-6543"
                                />
                            </div>
                            <div className="text-center mt-8">
                                <button
                                    type="submit"
                                    className="hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30"
                                >
                                    Submit Inquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default VendorsPage;
