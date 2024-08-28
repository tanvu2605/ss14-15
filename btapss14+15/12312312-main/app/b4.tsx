import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";

interface ErrorPageProps {
  data?: any;
  errorCode?: number;
  errorMessage?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("https://example.com/invalid-endpoint");
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    let errorCode = axiosError.response?.status || 500;
    let errorMessage = "An unexpected error occurred.";

    if (axiosError.response?.status === 404) {
      errorMessage = "The requested resource was not found.";
    } else if (axiosError.response?.status === 500) {
      errorMessage = "Internal server error. Please try again later.";
    }

    return {
      props: {
        errorCode,
        errorMessage,
      },
    };
  }
};

const ErrorHandlingPage: React.FC<ErrorPageProps> = ({
  data,
  errorCode,
  errorMessage,
}) => {
  if (errorCode) {
    return (
      <div>
        <h1>Error {errorCode}</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Data fetched successfully</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ErrorHandlingPage;
