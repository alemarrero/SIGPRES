import React, { Component } from 'react';
import queja from '../../assets/img/queja.png';
import { Button, Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Quejas extends Component {
  constructor(props){
    super(props);
    this.enviarQueja = this.enviarQueja.bind(this);
  }

  enviarQueja(e){
    e.preventDefault();
    alert("hey")
  }

  render() {
    return (
      <React.Fragment >
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={queja} className="icono-titulo"/>    
            <h1>Quejas</h1>
          </Col>
        </Row>
        <hr/>
        <Row className="justify-content-center">
          <Col className="text-center">
            <h4>Llena el siguiente formulario para enviar una queja</h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col  xs={12} sm={12} md={7} lg={7}>
            <Form onSubmit={this.enviarQueja}>
              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="nombre">Nombre*</Label>
                  <Input name="nombre" onChange={(e) => this.setState({nombre: e.target.value})}/>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="apellido">Apellido*</Label>
                  <Input name="apellido" onChange={(e) => this.setState({apellido: e.target.value})}/>
                </Col>
              </FormGroup>

              <FormGroup row>              
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label className="form-cedula">Número de cédula*</Label>
                  <Input 
                    type="select"
                    onChange={(e) => this.setState({tipo_cedula: e.target.value})}
                    className="tipo-cedula"
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                  </Input>
                  <Input
                    onChange={(e) => this.setState({numero_cedula: e.target.value})}
                    className="numero-cedula"
                  />
                  <span id="numero-cedula-modal-edicion" className="error-usuarios">Número de cédula inválido</span>                
                </Col>

                {/* Correo electrónico del usuario */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico*</Label>
                  <Input
                    onChange={(e) => this.setState({correo: e.target.value})}
                  />
                  <span id="correo-modal-edicion" className="error-usuarios">Correo electrónico inválido</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Dirección*</Label>
                  <Input
                    onChange={(e) => this.setState({direccion: e.target.value})}
                  />
                  <span id="correo-modal-edicion" className="error-usuarios">Correo electrónico inválido</span>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Teléfono de contacto*</Label>
                  <Input
                    onChange={(e) => this.setState({telefono: e.target.value})}
                  />
                  <span id="correo-modal-edicion" className="error-usuarios">Correo electrónico inválido</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Descripción de la queja*</Label>
                  <Input type="textarea" onChange={(e) => this.setState({descripcion: e.target.value})} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button type="submit" color="success">Enviar queja</Button>
                </Col>
                
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button type="reset" color="danger" style={{fontWeight: "bold"}}>Limpiar campos</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
