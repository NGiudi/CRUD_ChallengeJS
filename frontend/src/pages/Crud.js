import React, {Fragment, useEffect, useState} from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddIcon from '@material-ui/icons/Add';
import {Card} from '@material-ui/core';
import Cookies from 'universal-cookie';
import jwt from 'jwt-simple';
import axios from 'axios';

import ModalDelete from '../components/crud/ModalDelete';
import ModalEdit from '../components/crud/ModalEdit';
import Logout from '../components/Logout';
import Filter from '../components/crud/Filter';
import Table from '../components/crud/Table';
import ModalAdd from '../components/crud/ModalAdd';

import {BASE_URL, CRYPT_PASSWORD} from '../config.json';

function ContainerCrud () {
  const cookies = new Cookies();
  const idUser = cookies.get('idUser');
  
  const [stateRowData, setRowData] = useState({});
  const [stateTable, setTable] = useState([]); 
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const goHome = () => window.location.href = '/home';

  const modifyTable = (data, mode) => {
    
    if (mode === 'add') {
      let table = Array.from(stateTable);

      table.unshift (data);
      setTable (table);  
    }
    else if (mode === 'edit') {
      let table = Array.from(stateTable);

      table.forEach (row => {
        if (row.id === data.id){
          row.description = data.description;
          row.category = data.category;
          row.amount = data.amount;
          row.date = data.date;
          row.type = data.type;
        }
      });
      setTable(table);
    }
    else if (mode === 'delete') {
      setTable (stateTable.filter(row=> row.id !== data.id));
    }    
    else { // filtering.
      setTable (data);
    }
  }

  const requestTable = () => {
    axios.get (BASE_URL + '/api/budget/all/' + idUser)
    .then (res => {
      const info = jwt.decode (res.data, CRYPT_PASSWORD);
      modifyTable (info);
    })
    .catch (error => {
      console.log (error);
    });
  }

  useEffect(() => {
    const AutomaticLogout = () => {
      if (!idUser){
        window.location.href = '/home';
      }
    }
    AutomaticLogout ();
    requestTable ();
  }, []);


  const openCloseModalDelete = (row) => {
    //open
    if (!modalDelete){
      setRowData (row);
    }
    
    setModalDelete (!modalDelete);
  }

  const openCloseModalEdit = (row) => {    
    //open
    if (!modalEdit){
      setRowData (row);
    }

    setModalEdit (!modalEdit);
  }

  const openCloseModalAdd = () => {
    setModalAdd (!modalAdd);
  }

  return (
    <Fragment>
      <div className="line-user">
        <p className="field">Usuario:</p> 
        <p className="username">{cookies.get('username')}</p>
      </div>

      <div className="bar-btns">
        <Card className="box-btn" onClick={goHome}>
          <AccountBalanceIcon color="primary" fontSize="large"/>
          <p>Balance</p>
        </Card>

        <Card className="box-btn" onClick={openCloseModalAdd}>
          <AddIcon color="primary" fontSize="large"/> 
          <p className="btn">Movimiento</p>
        </Card>

        <Logout/>
      </div>
       
      <div className="w-80">
        <Filter modifyTable={modifyTable} requestTable={requestTable}/>
        <Table data={stateTable} openCloseModalDelete={openCloseModalDelete} openCloseModalEdit={openCloseModalEdit}/>
      </div>

      <ModalAdd modalAdd={modalAdd} openCloseModalAdd={openCloseModalAdd} modifyTable={modifyTable} />
      <ModalEdit modalEdit={modalEdit} openCloseModalEdit={openCloseModalEdit} row={stateRowData} modifyTable={modifyTable} />
      <ModalDelete modalDelete={modalDelete} openCloseModalDelete={openCloseModalDelete} row={stateRowData} modifyTable={modifyTable} />
    </Fragment>
  );
}

export default ContainerCrud;