import React, { Component } from 'react';
import './MediosDeVerificacion.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import verificacion from '../../assets/img/verificacion.png';
import withContext from '../../Contenedor/withContext';
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';

export class MediosDeVerificacion extends Component {
  constructor(props){
    super(props);
    this.state = {
      medios_de_verificacion: [],
      modal_crear_medio_abierto: false,
      modal_editar_medio_abierto: false,
      nombre: undefined,
      id: undefined,
      habilitado: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_confirmacion_abierto: false
    };
    this.obtenerdMediosDeVerificacion = this.obtenerdMediosDeVerificacion.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearMedioDeVerificacion = this.crearMedioDeVerificacion.bind(this);
    this.cargarModalEditarMedio = this.cargarModalEditarMedio.bind(this);
    this.deshabilitarMedio = this.deshabilitarMedio.bind(this);
    this.habilitarMedio = this.habilitarMedio.bind(this);
    this.editarMedio = this.editarMedio.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.eliminarMedioDeVerificacion = this.eliminarMedioDeVerificacion.bind(this);
  }

  async eliminarMedioDeVerificacion(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_usuario_request = await fetch('/api/medios_de_verificacion/eliminar_medio_de_verificacion', request_options);
    const eliminar_usuario_response = await eliminar_usuario_request.json();

    if(eliminar_usuario_response !== "err"){
        this.setState({modal_confirmacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Medio de verificación eliminado correctamente"}, async () => {
          this.obtenerUsuarios();
        })
    }
    else{
      this.setState({modal_confirmacion_abierto: false, modal_operacion_fallida: true, mensaje: "Error al eliminar el medio de verificación."});
    }
  }

  async editarMedio(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          nombre: this.state.nombre,
          habilitado: this.state.habilitado
        })
      };

      const editar_medio_request = await fetch(`/api/medios_de_verificacion/actualizar_medio_de_verificacion`, request_options);
      const editar_medio_response = await editar_medio_request.json();

      if(editar_medio_response !== 'err'){
        this.setState({modal_editar_medio_abierto: false, modal_operacion_exitosa: true, mensaje: "medio de verificación editada correctamente"}, async () => {
          this.obtenerdMediosDeVerificacion();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_medio_abierto: false, mensaje: "Error editando el medio de verificación"});
      }
    }
  }

  async deshabilitarMedio(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_medio_request = await fetch(`/api/medios_de_verificacion/deshabilitar_medio_de_verificacion`, request_options);
    const deshabilitar_medio_response = await deshabilitar_medio_request.json();

    if(deshabilitar_medio_response !== 'err'){
      this.setState({modal_editar_medio_abierto: false, modal_operacion_exitosa: true, mensaje: "medio de verificación deshabilitada correctamente"}, async () => {
        this.obtenerdMediosDeVerificacion();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_medio_abierto: false, mensaje: "Error deshabilitando el medio de verificación"});
    }
  }


  async habilitarMedio(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_medio_request = await fetch(`/api/medios_de_verificacion/habilitar_medio_de_verificacion`, request_options);
    const habilitar_medio_response = await habilitar_medio_request.json();

    if(habilitar_medio_response !== 'err'){
      this.setState({modal_editar_medio_abierto: false, modal_operacion_exitosa: true, mensaje: "medio de verificación habilitada correctamente"}, async () => {
        this.obtenerdMediosDeVerificacion();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_medio_abierto: false, mensaje: "Error habilitando el medio de verificación"});
    }
  }

  async crearMedioDeVerificacion() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          nombre: this.state.nombre
        })
      };

      const crear_medio_request = await fetch(`/api/medios_de_verificacion/crear_medio_de_verificacion`, request_options);
      const crear_medio_response = await crear_medio_request.json();

      if(crear_medio_response !== 'err'){
        this.setState({modal_crear_medio_abierto: false, modal_operacion_exitosa: true, mensaje: "medio de verificación creada correctamente"}, async () => {
          this.obtenerdMediosDeVerificacion();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_medio_abierto: false, mensaje: "Error creando el medio de verificación"});
      }
    }
  }

  async obtenerdMediosDeVerificacion(){
    const medios_de_verificacion_request = await fetch('/api/medios_de_verificacion/obtener_medios_de_verificacion', {credentials: 'include'});
    const medios_de_verificacion_response = await medios_de_verificacion_request.json();

    if(medios_de_verificacion_response !== 'err'){
      this.setState({medios_de_verificacion: medios_de_verificacion_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los medios de verificación"});
    }

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

  async componentDidMount(){
    document.title = "SICMB - Medios de Verificación";

    if(this.verificarSesion()){
      this.obtenerdMediosDeVerificacion();
    }
  }

  cargarModalEditarMedio(ind) {
    const medio = this.state.medios_de_verificacion[ind];

    this.setState({
      nombre: medio.nombre,
      modal_editar_medio_abierto: true,
      id: medio.id,
      habilitado: medio.habilitado
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || this.state.nombre === ""){
      document.getElementById("nombre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-creacion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarModalEdicion(){
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || this.state.nombre === ""){
      document.getElementById("nombre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-edicion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Modal que muestra el formulario para poder crear un nuevo medio de verificación
    let modal_crear_medio = 
      <Modal isOpen={this.state.modal_crear_medio_abierto} toggle={() => this.setState({modal_crear_medio_abierto: !this.state.modal_crear_medio_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_medio_abierto: !this.state.modal_crear_medio_abierto})}>
        Crear nuevo medio de verificación
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Nombre del medio de verificación*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Nombre del medio de verificación*</Label>
              <Input 
                onChange={(e) => this.setState({nombre: e.target.value})}
              />
              <span id="nombre-modal-creacion" className="error-medios-de-verificacion">Nombre inválido. Este campo no puede estar vacío.</span>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearMedioDeVerificacion} color="success" type="submit" className="boton-crear-modal">
            Crear medio
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_medio_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un medio de verificación existente
    let modal_editar_medio = 
      <Modal isOpen={this.state.modal_editar_medio_abierto} toggle={() => this.setState({modal_editar_medio_abierto: !this.state.modal_editar_medio_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_medio_abierto: !this.state.modal_editar_medio_abierto})}>
          Editar medio de verificación
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre del medio de verificación */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre del medio de verificación*</Label>
                <Input 
                  defaultValue={this.state.nombre}
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-edicion" className="error-medios-de-verificacion">Nombre inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarMedio} className="boton-crear-modal">
              Editar medio
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarMedio} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarMedio} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_medio_abierto: false, modal_confirmacion_abierto: true})} className="boton-cancelar-modal">
              Eliminar
            </Button>

            <Button color="danger" onClick={() => this.setState({modal_editar_medio_abierto: false})} className="boton-cancelar-modal">
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

    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar medio de verificación
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar el medio de verificación?</p>          
          <p>Si lo elimina no podrá recuperarlo luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={this.eliminarMedioDeVerificacion} className="boton-eliminar-solicitud">
              Eliminar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    return (
        <Container fluid className="container-medios-de-verificacion">
          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion`)} >Administración</BreadcrumbItem>          
              <BreadcrumbItem active onClick={() => this.props.history.push(`/inicio/administracion/medios-de-verificacion`)} >Gestión de Medios de Verificación</BreadcrumbItem>          
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_medio}
          {modal_editar_medio}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}
          {modal_confirmacion_eliminar}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={verificacion} className="icono-titulo"/>    
              <h1 className="titulo-medios-de-verificacion">Gestión de Medios de Verificación</h1>
            </Col>

            {/* Botón para agregar medios-de-verificacion */}
            {autorizarDirectorPP(this.props.usuario.rol) && 
              <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_medio_abierto: true})}>
                  <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                  Agregar medio de verificación
                </Button>
              </Col>
            }
          </Row>

          {/* Si existen medios-de-verificacion, muestra una tabla con su información */}
          {this.state.medios_de_verificacion.length > 0 && 
              <Row className="row-medios-de-verificacion">
              <Table striped className="tabla-medios-de-verificacion">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del medio de verificación</th>
                    <th>Habilitada</th>
                    {autorizarDirectorPP(this.props.usuario.rol) && 
                      <th>Opciones</th>
                    }
                  </tr>
                </thead>
                  <tbody>
                  {this.state.medios_de_verificacion.map((medio, index) => {
                      return(
                      <tr key={`${medio.id}_${medio.nombre}`}>
                          <th scope="row">{medio.id}</th>
                          <td>{medio.nombre}</td>
                          <td>{medio.habilitado ? <span>Si</span> : <span>No</span>}</td>
                          {autorizarDirectorPP(this.props.usuario.rol) && 
                            <td>
                              <Button 
                                  color="info" className="boton-gestionar"
                                  onClick={() => this.cargarModalEditarMedio(index)}
                              >
                                  <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                                  Gestionar
                              </Button>
                            </td>
                          }
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


export default withContext(MediosDeVerificacion);