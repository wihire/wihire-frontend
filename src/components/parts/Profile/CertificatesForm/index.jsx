'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import CertificateUpdateForm from '@/components/parts/Profile/CertificateUpdateForm';
import { useProfile } from '@/query/profile';

const CertificatesForm = () => {
  const params = useParams();

  const { data: profileData } = useProfile(params.profileSlug);

  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  return (
    <div>
      {profile?.user.certificates.length > 0 ? (
        <div>
          {profile?.user.certificates.map((certificate) => (
            <CertificateUpdateForm key={certificate.id} {...certificate} />
          ))}
        </div>
      ) : (
        <Text>You don&apos;t have certificates</Text>
      )}
    </div>
  );
};

export default CertificatesForm;
