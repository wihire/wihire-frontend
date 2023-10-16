import BackButton from '@/components/elements/BackButton';
import Text from '@/components/elements/Text';
import ResumeForm from '@/components/parts/Profile/ResumeForm';

const UserResume = ({ profileSlug }) => (
  <div>
    <BackButton
      backUrl={`/profile/${profileSlug}`}
      rightContent={
        <Text as="h1" typography="h2">
          Resume
        </Text>
      }
    />

    <ResumeForm />
  </div>
);

export default UserResume;
