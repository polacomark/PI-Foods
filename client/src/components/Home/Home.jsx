import React, { Fragment } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import { getRecipes,
    filterByDiet,
    orderByName,
    orderByRank,
    filterByCreated,
    searchByName,
    getDiets
} from "../../actions/actions.js";
import Cards from "../Cards/Cards"

export default function Home(){
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allDiets = useSelector(state => state.diets)
  console.log(allDiets)

useEffect(()=>{
    dispatch(getRecipes());
    dispatch(getDiets());   
}, [dispatch]);

function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
}
function handleFilterByDiet(e){
    dispatch(filterByDiet(e.target.value))
}
function handlefilterByCreated(e){
    e.preventDefault();
    dispatch(filterByCreated(e.target.value))
}
function handleOrder(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
}

    return(
        <div>
         <Link to= '/recipes'>creaer receta</Link>
         <h1>food</h1>
         <button onClick={e=>{handleClick(e)}}>
             cargar
            </button>
            <select onChange={e=> handlefilterByCreated(e)}>
                <option value='all'>todas las recetas</option>
                <option value='created'>Recetas Creadas</option>
                <option value='api'>Recetas Api</option>
            </select>
            <select onChange={e=>handleOrder(e)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={e=>handleFilterByDiet(e)}>
                <option value="all">Diets</option>
                <option value="gluten free">Gluten free</option>
                <option value="dairy free">Dairy free</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                <option value="primal">Primal</option>
                <option value="vegan">Vegan</option>
                <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                <option value="ketogenic">Ketogenic</option>
                <option value="whole 30">Whole 30</option>
                <option value="pescatarian">Pescatarian</option>
            </select>
            <select>

            </select>
      {
      allRecipes && allRecipes.map((el, i)=>{
      return(
     <div key={i}>
          <Link to={'/recipes' + el.id}>
          <Cards image={el.img ? el.img : el.image} title={el.title} diets={el.diets} id={el.id} key={el.id}/>
          </Link>
          </div>
      
      );
      })

      };

        </div>

        
    )
}
