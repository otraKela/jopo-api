const express = require ('express');

const productsController = require ('../controllers/productsController');

const router = express.Router();

router.get ( '/', productsController.list );
router.get ( '/categories', productsController.categoryList );
router.get ( '/:id', productsController.detail );
 

module.exports = router;