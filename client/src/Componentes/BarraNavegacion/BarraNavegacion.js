import React, { Component } from 'react';
import './BarraNavegacion.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,  
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col,
         Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import logo from '../../assets/img/logo-cmb.png';
import {withRouter} from "react-router-dom";

export class BarraNavegacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barra_navegacion_colapsada: false,
      nombre_completo: undefined,
      modal_cierre_de_sesion_exitoso: false
    };
    this.obtenerNombreDelUsuario = this.obtenerNombreDelUsuario.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }

  async cerrarSesion(){
    const logout_request = await fetch('/api/auth/logout', {credentials: 'include'});
    const logout_response = await logout_request.json();

    if(logout_response === 'ok'){
      this.setState({modal_cierre_de_sesion_exitoso: true})
    }
  }

  async obtenerNombreDelUsuario(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include'});
    const session_response = await session_request.json();

    this.setState({nombre_completo: session_response.nombre_completo});
  }

  async componentDidMount(){
    this.obtenerNombreDelUsuario();
  }
     
  render() {
    let cierre_de_sesion_exitoso = 
      <Modal isOpen={this.state.modal_cierre_de_sesion_exitoso} toggle={() => this.setState({modal_cierre_de_sesion_exitoso: !this.state.modal_cierre_de_sesion_exitoso})}>
        <ModalHeader toggle={() => this.setState({modal_cierre_de_sesion_exitoso: !this.state.modal_cierre_de_sesion_exitoso})}>
          Cierre de sesión exitoso
        </ModalHeader>
        <ModalBody>
          <p>Su sesión se ha cerrado exitosamente. Será redirigido a la pantalla de inicio.</p>
        </ModalBody>
        <ModalFooter>
          <Col xs={12} className="text-center">
            <Button color="danger" onClick={() => this.props.history.push('/')}>Cerrar</Button>
          </Col>
        </ModalFooter>
      </Modal>
    ;

    return (
      <Row>
        {cierre_de_sesion_exitoso}
        <Col xs={12} className="col-navbar"> 
        <Row>
          <Navbar light expand="sm" className="navbar">
            <NavbarBrand href="/inicio">        
              <img src={logo} className="logo"/>
              SICMB
            </NavbarBrand>

            <NavbarToggler onClick={() => this.setState({barra_navegacion_colapsada: !this.state.barra_navegacion_colapsada})} />
            
            <Collapse isOpen={this.state.barra_navegacion_colapsada} navbar>
              <Nav className="ml-auto" navbar>
                {/* Dropdown de presupuesto */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="menu-navbar">
                    Presupuesto
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="dropdown-navbar">
                      Gestión de partidas presupuestarias
                    </DropdownItem>
                    
                    <DropdownItem className="dropdown-navbar">
                      Solicitud de requerimientos
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* Dropdown de planeación */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="menu-navbar">
                    Planeación 
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="dropdown-navbar">
                      Gestión de objetivos específicos
                    </DropdownItem>
                    
                    <DropdownItem className="dropdown-navbar">
                      Necesidades de la comunidad
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* Dropdown de administración */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="menu-navbar">
                    Administración
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="dropdown-navbar">
                      Gestión de usuarios
                    </DropdownItem>
                    
                    <DropdownItem className="dropdown-navbar">
                      Gestión de indicadores
                    </DropdownItem>

                    <DropdownItem className="dropdown-navbar">
                      Gestión de medios de verificación
                    </DropdownItem>

                    <DropdownItem className="dropdown-navbar">
                      Gestión de unidades de medida
                    </DropdownItem>

                    <DropdownItem className="dropdown-navbar">
                      Gestión de planes históricos
                    </DropdownItem>

                    <DropdownItem className="dropdown-navbar">
                      Gestión de antecedentes de la CMB
                    </DropdownItem>

                    <DropdownItem className="dropdown-navbar">
                      Gestión de áreas
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> 
              
                {/* Mensaje de bienvenida */}
                <NavItem style={{margin: "auto 0px"}} className="usuario-navbar">
                  Bienvenido {this.state.nombre_completo}
                </NavItem>
                
                {/* Botón de cerrar sesión */}
                <NavItem onClick={this.cerrarSesion} style={{cursor: "pointer", margin: "auto 0px auto 30px"}}>
                  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default withRouter(BarraNavegacion);
