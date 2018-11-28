import React, { Component } from 'react';
import {Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Table} from 'reactstrap';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import './DetallePOA.css';

export default class RevisionPOA extends Component {
  constructor(props){
    super(props);
    this.state = {
      propuestas: [],
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      mensaje: undefined,
    };
    this.obtenerPropuestas = this.obtenerPropuestas.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Revisión de POA";
    this.obtenerPropuestas();
  }

  async obtenerPropuestas(){
    const request = await fetch("/api/propuestas_plan_operativo_anual/obtener_propuestas", {credentials: "include"});
    const response = await request.json();

    if(response !== "err"){
      this.setState({propuestas: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las propuestas de las direcciones"});
    }
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


    const fecha = new Date();
  
    // Se le suma 1 al año porque se está creando una propuesta para el periodo que corresponde al año siguiente
    const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

    return (
      <Container fluid className="container-unidades-de-medida">
        {/* Modales del componente */}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={objetivos_especificos} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Revisión de Propuestas de POA</h1>
            <h2>Año {año}</h2>
            <a target="_blank" href="http://localhost:5000/api/propuestas_plan_operativo_anual/obtener_propuestas_full">
              <Button color="info" style={{fontWeight: "normal", marginBottom: "5px"}}>    
                <i className="iconos fa fa-eye" aria-hidden="true"></i>  Ver consolidado
              </Button>                        
            </a>
          </Col>
        </Row>

        {this.state.propuestas.length > 0 ?
          <Row>
            <Col xs={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Dirección</th>
                    <th className="text-right">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.propuestas.map((propuesta, ) => {
                    return(
                    <tr key={`propuesta_area_${propuesta.area.id}`}>
                        <th scope="row">{propuesta.id}</th>
                        <td>{propuesta.area.nombre} - {propuesta.area.descripcion}</td>
                        <td className="text-right">
                          <Button 
                              color="info" className="boton-ver"
                              onClick={() => this.props.history.push(`/inicio/planeacion/revision-poa/${propuesta.id}`)}
                          >
                              <i class="iconos fa fa-eye" aria-hidden="true"></i>                          
                              Ver POA
                          </Button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
              </Table>
            </Col>
          </Row>
        :
        <Row>
          <Col xs={12} className="text-center">
            <h2>Ninguna dirección ha enviado su propuesta de POA aún.</h2>
          </Col>
        </Row>
        }


      </Container>
    )
  }
}
