'use client';

import moment from 'moment';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';

const CertificateCard = ({
  name,
  credentialId,
  organization,
  issuedDate,
  expiredDate,
  credentialUrl
}) => {
  const handleViewResumeClick = () => {
    window.open(credentialUrl, '_blank');
  };

  const date = moment(expiredDate).format('DD MMM YYYY');

  const endDateData = expiredDate ? `- ${date}` : null;

  return (
    <div className="flex">
      <div>
        <div>
          <Text className="mb-2 text-xl font-bold">{name}</Text>
        </div>
        <div className="mb-1">
          <Text>{credentialId}</Text>
        </div>
        <div className="mb-1">
          <Text>{organization}</Text>
        </div>
        <div className="mb-1">
          <Text>
            {moment(issuedDate).format('DD MMM YYYY')} {endDateData}
          </Text>
        </div>
      </div>
      <div>
        <div className="flex justify-end">
          {credentialUrl ? <Button onClick={handleViewResumeClick}>View Certificate</Button> : null}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
