'use client';

import { useState } from 'react';

import FormControl from '@/components/elements/FormControl';
import MultiSelect from '@/components/elements/MultiSelect';

const SKILLS_OPTIONS = [
  { label: 'Communication', value: 'communication' },
  { label: 'Collaboration', value: 'collaboration' },
  { label: 'Problem solving', value: 'problem+solving' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Responsiblity', value: 'responsiblity' }
];

const SkillsFilter = ({ className }) => {
  const [selected, setSelected] = useState([]);

  return (
    <FormControl label="Skills" isBlock className={className}>
      <MultiSelect options={SKILLS_OPTIONS} onChange={setSelected} value={selected} isCreatable />
    </FormControl>
  );
};

export default SkillsFilter;
