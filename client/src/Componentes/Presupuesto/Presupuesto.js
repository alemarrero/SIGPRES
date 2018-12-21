import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardBody} from 'reactstrap';
import './Presupuesto.css';
import partidas from '../../assets/img/partidas.png';
import requerimientos from '../../assets/img/requerimientos.png';
import contabilidad from '../../assets/img/contabilidad.png';
import presupuesto_final from '../../assets/img/presupuesto_final.png';
import productos from '../../assets/img/productos.png';
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';
import withContext from './../../Contenedor/withContext';

export class Menu extends Component {
  render() {
    return (
        <React.Fragment>

            <div>
              <Breadcrumb>
                <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
                <BreadcrumbItem active>Presupuesto</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <Row className="fila-opciones-menu-principal">
                {/* Gestión de partidas presupuestarias */}
                {autorizarDirectorPP(this.props.usuario.rol) &&
                <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
                <Card onClick={() => this.props.history.push(this.props.match.path + '/partidas-presupuestarias')} body outline color="success">
                    <CardBody>
                    <img src={partidas} className="iconos-menu"/>    
                    <h2 className="modulo-menu">Gestión de partidas presupuestarias</h2>
                    </CardBody>
                </Card>
                </Col>  
                }  
                
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
                {autorizarDirectorPP(this.props.usuario.rol) &&
                <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
                <Card onClick={() => this.props.history.push(this.props.match.path + '/vinculacion-poa-presupuesto')} body outline color="success">
                    <CardBody>
                    <img src={contabilidad} className="iconos-menu"/>    
                    <h2 className="modulo-menu">Vinculación POA - Presupuesto</h2>
                    </CardBody>
                </Card>
                </Col>           
                }  

                {/* Gestión de objetivos específicos */}
                {autorizarDirectorPP(this.props.usuario.rol) &&
                <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
                <Card onClick={() => this.props.history.push(this.props.match.path + '/presupuesto-final')} body outline color="success">
                    <CardBody>
                    <img src={presupuesto_final} className="iconos-menu"/>    
                    <h2 className="modulo-menu">Presupuesto Final</h2>
                    </CardBody>
                </Card>
                </Col> 
                }            

                {/* Gestión de objetivos específicos */}
                <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
                <Card onClick={() => this.props.history.push(this.props.match.path + '/productos')} body outline color="success">
                    <CardBody>
                    <img src={productos} className="iconos-menu"/>    
                    <h2 className="modulo-menu">Catálogo de productos</h2>
                    </CardBody>
                </Card>
                </Col>           
          </Row>
        </React.Fragment>

      
    )
  }
}
export default withContext(Menu);
