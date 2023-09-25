import { useMemo } from 'react';

import { default as WihireLogo } from '@/assets/vectors/logo.svg';

const Logo = ({ size }) => {
  const sizeClassName = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'text-[32px]';
      case 'md':
        return 'text-[40px]';
      case 'lg':
        return 'text-[60px]';
      case 'xl':
        return 'text-[80px]';
      default:
        return 'text-[40px]';
    }
  }, [size]);

  return <WihireLogo className={sizeClassName} />;
};

export default Logo;
