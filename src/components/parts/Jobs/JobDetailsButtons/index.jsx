/* eslint-disable no-nested-ternary */

'use client';

import { useCallback, useMemo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import ApplicationStatusBadge from '@/components/parts/Application/ApplicationStatusBadge';
import config from '@/lib/config';
import { useApplyJobCheck } from '@/query/applications';
import { getJobKey, useJob } from '@/query/jobs';
import { saveJob, unsaveJob } from '@/repositories/jobs';

const JobDetailsButtons = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const pathname = usePathname();

  const { data: jobData } = useJob(params.slug);
  const { data: applyCheckData } = useApplyJobCheck(params.slug);

  const isApplied = useMemo(() => applyCheckData?.data?.success, [applyCheckData?.data?.success]);
  const { job } = useMemo(() => jobData.data.data, [jobData.data.data]);
  const { company } = useMemo(() => job, [job]);

  const saveMutation = useMutation({
    mutationFn: () => saveJob(params.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(params.slug) });
    }
  });

  const unsaveMutation = useMutation({
    mutationFn: () => unsaveJob(params.slug, false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(params.slug) });
    }
  });

  const share = useCallback(() => {
    const jobUrl = config.appUrl + pathname;

    if (navigator.share) {
      navigator
        .share({
          title: `${job.title} at ${company.profile.name}`,
          text: `${job.title} at ${company.profile.name}`,
          url: jobUrl
        })
        .catch(toast.error);
    } else {
      navigator.clipboard
        .writeText(jobUrl)
        .then(() => {
          toast.success('Url copied to clipboard');
        })
        .catch((err) => {
          toast.error('Failed to copy text: ', err);
        });
    }
  }, [company.profile.name, job.title, pathname]);

  return (
    <div className="mt-10 flex flex-col justify-between gap-3 md:flex-row">
      {isApplied ? (
        <div className="flex flex-col items-start gap-1">
          <Text className="font-medium text-gray-500">You already applied to this job</Text>
          <ApplicationStatusBadge status={applyCheckData.data.data.application.status} />
        </div>
      ) : job.status === 'POSTED' ? (
        <Button href={`/jobs/${params.slug}/apply`} className="w-full md:btn-wide">
          Apply
        </Button>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        {job.isSaved ? (
          <Button
            isLoading={unsaveMutation.isLoading}
            onClick={unsaveMutation.mutate}
            className="btn-outline w-full md:w-auto"
          >
            Unsave
          </Button>
        ) : (
          <Button
            isLoading={saveMutation.isLoading}
            onClick={saveMutation.mutate}
            className="w-full md:w-auto"
          >
            Save
          </Button>
        )}

        <Button className="btn-outline w-full md:w-auto" onClick={share}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsButtons;
