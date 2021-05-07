import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Crud from './pages/Crud';
import Login from './pages/Login';

//styles
import './assets/css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/crud" component={Crud}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;