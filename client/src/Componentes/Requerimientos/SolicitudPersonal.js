import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import personal from '../../assets/img/personal.png';
import cargo from '../../assets/img/cargo.png';
import requerimientosViejos from '../../assets/img/requerimientos-viejos.png';
import OpcionMenu from '../Menu/OpcionMenu';
import consultar from '../../assets/img/consultar.png';

export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Requerimientos y Necesidades */}   
        <OpcionMenu ruta={'/requerimientos-personal/'} nombre="Solicitud de Personal" icono={personal}/>
        
        {/* Historicos */}
        <OpcionMenu ruta={'solicitudes-anteriores/'} nombre="Histórico" icono={requerimientosViejos}/>
        
        {/* Gestion de cargos */}   
        <OpcionMenu ruta={'/cargos/'} nombre="Gestión de Cargos" icono={cargo}/> 

        {/* Consulta de solicitudes de personal */}   
        <OpcionMenu ruta={'/consultar-solicitudes-personal/'} nombre="Consultar Solicitudes de Personal" icono={consultar}/> 
      </Row>
    )
  }
}
