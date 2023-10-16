'use client';

import { useCallback, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import useDebounce from '@/lib/hooks/useDebounce';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const SalaryFilter = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [salary, setSalary] = useState(searchParams.get('min-salary') || '');

  const handleChange = useCallback((e) => {
    setSalary(e.target.value);
  }, []);

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'min-salary']);

      if (!salary) {
        router.push(`?${newParamsRemoved.toString()}`);
        return;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, {
        'min-salary': salary
      });

      router.push(`?${newSearchParams.toString()}`);
    },
    500,
    [salary]
  );

  return (
    <FormControl label="Salary" isBlock className={className}>
      <TextInput
        type="number"
        placeholder="Minimal salary (IDR)"
        isBlock
        value={salary}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default SalaryFilter;
