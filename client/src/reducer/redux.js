const initialState = {
    recipes : [],
    allRecipes : [],
    diets : [],
    dates: [],
    detail: []
}

//estados
function rootReducer(state= initialState, action){
    
    switch (action.type) {
        //trae todas las recetas
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
                
            }
        case 'GET_NAME_RECIPES':
            console.log(action.payload, 'reducer name')
            return{
                ...state,
                recipes: action.payload,
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        // hago el filtrado del estado inicial
        case 'FILTER_BY_TYPE_DIETS':
            let filterByTemp;
            if(action.payload==='All'){
                filterByTemp=state.allRecipes;
            }else{
                filterByTemp=state.allRecipes.filter((dFilter)=>dFilter.diets.includes(action.payload))
                //filterByTemp = state.allRecipes.filter((d)=>d.diets).filter((dfiltered)=>dfiltered.diets.includes(action.payload));
                
                //.filter((d)=>d.diets.includes(action.payload))
        }
            return{
                ...state,
                recipes: filterByTemp
            };
        
        // const allRecipes= state.allRecipes
            // const typeFilter = allRecipes.filter(recipe => recipe.diets.find(diets => {
            //   console.log(diets)  
            //   if (diets.name === action.payload) {
            //     return recipe
            //   }
            // }))
            // return{
            //     ...state,
            //     diets: typeFilter
            // } 
        //case "FILTER_BY_DIET":            
       
        case 'FILTER_BY_ORDER':
            const sortArr= action.payload === 'asc' ? state.allRecipes.sort(function (a, b){
                if(a.title > b.title){
                    return 1;
                }
                if(a.title < b.title){
                    return -1;
                }
                return 0
            }) : state.allRecipes.sort(function(a, b){
                if(a.title > b.title){
                    return -1;
                }
                if(a.title < b.title){
                    return 1;
                }
                return 0
            })
            return{
                ...state,
                recipes: sortArr
            }
            case 'ORDER_BY_SCORE':
                const filterByPunctuation = action.payload === 'None'  ? state.recipes : action.payload === 'ascPoint' ?
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return 1;                                       //Se resuelve el if si es true
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return -1;
                    }
                    return 0;
                })
                :           //else
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return -1;                                       
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return 1;
                    }
                    return 0;
                });
                state.recipes = [];
            return {
                ...state,
                recipes:state.recipes.concat(filterByPunctuation) 
            }
        case 'POST_RECIPE':
            return{
                ...state
            }    
        case 'GET_DETAIL':
            // console.log(action.payload,'reducer det')
            return{
                ...state,
                detail: action.payload
            }
        default:
        return state;
    
    }
}

export default rootReducer;
