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
import { addUserWorkExperience } from '@/repositories/profile';

const ModalCreateWorkExperienceForm = ({ isOpen, onClose }) => {
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

  const addWorkExperienceMutation = useMutation({
    mutationFn: addUserWorkExperience,
    onSuccess: () => {
      handleClose();

      toast.success('Work experience added successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      addWorkExperienceMutation.mutate({
        payload: {
          ...data,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
          description: description || undefined
        }
      });
    },
    [addWorkExperienceMutation, description]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehaviour="outside">
      <ModalHeader>Add Work Experience</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="companyName"
            isRequired
            isBlock
            label="Enter your company name"
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
            label="Enter your title"
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

          <div className="flex flex-col md:flex-row md:gap-3">
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
              error={errors?.endDate?.message}
            >
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

          <Button
            type="submit"
            className="mt-5 w-full"
            isLoading={addWorkExperienceMutation.isLoading}
            loadingText="Adding..."
          >
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateWorkExperienceForm;
