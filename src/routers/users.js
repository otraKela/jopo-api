const express = require ('express');
const router = express.Router();
const cors = require('cors');

const usersController = require ('../controllers/usersController');
const imageUploadMiddleware = require ('../middleware/imageUploadMiddleware.js');

const nodeEnv = process.env.NODE_ENV || 'development';

const corsOptions = {
  origin: 'https://jopo-react.netlify.app/',
  preflightContinue,
  optionsSuccessStatus: 200 
}

router.options('*', cors());

router.get ( '/', usersController.list );
router.get ( '/:id', usersController.detail );
router.post ( '/login', usersController.login );

if (nodeEnv === "development") {
  router.post ( '/registration', 
                imageUploadMiddleware.single('image'), 
                cors(corsOptions),
                usersController.registration );
} else {
  router.post ( '/registration', 
              cors(corsOptions),
              usersController.registration );
}


module.exports = router;