'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import RooftopArea from "@/components/rooftop-area";
import AssessmentForm, { FormData } from '@/components/assessment-form';
import AssessmentResults from '@/components/assessment-results';
import Stepper from '@/components/stepper';
import ConnectEnquire from '@/components/connect-enquire';
import { calculateRWH, AssessmentOutput } from '@/modules/rwh-assessment/calculations';

// Dummy monthly rainfall data for Delhi (in mm). In a real app, this would be fetched based on location.
const dummyMonthlyRainfall = [10, 12, 5, 15, 30, 80, 250, 280, 120, 20, 5, 8];

const AssesementPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [roofArea, setRoofArea] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    roofType: 'RCC/Concrete',
    dwellers: 4,
  });
  const [results, setResults] = useState<AssessmentOutput | null>(null);

  const handleAreaCalculated = (area: number) => {
    setRoofArea(area);
  };

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  const handleNext = () => {
    if (currentStep === 1 && roofArea === null) {
        alert('Please define the roof area on the map before proceeding.');
        return;
    }
    if (currentStep === 2) {
        handleCalculate();
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCalculate = () => {
    if (!roofArea) return;
    const assessmentResults = calculateRWH({
        ...formData,
        roofArea,
        monthlyRainfall: dummyMonthlyRainfall
    });
    setResults(assessmentResults);
  }

  const handleStartOver = () => {
      setCurrentStep(1);
      setRoofArea(null);
      setResults(null);
  }

  const totalSteps = 4;

  return (
    <div 
        className="w-full min-h-screen bg-[#0a0613] text-white font-light antialiased pt-24 pb-10"
        style={{
            background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
        }}
    >
        <div className="relative z-10 container mx-auto max-w-4xl px-4">
            <div className="mb-12">
                <Stepper currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-8 border border-white/10 rounded-lg bg-white/5 shadow-2xl shadow-[#9b87f5]/5"
            >
                {currentStep === 1 && (
                    <>
                        <h2 className="text-3xl font-light text-center text-white mb-4">Step 1: Define Your Roof Area</h2>
                        <p className="text-center text-white/60 mb-6">Use the map tools to draw a polygon over your rooftop.</p>
                        <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg border border-white/10">
                            <RooftopArea onAreaCalculated={handleAreaCalculated} />
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <h2 className="text-3xl font-light text-center text-white mb-4">Step 2: Provide Assessment Details</h2>
                        <p className="text-center text-white/60 mb-6">Fill in the details below to help us calculate your potential.</p>
                        <AssessmentForm roofArea={roofArea} formData={formData} onFormChange={handleFormChange} />
                    </>
                )}

                {currentStep === 3 && results && (
                    <AssessmentResults results={results} />
                )}

                {currentStep === 4 && (
                    <ConnectEnquire assessmentResults={results} />
                )}

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        {currentStep > 1 && currentStep <= totalSteps && (
                            <button onClick={handleBack} className="text-white/70 transition-colors hover:text-white px-6 py-2">
                                Back
                            </button>
                        )}
                    </div>
                    <div>
                        {currentStep < totalSteps && (
                            <button onClick={handleNext} className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
                                {currentStep === 2 ? 'Calculate & Next' : 'Next'}
                            </button>
                        )}
                         {currentStep === totalSteps && (
                            <button onClick={handleStartOver} className="neumorphic-button hover:shadow-[0_0_20px_rgba(155,135,245,0.5)] relative overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30">
                                Start Over
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default AssesementPage;
