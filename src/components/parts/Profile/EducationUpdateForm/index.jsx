import React, { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { deleteUserEducation, updateUserEducation } from '@/repositories/profile';

const EducationUpdateForm = ({ ...education }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: education.name,
      field: education.field,
      grade: education.grade ? education.grade.toString() : '',
      maxGrade: education.maxGrade ? education.maxGrade.toString() : '',
      startDate: moment(education.startDate).format('YYYY-MM-DD'),
      endDate: moment(education.endDate).format('YYYY-MM-DD')
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUserEducation(education.id),
    onSuccess: () => {
      toast.success('Education deleted successfully');

      router.refresh();
    }
  });

  const updateEducationMutation = useMutation({
    mutationFn: (data) => updateUserEducation(education.id, data),
    onSuccess: () => {
      toast.success('Education updated successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateEducationMutation.mutate({
        payload: {
          ...data,
          grade: Number(data.grade),
          maxGrade: Number(data.maxGrade),
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString()
        }
      });
    },
    [updateEducationMutation]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          htmlFor="name"
          isRequired
          isBlock
          label="School name"
          error={errors?.name?.message}
        >
          <TextInput
            id="name"
            name="name"
            isBlock
            placeholder="Enter your school name"
            {...register('name', {
              required: 'School name is required',
              maxLength: {
                value: 255,
                message: 'School name must be less than or equal to 255 characters'
              }
            })}
          />
        </FormControl>

        <FormControl
          htmlFor="field"
          isRequired
          isBlock
          label="School field"
          error={errors?.field?.message}
        >
          <TextInput
            id="field"
            name="field"
            isBlock
            placeholder="Enter your school field"
            {...register('field', {
              required: 'School field is required',
              maxLength: {
                value: 255,
                message: 'School field must be less than or equal to 255 characters'
              }
            })}
          />
        </FormControl>

        <div className="flex gap-3">
          <FormControl htmlFor="grade" label="Grade" isBlock error={errors?.grade?.message}>
            <TextInput
              type="number"
              step="any"
              id="grade"
              isBlock
              name="grade"
              placeholder="Enter your grade"
              {...register('grade')}
            />
          </FormControl>

          <FormControl
            htmlFor="maxGrade"
            label="Max grade"
            isBlock
            error={errors?.maxGrade?.message}
          >
            <TextInput
              type="number"
              step="any"
              isBlock
              id="maxGrade"
              name="maxGrade"
              placeholder="Enter the max grade"
              {...register('maxGrade')}
            />
          </FormControl>
        </div>

        <div className="flex gap-3">
          <FormControl
            htmlFor="startDate"
            label="Start date"
            isRequired
            isBlock
            error={errors?.startDate?.message}
          >
            <TextInput
              type="date"
              isBlock
              id="startDate"
              name="startDate"
              placeholder="Enter your start date"
              {...register('startDate', {
                required: 'Start date is required'
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="endDate"
            label="End date"
            isRequired
            isBlock
            error={errors?.endDate?.message}
          >
            <TextInput
              type="date"
              isBlock
              id="endDate"
              name="endDate"
              placeholder="Enter the end date"
              {...register('endDate', {
                required: 'End date is required',
                validate: (value) => {
                  const startDate = new Date(watch('startDate'));
                  const endDate = new Date(value);

                  if (startDate > endDate) {
                    return 'End date must be greater than start date';
                  }

                  return true;
                }
              })}
            />
          </FormControl>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button
            className="btn-error btn-outline"
            onClick={() => deleteMutation.mutate()}
            isLoading={deleteMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateEducationMutation.isLoading}
          >
            Delete
          </Button>

          <Button
            type="submit"
            className="btn-warning"
            disabled={deleteMutation.isLoading}
            isLoading={updateEducationMutation.isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationUpdateForm;
