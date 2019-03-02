import React, { Component } from 'react';
//import './Productos.css';
import { Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Container, Table, Form, Label } from 'reactstrap';
import productos from '../../assets/img/productos.png';
import autorizarDirectorPP from '../../Utilidades/autorizarDirectorPP.js';
import withContext from './../../Contenedor/withContext';


export class Productos extends Component {
  constructor(props){
    super(props);
    this.state = {
      productos: [],
      partidas: [],
      partida_desde_especifica: {},
      partida_desde_subespecifica: {},
      modal_crear_producto_abierto: false,
      modal_editar_producto_abierto: false,
      codigo: undefined,
      nombre: undefined,
      id: undefined,
      precio: undefined,
      habilitado: false,
      unidades_de_medida: [],
      unidad_de_medida: undefined,
      especifica_id: undefined,
      subespecifica_id: undefined,
      modal_operacion_exitosa: false,
      modal_operacion_fallida: false,
      rows_productos: [],
      iva: undefined,
      monto_iva: undefined,
      total: undefined,
      tiene_especifica: false,
      tiene_subespecifica: false,
    };
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerPartidas = this.obtenerPartidas.bind(this);
    this.obtenerPartidaDesdeEspecifica = this.obtenerPartidaDesdeEspecifica.bind(this);
    this.obtenerPartidaDesdeSubespecifica = this.obtenerPartidaDesdeSubespecifica.bind(this);
    this.obtenerUnidadesDeMedida = this.obtenerUnidadesDeMedida.bind(this);
    this.obtenerNombreUnidad  = this.obtenerNombreUnidad.bind(this);
    this.crearProducto = this.crearProducto.bind(this);
    this.cargarModalEditarProducto = this.cargarModalEditarProducto.bind(this);
    this.deshabilitarProducto = this.deshabilitarProducto.bind(this);
    this.habilitarProducto = this.habilitarProducto.bind(this);
    this.editarProducto = this.editarProducto.bind(this);
    this.formatearRowsProductos = this.formatearRowsProductos.bind(this);
    this.validarModalCreacion = this.validarModalCreacion.bind(this);
    this.validarModalEdicion = this.validarModalEdicion.bind(this);
  }

  obtenerNombreUnidad(id){
      for (let index = 0; index < this.state.unidades_de_medida.length; index++) {
          if (this.state.unidades_de_medida[index].id === id) {
              return this.state.unidades_de_medida[index].nombre;
          }
          
      }
  }

  async formatearRowsProductos(){
    let intermedio = this.state.productos.map(async (producto, index) => {
        let partida=[];
            if (producto.especifica_id !== null){
                partida = await this.obtenerPartidaDesdeEspecifica(producto.especifica_id);
            }
            else{
                partida = await this.obtenerPartidaDesdeSubespecifica(producto.subespecifica_id);
            }
        
        let nombre_unidad = this.obtenerNombreUnidad(producto.unidad_de_medida_id);
        let temp = 
            <tr key={`${producto.id}_${producto.nombre}`}>
                <th scope="row">{producto.id}</th>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{nombre_unidad}</td>
                <td>{producto.precio}</td>
                <td>IVA</td>
                <td>{producto.iva}%</td>
                <td>{producto.monto_iva}</td>
                <td>{producto.total}</td>
                <td>{partida.numero}</td>
                <td>{partida.denominacion}</td>
                <td>{producto.habilitado ? <span>Si</span> : <span>No</span>}</td>
                <td>
                {autorizarDirectorPP(this.props.usuario.rol) &&
                <Button 
                    color="info" className="boton-gestionar"
                    onClick={() => this.cargarModalEditarProducto(index)}
                >
                    <i className="iconos fa fa-cogs" aria-hidden="true"></i>                          
                    Gestionar
                </Button>
                }
                </td>
            </tr>
        ;

        return temp;
    });

    Promise.all(intermedio).then(resultado => {
        this.setState({rows_productos: resultado});
    })

  }

  async obtenerUnidadesDeMedida(){
    const unidades_de_medida_request = await fetch('/api/unidades_de_medida/obtener_unidades_de_medida_productos', {credentials: 'include'});
    const unidades_de_medida_response = await unidades_de_medida_request.json();

    if(unidades_de_medida_response !== 'err'){
      this.setState({unidades_de_medida: unidades_de_medida_response, unidad_de_medida:unidades_de_medida_response[0].id});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener las unidades de medida"});
    }

  }  

  async editarProducto(){
    if(this.validarModalEdicion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          id: this.state.id,
          codigo: this.state.codigo,
          nombre: this.state.nombre,
          precio: this.state.precio,
          unidad_de_medida_id: this.state.unidad_de_medida,
          especifica_id: this.state.especifica_id,
          subespecifica_id: this.state.subespecifica_id,
          habilitado: this.state.habilitado,
          iva: this.state.iva
        })
      };

      const editar_producto_request = await fetch(`/api/productos/actualizar_producto`, request_options);
      const editar_producto_response = await editar_producto_request.json();

      if(editar_producto_response !== 'err'){
        this.setState({modal_editar_producto_abierto: false, modal_operacion_exitosa: true, mensaje: "Producto editado correctamente"}, async () => {
          await this.obtenerProductos();
          this.formatearRowsProductos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_editar_producto_abierto: false, mensaje: "Error editando el producto"});
      }
    }
  }

  async deshabilitarProducto(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const deshabilitar_producto_request = await fetch(`/api/productos/deshabilitar_producto`, request_options);
    const deshabilitar_producto_response = await deshabilitar_producto_request.json();

    if(deshabilitar_producto_response !== 'err'){
      this.setState({modal_editar_producto_abierto: false, modal_operacion_exitosa: true, mensaje: "Producto deshabilitado correctamente"}, async () => {
        this.obtenerProductos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_producto_abierto: false, mensaje: "Error deshabilitando el producto"});
    }
  }


  async habilitarProducto(){
    const request_options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: this.state.id
      })
    };

    const habilitar_producto_request = await fetch(`/api/productos/habilitar_producto`, request_options);
    const habilitar_producto_response = await habilitar_producto_request.json();

    if(habilitar_producto_response !== 'err'){
      this.setState({modal_editar_producto_abierto: false, modal_operacion_exitosa: true, mensaje: "Producto habilitado correctamente"}, async () => {
        this.obtenerProductos();
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, modal_editar_producto_abierto: false, mensaje: "Error habilitando el producto"});
    }
  }

  async crearProducto() {
    if(this.validarModalCreacion()){
      const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            precio: this.state.precio,
            iva: this.state.iva,
            unidad_de_medida_id: this.state.unidad_de_medida,
            especifica_id: this.state.especifica_id,
            subespecifica_id: this.state.subespecifica_id,
        })
     };

      const crear_producto_request = await fetch(`/api/productos/crear_producto`, request_options);
      const crear_producto_response = await crear_producto_request.json();

      if(crear_producto_response !== 'err'){
        this.setState({modal_crear_producto_abierto: false, modal_operacion_exitosa: true, mensaje: "Producto creado correctamente"}, async () => {
          await this.obtenerProductos();
          this.formatearRowsProductos();
        });
      }
      else{
        this.setState({modal_operacion_fallida: true, modal_crear_producto_abierto: false, mensaje: "Error creando el producto "});
      }
    }
  }

  async obtenerProductos(){
    const productos_request = await fetch('/api/productos/obtener_productos', {credentials: 'include'});
    const productos_response = await productos_request.json();

    if(productos_response !== 'err'){
      this.setState({productos: productos_response});
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los productos "});
    }
  }

  async obtenerPartidas(){
    const partidas_request = await fetch('/api/partidas_presupuestarias/obtener_partidas_completas', {credentials: 'include'});
    const partidas_response = await partidas_request.json();

    if(partidas_response !== 'err'){
      this.setState({partidas: partidas_response}, () =>{
        for (let index = 0; index < this.state.partidas.length; index++) {
            for (let index2 = 0; index2 < this.state.partidas[index].genericas.length; index2++) {
                for (let index3 = 0; index3 < this.state.partidas[index].genericas[index2].especificas.length; index3++) {
                    if(this.state.partidas[index].genericas[index2].especificas[index3].subespecificas.length > 0){
                        for (let index4 = 0; index4 < this.state.partidas[index].genericas[index2].especificas[index3].subespecificas.length; index4++) {
                            this.setState({subespecifica_id: this.state.partidas[index].genericas[index2].especificas[index3].subespecificas[index4].id})
                            break;
                        }
                    }
                    else{
                        this.setState({especifica_id: this.state.partidas[index].genericas[index2].especificas[index3].id});
                        break;
                    }        
                }
            };
            
        }
      });
    }
    else{
      this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los partidas "});
    }

  }  

  async componentDidMount(){
    document.title = "SIGPRES CMB -Productos";
    await this.obtenerProductos();
    await this.obtenerPartidas();
    await this.obtenerUnidadesDeMedida();
    await this.formatearRowsProductos();
  }

  cargarModalEditarProducto(ind) {
    const producto = this.state.productos[ind];

    this.setState({
      codigo: producto.codigo,
      precio: producto.precio,
      iva: producto.iva,
      modal_editar_producto_abierto: true,
      id: producto.id,
      nombre: producto.nombre,
      unidad_de_medida: producto.unidad_de_medida_id,
      especifica_id: producto.especifica_id,
      subespecifica_id: producto.subespecifica_id,
      habilitado: producto.habilitado
    });
  }

  validarModalCreacion(){
    let formulario_valido = true;
    let codigo = `${this.state.codigo}`;
    let precio = `${this.state.precio}`; 
    let iva = `${this.state.iva}`;     

    // Validación del codigo del producto
    if(this.state.codigo === undefined || !codigo.match(/^[0-9]+$/)){
        document.getElementById("codigo-modal-creacion").style.display = 'block';
        formulario_valido = false;
      }
      else{
        document.getElementById("codigo-modal-creacion").style.display = 'none';
      }

    // Validación del nombre del producto
    if(this.state.nombre === undefined || this.state.nombre === "" ){
      document.getElementById("nombre-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-creacion").style.display = 'none';
    }

    // Validación del precio del producto
    if(this.state.precio === undefined || !precio.match(/^[0-9]*[.]{0,1}[0-9]{0,2}$/)){
        document.getElementById("precio-modal-creacion").style.display = 'block';
        formulario_valido = false;
      }
    else{
        document.getElementById("precio-modal-creacion").style.display = 'none';
    }

    // Validación del iva del producto
    if(iva === undefined || !iva.match(/^[0-9]*[.]{0,1}[0-9]{0,2}$/) || this.state.iva > 100){
      document.getElementById("iva-modal-creacion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("iva-modal-creacion").style.display = 'none';
    }     

    return formulario_valido;
  }
  
  validarModalEdicion(){
    let formulario_valido = true;
    let codigo = `${this.state.codigo}`;
    let precio = `${this.state.precio}`; 
    let iva = `${this.state.iva}`; 

    // Validación del codigo del producto
    if(codigo === undefined || !codigo.match(/^[0-9]+$/)){
        document.getElementById("codigo-modal-edicion").style.display = 'block';
        formulario_valido = false;
      }
      else{
        document.getElementById("codigo-modal-edicion").style.display = 'none';
      }

    // Validación del nombre del producto
    if(this.state.nombre === undefined || this.state.nombre === ""){
      document.getElementById("nombre-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("nombre-modal-edicion").style.display = 'none';
    }

    // Validación del precio del producto
    if(precio === undefined || !precio.match(/^[0-9]*[.]{0,1}[0-9]{0,2}$/)){
        document.getElementById("precio-modal-edicion").style.display = 'block';
        formulario_valido = false;
      }
    else{
        document.getElementById("precio-modal-edicion").style.display = 'none';
    }

    // Validación del iva del producto
    if(iva === undefined || !iva.match(/^[0-9]*[.]{0,1}[0-9]{0,2}$/) || this.state.iva > 100){
      document.getElementById("iva-modal-edicion").style.display = 'block';
      formulario_valido = false;
    }
    else{
      document.getElementById("iva-modal-edicion").style.display = 'none';
    }    

    return formulario_valido;
  }

  procesarOpcion(e){
    let id = e.target.value.split("_")[1];
    let opcion = e.target.value.split("_")[0];

    if (opcion === "especifica"){
        this.setState({especifica_id: id, subespecifica_id: undefined});
    }
    else{
        this.setState({subespecifica_id: id, especifica_id: undefined});
    }

  }

  async obtenerPartidaDesdeEspecifica(id){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            id: id
        })
     };
     const partidas_request = await fetch('/api/partidas_presupuestarias/obtener_partida_desde_especifica', request_options);
     const partidas_response = await partidas_request.json();
 
     if(partidas_response !== 'err'){
        let partida_completa = {
          numero: `${partidas_response.generica.partida_presupuestaria.numero_partida}.${partidas_response.generica.numero_generica}.${partidas_response.numero_especifica}.00`, 
          denominacion:`${partidas_response.denominacion}`
                              };                  
        return partida_completa;         
    }
     else{
       this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los partidas "});
     }     
  }

  /**
   * #############
   * # ACOMODAR  #
   * #############
   * 
   * Hacer misma corrección en el endpoint /api/partidas_presupuestarias/obtener_partida_desde_especifica
   * y hacer la misma corrección en el método obtenerPartidaDesdeEspecifica() para obtener la información a 
   * partir de la nueva estructura del resultado del query (ahora el query esta al revés, se empieza desde 
   *  subespecíficas)
   */
  async obtenerPartidaDesdeSubespecifica(id){
    const request_options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            id: id
        })
     };

     const partidas_request = await fetch('/api/partidas_presupuestarias/obtener_partida_desde_subespecifica', request_options);
     const partidas_response = await partidas_request.json();
 
     if(partidas_response !== 'err'){
       let partida_completa = {
                               numero: `${partidas_response.especifica.generica.partida_presupuestaria.numero_partida}.${partidas_response.especifica.generica.numero_generica}.${partidas_response.especifica.numero_especifica}.${partidas_response.numero_subespecifica}`, 
                               denominacion:`${partidas_response.denominacion}`
                           };
       return partida_completa;  
     }
     else{
       this.setState({modal_operacion_fallida: true, mensaje: "Error al obtener los partidas "});
     }     
  }

  render() {

    let opciones = [];

    if(this.state.partidas !== undefined && this.state.partidas.length > 0){
        this.state.partidas.map(partida => {
            if(partida.genericas.length > 0){
                partida.genericas.map(generica => {
                    if(generica.especificas.length > 0){
                        generica.especificas.map(especifica => { 
                            if (especifica.subespecificas.length > 0) {
                                especifica.subespecificas.map(subespecifica => {  
                                    opciones.push(
                                        <option value={`subespecifica_${subespecifica.id}`} key={`partida_${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.${subespecifica.numero_subespecifica}`}>
                                            {partida.numero_partida}.{generica.numero_generica}.{especifica.numero_especifica}.{subespecifica.numero_subespecifica} - {subespecifica.denominacion} 
                                        </option>)    
                            })}
                            else{
                                opciones.push(
                                    <option value={`especifica_${especifica.id}`} key={`${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.00`}>
                                        {partida.numero_partida}.{generica.numero_generica}.{especifica.numero_especifica}.00 - {especifica.denominacion} 
                                    </option>)   
                            }

                })
          }})
        }})
      }

    // Modal que muestra el formulario para poder crear un nuevo cargo 
    let modal_crear_producto = 
      <Modal isOpen={this.state.modal_crear_producto_abierto} toggle={() => this.setState({modal_crear_producto_abierto: !this.state.modal_crear_producto_abierto})} size="md">
      <ModalHeader toggle={() => this.setState({modal_crear_producto_abierto: !this.state.modal_crear_producto_abierto})}>
        Crear nuevo producto
      </ModalHeader>
      
      <ModalBody>
        <Form> 
          <FormGroup row>
              {/* Dirección al que pertenece el usuario*/} 
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Partida Presupuestaria*</Label>
                <Input
                  type="select"
                  onChange={(e) => this.procesarOpcion(e)}
                >
                  {opciones.map(opcion => {
                    return(
                      opcion
                    )
                  })}
                 </Input>                

                {/*<span id="area-modal-edicion" className="error-usuarios">Dirección inválida</span>*/}
              </Col>
          </FormGroup> 
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Código del producto*</Label>
              <Input 
                onChange={(e) => this.setState({codigo: e.target.value})}
              />
              <span id="codigo-modal-creacion" className="error-cargos">Código inválido, debe ser un número</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Nombre del producto*</Label>
              <Input 
                onChange={(e) => this.setState({nombre: e.target.value})}
              />
              <span id="nombre-modal-creacion" className="error-cargos">Nombre inválido</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Precio del producto*</Label>
              <Input 
                onChange={(e) => this.setState({precio: e.target.value})}
              />
              <span id="precio-modal-creacion" className="error-cargos">Precio inválido, debe ser un número distinto a 0 y no puede tener más de dos decimales. Los decimales van separados con un punto.</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>IVA del producto*</Label>
              <Input 
                onChange={(e) => this.setState({iva: e.target.value})}
              />
              <span id="iva-modal-creacion" className="error-cargos">IVA inválido, debe ser un número y los decimales estar separados por un punto.</span>
            </Col>
          </FormGroup>          
          <FormGroup row>
              {/* Dirección al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Unidad de Medida*</Label>
                <Input
                  type="select"
                  onChange={(e) => this.setState({unidad_de_medida: e.target.value})}
                >
                  {this.state.unidades_de_medida.map((unidad_de_medida, index) => {
                    return(
                      <option value={unidad_de_medida.id} key={`unidad_de_medida_${unidad_de_medida.index}`}>{unidad_de_medida.nombre}</option>
                    )
                  })}
               </Input>
              </Col>
          </FormGroup>                        
        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
          <Button onClick={this.crearProducto} color="success" type="submit" className="boton-crear-modal">
            Crear producto
          </Button>
          
          <Button color="danger" onClick={() => this.setState({modal_crear_producto_abierto: false})} className="boton-cancelar-modal">
            Cancelar
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
    ;

    // Modal que muestra el formulario para poder editar un cargo  existente
    let modal_editar_producto = 
      <Modal isOpen={this.state.modal_editar_producto_abierto} toggle={() => this.setState({modal_editar_producto_abierto: !this.state.modal_editar_producto_abierto})} size="md">
        <ModalHeader toggle={() => this.setState({modal_editar_producto_abierto: !this.state.modal_editar_producto_abierto})}>
          Editar producto 
        </ModalHeader>
        
        <ModalBody>
        <Form> 
          <FormGroup row>
              {/* Dirección al que pertenece el usuario*/} 
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Partida Presupuestaria*</Label>
                <Input
                  type="select"
                  defaultValue={this.state.especifica_id === null ? `subespecifica_${this.state.subespecifica_id}` : `especifica_${this.state.especifica_id}`}
                  onChange={(e) => this.procesarOpcion(e)}
                >
                  {opciones.map(opcion => {
                    return(
                      opcion
                    )
                  })}
                 </Input>                
              </Col>
          </FormGroup> 
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Código del producto*</Label>
              <Input 
                defaultValue={this.state.codigo}
                onChange={(e) => this.setState({codigo: e.target.value})}
              />
              <span id="codigo-modal-edicion" className="error-cargos">Código inválido, debe ser un número</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Nombre del producto*</Label>
              <Input 
                defaultValue={this.state.nombre}
                onChange={(e) => this.setState({nombre: e.target.value})}
              />
              <span id="nombre-modal-edicion" className="error-cargos">Nombre inválido</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>Precio del producto*</Label>
              <Input 
                defaultValue={this.state.precio}
                onChange={(e) => this.setState({precio: e.target.value})}
              />
              <span id="precio-modal-edicion" className="error-cargos">Precio inválido, debe ser un número distinto a 0 y no puede tener más de dos decimales. Los decimales van separados con un punto.</span>
            </Col>
          </FormGroup>
          <FormGroup row>
            {/* Nombre del cargo */}
            <Col xs={12} sm={12} md={12} lg={12}>
              <Label>IVA del producto*</Label>
              <Input 
                defaultValue={this.state.iva}
                onChange={(e) => this.setState({iva: e.target.value})}
              />
              <span id="iva-modal-edicion" className="error-cargos">IVA inválido, debe ser un número y los decimales estar separados por un punto.</span>
            </Col>
          </FormGroup>                    
          <FormGroup row>
              {/* Dirección al que pertenece el usuario */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Label>Unidad de Medida*</Label>
                <Input
                  type="select"
                  defaultValue= {this.state.unidad_de_medida}
                  onChange={(e) => this.setState({unidad_de_medida: e.target.value})}
                >
                  {this.state.unidades_de_medida.map((unidad_de_medida, index) => {
                    return(
                      <option value={unidad_de_medida.id} key={`unidad_de_medida_${unidad_de_medida.index}`}>{unidad_de_medida.nombre}</option>
                    )
                  })}
               </Input>
                {/*<span id="area-modal-edicion" className="error-usuarios">Dirección inválida</span>*/}
              </Col>
          </FormGroup>                        
        </Form>
      </ModalBody>
        
        <ModalFooter>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} >
            <Button color="success" onClick={this.editarProducto} className="boton-crear-modal">
              Editar producto
            </Button>

            {this.state.habilitado ? 
              <Button color="success" onClick={this.deshabilitarProducto} className="boton-crear-modal">
                Deshabilitar
              </Button>  
              : 
              <Button color="success" onClick={this.habilitarProducto} className="boton-crear-modal">
                Habilitar
              </Button>
            }
            
            <Button color="danger" onClick={() => this.setState({modal_editar_producto_abierto: false})} className="boton-cancelar-modal">
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
        <Container fluid className="container-unidades-de-medida">

          <div>
            <Breadcrumb>
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
              <BreadcrumbItem onClick={() => this.props.history.push(`/inicio/presupuesto/`)}>Presupuesto</BreadcrumbItem>
              <BreadcrumbItem active>Gestión de Productos</BreadcrumbItem>
            </Breadcrumb>
          </div>

          {/* Modales del componente */}
          {modal_crear_producto}
          {modal_editar_producto}
          {modal_operacion_fallida}
          {modal_operacion_exitosa}

          <Row>
            {/* Título de la sección */}
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <img src={productos} className="icono-titulo"/>    
              <h1 className="titulo-unidades-de-medida">Gestión de Productos</h1>
            </Col>

            {/* Botón para agregar productos */}
            {autorizarDirectorPP(this.props.usuario.rol) &&
            <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
              <Button color="info" className="boton-agregar" onClick={() => this.setState({modal_crear_producto_abierto: true})}>
                <i className="iconos fa fa-plus" aria-hidden="true"></i>              
                Agregar producto
              </Button>
            </Col>
            }
          </Row>

          {/* Si existen productos, muestra  tabla con su información */}
          {this.state.productos.length > 0 && 
              <Row className="row-unidades-de-medida">
              <Table striped className="tabla-unidades-de-medida">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Unidad de Medida</th>
                    <th>Precio</th>
                    <th>IVA</th>
                    <th>%</th>
                    <th>Monto IVA</th>
                    <th>Precio Total</th>
                    <th>Subespecífica</th>                    
                    <th>Denominación</th>                    
                    <th>Habilitado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.rows_productos.map( producto => {
                    return(
                      producto
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
export default withContext(Productos);