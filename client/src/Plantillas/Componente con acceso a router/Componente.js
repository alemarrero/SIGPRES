import React, { Component } from 'react';
import "./Componente.css";
import {withRouter} from "react-router-dom";

export class Componente extends Component { 
  constructor(props){
    super(props);
    this.state = {variable: "Hola Mundo", mostrar_mensaje: true};
    this.metodoDePrueba = this.metodoDePrueba.bind(this);
  }

  metodoDePrueba(){
    return true;
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    return (
      <div>
        {this.state.mostrar_mensaje ? this.state.variable : "aloH odnuM"}
      </div>
    )
  }
}

export default withRouter(Componente);