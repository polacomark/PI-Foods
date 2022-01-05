
import React, {useEffect} from "react";
import {Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/actions";
import NavBar from "../NavBar/navbar";
import './Detail.css';
import image from '../../image/fuego.jpg'

export default function Detail (props){
    const dispatch = useDispatch()
    const {id}=props.match.params;
    
    useEffect(() => {
        dispatch(getDetail(id))
    },[id,dispatch])
    
    const myRecipe = useSelector(state => state.detail)

    //console.log(myRecipe, 'recetas')

    return(
        <div>
            
            <div>
            <NavBar/>
                <div className="detaails">
                <div className='contDt'>
                    {
                        myRecipe.length>0?
                        <div>
                            <h2 className='art'>{myRecipe[0].title ? myRecipe[0].title : myRecipe[0].name}</h2>
                            {/* <h1>{myRecipe[0].title ? myRecipe[0].title : myRecipe[0].name}</h1> */}
                            <img src={myRecipe[0].image ? myRecipe[0].image : image} alt="no se encontro iagen"/>  
                            
                                <p className='art'>Tipo de dietas: { myRecipe[0].diets.map(diet=>typeof diet==='object'?diet.name:diet).join(', ')}</p>
                                {/* <h2>{ myRecipe[0].diets ? myRecipe[0].diets.map(t =>t.name) : myRecipe[0].diets}</h2> */}
                            
                            
                                <p className='art'>Puntaje: {myRecipe[0].spoonacularScore}</p>
                                {/* <h2>{myRecipe[0].spoonacularScore}</h2> */}
                           
                                <p className='art'>Resumen: {myRecipe[0].summary.replace(/<[^>]*>?/g, "")}</p>
                                {/* <h3>{myRecipe[0].summary}</h3> */}
                            
                            
                                <p>Puntaje Saludable: {myRecipe[0].healthScore}</p>
                                {/* <h2>{myRecipe[0].Score}</h2> */}
                           
                            
                                <p className='steps'>Paso a Paso: {myRecipe[0].steps}</p>
                                {/* <h4>{ Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps }</h4> */}
                            
                        </div> : <h2>...Loading...</h2>
                    }
                    <Link to='/home'>
                        <button>BACK</button>
                    </Link>

                </div>
            </div>
        </div>
        </div>
        
    )
}
