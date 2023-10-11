import React, { useCallback, useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import RichTextInput from '@/components/elements/RichTextInput';
import TextInput from '@/components/elements/TextInput';
import { deleteUserProject, updateUserProject } from '@/repositories/profile';

const ProjectUpdateForm = ({ ...project }) => {
  const router = useRouter();
  const [description, setDescription] = useState(project.description ?? '');

  const richTextModules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    }),
    []
  );

  const richFormats = useMemo(
    () => ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet'],
    []
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: project.name,
      role: project.role,
      url: project.url,
      startDate: moment(project.startDate).format('YYYY-MM-DD'),
      endDate: moment(project.endDate).format('YYYY-MM-DD')
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => deleteUserProject(project.id),
    onSuccess: () => {
      toast.success('Project deleted successfully');

      router.refresh();
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: (data) => updateUserProject(project.id, data),
    onSuccess: () => {
      toast.success('Project updated successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateProjectMutation.mutate({
        payload: {
          ...data,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
          description: description || undefined,
          url: data.url || undefined
        }
      });
    },
    [description, updateProjectMutation]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          htmlFor="name"
          isRequired
          isBlock
          label="Project name"
          error={errors?.name?.message}
        >
          <TextInput
            id="name"
            name="name"
            isBlock
            placeholder="Enter your project name"
            {...register('name', {
              required: 'Project name is required'
            })}
          />
        </FormControl>

        <FormControl htmlFor="url" isBlock label="Role" error={errors?.role?.message}>
          <TextInput
            id="role"
            name="role"
            isBlock
            placeholder="Enter your role"
            {...register('role')}
          />
        </FormControl>

        <FormControl htmlFor="url" isBlock label="Project url" error={errors?.url?.message}>
          <TextInput
            id="url"
            name="url"
            isBlock
            placeholder="Enter project url"
            {...register('url')}
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

          <FormControl
            htmlFor="endDate"
            label="End date"
            isBlock
            isRequired
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

        <FormControl isBlock label="Description">
          <RichTextInput
            modules={richTextModules}
            formats={richFormats}
            value={description}
            onChange={setDescription}
          />
        </FormControl>

        <div className="mt-5 flex justify-end gap-3">
          <Button
            className="btn-error btn-outline"
            onClick={() => deleteProjectMutation.mutate()}
            isLoading={deleteProjectMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateProjectMutation.isLoading}
          >
            Delete
          </Button>

          <Button
            type="submit"
            className="btn-warning"
            disabled={deleteProjectMutation.isLoading}
            isLoading={updateProjectMutation.isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectUpdateForm;
