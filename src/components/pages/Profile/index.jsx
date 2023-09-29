'use client';

import { useParams } from 'next/navigation';

import About from '@/components/parts/Profile/About';
import BasicInformation from '@/components/parts/Profile/BasicInformation';
import CertificateList from '@/components/parts/Profile/CertificateList';
import ListEducation from '@/components/parts/Profile/EducationList';
import ProjectList from '@/components/parts/Profile/ProjectList';
import Resume from '@/components/parts/Profile/Resume';
import SalaryExpectation from '@/components/parts/Profile/SalaryExpetation';
import ListSkill from '@/components/parts/Profile/SkillList';
import WorkExperienceList from '@/components/parts/Profile/WorkExperienceList';
import { useProfile } from '@/query/profile';

const Profile = () => {
  const params = useParams();

  const { data } = useProfile(params.userSlug);

  return (
    <div className="flex flex-col gap-5">
      <BasicInformation />
      <About />
      <ListEducation educations={data?.data?.data?.profile?.user?.educations} />
      <ListSkill skills={data?.data?.data?.profile?.user?.skills} />
      <WorkExperienceList workExperiencies={data?.data?.data?.profile?.user?.workExperiencies} />
      <SalaryExpectation />
      <Resume />
      <CertificateList certificates={data?.data?.data?.profile?.user?.certificates} />
      <ProjectList projects={data?.data?.data?.profile?.user?.projects} />
    </div>
  );
};

export default Profile;
