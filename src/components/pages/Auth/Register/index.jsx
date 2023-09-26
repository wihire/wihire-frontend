'use client';

import { useState } from 'react';

import Image from 'next/image';

import registerCompanyImage from '@/assets/images/illustrations/Company-rafiki.png';
import registerJobSeekerImage from '@/assets/images/illustrations/Hiring-rafiki.png';
import Styles from '@/assets/styles/register.module.css';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import RegistrationModal from '@/components/parts/ModalRegister';
import useMultiStep from '@/lib/hooks/useMultiStep';

const Register = () => {
  const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
  const [isJobSeekerModalOpen, setJobSeekerModalOpen] = useState(false);

  const companySteps = ['Step 1', 'Step 2'];
  const jobSeekerSteps = ['Step 1', 'Step 2'];

  const companyStep = useMultiStep(companySteps);
  const jobSeekerStep = useMultiStep(jobSeekerSteps);

  const openCompanyModal = () => {
    setCompanyModalOpen(true);
  };

  const openJobSeekerModal = () => {
    setJobSeekerModalOpen(true);
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-6/12 items-center justify-center bg-primary-content">
        <div className="w-3/6">
          <div className="flex flex-col items-center text-center">
            <Image
              width={200}
              height={200}
              src={registerCompanyImage}
              className="mb-8"
              alt="image"
            />
            <Text typography="h1" className="mb-8">
              For Company
            </Text>
            <Text typography="md" className="mb-8">
              Create your company account and search for suitable candidates
            </Text>
            <Button className="btn btn-primary btn-md" onClick={openCompanyModal}>
              REGISTER AS JOB COMPANY
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-6/12 items-center justify-center bg-white">
        <div className="w-3/6">
          <div className="flex flex-col items-center text-center">
            <Image
              width={200}
              height={200}
              src={registerJobSeekerImage}
              className="mb-8"
              alt="image"
            />
            <Text typography="h1" className="mb-8">
              For Job Seeker
            </Text>
            <Text typography="md" className="mb-8">
              Create your company account and search for suitable candidates
            </Text>
            <Button className="btn btn-primary btn-outline btn-md" onClick={openJobSeekerModal}>
              REGISTER AS JOB SEEKER
            </Button>
          </div>
        </div>
      </div>

      <Container className={Styles.container}>
        You already have an account?{' '}
        <a href="/login" className={Styles.loginText}>
          Login
        </a>
      </Container>

      <RegistrationModal
        isOpen={isCompanyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
        registrationType="Company"
        currentStep={companyStep.currentStep}
        next={companyStep.next}
        prev={companyStep.prev}
      />

      <RegistrationModal
        isOpen={isJobSeekerModalOpen}
        onClose={() => setJobSeekerModalOpen(false)}
        registrationType="Job Seeker"
        currentStep={jobSeekerStep.currentStep}
        next={jobSeekerStep.next}
        prev={jobSeekerStep.prev}
      />
    </div>
  );
};

export default Register;
