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
import { addUserCertificate } from '@/repositories/profile';

const ModalCreateCertificateForm = ({ isOpen, onClose }) => {
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

  const addCertificateMutation = useMutation({
    mutationFn: addUserCertificate,
    onSuccess: () => {
      handleClose();

      toast.success('Certificate added successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      addCertificateMutation.mutate({
        payload: {
          ...data,
          issueDate: data?.issueDate ? new Date(data.issueDate).toISOString() : undefined,
          expiredDate: data?.expiredDate ? new Date(data.expiredDate).toISOString() : undefined,
          credentialUrl: data.credentialUrl || undefined
        }
      });
    },
    [addCertificateMutation]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehaviour="outside">
      <ModalHeader>Add Certificate</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="name"
            isRequired
            isBlock
            label="Enter your certificate name"
            error={errors?.name?.message}
          >
            <TextInput
              id="name"
              name="name"
              isBlock
              placeholder="Enter your certificate name"
              {...register('name', {
                required: 'Certificate name is required',
                maxLength: {
                  value: 255,
                  message: 'Certificate name must be less than 255 characters'
                }
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="organization"
            isRequired
            isBlock
            label="Enter organization name"
            error={errors?.organization?.message}
          >
            <TextInput
              id="organization"
              name="organization"
              isBlock
              placeholder="Enter organization name"
              {...register('organization', {
                required: 'Organization name is required',
                maxLength: {
                  value: 255,
                  message: 'Organization name must be less than 255 characters'
                }
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="credentialId"
            isRequired
            isBlock
            label="Enter credential ID"
            error={errors?.credentialId?.message}
          >
            <TextInput
              id="credentialId"
              name="credentialId"
              isBlock
              placeholder="Enter credential ID"
              {...register('credentialId', {
                required: 'Credential ID is required',
                maxLength: {
                  value: 255,
                  message: 'Credential ID must be less than 255 characters'
                }
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="credentialUrl"
            isBlock
            label="Enter credential URL"
            error={errors?.credentialUrl?.message}
          >
            <TextInput
              id="credentialUrl"
              name="credentialUrl"
              isBlock
              placeholder="Enter your credential URL"
              {...register('credentialUrl')}
            />
          </FormControl>

          <div className="flex gap-3">
            <FormControl
              htmlFor="issueDate"
              label="Enter issue date"
              isBlock
              error={errors?.issueDate?.message}
            >
              <TextInput
                type="date"
                isBlock
                id="issueDate"
                name="issueDate"
                placeholder="Enter issue date"
                {...register('issueDate')}
              />
            </FormControl>

            <FormControl
              htmlFor="expiredDate"
              label="Enter the expired date"
              isBlock
              error={errors?.expiredDate?.message}
            >
              <TextInput
                type="date"
                isBlock
                id="expiredDate"
                name="expiredDate"
                placeholder="Enter the expired date"
                {...register('expiredDate', {
                  validate: (value) => {
                    if (watch('issueDate')) {
                      const issueDate = new Date(watch('issueDate'));
                      const expiredDate = new Date(value);

                      if (issueDate > expiredDate) {
                        return 'Expired date must be greater than start date';
                      }

                      return true;
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
            isLoading={addCertificateMutation.isLoading}
            loadingText="Adding..."
          >
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateCertificateForm;
