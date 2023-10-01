import ProfileSection from '@/components/parts/Profile/ProfileSection';
import WorkExperienceCard from '@/components/parts/Profile/WorkExperienceCard';

const ListWorkExperience = ({ workExperiencies }) => (
  <ProfileSection title="Work Experience">
    {workExperiencies?.map((workExperience, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <WorkExperienceCard key={workExperience.id} {...workExperience} />
      </>
    ))}
  </ProfileSection>
);

export default ListWorkExperience;
