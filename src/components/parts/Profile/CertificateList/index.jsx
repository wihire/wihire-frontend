import Text from '@/components/elements/Text';
import CertificateCard from '@/components/parts/Profile/CertificateCard';

const ListCertificate = ({ certificates }) => (
  <div className="flex flex-col rounded-md bg-white px-4 py-5">
    <Text className="mb-3 text-2xl font-bold">Certificate</Text>
    {certificates?.map((certificate, index) => (
      <>
        {index !== 0 ? <div className="divider" /> : null}
        <CertificateCard key={certificate.id} {...certificate} />
      </>
    ))}
  </div>
);

export default ListCertificate;
