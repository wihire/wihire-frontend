import React, { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';
import { SKILL_LEVEL_OPTIONS } from '@/lib/constants/selectOptions';
import { deleteUserSkill, updateUserSkill } from '@/repositories/profile';

const SkillUpdateForm = ({ ...skill }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      skill: skill.skill.title,
      level: SKILL_LEVEL_OPTIONS.find((option) => option.value === skill.level)
    }
  });

  const deleteSkillMutation = useMutation({
    mutationFn: () => deleteUserSkill(skill.id),
    onSuccess: () => {
      toast.success('Skill deleted successfully');

      router.refresh();
    }
  });

  const updateSkillMutation = useMutation({
    mutationFn: (data) => updateUserSkill(skill.id, data),
    onSuccess: () => {
      toast.success('Skill updated successfully');

      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      updateSkillMutation.mutate({
        payload: {
          ...data,
          level: data.level.value
        }
      });
    },
    [updateSkillMutation]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          htmlFor="skill"
          isRequired
          isBlock
          label="Skill name"
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

        <div className="mt-5 flex justify-end gap-3">
          <Button
            className="btn-error btn-outline"
            onClick={() => deleteSkillMutation.mutate()}
            isLoading={deleteSkillMutation.isLoading}
            loadingText="Deleting..."
            disabled={updateSkillMutation.isLoading}
          >
            Delete
          </Button>

          <Button
            type="submit"
            className="btn-warning"
            disabled={deleteSkillMutation.isLoading}
            isLoading={updateSkillMutation.isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillUpdateForm;
