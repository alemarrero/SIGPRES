import React, { Component } from 'react';
import usuarios from '../../assets/img/usuarios.png';
import { Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Quejas extends Component {
  render() {
    return (
      <React.Fragment >
        <Row fluid={true} className="justify-content-center">
          <Col className="text-center">
            <h1>Quejas</h1>
          </Col>
        </Row>
        <Row fluid={true} className="justify-content-center">
          <Col className="text-center">
            <h4>Llena el siguiente formulario para enviar una queja</h4>
          </Col>
        </Row>
        <Row>

        </Row>
      </React.Fragment>
    )
  }
}
