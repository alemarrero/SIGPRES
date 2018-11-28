import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table} from 'reactstrap';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import './RevisionPOA.css';

export default class DetallePOA extends Component {
  constructor(props){
    super(props);
    this.state = {
      area: {
        nombre: undefined, 
        descripcion: undefined
      },
      objetivos_especificos: [],
      modal_desaprobar_propuesta_abierto: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerPropuesta = this.obtenerPropuesta.bind(this);
    this.aprobarPropuesta = this.aprobarPropuesta.bind(this);
    this.desaprobarPropuesta = this.desaprobarPropuesta.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Detalle de POA";
    this.obtenerPropuesta();
  }

  async obtenerPropuesta(){
    const request_options = {
      method: "POST",
      headers: {"Content-type": "application/json"},
      credentials: "include",
      body: JSON.stringify({
        id: parseInt(this.props.match.params.id, 10)
      })
    };

    const request = await fetch("/api/propuestas_plan_operativo_anual/obtener_propuesta_full", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({...response})
    }
  }

  async aprobarPropuesta(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const request = await fetch("/api/propuestas_plan_operativo_anual/aprobar_propuesta", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje: "Propuesta aprobada correctamente"}, async () => {
        this.obtenerPropuesta();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al aprobar la propuesta"});
    }
  }

  async desaprobarPropuesta(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id,
        observaciones: this.state.observaciones
      })
    };

    const request = await fetch("/api/propuestas_plan_operativo_anual/desaprobar_propuesta", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({modal_desaprobar_propuesta_abierto: false, modal_operacion_exitosa: true, mensaje: "Propuesta desaprobada correctamente"}, async () => {
        this.obtenerPropuesta();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al desaprobar la propuesta"});
    }
  }

  render() {
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

    let modal_desaprobar_propuesta = 
      <Modal isOpen={this.state.modal_desaprobar_propuesta_abierto} toggle={() => this.setState({modal_desaprobar_propuesta_abierto: !this.state.modal_desaprobar_propuesta_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_desaprobar_propuesta_abierto: !this.state.modal_desaprobar_propuesta_abierto})}>
          Desaprobar Propuesta de POA
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12}>
                <Label>Observaciones*:</Label>
                <Input
                  onChange={(e) => this.setState({observaciones: e.target.value})}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Col className="footer-modal-edicion-objetivos-especificos" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.desaprobarPropuesta} className="boton-crear">
              Desaprobar
            </Button>

            <Button color="danger" onClick={() => this.setState({modal_desaprobar_propuesta_abierto: false})} className="boton-cancelar">
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Container fluid className="container-unidades-de-medida">
        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_desaprobar_propuesta}
          
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={objetivos_especificos} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Detalle de Propuesta de POA</h1>
            <h2>{this.state.area.nombre} - {this.state.area.descripcion}</h2>
            <h3>{this.state.periodo}</h3>
            <a target="_blank" href={`http://sicmb.herokuapp.com/api/propuestas_plan_operativo_anual/obtener_poa_propuesta/${this.props.match.params.id}`}>
              <Button color="info" style={{fontWeight: "normal", marginBottom: "5px"}}>    
                <i className="iconos fa fa-eye" aria-hidden="true"></i>  Ver consolidado
              </Button>                        
            </a>
          </Col>
        </Row>

        <Row>
            {this.state.objetivos_especificos.length > 0 ? 
              <Col xs={12}>
                {this.state.objetivos_especificos.map((objetivo, index) => {
                  return(
                    <React.Fragment key={`tabla_objetivo_especifico_id_${objetivo.id}`}>
                      <p><b>Objetivo específico</b>: {objetivo.id} - {objetivo.objetivo}</p>
                      <Table striped >
                        <thead>
                          <tr>
                            <th colspan="4" scope="colgroup"></th>                  
                            <th colspan="4" scope="colgroup" className="text-center">Programación Física Trimestral</th>
                            <th colspan="1" scope="colgroup" align="center"></th>
                          </tr>
                          <tr>
                            <th>ID</th>
                            <th>Acción Recurrente</th>
                            <th className="text-center">Unidad de Medida</th>
                            <th className="text-center">Meta Física Anual</th>
                            <th className="text-center">I</th>
                            <th className="text-center">II</th>
                            <th className="text-center">III</th>
                            <th className="text-center">IV</th>
                            <th className="text-center">Medio de Verificación</th>
                          </tr>
                        </thead>
                        <tbody>
                          {objetivo.acciones_recurrentes.length > 0 ? 
                            objetivo.acciones_recurrentes.map((accion, index) => {
                              return(
                                <tr>
                                  <td>{accion.id}</td>
                                  <td>{accion.accion_recurrente}</td>
                                  <td className="text-center">{accion.unidad_de_medida.nombre}</td>
                                  <td className="text-center">{accion.meta_fisica_anual}</td>
                                  <td className="text-center">{accion.programacion_primer_trimestre}</td>
                                  <td className="text-center">{accion.programacion_segundo_trimestre}</td>
                                  <td className="text-center">{accion.programacion_tercer_trimestre}</td>
                                  <td className="text-center">{accion.programacion_cuarto_trimestre}</td>
                                  <td className="text-center">{accion.medio_de_verificacion.nombre}</td>
                                </tr>
                              ) 
                            })
                            : 
                            <tr>
                              <td colSpan="9" className="text-center"><h4>Este objetivo específico no tiene ninguna acción recurrente asociada</h4></td>
                            </tr>
                          }
                        </tbody>
                      </Table>

                      <hr className="separador-objetivos-especificos"/>
                    </React.Fragment>
                  )
                })}
                
              </Col>
              :
              <Col xs={12} className="text-center">
                <h2>Esta dirección no ha creado ningún Objetivo Específico aún.</h2>
              </Col>
            }
        </Row>

        <Row className="footer-detalle-poa">
          <Col className="text-center" xs={12} sm={12} md={6} lg={6} >
            <Button 
                color="danger" className="boton-ver"
                onClick={() => this.setState({modal_desaprobar_propuesta_abierto: true})}
                disabled={!this.state.aprobada}
            >
              Desaprobar propuesta
            </Button>
          </Col>

          <Col className="text-center" xs={12} sm={12} md={6} lg={6} >
            <Button 
              color="info" className="boton-ver"
              onClick={this.aprobarPropuesta}
              disabled={this.state.aprobada}
            >
              Aprobar propuesta
            </Button>
          </Col>

        </Row>
      </Container>
    )
  }
}
