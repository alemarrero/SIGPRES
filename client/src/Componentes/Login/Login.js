import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import './Login.css';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      usuario:'',
      password:'',
    };
    this.autenticar = this.autenticar.bind(this);
  }

  componentDidMount(){
    document.title = "SICMB - Ingresar";
  }

  async autenticar(e) {
    e.preventDefault();

    // Oculta errores previos
    document.getElementById("error-credenciales-login").style.display = "none";

    const login_request = await fetch('/api/auth/login', {
      method: 'post',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        usuario: this.state.usuario,
        password: this.state.password
      })
    });

    const login_response = await login_request.json();
    
    if (login_response.autenticado === true) {
      this.props.history.push('/inicio');
    }
    else {
      document.getElementById("error-credenciales-login").style.display = "block";
    }
  }

  render() {
    return (
      <Container fluid className="container-login">
        {/* Botón de atención al ciudadano */}
        <div className="boton-atencion-al-ciudadano" onClick={() => this.props.history.push('/oac')}> <i className="fas fa-comment"></i> Atención al ciudadano</div>
        
        <Row className="row-login">
          <Col xs={12} sm={12} md={12} lg={12} className="col-login"> 
            <Form className="form-login">
              {/* Nombre de usuario */}
              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h3 className="titulo">SICMB</h3>
                  <Input type="text" placeholder="Nombre de usuario" name='usuario' onChange={(e) => this.setState({usuario: e.target.value})}/>
                </Col>
              </FormGroup>

              {/* Contraseña */}
              <FormGroup row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Input type="password" placeholder="Contraseña" name='contraseña' onChange={(e) => this.setState({password: e.target.value})}/>
                </Col>
              </FormGroup>

              {/* Mensaje de error */}
              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                  <span id="error-credenciales-login" className="error-login">Nombre de usuario o contraseña inválidos</span>
                </Col>
              </FormGroup>

              {/* Botón de iniciar sesión */}
              <FormGroup row>
                <Col className="text-center" xs={12} sm={12} md={12} lg={12}>
                  <Button 
                    onClick={this.autenticar}
                    color="success"
                  >
                    Entrar
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
