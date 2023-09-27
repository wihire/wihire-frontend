import CategoriesFilter from '@/components/parts/Jobs/CategoriesFilter';
import JobTypeFilter from '@/components/parts/Jobs/JobTypeFilter';
import PlaceMethodFilter from '@/components/parts/Jobs/PlaceMethodFilter';
import SalaryFilter from '@/components/parts/Jobs/SalaryFilter';
import Search from '@/components/parts/Jobs/Search';
import SkillsFilter from '@/components/parts/Jobs/SkillsFilter';

const Filter = ({ className }) => (
  <div className={className}>
    <div className="grid grid-cols-12 gap-3">
      <CategoriesFilter className="col-span-12" />

      <Search />

      <JobTypeFilter className="col-span-3" />
      <PlaceMethodFilter className="col-span-3" />
      <SkillsFilter className="col-span-3" />
      <SalaryFilter className="col-span-3" />
    </div>
  </div>
);

export default Filter;
