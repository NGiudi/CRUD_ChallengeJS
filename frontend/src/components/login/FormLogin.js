import React, {Fragment, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import PasswordField from 'material-ui-password-field';
import Alert from '@material-ui/lab/Alert'; 
import Cookies from 'universal-cookie';
import jwt from 'jwt-simple';
import axios from 'axios';

import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

const cookies = new Cookies ();

function FormLogin (props) {
  const [stateSuccessRegister, setSuccessRegister] = useState(props.success);
  const [stateData, setData] = useState(null);
  const [stateError, setError] = useState(null);

  const requestLogin = () => {
    axios.post (BASE_URL + '/api/user/login', stateData)
      .then (res => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD);
        
        if (info.error === undefined){
          cookies.set ('idUser', info.id, {path: '/'});
          cookies.set ('username', info.username, {path: '/'});
          window.location.href = "./home";
        } else {
          setError (info.error);
        }
      })
      .catch (err => {
        console.log (err);
      });
  }

  function ViewSuccess () {
    if (stateSuccessRegister === true){
      return (
        <div className="form-error">
          <Alert severity="success">Se ha creado el usuario!</Alert>
        </div>
      );
    }
    return null;
  }
  
  function ViewError () {

    if (stateError !== null) {
      setSuccessRegister (false);

      return (
        <div className="form-error">
          <Alert severity="error">{stateError}</Alert>
        </div>
      );
    }
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
      <ViewSuccess />
      <ViewError />

      <div className="formLogin">
        <h3>Email</h3>
        <TextField className="inputMaterial" name="email" onChange={handleTextFieldChange} required />
        <h3>Password</h3>
        <PasswordField className="inputMaterial" name="password" onChange={handleTextFieldChange}/>
        <p className='link'>Recuperar Contraeña</p>
      </div>

      <Button variant="contained" color="primary" onClick={requestLogin}>Ingresar</Button>
    </Fragment>
  );
}

export default FormLogin;