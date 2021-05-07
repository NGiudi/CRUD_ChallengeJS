import React, {Fragment, useState} from 'react';

import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

function SelectForm () {
  const [stateSuccessRegister, setSuccessRegister] = useState(false);
  const [optionState, setOption] = useState('login');

  const login = (success = false) => {
    setSuccessRegister (success);
    setOption('login'); 
  }
  
  const register = () => setOption('register'); 

  function SelectOption (props){
    const {option} = props;

    if ( option === 'register'){
      return (
        <Fragment>
          <div className="options">
            <h2 className="optionHover" onClick={login}>Iniciar sesión</h2>
            <h2 className="optionSelected">Registrarse</h2>
          </div>
          <FormRegister goLogin={login}/>
        </Fragment>
      );
    }
    
    // Login. 
    return (
      <Fragment>
        <div className="options">
          <h2 className="optionSelected">Iniciar sesión</h2>
          <h2 className="optionHover" onClick={register}>Registrarse</h2>
        </div>
        <FormLogin success={stateSuccessRegister} />
      </Fragment>
    );
  }

  return (
    <SelectOption option={optionState}/>
  );
}

export default SelectForm;