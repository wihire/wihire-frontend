'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import { rejectAll } from '@/repositories/jobs';

const ButtonRejectAll = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const rejectAllMutation = useMutation({
    mutationFn: () => rejectAll(params.slug),
    onSuccess: () => {
      toast.success('Rejected all applicants successfully');
      router.replace(pathname);
      router.refresh();
    }
  });

  return (
    <Button
      onClick={() => rejectAllMutation.mutate()}
      isLoading={rejectAllMutation.isLoading}
      loadingText="Rejecting..."
      className="btn-error"
    >
      Reject All
    </Button>
  );
};

export default ButtonRejectAll;
