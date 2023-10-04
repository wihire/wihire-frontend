'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import { getApplicantsJobKey } from '@/query/jobs';
import { rejectAll } from '@/repositories/jobs';

const ButtonRejectAll = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const rejectAllMutation = useMutation({
    mutationFn: () => rejectAll(params.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getApplicantsJobKey(params.slug) });
      queryClient.refetchQueries({ queryKey: getApplicantsJobKey(params.slug) });
      toast.success('Rejected all applicants successfully');
      router.replace(pathname);
      router.refresh();
    }
  });

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => rejectAllMutation.mutate()}
        isLoading={rejectAllMutation.isLoading}
        loadingText="Rejecting..."
        className="btn-error"
      >
        Reject All
      </Button>
    </div>
  );
};

export default ButtonRejectAll;
