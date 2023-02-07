const express = require ('express');

const usersApiController = require ('../controllers/usersController');

const router = express.Router();

router.get ( '/', usersApiController.list );
router.get ( '/:id', usersApiController.detail );


module.exports = router;