/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import { useMemo } from 'react';

import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import BasicInformation from '@/components/parts/Profile/BasicInformation';
import CertificateList from '@/components/parts/Profile/CertificateList';
import ListEducation from '@/components/parts/Profile/EducationList';
import ProjectList from '@/components/parts/Profile/ProjectList';
import SalaryExpectation from '@/components/parts/Profile/SalaryExpetation';
import ListSkill from '@/components/parts/Profile/SkillList';
import WorkExperienceList from '@/components/parts/Profile/WorkExperienceList';

import AddSectionButton from './AddSectionoButton';
import ProfileSection from './ProfileSection';

const ProfileUser = ({ customResume, withoutResume, hideBirthDate, withoutEdit, profile }) => {
  const pathname = usePathname();
  const { data: loggedData, status } = useSession();

  const isOwnProfile = useMemo(
    () => status === 'authenticated' && loggedData?.profile?.id === profile?.id,
    [status, loggedData, profile]
  );

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {!withoutEdit ? <AddSectionButton profile={profile} /> : null}

      <BasicInformation profile={profile} hideBirthDate={hideBirthDate} withoutEdit={withoutEdit} />

      {profile?.user?.workExperiencies?.length > 0 ? (
        <WorkExperienceList
          profile={profile}
          workExperiencies={profile.user.workExperiencies}
          withoutEdit={withoutEdit}
        />
      ) : null}

      {profile?.user?.educations?.length > 0 ? (
        <ListEducation
          profile={profile}
          educations={profile?.user?.educations}
          withoutEdit={withoutEdit}
        />
      ) : null}

      {profile?.user?.certificates?.length > 0 ? (
        <CertificateList
          profile={profile}
          certificates={profile?.user?.certificates}
          withoutEdit={withoutEdit}
        />
      ) : null}

      {profile?.user?.projects?.length > 0 ? (
        <ProjectList
          profile={profile}
          projects={profile?.user?.projects}
          withoutEdit={withoutEdit}
        />
      ) : null}

      {profile?.user?.skills?.length > 0 ? (
        <ListSkill profile={profile} skills={profile?.user?.skills} withoutEdit={withoutEdit} />
      ) : null}

      {profile?.user?.salaryExpectation || (profile?.user?.resume && !withoutResume) ? (
        <ProfileSection
          title="Additional Information"
          rightButton={
            !withoutEdit &&
            isOwnProfile &&
            (profile?.user.resume || profile?.user.salaryExpectation) ? (
              <div className="dropdown dropdown-end self-end">
                <label tabIndex={0} className="btn btn-ghost">
                  <PencilIcon />
                </label>
                <ul
                  tabIndex={0}
                  className={cx(
                    'menu dropdown-content rounded-box menu-sm z-[1] w-52 bg-base-100 p-2 shadow'
                  )}
                >
                  {profile?.user.resume ? (
                    <li>
                      <Link href={`${pathname}/user/resume`}>Resume</Link>
                    </li>
                  ) : null}

                  {profile?.user.salaryExpectation ? (
                    <li>
                      <Link href={`${pathname}/user/salary`}>Salary</Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null
          }
        >
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
};

export default ProfileUser;
