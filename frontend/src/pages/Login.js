import React, {useEffect} from 'react';
import {Card} from '@material-ui/core';
import Cookies from 'universal-cookie';

import SelectForm from '../components/login/SelectForm';

// Styles.
import '../assets/css/login.css';

function Login () {

  useEffect(() => {
    const cookies = new Cookies();
    
    const AutomaticLogin = () => {
      if (cookies.get('idUser')){
        window.location.href = '/home';
      }
    }

    AutomaticLogin ();
  },[]);

  return (
    <Card className="boxLogin">
      <SelectForm/>
    </Card>
  );
}

export default Login;