import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      usuario:'',
      password:'',
      usuario_autenticado: false
    };
    this.autenticar= this.autenticar.bind(this);
  }

  autenticar(e) {
    e.preventDefault();
    fetch('http://localhost:5000/api/auth/login', {
      method: 'post',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        usuario: this.state.usuario,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(respuesta => {
      console.log(respuesta);
      if (respuesta.autenticado === true) {
        this.setState({usuario_autenticado: true}, () => {          
          alert('login satisfactorio')
        });
      }
      else {
        alert('credenciales invalidas');
      }
    })
  }

  render() {
    return (
      <div>
        <form>
          <label>Usuario</label>
          <br/>
          <input name='usuario' onChange={(e) => this.setState({usuario: e.target.value})}/>
          <br/>
          <label>Contraseña</label>
          <br/>
          <input name='contraseña' onChange={(e) => this.setState({password: e.target.value})}/>
          <br/>
          <button onClick={this.autenticar} >Entrar</button>
        </form>
      </div>
    )
  }
}
