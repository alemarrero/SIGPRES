import React, { Component } from 'react';
import queja from '../../assets/img/queja.png';
import { Button, Col, Row, Table, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import withContext from '../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class Quejas extends Component {
  constructor(props){
    super(props);
    this.state = {
      quejas: [],
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      mensaje: undefined,
    };
    this.obtenerQuejas = this.obtenerQuejas.bind(this);
    this.eliminarQueja = this.eliminarQueja.bind(this);
    this.cargarModalDetalleQueja = this.cargarModalDetalleQueja.bind(this);
  }

  /**
   * Método que se ejecuta al terminar de montar el componente. 
   * 
   * @return actualiza el título de la pestaña y obtiene y almacena 
   * en el estado las quejas existentes.
   */
  async componentDidMount(){
    document.title = "SICMB - Gestión de quejas";
    this.obtenerQuejas();
  }

  /**
   * Recibe el índice dentro del arreglo de quejas almacenado en el 
   * estado y carga el modal de detalle de queja con la información 
   * del objeto que se encuentra en el índice proporcionado
   * 
   * Parámetros:
   * @param {Integer} index representa el índice dentro del arreglo de 
   * quejas de la queja a seleccionar
   * 
   * Respuestas:
   * @return muestra el modal del detalle de queja con toda la información 
   * de la misma.
   */
  cargarModalDetalleQueja(index){
    const queja = this.state.quejas[index];

    this.setState({
      modal_detalle_queja_abierto: true,
      ...queja
    });
  }

  /**
   * Método utilizado para obtener las quejas existente en el sistema
   *
   * @return actualiza la variable 'quejas' del estado si se pudo obtener 
   * la información correctamente.
   * @return muestra un modal de operaciónfallida si no se pudo obtener la 
   * información de las quejas desde el servidor.
   */
  async obtenerQuejas(){
    const quejas_request = await fetch('/api/quejas/obtener_quejas', {credentials: 'include'});
    const quejas_response = await quejas_request.json();

    if(quejas_response !== "err"){
      this.setState({quejas: quejas_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las quejas"});
    }
  }
  
  /**
   * Método utilizado para eliminar una queja.
   * 
   * Parámetros:
   * @param {Integer} id representa el id de la queja a eliminar
   * 
   * Respuestas:
   * @return muestra un modal de operación exitosa y actualiza 
   * la información de las quejas si la queja se pudo eliminar 
   * correctamente.
   * @return muestra un modal de operación fallida si ocurrióun 
   * error al eliminar la queja.
   */
  async eliminarQueja(id){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: id
      })
    }

    const eliminar_queja_request = await fetch('/api/quejas/eliminar_queja', request_options);
    const eliminar_queja_response = await eliminar_queja_request.json();

    if(eliminar_queja_response !== "err"){
      this.setState({
        modal_operacion_exitosa: true,
        mensaje: "Queja eliminada exitosamente"
      }, async () => {
        this.obtenerQuejas();
      });
    }
    else{
      this.setState({
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar la queja"
      });
    }
  }

  render() {
    // Modal de confirmación que se muestra antes de borrar una queja
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar queja
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar la queja?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cerrar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarQueja(this.state.id)}>Eliminar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    // Modal en donde se muestran todos los detalles de una cierta queja
    let modal_detalle_queja = 
      <Modal isOpen={this.state.modal_detalle_queja_abierto} toggle={() => this.setState({modal_detalle_queja_abierto: !this.state.modal_detalle_queja_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_detalle_queja_abierto: !this.state.modal_detalle_queja_abierto})}>
          Detalle de la queja
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
            <Button color="warning" onClick={() => this.setState({modal_detalle_queja_abierto: false})}>
              Cerrar
            </Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({id: queja.id, modal_detalle_queja_abierto: false, modal_confirmacion_abierto: true})}>
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
        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_detalle_queja}
        {modal_confirmacion}

        <Row fluid={true}>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={queja} className="icono-titulo"/>    
            <h1>Quejas</h1>
          </Col>
        </Row>
        
        {/* Si hay quejas disponibles, muestra una tabla con la información de las mismas,
          de lo contrario, muestra un mensaje indicando de que no hay quejas disponibles. */}
        {this.state.quejas.length > 0 ? 
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
              {this.state.quejas.map((queja, index) => {
                  return(
                  <tr key={`queja_${index}`}>
                      <th scope="row">{queja.id}</th>
                      <th>{queja.fecha}</th>
                      <th>{queja.direccion}</th>
                      <th>{queja.descripcion.slice(0,120)}</th>
                      <th>{queja.identificador}</th>
                      <td>
                      <Button 
                          color="info" className="boton-ver"
                          onClick={() => this.cargarModalDetalleQueja(index)}
                      >
                          <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                          Ver detalle
                      </Button>
                      {autorizarAdministrador(this.props.usuario.rol) && 
                        <Button 
                          color="danger"
                          onClick={() => this.setState({id: queja.id, modal_confirmacion_abierto: true})}
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
            <h2>No hay quejas disponibles!</h2>
          </Col>
        }

      </React.Fragment>
    )
  }
}

export default withContext(Quejas);
