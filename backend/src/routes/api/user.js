const router = require ('express').Router();
const bcrypt = require ('bcryptjs');
const jwt = require ('jwt-simple');

const {User} = require('../../config/db');

const control = require('../../controllers/users');

router.post ('/register', async (req, res) => {
  let token;
  // Verificando errores en entrada de datos.
  const error = await control.controlRegister (req.body);

  if (error) {
    token = jwt.encode (error, "frase secreta");
    res.json (token);
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);

    token = jwt.encode (user, "frase secreta");
    res.json (token);
  }
});

router.post ('/login', async (req, res) => {
  let token;
  
  // Verificando errores en entrada de datos.
  const error = control.controlLogin (req.body);
  
  if (error) {
    token = jwt.encode (error, "frase secreta");
  } else {
    // Verificando los datos de la base de datos.
    const user = await User.findOne ({ where: { email: req.body.email } });
    
    if (user) {
      const equal = bcrypt.compareSync(req.body.password, user.dataValues.password)

      if (equal) {
        token = jwt.encode (user, "frase secreta");
      } else{
        token = jwt.encode ({error: 'Error en usuario y/o contraseña.'}, "frase secreta");
      }
    } else {
      token = jwt.encode ({error: 'Error en usuario y/o contraseña.'}, "frase secreta");
    }
  }

  res.json (token);
});

module.exports = router;