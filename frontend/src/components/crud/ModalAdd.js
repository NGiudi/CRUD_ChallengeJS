import React, {useState,useEffect} from 'react';
import {Button, InputAdornment, MenuItem, Modal, TextField} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {es} from 'date-fns/locale';
import Cookies from 'universal-cookie';
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

function ModalAdd (props) {
  const {openCloseModalAdd, modalAdd, modifyTable} = props;
  const categories = ['Comida', 'Estudios', 'Transporte', 'Sueldo'];
  const cookies = new Cookies();
  const classes = useStyles();

  const [stateError, setError] = useState ({});

  const [stateData, setData] = useState ({
    idUser: cookies.get('idUser'),
    date: new Date(),
    type: 'Ingreso',
    category: 'Comida'
  });
  
  const requestAddBudget = () => {
    axios.post (BASE_URL + '/api/budget/add', stateData)
      .then ((res) => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD);
        console.log (info);
      })
      .catch (error => {
        console.log (error);
      });
  }

  
  useEffect(() => {
    setError ({});
  }, [modalAdd]);

  const confirmAdd = () => {
    const objError = validateForm (stateData);

    if ( objError.error === false){
      requestAddBudget ();
      modifyTable (stateData, 'add');
      openCloseModalAdd ();
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
    <Modal open = {modalAdd} onClose = {openCloseModalAdd}> 
      <div className="modal">
        <h3>Agregar Nuevo Movimiento</h3>

        <ViewError error={stateError.error} message={stateError.message}/>

        <div className="pb-1">
          <TextField className="inputMaterial" name="description" label="Descripción"
                     onChange={handleTextFieldChange} required />
        </div>
            
        <div className="pb-1">
          <TextField className="inputMaterial" name="amount" label="Monto"
                     onChange={handleTextFieldChange} type="number" required
                     InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}} />
        </div>
            
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <div className="pb-1">
            <KeyboardDatePicker className="inputMaterial" name="date" label="Fecha"
                                onChange={handleDateChange} required format="dd/MM/yyyy" variant="inline"
                                disableToolbar KeyboardButtonProps={{'aria-label': 'change date',}}
                                InputLabelProps={{shrink: true}} value={stateData.date} />
          </div>
        </MuiPickersUtilsProvider>
              
        <div className="pb-1">
          <TextField select label="Categoría" className="inputMaterial" name="category" required
                     defaultValue={categories[0]} value={stateData.category} onChange={handleTextFieldChange}>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
            
        <div className="pb-1">
          <TextField select label="Tipo de Movimiento" className="inputMaterial" name="type" required
                     defaultValue="Egreso" value={stateData.type} onChange={handleTextFieldChange}>
            <MenuItem value="Ingreso">Ingreso</MenuItem>
            <MenuItem value="Egreso">Egreso</MenuItem>
          </TextField>
        </div>

        <div align="center">
          <MuiThemeProvider theme={greenTheme}>
            <Button variant="contained"  color="primary"   onClick={confirmAdd} className={classes.margin}>Agregar</Button>
          </MuiThemeProvider>
          <MuiThemeProvider theme={redTheme}>
            <Button variant="contained" color="primary" onClick={openCloseModalAdd}>Cancelar</Button>
          </MuiThemeProvider>
        </div>
      </div> 
    </Modal>
  );
}

export default ModalAdd;