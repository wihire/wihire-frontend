/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import cx from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import BasicInformation from '@/components/parts/Profile/BasicInformation';
import CertificateList from '@/components/parts/Profile/CertificateList';
import ListEducation from '@/components/parts/Profile/EducationList';
import ProjectList from '@/components/parts/Profile/ProjectList';
import SalaryExpectation from '@/components/parts/Profile/SalaryExpetation';
import ListSkill from '@/components/parts/Profile/SkillList';
import WorkExperienceList from '@/components/parts/Profile/WorkExperienceList';

import ProfileSection from './ProfileSection';

const ProfileUser = ({ customResume, withoutResume, hideBirthDate, ...profile }) => {
  const { data: loggedData, status } = useSession();

  return (
    <div className="flex flex-col gap-5">
      {status === 'authenticated' &&
      loggedData?.profile?.id === profile?.id &&
      (!profile?.user.resume ||
        !profile?.user.salaryExpectation ||
        !profile?.user.educations.length ||
        !profile?.user.skills.length ||
        !profile?.user.workExperiencies.length ||
        !profile?.user.projects.length ||
        !profile?.user.certificates.length) ? (
        // eslint-disable-next-line react/jsx-indent
        <div className="dropdown dropdown-end self-end">
          <label tabIndex={0} className="btn btn-primary">
            Add Section
          </label>
          <ul
            tabIndex={0}
            className={cx(
              'menu dropdown-content rounded-box menu-sm z-[1] w-52 bg-base-100 p-2 shadow'
            )}
          >
            {!profile?.user.resume ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/resume`}>Resume</Link>
              </li>
            ) : null}

            {!profile?.user.salaryExpectation ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/salary`}>Salary</Link>
              </li>
            ) : null}

            {!profile?.user.educations.length ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/educations`}>Education</Link>
              </li>
            ) : null}

            {!profile?.user.skills.length ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/skills`}>Skill</Link>
              </li>
            ) : null}

            {!profile?.user.workExperiencies.length ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/work-experiencies`}>
                  Work experience
                </Link>
              </li>
            ) : null}

            {!profile?.user.projects.length ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/projects`}>Project</Link>
              </li>
            ) : null}

            {!profile?.user.certificates.length ? (
              <li>
                <Link href={`/profile/${profile.slug}/user/certificates`}>Certificate</Link>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <BasicInformation profile={profile} hideBirthDate={hideBirthDate} />

      {profile?.user?.workExperiencies?.length > 0 ? (
        <WorkExperienceList profile={profile} workExperiencies={profile.user.workExperiencies} />
      ) : null}

      {profile?.user?.educations?.length > 0 ? (
        <ListEducation profile={profile} educations={profile?.user?.educations} />
      ) : null}

      {profile?.user?.certificates?.length > 0 ? (
        <CertificateList profile={profile} certificates={profile?.user?.certificates} />
      ) : null}

      {profile?.user?.projects?.length > 0 ? (
        <ProjectList profile={profile} projects={profile?.user?.projects} />
      ) : null}

      {profile?.user?.skills?.length > 0 ? (
        <ListSkill profile={profile} skills={profile?.user?.skills} />
      ) : null}

      {profile?.user?.salaryExpectation || profile?.user?.resume ? (
        <ProfileSection
          title="Additional Information"
          rightButton={
            status === 'authenticated' &&
            loggedData?.profile?.id === profile?.id &&
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
                      <Link href={`/profile/${profile.slug}/user/resume`}>Resume</Link>
                    </li>
                  ) : null}

                  {profile?.user.salaryExpectation ? (
                    <li>
                      <Link href={`/profile/${profile.slug}/user/salary`}>Salary</Link>
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
