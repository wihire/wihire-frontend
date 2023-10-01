'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Modal, ModalBody, ModalHeader } from 'react-modern-modal';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import StepModalForm from '@/components/parts/Register/StepModalForm';
import StepOneUser from '@/components/parts/Register/StepOneUser';
import StepTwoUser from '@/components/parts/Register/StepTwoUser';
import { EMAIL_KEY } from '@/lib/constants/storageKey';
import useMultiStep from '@/lib/hooks/useMultiStep';
import { registerUser, sendVerificationEmail } from '@/repositories/auth';

const ModalRegisterUser = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  const formOptions = {
    register,
    errors,
    watch,
    control,
    setValue
  };

  const { currentStep, currentStepComponent, next, prev, totalStep, goTo } = useMultiStep([
    <StepOneUser key="step-one-user" {...formOptions} />,
    <StepTwoUser key="step-two-user" {...formOptions} />
  ]);

  const handleOnClose = useCallback(() => {
    goTo(1);
    reset();
    onClose();
  }, [onClose, reset, goTo]);

  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      toast.success('Register user success, please check your email to verify your account');

      const email = watch('email');
      setCookie(EMAIL_KEY, email, {
        maxAge: 60 // 1 minute
      });

      router.push('/verification-email');

      handleOnClose();
    }
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      const email = watch('email');
      sendVerificationEmailMutation.mutate({
        email
      });
    }
  });

  const onSubmit = useCallback(
    (data) => {
      if (currentStep < totalStep) {
        next();
        return;
      }

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        province: data.province.label,
        address: data.address.label,
        gender: data.gender.value,
        birthDate: new Date(data.birthDate).toISOString(),
        phoneNumber: data.phoneNumber
      };
      registerUserMutation.mutate(payload);
    },
    [currentStep, next, totalStep, registerUserMutation]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} backdropBlur scrollBehaviour="outside">
      <ModalHeader>
        <Text typography="h2">Let&apos;s create your user profile</Text>
      </ModalHeader>

      <ModalBody>
        <StepModalForm currentStep={currentStep} totalStep={totalStep} previous={prev} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          {currentStepComponent}

          <Button
            type="submit"
            className="mt-10 w-full"
            isLoading={registerUserMutation.isLoading || sendVerificationEmailMutation.isLoading}
            loadingText="Registering..."
          >
            {currentStep === totalStep ? 'Create Account' : 'Continue'}
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalRegisterUser;
