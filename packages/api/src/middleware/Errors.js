/**
 * Error Handling Middleware
 * @param {*} res 
 * @param {*} status 
 * @returns 
 */
export const ErrorHandling = (res, status = 500) => {
  const error = { status, message: "" };

  switch (status) {
    case 400:
      error.status = 400;
      error.message = "Bad request";
      break;
    case 401:
      error.status = 401;
      error.message = "Invalid Authentication Credentials";
      break;
    case 402:
      error.status = 402;
      error.message = "Payment Required";
      break;
    case 403:
      error.status = 403;
      error.message = "Forbidden response";
    default:
      404;
      error.status = 404;
      error.message = "User Not Found";
  }

  return res.json(error);
};
