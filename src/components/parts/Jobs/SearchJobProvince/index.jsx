'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SearchJobProvince = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [province, setProvince] = useState(searchParams.get('province') ?? '');

  const handleChange = useCallback((e) => {
    setProvince(e.target.value);
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'province']);

      const paramsObject = {};

      if (province.length) {
        paramsObject.province = province;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [province]
  );

  return (
    <TextInput
      placeholder="Search by province"
      isBlock
      className="w-full"
      name="province"
      value={province}
      onChange={handleChange}
    />
  );
};

export default SearchJobProvince;