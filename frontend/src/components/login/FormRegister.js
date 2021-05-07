import React, {Fragment, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import PasswordField from 'material-ui-password-field';
import Alert from '@material-ui/lab/Alert'; 
import jwt from 'jwt-simple';
import axios from 'axios';

import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

function FormRegister (props) {

  const [stateError, setError] = useState(null);
  const [stateData, setData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const requestRegister = () => {
    axios.post (BASE_URL + '/api/user/register', stateData)
      .then (res => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD);

        if (info.error === undefined){
          props.goLogin (true);
        } else {
          setError (info.error);
        }
      })
      .catch (err => {
        console.log (err);
      });
  }

  function ViewError () {

    if (stateError !== null)
      return (
        <div className="form-error">
          <Alert severity="error">{stateError}</Alert>
        </div>
      );
      
    return null;
  }

  const handleTextFieldChange = e => {
    const {name, value} = e.target;
    
    setData (prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <Fragment>
      <ViewError/>

      <div className="formLogin">
        <h3>Nombre de Usuario</h3>
        <TextField className="inputMaterial" name="username" onChange={handleTextFieldChange}/>
        <h3>Email</h3>
        <TextField className="inputMaterial" name="email" onChange={handleTextFieldChange}/>
        <h3>Contraseña</h3>
        <PasswordField className="inputMaterial" name="password" onChange={handleTextFieldChange}/>
        <h3>Repita la contraseña</h3>
        <PasswordField className="inputMaterial" name="password2" onChange={handleTextFieldChange}/>
      </div>

      <Button variant="contained" color="primary" onClick={requestRegister}>Registrarse</Button>
    </Fragment>
  );
}

export default FormRegister;