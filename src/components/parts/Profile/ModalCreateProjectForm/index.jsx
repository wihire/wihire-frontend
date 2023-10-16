'use client';

import React, { useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalHeader } from 'react-modern-modal';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import RichTextInput from '@/components/elements/RichTextInput';
import TextInput from '@/components/elements/TextInput';
import { getFormats, getModules } from '@/lib/richText';
import { addUserProject } from '@/repositories/profile';

const ModalCreateProjectForm = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const addProjectMutation = useMutation({
    mutationFn: addUserProject,
    onSuccess: () => {
      handleClose();

      toast.success('Project added successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      addProjectMutation.mutate({
        payload: {
          ...data,
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString(),
          description: description || undefined,
          url: data.url || undefined
        }
      });
    },
    [addProjectMutation, description]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehaviour="outside">
      <ModalHeader>Add Project</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="name"
            isRequired
            isBlock
            label="Enter your project name"
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

          <FormControl htmlFor="role" isBlock label="Enter your role" error={errors?.role?.message}>
            <TextInput
              id="role"
              name="role"
              isBlock
              placeholder="Enter your role"
              {...register('role')}
            />
          </FormControl>

          <FormControl htmlFor="url" isBlock label="Enter project URL" error={errors?.url?.message}>
            <TextInput
              id="url"
              name="url"
              isBlock
              placeholder="Enter project URL"
              {...register('url')}
            />
          </FormControl>

          <div className="flex gap-3">
            <FormControl
              htmlFor="startDate"
              label="Enter your start date"
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
              label="Enter the end date"
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
              modules={getModules()}
              formats={getFormats()}
              value={description}
              onChange={setDescription}
            />
          </FormControl>

          <Button
            type="submit"
            className="mt-5 w-full"
            isLoading={addProjectMutation.isLoading}
            loadingText="Adding..."
          >
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateProjectForm;
