import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import requerimientos from '../../assets/img/requerimientos.png';
import requerimientosViejos from '../../assets/img/requerimientos-viejos.png';
import OpcionMenu from '../Menu/OpcionMenu';

export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Requerimientos y Necesidades */}   
        <OpcionMenu ruta={'/solicitud-de-requerimientos/'} nombre="Requerimientos y Necesidades" icono={requerimientos}/>
        
        {/* Solicitud de requerimientosViejos */}
        <OpcionMenu ruta={'requerimientos-anteriores/'} nombre="Históricos" icono={requerimientosViejos}/>
      </Row>
    )
  }
}
