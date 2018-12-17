import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import consolidado from '../../assets/img/consolidado.png';
import withContext from '../../Contenedor/withContext';


export class PresupuestoFinal extends Component {
  constructor(props){
    super(props);
    this.state = {
      presupuesto_final: [],
      modal_operacion_fallida: false,
    };
    this.obtenerPresupuestoFinal = this.obtenerPresupuestoFinal.bind(this);
  }

  async obtenerPresupuestoFinal(){
    const presupuesto_final_request = await fetch('/api/vinculacion_acciones_productos/obtener_presupuesto_final', {credentials: 'include'});
    const presupuesto_final_response = await presupuesto_final_request.json();
    console.log(presupuesto_final_response);
    if(presupuesto_final_response !== 'err'){
      this.setState({presupuesto_final: presupuesto_final_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener el presupuesto"});
    }

  } 

  async componentDidMount(){
    document.title = "SICMB - Presupuesto Final";
    this.obtenerPresupuestoFinal();
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
              <BreadcrumbItem active>Resumen Financiero por Partida Presupuestaria</BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          {/* Modales del componente */}
          {modal_operacion_fallida}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={consolidado} className="icono-titulo"/>    
              <h1 className="titulo-solicitud-personal">Resumen Financiero por Partida Presupuestaria</h1>
            </Col>

            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <a target="_blank" href="http://sicmb.herokuapp.com/api/vinculacion_acciones_productos/obtener_reporte_presupuesto_final">
                <Button color="info" className="boton-agregar" style={{marginLeft: "10px"}}>    
                  <i className="iconos fa fa-download" aria-hidden="true"></i>  Descargar reporte
                </Button>                        
              </a>              
            </Col>            
          </Row>

          <Row className="row-unidades-de-medida">

          <Table striped className="tabla-solicitud-de-requerimientos">                              
            <thead>                  
                <tr>
                <th>Partida</th>
                <th>Genérica</th>
                <th>Específica</th>                    
                <th>Subespecífica</th>
                <th>Denominación</th>
                <th>Enero</th>
                <th>Febrero</th>
                <th>Marzo</th>
                <th>Abril</th>
                <th>Mayo</th>
                <th>Junio</th>
                <th>Julio</th>
                <th>Agosto</th>
                <th>Septiembre</th>
                <th>Octubre</th>
                <th>Noviembre</th>
                <th>Diciciembre</th>  
                <th>Presupuesto Total</th>
                </tr>
            </thead>
                <tbody>
                {this.state.presupuesto_final.map((producto, index) => {
                    if (producto.es_partida === false){                   
                    return(                       
                    <tr key={`producto_${producto.id}`}>
                        <td>{producto.partida}</td>
                        <td>{producto.generica}</td>
                        <td>{producto.especifica}</td>
                        <td>{producto.subespecifica}</td>
                        <td>{producto.denominacion}</td>
                        <td>{producto.monto_enero}</td>
                        <td>{producto.monto_febrero}</td>
                        <td>{producto.monto_marzo}</td>
                        <td>{producto.monto_abril}</td>
                        <td>{producto.monto_mayo}</td>
                        <td>{producto.monto_junio}</td>
                        <td>{producto.monto_julio}</td>
                        <td>{producto.monto_agosto}</td>
                        <td>{producto.monto_septiembre}</td>
                        <td>{producto.monto_octubre}</td>
                        <td>{producto.monto_noviembre}</td>
                        <td>{producto.monto_diciembre}</td>
                        <td>{producto.monto_total}</td>
                    </tr>
                    )}
                    else{                   
                        return(                       
                        <tr key={`producto_${producto.id}`}>
                            <td>Total {producto.partida}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{producto.monto_enero}</td>
                            <td>{producto.monto_febrero}</td>
                            <td>{producto.monto_marzo}</td>
                            <td>{producto.monto_abril}</td>
                            <td>{producto.monto_mayo}</td>
                            <td>{producto.monto_junio}</td>
                            <td>{producto.monto_julio}</td>
                            <td>{producto.monto_agosto}</td>
                            <td>{producto.monto_septiembre}</td>
                            <td>{producto.monto_octubre}</td>
                            <td>{producto.monto_noviembre}</td>
                            <td>{producto.monto_diciembre}</td>
                            <td>{producto.monto_total}</td>
                        </tr>
                        )}                
                })}
                </tbody>
          </Table>
          </Row>                           
      </Container>
    )
  }      
  }
export default withContext(PresupuestoFinal);
