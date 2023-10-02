'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import { getJobKey } from '@/query/jobs';
import { rejectAll } from '@/repositories/jobs';

const ButtonRejectAll = () => {
  const queryClient = useQueryClient();
  const params = useParams();

  const rejectAllMutation = useMutation({
    mutationFn: () => rejectAll(params.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(params.slug) });
      toast.success('Rejected all applicants successfully');
    }
  });

  return (
    <div className="flex justify-end">
      <Button onClick={() => rejectAllMutation.mutate()} className="btn-error">
        Reject All
      </Button>
    </div>
  );
};

export default ButtonRejectAll;
