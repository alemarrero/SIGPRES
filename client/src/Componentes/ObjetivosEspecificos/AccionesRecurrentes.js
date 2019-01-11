import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table} from 'reactstrap';
import objetivos_especificos from "./../../assets/img/objetivos_especificos.png";
import './AccionesRecurrentes.css';

export default class AccionesRecurrentes extends Component {
  constructor(props){
    super(props);
    this.state = {
      objetivo_especifico_id: undefined,
      acciones_recurrentes: [],
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      modal_crear_accion_recurrente_abierto: false,
      modal_editar_accion_recurrente_abierto: false,
      modal_confirmacion_abierto: false,
      mensaje: undefined,
      objetivo_especifico: undefined,
      id: undefined,
      accion_recurrente: undefined,
      unidad_medida_id: undefined,
      meta_fisica_anual: undefined,
      programacion_enero: 0,
      programacion_febrero: 0,
      programacion_marzo: 0,
      programacion_abril: 0,
      programacion_mayo: 0,
      programacion_junio: 0,
      programacion_julio: 0,
      programacion_agosto: 0,
      programacion_septiembre: 0,
      programacion_octubre: 0,
      programacion_noviembre: 0,
      programacion_diciembre: 0,
      medio_verificacion_id: undefined,
      unidades_de_medida: [],
      medios_de_verificacion: [],
    };
    this.string_regex = /^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F0-9]+)*$/;
    this.cargarModalEdicion = this.cargarModalEdicion.bind(this);
    this.crearAccionRecurrente = this.crearAccionRecurrente.bind(this);
    this.editarAccionRecurrente = this.editarAccionRecurrente.bind(this);
    this.eliminarAccionRecurrente = this.eliminarAccionRecurrente.bind(this);
    this.obtenerAccionesRecurrentes = this.obtenerAccionesRecurrentes.bind(this);
    this.obtenerInformacionObjetivoEspecifico = this.obtenerInformacionObjetivoEspecifico.bind(this);
    this.obtenerMediosDeVerificacion = this.obtenerMediosDeVerificacion.bind(this);
    this.obtenerNombreMedioDeVerificacion = this.obtenerNombreMedioDeVerificacion.bind(this);
    this.obtenerNombreUnidadDeMedida = this.obtenerNombreUnidadDeMedida.bind(this);
    this.obtenerUnidadesDeMedida = this.obtenerUnidadesDeMedida.bind(this);
    this.validarCreacionAccionRecurrente = this.validarCreacionAccionRecurrente.bind(this);
    this.validarEdicionAccionRecurrente = this.validarEdicionAccionRecurrente.bind(this);
  }

  obtenerNombreUnidadDeMedida(id){
    const unidad = this.state.unidades_de_medida.filter(_unidad => _unidad.id === id);
    
    if(unidad[0] !== undefined){
      return unidad[0].nombre;
    }
    else{
      "N/A"
    }
  }
  
  obtenerNombreMedioDeVerificacion(id){
    const medio = this.state.medios_de_verificacion.filter(_medio => _medio.id === id);

    if(medio[0] !== undefined){
      return medio[0].nombre;
    }
    else{
      "N/A"
    }
  }

  async obtenerInformacionObjetivoEspecifico(){
    const request_options = {
      method: "POST",
      crendentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.props.match.params.id
      })
    }
    const request = await fetch("/api/objetivos_especificos/obtener_objetivo", request_options);
    const response = await request.json();
    
    if(response !== "err"){
      this.setState({objetivo_especifico: response.objetivo});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener la información del objetivo específico asociado"});
    }
  }

  async componentDidMount(){
    document.title = "SICMB - Gestión de Acciones Recurrentes";
    this.obtenerAccionesRecurrentes();
    this.obtenerMediosDeVerificacion();
    this.obtenerUnidadesDeMedida();
    this.obtenerInformacionObjetivoEspecifico();
  }

  async crearAccionRecurrente(){
    if(this.validarCreacionAccionRecurrente()){
      let meta_fisica_anual = parseInt(this.state.programacion_enero, 10) + parseInt(this.state.programacion_febrero, 10) + parseInt(this.state.programacion_marzo, 10) + parseInt(this.state.programacion_abril, 10)
      + parseInt(this.state.programacion_mayo, 10) + parseInt(this.state.programacion_junio, 10) + parseInt(this.state.programacion_julio, 10) + parseInt(this.state.programacion_agosto, 10) + parseInt(this.state.programacion_septiembre, 10) + 
      parseInt(this.state.programacion_octubre, 10) + parseInt(this.state.programacion_noviembre, 10) +parseInt(this.state.programacion_diciembre, 10);

      const request_options = {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          objetivo_especifico_id: this.props.match.params.id,
          accion_recurrente: this.state.accion_recurrente,
          unidad_medida_id: this.state.unidad_medida_id,
          meta_fisica_anual: meta_fisica_anual,
          programacion_enero: this.state.programacion_enero,
          programacion_febrero: this.state.programacion_febrero,
          programacion_marzo: this.state.programacion_marzo,
          programacion_abril: this.state.programacion_abril,
          programacion_mayo: this.state.programacion_mayo,
          programacion_junio: this.state.programacion_junio,
          programacion_julio: this.state.programacion_julio,
          programacion_agosto: this.state.programacion_agosto,
          programacion_septiembre: this.state.programacion_septiembre,
          programacion_octubre: this.state.programacion_octubre,
          programacion_noviembre: this.state.programacion_noviembre,
          programacion_diciembre: this.state.programacion_diciembre,
          medio_verificacion_id: this.state.medio_verificacion_id,
        })
      };

      const crear_accion_recurrente_request = await fetch('/api/acciones_recurrentes/crear_accion_recurrente', request_options);
      const crear_accion_recurrente_response = await crear_accion_recurrente_request.json(); 

      if(crear_accion_recurrente_response !== "err"){
        this.setState({modal_crear_accion_recurrente_abierto: false, modal_operacion_exitosa: true, mensaje: "Acción recurrente creada correctamente"}, async () => {
          this.obtenerAccionesRecurrentes();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error al crear la acción recurrente"});
      }
    }
  }

  validarCreacionAccionRecurrente(){
    let formulario_valido = true;

    if(this.state.accion_recurrente === undefined || state.accion_recurrente === ""){
      formulario_valido = false;
      document.getElementById("accion_recurrente-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("accion_recurrente-modal-creacion").style.display = "none";
    }

    if(this.state.unidad_medida_id === undefined){
      formulario_valido = false;
      document.getElementById("unidad_medida_id-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("unidad_medida_id-modal-creacion").style.display = "none";
    }

    const programacion_enero = this.state.programacion_enero !== undefined ? parseInt(this.state.programacion_enero, 10) : 0;
    const programacion_febrero = this.state.programacion_febrero !== undefined ? parseInt(this.state.programacion_febrero, 10) : 0;
    const programacion_marzo = this.state.programacion_marzo !== undefined ? parseInt(this.state.programacion_marzo, 10) : 0;
    const programacion_abril = this.state.programacion_abril !== undefined ? parseInt(this.state.programacion_abril, 10) : 0;
    const programacion_mayo = this.state.programacion_mayo !== undefined ? parseInt(this.state.programacion_mayo, 10) : 0;
    const programacion_junio = this.state.programacion_junio !== undefined ? parseInt(this.state.programacion_junio, 10) : 0;
    const programacion_julio = this.state.programacion_julio !== undefined ? parseInt(this.state.programacion_julio, 10) : 0;
    const programacion_agosto = this.state.programacion_agosto !== undefined ? parseInt(this.state.programacion_agosto, 10) : 0;
    const programacion_septiembre = this.state.programacion_septiembre !== undefined ? parseInt(this.state.programacion_septiembre, 10) : 0;
    const programacion_octubre = this.state.programacion_octubre !== undefined ? parseInt(this.state.programacion_octubre, 10) : 0;
    const programacion_noviembre = this.state.programacion_noviembre !== undefined ? parseInt(this.state.programacion_noviembre, 10) : 0;
    const programacion_diciembre = this.state.programacion_diciembre !== undefined ? parseInt(this.state.programacion_diciembre, 10) : 0;

    const suma_programacion_trimestral = programacion_enero + programacion_febrero + programacion_marzo + programacion_abril + programacion_mayo + programacion_junio + 
    programacion_julio + programacion_agosto + programacion_septiembre + programacion_octubre + programacion_noviembre + programacion_diciembre;


    if(this.state.programacion_enero === undefined || !/^[0-9]+$/.test(this.state.programacion_enero)){
      formulario_valido = false;
      document.getElementById("programacion_enero-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_enero-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_febrero === undefined || !/^[0-9]+$/.test(this.state.programacion_febrero)){
      formulario_valido = false;
      document.getElementById("programacion_febrero-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_febrero-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_marzo === undefined || !/^[0-9]+$/.test(this.state.programacion_marzo)){
      formulario_valido = false;
      document.getElementById("programacion_marzo-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_marzo-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_abril === undefined || !/^[0-9]+$/.test(this.state.programacion_abril)){
      formulario_valido = false;
      document.getElementById("programacion_abril-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_abril-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_mayo === undefined || !/^[0-9]+$/.test(this.state.programacion_mayo)){
      formulario_valido = false;
      document.getElementById("programacion_mayo-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_mayo-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_mayo === undefined || !/^[0-9]+$/.test(this.state.programacion_mayo)){
      formulario_valido = false;
      document.getElementById("programacion_mayo-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_mayo-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_junio === undefined || !/^[0-9]+$/.test(this.state.programacion_junio)){
      formulario_valido = false;
      document.getElementById("programacion_junio-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_junio-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_julio === undefined || !/^[0-9]+$/.test(this.state.programacion_julio)){
      formulario_valido = false;
      document.getElementById("programacion_julio-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_julio-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_agosto === undefined || !/^[0-9]+$/.test(this.state.programacion_agosto)){
      formulario_valido = false;
      document.getElementById("programacion_agosto-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_agosto-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_septiembre === undefined || !/^[0-9]+$/.test(this.state.programacion_septiembre)){
      formulario_valido = false;
      document.getElementById("programacion_septiembre-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_septiembre-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_octubre === undefined || !/^[0-9]+$/.test(this.state.programacion_octubre)){
      formulario_valido = false;
      document.getElementById("programacion_octubre-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_octubre-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_noviembre === undefined || !/^[0-9]+$/.test(this.state.programacion_noviembre)){
      formulario_valido = false;
      document.getElementById("programacion_noviembre-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_noviembre-modal-creacion").style.display = "none";
    }

    if(this.state.programacion_diciembre === undefined || !/^[0-9]+$/.test(this.state.programacion_diciembre)){
      formulario_valido = false;
      document.getElementById("programacion_diciembre-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("programacion_diciembre-modal-creacion").style.display = "none";
    }

    if(this.state.medio_verificacion_id === undefined){
      formulario_valido = false;
      document.getElementById("medio_verificacion_id-modal-creacion").style.display = "block";
    }
    else{
      document.getElementById("medio_verificacion_id-modal-creacion").style.display = "none";
    }

    return formulario_valido; 
  }

  async editarAccionRecurrente(){
    if(this.validarEdicionAccionRecurrente()){
      let meta_fisica_anual = this.state.programacion_enero + this.state.programacion_febrero + this.state.programacion_marzo + this.state.programacion_abril + this.state.programacion_mayo + this.state.programacion_junio + this.state.programacion_julio + this.state.programacion_agosto + this.state.programacion_septiembre +  this.state.programacion_octubre + this.state.programacion_noviembre + this.state.programacion_diciembre;

      const request_options = {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          objetivo_especifico_id: this.props.match.params.id,
          accion_recurrente: this.state.accion_recurrente,
          unidad_medida_id: this.state.unidad_medida_id,
          meta_fisica_anual: meta_fisica_anual,
          programacion_enero: this.state.programacion_enero,
          programacion_febrero: this.state.programacion_febrero,
          programacion_marzo: this.state.programacion_marzo,
          programacion_abril: this.state.programacion_abril,
          programacion_mayo: this.state.programacion_mayo,
          programacion_junio: this.state.programacion_junio,
          programacion_julio: this.state.programacion_julio,
          programacion_agosto: this.state.programacion_agosto,
          programacion_septiembre: this.state.programacion_septiembre,
          programacion_octubre: this.state.programacion_octubre,
          programacion_noviembre: this.state.programacion_noviembre,
          programacion_diciembre: this.state.programacion_diciembre,
          medio_verificacion_id: this.state.medio_verificacion_id,
          id: this.state.id
        })
      };

      const modificar_accion_recurrente_request = await fetch('/api/acciones_recurrentes/modificar_accion_recurrente', request_options);
      const modificar_accion_recurrente_response = await modificar_accion_recurrente_request.json(); 

      if(modificar_accion_recurrente_response !== "err"){
        this.setState({modal_editar_accion_recurrente_abierto: false, modal_operacion_exitosa: true, mensaje: "Acción recurrente editada correctamente"}, async () => {
          this.obtenerAccionesRecurrentes();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, mensaje: "Error al editar la acción recurrente"});
      }
    }
  }

  validarEdicionAccionRecurrente(){
    let formulario_valido = true;

    if(this.state.accion_recurrente === undefined || this.state.accion_recurrente === ""){
      formulario_valido = false;
      document.getElementById("accion_recurrente-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("accion_recurrente-modal-edicion").style.display = "none";
    }

    if(this.state.unidad_medida_id === undefined){
      formulario_valido = false;
      document.getElementById("unidad_medida_id-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("unidad_medida_id-modal-edicion").style.display = "none";
    }

    const programacion_enero = this.state.programacion_enero !== undefined ? parseInt(this.state.programacion_enero, 10) : 0;
    const programacion_febrero = this.state.programacion_febrero !== undefined ? parseInt(this.state.programacion_febrero, 10) : 0;
    const programacion_marzo = this.state.programacion_marzo !== undefined ? parseInt(this.state.programacion_marzo, 10) : 0;
    const programacion_abril = this.state.programacion_abril !== undefined ? parseInt(this.state.programacion_abril, 10) : 0;

    const suma_programacion_trimestral = programacion_enero + programacion_febrero + programacion_marzo + programacion_abril;


    if(this.state.programacion_enero === undefined || !/^[0-9]+$/.test(this.state.programacion_enero)){
      formulario_valido = false;
      document.getElementById("programacion_enero-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_enero-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_febrero === undefined || !/^[0-9]+$/.test(this.state.programacion_febrero)){
      formulario_valido = false;
      document.getElementById("programacion_febrero-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_febrero-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_marzo === undefined || !/^[0-9]+$/.test(this.state.programacion_marzo)){
      formulario_valido = false;
      document.getElementById("programacion_marzo-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_marzo-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_abril === undefined || !/^[0-9]+$/.test(this.state.programacion_abril)){
      formulario_valido = false;
      document.getElementById("programacion_abril-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_abril-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_mayo === undefined || !/^[0-9]+$/.test(this.state.programacion_mayo)){
      formulario_valido = false;
      document.getElementById("programacion_mayo-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_mayo-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_mayo === undefined || !/^[0-9]+$/.test(this.state.programacion_mayo)){
      formulario_valido = false;
      document.getElementById("programacion_mayo-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_mayo-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_junio === undefined || !/^[0-9]+$/.test(this.state.programacion_junio)){
      formulario_valido = false;
      document.getElementById("programacion_junio-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_junio-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_julio === undefined || !/^[0-9]+$/.test(this.state.programacion_julio)){
      formulario_valido = false;
      document.getElementById("programacion_julio-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_julio-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_agosto === undefined || !/^[0-9]+$/.test(this.state.programacion_agosto)){
      formulario_valido = false;
      document.getElementById("programacion_agosto-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_agosto-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_septiembre === undefined || !/^[0-9]+$/.test(this.state.programacion_septiembre)){
      formulario_valido = false;
      document.getElementById("programacion_septiembre-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_septiembre-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_octubre === undefined || !/^[0-9]+$/.test(this.state.programacion_octubre)){
      formulario_valido = false;
      document.getElementById("programacion_octubre-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_octubre-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_noviembre === undefined || !/^[0-9]+$/.test(this.state.programacion_noviembre)){
      formulario_valido = false;
      document.getElementById("programacion_noviembre-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_noviembre-modal-edicion").style.display = "none";
    }

    if(this.state.programacion_diciembre === undefined || !/^[0-9]+$/.test(this.state.programacion_diciembre)){
      formulario_valido = false;
      document.getElementById("programacion_diciembre-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("programacion_diciembre-modal-edicion").style.display = "none";
    }


    if(this.state.medio_verificacion_id === undefined){
      formulario_valido = false;
      document.getElementById("medio_verificacion_id-modal-edicion").style.display = "block";
    }
    else{
      document.getElementById("medio_verificacion_id-modal-edicion").style.display = "none";
    }

    return formulario_valido; 
  }

  cargarModalEdicion(index){
    const accion = this.state.acciones_recurrentes[index];

    this.setState({
      ...accion, 
      modal_editar_accion_recurrente_abierto: true
    });
  }

  async eliminarAccionRecurrente(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const eliminar_accion_recurrente_request = await fetch('/api/acciones_recurrentes/eliminar_accion_recurrente', request_options);
    const eliminar_accion_recurrente_response = await eliminar_accion_recurrente_request.json();

    if(eliminar_accion_recurrente_response !== "err"){
      this.setState({
        modal_editar_accion_recurrente_abierto: false,
        modal_confirmacion_abierto: false, 
        modal_operacion_exitosa: true, 
        mensaje: "Acción recurrente eliminada correctamente"
      }, async () => {
        this.obtenerAccionesRecurrentes();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al eliminar la acción recurrente"});
    }
  }


  async obtenerAccionesRecurrentes(){
    const request_options = {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        objetivo_especifico_id: this.props.match.params.id
      })
    };

    const acciones_recurrentes_request = await fetch('/api/acciones_recurrentes/obtener_acciones_recurrentes', request_options);
    const acciones_recurrentes_response = await acciones_recurrentes_request.json();
    
    if(acciones_recurrentes_response.estado !== "err"){
      this.setState({
        acciones_recurrentes: acciones_recurrentes_response
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las unidades de medida"});
    }
  }

  async obtenerUnidadesDeMedida(){
    const request_options = {
      method: "GET",
      credentials: "include"
    };

    const unidades_de_medida_request = await fetch('/api/unidades_de_medida/obtener_unidades_de_medida_acciones_recurrentes', request_options);
    const unidades_de_medida_response = await unidades_de_medida_request.json();

    if(unidades_de_medida_response.estado !== "err"){
      this.setState({
        unidades_de_medida: unidades_de_medida_response,
        unidad_medida_id: unidades_de_medida_response[0].id
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las unidades de medida"});
    }
  }

  async obtenerMediosDeVerificacion(){
    const request_options = {
      method: "GET",
      credentials: "include"
    };

    const medios_de_verificacion_request = await fetch('/api/medios_de_verificacion/obtener_medios_de_verificacion', request_options);
    const medios_de_verificacion_response = await medios_de_verificacion_request.json();

    if(medios_de_verificacion_response.estado !== "err"){
      this.setState({
        medios_de_verificacion: medios_de_verificacion_response,
        medio_verificacion_id: medios_de_verificacion_response[0].id
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los medios de verificación"});
    }
  }

  render() {

    // Modal que muestra el formulario para poder crear una nueva acción recurrente
    let modal_crear_accion_recurrente = 
      <Modal isOpen={this.state.modal_crear_accion_recurrente_abierto} toggle={() => this.setState({modal_crear_accion_recurrente_abierto: !this.state.modal_crear_accion_recurrente_abierto})} size="lg">
      <ModalHeader toggle={() => this.setState({modal_crear_accion_recurrente_abierto: !this.state.modal_crear_accion_recurrente_abierto})}>
        Crear nueva acción recurrente
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
            {/* Descripción de la acción recurrente*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Acción recurrente*</Label>
              <Input 
                onChange={(e) => this.setState({accion_recurrente: e.target.value})}
              />
              <span id="accion_recurrente-modal-creacion" className="error-acciones-recurrentes">Acción recurrente inválida. El campo no puede estar vacío.</span>
            </Col>
          </FormGroup> 

          <FormGroup row>
            {/* Programación física mensual*/}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Programación física mensual*</Label>
              <br/>
              <span id="programacion_fisica_trimestral-modal-creacion" className="error-acciones-recurrentes">La suma de la programación física trimestral no coincide con la meta física anual.</span>
            </Col>

            {/* Programación física de enero*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Enero*</Label>
              <Input 
                defaultValue={this.state.programacion_enero}
                onChange={(e) => this.setState({programacion_enero: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_enero-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de febrero*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Febrero*</Label>
              <Input 
                defaultValue={this.state.programacion_febrero}
                onChange={(e) => this.setState({programacion_febrero: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_febrero-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de marzo*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Marzo*</Label>
              <Input 
                defaultValue={this.state.programacion_marzo}
                onChange={(e) => this.setState({programacion_marzo: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_marzo-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de abril*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Abril*</Label>
              <Input 
                defaultValue={this.state.programacion_abril}
                onChange={(e) => this.setState({programacion_abril: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_abril-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de mayo*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Mayo*</Label>
              <Input 
                defaultValue={this.state.programacion_mayo}
                onChange={(e) => this.setState({programacion_mayo: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_mayo-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de junio*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Junio*</Label>
              <Input 
                defaultValue={this.state.programacion_junio}
                onChange={(e) => this.setState({programacion_junio: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_junio-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de julio*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Julio*</Label>
              <Input 
                defaultValue={this.state.programacion_julio}
                onChange={(e) => this.setState({programacion_julio: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_julio-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de agosto*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Agosto*</Label>
              <Input 
                defaultValue={this.state.programacion_agosto}
                onChange={(e) => this.setState({programacion_agosto: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_agosto-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de septiembre*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Septiembre*</Label>
              <Input 
                defaultValue={this.state.programacion_septiembre}
                onChange={(e) => this.setState({programacion_septiembre: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_septiembre-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de octubre*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Octubre*</Label>
              <Input 
                defaultValue={this.state.programacion_octubre}
                onChange={(e) => this.setState({programacion_octubre: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_octubre-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de noviembre*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Noviembre*</Label>
              <Input 
                defaultValue={this.state.programacion_noviembre}
                onChange={(e) => this.setState({programacion_noviembre: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_noviembre-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>

            {/* Programación física de diciembre*/}
            <Col xs={12} sm={12} md={3} lg={3}>
              <Label>Diciembre*</Label>
              <Input 
                defaultValue={this.state.programacion_diciembre}
                onChange={(e) => this.setState({programacion_diciembre: parseInt(e.target.value, 10)})}
              />
              <span id="programacion_diciembre-modal-creacion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
            </Col>
          </FormGroup>    

          <FormGroup row>
            {/* Unidad de medida de la acción recurrente*/}
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Unidad de medida*</Label>
              <Input 
                type="select"
                onChange={(e) => this.setState({unidad_medida_id: e.target.value})}
              >
                {this.state.unidades_de_medida.map((unidad, index) => {
                  return(
                    <option key={`unidad_de_medida_${index}`} value={unidad.id}>{unidad.nombre}</option>
                  )
                })}
              </Input>
              <span id="unidad_medida_id-modal-creacion" className="error-acciones-recurrentes">Unidad de medida inválida. Seleccione una opción de la lista.</span>
            </Col>
            
            {/* Medio de verificación de la acción recurrente*/}
            <Col xs={12} sm={12} md={6} lg={6}>
              <Label>Medio de verificación*</Label>
              <Input 
                type="select"
                onChange={(e) => this.setState({medio_verificacion_id: e.target.value})}
              >
                {this.state.medios_de_verificacion.map((medio, index) => {
                  return(
                    <option value={medio.id} key={`medio_de_verificacion_${index}`}>{medio.nombre}</option>
                  )
                })}
              </Input>
              <span id="medio_verificacion_id-modal-creacion" className="error-acciones-recurrentes">Medio de verificación inválido. Seleccione una opción de la lista.</span>
            </Col>

          </FormGroup>      
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="footer-modal-creacion-acciones-recurrentes" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearAccionRecurrente} color="success" type="submit" className="boton-crear">
            Crear acción
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_accion_recurrente_abierto: false})} className="boton-cancelar">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un objetivo específico existente
    let modal_editar_accion_recurrente = 
      <Modal isOpen={this.state.modal_editar_accion_recurrente_abierto} toggle={() => this.setState({modal_editar_accion_recurrente_abierto: !this.state.modal_editar_accion_recurrente_abierto})} size="lg">
        <ModalHeader toggle={() => this.setState({modal_editar_accion_recurrente_abierto: !this.state.modal_editar_accion_recurrente_abierto})}>
          Editar acción recurrente
        </ModalHeader>
        
        <ModalBody>
          <Form> 
            <FormGroup row>
              {/* Descripción de la acción recurrente*/}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Acción recurrente*</Label>
                <Input 
                defaultValue={this.state.accion_recurrente}
                  onChange={(e) => this.setState({accion_recurrente: e.target.value})}
                />
                <span id="accion_recurrente-modal-edicion" className="error-acciones-recurrentes">Acción recurrente inválida. El campo no puede estar vacío.</span>
              </Col>
            </FormGroup>  

            <FormGroup row>
              {/* Programación física trimestral*/}
              <Col xs={12} sm={12} md={12} lg={12}>
                <Label>Programación física mensual*</Label>
                <br/>
                <span id="programacion_fisica_trimestral-modal-edicion" className="error-acciones-recurrentes">La suma de la programación física trimestral no coincide con la meta física anual.</span>
              </Col>

              {/* Programación física de enero*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Enero*</Label>
                <Input 
                  defaultValue={this.state.programacion_enero}
                  onChange={(e) => this.setState({programacion_enero: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_enero-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de febrero*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Segundo trimestre*</Label>
                <Input 
                  defaultValue={this.state.programacion_febrero}
                  onChange={(e) => this.setState({programacion_febrero: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_febrero-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de marzo*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Marzo*</Label>
                <Input 
                  defaultValue={this.state.programacion_marzo}
                  onChange={(e) => this.setState({programacion_marzo: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_marzo-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de abril*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Abril*</Label>
                <Input 
                  defaultValue={this.state.programacion_abril}
                  onChange={(e) => this.setState({programacion_abril: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_abril-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de mayo*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Mayo*</Label>
                <Input 
                  defaultValue={this.state.programacion_mayo}
                  onChange={(e) => this.setState({programacion_mayo: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_mayo-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de junio*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Junio*</Label>
                <Input 
                  defaultValue={this.state.programacion_junio}
                  onChange={(e) => this.setState({programacion_junio: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_junio-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de julio*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Julio*</Label>
                <Input 
                  defaultValue={this.state.programacion_julio}
                  onChange={(e) => this.setState({programacion_julio: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_julio-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de agosto*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Agosto*</Label>
                <Input 
                  defaultValue={this.state.programacion_agosto}
                  onChange={(e) => this.setState({programacion_agosto: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_agosto-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de Septiembre*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Septiembre*</Label>
                <Input 
                  defaultValue={this.state.programacion_septiembre}
                  onChange={(e) => this.setState({programacion_septiembre: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_septiembre-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de octubre*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Octubre*</Label>
                <Input 
                  defaultValue={this.state.programacion_octubre}
                  onChange={(e) => this.setState({programacion_octubre: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_octubre-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

              {/* Programación física de noviembre*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Noviembre*</Label>
                <Input 
                  defaultValue={this.state.programacion_noviembre}
                  onChange={(e) => this.setState({programacion_noviembre: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_noviembre-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>

            {/* Programación física de diciembre*/}
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label>Diciembre*</Label>
                <Input 
                  defaultValue={this.state.programacion_diciembre}
                  onChange={(e) => this.setState({programacion_diciembre: parseInt(e.target.value, 10)})}
                />
                <span id="programacion_diciembre-modal-edicion" className="error-acciones-recurrentes">Programación inválida. Utilice únicamente números enteros no negativos. Si no desea una programación para este mes, coloque 0.</span>
              </Col>
            </FormGroup>    

            <FormGroup row>
              {/* Unidad de medida de la acción recurrente*/}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Unidad de medida*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.unidad_medida_id}
                  onChange={(e) => this.setState({unidad_medida_id: e.target.value})}
                >
                  {this.state.unidades_de_medida.map((unidad, index) => {
                    return(
                      <option key={`unidad_de_medida_${index}`} value={unidad.id}>{unidad.nombre}</option>
                    )
                  })}
                </Input>
                <span id="unidad_medida_id-modal-edicion" className="error-acciones-recurrentes">Unidad de medida inválida. Seleccione una opción de la lista.</span>
              </Col>

              {/* Medio de verificación de la acción recurrente*/}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Medio de verificación*</Label>
                <Input 
                  type="select"
                  defaultValue={this.state.medio_verificacion_id}
                  onChange={(e) => this.setState({medio_verificacion_id: e.target.value})}
                >
                  {this.state.medios_de_verificacion.map((medio, index) => {
                    return(
                      <option value={medio.id} key={`medio_de_verificacion_${index}`}>{medio.nombre}</option>
                    )
                  })}
                </Input>
                <span id="medio_verificacion_id-modal-edicion" className="error-acciones-recurrentes">Medio de verificación inválido. Seleccione una opción de la lista.</span>
              </Col>
            </FormGroup>      
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Col className="footer-modal-edicion-acciones-recurrentes" xs={12} sm={12} md={12} lg={12} >
            <Button onClick={this.editarAccionRecurrente} color="success" type="submit" className="boton-crear">
              Editar acción
            </Button>

            <Button onClick={() => this.setState({modal_confirmacion_abierto: true})} color="success" type="submit" className="boton-crear">
              Eliminar acción
            </Button>
            
            <Button color="danger" onClick={() => this.setState({modal_editar_accion_recurrente_abierto: false})} className="boton-cancelar">
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

    // Modal de confirmación que se muestra antes de borrar una acción recurrente
    let modal_confirmacion = 
      <Modal isOpen={this.state.modal_confirmacion_abierto} toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
        <ModalHeader toggle={() => this.setState({modal_confirmacion_abierto: !this.state.modal_confirmacion_abierto})}>
          Eliminar acción recurrente
        </ModalHeader>
        <ModalBody className="text-center">
          <h5>¿Está seguro de que desea eliminar la acción recurrente?</h5>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button color="danger" onClick={() => this.eliminarAccionRecurrente()}>Eliminar</Button>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} className="text-center">
            <Button className="boton-cancelar" color="warning" onClick={() => this.setState({modal_confirmacion_abierto: false})}>Cancelar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Container fluid className="container-unidades-de-medida">
        <div>
          <Breadcrumb>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/planeacion`)}>Planeación</BreadcrumbItem>
            <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/planeacion/objetivos-especificos`)}>Gestión de Objetivos Específicos</BreadcrumbItem>
            <BreadcrumbItem active>Gestión de Acciones Recurrentes</BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Modales del componente */}
        {modal_crear_accion_recurrente}
        {modal_editar_accion_recurrente}
        {modal_operacion_fallida}
        {modal_operacion_exitosa}
        {modal_confirmacion}
        
        <Row>
          {/* Título de la sección */}
          <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
            <img src={objetivos_especificos} className="icono-titulo"/>    
            <h1 className="titulo-unidades-de-medida">Gestión de Acciones Recurrentes</h1>
          </Col>

        </Row>

        <Row>
          <Col xs={12}>
            <Table striped >
              <thead>
                <tr>
                  <th colSpan="4">Objetivo específico asociado</th>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>Objetivo Específico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <span>{this.props.match.params.id}</span>
                  </th>
                  <th>
                    <span>{this.state.objetivo_especifico}</span>
                  </th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {this.state.acciones_recurrentes.length > 0 ? 
          <Row>
            <Col xs={12} className="text-center">
              <h2>Listado de Acciones Recurrentes</h2>
            </Col>

            {/* Botón para agregar acciones recurrente */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_accion_recurrente_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar acción recurrente
              </Button>
            </Col>
            
            <Col xs={12}>
              <Table striped className="tabla-unidad-solicitante">
                <thead>
                  <tr>
                    <th colSpan="4" scope="colgroup"></th>                  
                    <th colSpan="12" scope="colgroup" className="text-center">Programación Física Mensual</th>
                    <th colSpan="2" scope="colgroup" align="center"></th>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <th>Acción Recurrente</th>
                    <th>Unidad de Medida</th>
                    <th>Meta Física Anual</th>
                    <th className="text-center">Ene</th>
                    <th className="text-center">Feb</th>
                    <th className="text-center">Mar</th>
                    <th className="text-center">Abr</th>
                    <th className="text-center">May</th>
                    <th className="text-center">Jun</th>
                    <th className="text-center">Jul</th>
                    <th className="text-center">Ago</th>
                    <th className="text-center">Sep</th>
                    <th className="text-center">Oct</th>
                    <th className="text-center">Nov</th>
                    <th className="text-center">Dic</th>
                    <th>Medio de Verificación</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.acciones_recurrentes.map((accion, index) => {
                    return(
                      <tr key={`accion_recurrente_${accion.id}`}>
                        <td>{accion.id}</td>
                        <td>{accion.accion_recurrente}</td>
                        <td className="text-center">{this.obtenerNombreUnidadDeMedida(accion.unidad_medida_id)}</td>
                        <td className="text-center">{accion.meta_fisica_anual}</td>
                        <td className="text-center">{accion.programacion_enero}</td>
                        <td className="text-center">{accion.programacion_febrero}</td>
                        <td className="text-center">{accion.programacion_marzo}</td>
                        <td className="text-center">{accion.programacion_abril}</td>
                        <td className="text-center">{accion.programacion_mayo}</td>
                        <td className="text-center">{accion.programacion_junio}</td>
                        <td className="text-center">{accion.programacion_julio}</td>
                        <td className="text-center">{accion.programacion_agosto}</td>
                        <td className="text-center">{accion.programacion_septiembre}</td>
                        <td className="text-center">{accion.programacion_octubre}</td>
                        <td className="text-center">{accion.programacion_noviembre}</td>
                        <td className="text-center">{accion.programacion_diciembre}</td>
                        <td className="text-center">{this.obtenerNombreMedioDeVerificacion(accion.medio_verificacion_id)}</td>
                        <td>
                          <Button 
                            color="info" className="boton-gestionar"
                            onClick={() => this.cargarModalEdicion(index)}
                          >
                            <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                            Gestionar
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
              <h2>Aún no ha creado ninguna Acción Recurrente. <br/> Haga click en el botón "Agregar acción recurrente" para agregar una nueva.</h2>
            </Col>
            {/* Botón para agregar acciones recurrente */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_accion_recurrente_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar acción recurrente
              </Button>
            </Col>
          </Row>
        }
      </Container>
    )
  }
}
