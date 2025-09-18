export type RoofType = "RCC/Concrete" | "Metal sheet" | "Tiles" | "Green roof";

export interface AssessmentInput {
  roofArea: number; // in m²
  roofType: RoofType;
  monthlyRainfall: number[]; // 12 months, in mm
  dwellers: number;
  firstFlushDepth?: number; // in mm
}

export interface AssessmentOutput {
  monthlyHarvest: number[]; // in m³
  annualHarvest: number; // in m³
  litersPerPersonPerDay: number;
  feasibility: "Low" | "Medium" | "High";
  recommendedStructure: string;
  costEstimate: number;
  paybackPeriod: string;
}

const runoffCoefficients: Record<RoofType, number> = {
  "RCC/Concrete": 0.85,
  "Metal sheet": 0.95,
  "Tiles": 0.8,
  "Green roof": 0.6,
};

export function calculateRWH(input: AssessmentInput): AssessmentOutput {
  const { roofArea, roofType, monthlyRainfall, dwellers } = input;
  const firstFlushDepth = input.firstFlushDepth ?? 2; // default to 2mm

  const runoffCoefficient = runoffCoefficients[roofType];

  const monthlyHarvest = monthlyRainfall.map((rainfall) => {
    const rainfallInMeters = rainfall / 1000;
    const totalVolume = roofArea * rainfallInMeters * runoffCoefficient;
    const firstFlushVolume = roofArea * (firstFlushDepth / 1000) / 12; // Spread first flush over the year for simplicity
    return Math.max(0, totalVolume - firstFlushVolume);
  });

  const annualHarvest = monthlyHarvest.reduce((sum, current) => sum + current, 0);

  const annualLiters = annualHarvest * 1000;
  const litersPerPersonPerDay = dwellers > 0 ? annualLiters / (dwellers * 365) : 0;

  let feasibility: "Low" | "Medium" | "High";
  if (annualHarvest < 10) {
    feasibility = "Low";
  } else if (annualHarvest < 50) {
    feasibility = "Medium";
  } else {
    feasibility = "High";
  }

  let recommendedStructure = "";
  if (feasibility !== "Low") {
    if (annualHarvest > 20) {
        recommendedStructure = "Recharge Pit (2m diameter, 1.5m deep)";
    } else {
        recommendedStructure = "Small Storage Tank (5000 Liters)";
    }
  }

  // Dummy cost and payback for now
  const costEstimate = feasibility === 'Low' ? 0 : (recommendedStructure.includes('Pit') ? 15000 : 25000);
  const paybackPeriod = feasibility === 'Low' ? "N/A" : (costEstimate / (annualHarvest * 20)).toFixed(1) + " years (assuming water cost of INR 20/m³)";


  return {
    monthlyHarvest,
    annualHarvest,
    litersPerPersonPerDay,
    feasibility,
    recommendedStructure,
    costEstimate,
    paybackPeriod
  };
}
