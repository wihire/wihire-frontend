'use client';

import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';

const SalaryFilter = ({ className }) => (
  <FormControl label="Salary" isBlock className={className}>
    <TextInput type="number" placeholder="Minimal salary" />
  </FormControl>
);

export default SalaryFilter;
