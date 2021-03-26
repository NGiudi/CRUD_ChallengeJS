import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
import Crud from './Crud';

function Nav () {
  return (
    <Router>
      <div className="back-nav">
        <ul className="nav-ul">
          <li>
            <Link className="nav-item" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-item" to="/crud">ABM</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/crud" component={Crud}/>
      </Switch>
    </Router>
  );
}

export default Nav;