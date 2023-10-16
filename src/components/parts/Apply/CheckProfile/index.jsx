import ProfileUser from '@/components/parts/Profile';

const CheckProfile = ({ profile }) => (
  <ProfileUser withoutResume hideBirthDate withoutEdit profile={profile} />
);

export default CheckProfile;
