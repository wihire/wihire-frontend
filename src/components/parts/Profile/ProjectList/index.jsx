import ProfileSection from '@/components/parts/Profile/ProfileSection';
import ProjectCard from '@/components/parts/Profile/ProjectCard';

const ListProject = ({ projects }) => (
  <ProfileSection title="Projects">
    {projects?.map((project, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <ProjectCard key={project.id} {...project} />
      </>
    ))}
  </ProfileSection>
);

export default ListProject;
