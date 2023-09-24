import { forwardRef, useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

const TextInput = forwardRef(
  ({ type = 'text', placeholder, className, isBlock, ...props }, ref) => {
    const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
    const inputBasicClassName = 'input input-bordered';
    const fileInputClassName = 'file-input file-input-bordered file-input-primary';
    const finalClassName = useMemo(
      () =>
        twMerge(
          'w-full',
          type === 'file' ? fileInputClassName : inputBasicClassName,
          maxWidthClassName,
          className
        ),
      [className, maxWidthClassName, type]
    );

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={finalClassName}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
