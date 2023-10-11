'use client';

import React, { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalHeader } from 'react-modern-modal';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { addUserEducation } from '@/repositories/profile';

const ModalCreateEducationForm = ({ isOpen, onClose }) => {
  const router = useRouter();

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

  const addEducationMutation = useMutation({
    mutationFn: addUserEducation,
    onSuccess: () => {
      handleClose();

      toast.success('Education added successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      addEducationMutation.mutate({
        payload: {
          ...data,
          grade: Number(data.grade),
          maxGrade: Number(data.maxGrade),
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString()
        }
      });
    },
    [addEducationMutation]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader>Add Education</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="name"
            isRequired
            isBlock
            label="Enter your school name"
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
            label="Enter your school field"
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
            <FormControl
              htmlFor="grade"
              label="Enter your grade"
              isBlock
              error={errors?.grade?.message}
            >
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
              label="Enter the max grade"
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

          <Button
            type="submit"
            className="mt-5 w-full"
            isLoading={addEducationMutation.isLoading}
            loadingText="Adding..."
          >
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateEducationForm;
