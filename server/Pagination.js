const addNavigation = (ret, total, page, limit) => {
    const startIndex = (page - 1) * limit;
    if (limit) ret.limit = limit;
    if (startIndex + limit < total) ret.nextPage = page + 1;
    if (startIndex + 2 * limit < total) ret.nextToNextPage = page + 2;
    if (startIndex > 0) ret.previousPage = page - 1;
    if (startIndex - limit > 0) ret.prevToPrevPage = page - 2;
};

const paginate = (data, page, limit) => {
    const ret = {};
    const total = data.length;
    addNavigation(ret, total, page, limit);
    ret.data = data.splice((page - 1) * limit, limit);
    return ret;
};

const paginateByRequest = (data, req) => {
    return paginate(data, parseInt(req.query.page), parseInt(req.query.limit));
};

const paginationMiddleware = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const ret = {};
    const total = await model.countDocuments().exec();
    addNavigation(ret, total, page, limit);
    model
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .exec()
        .then((data) => {
            ret.data = data;
            req.paginatedData = ret;
            next();
        })
        .catch((e) => res.status(500).json({ message: e.message }));
};

module.exports = {
    paginate,
    paginateByRequest,
    paginationMiddleware,
};
