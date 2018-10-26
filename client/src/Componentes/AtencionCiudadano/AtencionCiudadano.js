import React, { Component } from 'react';
import OpcionMenu from '../Menu/OpcionMenu';
import usuarios from '../../assets/img/usuarios.png';
import { Row } from 'reactstrap';
import Quejas from './Quejas';
import PresupuestoParticipativo from './PresupuestoParticipativo';
import Sugerencias from './Sugerencias';
import {Switch, Route} from 'react-router-dom';
import MenuAtencionCiudadano from './MenuAtencionCiudadano';

export default class Planeacion extends Component {

  componentDidMount(){
    document.title = "SICMB - Atención al Ciudadano";
  }

  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        <Switch>
          <Route exact path={this.props.match.path + '/'} component={MenuAtencionCiudadano}/>
          <Route path={this.props.match.path + '/quejas'} component={Quejas}/>
          <Route path={this.props.match.path + '/sugerencias'} component={Sugerencias}/>
          <Route path={this.props.match.path + '/presupuesto-participativo'} component={PresupuestoParticipativo}/>
        </Switch>
      </Row>
    )
  }
}
