'use client';

import { MultiSelect as MultiSelectReact } from 'react-multi-select-component';
import { twMerge } from 'tailwind-merge';

import './styles.scss';

const MultiSelect = ({ options, value, onChange, labelledBy = 'Select', className, ...props }) => (
  <MultiSelectReact
    options={options}
    value={value}
    onChange={onChange}
    labelledBy={labelledBy}
    debounceDuration={500}
    className={twMerge('input input-bordered px-0', className)}
    {...props}
  />
);

export default MultiSelect;
