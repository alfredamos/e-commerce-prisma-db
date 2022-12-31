const productValidation = require('../validations/productValidation');
const BadRequestError = require('../errors/badRequestError');

const productValidationMiddleware = (req, res, next) => {
    const {body: product} = req;
    const {error, value} = productValidation(product);

    if (error){
        let errorMessages = [];

        for (const err of error.details){
            errorMessages.push(err.message);
        }

        throw new BadRequestError(errorMessages);
    }

    next();
};

module.exports = productValidationMiddleware;