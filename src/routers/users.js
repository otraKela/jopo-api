const express = require ('express');
const router = express.Router();

const usersController = require ('../controllers/usersController');
const imageUploadMiddleware = require ('../middleware/imageUploadMiddleware.js');

const nodeEnv = process.env.NODE_ENV || 'development';

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

router.get ( '/', usersController.list );
router.get ( '/:id', usersController.detail );
router.post ( '/login', usersController.login );

if (nodeEnv === "development") {
  router.post ( '/registration', imageUploadMiddleware.single('image'), usersController.registration );
} else {
  router.post ( '/registration', usersController.registration );
}


module.exports = router;