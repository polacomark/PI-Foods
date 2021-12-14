import React from "react";
//import  { Link } from "react-router-dom"

export default function Cards({ title, image, diets }) {
   
    return(
        <div>
            <img src={image} alt="foto no encontrada" width='200px' height='250px'></img>
            <h3>title:{title}</h3>
            <h6>Diets:{diets && (diets.map((e)=>e.name)).join(', ')}</h6>

        </div>
    )
}