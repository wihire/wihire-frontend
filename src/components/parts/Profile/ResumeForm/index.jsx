'use client';

import React, { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { useProfile } from '@/query/profile';
import { updateResume } from '@/repositories/profile';

const ResumeForm = () => {
  const params = useParams();
  const router = useRouter();

  const { data: profileData } = useProfile(params.profileSlug);
  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const removeResumeMutation = useMutation({
    mutationFn: updateResume,
    onSuccess: () => {
      toast.success('Resume deleted successfully');

      router.refresh();
    }
  });

  const handleDeleteResume = useCallback(() => {
    const payload = new FormData();

    payload.append('deleteResume', true);

    removeResumeMutation.mutate({ payload });
  }, [removeResumeMutation]);

  const updateResumeMutation = useMutation({
    mutationFn: updateResume,
    onSuccess: () => {
      toast.success('Resume uploaded successfully');

      router.push(`/profile/${profile.slug}`);
      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      const payload = new FormData();

      if (data.resume) {
        payload.append('resume', data.resume[0]);
      }

      updateResumeMutation.mutate({ payload });
    },
    [updateResumeMutation]
  );

  return (
    <div className="mt-5">
      {profile?.user.resume ? (
        <div className="mb-4 flex flex-col items-start gap-1">
          <a
            href={profile?.user?.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-outline btn-xs"
          >
            View resume
          </a>

          <Button
            onClick={handleDeleteResume}
            isLoading={removeResumeMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateResumeMutation.isLoading}
            className="btn-sm"
          >
            Delete Resume
          </Button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl htmlFor="resume" label="Upload resume" error={errors?.resume?.message}>
          <TextInput
            type="file"
            id="resume"
            name="resume"
            accept="application/pdf"
            {...register('resume')}
          />
        </FormControl>

        <Button
          type="submit"
          isLoading={updateResumeMutation.isLoading}
          loadingText="Uploading..."
          disabled={updateResumeMutation.isLoading}
          className="mt-4"
        >
          Save Resume
        </Button>
      </form>
    </div>
  );
};

export default ResumeForm;
