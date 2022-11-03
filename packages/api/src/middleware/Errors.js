/**
 * Handles Error throughout the controllers
 * @param {*} res
 * @param {*} status
 * @returns JSON
 */
export const errorHandling = (status) => {
  const error = { message: '' };

  switch (status) {
    case 400:
      error.message = 'Bad request';
      break;
    case 401:
      error.message = 'Invalid Authentication Credentials';
      break;
    case 402:
      error.message = 'Account alredy exist';
      break;
    case 403:
      error.message = 'User Not Found';
    case 404:
      error.message = 'Something bad occur';
    default:
  }

  return error.message;
};
