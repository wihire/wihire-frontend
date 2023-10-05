'use client';

import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import Filter from '@/components/parts/Jobs/Filter';
import ListJob from '@/components/parts/Jobs/ListJob';
import { ROLE } from '@/lib/constants/common';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useJobs } from '@/query/jobs';

const ErrorStatusImage = dynamic(() => import('@/components/parts/ErrorStatusImage'));
const Pagination = dynamic(() => import('@/components/parts/Pagination'));

const Jobs = ({ profile }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = useMemo(
    () => ({
      page: Number(searchParams.get('page')) || 1,

      title: searchParams.get('title') || undefined,
      'job-types[]': searchParams.getAll('job-types[]').length
        ? searchParams.getAll('job-types[]')
        : undefined,
      'place-methods[]': searchParams.getAll('place-methods[]').length
        ? searchParams.getAll('place-methods[]')
        : undefined,
      'skills[]': searchParams.getAll('skills[]').length
        ? searchParams.getAll('skills[]')
        : undefined,
      'min-salary': searchParams.get('min-salary') || undefined
    }),
    [searchParams]
  );

  let filter;

  if (profile?.role === ROLE.COMPANY) {
    filter = {
      slug: profile.slug,
      status: searchParams.get('status') || 'POSTED',
      ...defaultFilter
    };
  } else {
    filter = {
      'categories[]': searchParams.getAll('categories[]').length
        ? searchParams.getAll('categories[]')
        : undefined,
      company: searchParams.get('company') || undefined,
      status: 'POSTED',
      ...defaultFilter
    };
  }

  const { data } = useJobs(filter);

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
        List all jobs
      </Text>

      <Filter className="mt-5" role={profile?.role} />

      {data?.data?.data?.jobs?.length > 0 ? (
        <>
          <ListJob
            jobs={data?.data?.data?.jobs}
            cardType={profile?.role === ROLE.USER ? 'save' : undefined}
            className="mt-8"
          />

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
        <ErrorStatusImage errorType="EMPTY" message="No job has been found" className="mt-8" />
      )}
    </div>
  );
};

export default Jobs;
