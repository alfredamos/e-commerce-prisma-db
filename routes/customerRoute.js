const router = require('express').Router();
const {
    createCustomer,
    deleteCustomer,
    editCustomer,
    getAllCustomers,
    getCustomerById,
 } = require('../controllers/customerController');

 const customerValidationMiddleware = require('../middleware/customerValidationMiddleware');


router.route('/')
    .get(getAllCustomers)
    .post(customerValidationMiddleware, createCustomer);

router.route('/:id')
    .delete(deleteCustomer)
    .get(getCustomerById)    
    .patch(customerValidationMiddleware, editCustomer);


module.exports = router;