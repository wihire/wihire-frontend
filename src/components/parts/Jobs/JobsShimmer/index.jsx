/* eslint-disable react/no-array-index-key */
import { twMerge } from 'tailwind-merge';

import Shimmer from '@/components/elements/Shimmer';

const JobsShimmer = ({ className }) => (
  <div className={twMerge('flex flex-col gap-3', className)}>
    {new Array(2).fill(0).map((_, index) => (
      <Shimmer key={index} width="100%" aspectRatio="5" className="rounded-md" />
    ))}
  </div>
);

export default JobsShimmer;
