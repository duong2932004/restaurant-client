export interface ErrorResponse {
  message: string;
  status: number;
}

export const handleServiceError = (
  error: any,
  defaultMessage: string
): ErrorResponse => {
  return {
    message: error.response?.data?.message || defaultMessage,
    status: error.response?.status || 500,
  };
};

export const isErrorResponse = (response: any): response is ErrorResponse => {
  return (
    response &&
    typeof response.message === "string" &&
    typeof response.status === "number"
  );
};

export const isSuccessResponse = <T>(
  response: T | ErrorResponse
): response is T => {
  return !isErrorResponse(response);
};
