/* eslint-disable max-len */
import Image from 'next/image';

import mondelOnBoard from '@/assets/images/illustrations/onboard.png';
import CircleDecoration from '@/assets/vectors/circle-decoration.svg';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Logo from '@/components/elements/Logo';
import Text from '@/components/elements/Text';
import Header from '@/components/parts/Home/Home';

const Home = () => (
  <Container>
    <div className="min-h-d-screen relative flex flex-col items-center md:flex-col lg:flex-row-reverse">
      <CircleDecoration className="fixed bottom-0 left-0 z-0 hidden -translate-x-1/4 translate-y-1/4 -rotate-90 sm:inline" />
      <CircleDecoration className="fixed right-0 top-0 z-0 hidden -translate-y-1/4 translate-x-1/4 rotate-90 sm:inline" />

      <Logo
        size="md"
        className="fixed left-6 top-6 z-10  p-2 md:absolute md:left-0 md:right-auto"
      />

      <div className="z-10 mb-8 mt-24 flex w-1/2 justify-center lg:my-[-32px]">
        <Image src={mondelOnBoard} width={500} height={500} alt="Onboard model" priority />
      </div>

      <div className="z-10 mb-12 w-full text-center lg:mb-[-48px] lg:w-1/2 lg:text-left">
        <Header />

        <Text className="my-5 text-xs md:mb-10 md:text-xl lg:text-2xl">
          Unlock your full potential with your dream job
          <br />
          or find the perfect candidate for your company needs now
        </Text>
        <Button href="/register" className="btn btn-sm md:btn-md">
          JOIN NOW TO ACHIEVE YOUR OPPORTUNITY
        </Button>

        <Text className="my-2 text-xs md:text-sm lg:text-base">or you can</Text>

        <Button href="/login" className="btn btn-outline btn-sm bg-white md:btn-md">
          LOGIN TO YOUR EXISTING ACCOUNT
        </Button>
      </div>
    </div>
  </Container>
);

export default Home;
