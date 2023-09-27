'use client';

import { useCallback, useMemo } from 'react';

import cx from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const CategoriesFilter = ({ className }) => {
  const searchParams = useSearchParams();

  const getSearchParamsFromTitle = useCallback(
    (title) => title.toLowerCase().split(' ').join('+'),
    []
  );

  const isActive = useCallback(
    (categoryTitle) => {
      const categories = searchParams.get('categories[]');

      if (categories === null && categoryTitle === 'All job') {
        return true;
      }

      return categories?.includes(categoryTitle.toLowerCase().split(' ')[0]);
    },
    [searchParams]
  );

  const CATEGORIES = useMemo(
    () => [
      {
        title: 'All job',
        backgroundColor: 'bg-gradient-to-r from-primary to-primary-focus'
      },
      {
        title: 'Computer & IT',
        backgroundColor: 'bg-gradient-to-r from-secondary to-secondary-focus'
      },
      {
        title: 'Accounting & Finance',
        backgroundColor: 'bg-gradient-to-r from-indigo-400 to-indigo-500'
      },
      {
        title: 'Administrative & Office',
        backgroundColor: 'bg-gradient-to-r from-rose-400 to-rose-500'
      },
      {
        title: 'Art & Design',
        backgroundColor: 'bg-gradient-to-r from-orange-400 to-orange-500'
      },
      {
        title: 'Education & Training',
        backgroundColor: 'bg-gradient-to-r from-green-400 to-green-500'
      },
      {
        title: 'Marketing, Advertising & PR',
        backgroundColor: 'bg-gradient-to-r from-sky-400 to-sky-500'
      },
      {
        title: 'Management',
        backgroundColor: 'bg-gradient-to-r from-violet-400 to-violet-500'
      }
    ],
    []
  );

  const getHref = useCallback(
    (title) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'categories[]']);

      if (title === 'All job') {
        return '?';
      }

      const newParams = combineSearchParams(newParamsRemoved, {
        'categories[]': getSearchParamsFromTitle(title)
      });

      return `?${newParams.toString()}`;
    },
    [getSearchParamsFromTitle, searchParams]
  );

  return (
    <div className={twMerge('grid grid-cols-8 gap-3', className)}>
      {CATEGORIES.map((category) => (
        <Link
          key={category.title}
          href={getHref(category.title)}
          className={twMerge(
            cx('p-2 rounded-md', category.backgroundColor, {
              'font-bold': isActive(category.title),
              'scale-105': isActive(category.title)
            })
          )}
        >
          <Text className="text-white">{category.title}</Text>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesFilter;
