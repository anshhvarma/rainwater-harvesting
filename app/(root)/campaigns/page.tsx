// app/(root)/campaigns/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const campaigns = [
  {
    id: 1,
    title: 'City-Wide Rooftop Harvesting Initiative',
    description: 'A massive drive across the city to install rainwater harvesting systems on over 500 residential buildings. This campaign helped save over 10 million liters of water during the monsoon season.',
    imageUrl: '/assests/hero-image.png',
    date: 'October 15, 2023',
  },
  {
    id: 2,
    title: 'School Awareness Program: Every Drop Counts',
    description: 'We partnered with 50 schools to educate young students about the importance of water conservation and rainwater harvesting through interactive workshops and competitions.',
    imageUrl: '/assests/earth.webp',
    date: 'August 22, 2023',
  },
  {
    id: 3,
    title: 'Corporate Water Challenge',
    description: 'Encouraging businesses to adopt water-saving technologies and rainwater harvesting. Over 20 major corporations implemented sustainable water management practices.',
    imageUrl: '/assests/hero-image.png',
    date: 'May 05, 2023',
  },
  {
    id: 4,
    title: 'Rural Community Water Security',
    description: 'Focused on empowering rural communities by building large-scale community rainwater harvesting ponds and check dams, ensuring water availability for agriculture and daily needs.',
    imageUrl: '/assests/earth.webp',
    date: 'January 30, 2023',
  },
];

const CampaignsPage = () => {
  return (
    <div 
        className="w-full min-h-screen bg-[#0a0613] text-white font-light antialiased pt-24 pb-10"
        style={{
            background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
    >
        <div className="container mx-auto max-w-5xl px-4">
            <h1 className="text-3xl font-light text-center text-white mb-12">Our Past Campaigns</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-6 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5 flex flex-col">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                            <Image
                                src={campaign.imageUrl}
                                alt={campaign.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">{campaign.title}</h2>
                        <p className="text-sm text-white/70 mb-4">{campaign.date}</p>
                        <p className="text-white/60 flex-grow mb-4">{campaign.description}</p>
                        <div className="mt-auto">
                            <Link href={`/campaigns/${campaign.id}`} className="text-[#9b87f5] hover:text-white font-semibold transition-colors">
                                Read More &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CampaignsPage;