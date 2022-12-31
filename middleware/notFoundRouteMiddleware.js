const {StatusCodes} = require('http-status-codes');

const notFoundRouteMiddleware = (req, res, next) => res.status(StatusCodes.NOT_FOUND).json({
    message: 'Route does not exist',
});

module.exports = notFoundRouteMiddleware;
