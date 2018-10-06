import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Menu.css';
import management from '../../assets/img/management.png';
import budget from '../../assets/img/budget.png';
import solution from '../../assets/img/solution.png';

export default class Menu extends Component {
  render() {
    return (
        <Row className="fila-opciones-menu-principal">
            {/* Gestión de usuarios */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'usuarios')} body outline color="success">
                <CardBody>
                <img src={management} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de usuarios</h2>
                </CardBody>
            </Card>
            </Col>    
            
            {/* Gestión presupuestal  */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'presupuesto')} body outline color="success">
                <CardBody>
                <img src={budget} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión presupuestal</h2>
                </CardBody>
            </Card>
            </Col>

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'objetivos-especificos')} body outline color="success">
                <CardBody>
                <img src={solution} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de planeación</h2>
                </CardBody>
            </Card>
            </Col>
      </Row>
    )
  }
}
