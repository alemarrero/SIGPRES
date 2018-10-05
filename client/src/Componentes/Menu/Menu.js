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
<<<<<<< HEAD
            <Card onClick={() => this.props.history.push('/usuarios')} body outline color="success">
=======
            <Card onClick={() => this.props.history.push(this.props.match.path + 'usuarios')}>
>>>>>>> 162b344e480525939598937d9000dd8bb38dc0b5
                <CardBody>
                <img src={management}/>    
                <h2>Gestión de usuarios</h2>
                </CardBody>
            </Card>
            </Col>    
            
            {/* Gestión presupuestal  */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
<<<<<<< HEAD
            <Card onClick={() => this.props.history.push('/presupuesto')} body outline color="success">
=======
            <Card onClick={() => this.props.history.push(this.props.match.path + 'presupuesto')}>
>>>>>>> 162b344e480525939598937d9000dd8bb38dc0b5
                <CardBody>
                <img src={budget}/>    
                <h2>Gestión presupuestal</h2>
                </CardBody>
            </Card>
            </Col>

            {/* Gestión de objetivos específicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
<<<<<<< HEAD
            <Card onClick={() => this.props.history.push('/objetivos-especificos')} body outline color="success">
=======
            <Card onClick={() => this.props.history.push(this.props.match.path + 'objetivos-especificos')}>
>>>>>>> 162b344e480525939598937d9000dd8bb38dc0b5
                <CardBody>
                <img src={solution}/>    
                <h2>Gestión de planeación</h2>
                </CardBody>
            </Card>
            </Col>
      </Row>
    )
  }
}
