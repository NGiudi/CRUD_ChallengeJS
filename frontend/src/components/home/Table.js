import React, {useState, useEffect} from 'react';
import {Paper} from '@material-ui/core';
import MaterialTable from 'material-table';
import Cookies from 'universal-cookie';
import jwt from 'jwt-simple';
import axios from 'axios';

import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

const columns = [
  {title: 'Fecha', field: 'date', type:'date'},
  {title: 'Descripción', field: 'description'},
  {title: 'Categoria', field: 'category'},
  {title: 'Monto', field: 'amount', type: 'numeric'},
  {title: 'Tipo', field: 'type'}
];

function Home(props) {
  const {title} = props;
  
  const [stateTable, setTable] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const idUser = cookies.get('idUser');

    const requestTable = () => {
      axios.get (BASE_URL + '/api/budget/last10/' + idUser)
        .then(res => {
          const info = jwt.decode (res.data, CRYPT_PASSWORD); 
          setTable (info);
        })
        .catch(error => {
          console.log (error);
        });
    }
 
    requestTable ();
  }, []);

  return (
    <div className="w-80">
      <h2 className="table-title">{title}</h2>

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
          headerStyle: {fontWeight: "bold"},
          pageSize: 10,
          paging: false,
          sorting: false,
          toolbar: false,
        }}
      />
    </div>
    );
}

export default Home;