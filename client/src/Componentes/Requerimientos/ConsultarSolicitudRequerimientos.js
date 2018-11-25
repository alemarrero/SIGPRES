import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import { request } from 'http';
import withContext from '../../Contenedor/withContext';

// https://www.flaticon.com/free-icon/compass_1156951


export class ConsultarSolicitudRequerimientos extends Component {
  constructor(props){
    super(props);
    this.state = {
      entradas_solicitud_de_requerimientos: [],
      id: undefined,
      productos: [],
      area_id: undefined,
      nombre_area: undefined,
      producto_id: undefined,
      cantidad: 0,
      cantidad_primer_trimestre: 0,
      cantidad_segundo_trimestre: 0,
      cantidad_tercer_trimestre: 0,
      cantidad_cuarto_trimestre: 0,
      indice_producto: undefined,
      modal_operacion_fallida: false,
    };
    this.obtenerSubespecifica = this.obtenerSubespecifica.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerEntradasSolicitudDeRequerimientos = this.obtenerEntradasSolicitudDeRequerimientos.bind(this);
    this.obtenerSolicitudRequerimientos = this.obtenerSolicitudRequerimientos.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.obtenerUnidadDeMedida = this.obtenerUnidadDeMedida.bind(this);
  }

  obtenerSubespecifica(id){
    const producto = this.state.productos.filter(producto => producto.id === id);
    
    if(producto[0] !== undefined){
      if(producto[0].especifica !== null){
        return `${producto[0].especifica.generica.partida_presupuestaria.numero_partida}.${producto[0].especifica.generica.numero_generica}.${producto[0].especifica.numero_especifica}.00`
      }
      else{
        return `${producto[0].subespecifica.especifica.generica.partida_presupuestaria.numero}.${producto[0].subespecifica.especifica.generica.numero_generica}.${producto[0].subespecifica.especifica.numero_especifica}.${producto[0].subespecifica.numero_subespecifica}`
      }
    }
    else{
      return `N/A`
    }    
  }

  obtenerUnidadDeMedida(id){
    const producto = this.state.productos.filter(producto => producto.id === id);
    
    if(producto[0] !== undefined){
      return `${producto[0].unidad_de_medida.nombre}`    
    }
    else{
      return `N/A`
    }
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

  async obtenerSolicitudRequerimientos(){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.props.match.params.id_solicitud
        })
      };
      console.log(this.props.match.params.id_solicitud);
    const solicitud_requerimientos_request = await fetch('/api/solicitudes_de_requerimientos/obtener_solicitud_de_requerimientos_enviada', request_options);
    const solicitud_requerimientos_response = await solicitud_requerimientos_request.json();
    console.log(solicitud_requerimientos_response);

    if(solicitud_requerimientos_response !== 'err'){
      this.setState({...solicitud_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la solicitud de personal"});
    }    
  }

  async obtenerEntradasSolicitudDeRequerimientos(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        solicitud_id: this.props.match.params.id_solicitud
      })
    };
    const entradas_solicitud_de_requerimientos_request = await fetch('/api/entradas_solicitud_de_requerimientos/obtener_entradas_solicitud_de_requerimientos', request_options);
    const entradas_solicitud_de_requerimientos_response = await entradas_solicitud_de_requerimientos_request.json();
    if(entradas_solicitud_de_requerimientos_response !== 'err'){
      this.setState({entradas_solicitud_de_requerimientos: entradas_solicitud_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los requerimientos de personal de la solicitud "});
    }

  }
  
  async obtenerProductos(){
    const productos_request = await fetch('/api/productos/obtener_productos', {credentials: 'include'});
    const productos_response = await productos_request.json();

    if(productos_response !== 'err'){
      if(productos_response.length > 0) {
        this.setState({producto_id: productos_response[0].id,productos: productos_response});
        }
        else{
          this.setState({productos: productos_response});
        }        
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los productos "});
    }
  }

  async componentDidMount(){
    document.title = "SICMB - Requerimientos de Personal";
    await this.obtenerProductos();
    await this.obtenerSolicitudRequerimientos();
    this.obtenerEntradasSolicitudDeRequerimientos();
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
            <img src={personal} className="icono-titulo"/>    
            <h1 className="titulo-solicitud-personal">Solicitud de Requerimientos y Necesidades</h1>
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
                {this.obtenerArea(this.props.usuario.area_id)}
              </th>
            </tr>
          </tbody>
        </Table>
        </Row>
        <Row className="row-unidades-de-medida">
        <Table striped className="tabla-unidades-de-medida">                              
          <thead>
            <tr>
              <th colspan="3" scope="colgroup"></th>                  
              <th colspan="4" scope="colgroup" className="text-center">Distribución Trimestral</th>
              <th colspan="1" scope="colgroup" align="center"></th>
            </tr>              
            <tr>
              <th>ID</th>  
              <th>Subespecífica</th>
              <th>Producto o Servicio</th>
              <th>Unidad de Medida</th>
              <th>I</th>
              <th>II</th>
              <th>III</th>
              <th>IV</th>
              <th>Cantidad Total</th>
            </tr>
          </thead>
            <tbody>
            {this.state.entradas_solicitud_de_requerimientos.map((entrada_solicitud_de_requerimientos, index) => {
                return(
                <tr key={`entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}>
                    <th scope="row">{entrada_solicitud_de_requerimientos.id}</th>
                    <td>{this.obtenerSubespecifica(entrada_solicitud_de_requerimientos.producto_id)}</td>
                    <td>
                      <Input
                        id={`producto_id_entrada_solicitud_de_requerimientos_${entrada_solicitud_de_requerimientos.id}`}                         
                        type="select"
                        defaultValue={entrada_solicitud_de_requerimientos.producto_id}
                        disabled={true}
                      >
                        {this.state.productos.map((producto, index) => {
                          return(
                            <option value={producto.id} key={`producto_${producto.index}`}>{producto.nombre}</option>
                          )
                        })}
                      </Input>
                      </td>
                      <td>{this.obtenerUnidadDeMedida(entrada_solicitud_de_requerimientos.producto_id)}</td> 
                      <td>{entrada_solicitud_de_requerimientos.cantidad_primer_trimestre}</td>
                      <td>{entrada_solicitud_de_requerimientos.cantidad_segundo_trimestre}</td>
                      <td>{entrada_solicitud_de_requerimientos.cantidad_tercer_trimestre}</td>
                      <td>{entrada_solicitud_de_requerimientos.cantidad_cuarto_trimestre}</td>
                      <td>{entrada_solicitud_de_requerimientos.cantidad}</td>
                </tr>
                )
            })}
            </tbody>
        </Table>
        </Row>                         

          {/* Botón para agregar cargos */}
        <Row>            
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: true})}>
              <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>              
              Eliminar solicitud de requerimientos y necesidades
            </Button>
          </Col>                      
        </Row>          
    </Container>
  )
  }      
  }
export default withContext(ConsultarSolicitudRequerimientos);