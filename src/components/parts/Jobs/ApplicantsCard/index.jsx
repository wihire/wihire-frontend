'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import LocationIcon from '@/assets/icons/location-icon.svg';
import EmailIcon from '@/assets/icons/mail_solid.svg';
import PhoneIcon from '@/assets/icons/phone_solid.svg';
import Button from '@/components/elements/Button';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import ApplicationStatusBadge from '@/components/parts/Application/ApplicationStatusBadge';
import { toCurrency, capitalEachWord } from '@/lib/common';
import config from '@/lib/config';
import { updateApplicantStatus } from '@/repositories/jobs';

const ApplicantsCard = ({ ...props }) => {
  const router = useRouter();
  const { slug } = useParams();

  const userSlug = useMemo(() => props.user.profile.slug, [props.user.profile.slug]);

  const updateStatusMutation = useMutation({
    mutationFn: updateApplicantStatus,
    onSuccess: () => {
      toast.success('Successfully updated applicant status');
      router.refresh();
    }
  });

  const changeStatus = useCallback(
    (status) => {
      updateStatusMutation.mutate({ slug, userSlug, status });
    },
    [updateStatusMutation, slug, userSlug]
  );

  return (
    <div
      className="flex flex-col gap-3 rounded-lg bg-white
      px-4 py-5 md:flex-row md:gap-5"
    >
      <Image
        src={props.user.profile.avatar ?? config.defaultAvatar}
        width={80}
        height={80}
        alt="Avatar profile"
        className="h-10 w-10 object-cover sm:h-16 sm:w-16 md:h-20 md:w-20"
      />

      <div className="flex w-full flex-col justify-between gap-3 md:flex-row">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Text typography="h3">{props.user.profile.name}</Text>
              <ApplicationStatusBadge status={props.status} withMobileVer />
            </div>

            {props.user.salaryExpectation ? (
              <Text className="mt-1 text-sm">
                Salary expectation {toCurrency(props.user.salaryExpectation, true)} IDR
              </Text>
            ) : null}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <LocationIcon className="text-gray-500" />
              <Text className="text-gray-500">
                {capitalEachWord(props.user.profile.address)},{' '}
                {capitalEachWord(props.user.profile.province)}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              <PhoneIcon className="text-gray-500" />
              <Text className="text-gray-500">{props.user.phoneNumber}</Text>
            </div>

            <div className="flex items-center gap-2">
              <EmailIcon className="text-gray-500" />
              <Text className="text-gray-500">{props.user.profile.email}</Text>
            </div>
          </div>

          <a
            href={props.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-outline btn-xs mt-2 self-start"
          >
            View resume
          </a>
        </div>

        <div className="mt-2 flex justify-end gap-3 md:mt-0 md:flex-col md:justify-start">
          <a
            href={`/jobs/${slug}/applicants/${userSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => (props.status === 'ONPROGRESS' ? changeStatus('ONREVIEW') : null)}
          >
            <Button>View Profile</Button>
          </a>

          {props.status !== 'DECLINE' ? (
            <Button
              onClick={() => changeStatus('DECLINE')}
              className="btn-error btn-outline"
              isLoading={updateStatusMutation.isLoading}
              loadingText="Declining"
            >
              Decline
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsCard;
