'use client';

import { useCallback, useMemo } from 'react';

import cx from 'classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useMostCategories } from '@/query/category';

const CategoriesFilter = ({ className }) => {
  const searchParams = useSearchParams();

  const { data } = useMostCategories();
  const mostPopularCategories = data?.data?.data?.categories;

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
        title: mostPopularCategories[0].title,
        backgroundColor: 'bg-gradient-to-r from-secondary to-secondary-focus'
      },
      {
        title: mostPopularCategories[1].title,
        backgroundColor: 'bg-gradient-to-r from-indigo-400 to-indigo-500'
      },
      {
        title: mostPopularCategories[2].title,
        backgroundColor: 'bg-gradient-to-r from-rose-400 to-rose-500'
      },
      {
        title: mostPopularCategories[3].title,
        backgroundColor: 'bg-gradient-to-r from-orange-400 to-orange-500'
      },
      {
        title: mostPopularCategories[4].title,
        backgroundColor: 'bg-gradient-to-r from-green-400 to-green-500'
      },
      {
        title: mostPopularCategories[5].title,
        backgroundColor: 'bg-gradient-to-r from-sky-400 to-sky-500'
      },
      {
        title: mostPopularCategories[6].title,
        backgroundColor: 'bg-gradient-to-r from-violet-400 to-violet-500'
      }
    ],
    [mostPopularCategories]
  );

  const getHref = useCallback(
    (title) => {
      const newParamsRemoved = removeSearchParams(searchParams, ['page', 'categories[]']);

      if (title === 'All job') {
        return `?${newParamsRemoved.toString()}`;
      }

      const newParams = combineSearchParams(newParamsRemoved, {
        'categories[]': getSearchParamsFromTitle(title)
      });

      return `?${newParams.toString()}`;
    },
    [getSearchParamsFromTitle, searchParams]
  );

  return (
    <div
      className={twMerge(
        'flex overflow-auto lg:overflow-visible snap-x lg:grid gap-3 lg:grid-cols-8',
        className
      )}
    >
      {CATEGORIES.map((category) => (
        <Link
          key={category.title}
          href={getHref(category.title)}
          className={twMerge(
            cx(
              'p-2 min-h-[80px] min-w-[120px] lg:min-w-full rounded-md hover:scale-105 snap-start',
              category.backgroundColor,
              {
                'font-bold lg:scale-105': isActive(category.title)
              }
            )
          )}
        >
          <Text className="text-white">{category.title}</Text>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesFilter;
