'use client';

import moment from 'moment';

import Text from '@/components/elements/Text';

const EducationCard = ({ name, field, startDate, endDate, grade }) => {
  const endDateData = endDate ? moment(endDate).format('DD MMM YYYY') : 'Present';

  return (
    <div>
      <div>
        <Text className="mb-2 text-xl font-bold">{name}</Text>
      </div>
      <div className="mb-1">
        <Text>{field}</Text>
      </div>
      <div className="mb-1">
        <Text>
          {moment(startDate).format('DD MMM YYYY')} - {endDateData}
        </Text>
      </div>
      <div>
        <Text>{grade}</Text>
      </div>
    </div>
  );
};

export default EducationCard;
