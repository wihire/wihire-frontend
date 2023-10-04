'use client';

import { useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams, useRouter, useParams, usePathname } from 'next/navigation';

import ApplicantsCard from '@/components/parts/Jobs/ApplicantsCard';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useApplicantsJob } from '@/query/jobs';

const ErrorStatusImage = dynamic(() => import('@/components/parts/ErrorStatusImage'));
const Pagination = dynamic(() => import('@/components/parts/Pagination'));

const ApplicantsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { slug } = useParams();

  const { data } = useApplicantsJob(slug, {
    page: Number(searchParams.get('page')) || 1,
    status: searchParams.get('status') || undefined
  });

  const handleChangePage = useCallback(
    (page) => {
      const newRemovedSearchParams = removeSearchParams(searchParams, ['page']);
      const newSearchParams = combineSearchParams(newRemovedSearchParams, { page });

      router.push(`${pathname}?${newSearchParams}`);
    },
    [router, searchParams, pathname]
  );

  return (
    <div>
      {data?.data?.data?.applicants.length > 0 ? (
        <>
          <div className="my-8 flex flex-col gap-[10px]">
            {data?.data.data.applicants.map((applicant) => (
              <ApplicantsCard key={applicant.user.id} {...applicant} />
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
        <ErrorStatusImage errorType="EMPTY" message="No applicants found" className="mt-8" />
      )}
    </div>
  );
};

export default ApplicantsList;
