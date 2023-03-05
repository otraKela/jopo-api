const express = require ('express');
const router = express.Router();

const usersController = require ('../controllers/usersController');

router.get ( '/', usersController.list );
router.get ( '/:id', usersController.detail );
router.post ( '/login', usersController.login );
router.post ( '/registration', usersController.registration );
router.get ( '/logout', usersController.logout );


module.exports = router;