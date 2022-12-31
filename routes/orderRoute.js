const router = require('express').Router();
const {
    createOrder,
    deleteOrder,
    editOrder,
    getAllOrders,
    getOrderById,
 } = require('../controllers/orderController');

 const orderValidationMiddleware = require('../middleware/orderValidationMiddleware');


router.route('/')
    .get(getAllOrders)
    .post(orderValidationMiddleware, createOrder);

router.route('/:id')
    .delete(deleteOrder)
    .get(getOrderById)    
    .patch(orderValidationMiddleware, editOrder);


module.exports = router;