import { Button } from 'primereact/button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import svg1 from "../statics/svg1.svg"
import Login from './Login'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [signin,setSignin] = useState(true);
  let [redirect,setRedirect] = useState(true);

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const redirected = () =>{
    if(redirect){
      if(!regex.test(name)){
        redirect = false;
        toast.error("Invalid email address!")
      }
      else if(password.length<=5){
        redirect = false;
        toast.error("Invalid password!")
      }
      else{
        (redirect) && setRedirect(false);
      }
    }
  }

  console.log(name);
  console.log(password);

  const signinForm = () =>{
    (signin) && setSignin(false);
  }

  return (
    (!signin) ? <Login/> :
    <div className='signup signupSection'>
      <Toaster position="top-center" reverseOrder={false}/>
        <img className='signupImg' src={svg1} alt="" />
        <div className='signupDiv'>
          <h1 className='signuph1'>SIGN UP HERE</h1>
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
                    <Form className="signupformDiv">
                      <label htmlFor="username" className='username'>Email</label>
                      <Field type="email" name="email" id="username" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                      <ErrorMessage  style={{fontSize:"0.8rem",color:"red"}} name="email" component="p"/>
                      <label htmlFor="username" className='password'>Password</label>
                      <Field type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <ErrorMessage style={{fontSize:"0.8rem",color:"red"}} name="password" component="p" />
                      <Button type="submit" label='Submit' disabled={isSubmitting} onClick={redirected}/>
                      <div className='notUser'>Already a User? 
                        <Link onClick={signinForm}>Sign in</Link>
                      </div>
                    </Form>
                  )}
              </Formik>
        </div>
    </div>
  )
}

export default Signup