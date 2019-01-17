import React, { Component } from 'react';
import './Areas.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import areas from '../../assets/img/areas.png';
import withContext from './../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class Areas extends Component {
  constructor(props){
    super(props);
    this.state = {
      areas: [],
      modal_confirmacion_abierto: false,
      modal_crear_area_abierto: false,
      modal_editar_area_abierto: false,
      nombre: undefined,
      descripcion: undefined,
      id: undefined,
      habilitado: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerAreas = this.obtenerAreas.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.crearArea = this.crearArea.bind(this);
    this.cargarModalEditarArea = this.cargarModalEditarArea.bind(this);
    this.deshabilitarArea = this.deshabilitarArea.bind(this);
    this.habilitarArea = this.habilitarArea.bind(this);
    this.editarArea = this.editarArea.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.eliminarArea = this.eliminarArea.bind(this);
  }

  async eliminarArea(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_area_request = await fetch('/api/areas/eliminar_area', request_options);
    const eliminar_area_response = await eliminar_area_request.json();

    if(eliminar_area_response !== "err"){
        this.setState({modal_confirmacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Area eliminada correctamente"}, async () => {
          this.obtenerAreas();
        })
    }
    else{
      this.setState({modal_confirmacion_abierto: false, modal_operacion_fallida: true, mensaje: "Error al eliminar el Area."});
    }
  }

  async editarArea(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          habilitado: this.state.habilitado
        })
      };

      const editar_area_request = await fetch(`/api/areas/actualizar_area`, request_options);
      const editar_area_response = await editar_area_request.json();

      if(editar_area_response !== 'err'){
        this.setState({modal_editar_area_abierto: false, modal_operacion_exitosa: true, mensaje: "Área editada correctamente"}, async () => {
          this.obtenerAreas();
          this.props.actualizar_areas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_area_abierto: false, mensaje: "Error editando el área"});
      }
    }
  }

  async deshabilitarArea(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_area_request = await fetch(`/api/areas/deshabilitar_area`, request_options);
    const deshabilitar_area_response = await deshabilitar_area_request.json();

    if(deshabilitar_area_response !== 'err'){
      this.setState({modal_editar_area_abierto: false, modal_operacion_exitosa: true, mensaje: "Área deshabilitada correctamente"}, async () => {
        this.obtenerAreas();
        this.props.actualizar_areas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_area_abierto: false, mensaje: "Error deshabilitando el área"});
    }
  }


  async habilitarArea(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_area_request = await fetch(`/api/areas/habilitar_area`, request_options);
    const habilitar_area_response = await habilitar_area_request.json();

    if(habilitar_area_response !== 'err'){
      this.setState({modal_editar_area_abierto: false, modal_operacion_exitosa: true, mensaje: "Área habilitada correctamente"}, async () => {
        this.obtenerAreas();
        this.props.actualizar_areas();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_area_abierto: false, mensaje: "Error habilitando el área"});
    }
  }

  async crearArea() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          nombre: this.state.nombre,
          descripcion: this.state.descripcion
        })
      };

      const crear_area_request = await fetch(`/api/areas/crear_area`, request_options);
      const crear_area_response = await crear_area_request.json();

      if(crear_area_response !== 'err'){
        this.setState({modal_crear_area_abierto: false, modal_operacion_exitosa: true, mensaje: "Área creada correctamente"}, async () => {
          this.obtenerAreas();
          this.props.actualizar_areas();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_area_abierto: false, mensaje: "Error creando el área"});
      }
    }
  }

  async obtenerAreas(){
    const areas_request = await fetch('/api/areas/obtener_areas', {credentials: 'include'});
    const areas_response = await areas_request.json();

    if(areas_response !== 'err'){
      this.setState({areas: areas_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las áreas"});
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
    document.title = "SICMB - Areas";

    if(this.verificarSesion()){
      this.obtenerAreas();
    }
  }

  cargarModalEditarArea(ind) {
    const area = this.state.areas[ind];

    this.setState({
      nombre: area.nombre,
      modal_editar_area_abierto: true,
      id: area.id,
      descripcion: area.descripcion,
      habilitado: area.habilitado
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("nombre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-creacion").style.display = 'none';
    }    

    // Validación de la descripcion
    if(this.state.descripcion === undefined || !this.state.descripcion.match(/^[A-Za-z\u00C0-\u017F]+[,\.]{0,1}((\s)[A-Za-z\u00C0-\u017F]+[,\.]{0,1})*$/)){
      document.getElementById("descripcion-modal-creacion").style.display = 'block';
      formulario_valido = false;    
    }
    else{
      document.getElementById("descripcion-modal-creacion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarModalEdicion(){
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("nombre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-edicion").style.display = 'none';
    }
    
    // Validación de la descripcion    
    if(this.state.descripcion === undefined || !this.state.descripcion.match(/^[A-Za-z\u00C0-\u017F]+[,\.]{0,1}((\s)[A-Za-z\u00C0-\u017F]+[,\.]{0,1})*$/)){
      document.getElementById("descripcion-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("descripcion-modal-edicion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Modal que muestra el formulario para poder crear una nueva área
    let modal_crear_area = 
      <Modal isOpen={this.state.modal_crear_area_abierto} toggle={() => this.setState({modal_crear_area_abierto: !this.state.modal_crear_area_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_area_abierto: !this.state.modal_crear_area_abierto})}>
        Crear nueva área
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Nombre del área*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Nombre del área*</Label>
              <Input 
                onChange={(e) => this.setState({nombre: e.target.value})}
              />
              <span id="nombre-modal-creacion" className="error-areas">Nombre inválido. Este campo no puede estar vacío.</span>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Descripción del área*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Descripción del área*</Label>
              <Input 
                onChange={(e) => this.setState({descripcion: e.target.value})}
              />
              <span id="descripcion-modal-creacion" className="error-areas">Descripción inválida. Este campo no puede estar vacío.</span>
            </Col>
          </FormGroup>          

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearArea} color="success" type="submit" className="boton-crear-modal">
            Crear área
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_area_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un área existente
    let modal_editar_area = 
      <Modal isOpen={this.state.modal_editar_area_abierto} toggle={() => this.setState({modal_editar_area_abierto: !this.state.modal_editar_area_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_area_abierto: !this.state.modal_editar_area_abierto})}>
          Editar área
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre del área */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre del área</Label>
                <Input 
                  defaultValue={this.state.nombre}
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-edicion" className="error-areas">Nombre inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Descripción del área */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Descripción del área*</Label>
                <Input 
                  defaultValue={this.state.descripcion}
                  onChange={(e) => this.setState({descripcion: e.target.value})}
                />
                <span id="descripcion-modal-edicion" className="error-areas">Descripción inválida. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarArea} className="boton-crear-modal">
              Editar área
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarArea} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarArea} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: true, modal_editar_area_abierto: false})} className="boton-cancelar-modal">
              Eliminar
            </Button>

            <Button color="danger" onClick={() => this.setState({modal_editar_area_abierto: false})} className="boton-cancelar-modal">
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
          Eliminar área
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar el área?</p>          
          <p>Si la elimina no podrá recuperarlo luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={this.eliminarArea} className="boton-eliminar-solicitud">
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
        <Container fluid className="container-unidades-de-medida">
          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion`)} >Administración</BreadcrumbItem>          
              <BreadcrumbItem active onClick={() => this.props.history.push(`/inicio/administracion/areas`)} >Gestión de Áreas</BreadcrumbItem>          
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_area}
          {modal_editar_area}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}
          {modal_confirmacion_eliminar}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={areas} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Áreas</h1>
            </Col>

            {/* Botón para agregar áreas */}
            {autorizarAdministrador(this.props.usuario.rol) && 
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_area_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar área
              </Button>
            </Col>            
            }

          </Row>

          {/* Si existen áreas, muestra una tabla con su información */}
          {this.state.areas.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del área</th>
                    <th>Descripción del área</th>                    
                    <th>Habilitada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.areas.map((area, index) => {
                      return(
                      <tr key={`${area.id}_${area.nombre}_${area.descripcion}`}>
                          <th scope="row">{area.id}</th>
                          <td>{area.nombre}</td>
                          <td>{area.descripcion}</td>
                          <td>{area.habilitado ? <span>Si</span> : <span>No</span>}</td>
                          <td>
                          {autorizarAdministrador(this.props.usuario.rol) && 
                          <Button 
                              color="info" className="boton-gestionar"
                              onClick={() => this.cargarModalEditarArea(index)}
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

export default withContext(Areas);