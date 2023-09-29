'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import Filter from '@/components/parts/Jobs/Filter';
import ListJob from '@/components/parts/Jobs/ListJob';
import Pagination from '@/components/parts/Pagination';
import { useJobs } from '@/query/jobs';

const Jobs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useJobs({
    page: Number(searchParams.get('page')) || 1,
    'categories[]': searchParams.getAll('categories[]').length
      ? searchParams.getAll('categories[]')
      : undefined,
    title: searchParams.get('title') || undefined,
    company: searchParams.get('company') || undefined,
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
  });

  return (
    <div>
      <Text as="h1" typography="h2">
        List all jobs
      </Text>

      <Filter className="mt-5" />

      <ListJob jobs={data?.data?.data?.jobs} />

      <div className="flex justify-center">
        <Pagination
          maxPage={data?.data?.pagination?.totalPage}
          currentPage={data?.data?.pagination?.currentPage}
          onFirstPage={() => router.push('/jobs?page=1')}
          onLastPage={() => router.push(`/jobs?page=${data?.data?.pagination?.totalPage}`)}
          onNextPage={() => router.push(`/jobs?page=${data?.data?.pagination?.nextPage}`)}
          onPrevPage={() => router.push(`/jobs?page=${data?.data?.pagination?.prevPage}`)}
          onChangePage={(event) => router.push(`/jobs?page=${event.target.value}`)}
          disabledNextPage={!data?.data?.pagination?.nextPage}
          disabledPrevPage={!data?.data?.pagination?.prevPage}
        />
      </div>
    </div>
  );
};

export default Jobs;
