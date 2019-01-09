import React, { Component } from 'react';
import {Row} from 'reactstrap';
import './Menu.css';
import administracion from '../../assets/img/work-team.png';
import presupuesto from '../../assets/img/budget.png';
import planeacion from '../../assets/img/solution.png';
import atencion_ciudadano from '../../assets/img/atencion_ciudadano.png';
import OpcionMenu from './OpcionMenu';
import withContext from '../../Contenedor/withContext';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export class Menu extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Breadcrumb>
            <BreadcrumbItem active onClick={() => this.props.history.push(`/inicio`)} >Inicio</BreadcrumbItem>          
          </Breadcrumb>
        </div>

        <Row fluid className="fila-opciones-menu-principal">
          {/* Administración */}   
          <OpcionMenu ruta={'administracion/'} nombre="Administración" icono={administracion}/>
          
          {/* Gestión de planeación */}
          <OpcionMenu ruta={'planeacion/'} nombre="Planeación" icono={planeacion}/>        
          
          {/* Gestión presupuestal  */}
          <OpcionMenu ruta={'presupuesto/'} nombre="Presupuesto" icono={presupuesto}/>

          {/* Gestión de atención al ciudadano */}
          <OpcionMenu ruta={'oac/'} nombre="Atención al Ciudadano" icono={atencion_ciudadano}/>
        </Row>
      </React.Fragment>
    )
  }
}

export default withContext(Menu);
