const Joi = require('joi');

const productValidationSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    description: Joi.string().required(),
});

const productValidation = (product) => {
    const {name, category, description, price, quantity} = product;

    return productValidationSchema.validate({name, category, description, price, quantity});
};

module.exports = productValidation;