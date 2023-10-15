import BackButton from '@/components/elements/BackButton';
import Text from '@/components/elements/Text';
import SalaryExpectationForm from '@/components/parts/Profile/SalaryExpectationForm';

const UserSalaryExpectation = ({ profileSlug }) => (
  <div>
    <BackButton
      backUrl={`/profile/${profileSlug}`}
      rightContent={
        <Text as="h1" typography="h2">
          Salary Expectation
        </Text>
      }
    />

    <SalaryExpectationForm />
  </div>
);

export default UserSalaryExpectation;
