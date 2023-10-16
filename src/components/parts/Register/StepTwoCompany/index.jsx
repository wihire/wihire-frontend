'use client';

import { useCallback, useMemo } from 'react';

import debounce from 'lodash.debounce';
import { Controller } from 'react-hook-form';

import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import SelectAsync from '@/components/elements/SelectAsyncCreateable';
import { useCompanyScopes } from '@/query/companyScope';
import { useProvinces, useRegencies } from '@/query/location';
import { useTotalEmployees } from '@/query/totalEmployee';
import { getCompanyScopes } from '@/repositories/companyScope';

const StepTwoCompany = ({ errors, control, watch, setValue, setError }) => {
  const { data: provincesData, isLoading: isProvincesLoading } = useProvinces();
  const { data: regenciesData, isFetching: isRegenciesFethcing } = useRegencies(
    watch('province')?.value,
    {
      enabled: !!watch('province')?.value
    }
  );
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

  const regenciesOptions = useMemo(() => {
    if (!regenciesData) {
      return [];
    }

    return regenciesData.data.map((regency) => ({
      value: regency.id,
      label: regency.name
    }));
  }, [regenciesData]);

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

  return (
    <div>
      <FormControl
        htmlFor="province"
        label="Province"
        isBlock
        isRequired
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
              placeholder="Select company province"
              isBlock
              options={provincesOptions}
              isSearchable
              name={name}
              value={value}
              onChange={handleChangeProvince}
              ref={ref}
              isLoading={isProvincesLoading}
            />
          )}
        />
      </FormControl>

      <FormControl
        htmlFor="address"
        label="Address"
        isBlock
        isRequired
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
              placeholder="Select company address"
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
        label="Company scope"
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
              placeholder="Select company scope"
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
        label="Total employee"
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
              placeholder="Select total employee"
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
    </div>
  );
};

export default StepTwoCompany;
