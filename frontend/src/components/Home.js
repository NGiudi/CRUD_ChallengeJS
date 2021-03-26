import React, {Fragment, useState, useEffect} from 'react';
import {Card, CardContent, Paper} from '@material-ui/core';
import MaterialTable from 'material-table';
import axios from 'axios';

const BASE_URL = 'http://localhost:3050';

const columns = [
  {title: 'Fecha', field: 'date', type:'date'},
  {title: 'Descripción', field: 'description'},
  {title: 'Categoria', field: 'category'},
  {title: 'Monto', field: 'amount', type: 'numeric'},
  {title: 'Tipo', field: 'type'}
];

function Home() {

  const [stateTable, setTable] = useState([]);                                                                    // Data table information.
  const [stateBalance, setBalance] = useState(0);                                                                 // Balance value.


  const requestBalance = async () => {
    await axios.get (BASE_URL + '/balance')
      .then(response => {
        if (response.data !== 'Not results.')
          setBalance (response.data[0].value);
      })
      .catch(error => {
        console.log (error);
      })
  };

  const requestTable = async () => {
    await axios.get (BASE_URL + '/budget/last10')
      .then(response => {
        if (response.data !== 'Not results.')
          setTable (response.data);
        else
          setTable ([]);
      })
      .catch(error => {
        console.log (error);
      })
  }
    
  useEffect(() => {
    requestBalance ();
    requestTable ();
  }, []);




  return (
    <Fragment>
      <Card className="card-box">
          <CardContent className="card-content">
            <p className="balance-title">BALANCE</p>
            <p className="balance">$ {stateBalance}</p>
          </CardContent>
      </Card>

      <div className="table-container">
        <h2 className="table-title">Últimos Movimientos</h2>
      
        <div className="w-table">
          <MaterialTable
            columns={columns}
            data={stateTable}
            components={{
              Container: props => <Paper {...props} elevation={2}/>
            }}
            localization={{
              body: {emptyDataSourceMessage: 'Listado de movimientos vacía.'},
              header:{ actions:'Acciones'}
            }}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {backgroundColor:"#efefef", padding:"10px"},
              pageSize: 10,
              paging: false,
              sorting: false,
              toolbar: false,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;