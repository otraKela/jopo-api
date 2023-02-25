const express = require ('express');
const router = express.Router();

const usersController = require ('../controllers/usersController');

router.get ( '/', usersController.list );
router.post ( '/', usersController.registration );
router.get ( '/:id', usersController.detail );
router.post ( '/login', usersController.login );
router.get ( '/logout', usersController.logout );


module.exports = router;