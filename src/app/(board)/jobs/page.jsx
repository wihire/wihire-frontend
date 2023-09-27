import Jobs from '@/components/pages/Jobs';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Jobs Board'
  },
  {
    withSuffix: true
  }
);

const JobsPage = () => <Jobs />;

export default JobsPage;
