import React, { Component } from 'react';
import {Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table} from 'reactstrap';
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
      programacion_primer_trimestre: undefined,
      programacion_segundo_trimestre: undefined,
      programacion_tercer_trimestre: undefined,
      programacion_cuarto_trimestre: undefined,
      medio_verificacion_id: undefined,
      unidades_de_medida: [],
      medios_de_verificacion: []
    };
    this.string_regex = /^[A-Za-z\u00C0-\u017F]+((\s)[A-Za-z\u00C0-\u017F]+)*$/;
    this.obtenerUnidadesDeMedida = this.obtenerUnidadesDeMedida.bind(this);
    this.obtenerMediosDeVerificacion = this.obtenerMediosDeVerificacion.bind(this);
    this.obtenerAccionesRecurrentes = this.obtenerAccionesRecurrentes.bind(this);
    this.crearAccionRecurrente = this.crearAccionRecurrente.bind(this);
    this.validarCreacionAccionRecurrente = this.validarCreacionAccionRecurrente.bind(this);
    this.editarAccionRecurrente = this.editarAccionRecurrente.bind(this);
    this.validarEdicionAccionRecurrente = this.validarEdicionAccionRecurrente.bind(this);
    this.cargarModalEdicion = this.cargarModalEdicion.bind(this);
    this.eliminarAccionRecurrente = this.eliminarAccionRecurrente.bind(this);
  }

  async componentDidMount(){
    document.title = "SICMB - Gestión de Acciones Recurrentes";
    this.obtenerAccionesRecurrentes();
    this.obtenerMediosDeVerificacion();
    this.obtenerUnidadesDeMedida();
  }

  crearAccionRecurrente(){

  }

  validarCreacionAccionRecurrente(){

  }

  editarAccionRecurrente(){

  }

  validarEdicionAccionRecurrente(){

  }

  cargarModalEdicion(){

  }

  eliminarAccionRecurrente(){

  }


  async obtenerAccionesRecurrentes(){
    const request_options = {
      method: "POST",
      credentials: "include",
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

    const unidades_de_medida_request = await fetch('/api/unidades_de_medida/obtener_unidades_de_medida', request_options);
    const unidades_de_medida_response = await unidades_de_medida_request.json();

    if(unidades_de_medida_response.estado !== "err"){
      this.setState({
        unidades_de_medida: unidades_de_medida_response
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
        medios_de_verificacion: medios_de_verificacion_response
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los medios de verificación"});
    }
  }

  render() {
    return (
      <Row>

      </Row>
    )
  }
}
