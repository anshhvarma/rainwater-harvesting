export type SoilType = "Sandy" | "Clay" | "Loamy" | "Rocky";

export interface AR_Input {
  availableArea: number; // in m²
  soilType: SoilType;
  groundwaterDepth: number; // in meters
}

export interface AR_Output {
  feasibility: "Low" | "Medium" | "High";
  recommendedStructure: string;
  structureDimensions: string;
  notes: string;
}

const infiltrationRates: Record<SoilType, number> = {
    "Sandy": 2.0, // m/day
    "Loamy": 1.0,
    "Clay": 0.1,
    "Rocky": 0.05
}

export function calculateAR(input: AR_Input): AR_Output {
  const { availableArea, soilType, groundwaterDepth } = input;

  const infiltrationRate = infiltrationRates[soilType];

  let feasibility: "Low" | "Medium" | "High";
  let notes = "";

  if (infiltrationRate < 0.5 || groundwaterDepth < 3) {
    feasibility = "Low";
    notes = "Low soil infiltration rate or shallow groundwater depth makes recharge risky. Consider a storage tank instead.";
  } else if (infiltrationRate < 1.5 && availableArea < 10) {
    feasibility = "Medium";
    notes = "Moderate feasibility. A smaller recharge structure may be possible.";
  } else {
    feasibility = "High";
    notes = "Conditions are favorable for artificial recharge.";
  }

  let recommendedStructure = "Recharge Pit";
  let structureDimensions = "2m diameter, 2m depth";

  if (feasibility === 'Low') {
      recommendedStructure = "Not Recommended";
      structureDimensions = "N/A";
  }

  return {
    feasibility,
    recommendedStructure,
    structureDimensions,
    notes
  };
}
