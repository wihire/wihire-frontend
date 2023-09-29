import Profile from '@/components/pages/Profile';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Profile'
  },
  {
    withSuffix: true
  }
);

const ProfilePage = () => <Profile />;

export default ProfilePage;
