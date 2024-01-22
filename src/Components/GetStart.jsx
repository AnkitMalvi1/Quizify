import React, { useState } from 'react'
import svg1 from "../statics/svg1.svg"
import Login from './Login';

const GetStart = () => {

  let [login,setLogin] = useState(true);  

  const loginPage = ()=>{
    if(login) setLogin(false);
    localStorage.setItem("key1","Geting Started");
    localStorage.getItem("key1");
  } 
  if(localStorage.getItem('key1')) loginPage();

  return (
    (!login)? <Login/> :
    <div className='getStart'>
        <img className='startImg' src={svg1} alt="" />
        <section className='startSec'>
            <p className="startLine">Ace your Coding Interviews by practicing in this platform. </p>
            <button className='startBtn' onClick={loginPage}>Getting Started</button>
        </section>
    </div>
    
  )
}

export default GetStart