'use client';

import { useMemo } from 'react';

import moment from 'moment';

import Text from '@/components/elements/Text';
import DangerousHTML from '@/components/parts/DangerousHTML';

const WorkExperienceCard = ({ companyName, title, startDate, endDate, description }) => {
  const endDateData = useMemo(
    () => (endDate ? moment(endDate).format('MMM YYYY') : 'Present'),
    [endDate]
  );

  return (
    <div>
      <div>
        <Text as="h3" className="mr-2 inline-block font-medium">
          {title}
        </Text>
        <Text className="inline-block">- {companyName}</Text>
      </div>

      <Text typography="xs" className="text-gray-500">
        {moment(startDate).format('MMM YYYY')} - {endDateData}
      </Text>

      {description ? <DangerousHTML html={description} className="mt-5" /> : null}
    </div>
  );
};

export default WorkExperienceCard;
