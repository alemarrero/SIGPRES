import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Container, Table, Row, Col, Button, Input, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Programas.css';
import programas from '../../assets/img/usuarios.png';
import withContext from './../../Contenedor/withContext';

export class Programas extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal_crear_programa_abierto: false,
      modal_editar_programa_abierto: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_confirmacion_abierto: false,
      mensaje: undefined,
      nombre: undefined,
      duracion_programa: '1',
      tipo_duracion: 'día(s)',
      area_id: undefined,
      descripcion: undefined,
      fecha_inicio: undefined,
      fecha_finalizacion: undefined,
      id: undefined,
      programas: [],
      areas: []
    };
    this.validarCamposModalCreacion = this.validarCamposModalCreacion.bind(this);
    this.validarCamposModalEdicion = this.validarCamposModalEdicion.bind(this);
    this.crearPrograma = this.crearPrograma.bind(this);
    this.eliminarPrograma = this.eliminarPrograma.bind(this);
    this.obtenerProgramas = this.obtenerProgramas.bind(this);
    this.verificarSesion = this.verificarSesion.bind(this);
    this.editarPrograma = this.editarPrograma.bind(this);
    this.formatearFecha = this.formatearFecha.bind(this);
    this.cargarModalEditarPrograma = this.cargarModalEditarPrograma.bind(this);
  }

  cargarModalEditarPrograma(index){
    const programa = this.state.programas[index];
    
    this.setState({
      nombre: programa.nombre,
      duracion_programa: programa.duracion.split(" ")[0],
      tipo_duracion: programa.duracion.split(" ")[1],
      area_id: programa.area_id,
      descripcion: programa.descripcion,
      fecha_inicio: programa.fecha_inicio,
      fecha_finalizacion: programa.fecha_finalizacion,
      modal_editar_programa_abierto: true,
      id: programa.id
    });
  }

  formatearFecha(fecha){
    const meses = {"01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio", 
      "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"
    };

    const _fecha = fecha.split("-");

    return `${_fecha[2]} de ${meses[_fecha[1]]} del ${_fecha[0]}`;
  }

  validarCamposModalCreacion() {
    let formulario_valido = true;

    if(this.state.nombre === undefined || this.state.nombre === "" || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      formulario_valido = false;
      document.getElementById("nombre-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("nombre-modal-creacion").style.display = "none";
    }

    if(this.state.fecha_inicio === undefined || this.state.fecha_inicio === ""){
      formulario_valido = false;
      document.getElementById("fecha-inicio-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("fecha-inicio-modal-creacion").style.display = "none";
    }

    if(this.state.fecha_finalizacion === undefined || this.state.fecha_finalizacion === ""){
      formulario_valido = false;
      document.getElementById("fecha-finalizacion-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("fecha-finalizacion-modal-creacion").style.display = "none";
    }

    const fecha_inicio = new Date(this.state.fecha_inicio);
    const fecha_finalizacion = new Date(this.state.fecha_finalizacion);

    if(fecha_inicio.getTime() > fecha_finalizacion.getTime()){
      formulario_valido = false;
      document.getElementById("fecha-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("fecha-modal-creacion").style.display = "none";
    }
    
    if(this.state.duracion_programa === undefined || this.state.tipo_duracion === undefined ||
      this.state.duracion_programa === "" || this.state.tipo_duracion === ""  
    ){
      formulario_valido = false;
      document.getElementById("duracion-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("duracion-modal-creacion").style.display = "none";
    }

    if(this.state.area_id === undefined || this.state.area_id === ""){
      formulario_valido = false;
      document.getElementById("direccion-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("direccion-modal-creacion").style.display = "none";
    }

    if(this.state.descripcion === undefined || this.state.descripcion === ""){
      formulario_valido = false;
      document.getElementById("descripcion-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("descripcion-modal-creacion").style.display = "none";
    }

    return formulario_valido;
    //return false;
  }

  validarCamposModalEdicion() {
    let formulario_valido = true;

    if(this.state.nombre === undefined || this.state.nombre === ""){
      formulario_valido = false;
      document.getElementById("nombre-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("nombre-modal-edicion").style.display = "none";
    }

    if(this.state.fecha_inicio === undefined || this.state.fecha_inicio === ""){
      formulario_valido = false;
      document.getElementById("fecha-inicio-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("fecha-inicio-modal-edicion").style.display = "none";
    }

    if(this.state.fecha_finalizacion === undefined || this.state.fecha_finalizacion === ""){
      formulario_valido = false;
      document.getElementById("fecha-finalizacion-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("fecha-finalizacion-modal-edicion").style.display = "none";
    }
    
    if(this.state.duracion_programa === undefined || this.state.tipo_duracion === undefined){
      formulario_valido = false;
      document.getElementById("duracion-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("duracion-modal-edicion").style.display = "none";
    }

    if(this.state.area_id === undefined || this.state.area_id === ""){
      formulario_valido = false;
      document.getElementById("direccion-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("direccion-modal-edicion").style.display = "none";
    }

    if(this.state.descripcion === undefined || this.state.descripcion === ""){
      formulario_valido = false;
      document.getElementById("descripcion-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("descripcion-modal-edicion").style.display = "none";
    }

    return formulario_valido;
  }

  async crearPrograma() {
    if(this.validarCamposModalCreacion()){
      const request_body = JSON.stringify({
        nombre: this.state.nombre,
        duracion: `${this.state.duracion_programa} ${this.state.tipo_duracion}`,
        area_id: this.state.area_id,
        descripcion: this.state.descripcion,
        fecha_inicio: this.state.fecha_inicio,
        fecha_finalizacion: this.state.fecha_finalizacion
      });

      const request_options = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: request_body,
        credentials: 'include'
      };

      const crear_programa_request = await fetch('/api/programas/crear_programa', request_options);
      const crear_programa_response = await crear_programa_request.json();

      if(crear_programa_response !== 'err'){
        this.setState({modal_crear_programa_abierto: false, modal_operacion_exitosa: true, mensaje: "Programa creado exitosamente"}, async () => {
          this.obtenerProgramas();
        });
      }
      else{
        this.setState({modal_crear_programa_abierto: false, modal_operacion_fallida: true, mensaje: "Error creando el programa"});
      }
    }
  }

  async editarPrograma(){
    if(this.validarCamposModalEdicion()){
      const request_body = JSON.stringify({
        nombre: this.state.nombre,
        duracion: `${this.state.duracion_programa} ${this.state.tipo_duracion}`,
        area_id: this.state.area_id,
        descripcion: this.state.descripcion,
        fecha_inicio: this.state.fecha_inicio,
        fecha_finalizacion: this.state.fecha_finalizacion,
        id: this.state.id
      });

      const request_options = {
        method: "POST",
        credentials: "include",
        body: request_body,
        headers: {"Content-Type": "application/json"}
      };

      const editar_programa_request = await fetch('/api/programas/actualizar_programa', request_options);
      const editar_programa_response = await editar_programa_request.json();

      if(editar_programa_response !== 'err'){
        this.setState({modal_editar_programa_abierto: false, modal_operacion_exitosa: true, mensaje: "Programa actualizado exitosamente"}, async () => {
          this.obtenerProgramas();
        });
      }
      else{
        this.setState({modal_editar_programa_abierto: false, modal_operacion_fallida: true, mensaje: "Error actualizando el programa"})
      }
    }
  }

  async eliminarPrograma() {
    const request_body = JSON.stringify({
      id: this.state.id
    });

    const request_options = {
      method: "post",
      credentials: "include",
      body: request_body,
      headers: {"Content-Type": "application/json"}
    };

    const eliminar_programa_request = await fetch('/api/programas/eliminar_programa', request_options);
    const eliminar_programa_response = await eliminar_programa_request.json();

    if(eliminar_programa_response !== 'err'){
      this.setState({modal_editar_programa_abierto: false, modal_operacion_exitosa: true, mensaje: "Programa eliminado correctamente"}, async () => {
        this.obtenerProgramas();
      });
    }
    else{
      this.setState({modal_editar_programa_abierto: false, modal_operacion_fallida: true, mensaje: "Error eliminando el programa"});
    }
  }

  async obtenerProgramas() {
    const programas_request = await fetch('/api/programas/obtener_programas', {credentials: 'include'});
    const programas_response = await programas_request.json();

    if(programas_request !== 'err'){
      this.setState({programas: programas_response});
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
    document.title = "SICMB - Gestión de Programas";

    await this.obtenerProgramas();
    
    if(this.state.area_id === undefined || this.state.area_id === ""){
        this.setState({area_id: this.props.areas[0].id})
    }
  }

  render() {
    let duraciones_programa = [];

    for(let i = 1; i < 32; i ++){
      duraciones_programa.push(
        <option value={i}>{i}</option>
      )
    }    

    let modal_crear_programa = 
      <Modal isOpen={this.state.modal_crear_programa_abierto} toggle={() => this.setState({modal_crear_programa_abierto: !this.state.modal_crear_programa_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_crear_programa_abierto: !this.state.modal_crear_programa_abierto})}>
          Crear programa
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              {/* Nombre del programa */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre del programa*</Label>
                <Input 
                  defaultValue={this.state.nombre}
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-creacion" className="error-programas">Nombre de programa inválido</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Fecha de inicio del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de inicio*</Label>
                <Input 
                  type="date"
                  defaultValue={this.state.fecha_inicio}
                  onChange={(e) => this.setState({fecha_inicio: e.target.value})}
                />
                <span id="fecha-inicio-modal-creacion" className="error-programas">Fecha de inicio inválida</span>
              </Col>


              {/* Fecha de finalización del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de finalización*</Label>
                <Input 
                  type="date"
                  defaultValue={this.state.fecha_finalizacion}
                  onChange={(e) => this.setState({fecha_finalizacion: e.target.value})}
                />
                <span id="fecha-finalizacion-modal-creacion" className="error-programas">Fecha de finalizacion inválida</span>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <span id="fecha-modal-creacion" className="error-programas">La fecha de inicio no puede ser posterior a la fecha de finalización</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Duración del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label className="programas-label-duracion">Duración del programa*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.duracion_programa}
                  onChange={(e) => this.setState({duracion_programa: e.target.value})}
                  className="duracion-programa"
                >
                  {duraciones_programa}
                </Input>
                <Input
                  type="select"
                  defaultValue={this.state.tipo_duracion}
                  onChange={(e) => this.setState({tipo_duracion: e.target.value})}
                  className="tipo-duracion"
                >
                  <option value="día(s)">día(s)</option>
                  <option value="semana(s)">semana(s)</option>
                  <option value="mes(es)">mes(es)</option>
                </Input>
                <span id="duracion-modal-creacion" className="error-programas">Duración del programa inválida</span>                
              </Col>


              {/* Dirección asociada al programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Dirección de adscripción*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.area_id}
                  onChange={(e) => this.setState({area_id: e.target.value})}
                >
                  {this.props.areas.map((area, index) => {
                    return(
                      <option value={area.id} key={`area_${area.id}`}>{area.nombre}</option>
                    )
                  })}
                </Input>
                <span id="direccion-modal-creacion" className="error-programas">Dirección inválida</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Descripción del programa */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Descripción*</Label>
                <Input 
                  defaultValue={this.state.descripcion}
                  onChange={(e) => this.setState({descripcion: e.target.value})}
                />
                <span id="descripcion-modal-creacion" className="error-programas">Descrpición del programa inválida</span>                
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button onClick={this.crearPrograma} color="success" type="submit" className="boton-crear-modal-programas">
              Crear
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_crear_programa_abierto: false})} className="boton-cancelar-modal-programas">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;


    let modal_editar_programa = 
      <Modal isOpen={this.state.modal_editar_programa_abierto} toggle={() => this.setState({modal_editar_programa_abierto: !this.state.modal_editar_programa_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_editar_programa_abierto: !this.state.modal_editar_programa_abierto})}>
          Editar programa
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              {/* Nombre del programa */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre del programa*</Label>
                <Input 
                  defaultValue={this.state.nombre}
                  onChange={(e) => this.setState({nombre: e.target.value})}
                />
                <span id="nombre-modal-edicion" className="error-programas">Nombre de programa inválido</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Fecha de inicio del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de inicio*</Label>
                <Input 
                  type="date"
                  defaultValue={this.state.fecha_inicio}
                  onChange={(e) => this.setState({fecha_inicio: e.target.value})}
                />
                <span id="fecha-inicio-modal-edicion" className="error-programas">Fecha de inicio inválida</span>
              </Col>


              {/* Fecha de finalización del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fecha de finalización*</Label>
                <Input 
                  type="date"
                  defaultValue={this.state.fecha_finalizacion}
                  onChange={(e) => this.setState({fecha_finalizacion: e.target.value})}
                />
                <span id="fecha-finalizacion-modal-edicion" className="error-programas">Fecha de finalizacion inválida</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Duración del programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label className="programas-label-duracion">Duración del programa*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.duracion_programa}
                  onChange={(e) => this.setState({duracion_programa: e.target.value})}
                  className="duracion-programa"
                >
                  {duraciones_programa}
                </Input>
                <Input
                  type="select"
                  defaultValue={this.state.tipo_duracion}
                  onChange={(e) => this.setState({tipo_duracion: e.target.value})}
                  className="tipo-duracion"
                >
                  <option value="día(s)">día(s)</option>
                  <option value="semana(s)">semana(s)</option>
                  <option value="mes(es)">mes(es)</option>
                </Input>
                <span id="duracion-modal-edicion" className="error-programas">Duración del programa inválida</span>                
              </Col>


              {/* Dirección asociada al programa */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Dirección de adscripción*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.area_id}
                  onChange={(e) => this.setState({area_id: e.target.value})}
                >
                  {this.props.areas.map((area, index) => {
                    return(
                      <option value={area.id} key={`area_editar_programa_${index}`}>{area.nombre}</option>
                    )
                  })}
                </Input>
                <span id="direccion-modal-edicion" className="error-programas">Dirección inválida</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Descripción del programa */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Descripción*</Label>
                <Input 
                  defaultValue={this.state.descripcion}
                  onChange={(e) => this.setState({descripcion: e.target.value})}
                />
                <span id="descripcion-modal-edicion" className="error-programas">Descrpición del programa inválida</span>                
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarPrograma} className="boton-crear-modal-programas">
              Editar
            </Button>

            <Button color="warning" onClick={() => this.setState({modal_confirmacion_abierto: true, modal_editar_programa_abierto: false})} className="boton-eliminar-modal-programas">
              Eliminar
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_editar_programa_abierto: false})} className="boton-cancelar-modal-programas">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
        
      </Modal>
    ;


    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar programa
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar el programa?</p>          
          <p>Si lo elimina no podrá recuperarlo luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={this.eliminarPrograma} className="boton-eliminar-solicitud">
              Eliminar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: false})}>
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
      <Container fluid className="container-programas">

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/planeacion`)}>Planeación</BreadcrumbItem>
            <BreadcrumbItem active>Programas</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_crear_programa}
        {modal_editar_programa}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_confirmacion_eliminar}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={programas} className="icono-titulo"/>    
            <h1 className="titulo-programas">Gestión de Programas</h1>
          </Col>

          {/* Botón para agregar programas */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_programa_abierto: true})}>
            <i className="iconos fa fa-plus" aria-hidden="true"></i>              
            Crear programa
            </Button>
          </Col>
        </Row>

        {/* Si existen programas, muestra una tabla con su información */}
        {this.state.programas.length > 0 && 
          <Row className="row-programas">
            <Table striped className="tabla-programas">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del programa</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de finalización</th>                  
                  <th>Duración</th>
                  <th>Opciones</th>
                </tr>
              </thead>
                <tbody>
                {this.state.programas.map((programa, index) => {
                    return(
                    <tr key={`${programa.id}`}>
                        <th scope="row">{programa.id}</th>
                        <td>{programa.nombre}</td>
                        <td>{this.formatearFecha(programa.fecha_inicio)}</td>
                        <td>{this.formatearFecha(programa.fecha_finalizacion)}</td>
                        <td>{programa.duracion}</td>
                        <td>
                          <Button 
                            color="info" className="boton-gestionar"
                            onClick={() => this.cargarModalEditarPrograma(index)}
                          >
                            <i class="iconos fa fa-cogs" aria-hidden="true"></i>                          
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

export default withContext(Programas);