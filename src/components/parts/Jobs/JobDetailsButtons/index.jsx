'use client';

import { useMemo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import config from '@/lib/config';
import { getJobKey, useJob } from '@/query/jobs';
import { saveJob, unsaveJob } from '@/repositories/jobs';

const JobDetailsButtons = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = useMemo(() => data.data.data, [data.data.data]);
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
      <Button href={`/jobs/${params.slug}/apply`} className="btn-wide">
        Apply
      </Button>

      <div className="flex gap-3">
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
