'use client';

import { useState } from 'react';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';

const JOB_TYPE_OPTIONS = [
  { label: 'Fulltime', value: 'FULLTIME' },
  { label: 'Part time', value: 'PARTTIME' },
  { label: 'internship', value: 'INTERNSHIP' },
  { label: 'contract', value: 'CONTRACT' }
];

const JobTypeFilter = ({ className }) => {
  const [selected, setSelected] = useState([]);

  return (
    <FormControl label="Job type" isBlock className={className}>
      <MultiSelect options={JOB_TYPE_OPTIONS} onChange={setSelected} value={selected} />
    </FormControl>
  );
};

export default JobTypeFilter;
