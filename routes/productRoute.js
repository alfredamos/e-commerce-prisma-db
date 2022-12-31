const router = require('express').Router();
const {
    createProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getProductById,
 } = require('../controllers/productController');

 const productValidationMiddleware = require('../middleware/productValidationMiddleware');


router.route('/')
    .get(getAllProducts)
    .post(productValidationMiddleware, createProduct);

router.route('/:id')
    .delete(deleteProduct)
    .get(getProductById)    
    .patch(productValidationMiddleware, editProduct);


module.exports = router;