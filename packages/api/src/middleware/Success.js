export const successHandling = (status) => {
  const success = { message: '' };

  switch (status) {
    case 200:
      success.message = 'OK, Check your Email';
      break;
    case 201:
      success.message = 'Password updated';
  }

  return success.message;
};
