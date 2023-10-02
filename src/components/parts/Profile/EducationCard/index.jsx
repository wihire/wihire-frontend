'use client';

import { useMemo } from 'react';

import moment from 'moment';

import Text from '@/components/elements/Text';

const EducationCard = ({ name, field, startDate, endDate, grade, maxGrade }) => {
  const endDateData = useMemo(
    () => (endDate ? moment(endDate).format('MMM YYYY') : 'Present'),
    [endDate]
  );

  return (
    <div>
      <div>
        <Text as="h3" className="mr-2 inline-block font-medium">
          {name}
        </Text>
        <Text className="inline-block">- {field}</Text>
      </div>

      <Text typography="xs" className="text-gray-500">
        {moment(startDate).format('MMM YYYY')} - {endDateData}
      </Text>

      {grade ? (
        <Text typography="xs" className="text-gray-500">
          Grade: {grade}
          {maxGrade ? `/${maxGrade}` : null}
        </Text>
      ) : null}
    </div>
  );
};

export default EducationCard;
