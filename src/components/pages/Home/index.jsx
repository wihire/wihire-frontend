import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Model from '@/assets/images/ilustrations/onboard.png';
import Bulat from '@/assets/images/ilustrations/bulat.png';
import Image from 'next/image';

const Home = () => (
  <Container>
    <div className="h-screen flex items-center relative">
      <div className="fixed -mb-[650px] -ml-[100px]">
        <Image src={Bulat} />
      </div>
      <div className="fixed rotate-180 ml-[1100px] mb-[550px]">
        <Image src={Bulat} />
      </div>
      <div className="w-1/2 pl-20 ">
        <div className="">
          <h1 className="text-7xl text-primary font-bold mb-5">Find Your</h1>
          <h2 className="text-5xl font-bold mb-5">Dream Job</h2>
          <h3 className="text-2xl mb-5">
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
      <div class="w-1/2 pr-20 flex justify-center">
        <Image src={Model} width={450} height={450} />
      </div>
    </div>
  </Container>
);

export default Home;
