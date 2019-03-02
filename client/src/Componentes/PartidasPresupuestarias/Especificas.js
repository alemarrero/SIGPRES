import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import partidas_presupuestarias from '../../assets/img/partidas.png';
import './Especificas.css'
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';

export default class Especificas extends Component {
  constructor(props){
    super(props);
    this.state = {
      especificas: [],
      modal_crear_especifica_abierto: false,
      modal_editar_especifica_abierto: false,
      numero_especifica: undefined,
      denominacion: undefined,
      id: undefined,
      habilitada: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      generica_id: undefined,
    };
    this.obtenerEspecificas = this.obtenerEspecificas.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearEspecifica = this.crearEspecifica.bind(this);
    this.cargarModalEditarEspecifica = this.cargarModalEditarEspecifica.bind(this);
    this.deshabilitarEspecifica = this.deshabilitarEspecifica.bind(this);
    this.habilitarEspecifica = this.habilitarEspecifica.bind(this);
    this.editarEspecifica = this.editarEspecifica.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.obtenerInfoGenerica = this.obtenerInfoGenerica.bind(this); 
  }

  async obtenerInfoGenerica(){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          numero_generica: this.props.match.params.numero_generica
        })
      };

      const obtener_generica_request = await fetch(`/api/genericas/obtener_generica`, request_options);
      const obtener_generica_response = await obtener_generica_request.json();

      if(obtener_generica_response === 'err'){
        this.setState({modal_operacion_fallida: true, mensaje: "Error obteniendo la generica"});
      }
      else{
        this.setState({generica_id: obtener_generica_response.id });
      }      
  }

  async editarEspecifica(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          numero_especifica: this.state.numero_especifica,
          denominacion: this.state.denominacion,
          habilitada: this.state.habilitada
        })
      };

      const editar_especifica_request = await fetch(`/api/especificas/actualizar_especifica`, request_options);
      const editar_especifica_response = await editar_especifica_request.json();

      if(editar_especifica_response !== 'err'){
        this.setState({modal_editar_especifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Específica editada correctamente"}, async () => {
          this.obtenerEspecificas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_especifica_abierto: false, mensaje: "Error editando la específica"});
      }
    }
  }

  async deshabilitarEspecifica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_especifica_request = await fetch(`/api/especificas/deshabilitar_especifica`, request_options);
    const deshabilitar_especifica_response = await deshabilitar_especifica_request.json();

    if(deshabilitar_especifica_response !== 'err'){
      this.setState({modal_editar_especifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Específica deshabilitada correctamente"}, async () => {
        this.obtenerEspecificas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_especifica_abierto: false, mensaje: "Error deshabilitando la específica"});
    }
  }


  async habilitarEspecifica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_especifica_request = await fetch(`/api/especificas/habilitar_especifica`, request_options);
    const habilitar_especifica_response = await habilitar_especifica_request.json();

    if(habilitar_especifica_response !== 'err'){
      this.setState({modal_editar_especifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Específica habilitada correctamente"}, async () => {
        this.obtenerEspecificas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_especifica_abierto: false, mensaje: "Error habilitando la específica"});
    }
  }

  async crearEspecifica() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          generica_id: this.state.generica_id,
          numero_especifica: this.state.numero_especifica,
          denominacion: this.state.denominacion
        })
      };

      const crear_especifica_request = await fetch(`/api/especificas/crear_especifica`, request_options);
      const crear_especifica_response = await crear_especifica_request.json();

      if(crear_especifica_response !== 'err'){
        this.setState({modal_crear_especifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Específica creada correctamente"}, async () => {
          this.obtenerEspecificas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_especifica_abierto: false, mensaje: "Error creando la específica"});
      }
    }
  }

  async obtenerEspecificas(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        generica_id: this.state.generica_id,
      })
    };    
    const especificas_request = await fetch('/api/especificas/obtener_especificas', request_options);
    const especificas_response = await especificas_request.json();

    if(especificas_response !== 'err'){
      this.setState({especificas: especificas_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las específicas"});
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
    document.title = "SIGPRES CMB -Específicas";

    if(this.verificarSesion()){
      await this.obtenerInfoGenerica();
      this.obtenerEspecificas();
    }
  }

  cargarModalEditarEspecifica(ind) {
    const especifica = this.state.especificas[ind];

    this.setState({
      numero_especifica: especifica.numero_especifica,
      modal_editar_especifica_abierto: true,
      id: especifica.id,
      denominacion: especifica.denominacion,
      habilitada: especifica.habilitada
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del numero de la especifica
    if(this.state.numero_especifica === undefined || !this.state.numero_especifica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_especifica-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_especifica-modal-creacion").style.display = 'none';
    }    

    // Validación de la denominacion
    if(this.state.denominacion === undefined || this.state.denominacion === ""){
      document.getElementById("denominacion-modal-creacion").style.display = 'block';
      formulario_valido = false;    
    }
    else{
      document.getElementById("denominacion-modal-creacion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarModalEdicion(){
    let formulario_valido = true;

    // Validación del numero de la especifica
    if(this.state.numero_especifica === undefined || !this.state.numero_especifica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_especifica-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_especifica-modal-edicion").style.display = 'none';
    }
    
    // Validación de la denominacion    
    if(this.state.denominacion === undefined || this.state.denominacion === ""){
    document.getElementById("denominacion-modal-edicion").style.display = 'block';
    formulario_valido = false;
    }
    else{
      document.getElementById("denominacion-modal-edicion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Modal que muestra el formulario para poder crear una nueva específica
    let modal_crear_especifica = 
      <Modal isOpen={this.state.modal_crear_especifica_abierto} toggle={() => this.setState({modal_crear_especifica_abierto: !this.state.modal_crear_especifica_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_especifica_abierto: !this.state.modal_crear_especifica_abierto})}>
        Crear nueva específica
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Número de la específica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Número de la específica*</Label>
              <Input 
                onChange={(e) => this.setState({numero_especifica: e.target.value})}
              />
              <span id="numero_especifica-modal-creacion" className="error-especificas">Número de específica inválido. Este campo debe contener exactamente dos (2) números.</span>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Denominación de la específica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Denominación de la específica*</Label>
              <Input 
                onChange={(e) => this.setState({denominacion: e.target.value})}
              />
              <span id="denominacion-modal-creacion" className="error-especificas">Denominación inválida. Este campo no puede estar vacío.</span>
            </Col>
          </FormGroup>          

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearEspecifica} color="success" type="submit" className="boton-crear-modal-especifica">
            Crear específica
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_especifica_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar una específica existente
    let modal_editar_especifica = 
      <Modal isOpen={this.state.modal_editar_especifica_abierto} toggle={() => this.setState({modal_editar_especifica_abierto: !this.state.modal_editar_especifica_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_especifica_abierto: !this.state.modal_editar_especifica_abierto})}>
          Editar específica
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Número de la específica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Número de la específica*</Label>
                <Input 
                  defaultValue={this.state.numero_especifica}
                  onChange={(e) => this.setState({numero_especifica: e.target.value})}
                />
                <span id="numero_especifica-modal-edicion" className="error-especificas">Número de específica inválido. Este campo debe contener exactamente dos (2) números.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Denominación de la específica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Denominación*</Label>
                <Input 
                  defaultValue={this.state.denominacion}
                  onChange={(e) => this.setState({denominacion: e.target.value})}
                />
                <span id="denominacion-modal-edicion" className="error-especificas">Denominación inválida. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarEspecifica} className="boton-crear-modal-especifica">
              Editar específica
            </Button>

            {this.state.habilitada ? 
              <Button color="success" onClick={this.deshabilitarEspecifica} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarEspecifica} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_especifica_abierto: false})} className="boton-cancelar-modal">
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
        <Container fluid className="container-unidades-de-medida">

          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/partidas-presupuestarias`)}>Gestión de Partidas Presupuestarias</BreadcrumbItem>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/partida-presupuestaria/${this.props.match.params.numero_partida}`)}>Gestión de Genéricas de {this.props.match.params.numero_partida}</BreadcrumbItem>
              <BreadcrumbItem active>Gestión de Específicas de {this.props.match.params.numero_partida}.{this.props.match.params.numero_generica}</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_especifica}
          {modal_editar_especifica}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={partidas_presupuestarias} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Específicas de la Partida {this.props.match.params.numero_partida}-{this.props.match.params.numero_generica}</h1>
            </Col>

            {/* Botón para agregar específicas */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              {autorizarDirectorPP(this.props.usuario.rol) &&
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_especifica_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar específica
              </Button>
              }
            </Col>
          </Row>

          {/* Si existen específicas, muestra una tabla con su información */}
          {this.state.especificas.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número de la específica</th>
                    <th>Denominación de la específica</th>                    
                    <th>Habilitada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.especificas.map((especifica, index) => {
                      return(
                      <tr key={`${especifica.id}_${especifica.numero_especifica}_${especifica.denominacion}`}>
                          <th scope="row">{especifica.id}</th>
                          <td>{especifica.numero_especifica}</td>
                          <td>{especifica.denominacion}</td>
                          <td>{especifica.habilitada ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          <Button 
                              color="info" className="boton-ver"
                              onClick={() => this.props.history.push(`/inicio/presupuesto/partida-presupuestaria/${this.props.match.params.numero_partida}/generica/${this.props.match.params.numero_generica}/especifica/${especifica.numero_especifica}`)}
                          >
                              <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                              Sub-específica
                          </Button>
                          {autorizarDirectorPP(this.props.usuario.rol) &&
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarEspecifica(index)}
                          >
                              <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                              Gestionar
                          </Button>
                          }
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
