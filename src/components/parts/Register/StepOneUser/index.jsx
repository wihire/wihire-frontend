'use client';

import { Controller } from 'react-hook-form';

import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX } from '@/lib/constants/regex';
import { GENDER_OPTIONS } from '@/lib/constants/selectOptions';

const StepOneUser = ({ register, errors, watch, control }) => (
  <div>
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

    <FormControl htmlFor="email" label="Email" isBlock isRequired error={errors?.email?.message}>
      <TextInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        isBlock
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email is invalid'
          }
        })}
      />
    </FormControl>

    <FormControl
      htmlFor="password"
      label="Password"
      isBlock
      isRequired
      error={errors?.password?.message}
    >
      <TextInput
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        isBlock
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
      />
    </FormControl>

    <FormControl
      htmlFor="confirmPassword"
      label="Confirm password"
      isBlock
      isRequired
      error={errors?.confirmPassword?.message}
    >
      <TextInput
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Enter your confirm password"
        isBlock
        {...register('confirmPassword', {
          required: 'Confirm password is required',
          validate: (value) => {
            const password = watch('password');
            return password === value || 'Confirm password is not match';
          }
        })}
      />
    </FormControl>

    <FormControl htmlFor="gender" label="Gender" isBlock isRequired error={errors?.gender?.message}>
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
            name={name}
            value={value}
            onChange={onChange}
            ref={ref}
          />
        )}
      />
    </FormControl>
  </div>
);

export default StepOneUser;
