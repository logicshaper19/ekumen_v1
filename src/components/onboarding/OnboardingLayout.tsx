import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  const steps = [
    'Select Parcels',
    'Crop Rotations',
    'Register Partners',
    'Farming History',
    'Review'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-7 px-8 py-12">
          {children}
        </div>

        {/* Progress Sidebar */}
        <div className="col-span-5 bg-white border-l border-gray-200 px-8 py-12">
          <div className="max-w-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-8">Setup Progress</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                    index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                  }`}>
                    {index < currentStep ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        index === currentStep ? 'text-white' : 'text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step}
                    </p>
                    {index === currentStep && (
                      <p className="text-sm text-gray-500 mt-1">
                        {index === 0 && 'Select your farm parcels to get started'}
                        {index === 1 && 'Define your crop rotations and add financial documents'}
                        {index === 2 && 'Add your farming partners and collaborators'}
                        {index === 3 && 'Share your farming history and experience'}
                        {index === 4 && 'Review and confirm your information'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}