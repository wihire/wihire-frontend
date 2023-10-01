import EducationCard from '@/components/parts/Profile/EducationCard';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const ListEducation = ({ educations }) => (
  <ProfileSection title="Educations">
    {educations?.map((education, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <EducationCard key={education.id} {...education} />
      </>
    ))}
  </ProfileSection>
);

export default ListEducation;
