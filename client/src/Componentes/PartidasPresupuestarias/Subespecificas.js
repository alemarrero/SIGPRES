import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import partidas_presupuestarias from '../../assets/img/partidas.png';
import './Subespecificas.css'

export default class Subespecificas extends Component {
  constructor(props){
    super(props);
    this.state = {
      subespecificas: [],
      modal_crear_subespecifica_abierto: false,
      modal_editar_subespecifica_abierto: false,
      numero_subespecifica: undefined,
      denominacion: undefined,
      id: undefined,
      habilitada: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      especifica_id: undefined,
    };
    this.obtenerSubespecificas = this.obtenerSubespecificas.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearSubespecifica = this.crearSubespecifica.bind(this);
    this.cargarModalEditarSubespecifica = this.cargarModalEditarSubespecifica.bind(this);
    this.deshabilitarSubespecifica = this.deshabilitarSubespecifica.bind(this);
    this.habilitarSubespecifica = this.habilitarSubespecifica.bind(this);
    this.editarSubespecifica = this.editarSubespecifica.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.obtenerInfoEspecifica = this.obtenerInfoEspecifica.bind(this); 
  }

  async obtenerInfoEspecifica(){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          numero_especifica: this.props.match.params.numero_especifica
        })
      };

      const obtener_especifica_request = await fetch(`/api/especificas/obtener_especifica`, request_options);
      const obtener_especifica_response = await obtener_especifica_request.json();

      if(obtener_especifica_response === 'err'){
        this.setState({modal_operacion_fallida: true, mensaje: "Error obteniendo la especifica"});
      }
      else{
        this.setState({especifica_id: obtener_especifica_response.id });
      }      
  }

  async editarSubespecifica(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          numero_subespecifica: this.state.numero_subespecifica,
          denominacion: this.state.denominacion,
          habilitada: this.state.habilitada
        })
      };

      const editar_subespecifica_request = await fetch(`/api/subespecificas/actualizar_subespecifica`, request_options);
      const editar_subespecifica_response = await editar_subespecifica_request.json();

      if(editar_subespecifica_response !== 'err'){
        this.setState({modal_editar_subespecifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Subespecífica editada correctamente"}, async () => {
          this.obtenerSubespecificas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_subespecifica_abierto: false, mensaje: "Error editando la subespecífica"});
      }
    }
  }

  async deshabilitarSubespecifica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_subespecifica_request = await fetch(`/api/subespecificas/deshabilitar_subespecifica`, request_options);
    const deshabilitar_subespecifica_response = await deshabilitar_subespecifica_request.json();

    if(deshabilitar_subespecifica_response !== 'err'){
      this.setState({modal_editar_subespecifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Subespecífica deshabilitada correctamente"}, async () => {
        this.obtenerSubespecificas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_subespecifica_abierto: false, mensaje: "Error deshabilitando la subespecífica"});
    }
  }


  async habilitarSubespecifica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_subespecifica_request = await fetch(`/api/subespecificas/habilitar_subespecifica`, request_options);
    const habilitar_subespecifica_response = await habilitar_subespecifica_request.json();

    if(habilitar_subespecifica_response !== 'err'){
      this.setState({modal_editar_subespecifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Subespecífica habilitada correctamente"}, async () => {
        this.obtenerSubespecificas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_subespecifica_abierto: false, mensaje: "Error habilitando la subespecífica"});
    }
  }

  async crearSubespecifica() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          especifica_id: this.state.especifica_id,
          numero_subespecifica: this.state.numero_subespecifica,
          denominacion: this.state.denominacion
        })
      };

      const crear_subespecifica_request = await fetch(`/api/subespecificas/crear_subespecifica`, request_options);
      const crear_subespecifica_response = await crear_subespecifica_request.json();

      if(crear_subespecifica_response !== 'err'){
        this.setState({modal_crear_subespecifica_abierto: false, modal_operacion_exitosa: true, mensaje: "Subespecífica creada correctamente"}, async () => {
          this.obtenerSubespecificas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_subespecifica_abierto: false, mensaje: "Error creando la subespecífica"});
      }
    }
  }

  async obtenerSubespecificas(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        especifica_id: this.state.especifica_id,
      })
    };    
    const subespecificas_request = await fetch('/api/subespecificas/obtener_subespecificas', request_options);
    const subespecificas_response = await subespecificas_request.json();

    if(subespecificas_response !== 'err'){
      this.setState({subespecificas: subespecificas_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las subespecíficas"});
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
    document.title = "SICMB - Subespecíficas";

    if(this.verificarSesion()){
      await this.obtenerInfoEspecifica();
      this.obtenerSubespecificas();
    }
  }

  cargarModalEditarSubespecifica(ind) {
    const subespecifica = this.state.subespecificas[ind];

    this.setState({
      numero_subespecifica: subespecifica.numero_subespecifica,
      modal_editar_subespecifica_abierto: true,
      id: subespecifica.id,
      denominacion: subespecifica.denominacion,
      habilitada: subespecifica.habilitada
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del numero de la subespecifica
    if(this.state.numero_subespecifica === undefined || !this.state.numero_subespecifica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_subespecifica-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_subespecifica-modal-creacion").style.display = 'none';
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

    // Validación del numero de la subespecifica
    if(this.state.numero_subespecifica === undefined || !this.state.numero_subespecifica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_subespecifica-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_subespecifica-modal-edicion").style.display = 'none';
    }
    
    // Validación de la denominacion    
    if(this.state.denominacion === undefined || !this.state.denominacion.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
    document.getElementById("denominacion-modal-edicion").style.display = 'block';
    formulario_valido = false;
    }
    else{
      document.getElementById("denominacion-modal-edicion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Modal que muestra el formulario para poder crear una nueva subespecífica
    let modal_crear_subespecifica = 
      <Modal isOpen={this.state.modal_crear_subespecifica_abierto} toggle={() => this.setState({modal_crear_subespecifica_abierto: !this.state.modal_crear_subespecifica_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_subespecifica_abierto: !this.state.modal_crear_subespecifica_abierto})}>
        Crear nueva subespecífica
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Numero de la subespecífica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Número de la subespecífica*</Label>
              <Input 
                onChange={(e) => this.setState({numero_subespecifica: e.target.value})}
              />
              <span id="numero_subespecifica-modal-creacion" className="error-subespecificas">Número de subespecífica inválido</span>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Denominación de la subespecífica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Denominación de la subespecífica*</Label>
              <Input 
                onChange={(e) => this.setState({denominacion: e.target.value})}
              />
              <span id="denominacion-modal-creacion" className="error-subespecificas">Denominación inválida</span>
            </Col>
          </FormGroup>          

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearSubespecifica} color="success" type="submit" className="boton-crear-modal-subespecifica">
            Crear subespecífica
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_subespecifica_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar una subespecífica existente
    let modal_editar_subespecifica = 
      <Modal isOpen={this.state.modal_editar_subespecifica_abierto} toggle={() => this.setState({modal_editar_subespecifica_abierto: !this.state.modal_editar_subespecifica_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_subespecifica_abierto: !this.state.modal_editar_subespecifica_abierto})}>
          Editar subespecífica
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Numero de la subespecífica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Número de la subespecífica*</Label>
                <Input 
                  defaultValue={this.state.numero_subespecifica}
                  onChange={(e) => this.setState({numero_subespecifica: e.target.value})}
                />
                <span id="numero_subespecifica-modal-edicion" className="error-subespecificas">Número de subespecífica inválido</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Denominación de la subespecífica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Denominación*</Label>
                <Input 
                  defaultValue={this.state.denominacion}
                  onChange={(e) => this.setState({denominacion: e.target.value})}
                />
                <span id="denominacion-modal-edicion" className="error-subespecificas">Denominación inválida</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarSubespecifica} className="boton-crear-modal-subespecifica">
              Editar subespecífica
            </Button>

            {this.state.habilitada ? 
              <Button color="success" onClick={this.deshabilitarSubespecifica} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarSubespecifica} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_subespecifica_abierto: false})} className="boton-cancelar-modal">
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
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/partida-presupuestaria/${this.props.match.params.numero_partida}/generica/${this.props.match.params.numero_generica}`)}>Gestión de Específicas de {this.props.match.params.numero_partida}.{this.props.match.params.numero_generica}</BreadcrumbItem>
              <BreadcrumbItem active>Gestión de Subespecíficas de {this.props.match.params.numero_partida}.{this.props.match.params.numero_generica}.{this.props.match.params.numero_especifica}</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_subespecifica}
          {modal_editar_subespecifica}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={partidas_presupuestarias} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Subespecíficas de la Partida {this.props.match.params.numero_partida}-{this.props.match.params.numero_generica}-{this.props.match.params.numero_especifica}</h1>
            </Col>

            {/* Botón para agregar subespecíficas */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_subespecifica_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar subespecífica
              </Button>
            </Col>
          </Row>

          {/* Si existen subespecíficas, muestra una tabla con su información */}
          {this.state.subespecificas.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número de la subespecífica</th>
                    <th>Denominación de la subespecífica</th>                    
                    <th>Habilitada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.subespecificas.map((subespecifica, index) => {
                      return(
                      <tr key={`${subespecifica.id}_${subespecifica.numero_subespecifica}_${subespecifica.denominacion}`}>
                          <th scope="row">{subespecifica.id}</th>
                          <td>{subespecifica.numero_subespecifica}</td>
                          <td>{subespecifica.denominacion}</td>
                          <td>{subespecifica.habilitada ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarSubespecifica(index)}
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
