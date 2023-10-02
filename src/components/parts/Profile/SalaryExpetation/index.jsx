import Text from '@/components/elements/Text';
import { toCurrency } from '@/lib/common';

const SalaryExpectation = ({ value }) => (
  <div className="text-gray-500">
    <Text className="mr-2 inline-block font-medium">Salary Expectation: </Text>
    <Text className="inline-block">{toCurrency(value, true)} IDR</Text>
  </div>
);

export default SalaryExpectation;
