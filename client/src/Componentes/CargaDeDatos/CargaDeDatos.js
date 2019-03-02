import React, { Component } from 'react'
import carga_de_datos from '../../assets/img/carga_de_datos.png';
import withContext from './../../Contenedor/withContext';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Form, Label } from 'reactstrap';
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
      unidades_de_medida_ar: false,
      unidades_de_medida_prod: false,
      medios_de_verificacion: false,
      productos: false,
      mensaje_partidas: undefined,
      mensaje_genericas: undefined,
      mensaje_especificas: undefined,
      mensaje_subespecificas:undefined,
      mensaje_unidades_de_medida_ar: undefined,
      mensaje_unidades_de_medida_prod: undefined
    };
    this.cargarDatos = this.cargarDatos.bind(this);
    this.verificarCargaDeDatos = this.verificarCargaDeDatos.bind(this);
    this.cargarPartidas = this.cargarPartidas.bind(this);
    this.cargarGenericas = this.cargarGenericas.bind(this);
    this.cargarEspecificas = this.cargarEspecificas.bind(this);
    this.cargarSubespecificas = this.cargarSubespecificas.bind(this);
    this.cargarUnidadesDeMedidaAR = this.cargarUnidadesDeMedidaAR.bind(this);
    this.cargarUnidadesDeMedidaProd = this.cargarUnidadesDeMedidaProd.bind(this);
    this.cargarMediosDeVerificacion = this.cargarMediosDeVerificacion.bind(this);
    this.cargarProductos = this.cargarProductos.bind(this);
  }

  componentDidMount(){
    document.title = "SIGPRES CMB -Carga de Datos";
  }

  async cargarProductos() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/productos/cargar_productos', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_productos: "Productos cargados exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_partidas: "Error al cargar información de los productos.", modal_cargar_datos_abierto: false});
    }
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

  async cargarUnidadesDeMedidaAR() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/unidades_de_medida/cargar_unidades_de_medida_ar', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_unidades_de_medida_ar: "Información de unidades de medida para acciones recurrentes cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_unidades_de_medida_ar: "Error al cargar información de unidades de medida para acciones recurrentes", modal_cargar_datos_abierto: false});
    }
  }

  async cargarUnidadesDeMedidaProd() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/unidades_de_medida/cargar_unidades_de_medida_prod', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_unidades_de_medida_prod: "Información de unidades de medida para productos cargada exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_unidades_de_medida_prod: "Error al cargar información de unidades de medida para productos.", modal_cargar_datos_abierto: false});
    }
  }

  async cargarMediosDeVerificacion() {
    let form_body = new FormData();

    form_body.append('fichero', this.state.fichero);

    const request_options = {
      method: 'post',
      credentials: 'include',
      body: form_body
    };

    const cargar_informacion_request = await fetch('/api/medios_de_verificacion/cargar_medios_de_verificacion', request_options);
    const cargar_informacion_response = await cargar_informacion_request.json();

    if(cargar_informacion_response !== "err"){
      this.setState({modal_operacion_exitosa: true, mensaje_medios_de_verificacion: "Medios de verificación cargados exitosamente.", modal_cargar_datos_abierto: false});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje_medios_de_verificacion: "Error al cargar información de los medios de verificacion.", modal_cargar_datos_abierto: false});
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

    if(!this.state.partidas && !this.state.genericas && !this.state.especificas 
      && !this.state.subespecificas && !this.state.unidades_de_medida_ar 
      && !this.state.unidades_de_medida_prod && !this.state.medios_de_verificacion 
      && !this.state.productos){
      formulario_valido = false;
      document.getElementById("error-tipo-carga").style.display = "block";
    }
    else{
      document.getElementById("error-tipo-carga").style.display = "none";
    }

    if((this.state.partidas || this.state.genericas || this.state.especificas || this.state.subespecificas) && (this.state.unidades_de_medida_ar || this.state.unidades_de_medida_prod)){
      formulario_valido = false;
      document.getElementById("error-grupo").style.display = "block";
    }
    else{
      document.getElementById("error-grupo").style.display = "none";
    }

    return formulario_valido;
  }

  async cargarDatos(){
    if(this.verificarCargaDeDatos()){
      if(this.state.productos){
        await this.cargarProductos();
      }
      
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

      if(this.state.unidades_de_medida_ar){
        await this.cargarUnidadesDeMedidaAR();
      }

      if(this.state.unidades_de_medida_prod){
        await this.cargarUnidadesDeMedidaProd();
      }

      if(this.state.medios_de_verificacion){
        await this.cargarMediosDeVerificacion();
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
          <p>
            <h4>Mensaje:</h4> <br/>

            <h5>Partidas presupuestarias</h5>
            <b>Partidas presupuestarias</b>: {this.state.mensaje_partidas} <br/> 
            <b>Específicas</b>: {this.state.mensaje_subespecificas} <br/> 
            <b>Genéricas</b>: {this.state.mensaje_genericas} <br/> 
            <b>Específicas</b>: {this.state.mensaje_especificas}  <br/>

            <h5>Unidades de medida</h5>
            <b>Unidades de medida para acciones recurrentes</b>: {this.state.mensaje_unidades_de_medida_ar} <br/> 
            <b>Unidades de medida para productos</b>: {this.state.mensaje_unidades_de_medida_prod}  <br/>

            <h5>Medios de verificación</h5>
            <b>Medios de verificación para acciones recurrentes</b>: {this.state.mensaje_medios_de_verificacion}  <br/>

            <h5>Productos</h5>
            <b>Productos</b>: {this.state.mensaje_productos}  <br/>
          </p>
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
          <p>
            <h4>Mensaje:</h4> <br/>

            <h5>Partidas presupuestarias</h5>
            <b>Partidas presupuestarias</b>: {this.state.mensaje_partidas} <br/> 
            <b>Específicas</b>: {this.state.mensaje_subespecificas} <br/> 
            <b>Genéricas</b>: {this.state.mensaje_genericas} <br/> 
            <b>Específicas</b>: {this.state.mensaje_especificas}  <br/>

            <h5>Unidades de medida</h5>
            <b>Unidades de medida para acciones recurrentes</b>: {this.state.mensaje_unidades_de_medida_ar} <br/> 
            <b>Unidades de medida para productos</b>: {this.state.mensaje_unidades_de_medida_prod}  <br/>

            <h5>Medios de verificación</h5>
            <b>Medios de verificación para acciones recurrentes</b>: {this.state.mensaje_medios_de_verificacion}  <br/>

            <h5>Productos</h5>
            <b>Productos</b>: {this.state.mensaje_productos}  <br/>
          </p>
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

                <Col xs={12} sm={12} md={12} lg={12}>
                  <h5>Partidas presupuestarias: </h5>
                </Col>
                
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.partidas}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          partidas: e.target.checked,
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          medios_de_verificacion: false,
                          productos: false,
                        })
                      }/>{' '}
                    Partidas presupuestarias
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.genericas}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          genericas: e.target.checked,
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          medios_de_verificacion: false,
                          productos: false,
                        })
                      }/>{' '}
                    Genéricas
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input 
                      checked={this.state.especificas}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          especificas: e.target.checked,
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          medios_de_verificacion: false,
                          productos: false,
                        })
                      }/>{' '}
                    Específicas
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                  <Label check>
                    <Input 
                      checked={this.state.subespecificas}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          subespecificas: e.target.checked,
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          medios_de_verificacion: false,
                          productos: false,
                        })
                      }/>{' '}
                      Subespecíficas
                  </Label>
                </Col>

                <hr/>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <h5>Unidades de medida: </h5>
                </Col>
                
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.unidades_de_medida_ar}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          unidades_de_medida_ar: e.target.checked,
                          partidas: false,
                          genericas: false,
                          especificas: false,
                          subespecificas: false,
                          productos: false,
                          medios_de_verificacion: false,
                        })
                      }/>{' '}
                    Unidades de medida para acciones recurrentes
                  </Label>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.unidades_de_medida_prod}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          unidades_de_medida_prod: e.target.checked,
                          partidas: false,
                          genericas: false,
                          especificas: false,
                          subespecificas: false,
                          productos: false,
                          medios_de_verificacion: false,
                        })
                      }/>{' '}
                    Unidades de medida para productos
                  </Label>
                </Col>

                <hr/>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <h5>Medios de verificación: </h5>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.medios_de_verificacion}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          partidas: false,
                          genericas: false,
                          especificas: false,
                          subespecificas: false,
                          productos: false,
                          medios_de_verificacion: e.target.checked,
                        })
                      }/>{' '}
                    Medios de verificación de las acciones recurrentes
                  </Label>
                </Col>

                <hr/>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <h5>Productos: </h5>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label check>
                    <Input 
                      checked={this.state.productos}
                      type="checkbox" 
                      onChange={(e) => 
                        this.setState({
                          unidades_de_medida_ar: false,
                          unidades_de_medida_prod: false,
                          partidas: false,
                          genericas: false,
                          especificas: false,
                          subespecificas: false,
                          productos: e.target.checked,
                          medios_de_verificacion: false,
                        })
                      }/>{' '}
                    Productos
                  </Label>
                </Col>
                
                
                <Col>
                  <span className="error-carga-de-datos" id="error-tipo-carga">Debe seleccionar al menos una opción de la lista.</span>
                </Col>
                
                <Col>
                  <span className="error-carga-de-datos" id="error-grupo" >No puede seleccionar opciones de grupos distintos al mismo tiempo.</span>
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
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion`)} >Administración</BreadcrumbItem>
            <BreadcrumbItem active >Carga de Datos</BreadcrumbItem>    
        
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_operacion_exitosa}
        {modal_operacion_fallida}
        {modal_cargar_datos_abierto}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={carga_de_datos} className="icono-titulo"/>    
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
            <h3>Instrucciones</h3>
            <ol>
              <li>Descargue el formato de carga de datos que desea utilizar:</li>

              <ul>
                <li><a href="https://res.cloudinary.com/sicmbdev/raw/upload/v1542745552/Formatos%20carga%20de%20datos/partidas_presupuestarias.xlsx" target="_BLANK">Partidas presupuestarias</a></li>
                <li><a href="https://res.cloudinary.com/sicmbdev/raw/upload/v1542745550/Formatos%20carga%20de%20datos/unidades_de_medida.xlsx" target="_BLANK">Unidades de medida</a></li>
                <li><a href="https://res.cloudinary.com/sicmbdev/raw/upload/v1542745551/Formatos%20carga%20de%20datos/medios_de_verificacion.xlsx" target="_BLANK">Medios de verificación</a></li>
                <li><a href="https://res.cloudinary.com/sicmbdev/raw/upload/v1543439708/Formatos%20carga%20de%20datos/productos.xlsx" target="_BLANK">Productos</a></li>
              </ul>

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
