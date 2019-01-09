import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Table } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import withContext from './../../Contenedor/withContext';

export class RequerimientosPersonal extends Component {
  constructor(props){
    super(props);
    this.state = {
      requerimientos_personal: [],
      justificacion: undefined,
      enviada: false,
      id: undefined,
      cargos: [],
      nombre_area: undefined,
      cargo_id: undefined,
      numero_personas: undefined,
      indice_cargo: undefined,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerCargos = this.obtenerCargos.bind(this);
    this.obtenerRequerimientosPersonal = this.obtenerRequerimientosPersonal.bind(this);
    this.crearSolicitudPersonal = this.crearSolicitudPersonal.bind(this);
    this.editarSolicitudPersonal = this.editarSolicitudPersonal.bind(this);
    this.eliminarSolicitudPersonal = this.eliminarSolicitudPersonal.bind(this);
    this.obtenerSolicitudPersonal = this.obtenerSolicitudPersonal.bind(this);
    this.enviarSolicitudPersonal = this.enviarSolicitudPersonal.bind(this);
    this.crearRequerimientoPersonal = this.crearRequerimientoPersonal.bind(this);
    this.editarRequerimientoPersonal = this.editarRequerimientoPersonal.bind(this);
    this.eliminarRequerimientoPersonal = this.eliminarRequerimientoPersonal.bind(this);    
    this.validarCreacionRequerimientoPersonal = this.validarCreacionRequerimientoPersonal.bind(this);
    this.validarEdicionRequerimientoPersonal = this.validarEdicionRequerimientoPersonal.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.verificarRequerimientoPersonal = this.verificarRequerimientoPersonal.bind(this);
  }

  obtenerArea(id){
    const area = this.props.areas.filter(area => area.id === id);
    
    if(area[0] !== undefined){
      return `${area[0].nombre} - ${area[0].descripcion}`    
    }
    else{
      return `N/A`
    }
  }
  async crearSolicitudPersonal() {
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          area_id: this.props.usuario.area_id,
          justificacion: this.state.justificacion,
          requerimientos_personal: this.state.requerimientos_personal
        })
      };
      const crear_solicitud_personal_request = await fetch(`/api/solicitud_personal/crear_solicitud_personal`, request_options);
      const crear_solicitud_personal_response = await crear_solicitud_personal_request.json();
      if(crear_solicitud_personal_response !== 'err'){
        this.setState({id: crear_solicitud_personal_response}, async () => {
        });
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error guardando la solicitud de personal"});
      }
  }

  async editarSolicitudPersonal(){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          justificacion: this.state.justificacion
        })
      };

      const editar_solicitud_personal_request = await fetch(`/api/solicitud_personal/actualizar_solicitud_personal`, request_options);
      const editar_solicitud_personal_response = await editar_solicitud_personal_request.json();
      if(editar_solicitud_personal_response !== 'err'){
        this.setState(async () => {
          this.obtenerSolicitudPersonal();
        });
      }
  }

  async eliminarSolicitudPersonal(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_solicitud_personal_request = await fetch(`/api/solicitud_personal/eliminar_solicitud_personal`, request_options);
    const eliminar_solicitud_personal_response = await eliminar_solicitud_personal_request.json();

    if(eliminar_solicitud_personal_response !== 'err'){
      this.setState({modal_operacion_exitosa: true, mensaje: "Solicitud de personal eliminada correctamente"}, async () => {
      await  this.crearSolicitudPersonal();
      await  this.obtenerSolicitudPersonal();
      this.obtenerRequerimientosPersonal();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando la solicitud de personal"});
    }
  }

  async enviarSolicitudPersonal(){
    if (this.state.requerimientos_personal.length > 0 && (this.state.justificacion !== undefined || this.state.justificacion === null)){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id
        })
      };

      const enviar_solicitud_personal_request = await fetch(`/api/solicitud_personal/enviar_solicitud_personal`, request_options);
      const enviar_solicitud_personal_response = await enviar_solicitud_personal_request.json();

      if(enviar_solicitud_personal_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Solicitud de personal enviada correctamente"}, async () => {
        this.obtenerSolicitudPersonal();  
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de personal"});
      }
    }
    else {
      this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de personal, debe tener al menos un requerimiento de personal y la justificación no puede estar vacía."});      
    }
  }

  async obtenerSolicitudPersonal(){
    const solicitud_personal_request = await fetch('/api/solicitud_personal/obtener_solicitud_personal', {credentials: 'include'});
    const solicitud_personal_response = await solicitud_personal_request.json();

    if(solicitud_personal_response !== 'err'){
      this.setState({...solicitud_personal_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la solicitud de personal"});
    }    
  }

  async verificarRequerimientoPersonal(){
    if(this.state.id !== undefined){
      this.crearRequerimientoPersonal();
      this.obtenerRequerimientosPersonal();
    }
    else{
      this.crearSolicitudPersonal();
      this.crearRequerimientoPersonal();
      this.obtenerRequerimientosPersonal();

    }
  }
  async crearRequerimientoPersonal() {
    if(this.validarCreacionRequerimientoPersonal()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          cargo_id: this.state.cargo_id,
          numero_personas: this.state.numero_personas,
          solicitud_personal_id: this.state.id
        })
      };

      const crear_requerimiento_personal_request = await fetch(`/api/requerimientos_personal/crear_requerimiento_personal`, request_options);
      const crear_requerimiento_personal_response = await crear_requerimiento_personal_request.json();

      if(crear_requerimiento_personal_response !== 'err'){
        this.obtenerRequerimientosPersonal();
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error creando el requerimiento de personal"});
      }
    }
  }

  async editarRequerimientoPersonal(id){
    if(this.validarEdicionRequerimientoPersonal(id)){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          numero_personas: document.getElementById(`numero_personas_requerimiento_${id}`).value,
          cargo_id: document.getElementById(`cargo_id_requerimiento_${id}`).value,
          id: id
        })
      };

      const editar_requerimiento_personal_request = await fetch(`/api/requerimientos_personal/actualizar_requerimiento_personal`, request_options);
      const editar_requerimiento_personal_response = await editar_requerimiento_personal_request.json();

      if(editar_requerimiento_personal_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Requerimiento de personal de la solicitud actualizado correctamente"}, async () => {
          this.obtenerRequerimientos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error actualizando el requerimiento personal"});
      }
    }
  }

  async eliminarRequerimientoPersonal(id){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: id
      })
    };

    const eliminar_requerimiento_personal_request = await fetch(`/api/requerimientos_personal/eliminar_requerimiento_personal`, request_options);
    const eliminar_requerimiento_personal_response = await eliminar_requerimiento_personal_request.json();

    if(eliminar_requerimiento_personal_response !== 'err'){
      this.setState({modal_operacion_exitosa: true, mensaje: "Requerimiento de personal eliminado correctamente"}, async () => {
        this.obtenerRequerimientosPersonal();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando el requerimiento de personal"});
    }
  }

  async obtenerRequerimientosPersonal(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        solicitud_personal_id: this.state.id
      })
    };
    const requerimientos_personal_request = await fetch('/api/requerimientos_personal/obtener_requerimientos_personal', request_options);
    const requerimientos_personal_response = await requerimientos_personal_request.json();
    if(requerimientos_personal_response !== 'err'){
      this.setState({requerimientos_personal: requerimientos_personal_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los requerimientos de personal de la solicitud "});
    }

  }

  async obtenerCargos(){
    const cargos_request = await fetch('/api/cargos/obtener_cargos', {credentials: 'include'});
    const cargos_response = await cargos_request.json();

    if(cargos_response !== 'err'){
      if(cargos_response.length > 0) {
        this.setState({ cargo_id: cargos_response[0].id, cargos: cargos_response })
        }
        else{
        this.setState({cargos: cargos_response })
        }    
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los cargos "});
    }

  }  

  async componentDidMount(){
    document.title = "SICMB - Requerimientos de Personal";
    await this.obtenerCargos();
    await this.obtenerSolicitudPersonal();
    if (this.state.id !== undefined){      
      this.obtenerRequerimientosPersonal();
    }
    else {
      this.crearSolicitudPersonal();
    }
  }


  validarEdicionRequerimientoPersonal(id){
    let formulario_valido = true;
    let numero_personas = document.getElementById(`numero_personas_requerimiento_${id}`).value;
    let cargo_id = document.getElementById(`cargo_id_requerimiento_${id}`).value;
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id === cargo_id);
   
    // Validación del numero de personas por cargo 
    if(numero_personas === undefined || !numero_personas.match(/^[0-9]+$/)){
        document.getElementById("numero-persona-edicion").style.display = 'block';
        formulario_valido = false;
    }
    else{
        document.getElementById("numero-persona-edicion").style.display = 'none';
    }

    // Validación del cargo
    if(cargo_id === undefined || requerimiento_existente.length > 0){
      document.getElementById("cargo-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-edicion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarCreacionRequerimientoPersonal(){
    let formulario_valido = true;
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id === this.state.cargo_id);

    // Validación del cargo
    if(this.state.cargo_id === undefined || requerimiento_existente.length > 0){
        document.getElementById("cargo-id-creacion").style.display = 'block';
        formulario_valido = false;
      }
     else{
        document.getElementById("cargo-id-creacion").style.display = 'none';
      }    
    
    // Validación del número de personas
    if(this.state.numero_personas === undefined || !this.state.numero_personas.match(/^[0-9]+$/)){
      document.getElementById("numero-personas-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-personas-creacion").style.display = 'none';
    }
    return formulario_valido;
  }

  render() {

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_confirmacion_operacion = 
      <Modal isOpen={this.state.modal_confirmacion_operacion_abierto} toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
          Enviar solicitud de personal
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea enviar su solicitud de personal?</p>          
          <p>Si la envía no podrá modificarla luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="success" onClick={() => this.setState({modal_confirmacion_operacion_abierto: false}, this.enviarSolicitudPersonal)} className="boton-enviar-modal">
              Enviar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_operacion_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_eliminar_abierto} toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
          Eliminar solicitud de personal
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar su solicitud de personal?</p>          
          <p>Si la elimina no podrá recuperarla luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: false}, this.eliminarSolicitudPersonal)} className="boton-eliminar-solicitud">
              Eliminar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: false})}>
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

    if(this.state.enviada){
      return (
          <Container fluid className="container-unidades-de-medida">
            {/* Modales del componente */}
            {modal_operacion_fallida}
            {modal_operacion_exitosa}
            {modal_confirmacion_eliminar}

            <Row>
              {/* Título de la sección */}
              <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                <img src={personal} className="icono-titulo"/>    
                <h1 className="titulo-solicitud-personal">Solicitud de Personal</h1>
              </Col>
            </Row>

            {/* Si existen cargos, muestra  tabla con su información */}
            <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">
              <thead>
                <tr>
                  <th>Unidad Solicitante</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {this.obtenerArea(this.props.usuario.area_id)}
                  </th>
                </tr>
              </tbody>
            </Table>
            </Row>
            <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">                              
              <thead>
                <tr>
                  <th>ID</th>    
                  <th>Número de personas</th>
                  <th>Cargo</th>
                </tr>
              </thead>
                <tbody>
                {this.state.requerimientos_personal.map((requerimiento_personal, index) => {
                    return(
                    <tr key={`requerimiento_personal_${requerimiento_personal.id}`}>
                        <th scope="row">{requerimiento_personal.id}</th>
                        <td>{requerimiento_personal.numero_personas}</td>
                        <td>
                          <Input
                            id={`cargo_id_requerimiento_${requerimiento_personal.id}`}                         
                            type="select"
                            defaultValue={requerimiento_personal.cargo_id}
                            disabled={true}
                          >
                            {this.state.cargos.map((cargo, index) => {
                              return(
                                <option value={cargo.id} key={`cargo_${cargo.index}`}>{cargo.codigo}-{cargo.cargo}</option>
                              )
                            })}
                          </Input>
                          </td>                          
                    </tr>
                    )
                })}
                </tbody>
            </Table>
            </Row>                
            <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">
              <thead>
                <tr>
                  <th>Justificación</th>
                </tr>
              </thead>
              <tbody>
              <td>{this.state.justificacion}</td>              
              </tbody>
            </Table>
            </Row>          

              {/* Botón para agregar cargos */}
            <Row>            
              <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                <Button color="danger" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: true})}>
                  <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>              
                  Eliminar solicitud de personal
                </Button>
              </Col>                      
            </Row>          
        </Container>
      )
    }            
    else{
      return (
        <Container fluid className="container-unidades-de-medida">

          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/solicitud-personal/`)}>Solicitudes de Personal</BreadcrumbItem>
              <BreadcrumbItem active>Requerimientos de Personal</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}
          {modal_confirmacion_operacion}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={personal} className="icono-titulo"/>    
              <h1 className="titulo-solicitud-personal">Solicitud de Personal</h1>
            </Col>
          </Row>

          {/* Si existen cargos, muestra  tabla con su información */}
          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-unidades-de-medida">
            <thead>
              <tr>
                <th>Unidad Solicitante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {this.obtenerArea(this.props.usuario.area_id)}
                </th>
              </tr>
            </tbody>
          </Table>
          </Row>
            <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">                              
              <thead>
                <tr>
                  <th>ID</th>    
                  <th>Número de personas</th>
                  <th>Cargo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
                <tbody>
                {this.state.requerimientos_personal.map((requerimiento_personal, index) => {
                    return(
                    <tr key={`requerimiento_personal_${requerimiento_personal.id}`}>
                        <th scope="row">{requerimiento_personal.id}</th>
                        <td>                
                          <Input 
                            id={`numero_personas_requerimiento_${requerimiento_personal.id}`}
                            defaultValue={requerimiento_personal.numero_personas}
                          />
                          <span id="numero-persona-edicion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                        
                          </td>
                        <td>
                          <Input
                            id={`cargo_id_requerimiento_${requerimiento_personal.id}`}                         
                            type="select"
                            defaultValue={requerimiento_personal.cargo_id}
                          >
                            {this.state.cargos.map((cargo, index) => {
                              return(
                                <option value={cargo.id} key={`cargo_${cargo.index}`}>{cargo.codigo}-{cargo.cargo}</option>
                              )
                            })}
                          <span id="cargo-edicion" className="error-solicitud-personal">No se pueden tener dos requerimientos de personal con el mismo cargo</span>                
                          </Input>
                          </td>                          
                        <td>
                        <Button 
                            color="info" className="boton-actualizar"
                            onClick={() => this.editarRequerimientoPersonal(requerimiento_personal.id)}
                        >
                            <i className="iconos fa fa-redo-alt" aria-hidden="true"></i>                          
                            Actualizar
                        </Button>
                        <Button 
                            color="danger" className="boton-eliminar"
                            onClick={() => this.eliminarRequerimientoPersonal(requerimiento_personal.id)}
                        >
                            <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>                          
                            Eliminar
                        </Button>                          
                        </td>
                    </tr>
                    )
                })}
                <th scope="row"></th>
                <td>                
                  <Input 
                    onChange={(e) => this.setState({numero_personas: e.target.value})}
                />
                  <span id="numero-personas-creacion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                                      
                </td>
                <td>
                  <Input 
                    type="select"
                    onChange={(e) => this.setState({cargo_id: e.target.value})}
                    >
                    {this.state.cargos.map((cargo, index) => {
                      return(
                        <option value={cargo.id} key={`cargo_${cargo.index}`}>{cargo.codigo}-{cargo.cargo}</option>
                      )
                    })}                            
                  </Input>
                  <span id="cargo-id-creacion" className="error-solicitud-personal">No se pueden tener dos requerimientos de personal con el mismo cargo ni se puede dejar vacío este campo</span>                                
                  </td>                          
                <td>
                <Button 
                    color="info" className="boton-actualizar"
                    onClick={() => this.verificarRequerimientoPersonal()}
                >
                    <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                    Agregar requerimiento
                </Button>                         
                </td>
                </tbody>
            </Table>
            </Row>
            <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">
              <thead>
                <tr>
                  <th>Justificación</th>
                </tr>
              </thead>
              <tbody>
              <td>                
                <Input 
                  onChange={(e) => this.setState({justificacion: e.target.value})}
                  defaultValue={this.state.justificacion}
                /></td>              
              </tbody>
            </Table>
            </Row>          

              {/* Botón para agregar cargos */}
            <Row>            
              <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                <Button color="info" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_operacion_abierto: true}, this.editarSolicitudPersonal)}>
                  <i className="iconos fa fa-envelope" aria-hidden="true"></i>              
                  Enviar solicitud de personal
                </Button>
                <Button color="info" className="boton-guardar" onClick={() => this.editarSolicitudPersonal()}>
                  <i className="iconos fa fa-save" aria-hidden="true"></i>              
                  Guardar solicitud de personal
                </Button>                
              </Col>                      
            </Row>
        </Container>
    )
  }      
  }
}
export default withContext(RequerimientosPersonal);