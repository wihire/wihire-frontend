import Text from '@/components/elements/Text';
import MapPinIcon from '@/assets/icons/map-pin_solid.svg';
import BriefCaseIcon from '@/assets/icons/briefcase_solid.svg';
import ClockIcon from '@/assets/icons/clock_solid.svg';
import BankNotesIcon from '@/assets/icons/banknotes_solid.svg';
import Button from '@/components/elements/Button';

const JobDetails = ({ slug }) => {
  console.log(slug.params, '<<<<<<<<<<<<<<<');
  return (
    <div className="bg-gray-200 p-8 rounded-md">
      <div className="grid grid-cols-2">
        <div>
          <Text typography={'h2'}>Fullstack Web Developer</Text>

          <div className="flex gap-5 ">
            <Text className="text-primary">Unitech Indonesia</Text>
            <Text>1 - 50 employee</Text>
          </div>

          <div>
            <Text className="text-gray-500">Posted 2 days ago</Text>
          </div>
        </div>

        <div className="flex justify-end">2</div>

        <div className="mt-5">
          <div className="flex items-center gap-3">
            <MapPinIcon />
            <Text>South Jakarta</Text>
          </div>

          <div className="flex items-center gap-3">
            <BriefCaseIcon />
            <Text>Job Type</Text>
          </div>

          <div className="flex items-center gap-3">
            <ClockIcon />
            <Text>Job Type</Text>
          </div>

          <div className="flex items-center gap-3">
            <BankNotesIcon />
            <Text>Salary</Text>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <Button className="px-10">Apply</Button>
        </div>
        <div className="flex justify-end gap-3">
          <Button className="btn btn-outline btn-primary px-8">Save</Button>
          <Button className="btn btn-outline btn-primary px-8">Share</Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
