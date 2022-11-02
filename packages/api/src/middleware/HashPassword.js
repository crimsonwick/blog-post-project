import bcrypt from 'bcryptjs';
export const HashingPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
