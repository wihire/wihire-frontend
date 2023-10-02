'use client';

import { useCallback, useMemo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-modern-modal';

import Button from '@/components/elements/Button';
import { getJobKey, useJob } from '@/query/jobs';
import { deleteJob } from '@/repositories/jobs';

const ModalDeleteConfiration = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = useMemo(() => data.data.data, [data.data.data]);

  const deleteMutation = useMutation({
    mutationFn: () => deleteJob(params.slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: getJobKey(params.slug) });

      router.replace('/jobs');
      onClose();
    }
  });

  const handleDelete = useCallback(() => {
    deleteMutation.mutate();
  }, [deleteMutation]);

  const handleClose = useCallback(() => {
    if (deleteMutation.isLoading) return;

    onClose();
  }, [deleteMutation, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalHeader>Delete Confirmation</ModalHeader>
      <ModalBody>Are you sure delete {job.title} ?</ModalBody>
      <ModalFooter>
        <Button className="btn-outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="btn-error"
          isLoading={deleteMutation.isLoading}
          loadingText="Deleting..."
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteConfiration;
