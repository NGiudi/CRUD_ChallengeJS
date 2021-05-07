import React, {useEffect, useState} from 'react';
import {Button, InputAdornment, MenuItem, Modal, TextField} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {es} from 'date-fns/locale';
import jwt from 'jwt-simple';
import axios from 'axios';

import {validateForm, ViewError} from './validationModal';
import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

const greenTheme = createMuiTheme({ palette: { primary: {main: '#4caf50' }} });
const redTheme = createMuiTheme({ palette: { primary: {main: '#d50000'} } });

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
}));

function ModalEdit (props) {
  const {row, modalEdit, openCloseModalEdit, modifyTable} = props;
	const categories = ['Comida', 'Estudios', 'Transporte', 'Sueldo'];
  const classes = useStyles();
  
  const [stateError, setError] = useState ({});
  const [stateData, setData] = useState ({});

	useEffect(() => {
    setData ({
			id: row? row.id : 0,
      idUser: row? row.idUser : 0,
			description: row? row.description : "",
			oldAmount: row? row.amount : 0,
			amount: row? row.amount : 0,
			date: row? row.date : "",
			category: row? row.category : "",
			type: row? row.type : ""
		});
  }, [row]);

	const requestUpdateBudget = () => {
    axios.put (BASE_URL + '/api/budget/update', stateData)
      .then ((res) => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD);
        console.log (info.success);
      })
      .catch (error => {
        console.log (error);
      })
  }


  useEffect(() => {
    setError ({});
  }, [modalEdit]);

	const confirmEdit = () => {
    const objError = validateForm (stateData);

    if ( objError.error === false){
      requestUpdateBudget ();
		  modifyTable (stateData, 'edit');
      openCloseModalEdit ();
    } else{
      setError (objError);
    }
  }
  

  const handleTextFieldChange = e => {
    const {name, value} = e.target;
    
    setData (prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleDateChange = date => {
    let newData = {...stateData};
		newData.date = date;
		setData (newData);
	};

  return (
    <Modal open = {modalEdit} onClose = {openCloseModalEdit}> 
      <div className="modal">
        <h3>Editar Movimiento</h3>

        <ViewError error={stateError.error} message={stateError.message}/>
        
        <div className="pb-1">
          <TextField className="inputMaterial" name="description" label="Descripción" required
                     defaultValue={row.description} onChange={handleTextFieldChange} />
        </div>
            
        <div className="pb-1">
          <TextField className="inputMaterial" name="amount" label="Monto" type="number"
                     defaultValue={row.amount} onChange={handleTextFieldChange} required
                     InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}}/> 
        </div>
            
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <div className="pb-1">
            <KeyboardDatePicker className="inputMaterial" name="date" label="Fecha"
                                value={stateData.date} onChange={handleDateChange} required
                                disableToolbar variant="inline" format="dd/MM/yyyy"
                                KeyboardButtonProps={{'aria-label': 'change date',}}/>
          </div>
        </MuiPickersUtilsProvider>

        <div className="pb-1">
          <TextField select label="Categoría" className="inputMaterial" name="category"
                     defaultValue={row.category} onChange={handleTextFieldChange} required>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
            
        <div className="pb-1">
          <TextField className="inputMaterial" name="type" label="Tipo de Movimiento" 
                     value={row.type} disabled/>
        </div>

        <div align="center">
          <MuiThemeProvider theme={greenTheme}>
            <Button variant="contained" color="primary" onClick={confirmEdit} className={classes.margin}>Guardar</Button>
          </MuiThemeProvider>
          <MuiThemeProvider theme={redTheme}>
            <Button variant="contained" color="primary" onClick={openCloseModalEdit}>Cancelar</Button>
          </MuiThemeProvider>
        </div>
      </div> 
    </Modal>
  );
}

export default ModalEdit;