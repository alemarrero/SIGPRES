import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import consolidado from '../../assets/img/consolidado.png';
import { request } from 'http';
import withContext from './../../Contenedor/withContext';

// https://www.flaticon.com/free-icon/compass_1156951


export class ConsolidadoSolicitudRequerimientos extends Component {
  constructor(props){
    super(props);
    this.state = {
      consolidado_solicitud_requerimientos: [],
      modal_operacion_fallida: false,
    };
    this.obtenerConsolidadoSolicitudRequerimientos = this.obtenerConsolidadoSolicitudRequerimientos.bind(this);
  }

  async obtenerConsolidadoSolicitudRequerimientos(){
    const consolidado_solicitud_requerimientos_request = await fetch('/api/productos/obtener_consolidado_presupuesto', {credentials: 'include'});
    const consolidado_solicitud_requerimientos_response = await consolidado_solicitud_requerimientos_request.json();
    console.log(consolidado_solicitud_requerimientos_response);
    if(consolidado_solicitud_requerimientos_response !== 'err'){
      this.setState({consolidado_solicitud_requerimientos: consolidado_solicitud_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener el consolidado de las solicitudes de requerimientos y necesidades enviadas "});
    }

  } 

  async componentDidMount(){
    document.title = "SICMB - Requerimientos de Personal";
    this.obtenerConsolidadoSolicitudRequerimientos();
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
          <Table striped className="tabla-unidad-solicitante">                              
            <thead>
                <tr>
                <th colspan="3" scope="colgroup"></th>                  
                <th colspan="12" scope="colgroup" className="text-center">Planificación Mensual</th>
                <th colspan="1" scope="colgroup" align="center"></th>
                </tr>                   
                <tr>
                <th>Subespecífica</th>
                <th>Producto o Servicio</th>
                <th>Unidad de Medida</th>
                <th>Ene</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Abr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Ago</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dic</th>  
                <th>Total</th>
                </tr>
            </thead>
                <tbody>
                {this.state.consolidado_solicitud_requerimientos.map((producto, index) => {
                    return(                       
                    <tr key={`producto_${producto.id}`}>
                        <td>{producto.subespecifica}</td>
                        <td>{producto.producto}</td>
                        <td>{producto.unidad_de_medida}</td> 
                        <td>{producto.cantidad_enero}</td>
                        <td>{producto.cantidad_febrero}</td>
                        <td>{producto.cantidad_marzo}</td>
                        <td>{producto.cantidad_abril}</td>
                        <td>{producto.cantidad_mayo}</td>
                        <td>{producto.cantidad_junio}</td>
                        <td>{producto.cantidad_julio}</td>
                        <td>{producto.cantidad_agosto}</td>
                        <td>{producto.cantidad_septiembre}</td>
                        <td>{producto.cantidad_octubre}</td>
                        <td>{producto.cantidad_noviembre}</td>
                        <td>{producto.cantidad_diciembre}</td>
                        <td>{producto.cantidad_total}</td>
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
export default withContext(ConsolidadoSolicitudRequerimientos);