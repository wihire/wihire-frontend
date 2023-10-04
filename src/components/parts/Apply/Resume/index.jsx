import React from 'react';

import { useSession } from 'next-auth/react';

import Checkbox from '@/components/elements/Checkbox';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const Resume = ({ register, watch }) => {
  const { data } = useSession();

  return (
    <ProfileSection>
      <FormControl label="Upload your resume">
        <TextInput
          type="file"
          disabled={watch('useExistingResume')}
          accept="application/pdf"
          {...register('resume')}
        />
      </FormControl>

      <div className="mt-5">
        <Checkbox
          label="Use existing resume"
          disabled={!data?.profile.user.resume}
          {...register('useExistingResume')}
        />

        {data?.profile.user.resume ? (
          <a
            href={data?.profile.user.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-outline btn-xs self-start"
          >
            View my existing resume
          </a>
        ) : null}
      </div>
    </ProfileSection>
  );
};

export default Resume;
