import Text from '@/components/elements/Text';
import EducationCard from '@/components/parts/Profile/EducationCard';

const ListEducation = ({ educations }) => (
  <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-5">
    <Text className="mb-3 text-2xl font-bold">Education</Text>
    {educations?.map((education, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <EducationCard key={education.id} {...education} />
      </>
    ))}
  </div>
);

export default ListEducation;
