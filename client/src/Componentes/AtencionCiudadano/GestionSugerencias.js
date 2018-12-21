import React, { Component } from 'react';
import sugerencia from '../../assets/img/sugerencia.png';
import { Breadcrumb, BreadcrumbItem, Button, Col, Row, Table, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import withContext from '../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class Sugerencias extends Component {
  constructor(props){
    super(props);
    this.state = {
      sugerencias: [],
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      mensaje: undefined,
    };
    this.obtenerSugerencias = this.obtenerSugerencias.bind(this);
    this.eliminarSugerencia = this.eliminarSugerencia.bind(this);
    this.cargarModalDetalleSugerencia = this.cargarModalDetalleSugerencia.bind(this);
  }

  /**
   * Método que se ejecuta al terminar de montar el componente. 
   * 
   * @return actualiza el título de la pestaña y obtiene y almacena 
   * en el estado las sugerencias existentes.
   */
  async componentDidMount(){
    document.title = "SICMB - Gestión de sugerencias";
    this.obtenerSugerencias();
  }

  /**
   * Recibe el índice dentro del arreglo de sugerencias almacenado en el 
   * estado y carga el modal de detalle de sugerencia con la información 
   * del objeto que se encuentra en el índice proporcionado
   * 
   * Parámetros:
   * @param {Integer} index representa el índice dentro del arreglo de 
   * sugerencias de la sugerencia a seleccionar
   * 
   * Respuestas:
   * @return muestra el modal del detalle de sugerencia con toda la información 
   * de la misma.
   */
  cargarModalDetalleSugerencia(index){
    const sugerencia = this.state.sugerencias[index];

    this.setState({
      modal_detalle_sugerencia_abierto: true,
      ...sugerencia
    });
  }

  /**
   * Método utilizado para obtener las sugerencias existente en el sistema
   *
   * @return actualiza la variable 'sugerencias' del estado si se pudo obtener 
   * la información correctamente.
   * @return muestra un modal de operaciónfallida si no se pudo obtener la 
   * información de las sugerencias desde el servidor.
   */
  async obtenerSugerencias(){
    const sugerencias_request = await fetch('/api/sugerencias/obtener_sugerencias', {credentials: 'include'});
    const sugerencias_response = await sugerencias_request.json();

    if(sugerencias_response !== "err"){
      this.setState({sugerencias: sugerencias_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las sugerencias"});
    }
  }
  
  /**
   * Método utilizado para eliminar una sugerencia.
   * 
   * Parámetros:
   * @param {Integer} id representa el id de la sugerencia a eliminar
   * 
   * Respuestas:
   * @return muestra un modal de operación exitosa y actualiza 
   * la información de las sugerencias si la sugerencia se pudo eliminar 
   * correctamente.
   * @return muestra un modal de operación fallida si ocurrióun 
   * error al eliminar la sugerencia.
   */
  async eliminarSugerencia(id){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: id
      })
    }

    const eliminar_sugerencia_request = await fetch('/api/sugerencias/eliminar_sugerencia', request_options);
    const eliminar_sugerencia_response = await eliminar_sugerencia_request.json();

    if(eliminar_sugerencia_response !== "err"){
      this.setState({
        modal_operacion_exitosa: true,
        mensaje: "Sugerencia eliminada exitosamente"
      }, async () => {
        this.obtenerSugerencias();
      });
    }
    else{
      this.setState({
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar la sugerencia"
      });
    }
  }

  render() {
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
            <Button color="danger" onClick={() => this.eliminarSugerencia(this.state.id)}>Eliminar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    // Modal en donde se muestran todos los detalles de una cierta sugerencia
    let modal_detalle_sugerencia = 
      <Modal isOpen={this.state.modal_detalle_sugerencia_abierto} toggle={() => this.setState({modal_detalle_sugerencia_abierto: !this.state.modal_detalle_sugerencia_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_detalle_sugerencia_abierto: !this.state.modal_detalle_sugerencia_abierto})}>
          Detalle de la sugerencia
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Fecha</Label>
              <p>{this.state.fecha}</p>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Identificador</Label>
              <p>{this.state.identificador}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Nombre</Label>
              <p>{this.state.nombre} {this.state.apellido}</p>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Cédula</Label>
              <p>{this.state.cedula}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Teléfono</Label>
              <p>{this.state.telefono}</p>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Correo electrónico</Label>
              <p>{this.state.email}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Dirección</Label>
              <p>{this.state.direccion}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Descripción</Label>
              <p>{this.state.descripcion}</p>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_detalle_sugerencia_abierto: false})}>
              Cerrar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({id: sugerencia.id, modal_detalle_sugerencia_abierto: false, modal_confirmacion_abierto: true})}>
              Eliminar
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
      <React.Fragment >

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/oac/`)}>Atención al Ciudadano</BreadcrumbItem>
            <BreadcrumbItem active>Sugerencias</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_detalle_sugerencia}
        {modal_confirmacion}

        <Row fluid>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={sugerencia} className="icono-titulo"/>    
            <h1>Sugerencias</h1>
          </Col>
        </Row>
        
        {/* Si hay sugerencias disponibles, muestra una tabla con la información de las mismas,
          de lo contrario, muestra un mensaje indicando de que no hay sugerencias disponibles. */}
        {this.state.sugerencias.length > 0 ? 
          <Row className="justify-content-center">
            <Table striped>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Dirección</th>
                  <th>Descripción</th>
                  <th>Identificador</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
              {this.state.sugerencias.map((sugerencia, index) => {
                  return(
                  <tr key={`sugerencia_${index}`}>
                      <th scope="row">{sugerencia.id}</th>
                      <th>{sugerencia.fecha}</th>
                      <th>{sugerencia.direccion}</th>
                      <th>{sugerencia.descripcion.slice(0,120)}</th>
                      <th>{sugerencia.identificador}</th>
                      <td>
                      <Button 
                          color="info" className="boton-ver"
                          onClick={() => this.cargarModalDetalleSugerencia(index)}
                      >
                          <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                          Ver detalle
                      </Button>
                      {autorizarAdministrador(this.props.usuario.rol) && 
                        <Button 
                          color="danger"
                          onClick={() => this.setState({id: sugerencia.id, modal_confirmacion_abierto: true})}
                        >
                            <i className="iconos fas fa-trash" aria-hidden="true"></i>                          
                            Eliminar
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
          <Col xs={12} sm={12} md={12} lg={12} className="text-center">
            <h2>No hay sugerencias disponibles!</h2>
          </Col>
        }

      </React.Fragment>
    )
  }
}

export default withContext(Sugerencias);