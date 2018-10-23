import React from 'react';

import {Context} from './context';

class SessionContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: {
        autenticado: false,
        id_usuario: undefined,
        nombre_completo: undefined,
        rol: undefined
      }
    };
  }

  async componentDidMount(){
    const session_request = await fetch('/api/auth/session', {credentials: 'include', headers:{"accepts":"application/json"}});
    const session_response = await session_request.json();

    if(session_response !== 'err'){
      this.setState({usuario: {...session_response}});
    }
    else{
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default SessionContextProvider;
