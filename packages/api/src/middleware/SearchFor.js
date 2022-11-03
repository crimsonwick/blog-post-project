export const SearchFor = (role) => {
  return async (req, res, next) => {
    req.type = role;
    next();
  };
};
