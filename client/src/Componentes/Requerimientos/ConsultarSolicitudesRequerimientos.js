import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Table } from 'reactstrap';
import consultar from '../../assets/img/consultar.png';
import withContext from '../../Contenedor/withContext';

export class ConsultarSolicitudesRequerimientos extends Component {
  constructor(props){
    super(props);
    this.state = {
      solicitudes_de_requerimientos: [],
    };
    this.obtenerSolicitudesDeRequerimientosEnviadas = this.obtenerSolicitudesDeRequerimientosEnviadas.bind(this);
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

  async obtenerSolicitudesDeRequerimientosEnviadas(){
    const solicitudes_de_requerimientos_request = await fetch('/api/solicitudes_de_requerimientos/obtener_solicitudes_de_requerimientos_enviadas', {credentials: 'include'});
    const solicitudes_de_requerimientos_response = await solicitudes_de_requerimientos_request.json();

    if(solicitudes_de_requerimientos_response !== 'err'){
      this.setState({solicitudes_de_requerimientos: solicitudes_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las solicitudes de personal enviadas"});
    }    
  }

  async componentDidMount(){
    document.title = "SIGPRES CMB -Consultar Solicitudes de Personal";
    await this.obtenerSolicitudesDeRequerimientosEnviadas();
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

    if(this.state.solicitudes_de_requerimientos.length > 0){
      return (
        <Container fluid className="container-unidades-de-medida">

        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/`)}>Gestión de requerimientos de cada área</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/`)}>Requerimientos y Necesidades</BreadcrumbItem>
            <BreadcrumbItem active>Consultar Solicitudes de Requerimientos y Necesidades Enviadas</BreadcrumbItem>

          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_operacion_fallida}

        <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={consultar} className="icono-titulo"/>    
            <h1 className="titulo-solicitud-personal">Consultar Solicitudes de Requerimientos y Necesidades Enviadas</h1>
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
                    {this.state.solicitudes_de_requerimientos.map((solicitud_de_requerimientos, index) => {
                        return(
                            <tr key={`solicitud_de_requerimientos_${solicitud_de_requerimientos.id}`}>
                            <th scope="row">{solicitud_de_requerimientos.id}</th>
                            <td>{this.obtenerArea(solicitud_de_requerimientos.area_id)}</td>
                            <td className="text-right">                
                            <Button 
                            color="info" className="boton-ver"
                            onClick={() => this.props.history.push('/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/consultar-solicitudes-de-requerimientos/' + solicitud_de_requerimientos.id)}>
                                <i className="iconos fa fa-eye" aria-hidden="true"></i>                          
                                Ver solicitud de requerimientos
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
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/`)}>Gestión de requerimientos de cada área</BreadcrumbItem>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/`)}>Requerimientos y Necesidades</BreadcrumbItem>
              <BreadcrumbItem active>Consultar Solicitudes de Requerimientos y Necesidades Enviadas</BreadcrumbItem>
            </Breadcrumb>
        </div>
        

          {/* Modales del componente */}
          {modal_operacion_fallida}

          <Row>
              {/* Título de la sección */}
              <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={consultar} className="icono-titulo"/>    
              <h1 className="titulo-solicitud-personal">Consultar Solicitudes de Requerimientos y Necesidades Enviadas</h1>
              </Col>
          </Row>

          <h1> Actualmente ninguna dirección ha enviado su solicitud de requerimientos y necesidades.</h1>

        </Container>         
    )
  }      
  }
}
export default withContext(ConsultarSolicitudesRequerimientos);