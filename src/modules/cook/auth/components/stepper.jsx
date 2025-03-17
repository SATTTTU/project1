import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep, steps = ['Citizenship', 'Certificates', 'Terms'] }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {steps.map((stepLabel, index) => {
          const step = index + 1;
          return (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold mb-2
                ${step < currentStep ? 'bg-green-600' : step === currentStep ? 'bg-green-700' : 'bg-gray-300'}`}
                style={{ backgroundColor: step < currentStep ? '#426B1F' : step === currentStep ? '#426B1F' : '' }}
              >
                {step < currentStep ? <Check className="h-5 w-5" /> : step}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {stepLabel}
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 w-full bg-gray-200"></div>
        <div 
          className="absolute top-0 h-1 bg-green-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, backgroundColor: '#426B1F' }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;