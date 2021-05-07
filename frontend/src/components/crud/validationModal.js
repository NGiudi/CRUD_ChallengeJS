import Alert from '@material-ui/lab/Alert'; 

const validateForm = (data) => {
  let objError = {
    error: false,
    message: ""
  };

  if ((data.description === undefined) || (data.description.trim() === "")){
    objError.message = "Debe completar todos los campos.";
    objError.error = true;
    return objError;
  }
  if (data.amount === undefined || (data.amount === "") ){
    objError.message = "Debe completar todos los campos.";
    objError.error = true;
    return objError;
  }
  if (data.date === undefined){
    objError.message = "Debe completar todos los campos.";
    objError.error = true;
    return objError;
  }
  if (data.category === undefined){
    objError.message = "Debe completar todos los campos.";
    objError.error = true;
    return objError;
  }
  if (data.type === undefined){
    objError.message = "Debe completar todos los campos.";
    objError.error = true;
    return objError;
  }

  return objError;
}

const ViewError = (props) => {
  const {error, message} = props;

  if (error === true) {
    return (
      <div className="pb-1">
        <Alert severity="error">{message}</Alert>
      </div>
    );
  }
  return null;
}

export {validateForm, ViewError};