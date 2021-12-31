import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

import logo from'../../image/logo.png'
export default function NavBar() {


    return (
        <div className='nav'>
            <div className='logo'>
                <img src={logo} alt="" />
            </div>    
            <div className='title'>
                    <h1>PI-FOOD</h1> 
            </div>
            <div >
                <ul>
                    <Link to='/'><button className='bth'>Landing</button></Link>    
                    <Link to='/home'><button className='bth'>Home</button></Link>
                    <Link to= '/recipe'><button className='btc'>Crear receta</button></Link>
                </ul>
            </div>
        </div>
    )
}