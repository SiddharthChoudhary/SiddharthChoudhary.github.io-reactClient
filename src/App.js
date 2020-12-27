import React, {useContext} from 'react'
import {Route,BrowserRouter as Router,Redirect} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import {store, Provider} from './redux/provider'

function PrivateRoute({component: Component, ...element}){
    const {user} = useContext(store);

    return (
        <Route
        {...element}
        render = {props =>
            user ? <Redirect to='/'/> : <Component {...props} />
        }
        />
    )
}

function App() {
  return (
    <Provider>
    <Router>
    <Route exact path="/" component={Dashboard}></Route>
    <PrivateRoute exact path="/login" component={Login}></PrivateRoute>
    <PrivateRoute exact path="/register" component={Register}></PrivateRoute>
    </Router>
    </Provider>
  );
}

export default App;
