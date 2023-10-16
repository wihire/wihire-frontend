'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';

import BackButton from '@/components/elements/BackButton';
import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import SelectAsync from '@/components/elements/SelectAsyncCreateable';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX } from '@/lib/constants/regex';
import { useCompanyScopes } from '@/query/companyScope';
import { useProvinces, useRegencies } from '@/query/location';
import { useProfile } from '@/query/profile';
import { useTotalEmployees } from '@/query/totalEmployee';
import { getCompanyScopes } from '@/repositories/companyScope';
import { updateBasicProfileCompany } from '@/repositories/profile';

const EditBasicForm = () => {
  const router = useRouter();
  const params = useParams();
  const { update } = useSession();

  const { data: profileData } = useProfile(params.profileSlug);
  const { profile } = useMemo(() => profileData?.data?.data, [profileData]);

  const { data: provincesData, isFetching: isProvinceFetching } = useProvinces();
  const { data: companyScopeData } = useCompanyScopes();
  const { data: totalEmployeeData } = useTotalEmployees();

  const provincesOptions = useMemo(() => {
    if (!provincesData) {
      return [];
    }

    return provincesData.data.map((province) => ({
      value: province.id,
      label: province.name
    }));
  }, [provincesData]);

  const companyScopeOptions = useMemo(() => {
    if (!companyScopeData) {
      return [];
    }

    return companyScopeData.data.data.companyScope.map((companyScope) => ({
      value: companyScope.id,
      label: companyScope.name
    }));
  }, [companyScopeData]);

  const totalEmployeeOptions = useMemo(() => {
    if (!totalEmployeeData) {
      return [];
    }

    return totalEmployeeData.data.data.totalEmployees.map((totalEmployee) => ({
      value: totalEmployee.id,
      label: totalEmployee.total
    }));
  }, [totalEmployeeData]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      headline: profile?.company?.headline,
      about: profile?.company?.about,
      websiteLink: profile?.company?.websiteLink,
      deleteAvatar: false,
      province: provincesOptions.find((province) => province.label === profile?.province),
      companyScope: {
        value: profile?.company?.companyScope,
        label: profile?.company?.companyScope
      },
      address: {
        value: profile?.address,
        label: profile?.address
      },
      totalEmployee: totalEmployeeOptions.find(
        (total) => total.label === profile?.company?.totalEmployee
      )
    }
  });

  const { data: regenciesData, isFetching: isRegenciesFethcing } = useRegencies(
    watch('province')?.value,
    {
      enabled: !!watch('province')?.value
    }
  );

  const regenciesOptions = useMemo(() => {
    if (!regenciesData) {
      return [];
    }

    return regenciesData.data.map((regency) => ({
      value: regency.id,
      label: regency.name
    }));
  }, [regenciesData]);

  const handleChangeProvince = useCallback(
    (province) => {
      setError('province', null);

      const provinceExist = watch('province');

      if (provinceExist?.value !== province.value) {
        setValue('province', province);
        setValue('address', null);
      }
    },
    [setError, setValue, watch]
  );

  const loadCompanyScopeOptions = debounce((inputValue, callback) => {
    getCompanyScopes({
      name: inputValue
    })
      .then(({ data }) => {
        const dataOptions = data.data.companyScope.map((companyScope) => ({
          value: companyScope.id,
          label: companyScope.name
        }));
        callback(dataOptions);
      })
      .catch(() => {
        callback([]);
      });
  }, 500);

  const updateBasicMutation = useMutation({
    mutationFn: updateBasicProfileCompany,
    onSuccess: async ({ data }) => {
      const newSlug = data.data.user.slug;

      await update({
        name: watch('name'),
        slug: newSlug,
        avatar: data.data.user.avatar
      });

      router.push(`/profile/${newSlug}`);
      router.refresh();
    }
  });

  const onSubmit = useCallback(
    (data) => {
      const payload = new FormData();
      payload.append('name', data.name);
      payload.append('email', data.email);
      payload.append('province', data.province?.label);
      payload.append('address', data.address?.label);
      payload.append('companyScope', data.companyScope?.label);
      payload.append('totalEmployee', data.totalEmployee?.value);
      payload.append('deleteAvatar', data.deleteAvatar);

      if (data.headline) {
        payload.append('headline', data.headline);
      }

      if (data.websiteLink) {
        payload.append('websiteLink', data.websiteLink);
      }

      if (data.about) {
        payload.append('about', data.about);
      }

      if (data.avatar.length) {
        payload.append('avatar', data.avatar[0]);
      }

      updateBasicMutation.mutate({ payload });
    },
    [updateBasicMutation]
  );

  return (
    <div>
      <BackButton
        backUrl={`/profile/${profile?.slug}`}
        rightContent={
          <Text as="h1" typography="h2">
            Edit Basic
          </Text>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div>
          <FormControl htmlFor="avatar" label="Avatar" isBlock error={errors?.avatar?.message}>
            <TextInput
              type="file"
              id="avatar"
              name="avatar"
              isBlock
              accept="image/*"
              {...register('avatar')}
            />
          </FormControl>

          <Checkbox label="Remove avatar" {...register('deleteAvatar')} />
        </div>

        <FormControl htmlFor="name" label="Name" isBlock isRequired error={errors?.name?.message}>
          <TextInput
            id="name"
            name="name"
            placeholder="Enter your company name"
            isBlock
            {...register('name', {
              required: 'Company name is required',
              minLength: {
                value: 4,
                message: 'Company name must be at least 4 characters'
              },
              maxLength: {
                value: 255,
                message: 'Company name must be at most 255 characters'
              }
            })}
          />
        </FormControl>

        <FormControl
          htmlFor="email"
          label="Email"
          isBlock
          isRequired
          error={errors?.email?.message}
        >
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your company email"
            isBlock
            {...register('email', {
              required: 'Company email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Company email is invalid'
              }
            })}
          />
        </FormControl>

        <FormControl htmlFor="headline" label="Headline" isBlock error={errors?.headline?.message}>
          <TextInput
            id="headline"
            name="headline"
            placeholder="Enter your company headline"
            isBlock
            {...register('headline', {
              maxLength: {
                value: 255,
                message: 'Company headline must be at most 255 characters'
              }
            })}
          />
        </FormControl>

        <FormControl htmlFor="about" label="About" isBlock error={errors?.about?.message}>
          <TextInput
            type="textarea"
            id="about"
            name="about"
            placeholder="Enter your company about"
            isBlock
            {...register('about')}
          />
        </FormControl>

        <FormControl
          htmlFor="websiteLink"
          label="Website"
          isBlock
          error={errors?.websiteLink?.message}
        >
          <TextInput
            type="url"
            id="websiteLink"
            name="websiteLink"
            placeholder="Enter your company website link"
            isBlock
            {...register('websiteLink')}
          />
        </FormControl>

        <FormControl
          htmlFor="province"
          label="Province"
          isRequired
          isBlock
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
                isDisabled={isProvinceFetching}
                isLoading={isProvinceFetching}
              />
            )}
          />
        </FormControl>

        <FormControl
          htmlFor="address"
          label="Address"
          isRequired
          isBlock
          error={errors?.address?.message}
        >
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

        <FormControl
          htmlFor="companyScope"
          label="Company Scope"
          isBlock
          isRequired
          error={errors?.companyScope?.message}
        >
          <Controller
            control={control}
            name="companyScope"
            rules={{
              required: 'Company scope is required'
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <SelectAsync
                ref={ref}
                id="companyScope"
                placeholder="Select your company company scope"
                isBlock
                defaultOptions={companyScopeOptions}
                loadOptions={loadCompanyScopeOptions}
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormControl>

        <FormControl
          htmlFor="totalEmployee"
          label="Total Employee"
          isBlock
          isRequired
          error={errors?.totalEmployee?.message}
        >
          <Controller
            control={control}
            name="totalEmployee"
            rules={{
              required: 'Total employee is required'
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                ref={ref}
                id="totalEmployee"
                placeholder="Select your total employee"
                isBlock
                options={totalEmployeeOptions}
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormControl>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={updateBasicMutation.isLoading}
            loadingText="Saving..."
            className="mt-6"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBasicForm;
