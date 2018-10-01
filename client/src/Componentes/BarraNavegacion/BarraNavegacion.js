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
                <NavItem>
                  Bienvenido {this.state.nombre_completo}
                </NavItem>
                <NavItem onClick={this.cerrarSesion} style={{cursor: "pointer", marginLeft: "30px"}}>
                  Cerrar sesión
                </NavItem>
                {/* <NavItem>
                  <NavLink href="/presupuesto">Presupuesto</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">Objetivos Específicos</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    );
  }
}
