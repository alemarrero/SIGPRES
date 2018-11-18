import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import areas from '../../assets/img/areas.png';
import withContext from './../../Contenedor/withContext';
import "./CargaDeDatos.css";

export default class CargaDeDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal_cargar_datos_abierto: false,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      fichero: undefined,
      partidas: false,
      genericas: false,
      especificas: false,
      subespecificas: false,
      mensaje_partidas: undefined,
      mensaje_genericas: undefined,
      mensaje_especificas: undefined,
      mensaje_subespecificas:undefined
    };
    this.cargarDatos = this.cargarDatos.bind(this);
    this.verificarCargaDeDatos = this.verificarCargaDeDatos.bind(this);
    this.cargarPartidas = this.cargarPartidas.bind(this);
    this.cargarGenericas = this.cargarGenericas.bind(this);
    this.cargarEspecificas = this.cargarEspecificas.bind(this);
    this.cargarSubespecificas = this.cargarSubespecificas.bind(this);

  }

  componentDidMount(){
    document.title = "SICMB - Carga de Datos";
  }

  async cargarPartidas() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/partidas_presupuestarias/cargar_partidas', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_partidas: "Información de partidas presupuestarias cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_partidas: "Error al cargar información de las partidas presupuestarias.", modal_cargar_datos_abierto: false});
    }
  }

  async cargarGenericas() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/partidas_presupuestarias/cargar_genericas', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_genericas: "Información de genericas cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_genericas: "Error al cargar información de las genericas.", modal_cargar_datos_abierto: false});
    }
  }

  async cargarEspecificas() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/partidas_presupuestarias/cargar_especificas', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_especificas: "Información de especificas cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_especificas: "Error al cargar información de las especificas.", modal_cargar_datos_abierto: false});
    }
  }

  async cargarSubespecificas() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/partidas_presupuestarias/cargar_subespecificas', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_subespecificas: "Información de subespecificas cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_subespecificas: "Error al cargar información de las subespecificas.", modal_cargar_datos_abierto: false});
    }
  }


  verificarCargaDeDatos(){
    let formulario_valido = true;

    if(this.state.fichero === undefined){
      formulario_valido = false;
      document.getElementById("fichero-error").style.display = "block";
    }
    else{
      document.getElementById("fichero-error").style.display = "none";
    }

    if(!this.state.partidas && !this.state.genericas && !this.state.especificas && !this.state.subespecificas ){
      formulario_valido = false;
      document.getElementById("error-tipo-carga").style.display = "block";
    }
    else{
      document.getElementById("error-tipo-carga").style.display = "none";
    }

    return formulario_valido;
  }

  async cargarDatos(){
    if(this.verificarCargaDeDatos()){
      if(this.state.partidas){
        await this.cargarPartidas();
      }

      if(this.state.genericas){
        await this.cargarGenericas();
      }

      if(this.state.especificas){
        await this.cargarEspecificas();
      }

      if(this.state.subespecificas){
        await this.cargarSubespecificas();
      }
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
          <p>Mensaje: {this.state.mensaje_partidas} <br/> {this.state.mensaje_subespecificas} <br/> {this.state.mensaje_genericas} <br/> {this.state.mensaje_especificas} </p>
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
          <p>Mensaje: {this.state.mensaje_partidas} <br/> {this.state.mensaje_subespecificas} <br/> {this.state.mensaje_genericas} <br/> {this.state.mensaje_especificas} </p>
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

    let modal_cargar_datos_abierto = 
      <Modal isOpen={this.state.modal_cargar_datos_abierto} toggle={() => this.setState({modal_cargar_datos_abierto: !this.state.modal_cargar_datos_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_cargar_datos_abierto: !this.state.modal_cargar_datos_abierto})}>
          Cargar datos
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12}>
                <Label>Archivo:</Label>
                <Input type="file" onChange={(e) => this.setState({fichero: e.target.files[0]})}/>
                <span className="error-carga-de-datos" id="fichero-error">Fichero inválido. Debe seleccionar un archivo con el formato especificado en las instrucciones.</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs={12}>
                <Label>Información a cargar y/o actualizar:</Label>
                
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({partidas: e.target.checked})}/>{' '}
                    Partidas presupuestarias
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({genericas: e.target.checked})}/>{' '}
                    Genéricas
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({especificas: e.target.checked})}/>{' '}
                    Específicas
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({subespecificas: e.target.checked})}/>{' '}
                      Subespecíficas
                  </Label>
                </Col>
                
                <Col>
                  <span className="error-carga-de-datos" id="error-tipo-carga">Debe seleccionar al menos una opción de la lista.</span>
                </Col>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={12} lg={6} className="text-center">
            <Button style={{width: "auto"}} color="success" onClick={this.cargarDatos}>Cargar datos</Button>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_cargar_datos_abierto: false})}>Cancelar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Container fluid className="container-unidades-de-medida">
        {/* Modales del componente */}
        {modal_operacion_exitosa}
        {modal_operacion_fallida}
        {modal_cargar_datos_abierto}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={areas} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Carga de Datos</h1>
          </Col>

          {/* Botón para cargar datos */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_cargar_datos_abierto: true})}>
              <i className="iconos fa fa-plus" aria-hidden="true"></i>              
              Cargar datos
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <p>Para cargar o actualizar información acerca de partidas presupuestarias, haga click en el botón "Cargar datos", seleccione su archivo y seleccione el tipo de carga de datos que desea realizar.</p>
            <h3>Instrucciones</h3>
            <ol>
              <li>Descargue el formato de carga de datos a través del siguiente <a href="#">link</a>.</li>
              <li>Coloque la información que desea actualizar en la primera hora del archivo .xls, siguiendo el formato de ejemplo. </li>
              <li>Guarde el archivo y utilice la opción "Cargar datos", seleccione el tipo de datos que desea cargar o actualizar, y haga click en el botón "Cargar datos".</li>
              <li>Espere a que la operación se realice. Una vez finalizada, debe aparecer un mensaje con el resultado de la operación.</li>
            </ol>
          </Col>
        </Row>
      </Container>
    )
  }
}
