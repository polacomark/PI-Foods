import React from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions/actions";

export default function Detail(props){
    const dispatch = useDispatch();
    const {id}=props.match.params;

    useEffect(()=>{
        dispatch(getDetails(id))
    },[id, dispatch]);

    const myRecipe = useSelector((state)=>state.detail);
    //console.log(myRecipe)
    return(
        <div>
             {
            myRecipe.length>0?
             <div>
                 <h1>{myRecipe[0].title ? myRecipe[0].title : myRecipe[0].name}</h1>
                 <img src={myRecipe[0].image? myRecipe[0].image:  myRecipe[0].image}
                     alt="no se encontro la imagen" />
                 <div>
                     <h5>Tipo de dietas:</h5>
                     <h2>{ myRecipe[0].diets ? myRecipe[0].diets .map(t =>t.name) : myRecipe[0].diets }</h2>
                 </div>
                 <div >
                     <h5>Puntaje:</h5>
                     <h2>{myRecipe[0].spoonacularScore}</h2>
                 </div>
                 <div >
                     <h5>Resumen:</h5>
                     <h3>{myRecipe[0].summary}</h3>
                 </div>
                 <div >
                     <h5>Puntaje Saludable:</h5>
                     <h2>{myRecipe[0].healthScore}</h2>
                 </div>
                 <div>
                     <h5>Paso a Paso:</h5>
                     <h4>{ Array.isArray(myRecipe[0].analyzedInstructions) ? myRecipe[0].analyzedInstructions.map(e =>
                         e.steps.map(f => f.step)) : myRecipe[0].analyzedInstructions }</h4>
                 </div>
             </div> : <p>...Loading...</p>
             }
            <div>
                <Link to= '/home'>
                    <button>Back</button>
                </Link>
            </div> 
        </div>
    )

};