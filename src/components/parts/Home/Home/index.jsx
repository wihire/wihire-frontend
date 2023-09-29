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
      <Text as="h1" className="mb-3 text-7xl font-bold text-primary">
        Find Your
      </Text>

      <Text
        as="h2"
        key={HIGHTLIGHT_TEXT[activeIndex]}
        className="animate-fade-in text-5xl font-bold"
      >
        {HIGHTLIGHT_TEXT[activeIndex]}
      </Text>
    </div>
  );
};

export default Header;
