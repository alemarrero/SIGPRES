import React, { Component } from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter} from 'reactstrap'; 
import './Main.css';

export default class Main extends Component {
  render() {
    return (
      <Container fluid style={{backgroundColor: "lightgray", minHeight: "100vh"}}>
        <Row className="fila-opciones-menu-principal">
          {/* Gestión de usuarios */}
          <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardBody>
                <h2>Gestión de usuarios</h2>
              </CardBody>
            </Card>
          </Col>    
          
          {/* Gestión presupuestal  */}
          <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardBody>
                <h2>Gestión presupuestal</h2>
              </CardBody>
            </Card>
          </Col>

          {/* Gestión de objetivos específicos */}
          <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardBody>
                <h2>Gestión de objetivos específicos</h2>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      )
  }
}
