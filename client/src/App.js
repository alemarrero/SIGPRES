import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Componentes/Login/Login.js';
import Main from './Contenedor/Main.js';
import AtencionCiudadano from './Componentes/AtencionCiudadano/AtencionCiudadano';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      usuario_autenticado: false
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/inicio" component={Main}/>
          <Route path="/oac" component={AtencionCiudadano}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
