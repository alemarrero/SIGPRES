import React, { Component } from 'react';
import './RequerimientosPersonal.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Table } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import withContext from '../../Contenedor/withContext';

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
      cantidad_enero: 0,
      cantidad_febrero: 0,
      cantidad_marzo: 0,
      cantidad_abril: 0,
      cantidad_mayo: 0,
      cantidad_junio: 0,
      cantidad_julio: 0,
      cantidad_agosto: 0,
      cantidad_septiembre: 0,
      cantidad_octubre: 0,
      cantidad_noviembre: 0,
      cantidad_diciembre: 0, 
      indice_producto: undefined,
      modal_operacion_fallida: false,
    };
    this.obtenerSubespecifica = this.obtenerSubespecifica.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerEntradasSolicitudDeRequerimientos = this.obtenerEntradasSolicitudDeRequerimientos.bind(this);
    this.obtenerSolicitudRequerimientos = this.obtenerSolicitudRequerimientos.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.obtenerUnidadDeMedida = this.obtenerUnidadDeMedida.bind(this);
    this.eliminarSolicitudDeRequerimientos = this.eliminarSolicitudDeRequerimientos.bind(this);
  }

  async eliminarSolicitudDeRequerimientos(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_solicitud_request = await fetch(`/api/solicitudes_de_requerimientos/eliminar_solicitud_de_requerimientos`, request_options);
    const eliminar_solicitud_response = await eliminar_solicitud_request.json();

    if(eliminar_solicitud_response !== 'err'){    
      this.setState({modal_confirmacion_eliminar_abierto: false, modal_operacion_exitosa: true, mensaje: "Solicitud de personal eliminada, vuelva a la pantalla anterior"}, async () => {  
        this.obtenerSolicitudRequerimientos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando la solicitud de personal"});
    }
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
    const solicitud_requerimientos_request = await fetch('/api/solicitudes_de_requerimientos/obtener_solicitud_de_requerimientos_enviada', request_options);
    const solicitud_requerimientos_response = await solicitud_requerimientos_request.json();

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

    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_eliminar_abierto} toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
          Eliminar solicitud de personal
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar su solicitud de personal?</p>          
          <p>Si la elimina no podrá recuperarla luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="danger" onClick={this.eliminarSolicitudDeRequerimientos} className="boton-eliminar-solicitud">
              Eliminar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;    

    return (
      <Container fluid className="container-solicitud-de-requerimientos">

      <div>
        <Breadcrumb>
          <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
          <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
          <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/`)}>Solicitudes de Requerimientos y Necesidades</BreadcrumbItem>
          <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/consultar-solicitudes-de-requerimientos`)}>Consultar Solicitudes de Requerimientos y Necesidades Enviadas</BreadcrumbItem>
          <BreadcrumbItem active>Consultar Solicitud de Requerimientos y Necesidades</BreadcrumbItem>

        </Breadcrumb>
      </div>

      {/* Modales del componente */}
      {modal_operacion_fallida}
      {modal_confirmacion_eliminar}
      {modal_operacion_exitosa}

      <Row>
        {/* Título de la sección */}
        <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
          <img src={personal} className="icono-titulo"/>    
          <h1 className="titulo-solicitud-personal">Solicitud de Requerimientos y Necesidades</h1>
        </Col>
      </Row>

      {/* Si existen cargos, muestra  tabla con su información */}
      <Row className="row-unidades-de-medida">
      <Table striped className="tabla-unidad-solicitante">
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
      <Table striped className="tabla-unidad-solicitante">                              
        <thead>
          <tr>
            <th colspan="4" scope="colgroup"></th>                  
            <th colspan="12" scope="colgroup" className="text-center">Planificación Mensual</th>
            <th colspan="2" scope="colgroup" align="center"></th>
          </tr>                   
          <tr>
            <th>ID</th>  
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
                    <td>{entrada_solicitud_de_requerimientos.cantidad_enero}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_febrero}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_marzo}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_abril}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_mayo}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_junio}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_julio}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_agosto}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_septiembre}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_octubre}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_noviembre}</td>
                    <td>{entrada_solicitud_de_requerimientos.cantidad_diciembre}</td>                                                        
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