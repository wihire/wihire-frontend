'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import BasicInformation from '@/components/parts/Profile/BasicInformation';
import CertificateList from '@/components/parts/Profile/CertificateList';
import ListEducation from '@/components/parts/Profile/EducationList';
import ProjectList from '@/components/parts/Profile/ProjectList';
import WorkExperienceList from '@/components/parts/Profile/WorkExperienceList';
import { useApplicantDetail } from '@/query/applicantDetail';
import { updateApplicantStatus } from '@/repositories/applicantDetail';

const ApplicantDetail = () => {
  const router = useRouter();
  const { slug, userSlug } = useParams();

  const { data } = useApplicantDetail(slug, userSlug);

  const applicant = useMemo(() => data?.data?.data?.applicant, [data]);
  // const { profile } = data?.data?.data?.applicant;

  const updateStatusMutation = useMutation({
    mutationFn: updateApplicantStatus,
    onSuccess: () => {
      toast.success('status updated');
      router.refresh();
    }
  });

  const changeStatus = useCallback(
    (status) => {
      // console.log(updateStatus,'?>>>>>>>>>>>>>>>');
      updateStatusMutation.mutate({ jobSlug: slug, userSlug, status });
    },
    [updateStatusMutation, slug, userSlug]
  );

  return (
    <>
      <div className="mb-6 flex justify-end gap-6">
        {applicant?.status === 'DECLINE' ? (
          <Button onClick={() => changeStatus('DECLINE')}>Decline</Button>
        ) : (
          <Button className="btn-outline" onClick={() => changeStatus('DECLINE')}>
            Decline
          </Button>
        )}
        {applicant?.status === 'APPROVED' ? (
          <Button onClick={() => changeStatus('APPROVED')}>Accept</Button>
        ) : (
          <Button className="btn-outline" onClick={() => changeStatus('APPROVED')}>
            Accept
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <BasicInformation profile={applicant.profile} />

        {applicant?.profile?.user?.workExperiencies?.length > 0 && (
          <WorkExperienceList workExperiencies={applicant?.profile?.user?.workExperiencies} />
        )}

        {applicant?.profile?.user?.educations.length > 0 && (
          <ListEducation educations={applicant?.profile?.user?.educations} />
        )}

        {applicant?.profile.user.certificates.length > 0 && (
          <CertificateList certificates={applicant?.profile?.user?.certificates} />
        )}

        {applicant?.profile?.user?.projects?.length > 0 && (
          <ProjectList projects={applicant?.profile?.user?.projects} />
        )}
      </div>
    </>
  );
};

export default ApplicantDetail;
