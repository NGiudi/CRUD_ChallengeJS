import React, {useState, useEffect} from 'react';
import {Card} from '@material-ui/core';
import Cookies from 'universal-cookie';
import jwt from 'jwt-simple';
import axios from 'axios';

import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

function Balance () {
  const [stateBalance, setBalance] = useState(0);

  useEffect(() => {
    const cookies = new Cookies();
    const idUser = cookies.get('idUser');

    const requestBalance = () => {
      axios.get (BASE_URL + '/api/balance/' + idUser)
        .then(res => {
          const info = jwt.decode (res.data, CRYPT_PASSWORD); 
          setBalance (info.balance);
       })
        .catch(err => {
          console.log (err);
        });
    };

    requestBalance ();
  }, []);

  return (
    <div className="w-80">
      <Card className="card-box" style={{backgroundColor: "rgba(63,81,161,0.7)"}}>
        <p>BALANCE</p>
        <p className="balance">$ {stateBalance}</p>
      </Card>
    </div>
  );
}

export default Balance;