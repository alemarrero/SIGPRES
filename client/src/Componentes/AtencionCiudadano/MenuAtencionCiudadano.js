import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import atencion_ciudadano from '../../assets/img/atencion_ciudadano.png';
import queja from '../../assets/img/queja.png';
import sugerencia from '../../assets/img/sugerencia.png';
import presupuesto_participativo from '../../assets/img/presupuesto_participativo.png';
import { Row, Col } from 'reactstrap';

export default class MenuAtencionCiudadano extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={atencion_ciudadano} className="icono-titulo"/>    
            <h1>Atención al Ciudadano</h1>
          </Col>
        </Row>
        <Row>
          {/* Gestión de Quejas */}
          <OpcionMenu ruta={'quejas'} nombre="Gestión de Quejas" icono={queja}/>
  
          {/* Gestión de Sugerencias */}
          <OpcionMenu ruta={'sugerencias'} nombre="Gestión de Sugerencias" icono={sugerencia}/>
  
          {/* Gestión de Presupuesto Participativo */}
          <OpcionMenu ruta={'presupuesto-participativo'} nombre="Presupuesto Participativo" icono={presupuesto_participativo}/>
        </Row>    
      </React.Fragment>
    )
  }
}
