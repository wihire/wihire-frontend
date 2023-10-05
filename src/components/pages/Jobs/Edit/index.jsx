import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import EditForm from '@/components/parts/Jobs/EditForm';

const EditJob = () => (
  <Container className="rounded-md bg-white p-8">
    <Text as="h1" typography="h2" className="mb-8">
      Edit job
    </Text>

    <EditForm />
  </Container>
);

export default EditJob;
