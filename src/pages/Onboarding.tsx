import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import ParcelSelection from '../components/onboarding/ParcelSelection';

export default function Onboarding() {
  return (
    <OnboardingLayout currentStep={0} totalSteps={5}>
      <ParcelSelection />
    </OnboardingLayout>
  );
}