'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const JOB_TYPE_OPTIONS = [
  { label: 'Fulltime', value: 'FULLTIME' },
  { label: 'Part time', value: 'PARTTIME' },
  { label: 'Internship', value: 'INTERNSHIP' },
  { label: 'Contract', value: 'CONTRACT' }
];

const JobTypeFilter = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState([]);

  const handleChangeSelected = useCallback((selected) => {
    const newParamsRemoved = removeSearchParams(searchParams, ['job-types[]']);

    let newSearchParams = newParamsRemoved;
    if (selected.length) {
      selected.forEach((jobType) => {
        newSearchParams = combineSearchParams(newSearchParams, {
          'job-types[]': jobType.value
        });
      });
    }

    router.push(`?${newSearchParams.toString()}`);
    
    setSelected(selected);
  }, [router, searchParams]);

  return (
    <FormControl label="Job type" isBlock className={className}>
      <MultiSelect options={JOB_TYPE_OPTIONS} onChange={handleChangeSelected} value={selected} />
    </FormControl>
  );
};

export default JobTypeFilter;
