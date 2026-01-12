

export const authErrorMessage = (error: string) => {

  const errorMessage: Record<string, string> = {
    AccessDenied: "",
    CredentialsSignin: "ERR_002",
    SessionRequired: "ERR_003"
  };
  return errorMessage[error] || '';
}

export const errorMessage = (error: string) => {
  const statusName: Record<string, string> = {
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    401: 'Unauthorized',
    400: 'Bad Request',
    409: 'Conflict',
    405: 'Method Not Allowed',
  }
  return statusName[error] || '';
};