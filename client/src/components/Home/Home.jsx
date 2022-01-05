import {useState, useEffect} from 'react'
//hooks
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filetrRecipesByTypes, orderByName, getDiets, orderByScore} from '../../actions/actions'
import {Link} from 'react-router-dom'


import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar"
import NavBar from "../NavBar/navbar"
import Card from "../Cards/Cards"
import './Home.css'

export default function Home(){
    // para usar la constante y despachar las acciones
    const dispatch = useDispatch(); 
    // traigo todo lo que esta en el reducer los estado de recipes
    const allRecipes = useSelector((state) => state.recipes)
    const diets = useSelector((state) => state.diets)
    //-----------------------------------------------------------

    //------------------paginado home-----------------------------
    const [orden, setOrden] = useState('');
    const [orderLike, setOrderLike] = useState("");
    //se guarda en una const el estado local y se seteamos la pagina actual y empieza en el paginado 1
    const [currentPg, setCurrentPg] = useState(1);
    //guardo cuantas recetas quiero por pg
    const [recipesPg, setRecipesPg] = useState(9);
    const indexOfLastRecipe = currentPg * recipesPg; //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPg; //0
    //cortamos el array de recipes para mostar por pg
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
//------------------------------------------------------------



    const paginado = (pgNumber) => {
        setCurrentPg(pgNumber)
    }
    

    //traigo del estado las recetas cuando el componente se monta -- 
    useEffect(() => {
        dispatch(getRecipes()); //hook del matchDispatchToProps()
        dispatch(getDiets()); 
        setRecipesPg(9)
    },[dispatch])   //este array es para que no sea infinito
    // console.log(currentRecipes)
   
    //creo evento para botones
    function handleClick(e){

        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //recetea
    }

    function handleFilterTypes(e){
        e.preventDefault();
        dispatch(filetrRecipesByTypes(e.target.value))
    }

    // function handleFilterCreated(e){
    //     dispatch(filterRecipesByCreated (e.target.value))
    // }
    //console.log(diets,'home')

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPg(1);
        setOrden(`ordenado ${e.target.value}`)
    }
    function handleSelectByScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setOrderLike(`ordenado ${e.target.value}`)
    }

    //renderizo
    return(
    
        <div className='all'>
          <NavBar/>
            <div className= 'home'>
                <div className='busqueda'>
                    <div className='lala'>              
                    <Link to= '/recipe'><button className='bt'>Crear receta</button></Link>
                    <SearchBar/>
                    </div> 
                    <div className='lala'>
                        <button className='bt' onClick= {e => {handleClick(e)}}>Recargar Recetas</button>
                        <div className='filtros'>
                        {/* <span>Order by Recipe Name</span> */}
                            <select onChange={e => handleSort(e)}>
                                <option value="default">Order by Recipe</option>
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                            </select>
                            {/* <span >Order by Score</span> */}
                            <select onChange={(s) => handleSelectByScore(s)}>
                            <option value="None">Order by Score</option>
                            <option value="ascPoint">Highest Score</option>
                            <option value="descPoint">Lowest Score</option>
                            </select>
                            {/* <span>Filter by Type of diet</span> */}
                            <select onChange={e => handleFilterTypes(e)}>
                                <option value="All">Filter by Diets</option>
                                {/* {diets.map(d => (
                                    <option value={d.name}>{d.name}</option>
                                ))} */}
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
                            {/* <select onChange={e => handleFilterCreated(e)}>
                                <option value="all">Todas las Recetas</option>
                                {/* <option value="created">Recetas Creadas</option> */}
                                {/* <option value="api">Recetas Api</option>
                            </select> */} 
                        </div>
                    </div>            
                </div>
                {/* traigo las cruds que necesito para el paginado */}
                <div className="cards">  
                    {
                        currentRecipes?.map((lo, i) => {
                            // console.log(currentRecipes,'home')
                            return (
                                <div key={i} className='conteiner'>
                                    <Link className='link' to={'/home' + lo.id}>
                                        <Card className='card'  title={lo.title} 
                                        image={lo.img ? lo.img : lo.image}
                                        diets={lo.diets} 
                                        spoonacularScore={lo.spoonacularScore} 
                                        id={lo.id}/>
                                    </Link> 
                                </div>
                            );
                        })
                    }            
                <div className='paginado'>
                <Paginado 
                    recipesPg= {recipesPg}
                    allRecipes= {allRecipes.length}
                    paginado= {paginado}
                    />
                </div>
                </div>
                
            </div>
            {/* <footer className='foo'>
                by Cesar Gabriel Markieviche
            </footer> */}
        </div>
                
    )
}
