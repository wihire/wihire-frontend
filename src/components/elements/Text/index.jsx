import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

const Text = ({ as: Component = 'p', children, typography, className }) => {
  const typhographyClassName = useMemo(() => {
    switch (typography) {
      case 'h1':
        return 'text-2xl md:text-4xl font-bold';
      case 'h2':
        return 'text-xl md:text-2xl font-bold';
      case 'h3':
        return 'text-base md:text-xl font-bold';
      case 'h4':
        return 'text md:text-base font-bold';
      case 'md':
        return 'text-base md:text-xl';
      case 'sm':
        return 'text-sm md:text-base';
      case 'xs':
        return 'text-xs md:text-sm';
      default:
        return 'text-sm md:text-base';
    }
  }, [typography]);

  const fincalClassName = useMemo(
    () => twMerge(typhographyClassName, 'text-neutral', className),
    [typhographyClassName, className]
  );

  return <Component className={fincalClassName}>{children}</Component>;
};

export default Text;
