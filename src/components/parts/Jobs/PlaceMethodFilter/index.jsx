'use client';

import { useState } from 'react';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';

const PLACE_METHOD_OPTIONS = [
  { label: 'Onsite', value: 'ONSITE' },
  { label: 'Remote', value: 'REMOTE' },
  { label: 'Hybrid', value: 'HYBRID' }
];

const PlaceMethodFilter = ({ className }) => {
  const [selected, setSelected] = useState([]);

  return (
    <FormControl label="Place method" isBlock className={className}>
      <MultiSelect options={PLACE_METHOD_OPTIONS} onChange={setSelected} value={selected} />
    </FormControl>
  );
};

export default PlaceMethodFilter;
