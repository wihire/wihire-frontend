'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SearchJobTitle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(searchParams.get('title') ?? '');

  const handleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'title']);

      const paramsObject = {};

      if (title.length) {
        paramsObject.title = title;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [title]
  );

  return (
    <TextInput
      placeholder="Search by job title"
      isBlock
      className="w-full"
      name="title"
      value={title}
      onChange={handleChange}
    />
  );
};

export default SearchJobTitle;
