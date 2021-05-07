import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Card } from '@material-ui/core';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Logout() {
  
  const logout = () => {
    cookies.remove('username', {path: '/'});
    cookies.remove('idUser', {path: '/'});
    window.location.href = '/';
  }

  return (
    <Card className="box-btn" onClick={logout}>
      <MeetingRoomIcon color="primary" fontSize="large"/>
      <p>Cerrar Sesión</p>
    </Card>
  );
}

export default Logout;