import ArrowLeft from '@/assets/icons/arrow-left.svg';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';

const StepModalForm = ({ currentStep, totalStep, previous }) => (
  <div className="flex items-center">
    {currentStep > 1 ? (
      <Button className="btn-ghost btn-sm font-normal normal-case" onClick={previous}>
        <ArrowLeft />
        Previous
      </Button>
    ) : null}

    <Text typography="xs" className="flex-1 text-end">
      Step {currentStep}/{totalStep}
    </Text>
  </div>
);

export default StepModalForm;
