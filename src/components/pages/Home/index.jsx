/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from 'next/image';

import Bulat from '@/assets/images/ilustrations/bulat.png';
import Model from '@/assets/images/ilustrations/onboard.png';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';

const Home = () => (
  <Container>
    <div className="relative flex h-screen items-center">
      <div className="fixed -mb-[650px] -ml-[100px]">
        <Image src={Bulat} alt="" />
      </div>
      <div className="fixed mb-[550px] ml-[1100px] rotate-180">
        <Image src={Bulat} alt="" />
      </div>
      <div className="w-1/2 pl-20 ">
        <div className="">
          <h1 className="mb-5 text-7xl font-bold text-primary">Find Your</h1>
          <h2 className="mb-5 text-5xl font-bold">Dream Job</h2>
          <h3 className="mb-5 text-2xl">
            Unlock your full potential with your dream job or find the perfect candidate for your
            company needs now
          </h3>
          <Button href="/register">JOIN NOW TO ACHIEVE YOUR OPPORTUNITY</Button>
          <h1 className="my-2">or you can</h1>
          <Button href="/login" className="btn-outline bg-white">
            LOGIN TO YOUR EXISTING ACCOUNT
          </Button>
        </div>
      </div>
      <div class="flex w-1/2 justify-center pr-20">
        <Image src={Model} width={450} height={450} alt="" />
      </div>
    </div>
  </Container>
);

export default Home;
