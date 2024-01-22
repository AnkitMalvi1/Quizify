import React from 'react'
import { Link } from 'react-router-dom'
import { FcAbout } from "react-icons/fc";
import { RiGithubFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className='header'>
        <Link className='logo' to={'/'}>Quizzify</Link>
        <div className="links">
            <Link className='link' to={'https://a1developer.in/'}><FcAbout/></Link>
            <Link className='link' to={'https://github.com/AnkitMalvi1'}><RiGithubFill /></Link>
        </div>
    </div>
  )
}

export default Header
