import { twMerge } from 'tailwind-merge';

const Shimmer = ({ width = 100, height = 100, isRounded, className }) => (
  <div
    className={twMerge(
      'w-full animate-pulse bg-gray-300',
      isRounded ? 'rounded-full' : undefined,
      className
    )}
    style={{
      maxWidth: width,
      aspectRatio: `${width} / ${height}`
    }}
  />
);

export default Shimmer;
