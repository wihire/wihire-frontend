import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

const Text = ({ as: Component = 'p', children, typography, className }) => {
  const typhographyClassName = useMemo(() => {
    switch (typography) {
      case 'h1':
        return 'text-2xl sm:text-4xl font-bold';
      case 'h2':
        return 'text-xl sm:text-2xl font-bold';
      case 'h3':
        return 'text-base sm:text-xl font-bold';
      case 'h4':
        return 'text sm:text-base font-bold';
      case 'md':
        return 'text-base sm:text-xl';
      case 'sm':
        return 'text-sm sm:text-base';
      case 'xs':
        return 'text-xs sm:text-sm';
      default:
        return 'text-sm sm:text-base';
    }
  }, [typography]);

  const fincalClassName = useMemo(
    () => twMerge(typhographyClassName, 'text-neutral', className),
    [typhographyClassName, className]
  );

  return <Component className={fincalClassName}>{children}</Component>;
};

export default Text;
