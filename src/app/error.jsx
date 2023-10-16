'use client';

import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import ErrorStatusImage from '@/components/parts/ErrorStatusImage';

const GlobalError = ({ error, reset }) => (
  <Container as="main" className="min-h-d-screen grid place-content-center">
    <div
      className="w-full max-w-[500px] rounded-md border-gray-100
          bg-white p-4 text-center md:border md:p-14"
    >
      <ErrorStatusImage errorType="GENERAL" message={error?.message ?? 'An error occurred'} />

      <div className="mt-10 flex justify-center gap-5">
        <Button onClick={reset} className="btn-outline">
          Try again
        </Button>
        <Button href="/">Home</Button>
      </div>
    </div>
  </Container>
);

export default GlobalError;
