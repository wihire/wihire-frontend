import Text from '@/components/elements/Text';
import SalaryExpectationForm from '@/components/parts/Profile/SalaryExpectationForm';

const UserSalaryExpectation = () => (
  <div>
    <Text as="h1" typography="h2">
      Salary Expectation
    </Text>

    <SalaryExpectationForm />
  </div>
);

export default UserSalaryExpectation;
