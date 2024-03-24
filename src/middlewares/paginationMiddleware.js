const { DEFAULT_PAGINATION_LIMIT } = require("../config");

function paginationMiddleware(req, res, next) {
  const page = Number(req.query.page || 1) - 1;
  const limit = Number(req.query.limit || DEFAULT_PAGINATION_LIMIT);

  const getPaginationInfo = async (model) => {
    const role = "Admin";
    let totalItems;
    if (role === "Admin") {
      totalItems = await model.count({
        paranoid: false,
      });
    }
    if (role === "Estudiante") {
      totalItems = await model.count({});
    }

    console.log(totalItems);
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page + 1;

    return {
      totalItems,
      totalPages,
      currentPage,
    };
  };

  req.pagination = {
    order: ["courseId"],
    offset: page * limit,
    limit,
  };

  req.getPaginationInfo = getPaginationInfo;

  next();
}

module.exports = {
  paginationMiddleware,
};
