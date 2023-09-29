'use client';

import { useMemo } from 'react';

import moment from 'moment';
import { Controller } from 'react-hook-form';

import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';
import { PHONE_NUMBER_REGEX } from '@/lib/constants/regex';
import { useProvinces, useRegencies } from '@/query/location';

const StepTwoUser = ({ register, errors, control, watch, setValue }) => {
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

  return (
    <div>
      <FormControl htmlFor="province" label="Province" isBlock error={errors?.province?.message}>
        <Controller
          control={control}
          name="province"
          rules={{
            required: 'Province is required'
          }}
          render={({ field: { value, name, ref } }) => (
            <Select
              id="province"
              placeholder="Select your province"
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

      <FormControl htmlFor="address" label="Address" isBlock error={errors?.address?.message}>
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
              placeholder="Select your address"
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
        htmlFor="birthDate"
        label="Birth date"
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
    </div>
  );
};

export default StepTwoUser;
