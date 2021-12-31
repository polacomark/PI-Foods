import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipes, getDiets} from '../../actions/actions';
import { useDispatch, useSelector} from 'react-redux';
import NavBar from '../NavBar/navbar'
import './Create.css';

const validate = (input) =>  {
    let errors = {};
    if (!input.title && /\d/.test(input)) {
        errors.title = "Name requiered";
    } else if (!input.summary) {
        errors.summary = "Summary requiered";
    } else if (!input.spoonacularScore || input.spoonacularScore < 0 || input.spoonacularScore > 100) {
        errors.spoonacularScore = "Must be between 0 and 100";
    } else if (!input.healthScore || input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = "Must be between 0 and 100";
    } else if (!input.steps) {
        errors.steps = "Steps requiered";
    }

    return errors;
}

export default function RecipeCreater () {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        image:"",
        steps: [],
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckBox = (e) => {
        setInput((input) => ({
            ...input,
            diets: [...input.diets, e.target.value],
        }));
        // if (e.target.checked) {
        //     setInput({
        //         ...input,
        //         diets: input.diets.concat(e.target.value)
        //     })
        // }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(d => d !==e)
        })
   }


    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = Object.keys(validate(input))
        if (errors.length !== 0) {
            alert('Rellenar los campos')
        } else {
            dispatch(postRecipes(input))
            alert("Recipe Created!")
            setInput({
                title: "",
                summary: "",
                spoonacularScore: "",
                healthScore: "",
                image:"",
                steps: [],
                diets: []
            })
            history.push('/home')
        }
    }

    return (
        <div>
            <div>
                <NavBar/>
            </div>
        <div className='createR'>
            <div className='allF'>
                <h1>Create your own recipe!</h1>
            </div>
                <div className='formulario'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='line'>
                    <label>Name:</label>
                </div>
                    <input type="text" value = {input.title} name="title" onChange={handleChange}/>
                    {errors.title && (
                        <div> 
                            <p className="error">{errors.title}</p>
                        </div>
                    )}
                <div>
                    <div className='line'>
                        <label>Summary:</label>
                    </div>
                    <textarea type="text" value = {input.summary} name="summary" onChange={handleChange} className='boxSummary' />
                    {errors.summary && (
                        <div className='errorSummary'>
                            <p className="error">{errors.summary}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className='line'>
                        <label>spoonacularScore:</label>
                    </div>
                    <input type="number" value = {input.spoonacularScore} name="spoonacularScore" onChange={handleChange} className='boxSpoonacular'/>
                    {errors.spoonacularScore && (
                        <div className='errorSpoonacular'>
                            <p className="error">{errors.spoonacularScore}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className='line'>
                        <label>healthScore:</label>
                    </div>
                    <input type="number" value = {input.healthScore} name="healthScore" onChange={handleChange} className='boxHealth'/>
                    {errors.healthScore && (
                        <div className='errorHealth'>
                            <p className="error">{errors.healthScore}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className='line'>
                        <label>steps:</label>
                    </div>
                    <textarea type="text" value = {input.steps} name="steps" onChange={handleChange} className='boxSteps'/>
                    {errors.steps && (
                        <div className='errorSteps'>
                            <p className="error">{errors.steps}</p>
                        </div>
                    )}
                </div>

                {/* <div className='line'>
                            <label>Tipo de dieta:</label>
                            <select onChange={e => handleCheckBox(e)}>                               
                                {diets?.map(d => (
                                    <option value={d.name}>{d.name}</option>
                                ))}
                           
                            </select>
                            </div> 
                            <div className='line'>
                            <ul><li>{input.diets?.map(el => el + ', ')}</li></ul>
                            </div>
                            {input.diets?.map(el => 
                            <div className='fullElement'>
                                <div className='element'>
                                    <h3>{el}</h3>
                                    <button onClick={() => handleDelete(el)}>X</button> 
                                </div>                                  
                            </div>    
                            )} */}
                
               
                
                 <div >
                    <label>
                        {diets.map((e, index) => { 
                            return (
                            <div key = {e.name}>
                                <span>{e.name}</span>
                             <input type="checkbox" name = {e.name} value = {index + 1} onChange = {handleCheckBox}/>
                             </div>
                        )})}
                     </label>
                 </div> 

            
                <button type="submit" className='bts'>Create recipe</button>
            </form>
           
        </div>
        </div>
        </div>
    )

}