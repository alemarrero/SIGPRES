import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './Administracion.css';
import usuarios from '../../assets/img/management.png';
import areas from '../../assets/img/areas.png';
import planes from '../../assets/img/planes-historicos.png';
import indicadores from '../../assets/img/indicadores.png';
import verificacion from '../../assets/img/verificacion.png';
import diagnostico from '../../assets/img/diagnostico.png';
import medida from '../../assets/img/unidad-medida.png';
import Usuarios from '../Usuarios/Usuarios';
import UnidadesDeMedida from '../UnidadesDeMedida/UnidadesDeMedida';
import { Switch, Route } from 'react-router-dom';


export default class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
            {/* Gestión de usuarios */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/usuarios')} body outline color="success"> 
                <CardBody>
                <img src={usuarios} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de usuarios</h2>
                </CardBody>
            </Card>
            </Col>     

            {/* Gestión de áreas */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/areas')} body outline color="success">
                <CardBody>
                <img src={areas} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de áreas</h2>
                </CardBody>
            </Card>
            </Col>                
      
            {/* Gestión de indicadores */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/indicadores')} body outline color="success">
                <CardBody>
                <img src={indicadores} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de indicadores</h2>
                </CardBody>
            </Card>
            </Col> 

            {/* Gestión de medios de verificación */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/medios-verificacion')} body outline color="success">
                <CardBody>
                <img src={verificacion} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de medios de verificación</h2>
                </CardBody>
            </Card>
            </Col> 

            {/* Gestión de unidades de medida */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/unidades-de-medida')} body outline color="success">
                <CardBody>
                <img src={medida} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de unidades de medida</h2>
                </CardBody>
            </Card>
            </Col> 

            {/* Gestión de planes historicos */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/planes-historicos')} body outline color="success">
                <CardBody>
                <img src={planes} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de planes históricos</h2>
                </CardBody>
            </Card>
            </Col> 

            {/* Gestión de diagnostico de la CMB */}
            <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card onClick={() => this.props.history.push(this.props.match.path + '/diagnostico')} body outline color="success">
                <CardBody>
                <img src={diagnostico} className="iconos-menu"/>    
                <h2 className="modulo-menu">Gestión de diagnóstico de la CMB</h2>
                </CardBody>
            </Card>
            </Col>  
      </Row>
    )
  }
}
