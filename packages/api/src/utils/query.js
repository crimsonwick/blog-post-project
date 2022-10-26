

export const findPost = () => {
    const posts = await Posts.findAll({
        where: { userId: id },
        limit: limit + 1,
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Users,
            as: 'Posted_By',
            attributes: ['email', 'avatar'],
          },
          {
            model: Comments,
            as: 'Comments',
          },
        ]}
}
