import { useState } from 'react';

const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    
    const onClick = (event) =>{
        if(values.password!==values.repassword){
            alert('Password and Confirm Password do not match')
            values.error_validation = true;
            values.error_message='Password and Confirm Password are not same';
            event.preventDefault();
        }else{
            values.error_validation=false;
        }
        if(!(values.username||values.email)){
            event.preventDefault();
            alert('Provide a unique Username or email at least');
        }
    }

    const onChange = (event) => {
        if(values.password.length<6 || values.password.length>20){
            values.error_validation=true;
            values.error_message='Password minimum length 6 and Maximum 20'
        }else{
            values.error_validation=false;
        }
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const onSubmit = (event) => {
      if(values.password.length<6 || values.password.length>20){
        alert('Password length not right')
        event.preventDefault()
        return false;
      }
      event.preventDefault();
      callback();
    };
  
    return {
      onChange,
      onSubmit,
      onClick,
      values
    };
  };
export default useForm;