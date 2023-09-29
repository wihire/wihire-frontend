import FilterOptions from '@/components/parts/Application/Options';

const FILTERS = [
  {
    status: null,
    url: '/applications'
  },
  {
    status: 'ONPROGRESS',
    url: '?status=ONPROGRESS'
  },
  {
    status: 'ONREVIEW',
    url: '?status=ONREVIEW'
  },
  {
    status: 'APPROVED',
    url: '?status=APPROVED'
  },
  {
    title: 'Declined',
    status: 'DECLINE',
    url: '?status=DECLINE'
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
