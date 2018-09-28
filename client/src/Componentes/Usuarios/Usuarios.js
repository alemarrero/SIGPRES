import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';

/**
 * TO-DO
 *  - Personalizar clase de errores para que por defecto esten ocultados, tengan un tamaño de letra de 10px y tengan color rojo
 *  - Agregar validaciones de todos los campos de los modales
 *  - Conectar con backend
 */

 export default class Usuarios extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal_registrar_usuario_abierto: false,
      modal_registrar_usuario_fallido_abierto: false
    };
  }

  render() {

    // Modal que muestra el formulario para poder crear a un nuevo usuario
    let modal_registrar_usuario = 
      <Modal isOpen={this.state.modal_registrar_usuario_abierto} toggle={() => this.setState({modal_registrar_usuario_abierto: !this.state.modal_registrar_usuario_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_registrar_usuario_abierto: !this.state.modal_registrar_usuario_abierto})}>
          Registrar nuevo usuario
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre del usuario */}
              <Col sm={12} sm={12} md={6} lg={6}>
                <Label>Nombre</Label>
                <Input/>
                <span id="nombre-modal-registro" className="error-usuarios">Nombre inválido</span>
              </Col>
              
              {/* Apellido del usuario */}
              <Col sm={12} sm={12} md={6} lg={6}>
                <Label>Apellido</Label>
                <Input/>
                <span id="apellido-modal-registro" className="error-usuarios">Apellido inválido</span>
              </Col>
            </FormGroup>

            {/* Cédula del usuario */}
            <FormGroup row>              
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Tipo de cédula</Label>
                <Input type="select">
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </Input>
              </Col>
              
              <Col>
                <Label>Número de cédula</Label>
                <Input/>
                <span id="numero-cedula-modal-registro" className="error-usuarios">Número de cédula inválido</span>
              </Col>
            </FormGroup>

            {/* Fechas de nacimiento e ingreso */}
            <FormGroup row>
              {/* Fecha de nacimiento */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de nacimiento</Label>
                <Input type="date"/>
                <span id="fecha-nacimiento-modal-registro" className="error-usuarios">Fecha de nacimiento inválida</span>
              </Col>
              
              {/* Fecha de ingreso */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de ingreso a la CMB</Label>
                <Input type="date"/>
                <span id="fecha-ingreso-modal-registro" className="error-usuarios">Fecha de ingreso inválida</span>
              </Col>
            </FormGroup>

            {/* Departamento y cargo */}
            <FormGroup row>
              {/* Departamento al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Departamento</Label>
                <Input/>
                <span id="departamento-modal-registro" className="error-usuarios">Departamento inválido</span>
              </Col>
              
              {/* Cargo del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Cargo</Label>
                <Input/>
                <span id="cargo-modal-registro" className="error-usuarios">Cargo inválido</span>
              </Col>
            </FormGroup>
            
            {/* Nombre y contraseña del usuario */}
            <FormGroup row>
              {/* Nombre de usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre de usuario</Label>
                <Input/>
                <span id="usuario-modal-registro" className="error-usuarios">Nombre de usuario inválido</span>
                <span id="usuario-existente-modal-registro" className="error-usuarios">Nombre de usuario ya existe</span>
              </Col>

              {/* Contraseña */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Contraseña</Label>
                <Input type="password"/>
                <span id="password-modal-registro" className="error-usuarios">Contraseña inválida</span>
              </Col>
            </FormGroup>

            {/* Rol del usuario */}
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}> 
                <Label>Rol del usuario</Label>   
                <Input type="select">
                  <option value="administrador">Administrador</option>
                  <option value="director">Director</option>
                  <option value="regular">Regular</option>
                </Input>        
                <span id="rol-modal-registro" className="error-usuarios">Rol inválido</span>
              </Col>
            </FormGroup>

            {/* Correo electrónico del usuario */}
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Correo electrónico</Label>
                <Input/>
                <span id="correo-modal-registro" className="error-usuarios">Correo electrónico inválido</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" sm={12} sm={12} md={12} lg={12} >
            <Button color="success">
              Crear usuario
            </Button>
            
            <Button color="danger">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    // Si al crear un usuario ocurre un error este modal es mostrado
    let modal_registrar_usuario_fallido = 
      <Modal isOpen={this.state.modal_registrar_usuario_fallido_abierto} toggle={() => this.setState({modal_registrar_usuario_fallido_abierto: !this.state.modal_registrar_usuario_fallido_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_registrar_usuario_fallido_abierto: !this.state.modal_registrar_usuario_fallido_abierto})}>
          Error creando el usuario
        </ModalHeader>

        <ModalBody>
          <p>Ha ocurrido un error creando el usuario. Revisa la consola del navegador para obtener más detalles del error.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger">
              Cerrar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    return (
      <Container fluid>

        {/* Modales del componente */}
        {modal_registrar_usuario}
        {modal_registrar_usuario_fallido}
        
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <h1>Gestión de usuarios</h1>
          </Col>

          {/* Botón para agregar usuarios */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" onClick={() => this.setState({modal_registrar_usuario_abierto: true})}>
              Agregar usuario
            </Button>
          </Col>
        </Row>

        <Row>
          
        </Row>
      </Container>
    )
  }
}
