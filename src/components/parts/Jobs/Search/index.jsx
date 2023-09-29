'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState({
    title: searchParams.get('title') ?? '',
    company: searchParams.get('company') ?? ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'title', 'company']);

      const paramsObject = {};

      if (search.title.length) {
        paramsObject.title = search.title;
      }

      if (search.company.length) {
        paramsObject.company = search.company;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [search.company, search.title]
  );

  return (
    <>
      <TextInput
        placeholder="Search by job title"
        isBlock
        className="col-span-6"
        name="title"
        value={search.title}
        onChange={handleChange}
      />
      <TextInput
        placeholder="Search by company"
        isBlock
        className="col-span-6"
        name="company"
        value={search.company}
        onChange={handleChange}
      />
    </>
  );
};

export default Search;
