import FilterOption from '@/components/parts/Application/FilterOption';

const FILTERS = [
  {
    status: null,
    label: 'All'
  },
  {
    status: 'ONPROGRESS',
    label: 'On progress'
  },
  {
    status: 'ONREVIEW',
    label: 'On review'
  },
  {
    status: 'APPROVED',
    label: 'Approved'
  },
  {
    status: 'DECLINE',
    label: 'Decline'
  }
];

const ApplicationFilters = () => (
  <header className="my-5 grid grid-cols-2 md:flex gap-2.5">
    {FILTERS.map((filter) => (
      <FilterOption key={filter.label} {...filter} />
    ))}
  </header>
);

export default ApplicationFilters;
