import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import personal from '../../assets/img/personal.png';
import cargo from '../../assets/img/cargo.png';
import requerimientosViejos from '../../assets/img/requerimientos-viejos.png';
import OpcionMenu from '../Menu/OpcionMenu';

export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Requerimientos y Necesidades */}   
        <OpcionMenu ruta={'solicitud-personal-actual/'} nombre="Solicitud de Personal del año actual" icono={personal}/>
        
        {/* Solicitud de requerimientosViejos */}
        <OpcionMenu ruta={'solicitudes-anteriores/'} nombre="Solicitud de Personal de años anteriores" icono={requerimientosViejos}/>
        
        {/* Gestion de cargos */}   
        <OpcionMenu ruta={'/cargos/'} nombre="Gestión de Cargos" icono={cargo}/>        
      </Row>
    )
  }
}
