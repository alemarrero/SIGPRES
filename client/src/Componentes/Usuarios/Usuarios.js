import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, 
  FormGroup, Input, Label, Table } from 'reactstrap';
import './Usuarios.css'
import usuarios from '../../assets/img/usuarios.png';
import withContext from './../../Contenedor/withContext';

 export class Usuarios extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal_confirmacion_abierto: false,
      apellido: undefined,
      cargo: undefined,
      correo: undefined,
      area_id: undefined,
      fecha_ingreso: undefined,
      fecha_nacimiento: undefined,
      habilitado: false,
      indice_usuario_seleccionado: undefined,
      mensaje: undefined,
      modal_editar_usuario_abierto: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_registrar_usuario_abierto: false,
      nombre: undefined,
      numero_cedula: undefined,
      password: undefined,
      actualizar_password: false,
      rol: "regular",
      tipo_cedula: "V",
      usuario: undefined,
      usuarios: [],
      usuario_id: undefined,
      areas: []
    };
    this.obtenerUsuarios = this.obtenerUsuarios.bind(this);
    this.registrarUsuario = this.registrarUsuario.bind(this);
    this.editarUsuario = this.editarUsuario.bind(this);
    this.validarCamposModalNuevoUsuario = this.validarCamposModalNuevoUsuario.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.cargarModalEditarUsuario = this.cargarModalEditarUsuario.bind(this);
    this.habilitarUsuario = this.habilitarUsuario.bind(this);
    this.deshabilitarUsuario = this.deshabilitarUsuario.bind(this);
    this.eliminarUsuario = this.eliminarUsuario.bind(this);
    this.correo_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  async eliminarUsuario(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_usuario_request = await fetch('/api/auth/eliminar_usuario', request_options);
    const eliminar_usuario_response = await eliminar_usuario_request.json();

    if(eliminar_usuario_response !== "err"){
        this.setState({modal_confirmacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Usuario eliminado correctamente"}, async () => {
          this.obtenerUsuarios();
        })
    }
    else{
      this.setState({modal_confirmacion_abierto: false, modal_operacion_fallida: true, mensaje: "Error al eliminar el usuario."});
    }
  }

  async habilitarUsuario() {
    const request_body = JSON.stringify({
      id: this.state.id
    });

    const request_options = {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: request_body
    };

    const habilitar_usuario_request = await fetch('/api/auth/habilitar_usuario', request_options);
    const habilitar_usuario_response = await habilitar_usuario_request.json();

    if(habilitar_usuario_response === 'ok'){
      this.setState({modal_editar_usuario_abierto: false, modal_operacion_exitosa: true, mensaje: "Usuario habilitado correctamente"}, async () => {
        this.obtenerUsuarios();
      });
    }
    // else if(editar_usuario_response === 'usuario ya existe'){
    //   document.getElementById("usuario-existente-modal-edicion").style.display = 'block';
    // }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_usuario_abierto: false, mensaje: "Error habilitando el usuario"});
    }
  }
  
  async deshabilitarUsuario() {
    const request_body = JSON.stringify({
      id: this.state.id
    });

    const request_options = {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: request_body
    };

    const deshabilitar_usuario_request = await fetch('/api/auth/deshabilitar_usuario', request_options);
    const deshabilitar_usuario_response = await deshabilitar_usuario_request.json();

    if(deshabilitar_usuario_response === 'ok'){
      this.setState({modal_editar_usuario_abierto: false, modal_operacion_exitosa: true, mensaje: "Usuario deshabilitado correctamente"}, async () => {
        this.obtenerUsuarios();
      });
    }
    // else if(editar_usuario_response === 'usuario ya existe'){
    //   document.getElementById("usuario-existente-modal-edicion").style.display = 'block';
    // }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_usuario_abierto: false, mensaje: "Error deshabilitando el usuario"});
    }
  }

  cargarModalEditarUsuario(ind) {
    const usuario = this.state.usuarios[ind];

    const cedula = usuario.cedula.split("-");
    this.setState({
      apellido: usuario.apellido,
      cargo: usuario.cargo,
      correo: usuario.correo,
      area_id: usuario.area_id,
      fecha_ingreso: usuario.fecha_ingreso.split("T")[0],
      fecha_nacimiento: usuario.fecha_nacimiento.split("T")[0],
      nombre: usuario.nombre,
      numero_cedula: cedula[1],
      rol: usuario.rol,
      tipo_cedula: cedula[0],
      usuario: usuario.usuario,
      modal_editar_usuario_abierto: true,
      id: usuario.id,
      habilitado: usuario.habilitado
    });
  }

  async verificarSesion() {
    const session_request = await fetch('/api/auth/session', {credentials: 'include'});
    const session_response = await session_request.json();

    if(!session_response.autenticado){
      this.props.history.push('/');
    }
    else{
      return true;
    }
  }

  async obtenerUsuarios(){
    const users_request = await fetch('/api/auth/obtener_usuarios', {credentials: 'include'});
    const users_response = await users_request.json();

    if(users_response !== 'err'){
      this.setState({usuarios: users_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los usuarios"});
    }

  }

  async componentDidMount(){
    document.title = "SIGPRES CMB -Gestión de Usuarios";
    if(this.verificarSesion()){
      this.obtenerUsuarios();
      this.obtenerAreas()
    }
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
        area_id: this.state.area_id,
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
        this.setState({modal_registrar_usuario_abierto: false, modal_operacion_exitosa: true, mensaje: "Usuario creado correctamente"}, async () => {
          this.obtenerUsuarios();
        });
      }
      else if(registrar_usuario_response === 'usuario ya existe'){
        document.getElementById("usuario-existente-modal-registro").style.display = 'block';
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_registrar_usuario_abierto: false, mensaje: "Error creando el usuario"});
      }
    }
  }

  async editarUsuario(e) {
    e.preventDefault();

    // Se ocultan los mensajes de error que puedan existir previamente
    document.getElementById("usuario-existente-modal-edicion").style.display = 'none';

    if(this.validarCamposModalEditarUsuario()){
      const request_body = JSON.stringify({
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        cedula: `${this.state.tipo_cedula}-${this.state.numero_cedula}`,
        fecha_ingreso: this.state.fecha_ingreso,
        fecha_nacimiento: this.state.fecha_nacimiento,
        area_id: this.state.area_id,
        cargo: this.state.cargo,
        rol: this.state.rol,
        correo: this.state.correo,
        usuario: this.state.usuario,
        id: this.state.id,
        password: this.state.password,
        actualizar_password: this.state.actualizar_password
      });

      const request_options = {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: request_body
      };

      const editar_usuario_request = await fetch('/api/auth/actualizar_usuario', request_options);
      const editar_usuario_response = await editar_usuario_request.json();

      if(editar_usuario_response === 'ok'){
        this.setState({modal_editar_usuario_abierto: false, modal_operacion_exitosa: true, mensaje: "Usuario editado correctamente"}, async () => {
          this.obtenerUsuarios();
        });
      }
      // else if(editar_usuario_response === 'usuario ya existe'){
      //   document.getElementById("usuario-existente-modal-edicion").style.display = 'block';
      // }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_usuario_abierto: false, mensaje: "Error editando el usuario"});
      }
    }
  }

  validarCamposModalNuevoUsuario() {
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("nombre-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-registro").style.display = 'none';
    }

    // Validación del apellido
    if(this.state.apellido === undefined || !this.state.apellido.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
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
    let año_nacimiento = 9999;

    if(this.state.fecha_nacimiento !== undefined){
      año_nacimiento = this.state.fecha_nacimiento.split("-")[0];
    }
    else{
      document.getElementById("fecha-nacimiento-modal-registro").style.display = 'block';
      formulario_valido = false;
    }

    const fecha_actual = new Date();
    const año_actual = fecha_actual.getFullYear();

    if(this.state.fecha_nacimiento === undefined || año_actual - año_nacimiento < 18){
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
    if(this.state.area_id === undefined){
      document.getElementById("area-modal-registro").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("area-modal-registro").style.display = 'none';
    }

    // Validación del cargo del usuario
    if(this.state.cargo === undefined || !this.state.cargo.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
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

  validarCamposModalEditarUsuario() {
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("nombre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-edicion").style.display = 'none';
    }

    // Validación del apellido
    if(this.state.apellido === undefined || !this.state.apellido.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("apellido-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("apellido-modal-edicion").style.display = 'none';
    }

    // Validación del tipo de cédula
    if(this.state.tipo_cedula === undefined){
      document.getElementById("numero-cedula-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-cedula-modal-edicion").style.display = 'none';
    }

    // Validación del número de cédula
    if(this.state.numero_cedula === undefined || !this.state.numero_cedula.match(/^[0-9]+$/)){
      document.getElementById("numero-cedula-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-cedula-modal-edicion").style.display = 'none';
    }

    // Validación de la fecha de nacimiento
    const año_nacimiento = this.state.fecha_nacimiento.split("-")[0];
    const fecha_actual = new Date();
    const año_actual = fecha_actual.getFullYear();

    if(this.state.fecha_nacimiento === undefined || año_actual - año_nacimiento < 18){
      document.getElementById("fecha-nacimiento-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("fecha-nacimiento-modal-edicion").style.display = 'none';
    }

    // Validación de la fecha de ingreso
    if(this.state.fecha_ingreso === undefined){
      document.getElementById("fecha-ingreso-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("fecha-ingreso-modal-edicion").style.display = 'none';
    }

    // Validación de la dirección del usuario
    if(this.state.area_id === undefined){
      document.getElementById("area-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("area-modal-edicion").style.display = 'none';
    }

    // Validación del cargo del usuario
    if(this.state.cargo === undefined || !this.state.cargo.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("cargo-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-modal-edicion").style.display = 'none';
    }

    // Validación del nombre de usuario
    if(this.state.usuario === undefined || !this.state.usuario.match(/^[a-z0-9]+$/)){
      document.getElementById("usuario-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("usuario-modal-edicion").style.display = 'none';
    }

    // Validación de la password
    // if(this.state.password === undefined || this.state.password.length < 6){
    //   document.getElementById("password-modal-edicion").style.display = 'block';
    //   formulario_valido = false;
    // }
    // else{
    //   document.getElementById("password-modal-edicion").style.display = 'none';
    // }

    // Validación del rol del usuario
    if(this.state.rol === undefined ){
      document.getElementById("rol-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("rol-modal-edicion").style.display = 'none';
    }

    if(this.state.actualizar_password && (this.state.password === undefined || this.state.password.length < 6)){
      document.getElementById("password-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("password-modal-edicion").style.display = 'none';
    }

    // Validación de la dirección de correo electrónico del usuario
    if(!this.correo_regex.test(this.state.correo)){
      document.getElementById("correo-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("correo-modal-edicion").style.display = 'none';
    }

    return formulario_valido;
  }

  render() {

    const date = new Date();

    const maxDate = date.toISOString().substring(0,10);

    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar solicitud de personal
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar el usuario?</p>          
          <p>Si lo elimina no podrá recuperarlo luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={this.eliminarUsuario} className="boton-eliminar-solicitud">
              Eliminar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;
    

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
                <Label>Nombre*</Label>
                <Input 
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-registro" className="error-usuarios">Nombre inválido. Este campo solo puede contener letras y espacios.</span>
              </Col>
              
              {/* Apellido del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Apellido*</Label>
                <Input
                  onChange={(e) => this.setState({apellido: e.target.value})}
                />
                <span id="apellido-modal-registro" className="error-usuarios">Apellido inválido. Este campo solo puede contener letras y espacios.</span>
              </Col>
            </FormGroup>

            {/* Cédula del usuario */}
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
                <Input onChange={(e) => this.setState({numero_cedula: e.target.value})} className="numero-cedula"/>
                <span id="numero-cedula-modal-registro" className="error-usuarios">Número de cédula inválido. Este campo solo puede contener números.</span>                
              </Col>

            {/* Correo electrónico del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Correo electrónico*</Label>
                <Input
                  onChange={(e) => this.setState({correo: e.target.value})}
                />
                <span id="correo-modal-registro" className="error-usuarios">Correo electrónico inválido. Debe ser un correo con el formato: nombre@dominio.com</span>
              </Col>
            </FormGroup>            

            {/* Fechas de nacimiento e ingreso */}
            <FormGroup row>
              {/* Fecha de nacimiento */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de nacimiento*</Label>
                <Input 
                  type="date"
                  max={maxDate}
                  onChange={(e) => this.setState({fecha_nacimiento: e.target.value})}  
                />
                <span id="fecha-nacimiento-modal-registro" className="error-usuarios">Fecha de nacimiento inválida. El usuario debe ser mayor a 18 años.</span>
              </Col>
              
              {/* Fecha de ingreso */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de ingreso a la CMB*</Label>
                <Input 
                  type="date"
                  max={maxDate}
                  onChange={(e) => this.setState({fecha_ingreso: e.target.value})}
                />
                <span id="fecha-ingreso-modal-registro" className="error-usuarios">Fecha de ingreso inválida</span>
              </Col>
            </FormGroup>

            {/* Departamento y cargo */}
            <FormGroup row>
              {/* Departamento al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Dirección*</Label>
                <Input
                type="select"
                  onChange={(e) => this.setState({area_id: e.target.value})}
                >
                  {this.props.areas.map((area, index) => {
                    return(
                      <option value={area.id} key={`area_${area.index}`}>{area.nombre}</option>
                    )
                  })}
                </Input>

                <span id="area-modal-registro" className="error-usuarios">Dirección inválida. Seleccione una opción de la lista.</span>
              </Col>
              
              {/* Cargo del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Cargo*</Label>
                <Input
                  onChange={(e) => this.setState({cargo: e.target.value})}
                />
                <span id="cargo-modal-registro" className="error-usuarios">Cargo inválido. Este campo solo puede contener letras y espacios.</span>
              </Col>
            </FormGroup>            
                        
            {/* Nombre y password del usuario */}
            <FormGroup row>
              {/* Nombre de usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre de usuario*</Label>
                <Input
                  placeholder={this.state.nombre && this.state.apellido ? `Recomendación: ${(this.state.nombre.charAt(0) + this.state.apellido).toLowerCase()}` : undefined}
                  onChange={(e) => this.setState({usuario: e.target.value})}
                />
                <span id="usuario-modal-registro" className="error-usuarios">Nombre de usuario inválido. Utilice únicamente letras y números, no incluya símbolos ni espacios.</span>
                <span id="usuario-existente-modal-registro" className="error-usuarios">Nombre de usuario ya existe</span>
              </Col>

              {/* password */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Contraseña*</Label>
                <Input 
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  onChange={(e) => this.setState({password: e.target.value})}
                />
                <span id="password-modal-registro" className="error-usuarios">Contrseña inválida</span>
              </Col>
            </FormGroup>

            {/* Rol del usuario */}
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}> 
                <Label>Rol del usuario*</Label>   
                <Input 
                  type="select"
                  onChange={(e) => this.setState({rol: e.target.value})}
                >
                  <option value="administrador">Administrador</option>
                  <option value="director pp">Director de Planificación y Presupuesto</option>
                  <option value="director rh">Director de Recursos Humanos</option>
                  <option value="director">Director</option>
                  <option value="regular">Regular</option>
                </Input>        
                <span id="rol-modal-registro" className="error-usuarios">Rol inválido. Selecciona una opción de la lista.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.registrarUsuario} className="boton-crear-modal">
              Crear usuario
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_registrar_usuario_abierto: false})} className="boton-cancelar-modal">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    // Modal que muestra el formulario para poder editar a un usuario existente
    let modal_editar_usuario = 
      <Modal isOpen={this.state.modal_editar_usuario_abierto} toggle={() => this.setState({modal_editar_usuario_abierto: !this.state.modal_editar_usuario_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_editar_usuario_abierto: !this.state.modal_editar_usuario_abierto})}>
          Editar usuario {this.state.usuario}
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre*</Label>
                <Input 
                  defaultValue={this.state.nombre}
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-edicion" className="error-usuarios">Nombre inválido´. Este campo solo puede contener letras y espacios.</span>
              </Col>
              
              {/* Apellido del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Apellido*</Label>
                <Input
                  defaultValue={this.state.apellido}
                  onChange={(e) => this.setState({apellido: e.target.value})}
                />
                <span id="apellido-modal-edicion" className="error-usuarios">Apellido inválido. Este campo solo puede contener letras y espacios.</span>
              </Col>
            </FormGroup>

            {/* Cédula del usuario */}
            <FormGroup row>              
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label className="form-cedula">Número de cédula*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.tipo_cedula}
                  onChange={(e) => this.setState({tipo_cedula: e.target.value})}
                  className="tipo-cedula"
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </Input>
                <Input
                  defaultValue={this.state.numero_cedula}
                  onChange={(e) => this.setState({numero_cedula: e.target.value})}
                  className="numero-cedula"
                />
                <span id="numero-cedula-modal-edicion" className="error-usuarios">Número de cédula inválido. Este campo solo puede contener números.</span>                
              </Col>

              {/* Correo electrónico del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Correo electrónico*</Label>
                <Input
                  defaultValue={this.state.correo}
                  onChange={(e) => this.setState({correo: e.target.value})}
                />
                <span id="correo-modal-edicion" className="error-usuarios">Correo electrónico inválido. Ingrese un correo de la forma nombre@dominio.com</span>
              </Col>
            </FormGroup>

            {/* Fechas de nacimiento e ingreso */}
            <FormGroup row>
              {/* Fecha de nacimiento */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de nacimiento*</Label>
                <Input 
                  defaultValue={this.state.fecha_nacimiento}
                  type="date"
                  onChange={(e) => this.setState({fecha_nacimiento: e.target.value})}  
                />
                <span id="fecha-nacimiento-modal-edicion" className="error-usuarios">Fecha de nacimiento inválida. El usuario debe ser mayor a 18 años.</span>
              </Col>
              
              {/* Fecha de ingreso */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de ingreso a la CMB*</Label>
                <Input 
                  defaultValue={this.state.fecha_ingreso}
                  type="date"
                  onChange={(e) => this.setState({fecha_ingreso: e.target.value})}
                />
                <span id="fecha-ingreso-modal-edicion" className="error-usuarios">Fecha de ingreso inválida</span>
              </Col>
            </FormGroup>

            {/* Dirección y cargo */}
            <FormGroup row>
              {/* Dirección al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Dirección*</Label>
                <Input
                  type="select"
                  defaultValue={this.state.area_id}
                  onChange={(e) => this.setState({area_id: e.target.value})}
                >
                  {this.props.areas.map((area, index) => {
                    return(
                      <option value={area.id} key={`area_${area.index}`}>{area.nombre}</option>
                    )
                  })}
               </Input>
                <span id="area-modal-edicion" className="error-usuarios">Dirección inválida. Seleccione una opción de la lista.</span>
              </Col>
              
              {/* Cargo del usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Cargo*</Label>
                <Input
                  defaultValue={this.state.cargo}
                  onChange={(e) => this.setState({cargo: e.target.value})}
                />
                <span id="cargo-modal-edicion" className="error-usuarios">Cargo inválido. Este campo solo puede contener letras y espacios.</span>
              </Col>
            </FormGroup>
            
            {/* Nombre y password del usuario */}
            <FormGroup row>
              {/* Nombre de usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Nombre de usuario*</Label>
                <Input
                  disabled={true}
                  defaultValue={this.state.usuario}
                  onChange={(e) => this.setState({usuario: e.target.value})}
                />
                <span id="usuario-modal-edicion" className="error-usuarios">Nombre de usuario inválido. Utilice únicamente letras y números, no incluya símbolos ni espacios.</span>
                <span id="usuario-existente-modal-edicion" className="error-usuarios">Nombre de usuario ya existe</span>
              </Col>

              {/* password */}
              {/* <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Contraseña</Label>
                <Input 
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  onChange={(e) => this.setState({password: e.target.value})}
                />
                <span id="password-modal-edicion" className="error-usuarios">password inválida</span>
              </Col> */}
            </FormGroup>

            {/* Rol del usuario */}
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}> 
                <Label>Rol del usuario*</Label>   
                <Input 
                  defaultValue={this.state.rol}
                  type="select"
                  onChange={(e) => this.setState({rol: e.target.value})}
                >
                  <option value="administrador">Administrador</option>
                  <option value="director pp">Director de Planificación y Presupuesto</option>
                  <option value="director">Director</option>
                  <option value="regular">Regular</option>
                </Input>        
                <span id="rol-modal-edicion" className="error-usuarios">Rol inválido. Selecciona una opción de la lista.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}> 
                <Col xs={12} sm={12} md={12} lg={12}> 
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({actualizar_password: e.target.checked})}/>{' '}
                    Cambiar contraseña
                  </Label>
                </Col>
                {this.state.actualizar_password && 
                  <Col>
                    <Input 
                      type="password"
                      placeHolder="Introduzca la nueva contraseña"
                      onChange={(e) => this.setState({password: e.target.value})}
                    />
                  </Col>
                }
                <span id="password-modal-edicion" className="error-usuarios">Contraseña inválida. Debe tener por lo menos 6 caracteres.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarUsuario} className="boton-crear-modal">
              Editar usuario
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarUsuario} className="boton-crear-modal">
                Deshabilitar usuario
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarUsuario} className="boton-crear-modal">
                Habilitar usuario
              </Button>
                
            }

            <Button color="danger" onClick={() => this.setState({modal_editar_usuario_abierto: false, modal_confirmacion_abierto: true})} className="boton-cancelar-modal">
              Eliminar
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_editar_usuario_abierto: false})} className="boton-cancelar-modal">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_operacion_fallida = 
      <Modal isOpen={this.state.modal_operacion_fallida} toggle={() => this.setState({modal_operacion_fallida: !this.state.modal_operacion_fallida})}>
        <ModalHeader toggle={() => this.setState({modal_operacion_fallida: !this.state.modal_operacion_fallida})}>
          Error en la operación
        </ModalHeader>

        <ModalBody>
          <p>Ha ocurrido un error al procesar la operación.</p>
          <p>Mensaje: {this.state.mensaje}</p>
          <p>Revise la consola del navegador o del servidor para obtener más información acerca del error.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={() => this.setState({modal_operacion_fallida: false})}>
              Cerrar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    // Si al realizar cualquier operación, esta se realiza exitosamente, se muestra este modal
    let modal_operacion_exitosa = 
      <Modal isOpen={this.state.modal_operacion_exitosa} toggle={() => this.setState({modal_operacion_exitosa: !this.state.modal_operacion_exitosa})}>
        <ModalHeader toggle={() => this.setState({modal_operacion_exitosa: !this.state.modal_operacion_exitosa})}>
          Operación exitosa
        </ModalHeader>
        <ModalBody>
          <p>La operación se ha realizado exitosamente.</p>
          <p>Mensaje: {this.state.mensaje}</p>
        </ModalBody>
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={() => this.setState({modal_operacion_exitosa: false})}>
              Cerrar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Container fluid className="container-usuarios">
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion`)} >Administración</BreadcrumbItem>          
            <BreadcrumbItem active onClick={() => this.props.history.push(`/inicio/administracion/usuarios`)} >Gestión de usuarios</BreadcrumbItem>          
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_registrar_usuario}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_editar_usuario}
        {modal_confirmacion_eliminar}
        
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={usuarios} className="icono-titulo"/>    
            <h1 className="titulo-usuarios">Gestión de usuarios</h1>
          </Col>

          {/* Botón para agregar usuarios */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_registrar_usuario_abierto: true, area_id: this.props.areas[0].id})}>
            <i className="iconos fa fa-plus" aria-hidden="true"></i>              
            Agregar usuario
            </Button>
          </Col>
        </Row>

        {/* Si existen usuarios, muestra una tabla con su información */}
        {this.state.usuarios.length > 0 && 
          <Row className="row-usuario">
            <Table striped className="tabla-usuarios">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Rol</th>
                  <th>Habilitado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.usuarios.map((usuario, index) => {
                  return(
                    <tr key={`${usuario.id}_${usuario.usuario}`}>
                      <th scope="row">{usuario.id}</th>
                      <td>{usuario.usuario}</td>
                      <td>{usuario.nombre} {usuario.apellido}</td>
                      <td>{usuario.area_id}</td>
                      <td>{usuario.rol}</td>
                      <td>{usuario.habilitado ? <span>Si</span> : <span>No</span>}</td>
                      <td>
                        <Button 
                          color="info" className="boton-gestionar"
                          onClick={() => this.cargarModalEditarUsuario(index)}
                        >
                          <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                          Gestionar
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Row>
        }
      </Container>
    )
  }
}

export default withContext(Usuarios);