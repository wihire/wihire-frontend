import { twMerge } from 'tailwind-merge';

const Shimmer = ({ width, height, aspectRatio, isRounded, className }) => (
  <div
    className={twMerge(
      'w-full animate-pulse bg-gray-300',
      isRounded ? 'rounded-full' : undefined,
      className
    )}
    style={{
      maxWidth: width,
      height,
      aspectRatio
    }}
  />
);

export default Shimmer;
