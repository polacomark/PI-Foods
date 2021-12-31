import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
    return(
        <div className="wpLanding">
        <div >
            <Link className="btb" to = '/home' >
                <button clasName='btLanding'>
                    <div className="text">
                    <h1>!!Bienvenido!!</h1>
                    <h2>PI FOOD HENRY</h2>
                    <p>Haz click para empezar!!</p>
                    </div>
                </button>
            </Link>
        </div>
       
        </div>
    )
}