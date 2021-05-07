import React, {Fragment, useEffect} from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Card } from '@material-ui/core';
import Cookies from 'universal-cookie';

import Balance from '../components/home/Balance';
import Table from '../components/home/Table';
import Logout from '../components/Logout';

const cookies = new Cookies();

function Home() {
  const goCrud = () => window.location.href = '/crud';
  
  useEffect(() => {
    
    const AutomaticLogout = () => {
      if (!cookies.get('idUser')){
        window.location.href = '/';
      }
    }

    AutomaticLogout ();
  },[]);

  return (
    <Fragment>
      <div className="line-user">
        <p className="field">Usuario:</p> 
        <p className="username">{cookies.get('username')}</p>
      </div>

      <div className="bar-btns">
        <Card className="box-btn" onClick={goCrud}>
          <BarChartIcon color="primary" fontSize="large"/>
          <p>Ver Movimientos</p>
        </Card>
        
        <Logout/>
      </div>
          
      <Balance/>
      <Table title="Últimos Movimientos"/>
    </Fragment>
  );
}

export default Home;