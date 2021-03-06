import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap';
import consolidado from '../../assets/img/consolidado.png';
import withContext from './../../Contenedor/withContext';

export class ConsolidadoSolicitudPersonal extends Component {
  constructor(props){
    super(props);
    this.state = {
      requerimientos_personal: [],
      modal_operacion_fallida: false,
    };
    this.obtenerRequerimientosPersonal = this.obtenerRequerimientosPersonal.bind(this);
  }

  async obtenerRequerimientosPersonal(){
    const requerimientos_personal_request = await fetch('/api/solicitud_personal/obtener_consolidado', {credentials: 'include'});
    const requerimientos_personal_response = await requerimientos_personal_request.json();
    if(requerimientos_personal_response !== 'err'){
      this.setState({requerimientos_personal: requerimientos_personal_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener el consolidado de las solicitudes de personal enviadas "});
    }

  } 

  async componentDidMount(){
    document.title = "SIGPRES CMB -Requerimientos de Personal";
    this.obtenerRequerimientosPersonal();
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

    return (
        <Container fluid className="container-unidades-de-medida">

          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/solicitud-personal/`)}>Solicitudes de Personal</BreadcrumbItem>
              <BreadcrumbItem active>Consolidado de Solicitudes de Personal</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_operacion_fallida}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={consolidado} className="icono-titulo"/>    
              <h1 className="titulo-solicitud-personal">Consolidado de Solicitudes de Personal</h1>
            </Col>
          </Row>

          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-unidades-de-medida">                              
            <thead>
              <tr>
                <th>ID</th>    
                <th>Cargo</th>
                <th>Número de personas</th>
              </tr>
            </thead>
              <tbody>
              {this.state.requerimientos_personal.map((requerimiento_personal, index) => {
                  return(
                  <tr key={`requerimiento_personal_${requerimiento_personal.cargo_id}`}>
                      <th scope="row">{requerimiento_personal.cargo_id}</th>
                      <td>{requerimiento_personal.cargo.codigo}-{requerimiento_personal.cargo.cargo}</td>   
                      <td>{requerimiento_personal.total}</td>
                  </tr>
                  )
              })}
              </tbody>
          </Table>
          </Row>                           
      </Container>
    )
  }      
  }
export default withContext(ConsolidadoSolicitudPersonal);