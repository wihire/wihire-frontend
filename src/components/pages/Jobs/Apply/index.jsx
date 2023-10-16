/* eslint-disable react/no-array-index-key */

'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import cx from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import CheckProfile from '@/components/parts/Apply/CheckProfile';
import Resume from '@/components/parts/Apply/Resume';
import useMultiStep from '@/lib/hooks/useMultiStep';
import { useProfile } from '@/query/profile';
import { applyJob } from '@/repositories/jobs';

const STEPS = ['Review your profile', 'Resume'];

const Apply = ({ profileSlug }) => {
  const params = useParams();
  const router = useRouter();

  const { data: profileData } = useProfile(profileSlug);
  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      useExistingResume: false
    }
  });

  const formOptions = {
    register,
    watch
  };

  const { totalStep, currentStep, currentStepComponent, next, prev } = useMultiStep([
    <CheckProfile key="check-profile-step" profile={profile} />,
    <Resume key="resume-step" profile={profile} {...formOptions} />
  ]);

  const applyMutation = useMutation({
    mutationFn: applyJob,
    onSuccess: () => {
      toast.success('You have successfully applied for this job');

      router.push(`/applications`);
    }
  });

  const onSubmit = useCallback(
    (data) => {
      if (currentStep !== totalStep) {
        next();
        return;
      }

      if (!data.useExistingResume && !data.resume) {
        toast.error('Please upload your resume');

        return;
      }

      const formData = new FormData();

      if (data.useExistingResume) {
        formData.append('resumeUrl', profile?.user?.resume);
      } else {
        formData.append('resume', data.resume[0]);
      }

      applyMutation.mutate({
        slug: params.slug,
        payload: formData
      });
    },
    [applyMutation, currentStep, next, params.slug, profile?.user?.resume, totalStep]
  );

  return (
    <div>
      <div className="flex justify-center">
        <ul className="steps">
          {new Array(totalStep).fill(0).map((_, index) => (
            <li
              key={index}
              className={cx('step', {
                'step-primary': index <= currentStep - 1
              })}
            >
              {STEPS[index]}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-8">{currentStepComponent}</div>

        <div className="flex justify-end gap-5">
          {currentStep > 1 ? (
            <Button onClick={prev} className="btn-outline" disabled={applyMutation.isLoading}>
              Previous
            </Button>
          ) : null}

          <Button type="submit" isLoading={applyMutation.isLoading} loadingText="Applying...">
            {currentStep === totalStep ? 'Apply' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Apply;
