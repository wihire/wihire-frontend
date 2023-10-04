'use client';

import BasicInformation from '@/components/parts/Profile/BasicInformation';
import CertificateList from '@/components/parts/Profile/CertificateList';
import ListEducation from '@/components/parts/Profile/EducationList';
import ProjectList from '@/components/parts/Profile/ProjectList';
import SalaryExpectation from '@/components/parts/Profile/SalaryExpetation';
import ListSkill from '@/components/parts/Profile/SkillList';
import WorkExperienceList from '@/components/parts/Profile/WorkExperienceList';

import ProfileSection from './ProfileSection';

const ProfileUser = ({ customResume, withoutResume, hideBirthDate, ...profile }) => (
  <div className="flex flex-col gap-5">
    <BasicInformation profile={profile} hideBirthDate={hideBirthDate} />

    {profile?.user?.workExperiencies?.length > 0 ? (
      <WorkExperienceList workExperiencies={profile.user.workExperiencies} />
    ) : null}

    {profile?.user?.educations?.length > 0 ? (
      <ListEducation educations={profile?.user?.educations} />
    ) : null}

    {profile?.user?.certificates?.length > 0 ? (
      <CertificateList certificates={profile?.user?.certificates} />
    ) : null}

    {profile?.user?.projects?.length > 0 ? (
      <ProjectList projects={profile?.user?.projects} />
    ) : null}

    {profile?.user?.skills?.length > 0 ? <ListSkill skills={profile?.user?.skills} /> : null}

    {profile?.user?.salaryExpectation || profile?.user?.resume ? (
      <ProfileSection title="Additional Information">
        {profile?.user?.salaryExpectation ? (
          <SalaryExpectation value={profile.user.salaryExpectation} />
        ) : null}

        {customResume || (profile?.user?.resume && !withoutResume) ? (
          <a
            href={customResume ?? profile?.user?.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info btn-outline btn-xs mt-2 self-start"
          >
            View resume
          </a>
        ) : null}
      </ProfileSection>
    ) : null}
  </div>
);

export default ProfileUser;
