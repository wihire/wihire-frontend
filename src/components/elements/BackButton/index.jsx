import { twMerge } from 'tailwind-merge';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import Button from '@/components/elements/Button';

const BackButton = ({ backUrl, rightContent, className }) => {
  const backButtonContent = (
    <Button
      href={backUrl}
      className={twMerge('btn-square btn-ghost btn-sm', !rightContent ? className : null)}
    >
      <ArrowLeftIcon />
    </Button>
  );

  if (rightContent) {
    return (
      <div className={twMerge('flex items-center gap-1', className)}>
        {backButtonContent}

        {rightContent}
      </div>
    );
  }

  return backButtonContent;
};

export default BackButton;
