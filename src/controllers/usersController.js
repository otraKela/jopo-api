const db = require('../database/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const controller = {

  registration: async (req, res) => {

    try {

      let newUser;

      if (await db.Users.findOne({ where: { email: req.body.email } })) {
        return res.status(401).json(
          {
            meta: {
              status: 401,
              msg: "La dirección de mail ya se encuentra registrada"
            }
          });
      };

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      newUser = await db.Users.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        date_birth: req.body.date_birth,
        // img: req.file.filename,
        category_id: 2
      })

      if (await newUser) {

        let jwtPayload = {
          userEmail: newUser.email,
          userName: newUser.first_name,
          userId: newUser.id
        }

        const token = jwt.sign(jwtPayload, process.env.SECRET);
        
        return res.status(200).json(
          {
            meta: {
              status: 200,
              msg: 'El registro del usuario ha sido completado'
            },
            data: newUser,
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

        let jwtPayload = {
          userEmail: user.email,
          userName: user.first_name,
          userId: user.id
        }

        const token = jwt.sign(jwtPayload, process.env.SECRET);

        return res.status(200).json(
          {  
            status: 200,     
            jwt: token,  
        })
      }
    }
    catch { e => console.error(e) }
  },

  logout: (req, res) => {
    req.session.userLogged = null;
    res.clearCookie('remember_user');
    res.clearCookie('userLogged');

    return res.redirect('/');
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