'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { calculateAR, AR_Input, AR_Output, SoilType } from '@/modules/ar-assessment/calculations';
import ARNextSteps from '@/components/ar-next-steps';

const soilTypes: { name: SoilType; description: string }[] = [
    { name: "Sandy", description: "Water drains very quickly. Feels gritty." },
    { name: "Loamy", description: "A mix of sand, silt, and clay. Ideal for most plants." },
    { name: "Clay", description: "Holds water well. Feels sticky when wet." },
    { name: "Rocky", description: "Contains many stones. Poor water retention." },
];

const steps = ["Site Details", "View Results", "Next Steps"];

export default function ArtificialRechargePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<AR_Input>({
        availableArea: 10,
        soilType: 'Loamy',
        groundwaterDepth: 10
    });
    const [results, setResults] = useState<AR_Output | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof AR_Input, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const handleAssess = () => {
        const arResults = calculateAR(formData);
        setResults(arResults);
        setCurrentStep(2);
    }

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    }

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    }

    const handleStartOver = () => {
        setCurrentStep(1);
        setResults(null);
    }

    return (
        <div 
            className="w-full min-h-screen bg-[#0a0613] text-white font-light antialiased pt-24 pb-10"
            style={{
                background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
            }}
        >
            <div className="relative z-10 container mx-auto max-w-2xl px-4">
                <div className="mb-8">
                    {/* Inline Stepper */}
                    <div className="flex items-center justify-center space-x-4">
                        {steps.map((name, index) => {
                            const stepNumber = index + 1;
                            const isActive = stepNumber === currentStep;
                            const isCompleted = stepNumber < currentStep;
                            return (
                                <div key={name} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isActive ? 'bg-[#9b87f5] text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                        {isCompleted ? '✓' : stepNumber}
                                    </div>
                                    <span className={`ml-2 text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>{name}</span>
                                    {stepNumber < steps.length && <div className={`h-0.5 w-12 ml-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="p-8 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5"
                >
                    {currentStep === 1 && (
                        <div className="space-y-10">
                            <h1 className="text-3xl font-light text-center text-white mb-4">Artificial Recharge Assessment</h1>
                            <p className="text-center text-white/60 -mt-8 mb-8">Answer three simple questions to assess your site&apos;s suitability.</p>
                            {/* Step 1: Soil Type */}
                            <div>
                                <label className="block text-lg font-medium text-center text-gray-300 mb-4">What is the dominant soil type in the area?</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {soilTypes.map(type => (
                                        <div key={type.name} onClick={() => handleChange('soilType', type.name)} className={`p-4 text-center border rounded-lg cursor-pointer transition-all duration-200 ${formData.soilType === type.name ? 'border-[#9b87f5] bg-[#9b87f5]/10 shadow-lg' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                                            <p className="font-semibold text-white">{type.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">{type.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Step 2: Available Area */}
                            <div>
                                <label htmlFor="availableArea" className="block text-lg font-medium text-center text-gray-300 mb-4">How much open space is available?</label>
                                <div className="relative">
                                    <input id="availableArea" type="range" min="1" max="100" value={formData.availableArea} onChange={(e) => handleChange('availableArea', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb" />
                                    <div className="text-center text-xl font-semibold text-[#9b87f5] mt-2">{formData.availableArea} m²</div>
                                </div>
                            </div>
                            {/* Step 3: Groundwater Depth */}
                            <div>
                                <label htmlFor="groundwaterDepth" className="block text-lg font-medium text-center text-gray-300 mb-4">How deep is the groundwater?</label>
                                <div className="relative">
                                    <input id="groundwaterDepth" type="range" min="1" max="50" value={formData.groundwaterDepth} onChange={(e) => handleChange('groundwaterDepth', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-thumb" />
                                    <div className="text-center text-xl font-semibold text-[#9b87f5] mt-2">{formData.groundwaterDepth} meters</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && results && (
                        <div className="mt-10 pt-8">
                            <h2 className="text-2xl font-light text-center text-white mb-4">Assessment Results</h2>
                            <div className="space-y-4 max-w-md mx-auto">
                                <div className="p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                                    <p className="text-sm font-medium text-gray-400">Feasibility</p>
                                    <p className={`text-2xl font-semibold ${results.feasibility === 'High' ? 'text-green-400' : results.feasibility === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{results.feasibility}</p>
                                </div>
                                <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                                    <p className="text-sm font-medium text-gray-400">Recommendation</p>
                                    <p className="text-lg font-semibold text-white">{results.recommendedStructure}</p>
                                </div>
                                <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                                    <p className="text-sm font-medium text-gray-400">Suggested Dimensions</p>
                                    <p className="text-lg font-semibold text-white">{results.structureDimensions}</p>
                                </div>
                                <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-lg">
                                    <p className="text-sm font-medium text-gray-400">Notes</p>
                                    <p className="text-white/80">{results.notes}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && <ARNextSteps />}

                    <div className="mt-10 flex justify-between items-center">
                        <div>
                            {currentStep > 1 && (
                                <button onClick={handleBack} className="text-white/70 transition-colors hover:text-white px-6 py-2">Back</button>
                            )}
                        </div>
                        <div>
                            {currentStep === 1 && (
                                <button onClick={handleAssess} className="w-full md:w-auto neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-12 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">Assess Feasibility</button>
                            )}
                            {currentStep === 2 && (
                                <button onClick={handleNext} className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">Next Steps</button>
                            )}
                            {currentStep === 3 && (
                                <button onClick={handleStartOver} className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">Start Over</button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
