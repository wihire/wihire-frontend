import CertificateCard from '@/components/parts/Profile/CertificateCard';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const ListCertificate = ({ certificates }) => (
  <ProfileSection title="Certificates">
    {certificates?.map((certificate, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <CertificateCard key={certificate.id} {...certificate} />
      </>
    ))}
  </ProfileSection>
);

export default ListCertificate;
