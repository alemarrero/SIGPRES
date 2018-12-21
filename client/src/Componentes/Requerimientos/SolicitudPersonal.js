import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardBody} from 'reactstrap';
import './Requerimientos.css';
import personal from '../../assets/img/personal.png';
import cargo from '../../assets/img/cargo.png';
import requerimientosViejos from '../../assets/img/requerimientos-viejos.png';
import OpcionMenu from '../Menu/OpcionMenu';
import consultar from '../../assets/img/consultar.png';
import consolidado from '../../assets/img/consolidado.png';
import withContext from './../../Contenedor/withContext';
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';

export class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem active>Solicitudes de Personal</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Row className="fila-opciones-menu-principal">
          {/* Requerimientos y Necesidades */}   
          <OpcionMenu ruta={'/requerimientos-personal/'} nombre="Solicitud de Personal" icono={personal}/>
          
          {/* Historicos */}
          <OpcionMenu ruta={'solicitudes-anteriores/'} nombre="Histórico" icono={requerimientosViejos}/>
          
          {/* Gestion de cargos */}   
          <OpcionMenu ruta={'/cargos/'} nombre="Gestión de Cargos" icono={cargo}/> 

          {/* Consulta de solicitudes de personal */}
          {autorizarDirectorPP(this.props.usuario.rol) &&        
          <OpcionMenu ruta={'/consultar-solicitudes-personal/'} nombre="Consultar Solicitudes de Personal" icono={consultar}/> 
          }

          {/* Consulta consolidado de solicitudes de personal */}   
          {autorizarDirectorPP(this.props.usuario.rol) &&        
          <OpcionMenu ruta={'/consolidado-solicitudes-personal/'} nombre="Consultar Consolidado de Solicitudes de Personal" icono={consolidado}/>         
          }
        </Row>
      </React.Fragment>
    )
  }
}
export default withContext(Menu);
