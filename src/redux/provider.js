import React, {useReducer} from 'react';

import {createContext} from 'react'

const initialState = {
    user: null
};

const store = createContext({
    user:null,
    login: (user) => {},
    logout: () => {}
})

function reducer(state, action){
  switch(action.type){
      case 'login':
          return {
              ...state,
              user:action.payload
          }
      case 'logout':
          return{
              ...state,
              user:null
          }
      default:
          return state;
  }
}
function Provider(props){
    const [state, dispatch] = useReducer(reducer, initialState);

    function login(user){
        dispatch({
            type: 'login',
            payload: user
        })
    }

    function logout(){
        dispatch({type: 'logout'});
    }

    return (
        <store.Provider
          value={{ user: state.user, login, logout }}
          {...props}
        />
      );
    }

export {store,Provider}