import React from 'react';

import { twMerge } from 'tailwind-merge';

const Container = ({ children, as: Component = 'div', className }) => (
  <Component className={twMerge('container mx-auto px-4', className)}>{children}</Component>
);

export default Container;
