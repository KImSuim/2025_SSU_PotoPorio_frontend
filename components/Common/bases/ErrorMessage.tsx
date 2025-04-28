const ErrorMessage = ({ error }: { error: string }) => {
  return <p className="text-red-500 text-sm mt-1">{error}</p>;
};

export default ErrorMessage;
