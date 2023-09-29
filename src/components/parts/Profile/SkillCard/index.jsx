'use client';

import Text from '@/components/elements/Text';

const SkillCard = ({ title, level }) => (
  <div>
    <div>
      <Text className="mb-2 text-xl font-bold">{title}</Text>
    </div>
    <div className="mb-1">
      <Text>{level}</Text>
    </div>
  </div>
);

export default SkillCard;
