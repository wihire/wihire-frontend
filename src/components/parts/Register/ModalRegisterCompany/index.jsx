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
import StepOneCompany from '@/components/parts/Register/StepOneCompany';
import StepTwoCompany from '@/components/parts/Register/StepTwoCompany';
import { EMAIL_KEY } from '@/lib/constants/storageKey';
import useMultiStep from '@/lib/hooks/useMultiStep';
import { registerCompany, sendVerificationEmail } from '@/repositories/auth';

import './styles.scss';

const ModalRegisterAsCompany = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm();

  const formOptions = {
    register,
    errors,
    watch,
    control,
    setValue,
    setError
  };

  const { currentStep, currentStepComponent, next, prev, totalStep, goTo } = useMultiStep([
    <StepOneCompany key="step-one-company" {...formOptions} />,
    <StepTwoCompany key="step-two-company" {...formOptions} />
  ]);

  const resetModal = useCallback(() => {
    reset();
    goTo(1);
  }, [reset, goTo]);

  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      toast.success('Register company success, please check your email to verify your account');

      const email = watch('email');
      setCookie(EMAIL_KEY, email, {
        maxAge: 60 // 1 minute
      });

      router.push('/verification-email');

      resetModal();
      onClose();
    }
  });

  const registerCompanyMutation = useMutation({
    mutationFn: registerCompany,
    onSuccess: () => {
      const email = watch('email');
      sendVerificationEmailMutation.mutate({
        email
      });
    }
  });

  const handleOnClose = useCallback(() => {
    if (registerCompanyMutation.isLoading || sendVerificationEmailMutation.isLoading) {
      return;
    }

    resetModal();
    onClose();
  }, [
    registerCompanyMutation.isLoading,
    sendVerificationEmailMutation.isLoading,
    resetModal,
    onClose
  ]);

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
        companyScope: data.companyScope.label,
        totalEmployee: data.totalEmployee.value
      };
      registerCompanyMutation.mutate(payload);
    },
    [currentStep, next, totalStep, registerCompanyMutation]
  );

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} backdropBlur scrollBehaviour="outside">
      <ModalHeader>
        <Text typography="h2">Let&apos;s create your company profile</Text>
      </ModalHeader>

      <ModalBody>
        <StepModalForm currentStep={currentStep} totalStep={totalStep} previous={prev} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          {currentStepComponent}

          <Button
            type="submit"
            className="mt-10 w-full"
            isLoading={registerCompanyMutation.isLoading || sendVerificationEmailMutation.isLoading}
            loadingText="Registering..."
          >
            {currentStep === totalStep ? 'Create Company Account' : 'Continue'}
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalRegisterAsCompany;
