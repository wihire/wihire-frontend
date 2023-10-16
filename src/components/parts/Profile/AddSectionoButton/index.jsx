/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useMemo } from 'react';

import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AddSectionButton = ({ profile }) => {
  const pathname = usePathname();
  const { data: loggedData, status } = useSession();

  const isOwnProfile = useMemo(
    () => status === 'authenticated' && loggedData?.profile?.id === profile?.id,
    [status, loggedData, profile]
  );

  if (
    isOwnProfile &&
    (!profile?.user.resume ||
      !profile?.user.salaryExpectation ||
      !profile?.user.educations.length ||
      !profile?.user.skills.length ||
      !profile?.user.workExperiencies.length ||
      !profile?.user.projects.length ||
      !profile?.user.certificates.length)
  ) {
    return (
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
              <Link href={`${pathname}/user/resume`}>Resume</Link>
            </li>
          ) : null}

          {!profile?.user.salaryExpectation ? (
            <li>
              <Link href={`${pathname}/user/salary`}>Salary</Link>
            </li>
          ) : null}

          {!profile?.user.educations.length ? (
            <li>
              <Link href={`${pathname}/user/educations`}>Education</Link>
            </li>
          ) : null}

          {!profile?.user.skills.length ? (
            <li>
              <Link href={`${pathname}/user/skills`}>Skill</Link>
            </li>
          ) : null}

          {!profile?.user.workExperiencies.length ? (
            <li>
              <Link href={`${pathname}/user/work-experiencies`}>Work experience</Link>
            </li>
          ) : null}

          {!profile?.user.projects.length ? (
            <li>
              <Link href={`${pathname}/user/projects`}>Project</Link>
            </li>
          ) : null}

          {!profile?.user.certificates.length ? (
            <li>
              <Link href={`${pathname}/user/certificates`}>Certificate</Link>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }

  return null;
};

export default AddSectionButton;
