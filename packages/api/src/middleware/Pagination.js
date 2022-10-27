import model from '../models';
const { Comments, Users } = model;

export const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 3;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const allComments = await Comments.findAll({
      where: {
        postId: req.params.id,
        parentId: null,
      },
      include: {
        model: Users,
        as: 'commentedBy',
      },
    });
    return res.json(allComments);

    if (endIndex < (await Comments.findAll())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.results = await model
        .findAll()
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
