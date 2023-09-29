'use client';

import { useMemo } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import ApplicationCard from '@/components/parts/Application/ApplicationCard';
import ErrorStatusImage from '@/components/parts/ErrorStatusImage';
import Pagination from '@/components/parts/Pagination';
import { useApplications } from '@/query/applications';

const ApplicationList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status');

  const pageUrl = useMemo(() => {
    if (currentStatus) {
      return `status=${currentStatus}&`;
    }
    return '';
  }, [currentStatus]);

  const { data } = useApplications({
    page: Number(searchParams.get('page')) || 1,
    status: currentStatus || undefined
  });

  return (
    <div>
      {data?.data?.data?.jobs?.length > 0 ? (
        <div className="my-8 flex flex-col gap-[10px]">
          {data?.data.data.jobs.map((application) => (
            <ApplicationCard
              key={application.id}
              companyPicture={application.job.company.profile.avatar}
              {...application}
            />
          ))}
          <div className="flex justify-center">
            <Pagination
              maxPage={data?.data?.pagination?.totalPage}
              currentPage={data?.data?.pagination?.currentPage}
              onFirstPage={() => router.push(`/applications?page=1${pageUrl}`)}
              onLastPage={() =>
                router.push(`/applications?${pageUrl}page=${data?.data?.pagination?.totalPage}`)
              }
              onNextPage={() =>
                router.push(`/applications?${pageUrl}page=${data?.data?.pagination?.nextPage}`)
              }
              onPrevPage={() =>
                router.push(`/applications?${pageUrl}page=${data?.data?.pagination?.prevPage}`)
              }
              onChangePage={(event) => router.push(`/applications?page=${event.target.value}`)}
              disabledNextPage={!data?.data?.pagination?.nextPage}
              disabledPrevPage={!data?.data?.pagination?.prevPage}
            />
          </div>
        </div>
      ) : (
        <ErrorStatusImage errorType="EMPTY" message="No applications found" className="mt-8" />
      )}
    </div>
  );
};

export default ApplicationList;
