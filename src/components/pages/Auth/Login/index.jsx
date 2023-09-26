import Container from '@/components/elements/Container';
import './styles.scss';
import Image from 'next/image';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import Button from '@/components/elements/Button';
import Logo from '@/components/elements/Logo';
import Text from '@/components/elements/Text';
import LoginIlustration from '@/assets/images/ilustrations/Authentication-rafiki 1.png';
import Link from 'next/link';

const Login = () => (
  <Container className="flex flex-col md:flex-row h-screen items-center py-10">
    <div className=" flex items-center justify-center mx-auto lg:block w-full md:w-1/2  ">
      <Image src={LoginIlustration} width={500} height={500} />
    </div>
    <div
      className="bg-white w-full md:max-w-md lg:max-w-full mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-full px-6 lg:px-16 xl:px-12
          flex items-center justify-center rounded-lg"
    >
      <form className="w-full">
        <div className="flex justify-center mb-20">
          <Logo />
        </div>
        <div className="flex justify-center mb-20">
          <Text className="text-neutral-400">Login to your account</Text>
        </div>
        <div>
          <FormControl isBlock="true" htmlFor="email" label="Email">
            <TextInput isBlock="true" id="email" type="email" placeholder="Enter your email" />
          </FormControl>
        </div>
        <div>
          <FormControl isBlock="true" htmlFor="password" label="Password">
            <TextInput
              isBlock="true"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>
        </div>
        <div className="flex justify-end">
          {/* <Button className="btn-link">Forgot Password?</Button> */}
          <FormControl
            htmlFor="forgot password"
            descriptionAlt={
              <Link className="text-primary" href="/auth/forgot-password">
                Forgot Password?
              </Link>
            }
            className="flex justify-end items-end"
          />
        </div>
        <Button className="w-full mt-5">Login</Button>
        <div className="flex justify-center mt-44">
          <Text className="text-gray-700">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary">
              Register
            </Link>
          </Text>
        </div>
      </form>
    </div>
  </Container>
);

export default Login;
