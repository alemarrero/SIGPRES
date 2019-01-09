import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import programas from '../../assets/img/usuarios.png';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import revision_poa from "./../../assets/img/revision_poa.png";
import { Breadcrumb, BreadcrumbItem, Row } from 'reactstrap';

export default class Planeacion extends Component {
  render() {
    return (

      <React.Fragment>
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem active>Planeación</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Row className="fila-opciones-menu-principal">
          {/* Gestión de Programas */}
          <OpcionMenu ruta={'/programas/'} nombre="Gestión de Programas" icono={programas}/>


          {/* Gestión de POA */}
          <OpcionMenu ruta={'/objetivos-especificos/'} nombre="Gestión de POA" icono={objetivos_especificos}/>

          {/* Revisión de POA */}
          <OpcionMenu ruta={'/revision-poa/'} nombre="Revisión de POA" icono={revision_poa}/>
          
        </Row>
      </React.Fragment>
    )
  }
}
