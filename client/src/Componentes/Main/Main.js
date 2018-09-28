import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'; 
import './Main.css';

/**
 * TO DO
 *  - Colocarle cursor: pointer a las opciones para que el puntero le indique al usuario que los cuadros son opciones
 */
export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      autenticado: false,
      id_usuario: undefined
    }
  }

  async componentDidMount(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include', headers:{"accepts":"application/json"}});
    const session_response = await session_request.json();

    if(session_response !== 'err'){
      this.setState({...session_response});
    }
    else{
      // this.props.history.push('/');
    }
  }

  render() {
    return (
      <Container fluid style={{backgroundColor: "lightgray", minHeight: "100vh"}}>
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
      </Container>
      )
  }
}
