const express = require ('express');

const productsApiController = require ('../controllers/productsController');

const router = express.Router();

router.get ( '/', productsApiController.list );
router.get ( '/categories', productsApiController.categoryList );
router.get ( '/:id', productsApiController.detail );
 

module.exports = router;