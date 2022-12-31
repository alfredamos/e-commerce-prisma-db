const Joi = require('joi');

const orderValidationSchema = Joi.object({
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
});

const orderValidation = (order) => {
    const {customerId, productId, quantity} = order;

    return orderValidationSchema.validate({customerId, productId, quantity});
};

module.exports = orderValidation;