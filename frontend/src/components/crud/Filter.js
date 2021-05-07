import React, {useState} from 'react';
import {Box, InputAdornment, MenuItem, TextField} from '@material-ui/core';
import Cookies from 'universal-cookie';
import jwt from 'jwt-simple';
import axios from 'axios';
import {BASE_URL, CRYPT_PASSWORD} from '../../config.json';

function Filter (props) {
  const {modifyTable, requestTable} = props;
  const categories = ['Comida', 'Estudios', 'Transporte', 'Sueldo'];
  const cookies = new Cookies();
  const idUser = cookies.get('idUser');

  const [stateFilter, setFilter] = useState ('all');

  const requestTableFilter = (filter) => {
    axios.get (BASE_URL + '/api/budget/filter/' + idUser + '/' + filter)
      .then (res => {
        const info = jwt.decode (res.data, CRYPT_PASSWORD);
        modifyTable (info);
      })
      .catch (error => {
        console.log (error);
      });
  }

  const selectRequest = (filter) => {
    if (filter === 'all'){
      requestTable ();
    } else{
      requestTableFilter (filter);
    }
  }

  const handleCategororyChange = e => {
    const {value} = e.target;
    setFilter (value);
    selectRequest (value);
  }

  return (
    <Box className="filter-bar">
      <TextField select style={{width: '150px'}} name="filter" onChange={handleCategororyChange} value={stateFilter}
                 InputProps={{startAdornment: <InputAdornment position='start'>Filtro:</InputAdornment>}}>
        <MenuItem key="Todo" value="all">Todo</MenuItem>

        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Filter;