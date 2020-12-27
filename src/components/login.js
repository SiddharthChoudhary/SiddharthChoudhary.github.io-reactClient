import React, {useContext,useState}  from 'react'
import './login.css'
import gql from 'graphql-tag';

import {Redirect} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks';
import useForm from '../react-form'
import {LOGIN} from '../graphql/queries'
import {store} from '../redux/provider'

function Login(props){
    const redux_state = useContext(store);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, onClick, values } = useForm(login_callback, {
        username: '',
        password: ''
    });

    const [login,{loading}] = useMutation(LOGIN, {
        update(_, {data: {login: user}}) {
            redux_state.login(user);
            props.history.push('/')
    },
    onError(response,operation) {
        setErrors(response.message);
      },
        variables: values
    });

    function login_callback() {
        login();
    }
    return(
        <section class="bg-gradient-primary">
        <head>
            <title>Login</title>
            <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"/>
            <link href="css/sb-admin-2.min.css" rel="stylesheet"/>
        </head>
        <div class="container">
            <div class="row justify-content-center">
            </div>
            
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                        <div class="col-xl-10 col-lg-12 col-md-9">
                        {typeof(errors)=='string'?(
                            <div class="col-lg-6 mb-4">
                            <div class="card bg-danger text-white shadow">
                                <div class="card-body">
                                    Something wrong with credentials
                                </div>
                            </div>
                        </div>
                        ):<div/>}
                        </div>
                            <div class="col-lg-6 d-none d-lg-block bg-login-image">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user" onSubmit={onSubmit}>
                                    <div class="form-group">
                                            <input class="form-control form-control-user"
                                                id="username"
                                                value={values.username}
                                                label="Username"
                                                placeholder="Username.."
                                                name="username"
                                                type="text"
                                                required
                                                onChange={onChange}/>
                                    </div>
                                    <div class="form-group">
                                            <input class="form-control form-control-user"
                                                id="password" 
                                                placeholder="Password"
                                                label="Password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={onChange}/>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox small">
                                            <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                            <label class="custom-control-label" for="customCheck">Remember
                                                Me</label>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-user btn-block">Login
                                    </button>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <a class="small" href="/register">Create an Account!</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

        
        <script src="vendor/jquery/jquery.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.js"></script>
        <script src="js/sb-admin-2.js"></script>
        </section>
)
}

export default Login;