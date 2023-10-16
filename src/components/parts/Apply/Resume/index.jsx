import Checkbox from '@/components/elements/Checkbox';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const Resume = ({ register, watch, profile }) => (
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
        disabled={!profile.user.resume}
        {...register('useExistingResume')}
      />

      {profile.user.resume ? (
        <a
          href={profile.user.resume}
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

export default Resume;
