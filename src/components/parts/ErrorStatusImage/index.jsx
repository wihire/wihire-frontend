import emptyIllustration from '@/assets/images/illustrations/empty.png';
import notFoundIllustration from '@/assets/images/illustrations/not-found-error.png';
import questionsIllustration from '@/assets/images/illustrations/questions.png';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';

const IMAGE_ERROR = {
  EMPTY: {
    src: emptyIllustration,
    alt: 'Empty illustration'
  },
  NOT_FOUND: {
    src: notFoundIllustration,
    alt: 'Not found illustration'
  },
  GENERAL: {
    src: questionsIllustration,
    alt: 'Error illustration'
  }
};

const ErrorStatusImage = ({ errorType, message, className }) => (
  <div className={className}>
    <Image
      src={IMAGE_ERROR[errorType]?.src}
      alt={IMAGE_ERROR[errorType]?.alt ?? 'Error illustration'}
      width={300}
      height={300}
      className="mx-auto"
    />

    <Text typography="h4" className="mt-2 text-center">
      {message}
    </Text>
  </div>
);

export default ErrorStatusImage;
