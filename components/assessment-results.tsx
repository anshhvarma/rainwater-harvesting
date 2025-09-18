'use client';

import { AssessmentOutput } from '@/modules/rwh-assessment/calculations';

interface AssessmentResultsProps {
  results: AssessmentOutput;
}

export default function AssessmentResults({ results }: AssessmentResultsProps) {
  return (
    <div className="mt-6 text-white">
      <h2 className="text-3xl font-light text-center text-white mb-6">Assessment Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <div className="p-4 border border-white/10 rounded-lg bg-white/5">
          <p className="text-sm font-medium text-gray-400">Feasibility</p>
          <p className={`text-2xl font-semibold ${results.feasibility === 'High' ? 'text-green-400' : results.feasibility === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
            {results.feasibility}
          </p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5">
          <p className="text-sm font-medium text-gray-400">Annual Harvest</p>
          <p className="text-2xl font-semibold text-[#9b87f5]">{results.annualHarvest.toFixed(2)} m³</p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5">
          <p className="text-sm font-medium text-gray-400">Liters/Person/Day</p>
          <p className="text-2xl font-semibold text-[#9b87f5]">{results.litersPerPersonPerDay.toFixed(2)} L</p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5 md:col-span-1 lg:col-span-3">
          <p className="text-sm font-medium text-gray-400">Recommended Structure</p>
          <p className="text-xl font-semibold text-white">{results.recommendedStructure}</p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5">
          <p className="text-sm font-medium text-gray-400">Estimated Cost</p>
          <p className="text-xl font-semibold text-white">INR {results.costEstimate.toLocaleString()}</p>
        </div>
        <div className="p-4 border border-white/10 rounded-lg bg-white/5 lg:col-span-2">
          <p className="text-sm font-medium text-gray-400">Estimated Payback Period</p>
          <p className="text-xl font-semibold text-white">{results.paybackPeriod}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-light text-center text-white mb-4">Monthly Water Harvest (m³)</h3>
        <div className="flex items-end space-x-2 mt-2 h-48 p-4 border border-white/10 rounded-lg bg-white/5">
            {results.monthlyHarvest.map((value, index) => {
                const maxMonthValue = Math.max(...results.monthlyHarvest);
                const barHeight = maxMonthValue > 0 ? (value / maxMonthValue) * 100 : 0;
                return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end">
                        <div 
                            className="w-full bg-[#9b87f5]/50 rounded-t-md hover:bg-[#9b87f5] transition-colors"
                            style={{ height: `${barHeight}%` }}
                            title={`${value.toFixed(2)} m³`}
                        ></div>
                        <span className="text-xs text-gray-400 mt-1">{new Date(0, index).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                )
            })}
        </div>
      </div>

    </div>
  );
}
