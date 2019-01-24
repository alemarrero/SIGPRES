import React, { Component } from 'react';
import "./Componente.css";

export default class Componente extends Component { 
  constructor(props){
    super(props);
    this.state = {variable: "Hola Mundo", mostrar_mensaje: true};
    this.metodoDePrueba = this.metodoDePrueba.bind(this);
  }

  metodoDePrueba(){
    return true;
  }

  render() {
    return (
      <div>
        {this.state.mostrar_mensaje ? this.state.variable : "aloH odnuM"}
      </div>
    )
  }
}
