import React, { Component } from 'react';
import presupuesto_participativo from '../../assets/img/presupuesto_participativo.png';
import { Button, Col, Row, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import './PresupuestoParticipativo.css';


export default class Sugerencias extends Component {
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
    this.enviarSugerencia = this.enviarSugerencia.bind(this);
    this.obtenerFecha = this.obtenerFecha.bind(this);
    this.validarCampos = this.validarCampos.bind(this);
    this.obtenerProveedores = this.obtenerProveedores.bind(this);
    this.email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.string_regex = /^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/;
    this.telefono_regex = /^[0-9]{7,11}$/;
  }

  obtenerProveedores(){
    let proveedores = "";

    if(this.state.solicito_recursos_anteriormente){
      if(this.state.gobierno_nacional){
        if(proveedores === ""){
          proveedores = "Gobierno Nacional"
        }
        else{
          proveedores = proveedores + ", Gobierno Nacional"
        }
      }

      if(this.state.gobernacion_miranda){
        if(proveedores === ""){
          proveedores = "Gobernación de Miranda"
        }
        else{
          proveedores = proveedores + ", Gobernación de Miranda"
        }
      }

      if(this.state.alcaldia_baruta){
        if(proveedores === ""){
          proveedores = "Alcaldía de Baruta"
        }
        else{
          proveedores = proveedores + ", Alcaldía de Baruta"
        }
      }

      if(this.state.fundacomunal){
        if(proveedores === ""){
          proveedores = "FUNDACOMUNAL"
        }
        else{
          proveedores = proveedores + ", FUNDACOMUNAL"
        }
      }

      if(this.state.mincomunas){
        if(proveedores === ""){
          proveedores = "MINCOMUNAS"
        }
        else{
          proveedores = proveedores + ", MINCOMUNAS"
        }
      }

      if(this.state.otro_proveedor){
        if(proveedores === ""){
          proveedores = this.state.otros_proveedores;
        }
        else{
          proveedores = proveedores + `, ${this.state.otros_proveedores}`
        }
      }
    }
    else{
      return undefined;
    }

    return proveedores;
  }

  async enviarSugerencia(e){
    e.preventDefault();
    if(this.validarCampos()){
      const body = new FormData();

      body.append("fecha", this.obtenerFecha());
      body.append("parroquia", this.state.parroquia);
      body.append("sector", this.state.sector);
      body.append("organizacion", this.state.organizacion);
      body.append("nombre", this.state.nombre);
      body.append("telefono", this.state.telefono);
      body.append("email", this.state.email);
      body.append("vision_comunidad", this.state.vision_comunidad);
      body.append("nombre_propuesta", this.state.nombre_propuesta);
      body.append("ubicacion_propuesta", this.state.ubicacion_propuesta);
      body.append("descripcion_propuesta", this.state.descripcion_propuesta);
      body.append("beneficiarios_directos", this.state.beneficiarios_directos);
      body.append("beneficiarios_indirectos", this.state.beneficiarios_indirectos);
      body.append("presentada_anteriormente", this.state.presentada_anteriormente);
      body.append("año_presentacion", this.state.año_presentacion);
      body.append("solicito_recursos_anteriormente", this.state.solicito_recursos_anteriormente);
      body.append("solicito_recursos_a", this.obtenerProveedores());
      body.append("nombre_responsable", this.state.nombre_responsable);
      body.append("telefono_responsable", this.state.telefono_responsable);
      body.append("email_responsable", this.state.email_responsable);
      body.append("fichero", this.state.fichero);
      body.append("enlace", this.state.enlace);
      body.append("identificador", this.state.identificador);
      body.append("comentarios", this.state.comentarios);

      const request_options = {
        method: "POST",
        credentials: "include",
        body: body
      };

      const sugerencia_request = await fetch('/api/presupuesto_participativo/crear_sugerencia_presupuesto_participativo', request_options);
      const sugerencia_response = await sugerencia_request.json();

      if(sugerencia_response.estado === "ok"){
        this.setState({
          modal_operacion_exitosa: true,
          identificador: sugerencia_response.identificador
        }, () => {
          document.getElementById("formulario-sugerencias-presupuesto-participativo").reset();
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

    if(this.state.nombre === undefined || !this.state.nombre.match(this.string_regex)){
      document.getElementById("campo-nombre").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-nombre").style.display = 'none';
    }

    if(this.state.telefono === undefined || !this.state.telefono.match(/^[0-9]{7,11}$/)){
      document.getElementById("campo-telefono").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-telefono").style.display = 'none';
    }

    if(!this.email_regex.test(this.state.email)){
      document.getElementById("campo-email").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-email").style.display = 'none';
    }

    if(this.state.parroquia === undefined){
      document.getElementById("campo-parroquia").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-parroquia").style.display = 'none';
    }

    if(this.state.sector === undefined){
      document.getElementById("campo-sector").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-sector").style.display = 'none';
    }

    if(this.state.organizacion === undefined){
      document.getElementById("campo-organizacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-organizacion").style.display = 'none';
    }

    if(this.state.vision_comunidad === undefined){
      document.getElementById("campo-vision-comunidad").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-vision-comunidad").style.display = 'none';
    }

    if(this.state.nombre_propuesta === undefined){
      document.getElementById("campo-nombre-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-nombre-propuesta").style.display = 'none';
    }

    if(this.state.ubicacion_propuesta === undefined){
      document.getElementById("campo-ubicacion-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-ubicacion-propuesta").style.display = 'none';
    }

    if(this.state.descripcion_propuesta === undefined){
      document.getElementById("campo-descripcion-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-descripcion-propuesta").style.display = 'none';
    }

    if(this.state.beneficiarios_directos === undefined || !this.state.beneficiarios_directos.match(/^[0-9]+$/)){
      document.getElementById("campo-beneficiarios-directos-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-beneficiarios-directos-propuesta").style.display = 'none';
    }

    if(this.state.beneficiarios_indirectos === undefined || !this.state.beneficiarios_indirectos.match(/^[0-9]+$/)){
      document.getElementById("campo-beneficiarios-indirectos-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-beneficiarios-indirectos-propuesta").style.display = 'none';
    }

    if(this.state.presentada_anteriormente && (this.state.año_presentacion === undefined || !this.state.año_presentacion.match(/^[0-9]{4}$/))){
      document.getElementById("campo-año-presentacion-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else if(this.state.presentada_anteriormente){
      document.getElementById("campo-año-presentacion-propuesta").style.display = 'none';
    }

    if(this.state.solicito_recursos_anteriormente && (!this.state.gobierno_nacional && !this.state.gobernacion_miranda && !this.state.alcaldia_baruta &&
      !this.state.fundacomunal && !this.state.mincomunas)){
      document.getElementById("campo-solicito-recursos-anteriormente-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else if(this.state.solicito_recursos_anteriormente){
      document.getElementById("campo-solicito-recursos-anteriormente-propuesta").style.display = 'none';
    }

    if(this.state.solicito_recursos_anteriormente && this.state.otro_proveedor && (this.state.otros_proveedores === undefined || this.state.otros_proveedores === '' )){
      document.getElementById("campo-solicito-recursos-anteriormente-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else if(this.state.solicito_recursos_anteriormente && this.state.otro_proveedor){
      document.getElementById("campo-solicito-recursos-anteriormente-propuesta").style.display = 'none';
    }

    if(this.state.nombre_responsable === undefined || !this.state.nombre_responsable.match(this.string_regex)){
      document.getElementById("campo-nombre-responsable-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-nombre-responsable-propuesta").style.display = 'none';
    }

    if(!this.email_regex.test(this.state.email_responsable)){
      document.getElementById("campo-email-responsable-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-email-responsable-propuesta").style.display = 'none';
    }

    if(this.state.telefono_responsable === undefined || !this.state.telefono_responsable.match(/^[0-9]{7,11}$/)){
      document.getElementById("campo-telefono-responsable-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-telefono-responsable-propuesta").style.display = 'none';
    }

    if(this.state.fichero === undefined){
      document.getElementById("campo-fichero-propuesta").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("campo-fichero-propuesta").style.display = 'none';
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
          Sugerencia enviada exitosamente
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
            <img src={presupuesto_participativo} className="icono-titulo"/>    
            <h1>Presupuesto Participativo</h1>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Col className="text-center" xs={12}>
              <h2>Base Constitucional</h2>          
            </Col>
            <p>Todos los ciudadanos(as) tienen el derecho de participar en los asuntos públicos, directamente o por medio de sus representantes electos. Esta participación en la formulación, ejecución y control de las políticas públicas, es el medio para garantizar el desarrollo tanto individual o colectivo del pueblo. (Art. 62 de la Constitución de la República Bolivariana de Venezuela).</p>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6}>
            <Col className="text-center" xs={12}>
              <h2>¿Qué es el Presupuesto Participativo?</h2>          
            </Col>
            <p>Es el resultado de la utilización de los procesos mediante los cuales los ciudadanos (as) del Municipio proponen, deliberan y deciden en la formulación, ejecución, control y evaluación del presupuesto de inversión anual municipal (Art. 268 de la Ley de Reforma Parcial del Poder Público Municipal).</p>
            <p>Para la formulación del Presupuesto Participativo se deberá contar con mecanismos de discusión amplios, debates democráticos sin exclusiones, para recoger el mayor número de opiniones y propuestas viables (Art. 35 de la Ley de Reforma Parcial de los Consejos Locales de Planificación Pública).</p>
          </Col>
          
          <Col xs={12} sm={12} md={6} lg={6}>
            <Col className="text-center" xs={12}>
              <h2>¿Por qué se debe participar?</h2>          
            </Col>
            <ul>
              <li>Para proponer proyectos que tomen en cuenta las necesidades y propuestas de las comunidades.</li>
              <li>Alcanzar proyectos que mejoren las condiciones de vida de los ciudadanos para lograr la utilización de recursos de gobiernos regionales y locales.</li>
              <li>Contribuir a lograr una mayor transparencia en la formulación y ejecución del presupuesto.</li>
            </ul>
          </Col>
          
          <Col xs={12} sm={12} md={6} lg={6}>
            <Col className="text-center" xs={12}>
              <h2>Actores involucrados</h2>          
            </Col>
            <ul>
              <li>Ejecutivo Municipal: Despacho del Alcalde, Direcciones y Servicios Autónomos.</li>
              <li>Concejo Municipal.</li>
              <li>Consejo Local de Planificación Pública y Sala Técnica.</li>
              <li>Consejos Comunales.</li>
              <li>Comunidad: Sectorial, Vecinal y Comunitarios.</li>
            </ul>
          </Col>
        </Row>
        
        <hr/>

        <Row className="justify-content-center">
          <Col className="text-center">
            <h3>Llena el siguiente formulario enviar una propuesta para el Presupuesto Participativo</h3>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col  xs={12} sm={12} md={7} lg={7}>
            <Form id="formulario-sugerencias-presupuesto-participativo" onSubmit={this.enviarSugerencia}>
              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>Información básica</h4>
                </Col>
              </FormGroup>
              
              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="nombre">Nombre y apellido*</Label>
                  <Input name="nombre" onChange={(e) => this.setState({nombre: e.target.value})}/>
                  <span id="campo-nombre" className="error-usuarios">Nombre inválido, ingrese únicamente letras y espacios</span>                              
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label htmlFor="telefono">Teléfono*</Label>
                  <Input name="telefono" onChange={(e) => this.setState({telefono: e.target.value})}/>
                  <span id="campo-telefono" className="error-usuarios">Teléfono inválido, ingrese únicamente números, sin espacios ni símbolos</span>                              
                </Col>
              </FormGroup>

              <FormGroup row>              
                {/* Correo electrónico del usuario */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico*</Label>
                  <Input
                    onChange={(e) => this.setState({email: e.target.value})}
                  />
                  <span id="campo-email" className="error-usuarios">Correo electrónico inválido, ingrese un correo electrónico de la forma nombre@dominio.com</span>
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
                  <Input
                    onChange={(e) => this.setState({parroquia: e.target.value})}
                  />
                  <span id="campo-parroquia" className="error-usuarios">Parroquia inválida, este campo no puede estar vacío</span>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Sector*</Label>
                  <Input
                    onChange={(e) => this.setState({sector: e.target.value})}
                  />
                  <span id="campo-sector" className="error-usuarios">Sector inválido, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Organización*</Label>
                  <Input onChange={(e) => this.setState({organizacion: e.target.value})} />
                  <span id="campo-organizacion" className="error-usuarios">Organización inválida, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Visión de la comunidad*</Label>
                  <Input type="textarea" onChange={(e) => this.setState({vision_comunidad: e.target.value})} />
                  <span id="campo-vision-comunidad" className="error-usuarios">Visión de la comunidad inválida, este campo no puede estar vacío</span>
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
                  <Input type="textarea" onChange={(e) => this.setState({nombre_propuesta: e.target.value})} />
                  <span id="campo-nombre-propuesta" className="error-usuarios">Nombre de la propuesta inválida, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Ubicación de la propuesta*</Label>
                  <Input type="textarea" onChange={(e) => this.setState({ubicacion_propuesta: e.target.value})} />
                  <span id="campo-ubicacion-propuesta" className="error-usuarios">Ubicación de la propuesta inválida, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Label>Descripción de la propuesta*</Label>
                  <Input type="textarea" onChange={(e) => this.setState({descripcion_propuesta: e.target.value})} />
                  <span id="campo-descripcion-propuesta" className="error-usuarios">Descripción de la propuesta inválida, este campo no puede estar vacío</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de beneficiarios directos de la propuesta*</Label>
                  <Input type="text" onChange={(e) => this.setState({beneficiarios_directos: e.target.value})} />
                  <span id="campo-beneficiarios-directos-propuesta" className="error-usuarios">Número de beneficiarios directos de la propuesta inválida, este campo no puede estar vacío. Utilice únicamente números.</span>
                </Col>
                
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de beneficiarios indirectos de la propuesta*</Label>
                  <Input type="text" onChange={(e) => this.setState({beneficiarios_indirectos: e.target.value})} />
                  <span id="campo-beneficiarios-indirectos-propuesta" className="error-usuarios">Número de beneficiarios indirectos de la propuesta inválida, este campo no puede estar vacío. Utilice únicamente números.</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({presentada_anteriormente: e.target.checked})}/> 
                    ¿Esta propuesta fue presentada anteriormente?
                  </Label>
                </Col>
                
                {this.state.presentada_anteriormente && 
                  <Col xs={12} sm={12} md={6} lg={6}>
                    <Label>Año de presentación de la propuesta*</Label>
                    <Input type="text" onChange={(e) => this.setState({año_presentacion: e.target.value})} />
                    <span id="campo-año-presentacion-propuesta" className="error-usuarios">Año de presentación de la propuesta inválido, este campo no puede estar vacío si ha marcado la opción de que la propuesta fue presentada anteriormente. Utilice únicamente números sin símbolos.</span>
                  </Col>
                }
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label check>
                    <Input type="checkbox" onChange={(e) => this.setState({solicito_recursos_anteriormente: e.target.checked})}/> 
                    ¿Ha solicitado recursos anteriormente para esta solicitud?
                  </Label>
                  <span id="campo-solicito-recursos-anteriormente-propuesta" className="error-usuarios">Si ha recibido recursos anteriormente, debe indicar de quién ha recibido los recursos. Si marcó la opción "Otros", debe llenar el campo de texto indicando los otros entes a quién ha solicitado recursos.</span>
                </Col>
                
                {this.state.solicito_recursos_anteriormente && 
                  <Col xs={12} sm={12} md={6} lg={6}>
                  
                    <Col>
                      <Label check className={this.state.gobierno_nacional ? "proveedor-seleccionado" : ""}>
                        <Input type="checkbox" onChange={(e) => this.setState({gobierno_nacional: e.target.checked})}/> 
                        Gobierno Nacional
                      </Label>
                    </Col>
                    <Col>
                      <Label check className={this.state.gobernacion_miranda ? "proveedor-seleccionado" : ""} >
                        <Input type="checkbox" onChange={(e) => this.setState({gobernacion_miranda: e.target.checked})}/> 
                        Gobernación de Miranda
                      </Label>
                    </Col>
                    <Col>
                      <Label check className={this.state.alcaldia_baruta ? "proveedor-seleccionado" : ""}>
                        <Input type="checkbox" onChange={(e) => this.setState({alcaldia_baruta: e.target.checked})}/> 
                        Alcaldía de Baruta
                      </Label>
                    </Col>
                    <Col>
                      <Label check className={this.state.fundacomunal ? "proveedor-seleccionado" : ""}>
                        <Input type="checkbox" onChange={(e) => this.setState({fundacomunal: e.target.checked})}/> 
                        FUNDACOMUNAL
                      </Label>
                    </Col>
                    <Col>
                      <Label check className={this.state.mincomunas ? "proveedor-seleccionado" : ""}>
                        <Input type="checkbox" onChange={(e) => this.setState({mincomunas: e.target.checked})}/> 
                        MINCOMUNAS
                      </Label>
                    </Col>
                    <Col>
                      <Label check className={this.state.otro_proveedor ? "proveedor-seleccionado" : ""}>
                        <Input type="checkbox" onChange={(e) => this.setState({otro_proveedor: e.target.checked})}/> 
                        Otro, indique
                      </Label>
                    </Col>

                    {this.state.otro_proveedor && 
                      <Col>
                        <Input type="text" onChange={(e) => this.setState({otros_proveedores: e.target.value})} />
                      </Col>
                    }
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
                  <Input type="text" onChange={(e) => this.setState({nombre_responsable: e.target.value})} />
                  <span id="campo-nombre-responsable-propuesta" className="error-usuarios">Nombre del responsable de la propuesta inválido, este campo no puede estar vacío. Utilice únicamente letras, sin números ni símbolos.</span>
                </Col>
                
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Correo electrónico del responsable*</Label>
                  <Input type="text" onChange={(e) => this.setState({email_responsable: e.target.value})} />
                  <span id="campo-email-responsable-propuesta" className="error-usuarios">Correo electrónico inválido, ingrese un correo electrónico de la forma nombre@dominio.com</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Número de teléfono del responsable*</Label>
                  <Input type="text" onChange={(e) => this.setState({telefono_responsable: e.target.value})} />
                  <span id="campo-telefono-responsable-propuesta" className="error-usuarios">Número de teléfono del responsable inválido, ingrese únicamente números, sin espacios ni símbolos</span>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6}>
                  <Label>Documento que respalda la propuesta*</Label>
                  <Input type="file" onChange={(e) => this.setState({fichero: e.target.files[0]})} />
                  <span id="campo-fichero-propuesta" className="error-usuarios">Debe adjuntar un documento que respalde su solicitud.</span>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label>Comentarios adicionales</Label>
                <Input type="textarea" onChange={(e) => this.setState({comentarios: e.target.value})} />
              </FormGroup>

              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={6} lg={6}>
                  <Button type="submit" color="success">Enviar sugerencia</Button>
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
