/* eslint-disable max-len */

import dynamic from 'next/dynamic';

import mondelOnBoard from '@/assets/images/illustrations/onboard.png';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Image from '@/components/elements/Image';
import Logo from '@/components/elements/Logo';
import Text from '@/components/elements/Text';
import Header from '@/components/parts/Home/Home';

const CircleDecoration = dynamic(() => import('@/assets/vectors/circle-decoration.svg'));

const Home = () => (
  <Container>
    <CircleDecoration className="fixed bottom-0 left-0 z-0 hidden -translate-x-1/4 translate-y-1/4 -rotate-90 md:inline" />
    <CircleDecoration className="fixed right-0 top-0 z-0 hidden -translate-y-1/4 translate-x-1/4 rotate-90 md:inline" />

    <div className="min-h-d-screen relative grid grid-cols-1 place-content-center gap-10 py-14 lg:grid-cols-2 lg:gap-0">
      <Logo size="md" className="absolute left-0 top-10" />

      <Image
        src={mondelOnBoard}
        width={500}
        height={500}
        alt="Onboard model"
        priority
        className="w-1/2 justify-self-center lg:w-[500px] lg:justify-self-end"
      />

      <div className="order-last h-fit text-center lg:order-first lg:self-center lg:text-left">
        <Header />

        <Text typography="md" className="my-5">
          Unlock your full potential with your dream job <br className="hidden sm:block" />
          or find the perfect candidate for your company needs now
        </Text>
        <Button href="/register">Begin Your Future Here</Button>

        <Text className="my-2">or you can</Text>

        <Button href="/login" className="btn-outline">
          Login To Your Existing Account
        </Button>
      </div>
    </div>
  </Container>
);

export default Home;
