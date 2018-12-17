import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import requerimientos from '../../assets/img/requerimientos.png';
import requerimientosViejos from '../../assets/img/requerimientos-viejos.png';
import OpcionMenu from '../Menu/OpcionMenu';
import consultar from '../../assets/img/consultar.png';
import consolidado from '../../assets/img/consolidado.png';

export default class Menu extends Component {
  render() {
    return (

      <React.Fragment>

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimiento`)}>Gestión de requerimientos de cada área</BreadcrumbItem>
            <BreadcrumbItem active>Requerimientos y Necesidades</BreadcrumbItem>

          </Breadcrumb>
        </div>


        <Row className="fila-opciones-menu-principal">
          {/* Requerimientos y Necesidades */}   
          <OpcionMenu ruta={'/solicitud-de-requerimientos/'} nombre="Solicitud de Requerimientos y Necesidades" icono={requerimientos}/>
          
          {/* Solicitud de requerimientosViejos */}
          <OpcionMenu ruta={'requerimientos-anteriores/'} nombre="Históricos" icono={requerimientosViejos}/>
          
          {/* Consulta de solicitudes de requerimientos y necesidades */}   
          <OpcionMenu ruta={'/consultar-solicitudes-de-requerimientos/'} nombre="Consultar Solicitudes de Requerimientos y Necesidades" icono={consultar}/> 

          {/* Consulta consolidado de solicitudes de personal */}   
          <OpcionMenu ruta={'/consolidado-solicitudes-requerimientos/'} nombre="Consultar Consolidado de Requerimientos y Necesidades" icono={consolidado}/>                 
        
        </Row>
      </React.Fragment>

    )
  }
}
