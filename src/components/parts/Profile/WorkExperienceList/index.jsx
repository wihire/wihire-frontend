import Text from '@/components/elements/Text';
import WorkExperienceCard from '@/components/parts/Profile/WorkExperienceCard';

const ListWorkExperience = ({ workExperiencies }) => (
  <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-5">
    <Text className="mb-3 text-2xl font-bold">Work Experiencies</Text>
    {workExperiencies?.map((workExperience, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <WorkExperienceCard key={workExperience.id} {...workExperience} />
      </>
    ))}
  </div>
);

export default ListWorkExperience;
