import { JOB_TYPE } from './common';

export const GENDER_OPTIONS = [
  {
    value: 'MALE',
    label: 'Male'
  },
  {
    value: 'FEMALE',
    label: 'Female'
  }
];

export const JOB_TYPE_OPTIONS = [
  { value: 'FULLTIME', label: JOB_TYPE.FULLTIME },
  { value: 'PARTTIME', label: JOB_TYPE.PARTTIME },
  { value: 'INTERNSHIP', label: JOB_TYPE.INTERNSHIP },
  { value: 'CONTRACT', label: JOB_TYPE.CONTRACT }
];

export const PLACE_METHOD_OPTIONS = [
  { value: 'ONSITE', label: 'Onsite' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'HYBRID', label: 'Hybrid' }
];
