import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Table } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import withContext from './../../Contenedor/withContext';

export class ConsultarSolicitudPersonal extends Component {
  constructor(props){
    super(props);
    this.state = {
      requerimientos_personal: [],
      justificacion: undefined,
      id: undefined,
      cargos: [],
      area_id: undefined,
      nombre_area: undefined,
      cargo_id: undefined,
      numero_personas: undefined,
      indice_cargo: undefined,
      modal_operacion_fallida: false,
    };
    this.obtenerCargos = this.obtenerCargos.bind(this);
    this.obtenerRequerimientosPersonal = this.obtenerRequerimientosPersonal.bind(this);
    this.obtenerSolicitudPersonal = this.obtenerSolicitudPersonal.bind(this);
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

  async obtenerSolicitudPersonal(){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.props.match.params.id_solicitud
        })
      };
    const solicitud_personal_request = await fetch('/api/solicitud_personal/obtener_solicitud_personal_enviada', request_options);
    const solicitud_personal_response = await solicitud_personal_request.json();

    if(solicitud_personal_response !== 'err'){
      this.setState({...solicitud_personal_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la solicitud de personal"});
    }    
  }

  async obtenerRequerimientosPersonal(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        solicitud_personal_id: this.props.match.params.id_solicitud
      })
    };
    const requerimientos_personal_request = await fetch('/api/requerimientos_personal/obtener_requerimientos_personal', request_options);
    const requerimientos_personal_response = await requerimientos_personal_request.json();
    if(requerimientos_personal_response !== 'err'){
      this.setState({requerimientos_personal: requerimientos_personal_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los requerimientos de personal de la solicitud "});
    }

  }

  async obtenerCargos(){
    const cargos_request = await fetch('/api/cargos/obtener_cargos', {credentials: 'include'});
    const cargos_response = await cargos_request.json();

    if(cargos_response !== 'err'){
      if(cargos_response.length > 0) {
        this.setState({ cargo_id: cargos_response[0].id, cargos: cargos_response })
        }
        else{
        this.setState({cargos: cargos_response })
        }    
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los cargos "});
    }

  }  

  async componentDidMount(){
    document.title = "SICMB - Requerimientos de Personal";
    await this.obtenerCargos();
    await this.obtenerSolicitudPersonal();
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
              <BreadcrumbItem active>Consultar Solicitud de Personal</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_operacion_fallida}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={personal} className="icono-titulo"/>    
              <h1 className="titulo-solicitud-personal">Solicitud de Personal</h1>
            </Col>
          </Row>

          {/* Si existen cargos, muestra  tabla con su información */}
          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-unidades-de-medida">
            <thead>
              <tr>
                <th>Unidad Solicitante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {this.obtenerArea(this.state.area_id)}
                </th>
              </tr>
            </tbody>
          </Table>
          </Row>
          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-unidades-de-medida">                              
            <thead>
              <tr>
                <th>ID</th>    
                <th>Número de personas</th>
                <th>Cargo</th>
              </tr>
            </thead>
              <tbody>
              {this.state.requerimientos_personal.map((requerimiento_personal, index) => {
                  return(
                  <tr key={`requerimiento_personal_${requerimiento_personal.id}`}>
                      <th scope="row">{requerimiento_personal.id}</th>
                      <td>{requerimiento_personal.numero_personas}</td>
                      <td>
                        <Input
                          id={`cargo_id_requerimiento_${requerimiento_personal.id}`}                         
                          type="select"
                          defaultValue={requerimiento_personal.cargo_id}
                          disabled={true}
                        >
                          {this.state.cargos.map((cargo, index) => {
                            return(
                              <option value={cargo.id} key={`cargo_${cargo.index}`}>{cargo.codigo}-{cargo.cargo}</option>
                            )
                          })}
                        </Input>
                        </td>                          
                  </tr>
                  )
              })}
              </tbody>
          </Table>
          </Row>                
          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-unidades-de-medida">
            <thead>
              <tr>
                <th>Justificación</th>
              </tr>
            </thead>
            <tbody>
            <td>{this.state.justificacion}</td>              
            </tbody>
          </Table>
          </Row>                   
      </Container>
    )
  }      
  }
export default withContext(ConsultarSolicitudPersonal);