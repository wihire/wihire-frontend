'use client';

import moment from 'moment';

import Text from '@/components/elements/Text';
import DangerousHTML from '@/components/parts/DangerousHTML';

const ProjectCard = ({ name, role, startDate, endDate, description, url }) => (
  <div>
    <Text as="h3" className="font-medium">
      {name}
    </Text>

    <Text>{role}</Text>

    <Text typography="xs" className="text-gray-500">
      {moment(startDate).format('MMM YYYY')} - {moment(endDate).format('MMM YYYY')}
    </Text>

    {description ? <DangerousHTML html={description} className="mt-5" /> : null}

    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-info btn-outline btn-xs mt-2"
      >
        View project
      </a>
    ) : null}
  </div>
);

export default ProjectCard;
