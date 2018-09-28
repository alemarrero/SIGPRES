import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Componentes/Login/Login.js';
import Main from './Componentes/Main/Main.js';
import Usuarios from './Componentes/Usuarios/Usuarios.js';

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
          <Route exact path="/inicio" component={Main}/>
          <Route exact path="/usuarios" component={Usuarios}/>
        </Switch>
      </Router>
      
    );
  }
}

export default App;
