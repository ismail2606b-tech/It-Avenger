import React from 'react'
import {Link } from 'react-router-dom'
import Home from '../Home'
function Header() {
  return (
    <>
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">about</Link>
        </nav>
    </header>
    </>
  )
}

export default Header