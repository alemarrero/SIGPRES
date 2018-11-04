import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table} from 'reactstrap';
import './ObjetivosEspecificos.css';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import withContext from '../../Contenedor/withContext';

export class ObjetivosEspecificos extends Component {
  constructor(props){
    super(props);
    this.state = {
      propuesta_id: undefined,
      objetivos_especificos: [],
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_crear_objetivo_especifico_abierto: false,
      modal_editar_objetivo_especifico_abierto: false,
      mensaje: undefined,
      objetivo_especifico: undefined,
      id: undefined,
      observacion: undefined
    };
    this.string_regex = /^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/;
    this.validarCreacionObjetivoEspecifico = this.validarCreacionObjetivoEspecifico.bind(this);
    this.validarEdicionObjetivoEspecifico = this.validarEdicionObjetivoEspecifico.bind(this);
    this.validarEdicionObjetivoEspecifico = this.validarEdicionObjetivoEspecifico.bind(this);
    this.eliminarObjetivoEspecifico = this.eliminarObjetivoEspecifico.bind(this);
    this.enviarPropuesta = this.enviarPropuesta.bind(this);
    this.obtenerPropuesta = this.obtenerPropuesta.bind(this);
    this.crearPropuesta = this.crearPropuesta.bind(this);
    this.retirarPropuesta = this.retirarPropuesta.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Gestión de POA";
    this.obtenerPropuesta();
  }
  
  async obtenerPropuesta() {
    const request_options = {
      method: "GET",
      credentials: "include"
    };

    const propuesta_request = await fetch('/api/propuestas_plan_operativo_anual/obtener_propuesta', request_options);
    const propuesta_response = await propuesta_request.json();
    console.log(propuesta_response);
    if(propuesta_response.estado !== "err"){
      this.setState({...propuesta_response.data});
    }
    else{
      await this.crearPropuesta();
    }
  }

  async crearPropuesta(){
    const request_options = {
      method: "POST",
      credentials: "include"
    };

    const crear_propuesta_request = await fetch('/api/propuestas_plan_operativo_anual/crear_propuesta', request_options);
    const crear_propuesta_response = await crear_propuesta_request.json();

    if(crear_propuesta_response.estado !== "err"){
      this.setState({...crear_propuesta_response.data});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al crear la propuesta de Plan Operativo Anual"});
    }
  }

  async enviarPropuesta() {

  }


  async retirarPropuesta() {

  }

  validarCreacionObjetivoEspecifico(){

  }

  crearObjetivoEspecífico(){

  }

  validarEdicionObjetivoEspecifico(){

  }

  editarObjetivoEspecifico(){

  }

  eliminarObjetivoEspecifico(){

  }

  render() {

    // Modal que muestra el formulario para poder crear una nueva específica
    let modal_crear_objetivo_especifico = 
      <Modal isOpen={this.state.modal_crear_objetivo_especifico_abierto} toggle={() => this.setState({modal_crear_objetivo_especifico_abierto: !this.state.modal_crear_objetivo_especifico_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_objetivo_especifico_abierto: !this.state.modal_crear_objetivo_especifico_abierto})}>
        Crear nuevo objetivo específico
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Número de la específica*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Objetivo Específico*</Label>
              <Input 
                onChange={(e) => this.setState({objetivo_especifico: e.target.value})}
              />
              <span id="objetivo_especifico-modal-creacion" className="error-objetivos-especificos">Objetivo especíico inválido. El campo no puede estar vacío.</span>
            </Col>
          </FormGroup>        
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearObjetivoEspecífico} color="success" type="submit" className="boton-crear-modal-especifica">
            Crear objetivo
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_objetivo_especifico_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar una específica existente
    let modal_editar_objetivo_especifico = 
      <Modal isOpen={this.state.modal_editar_objetivo_especifico_abierto} toggle={() => this.setState({modal_editar_objetivo_especifico_abierto: !this.state.modal_editar_objetivo_especifico_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_objetivo_especifico_abierto: !this.state.modal_editar_objetivo_especifico_abierto})}>
          Editar objetivo específico
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Número de la específica */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Objetivo Específico*</Label>
                <Input 
                  defaultValue={this.state.objetivo_especifico}
                  onChange={(e) => this.setState({objetivo_especifico: e.target.value})}
                />
                <span id="objetivo_especifico-modal-edicion" className="error-especificas">Número de específica inválido</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarObjetivoEspecifico} className="boton-crear-modal-especifica">
              Editar objetivo
            </Button>

            <Button color="danger" onClick={() => this.eliminarObjetivoEspecifico()} className="boton-cancelar-modal">
              Eliminar
            </Button>

            <Button color="warning" onClick={() => this.setState({modal_editar_objetivo_especifico_abierto: false})} className="boton-cancelar-modal">
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
          {/* Modales del componente */}
          {modal_crear_objetivo_especifico}
          {modal_editar_objetivo_especifico}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={objetivos_especificos} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Plan Operativo Anual</h1>
              <h2>Objetivos Específicos</h2>
            </Col>

            {/* Botón para agregar específicas */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_objetivo_especifico_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar objetivo específico
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th colspan="3">Estado de la Propuesta de Plan Operativo Anual</th>
                  </tr>
                  <tr>
                    <th>Enviado</th>
                    <th>Aprobado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {this.state.enviada ? <span style={{color: "green", fontWeight: "bold"}}>Si</span> : <span style={{color: "red", fontWeight: "bold"}}>No</span>}
                    </th>
                    <th>
                      {this.state.aprobada ? <span style={{color: "green", fontWeight: "bold"}}>Si</span> : <span style={{color: "red", fontWeight: "bold"}}>No</span>}
                    </th>
                    <th>
                      {this.state.observaciones ? <span style={{color: "red", fontWeight: "bold"}}>{this.state.observaciones}</span> : "N/A"}
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Si existen específicas, muestra una tabla con su información */}
          {this.state.objetivos_especificos.length > 0 ? 
              <Row className="row-unidades-de-medida">
                <Table striped className="tabla-unidades-de-medida">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Número de Actividad</th>
                      <th>Objetivo Específico</th>                    
                      <th>Opciones</th>
                    </tr>
                  </thead>
                    <tbody>
                    {this.state.objetivos_especificos.map((objetivo, index) => {
                        return(
                        <tr key={`objetivo_especifico_${objetivo.id}`}>
                            <th scope="row">{objetivo.id}</th>
                            <td>51</td>
                            <td>{objetivo.objetivo}</td>
                            <td>
                            <Button 
                                color="info" className="boton-ver"
                                onClick={() => this.props.history.push(`/inicio/planeacion/objetivos-especificos/${objetivo.id}`)}
                            >
                                <i class="iconos fa fa-eye" aria-hidden="true"></i>                          
                                Acciones recurrentes
                            </Button>
                            <Button 
                                color="info" className="boton-gestionar"
                                onClick={() => this.cargarModalEditarObjetivo(index)}
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
              :
              <Row>
                <Col xs={12} className="text-center">
                  <h2>Aún no ha creado ningún Objetivo Específico. <br/> Haga click en el botón "Agregar objetivo específico" para agregar uno nuevo.</h2>
                </Col>
              </Row>
          }
        </Container>
    )
  }
}

export default withContext(ObjetivosEspecificos);
