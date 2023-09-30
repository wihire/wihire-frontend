'use client';

import { useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';
import { useProvinces, useRegencies } from '@/query/location';
import { createJob } from '@/repositories/jobs';

const FormJob = () => {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('DRAFT');

  const jobTypeOptions = [
    { value: 'FULLTIME', label: 'Full Time' },
    { value: 'PARTTIME', label: 'Part Time' },
    { value: 'INTERNSHIP', label: 'Internship' },
    { value: 'CONTRACT', label: 'Contract' }
  ];

  const locationTypeOptions = [
    { value: 'ONSITE', label: 'Office' },
    { value: 'REMOTE', label: 'Remote' },
    { value: 'HYBRID', label: 'Hybrid' }
  ];

  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const { data: provincesData } = useProvinces();
  const { data: regenciesData, isFetching: isRegenciesFethcing } = useRegencies(
    watch('province')?.value,
    {
      enabled: !!watch('province')?.value
    }
  );

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

  const handleChangeProvince = (province) => {
    const provinceExist = watch('province');

    if (provinceExist?.value !== province.value) {
      setValue('province', province);
      setValue('address', null);
    }
  };

  const handleAddCategory = () => {
    const categoryInput = watch('categories');
    if (categoryInput) {
      setCategories([...categories, categoryInput]);
      setValue('categories', '');
    }
  };

  const handleAddSkill = () => {
    const skillInput = watch('skills');
    if (skillInput) {
      setSkills([...skills, skillInput]);
      setValue('skills', '');
    }
  };

  const removeCategoryItem = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const removeSkillItem = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      toast.success('Job created successfully');
    }
  });

  const onSubmit = async (data) => {
    try {
      const selectedStatus = status;

      if (categories.length === 0) {
        setError('categories', {
          type: 'manual',
          message: 'Categories are required'
        });
      }
      if (skills.length === 0) {
        setError('skills', {
          type: 'manual',
          message: 'Skills are required'
        });
      }

      const payload = {
        title: data.jobTitle,
        province: data.province.label,
        address: data.address.label,
        placeMethod: data.locationType.value,
        jobType: data.jobType.value,
        description: data.jobDescription || undefined,
        minimumQualification: data.minQualification || undefined,
        benefits: data.benefit || undefined,
        minimalSalary: +data.minSalary || undefined,
        maximalSalary: +data.maxSalary || undefined,
        categories,
        skills,
        status: selectedStatus
      };
      createJobMutation.mutate(payload);
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container className="w-full rounded-2xl  bg-white p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isBlock htmlfor="jobTitle" label="Job Title" error={errors?.jobTitle?.message}>
          <TextInput
            isBlock
            id="jobTitle"
            type="text"
            placeholder="Enter your job title"
            {...register('jobTitle', {
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
        <div className="flex space-x-8">
          <FormControl
            isBlock
            htmlFor="province"
            label="Province"
            error={errors?.province?.message}
          >
            <Controller
              control={control}
              name="province"
              rules={{
                required: 'Province is required'
              }}
              render={({ field: { value, name, ref } }) => (
                <Select
                  id="province"
                  placeholder="Select your company province"
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
          <FormControl htmlFor="address" label="City" isBlock error={errors?.address?.message}>
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'Address is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  id="address"
                  placeholder="Select your company address"
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
        <div className="flex space-x-8">
          <FormControl
            isBlock
            htmlfor="locationType"
            label="Location Type"
            error={errors?.locationType?.message}
          >
            <Controller
              control={control}
              name="locationType"
              rules={{
                required: 'Location type is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  id="locationType"
                  placeholder="Office/ Remote/ Hybrid "
                  isBlock
                  options={locationTypeOptions}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
          <FormControl isBlock htmlfor="jobType" label="Status" error={errors?.jobType?.message}>
            <Controller
              control={control}
              name="jobType"
              rules={{
                required: 'Status is required'
              }}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  ref={ref}
                  id="jobType"
                  placeholder="Full Time/ Part Time/ Internship/ Contract "
                  isBlock
                  options={jobTypeOptions}
                  isSearchable
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="flex space-x-8">
          <FormControl
            isBlock
            htmlfor="minSalary"
            label="Min Salary"
            error={errors?.minSalary?.message}
          >
            <TextInput
              isBlock
              id="minSalary"
              type="number"
              placeholder="Type here"
              {...register('minSalary', {
                min: {
                  value: 100000,
                  message: 'Minimum salary is 100.000'
                }
              })}
            />
          </FormControl>
          <FormControl
            isBlock
            htmlfor="maxSalary"
            label="Max Salary"
            error={errors?.maxSalary?.message}
          >
            <TextInput
              isBlock
              id="maxSalary"
              type="number"
              placeholder="Type here"
              {...register('maxSalary', {
                min: {
                  value: 100000,
                  message: 'Minimum salary is 100.000'
                }
              })}
            />
          </FormControl>
        </div>
        <FormControl
          isBlock
          htmlfor="jobDescription"
          label="Job Description"
          error={errors?.jobDescription?.message}
        >
          <TextInput
            isBlock
            id="jobDescription"
            type="text"
            placeholder="Type here"
            {...register('jobDescription')}
          />
        </FormControl>
        <FormControl
          isBlock
          htmlfor="minQualification"
          label="Minimum Qualification"
          error={errors?.minQualification?.message}
        >
          <TextInput
            isBlock
            id="minQualification"
            type="text"
            placeholder="Type here"
            {...register('minQualification')}
          />
        </FormControl>
        <FormControl isBlock htmlfor="benefit" label="Benefit">
          <TextInput
            isBlock
            id="benefit"
            type="text"
            placeholder="Type here"
            {...register('benefit')}
          />
        </FormControl>

        <div className="flex space-x-3">
          <FormControl isBlock htmlFor="categories" label="Categories">
            <TextInput
              isBlock
              id="categories"
              type="text"
              placeholder="Type here"
              {...register('categories')}
            />
          </FormControl>
          <Button type="button" className="mt-9 bg-blue-500 text-white" onClick={handleAddCategory}>
            Add
          </Button>
        </div>

        {categories.length > 0 && (
          <div className="mb-4">
            <ul className="flex">
              {categories.map((category, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="badge badge-success m-3 gap-2 p-3" key={index}>
                  {category}
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => removeCategoryItem(index)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {errors.categories && <p className="text-xs text-red-500">{errors.categories.message}</p>}

        <div className="flex space-x-3">
          <FormControl isBlock htmlFor="skills" label="Skills">
            <TextInput
              isBlock
              id="skills"
              type="text"
              placeholder="Type here"
              {...register('skills')}
            />
          </FormControl>
          <Button type="button" className="mt-9 bg-blue-500 text-white" onClick={handleAddSkill}>
            Add
          </Button>
        </div>

        {skills.length > 0 && (
          <div className="mb-4">
            <ul className="flex">
              {skills.map((skill, index) => (
                <li
                  className="badge badge-success m-3 gap-2 p-3"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  {skill}
                  <button className="btn btn-ghost btn-xs " onClick={() => removeSkillItem(index)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {errors.skills && <p className="text-xs text-red-500">{errors.skills.message}</p>}

        <div className="flex ">
          <FormControl htmlFor="status" className=" font-bold" label="Status:">
            <label className="label cursor-pointer text-sm font-medium">
              Draft
              <input
                type="checkbox"
                name="status"
                className="checkbox"
                value="DRAFT"
                checked={status === 'DRAFT'}
                onChange={() => setStatus('DRAFT')}
              />
            </label>
            <label className="label cursor-pointer text-sm font-normal">
              Posted
              <input
                type="checkbox"
                className="checkbox"
                name="status"
                value="POSTED"
                checked={status === 'POSTED'}
                onChange={() => setStatus('POSTED')}
              />
            </label>
          </FormControl>
        </div>

        <div className="mt-10 flex justify-end ">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
};
export default FormJob;
