import React, { useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import RichTextInput from '@/components/elements/RichTextInput';
import TextInput from '@/components/elements/TextInput';
import { getFormats, getModules } from '@/lib/richText';
import { deleteUserWorkExperience, updateUserWorkExperience } from '@/repositories/profile';

const WorkExperienciesUpdateForm = ({ ...workExperience }) => {
  const router = useRouter();
  const [description, setDescription] = useState(workExperience.description ?? '');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      companyName: workExperience.companyName,
      title: workExperience.title,
      startDate: moment(workExperience.startDate).format('YYYY-MM-DD'),
      endDate: moment(workExperience.endDate).format('YYYY-MM-DD')
    }
  });

  const deleteWorkExperienceMutation = useMutation({
    mutationFn: () => deleteUserWorkExperience(workExperience.id),
    onSuccess: () => {
      toast.success('Work experience deleted successfully');

      router.refresh();
    }
  });

  const updateWorkExperienceMutation = useMutation({
    mutationFn: (data) => updateUserWorkExperience(workExperience.id, data),
    onSuccess: () => {
      toast.success('Work experience updated successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateWorkExperienceMutation.mutate({
        payload: {
          ...data,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
          description: description || undefined
        }
      });
    },
    [description, updateWorkExperienceMutation]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          htmlFor="companyName"
          isRequired
          isBlock
          label="Company name"
          error={errors?.companyName?.message}
        >
          <TextInput
            id="companyName"
            name="companyName"
            isBlock
            placeholder="Enter your company name"
            {...register('companyName', {
              required: 'Company name is required'
            })}
          />
        </FormControl>

        <FormControl
          htmlFor="title"
          isRequired
          isBlock
          label="Title"
          error={errors?.title?.message}
        >
          <TextInput
            id="title"
            name="title"
            isBlock
            placeholder="Enter your title"
            {...register('title', {
              required: 'Title is required'
            })}
          />
        </FormControl>

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

          <FormControl htmlFor="endDate" label="End date" isBlock error={errors?.endDate?.message}>
            <TextInput
              type="date"
              isBlock
              id="endDate"
              name="endDate"
              placeholder="Enter the end date"
              {...register('endDate', {
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

        <FormControl isBlock label="Description">
          <RichTextInput
            modules={getModules()}
            formats={getFormats()}
            value={description}
            onChange={setDescription}
          />
        </FormControl>

        <div className="mt-5 flex justify-end gap-3">
          <Button
            className="btn-error btn-outline"
            onClick={() => deleteWorkExperienceMutation.mutate()}
            isLoading={deleteWorkExperienceMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateWorkExperienceMutation.isLoading}
          >
            Delete
          </Button>

          <Button
            type="submit"
            className="btn-warning"
            disabled={deleteWorkExperienceMutation.isLoading}
            isLoading={updateWorkExperienceMutation.isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienciesUpdateForm;
