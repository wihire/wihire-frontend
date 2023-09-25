import { forwardRef, useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

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
      () => twMerge('select select-bordered w-full', maxWidthClassName, className),
      [className, maxWidthClassName]
    );

    return (
      <select ref={ref} className={finalClassName} {...props}>
        {placeholder ? (
          <option disabled selected>
            {placeholder}
          </option>
        ) : null}

        {options.map((option) => (
          <option key={option.value} value={options.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
