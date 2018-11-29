import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import nacion from '../../assets/img/venezuela.png';
import cgr from '../../assets/img/cgr.png';
import contraloria from '../../assets/img/contraloria.png';
import alcaldia from '../../assets/img/alcaldia.png';
import { Row } from 'reactstrap';

export default class PlanesHistoricos extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-planes-historicos">
        {/* Gestión de Planes de la Nación */}
        <OpcionMenu ruta={'/planes-nacion'} nombre="Gacetas Oficiales de la Nación" icono={nacion}/>

        {/* Gestión de Planes de la CGR */}
        <OpcionMenu ruta={'/planes-cgr'} nombre="Gacetas Oficiales de la CGR" icono={cgr}/>

        {/* Gestión de Planes de la Alcaldía */}
        <OpcionMenu ruta={'/planes-alcaldia'} nombre="Ordenanzas de la Alcaldía" icono={alcaldia}/>

        {/* Gestión de Planes de la CMB */}
        <OpcionMenu ruta={'/planes-cmb'} nombre="Ordenanzas de la CMB" icono={contraloria}/>
      </Row>
    )
  }
}
