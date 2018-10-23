import React, { PureComponent } from 'react';
import {Col, Card, CardBody} from 'reactstrap';
import './Menu.css';
import { withRouter } from 'react-router-dom';
import './OpcionMenu.css';

// TO-DO:
//  - Pasar clases de CSS de Menu.css a OpcionMenu.css
export class OpcionMenu extends PureComponent {
  render() {
    return (
      <Col className="opcion-menu-principal" xs={12} sm={12} md={4} lg={4}>
        <Card onClick={() => this.props.history.push(`${this.props.match.path}${this.props.ruta}`)} body outline color="success">
          <CardBody>
            <img src={this.props.icono} className="iconos-menu"/>    
            <h2 className="modulo-menu">{this.props.nombre}</h2>
          </CardBody>
        </Card>
      </Col>   
    )
  }
}

export default withRouter(OpcionMenu);
