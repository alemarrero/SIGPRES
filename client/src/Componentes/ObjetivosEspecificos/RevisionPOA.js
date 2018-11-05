import React, { Component } from 'react';
import {Row, Col, Button} from 'reactstrap';
import './DetallePOA.css';

export default class RevisionPOA extends Component {
  constructor(props){
    super(props);
    this.state = {
      propuestas: [],
      modal_operacion_fallida: false,
      mensaje: undefined,
    };
    this.obtenerPropuestas = this.obtenerPropuestas.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Revisión de POA";
    this.obtenerPropuestas();
  }

  async obtenerPropuestas(){
    const request = await fetch("/api/propuestas_plan_operativo_anual/obtener_propuestas", {credentials: "include"});
    const response = await request.json();

    if(response !== "err"){
      this.setState({propuestas: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las propuestas de las direcciones"});
    }
  }

  render() {
    return (
      <Row>

      </Row>
    )
  }
}
