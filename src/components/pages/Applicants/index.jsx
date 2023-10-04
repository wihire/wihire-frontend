import Text from '@/components/elements/Text';
import ButtonRejectAll from '@/components/parts/Jobs/ApplicantButton';
import ApplicantsList from '@/components/parts/Jobs/ApplicantsList';

const Applicants = () => (
  <div>
    <div className="flex items-center justify-between gap-3">
      <Text as="h1" typography="h2">
        Applicants
      </Text>

      <ButtonRejectAll />
    </div>

    <ApplicantsList />
  </div>
);

export default Applicants;
