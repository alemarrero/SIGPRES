import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import { Switch, Route } from 'react-router-dom';
import BarraNavegacion from '../Componentes/BarraNavegacion/BarraNavegacion';
import Menu from '../Componentes/Menu/Menu';
import Usuarios from '../Componentes/Usuarios/Usuarios';
import Administracion from '../Componentes/Administracion/Administracion';
import UnidadesDeMedida from '../Componentes/UnidadesDeMedida/UnidadesDeMedida';
import MediosDeVerificacion from '../Componentes/MediosDeVerificacion/MediosDeVerificacion';

/**
 * TO DO
 *  - Colocarle cursor: pointer a las opciones para que el puntero le indique al usuario que los cuadros son opciones
 */
export default class Main extends Component {
  constructor(props){
    super(props);
  }

  async componentDidMount(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include', headers:{"accepts":"application/json"}});
    const session_response = await session_request.json();

    if(session_response !== 'err'){
      this.setState({...session_response});
    }
    else{
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Container fluid style={{paddingRight: "0px !important", paddingLeft: "0px !important", backgroundColor: "white" }}>
        <BarraNavegacion/>
        
        {/* Rutas */}
        <Switch>
          <Route exact path={this.props.match.path + '/'} component={Menu}/>
          <Route path={this.props.match.path + '/administracion/unidades-de-medida'} component={UnidadesDeMedida}/>
          <Route path={this.props.match.path + '/administracion/usuarios'} component={Usuarios}/>
          <Route path={this.props.match.path + '/administracion/medios-de-verificacion'} component={MediosDeVerificacion}/>
          <Route path={this.props.match.path + '/administracion'} component={Administracion}/>
        </Switch>
        
      </Container>
      )
  }
}
