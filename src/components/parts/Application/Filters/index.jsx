import FilterOptions from '@/components/parts/Application/Options';

// const FILTERS = [
//   {
//     title: 'On Progress',
//     url: '?status=ONPROGRESS'
//   },
//   {
//     title: 'On Review',
//     url: '?status=ONREVIEW'
//   },
//   {
//     title: 'Accepted',
//     url: '?status=APPROVED'
//   },
//   {
//     title: 'Declined',
//     url: '?status=DECLINE'
//   }
// ];

const ApplicationFilters = () => (
  <header className="my-5 flex gap-2.5">
    <FilterOptions />
    {/* {FILTERS.map((filter) => {
      <FilterOptions key={filter.title} {...filter} />;
    })} */}
  </header>
);

export default ApplicationFilters;
