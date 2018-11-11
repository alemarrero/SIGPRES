import React, { Component } from 'react';
import './Antecedentes.css';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import areas from '../../assets/img/areas.png';

export default class Antecedentes extends Component {
  constructor(props){
    super(props);
    this.state = {
      antecedentes: [],
      inicio_periodo: 1950,
      fin_periodo: 1950,
      periodo: undefined,
      mision: undefined,
      vision: undefined,
      debilidades: undefined,
      fortalezas: undefined,
      amenazas: undefined,
      oportunidades: undefined,
      modal_operacion_fallida: false,
      modal_operacion_exitosa: false,
      modal_confirmacion_abierto: false,
      modal_crear_antecedente_abierto: true,
      mensaje: undefined,
    };
    this.obtenerAntecedentes = this.obtenerAntecedentes.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Antecedentes";
    this.obtenerAntecedentes();
  }

  async obtenerAntecedentes(){
    const request = await fetch("/api/antecedentes/obtener_antecedentes", {credentials: "include"});
    const response = await request.json();

    if(response !== "err"){
      this.setState({antecedentes: response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los antecedentes"});
    }
  }

  async eliminarAntecedente(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: parseInt(this.state.id)
      })
    }

    const eliminar_antecedente_request = await fetch('/api/antecedentes/eliminar_antecedente', request_options);
    const eliminar_antecedente_response = await eliminar_antecedente_request.json();

    if(eliminar_antecedente_response !== "err"){
      this.setState({
        modal_operacion_exitosa: true,
        mensaje: "Antecedente eliminado exitosamente"
      }, async () => {
        this.obtenerAntecedentes();
      });
    }
    else{
      this.setState({
        modal_operacion_fallida: true,
        mensaje: "Error al eliminar el antecedente"
      });
    }
  }

  render() {
    let años = [];

    for (let index = 1950; index < 2101; index++) {
      años.push(index);
    }

    // Modal de confirmación que se muestra antes de borrar un antecedente
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar antecedente
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar el antecedente?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="warning" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cerrar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarAntecedente()}>Eliminar</Button>
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

    let modal_crear_antecedente = 
      <Modal isOpen={this.state.modal_crear_antecedente_abierto} toggle={() => this.setState({modal_crear_antecedente_abierto: !this.state.modal_crear_antecedente_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_crear_antecedente_abierto: !this.state.modal_crear_antecedente_abierto})}>
          Crear antecedente
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col xs={12}>
                <Label>Periodo*</Label>
              </Col>


              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Inicio*</Label>
                <Input type="select" onChange={(e) => this.setState({inicio_periodo: e.target.value})}>
                  {años.map((año, index) => {
                    return(
                      <option value={año} key={`año_inicio_periodo_${index}`}>{año}</option>
                    )
                  })}
                </Input>
                <span className="error-antecedentes" id="error-inicio-periodo">Opción inválida. Seleccione una opción de la lista.</span>
              </Col>
              
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fin</Label>
                <Input type="select" onChange={(e) => this.setState({fin_periodo: e.target.value})}>
                  {años.map((año, index) => {
                    return(
                      <option value={año} key={`año_fin_periodo_${index}`}>{año}</option>
                    )
                  })}
                </Input>
                <span className="error-antecedentes" id="error-fin-periodo">Opción inválida. Seleccione una opción de la lista.</span>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <span className="error-antecedentes" id="error-periodo">El año de inicio no puede ser mayor al año de finalización</span>
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Misión*</Label>
                <Input onChange={(e) => this.setState({mision: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-mision">Misión inválida. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                
              </Col>

              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Visión*</Label>
                <Input onChange={(e) => this.setState({vision: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-mision">Visión inválida. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Fortalezas</Label>
                <Input onChange={(e) => this.setState({fortalezas: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-fortalezas">Fortalezas inválida. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                

              </Col>

              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Debilidades</Label>
                <Input onChange={(e) => this.setState({debilidades: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-debilidades">Debilidades inválida. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                

              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Oportunidades</Label>
                <Input onChange={(e) => this.setState({oportunidades: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-oportunidades">Oportunidades inválida. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                

              </Col>

              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Amenazas</Label>
                <Input onChange={(e) => this.setState({amenazas: e.target.value})} type="textarea"></Input>
                <span className="error-antecedentes" id="error-amenazas">Amenazas inválidas. El campo no puede estar vacío y puede tener hasta un máximo de 2000 caracteres.</span>                
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="success" onClick={this.crearAntecedente}>
              Crear
            </Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.setState({modal_crear_antecedente_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Container fluid className="container-unidades-de-medida">
        {/* Modales del componente */}
        {modal_confirmacion}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_crear_antecedente}

        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={areas} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Gestión de Antecedentes de la CMB</h1>
          </Col>

          {/* Botón para agregar áreas */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_antecedente_abierto: true})}>
              <i className="iconos fa fa-plus" aria-hidden="true"></i>              
              Agregar antecedente
            </Button>
          </Col>
        </Row>

        {/* Si existen áreas, muestra una tabla con su información */}
        {this.state.antecedentes.length > 0 ? 
          <Row className="row-unidades-de-medida">
            <Table striped className="tabla-unidades-de-medida">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Periodo</th>
                  <th className="text-right">Opciones</th>
                </tr>
              </thead>
                <tbody>
                  {this.state.antecedentes.map((antecedente, index) => {
                    return(
                      <tr key={`antecedente_${antecedente.id}`}>
                        <th scope="row">{antecedente.id}</th>
                        <td>{antecedente.periodo}</td>
                        <td className="text-right">
                          <Button 
                            color="info" className="boton-gestionar"
                            onClick={() => this.props.history.push(`detalle/${antecedente.id}`)}
                          >
                            <i class="iconos fa fa-eye" aria-hidden="true"></i>                          
                            Ver
                          </Button>

                          <Button 
                              color="info" className="boton-gestionar"
                              style={{margin: "auto 10px"}}
                              onClick={() => this.props.history.push(`/inicio/administracion/antecedentes/${antecedente.id}`)}
                          >
                              <i class="iconos fa fa-cogs" aria-hidden="true"></i>                          
                              Gestionar
                          </Button>

                          <Button 
                            color="danger" className="boton-gestionar"
                            onClick={() => this.setState({id: antecedente.id, modal_confirmacion_abierto: true})}
                          >
                            <i class="iconos fa fa-trash" aria-hidden="true"></i>                          
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </Table>
          </Row>
          :
          <Row>
            <Col xs={12} className="text-center">
              <h2>Aún no ha creado ningún antecedente de la CMB. <br/> Haga click en el botón "Agregar antecedente" para agregar uno nuevo.</h2>
            </Col>
          </Row>
        }
      </Container>
  )
  }
}
