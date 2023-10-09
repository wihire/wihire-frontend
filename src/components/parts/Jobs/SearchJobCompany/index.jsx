'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SearchJobCompany = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [company, setCompany] = useState(searchParams.get('company') ?? '');

  const handleChange = useCallback((e) => {
    setCompany(e.target.value);
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'company']);

      const paramsObject = {};

      if (company.length) {
        paramsObject.company = company;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [company]
  );

  return (
    <TextInput
      placeholder="Search by company"
      isBlock
      className="w-full"
      name="company"
      value={company}
      onChange={handleChange}
    />
  );
};

export default SearchJobCompany;
