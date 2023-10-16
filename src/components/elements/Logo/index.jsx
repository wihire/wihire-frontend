import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import { default as WihireLogo } from '@/assets/vectors/logo.svg';

const Logo = ({ size, className }) => {
  const sizeClassName = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'text-[28px] md:text-[32px]';
      case 'md':
        return 'text-[36px] md:text-[40px]';
      case 'lg':
        return 'text-[56px] md:text-[60px]';
      case 'xl':
        return 'text-[76px] md:text-[80px]';
      default:
        return 'text-[36px] md:text-[40px]';
    }
  }, [size]);

  return <WihireLogo className={twMerge(sizeClassName, className)} />;
};

export default Logo;
