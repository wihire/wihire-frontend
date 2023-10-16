'use client';

import React, { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalHeader } from 'react-modern-modal';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';
import { SKILL_LEVEL_OPTIONS } from '@/lib/constants/selectOptions';
import { addUserSkill } from '@/repositories/profile';

import './styles.scss';

const ModalCreateSkillForm = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm();

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const addSkillMutation = useMutation({
    mutationFn: addUserSkill,
    onSuccess: () => {
      handleClose();

      toast.success('Skill added successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      addSkillMutation.mutate({
        payload: {
          ...data,
          level: data.level.value
        }
      });
    },
    [addSkillMutation]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehaviour="outside">
      <ModalHeader>Add Skill</ModalHeader>

      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="skill"
            isRequired
            isBlock
            label="Enter your skill name"
            error={errors?.name?.message}
          >
            <TextInput
              id="skill"
              name="skill"
              isBlock
              placeholder="Enter your skill name"
              {...register('skill', {
                required: 'Skill name is required'
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="level"
            isRequired
            label="Skill level"
            isBlock
            error={errors?.level?.message}
          >
            <Controller
              control={control}
              name="level"
              rules={{
                required: 'Skill level is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  id="level"
                  placeholder="Select your skill level"
                  isBlock
                  options={SKILL_LEVEL_OPTIONS}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                  ref={ref}
                />
              )}
            />
          </FormControl>

          <Button
            type="submit"
            className="mt-5 w-full"
            isLoading={addSkillMutation.isLoading}
            loadingText="Adding..."
          >
            Add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalCreateSkillForm;
