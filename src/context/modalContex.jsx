import React, { createContext, useReducer } from 'react';

const modalContext = createContext({});

const initialState = {
  open: false,
};

export function ModalProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case 'open?':
        return { ...state, open: !state.open };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <modalContext.Provider value={{ state, dispatch }}>
      {children}
    </modalContext.Provider>
  );
}

export default modalContext;