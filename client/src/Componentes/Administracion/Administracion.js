import React, { Component } from 'react';
import {Row } from 'reactstrap';
import './Administracion.css';
import usuarios from '../../assets/img/usuarios.png';
import areas from '../../assets/img/areas.png';
import planes from '../../assets/img/planes-historicos.png';
import indicadores from '../../assets/img/indicadores.png';
import verificacion from '../../assets/img/verificacion.png';
import diagnostico from '../../assets/img/diagnostico.png';
import medida from '../../assets/img/unidad-medida.png';
import OpcionMenu from '../Menu/OpcionMenu';
import withContext from '../../Contenedor/withContext';
import autorizarAdministrador from '../../Utilidades/autorizarAdministrador.js';

export class Menu extends Component {
  render() {
    return (
      <Row className="fila-opciones-menu-principal">
        {/* Gestión de usuarios */}
        {autorizarAdministrador(this.props.usuario.rol) && 
            <OpcionMenu ruta={'/usuarios/'} nombre="Gestión de usuarios" icono={usuarios}/>
        }

        {/* Gestión de áreas */}
        {autorizarAdministrador(this.props.usuario.rol) && 
            <OpcionMenu ruta={'/areas/'} nombre="Gestión de áreas" icono={areas}/>             
        }
  
        {/* Gestión de indicadores */}
        <OpcionMenu ruta={'/indicadores/'} nombre="Gestión de indicadores" icono={indicadores}/>

        {/* Gestión de medios de verificación */}
        <OpcionMenu ruta={'/medios-de-verificacion/'} nombre="Gestión de medios de verificación" icono={verificacion}/>

        {/* Gestión de unidades de medida */}
        <OpcionMenu ruta={'/unidades-de-medida/'} nombre="Gestión de unidades de medida" icono={medida}/>

        {/* Gestión de planes historicos */}
        <OpcionMenu ruta={'/planes-historicos/'} nombre="Gestión de planes históricos" icono={planes}/>

        {/* Gestión de diagnostico de la CMB */}
        <OpcionMenu ruta={'/antecedentes/'} nombre="Gestión de información institucional de la CMB" icono={diagnostico}/>

        {/* Carga de datos */}
        {autorizarAdministrador(this.props.usuario.rol) && 
            <OpcionMenu ruta={'/carga-de-datos/'} nombre="Carga de Datos" icono={diagnostico}/>
        }
      </Row>
    )
  }
}

export default withContext(Menu);