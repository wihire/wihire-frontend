import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import CreateForm from '@/components/parts/Jobs/CreateForm';

const FormJob = () => (
  <Container className="rounded-md bg-white p-8">
    <Text as="h1" typography="h2" className="mb-8">
      Create new job
    </Text>

    <CreateForm />
  </Container>
);

export default FormJob;
