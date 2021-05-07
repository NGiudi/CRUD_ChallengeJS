const {User} = require('../config/db');

module.exports = control = {

  controlLogin (body) {
    const {email, password} = body;
  
    if ((email === undefined) || (password === undefined)) {
      return ({error: 'Debe completar el campo de email y contraseña.'});
    }
  },
  
  async controlRegister (body) {
    const {email, username, password, password2} = body;
    const user = await User.findOne ({ where: { email: email } });

    if (user){
      return ({error: 'Existe un usuario registrado con este mail.'});
    }

    if (username === "") {
      return ({error: 'Debe completar el nombre de usuario.'});
    }
    if (email === "") {
      return ({error: 'Debe completar el campo de email.'});
    }
    if (!email.includes('@')){
      return ({error: 'El email es inválido.'});
    }
    if (password === "") {
      return ({error: 'Debe completar la contraseña.'});
    }
    if (password.length < 6) {
      return ({error: 'La contraseña debe tener 6 o más caracteres.'});
    }
    if (password !== password2) {
      return ({error: 'Las contraseñas no coinciden.'});
    }
  }
};