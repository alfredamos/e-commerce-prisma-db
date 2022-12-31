const customerValidation = require('../validations/customerValidation');
const BadRequestError = require('../errors/badRequestError');

const customerValidationMiddleware = (req, res, next) => {
    const {body: customer} = req;
    const {error, value} = customerValidation(customer);

    if (error){
        let errorMessages = [];

        for (const err of error.details){
            errorMessages.push(err.message);
        }

        throw new BadRequestError(errorMessages);
    }

    next();
};

module.exports = customerValidationMiddleware;