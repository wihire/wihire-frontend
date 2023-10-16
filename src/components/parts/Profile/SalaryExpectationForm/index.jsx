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
import { updateUserSalaryExpectation } from '@/repositories/profile';

const SalaryExpectationForm = () => {
  const params = useParams();
  const router = useRouter();

  const { data: profileData } = useProfile(params.profileSlug);
  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    salaryExpectation: profile?.user?.salaryExpectation
  });

  const updateSalaryExpectation = useMutation({
    mutationFn: updateUserSalaryExpectation,
    onSuccess: () => {
      toast.success('Successfully updated salary expectation');

      router.push(`/profile/${profile.slug}`);
      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateSalaryExpectation.mutate({
        payload: data
      });
    },
    [updateSalaryExpectation]
  );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          htmlFor="salaryExpectation"
          label="Enter your salary expectation (IDR)"
          error={errors?.salaryExpectation?.message}
        >
          <TextInput
            type="number"
            id="salaryExpectation"
            name="salaryExpectation"
            placeholder="Enter your salary expectation"
            {...register('salaryExpectation', {
              required: 'Salary expectation is required',
              min: {
                value: 100_000,
                message: 'Salary expectation must be greater than or equal to 100.000 IDR'
              }
            })}
          />
        </FormControl>

        <Button
          type="submit"
          isLoading={updateSalaryExpectation.isLoading}
          loadingText="Saving..."
          disabled={updateSalaryExpectation.isLoading}
          className="mt-4"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default SalaryExpectationForm;
