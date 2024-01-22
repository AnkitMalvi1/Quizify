import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';

const Loader = () => {
  return (
    <div className='loader'>
         <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#ffffff" animationDuration=".5s"/>
    </div>
  )
}

export default Loader