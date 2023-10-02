import Image from 'next/image';
import { useParams } from 'next/navigation';

import LocationIcon from '@/assets/icons/location-icon.svg';
import EmailIcon from '@/assets/icons/mail_solid.svg';
import PhoneIcon from '@/assets/icons/phone_solid.svg';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord } from '@/lib/common';
import config from '@/lib/config';

const ApplicantsCard = ({ ...props }) => {
  const rangeSalary = props.user.salaryExpectation;

  const { resume } = props;

  const params = useParams();

  return (
    <div className="flex gap-3 rounded-lg bg-white px-4 py-5">
      <div className="relative h-20 w-20">
        <Image
          src={props.user.profile.avatar ?? config.defaultAvatar}
          alt="Company image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <Text className="text-2xl font-bold">{capitalEachWord(props.user.profile.name)}</Text>
        </div>

        <div>
          {rangeSalary ? (
            <div>
              <Text className="text-sm">
                Salary Expectation Rp. {toCurrency(rangeSalary, true)}
              </Text>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <LocationIcon className="text-gray-500" />
            <Text className="text-gray-500">
              {capitalEachWord(props.user.profile.address)},{' '}
              {capitalEachWord(props.user.profile.province)}
            </Text>
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <PhoneIcon className="text-gray-500" />
              <Text className="text-gray-500">{props.user.phoneNumber}</Text>
            </div>
            <div className="flex items-center gap-2">
              <EmailIcon className="text-gray-500" />
              <Text className="text-gray-500">{props.user.profile.email}</Text>
            </div>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info btn-outline btn-xs mt-2 self-start"
            >
              View resume
            </a>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="self-end">
              <a
                href={`/jobs/${params.slug}/applicants/${props.user.profile.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <Button>View Profile</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsCard;
