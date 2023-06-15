const db = require('../database/models')

const envVariables= require('../../env-variables.json');
const nodeEnv = process.env.NODE_ENV || 'development';

const bcrypt = require('bcryptjs');

const obtainJwt = require ('../services/obtainJwt');

const controller = {

  registration: async (req, res) => {
console.log('en registration')
    if (!req.body) {
      return res.status(402).json(
        {
          meta: {
            status: 402,
            msg: "No hay datos del usuario"
          }
        });
    }

    try {

      let newUser;
      let userImg;
console.log('linea 28')
      if (await db.Users.findOne({ where: { email: req.body.email } })) {
        return res.status(401).json(
          {
            headers: {
              origin: "*"
            },
            meta: {
              status: 401,
              msg: "La dirección de mail ya se encuentra registrada"
            }
          });
      };
console.log('linea 38')
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      // Si no se ingresó una imagen se asigna la imagen por defecto
      if (req.body.img && !(req.body.img === null) && !(req.body.img === 'null') ) {
        userImg = req.body.img;
      } else {
        userImg = envVariables[nodeEnv].DEFAULT_USER_IMAGE;  
      }
console.log('linea 47')
      newUser = await db.Users.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        date_birth: req.body.date_birth,
        img: userImg,
        category_id: 2
      })
console.log('linea 58')
      if (await newUser) {

        const token = obtainJwt (newUser);
      
        return res.status(200).json(
          {
            meta: {
              status: 200,
              msg: 'El registro del usuario ha sido completado'
            },
            jwt: token
          })
      } else {
        return res.status(402).json(
          {
            meta: {
              status: 402,
              msg: `Ha ocurrido un error en el registro del usuario`
            }
          })
      }
    }
    catch { e => console.error(e) }
  },

  login: async (req, res) => {

    let user = null;

    try {
      user = await db.Users.findOne({
        where: { email: req.body.email }
      });

      let passwordCorrect = 
        user === null
        ? 
        false 
        :
        await bcrypt.compare(req.body.password, user.password);

      if (!passwordCorrect) {
        return res.status(401).json(
          {
            meta: {
              status: 401,
              msg: "Invalid user or password"
            }
          });
      } else {

        const token = obtainJwt (user);

        return res.status(200).json(
          {  
            status: 200,     
            jwt: token,  
        })
      }
    }
    catch { e => console.error(e) }
  },

  list: (req, res) => {
    let usersArray = [];
    db.Users.findAll()
      .then(users => {
        users.forEach(user => {
          let data = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            date_birth: user.date_birth,
            img: user.img,
            category_id: user.category_id,
            url: 'http://localhost:3040/users/' + user.id
          }
          usersArray.push(data)
        });

        const count = usersArray.length;

        return res.json({
          meta: {
            status: 200,
            url: 'http://localhost:3040/users/',
          },

          data: {
            count: count,
            users: usersArray
          }
        });
      })
      .catch(e => console.log(e))
  },

  detail: (req, res) => {
    db.Users.findByPk(req.params.id)
      .then(user => {
        let data = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          date_birth: user.date_birth,
          img: user.img,
          category_id: user.category_id
        }
        return res.status(200).json(
          {
            meta: {
              status: 200,
              url: 'http://localhost:3040/users/:' + req.params.id,
              user_id: req.params.id,
            },
            data: data
          }
        )
      })
      .catch(e => console.log(e))
  },


}

module.exports = controller