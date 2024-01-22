import React, { useState } from 'react'
import svg1 from "../statics/svg1.svg"
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import Signup from "./Signup";
import Home from './Home';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [signup,setSignup] = useState(true);
  let [redirect,setRedirect] = useState(true);

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const signupForm = () =>{
    (signup) && setSignup(false);
  }

  const redirected = () =>{
    if(redirect){
      if(!regex.test(name)){
        redirect = false;
        toast.error("Invalid email address!")
      }
      else if(password.length<=5){
        toast.error("Invalid password!")
        redirect = false;
      }
      else if(regex.test(name)){
        localStorage.setItem("User",`${name}`);
        localStorage.getItem("User");
        setRedirect(false);
      }
      else{
        localStorage.setItem("User",`${name}`);
        localStorage.getItem("User");
        setRedirect(false);
      }
    }
  }
  if(localStorage.getItem('User')) redirected();

  // const username = localStorage.key.split('@')[0];
  console.log(localStorage.key);
  

  console.log(name);
  console.log(password);

  // let [localuser,setLocaluser] = useState(true);  

  // const HomePage = ()=>{
  //   if(localuser) setLocaluser(false);
  //   localStorage.setItem("key2",`${name} is logged In!`);
  //   localStorage.getItem("key2");
  // } 
  // if(localStorage.length===2) HomePage();


  return (
  <>
    { (!redirect) ? <Home/> :
    (
    (!signup) ? <Signup/> :
    <div className='login loginSection'>
      <Toaster position="top-center" reverseOrder={false}/>
      {/* <section className='loginSection'> */}
        <img className='loginImg' src={svg1} alt="" />
        <div className='loginDiv'>
          <h1 className='loginh1'>SIGN IN HERE</h1>
              <Formik
                  initialValues={{ name: '', password: '' }}
                  validate={values => {
                    const errors = {};
                    if (!values.name) {
                      errors.name = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name)
                    ) {
                      errors.name = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(true);
                    }, 400);
                  }}>

                  {({ isSubmitting }) => (
                    <Form className="loginformDiv">
                      <label htmlFor="username" className='username'>Email  </label>
                      <Field type="email" name="email" id="username" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                      <ErrorMessage  style={{fontSize:"0.8rem",color:"red"}} name="email" component="p"/>
                      <label htmlFor="username" className='password'>Password</label>
                      <Field type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <ErrorMessage style={{fontSize:"0.8rem",color:"red"}} name="password" component="p" />
                      <Button type="submit" label='Submit' disabled={isSubmitting} onClick={redirected}/>
                      <div className='notUser'>Not a User? 
                        <Link onClick={signupForm}>Sign up</Link>
                      </div>
                    </Form>
                  )}
              </Formik>
        {/* </div> */}
        </div>
      {/* </section> */}
    </div>
    )
  }
  </> 
  )
}

export default Login