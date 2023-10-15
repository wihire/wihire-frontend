'use client';

import { useState } from 'react';

import { default as NextImage } from 'next/image';

import Shimmer from '@/components/elements/Shimmer';

const Image = ({ src, shimmerClassName, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <Shimmer
          width={props.width}
          aspectRatio={`${props.width}/${props.height}`}
          className={shimmerClassName}
        />
      ) : null}

      <NextImage
        src={src}
        onLoadingComplete={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        {...props}
      />
    </>
  );
};

export default Image;
