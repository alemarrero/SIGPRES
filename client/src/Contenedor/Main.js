import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import { Switch, Route } from 'react-router-dom';
import BarraNavegacion from '../Componentes/BarraNavegacion/BarraNavegacion';
import Menu from '../Componentes/Menu/Menu';
import Usuarios from '../Componentes/Usuarios/Usuarios';
import Administracion from '../Componentes/Administracion/Administracion';
import UnidadesDeMedida from '../Componentes/UnidadesDeMedida/UnidadesDeMedida';
import MediosDeVerificacion from '../Componentes/MediosDeVerificacion/MediosDeVerificacion';
import Planeacion from '../Componentes/Planeacion/Planeacion';
import Programas from '../Componentes/Programas/Programas';
import Areas from '../Componentes/Areas/Areas';
import Presupuesto from '../Componentes/Presupuesto/Presupuesto';
import PartidasPresupuestarias from '../Componentes/PartidasPresupuestarias/PartidasPresupuestarias';
import Genericas from '../Componentes/PartidasPresupuestarias/Genericas';
import Especificas from '../Componentes/PartidasPresupuestarias/Especificas';
import Subespecificas from '../Componentes/PartidasPresupuestarias/Subespecificas';

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
          <Route path={this.props.match.path + '/administracion/areas'} component={Areas}/>
          <Route path={this.props.match.path + '/administracion/medios-de-verificacion'} component={MediosDeVerificacion}/>
          <Route path={this.props.match.path + '/administracion'} component={Administracion}/>
          <Route path={this.props.match.path + '/planeacion/programas'} component={Programas}/>
          <Route path={this.props.match.path + '/planeacion'} component={Planeacion}/>
          <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida/generica/:numero_generica/especifica/:numero_especifica'} component={Subespecificas}/>
          <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida/generica/:numero_generica'} component={Especificas}/>
          <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida'} component={Genericas}/>
          <Route path={this.props.match.path + '/presupuesto/partidas-presupuestarias'} component={PartidasPresupuestarias}/>
          <Route path={this.props.match.path + '/presupuesto'} component={Presupuesto}/>
        </Switch>
        
      </Container>
      )
  }
}
