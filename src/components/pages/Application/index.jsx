import Image from 'next/image';

import ChevronLDoubleLeft from '@/assets/icons/chevron-double-left.svg';
import ChevronDoubleRight from '@/assets/icons/chevron-double-right.svg';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import ChevronRight from '@/assets/icons/chevron-right.svg';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import ApplicationFilters from '@/components/parts/Application/Filters';

const Application = () => (
  <Container>
    <Text as="h2" typography="h2">
      Applications
    </Text>

    <div className="my-5 flex gap-2.5 ">
      <Button className="btn-outline btn-sm rounded-full">All</Button>
      <Button className="btn-outline btn-sm rounded-full">On Progress</Button>
      <Button className="btn-outline btn-sm rounded-full">On Review</Button>
      <Button className="btn-outline btn-sm rounded-full">Accepted</Button>
      <Button className="btn-outline btn-sm rounded-full">Declined</Button>
      <div className="text-primary border border-primary px-4 py-1 rounded-full flex">
        On Review
      </div>
    </div>

    <ApplicationFilters />

    <div className="bg-white p-3 rounded-md flex flex-wrap justify-between">
      <div className="flex flex-row gap-3 ">
        <Image
          className="border-xl self-start "
          src="/images/logo.png"
          alt="Movie"
          width={80}
          height={80}
        />

        <div className="flex flex-col gap-2">
          <div>
            <Text as="h3" typography="h3" className="text-primary">
              English Marketing Media Evaluator in Indonesia
            </Text>
            <Text typography="sm">PT. Mencari Cinta sejati</Text>
          </div>

          <div>
            <Text typography="sm" className="text-gray-500">
              South Jakarta(onsite) - Fulltime
            </Text>
            <Text typography="sm" className="text-gray-500">
              9.000.000-10.000.000 IDR / month
            </Text>
          </div>

          <div>
            <Text typography="xs" className="text-gray-500">
              1 day ago
            </Text>
          </div>
        </div>
      </div>

      <div className="rounded-full bg-warning">
        <div className="text-white">On Review</div>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="my-8 grid grid-cols-5 place-items-center bg-white gap-1 rounded-md">
        <Button className="btn-ghost no-animation">
          <ChevronLDoubleLeft className="text-primary" />
        </Button>

        <Button className="btn-ghost no-animation">
          <ChevronLeft className="text-primary" />
        </Button>

        <select className="select select-xs max-w-xs">
          <option selected>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <Button className="btn-ghost no-animation">
          <ChevronRight className="text-primary" />
        </Button>

        <Button className="btn-ghost no-animation">
          <ChevronDoubleRight className="text-primary" />
        </Button>
      </div>
    </div>
  </Container>
);
export default Application;

// TODO: create parts/Application/Filter
// TODO: create parts/Application/Options

// TODO: map in the parent component
// TODO: create an array for the filter options

// TODO: identify the pathname
// TODO: create class name for when it is focused
// TODO: create the "button" (the flex thingy)
// TODO: twmerge with the "button"
// TODO: create conditional (ternary)
