import React from 'react';
import {Context} from './context';

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(contexts) => <Component {...props} {...contexts} />
        }
      </Context.Consumer>
    )
  }
}