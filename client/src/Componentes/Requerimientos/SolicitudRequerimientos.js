import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import { request } from 'http';
import withContext from './../../Contenedor/withContext';

// https://www.flaticon.com/free-icon/compass_1156951


export class SolicitudRequerimientos extends Component {
  constructor(props){
    super(props);
    this.state = {
      entradas_solicitud_de_requerimientos: [],
      enviada: false,
      id: undefined,
      productos: [],
      nombre_area: undefined,
      producto_id: undefined,
      cantidad: 0,
      cantidad_primer_trimestre: 0,
      cantidad_segundo_trimestre: 0,
      cantidad_tercer_trimestre: 0,
      cantidad_cuarto_trimestre: 0,
      indice_producto: undefined,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerUnidadDeMedida = this.obtenerUnidadDeMedida.bind(this);
    this.obtenerEntradasSolicitudRequerimientos = this.obtenerEntradasSolicitudRequerimientos.bind(this);
    this.crearSolicitudDeRequerimientos = this.crearSolicitudDeRequerimientos.bind(this);
    this.eliminarSolicitudDeRequerimientos = this.eliminarSolicitudDeRequerimientos.bind(this);
    this.obtenerSolicitudDeRequerimientos = this.obtenerSolicitudDeRequerimientos.bind(this);
    this.enviarSolicitudDeRequerimientos = this.enviarSolicitudDeRequerimientos.bind(this);
    this.crearEntradaSolicitudRequerimiento = this.crearEntradaSolicitudRequerimiento.bind(this);
    this.editarEntradaSolicitudRequerimiento = this.editarEntradaSolicitudRequerimiento.bind(this);
    this.eliminarEntradaSolicitudRequerimientos = this.eliminarEntradaSolicitudRequerimientos.bind(this);    
    //this.validarCreacionRequerimientoPersonal = this.validarCreacionRequerimientoPersonal.bind(this);
    //this.validarEdicionRequerimientoPersonal = this.validarEdicionRequerimientoPersonal.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.verificarEntradaSolicitudRequerimiento = this.verificarEntradaSolicitudRequerimiento.bind(this);
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

  obtenerUnidadDeMedida(id){
    const producto = this.state.productos.filter(producto => producto.id === id);
    
    if(producto[0] !== undefined){
      return `${producto[0].unidad_de_medida.nombre}`    
    }
    else{
      return `N/A`
    }
  }  

  async obtenerProductos(){
    const productos_request = await fetch('/api/productos/obtener_productos', {credentials: 'include'});
    const productos_response = await productos_request.json();

    if(productos_response !== 'err'){
      this.setState({productos: productos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los productos "});
    }
  }

  async crearSolicitudDeRequerimientos() {
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          area_id: this.props.usuario.area_id,
          entradas_solicitud_de_requerimientos: this.state.entradas_solicitud_de_requerimientos
        })
      };
      const crear_solicitud_de_requerimientos_request = await fetch(`/api/solicitudes_de_requerimientos/crear_solicitud_de_requerimientos`, request_options);
      const crear_solicitud_de_requerimientos_response = await crear_solicitud_de_requerimientos_request.json();
      if(crear_solicitud_de_requerimientos_response !== 'err'){
        this.setState({id: crear_solicitud_de_requerimientos_response}, async () => {
        });
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error guardando la solicitud de personal"});
      }
  }

  async eliminarSolicitudDeRequerimientos(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_solicitud_request = await fetch(`/api/solicitudes_de_requerimientos/eliminar_solicitud_de_requerimientos`, request_options);
    const eliminar_solicitud_response = await eliminar_solicitud_request.json();

    if(eliminar_solicitud_response !== 'err'){
      console.log("holis");
      this.setState({modal_operacion_exitosa: true, mensaje: "Solicitud de personal eliminada correctamente"}, async () => {
      console.log("entre aqui");
      await this.crearSolicitudDeRequerimientos();
      await this.obtenerSolicitudDeRequerimientos();
//      await this.obtenerEntradasSolicitudRequerimientos();
      });
    }
    else{
      console.log("errooor");
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando la solicitud de personal"});
    }
  }

  async enviarSolicitudDeRequerimientos(){
    if (this.state.entradas_solicitud_de_requerimientos.length > 0){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id
        })
      };

      const enviar_solicitud_requerimientos_request = await fetch(`/api/solicitudes_de_requerimientos/enviar_solicitud_de_requerimientos`, request_options);
      const enviar_solicitud_requerimientos_response = await enviar_solicitud_requerimientos_request.json();

      if(enviar_solicitud_requerimientos_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Solicitud de requerimientos enviada correctamente"}, async () => {
        this.obtenerSolicitudDeRequerimientos();  
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de requerimientos"});
      }
    }
    else {
      this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de personal, debe tener al menos un requerimiento de personal y la justificación no puede estar vacía."});      
    }
  }

  async obtenerSolicitudDeRequerimientos(){
    const solicitud_de_requerimientos_request = await fetch('/api/solicitudes_de_requerimientos/obtener_solicitud_de_requerimientos', {credentials: 'include'});
    const solicitud_de_requerimientos_response = await solicitud_de_requerimientos_request.json();

    if(solicitud_de_requerimientos_response !== 'err'){
      this.setState({...solicitud_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la solicitud de requerimientos"});
    }    
  }

  async verificarEntradaSolicitudRequerimiento(){
    if(this.state.id !== undefined){
      this.crearEntradaSolicitudRequerimiento();
      this.obtenerEntradasSolicitudRequerimientos();
    }
    else{
      this.crearSolicitudDeRequerimientos();
      this.crearEntradaSolicitudRequerimiento();
      this.obtenerEntradasSolicitudRequerimientos();
    }
  }
  async crearEntradaSolicitudRequerimiento() {
    //if(this.validarCreacionRequerimientoPersonal()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          producto_id: this.state.producto_id,
          cantidad_primer_trimestre: this.state.cantidad_primer_trimestre,
          cantidad_segundo_trimestre: this.state.cantidad_segundo_trimestre,
          cantidad_tercer_trimestre: this.state.cantidad_tercer_trimestre,
          cantidad_cuarto_trimestre: this.state.cantidad_cuarto_trimestre,                              
          solicitud_id: this.state.id
        })
      };

      const crear_entrada_solicitud_de_requerimientos_request = await fetch(`/api/entradas_solicitud_de_requerimientos/crear_entrada_solicitud_de_requerimientos`, request_options);
      const crear_entrada_solicitud_de_requerimientos_response = await crear_entrada_solicitud_de_requerimientos_request.json();

      if(crear_entrada_solicitud_de_requerimientos_response !== 'err'){
        this.obtenerEntradasSolicitudRequerimientos();
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error creando el requerimiento de personal"});
      }
    //}
  }

  async editarEntradaSolicitudRequerimiento(id){
   // if(this.validarEdicionRequerimientoPersonal(id)){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          cantidad_primer_trimestre: document.getElementById(`cantidad_primer_trimestre_requerimiento_${id}`).value,
          cantidad_segundo_trimestre: document.getElementById(`cantidad_segundo_trimestre_requerimiento_${id}`).value,
          cantidad_tercer_trimestre: document.getElementById(`cantidad_tercer_trimestre_requerimiento_${id}`).value,
          cantidad_cuarto_trimestre: document.getElementById(`cantidad_cuarto_trimestre_requerimiento_${id}`).value,
          producto_id: document.getElementById(`producto_id_entrada_solicitud_de_requerimientos_${id}`).value,
          id: id
        })
      };

      const editar_requerimiento_request = await fetch(`/api/entradas_solicitud_de_requerimientos/actualizar_entrada_solicitud_de_requerimientos`, request_options);
      const editar_requerimiento_response = await editar_requerimiento_request.json();

      if(editar_requerimiento_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Requerimiento de personal de la solicitud actualizado correctamente"}, async () => {
          this.obtenerEntradasSolicitudRequerimientos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error actualizando el requerimiento personal"});
      }
    //}
  }

  async eliminarEntradaSolicitudRequerimientos(id){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: id
      })
    };

    const eliminar_requerimiento_request = await fetch(`/api/entradas_solicitud_de_requerimientos/eliminar_entrada_solicitud_de_requerimientos`, request_options);
    const eliminar_requerimiento_response = await eliminar_requerimiento_request.json();

    if(eliminar_requerimiento_response !== 'err'){
      this.setState({modal_operacion_exitosa: true, mensaje: "Requerimiento de personal eliminado correctamente"}, async () => {
        this.obtenerEntradasSolicitudRequerimientos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando el requerimiento de personal"});
    }
  }

  async obtenerEntradasSolicitudRequerimientos(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        solicitud_id: this.state.id
      })
    };
    const entradas_solicitud_de_requerimientos_request = await fetch('/api/entradas_solicitud_de_requerimientos/obtener_entradas_solicitud_de_requerimientos', request_options);
    const entradas_solicitud_de_requerimientos_response = await entradas_solicitud_de_requerimientos_request.json();
    if(entradas_solicitud_de_requerimientos_response !== 'err'){
      this.setState({entradas_solicitud_de_requerimientos: entradas_solicitud_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los requerimientos de personal de la solicitud "});
    }

  } 

  async componentDidMount(){
    document.title = "SICMB - Solicitud de Requerimientos";
    await this.obtenerProductos();
    await this.obtenerSolicitudDeRequerimientos();
    if (this.state.id !== undefined){      
      this.obtenerEntradasSolicitudRequerimientos();
    }
    else{
      await this.crearSolicitudDeRequerimientos();
      this.obtenerSolicitudDeRequerimientos();

    }
  }


 /* validarEdicionRequerimientoPersonal(id){
    let formulario_valido = true;
    let numero_personas = document.getElementById(`numero_personas_requerimiento_${id}`).value;
    let cargo_id = document.getElementById(`cargo_id_requerimiento_${id}`).value;
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id == cargo_id);
   
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
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id == this.state.cargo_id);

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
  }*/

  render() {

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_confirmacion_operacion = 
      <Modal isOpen={this.state.modal_confirmacion_operacion_abierto} toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
          Enviar solicitud de personal
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea enviar su solicitud de requerimientos y necesidades?</p>          
          <p>Si la envía no podrá modificarla luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="success" onClick={() => this.setState({modal_confirmacion_operacion_abierto: false}, this.enviarSolicitudDeRequerimientos)} className="boton-enviar-modal">
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
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: false}, this.eliminarSolicitudDeRequerimientos())} className="boton-eliminar-solicitud">
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
                  <h1 className="titulo-solicitud-personal">Solicitud de Requerimientos y Necesidades</h1>
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
                    <th>Subespecífica</th>
                    <th>Producto o Servicio</th>
                    <th>Unidad de Medida</th>
                    <th>I</th>
                    <th>II</th>
                    <th>III</th>
                    <th>IV</th>
                    <th>Cantidad Total</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.entradas_solicitud_de_requerimientos.map((entrada_solicitud_de_requerimientos, index) => {
                      return(
                      <tr key={`entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}>
                          <th scope="row">{entrada_solicitud_de_requerimientos.id}</th>
                          <td></td>
                          <td>
                            <Input
                              id={`producto_id_entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}                         
                              type="select"
                              defaultValue={entrada_solicitud_de_requerimientos.producto_id}
                              disabled={true}
                            >
                              {this.state.productos.map((producto, index) => {
                                return(
                                  <option value={producto.id} key={`producto_${producto.index}`}>{producto.nombre}</option>
                                )
                              })}
                            </Input>
                            </td>
                            <td>{this.obtenerUnidadDeMedida(entrada_solicitud_de_requerimientos.producto_id)}</td> 
                            <td>{entrada_solicitud_de_requerimientos.cantidad_primer_trimestre}</td>
                            <td>{entrada_solicitud_de_requerimientos.cantidad_segundo_trimestre}</td>
                            <td>{entrada_solicitud_de_requerimientos.cantidad_tercer_trimestre}</td>
                            <td>{entrada_solicitud_de_requerimientos.cantidad_cuarto_trimestre}</td>
                            <td>{entrada_solicitud_de_requerimientos.cantidad}</td>
                      </tr>
                      )
                  })}
                  </tbody>
              </Table>
              </Row>                         
  
                {/* Botón para agregar cargos */}
              <Row>            
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                  <Button color="danger" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: true})}>
                    <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>              
                    Eliminar solicitud de requerimientos y necesidades
                  </Button>
                </Col>                      
              </Row>          
          </Container>
        )
      } 
      else{        
        return(
            <Container fluid className="container-unidades-de-medida">
            {/* Modales del componente */}
            {modal_operacion_fallida}
            {modal_operacion_exitosa}
            {modal_confirmacion_operacion}

            <Row>
                {/* Título de la sección */}
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                <img src={personal} className="icono-titulo"/>    
                <h1 className="titulo-solicitud-personal">Solicitud de Requerimientos y Necesidades</h1>
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
                    <th>Subespecífica</th>
                    <th>Producto o Servicio</th>
                    <th>Unidad de Medida</th>
                    <th>I</th>
                    <th>II</th>
                    <th>III</th>
                    <th>IV</th>
                    <th>Cantidad Total</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                    <tbody>
                    {this.state.entradas_solicitud_de_requerimientos.map((entrada_solicitud_de_requerimientos, index) => {
                        return(
                        <tr key={`entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}>
                            <th scope="row">{entrada_solicitud_de_requerimientos.id}</th>
                            <td></td>
                            <td>
                            <Input
                                id={`producto_id_entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}                         
                                type="select"
                                defaultValue={entrada_solicitud_de_requerimientos.producto_id}
                            >
                                {this.state.productos.map((producto, index) => {
                                return(
                                    <option value={producto.id} key={`producto_${producto.index}`}>{producto.nombre}</option>
                                )
                                })}
                            <span id="cargo-edicion" className="error-solicitud-personal">No se pueden tener dos requerimientos de personal con el mismo cargo</span>                
                            </Input>
                            </td>
                            <td>{this.obtenerUnidadDeMedida(entrada_solicitud_de_requerimientos.producto_id)}</td>
                            <td>                
                            <Input 
                                id={`cantidad_primer_trimestre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_primer_trimestre}
                            />
                            <span id="numero-persona-edicion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_segundo_trimestre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_segundo_trimestre}
                            />
                            <span id="numero-persona-edicion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_tercer_trimestre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_tercer_trimestre}
                            />
                            <span id="numero-persona-edicion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_cuarto_trimestre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_cuarto_trimestre}
                            />
                            <span id="numero-persona-edicion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                        
                            </td>
                            <td>{entrada_solicitud_de_requerimientos.cantidad}</td>                                                                                                                                  
                            <td>
                            <Button 
                                color="info" className="boton-actualizar"
                                onClick={() => this.editarEntradaSolicitudRequerimiento(entrada_solicitud_de_requerimientos.id)}
                            >
                                <i class="iconos fa fa-redo-alt" aria-hidden="true"></i>                          
                                Actualizar
                            </Button>
                            <Button 
                                color="danger" className="boton-eliminar"
                                onClick={() => this.eliminarEntradaSolicitudRequerimientos(entrada_solicitud_de_requerimientos.id)}
                            >
                                <i class="iconos fa fa-trash-alt" aria-hidden="true"></i>                          
                                Eliminar
                            </Button>                          
                            </td>
                        </tr>
                        )
                    })}
                    <th scope="row"></th>
                    <td></td>
                    <td>
                    <Input 
                        type="select"
                        onChange={(e) => this.setState({producto_id: e.target.value})}
                        >
                        {this.state.productos.map((producto, index) => {
                        return(
                            <option value={producto.id} key={`producto_${producto.index}`}>{producto.nombre}</option>
                        )
                        })}                            
                    </Input>
                    <span id="producto-id-creacion" className="error-solicitud-personal">No se pueden tener dos requerimientos de personal con el mismo cargo ni se puede dejar vacío este campo</span>                                
                    </td> 
                    <td>{this.obtenerUnidadDeMedida(parseInt(this.state.producto_id, 10))}</td>

                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_primer_trimestre}
                        onChange={(e) => this.setState({cantidad_primer_trimestre: parseInt(e.target.value, 10)})}
                    />
                    <span id="numero-personas-creacion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                                      
                    </td>   
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_segundo_trimestre}
                        onChange={(e) => this.setState({cantidad_segundo_trimestre: parseInt(e.target.value, 10)})}
                    />
                    <span id="numero-personas-creacion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_tercer_trimestre}
                        onChange={(e) => this.setState({cantidad_tercer_trimestre: parseInt(e.target.value, 10)})}
                    />
                    <span id="numero-personas-creacion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_cuarto_trimestre}
                        onChange={(e) => this.setState({cantidad_cuarto_trimestre: parseInt(e.target.value, 10)})}
                    />
                    <span id="numero-personas-creacion" className="error-solicitud-personal">Número de personas debe ser un número y no puede estar vacío</span>                                                      
                    </td> 
                    <td>{this.state.cantidad_cuarto_trimestre + this.state.cantidad_primer_trimestre + this.state.cantidad_segundo_trimestre + this.state.cantidad_tercer_trimestre }</td>

                    <td>
                    <Button 
                        color="info" className="boton-actualizar"
                        onClick={() => this.verificarEntradaSolicitudRequerimiento()}
                    >
                        <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                        Agregar requerimiento
                    </Button>                         
                    </td>
                    </tbody>
                </Table>
                </Row>        

                <Row>            
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                    <Button color="info" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_operacion_abierto: true})}>
                    <i className="iconos fa fa-envelope" aria-hidden="true"></i>              
                    Enviar solicitud de requerimientos y necesidades
                    </Button>              
                </Col>                      
                </Row>
            </Container>      
        )
    }
}
}
export default withContext(SolicitudRequerimientos);