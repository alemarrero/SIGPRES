import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import areas from '../../assets/img/areas.png';
import './DetalleAntecedente.css';

export default class DetalleAntecedente extends Component {
  constructor(props){
    super(props);
    this.state = {
      ejes_estrategicos: []
    };
    this.obtenerInformacionAntecedente = this.obtenerInformacionAntecedente.bind(this);
  }

  async obtenerInformacionAntecedente(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.props.match.params.id
      })
    }

    const request = await fetch("/api/antecedentes/obtener_antecedente_full", request_options);
    const response = await request.json();

    if(response !== "err"){
      this.setState({...response});
    }
    else{
      this.setState({
        modal_operacion_fallida: true,
        mensaje: "Error al obtener la información del antecedente"
      });
    }
  }

  async componentDidMount(){
    document.title = "Antecedente de la CMB";
    this.obtenerInformacionAntecedente();
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
          <Col className="" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={() => this.setState({modal_operacion_fallida: false})}>
              Cerrar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    return (
      <React.Fragment>
        {modal_operacion_fallida}
        <Container fluid className="container-unidades-de-medida">
          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={areas} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Antecedentes de la CMB</h1>
              <h2>Periodo {this.state.periodo}</h2>
            </Col>
          </Row>

          <hr/>

          <Row className="fila-detalle-antecedente">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className="">Objetivo General</h3>
              <p>{this.state.objetivo_general}</p>            
            </Col>
          </Row>

          <Row className="fila-detalle-antecedente">
            <Col xs={12} sm={12} md={6} lg={6}>
              <h3 className="">Misión</h3>
              <p>{this.state.mision}</p>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <h3 className="">Visión</h3>
              <p>{this.state.vision}</p>
            </Col>
          </Row>

          <Row className="fila-detalle-antecedente">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className="text-center">Matriz FODA</h3>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <Table>
                <thead style={{fontWeight: "lighter !important"}}>
                  <tr>
                    <th>
                    </th>
                    <th style={{textAlign: "center"}}>
                      <React.Fragment>
                        <strong>
                          Fortalezas
                        </strong>
                        <br/>
                        <p className="matriz-foda-header" style={{fontWeight: "lighter !important"}}>
                          {this.state.fortalezas}
                        </p>
                      </React.Fragment>
                    </th>
                    <th style={{textAlign: "center"}}>
                      <React.Fragment>
                        <strong>
                          Debilidades
                        </strong>
                        <br/>
                        <p className="matriz-foda-header" style={{fontWeight: "lighter !important"}}>
                          {this.state.debilidades}
                        </p>
                      </React.Fragment>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <React.Fragment>
                        <strong>
                          Oportunidades
                          <br/>
                        </strong>
                          {this.state.oportunidades}
                      </React.Fragment>
                    </td>
                    <td>
                      <strong>Estrategía de Oportunidades-Fortalezas (OF)</strong>
                      <br/>
                      {this.state.oportunidades_fortalezas}
                    </td>
                    <td>
                      <strong>Estrategía de Oportunidades-Debilidades (OD)</strong>
                      <br/>
                      {this.state.oportunidades_debilidades}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <React.Fragment>
                        <strong>
                          Amenazas
                          <br/>
                        </strong>
                          {this.state.amenazas}
                      </React.Fragment>
                    </td>
                    <td>
                      <strong>Estrategía de Amenazas-Fortalezas (AF)</strong>
                      <br/>
                      {this.state.amenazas_fortalezas}
                    </td>
                    <td>
                      <strong>Estrategía de Oportunidades-Fortalezas (AD)</strong>
                      <br/>
                      {this.state.amenazas_debilidades}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="fila-detalle-antecedente">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className="">Ejes estratégicos</h3>
            </Col>
            
            <Col xs={12} sm={12} md={12} lg={12}>
              {this.state.ejes_estrategicos.map((eje, index) => {
                  return(
                    <React.Fragment key={`eje_estrategico_${index}`}>
                      <h5><b>{eje.nombre}</b></h5>
                      <p className="descripcion-eje-estrategico">{eje.descripcion}</p>

                      <span className="titulo-lista-objetivos-estrategicos"><b>Objetivos Estratégicos Institucionales</b>:</span>

                      <ol className="lista-objetivos-estrategicos">
                        {eje.objetivos_estrategicos.map((objetivo, index2) => {
                          return(
                            <li key={`objetivo_estrategico_${index2}`}>{objetivo.objetivo}</li>
                          )
                        })}
                      </ol>


                      <hr/>
                    </React.Fragment>
                  )
              })}
            
            </Col>
            
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}
