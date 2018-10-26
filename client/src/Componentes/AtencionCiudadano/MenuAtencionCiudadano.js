import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import cgr from '../../assets/img/cgr.png';
import { Row } from 'reactstrap';

export default class MenuAtencionCiudadano extends Component {
  render() {
    return (
      <Row>
        {/* Gestión de Quejas */}
        <OpcionMenu ruta={'quejas'} nombre="Gestión de Quejas" icono={cgr}/>

        {/* Gestión de Sugerencias */}
        <OpcionMenu ruta={'sugerencias'} nombre="Gestión de Sugerencias" icono={cgr}/>

        {/* Gestión de Presupuesto Participativo */}
        <OpcionMenu ruta={'presupuesto-participativo'} nombre="Presupuesto Participativo" icono={cgr}/>
      </Row>
    )
  }
}
