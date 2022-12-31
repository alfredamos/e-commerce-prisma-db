const orderValidation = require('../validations/orderValidation');
const BadRequestError = require('../errors/badRequestError');

const orderValidationMiddleware = (req, res, next) => {
    const {body: order} = req;
    const {error, value} = orderValidation(order);

    if (error){
        let errorMessages = [];

        for (const err of error.details){
            errorMessages.push(err.message);
        }

        throw new BadRequestError(errorMessages);
    }

    next();
};

module.exports = orderValidationMiddleware;