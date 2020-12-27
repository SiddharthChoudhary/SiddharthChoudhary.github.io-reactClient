import React, {useContext, useState} from 'react'
import './register.css'
import {Redirect} from 'react-router-dom'
import {store} from '../redux/provider'
import useForm from '../react-form'
import {useMutation} from '@apollo/react-hooks';
import {Upload} from '../image_upload/Upload';
import {REGISTER} from '../graphql/queries'

function Register(props){
    const redux_store = useContext(store);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, onClick, values } = useForm(registerUser, {
        name:'',
        username:'',
        password:'',
        repassword:'',
        email:'',
        profile_picture:'',
        error_message:'',
        error_validation:'',
        is_name_available:false
    });

    const [register,{loading}] = useMutation(REGISTER, {
    update( _,{ data: { register: userData }}) 
    {
        redux_store.login(userData);
        props.history.push('/')
    },
    onError(response,operation) {
        setErrors(response.message);
      },
    variables: values
    });

    function registerUser() {
        register();
    }
return(
<section className="bg-gradient-primary">
<head>
<title>Register</title>
<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
<link
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet"/>
<link href="css/sb-admin-2.min.css" rel="stylesheet"/>
</head>
<div class="container">
    <div class="row justify-content-center"></div>
    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            <div class="row">
            {values.error_validation?(
                            <div class="col-lg-6 mb-4">
                            <div class="card bg-danger text-white shadow">
                                <div class="card-body">
                                    {values.error_message}
                                </div>
                            </div>
                        </div>
                        ):<div/>}
                         {typeof(errors)=='string'?(
                            <div class="col-lg-6 mb-4">
                            <div class="card bg-danger text-white shadow">
                                <div class="card-body">
                                    Are you sure if the username is unique?
                                </div>
                            </div>
                        </div>
                        ):<div/>}
                        </div>
            <div class="row">
                <div class="col-lg-5 d-none d-lg-block bg-register-image">
                    
                </div>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                        </div>
                        <form class="user" onSubmit={onSubmit}>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input class="form-control form-control-user" id="name"
                                        placeholder="Name" value={values.name} name="name" required
                                        type="text" placeholder="Enter Name" onChange={onChange}/>
                                </div>
                                <div class="col-sm-6">
                                    <input class="form-control form-control-user" id="username"
                                        placeholder="Username" placeholder="UserName" value={values.username} name="username" required
                                        type="text" placeholder="Enter UserName" onChange={onChange}/>
                                </div>
                            </div>
                            <div class="form-group">
                                <input class="form-control form-control-user" id="email" value={values.email} name="email" type="email" required
                                onChange={onChange} placeholder="Email Address"/>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input class="form-control form-control-user" value={values.password} name="password" type="password"
                                    onChange={onChange} id="password" placeholder="Password" required/>
                                </div>
                                <div class="col-sm-6">
                                    <input class="form-control form-control-user" name="repassword" type="text"
                                        id="repassword" placeholder="Repeat Password" value={values.repassword} onChange={onChange} />
                                </div>
                                <div class="col-sm-6">
                                <Upload onChange={onChange} onClick={onClick} disabled={values.is_name_available?false:true}/>
                                </div>
                            </div>
                            <button type="submit" onClick={onClick} class="btn btn-primary btn-user btn-block">
                                Register Account
                            </button>
                        </form>
                        <hr/>
                        <div class="text-center">
                            <a class="small" href="/login">Already have an account? Login!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="vendor/jquery/jquery.js" type="text/javascript"></script>
<script src="vendor/bootstrap/js/bootstrap.js" type="text/javascript"></script>
<script src="vendor/jquery-easing/jquery.js" type="text/javascript"></script>
<script src="public/js/sb-admin-2.js" type="text/javascript"></script>
</section>
)
}
export default Register;