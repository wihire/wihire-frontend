import BackButton from '@/components/elements/BackButton';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import EditForm from '@/components/parts/Jobs/EditForm';

const EditJob = ({ jobSlug }) => (
  <Container className="rounded-md bg-white p-8">
    <BackButton
      backUrl={`/jobs/${jobSlug}`}
      rightContent={
        <Text as="h1" typography="h2">
          Edit Job
        </Text>
      }
      className="mb-8"
    />

    <EditForm />
  </Container>
);

export default EditJob;
