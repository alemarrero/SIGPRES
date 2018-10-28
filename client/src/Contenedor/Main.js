import React, { PureComponent } from 'react';
import { Container } from 'reactstrap'; 
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
import PlanesNacion from '../Componentes/PlanesHistoricos/PlanesNacion';
import PlanesAlcaldia from '../Componentes/PlanesHistoricos/PlanesAlcaldia';
import PlanesCMB from '../Componentes/PlanesHistoricos/PlanesCMB';
import PlanesCGR from '../Componentes/PlanesHistoricos/PlanesCGR';
import PlanesHistoricos from '../Componentes/PlanesHistoricos/PlanesHistoricos';
import ContextProvider from './ContextProvider';
import Requerimientos from '../Componentes/Requerimientos/Requerimientos'
import RequerimientosYNecesidades from '../Componentes/Requerimientos/RequerimientosYNecesidades'
import SolicitudPersonal from '../Componentes/Requerimientos/SolicitudPersonal'
import Cargos from '../Componentes/Requerimientos/Cargos'
import MenuGestionAtencionCiudadano from '../Componentes/AtencionCiudadano/MenuGestionAtencionCiudadano'
import GestionQuejas from '../Componentes/AtencionCiudadano/GestionQuejas'
import GestionSugerencias from '../Componentes/AtencionCiudadano/GestionSugerencias'


/**
 * TO DO
 *  - Colocarle cursor: pointer a las opciones para que el puntero le indique al usuario que los cuadros son opciones
 */
export default class Main extends PureComponent {

  render() {
    return (
      <ContextProvider>
        <Container fluid={true} style={{paddingRight: "0px !important", paddingLeft: "0px !important", backgroundColor: "white" }}>
          <BarraNavegacion/>
          
          {/* Rutas */}
          <Switch>
            <Route exact path={this.props.match.path + '/'} component={Menu}/>
            <Route path={this.props.match.path + '/administracion/unidades-de-medida'} component={UnidadesDeMedida}/>
            <Route path={this.props.match.path + '/administracion/usuarios'} component={Usuarios}/>
            <Route path={this.props.match.path + '/administracion/areas'} component={Areas}/>
            <Route path={this.props.match.path + '/administracion/medios-de-verificacion'} component={MediosDeVerificacion}/>
            <Route path={this.props.match.path + '/administracion/planes-historicos/planes-cgr'} component={PlanesCGR}/>          
            <Route path={this.props.match.path + '/administracion/planes-historicos/planes-alcaldia'} component={PlanesAlcaldia}/>          
            <Route path={this.props.match.path + '/administracion/planes-historicos/planes-cmb'} component={PlanesCMB}/>                    
            <Route path={this.props.match.path + '/administracion/planes-historicos/planes-nacion'} component={PlanesNacion}/>          
            <Route path={this.props.match.path + '/administracion/planes-historicos'} component={PlanesHistoricos}/>
            <Route path={this.props.match.path + '/administracion'} component={Administracion}/>
            <Route path={this.props.match.path + '/oac/quejas'} component={GestionQuejas}/>                        
            <Route path={this.props.match.path + '/oac/sugerencias'} component={GestionSugerencias}/>                        
            <Route path={this.props.match.path + '/oac'} component={MenuGestionAtencionCiudadano}/>            
            <Route path={this.props.match.path + '/planeacion/programas'} component={Programas}/>
            <Route path={this.props.match.path + '/planeacion'} component={Planeacion}/>
            <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida/generica/:numero_generica/especifica/:numero_especifica'} component={Subespecificas}/>
            <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida/generica/:numero_generica'} component={Especificas}/>
            <Route path={this.props.match.path + '/presupuesto/partida-presupuestaria/:numero_partida'} component={Genericas}/>
            <Route path={this.props.match.path + '/presupuesto/partidas-presupuestarias'} component={PartidasPresupuestarias}/>
            <Route path={this.props.match.path + '/presupuesto/requerimientos/solicitud-personal/cargos'} component={Cargos}/>
            <Route path={this.props.match.path + '/presupuesto/requerimientos/solicitud-personal'} component={SolicitudPersonal}/>
            <Route path={this.props.match.path + '/presupuesto/requerimientos/requerimientos-y-necesidades'} component={RequerimientosYNecesidades}/>
            <Route path={this.props.match.path + '/presupuesto/requerimientos'} component={Requerimientos}/>
            <Route path={this.props.match.path + '/presupuesto'} component={Presupuesto}/>
          </Switch>
        </Container>
      </ContextProvider>
      )
  }
}
