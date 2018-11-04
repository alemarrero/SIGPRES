import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import usuarios from '../../assets/img/usuarios.png';
import { Row } from 'reactstrap';

export default class Planeacion extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Gestión de Programas */}
        <OpcionMenu ruta={'/programas/'} nombre="Gestión de Programas" icono={usuarios}/>


        {/* Gestión de POA */}
        <OpcionMenu ruta={'/objetivos-especificos/'} nombre="Gestión de POA" icono={usuarios}/>

        {/* Revisión de POA */}
        <OpcionMenu ruta={'/revision-poa/'} nombre="Revisión de POA" icono={usuarios}/>
        
      </Row>
    )
  }
}
