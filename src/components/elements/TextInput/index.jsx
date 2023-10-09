import { forwardRef, useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

const TextInput = forwardRef(
  ({ type = 'text', placeholder, className, isBlock, ...props }, ref) => {
    const Component = useMemo(() => (type === 'textarea' ? 'textarea' : 'input'), [type]);
    const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
    const inputBasicClassName = `${type === 'textarea' ? 'textarea' : 'input'} input-bordered`;
    const fileInputClassName = 'file-input file-input-bordered file-input-primary';
    const finalClassName = useMemo(
      () =>
        twMerge(
          'w-full',
          type === 'file' ? fileInputClassName : inputBasicClassName,
          maxWidthClassName,
          className
        ),
      [className, maxWidthClassName, type, inputBasicClassName]
    );

    return (
      <Component
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
