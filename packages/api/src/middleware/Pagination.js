import sequelize from 'sequelize';

export const getData = (req, res) => {
  const data = res.paginatedResults;
  return res.json(data);
};

export function PaginatedResults(model) {
  return async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const cursor = req.query.cursor;
    let results = {};
    try {
      results.data = await model.findAll({
        where: {
          createdAt: { [sequelize.Op.gte]: cursor },
        },
        limit: limit,
        order: [['createdAt', 'ASC']],
      });
      results.next = await compare(cursor, 'gt', limit, model);
      results.prev = await compare(cursor, 'lt', limit, model);
      res.paginatedResults = results;
      next();
    } catch (error) {
      console.log(error);
    }
  };
}

export const compare = async (cursor, condition, limit, model) => {
  if (condition === 'gt') {
    const { count, rows } = await model.findAndCountAll({
      where: {
        createdAt: {
          [sequelize.Op.gt]: cursor,
        },
      },
      limit: limit,
      order: [['createdAt', 'ASC']],
    });
    if (count <= limit) {
      return null;
    } else {
      return rows[rows.length - 1].createdAt;
    }
  } else {
    const { count, rows } = await model.findAndCountAll({
      where: {
        createdAt: {
          [sequelize.Op.lt]: cursor,
        },
      },
      limit: limit,
      order: [['createdAt', 'DESC']],
    });
    if (count === 0) {
      return null;
    } else {
      return rows[rows.length - 1].createdAt;
    }
  }
};
