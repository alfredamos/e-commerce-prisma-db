const Joi = require('joi');

const customerValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
});

const customerValidation = (customer) => {
    const {name, email, phone} = customer;

    return customerValidationSchema.validate({name, email, phone});
};

module.exports = customerValidation;