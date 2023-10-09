import { useMemo } from 'react';

import { default as WihireLogoText } from '@/assets/vectors/logo-text.svg';

const LogoText = ({ size }) => {
  const sizeClassName = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'text-[40px]';
      case 'md':
        return 'text-[60px]';
      case 'lg':
        return 'text-[80px]';
      case 'xl':
        return 'text-[100px]';
      default:
        return 'text-[60px]';
    }
  }, [size]);

  return <WihireLogoText className={sizeClassName} />;
};

export default LogoText;
