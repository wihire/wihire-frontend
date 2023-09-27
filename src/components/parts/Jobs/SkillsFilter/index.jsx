'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SKILLS_OPTIONS = [
  { label: 'Communication', value: 'communication' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Problem solving', value: 'problem+solving' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Responsiblity', value: 'responsiblity' }
];

const SkillsFilter = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState([]);

  const handleChangeSelected = useCallback(
    (selected) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['skills[]']);

      let newSearchParams = newParamsRemoved;
      if (selected.length) {
        selected.forEach((skiil) => {
          newSearchParams = combineSearchParams(newSearchParams, {
            'skills[]': skiil.value
          });
        });
      }

      router.push(`?${newSearchParams.toString()}`);

      setSelected(selected);
    },
    [router, searchParams]
  );

  return (
    <FormControl label="Skills" isBlock className={className}>
      <MultiSelect
        options={SKILLS_OPTIONS}
        onChange={handleChangeSelected}
        value={selected}
        isCreatable
      />
    </FormControl>
  );
};

export default SkillsFilter;
