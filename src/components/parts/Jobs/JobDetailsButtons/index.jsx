/* eslint-disable no-nested-ternary */

'use client';

import { useMemo } from 'react';

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

  const pathname = usePathname();

  const share = () => {
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
  };
  return (
    <div className="mt-10 flex justify-between">
      {isApplied === true ? (
        <div className="flex flex-col items-start gap-1">
          <Text className="font-medium text-gray-500">You already applied to this job</Text>
          <ApplicationStatusBadge status={applyCheckData.data.data.application.status} />
        </div>
      ) : job.status === 'POSTED' ? (
        <Button href={`/jobs/${params.slug}/apply`} className="btn-wide">
          Apply
        </Button>
      ) : null}

      <div className="flex ml-auto gap-3">
        {job.isSaved ? (
          <Button
            isLoading={unsaveMutation.isLoading}
            onClick={() => unsaveMutation.mutate()}
            className="btn-outline"
          >
            Unsave
          </Button>
        ) : (
          <Button isLoading={saveMutation.isLoading} onClick={() => saveMutation.mutate()}>
            Save
          </Button>
        )}

        <Button className="btn-outline" onClick={share}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsButtons;
