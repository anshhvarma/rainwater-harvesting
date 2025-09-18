'use client';

import { AssessmentInput, RoofType } from '@/modules/rwh-assessment/calculations';

export type FormData = Omit<AssessmentInput, 'roofArea' | 'monthlyRainfall'>;

interface AssessmentFormProps {
  roofArea: number | null;
  formData: FormData;
  onFormChange: (data: FormData) => void;
}

const roofTypes: RoofType[] = ["RCC/Concrete", "Metal sheet", "Tiles", "Green roof"];

export default function AssessmentForm({ roofArea, formData, onFormChange }: AssessmentFormProps) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof FormData, value: any) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6 text-white">
      <div>
        <label htmlFor="roof-area" className="block text-sm font-medium text-gray-300">Roof Area (m²)</label>
        <input
          id="roof-area"
          type="text"
          readOnly
          value={roofArea !== null ? roofArea.toFixed(2) : 'Draw on map'}
          className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="roof-type" className="block text-sm font-medium text-gray-300">Roof Material</label>
        <select
          id="roof-type"
          value={formData.roofType}
          onChange={(e) => handleChange('roofType', e.target.value as RoofType)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-white bg-[#150d27] border-white/10 focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm rounded-md"
        >
          {roofTypes.map(type => (
            <option key={type} value={type} className="bg-[#150d27] text-white">{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="dwellers" className="block text-sm font-medium text-gray-300">Number of Dwellers</label>
        <input
          id="dwellers"
          type="number"
          value={formData.dwellers}
          onChange={(e) => handleChange('dwellers', parseInt(e.target.value, 10))}
          className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md shadow-sm focus:outline-none focus:ring-[#9b87f5] focus:border-[#9b87f5] sm:text-sm"
          min="1"
        />
      </div>
    </div>
  );
}
