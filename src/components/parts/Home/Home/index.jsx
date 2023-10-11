'use client';

import { useEffect, useState } from 'react';

import Text from '@/components/elements/Text';

const HIGHTLIGHT_TEXT = ['Dream Job', 'Next Career', 'Top Talent', 'Next Opportunity'];

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % HIGHTLIGHT_TEXT.length);
    }, 4000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  return (
    <div>
      <Text as="h1" className=" text-3xl font-bold text-primary md:mb-3 md:text-7xl">
        Find Your
      </Text>

      <Text
        as="h2"
        key={HIGHTLIGHT_TEXT[activeIndex]}
        className="animate-fade-in  text-2xl font-bold md:text-5xl"
      >
        {HIGHTLIGHT_TEXT[activeIndex]}
      </Text>
    </div>
  );
};

export default Header;
