import React, { Component } from 'react';
import './PartidasPresupuestarias.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import partidas_presupuestarias from '../../assets/img/partidas.png';
import { request } from 'http';

export default class PartidasPresupuestarias extends Component {
  constructor(props){
    super(props);
    this.state = {
      partidas_presupuestarias: [],
      modal_crear_partida_presupuestaria_abierto: false,
      modal_editar_partida_presupuestaria_abierto: false,
      numero_partida: undefined,
      denominacion: undefined,
      id: undefined,
      habilitado: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerPartidasPresupuestarias = this.obtenerPartidasPresupuestarias.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearPartidaPresupuestaria = this.crearPartidaPresupuestaria.bind(this);
    this.cargarModalEditarPartidaPresupuestaria = this.cargarModalEditarPartidaPresupuestaria.bind(this);
    this.deshabilitarPartidaPresupuestaria = this.deshabilitarPartidaPresupuestaria.bind(this);
    this.habilitarPartidaPresupuestaria = this.habilitarPartidaPresupuestaria.bind(this);
    this.editarPartidaPresupuestaria = this.editarPartidaPresupuestaria.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
  }

  async editarPartidaPresupuestaria(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          numero_partida: this.state.numero_partida,
          denominacion: this.state.denominacion,
          habilitado: this.state.habilitado
        })
      };

      const editar_partida_presupuestaria_request = await fetch(`/api/partidas_presupuestarias/actualizar_partida_presupuestaria`, request_options);
      const editar_partida_presupuestaria_response = await editar_partida_presupuestaria_request.json();

      if(editar_partida_presupuestaria_response !== 'err'){
        this.setState({modal_editar_partida_presupuestaria_abierto: false, modal_operacion_exitosa: true, mensaje: "Partida presupuestaria editada correctamente"}, async () => {
          this.obtenerPartidasPresupuestarias();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_partida_presupuestaria_abierto: false, mensaje: "Error editando la partida presupuestaria"});
      }
    }
  }

  async deshabilitarPartidaPresupuestaria(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_partida_presupuestaria_request = await fetch(`/api/partidas_presupuestarias/deshabilitar_partida_presupuestaria`, request_options);
    const deshabilitar_partida_presupuestaria_response = await deshabilitar_partida_presupuestaria_request.json();

    if(deshabilitar_partida_presupuestaria_response !== 'err'){
      this.setState({modal_editar_partida_presupuestaria_abierto: false, modal_operacion_exitosa: true, mensaje: "Partida presupuestaria deshabilitada correctamente"}, async () => {
        this.obtenerPartidasPresupuestarias();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_partida_presupuestaria_abierto: false, mensaje: "Error deshabilitando la partida presupuestaria"});
    }
  }


  async habilitarPartidaPresupuestaria(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_partida_presupuestaria_request = await fetch(`/api/partidas_presupuestarias/habilitar_partida_presupuestaria`, request_options);
    const habilitar_partida_presupuestaria_response = await habilitar_partida_presupuestaria_request.json();

    if(habilitar_partida_presupuestaria_response !== 'err'){
      this.setState({modal_editar_partida_presupuestaria_abierto: false, modal_operacion_exitosa: true, mensaje: "Partida presupuestaria habilitada correctamente"}, async () => {
        this.obtenerPartidasPresupuestarias();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_partida_presupuestaria_abierto: false, mensaje: "Error habilitando la partida presupuestaria"});
    }
  }

  async crearPartidaPresupuestaria() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          numero_partida: this.state.numero_partida,
          denominacion: this.state.denominacion
        })
      };

      const crear_partida_presupuestaria_request = await fetch(`/api/partidas_presupuestarias/crear_partida_presupuestaria`, request_options);
      const crear_partida_presupuestaria_response = await crear_partida_presupuestaria_request.json();

      if(crear_partida_presupuestaria_response !== 'err'){
        this.setState({modal_crear_partida_presupuestaria_abierto: false, modal_operacion_exitosa: true, mensaje: "Partida presupuestaria creada correctamente"}, async () => {
          this.obtenerPartidasPresupuestarias();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_partida_presupuestaria_abierto: false, mensaje: "Error creando la partida presupuestaria"});
      }
    }
  }

  async obtenerPartidasPresupuestarias(){
    const partidas_presupuestarias_request = await fetch('/api/partidas_presupuestarias/obtener_partidas_presupuestarias', {credentials: 'include'});
    const partidas_presupuestarias_response = await partidas_presupuestarias_request.json();

    if(partidas_presupuestarias_response !== 'err'){
      this.setState({partidas_presupuestarias: partidas_presupuestarias_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las partidas presupuestarias"});
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
    document.title = "SICMB - Partidas Presupuestarias";

    if(this.verificarSesion()){
      this.obtenerPartidasPresupuestarias();
    }
  }

  cargarModalEditarPartidaPresupuestaria(ind) {
    const partida_presupuestaria = this.state.partidas_presupuestarias[ind];

    this.setState({
      numero_partida: partida_presupuestaria.numero_partida,
      modal_editar_partida_presupuestaria_abierto: true,
      id: partida_presupuestaria.id,
      denominacion: partida_presupuestaria.denominacion,
      habilitado: partida_presupuestaria.habilitado
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del numero de la partida
    if(this.state.numero_partida === undefined || !this.state.numero_partida.match(/^[0-9][.][0-9]{2}$/)){
      document.getElementById("numero_partida-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_partida-modal-creacion").style.display = 'none';
    }    

    // Validación de la denominacion
    if(this.state.denominacion === undefined || !this.state.denominacion.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
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

    // Validación del numero de la partida
    if(this.state.numero_partida === undefined || !this.state.numero_partida.match(/^[0-9][.][0-9]{2}$/)){
      document.getElementById("numero_partida-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero_partida-modal-edicion").style.display = 'none';
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

    // Modal que muestra el formulario para poder crear una nueva partida presupuestaria
    let modal_crear_partida_presupuestaria = 
      <Modal isOpen={this.state.modal_crear_partida_presupuestaria_abierto} toggle={() => this.setState({modal_crear_partida_presupuestaria_abierto: !this.state.modal_crear_partida_presupuestaria_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_partida_presupuestaria_abierto: !this.state.modal_crear_partida_presupuestaria_abierto})}>
        Crear nueva partida presupuestaria
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Número de la partida presupuestaria*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Número de la partida presupuestaria*</Label>
              <Input 
                onChange={(e) => this.setState({numero_partida: e.target.value})}
              />
              <span id="numero_partida-modal-creacion" className="error-partidas_presupuestarias">Número de partida inválido, deben ser de la forma #.##. Donde cada # es un número.</span>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Denominación de la partida presupuestaria*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Denominación de la partida presupuestaria*</Label>
              <Input 
                onChange={(e) => this.setState({denominacion: e.target.value})}
              />
              <span id="denominacion-modal-creacion" className="error-partidas_presupuestarias">Denominación inválida</span>
            </Col>
          </FormGroup>          

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearPartidaPresupuestaria} color="success" type="submit" className="boton-crear-modal">
            Crear partida
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_partida_presupuestaria_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un partida presupuestaria existente
    let modal_editar_partida_presupuestaria = 
      <Modal isOpen={this.state.modal_editar_partida_presupuestaria_abierto} toggle={() => this.setState({modal_editar_partida_presupuestaria_abierto: !this.state.modal_editar_partida_presupuestaria_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_partida_presupuestaria_abierto: !this.state.modal_editar_partida_presupuestaria_abierto})}>
          Editar partida presupuestaria
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Número de la partida presupuestaria */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Número de la partida presupuestaria*</Label>
                <Input 
                  defaultValue={this.state.numero_partida}
                  onChange={(e) => this.setState({numero_partida: e.target.value})}
                />
                <span id="numero_partida-modal-edicion" className="error-partidas_presupuestarias">Número de partida inválido, deben ser de la forma #.##. Donde cada # es un número.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Denominación de la partida presupuestaria */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Denominación*</Label>
                <Input 
                  defaultValue={this.state.denominacion}
                  onChange={(e) => this.setState({denominacion: e.target.value})}
                />
                <span id="denominacion-modal-edicion" className="error-partidas_presupuestarias">Denominación inválida</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarPartidaPresupuestaria} className="boton-crear-modal">
              Editar partida
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarPartidaPresupuestaria} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarPartidaPresupuestaria} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_partida_presupuestaria_abierto: false})} className="boton-cancelar-modal">
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
              <BreadcrumbItem active>Gestión de Partidas Presupuestarias</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_partida_presupuestaria}
          {modal_editar_partida_presupuestaria}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={partidas_presupuestarias} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Partidas Presupuestarias</h1>
            </Col>

            {/* Botón para agregar partidas presupuestarias */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_partida_presupuestaria_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar partida
              </Button>
            </Col>
          </Row>

          {/* Si existen partidas presupuestarias, muestra una tabla con su información */}
          {this.state.partidas_presupuestarias.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Número de la partida presupuestaria</th>
                    <th>Denominación de la partida presupuestaria</th>                    
                    <th>Habilitada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.partidas_presupuestarias.map((partida_presupuestaria, index) => {
                      return(
                      <tr key={`${partida_presupuestaria.id}_${partida_presupuestaria.numero_partida}_${partida_presupuestaria.denominacion}`}>
                          <th scope="row">{partida_presupuestaria.id}</th>
                          <td>{partida_presupuestaria.numero_partida}</td>
                          <td>{partida_presupuestaria.denominacion}</td>
                          <td>{partida_presupuestaria.habilitado ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          <Button 
                              color="info" className="boton-ver"
                              onClick={() => this.props.history.push('/inicio/presupuesto/partida-presupuestaria/' + partida_presupuestaria.numero_partida)}
                          >
                              <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                              Genérica
                          </Button>
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarPartidaPresupuestaria(index)}
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
