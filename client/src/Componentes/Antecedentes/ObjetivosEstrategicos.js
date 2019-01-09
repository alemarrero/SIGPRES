import React, { Component } from 'react';
import './ObjetivosEstrategicos.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import diagnostico from '../../assets/img/diagnostico.png';
import withContext from './../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class ObjetivosEstrategicos extends Component {
  constructor(props){
    super(props);
    this.state = {
      eje_estrategico: {},
      objetivos_estrategicos: [],
      nombre: undefined,
      descripcion: undefined,
      modal_operacion_fallida: false,
      modal_operacion_exitosa: false,
      modal_confirmacion_abierto: false,
      modal_crear_objetivo_estrategico_abierto: false,
      modal_editar_objetivo_estrategico_abierto: false,
      mensaje: undefined,
    };
    this.obtenerEjeEstrategico = this.obtenerEjeEstrategico.bind(this);
    this.crearObjetivoEstrategico = this.crearObjetivoEstrategico.bind(this);
    this.editarObjetivoEstrategico = this.editarObjetivoEstrategico.bind(this);
    this.obtenerObjetivosEstrategicos = this.obtenerObjetivosEstrategicos.bind(this);
    this.validarCreacionObjetivosEstrategicos = this.validarCreacionObjetivosEstrategicos.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Objetivos Estratégicos Institucionale";
    this.obtenerEjeEstrategico();
    this.obtenerObjetivosEstrategicos();
  }

  validarCreacionObjetivosEstrategicos(){
    let formulario_valido = true;

    if(this.state.objetivo === undefined || this.state.objetivo === ""){
      formulario_valido = false;
      document.getElementById("error-objetivo").style.display = "block";
    }
    else{
      document.getElementById("error-objetivo").style.display = "none";
    }

    return formulario_valido;
  }

  async crearObjetivoEstrategico(){
    if(this.validarCreacionObjetivosEstrategicos()){
      const request_options = {
        method: "POST",
        crendentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          objetivo: this.state.objetivo,
          eje_estrategico_id: this.state.eje_estrategico.id
        })
      }

      const request = await fetch("/api/objetivos_estrategicos/crear_objetivo_estrategico", request_options);
      const response = await request.json();

      if(response !== "err"){
        this.setState({modal_crear_objetivo_estrategico_abierto: false, modal_operacion_exitosa: true, mensaje: "Objetivo estratégico institucional creado correctamente"}, async () => {
          this.obtenerObjetivosEstrategicos();
        });
      }
      else{
        this.setState({modal_crear_objetivo_estrategico_abierto: false, modal_operacion_fallida: true, mensaje: "Error al crear objetivo estratégico"});
      }
    }
  }

  async editarObjetivoEstrategico(){
    if(this.validarCreacionObjetivosEstrategicos()){
      const request_options = {
        method: "POST",
        crendentials: "include",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          objetivo: this.state.objetivo,
          eje_estrategico_id: this.state.eje_estrategico.id,
          id: this.state.id
        })
      }
      const request = await fetch("/api/objetivos_estrategicos/actualizar_objetivo_estrategico", request_options);
      const response = await request.json();

      if(response !== "err"){
        this.setState({modal_editar_objetivo_estrategico_abierto: false, modal_operacion_exitosa: true, mensaje: "Objetivo estratégico institucional editado correctamente"}, async () => {
          this.obtenerObjetivosEstrategicos();
        });
      }
      else{
        this.setState({modal_editar_objetivo_estrategico_abierto: false, modal_operacion_fallida: true, mensaje: "Error al editar objetivo estratégico"});
      }
      
    }
  }

  async obtenerEjeEstrategico(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.props.match.params.id_eje
      })
    };

    const request = await fetch("/api/ejes_estrategicos/obtener_eje_estrategico", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({eje_estrategico: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener información del eje estratégico"});
    }
  }

  async eliminarObjetivoEstrategico(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    }

    const eliminar_objetivo_estrategico_request = await fetch('/api/objetivos_estrategicos/eliminar_objetivo_estrategico', request_options);
    const eliminar_objetivo_estrategico_response = await eliminar_objetivo_estrategico_request.json();

    if(eliminar_objetivo_estrategico_response !== "err"){
      this.setState({
        modal_confirmacion_abierto: false,
        modal_operacion_exitosa: true,
        modal_editar_objetivo_estrategico_abierto: false,
        mensaje: "Objetivo estratégico institucional eliminado exitosamente"
      }, async () => {
        this.obtenerObjetivosEstrategicos();
      });
    }
    else{
      this.setState({
        modal_confirmacion_abierto: false,
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar el objetivo estratégico"
      });
    }
  }

  async obtenerObjetivosEstrategicos(){
    const request = await fetch("/api/objetivos_estrategicos/obtener_objetivos_estrategicos", {credentials: "include"});
    const response = await request.json();

    if(response !== "err"){
      this.setState({objetivos_estrategicos: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los Objetivos Estratégicos Institucionale"});
    }
  }

  render() {

    // Modal de confirmación que se muestra antes de borrar un objetivo estratégico
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar objetivo estratégico
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar el objetivo estratégico?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarObjetivoEstrategico()}>Eliminar</Button>
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

    let modal_crear_objetivo_estrategico = 
      <Modal isOpen={this.state.modal_crear_objetivo_estrategico_abierto} toggle={() => this.setState({modal_crear_objetivo_estrategico_abierto: !this.state.modal_crear_objetivo_estrategico_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_crear_objetivo_estrategico_abierto: !this.state.modal_crear_objetivo_estrategico_abierto})}>
          Crear objetivo estratégico
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Objetivo estratégico*</Label>
                <Input onChange={(e) => this.setState({objetivo: e.target.value})} />
                <span className="error-objetivos-estrategicos" id="error-objetivo">Objetivo estratégico institucional inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="success" onClick={this.crearObjetivoEstrategico}>
              Crear
            </Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_crear_objetivo_estrategico_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    let modal_editar_objetivo_estrategico = 
      <Modal isOpen={this.state.modal_editar_objetivo_estrategico_abierto} toggle={() => this.setState({modal_editar_objetivo_estrategico_abierto: !this.state.modal_editar_objetivo_estrategico_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_editar_objetivo_estrategico_abierto: !this.state.modal_editar_objetivo_estrategico_abierto})}>
          Editar objetivo estratégico
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Objetivo estratégico*</Label>
                <Input defaultValue={this.state.objetivo} onChange={(e) => this.setState({objetivo: e.target.value})} />
                <span className="error-objetivos-estrategicos" id="error-objetivo">Objetivo estratégico institucional inválido. Este campo no puede estar vacío.</span>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="success" onClick={this.editarObjetivoEstrategico}>
              Editar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_abierto: true})}>
              Eliminar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={4} lg={4} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_editar_objetivo_estrategico_abierto: false})}>
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
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/administracion/antecedente/${this.props.match.params.id_eje}/ejes-estrategicos`)}>Gestión de Ejes Estratégicos</BreadcrumbItem>                  
            <BreadcrumbItem active>Gestión de Objetivos Estratégicos Institucionales</BreadcrumbItem>          
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_confirmacion}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_crear_objetivo_estrategico}
        {modal_editar_objetivo_estrategico}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={diagnostico} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Gestión de Objetivos Estratégicos Institucionales</h1>
          </Col>

          {/* Botón para agregar áreas */}
          {autorizarAdministrador(this.props.usuario.rol) && 
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_objetivo_estrategico_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar objetivo estratégico
              </Button>
            </Col>
          }
        </Row>

        {/* Si existen áreas, muestra una tabla con su información */}
        {this.state.objetivos_estrategicos.length > 0 ? 
          <Row className="row-unidades-de-medida">
            <Col xs={12} style={{padding: "5px 0px"}}>
              <p><b>Eje Estratégico asociado:</b> {this.state.eje_estrategico.id} - {this.state.eje_estrategico.nombre}</p>
            </Col>

            <Table striped className="">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Objetivo</th>
                  {autorizarAdministrador(this.props.usuario.rol) && 
                    <th className="text-right">Opciones</th>
                  }
                </tr>
              </thead>
                <tbody>
                  {this.state.objetivos_estrategicos.map((objetivo, index) => {
                    return(
                      <tr key={`objetivo_estrategico_${objetivo.id}`}>
                        <th scope="row">{objetivo.id}</th>
                        <td>{objetivo.objetivo}</td>
                        {autorizarAdministrador(this.props.usuario.rol) && 
                          <td className="text-right">
                            <Button 
                              color="info" className="boton-gestionar"
                              style={{marginLeft: "5px"}}
                              onClick={() => this.setState({modal_editar_objetivo_estrategico_abierto: true, ...objetivo})}
                            >
                              <i class="iconos fa fa-cogs" aria-hidden="true"></i>                          
                              Gestionar
                            </Button>
                          </td>
                        }
                      </tr>
                    )
                  })}
                </tbody>
            </Table>
          </Row>
          :
          <Row>
            <Col xs={12} className="text-center">
              <h2>Aún no ha creado ningún objetivo estratégico para este antecedente de la CMB. <br/> Haga click en el botón "Agregar objetivo estratégico" para agregar uno nuevo.</h2>
            </Col>
          </Row>
        }
      </Container>
  )
  }
}

export default withContext(ObjetivosEstrategicos);