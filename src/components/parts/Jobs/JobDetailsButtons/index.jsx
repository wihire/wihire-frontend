'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import config from '@/lib/config';
import { getQueryClient } from '@/lib/queryClient';
import { useJob } from '@/query/jobs';
import { saveJob, unsaveJob } from '@/repositories/jobs';

const JobDetailsButtons = () => {
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = data.data.data;

  const [isSavedJob, setIsSavedJob] = useState(job.isSaved);

  const saveMutation = useMutation({
    mutationFn: () => saveJob(params.slug),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsSavedJob(true);
    }
  });

  const unsaveMutation = useMutation({
    mutationFn: () => unsaveJob(params.slug, false),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsSavedJob(false);
    }
  });

  const pathname = usePathname();

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        })
        .then(() => {
          toast.success('Thanks for sharing!');
        })
        .catch(toast.error);
    } else {
      navigator.clipboard
        .writeText(config.appUrl + pathname)
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
      <div>
        <Button className="px-10">Apply</Button>
      </div>

      <div className="flex justify-end gap-3">
        {isSavedJob ? (
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

        <Button className=" btn-outline px-8" onClick={share}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsButtons;
