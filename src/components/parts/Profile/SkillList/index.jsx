import ProfileSection from '@/components/parts/Profile/ProfileSection';
import SkillCard from '@/components/parts/Profile/SkillCard';

const ListSkill = ({ skills }) => (
  <ProfileSection title="Skills">
    <ul>
      {skills?.map((skill) => (
        <SkillCard key={skill.id} {...skill} />
      ))}
    </ul>
  </ProfileSection>
);

export default ListSkill;
