import React, { Component } from 'react';
import './BarraNavegacion.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';

export default class BarraNavegacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barra_navegacion_colapsada: false,
      nombre_completo: undefined
    };
    this.obtenerNombreDelUsuario = this.obtenerNombreDelUsuario.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }

  async cerrarSesion(){
    const logout_request = await fetch('/api/auth/logout', {credentials: 'include'});
    const logout_response = await logout_request.json();

    if(logout_response === 'ok'){
      window.location.reload();
    }
  }

  async obtenerNombreDelUsuario(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include'});
    const session_response = await session_request.json();

    console.log(session_response);

    this.setState({nombre_completo: session_response.nombre_completo});
  }

  async componentDidMount(){
    this.obtenerNombreDelUsuario();
  }
     
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Navbar color="light" light expand="sm">
            <NavbarBrand href="/inicio">SICMB</NavbarBrand>

            <NavbarToggler onClick={() => this.setState({barra_navegacion_colapsada: !this.state.barra_navegacion_colapsada})} />
            
            <Collapse isOpen={this.state.barra_navegacion_colapsada} navbar>
              <Nav className="ml-auto" navbar>
                {/* Dropdown de presupuesto */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Presupuesto
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Gestión de partidas presupuestarias
                    </DropdownItem>
                    
                    <DropdownItem>
                      Solicitud de requerimientos
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* Dropdown de planeación */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Planeación 
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Gestión de objetivos específicos
                    </DropdownItem>
                    
                    <DropdownItem>
                      Necesidades de la comunidad
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                {/* Dropdown de administración */}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Administración
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Gestión de usuarios
                    </DropdownItem>
                    
                    <DropdownItem>
                      Gestión de indicadores
                    </DropdownItem>

                    <DropdownItem>
                      Gestión de medios de verificación
                    </DropdownItem>

                    <DropdownItem>
                      Gestión de unidades de medida
                    </DropdownItem>

                    <DropdownItem>
                      Gestión de planes históricos
                    </DropdownItem>

                    <DropdownItem>
                      Gestión de diagnóstico de la CMB
                    </DropdownItem>

                    <DropdownItem>
                      Gestión de áreas
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> 
              
                {/* Mensaje de bienvenida */}
                <NavItem style={{margin: "auto 0px"}}>
                  Bienvenido {this.state.nombre_completo}
                </NavItem>
                
                {/* Botón de cerrar sesión */}
                <NavItem onClick={this.cerrarSesion} style={{cursor: "pointer", margin: "auto 0px auto 30px"}}>
                  Cerrar sesión
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    );
  }
}
