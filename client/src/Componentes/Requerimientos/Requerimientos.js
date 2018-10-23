import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import requerimientos from '../../assets/img/requerimientos.png';
import personal from '../../assets/img/personal.png';
import OpcionMenu from '../Menu/OpcionMenu';

export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Requerimientos y Necesidades */}   
        <OpcionMenu ruta={'/requerimientos-y-necesidades/'} nombre="Requerimientos y Necesidades" icono={requerimientos}/>
        
        {/* Solicitud de Personal */}
        <OpcionMenu ruta={'/solicitud-personal/'} nombre="Solicitud de Personal" icono={personal}/>
      </Row>
    )
  }
}
