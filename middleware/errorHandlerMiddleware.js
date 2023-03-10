const {StatusCodes} = require('http-status-codes');
const CustomErrorApi = require('../errors/customErrorApi');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomErrorApi){
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong.',
    });

};

module.exports = errorHandlerMiddleware;