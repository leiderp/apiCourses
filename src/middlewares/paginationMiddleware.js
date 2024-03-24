const { DEFAULT_PAGINATION_LIMIT } = require("../config");
const { ROLES } = require("../config/constants");

function paginationMiddleware(req, res, next) {
  const page = Number(req.query.page || 1) - 1;
  const limit = Number(req.query.limit || DEFAULT_PAGINATION_LIMIT);
  const { role } = req.user;
  const getPaginationInfo = async (model) => {

    let totalItems;
    if (role === ROLES.admin) {
      totalItems = await model.count({
        paranoid: false,
      });
    }
    
    if (role === ROLES.estudiante) {
      totalItems = await model.count();
    }

    console.log(totalItems, role);
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
