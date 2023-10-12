'use client';

import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX } from '@/lib/constants/regex';

const StepOneCompany = ({ register, errors, watch }) => (
  <div>
    <FormControl htmlFor="name" label="Name" isBlock isRequired error={errors?.name?.message}>
      <TextInput
        id="name"
        name="name"
        placeholder="Enter company name"
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

    <FormControl htmlFor="email" label="Email" isBlock isRequired error={errors?.email?.message}>
      <TextInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter company email"
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
  </div>
);

export default StepOneCompany;
