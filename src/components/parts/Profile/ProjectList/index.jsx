import Text from '@/components/elements/Text';
import ProjectCard from '@/components/parts/Profile/ProjectCard';

const ListProject = ({ projects }) => (
  <div className="flex flex-col gap-2 rounded-md bg-white px-4 py-5">
    <Text className="mb-3 text-2xl font-bold">Project</Text>
    {projects?.map((project, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <ProjectCard key={project.id} {...project} />
      </>
    ))}
  </div>
);

export default ListProject;
