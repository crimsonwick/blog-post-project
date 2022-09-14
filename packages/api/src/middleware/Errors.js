export const ErrorHandling = (res) => {
  const error = new Error();
  error.status = 400;
  error.message = "Something bad occur";
  return res.json(error);
};
