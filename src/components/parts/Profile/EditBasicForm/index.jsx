'use client';

import { useCallback, useMemo } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import BackButton from '@/components/elements/BackButton';
import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/lib/constants/regex';
import { GENDER_OPTIONS } from '@/lib/constants/selectOptions';
import { useProvinces, useRegencies } from '@/query/location';
import { useProfile } from '@/query/profile';
import { updateBasicProfileUser } from '@/repositories/profile';

const EditBasicForm = () => {
  const router = useRouter();
  const params = useParams();
  const { update } = useSession();

  const { data: profileData } = useProfile(params.profileSlug);
  const { profile } = useMemo(() => profileData?.data?.data, [profileData]);

  const { data: provincesData, isFetching: isProvinceFetching } = useProvinces();

  const provincesOptions = useMemo(() => {
    if (!provincesData) {
      return [];
    }

    return provincesData.data.map((province) => ({
      value: province.id,
      label: province.name
    }));
  }, [provincesData]);

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
      headline: profile?.user?.headline,
      about: profile?.user?.about,
      url: profile?.user?.url,
      deleteAvatar: false,
      province: provincesOptions.find((province) => province.label === profile?.province),
      address: {
        value: profile?.address,
        label: profile?.address
      },
      gender: GENDER_OPTIONS.find((gender) => gender.value === profile?.user?.gender),
      phoneNumber: profile?.user?.phoneNumber,
      birthDate: moment(profile?.user?.birthDate).format('YYYY-MM-DD')
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

  const updateBasicMutation = useMutation({
    mutationFn: updateBasicProfileUser,
    onSuccess: async ({ data }) => {
      const newSlug = data.data.user.slug;

      await update({
        name: watch('name'),
        slug: newSlug,
        avatar: data.data.user.avatar
      });

      toast.success('Profile updated successfully');

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
      payload.append('gender', data.gender.value);
      payload.append('phoneNumber', data.phoneNumber);
      payload.append('birthDate', new Date(data.birthDate).toISOString());
      payload.append('deleteAvatar', data.deleteAvatar);

      if (data.headline) {
        payload.append('headline', data.headline);
      }

      if (data.url) {
        payload.append('url', data.url);
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
            placeholder="Enter your name"
            isBlock
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 4,
                message: 'Name must be at least 4 characters'
              },
              maxLength: {
                value: 255,
                message: 'Name must be at most 255 characters'
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
            placeholder="Enter your email"
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
            placeholder="Enter your headline"
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
            placeholder="Enter about you"
            isBlock
            {...register('about')}
          />
        </FormControl>

        <FormControl htmlFor="url" label="URL" isBlock error={errors?.url?.message}>
          <TextInput
            type="url"
            id="url"
            name="url"
            placeholder="Enter your website link"
            isBlock
            {...register('url')}
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
          htmlFor="gender"
          isRequired
          label="Gender"
          isBlock
          error={errors?.gender?.message}
        >
          <Controller
            control={control}
            name="gender"
            rules={{
              required: 'Gender is required'
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                id="gender"
                placeholder="Select your gender"
                isBlock
                options={GENDER_OPTIONS}
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
        </FormControl>

        <FormControl
          htmlFor="birthDate"
          label="Birth date"
          isRequired
          isBlock
          error={errors?.birthDate?.message}
        >
          <TextInput
            type="date"
            id="birthDate"
            name="birthDate"
            placeholder="Enter your birth date"
            isBlock
            {...register('birthDate', {
              required: 'Birth date is required',
              validate: (value) => {
                const age = moment().diff(moment(value), 'years');

                if (age < 18) {
                  return 'Age must be greater than 18 years old';
                }

                return true;
              }
            })}
          />
        </FormControl>

        <FormControl
          htmlFor="phoneNumber"
          label="Phone number"
          isRequired
          isBlock
          error={errors?.phoneNumber?.message}
        >
          <TextInput
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            isBlock
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: PHONE_NUMBER_REGEX,
                message: 'Phone number is not valid'
              }
            })}
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
