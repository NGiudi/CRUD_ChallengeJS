import React from 'react';
import {Button, Modal} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import jwt from 'jwt-simple';
import axios from 'axios';

import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

const greenTheme = createMuiTheme({ palette: { primary: {main: '#4caf50' }} });
const redTheme = createMuiTheme({ palette: { primary: {main: '#d50000'} } });

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
}));

function ModalDelete (props) {
  const {row, openCloseModalDelete, modalDelete, modifyTable} = props;
  const classes = useStyles();

  const requestDeleteBudget = () => {
    axios.post (BASE_URL + '/api/budget/delete/', row)
      .then ((res) => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD); 
        console.log (info.success);
      })
      .catch (error => {
        console.log (error);
      })
  }
  
  const confirmDelete = () => {   
    modifyTable (row, 'delete');          //update table
    openCloseModalDelete ();              //close pop-up
    requestDeleteBudget ();               //update database.
  }
  
  return (
    <Modal open = {modalDelete} onClose = {openCloseModalDelete}> 
      <div align="center" className="modal">
        <p>Está seguro de eleminar <b>"{row&&row.description}"</b>? Una vez eliminado no podrá ser recuperado.</p>
        
        <div align="center">
          <MuiThemeProvider theme={greenTheme}>
            <Button variant="contained" color="primary" onClick={confirmDelete} className={classes.margin}>Eliminar</Button>
          </MuiThemeProvider>
          <MuiThemeProvider theme={redTheme}>
          <Button variant="contained" color="primary" onClick={openCloseModalDelete}>Cancelar</Button>
          </MuiThemeProvider>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDelete;