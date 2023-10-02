import Text from '@/components/elements/Text';

const ProfileSection = ({ title, children }) => (
  <section className="flex flex-col rounded-md bg-white p-8">
    <Text typography="h3" className="mb-2">
      {title}
    </Text>

    {children}
  </section>
);

export default ProfileSection;
