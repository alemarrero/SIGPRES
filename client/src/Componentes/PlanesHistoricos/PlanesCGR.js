import React, { Component } from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import cgr from '../../assets/img/cgr.png';
import './PlanesHistoricos.css';

export default class PlanesCGR extends Component {
  render() {
    return (
      <Container fluid className="container-planes">
        {/* Modales del componente */}
        

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={cgr} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Gestión de Planes Operativos <br/> de la Contraloría General de la República</h1>
          </Col>

          {/* Botón para agregar planes operativos */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_plan_operativo_abierto: true})}>
              <i className="iconos fa fa-plus" aria-hidden="true"></i>              
              Agregar plan operativo
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
