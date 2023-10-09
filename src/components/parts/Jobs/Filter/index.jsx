import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

import JobTypeFilter from '@/components/parts/Jobs/JobTypeFilter';
import PlaceMethodFilter from '@/components/parts/Jobs/PlaceMethodFilter';
import SalaryFilter from '@/components/parts/Jobs/SalaryFilter';
import SearchJobTitle from '@/components/parts/Jobs/SearchJobTitle';
import SkillsFilter from '@/components/parts/Jobs/SkillsFilter';
import { ROLE } from '@/lib/constants/common';

const CategoriesFilter = dynamic(() => import('@/components/parts/Jobs/CategoriesFilter'));
const SearchJobCompany = dynamic(() => import('@/components/parts/Jobs/SearchJobCompany'));
const StatusFilter = dynamic(() => import('@/components/parts/Jobs/StatusFilter'));

const Filter = ({ className, role }) => (
  <header className={twMerge('grid grid-cols-12 gap-3', className)}>
    {role === ROLE.USER ? (
      <CategoriesFilter className="col-span-12" />
    ) : (
      <StatusFilter className="col-span-12" />
    )}

    <div className="col-span-12 flex gap-3">
      <SearchJobTitle />

      {role === ROLE.USER ? <SearchJobCompany /> : null}
    </div>

    <JobTypeFilter className="col-span-3" />
    <PlaceMethodFilter className="col-span-3" />
    <SkillsFilter className="col-span-3" />
    <SalaryFilter className="col-span-3" />
  </header>
);

export default Filter;
