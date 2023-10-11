'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import FormControl from '@/components/elements/FormControl';
import RichTextInput from '@/components/elements/RichTextInput';
import Select from '@/components/elements/Select';
import SelectAsync from '@/components/elements/SelectAsyncCreateable';
import TextInput from '@/components/elements/TextInput';
import { JOB_TYPE_OPTIONS, PLACE_METHOD_OPTIONS } from '@/lib/constants/selectOptions';
import { useCategories } from '@/query/category';
import { useProvinces, useRegencies } from '@/query/location';
import { useSkills } from '@/query/skill';
import { getCategories } from '@/repositories/category';
import { createJob } from '@/repositories/jobs';
import { getSkills } from '@/repositories/skill';

const CreateForm = () => {
  const [description, setDescription] = useState('');
  const [minimumQualification, setMinimumQualification] = useState('');
  const [benefits, setBenefits] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

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
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      isDraft: false
    }
  });

  const { data: provincesData } = useProvinces();
  const { data: regenciesData, isFetching: isRegenciesFethcing } = useRegencies(
    watch('province')?.value,
    {
      enabled: !!watch('province')?.value
    }
  );

  const { data: categoriesData } = useCategories();
  const { data: skillsData } = useSkills();

  const provincesOptions = useMemo(() => {
    if (!provincesData) {
      return [];
    }
    return provincesData.data.map((province) => ({
      value: province.id,
      label: province.name
    }));
  }, [provincesData]);

  const regenciesOptions = useMemo(() => {
    if (!regenciesData) {
      return [];
    }

    return regenciesData.data.map((regency) => ({
      value: regency.id,
      label: regency.name
    }));
  }, [regenciesData]);

  const categoriesOptions = useMemo(() => {
    if (!categoriesData) {
      return [];
    }

    return categoriesData.data.data.categories.map((category) => ({
      value: category.id,
      label: category.title
    }));
  }, [categoriesData]);

  const skillsOptions = useMemo(() => {
    if (!skillsData) {
      return [];
    }

    return skillsData.data.data.skills.map((skill) => ({
      value: skill.id,
      label: skill.title
    }));
  }, [skillsData]);

  const handleChangeProvince = (province) => {
    setError('province', null);

    const provinceExist = watch('province');

    if (provinceExist?.value !== province.value) {
      setValue('province', province);
      setValue('address', null);
    }
  };

  const loadCategoriesOptions = debounce((inputValue, callback) => {
    getCategories({
      title: inputValue
    })
      .then(({ data }) => {
        const dataOptions = data.data.categories.map((category) => ({
          value: category.id,
          label: category.title
        }));
        callback(dataOptions);
      })
      .catch(() => {
        callback([]);
      });
  }, 500);

  const loadSkillsOptions = debounce((inputValue, callback) => {
    getSkills({
      title: inputValue
    })
      .then(({ data }) => {
        const dataOptions = data.data.skills.map((skill) => ({
          value: skill.id,
          label: skill.title
        }));
        callback(dataOptions);
      })
      .catch(() => {
        callback([]);
      });
  }, 500);

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully');

      queryClient.invalidateQueries(['jobs']);

      const isDraft = watch('isDraft');

      if (isDraft) {
        router.replace('/jobs/drafts');
        return;
      }

      router.replace('/jobs');
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      province: data.province.label,
      address: data.address.label,
      placeMethod: data.placeMethod.value,
      jobType: data.jobType.value,
      description: description || undefined,
      minimumQualification: minimumQualification || undefined,
      benefits: benefits || undefined,
      minimalSalary: +data.minimalSalary || undefined,
      maximalSalary: +data.maximalSalary || undefined,
      categories: data.categories.map((category) => category.label),
      skills: data.skills.map((skill) => skill.label),
      status: data.isDraft ? 'DRAFT' : 'POSTED'
    };

    createJobMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <FormControl
          isBlock
          isRequired
          htmlFor="title"
          label="Job Title"
          error={errors?.title?.message}
        >
          <TextInput
            isBlock
            id="title"
            type="text"
            placeholder="Enter your job title"
            {...register('title', {
              required: 'Job title is required',
              minLength: {
                value: 4,
                message: 'Minimum length of job title is 4 characters'
              },
              maxLength: {
                value: 255,
                message: 'Maximum length of job title is 255 characters'
              }
            })}
          />
        </FormControl>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormControl isBlock isRequired label="Province" error={errors?.province?.message}>
            <Controller
              control={control}
              name="province"
              rules={{
                required: 'Province is required'
              }}
              render={({ field: { value, name, ref } }) => (
                <Select
                  placeholder="Select job placement province"
                  isBlock
                  options={provincesOptions}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={handleChangeProvince}
                  ref={ref}
                />
              )}
            />
          </FormControl>

          <FormControl label="Address" isRequired isBlock error={errors?.address?.message}>
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'Address is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  placeholder="Select job placement address"
                  isBlock
                  options={regenciesOptions}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                  isDisabled={isRegenciesFethcing || !watch('province')?.value}
                  isLoading={isRegenciesFethcing}
                />
              )}
            />
          </FormControl>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormControl isBlock isRequired label="Place method" error={errors?.placeMethod?.message}>
            <Controller
              control={control}
              name="placeMethod"
              rules={{
                required: 'Place method is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  placeholder="Select job place method"
                  isBlock
                  options={PLACE_METHOD_OPTIONS}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>

          <FormControl isBlock isRequired label="Job type" error={errors?.jobType?.message}>
            <Controller
              control={control}
              name="jobType"
              rules={{
                required: 'Job type is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  placeholder="Select job type"
                  isBlock
                  options={JOB_TYPE_OPTIONS}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormControl
            isBlock
            htmlFor="minimalSalary"
            label="Minimal salary"
            error={errors?.minimalSalary?.message}
          >
            <TextInput
              isBlock
              id="minimalSalary"
              type="number"
              placeholder="Enter job minimal salary"
              {...register('minimalSalary', {
                min: {
                  value: 100_000,
                  message: 'Minimum salary is 100.000'
                }
              })}
            />
          </FormControl>

          <FormControl
            isBlock
            htmlFor="maximalSalary"
            label="Maximal Salary"
            error={errors?.maximalSalary?.message}
          >
            <TextInput
              isBlock
              id="maximalSalary"
              type="number"
              placeholder="Type here"
              {...register('maximalSalary', {
                min: {
                  value: 100000,
                  message: 'Minimum salary is 100.000'
                },
                validate: (value) => {
                  if (+value < +watch('minimalSalary')) {
                    return 'Maximal salary must be greater than minimal salary';
                  }
                  return true;
                }
              })}
              disabled={!watch('minimalSalary')}
            />
          </FormControl>
        </div>

        <FormControl isBlock label="Job Description">
          <RichTextInput
            modules={richTextModules}
            formats={richFormats}
            value={description}
            onChange={setDescription}
          />
        </FormControl>

        <FormControl isBlock label="Minimum qualification">
          <RichTextInput
            modules={richTextModules}
            formats={richFormats}
            value={minimumQualification}
            onChange={setMinimumQualification}
          />
        </FormControl>

        <FormControl isBlock label="Benefit">
          <RichTextInput
            modules={richTextModules}
            formats={richFormats}
            value={benefits}
            onChange={setBenefits}
          />
        </FormControl>

        <FormControl isBlock isRequired label="Categories" error={errors?.categories?.message}>
          <Controller
            control={control}
            name="categories"
            rules={{
              required: 'Categories is required'
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <SelectAsync
                ref={ref}
                placeholder="Select job categories"
                isBlock
                isMulti
                defaultOptions={categoriesOptions}
                loadOptions={loadCategoriesOptions}
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormControl>

        <FormControl isBlock isRequired label="Skills" error={errors?.skills?.message}>
          <Controller
            control={control}
            name="skills"
            rules={{
              required: 'Skills is required'
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <SelectAsync
                ref={ref}
                placeholder="Select job skills"
                isBlock
                isMulti
                defaultOptions={skillsOptions}
                loadOptions={loadSkillsOptions}
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormControl>

        <Checkbox label="Save as a draft" {...register('isDraft')} />
      </div>

      <div className="mt-10 flex justify-end ">
        <Button type="submit" isLoading={createJobMutation.isLoading} loadingText="Submiting...">
          Submit
        </Button>
      </div>
    </form>
  );
};
export default CreateForm;
