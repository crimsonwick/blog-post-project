export const getData = (req, res) => {
  const data = res.paginatedResults;
  return res.json(data);
};

export function PaginatedResults(model, associatedModel, alias) {
  return async (req, res, next) => {
    const commentCursor = parseInt(req.query.commentCursor);
    const limit = parseInt(req.query.limit);

    const startIndex = (commentCursor - 1) * limit;
    const endIndex = commentCursor * limit;

    const results = {};

    const { count, rows } = await model.findAndCountAll({
      where: {
        parentId: null,
        postId: req.params.id,
      },
      offset: startIndex,
      limit: limit,
      include: {
        model: associatedModel,
        as: alias,
      },
    });

    if (endIndex < count) {
      results.next = {
        commentCursor: commentCursor + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        commentCursor: commentCursor - 1,
        limit: limit,
      };
    }
    try {
      results.results = await rows;
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
