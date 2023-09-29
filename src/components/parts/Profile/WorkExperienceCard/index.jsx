'use client';

import moment from 'moment';

import Text from '@/components/elements/Text';

const WorkExperienceCard = ({ companyName, title, startDate, endDate, description }) => {
  const endDateData = endDate ? moment(endDate).format('DD MMM YYYY') : 'Present';

  return (
    <div>
      <div>
        <Text className="mb-2 text-xl font-bold">{companyName}</Text>
      </div>
      <div className="mb-1">
        <Text>{title}</Text>
      </div>
      <div className="mb-1">
        <Text>
          {moment(startDate).format('DD MMM YYYY')} - {endDateData}
        </Text>
      </div>
      <div className="mt-5">
        <Text typography="xs">{description}</Text>
      </div>
    </div>
  );
};

export default WorkExperienceCard;
