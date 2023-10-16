import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

import SearchJobAddress from '@/components/parts/Jobs/SearchJobAddress';
import SearchJobTitle from '@/components/parts/Jobs/SearchJobTitle';
import { ROLE } from '@/lib/constants/common';

const CategoriesFilter = dynamic(() => import('@/components/parts/Jobs/CategoriesFilter'));
const SearchJobCompany = dynamic(() => import('@/components/parts/Jobs/SearchJobCompany'));
const StatusFilter = dynamic(() => import('@/components/parts/Jobs/StatusFilter'));
const JobTypeFilter = dynamic(() => import('@/components/parts/Jobs/JobTypeFilter'));
const PlaceMethodFilter = dynamic(() => import('@/components/parts/Jobs/PlaceMethodFilter'));
const SalaryFilter = dynamic(() => import('@/components/parts/Jobs/SalaryFilter'));
const SkillsFilter = dynamic(() => import('@/components/parts/Jobs/SkillsFilter'));
const FilterModal = dynamic(() => import('@/components/parts/Jobs/Filter/FilterModal'));

const Filter = ({ className, role }) => (
  <header className={twMerge('grid grid-cols-12 gap-3', className)}>
    {role === ROLE.USER ? (
      <CategoriesFilter className="col-span-12" />
    ) : (
      <StatusFilter className="col-span-12" />
    )}

    <div className="col-span-12 grid gap-3 md:flex">
      <SearchJobTitle />

      <SearchJobAddress />

      {role === ROLE.USER ? <SearchJobCompany /> : null}

      <FilterModal />
    </div>

    <JobTypeFilter className="col-span-3 hidden md:block" />
    <PlaceMethodFilter className="col-span-3 hidden md:block" />
    <SkillsFilter className="col-span-3 hidden md:block" />
    <SalaryFilter className="col-span-3 hidden md:block" />
  </header>
);

export default Filter;
