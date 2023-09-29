import { useCallback, useState } from 'react';

const useMultiStep = (components) => {
  const [step, setStep] = useState(components.length ? 1 : 0);

  const next = useCallback(() => {
    setStep((prev) => {
      if (prev < components.length) {
        return prev + 1;
      }
      return prev;
    });
  }, [components.length]);

  const prev = useCallback(() => {
    setStep((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  return {
    currentStep: step,
    totalStep: components.length,
    next,
    prev,
    currentStepComponent: components[step - 1],
    goTo: setStep
  };
};

export default useMultiStep;
