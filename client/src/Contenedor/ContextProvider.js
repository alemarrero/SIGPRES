import React from 'react';
import {Context} from './context';
import {withRouter} from 'react-router-dom';

class ContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: {
        autenticado: false,
        id_usuario: undefined,
        nombre_completo: undefined,
        rol: undefined
      },
      areas: []
    };

    this.verificarSesion = this.verificarSesion.bind(this);
    this.obtenerAreas = this.obtenerAreas.bind(this);
  }
  
  async obtenerAreas(){
    const areas_request = await fetch('/api/areas/obtener_areas', {credentials: 'include'});
    const areas_response = await areas_request.json();

    if(areas_response !== 'err'){
      this.setState({areas: areas_response});
    }
    else{
      console.log("Error al almacenar las áreas en el contexto del sistema.");
    }
  }


  async verificarSesion(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include', headers:{"accepts":"application/json"}});
    const session_response = await session_request.json();

    if(session_response !== 'err'){
      this.setState({usuario: {...session_response}});
    }
    else{
      this.props.history.push('/');
    }
  }

  async componentDidMount(){
    this.verificarSesion();
    this.obtenerAreas();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default withRouter(ContextProvider);
