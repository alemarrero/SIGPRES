import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Presupuesto.css';
import partidas from '../../assets/img/partidas.png';
import requerimientos from '../../assets/img/requerimientos.png';
import contabilidad from '../../assets/img/contabilidad.png';
import productos from '../../assets/img/productos.png';

export default class Menu extends Component {
  render() {
    return (
        <Row className="fila-opciones-menu-principal">
            {/* Gestión de partidas presupuestarias */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/partidas-presupuestarias')} body outline color="success">
                <CardBody>
                <img src={partidas} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de partidas presupuestarias</h2>
                </CardBody>
            </Card>
            </Col>    
            
            {/* Gestión presupuestal  */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/requerimientos')} body outline color="success">
                <CardBody>
                <img src={requerimientos} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de requerimientos de cada área</h2>
                </CardBody>
            </Card>
            </Col>

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/contabilidad-presupuestaria')} body outline color="success">
                <CardBody>
                <img src={contabilidad} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de contabilidad presupuestaria</h2>
                </CardBody>
            </Card>
            </Col>             

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/productos')} body outline color="success">
                <CardBody>
                <img src={productos} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de productos</h2>
                </CardBody>
            </Card>
            </Col>           
      </Row>
      
    )
  }
}
