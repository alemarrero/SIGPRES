import React, { Component } from 'react';
import queja from '../../assets/img/queja.png';
import { Button, Col, Row, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export default class Quejas extends Component {
  constructor(props){
    super(props);
    this.state = {
      nombre: undefined,
      apellido: undefined,
      tipo_cedula: "V",
      numero_cedula: undefined,
      descripcion: undefined,
      email: undefined,
      telefono: undefined,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      identificador: undefined
    };
    this.enviarQueja = this.enviarQueja.bind(this);
    this.obtenerFecha = this.obtenerFecha.bind(this);
    this.validarCampos = this.validarCampos.bind(this);
    this.email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  async enviarQueja(e){
    e.preventDefault();
    if(this.validarCampos()){
      const body = JSON.stringify({
        fecha: this.obtenerFecha(),
        nombre: this.state.nombre,
        apellido: this.state.apellido, 
        cedula: `${this.state.tipo_cedula}-${this.state.numero_cedula}`,
        descripcion: this.state.descripcion, 
        direccion: this.state.direccion,
        email: this.state.email, 
        telefono: this.state.telefono 
      });

      const request_options = {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: body
      };

      const queja_request = await fetch('/api/quejas/crear_queja', request_options);
      const queja_response = await queja_request.json();

      if(queja_response.estado === "ok"){
        this.setState({
          modal_operacion_exitosa: true,
          identificador: queja_response.identificador
        }, () => {
          document.getElementById("formulario-quejas").reset();
        });
      }
      else{
        this.setState({
          modal_operacion_fallida: true
        });
      }
    }
  }

  obtenerFecha(){
    const fecha = new Date();

    const meses = {"01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio", 
      "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"
    };

    const _fecha = fecha.toISOString().split("-");
    const _dia = _fecha[2].split("T")[0];

    return `${_dia} de ${meses[_fecha[1]]} del ${_fecha[0]}`;
  }

  validarCampos() {
    let formulario_valido = true;

    // Validación del nombre
    if(this.state.nombre === undefined || !this.state.nombre.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("campo-nombre").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-nombre").style.display = 'none';
    }

    // Validación del apellido
    if(this.state.apellido === undefined || !this.state.apellido.match(/^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/)){
      document.getElementById("campo-apellido").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-apellido").style.display = 'none';
    }

    // Validación del tipo de cédula
    if(this.state.tipo_cedula === undefined){
      document.getElementById("campo-cedula").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-cedula").style.display = 'none';
    }
    
    // Validación del número de cédula
    if(this.state.numero_cedula === undefined || !this.state.numero_cedula.match(/^[0-9]+$/)){
      document.getElementById("campo-cedula").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-cedula").style.display = 'none';
    }

    // Validación de la dirección de Correo electrónico del usuario
    if(!this.email_regex.test(this.state.email)){
      document.getElementById("campo-email").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-email").style.display = 'none';
    }

    // Validación de la dirección del usuario
    if(this.state.direccion === undefined){
      document.getElementById("campo-direccion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-direccion").style.display = 'none';
    }

    // Validación del número de teléfono
    if(this.state.telefono === undefined || !this.state.telefono.match(/^[0-9]{7,11}$/)){
      document.getElementById("campo-telefono").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-telefono").style.display = 'none';
    }

    // Validación de la descripción de la queja
    if(this.state.descripcion === undefined){
      document.getElementById("campo-descripcion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-descripcion").style.display = 'none';
    }

    return formulario_valido;
  }

  render() {
    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_operacion_fallida = 
      <Modal isOpen={this.state.modal_operacion_fallida} toggle={() => this.setState({modal_operacion_fallida: !this.state.modal_operacion_fallida})}>
        <ModalHeader toggle={() => this.setState({modal_operacion_fallida: !this.state.modal_operacion_fallida})}>
          Error al enviar la queja
        </ModalHeader>

        <ModalBody>
          <p>Ha ocurrido al enviar su queja, por favor intente nuevamente más tarde. <br/> Si el problema persiste, póngase en contacto con un administrador a través de sicmb_dev@gmail.com</p>
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
          Queja enviada exitosamente
        </ModalHeader>
        <ModalBody>
          <p>Su queja se ha enviado exitosamente. Identificador de la queja: <br/>
            <center><b>{this.state.identificador}</b></center>
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

    return (
      <React.Fragment >
        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={queja} className="icono-titulo"/>    
            <h1>Quejas</h1>
          </Col>
        </Row>
        <hr/>
        <Row className="justify-content-center">
          <Col className="text-center">
            <h4>Llena el siguiente formulario para enviar una queja</h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col  xs={12} sm={12} md={7} lg={7}>
            <Form id="formulario-quejas" onSubmit={this.enviarQueja}>
              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="nombre">Nombre*</Label>
                  <Input name="nombre" onChange={(e) => this.setState({nombre: e.target.value})}/>
                  <span id="campo-nombre" className="error-usuarios">Nombre inválido, ingrese únicamente letras y espacios</span>                              
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="apellido">Apellido*</Label>
                  <Input name="apellido" onChange={(e) => this.setState({apellido: e.target.value})}/>
                  <span id="campo-apellido" className="error-usuarios">Apellido inválido, ingrese únicamente letras y espacios</span>                              
                </Col>
              </FormGroup>

              <FormGroup row>              
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label className="form-cedula">Número de cédula*</Label>
                  <Input 
                    type="select"
                    onChange={(e) => this.setState({tipo_cedula: e.target.value})}
                    className="tipo-cedula"
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                  </Input>
                  <Input
                    onChange={(e) => this.setState({numero_cedula: e.target.value})}
                    className="numero-cedula"
                  />
                  <span id="campo-cedula" className="error-usuarios">Número de cédula inválido, seleccione un tipo de cédula y utilice únicamente números</span>                
                </Col>

                {/* Correo electrónico del usuario */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico*</Label>
                  <Input
                    onChange={(e) => this.setState({email: e.target.value})}
                  />
                  <span id="campo-email" className="error-usuarios">Correo electrónico inválido, ingrese un email de la forma nombre@dominio.com</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Dirección*</Label>
                  <Input
                    onChange={(e) => this.setState({direccion: e.target.value})}
                  />
                  <span id="campo-direccion" className="error-usuarios">Dirección inválida, este campo no puede estar vacío</span>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Teléfono de contacto*</Label>
                  <Input
                    onChange={(e) => this.setState({telefono: e.target.value})}
                  />
                  <span id="campo-telefono" className="error-usuarios">Número de teléfono inválido, ingrese entre 7 y 11 caracteres, utilice únicamente números sin espacios ni símbolos</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Descripción de la queja*</Label>
                  <Input type="textarea" onChange={(e) => this.setState({descripcion: e.target.value})} />
                  <span id="campo-descripcion" className="error-usuarios">Descripción de la queja inválida, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button type="submit" color="success">Enviar queja</Button>
                </Col>
                
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button type="reset" color="danger" style={{fontWeight: "bold"}}>Limpiar campos</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
