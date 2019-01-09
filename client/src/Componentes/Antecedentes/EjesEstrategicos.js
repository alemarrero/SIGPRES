import React, { Component } from 'react';
import './EjesEstrategicos.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import diagnostico from '../../assets/img/diagnostico.png';
import withContext from './../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class EjesEstrategicos extends Component {
  constructor(props){
    super(props);
    this.state = {
      antecedente: {},
      ejes_estrategicos: [],
      nombre: undefined,
      descripcion: undefined,
      modal_operacion_fallida: false,
      modal_operacion_exitosa: false,
      modal_confirmacion_abierto: false,
      modal_crear_eje_estrategico_abierto: false,
      modal_editar_eje_estrategico_abierto: false,
      mensaje: undefined,
    };
    this.obtenerAntecedente = this.obtenerAntecedente.bind(this);
    this.crearEjeEstrategico = this.crearEjeEstrategico.bind(this);
    this.editarEjeEstrategico = this.editarEjeEstrategico.bind(this);
    this.obtenerEjesEstrategicos = this.obtenerEjesEstrategicos.bind(this);
    this.validarCreacionEjesEstrategicos = this.validarCreacionEjesEstrategicos.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Ejes Estratégicos";
    this.obtenerAntecedente();
    this.obtenerEjesEstrategicos();
  }

  validarCreacionEjesEstrategicos(){
    let formulario_valido = true;

    if(this.state.nombre === undefined || this.state.nombre === ""){
      formulario_valido = false;
      document.getElementById("error-nombre").style.display = "block";
    }
    else{
      document.getElementById("error-nombre").style.display = "none";
    }

    if(this.state.descripcion === undefined || this.state.descripcion === ""){
      formulario_valido = false;
      document.getElementById("error-descripcion").style.display = "block";
    }
    else{
      document.getElementById("error-descripcion").style.display = "none";
    }

    return formulario_valido;
  }

  async crearEjeEstrategico(){
    if(this.validarCreacionEjesEstrategicos()){
      const request_options = {
        method: "POST",
        crendentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          antecedente_id: this.state.antecedente.id
        })
      }

      const request = await fetch("/api/ejes_estrategicos/crear_eje_estrategico", request_options);
      const response = await request.json();

      if(response !== "err"){
        this.setState({modal_crear_eje_estrategico_abierto: false, modal_operacion_exitosa: true, mensaje: "Eje estratégico creado correctamente"}, async () => {
          this.obtenerEjesEstrategicos();
        });
      }
      else{
        this.setState({modal_crear_eje_estrategico_abierto: false, modal_operacion_fallida: true, mensaje: "Error al crear eje estratégico"});
      }
      
    }
  }

  async editarEjeEstrategico(){
    if(this.validarCreacionEjesEstrategicos()){
      const request_options = {
        method: "POST",
        crendentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          antecedente_id: this.state.antecedente.id,
          id: this.state.id
        })
      }
      const request = await fetch("/api/ejes_estrategicos/actualizar_eje_estrategico", request_options);
      const response = await request.json();

      if(response !== "err"){
        this.setState({modal_editar_eje_estrategico_abierto: false, modal_operacion_exitosa: true, mensaje: "Eje estratégico editado correctamente"}, async () => {
          this.obtenerEjesEstrategicos();
        });
      }
      else{
        this.setState({modal_editar_eje_estrategico_abierto: false, modal_operacion_fallida: true, mensaje: "Error al editar eje estratégico"});
      }
      
    }
  }

  async obtenerAntecedente(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.props.match.params.id
      })
    };

    const request = await fetch("/api/antecedentes/obtener_antecedente", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({antecedente: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener información del antecedente"});
    }
  }

  async eliminarEjeEstrategico(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    }

    const eliminar_eje_estrategico_request = await fetch('/api/ejes_estrategicos/eliminar_eje_estrategico', request_options);
    const eliminar_eje_estrategico_response = await eliminar_eje_estrategico_request.json();

    if(eliminar_eje_estrategico_response !== "err"){
      this.setState({
        modal_confirmacion_abierto: false,
        modal_operacion_exitosa: true,
        mensaje: "Eje estratégico eliminado exitosamente"
      }, async () => {
        this.obtenerEjesEstrategicos();
      });
    }
    else{
      this.setState({
        modal_confirmacion_abierto: false,
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar el eje estratégico"
      });
    }
  }

  async obtenerEjesEstrategicos(){
    const request = await fetch("/api/ejes_estrategicos/obtener_ejes_estrategicos", {credentials: "include"});
    const response = await request.json();

    if(response !== "err"){
      this.setState({ejes_estrategicos: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los ejes estratégicos"});
    }
  }

  render() {

    // Modal de confirmación que se muestra antes de borrar un eje estratégico
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar eje estratégico
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar el eje estratégico?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarEjeEstrategico()}>Eliminar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="success" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cerrar</Button>
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

    let modal_crear_eje_estrategico = 
      <Modal isOpen={this.state.modal_crear_eje_estrategico_abierto} toggle={() => this.setState({modal_crear_eje_estrategico_abierto: !this.state.modal_crear_eje_estrategico_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_crear_eje_estrategico_abierto: !this.state.modal_crear_eje_estrategico_abierto})}>
          Crear eje estratégico
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre*</Label>
                <Input onChange={(e) => this.setState({nombre: e.target.value})} />
                <span className="error-ejes-estrategicos" id="error-nombre">Nombre inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Descripción*</Label>
                <Input onChange={(e) => this.setState({descripcion: e.target.value})} type="textarea"></Input>
                <span className="error-ejes-estrategicos" id="error-descripcion">Descripción inválida. Este campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="success" onClick={this.crearEjeEstrategico}>
              Crear
            </Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_crear_eje_estrategico_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    let modal_editar_eje_estrategico = 
      <Modal isOpen={this.state.modal_editar_eje_estrategico_abierto} toggle={() => this.setState({modal_editar_eje_estrategico_abierto: !this.state.modal_editar_eje_estrategico_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_editar_eje_estrategico_abierto: !this.state.modal_editar_eje_estrategico_abierto})}>
          Editar eje estratégico
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Nombre*</Label>
                <Input defaultValue={this.state.nombre} onChange={(e) => this.setState({nombre: e.target.value})} />
                <span className="error-ejes-estrategicos" id="error-nombre">Nombre inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Descripción*</Label>
                <Input defaultValue={this.state.descripcion} onChange={(e) => this.setState({descripcion: e.target.value})} type="textarea"></Input>
                <span className="error-ejes-estrategicos" id="error-descripcion">Descripción inválida. Este campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="success" onClick={this.editarEjeEstrategico}>
              Editar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: true})}>
              Eliminar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_editar_eje_estrategico_abierto: false})}>
              Cancelar
            </Button>
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
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion/antecedentes/`)} >Gestión de Información Institucional de la CMB</BreadcrumbItem>          
            <BreadcrumbItem active onClick={() => this.props.history.push(`/inicio/administracion/antecedente/${this.props.match.params.id}/ejes-estrategicos`)}>Gestión de Ejes Estratégicos - Periodo {this.state.antecedente.periodo}</BreadcrumbItem>          

          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_confirmacion}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_crear_eje_estrategico}
        {modal_editar_eje_estrategico}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={diagnostico} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Gestión de Ejes Estratégicos</h1>
            <h2>Periodo {this.state.antecedente.periodo}</h2>
          </Col>

          {/* Botón para agregar áreas */}
          {autorizarAdministrador(this.props.usuario.rol) && 
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_eje_estrategico_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar eje estratégico
              </Button>
            </Col>
          }
        </Row>

        {/* Si existen áreas, muestra una tabla con su información */}
        {this.state.ejes_estrategicos.length > 0 ? 
          <Row className="row-unidades-de-medida">
            <Table striped className="">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Eje estratégico</th>
                  <th className="text-right">Opciones</th>
                </tr>
              </thead>
                <tbody>
                  {this.state.ejes_estrategicos.map((eje, index) => {
                    return(
                      <tr key={`eje_estrategico_${eje.id}`}>
                        <th scope="row">{eje.id}</th>
                        <td>{eje.nombre}</td>
                        <td className="text-right">
                          <Button 
                            color="info" className="boton-gestionar"
                            onClick={() => this.props.history.push(`/inicio/administracion/antecedente/${this.state.antecedente.id}/ejes-estrategicos/${eje.id}`)}
                          >
                            <i class="iconos fa fa-eye" aria-hidden="true"></i>                          
                            Objetivos Estratégicos
                          </Button>

                          {autorizarAdministrador(this.props.usuario.rol) && 
                            <Button 
                              color="info" className="boton-gestionar"
                              style={{marginLeft: "5px"}}
                              onClick={() => this.setState({modal_editar_eje_estrategico_abierto: true, ...eje})}
                            >
                              <i class="iconos fa fa-cogs" aria-hidden="true"></i>                          
                              Gestionar
                            </Button>
                          }

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
              <h2>Aún no ha creado ningún eje estratégico para este antecedente de la CMB. <br/> Haga click en el botón "Agregar eje estratégico" para agregar uno nuevo.</h2>
            </Col>
          </Row>
        }
      </Container>
  )
  }
}

export default withContext(EjesEstrategicos);