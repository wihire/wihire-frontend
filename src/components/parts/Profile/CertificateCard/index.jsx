'use client';

import moment from 'moment';

import Text from '@/components/elements/Text';

const CertificateCard = ({
  name,
  credentialId,
  organization,
  issuedDate,
  expiredDate,
  credentialUrl
}) => (
  <div>
    <Text as="h3" className="font-medium">
      {name}
    </Text>

    <Text>{organization}</Text>

    {issuedDate || expiredDate ? (
      <Text typography="xs" className="text-gray-500">
        {issuedDate ? `Issued ${moment(issuedDate).format('MMM YYYY')}` : null}
        {expiredDate
          ? `${issuedDate ? ' - ' : ''}Expired ${moment(expiredDate).format('MMM YYYY')}`
          : null}
      </Text>
    ) : null}

    {credentialId ? (
      <Text typography="xs" className="text-gray-500">
        Credential ID: {credentialId}
      </Text>
    ) : null}

    {credentialUrl ? (
      <a
        href={credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-info btn-outline btn-xs mt-2"
      >
        View credential
      </a>
    ) : null}
  </div>
);

export default CertificateCard;
