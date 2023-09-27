'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const PLACE_METHOD_OPTIONS = [
  { label: 'Onsite', value: 'ONSITE' },
  { label: 'Remote', value: 'REMOTE' },
  { label: 'Hybrid', value: 'HYBRID' }
];

const PlaceMethodFilter = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState([]);

  const handleChangeSelected = useCallback(
    (selected) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['place-methods[]']);

      let newSearchParams = newParamsRemoved;
      if (selected.length) {
        selected.forEach((placeMethod) => {
          newSearchParams = combineSearchParams(newSearchParams, {
            'place-methods[]': placeMethod.value
          });
        });
      }

      router.push(`?${newSearchParams.toString()}`);

      setSelected(selected);
    },
    [router, searchParams]
  );

  return (
    <FormControl label="Place method" isBlock className={className}>
      <MultiSelect
        options={PLACE_METHOD_OPTIONS}
        onChange={handleChangeSelected}
        value={selected}
      />
    </FormControl>
  );
};

export default PlaceMethodFilter;
