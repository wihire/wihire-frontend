import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import Button from '@/components/elements/Button';
import JobCard from '@/components/parts/Jobs/JobCard';
import { getJobKey } from '@/query/jobs';
import { saveJob, unsaveJob } from '@/repositories/jobs';

const BookmarkOutlineIcon = dynamic(() => import('@/assets/icons/bookmark_outline.svg'));
const BookmarkSolidIcon = dynamic(() => import('@/assets/icons/bookmark_solid.svg'));

const SaveJobCard = ({ ...props }) => {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => saveJob(props.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(props.slug) });
    }
  });

  const unsaveMutation = useMutation({
    mutationFn: () => unsaveJob(props.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(props.slug) });
    }
  });

  return (
    <JobCard
      renderRightContent={
        props.isSaved ? (
          <Button
            className="btn-square btn-ghost text-primary"
            title="Unsave this job"
            onClick={() => unsaveMutation.mutate()}
            isLoading={unsaveMutation.isLoading}
          >
            <BookmarkSolidIcon />
          </Button>
        ) : (
          <Button
            className="btn-square btn-ghost"
            title="Save this job"
            onClick={() => saveMutation.mutate()}
            isLoading={saveMutation.isLoading}
          >
            <BookmarkOutlineIcon />
          </Button>
        )
      }
      {...props}
    />
  );
};

export default SaveJobCard;
