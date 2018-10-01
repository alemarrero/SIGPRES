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
      nombre: undefined,
      apellido: undefined,
      tipo_cedula: "V",
      numero_cedula: undefined,
      fecha_nacimiento: undefined,
      fecha_ingreso: undefined,
      direccion: undefined,
      cargo: undefined,
      usuario: undefined,
      password: undefined,
      rol: "regular",
      correo: undefined,
      modal_registrar_usuario_abierto: false,
      modal_registrar_usuario_fallido_abierto: false,
      modal_registrar_usuario_exitoso_abierto: false
    };
    this.registrarUsuario = this.registrarUsuario.bind(this);
    this.validarCamposModalNuevoUsuario = this.validarCamposModalNuevoUsuario.bind(this);
    this.correo_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  async registrarUsuario(e) {
    e.preventDefault();

    // Se ocultan los mensajes de error que puedan existir previamente
    document.getElementById("usuario-existente-modal-registro").style.display = 'none';

    if(this.validarCamposModalNuevoUsuario()){
      const request_body = JSON.stringify({
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        cedula: `${this.state.tipo_cedula}-${this.state.numero_cedula}`,
        fecha_ingreso: this.state.fecha_ingreso,
        fecha_nacimiento: this.state.fecha_nacimiento,
        departamento: this.state.direccion,
        cargo: this.state.cargo,
        rol: this.state.rol,
        correo: this.state.correo,
        usuario: this.state.usuario,
        password: this.state.password,
      });

      const request_options = {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: request_body
      };

      const registrar_usuario_request = await fetch('/api/auth/registro_usuario', request_options);
      const registrar_usuario_response = await registrar_usuario_request.json();

      if(registrar_usuario_response === 'ok'){
        this.setState({modal_registrar_usuario_abierto: false, modal_registrar_usuario_exitoso_abierto: true});
      }
      else if(registrar_usuario_response === 'usuario ya existe'){
        document.getElementById("usuario-existente-modal-registro").style.display = 'block';
      }
      else{
        console.log(registrar_usuario_response);
        this.setState({modal_registrar_usuario_fallido_abierto: true, modal_registrar_usuario_abierto: false});
      }
    }
  }

  validarCamposModalNuevoUsuario() {
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\s]+$/)){
      document.getElementById("nombre-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-registro").style.display = 'none';
    }

    // Validación del apellido
    if(this.state.apellido === undefined || !this.state.apellido.match(/^[A-Za-z\s]+$/)){
      document.getElementById("apellido-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("apellido-modal-registro").style.display = 'none';
    }

    // Validación del tipo de cédula
    if(this.state.tipo_cedula === undefined){
      document.getElementById("numero-cedula-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-cedula-modal-registro").style.display = 'none';
    }

    // Validación del número de cédula
    if(this.state.numero_cedula === undefined || !this.state.numero_cedula.match(/^[0-9]+$/)){
      document.getElementById("numero-cedula-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-cedula-modal-registro").style.display = 'none';
    }

    // Validación de la fecha de nacimiento
    if(this.state.fecha_nacimiento === undefined){
      document.getElementById("fecha-nacimiento-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("fecha-nacimiento-modal-registro").style.display = 'none';
    }

    // Validación de la fecha de ingreso
    if(this.state.fecha_ingreso === undefined){
      document.getElementById("fecha-ingreso-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("fecha-ingreso-modal-registro").style.display = 'none';
    }

    // Validación de la dirección del usuario
    if(this.state.direccion === undefined){
      document.getElementById("direccion-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("direccion-modal-registro").style.display = 'none';
    }

    // Validación del cargo del usuario
    if(this.state.cargo === undefined || !this.state.cargo.match(/^[A-Za-z\s]+$/)){
      document.getElementById("cargo-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-modal-registro").style.display = 'none';
    }

    // Validación del nombre de usuario
    if(this.state.usuario === undefined || !this.state.usuario.match(/^[a-z0-9]+$/)){
      document.getElementById("usuario-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("usuario-modal-registro").style.display = 'none';
    }

    // Validación de la password
    if(this.state.password === undefined || this.state.password.length < 6){
      document.getElementById("password-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("password-modal-registro").style.display = 'none';
    }

    // Validación del rol del usuario
    if(this.state.rol === undefined ){
      document.getElementById("rol-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("rol-modal-registro").style.display = 'none';
    }

    // Validación de la dirección de correo electrónico del usuario
    if(!this.correo_regex.test(this.state.correo)){
      document.getElementById("correo-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("correo-modal-registro").style.display = 'none';
    }

    return formulario_valido;
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
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre</Label>
                <Input 
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-registro" className="error-usuarios">Nombre inválido</span>
              </Col>
              
              {/* Apellido del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Apellido</Label>
                <Input
                  onChange={(e) => this.setState({apellido: e.target.value})}
                />
                <span id="apellido-modal-registro" className="error-usuarios">Apellido inválido</span>
              </Col>
            </FormGroup>

            {/* Cédula del usuario */}
            <FormGroup row>              
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Tipo de cédula</Label>
                <Input 
                  type="select"
                  onChange={(e) => this.setState({tipo_cedula: e.target.value})}
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </Input>
              </Col>
              
              <Col>
                <Label>Número de cédula</Label>
                <Input
                  onChange={(e) => this.setState({numero_cedula: e.target.value})}
                />
                <span id="numero-cedula-modal-registro" className="error-usuarios">Número de cédula inválido</span>
              </Col>
            </FormGroup>

            {/* Fechas de nacimiento e ingreso */}
            <FormGroup row>
              {/* Fecha de nacimiento */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de nacimiento</Label>
                <Input 
                  type="date"
                  onChange={(e) => this.setState({fecha_nacimiento: e.target.value})}  
                />
                <span id="fecha-nacimiento-modal-registro" className="error-usuarios">Fecha de nacimiento inválida</span>
              </Col>
              
              {/* Fecha de ingreso */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de ingreso a la CMB</Label>
                <Input 
                  type="date"
                  onChange={(e) => this.setState({fecha_ingreso: e.target.value})}
                />
                <span id="fecha-ingreso-modal-registro" className="error-usuarios">Fecha de ingreso inválida</span>
              </Col>
            </FormGroup>

            {/* Departamento y cargo */}
            <FormGroup row>
              {/* Departamento al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Dirección</Label>
                <Input
                  onChange={(e) => this.setState({direccion: e.target.value})}
                />
                <span id="direccion-modal-registro" className="error-usuarios">Departamento inválido</span>
              </Col>
              
              {/* Cargo del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Cargo</Label>
                <Input
                  onChange={(e) => this.setState({cargo: e.target.value})}
                />
                <span id="cargo-modal-registro" className="error-usuarios">Cargo inválido</span>
              </Col>
            </FormGroup>
            
            {/* Nombre y password del usuario */}
            <FormGroup row>
              {/* Nombre de usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre de usuario</Label>
                <Input
                  placeholder={this.state.nombre && this.state.apellido ? `Recomendación: ${(this.state.nombre.charAt(0) + this.state.apellido).toLowerCase()}` : undefined}
                  onChange={(e) => this.setState({usuario: e.target.value})}
                />
                <span id="usuario-modal-registro" className="error-usuarios">Nombre de usuario inválido</span>
                <span id="usuario-existente-modal-registro" className="error-usuarios">Nombre de usuario ya existe</span>
              </Col>

              {/* password */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Contraseña</Label>
                <Input 
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  onChange={(e) => this.setState({password: e.target.value})}
                />
                <span id="password-modal-registro" className="error-usuarios">password inválida</span>
              </Col>
            </FormGroup>

            {/* Rol del usuario */}
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}> 
                <Label>Rol del usuario</Label>   
                <Input 
                  type="select"
                  onChange={(e) => this.setState({rol: e.target.value})}
                >
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
                <Input
                  onChange={(e) => this.setState({correo: e.target.value})}
                />
                <span id="correo-modal-registro" className="error-usuarios">Correo electrónico inválido</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.registrarUsuario}>
              Crear usuario
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_registrar_usuario_abierto: false})}>
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
            <Button color="danger" onClick={() => this.setState({modal_registrar_usuario_fallido_abierto: false})}>
              Cerrar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    // Si el usuario se creó exitosamente, se muestra el siguiente modal
    let modal_registrar_usuario_exitoso = 
      <Modal isOpen={this.state.modal_registrar_usuario_exitoso_abierto} toggle={() => this.setState({modal_registrar_usuario_exitoso_abierto: !this.state.modal_registrar_usuario_exitoso_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_registrar_usuario_exitoso_abierto: !this.state.modal_registrar_usuario_exitoso_abierto})}>
          Usuario creado
        </ModalHeader>
        <ModalBody>
          <p>El usuario se ha creado exitosamente.</p>
        </ModalBody>
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={() => this.setState({modal_registrar_usuario_exitoso_abierto: false})}>
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
        {modal_registrar_usuario_exitoso}
        
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
