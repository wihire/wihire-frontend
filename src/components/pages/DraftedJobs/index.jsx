'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import ErrorStatusImage from '@/components/parts/ErrorStatusImage';
import ListJob from '@/components/parts/Jobs/ListJob';
import Pagination from '@/components/parts/Pagination';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useJobs } from '@/query/jobs';

const DraftedJobs = ({ companySlug }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useJobs({
    page: Number(searchParams.get('page')) || 1,
    slug: companySlug,
    status: 'DRAFT'
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
    <>
      <Text as="h1" typography="h2">
        Drafted Jobs
      </Text>
      {!data?.data?.data?.jobs[0] ? (
        <ErrorStatusImage
          errorType="EMPTY"
          message="You don't have any drafted jobs yet."
          className="mt-8"
        />
      ) : (
        <>
          <ListJob jobs={data?.data?.data?.jobs} className="mt-8" />

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
      )}
    </>
  );
};

export default DraftedJobs;
