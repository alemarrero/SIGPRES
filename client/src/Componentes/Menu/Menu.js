import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
        <Row className="fila-opciones-menu-principal">
            {/* Gestión de usuarios */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push('/usuarios')}>
                <CardBody>
                <h2>Gestión de usuarios</h2>
                </CardBody>
            </Card>
            </Col>    
            
            {/* Gestión presupuestal  */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push('/presupuesto')}>
                <CardBody>
                <h2>Gestión presupuestal</h2>
                </CardBody>
            </Card>
            </Col>

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push('/objetivos-especificos')}>
                <CardBody>
                <h2>Gestión de objetivos específicos</h2>
                </CardBody>
            </Card>
            </Col>
      </Row>
    )
  }
}
