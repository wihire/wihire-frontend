'use client';

import { useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import ListJob from '@/components/parts/Jobs/ListJob';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useJobs } from '@/query/jobs';

const ErrorStatusImage = dynamic(() => import('@/components/parts/ErrorStatusImage'));
const Pagination = dynamic(() => import('@/components/parts/Pagination'));

const SavedJobs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useJobs({
    page: Number(searchParams.get('page')) || 1,
    'is-saved': true
  });

  const handleChangePage = useCallback(
    (page) => {
      const newRemovedSearchParams = removeSearchParams(searchParams, ['page']);
      const newSearchParams = combineSearchParams(newRemovedSearchParams, { page });

      router.push(`/jobs?${newSearchParams}`);
    },
    [router, searchParams]
  );

  return (
    <div>
      <Text as="h1" typography="h2">
        Saved jobs
      </Text>

      {data?.data?.data?.jobs?.length > 0 ? (
        <>
          <ListJob jobs={data?.data?.data?.jobs} />

          <div className="flex justify-center">
            <Pagination
              maxPage={data?.data?.pagination?.totalPage}
              currentPage={data?.data?.pagination?.currentPage}
              onFirstPage={() => handleChangePage(1)}
              onLastPage={() => handleChangePage(data?.data?.pagination?.totalPage)}
              onNextPage={() => handleChangePage(data?.data?.pagination?.nextPage)}
              onPrevPage={() => handleChangePage(data?.data?.pagination?.prevPage)}
              onChangePage={(event) => handleChangePage(event.target.value)}
              disabledNextPage={!data?.data?.pagination?.nextPage}
              disabledPrevPage={!data?.data?.pagination?.prevPage}
            />
          </div>
        </>
      ) : (
        <ErrorStatusImage
          errorType="EMPTY"
          message="No saved job has been found"
          className="mt-8"
        />
      )}
    </div>
  );
};

export default SavedJobs;
