import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Row} from 'reactstrap';
import './Requerimientos.css';
import requerimientos from '../../assets/img/requerimientos.png';
import personal from '../../assets/img/personal.png';
import OpcionMenu from '../Menu/OpcionMenu';
import autorizarDirector from '../../Utilidades/autorizarDirector.js';

export default class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem active>Gestión de Requerimientos de cada área</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Row className="fila-opciones-menu-principal">
          {/* Requerimientos y Necesidades */}   
          {autorizarDirector(this.props.usuario.rol) && 
          <OpcionMenu ruta={'/requerimientos-y-necesidades/'} nombre="Requerimientos y Necesidades" icono={requerimientos}/>
          }
          {/* Solicitud de Personal */}
          <OpcionMenu ruta={'/solicitud-personal/'} nombre="Solicitudes de Personal" icono={personal}/>
        </Row>
      </React.Fragment>
      
    )
  }
}
