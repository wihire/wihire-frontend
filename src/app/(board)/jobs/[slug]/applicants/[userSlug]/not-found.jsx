'use client';

import Button from '@/components/elements/Button';
import ErrorStatusImage from '@/components/parts/ErrorStatusImage';

const NotFound = () => (
  <div className="mt-5 flex flex-col items-center gap-5">
    <ErrorStatusImage
      errorType="NOT_FOUND"
      message="Job or applicant you were looking for was not found"
    />
    <Button href="/jobs">Back to jobs</Button>
  </div>
);

export default NotFound;
