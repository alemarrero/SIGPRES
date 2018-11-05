import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table} from 'reactstrap';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import withContext from '../../Contenedor/withContext';
import './ObjetivosEspecificos.css';

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
      modal_confirmacion_abierto: false,
      mensaje: undefined,
      objetivo_especifico: undefined,
      id: undefined,
      aprobada: false,
      enviada: false,
      observaciones: null
    };
    this.string_regex = /^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F0-9]+)*$/;
    this.validarCreacionObjetivoEspecifico = this.validarCreacionObjetivoEspecifico.bind(this);
    this.validarEdicionObjetivoEspecifico = this.validarEdicionObjetivoEspecifico.bind(this);
    this.eliminarObjetivoEspecifico = this.eliminarObjetivoEspecifico.bind(this);
    this.enviarPropuesta = this.enviarPropuesta.bind(this);
    this.obtenerPropuesta = this.obtenerPropuesta.bind(this);
    this.crearPropuesta = this.crearPropuesta.bind(this);
    this.retirarPropuesta = this.retirarPropuesta.bind(this);
    this.obtenerObjetivosEspecificos = this.obtenerObjetivosEspecificos.bind(this);
    this.crearObjetivoEspecífico = this.crearObjetivoEspecífico.bind(this);
    this.editarObjetivoEspecifico = this.editarObjetivoEspecifico.bind(this);
    this.cargarModalEditarObjetivo = this.cargarModalEditarObjetivo.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Gestión de POA";
    this.obtenerPropuesta();
  }

  async obtenerObjetivosEspecificos(){
    const request_options = {
      method: "POST",
      headers: {"Content-type": "application/json"},
      credentials: "include",
      body: JSON.stringify({
        propuesta_id: this.state.propuesta_id
      })
    };

    const objetivos_especificos_request = await fetch('/api/objetivos_especificos/obtener_objetivos', request_options);
    const objetivos_especificos_response = await objetivos_especificos_request.json();

    if(objetivos_especificos_response !== "err"){
      this.setState({objetivos_especificos: objetivos_especificos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los objetivos específicos de la dirección"});
    }
  }
  
  async obtenerPropuesta() {
    const request_options = {
      method: "GET",
      credentials: "include"
    };

    const propuesta_request = await fetch('/api/propuestas_plan_operativo_anual/obtener_propuesta', request_options);
    const propuesta_response = await propuesta_request.json();

    if(propuesta_response.estado !== "err"){
      this.setState({
        propuesta_id: propuesta_response.data.id,
        aprobada: propuesta_response.data.aprobada,
        enviada: propuesta_response.data.enviada,
        observaciones: propuesta_response.data.observaciones
      }, async () => {
        this.obtenerObjetivosEspecificos();
      });
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
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.propuesta_id
      })
    };

    const enviar_propuesta_request = await fetch('/api/propuestas_plan_operativo_anual/enviar_propuesta', request_options);
    const enviar_propuesta_response = await enviar_propuesta_request.json();

    if(enviar_propuesta_response !== "err"){
      this.setState({mensaje: "Propuesta de Plan Operativo Anual enviada correctamente", modal_operacion_exitosa: true}, async () => {
        this.obtenerPropuesta();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al enviar la Propuesta de Plan Operativo Anual"});
    }
  }

  async retirarPropuesta() {
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.propuesta_id
      })
    };

    const retirar_propuesta_request = await fetch('/api/propuestas_plan_operativo_anual/retirar_propuesta', request_options);
    const retirar_propuesta_response = await retirar_propuesta_request.json();

    if(retirar_propuesta_response !== "err"){
      this.setState({mensaje: "Propuesta de Plan Operativo Anual retirada correctamente", modal_operacion_exitosa: true}, async () => {
        this.obtenerPropuesta();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al retirar la Propuesta de Plan Operativo Anual"});
    }
  }

  validarCreacionObjetivoEspecifico(){
    let formulario_valido = true;

    if(this.state.objetivo === undefined || this.state.objetivo === ""){
      formulario_valido = false;
      document.getElementById("objetivo-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("objetivo-modal-creacion").style.display = "none";
    }

    return formulario_valido;
  }

  async crearObjetivoEspecífico(){
    if(this.validarCreacionObjetivoEspecifico()){
      const request_options = {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          propuesta_id: this.state.propuesta_id,
          objetivo: this.state.objetivo
        })
      };
  
      const crear_objetivo_especifico_request = await fetch('/api/objetivos_especificos/crear_objetivo_especifico', request_options);
      const crear_objetivo_especifico_response = await crear_objetivo_especifico_request.json();
  
      if(crear_objetivo_especifico_response !== "err"){
          this.setState({modal_crear_objetivo_especifico_abierto: false, modal_operacion_exitosa: true, mensaje: "Objetivo específico creado correctamente"}, async () => {
            this.obtenerObjetivosEspecificos();
          });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error al crear el Objetivo Específico"});
      }
    }
  }

  cargarModalEditarObjetivo(index){
    const objetivo = this.state.objetivos_especificos[index];

    this.setState({id: objetivo.id, objetivo: objetivo.objetivo, modal_editar_objetivo_especifico_abierto: true});
  }

  validarEdicionObjetivoEspecifico(){
    let formulario_valido = true;

    if(this.state.objetivo === undefined || this.state.objetivo === ""){
      formulario_valido = false;
      document.getElementById("objetivo-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("objetivo-modal-edicion").style.display = "none";
    }

    return formulario_valido;
  }

  async editarObjetivoEspecifico(){
    if(this.validarEdicionObjetivoEspecifico()){
      const request_options = {
        method: "POST",
        credentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          propuesta_id: this.state.propuesta_id,
          objetivo: this.state.objetivo,
          id: this.state.id
        })
      };
  
      const editar_objetivo_especifico_request = await fetch('/api/objetivos_especificos/modificar_objetivo', request_options);
      const editar_objetivo_especifico_response = await editar_objetivo_especifico_request.json();
  
      if(editar_objetivo_especifico_response !== "err"){
          this.setState({modal_editar_objetivo_especifico_abierto: false, modal_operacion_exitosa: true, mensaje: "Objetivo Específico editado correctamente"}, async () => {
            this.obtenerObjetivosEspecificos();
          })
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error al editar el Objetivo Específico"});
      }
    }
  }

  async eliminarObjetivoEspecifico(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_especifico_request = await fetch('/api/objetivos_especificos/eliminar_objetivo', request_options);
    const eliminar_especifico_response = await eliminar_especifico_request.json();

    if(eliminar_especifico_response !== "err"){
        this.setState({modal_confirmacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Objetivo Específico eliminado correctamente"}, async () => {
          this.obtenerObjetivosEspecificos();
        })
    }
    else{
      this.setState({modal_confirmacion_abierto: false, modal_operacion_fallida: true, mensaje: "Error al editar el Objetivo Específico"});
    }
  }

  render() {

    // Modal que muestra el formulario para poder crear un nuevo objetivo específico
    let modal_crear_objetivo_especifico = 
      <Modal isOpen={this.state.modal_crear_objetivo_especifico_abierto} toggle={() => this.setState({modal_crear_objetivo_especifico_abierto: !this.state.modal_crear_objetivo_especifico_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_objetivo_especifico_abierto: !this.state.modal_crear_objetivo_especifico_abierto})}>
        Crear nuevo objetivo específico
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Descripción del objetivo específico*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Objetivo Específico*</Label>
              <Input 
                onChange={(e) => this.setState({objetivo: e.target.value})}
              />
              <span id="objetivo-modal-creacion" className="error-objetivos-especificos">Objetivo especíico inválido. El campo no puede estar vacío.</span>
            </Col>
          </FormGroup>        
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="footer-modal-creacion-objetivos-especificos" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearObjetivoEspecífico} color="success" type="submit" className="boton-crear">
            Crear objetivo
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_objetivo_especifico_abierto: false})} className="boton-cancelar">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un objetivo específico existente
    let modal_editar_objetivo_especifico = 
      <Modal isOpen={this.state.modal_editar_objetivo_especifico_abierto} toggle={() => this.setState({modal_editar_objetivo_especifico_abierto: !this.state.modal_editar_objetivo_especifico_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_objetivo_especifico_abierto: !this.state.modal_editar_objetivo_especifico_abierto})}>
          Editar objetivo específico
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Descripción del objetivo específico */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Objetivo Específico*</Label>
                <Input 
                  defaultValue={this.state.objetivo}
                  onChange={(e) => this.setState({objetivo: e.target.value})}
                />
                <span id="objetivo-modal-edicion" className="error-objetivos-especificos">Objetivo específico inválido</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="footer-modal-edicion-objetivos-especificos" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarObjetivoEspecifico} className="boton-crear">
              Editar objetivo
            </Button>

            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: true, modal_editar_objetivo_especifico_abierto: false})} className="boton-eliminar">
              Eliminar objetivo
            </Button>

            <Button color="warning" onClick={() => this.setState({modal_editar_objetivo_especifico_abierto: false})} className="boton-cancelar">
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

    // Modal de confirmación que se muestra antes de borrar un objetivo especifico
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar objetivo específico
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar el objetivo específico?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarObjetivoEspecifico()}>Eliminar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button className="boton-cancelar" color="warning" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cancelar</Button>
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
          {modal_confirmacion}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={objetivos_especificos} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Plan Operativo Anual</h1>
            </Col>

            {/* Botón para agregar objetivos específicos */}
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
                    <th colSpan="4">Estado de la Propuesta de Plan Operativo Anual</th>
                  </tr>
                  <tr>
                    <th>Enviado</th>
                    <th>Aprobado</th>
                    <th>Observaciones</th>
                    <th className="text-right">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {this.state.enviada ? <span style={{color: "green"}}>Si</span> : <span style={{color: "red"}}>No</span>}
                    </th>
                    <th>
                      {this.state.aprobada ? <span style={{color: "green"}}>Si</span> : <span style={{color: "red"}}>No</span>}
                    </th>
                    <th>
                      {this.state.observaciones ? <span style={{color: "red"}}>{this.state.observaciones}</span> : "N/A"}
                    </th>
                    <th className="text-right">
                      {!this.state.enviada ? 
                        <Button color="success" style={{fontWeight: "normal"}} onClick={this.enviarPropuesta}>Enviar propuesta</Button>
                        :
                        <Button color="danger" style={{fontWeight: "normal"}} onClick={this.retirarPropuesta}>Retirar propuesta</Button>
                      }
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          
          <hr/>

          {/* Si existen específicas, muestra una tabla con su información */}
          {this.state.objetivos_especificos.length > 0 ? 
              <Row className="row-unidades-de-medida">
                <Col xs={12} className="text-center">
                  <h2>Objetivos Específicos</h2>
                </Col>
                
                <Col xs={12}>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Número de Actividad</th>
                        <th>Objetivo Específico</th>                    
                        <th className="text-right">Opciones</th>
                      </tr>
                    </thead>
                      <tbody>
                      {this.state.objetivos_especificos.map((objetivo, index) => {
                          return(
                          <tr key={`objetivo_especifico_${objetivo.id}`}>
                              <th scope="row">{objetivo.id}</th>
                              <td>51</td>
                              <td>{objetivo.objetivo}</td>
                              <td className="text-right">
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
                </Col>
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
