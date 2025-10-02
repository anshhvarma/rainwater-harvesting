// app/(root)/campaigns/[id]/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// In a real app, you'd fetch this data, but for now, we'll reuse it.
const campaigns = [
  {
    id: 1,
    title: 'City-Wide Rooftop Harvesting Initiative',
    description: 'A massive drive across the city to install rainwater harvesting systems on over 500 residential buildings. This campaign helped save over 10 million liters of water during the monsoon season.',
    longDescription: 'The initiative involved door-to-door awareness, subsidies on installation, and collaboration with local housing societies. The success of this project has laid the groundwork for a city-wide water grid powered by harvested rainwater. We also conducted workshops to train residents on basic maintenance and operation of the installed systems, ensuring long-term sustainability. The campaign was recognized by the National Water Board as a model for urban water management.',
    imageUrl: '/assests/hero-image.png',
    date: 'October 15, 2023',
  },
  {
    id: 2,
    title: 'School Awareness Program: Every Drop Counts',
    description: 'We partnered with 50 schools to educate young students about the importance of water conservation and rainwater harvesting through interactive workshops and competitions.',
    longDescription: 'The "Every Drop Counts" program included curriculum modules for different age groups, hands-on experiments with water filtration, and a district-level competition for the most innovative water-saving idea. Winning schools were awarded with a complete rainwater harvesting system for their premises. The program reached over 20,000 students and has been adopted by the state education board.',
    imageUrl: '/assests/earth.webp',
    date: 'August 22, 2023',
  },
  {
    id: 3,
    title: 'Corporate Water Challenge',
    description: 'Encouraging businesses to adopt water-saving technologies and rainwater harvesting. Over 20 major corporations implemented sustainable water management practices.',
    longDescription: 'This B2B initiative challenged corporations to conduct a water audit and and implement measures to reduce their water footprint. We provided technical consultation and connected them with certified vendors. The campaign culminated in an awards ceremony celebrating the most water-positive companies. The collective effort resulted in an estimated annual saving of 50 million liters of water.',
    imageUrl: '/assests/hero-image.png',
    date: 'May 05, 2023',
  },
  {
    id: 4,
    title: 'Rural Community Water Security',
    description: 'Focused on empowering rural communities by building large-scale community rainwater harvesting ponds and check dams, ensuring water availability for agriculture and daily needs.',
    longDescription: 'Working with local NGOs and village councils, we identified key locations for constructing check dams and community ponds. The project was executed with community participation, providing employment and fostering a sense of ownership. These structures now serve as a lifeline for several villages, recharging groundwater levels and providing a crucial water source during dry seasons.',
    imageUrl: '/assests/earth.webp',
    date: 'January 30, 2023',
  },
];

const CampaignDetailPage = () => {
  const params = useParams();
  const campaignId = params.id;
  const campaign = campaigns.find(c => c.id.toString() === campaignId);

  if (!campaign) {
    return (
        <div className="w-full min-h-screen bg-[#0a0613] text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-light">Campaign not found</h1>
                <Link href="/campaigns" className="text-[#9b87f5] hover:text-white mt-4 inline-block">
                    &larr; Back to Campaigns
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div 
        className="w-full min-h-screen bg-[#0a0613] text-white font-light antialiased pt-24 pb-10"
        style={{
            background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
    >
        <div className="container mx-auto max-w-4xl px-4">
            <div className="p-8 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5">
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
                    <Image
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-white mb-3">{campaign.title}</h1>
                <p className="text-sm text-white/70 mb-6">{campaign.date}</p>
                <div className="prose prose-invert max-w-none text-white/80">
                    <p>{campaign.longDescription}</p>
                </div>
                <div className="mt-8">
                    <Link href="/campaigns" className="text-[#9b87f5] hover:text-white transition-colors">
                        &larr; Back to All Campaigns
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CampaignDetailPage;
