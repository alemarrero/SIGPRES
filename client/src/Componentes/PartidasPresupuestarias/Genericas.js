import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import partidas_presupuestarias from '../../assets/img/partidas.png';
import './Genericas.css'
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';


export default class Genericas extends Component {
  constructor(props){
    super(props);
    this.state = {
      genericas: [],
      modal_crear_generica_abierto: false,
      modal_editar_generica_abierto: false,
      numero_generica: undefined,
      denominacion: undefined,
      id: undefined,
      habilitada: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      partida_presupuestaria_id: undefined,
    };
    this.obtenerGenericas = this.obtenerGenericas.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearGenerica = this.crearGenerica.bind(this);
    this.cargarModalEditarGenerica = this.cargarModalEditarGenerica.bind(this);
    this.deshabilitarGenerica = this.deshabilitarGenerica.bind(this);
    this.habilitarGenerica = this.habilitarGenerica.bind(this);
    this.editarGenerica = this.editarGenerica.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.obtenerInfoPartidaPresupuestaria = this.obtenerInfoPartidaPresupuestaria.bind(this); 
  }

  async obtenerInfoPartidaPresupuestaria(){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          numero_partida: this.props.match.params.numero_partida
        })
      };

      const obtener_partida_presupuestaria_request = await fetch(`/api/partidas_presupuestarias/obtener_partida_presupuestaria`, request_options);
      const obtener_partida_presupuestaria_response = await obtener_partida_presupuestaria_request.json();

      if(obtener_partida_presupuestaria_response === 'err'){
        this.setState({modal_operacion_fallida: true, mensaje: "Error obteniendo la partida presupuestaria"});
      }
      else{
        this.setState({partida_presupuestaria_id: obtener_partida_presupuestaria_response.id });
      }      
  }

  async editarGenerica(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          numero_generica: this.state.numero_generica,
          denominacion: this.state.denominacion,
          habilitada: this.state.habilitada
        })
      };

      const editar_generica_request = await fetch(`/api/genericas/actualizar_generica`, request_options);
      const editar_generica_response = await editar_generica_request.json();

      if(editar_generica_response !== 'err'){
        this.setState({modal_editar_generica_abierto: false, modal_operacion_exitosa: true, mensaje: "Genérica editada correctamente"}, async () => {
          this.obtenerGenericas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_generica_abierto: false, mensaje: "Error editando la genérica"});
      }
    }
  }

  async deshabilitarGenerica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_generica_request = await fetch(`/api/genericas/deshabilitar_generica`, request_options);
    const deshabilitar_generica_response = await deshabilitar_generica_request.json();

    if(deshabilitar_generica_response !== 'err'){
      this.setState({modal_editar_generica_abierto: false, modal_operacion_exitosa: true, mensaje: "Genérica deshabilitada correctamente"}, async () => {
        this.obtenerGenericas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_generica_abierto: false, mensaje: "Error deshabilitando la genérica"});
    }
  }


  async habilitarGenerica(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_generica_request = await fetch(`/api/genericas/habilitar_generica`, request_options);
    const habilitar_generica_response = await habilitar_generica_request.json();

    if(habilitar_generica_response !== 'err'){
      this.setState({modal_editar_generica_abierto: false, modal_operacion_exitosa: true, mensaje: "Genérica habilitada correctamente"}, async () => {
        this.obtenerGenericas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_generica_abierto: false, mensaje: "Error habilitando la genérica"});
    }
  }

  async crearGenerica() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          partida_presupuestaria_id: this.state.partida_presupuestaria_id,
          numero_generica: this.state.numero_generica,
          denominacion: this.state.denominacion
        })
      };

      const crear_generica_request = await fetch(`/api/genericas/crear_generica`, request_options);
      const crear_generica_response = await crear_generica_request.json();

      if(crear_generica_response !== 'err'){
        this.setState({modal_crear_generica_abierto: false, modal_operacion_exitosa: true, mensaje: "Genérica creada correctamente"}, async () => {
          this.obtenerGenericas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_generica_abierto: false, mensaje: "Error creando la genérica"});
      }
    }
  }

  async obtenerGenericas(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        partida_presupuestaria_id: this.state.partida_presupuestaria_id,
      })
    };    
    const genericas_request = await fetch('/api/genericas/obtener_genericas', request_options);
    const genericas_response = await genericas_request.json();

    if(genericas_response !== 'err'){
      this.setState({genericas: genericas_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las genéricas"});
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
    document.title = "SICMB - Genéricas";

    if(this.verificarSesion()){
      await this.obtenerInfoPartidaPresupuestaria();
      this.obtenerGenericas();
    }
  }

  cargarModalEditarGenerica(ind) {
    const generica = this.state.genericas[ind];

    this.setState({
      numero_generica: generica.numero_generica,
      modal_editar_generica_abierto: true,
      id: generica.id,
      denominacion: generica.denominacion,
      habilitada: generica.habilitada
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del numero_generica
    if(this.state.numero_generica === undefined || !this.state.numero_generica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_generica-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_generica-modal-creacion").style.display = 'none';
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

    // Validación del numero_generica
    if(this.state.numero_generica === undefined || !this.state.numero_generica.match(/^[0-9]{2}$/)){
      document.getElementById("numero_generica-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_generica-modal-edicion").style.display = 'none';
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

    // Modal que muestra el formulario para poder crear una nueva genérica
    let modal_crear_generica = 
      <Modal isOpen={this.state.modal_crear_generica_abierto} toggle={() => this.setState({modal_crear_generica_abierto: !this.state.modal_crear_generica_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_generica_abierto: !this.state.modal_crear_generica_abierto})}>
        Crear nueva genérica
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Nombre de la genérica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Número de la genérica*</Label>
              <Input 
                onChange={(e) => this.setState({numero_generica: e.target.value})}
              />
              <span id="numero_generica-modal-creacion" className="error-genericas">Número de genérica inválido. Este campo debe contener exactamente dos (2) números.</span>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Descripción de la genérica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Denominación de la genérica*</Label>
              <Input 
                onChange={(e) => this.setState({denominacion: e.target.value})}
              />
              <span id="denominacion-modal-creacion" className="error-genericas">Denominación inválida. Este campo no puede estar vacío.</span>
            </Col>
          </FormGroup>          

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearGenerica} color="success" type="submit" className="boton-crear-modal">
            Crear genérica
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_generica_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar una genérica existente
    let modal_editar_generica = 
      <Modal isOpen={this.state.modal_editar_generica_abierto} toggle={() => this.setState({modal_editar_generica_abierto: !this.state.modal_editar_generica_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_generica_abierto: !this.state.modal_editar_generica_abierto})}>
          Editar genérica
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre de la genérica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Número de la genérica*</Label>
                <Input 
                  defaultValue={this.state.numero_generica}
                  onChange={(e) => this.setState({numero_generica: e.target.value})}
                />
                <span id="numero_generica-modal-edicion" className="error-genericas">Número de genérica inválido. Este campo debe contener exactamente dos (2) números.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Descripción de la genérica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Denominación*</Label>
                <Input 
                  defaultValue={this.state.denominacion}
                  onChange={(e) => this.setState({denominacion: e.target.value})}
                />
                <span id="denominacion-modal-edicion" className="error-genericas">Denominación inválida. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarGenerica} className="boton-crear-modal">
              Editar genérica
            </Button>

            {this.state.habilitada ? 
              <Button color="success" onClick={this.deshabilitarGenerica} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarGenerica} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_generica_abierto: false})} className="boton-cancelar-modal">
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
              <BreadcrumbItem active>Gestión de Genéricas de {this.props.match.params.numero_partida}</BreadcrumbItem>

            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_generica}
          {modal_editar_generica}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={partidas_presupuestarias} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Genéricas de la Partida {this.props.match.params.numero_partida}</h1>
            </Col>

            {/* Botón para agregar genéricas */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            {autorizarDirectorPP(this.props.usuario.rol) &&
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_generica_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar genérica
              </Button>
            }
            </Col>
          </Row>

          {/* Si existen genéricas, muestra una tabla con su información */}
          {this.state.genericas.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número de la genérica</th>
                    <th>Denominación de la genérica</th>                    
                    <th>Habilitada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.genericas.map((generica, index) => {
                      return(
                      <tr key={`${generica.id}_${generica.numero_generica}_${generica.denominacion}`}>
                          <th scope="row">{generica.id}</th>
                          <td>{generica.numero_generica}</td>
                          <td>{generica.denominacion}</td>
                          <td>{generica.habilitada ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          <Button 
                              color="info" className="boton-ver"
                              onClick={() => this.props.history.push(`/inicio/presupuesto/partida-presupuestaria/${this.props.match.params.numero_partida}/generica/${generica.numero_generica}`)}
                          >
                              <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                              Específica
                          </Button>
                          {autorizarDirectorPP(this.props.usuario.rol) &&
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarGenerica(index)}
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
