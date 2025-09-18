'use client';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const steps = ["Define Area", "Provide Details", "View Results", "Connect"];

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      {steps.map((name, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={name} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "bg-[#9b87f5] text-white shadow-[0_0_10px_rgba(155,135,245,0.7)]"
                  : isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}>
              {isCompleted ? '✓' : stepNumber}
            </div>
            <span className={`ml-2 text-sm ${isActive ? 'text-white' : 'text-gray-400'}`}>
              {name}
            </span>
            {stepNumber < totalSteps && (
                <div className={`h-0.5 w-12 ml-4 rounded-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-700' 
                }`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
