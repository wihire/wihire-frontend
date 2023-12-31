'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import BackButton from '@/components/elements/BackButton';
import Button from '@/components/elements/Button';
import ApplicationStatusBadge from '@/components/parts/Application/ApplicationStatusBadge';
import ProfileUser from '@/components/parts/Profile';
import { useApplicantDetail } from '@/query/applicant';
import { updateApplicantStatus } from '@/repositories/applicantDetail';

const ApplicantDetail = () => {
  const router = useRouter();
  const { slug, userSlug } = useParams();

  const { data } = useApplicantDetail(slug, userSlug);

  const applicant = useMemo(() => data?.data?.data?.applicant, [data]);

  const updateStatusMutation = useMutation({
    mutationFn: updateApplicantStatus,
    onSuccess: () => {
      toast.success('Successfully updated applicant status');
      router.refresh();
    }
  });

  const changeStatus = useCallback(
    (status) => {
      updateStatusMutation.mutate({ jobSlug: slug, userSlug, status });
    },
    [updateStatusMutation, slug, userSlug]
  );

  return (
    <>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <BackButton
          backUrl={`/jobs/${slug}/applicants`}
          rightContent={<ApplicationStatusBadge status={applicant.status} />}
        />

        <div>
          {applicant?.status !== 'DECLINE' ? (
            <Button
              onClick={() => changeStatus('DECLINE')}
              className="btn-error btn-outline"
              isLoading={updateStatusMutation.isLoading}
            >
              Decline
            </Button>
          ) : null}

          {applicant?.status !== 'APPROVED' ? (
            <Button
              onClick={() => changeStatus('APPROVED')}
              isLoading={updateStatusMutation.isLoading}
              className="ml-3"
            >
              Approve
            </Button>
          ) : null}
        </div>
      </header>

      <ProfileUser profile={applicant?.profile} customResume={applicant?.resume} />
    </>
  );
};

export default ApplicantDetail;
