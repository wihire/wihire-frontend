import { twMerge } from 'tailwind-merge';

const LOADER_SIZE_CLASSNAME = {
  small: 'loading-md',
  medium: 'loading-lg',
  large: 'w-[3rem]',
  xLarge: 'w-[6rem]'
};

const Loader = ({ size, className }) => (
  <span
    className={twMerge('loading loading-ring text-primary', LOADER_SIZE_CLASSNAME[size], className)}
  />
);

export default Loader;
