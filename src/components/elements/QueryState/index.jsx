import Loader from '@/components/elements/Loader';
import Text from '@/components/elements/Text';

const QueryState = ({
  isLoading,
  isSuccess,
  isError,
  children,
  loader: LoaderComponent = <Loader size="medium" />,
  customError: ErrorComponent = <Text>Somethin went wrong</Text>
}) => (
  <>
    {isLoading ? LoaderComponent : null}

    {!isLoading && isSuccess ? children : null}

    {!isLoading && isError ? ErrorComponent : null}
  </>
);

export default QueryState;
