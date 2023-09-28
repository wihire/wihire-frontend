import Text from '@/components/elements/Text';
import ApplicationList from '@/components/parts/Application/ApplicationList';
import ApplicationFilters from '@/components/parts/Application/Filters';

const Application = () => (
  <>
    <Text as="h2" typography="h2">
      Applications
    </Text>

    <ApplicationFilters />

    <ApplicationList />
  </>
);

export default Application;
