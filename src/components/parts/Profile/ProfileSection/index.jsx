import Text from '@/components/elements/Text';

const ProfileSection = ({ title, children, rightButton }) => (
  <section className="flex flex-col rounded-md bg-white p-8">
    <div className="flex items-center justify-between">
      <Text typography="h3" className="mb-2">
        {title}
      </Text>

      {rightButton}
    </div>

    {children}
  </section>
);

export default ProfileSection;
