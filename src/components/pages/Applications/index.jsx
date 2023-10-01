import Text from '@/components/elements/Text';
import ApplicationList from '@/components/parts/Application/ApplicationList';
import ApplicationsFilters from '@/components/parts/Application/Filters';

const Applications = () => (
  <>
    <Text as="h1" typography="h2">
      Applications
    </Text>

    <ApplicationsFilters />

    <ApplicationList />
  </>
);

export default Applications;
