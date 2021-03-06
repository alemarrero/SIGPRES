import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Quejas from './Quejas';
import PresupuestoParticipativo from './PresupuestoParticipativo';
import Sugerencias from './Sugerencias';
import {Switch, Route} from 'react-router-dom';
import MenuAtencionCiudadano from './MenuAtencionCiudadano';

export default class Planeacion extends Component {

  componentDidMount(){
    document.title = "SIGPRES CMB -Atención al Ciudadano";
  }

  render() {
    return (
      <Container fluid>
        <Switch>
          <Route exact path={this.props.match.path + '/'} component={MenuAtencionCiudadano}/>
          <Route path={this.props.match.path + '/quejas'} component={Quejas}/>
          <Route path={this.props.match.path + '/sugerencias'} component={Sugerencias}/>
          <Route path={this.props.match.path + '/presupuesto-participativo'} component={PresupuestoParticipativo}/>
        </Switch>
      </Container>
    )
  }
}
