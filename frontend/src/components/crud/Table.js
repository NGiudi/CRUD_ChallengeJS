import React from 'react';
import {Paper} from '@material-ui/core';
import MaterialTable from 'material-table';

const columns = [
  {title: 'Fecha', field: 'date', type:'date'},
  {title: 'Descripción', field: 'description'},
  {title: 'Categoria', field: 'category'},
  {title: 'Monto', field: 'amount', type: 'numeric'},
  {title: 'Tipo', field: 'type'}
];

function Table (props) {
  const {data} = props;
  
  return (
    <div className="w-table">
      <MaterialTable
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Movimiento',
            onClick: (e, rowData) => props.openCloseModalEdit (rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar Movimiento',
            onClick: (e, rowData) => props.openCloseModalDelete (rowData)
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
          headerStyle: {fontWeight: "bold"},
          pageSize: 10,
          toolbar: false,
        }}
      />
    </div>
  );
}

export default Table;