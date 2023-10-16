import BackButton from '@/components/elements/BackButton';
import Text from '@/components/elements/Text';
import ApplicantsList from '@/components/parts/Jobs/ApplicantsList';

const Applicants = ({ jobSlug }) => (
  <div>
    <BackButton
      backUrl={`/jobs/${jobSlug}`}
      rightContent={
        <Text as="h1" typography="h2">
          Applicants
        </Text>
      }
    />

    <ApplicantsList />
  </div>
);

export default Applicants;
