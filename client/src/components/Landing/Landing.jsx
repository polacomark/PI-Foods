import React from "react";
import {Link} from 'react-router-dom';


export default function LandingPage() {
    return(
        <div>
            <Link to = '/home'>
                <button>
                    <div>
                    <h1>!!Bienvenido!!</h1>
                    <h2>PI FOOD HENRY</h2>
                    <p>Haz click para empezar!!</p>
                    </div>
                </button>
            </Link>
        </div>
    )
}