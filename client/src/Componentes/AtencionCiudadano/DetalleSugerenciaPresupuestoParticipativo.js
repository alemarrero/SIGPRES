import React, { Component } from 'react';
import { Button, Col, Row, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export default class DetalleSugerenciaPresupuestoParticipativo extends Component {
  constructor(props){
    super(props);
    this.state = {
      nombre: undefined,
      telefono: undefined,
      email: undefined,
      parroquia: undefined,
      sector: undefined,
      organizacion: undefined,
      vision_comunidad: undefined,
      nombre_propuesta: undefined,
      ubicacion_propuesta: undefined,
      descripcion_propuesta: undefined,
      beneficiarios_directos: undefined,
      beneficiarios_indirectos: undefined,
      presentada_anteriormente: false,
      año_presentacion: undefined,
      solicito_recursos_anteriormente: false,
      gobierno_nacional: false,
      gobernacion_miranda: false,
      alcaldia_baruta: false,
      fundacomunal: false,
      mincomunas: false,
      otro_proveedor: false,
      otros_proveedores: undefined,
      nombre_responsable: undefined,
      email_responsable: undefined,
      telefono_responsable: undefined,
      fichero: undefined,
      comentarios: undefined,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerInformacion = this.obtenerInformacion.bind(this);
    this.eliminarSugerencia = this.eliminarSugerencia.bind(this);
  }

  async eliminarSugerencia(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: parseInt(this.props.match.params.id)
      })
    }

    const eliminar_sugerencia_request = await fetch('/api/presupuesto_participativo/eliminar_sugerencia', request_options);
    const eliminar_sugerencia_response = await eliminar_sugerencia_request.json();

    if(eliminar_sugerencia_response !== "err"){
      this.setState({
        modal_operacion_exitosa: true,
        mensaje: "Sugerencia eliminada exitosamente"
      }, async () => {
        this.obtenerSugerenciasPresupuestoParticipativo();
      });
    }
    else{
      this.setState({
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar la sugerencia"
      });
    }
  }

  async componentDidMount(){
    this.obtenerInformacion();
  }

  async obtenerInformacion(){
    const request_options = {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        id: parseInt(this.props.match.params.id)
      }),
      headers: {"content-type": "application/json"}
    };

    const informacion_sugerencia_request = await fetch('/api/presupuesto_participativo/obtener_sugerencia_presupuesto_participativo', request_options);
    const informacion_sugerencia_response = await informacion_sugerencia_request.json();

    if(informacion_sugerencia_response !== "err"){
      this.setState({...informacion_sugerencia_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la información de la sugerencia de presupuesto participativo"});
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

    // Modal de confirmación que se muestra antes de borrar una sugerencia
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar sugerencia
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar la sugerencia?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cerrar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarSugerencia()}>Eliminar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <React.Fragment>
        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_confirmacion}
        <Row className="justify-content-center">
          <Col  xs={12} sm={12} md={7} lg={7}>
            <Form id="formulario-sugerencias-presupuesto-participativo">
              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                  <h2>{this.state.nombre_propuesta}</h2>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>Información básica</h4>
                </Col>
              </FormGroup>
              
              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="nombre">Nombre y apellido*</Label>
                  <p>{this.state.nombre}</p>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <p>{this.state.telefono}</p>
                </Col>
              </FormGroup>

              <FormGroup row>              
                {/* Correo electrónico del usuario */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico*</Label>
                  <p>{this.state.email}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>Información de la comunidad</h4>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Parroquia*</Label>
                  <p>{this.state.parroquia}</p>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Sector*</Label>
                  <p>{this.state.sector}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Organización*</Label>
                  <p>{this.state.organizacion}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Visión de la comunidad*</Label>
                  <p>{this.state.vision_comunidad}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>Información de la propuesta</h4>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Nombre de la propuesta*</Label>
                  <p>{this.state.nombre_propuesta}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Ubicación de la propuesta*</Label>
                  <p>{this.state.ubicacion_propuesta}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Descripción de la propuesta*</Label>
                  <p>{this.state.descripcion_propuesta}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de beneficiarios directos de la propuesta*</Label>
                  <p>{this.state.beneficiarios_directos}</p>
                </Col>
                
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de beneficiarios indirectos de la propuesta*</Label>
                  <p>{this.state.beneficiarios_indirectos}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label check>
                    <Input checked={this.state.presentada_anteriormente} type="checkbox" />
                    ¿Esta propuesta fue presentada anteriormente?
                  </Label>
                </Col>

                {this.state.presentada_anteriormente && 
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Label>Año de presentación de la propuesta*</Label>
                    <p>{this.state.año_presentacion}</p>
                  </Col>
                }
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input checked={this.state.solicito_recursos_anteriormente} type="checkbox"  />
                    ¿Ha solicitado recursos anteriormente para esta solicitud?
                  </Label>
                </Col>
                {this.state.solicito_recursos_anteriormente && 
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Label>Recursos solicitados a: </Label>
                    <p>{this.state.solicito_recursos_a}</p>
                  </Col>
                }
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>Información básica del responsable de la propuesta</h4>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Nombre y apellido del responsable*</Label>
                  <p>{this.state.nombre_responsable}</p>
                </Col>
                
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico del responsable*</Label>
                  <p>{this.state.email_responsable}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de teléfono del responsable*</Label>
                  <p>{this.state.telefono_responsable}</p>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Documento que respalda la propuesta*</Label>
                  <p><a href={this.state.enlace} target="_blank">Haga click para abrir el documento</a></p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Comentarios adicionales</Label>
                  <p>{this.state.comentarios}</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button onClick={() => this.setState({modal_confirmacion_abierto: true})} color="danger">Eliminar sugerencia</Button>
                </Col>
                
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button onClick={() => this.props.history.push('/inicio/oac/presupuesto-participativo')} color="success" style={{fontWeight: "bold"}}>Volver</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
