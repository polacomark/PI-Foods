import React from "react";
import './Card.css';
import i from '../../image/fuego.jpg'

//import  { Link } from "react-router-dom"

export default function Cards({ title, image, diets, spoonacularScore }) {
   
    return(
        <div className="card">
            <div>
            <img src={image? image : i} alt="foto no encontrada" width='200px' height='250px'></img>
            <h3>title: {title}</h3>
            <div>
            <span className="span">Score: {spoonacularScore}</span>
            </div >
            <h6>Diets: {diets.join(', ')}</h6>
            </div>
        </div>
    )
}