import Text from '@/components/elements/Text';
import Filter from '@/components/parts/Jobs/Filter';
import Pagination from '@/components/parts/Pagination';

const Jobs = () => (
  <div>
    <Text as="h1" typography="h2">
      List all job
    </Text>

    <Filter className="mt-5" />

    <Pagination />
  </div>
);

export default Jobs;
