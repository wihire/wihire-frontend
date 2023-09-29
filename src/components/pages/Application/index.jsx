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

// // TODO : maybe turn the buttons to no-animation
// // TODO: fix the 'slug=' when getting all applications (in options)
// // TODO(maybe): the url for pagination (idk either)
// TODO: maybe fix the salary ternary situation
// TODO(completely optional) : make the badge a fixed size
