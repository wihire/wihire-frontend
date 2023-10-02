'use client';

import React, { forwardRef, useMemo } from 'react';

const Checkbox = forwardRef(({ className, label, checkboxPosition = 'left', ...props }, ref) => {
  const finalClassName = useMemo(() => `checkbox checkbox-primary ${className}`, [className]);

  const CheckboxElement = <input ref={ref} type="checkbox" className={finalClassName} {...props} />;

  if (label) {
    return (
      <div>
        <label className="label cursor-pointer justify-start gap-2">
          {checkboxPosition === 'left' ? CheckboxElement : null}

          <span className="label-text">{label}</span>

          {checkboxPosition === 'right' ? CheckboxElement : null}
        </label>
      </div>
    );
  }

  return CheckboxElement;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
