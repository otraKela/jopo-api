const multer = require ('multer');
const path = require ('path');

const envVariables= require('../../env-variables.json');
const nodeEnv = process.env.NODE_ENV || 'development';

const storage = multer.diskStorage (
  {
    destination:( req, file, cb ) => {
        const destinationPath =  envVariables[nodeEnv].PROFILE_PICTURE_FOLDER;
        cb (null, destinationPath);
    },

    filename:( req, file, cb )=>{
        const imageFileName = file.originalname;
        cb (null, imageFileName);
    }
  });


const fileFilter = (req, file, cb) => { 

  const accepted = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (accepted.includes (file.mimetype)) { 
      cb(null,true)
  } else { 
      cb(null,false) 
  }};
 
let upload = multer ( { storage, fileFilter} );


module.exports = upload;
