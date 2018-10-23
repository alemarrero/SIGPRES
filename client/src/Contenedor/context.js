import * as React from "react";

export const Context = React.createContext(
// default values used by a Consumer when it does not have a  
// matching Provider above it in the tree, useful for testing
  {
    usuario: {
      autenticado: false,
      id_usuario: undefined,
      nombre_completo: undefined,
      rol: undefined
    }
  }
)