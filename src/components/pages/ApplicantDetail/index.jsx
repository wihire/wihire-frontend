'use client';

import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import LocationIcon from '@/assets/icons/location_solid.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import PhoneIcon from '@/assets/icons/phone_solid.svg';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { capitalEachWord, toCurrency } from '@/lib/common';
import config from '@/lib/config';
import { useApplicantDetail } from '@/query/applicantDetail';

const ApplicantDetail = () => {
  const { slug, userSlug } = useParams();
  // console.log(slug, "<<<<<<<<<<<<<<<<<<<", userSlug);
  const { data } = useApplicantDetail(slug, userSlug);
  // console.log(data, '>>>>>>>>>>>');
  const { applicant } = data.data.data;
  const { profile } = data.data.data.applicant;
  const { user } = data.data.data.applicant.profile;
  // console.log(profile, '>>>>>>>>>>>>>>>>');
  return (
    <>
      <div className="mb-6 flex justify-end gap-6">
        <Button className="btn-outline">Decline</Button>
        <Button>Accept</Button>
      </div>

      <div className="mb-6 flex gap-3 rounded-xl bg-white p-6">
        <Image
          src={profile.avatar || config.defaultAvatar}
          width={150}
          height={150}
          alt="profile picture"
          className="rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <Text typography="md">{profile.name}</Text>
          <Text>{user.headline}</Text>
          <div className="my-2 flex items-center gap-2">
            <LocationIcon className="text-primary" />
            <Text typography="xs">
              {capitalEachWord(profile.address)}, {capitalEachWord(profile.province)}
            </Text>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex gap-2 items-center self-end">
            <Text>{user.phoneNumber}</Text>
            <PhoneIcon className="text-primary" />
          </div>
          <div className="flex gap-2 items-center self-end">
            <Text className="self-end">{profile.email}</Text>
            <MailIcon className="text-primary" />
          </div>
        </div>
      </div>

      {user.about && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            About
          </Text>
          <Text>{user.about}</Text>
        </div>
      )}

      {user.educations.length > 0 && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Education
          </Text>

          <div className="flex flex-col">
            {user.educations.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-3">
                <div className="divider" />
                <Text typography="h3">{edu.name}</Text>
                <Text>{edu.field}</Text>
                <Text typography="xs">
                  {edu.startDate && moment(edu.startDate).format('D MMMM YYYY')}
                  {edu.endDate && ` - ${moment(edu.endDate).format('D MMMM YYYY')}`}
                </Text>
                {edu.maxGrade ? (
                  <Text typography="xs">
                    {edu.grade} / {edu.maxGrade}
                  </Text>
                ) : (
                  <Text className="xs">{edu.grade}</Text>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {user.skills.length > 0 && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Skills
          </Text>
          {user.skills.map((skill, i) => (
            <div key={skill.id} className="flex flex-col gap-3">
              <Text typography="h3" as="h3">
                {skill.skill.title}
              </Text>
              <Text>{capitalEachWord(skill.level)}</Text>
              {i !== user.skills.length - 1 && <div className="divider" />}
            </div>
          ))}
        </div>
      )}

      {user.workExperiencies.length > 0 && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Work Experience
          </Text>
          {user.workExperiencies.map((work) => (
            <div key={work.id} className="flex flex-col gap-3">
              <Text typography="h3" as="h3">
                {work.companyName}
              </Text>
              <Text>{work.title}</Text>
              {work.endDate ? (
                <Text typography="xs">
                  {moment(work.startDate).format('D MMM YYYY')} -
                  {moment(work?.endDate).format('D MMM YYYY')}
                </Text>
              ) : (
                <Text typography="xs">{moment(work.startDate).format('D MMM YYYY')}</Text>
              )}

              <Text typography="xs">{work.description}</Text>
              <div className="divider" />
            </div>
          ))}
        </div>
      )}

      {user.salaryExpectation && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Salary Expectation
          </Text>
          <Text>{toCurrency(user.salaryExpectation)}</Text>
        </div>
      )}

      {applicant.resume && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Resume
          </Text>
          <Button href={applicant.resume} className="btn-sm normal-case">
            View Resume
          </Button>
        </div>
      )}

      {user.certificates.length > 0 && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Certificates
          </Text>
          {user.certificates.map((certificate) => (
            <div key={certificate.id} className="flex flex-col gap-3">
              <div>
                <Text typography="h3" as="h3">
                  {certificate.name}
                </Text>
                <Text typography="xs" className="text-gray-500">
                  {certificate.credentialId}
                </Text>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <Text>{certificate.organization}</Text>
                  {certificate.expiredDate ? (
                    <Text typography="xs">
                      {moment(certificate.issueDate).format('D MMM YYYY')} -{' '}
                      {moment(certificate.expiredDate).format('D MMM YYYY')}
                    </Text>
                  ) : (
                    <Text typography="xs">
                      {moment(certificate.issueDate).format('D MMM YYYY')}
                    </Text>
                  )}
                </div>
                {certificate.credentialUrl && (
                  <Button href={certificate.credentialUrl} className="btn-sm normal-case">
                    View Certificate
                  </Button>
                )}
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>
      )}

      {user.projects.length > 0 && (
        <div className="mb-6 flex flex-col gap-6 rounded-xl bg-white p-6 ">
          <Text typography="h2" as="h2">
            Projects
          </Text>
          {user.projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <Text typography="h3" as="h3">
                  {project.name}
                </Text>
                <Text>{project.role}</Text>
                <Text typography="xs">
                  {moment(project.startDate).format('D MMM YYYY')} -{' '}
                  {moment(project.endDate).format('D MMM YYYY')}
                </Text>
              </div>
              <div className="flex items-end justify-between">
                <Text typography="xs" className="w-9/12">
                  {project.description}
                </Text>
                {project.url && (
                  <Button href={project.url} className="btn-sm normal-case">
                    View Project
                  </Button>
                )}
              </div>
              <div className="divider" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ApplicantDetail;
