import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Menu.css';
import administracion from '../../assets/img/work-team.png';
import presupuesto from '../../assets/img/budget.png';
import planeacion from '../../assets/img/solution.png';

export default class Menu extends Component {
  render() {
    return (
        <Row className="fila-opciones-menu-principal">
            {/* Gestión de usuarios */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'administracion/')} body outline color="success">
                <CardBody>
                <img src={administracion} className="iconos-menu"/>    
                <h2 className="modulo-menu">Administración</h2>
                </CardBody>
            </Card>
            </Col>    
            
            {/* Gestión presupuestal  */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'presupuesto/')} body outline color="success">
                <CardBody>
                <img src={presupuesto} className="iconos-menu"/>    
                <h2 className="modulo-menu">Presupuesto</h2>
                </CardBody>
            </Card>
            </Col>

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + 'objetivos-especificos')} body outline color="success">
                <CardBody>
                <img src={planeacion} className="iconos-menu"/>    
                <h2 className="modulo-menu">Planeación</h2>
                </CardBody>
            </Card>
            </Col>
      </Row>
    )
  }
}
