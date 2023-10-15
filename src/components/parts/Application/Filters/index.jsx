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
  <header className="my-5 flex snap-x gap-2 overflow-auto">
    {FILTERS.map((filter) => (
      <FilterOption key={filter.label} className="snap-start" {...filter} />
    ))}
  </header>
);

export default ApplicationFilters;
