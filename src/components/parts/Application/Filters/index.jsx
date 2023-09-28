import FilterOptions from '@/components/parts/Application/Options';

const FILTERS = [
  {
    title: 'All',
    url: ''
  },
  {
    title: 'On Progress',
    url: 'ONPROGRESS'
  },
  {
    title: 'On Review',
    url: 'ONREVIEW'
  },
  {
    title: 'Approved',
    url: 'APPROVED'
  },
  {
    title: 'Declined',
    url: 'DECLINE'
  }
];

const ApplicationFilters = () => (
  <header className="my-5 flex gap-2.5">
    {FILTERS.map((filter) => (
      <FilterOptions key={filter.title} {...filter} />
    ))}
  </header>
);

export default ApplicationFilters;
