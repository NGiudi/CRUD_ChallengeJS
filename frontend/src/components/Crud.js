import React, {Fragment, useEffect, useState} from 'react';
import {Box, Button, InputAdornment, MenuItem, Modal, Paper, TextField} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import DateFnsUtils from '@date-io/date-fns';
import {es} from 'date-fns/locale';
import axios from 'axios';

const BASE_URL = 'http://localhost:3050';

const categories = ['Comida', 'Estudios', 'Transporte', 'Sueldo'];

const columns = [
  {title: 'Fecha', field: 'date', type:'date'},
  {title: 'Descripción', field: 'description'},
  {title: 'Categoria', field: 'category'},
  {title: 'Monto', field: 'amount', type: 'numeric'},
  {title: 'Tipo', field: 'type'}
];

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
}));


function Crud() {
  const classes = useStyles();                                                                                    // Spacing buttons.
  
  const [stateTable, setTable] = useState([]);                                                                    // Data table information.  
  const [stateBalance, setBalance] = useState(0);                                                                 // Balance value.
  const [stateFilterCategory, setFilterCategory] = useState ("todo");
  const [modalAdd, setModalAdd] = useState(false);                                                                // Modal window add state.
  const [modalDelete, setModalDelete] = useState(false);                                                          // Modal window delete state.
  const [modalEdit, setModalEdit] = useState(false);                                                              // Modal window edit state.
  
  const [stateErrorForm, setErrorForm] = useState ({                                                              // ErrorInformation.
    description: false,
    amount: false,
    date: false,
    category: false,
    type: false,
  });

  const [stateData, setData] = useState ({                                                                        // Row information.
    description:"",
    amount:"",
    date: new Date(),
    category:"",
    type:"",
    oldAmount:0,
  });

  
  const requestTable = async (filter='todo') => {
    await axios.get (BASE_URL + '/budget/' + filter)
      .then (response => {
        if (response.data !== 'Not results.')
          setTable (response.data);
        else
          setTable ([]);
      })
      .catch (error => {
        console.log (error);
      })
  }

  const requestAddBudget = async () => {
    await axios.post (BASE_URL + '/budget/add', stateData)
      .then (() => {
        console.log ('success add!');
      })
      .catch (error => {
        console.log (error);
      })
  }

  const requestUpdateBudget = async () => {
    await axios.put (BASE_URL + '/budget/update/' + stateData.id, stateData)
      .then (() => {
        console.log ('Update success!');
      })
      .catch (error => {
        console.log (error);
      })
  }

  const requestDeleteBudget = async () => {
    await axios.delete (BASE_URL + '/budget/delete/' + stateData.id)
      .then (() => {
        console.log ('success delete!');
      })
      .catch (error => {
        console.log (error);
      })
  }

  const requestBalance = async () => {
    await axios.get (BASE_URL + '/balance')
      .then (response => {
        if  (response.data !== 'Not results.')
          setBalance (response.data[0].value);
      })
      .catch (error => {
        console.log (error);
      })
  };

  const requestUpdateBalance = async (balance) => {
    await axios.put (BASE_URL + '/balance/update/', {balance})
      .then (() => {
        console.log ('Update success!');
      })
      .catch (error => {
        console.log (error);
      })
  }

  const FormValidation = () => {
    let flagError = false;
  
    // description errors.
    if (stateData.description === ""){
      setErrorForm (prevState => ({...prevState,'description': true}));
      flagError = true;
    }
    else{
      setErrorForm (prevState => ({...prevState,'description': false}));
    }

    // amount errors
    if (stateData.amount === ""){
      setErrorForm (prevState => ({...prevState,'amount': true}));
      flagError = true;
    }
    else{
      setErrorForm (prevState => ({...prevState,'amount': false}));
    }

    //date errors
    if ((stateData.date === null) || (stateData.date == 'Invalid Date')){
      setErrorForm (prevState => ({...prevState,'date': true}));
      flagError = true;
    }
    else{
      setErrorForm (prevState => ({...prevState,'date': false}));
    }

    //category errors
    if (stateData.category === ""){
      setErrorForm (prevState => ({...prevState,'category': true}));
      flagError = true;
    }
    else{
      setErrorForm (prevState => ({...prevState,'category': false}));
    }

    //ty errors
    if (stateData.type === ""){
      setErrorForm (prevState => ({...prevState,'type': true}));
      flagError = true;
    }
    else{
      setErrorForm (prevState => ({...prevState,'type': false}));
    }

    return flagError? false : true;
  }

  const modifyBalance = (mode) => {
    let {amount, type, oldAmount} = stateData, res, balance;

    amount = parseInt (amount);
    oldAmount = parseInt (oldAmount)

    if (mode === 'ADD'){
      res = - amount;
    }
    else if (mode === 'EDIT'){
      res = oldAmount - amount;

      if (res === 0){
        return null;
      }
    }
    else if (mode === 'DELETE'){
      res = amount;
    }
    else{
      console.log ('ERROR: specify ADD or EDIT or DELETE mode');
      return;
    }

    if (type === 'Ingreso'){
      balance = stateBalance - res;
    }
    else if (type === 'Egreso'){
      balance = stateBalance + res;
    }

    setBalance (balance);
    
    return balance;
  }

  const confirmEdit = () => {
    let table=stateTable; 
    
    if (FormValidation ()) {
      // update table.
      table.forEach (row => {
        if (row.id === stateData.id){
          row.description = stateData.description;
          row.category = stateData.category;
          row.amount = stateData.amount;
          row.date = stateData.date;
          row.type = stateData.type;
        }
      });
      setTable(table);
    
      //update balance value.
      const balance = modifyBalance ('EDIT');

      //close pop-up
      openCloseModalEdit ();

      //update database.
      requestUpdateBudget ();

      if (balance !== null) {
        requestUpdateBalance (balance);
      }
    }
  }

  const confirmDelete = () => {
    //aca puedo hacer una validación de la info.

    //update table
    setTable (stateTable.filter(row=> row.id !== stateData.id))
    
    //update balance value.
    const balance = modifyBalance ('DELETE');

    //close pop-up
    openCloseModalDelete ();

    //update database.
    requestDeleteBudget ();
    requestUpdateBalance (balance);
  }

  const confirmAdd = () => {
    let table = Array.from(stateTable);
    
    if (FormValidation ()){
      //update table.
      if (table.length >= 10) {
        setTable (table.pop ());
      }
      table.unshift (stateData);
      setTable (table);

      //update balance.
      const balance = modifyBalance ('ADD');
      
      //close pop-up
      openCloseModalAdd ();
      
      //update database.
      requestAddBudget ();
      requestUpdateBalance (balance);
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

  const handleCategororyChange = e => {
    const {value} = e.target;

    setFilterCategory (value);
    
    requestTable (value);
  }

  const openCloseModalEdit = (info) => {
    //open
    if (!modalEdit){
      info.oldAmount = info.amount;
      setData (info);
      
      setErrorForm ({
        description: false,
        amount: false,
        date: false,
        category: false,
        type: false});
    }

    setModalEdit (!modalEdit);
  }

  const openCloseModalDelete = (info) => {
    //open
    if (!modalDelete){
      setData (info);
    }

    setModalDelete (!modalDelete);
  }

  const openCloseModalAdd = () => {
    //open
    if (!modalAdd){
      setData ({
        description:"",
        amount:0,
        date: new Date(),
        category:"",
        type:"",
        oldAmount:0,
      });
    }

    setModalAdd (!modalAdd);
  }


  useEffect(() => {
    requestTable ();
    requestBalance ();
  }, []);


  return (
      <Fragment>
        <div class="newMovBtn">
          <Button onClick={openCloseModalAdd} color="primary" variant="contained">
            <AddIcon/> 
            <p className="btn">Nuevo Movimiento</p>
          </Button>
        </div>
        
        <div className="table-container">
          <h2 className="table-title">Listado Completo de Registros</h2>

          <Box className="filter-bar">
            <span className="text">Filtrar:</span>
            <TextField select style={{width: '150px'}} name="filter" onChange={handleCategororyChange}
                       value={stateFilterCategory} >
              <MenuItem key="Todo" value="todo">Todo</MenuItem>

              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <div className="w-table">
            <MaterialTable
              columns={columns}
              data={stateTable}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar Movimiento',
                  onClick: (e, rowData) => openCloseModalEdit (rowData)
                },
                {
                  icon: 'delete',
                  tooltip: 'Eliminar Movimiento',
                  onClick: (e, rowData) => openCloseModalDelete (rowData)
                }
              ]}
              components={{
                Container: props => <Paper {...props} elevation={2}/>
              }}
              localization={{
                body: {emptyDataSourceMessage: 'Listado de movimientos vacía.'},
                header: { actions:'Acciones'},
                pagination: {
                  labelDisplayedRows: '{from}-{to} de {count}', 
                  labelRowsSelect: 'Filas',
                  firstTooltip: 'Primer página', 
                  previousTooltip: 'Página anterior',
                  nextTooltip: 'Próxima página',
                  lastTooltip: 'Última página',
                }
              }}
              options={{
                actionsColumnIndex: -1,
                headerStyle: {backgroundColor:"#efefef", padding:"10px"},
                pageSize: 10,
                toolbar: false,
              }}
            />
          </div>
        </div>

        <Modal open = {modalAdd} onClose = {openCloseModalAdd}> 
          <div className="modal">
            <h3>Agregar Nuevo Movimiento</h3>
            <div className="pb-1">
              <TextField className="inputMaterial" name="description" label="Descripción"
                         onChange={handleTextFieldChange} required 
                         helperText= {stateErrorForm.description? "Debe completar este campo." : ""} error={stateErrorForm.description} />
            </div>
            
            <div className="pb-1">
              <TextField className="inputMaterial" name="amount" label="Monto"
                         onChange={handleTextFieldChange} type="number" required
                         InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                         helperText= {stateErrorForm.amount? "Debe completar este campo." : ""} error={stateErrorForm.amount}/>
            </div>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <div className="pb-1">
                <KeyboardDatePicker className="inputMaterial" name="date" label="Fecha"
                  onChange={handleDateChange} required format="dd/MM/yyyy" variant="inline"
                  disableToolbar KeyboardButtonProps={{'aria-label': 'change date',}}
                  InputLabelProps={{shrink: true}} value={stateData.date} 
                  helperText= {stateErrorForm.date? "Debe completar este campo." : ""} error={stateErrorForm.date}/>
              </div>
            </MuiPickersUtilsProvider>
              
            <div className="pb-1">
              <TextField select label="Categoría" className="inputMaterial" name="category" required
                         defaultValue={categories[0]} value={stateData.category} onChange={handleTextFieldChange}
                         helperText= {stateErrorForm.category? "Debe completar este campo." : ""} error={stateErrorForm.category}>
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
              </TextField>
            </div>
            
            <div className="pb-1">
              <TextField select label="Tipo de Movimiento" className="inputMaterial" name="type" required
                         defaultValue="Egreso" value={stateData.type} onChange={handleTextFieldChange}
                         helperText= {stateErrorForm.type? "Debe completar este campo." : ""} error={stateErrorForm.type}>
                    <MenuItem value="Ingreso">Ingreso</MenuItem>
                    <MenuItem value="Egreso">Egreso</MenuItem>
              </TextField>
            </div>

            <div align="center">
              <Button variant="outlined"  color="primary"   onClick={confirmAdd} className={classes.margin}>Agregar</Button>
              <Button variant="contained" color="secondary" onClick={openCloseModalAdd}>Cancelar</Button>
            </div>
          </div> 
        </Modal>

        <Modal open = {modalEdit} onClose = {openCloseModalEdit}> 
          <div className="modal">
            <h3>Editar Movimiento</h3>
            <div className="pb-1">
              <TextField className="inputMaterial" name="description" label="Descripción" required
                         value={stateData&&stateData.description} onChange={handleTextFieldChange} 
                         helperText= {stateErrorForm.description? "Debe completar este campo." : ""} error={stateErrorForm.description} />
            </div>
            
            <div className="pb-1">
              <TextField className="inputMaterial" name="amount" label="Monto" type="number"
                         value={stateData&&stateData.amount} onChange={handleTextFieldChange} required
                         InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                         helperText= {stateErrorForm.amount? "Debe completar este campo." : ""} error={stateErrorForm.amount}/> 
            </div>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <div className="pb-1">
                <KeyboardDatePicker className="inputMaterial" name="date" label="Fecha"
                  value={stateData&&stateData.date} onChange={handleDateChange} required
                  disableToolbar variant="inline" format="dd/MM/yyyy"
                  KeyboardButtonProps={{'aria-label': 'change date',}}
                  helperText= {stateErrorForm.date? "Debe completar este campo." : ""} error={stateErrorForm.date}/>
              </div>
            </MuiPickersUtilsProvider>

            <div className="pb-1">
              <TextField select label="Categoría" className="inputMaterial" name="category"
                         value={stateData.category} onChange={handleTextFieldChange} required>
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
              </TextField>
            </div>
            
            <div className="pb-1">
              <TextField className="inputMaterial" name="type" label="Tipo de Movimiento" 
                         value={stateData&&stateData.type} disabled/>
            </div>

            <div align="center">
              <Button variant="outlined"  color="primary"   onClick={confirmEdit} className={classes.margin}>Guardar</Button>
              <Button variant="contained" color="secondary" onClick={openCloseModalEdit}>Cancelar</Button>
            </div>
          </div> 
        </Modal>

        <Modal open = {modalDelete} onClose = {openCloseModalDelete}> 
          <div align="center" className="modal">
            <p>Está seguro de eleminar <b>"{stateData&&stateData.description}"</b>? Una vez eliminado no podrá ser recuperado.</p>
            
            <div align="center">
              <Button variant="outlined"  color="primary"   onClick={confirmDelete} className={classes.margin}>Eliminar</Button>
              <Button variant="contained" color="secondary" onClick={openCloseModalDelete}>Cancelar</Button>
            </div>
          </div>
        </Modal>
      </Fragment>
  );
}

export default Crud;