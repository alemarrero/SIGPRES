import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import consultar from '../../assets/img/consultar.png';
import { request } from 'http';
import withContext from './../../Contenedor/withContext';

export class ConsultarSolicitudesPersonal extends Component {
  constructor(props){
    super(props);
    this.state = {
      solicitudes_personal: [],
    };
    this.obtenerSolicitudesPersonalEnviadas = this.obtenerSolicitudesPersonalEnviadas.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
  }

  obtenerArea(id){
    const area = this.props.areas.filter(area => area.id === id);
    
    if(area[0] !== undefined){
      return `${area[0].nombre} - ${area[0].descripcion}`    
    }
    else{
      return `N/A`
    }
  }

  async obtenerSolicitudesPersonalEnviadas(){
    const solicitud_personal_request = await fetch('/api/solicitud_personal/obtener_solicitudes_personal_enviadas', {credentials: 'include'});
    const solicitud_personal_response = await solicitud_personal_request.json();

    if(solicitud_personal_response !== 'err'){
      this.setState({solicitudes_personal: solicitud_personal_response});
      console.log(this.state)
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las solicitudes de personal enviadas"});
    }    
  }

  async componentDidMount(){
    document.title = "SICMB - Consultar Solicitudes de Personal";
    await this.obtenerSolicitudesPersonalEnviadas();
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

    if(this.state.solicitudes_personal.length > 0){
      return (
        <Container fluid className="container-unidades-de-medida">

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/solicitud-personal/`)}>Solicitudes de Personal</BreadcrumbItem>
            <BreadcrumbItem active>Consultar Solicitudes de Personal Enviadas</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {/* Modales del componente */}
        {modal_operacion_fallida}

        <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={consultar} className="icono-titulo"/>    
            <h1 className="titulo-solicitud-personal">Consultar Solicitudes de Personal Enviadas</h1>
            </Col>
        </Row>

        <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">                              
              <thead>
                <tr>
                  <th>ID</th>    
                  <th>Área</th>
                  <th className="text-right">Opciones</th>
                </tr>
              </thead>
                <tbody>
                    {this.state.solicitudes_personal.map((solicitud_personal, index) => {
                        return(
                            <tr key={`solicitud_personal_${solicitud_personal.id}`}>
                            <th scope="row">{solicitud_personal.id}</th>
                            <td>{this.obtenerArea(solicitud_personal.area_id)}</td>
                            <td className="text-right">                
                            <Button 
                            color="info" className="boton-ver"
                            onClick={() => this.props.history.push('/inicio/presupuesto/requerimientos/solicitud-personal/consultar-solicitudes-personal/' + solicitud_personal.id)}>
                                <i class="iconos fa fa-eye" aria-hidden="true"></i>                          
                                Ver solicitud de personal
                            </Button>   
                            </td> 
                            </tr>
                        )
                    })}           
                </tbody>   
            </Table>
        </Row>                               
        </Container>       
      )
    }            
    else{
      return (
        <Container fluid className="container-unidades-de-medida">

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/solicitud-personal/`)}>Solicitudes de Personal</BreadcrumbItem>
            <BreadcrumbItem active>Consultar Solicitudes de Personal Enviadas</BreadcrumbItem>
          </Breadcrumb>
        </div>
        
        {/* Modales del componente */}
        {modal_operacion_fallida}

        <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={consultar} className="icono-titulo"/>    
            <h1 className="titulo-solicitud-personal">Consultar Solicitudes de Personal Enviadas</h1>
            </Col>
        </Row>

        <h1> Actualmente ninguna dirección ha enviado su solicitud de personal.</h1>

        </Container>         
    )
  }      
  }
}
export default withContext(ConsultarSolicitudesPersonal);