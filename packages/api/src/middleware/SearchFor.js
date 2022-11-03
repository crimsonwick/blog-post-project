export const getSearchData = (req, res) => {
  const data = req.search;
  return res.json(data);
};

export function SearchFor(role) {
  return async (req, res, next) => {
    req.type = role;
    next();
  };
}
