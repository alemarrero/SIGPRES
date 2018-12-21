import React, { Component } from 'react';
import './Cargos.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import cargo from '../../assets/img/cargo.png';
import { request } from 'http';
import withContext from './../../Contenedor/withContext';
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';

// https://www.flaticon.com/free-icon/compass_1156951


export class Cargos extends Component {
  constructor(props){
    super(props);
    this.state = {
      cargos: [],
      modal_crear_cargo_abierto: false,
      modal_editar_cargo_abierto: false,
      codigo: undefined,
      cargo: undefined,
      id: undefined,
      habilitado: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerCargos = this.obtenerCargos.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearCargo = this.crearCargo.bind(this);
    this.cargarModalEditarCargo = this.cargarModalEditarCargo.bind(this);
    this.deshabilitarCargo = this.deshabilitarCargo.bind(this);
    this.habilitarCargo = this.habilitarCargo.bind(this);
    this.editarCargo = this.editarCargo.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
  }

  async editarCargo(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          codigo: this.state.codigo,
          cargo: this.state.cargo,
          habilitado: this.state.habilitado
        })
      };

      const editar_cargo_request = await fetch(`/api/cargos/actualizar_cargo`, request_options);
      const editar_cargo_response = await editar_cargo_request.json();

      if(editar_cargo_response !== 'err'){
        this.setState({modal_editar_cargo_abierto: false, modal_operacion_exitosa: true, mensaje: "Cargo editado correctamente"}, async () => {
          this.obtenerCargos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_cargo_abierto: false, mensaje: "Error editando el cargo "});
      }
    }
  }

  async deshabilitarCargo(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_cargo_request = await fetch(`/api/cargos/deshabilitar_cargo`, request_options);
    const deshabilitar_cargo_response = await deshabilitar_cargo_request.json();

    if(deshabilitar_cargo_response !== 'err'){
      this.setState({modal_editar_cargo_abierto: false, modal_operacion_exitosa: true, mensaje: "Cargo deshabilitado correctamente"}, async () => {
        this.obtenerCargos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_cargo_abierto: false, mensaje: "Error deshabilitando el cargo "});
    }
  }


  async habilitarCargo(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_cargo_request = await fetch(`/api/cargos/habilitar_cargo`, request_options);
    const habilitar_cargo_response = await habilitar_cargo_request.json();

    if(habilitar_cargo_response !== 'err'){
      this.setState({modal_editar_cargo_abierto: false, modal_operacion_exitosa: true, mensaje: "Cargo habilitado correctamente"}, async () => {
        this.obtenerCargos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_cargo_abierto: false, mensaje: "Error habilitando el cargo "});
    }
  }

  async crearCargo() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          codigo: this.state.codigo,
          cargo: this.state.cargo
        })
      };

      const crear_cargo_request = await fetch(`/api/cargos/crear_cargo`, request_options);
      const crear_cargo_response = await crear_cargo_request.json();

      if(crear_cargo_response !== 'err'){
        this.setState({modal_crear_cargo_abierto: false, modal_operacion_exitosa: true, mensaje: "Cargo creado correctamente"}, async () => {
          this.obtenerCargos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_cargo_abierto: false, mensaje: "Error creando el cargo "});
      }
    }
  }

  async obtenerCargos(){
    const cargos_request = await fetch('/api/cargos/obtener_cargos', {credentials: 'include'});
    const cargos_response = await cargos_request.json();

    if(cargos_response !== 'err'){
      this.setState({cargos: cargos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los cargos "});
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
    document.title = "SICMB - Cargos";

    if(this.verificarSesion()){
      this.obtenerCargos();
    }
  }

  cargarModalEditarCargo(ind) {
    const cargo = this.state.cargos[ind];

    this.setState({
      codigo: cargo.codigo,
      cargo: cargo.cargo,
      modal_editar_cargo_abierto: true,
      id: cargo.id,
      habilitado: cargo.habilitado
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del codigo del cargo
    if(this.state.codigo === undefined || !this.state.codigo.match(/^[0-9]{2}-[0-9]{2}-[0-9]{3}$/)){
        document.getElementById("codigo-modal-creacion").style.display = 'block';
        formulario_valido = false;
      }
      else{
        document.getElementById("codigo-modal-creacion").style.display = 'none';
      }

    // Validación del cargo
    if(this.state.cargo === undefined || !this.state.cargo.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("cargo-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-modal-creacion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarModalEdicion(){
    let formulario_valido = true;
    
    // Validación del codigo del cargo
    if(this.state.codigo === undefined || !this.state.codigo.match(/^[0-9]{2}-[0-9]{2}-[0-9]{3}$/)){
        document.getElementById("codigo-modal-edicion").style.display = 'block';
        formulario_valido = false;
      }
      else{
        document.getElementById("codigo-modal-edicion").style.display = 'none';
      }    
    // Validación del cargo
    if(this.state.cargo === undefined || !this.state.cargo.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("cargo-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-modal-edicion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Modal que muestra el formulario para poder crear un nuevo cargo 
    let modal_crear_cargo = 
      <Modal isOpen={this.state.modal_crear_cargo_abierto} toggle={() => this.setState({modal_crear_cargo_abierto: !this.state.modal_crear_cargo_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_cargo_abierto: !this.state.modal_crear_cargo_abierto})}>
        Crear nuevo cargo 
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Código del cargo*</Label>
              <Input 
                onChange={(e) => this.setState({codigo: e.target.value})}
              />
              <span id="codigo-modal-creacion" className="error-cargos">Código inválido, debe ser de la forma ##-##-###</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Nombre del cargo*</Label>
              <Input 
                onChange={(e) => this.setState({cargo: e.target.value})}
              />
              <span id="cargo-modal-creacion" className="error-cargos">Nombre inválido</span>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearCargo} color="success" type="submit" className="boton-crear-modal">
            Crear cargo
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_cargo_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un cargo  existente
    let modal_editar_cargo = 
      <Modal isOpen={this.state.modal_editar_cargo_abierto} toggle={() => this.setState({modal_editar_cargo_abierto: !this.state.modal_editar_cargo_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_cargo_abierto: !this.state.modal_editar_cargo_abierto})}>
          Editar cargo 
        </ModalHeader>
        
        <ModalBody>
          <Form> 
          <FormGroup row>
              {/* Nombre del cargo  */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Código del cargo *</Label>
                <Input 
                  defaultValue={this.state.codigo}
                  onChange={(e) => this.setState({codigo: e.target.value})}
                />
                <span id="codigo-modal-edicion" className="error-cargos">Código inválido, debe ser de la forma ##-##-### y no puede estar repetido</span>
              </Col>
            </FormGroup>              
            <FormGroup row>
              {/* Nombre del cargo  */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre del cargo *</Label>
                <Input 
                  defaultValue={this.state.cargo}
                  onChange={(e) => this.setState({cargo: e.target.value})}
                />
                <span id="cargo-modal-edicion" className="error-cargos">Nombre inválido</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarCargo} className="boton-crear-modal">
              Editar cargo
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarCargo} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarCargo} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_cargo_abierto: false})} className="boton-cancelar-modal">
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
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/solicitud-personal/`)}>Solicitudes de Personal</BreadcrumbItem>
              <BreadcrumbItem active>Gestión de Cargos</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_cargo}
          {modal_editar_cargo}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={cargo} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Cargos</h1>
            </Col>

            {/* Botón para agregar cargos */}
            {autorizarDirectorPP(this.props.usuario.rol) &&                    
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_cargo_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar cargo 
              </Button>
            </Col>
            }

          </Row>

          {/* Si existen cargos, muestra  tabla con su información */}
          {this.state.cargos.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Cargo </th>
                    <th>Habilitado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.cargos.map((cargo, index) => {
                      return(
                      <tr key={`${cargo.id}_${cargo.cargo}`}>
                          <th scope="row">{cargo.id}</th>
                          <td>{cargo.codigo}</td>
                          <td>{cargo.cargo}</td>
                          <td>{cargo.habilitado ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          {autorizarDirectorPP(this.props.usuario.rol) &&                    
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarCargo(index)}
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
export default withContext(Cargos);

