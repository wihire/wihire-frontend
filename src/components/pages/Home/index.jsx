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
    <div className="min-h-d-screen relative flex items-center">
      <CircleDecoration className="fixed bottom-0 left-0 -translate-x-1/4 translate-y-1/4 -rotate-90" />
      <CircleDecoration className="fixed right-0 top-0 -translate-y-1/4 translate-x-1/4 rotate-90" />

      <Logo className="fixed top-6" />

      <div className="w-1/2">
        <Header />

        <Text className="mb-10 mt-5 text-2xl">
          Unlock your full potential with your dream job
          <br />
          or find the perfect candidate for your company needs now
        </Text>
        <Button href="/register">JOIN NOW TO ACHIEVE YOUR OPPORTUNITY</Button>

        <Text className="my-2">or you can</Text>

        <Button href="/login" className="btn-outline bg-white">
          LOGIN TO YOUR EXISTING ACCOUNT
        </Button>
      </div>

      <div class="flex w-1/2 justify-center">
        <Image src={mondelOnBoard} width={500} height={500} alt="Onboard model" priority />
      </div>
    </div>
  </Container>
);

export default Home;
