'use client';

import { useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';

import ApplicationCard from '@/components/parts/Application/ApplicationCard';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useApplications } from '@/query/applications';

const ErrorStatusImage = dynamic(() => import('@/components/parts/ErrorStatusImage'));
const Pagination = dynamic(() => import('@/components/parts/Pagination'));

const ApplicationList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useApplications({
    page: Number(searchParams.get('page')) || 1,
    status: searchParams.get('status') || undefined
  });

  const handleChangePage = useCallback(
    (page) => {
      const newRemovedSearchParams = removeSearchParams(searchParams, ['page']);
      const newSearchParams = combineSearchParams(newRemovedSearchParams, { page });

      router.push(`/applications?${newSearchParams}`);
    },
    [router, searchParams]
  );

  return (
    <div>
      {data?.data?.data?.jobs?.length > 0 ? (
        <>
          <div className="my-8 flex flex-col gap-[10px]">
            {data?.data.data.jobs.map((application) => (
              <ApplicationCard key={application.id} {...application} />
            ))}
          </div>

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
        <ErrorStatusImage errorType="EMPTY" message="No applications found" className="mt-8" />
      )}
    </div>
  );
};

export default ApplicationList;
