import { forwardRef, useMemo } from 'react';

import AsyncCreatableSelect from 'react-select/async-creatable';
import { twMerge } from 'tailwind-merge';

import './styles.scss';

const SelectAsync = forwardRef(
  (
    {
      /**
       * options: {
       *  value: string,
       *  label: string
       *}[]
       */
      defaultOptions,
      loadOptions,
      placeholder,
      isBlock,
      className,
      ...props
    },
    ref
  ) => {
    const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
    const finalClassName = useMemo(
      () => twMerge('input input-bordered px-0', maxWidthClassName, className),
      [className, maxWidthClassName]
    );

    return (
      <AsyncCreatableSelect
        ref={ref}
        className={finalClassName}
        classNamePrefix="select"
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        placeholder={placeholder}
        cacheOptions
        {...props}
      />
    );
  }
);

SelectAsync.displayName = 'SelectAsync';

export default SelectAsync;
