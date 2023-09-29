'use client';

import ArrowSmallLeft from '@/assets/icons/arrow-small-left.svg';
import Xmark from '@/assets/icons/x-mark.svg';
import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Select from '@/components/elements/Select';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';

const RegistrationModal = ({ isOpen, onClose, registrationType, currentStep, next, prev }) => (
  <div
    className={`fixed left-0 top-0 flex h-full w-full items-center justify-center ${
      isOpen ? 'block' : 'hidden'
    }`}
  >
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <div className="flex justify-end">
        <Button onClick={onClose} className="btn btn-ghost">
          <Xmark />
        </Button>
      </div>

      <Text typography="h3" className="mb-1 text-center">
        Lets create your {registrationType} profile{' '}
      </Text>

      {currentStep === 1 && (
        <>
          <Text typography="sm" className="mb-1 text-right">
            Step {currentStep} / 2
          </Text>

          {registrationType === 'Company' && (
            <>
              <FormControl htmlFor="nameCompany" label="Name" className="mb-1">
                <TextInput
                  type="text"
                  id="nameCompany"
                  name="name"
                  placeholder="Enter your company name"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="emailCompany" label="Email" className="mb-1">
                <TextInput
                  type="email"
                  id="emailCompany"
                  name="email"
                  placeholder="Enter your company email"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="passwordCompany" label="Password" className="mb-1">
                <TextInput
                  type="password"
                  id="passwordCompany"
                  name="password"
                  placeholder="Enter your password"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl
                htmlFor="confirmPasswordCompany"
                label="Confirm Password"
                className="mb-1"
              >
                <TextInput
                  type="password"
                  id="confirmPasswordCompany"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <Button onClick={next} className="btn-primary btn-md mt-4 w-full">
                Continue
              </Button>
            </>
          )}

          {registrationType === 'Job Seeker' && (
            <>
              <FormControl htmlFor="nameUser" label="Name" className="mb-1">
                <TextInput
                  type="text"
                  id="nameUser"
                  name="name"
                  placeholder="Enter your name"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="emailUser" label="Email" className="mb-1">
                <TextInput
                  type="email"
                  id="emailUser"
                  name="email"
                  placeholder="Enter your email"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="passwordUser" label="Password" className="mb-1">
                <TextInput
                  type="password"
                  id="passwordUser"
                  name="password"
                  placeholder="Enter your password"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="confirmPasswordUser" label="Confirm Password" className="mb-1">
                <TextInput
                  type="password"
                  id="confirmPasswordUser"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="genderUser" label="Gender" className="mb-1">
                <Select
                  id="genderUser"
                  placeholder="Select your gender"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'Male',
                      label: 'Male'
                    },
                    {
                      value: 'Female',
                      label: 'Female'
                    }
                  ]}
                />
              </FormControl>

              <Button onClick={next} className="btn-primary btn-md mt-4 w-full">
                Continue
              </Button>
            </>
          )}
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="flex justify-between">
            <Button onClick={prev} className="btn btn-ghost btn-xs">
              <ArrowSmallLeft />
              Previous
            </Button>
            <Text className="mb-1 text-right">Step {currentStep} / 2</Text>
          </div>

          {registrationType === 'Company' && (
            <>
              <FormControl htmlFor="provinceCompany" label="Province" className="mb-1">
                <Select
                  id="provinceCompany"
                  placeholder="Select your company location"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'Jawa Tengah',
                      label: 'Jawa Tengah'
                    },
                    {
                      value: 'Jakarta',
                      label: 'Jakrta'
                    }
                  ]}
                />
              </FormControl>

              <FormControl htmlFor="locationCompany" label="Location" className="mb-1">
                <Select
                  id="locationCompany"
                  placeholder="Select your company location"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'Jakarta Pusat',
                      label: 'Jakarta Pusat'
                    },
                    {
                      value: 'Jakarta Barat',
                      label: 'Jakrta Barat'
                    }
                  ]}
                />
              </FormControl>

              <FormControl htmlFor="industryScopeCompany" label="Industry Scope" className="mb-1">
                <Select
                  id="industryScopeCompany"
                  placeholder="Select your industry scope"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'I Tech',
                      label: 'I Tech'
                    },
                    {
                      value: 'Economy',
                      label: 'Economy'
                    }
                  ]}
                />
              </FormControl>

              <FormControl htmlFor="totalEmployeeCompany" label="Total Employee" className="mb-1">
                <Select
                  id="totalEmployeeCompany"
                  placeholder="Select your industry scope"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: '1-200',
                      label: '1-200'
                    },
                    {
                      value: '200-500',
                      label: '200-500'
                    },
                    {
                      value: '500-1000',
                      label: '500-1000'
                    }
                  ]}
                />
              </FormControl>

              <Button className="btn-primary btn-md mt-4 w-full">
                Create {registrationType} Account
              </Button>
            </>
          )}

          {registrationType === 'Job Seeker' && (
            <>
              <FormControl htmlFor="provinceUser" label="Province" className="mb-1">
                <Select
                  id="provinceUser"
                  placeholder="Select your province"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'Jawa Tengah',
                      label: 'Jawa Tengah'
                    },
                    {
                      value: 'Jakarta',
                      label: 'Jakrta'
                    }
                  ]}
                />
              </FormControl>

              <FormControl htmlFor="locationUser" label="Location" className="mb-1">
                <Select
                  id="locationUser"
                  placeholder="Select your location"
                  className="my-custom-class input-md"
                  options={[
                    {
                      value: 'Jakarta Pusat',
                      label: 'Jakarta Pusat'
                    },
                    {
                      value: 'Jakarta Barat',
                      label: 'Jakrta Barat'
                    }
                  ]}
                />
              </FormControl>

              <FormControl htmlFor="birthDate" label="Birth Date" className="mb-1">
                <TextInput
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="dd/mm/yyyy"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <FormControl htmlFor="phoneNumber" label="phoneNumber" className="mb-1">
                <TextInput
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="my-custom-class input-md"
                />
              </FormControl>

              <Button className="btn-primary btn-md mt-4 w-full">
                Create {registrationType} Account
              </Button>
            </>
          )}
        </>
      )}
    </div>
  </div>
);

export default RegistrationModal;
