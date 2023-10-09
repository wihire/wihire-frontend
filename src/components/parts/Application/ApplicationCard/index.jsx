'use client';

import JobCard from '@/components/parts//Jobs/JobCard';
import ApplicationStatusBadge from '@/components/parts/Application/ApplicationStatusBadge';

const ApplicationCard = ({ ...props }) => (
  <JobCard
    companyImage={props.job.company.profile.avatar}
    companyName={props.job.company.profile.name}
    renderRightContent={<ApplicationStatusBadge status={props.status} />}
    {...props.job}
  />
);

export default ApplicationCard;
