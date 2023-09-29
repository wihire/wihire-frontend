import { forwardRef, useMemo } from 'react';

import { default as ReactSelect } from 'react-select';
import { twMerge } from 'tailwind-merge';

import './styles.scss';

const Select = forwardRef(
  (
    {
      /**
       * options: {
       *  value: string,
       *  label: string
       *}[]
       */
      options,
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
      <ReactSelect
        ref={ref}
        className={finalClassName}
        classNamePrefix="select"
        options={options}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Select.displayName = 'Select';

export default Select;
