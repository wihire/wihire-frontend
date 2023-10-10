import React, { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { deleteUserCertificate, updateUserCertificate } from '@/repositories/profile';

const CertificateUpdateForm = ({ ...certificate }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: certificate.name,
      organization: certificate.organization,
      credentialId: certificate.credentialId,
      credentialUrl: certificate.credentialUrl,
      issueDate: moment(certificate.issueDate).format('YYYY-MM-DD'),
      expiredDate: moment(certificate.expiredDate).format('YYYY-MM-DD')
    }
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: () => deleteUserCertificate(certificate.id),
    onSuccess: () => {
      toast.success('Certificate deleted successfully');

      router.refresh();
    }
  });

  const updateCertificateMutation = useMutation({
    mutationFn: (data) => updateUserCertificate(certificate.id, data),
    onSuccess: () => {
      toast.success('Certificate updated successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateCertificateMutation.mutate({
        payload: {
          ...data,
          issueDate: data?.issueDate ? new Date(data.issueDate).toISOString() : undefined,
          expiredDate: data?.expiredDate ? new Date(data.expiredDate).toISOString() : undefined,
          credentialUrl: data.credentialUrl || undefined
        }
      });
    },
    [updateCertificateMutation]
  );

  return (
    <div>
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

        <div className="mt-5 flex justify-end gap-3">
          <Button
            className="btn-error btn-outline"
            onClick={() => deleteCertificateMutation.mutate()}
            isLoading={deleteCertificateMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateCertificateMutation.isLoading}
          >
            Delete
          </Button>

          <Button
            type="submit"
            className="btn-warning"
            disabled={deleteCertificateMutation.isLoading}
            isLoading={updateCertificateMutation.isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CertificateUpdateForm;
