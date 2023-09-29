import Text from '@/components/elements/Text';
import SkillCard from '@/components/parts/Profile/SkillCard';

const ListSkill = ({ skills }) => (
  <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-5">
    <Text className="mb-3 text-2xl font-bold">Skill</Text>
    {skills?.map((skill, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <SkillCard key={skill.id} {...skill} />
      </>
    ))}
  </div>
);

export default ListSkill;
