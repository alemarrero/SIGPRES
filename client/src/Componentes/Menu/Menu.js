import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Menu.css';
import administracion from '../../assets/img/work-team.png';
import presupuesto from '../../assets/img/budget.png';
import planeacion from '../../assets/img/solution.png';
import OpcionMenu from './OpcionMenu';

export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Administración */}   
        <OpcionMenu ruta={'administracion/'} nombre="Administración" icono={administracion}/>
        
        {/* Gestión presupuestal  */}
        <OpcionMenu ruta={'presupuesto/'} nombre="Presupuesto" icono={presupuesto}/>

        {/* Gestión de planeación */}
        <OpcionMenu ruta={'planeacion/'} nombre="Planeación" icono={planeacion}/>
      </Row>
    )
  }
}
