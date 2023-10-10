import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import Button from '@/components/elements/Button';
import CertificateCard from '@/components/parts/Profile/CertificateCard';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const ListCertificate = ({ profile, certificates }) => {
  const { data: loggedData, status } = useSession();

  return (
    <ProfileSection
      title="Certificates"
      rightButton={
        status === 'authenticated' && loggedData?.profile?.id === profile?.id ? (
          <Button href={`${profile.slug}/user/certificates`} className="btn-ghost">
            <PencilIcon className="text-base" />
          </Button>
        ) : null
      }
    >
      {certificates?.map((certificate, index) => (
        <>
          {index !== 0 ? <div className="divider" /> : null}
          <CertificateCard key={certificate.id} {...certificate} />
        </>
      ))}
    </ProfileSection>
  );
};

export default ListCertificate;
