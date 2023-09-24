import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

const FormControl = ({
  children,
  htmlFor,
  label,
  labelAlt,
  error,
  description,
  descriptionAlt,
  isBlock,
  className
}) => {
  const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
  const finalClassName = useMemo(
    () => twMerge('form-control w-full', maxWidthClassName, className),
    [className, maxWidthClassName]
  );

  return (
    <div className={finalClassName}>
      {label || labelAlt ? (
        <div className="label">
          {label ? (
            <label className="label-text" htmlFor={htmlFor}>
              {label}
            </label>
          ) : null}

          {labelAlt ? <span className="label-text-alt">{labelAlt}</span> : null}
        </div>
      ) : null}

      {children}

      {description || descriptionAlt || error ? (
        <label className="label">
          {description && !error ? <span className="label-text-alt">{description}</span> : null}

          {error ? <span className="label-text-alt text-error">{error}</span> : null}

          {descriptionAlt ? <span className="label-text-alt">{descriptionAlt}</span> : null}
        </label>
      ) : null}
    </div>
  );
};

export default FormControl;
