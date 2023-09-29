'use client';

import moment from 'moment';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';

const ProjectCard = ({ name, role, startDate, endDate, description, url }) => {
  const handleViewResumeClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div>
        <Text className="mb-2 text-xl font-bold">{name}</Text>
      </div>
      <div className="mb-1">
        <Text>{role}</Text>
      </div>
      <div className="mb-1">
        <Text>
          {moment(startDate).format('DD MMM YYYY')} - {moment(endDate).format('DD MMM YYYY')}
        </Text>
      </div>
      <div className="mt-3">
        <Text typography="xs">{description}</Text>
      </div>
      <div>{url ? <Button onClick={handleViewResumeClick}>View Project</Button> : null}</div>
    </div>
  );
};

export default ProjectCard;
