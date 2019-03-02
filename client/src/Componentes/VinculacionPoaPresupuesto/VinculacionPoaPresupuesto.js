import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import contabilidad from '../../assets/img/contabilidad.png';
import withContext from './../../Contenedor/withContext';
import './VinculacionPoaPresupuesto.css'

export class VinculacionPoaPresupuesto extends Component {
  constructor(props){
    super(props);
    this.state = {
      productos: [],
      acciones:[],
      vinculacion_acciones_productos: [],
      producto_id: undefined,
      accion_id: undefined,
      modal_crear_vinculacion_abierto: false,
      modal_editar_vinculacion_abierto: false,
      modal_confirmacion_eliminar_abierto: false,      
      nombre_accion: undefined,
      area_accion: undefined,
      precio_producto: 0,
      monto_iva: 0,
      total_producto: 0,
      monto_total_productos: 0,
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
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
    };
    this.obtenerVinculacionAccionesProductos = this.obtenerVinculacionAccionesProductos.bind(this);
    this.crearVinculacion = this.crearVinculacion.bind(this);
    this.cargarModalEditarVinculacion = this.cargarModalEditarVinculacion.bind(this);
    this.cargarModalEliminarVinculacion = this.cargarModalEliminarVinculacion.bind(this);
    this.editarVinculacion = this.editarVinculacion.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerAcciones = this.obtenerAcciones.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
    this.eliminarVinculacion = this.eliminarVinculacion.bind(this);
  }

  async obtenerVinculacionAccionesProductos(){
    const vinculacion_acciones_productos_request = await fetch('/api/vinculacion_acciones_productos/obtener_vinculacion_acciones_productos', {credentials: 'include'});
    const vinculacion_acciones_productos_response = await vinculacion_acciones_productos_request.json();

    if(vinculacion_acciones_productos_response !== 'err'){
      if(vinculacion_acciones_productos_response.length > 0) {
        this.setState({id: vinculacion_acciones_productos_response[0].id,vinculacion_acciones_productos: vinculacion_acciones_productos_response});
        }
        else{
          this.setState({vinculacion_acciones_productos: vinculacion_acciones_productos_response});
        }        
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la vinculacion de acciones y productos "});
    }
  }

  async obtenerAcciones(){
    const acciones_request = await fetch('/api/acciones_recurrentes/obtener_acciones_recurrentes_periodo_actual', {credentials: 'include'});
    const acciones_response = await acciones_request.json();

    if(acciones_response !== 'err'){
      if(acciones_response.length > 0) {
        this.setState({accion_id: acciones_response[0].accion_id,acciones: acciones_response});
        }
        else{
          this.setState({acciones: acciones_response});
        }        
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los acciones "});
    }
  }  
  
  obtenerArea(id){
    const area = this.props.areas.filter(area => area.id === id);
    
    if(area[0] !== undefined){
      return `${area[0].descripcion}`    
    }
    else{
      return `N/A`
    }
  }  
  
  async obtenerProductos(){
    const productos_request = await fetch('/api/productos/obtener_consolidado_presupuesto', {credentials: 'include'});
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

  async editarVinculacion(){
    if (this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          producto_id: this.state.producto_id,
          accion_id: this.state.accion_id,
          cantidad_enero: this.state.cantidad_enero,
          cantidad_febrero: this.state.cantidad_febrero,
          cantidad_marzo: this.state.cantidad_marzo,
          cantidad_abril: this.state.cantidad_abril,  
          cantidad_mayo: this.state.cantidad_mayo,
          cantidad_junio: this.state.cantidad_junio,
          cantidad_julio: this.state.cantidad_julio,
          cantidad_agosto: this.state.cantidad_agosto,  
          cantidad_septiembre: this.state.cantidad_septiembre,
          cantidad_octubre: this.state.cantidad_octubre,
          cantidad_noviembre: this.state.cantidad_noviembre,
          cantidad_diciembre: this.state.cantidad_diciembre          
        })
      };

      const editar_vinculacion_request = await fetch(`/api/vinculacion_acciones_productos/actualizar_vinculacion_accion_producto`, request_options);
      const editar_vinculacion_response = await editar_vinculacion_request.json();

      if(editar_vinculacion_response !== 'err'){
        this.setState({modal_editar_vinculacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Vinculación entre acción y producto editada correctamente"}, async () => {
          await this.obtenerVinculacionAccionesProductos();
          await this.obtenerProductos();
          this.obtenerAcciones();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_vinculacion_abierto: false, mensaje: "Error editando la vinculación entre acción y producto"});
      }
    }
  }

  async crearVinculacion() {
    if (this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          accion_id: this.state.accion_id,
          producto_id: this.state.producto_id,
          cantidad_enero: this.state.cantidad_enero,
          cantidad_febrero: this.state.cantidad_febrero,
          cantidad_marzo: this.state.cantidad_marzo,
          cantidad_abril: this.state.cantidad_abril,  
          cantidad_mayo: this.state.cantidad_mayo,
          cantidad_junio: this.state.cantidad_junio,
          cantidad_julio: this.state.cantidad_julio,
          cantidad_agosto: this.state.cantidad_agosto,  
          cantidad_septiembre: this.state.cantidad_septiembre,
          cantidad_octubre: this.state.cantidad_octubre,
          cantidad_noviembre: this.state.cantidad_noviembre,
          cantidad_diciembre: this.state.cantidad_diciembre          
        })
      };
      const crear_vinculacion_request = await fetch(`/api/vinculacion_acciones_productos/crear_vinculacion_accion_producto`, request_options);
      const crear_vinculacion_response = await crear_vinculacion_request.json();

      if(crear_vinculacion_response !== 'err'){
        this.setState({modal_crear_vinculacion_abierto: false, modal_operacion_exitosa: true, mensaje: "Vinculación entre acción recurrente y producto creada correctamente"}, async () => {
          await this.obtenerProductos();
          await this.obtenerAcciones();          
          await this.obtenerVinculacionAccionesProductos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_vinculacion_abierto: false, mensaje: "Error creando la vinculación entre acción y producto"});
      }
    }

  }

  async componentDidMount(){
    document.title = "SIGPRES CMB -Vinculación POA - Preuspuesto";
    await this.obtenerProductos();
    await this.obtenerAcciones();
    await this.obtenerVinculacionAccionesProductos();
  }

  async eliminarVinculacion(id){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: id
      })
    };

    const eliminar_requerimiento_personal_request = await fetch(`/api/vinculacion_acciones_productos/eliminar_vinculacion_accion_producto`, request_options);
    const eliminar_requerimiento_personal_response = await eliminar_requerimiento_personal_request.json();

    if(eliminar_requerimiento_personal_response !== 'err'){
      this.setState({modal_confirmacion_eliminar_abierto: false, modal_operacion_exitosa: true, mensaje: "Vinculación entre acción y producto eliminada correctamente"}, async () => {
        await this.obtenerProductos();
        await this.obtenerAcciones();        
        await this.obtenerVinculacionAccionesProductos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando la vinculación entre acción y producto"});
    }
  }

  cargarModalEditarVinculacion(ind) {
    const vinculacion_accion_producto = this.state.vinculacion_acciones_productos[ind];
    this.setState({
      id: vinculacion_accion_producto.id,
      accion_id: vinculacion_accion_producto.accion_id,
      producto_id: vinculacion_accion_producto.producto_id,
      modal_editar_vinculacion_abierto: true,
      cantidad_enero: vinculacion_accion_producto.cantidad_enero,
      cantidad_febrero: vinculacion_accion_producto.cantidad_febrero,
      cantidad_marzo: vinculacion_accion_producto.cantidad_marzo,
      cantidad_abril: vinculacion_accion_producto.cantidad_abril,
      cantidad_mayo: vinculacion_accion_producto.cantidad_mayo,
      cantidad_junio: vinculacion_accion_producto.cantidad_junio,
      cantidad_julio: vinculacion_accion_producto.cantidad_julio,
      cantidad_agosto: vinculacion_accion_producto.cantidad_agosto,
      cantidad_septiembre: vinculacion_accion_producto.cantidad_septiembre,
      cantidad_octubre: vinculacion_accion_producto.cantidad_octubre,
      cantidad_noviembre: vinculacion_accion_producto.cantidad_noviembre,
      cantidad_diciembre: vinculacion_accion_producto.cantidad_diciembre,

    });
  }

  cargarModalEliminarVinculacion(ind) {
    const vinculacion_accion_producto = this.state.vinculacion_acciones_productos[ind];
    this.setState({
      id: vinculacion_accion_producto.id,
      modal_confirmacion_eliminar_abierto: true
    });
  }


  validarModalCreacion(){
    let formulario_valido = true;
    let vinculacion_existente = this.state.vinculacion_acciones_productos.filter(vinculacion => vinculacion.accion_id === this.state.accion_id && vinculacion.producto_id === this.state.producto_id);

    // Validación de la vinculacion
    if(vinculacion_existente.length > 0){
      document.getElementById("vinculacion-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("vinculacion-modal-creacion").style.display = 'none';
    }    

    // Validación de cantidad enero
    if(`${this.state.cantidad_enero}` === undefined || !`${this.state.cantidad_enero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-enero-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-enero-modal-creacion").style.display = 'none';
    }
    
    // Validación de cantidad febrero
    if(`${this.state.cantidad_febrero}` === undefined || !`${this.state.cantidad_febrero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-febrero-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-febrero-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad marzo
    if(`${this.state.cantidad_marzo}` === undefined || !`${this.state.cantidad_marzo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-marzo-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-marzo-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad abril
    if(`${this.state.cantidad_abril}` === undefined || !`${this.state.cantidad_abril}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-abril-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-abril-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad mayo
    if(`${this.state.cantidad_mayo}` === undefined || !`${this.state.cantidad_mayo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-mayo-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-mayo-modal-creacion").style.display = 'none';
    }  

    // Validación de cantidad junio
    if(`${this.state.cantidad_junio}` === undefined || !`${this.state.cantidad_junio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-junio-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-junio-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad julio
    if(`${this.state.cantidad_julio}` === undefined || !`${this.state.cantidad_julio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-julio-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-julio-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad agosto
    if(`${this.state.cantidad_agosto}` === undefined || !`${this.state.cantidad_agosto}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-agosto-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-agosto-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad septiembre
    if(`${this.state.cantidad_septiembre}` === undefined || !`${this.state.cantidad_septiembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-septiembre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-septiembre-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad octubre
    if(`${this.state.cantidad_octubre}` === undefined || !`${this.state.cantidad_octubre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-octubre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-octubre-modal-creacion").style.display = 'none';
    }

    // Validación de cantidad noviembre
    if(`${this.state.cantidad_noviembre}` === undefined || !`${this.state.cantidad_noviembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-noviembre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-noviembre-modal-creacion").style.display = 'none';
    }          
    
    // Validación de cantidad diciembre
    if(`${this.state.cantidad_diciembre}` === undefined || !`${this.state.cantidad_diciembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-diciembre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-diciembre-modal-creacion").style.display = 'none';
    }       

    return formulario_valido;
  }

  validarModalEdicion(){
    let formulario_valido = true;
    let accion_id = parseInt(this.state.accion_id, 10);
    let producto_id = parseInt(this.state.producto_id, 10);
    let vinculacion_existente = this.state.vinculacion_acciones_productos.filter(vinculacion => vinculacion.accion_id === accion_id && vinculacion.producto_id === producto_id && vinculacion.id !== this.state.id);
    
    // Validación de la vinculacion
    if(vinculacion_existente.length > 0){
      document.getElementById("vinculacion-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("vinculacion-modal-edicion").style.display = 'none';
    }    

    // Validación de cantidad enero
    if(`${this.state.cantidad_enero}` === undefined || !`${this.state.cantidad_enero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-enero-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-enero-modal-edicion").style.display = 'none';
    }
    
    // Validación de cantidad febrero
    if(`${this.state.cantidad_febrero}` === undefined || !`${this.state.cantidad_febrero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-febrero-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-febrero-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad marzo
    if(`${this.state.cantidad_marzo}` === undefined || !`${this.state.cantidad_marzo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-marzo-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-marzo-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad abril
    if(`${this.state.cantidad_abril}` === undefined || !`${this.state.cantidad_abril}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-abril-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-abril-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad mayo
    if(`${this.state.cantidad_mayo}` === undefined || !`${this.state.cantidad_mayo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-mayo-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-mayo-modal-edicion").style.display = 'none';
    }  

    // Validación de cantidad junio
    if(`${this.state.cantidad_junio}` === undefined || !`${this.state.cantidad_junio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-junio-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-junio-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad julio
    if(`${this.state.cantidad_julio}` === undefined || !`${this.state.cantidad_julio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-julio-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-julio-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad agosto
    if(`${this.state.cantidad_agosto}` === undefined || !`${this.state.cantidad_agosto}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-agosto-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-agosto-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad septiembre
    if(`${this.state.cantidad_septiembre}` === undefined || !`${this.state.cantidad_septiembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-septiembre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-septiembre-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad octubre
    if(`${this.state.cantidad_octubre}` === undefined || !`${this.state.cantidad_octubre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-octubre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-octubre-modal-edicion").style.display = 'none';
    }

    // Validación de cantidad noviembre
    if(`${this.state.cantidad_noviembre}` === undefined || !`${this.state.cantidad_noviembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-noviembre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-noviembre-modal-edicion").style.display = 'none';
    }          
    
    // Validación de cantidad diciembre
    if(`${this.state.cantidad_diciembre}` === undefined || !`${this.state.cantidad_diciembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-diciembre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-diciembre-modal-edicion").style.display = 'none';
    }    
    return formulario_valido;
  }  

  render() {

    let modal_confirmacion_eliminar = 
    <Modal isOpen={this.state.modal_confirmacion_eliminar_abierto} toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
      <ModalHeader toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
        Eliminar vinculación
      </ModalHeader>

      <ModalBody>
        <p>¿Seguro que desea eliminar la vinculación entre el producto y la acción recurrente?</p>          
        <p>Si la elimina no podrá recuperarla luego.</p>
      </ModalBody>

      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
          <Button color="danger" onClick={() => this.setState(this.eliminarVinculacion(this.state.id))} className="boton-eliminar-solicitud">
            Eliminar
          </Button>   
          <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_abierto: false})}>
            Cancelar
          </Button>
        </Col>
      </ModalFooter>

    </Modal>
  ;
      
    // Modal que muestra el formulario para poder crear una nueva área
    let modal_crear_vinculacion_accion_producto = 
      <Modal isOpen={this.state.modal_crear_vinculacion_abierto} toggle={() => this.setState({modal_crear_vinculacion_abierto: !this.state.modal_crear_vinculacion_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_vinculacion_abierto: !this.state.modal_crear_vinculacion_abierto})}>
        Crear nueva vinculación entre acción recurrente y producto
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Nombre del área*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Acción recurrente*</Label>
              <Input
                type="select"
                onChange={(e) => this.setState({accion_id: e.target.value})}                
              >
                {this.state.acciones.map((accion, index) => {
                  return(
                    <option value={accion.accion_id} key={`accion_${accion.index}_${accion.id}`}>{accion.nombre}</option>
                  )
                })}
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            {/* Descripción del área*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Producto*</Label>
              <Input
                type="select"
                onChange={(e) => this.setState({producto_id: e.target.value})}                
              >
                {this.state.productos.map((producto, index) => {
                  return(
                    <option value={producto.id} key={`producto_${producto.index}_${producto.id}`}>{producto.producto}</option>
                  )
                })}
              </Input>
              <span id="vinculacion-modal-creacion" className="error-vinculacion">La vinculación entre este producto y acción ya existe.</span>                
            </Col>
          </FormGroup> 
          <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Programación Mensual de las Compras:</Label>
              </Col>
          </FormGroup>          
          <FormGroup row>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Enero</Label>
                <Input 
                  defaultValue={this.state.cantidad_enero}
                  onChange={(e) => this.setState({cantidad_enero: e.target.value})}
                />
              <span id="cantidad-enero-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Febrero</Label>
                <Input 
                  defaultValue={this.state.cantidad_febrero}
                  onChange={(e) => this.setState({cantidad_febrero: e.target.value})}
                />
              <span id="cantidad-febrero-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Marzo</Label>
                <Input 
                  defaultValue={this.state.cantidad_marzo}
                  onChange={(e) => this.setState({cantidad_marzo: e.target.value})}
                />
              <span id="cantidad-marzo-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Abril</Label>
                <Input 
                  defaultValue={this.state.cantidad_abril}
                  onChange={(e) => this.setState({cantidad_abril: e.target.value})}
                />
              <span id="cantidad-abril-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>                  
                                      
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Mayo</Label>
                <Input 
                  defaultValue={this.state.cantidad_mayo}
                  onChange={(e) => this.setState({cantidad_mayo: e.target.value})}
                />
              <span id="cantidad-mayo-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Junio</Label>
                <Input 
                  defaultValue={this.state.cantidad_junio}
                  onChange={(e) => this.setState({cantidad_junio: e.target.value})}
                />
              <span id="cantidad-junio-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Julio</Label>
                <Input 
                  defaultValue={this.state.cantidad_julio}
                  onChange={(e) => this.setState({cantidad_julio: e.target.value})}
                />
              <span id="cantidad-julio-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Agosto</Label>
                <Input 
                  defaultValue={this.state.cantidad_agosto}
                  onChange={(e) => this.setState({cantidad_agosto: e.target.value})}
                />
              <span id="cantidad-agosto-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>                                          
              
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Septiembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_septiembre}
                  onChange={(e) => this.setState({cantidad_septiembre: e.target.value})}
                />
              <span id="cantidad-septiembre-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Octubre</Label>
                <Input 
                  defaultValue={this.state.cantidad_octubre}
                  onChange={(e) => this.setState({cantidad_octubre: e.target.value})}
                />
              <span id="cantidad-octubre-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>

              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Noviembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_noviembre}
                  onChange={(e) => this.setState({cantidad_noviembre: e.target.value})}
                />
              <span id="cantidad-noviembre-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Diciembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_diciembre}
                  onChange={(e) => this.setState({cantidad_diciembre: e.target.value})}
                />
              <span id="cantidad-diciembre-modal-creacion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>                                          
              </FormGroup>                     

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearVinculacion} color="success" type="submit" className="boton-crear-modal-vinculacion">
            Crear vinculación de acción y producto
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_vinculacion_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un área existente
    let modal_editar_vinculacion = 
      <Modal isOpen={this.state.modal_editar_vinculacion_abierto} toggle={() => this.setState({modal_editar_vinculacion_abierto: !this.state.modal_editar_vinculacion_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_vinculacion_abierto: !this.state.modal_editar_vinculacion_abierto})}>
          Editar vinculacion entre acción recurrente y producto
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Nombre del área */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Acción recurrente</Label>
                <Input
                type="select"
                defaultValue={this.state.accion_id}
                onChange={(e) => this.setState({accion_id: e.target.value})}                
              >
                {this.state.acciones.map((accion, index) => {
                  return(
                    <option value={accion.accion_id} key={`accion_${accion.index}_${accion.id}`}>{accion.nombre}</option>
                  )
                })}
              </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              {/* Descripción del área */}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Producto</Label>
                <Input
                type="select"
                defaultValue={this.state.producto_id}
                onChange={(e) => this.setState({producto_id: e.target.value})}                
              >
                {this.state.productos.map((producto, index) => {
                  return(
                    <option value={producto.id} key={`producto_${producto.index}_${producto.id}`}>{producto.producto}</option>
                  )
                })}
              </Input>
              <span id="vinculacion-modal-edicion" className="error-vinculacion">La vinculación entre este producto y acción ya existe.</span>                
              </Col>
              </FormGroup>
              <FormGroup row>
              <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Programación Mensual de las Compras:</Label>
              </Col>
              </FormGroup>              
              <FormGroup row>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Enero</Label>
                <Input 
                  defaultValue={this.state.cantidad_enero}
                  onChange={(e) => this.setState({cantidad_enero: e.target.value})}
                />
              <span id="cantidad-enero-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Febrero</Label>
                <Input 
                  defaultValue={this.state.cantidad_febrero}
                  onChange={(e) => this.setState({cantidad_febrero: e.target.value})}
                />
              <span id="cantidad-febrero-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Marzo</Label>
                <Input 
                  defaultValue={this.state.cantidad_marzo}
                  onChange={(e) => this.setState({cantidad_marzo: e.target.value})}
                />
              <span id="cantidad-marzo-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Abril</Label>
                <Input 
                  defaultValue={this.state.cantidad_abril}
                  onChange={(e) => this.setState({cantidad_abril: e.target.value})}
                />
              <span id="cantidad-abril-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>                                          
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Mayo</Label>
                <Input 
                  defaultValue={this.state.cantidad_mayo}
                  onChange={(e) => this.setState({cantidad_mayo: e.target.value})}
                />
              <span id="cantidad-mayo-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Junio</Label>
                <Input 
                  defaultValue={this.state.cantidad_junio}
                  onChange={(e) => this.setState({cantidad_junio: e.target.value})}
                />
              <span id="cantidad-junio-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Julio</Label>
                <Input 
                  defaultValue={this.state.cantidad_julio}
                  onChange={(e) => this.setState({cantidad_julio: e.target.value})}
                />
              <span id="cantidad-julio-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Agosto</Label>
                <Input 
                  defaultValue={this.state.cantidad_agosto}
                  onChange={(e) => this.setState({cantidad_agosto: e.target.value})}
                />
              <span id="cantidad-agosto-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>                                          
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Septiembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_septiembre}
                  onChange={(e) => this.setState({cantidad_septiembre: e.target.value})}
                />
              <span id="cantidad-septiembre-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Octubre</Label>
                <Input 
                  defaultValue={this.state.cantidad_octubre}
                  onChange={(e) => this.setState({cantidad_octubre: e.target.value})}
                />
              <span id="cantidad-octubre-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Noviembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_noviembre}
                  onChange={(e) => this.setState({cantidad_noviembre: e.target.value})}
                />
              <span id="cantidad-noviembre-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                              
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Label>Diciembre</Label>
                <Input 
                  defaultValue={this.state.cantidad_diciembre}
                  onChange={(e) => this.setState({cantidad_diciembre: e.target.value})}
                />
              <span id="cantidad-diciembre-modal-edicion" className="error-vinculacion">La cantidad mensual debe ser un número entero, sin decimales.</span>                
              </Col>                                          
              </FormGroup>              

          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarVinculacion} className="boton-crear-modal-vinculacion">
              Editar vinculación
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_editar_vinculacion_abierto: false})} className="boton-cancelar-modal">
              Cancelar
            </Button>
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

    return (
        <Container fluid className="container-solicitud-de-requerimientos">

          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
              <BreadcrumbItem active>Vinculación POA - Presupuesto</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_vinculacion_accion_producto}
          {modal_editar_vinculacion}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}
          {modal_confirmacion_eliminar}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={contabilidad} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Vinculación POA - Presupuesto</h1>
            </Col>

            {/* Botón para agregar áreas */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_vinculacion_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar nueva vinculación entre acción y producto
              </Button>
              <a target="_blank" href="http://sicmb.herokuapp.com/api/vinculacion_acciones_productos/obtener_reporte_vinculacion_acciones_productos">
                <Button color="info" className="boton-agregar" style={{marginLeft: "10px"}}>    
                  <i className="iconos fa fa-download" aria-hidden="true"></i>  Descargar reporte
                </Button>                        
              </a>   

              <a target="_blank" href="http://sicmb.herokuapp.com/api/vinculacion_acciones_productos/obtener_poa_financiero_full">
                <Button color="info" className="boton-agregar" style={{marginLeft: "10px"}}>    
                  <i className="iconos fa fa-download" aria-hidden="true"></i>  Descargar POA Financiero
                </Button>                        
              </a>              
            </Col>
          </Row>

          {/* Si existen áreas, muestra una tabla con su información */}
          {this.state.vinculacion_acciones_productos.length > 0 && 
          <Row className="row-unidades-de-medida">
          <Table striped className="tabla-solicitud-de-requerimientos">                              
            <thead>  
              <tr>
                <th colSpan="11" scope="colgroup"></th>                  
                <th colSpan="12" scope="colgroup" className="text-center">Planificación Mensual de las Compras</th>
                <th colSpan="3" scope="colgroup" align="center"></th>
              </tr>                               
              <tr>
                <th>N° de Acción</th>
                <th>Unidad Ejecutora</th>
                <th>Nombre de la Acción</th>
                <th>Código</th>
                <th>Producto</th>
                <th>Unidad de Medida</th>
                <th>Subespecífica</th>
                <th>Denominación</th>
                <th>Precio Unitario</th>
                <th>IVA</th>
                <th>Monto Total</th>              
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
                <th>Monto total</th>
                <th>Opciones</th>
              </tr>
            </thead>
                <tbody>
                {this.state.vinculacion_acciones_productos.map((vinculacion, index) => {
                    return(                       
                    <tr key={`vinculacion_${vinculacion.id}_${index}`}>
                        <td>{vinculacion.accion_id}</td>
                        <td>{this.obtenerArea(vinculacion.area_id)}</td>
                        <td>{vinculacion.nombre_accion}</td>
                        <td>{vinculacion.codigo_producto}</td>
                        <td>{vinculacion.producto}</td>
                        <td>{vinculacion.unidad_de_medida}</td> 
                        <td>{vinculacion.subespecifica}</td>
                        <td>{vinculacion.denominacion}</td>
                        <td>{vinculacion.precio_producto}</td>
                        <td>{vinculacion.iva_producto}</td>
                        <td>{vinculacion.precio_total_producto}</td>
                        <td>{vinculacion.cantidad_enero}</td>
                        <td>{vinculacion.cantidad_febrero}</td>
                        <td>{vinculacion.cantidad_marzo}</td>
                        <td>{vinculacion.cantidad_abril}</td>
                        <td>{vinculacion.cantidad_mayo}</td>
                        <td>{vinculacion.cantidad_junio}</td>
                        <td>{vinculacion.cantidad_julio}</td>
                        <td>{vinculacion.cantidad_agosto}</td>
                        <td>{vinculacion.cantidad_septiembre}</td>
                        <td>{vinculacion.cantidad_octubre}</td>
                        <td>{vinculacion.cantidad_noviembre}</td>
                        <td>{vinculacion.cantidad_diciembre}</td>
                        <td>{vinculacion.cantidad_total}</td>
                        <td>{vinculacion.monto_total_producto}</td>
                        <td>
                          <Button 
                            color="info" className="boton-actualizar"
                            onClick={() => this.cargarModalEditarVinculacion(index)}
                          >
                            <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                            Editar
                          </Button>
                          <Button 
                            color="danger" className="boton-eliminar"
                            onClick={() => this.cargarModalEliminarVinculacion(index)}
                          >
                            <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>                          
                            Eliminar
                          </Button>                          
                        </td>                        
                    </tr>
                    )
                })}
                </tbody>
              </Table>
              </Row>
          }
        </Container>
    )
  }
}

export default withContext(VinculacionPoaPresupuesto);