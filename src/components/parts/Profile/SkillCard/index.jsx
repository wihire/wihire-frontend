'use client';

import { useMemo } from 'react';

import cx from 'classnames';

const SkillCard = ({ skill, level }) => {
  const badgeColor = useMemo(() => {
    switch (level) {
      case 'BEGINNER':
        return 'badge-info';
      case 'INTERMEDIATE':
        return 'badge-success';
      case 'EXPERT':
        return 'badge-error';
      default:
        return 'badge-nneutral';
    }
  }, [level]);

  return (
    <li className="ml-5 list-disc">
      {skill.title}
      <div className={cx('badge badge-outline ml-2', badgeColor)}>{level.toLowerCase()}</div>
    </li>
  );
};

export default SkillCard;
