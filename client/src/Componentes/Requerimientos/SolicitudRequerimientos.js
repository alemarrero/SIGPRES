import React, { Component } from 'react';
import './Requerimientos.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Table } from 'reactstrap';
import personal from '../../assets/img/personal.png';
import withContext from './../../Contenedor/withContext';

export class SolicitudRequerimientos extends Component {
  constructor(props){
    super(props);
    this.state = {
      entradas_solicitud_de_requerimientos: [],
      enviada: false,
      id: undefined,
      productos: [],
      entrada_id: undefined,
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
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_confirmacion_eliminar_entrada: false,
    };
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerUnidadDeMedida = this.obtenerUnidadDeMedida.bind(this);
    this.obtenerSubespecifica = this.obtenerSubespecifica.bind(this);
    this.obtenerEntradasSolicitudRequerimientos = this.obtenerEntradasSolicitudRequerimientos.bind(this);
    this.crearSolicitudDeRequerimientos = this.crearSolicitudDeRequerimientos.bind(this);
    this.eliminarSolicitudDeRequerimientos = this.eliminarSolicitudDeRequerimientos.bind(this);
    this.obtenerSolicitudDeRequerimientos = this.obtenerSolicitudDeRequerimientos.bind(this);
    this.enviarSolicitudDeRequerimientos = this.enviarSolicitudDeRequerimientos.bind(this);
    this.crearEntradaSolicitudRequerimiento = this.crearEntradaSolicitudRequerimiento.bind(this);
    this.editarEntradaSolicitudRequerimiento = this.editarEntradaSolicitudRequerimiento.bind(this);
    this.eliminarEntradaSolicitudRequerimientos = this.eliminarEntradaSolicitudRequerimientos.bind(this);    
    this.validarCreacionEntradaSolicitudDeRequerimiento = this.validarCreacionEntradaSolicitudDeRequerimiento.bind(this);
    this.validarEdicionEntradaSolicitudDeRequerimiento = this.validarEdicionEntradaSolicitudDeRequerimiento.bind(this);
    this.obtenerArea = this.obtenerArea.bind(this);
    this.verificarEntradaSolicitudRequerimiento = this.verificarEntradaSolicitudRequerimiento.bind(this);
    this.cargarModalEliminar = this.cargarModalEliminar.bind(this);
  }

  cargarModalEliminar(id) {
    this.setState({
      entrada_id: id,
      modal_confirmacion_eliminar_entrada_abierto: true
    });
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

  obtenerUnidadDeMedida(id){
    const producto = this.state.productos.filter(producto => producto.id === id);
    
    if(producto[0] !== undefined){
      return `${producto[0].unidad_de_medida.nombre}`    
    }
    else{
      return `N/A`
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

  async crearSolicitudDeRequerimientos() {
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          area_id: this.props.usuario.area_id,
          entradas_solicitud_de_requerimientos: this.state.entradas_solicitud_de_requerimientos
        })
      };
      const crear_solicitud_de_requerimientos_request = await fetch(`/api/solicitudes_de_requerimientos/crear_solicitud_de_requerimientos`, request_options);
      const crear_solicitud_de_requerimientos_response = await crear_solicitud_de_requerimientos_request.json();
      if(crear_solicitud_de_requerimientos_response !== 'err'){
        this.setState({id: crear_solicitud_de_requerimientos_response});
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error guardando la solicitud de requerimientos y necesidades"});
      }
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
      
      this.setState({modal_confirmacion_eliminar_abierto: false, modal_operacion_exitosa: true, mensaje: "Solicitud de requerimientos y necesidades eliminada correctamente"}, async () => {
      await this.crearSolicitudDeRequerimientos();
      await this.obtenerSolicitudDeRequerimientos();
        await this.obtenerEntradasSolicitudRequerimientos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando la solicitud de requerimientos y necesidades"});
    }
  }

  async enviarSolicitudDeRequerimientos(){
    if (this.state.entradas_solicitud_de_requerimientos.length > 0){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id
        })
      };

      const enviar_solicitud_requerimientos_request = await fetch(`/api/solicitudes_de_requerimientos/enviar_solicitud_de_requerimientos`, request_options);
      const enviar_solicitud_requerimientos_response = await enviar_solicitud_requerimientos_request.json();

      if(enviar_solicitud_requerimientos_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Solicitud de requerimientos enviada correctamente"}, async () => {
        await this.obtenerSolicitudDeRequerimientos();  
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de requerimientos"});
      }
    }
    else {
      this.setState({modal_operacion_fallida: true, mensaje: "Error enviando solicitud de requerimientos y necesidades, debe tener al menos un requerimiento."});      
    }
  }

  async obtenerSolicitudDeRequerimientos(){
    const solicitud_de_requerimientos_request = await fetch('/api/solicitudes_de_requerimientos/obtener_solicitud_de_requerimientos', {credentials: 'include'});
    const solicitud_de_requerimientos_response = await solicitud_de_requerimientos_request.json();

    if(solicitud_de_requerimientos_response !== 'err'){
      this.setState({...solicitud_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la solicitud de requerimientos"});
    }    
  }

  async verificarEntradaSolicitudRequerimiento(){
    if(this.state.id !== undefined){
      this.crearEntradaSolicitudRequerimiento();
      this.obtenerEntradasSolicitudRequerimientos();
    }
    else{
      this.crearSolicitudDeRequerimientos();
      this.crearEntradaSolicitudRequerimiento();
      this.obtenerEntradasSolicitudRequerimientos();
    }
  }
  async crearEntradaSolicitudRequerimiento() {
    if(this.validarCreacionEntradaSolicitudDeRequerimiento()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
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
          cantidad_diciembre: this.state.cantidad_diciembre,                                                  
          solicitud_id: this.state.id
        })
      };

      const crear_entrada_solicitud_de_requerimientos_request = await fetch(`/api/entradas_solicitud_de_requerimientos/crear_entrada_solicitud_de_requerimientos`, request_options);
      const crear_entrada_solicitud_de_requerimientos_response = await crear_entrada_solicitud_de_requerimientos_request.json();

      if(crear_entrada_solicitud_de_requerimientos_response !== 'err'){
        this.obtenerEntradasSolicitudRequerimientos();
      }
      else{
        this.setState({modal_crear_cargo_abierto: false, mensaje: "Error creando el requerimiento"});
      }
    }
  }

  async editarEntradaSolicitudRequerimiento(id){
    if(this.validarEdicionEntradaSolicitudDeRequerimiento(id)){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          cantidad_enero: document.getElementById(`cantidad_enero_requerimiento_${id}`).value,
          cantidad_febrero: document.getElementById(`cantidad_febrero_requerimiento_${id}`).value,
          cantidad_marzo: document.getElementById(`cantidad_marzo_requerimiento_${id}`).value,
          cantidad_abril: document.getElementById(`cantidad_abril_requerimiento_${id}`).value,
          cantidad_mayo: document.getElementById(`cantidad_mayo_requerimiento_${id}`).value,
          cantidad_junio: document.getElementById(`cantidad_junio_requerimiento_${id}`).value,
          cantidad_julio: document.getElementById(`cantidad_julio_requerimiento_${id}`).value,
          cantidad_agosto: document.getElementById(`cantidad_agosto_requerimiento_${id}`).value,
          cantidad_septiembre: document.getElementById(`cantidad_septiembre_requerimiento_${id}`).value,
          cantidad_octubre: document.getElementById(`cantidad_octubre_requerimiento_${id}`).value,
          cantidad_noviembre: document.getElementById(`cantidad_noviembre_requerimiento_${id}`).value,
          cantidad_diciembre: document.getElementById(`cantidad_diciembre_requerimiento_${id}`).value,                    
          producto_id: document.getElementById(`producto_id_entrada_solicitud_de_requerimientos_${id}`).value,
          id: id
        })
      };

      const editar_requerimiento_request = await fetch(`/api/entradas_solicitud_de_requerimientos/actualizar_entrada_solicitud_de_requerimientos`, request_options);
      const editar_requerimiento_response = await editar_requerimiento_request.json();

      if(editar_requerimiento_response !== 'err'){
        this.setState({modal_operacion_exitosa: true, mensaje: "Requerimiento de la solicitud actualizado correctamente"}, async () => {
          await this.obtenerEntradasSolicitudRequerimientos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error actualizando el requerimiento"});
      }
    }
  }

  async eliminarEntradaSolicitudRequerimientos(id){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: id
      })
    };

    const eliminar_requerimiento_request = await fetch(`/api/entradas_solicitud_de_requerimientos/eliminar_entrada_solicitud_de_requerimientos`, request_options);
    const eliminar_requerimiento_response = await eliminar_requerimiento_request.json();

    if(eliminar_requerimiento_response !== 'err'){
      this.setState({modal_confirmacion_eliminar_entrada_abierto: false, modal_operacion_exitosa: true, mensaje: "Requerimiento eliminado correctamente"}, async () => {
        await this.obtenerEntradasSolicitudRequerimientos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error eliminando el requerimiento"});
    }
  }

  async obtenerEntradasSolicitudRequerimientos(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        solicitud_id: this.state.id
      })
    };
    const entradas_solicitud_de_requerimientos_request = await fetch('/api/entradas_solicitud_de_requerimientos/obtener_entradas_solicitud_de_requerimientos', request_options);
    const entradas_solicitud_de_requerimientos_response = await entradas_solicitud_de_requerimientos_request.json();
    if(entradas_solicitud_de_requerimientos_response !== 'err'){
      this.setState({entradas_solicitud_de_requerimientos: entradas_solicitud_de_requerimientos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los requerimientos de la solicitud "});
    }

  } 

  async componentDidMount(){
    document.title = "SICMB - Solicitud de Requerimientos";
    await this.obtenerProductos();
    await this.obtenerSolicitudDeRequerimientos();
    if (this.state.id !== undefined){      
      this.obtenerEntradasSolicitudRequerimientos();
    }
    else{
      await this.crearSolicitudDeRequerimientos();
      this.obtenerSolicitudDeRequerimientos();

    }
  }

  validarCreacionEntradaSolicitudDeRequerimiento(){
    let formulario_valido = true;
    let requerimiento_existente = this.state.entradas_solicitud_de_requerimientos.filter(requerimiento => requerimiento.producto_id === this.state.producto_id);

    // Validación del cargo
    if(this.state.producto_id === undefined || requerimiento_existente.length > 0){
        document.getElementById("producto-creacion").style.display = 'block';
        formulario_valido = false;
      }
     else{
        document.getElementById("producto-creacion").style.display = 'none';
      }    
    
    // Validación de cantidad enero
    if(`${this.state.cantidad_enero}` === undefined || !`${this.state.cantidad_enero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-enero-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-enero-creacion").style.display = 'none';
    }
    
    // Validación de cantidad febrero
    if(`${this.state.cantidad_febrero}` === undefined || !`${this.state.cantidad_febrero}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-febrero-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-febrero-creacion").style.display = 'none';
    }

    // Validación de cantidad marzo
    if(`${this.state.cantidad_marzo}` === undefined || !`${this.state.cantidad_marzo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-marzo-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-marzo-creacion").style.display = 'none';
    }

    // Validación de cantidad abril
    if(`${this.state.cantidad_abril}` === undefined || !`${this.state.cantidad_abril}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-abril-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-abril-creacion").style.display = 'none';
    }

    // Validación de cantidad mayo
    if(`${this.state.cantidad_mayo}` === undefined || !`${this.state.cantidad_mayo}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-mayo-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-mayo-creacion").style.display = 'none';
    }      

    // Validación de cantidad junio
    if(`${this.state.cantidad_junio}` === undefined || !`${this.state.cantidad_junio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-junio-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-junio-creacion").style.display = 'none';
    }

    // Validación de cantidad julio
    if(`${this.state.cantidad_julio}` === undefined || !`${this.state.cantidad_julio}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-julio-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-julio-creacion").style.display = 'none';
    }

    // Validación de cantidad agosto
    if(`${this.state.cantidad_agosto}` === undefined || !`${this.state.cantidad_agosto}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-agosto-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-agosto-creacion").style.display = 'none';
    }

    // Validación de cantidad septiembre
    if(`${this.state.cantidad_septiembre}` === undefined || !`${this.state.cantidad_septiembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-septiembre-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-septiembre-creacion").style.display = 'none';
    }

    // Validación de cantidad octubre
    if(`${this.state.cantidad_octubre}` === undefined || !`${this.state.cantidad_octubre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-octubre-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-octubre-creacion").style.display = 'none';
    }

    // Validación de cantidad noviembre
    if(`${this.state.cantidad_noviembre}` === undefined || !`${this.state.cantidad_noviembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-noviembre-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-noviembre-creacion").style.display = 'none';
    }          
    
    // Validación de cantidad diciembre
    if(`${this.state.cantidad_diciembre}` === undefined || !`${this.state.cantidad_diciembre}`.match(/^[0-9]+$/)){
      document.getElementById("cantidad-diciembre-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cantidad-diciembre-creacion").style.display = 'none';
    }       

    return formulario_valido;
  }

  validarEdicionEntradaSolicitudDeRequerimiento(id){
    let formulario_valido = true;
    let cantidad_enero = document.getElementById(`cantidad_enero_requerimiento_${id}`).value;
    let cantidad_febrero = document.getElementById(`cantidad_febrero_requerimiento_${id}`).value;
    let cantidad_marzo = document.getElementById(`cantidad_marzo_requerimiento_${id}`).value;
    let cantidad_abril = document.getElementById(`cantidad_abril_requerimiento_${id}`).value;
    let cantidad_mayo = document.getElementById(`cantidad_mayo_requerimiento_${id}`).value;
    let cantidad_junio = document.getElementById(`cantidad_junio_requerimiento_${id}`).value;
    let cantidad_julio = document.getElementById(`cantidad_julio_requerimiento_${id}`).value;
    let cantidad_agosto = document.getElementById(`cantidad_agosto_requerimiento_${id}`).value;
    let cantidad_septiembre = document.getElementById(`cantidad_septiembre_requerimiento_${id}`).value;
    let cantidad_octubre = document.getElementById(`cantidad_octubre_requerimiento_${id}`).value;
    let cantidad_noviembre = document.getElementById(`cantidad_noviembre_requerimiento_${id}`).value;
    let cantidad_diciembre = document.getElementById(`cantidad_diciembre_requerimiento_${id}`).value;
    let producto_id = document.getElementById(`producto_id_entrada_solicitud_de_requerimientos_${id}`).value;    
    let requerimiento_existente = this.state.entradas_solicitud_de_requerimientos.filter(requerimiento => requerimiento.producto_id === producto_id && requerimiento.id !== id);
    
    // Validación del cargo
    if(producto_id === undefined || requerimiento_existente.length > 0){
      document.getElementById(`producto-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`producto-edicion-${id}`).style.display = 'none';
    }  
  
    // Validación de cantidad enero
    if(`${cantidad_enero}` === undefined || !`${cantidad_enero}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-enero-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-enero-edicion-${id}`).style.display = 'none';
    }
    
    // Validación de cantidad febrero
    if(`${cantidad_febrero}` === undefined || !`${cantidad_febrero}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-febrero-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-febrero-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad marzo
    if(`${cantidad_marzo}` === undefined || !`${cantidad_marzo}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-marzo-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-marzo-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad abril
    if(`${cantidad_abril}` === undefined || !`${cantidad_abril}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-abril-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-abril-edicion-${id}`).style.display = 'none';
    }

    // Validación de cantidad mayo
    if(`${cantidad_mayo}` === undefined || !`${cantidad_mayo}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-mayo-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-mayo-edicion-${id}`).style.display = 'none';
    }    
    
    // Validación de cantidad junio
    if(`${cantidad_junio}` === undefined || !`${cantidad_junio}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-junio-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-junio-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad julio
    if(`${cantidad_julio}` === undefined || !`${cantidad_julio}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-julio-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-julio-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad agosto
    if(`${cantidad_agosto}` === undefined || !`${cantidad_agosto}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-agosto-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-agosto-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad septiembre
    if(`${cantidad_septiembre}` === undefined || !`${cantidad_septiembre}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-septiembre-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-septiembre-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad octubre
    if(`${cantidad_octubre}` === undefined || !`${cantidad_octubre}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-octubre-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-octubre-edicion-${id}`).style.display = 'none';
    }
  
    // Validación de cantidad noviembre
    if(`${cantidad_noviembre}` === undefined || !`${cantidad_noviembre}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-noviembre-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-noviembre-edicion-${id}`).style.display = 'none';
    }          
    
    // Validación de cantidad diciembre
    if(`${cantidad_diciembre}` === undefined || !`${cantidad_diciembre}`.match(/^[0-9]+$/)){
      document.getElementById(`cantidad-diciembre-edicion-${id}`).style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById(`cantidad-diciembre-edicion-${id}`).style.display = 'none';
    }    
    return formulario_valido;
  }

 /* validarEdicionRequerimientoPersonal(id){
    let formulario_valido = true;
    let numero_personas = document.getElementById(`numero_personas_requerimiento_${id}`).value;
    let cargo_id = document.getElementById(`cargo_id_requerimiento_${id}`).value;
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id == cargo_id);
   
    // Validación del numero de personas por cargo 
    if(numero_personas === undefined || !numero_personas.match(/^[0-9]+$/)){
        document.getElementById("numero-persona-edicion").style.display = 'block';
        formulario_valido = false;
    }
    else{
        document.getElementById("numero-persona-edicion").style.display = 'none';
    }

    // Validación del cargo
    if(cargo_id === undefined || requerimiento_existente.length > 0){
      document.getElementById("cargo-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("cargo-edicion").style.display = 'none';
    }
    return formulario_valido;
  }
  
  validarCreacionRequerimientoPersonal(){
    let formulario_valido = true;
    let requerimiento_existente = this.state.requerimientos_personal.filter(requerimiento => requerimiento.cargo_id == this.state.cargo_id);

    // Validación del cargo
    if(this.state.cargo_id === undefined || requerimiento_existente.length > 0){
        document.getElementById("cargo-id-creacion").style.display = 'block';
        formulario_valido = false;
      }
     else{
        document.getElementById("cargo-id-creacion").style.display = 'none';
      }    
    
    // Validación del número de personas
    if(this.state.numero_personas === undefined || !this.state.numero_personas.match(/^[0-9]+$/)){
      document.getElementById("numero-personas-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("numero-personas-creacion").style.display = 'none';
    }
    return formulario_valido;
  }*/

  render() {

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_confirmacion_operacion = 
      <Modal isOpen={this.state.modal_confirmacion_operacion_abierto} toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_operacion_abierto: !this.state.modal_confirmacion_operacion_abierto})}>
          Enviar solicitud de requerimientos
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea enviar su solicitud de requerimientos y necesidades?</p>          
          <p>Si la envía no podrá modificarla luego.</p>
        </ModalBody>

        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <Button color="success" onClick={() => this.setState({modal_confirmacion_operacion_abierto: false}, async () => await this.enviarSolicitudDeRequerimientos())} className="boton-enviawait this.enviarSolicitudDeRequerimientos()ar-modal">
              Enviar
            </Button>   
            <Button color="danger" onClick={() => this.setState({modal_confirmacion_operacion_abierto: false})}>
              Cancelar
            </Button>
          </Col>
        </ModalFooter>

      </Modal>
    ;

    // Si al realizar cualquier operación ocurre algún error, se muestra este modal
    let modal_confirmacion_eliminar = 
      <Modal isOpen={this.state.modal_confirmacion_eliminar_abierto} toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_eliminar_abierto: !this.state.modal_confirmacion_eliminar_abierto})}>
          Eliminar solicitud de requerimientos y necesidades
        </ModalHeader>

        <ModalBody>
          <p>¿Seguro que desea eliminar su solicitud de requerimientos y necesidades?</p>          
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

    let modal_confirmacion_eliminar_entrada = 
    <Modal isOpen={this.state.modal_confirmacion_eliminar_entrada_abierto} toggle={() => this.setState({modal_confirmacion_eliminar_entrada_abierto: !this.state.modal_confirmacion_eliminar_entrada_abierto})}>
      <ModalHeader toggle={() => this.setState({modal_confirmacion_eliminar_entrada_abierto: !this.state.modal_confirmacion_eliminar_entrada_abierto})}>
        Eliminar entrada de requerimiento
      </ModalHeader>

      <ModalBody>
        <p>¿Seguro que desea eliminar este requerimiento?</p>          
      </ModalBody>

      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
          <Button color="danger" onClick={() => this.eliminarEntradaSolicitudRequerimientos(this.state.entrada_id)} className="boton-eliminar-solicitud">
            Eliminar
          </Button>   
          <Button color="danger" onClick={() => this.setState({modal_confirmacion_eliminar_entrada_abierto: false})}>
            Cancelar
          </Button>
        </Col>
      </ModalFooter>

    </Modal>
  ;    

    if(this.state.enviada){
        return (
            <Container fluid className="container-solicitud-de-requerimientos">

              <div>
                <Breadcrumb>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/`)}>Gestión de requerimientos de cada área</BreadcrumbItem>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/`)}>Requerimientos y Necesidades</BreadcrumbItem>
                  <BreadcrumbItem active>Solicitud de Requerimientos y Necesidades</BreadcrumbItem>

                </Breadcrumb>
              </div>

              {/* Modales del componente */}
              {modal_operacion_fallida}
              {modal_operacion_exitosa}
              {modal_confirmacion_eliminar}
              {modal_confirmacion_eliminar_entrada}
  
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
                      {this.obtenerArea(this.props.usuario.area_id)}
                    </th>
                  </tr>
                </tbody>
              </Table>
              </Row>
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidad-solicitante">                              
                <thead>
                  <tr>
                    <th colSpan="4" scope="colgroup"></th>                  
                    <th colSpan="12" scope="colgroup" className="text-center">Planificación Mensual</th>
                    <th colSpan="2" scope="colgroup" align="center"></th>
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
                                  <option value={producto.id} key={`producto_${producto.id}_${producto.index}`}>{producto.nombre}</option>
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
      else{        
        return(
            <Container fluid className="container-solicitud-de-requerimientos">

              <div>
                <Breadcrumb>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/`)}>Gestión de requerimientos de cada área</BreadcrumbItem>
                  <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/requerimientos/requerimientos-y-necesidades/`)}>Requerimientos y Necesidades</BreadcrumbItem>
                  <BreadcrumbItem active>Solicitud de Requerimientos y Necesidades</BreadcrumbItem>

                </Breadcrumb>
              </div>

            {/* Modales del componente */}
            {modal_operacion_fallida}
            {modal_operacion_exitosa}
            {modal_confirmacion_operacion}
            {modal_confirmacion_eliminar_entrada}

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
                    {this.obtenerArea(this.props.usuario.area_id)}
                    </th>
                </tr>
                </tbody>
            </Table>
            </Row>
                <Row className="row-unidades-de-medida">
                <Table striped className="tabla-solicitud-de-requerimientos">                                             
                <thead>
                    <tr>
                      <th colSpan="4" scope="colgroup"></th>                  
                      <th colSpan="12" scope="colgroup" className="text-center">Programación Mensual</th>
                      <th colSpan="2" scope="colgroup" align="center"></th>
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
                    <th>Opciones</th>
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
                            >
                                {this.state.productos.map((producto, index) => {
                                return(
                                    <option value={producto.id} key={`producto_${producto.id}_${producto.index}`}>{producto.nombre}</option>
                                )
                                })}
                            </Input>
                            <span id={`producto-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">No se pueden tener dos requerimientos con el mismo producto</span>                
                            </td>
                            <td>{this.obtenerUnidadDeMedida(entrada_solicitud_de_requerimientos.producto_id)}</td>
                            <td>                
                            <Input 
                                id={`cantidad_enero_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_enero}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-enero-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_febrero_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_febrero}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-febrero-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_marzo_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_marzo}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-marzo-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_abril_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_abril}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-abril-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>
                            <td>                
                            <Input 
                                id={`cantidad_mayo_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_mayo}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-mayo-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_junio_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_junio}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-junio-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_julio_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_julio}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-julio-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_agosto_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_agosto}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-agosto-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>
                            <td>                
                            <Input 
                                id={`cantidad_septiembre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_septiembre}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-septiembre-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_octubre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_octubre}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-octubre-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_noviembre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_noviembre}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-noviembre-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>  
                            <td>                
                            <Input 
                                id={`cantidad_diciembre_requerimiento_${entrada_solicitud_de_requerimientos.id}`}
                                defaultValue={entrada_solicitud_de_requerimientos.cantidad_diciembre}
                                className="solicitud-requerimientos"
                            />
                            <span id={`cantidad-diciembre-edicion-${entrada_solicitud_de_requerimientos.id}`} className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                        
                            </td>                                                        
                            <td>{entrada_solicitud_de_requerimientos.cantidad}</td>                                                                                                                                  
                            <td>
                            <Button 
                                color="info" className="boton-actualizar"
                                onClick={() => this.editarEntradaSolicitudRequerimiento(entrada_solicitud_de_requerimientos.id)}
                            >
                                <i className="iconos fa fa-redo-alt" aria-hidden="true"></i>                          
                                Actualizar
                            </Button>
                            <Button 
                                color="danger" className="boton-eliminar"
                                onClick={() => this.cargarModalEliminar(entrada_solicitud_de_requerimientos.id)}
                            >
                                <i className="iconos fa fa-trash-alt" aria-hidden="true"></i>                          
                                Eliminar
                            </Button>                          
                            </td>
                        </tr>
                        )
                    })}
                  <tr>
                    <th scope="row"></th>
                    <td>{this.obtenerSubespecifica(parseInt(this.state.producto_id, 10))}</td>
                    <td>
                    <Input 
                        type="select"
                        onChange={(e) => this.setState({producto_id: e.target.value})}
                        >
                        {this.state.productos.map((producto, index) => {
                        return(
                            <option value={producto.id} key={`producto_${producto.id}_${producto.index}`}>{producto.nombre}</option>
                        )
                        })}                            
                    </Input>
                    <span id="producto-creacion" className="error-solicitud-personal">No se pueden tener dos requerimientos con el mismo producto ni se puede dejar vacío este campo</span>                                
                    </td> 
                    <td>{this.obtenerUnidadDeMedida(parseInt(this.state.producto_id, 10))}</td>
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_enero}
                        onChange={(e) => this.setState({cantidad_enero: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-enero-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>   
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_febrero}
                        onChange={(e) => this.setState({cantidad_febrero: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-febrero-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_marzo}
                        onChange={(e) => this.setState({cantidad_marzo: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-marzo-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_abril}
                        onChange={(e) => this.setState({cantidad_abril: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-abril-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td> 
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_mayo}
                        onChange={(e) => this.setState({cantidad_mayo: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-mayo-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>   
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_junio}
                        onChange={(e) => this.setState({cantidad_junio: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-junio-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_julio}
                        onChange={(e) => this.setState({cantidad_julio: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-julio-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_agosto}
                        onChange={(e) => this.setState({cantidad_agosto: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-agosto-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td> 
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_septiembre}
                        onChange={(e) => this.setState({cantidad_septiembre: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-septiembre-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>   
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_octubre}
                        onChange={(e) => this.setState({cantidad_octubre: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-octubre-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_noviembre}
                        onChange={(e) => this.setState({cantidad_noviembre: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-noviembre-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>  
                    <td>                
                    <Input 
                        defaultValue = {this.state.cantidad_diciembre}
                        onChange={(e) => this.setState({cantidad_diciembre: parseInt(e.target.value, 10)})}
                        className="solicitud-requerimientos"
                    />
                    <span id="cantidad-diciembre-creacion" className="error-solicitud-personal">La cantidad mensual debe ser un número entero, sin decimales.</span>                                                      
                    </td>                                         
                    <td>{this.state.cantidad_abril + this.state.cantidad_enero + this.state.cantidad_febrero + this.state.cantidad_marzo + this.state.cantidad_mayo + this.state.cantidad_junio + this.state.cantidad_julio + this.state.cantidad_agosto + this.state.cantidad_septiembre + this.state.cantidad_octubre + this.state.cantidad_noviembre + this.state.cantidad_diciembre}</td>

                    <td>
                    <Button 
                        color="info" className="boton-actualizar-requerimientos"
                        onClick={() => this.verificarEntradaSolicitudRequerimiento()}
                    >
                        <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                        Agregar requerimiento
                    </Button>                         
                    </td>
                    </tr>
                    </tbody>                    
                </Table>
                </Row>        

                <Row>            
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                    <Button color="info" className="boton-enviar" onClick={() => this.setState({modal_confirmacion_operacion_abierto: true})}>
                    <i className="iconos fa fa-envelope" aria-hidden="true"></i>              
                    Enviar solicitud de requerimientos y necesidades
                    </Button>              
                </Col>                      
                </Row>
            </Container>      
        )
    }
}
}
export default withContext(SolicitudRequerimientos);