'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SearchJobAddress = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [address, setAddress] = useState(searchParams.get('address') ?? '');

  const handleChange = useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'address']);

      const paramsObject = {};

      if (address.length) {
        paramsObject.address = address;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [address]
  );

  return (
    <TextInput
      placeholder="Search by address"
      isBlock
      className="w-full"
      name="address"
      value={address}
      onChange={handleChange}
    />
  );
};

export default SearchJobAddress;
